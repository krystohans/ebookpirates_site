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
  let nextPromiseResolve = null;
  let nextEnableTimer = null;
  let pendingStepAction = null;
  let cursorEl = null;
  let bubbleEl = null;
  let completeModalEl = null;

  const TOTAL_STEPS = 8;
  let lastStepInfo = { stepNum: 1, totalSteps: TOTAL_STEPS, key: 'wt_step1' };

  window.addEventListener('sonar:language-changed', () => {
    if (bubbleEl && !bubbleEl.classList.contains('hidden') && lastStepInfo) {
      document.getElementById('wt-counter').textContent = lastStepInfo.stepNum === 0
        ? t('wt_audio_title', 'HANGVEZÉRLŐK')
        : `${lastStepInfo.stepNum} / ${lastStepInfo.totalSteps} ${t('wt_step_word', 'LÉPÉS')}`;
      document.getElementById('wt-text').innerHTML = t(lastStepInfo.key, '');
      const nextBtn = document.getElementById('wt-next-btn');
      if (nextBtn) nextBtn.textContent = t('wt_next_btn', 'Tovább ▶');
      const backBtn = document.getElementById('wt-back-btn');
      if (backBtn) backBtn.textContent = t('wt_back_btn', '◀ Vissza');
    }
    const subEl = document.getElementById('wt-complete-sub');
    if (subEl) subEl.textContent = t('wt_complete_sub', '');
    const startBtn = document.getElementById('wt-start-real-btn');
    if (startBtn) startBtn.textContent = t('wt_start_game_btn', 'JÁTÉK INDÍTÁSA');
    const replayBtn = document.getElementById('wt-replay-btn');
    if (replayBtn) replayBtn.textContent = t('wt_replay_btn', '▶ BEMUTATÓ');
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
    if (!isPaused && pausePromiseResolve) {
      const res = pausePromiseResolve;
      pausePromiseResolve = null;
      res();
    }
  }

  async function wait(ms) {
    let elapsed = 0;
    const step = 40;
    while (elapsed < ms && isRunning && !pendingStepAction) {
      while (isPaused && isRunning && !pendingStepAction) {
        await new Promise(r => { pausePromiseResolve = r; });
      }
      await new Promise(r => setTimeout(r, step));
      elapsed += step;
    }
  }

  function closeInfoOverlayIfOpen() {
    const infoBox = document.getElementById('crt-info-overlay');
    const imgInfoDown = document.getElementById('img-switch-info-down');
    if (infoBox && !infoBox.classList.contains('hidden')) {
      infoBox.classList.add('hidden');
      if (imgInfoDown) imgInfoDown.classList.remove('hidden');
      const crtEl = document.getElementById('let-crt-canvas');
      if (crtEl) crtEl.classList.remove('invisible');
    }
  }

  function showCompleteModal() {
    isRunning = false;
    isPaused = false;
    if (nextEnableTimer) { clearTimeout(nextEnableTimer); nextEnableTimer = null; }
    if (pausePromiseResolve) { pausePromiseResolve(); pausePromiseResolve = null; }
    if (nextPromiseResolve) { nextPromiseResolve('close'); nextPromiseResolve = null; }
    closeInfoOverlayIfOpen();
    hideBubble();
    if (cursorEl) { cursorEl.classList.add('hidden'); cursorEl.style.display = 'none'; }
    if (completeModalEl) {
      const startBtn = document.getElementById('wt-start-real-btn');
      if (startBtn) startBtn.textContent = t('wt_start_game_btn', 'JÁTÉK INDÍTÁSA');
      const replayBtn = document.getElementById('wt-replay-btn');
      if (replayBtn) replayBtn.textContent = t('wt_replay_btn', '▶ BEMUTATÓ');
      completeModalEl.style.display = 'flex';
      completeModalEl.classList.remove('hidden');
    }
  }

  function waitForStepAction(stepNum, delayMs = 1000) {
    return new Promise(resolve => {
      if (!isRunning) return resolve('close');
      if (pendingStepAction) {
        const act = pendingStepAction;
        pendingStepAction = null;
        return resolve(act);
      }
      const nextBtn = document.getElementById('wt-next-btn');
      const backBtn = document.getElementById('wt-back-btn');
      if (backBtn) {
        backBtn.textContent = t('wt_back_btn', '◀ Vissza');
        backBtn.style.visibility = stepNum <= 0 ? 'hidden' : 'visible';
        backBtn.disabled = stepNum <= 0;
      }
      if (nextBtn && !nextEnableTimer) {
        nextBtn.textContent = t('wt_next_btn', 'Tovább ▶');
        nextBtn.style.visibility = 'visible';
        nextBtn.disabled = false;
      }
      nextPromiseResolve = resolve;
    });
  }

  // 1. Vizuális elemek: lebegő mutató kéz, keskenyebb magyarázó panel (SM/SS/GM/GS szabadon!), jobb felső ✕, Vissza/Tovább és záró modal
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
      // Keskenyebb panel (left: 53.0%, width: 28.0% -> 81.0%-nál véget ér, így a jobb oldali SM/SS/GM/GS hangcsúszkák végig elérhetők!)
      bubbleEl.style.cssText = 'position:absolute;left:53.0%;top:31%;width:28.0%;max-width:345px;min-width:255px;background:rgba(4,14,8,0.97);border:2px solid #39ff14;border-radius:12px;padding:14px 16px;color:#8aff70;box-shadow:0 0 28px rgba(57,255,20,0.48);backdrop-filter:blur(5px);pointer-events:auto;z-index:9998;transition:opacity 0.25s ease, left 0.35s ease, top 0.35s ease;';
      bubbleEl.innerHTML = `
        <div style="border-bottom:1px solid rgba(57,255,20,0.35);padding-bottom:6px;margin-bottom:9px;display:flex;justify-content:space-between;align-items:center;">
          <span id="wt-counter" style="font-size:11.5px;letter-spacing:1.4px;font-weight:bold;color:#bfffab;">BEMUTATÓ</span>
          <button id="wt-close-x" title="Bezárás" style="width:22px;height:22px;line-height:18px;text-align:center;font-size:13px;font-weight:bold;color:#ff9933;border:1px solid rgba(255,153,51,0.55);border-radius:4px;background:rgba(255,153,51,0.12);cursor:pointer;padding:0;">✕</button>
        </div>
        <div id="wt-text" style="font-size:13.5px;color:#e8ffe5;line-height:1.5;min-height:84px;"></div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;padding-top:9px;border-top:1px solid rgba(57,255,20,0.28);gap:8px;">
          <button id="wt-back-btn" style="font-size:12.5px;color:#8aff70;border:1px solid rgba(57,255,20,0.55);border-radius:6px;padding:7px 12px;background:rgba(57,255,20,0.12);cursor:pointer;font-weight:bold;visibility:hidden;">${t('wt_back_btn', '◀ Vissza')}</button>
          <button id="wt-next-btn" style="flex:1;font-size:13.5px;color:#041208;border:1px solid #39ff14;border-radius:6px;padding:7px 14px;background:#39ff14;cursor:pointer;font-weight:bold;letter-spacing:0.6px;box-shadow:0 0 12px rgba(57,255,20,0.45);visibility:hidden;">${t('wt_next_btn', 'Tovább ▶')}</button>
        </div>
      `;
      opWin.appendChild(bubbleEl);
      document.getElementById('wt-next-btn').addEventListener('click', () => {
        const btn = document.getElementById('wt-next-btn');
        if (btn) { btn.style.visibility = 'hidden'; btn.disabled = true; }
        if (nextPromiseResolve) {
          const res = nextPromiseResolve;
          nextPromiseResolve = null;
          res('next');
        } else {
          pendingStepAction = 'next';
        }
      });
      document.getElementById('wt-back-btn').addEventListener('click', () => {
        if (nextEnableTimer) { clearTimeout(nextEnableTimer); nextEnableTimer = null; }
        if (nextPromiseResolve) {
          const res = nextPromiseResolve;
          nextPromiseResolve = null;
          res('back');
        } else {
          pendingStepAction = 'back';
        }
      });
      document.getElementById('wt-close-x').addEventListener('click', () => {
        showCompleteModal();
      });
    }

    if (!completeModalEl) {
      completeModalEl = document.createElement('div');
      completeModalEl.id = 'walkthrough-complete-modal';
      completeModalEl.className = 'absolute inset-0 z-50 flex items-center justify-center hidden';
      completeModalEl.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.82);display:none;align-items:center;justify-content:center;z-index:10000;';
      completeModalEl.innerHTML = `
        <div style="background:#07140b;border:2px solid #39ff14;border-radius:14px;padding:26px 32px;max-width:480px;width:90%;text-align:center;box-shadow:0 0 35px rgba(57,255,20,0.5);font-family:monospace;">
          <div style="color:#8aff70;font-size:20px;font-weight:bold;letter-spacing:2px;margin-bottom:12px;">🏆 ${t('wt_complete', 'Készen állsz a tengeri küldetésre!')}</div>
          <div id="wt-complete-sub" style="color:#bfffab;font-size:14.5px;line-height:1.55;margin-bottom:22px;">${t('wt_complete_sub', 'Most már mindent tudsz a szonár kezeléséről, a mini CRT rögzítéséről és a zátonyok kikerüléséről. Kezdődjék a valódi küldetés!')}</div>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <button id="wt-replay-btn" style="background:rgba(57,255,20,0.14);color:#8aff70;font-weight:bold;font-size:14px;letter-spacing:1.2px;padding:10px 20px;border-radius:8px;border:1.5px solid #39ff14;cursor:pointer;">${t('wt_replay_btn', '▶ BEMUTATÓ')}</button>
            <button id="wt-start-real-btn" style="background:#2eb85c;color:#000;font-weight:bold;font-size:15px;letter-spacing:1.5px;padding:10px 24px;border-radius:8px;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(46,184,92,0.6);">${t('wt_start_game_btn', 'JÁTÉK INDÍTÁSA')}</button>
          </div>
        </div>
      `;
      opWin.appendChild(completeModalEl);
      document.getElementById('wt-start-real-btn').addEventListener('click', () => {
        completeModalEl.style.display = 'none';
        stopWalkthrough(true);
      });
      document.getElementById('wt-replay-btn').addEventListener('click', () => {
        completeModalEl.style.display = 'none';
        completeModalEl.classList.add('hidden');
        startWalkthrough();
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

      setTimeout(resolve, 650);
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

      setTimeout(resolve, 480);
    });
  }

  // 4. Valós kattintás szimulálása a radar cellájára (mousemove -> click)
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

    canvas.dispatchEvent(new MouseEvent('mousemove', { clientX, clientY, bubbles: true }));
    canvas.dispatchEvent(new MouseEvent('click', { clientX, clientY, bubbles: true }));
  }

  function clickAnimation() {
    return new Promise(resolve => {
      if (!cursorEl) return resolve();
      cursorEl.style.transform = 'scale(0.82)';
      setTimeout(() => {
        cursorEl.style.transform = 'scale(1)';
        resolve();
      }, 150);
    });
  }

  function showBubble(stepNum, totalSteps, text, posOverride = null) {
    createUI();
    if (!bubbleEl) return;
    pendingStepAction = null;
    if (nextEnableTimer) { clearTimeout(nextEnableTimer); nextEnableTimer = null; }
    document.getElementById('wt-counter').textContent = stepNum === 0
      ? t('wt_audio_title', 'HANGVEZÉRLŐK')
      : `${stepNum} / ${totalSteps} ${t('wt_step_word', 'LÉPÉS')}`;
    if (lastStepInfo) { lastStepInfo.stepNum = stepNum; lastStepInfo.totalSteps = totalSteps; }
    document.getElementById('wt-text').innerHTML = text;
    if (posOverride) {
      bubbleEl.style.left = posOverride.left;
      bubbleEl.style.top = posOverride.top;
    } else {
      bubbleEl.style.left = '53.0%';
      bubbleEl.style.top = '31%';
    }
    const nextBtn = document.getElementById('wt-next-btn');
    if (nextBtn) {
      nextBtn.textContent = t('wt_next_btn', 'Tovább ▶');
      nextBtn.style.visibility = 'hidden';
      nextBtn.disabled = true;
    }
    const backBtn = document.getElementById('wt-back-btn');
    if (backBtn) {
      backBtn.textContent = t('wt_back_btn', '◀ Vissza');
      backBtn.style.visibility = stepNum <= 0 ? 'hidden' : 'visible';
      backBtn.disabled = stepNum <= 0;
    }
    bubbleEl.classList.remove('hidden');
    bubbleEl.style.display = 'block';
    // Pontosan 1 másodperc múlva megjelenik a Tovább ▶ gomb (a panel felnyílásától mérve!)
    nextEnableTimer = setTimeout(() => {
      nextEnableTimer = null;
      if (isRunning && nextBtn) {
        nextBtn.style.visibility = 'visible';
        nextBtn.disabled = false;
      }
    }, 1000);
  }

  function hideBubble() {
    if (bubbleEl) {
      bubbleEl.classList.add('hidden');
      bubbleEl.style.display = 'none';
    }
  }

  // 5. Determinisztikus, 100%-ban valós bemutató pálya (nem random!)
  //    Hajó: (5, 9), Kincs: (2, 0) (szándékosan NEM a legrövidebb 5. sorban!),
  //    2 szomszédos zátony: (5, 4) és (5, 3) -> így maga a zátony is kap 1-es számot!
  function setupDemoCourse() {
    const engine = window.SonarEngine;
    if (!engine || !engine.state) return;

    const st = engine.state;
    st.cols = 10;
    st.rows = 10;
    st.pingsMax = 8;
    st.pingsCur = 8;
    st.hullMax = 3;
    st.hullCur = 3;
    st.crashesThisCourse = 0;
    st.phase = 'PLANNING';
    st.playerPath = [];
    st.bonusType = 'CHEST';
    st.bonusIcon = 'CHEST';

    st.secretPath = [
      { r: 5, c: 9 }, { r: 5, c: 8 }, { r: 5, c: 7 }, { r: 5, c: 6 },
      { r: 4, c: 5 }, { r: 3, c: 4 }, { r: 2, c: 3 },
      { r: 2, c: 2 }, { r: 2, c: 1 }, { r: 2, c: 0 }
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
          isFogged: true,
          isPath: false,
          isStart: (r === 5 && c === 9),
          isGoal: (r === 2 && c === 0)
        };
      }
    }

    st.grid[5][9].isFogged = false;
    st.grid[2][0].isFogged = false;
    st.ship = { x: 9, y: 5, angle: 0 };

    // 2 szomszédos zátony: (5, 4) és (5, 3) -> mindkettő mellett 1 másik zátony van!
    st.grid[5][4].isRock = true; st.grid[5][4].rockId = 1; st.grid[5][4].rockSize = 2;
    st.grid[5][3].isRock = true; st.grid[5][3].rockId = 1; st.grid[5][3].rockSize = 2;

    // Valódi 8-szomszédos zátonyszámítás minden cellára (a zátonyokra is!)
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        let cnt = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < 10 && nc >= 0 && nc < 10 && st.grid[nr][nc].isRock) cnt++;
          }
        }
        st.grid[r][c].adjacentCount = cnt;
      }
    }

    if (window.SonarOscilloscope && window.SonarOscilloscope.setPower) {
      window.SonarOscilloscope.setPower(1);
    }
    if (window.SonarLetParticles && window.SonarLetParticles.clearUserMarks) {
      window.SonarLetParticles.clearUserMarks();
      window.SonarLetParticles.capturePrintScreen?.();
    }
  }

  // 6. Kattintásos ("◀ Vissza" / "Tovább ▶") interaktív bemutató – számozatlan Hangvezérlők + 8 átfogó lépés
  async function runStepSequence() {
    if (!isRunning) return;
    let stepIdx = -1;

    while (isRunning && stepIdx < TOTAL_STEPS) {
      closeInfoOverlayIfOpen();

      if (stepIdx === -1) {
        // --- SZÁMOZÁS NÉLKÜLI BEVEZETŐ: HANGERŐ POTIK (SM FELHÚZÁSA 1/3-IG) ---
        setupDemoCourse();
        lastStepInfo.key = 'wt_step0';
        showBubble(0, TOTAL_STEPS, t('wt_step0', 'Hangerő szabályzók'));
        const smTrack = document.querySelector('[data-fader-track="SM"]');
        if (smTrack) {
          await moveCursorToElement(smTrack, 0.5, 0.96);
          if (!isRunning) return;
          await clickAnimation();
          if (typeof window.setSonarFader === 'function') {
            window.setSonarFader('SM', 0.33, true);
          }
          await moveCursorToElement(smTrack, 0.5, 0.67);
        }
      } else if (stepIdx === 0) {
        // --- 1. LÉPÉS: CÉL & SZONÁR PÁSZTÁZÁS (8 szomszéd) ---
        setupDemoCourse();
        lastStepInfo.key = 'wt_step1';
        showBubble(1, TOTAL_STEPS, t('wt_step1', '1. Cél & Szonár'));
        const btnSonar = document.getElementById('btn-mode-sonar');
        await moveCursorToElement(btnSonar);
        if (!isRunning) return;
        await clickAnimation();
        btnSonar.click();
        await wait(300);
        if (!isRunning) return;
        await moveCursorToGridCell(5, 5);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 5);
      } else if (stepIdx === 1) {
        // --- 2. LÉPÉS: SZONÁR ERŐSÍTŐ (2x) & ZÁTONY IS KAP SZÁMOT ---
        lastStepInfo.key = 'wt_step2';
        showBubble(2, TOTAL_STEPS, t('wt_step2', '2. Szonár erősítő & Zátony-számítás'));
        const btnSonar = document.getElementById('btn-mode-sonar');
        if (btnSonar) btnSonar.click();
        const ampEl = document.getElementById('radar-scope-canvas');
        if (ampEl) {
          await moveCursorToElement(ampEl, 0.72, 0.35);
          if (!isRunning) return;
          await clickAnimation();
          if (window.SonarOscilloscope && window.SonarOscilloscope.setPower) {
            window.SonarOscilloscope.setPower(2);
          }
        }
        await wait(400);
        if (!isRunning) return;
        await moveCursorToGridCell(5, 4);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 4);
        await wait(800);
        if (!isRunning) return;
        if (window.SonarOscilloscope && window.SonarOscilloscope.setPower) {
          window.SonarOscilloscope.setPower(1);
        }
      } else if (stepIdx === 2) {
        // --- 3. LÉPÉS: PILLANATKÉP & MINI CRT ---
        lastStepInfo.key = 'wt_step3';
        showBubble(3, TOTAL_STEPS, t('wt_step3', '3. Pillanatkép & Mini CRT'));
        const btnSonar = document.getElementById('btn-mode-sonar');
        if (btnSonar) btnSonar.click();
        await moveCursorToGridCell(5, 5);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 5);
        await wait(650);
        if (!isRunning) return;
        const btnPs = document.getElementById('btn-num-ps');
        await moveCursorToElement(btnPs);
        if (!isRunning) return;
        await clickAnimation();
        btnPs.click();
      } else if (stepIdx === 3) {
        // --- 4. LÉPÉS: 1–6 SZÁMGOMBOK (BEÍRÁS ÉS VISSZATÖRLÉS) ---
        lastStepInfo.key = 'wt_step4';
        showBubble(4, TOTAL_STEPS, t('wt_step4', '4. 1–6 számgombok (beírás & törlés)'));
        const btn1 = document.getElementById('btn-num-1');
        await moveCursorToElement(btn1);
        if (!isRunning) return;
        await clickAnimation();
        btn1.click();
        await moveCursorToGridCell(5, 5);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 5);
        await wait(600);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 5);
        await wait(500);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 5);
      } else if (stepIdx === 4) {
        // --- 5. LÉPÉS: TÉRKÉP MÓD (X ZÁTONY & DUPLA KATTINTÁS = 0 ÜRES VÍZ) ---
        lastStepInfo.key = 'wt_step5';
        showBubble(5, TOTAL_STEPS, t('wt_step5', '5. Térkép mód (X és dupla kattintás = 0)'));
        const btnMap = document.getElementById('btn-mode-map');
        await moveCursorToElement(btnMap);
        if (!isRunning) return;
        await clickAnimation();
        btnMap.click();
        await wait(300);
        if (!isRunning) return;
        await moveCursorToGridCell(5, 4);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(5, 4);
        await wait(400);
        if (!isRunning) return;
        await moveCursorToGridCell(4, 5);
        if (!isRunning) return;
        await clickAnimation();
        clickRadarCell(4, 5);
        await wait(110);
        clickRadarCell(4, 5);
      } else if (stepIdx === 5) {
        // --- 6. LÉPÉS: ÚTVONALTERVEZÉS A VALÓDI KINCSHEZ (2, 0) & KOCKÁZAT ---
        lastStepInfo.key = 'wt_step6';
        showBubble(6, TOTAL_STEPS, t('wt_step6', '6. Útvonaltervezés & Kincs kockázata'));
        const btnRoute = document.getElementById('btn-mode-route');
        await moveCursorToElement(btnRoute);
        if (!isRunning) return;
        await clickAnimation();
        btnRoute.click();
        await wait(300);
        if (!isRunning) return;
        const routeCells = [
          [5, 9], [5, 8], [5, 7], [5, 6],
          [4, 5], [3, 4], [2, 3],
          [2, 2], [2, 1], [2, 0]
        ];
        for (const [rr, cc] of routeCells) {
          if (!isRunning) return;
          await moveCursorToGridCell(rr, cc);
          clickRadarCell(rr, cc);
          await wait(175);
        }
      } else if (stepIdx === 6) {
        // --- 7. LÉPÉS: START, ÜTKÖZÉS & NAVIGÁCIÓS FEJLŐDÉS ---
        lastStepInfo.key = 'wt_step7';
        showBubble(7, TOTAL_STEPS, t('wt_step7', '7. Indítás, Ütközés & Fejlődés'));
        const btnStart = document.getElementById('btn-mode-start');
        await moveCursorToElement(btnStart);
        if (!isRunning) return;
        await clickAnimation();
        btnStart.click();
      } else if (stepIdx === 7) {
        // --- 8. LÉPÉS: INFÓ KAPCSOLÓ BEMUTATÁSA ---
        lastStepInfo.key = 'wt_step8';
        showBubble(8, TOTAL_STEPS, t('wt_step8', '8. Teljes Útmutató (INFÓ)'), { left: '53.0%', top: '31%' });
        const switchInfo = document.getElementById('switch-info');
        if (switchInfo) {
          await moveCursorToElement(switchInfo);
          if (!isRunning) return;
          await clickAnimation();
          switchInfo.click();
        }
      }

      const delayMs = 1000;
      const action = await waitForStepAction(stepIdx + 1, delayMs);
      if (!isRunning || action === 'close') return;

      if (action === 'back') {
        if (stepIdx === 7) {
          closeInfoOverlayIfOpen();
        }
        stepIdx = Math.max(-1, stepIdx - 1);
        if (stepIdx <= 5) {
          setupDemoCourse();
        }
        continue;
      }

      // Ha a 8. lépésnél kattintott Tovább-ra, a kurzor lekapcsolja az INFÓ kapcsolót
      if (stepIdx === 7) {
        const switchInfo = document.getElementById('switch-info');
        const infoBox = document.getElementById('crt-info-overlay');
        if (switchInfo && infoBox && !infoBox.classList.contains('hidden')) {
          await moveCursorToElement(switchInfo);
          if (!isRunning) return;
          await clickAnimation();
          switchInfo.click();
          await wait(300);
        }
      }
      stepIdx++;
    }

    if (!isRunning) return;
    showCompleteModal();
  }

  function startWalkthrough() {
    isRunning = true;
    isPaused = false;
    createUI();

    if (window.SonarLetParticles && window.SonarLetParticles.finishMorphNow) {
      window.SonarLetParticles.finishMorphNow();
    }

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
    if (nextEnableTimer) { clearTimeout(nextEnableTimer); nextEnableTimer = null; }
    if (pausePromiseResolve) {
      pausePromiseResolve();
      pausePromiseResolve = null;
    }
    if (nextPromiseResolve) {
      nextPromiseResolve();
      nextPromiseResolve = null;
    }
    const infoBox = document.getElementById('crt-info-overlay');
    const imgInfoDown = document.getElementById('img-switch-info-down');
    if (infoBox && !infoBox.classList.contains('hidden')) {
      infoBox.classList.add('hidden');
      if (imgInfoDown) imgInfoDown.classList.remove('hidden');
      const crtEl = document.getElementById('let-crt-canvas');
      if (crtEl) crtEl.classList.remove('invisible');
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

  async function demoSelectLanguage(lang) {
    createUI();
    if (cursorEl) {
      cursorEl.classList.remove('hidden');
      cursorEl.style.display = 'block';
    }
    const tbWrap = document.getElementById('portal-topbar-wrapper');
    if (tbWrap && tbWrap.classList.contains('collapsed')) {
      const tgl = document.getElementById('btn-toggle-topbar');
      if (tgl) tgl.click();
      await new Promise(r => setTimeout(r, 350));
    }
    const globeBtn = document.getElementById('header-lang-globe-btn');
    if (globeBtn) {
      await moveCursorToElement(globeBtn);
      await clickAnimation();
      const dd = document.getElementById('header-lang-dropdown');
      if (dd) dd.style.display = 'flex';
      await new Promise(r => setTimeout(r, 400));
      const langBtn = document.querySelector(`#header-lang-dropdown button[data-lang="${lang}"]`);
      if (langBtn) {
        await moveCursorToElement(langBtn);
        await clickAnimation();
      }
      if (typeof window.switchLanguage === 'function') window.switchLanguage(lang);
      if (dd) dd.style.display = 'none';
      await new Promise(r => setTimeout(r, 350));
    } else if (typeof window.switchLanguage === 'function') {
      window.switchLanguage(lang);
    }
    if (cursorEl) {
      cursorEl.classList.add('hidden');
      cursorEl.style.display = 'none';
    }
    showStandaloneIntroPrompt();
  }

  function showStandaloneIntroPrompt() {
    const crtEl = document.getElementById('let-crt-canvas');
    const parentEl = crtEl ? crtEl.parentElement : null;
    if (!parentEl) return;
    let box = document.getElementById('crt-result-overlay');
    if (!box) {
      box = document.createElement('div');
      box.id = 'crt-result-overlay';
      box.className = 'absolute bg-[#040b07]/[0.96] text-[#39ff14] font-mono text-[14px] px-6 py-5 flex flex-col justify-between z-40 pointer-events-auto leading-relaxed';
      box.style.cssText = 'left:-3.2%;right:3.2%;top:-1.6%;bottom:-0.8%;text-shadow:0 0 6px rgba(57,255,20,0.45);';
      parentEl.appendChild(box);
    }
    const t = (k, fb) => (window.SonarI18n ? window.SonarI18n.t(k) : fb);
    const langs = ['hu', 'en', 'de', 'fr', 'es', 'pl', 'ru'];
    const flagsHtml = langs.map(l =>
      `<button type="button" data-prompt-lang="${l}" class="p-1 border border-[#39ff14]/45 hover:border-[#ffd700] rounded bg-[#07160d] hover:bg-[#11331d] cursor-pointer transition-all"><img src="https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/flags/lang_${l}-removebg-preview.png" alt="${l.toUpperCase()}" style="width:28px;height:18px;display:block;object-fit:cover;"></button>`
    ).join('');
    box.innerHTML =
      `<div class="border-b border-[#39ff14]/40 pb-2 text-base font-bold tracking-widest text-[#8aff70]">${t('log_title', 'HAJÓNAPLÓ BEJEGYZÉS')}</div>` +
      `<div class="my-auto flex flex-col items-center gap-5 text-center">` +
        `<div class="text-xl font-bold text-[#bfffab] tracking-wide">${t('info_play_intro', 'Bemutató indítása')}</div>` +
        `<div class="flex justify-center gap-4">` +
          `<button id="btn-intro-prompt-yes" class="px-6 py-2 bg-[#39ff14]/20 hover:bg-[#39ff14]/35 border border-[#39ff14] hover:border-[#ffd700] text-[#bfffab] font-bold text-sm tracking-wider cursor-pointer rounded">${t('an_yes', 'Igen').split('(')[0].trim()}</button>` +
          `<button id="btn-intro-prompt-no" class="px-6 py-2 bg-[#0a1d11] hover:bg-[#163822] border border-[#39ff14]/60 hover:border-[#ffd700] text-[#8aff70] font-bold text-sm tracking-wider cursor-pointer rounded">${t('an_no', 'Nem').split('(')[0].trim()}</button>` +
        `</div>` +
        `<div class="flex flex-wrap justify-center gap-2 pt-2">${flagsHtml}</div>` +
      `</div>` +
      `<div class="border-t border-[#39ff14]/25 pt-1 text-[11px] text-center opacity-60">WXXX_O_L_GEN_NAV_XXX_sn01</div>`;
    box.onclick = null;
    box.classList.remove('hidden');
    crtEl.classList.add('invisible');

    const btnYes = document.getElementById('btn-intro-prompt-yes');
    if (btnYes) btnYes.onclick = (e) => {
      e.stopPropagation();
      box.classList.add('hidden');
      crtEl.classList.remove('invisible');
      startWalkthrough();
    };
    const btnNo = document.getElementById('btn-intro-prompt-no');
    if (btnNo) btnNo.onclick = (e) => {
      e.stopPropagation();
      box.classList.add('hidden');
      crtEl.classList.remove('invisible');
      if (window.SonarEngine && window.SonarEngine.markSonarPlayed) window.SonarEngine.markSonarPlayed();
      if (window.SonarLetParticles && window.SonarLetParticles.finishMorphNow) window.SonarLetParticles.finishMorphNow();
    };
    box.querySelectorAll('button[data-prompt-lang]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const chosen = btn.getAttribute('data-prompt-lang');
        box.classList.add('hidden');
        crtEl.classList.remove('invisible');
        demoSelectLanguage(chosen);
      };
    });
  }

  return {
    start: startWalkthrough,
    stop: stopWalkthrough,
    togglePause: togglePause,
    showStandaloneIntroPrompt: showStandaloneIntroPrompt,
    demoSelectLanguage: demoSelectLanguage,
    isRunning: () => isRunning,
    isPaused: () => isPaused
  };
})();
