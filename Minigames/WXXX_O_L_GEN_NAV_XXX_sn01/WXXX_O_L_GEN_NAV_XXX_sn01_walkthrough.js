/**
 * ============================================================================
 * 🧭 SZONÁR INTERAKTÍV BEMUTATÓ (IN-GAME AUTOPLAY WALKTHROUGH)
 * ============================================================================
 * Lépésről lépésre végigvezeti a játékost a valós játékmotor elemein:
 * 1. Szonár pásztázás (Sonar ping) a radar közepén
 * 2. Műszerfal & Mini CRT hullámkép rögzítés (PS) a hullám kiterjedt fázisában (1200ms)
 * 3. Gombsor használata (1-es szám bejelölése a radaron)
 * 4. Térkép mód & Zátony bejelölése piros X-szel
 * 5. Útvonaltervezés a zátony kikerülésével a kincsesládához
 * 6. Hajó indítása (START) -> a hajó végighajózik a pályán & Győzelem!
 * ============================================================================
 */

window.SonarWalkthrough = (function() {
  let isRunning = false;
  let isPaused = false;
  let pausePromiseResolve = null;
  let cursorEl = null;
  let bubbleEl = null;
  let completeModalEl = null;

  let lastStepInfo = { stepNum: 1, totalSteps: 5, key: 'wt_step1' };

  window.addEventListener('sonar:language-changed', () => {
    if (bubbleEl && !bubbleEl.classList.contains('hidden') && lastStepInfo) {
      document.getElementById('wt-counter').textContent = `${lastStepInfo.stepNum} / ${lastStepInfo.totalSteps} ${t('wt_step_word', 'LÉPÉS')}`;
      document.getElementById('wt-text').innerHTML = t(lastStepInfo.key, '');
    }
    const subEl = document.getElementById('wt-complete-sub');
    if (subEl) subEl.textContent = t('wt_complete_sub', '');
    const startBtn = document.getElementById('wt-start-real-btn');
    if (startBtn) startBtn.textContent = t('wt_start_game_btn', 'JÁTÉK INDÍTÁSA');
  });


  function t(k, fallback) {
    if (window.SonarI18n && typeof window.SonarI18n.t === 'function') {
      return window.SonarI18n.t(k, fallback);
    }
    return fallback;
  }

  function getOpWindow() {
    return document.getElementById('operating-window');
  }

  function togglePause() {
    isPaused = !isPaused;
    const btn = document.getElementById('wt-pause-btn');
    if (btn) {
      btn.innerHTML = isPaused ? '▶ Resume' : '⏸ Pause';
      btn.style.borderColor = isPaused ? '#ffcc00' : 'rgba(57,255,20,0.5)';
      btn.style.color = isPaused ? '#ffcc00' : '#8aff70';
      btn.style.background = isPaused ? 'rgba(255,204,0,0.18)' : 'rgba(57,255,20,0.12)';
    }
    if (!isPaused && pausePromiseResolve) {
      const res = pausePromiseResolve;
      pausePromiseResolve = null;
      res();
    }
  }

  async function wait(ms) {
    let elapsed = 0;
    const step = 40;
    while (elapsed < ms && isRunning) {
      while (isPaused && isRunning) {
        await new Promise(r => { pausePromiseResolve = r; });
      }
      await new Promise(r => setTimeout(r, step));
      elapsed += step;
    }
  }

  // 1. Vizuális elemek: lebegő mutató kéz (pointer.png), feliratbuborék és záró modal
  function createUI() {
    const opWin = getOpWindow();
    if (!opWin) return;

    if (!cursorEl) {
      cursorEl = document.createElement('div');
      cursorEl.id = 'walkthrough-cursor';
      cursorEl.className = 'absolute pointer-events-none z-50 hidden';
      cursorEl.style.cssText = 'position:absolute;width:32px;height:48px;transition:left 0.65s cubic-bezier(0.25,1,0.5,1), top 0.65s cubic-bezier(0.25,1,0.5,1), transform 0.18s ease;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.9));pointer-events:none;z-index:9999;';
      cursorEl.innerHTML = '<img src="https://storage.googleapis.com/kalozsziget-assets/Minigames/WXXX_O_L_GEN_NAV_XXX_sn01/assets/images/pointer.png" alt="" class="w-full h-full block" />';
      opWin.appendChild(cursorEl);
    }

    if (!bubbleEl) {
      bubbleEl = document.createElement('div');
      bubbleEl.id = 'walkthrough-bubble';
      bubbleEl.className = 'absolute z-50 hidden font-mono';
      // Pontosan a felhasználó által megjelölt helyre: a radar jobb felső sarka (G, H, I, J oszlopok, 9-10 sorok) és a réz oszlop közé!
      bubbleEl.style.cssText = 'position:absolute;left:29.5%;top:18.8%;width:320px;max-width:330px;background:rgba(4,14,8,0.96);border:1.5px solid #39ff14;border-radius:10px;padding:14px 16px;color:#8aff70;box-shadow:0 0 25px rgba(57,255,20,0.45);backdrop-filter:blur(4px);pointer-events:auto;z-index:9998;transition:opacity 0.3s ease;';
      bubbleEl.innerHTML = `
        <div style="border-bottom:1px solid rgba(57,255,20,0.35);padding-bottom:4px;margin-bottom:8px;">
          <span id="wt-counter" style="font-size:11px;letter-spacing:1.5px;font-weight:bold;color:#bfffab;">BEMUTATÓ</span>
        </div>
        <div id="wt-text" style="font-size:14px;color:#e8ffe5;line-height:1.45;min-height:58px;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding-top:6px;border-top:1px solid rgba(57,255,20,0.25);gap:8px;">
          <button id="wt-pause-btn" style="flex:1;font-size:12.5px;color:#8aff70;border:1px solid rgba(57,255,20,0.5);border-radius:4px;padding:6px 10px;background:rgba(57,255,20,0.12);cursor:pointer;font-weight:bold;">⏸ Pause</button>
          <button id="wt-skip-btn" style="flex:1;font-size:12.5px;color:#ff9933;border:1px solid rgba(255,153,51,0.5);border-radius:4px;padding:6px 10px;background:rgba(255,153,51,0.12);cursor:pointer;font-weight:bold;">✕ Skip</button>
        </div>
      `;
      opWin.appendChild(bubbleEl);
      document.getElementById('wt-pause-btn').addEventListener('click', togglePause);
      document.getElementById('wt-skip-btn').addEventListener('click', () => stopWalkthrough(true));
    }

    if (!completeModalEl) {
      completeModalEl = document.createElement('div');
      completeModalEl.id = 'walkthrough-complete-modal';
      completeModalEl.className = 'absolute inset-0 z-50 flex items-center justify-center hidden';
      completeModalEl.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.82);display:none;align-items:center;justify-content:center;z-index:10000;';
      completeModalEl.innerHTML = `
        <div style="background:#07140b;border:2px solid #39ff14;border-radius:14px;padding:26px 32px;max-width:440px;width:90%;text-align:center;box-shadow:0 0 35px rgba(57,255,20,0.5);font-family:monospace;">
          <div style="color:#8aff70;font-size:20px;font-weight:bold;letter-spacing:2px;margin-bottom:12px;">🏆 ${t('wt_complete', 'Készen állsz a tengeri küldetésre!')}</div>
          <div id="wt-complete-sub" style="color:#bfffab;font-size:14px;line-height:1.5;margin-bottom:22px;">${t('wt_complete_sub', 'Most már mindent tudsz a szonár kezeléséről, a mini CRT rögzítéséről és a zátonyok kikerüléséről. Kezdődjék a valódi küldetés!')}</div>
          <button id="wt-start-real-btn" style="background:#2eb85c;color:#000;font-weight:bold;font-size:15px;letter-spacing:1.5px;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(46,184,92,0.6);">${t('wt_start_game_btn', 'JÁTÉK INDÍTÁSA')}</button>
        </div>
      `;
      opWin.appendChild(completeModalEl);
      document.getElementById('wt-start-real-btn').addEventListener('click', () => {
        completeModalEl.style.display = 'none';
        stopWalkthrough(true);
      });
    }
  }

  // 2. Kurzormozgatás HTML elemekre
  function moveCursorToElement(el, offsetX = 0.5, offsetY = 0.5) {
    return new Promise(resolve => {
      const opWin = getOpWindow();
      if (!opWin || !el || !cursorEl) return resolve();
      const opRect = opWin.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const targetX = (elRect.left - opRect.left) + elRect.width * offsetX;
      const targetY = (elRect.top - opRect.top) + elRect.height * offsetY;

      cursorEl.classList.remove('hidden');
      cursorEl.style.display = 'block';
      cursorEl.style.left = `${targetX}px`;
      cursorEl.style.top = `${targetY}px`;

      setTimeout(resolve, 680);
    });
  }

  // 3. Kurzormozgatás a radar 10×10-es celláira
  function moveCursorToGridCell(r, c) {
    return new Promise(resolve => {
      const canvas = document.getElementById('let-crt-canvas');
      const opWin = getOpWindow();
      if (!canvas || !opWin || !cursorEl) return resolve();

      const opRect = opWin.getBoundingClientRect();
      const cRect = canvas.getBoundingClientRect();

      const padL = cRect.width * 0.0294;
      const padR = cRect.width * 0.1173;
      const padT = cRect.height * 0.0340;
      const padB = cRect.height * 0.0349;
      const gridW = cRect.width - padL - padR;
      const gridH = cRect.height - padT - padB;
      const cellW = gridW / 10;
      const cellH = gridH / 10;

      const cellCenterX = cRect.left + padL + (c + 0.5) * cellW;
      const cellCenterY = cRect.top + padT + (r + 0.5) * cellH;

      const targetX = cellCenterX - opRect.left;
      const targetY = cellCenterY - opRect.top;

      cursorEl.classList.remove('hidden');
      cursorEl.style.display = 'block';
      cursorEl.style.left = `${targetX}px`;
      cursorEl.style.top = `${targetY}px`;

      setTimeout(resolve, 550);
    });
  }

  // 4. Valós kattintás szimulálása a radar cellájára (mousemove -> click az eseménykezelőknek)
  function clickRadarCell(r, c) {
    const canvas = document.getElementById('let-crt-canvas');
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const padL = rect.width * 0.0294;
    const padR = rect.width * 0.1173;
    const padT = rect.height * 0.0340;
    const padB = rect.height * 0.0349;
    const gridW = rect.width - padL - padR;
    const gridH = rect.height - padT - padB;
    const cellW = gridW / 10;
    const cellH = gridH / 10;

    const clientX = rect.left + padL + (c + 0.5) * cellW;
    const clientY = rect.top + padT + (r + 0.5) * cellH;

    // mousemove esemény: beállítja a hoveredCell = { r, c }-t a let_particles.js-ben!
    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY, bubbles: true }));
    // click esemény: kiváltja a triggerSonarWave-et (módtól függően hullám, X vagy útvonal!)
    canvas.dispatchEvent(new MouseEvent('click', { clientX, clientY, bubbles: true }));
  }

  function clickAnimation() {
    return new Promise(resolve => {
      if (!cursorEl) return resolve();
      cursorEl.style.transform = 'scale(0.82)';
      setTimeout(() => {
        cursorEl.style.transform = 'scale(1)';
        resolve();
      }, 160);
    });
  }

  function showBubble(stepNum, totalSteps, text) {
    createUI();
    if (!bubbleEl) return;
    document.getElementById('wt-counter').textContent = `${stepNum} / ${totalSteps} ${t('wt_step_word', 'LÉPÉS')}`; if (lastStepInfo) { lastStepInfo.stepNum = stepNum; lastStepInfo.totalSteps = totalSteps; }
    document.getElementById('wt-text').innerHTML = text;
    bubbleEl.classList.remove('hidden');
    bubbleEl.style.display = 'block';
  }

  function hideBubble() {
    if (bubbleEl) {
      bubbleEl.classList.add('hidden');
      bubbleEl.style.display = 'none';
    }
  }

  // 5. Egyszerű bemutató pálya felállítása
  function setupDemoCourse() {
    const engine = window.SonarEngine;
    if (!engine || !engine.state) return;

    const st = engine.state;
    st.cols = 10;
    st.rows = 10;
    st.pingsMax = 6;
    st.pingsCur = 6;
    st.streak = 0;
    st.shipPos = { r: 5, c: 9 }; // Jobb szél: 6. sor, J oszlop
    st.bonusTarget = { r: 5, c: 0, type: 'chest' }; // Bal szél: 6. sor, A oszlop (kincs)
    st.secretPath = [
      { r: 5, c: 9 }, { r: 5, c: 8 }, { r: 5, c: 7 }, { r: 5, c: 6 },
      { r: 4, c: 5 }, { r: 4, c: 4 }, { r: 4, c: 3 },
      { r: 5, c: 2 }, { r: 5, c: 1 }, { r: 5, c: 0 }
    ];

    st.grid = [];
    for (let r = 0; r < 10; r++) {
      st.grid[r] = [];
      for (let c = 0; c < 10; c++) {
        st.grid[r][c] = {
          r, c,
          isRock: false,
          rockId: 0,
          rockSize: 0,
          adjacentCount: 0,
          isScanned: false,
          isBonus: (r === 5 && c === 0),
          bonusType: (r === 5 && c === 0) ? 'chest' : null
        };
      }
    }

    // 1 db egyszerű zátony pontosan az (5, 4) mezőn
    st.grid[5][4].isRock = true;
    st.grid[5][4].rockId = 1;
    st.grid[5][4].rockSize = 1;

    // Szomszédsági számok (1-esek a zátony körül)
    const nbs = [
      [4, 3], [4, 4], [4, 5],
      [5, 3],         [5, 5],
      [6, 3], [6, 4], [6, 5]
    ];
    nbs.forEach(([nr, nc]) => {
      st.grid[nr][nc].adjacentCount = 1;
    });

    st.path = [{ r: 5, c: 9 }];
    st.markedRocks = new Set();
    st.isGameOver = false;
    st.isWon = false;

    if (window.SonarLetParticles && window.SonarLetParticles.clearUserMarks) {
      window.SonarLetParticles.clearUserMarks();
    }
  }

  // 6. Lépésről lépésre végrehajtás
  async function runStepSequence() {
    if (!isRunning) return;

    // --- 1. LÉPÉS: SZONÁR PÁSZTÁZÁS ---
    lastStepInfo.key = 'wt_step1'; showBubble(1, 5, t('wt_step1', '1. lépés: Válts <b>SZONÁR</b> módra és pásztázd a vizet a hajó előtt!'));
    const btnSonar = document.getElementById('btn-mode-sonar');
    await moveCursorToElement(btnSonar);
    if (!isRunning) return;
    await clickAnimation();
    btnSonar.click();

    await wait(600);
    if (!isRunning) return;

    // Mutató rámegy a radarra a zátony előtti (5, 5) mezőre
    await moveCursorToGridCell(5, 5);
    if (!isRunning) return;
    await clickAnimation();
    // Valós radar kattintás -> elindul a zöld hullám és a mélytengeri hang!
    clickRadarCell(5, 5);

    // VÁRUNK 1200 ms-ot, amikor a hullám a legnagyobb kiterjedésében van (eléri az 5,4 zátonyt és a szomszédokat)!
    await wait(1200);
    if (!isRunning) return;

    // --- 2. LÉPÉS: PRINT SCREEN (PS) & GOMBOK ---
    lastStepInfo.key = 'wt_step2'; showBubble(2, 5, t('wt_step2', '2. lépés: A hullám gyorsan lecseng! Nyomd meg a <b>Pillanatkép (PS)</b> gombot a hullámkép rögzítéséhez a mini képernyőre!'));
    const btnPs = document.getElementById('btn-num-ps');
    await moveCursorToElement(btnPs);
    if (!isRunning) return;
    await clickAnimation();
    btnPs.click(); // Rögzíti a kiterjedt hullámképet a mini CRT-re!

    await wait(1600);
    if (!isRunning) return;

    // Gomb kijelölés (1-es gomb a gombsoron)
    lastStepInfo.key = 'wt_step3'; showBubble(2, 5, t('wt_step3', '3. lépés: A mini képernyőről leolvasható az 1-es jelzés. Jelöld meg a gombsorral a radaron!'));
    const btn1 = document.getElementById('btn-num-1');
    await moveCursorToElement(btn1);
    if (!isRunning) return;
    await clickAnimation();
    btn1.click(); // Aktiválja az 1-es számot

    // Rákattint a radaron az (5, 5) mezőre -> beíródik a maradandó 1-es!
    await moveCursorToGridCell(5, 5);
    if (!isRunning) return;
    await clickAnimation();
    clickRadarCell(5, 5);

    await wait(1100);
    if (!isRunning) return;

    // --- 3. LÉPÉS: TÉRKÉP MÓD & ZÁTONY JELÖLÉS ---
    lastStepInfo.key = 'wt_step4'; showBubble(3, 5, t('wt_step4', '4. lépés: Válts <b>TÉRKÉP</b> módra és jelöld be a veszélyes zátonyt (X)!'));
    const btnMap = document.getElementById('btn-mode-map');
    await moveCursorToElement(btnMap);
    if (!isRunning) return;
    await clickAnimation();
    btnMap.click();

    await wait(600);
    if (!isRunning) return;

    // Zátony megjelölése (5, 4) cellán -> megjelenik a piros X a radaron!
    await moveCursorToGridCell(5, 4);
    if (!isRunning) return;
    await clickAnimation();
    clickRadarCell(5, 4);

    await wait(1200);
    if (!isRunning) return;

    // --- 4. LÉPÉS: ÚTVONALTERVEZÉS ---
    lastStepInfo.key = 'wt_step5'; showBubble(4, 5, t('wt_step5', '5. lépés: <b>ÚTVONAL</b> módban rajzolj tiszta utat a kincsig, kikerülve a zátonyt!'));
    const btnRoute = document.getElementById('btn-mode-route');
    await moveCursorToElement(btnRoute);
    if (!isRunning) return;
    await clickAnimation();
    btnRoute.click();

    await wait(600);
    if (!isRunning) return;

    // Útvonal végighúzása celláról cellára a hajótól (5, 9) indulva a kincsig (5, 0)
    const routeCells = [
      [5, 9], [5, 8], [5, 7], [5, 6],
      [4, 5], [4, 4], [4, 3],
      [5, 2], [5, 1], [5, 0]
    ];

    for (const [rr, cc] of routeCells) {
      if (!isRunning) return;
      await moveCursorToGridCell(rr, cc);
      clickRadarCell(rr, cc); // Hozzáadja az útvonalhoz és kirajzolja a zöld vonalat!
      await wait(280);
    }

    await wait(900);
    if (!isRunning) return;

    // --- 5. LÉPÉS: START ---
    lastStepInfo.key = 'wt_step6'; showBubble(5, 5, t('wt_step6', '6. lépés: Indítsd el a hajót a <b>START</b> gombbal és gyűjtsd be a bónuszt!'));
    const btnStart = document.getElementById('btn-mode-start');
    await moveCursorToElement(btnStart);
    if (!isRunning) return;
    await clickAnimation();
    btnStart.click(); // Elindítja a hajó vitorlázását a kirajzolt útvonalon!

    // Végigvárjuk a hajó átkelését (kb. 4.2 másodperc)
    await wait(4200);
    if (!isRunning) return;

    // --- BEFEJEZÉS: SIKER MODAL ---
    hideBubble();
    if (cursorEl) cursorEl.style.display = 'none';
    if (completeModalEl) {
      completeModalEl.style.display = 'flex';
      completeModalEl.classList.remove('hidden');
    }
  }

  function startWalkthrough() {
    isRunning = true;
    isPaused = false;
    createUI();

    // 1. Azonnal befejezzük a nyitó szöveges animációt, hogy a radar GRID állapotba lépjen és azonnal reagáljon a kattintásokra!
    if (window.SonarLetParticles && window.SonarLetParticles.finishMorphNow) {
      window.SonarLetParticles.finishMorphNow();
    }

    // 2. Frissítjük a gomb feliratát induláskor
    const pBtn = document.getElementById('wt-pause-btn');
    if (pBtn) {
      pBtn.innerHTML = '⏸ Pause';
      pBtn.style.color = '#8aff70';
      pBtn.style.borderColor = 'rgba(57,255,20,0.5)';
      pBtn.style.background = 'rgba(57,255,20,0.12)';
    }

    // 3. Bezárjuk az infó panelt ha nyitva van
    const infoBox = document.getElementById('crt-info-overlay');
    const imgInfoDown = document.getElementById('img-switch-info-down');
    if (infoBox && !infoBox.classList.contains('hidden')) {
      infoBox.classList.add('hidden');
      if (imgInfoDown) imgInfoDown.classList.remove('hidden');
      const crtEl = document.getElementById('let-crt-canvas');
      if (crtEl) crtEl.classList.remove('invisible');
    }

    setupDemoCourse();
    runStepSequence();
  }


  function triggerScanWipeThenBriefing() {
    if (window.SonarEngine && window.SonarEngine.initCourse) {
      window.SonarEngine.markSonarPlayed();
      window.SonarEngine.initCourse('EASY');
    }
    if (window.SonarLetParticles && window.SonarLetParticles.clearUserMarks) {
      window.SonarLetParticles.clearUserMarks();
    }
    const btnSonar = document.getElementById('btn-mode-sonar');
    if (btnSonar) btnSonar.click();
    const mc = document.getElementById('mini-crt-canvas');
    if (mc) {
      const ctx = mc.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, mc.width, mc.height);
    }

    // 1. CRT Képernyőtörés animáció a radaron (zöld foszfor pásztázó nyaláb)
    const canvas = document.getElementById('let-crt-canvas');
    if (!canvas) {
      startBriefingLogbook();
      return;
    }

    const wipeStart = performance.now();
    const wipeDuration = 480;

    function renderWipeFrame(now) {
      const elapsed = now - wipeStart;
      const progress = Math.min(1.0, elapsed / wipeDuration);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const w = canvas.width;
        const h = canvas.height;
        const scanY = h * progress;

        ctx.save();
        ctx.fillStyle = 'rgba(2, 8, 4, 0.45)';
        ctx.fillRect(0, 0, w, scanY);

        const grad = ctx.createLinearGradient(0, scanY - 14, 0, scanY + 14);
        grad.addColorStop(0, 'rgba(57, 255, 20, 0)');
        grad.addColorStop(0.5, 'rgba(110, 255, 175, 0.95)');
        grad.addColorStop(1, 'rgba(57, 255, 20, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, scanY - 14, w, 28);
        ctx.restore();
      }

      if (progress < 1.0) {
        requestAnimationFrame(renderWipeFrame);
      } else {
        // 2. Utána az első hajónapló gépelése
        startBriefingLogbook();
      }
    }

    requestAnimationFrame(renderWipeFrame);
  }

  function startBriefingLogbook() {
    const d = window.SonarI18n ? window.SonarI18n.dict() : null;
    const t = (k, v) => (window.SonarI18n ? window.SonarI18n.t(k, v) : k);
    const reasons = (d && d.weather_reasons) || (window.SonarConfig && window.SonarConfig.WEATHER_REASONS) || [];
    const reason = reasons[Math.floor(Math.random() * reasons.length)] || '';

    const rc = (window.SonarEngine && window.SonarEngine.state && window.SonarEngine.state.rockCounts) || { small: 4, medium: 2, large: 1, wreck: 0 };
    const obsLines = [
      t('briefing_obs_1', { n: rc.small }),
      t('briefing_obs_2', { n: rc.medium }),
      t('briefing_obs_3', { n: rc.large })
    ];
    if (rc.wreck > 0) obsLines.push(t('briefing_obs_4', { n: rc.wreck }));

    const briefingLines = [
      t('briefing_header', 'HAJÓNAPLÓ JELENTÉS:'),
      reason,
      '',
      t('briefing_obs_header', 'A szonár által azonosított akadályok:'),
      ...obsLines,
      t('briefing_goal_note', 'Cél: tiszta útvonal tervezése a biztonságos átkeléshez.'),
      '',
      t('briefing_click_hint', '[Kattints a képernyőre a szonárháló bekapcsolásához]')
    ];

    if (window.SonarLetParticles && window.SonarLetParticles.setText) {
      window.SonarLetParticles.setText(briefingLines, 30, () => {
        document.getElementById('screen-nav-bar')?.classList.remove('hidden');
        document.getElementById('screen-nav-bar')?.classList.add('flex');
      });
    }
  }

  function stopWalkthrough(startNewGame = true) {
    isRunning = false;
    isPaused = false;
    if (pausePromiseResolve) {
      pausePromiseResolve();
      pausePromiseResolve = null;
    }

    hideBubble();
    if (cursorEl) {
      cursorEl.classList.add('hidden');
      cursorEl.style.display = 'none';
    }
    if (completeModalEl) {
      completeModalEl.classList.add('hidden');
      completeModalEl.style.display = 'none';
    }

    if (startNewGame) {
      triggerScanWipeThenBriefing();
    }
  }

  return {
    start: startWalkthrough,
    stop: stopWalkthrough,
    togglePause: togglePause,
    isRunning: () => isRunning,
    isPaused: () => isPaused
  };
})();
