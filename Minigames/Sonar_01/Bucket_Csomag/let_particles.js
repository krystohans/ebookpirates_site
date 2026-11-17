/**
 * SONAR_01 - CRT SZÖVEG ÉS LET-POR RÉSZECSKEMOTOR (let_particles.js)
 * Tűéles szöveg -> szétoszló Let-por -> az operating_desk.jpg EREDETI tengeri hálójának használata!
 */

window.SonarLetParticles = (function() {
  let canvas = null;
  let ctx = null;
  let animId = null;

  let textLines = [];
  let particles = [];
  let displayState = 'TEXT'; // 'TEXT', 'MORPHING', 'GRID'
  let morphStartTime = 0;
  let morphDuration = 30000;
  let onMorphComplete = null;

  let gridConfig = { cols: 8, rows: 8 };
  let activeWaves = [];
  let hoveredCell = null; let currentMode = 'SONAR'; let markedCells = new Set(); let persistentHints = new Map(); let routeCells = []; let isSailing = false;
  function getNavSkill() {
    return Math.max(0, Math.min(100, (window.SonarEngine && window.SonarEngine.state && Number(window.SonarEngine.state.navSkill)) || 0));
  }
  const rewardSprites = {};
  [['CHEST', 'assets/images/reward_chest.png'], ['BARREL', 'assets/images/reward_barrel.png'], ['BOTTLE', 'assets/images/reward_bottle.png']].forEach(([k, src]) => {
    const img = new Image(); img.src = src; rewardSprites[k] = img;
  });
  function playSfx(path) {
    try {
      const a = new Audio(path);
      if (window.SonarVolumes && typeof window.SonarVolumes.SS === 'number') a.volume = window.SonarVolumes.SS;
      a.play().catch(() => {});
    } catch (e) {}
  }

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('click', handleScreenClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => { hoveredCell = null; });

    if (!animId) animate();
  }

  function resize() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
    }
  }

  function handleMouseMove(e) {
    gridConfig = { cols: 10, rows: 10 };
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padL = rect.width * 0.0294;
    const padR = rect.width * 0.1173;
    const padT = rect.height * 0.0340;
    const padB = rect.height * 0.0349;
    const gridW = rect.width - padL - padR;
    const gridH = rect.height - padT - padB;

    const c = Math.floor((x - padL) / (gridW / gridConfig.cols));
    const r = Math.floor((y - padT) / (gridH / gridConfig.rows));

    if (c >= 0 && c < gridConfig.cols && r >= 0 && r < gridConfig.rows) {
      hoveredCell = { r, c };
    } else {
      hoveredCell = null;
    }
  }

  function handleScreenClick(e) {
    if (displayState === 'TEXT') {
      startMorphToGrid(10, 10);
    } else if (displayState === 'MORPHING') {
      finishMorphNow();
    }
  }

  function setText(lines, autoMorphSeconds = 30, onComplete = null) {
    textLines = lines;
    displayState = 'TEXT';
    onMorphComplete = onComplete;
    morphDuration = 2200;

    setTimeout(() => {
      if (displayState === 'TEXT') {
        startMorphToGrid(10, 10);
      }
    }, 4500);
  }

  function startMorphToGrid(cols, rows) {
    if (displayState === 'GRID' || displayState === 'MORPHING') return;
    gridConfig = { cols, rows };
    displayState = 'MORPHING';
    morphStartTime = performance.now();

    const w = canvas.width;
    const h = canvas.height;

    // Szövegből szétoszló 1500 részecske
    particles = [];
    const count = 1500;
    for (let i = 0; i < count; i++) {
      const origX = w * 0.08 + Math.random() * (w * 0.84);
      const origY = h * 0.10 + Math.random() * (h * 0.65);

      particles.push({
        x: origX,
        y: origY,
        originX: origX,
        originY: origY,
        targetX: origX + (Math.random() - 0.5) * (w * 0.4),
        targetY: origY + (Math.random() - 0.5) * (h * 0.4),
        size: 1.2 + Math.random() * 1.5,
        alpha: 0.8 + Math.random() * 0.2
      });
    }
  }

  function finishMorphNow() {
    displayState = 'GRID';
    particles = [];
    if (onMorphComplete) onMorphComplete();
  }

  function triggerSonarWave(r, c) {
    if (currentMode === 'MAP') {
      if (hoveredCell) {
        const k = `${hoveredCell.r},${hoveredCell.c}`;
        if (markedCells.has(k)) markedCells.delete(k); else markedCells.add(k);
      }
      return;
    }
    if (currentMode === 'ROUTE') {
      if (!isSailing && hoveredCell) {
        const idx = routeCells.findIndex(p => p.r === hoveredCell.r && p.c === hoveredCell.c);
        if (idx !== -1) {
          routeCells.splice(idx);
        } else if ((routeCells.length === 0 && hoveredCell.c === 9 && Math.abs(hoveredCell.r - ((window.SonarEngine && window.SonarEngine.state.secretPath[0]) ? window.SonarEngine.state.secretPath[0].r : hoveredCell.r)) <= 1) || (routeCells.length > 0 && Math.abs(hoveredCell.r - routeCells[routeCells.length - 1].r) <= 1 && Math.abs(hoveredCell.c - routeCells[routeCells.length - 1].c) <= 1)) {
          routeCells.push({ r: hoveredCell.r, c: hoveredCell.c });
        }
      }
      return;
    }
    if (currentMode !== 'SONAR') return; const tr = hoveredCell ? hoveredCell.r : r, tc = hoveredCell ? hoveredCell.c : c, st = window.SonarEngine && window.SonarEngine.state, g = st && st.grid; if (st) { if (st.pingsCur <= 0 || (g && g[tr] && g[tr][tc] && g[tr][tc].isScanned)) return; if (g && g[tr] && g[tr][tc]) g[tr][tc].isScanned = true; st.pingsCur = Math.max(0, st.pingsCur - 1); const cw = new Audio('assets/sounds/clock-wheel.mp3'); cw.volume = 1.0; cw.play().catch(() => {}); setTimeout(() => { cw.pause(); cw.currentTime = 0; }, 1000); if (window.SonarGauges) window.SonarGauges.renderSonarNeedle(st.pingsCur, st.pingsMax); if (st.pingsCur === 0 && window.onSonarOutOfPings) window.onSonarOutOfPings(); } new Audio('assets/sounds/deepsea-sonar.mp3').play().catch(() => {}); if (g && g[tr] && g[tr][tc] && g[tr][tc].isRock) { new Audio('assets/sounds/sonar_short.wav').play().catch(() => {}); setTimeout(() => new Audio('assets/sounds/sonar_short.wav').play().catch(() => {}), 380); }
    const sk = getNavSkill();
    if (sk >= 50 && g && g.length > 0) {
      const pRad = sk >= 90 ? 10 : Math.floor((sk - 50) / 10);
      const pAuto = sk > 90 ? (sk - 90) / 9 : 0;
      for (let rr = 0; rr < gridConfig.rows; rr++) {
        for (let cc = 0; cc < gridConfig.cols; cc++) {
          if (Math.max(Math.abs(rr - tr), Math.abs(cc - tc)) <= pRad && g[rr] && g[rr][cc]) {
            const cell = g[rr][cc];
            const isCenter = (rr === tr && cc === tc);
            const autoRock = pAuto > 0 && cell.isRock && Math.random() < pAuto;
            const txt = autoRock ? 'X' : (isCenter ? (cell.isRock ? 'X' : '0') : String(cell.adjacentCount));
            persistentHints.set(`${rr},${cc}`, { text: txt, isAutoRock: autoRock });
          }
        }
      }
    }
    activeWaves.push({
      r: tr, c: tc,
      startTime: performance.now(),
      duration: 2400 + Math.min(49, sk) * 28
    });
  }

  function animate() {
    render();
    animId = requestAnimationFrame(animate);
  }

  function render() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const now = performance.now();

    // Teljesen transzparens törlés, hogy a háttérben lévő eredeti fotó hálója látszódjon!
    ctx.clearRect(0, 0, w, h);

    // 1. TEXT FÁZIS: TŰÉLES CRT FOSZFOR SZÖVEG
    if (displayState === 'TEXT') {
      ctx.save();
      // Enyhe sötétítés csak a szöveg alatt, hogy tökéletesen olvasható legyen a fotó felett
      ctx.fillStyle = 'rgba(4, 15, 8, 0.75)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 10;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      if (!textLines._wrapped) { const wl = []; textLines.forEach(s => { if (s.length <= 40 || s.startsWith('[')) { wl.push(s); return; } let cur = ''; s.split(' ').forEach(wd => { if ((cur + (cur ? ' ' : '') + wd).length > 40) { if (cur) wl.push(cur); cur = wd; } else { cur += (cur ? ' ' : '') + wd; } }); if (cur) wl.push(cur); }); textLines = wl; textLines._wrapped = true; } const fontSize = Math.max(12, Math.floor(w * 0.031));
      ctx.font = `600 ${fontSize}px 'Share Tech Mono', monospace`;

      const startY = h * 0.12;
      const lineH = fontSize * 1.6;

      textLines.forEach((line, i) => {
        if (line.startsWith('HAJÓNAPLÓ')) {
          ctx.fillStyle = '#00ff88';
          ctx.font = `bold ${fontSize * 1.15}px 'Share Tech Mono', monospace`;
        } else if (line.startsWith('[')) {
          ctx.fillStyle = 'rgba(57, 255, 20, 0.7)';
          ctx.font = `italic ${fontSize * 0.85}px 'Share Tech Mono', monospace`;
        } else if (line.trim().startsWith('•')) {
          ctx.fillStyle = '#ff9933';
          ctx.font = `600 ${fontSize}px 'Share Tech Mono', monospace`;
        } else {
          ctx.fillStyle = '#39ff14';
          ctx.font = `600 ${fontSize}px 'Share Tech Mono', monospace`;
        }
        ctx.fillText(line, w * 0.08, startY + i * lineH);
      });

      if (Math.floor(now / 500) % 2 === 0) {
        ctx.fillRect(w * 0.08, startY + textLines.length * lineH + 4, fontSize * 0.6, fontSize * 0.85);
      }
      ctx.restore();
    }

    // 2. MORPHING FÁZIS: A szöveg finom zöld Let-porrá foszlik szét és elpárolog
    else if (displayState === 'MORPHING') {
      const elapsed = now - morphStartTime;
      const progress = Math.min(1.0, elapsed / morphDuration);

      ctx.save();
      ctx.fillStyle = '#39ff14';
      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 6;

      particles.forEach(p => {
        p.x = p.originX + (p.targetX - p.originX) * progress;
        p.y = p.originY + (p.targetY - p.originY) * progress;
        ctx.globalAlpha = Math.max(0, (1.0 - progress) * p.alpha);
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      ctx.restore();

      if (progress >= 1.0) {
        finishMorphNow();
      }
    }

    // 3. GRID FÁZIS: Az EREDETI FOTÓ HÁLÓJA felett élünk! Nem rajzolunk művi rácsot!
    else if (displayState === 'GRID') {
      const padL = w * 0.0294;
      const padR = w * 0.1173;
      const padT = h * 0.0340;
      const padB = h * 0.0349;
      const gridW = w - padL - padR;
      const gridH = h - padT - padB;
      const cellW = gridW / gridConfig.cols;
      const cellH = gridH / gridConfig.rows;

      // Egér föléhúzás finom kiemelése
      if (hoveredCell) {
        ctx.save();
        ctx.fillStyle = 'rgba(57, 255, 20, 0.15)';
        ctx.strokeStyle = 'rgba(57, 255, 20, 0.6)';
        ctx.lineWidth = 1.5;
        const hx = padL + hoveredCell.c * cellW;
        const hy = padT + hoveredCell.r * cellH;
        ctx.fillRect(hx, hy, cellW, cellH);
        ctx.strokeRect(hx, hy, cellW, cellH);
        ctx.restore();
      }

      // Navigációs képzettség alapján tartósan megmaradó számok / automatikus sziklajelek (50%+)
      if (persistentHints.size > 0) {
        ctx.save();
        const fontSize = Math.max(12, Math.floor(cellH * 0.46));
        ctx.font = `bold ${fontSize}px 'Share Tech Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        persistentHints.forEach((hint, k) => {
          if (markedCells.has(k)) return;
          const [hr, hc] = k.split(',').map(Number);
          const coveredByWave = activeWaves.some(w => {
            const el = now - w.startTime;
            const wp = el <= 250 ? 0 : (el - 250) / (w.duration - 250);
            const cr = cellW * 0.5 + wp * (cellW * 1.7);
            return (hr === w.r && hc === w.c) || (el > 250 && Math.hypot((hc - w.c) * cellW, (hr - w.r) * cellH) <= cr);
          });
          if (coveredByWave) return;
          ctx.fillStyle = hint.isAutoRock ? 'rgba(255, 110, 64, 0.88)' : 'rgba(110, 255, 175, 0.52)';
          ctx.shadowColor = hint.isAutoRock ? '#ff5500' : '#00ffaa';
          ctx.shadowBlur = hint.isAutoRock ? 8 : 4;
          ctx.fillText(hint.text, padL + hc * cellW + cellW / 2, padT + hr * cellH + cellH / 2);
        });
        ctx.restore();
      }

      // Térkép módban lerakott X jelölések kirajzolása
      if (markedCells.size > 0) {
        ctx.save();
        const fontSize = Math.max(12, Math.floor(cellH * 0.48));
        ctx.font = `bold ${fontSize}px 'Share Tech Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#39ff14';
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 8;
        markedCells.forEach(k => {
          const [mr, mc] = k.split(',').map(Number);
          const coveredByWave = activeWaves.some(w => {
            const el = now - w.startTime;
            const wp = el <= 250 ? 0 : (el - 250) / (w.duration - 250);
            const cr = cellW * 0.5 + wp * (cellW * 1.7);
            return (mr === w.r && mc === w.c) || (el > 250 && Math.hypot((mc - w.c) * cellW, (mr - w.r) * cellH) <= cr);
          });
          if (!coveredByWave) {
            ctx.fillText('X', padL + mc * cellW + cellW / 2, padT + mr * cellH + cellH / 2);
          }
        });
        ctx.restore();
      }

      // Bal szélen végigfutó reptéri fehér fénycsík + nagyobb, pulzáló kifelé mutató nyilacskák
      ctx.save();
      const stripGrad = ctx.createLinearGradient(0, padT, 0, padT + gridH);
      const scanPos = 1 - ((now * 0.00065) % 1.0);
      const p0 = Math.max(0, scanPos - 0.12), p1 = scanPos, p2 = Math.min(1, scanPos + 0.12);
      stripGrad.addColorStop(0, 'rgba(57, 255, 20, 0.28)');
      if (p0 > 0) stripGrad.addColorStop(p0, 'rgba(57, 255, 20, 0.28)');
      stripGrad.addColorStop(p1, 'rgba(255, 255, 255, 0.95)');
      if (p2 < 1) stripGrad.addColorStop(p2, 'rgba(57, 255, 20, 0.28)');
      stripGrad.addColorStop(1, 'rgba(57, 255, 20, 0.28)');
      ctx.strokeStyle = stripGrad;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3.0;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + gridH);
      ctx.stroke();

      // Futó fehér fénypont (reptéri megközelítő fény)
      const beaconY = padT + scanPos * gridH;
      const beaconGlow = ctx.createRadialGradient(padL, beaconY, 0, padL, beaconY, 10);
      beaconGlow.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
      beaconGlow.addColorStop(0.35, 'rgba(220, 255, 235, 0.85)');
      beaconGlow.addColorStop(1, 'rgba(57, 255, 20, 0)');
      ctx.fillStyle = beaconGlow;
      ctx.beginPath();
      ctx.arc(padL, beaconY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(padL, beaconY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      const baseArrowAlpha = 0.35 + 0.40 * (0.5 + 0.5 * Math.sin(now * 0.0045));
      ctx.font = `bold ${Math.max(13, Math.round(cellH * 0.42))}px 'Share Tech Mono', monospace`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      for (let rr = 0; rr < gridConfig.rows; rr++) {
        const ay = padT + rr * cellH + cellH / 2;
        const nearBeacon = Math.max(0, 1 - Math.abs(ay - beaconY) / (cellH * 1.4));
        const aAlpha = Math.min(1, baseArrowAlpha + nearBeacon * 0.45);
        ctx.shadowColor = nearBeacon > 0.35 ? '#ffffff' : '#39ff14';
        ctx.shadowBlur = 6 + nearBeacon * 10;
        ctx.fillStyle = nearBeacon > 0.45
          ? `rgba(255, 255, 255, ${aAlpha.toFixed(3)})`
          : `rgba(110, 255, 90, ${aAlpha.toFixed(3)})`;
        ctx.fillText('◄', padL - 2, ay);
      }
      ctx.restore();

      // Bal margóban az extra jutalom ikon (4x méret, -25px balra, kívül a számozáson)
      const exRew = window.SonarEngine && window.SonarEngine.state && window.SonarEngine.state.extraReward;
      let rewEl = document.getElementById('sonar-extra-reward-icon');
      if (exRew && rewardSprites[exRew.type] && canvas && canvas.parentElement && !(document.getElementById('crt-info-overlay') && !document.getElementById('crt-info-overlay').classList.contains('hidden')) && !(document.getElementById('an-prompt-overlay') && !document.getElementById('an-prompt-overlay').classList.contains('hidden')) && !(document.getElementById('crt-result-overlay') && !document.getElementById('crt-result-overlay').classList.contains('hidden'))) {
        if (!rewEl) {
          rewEl = document.createElement('img');
          rewEl.id = 'sonar-extra-reward-icon';
          rewEl.style.cssText = 'position:absolute;pointer-events:none;z-index:25;filter:drop-shadow(0 0 8px rgba(255,215,0,0.75));object-fit:contain;';
          canvas.parentElement.appendChild(rewEl);
        }
        const targetSrc = rewardSprites[exRew.type].src;
        if (rewEl.src !== targetSrc) rewEl.src = targetSrc;
        const dpr = window.devicePixelRatio || 1;
        const sizePx = Math.round((padL * 0.78 * 3.2) / dpr);
        const leftPx = Math.round((padL * 0.5) / dpr - sizePx / 2 - 30);
        const topPx = Math.round((padT + exRew.row * cellH + cellH / 2) / dpr - sizePx / 2);
        rewEl.style.width = `${sizePx}px`;
        rewEl.style.height = `${sizePx}px`;
        rewEl.style.left = `${leftPx}px`;
        rewEl.style.top = `${topPx}px`;
        rewEl.style.display = 'block';
      } else if (rewEl) {
        rewEl.style.display = 'none';
      }

      // Útvonaltervező módban lerakott útvonal és a jobb oldali induló csónak kirajzolása
      const startPt = (window.SonarEngine && window.SonarEngine.state.secretPath[0]) ? window.SonarEngine.state.secretPath[0] : { r: 4, c: 9 };
      const boatX = padL + gridW + padR * 0.68;
      const boatY = padT + startPt.r * cellH + cellH / 2;
      if (routeCells.length > 0) {
        ctx.save();
        const isAnMode = window.SonarEngine && window.SonarEngine.state.isAutoNav;
        ctx.strokeStyle = isAnMode ? '#ff7700' : '#39ff14';
        ctx.fillStyle = isAnMode ? '#ff7700' : '#39ff14';
        ctx.shadowColor = isAnMode ? '#ff7700' : '#00ff66';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(boatX, boatY);
        routeCells.forEach(p => {
          ctx.lineTo(padL + p.c * cellW + cellW / 2, padT + p.r * cellH + cellH / 2);
        });
        ctx.stroke();
        routeCells.forEach(p => {
          ctx.beginPath();
          ctx.arc(padL + p.c * cellW + cellW / 2, padT + p.r * cellH + cellH / 2, Math.max(3.5, cellW * 0.12), 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
      ctx.save();
      let drawX = window._parkedBoat ? window._parkedBoat.x : boatX, drawY = window._parkedBoat ? window._parkedBoat.y : boatY, drawAng = window._parkedBoat ? window._parkedBoat.ang : 0; const pts = [{ x: boatX, y: boatY, r: startPt.r, c: 9 }, ...routeCells.map(p => ({ x: padL + p.c * cellW + cellW / 2, y: padT + p.r * cellH + cellH / 2, r: p.r, c: p.c }))]; if (window._crashIdx !== undefined && routeCells.length > window._crashIdx) { ctx.save(); ctx.strokeStyle = '#ff00aa'; ctx.fillStyle = '#ff00aa'; ctx.shadowColor = '#ff00aa'; ctx.shadowBlur = 10; ctx.lineWidth = 3.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); const sp = pts[window._crashIdx]; ctx.moveTo(sp.x, sp.y); for (let i = window._crashIdx; i < routeCells.length; i++) ctx.lineTo(padL + routeCells[i].c * cellW + cellW / 2, padT + routeCells[i].r * cellH + cellH / 2); ctx.stroke(); for (let i = window._crashIdx; i < routeCells.length; i++) { ctx.beginPath(); ctx.arc(padL + routeCells[i].c * cellW + cellW / 2, padT + routeCells[i].r * cellH + cellH / 2, Math.max(3.5, cellW * 0.12), 0, Math.PI * 2); ctx.fill(); } ctx.restore(); } if (window._crashedRocks && window._crashedRocks.size > 0) { ctx.save(); const pulseR = cellW * (0.33 + 0.08 * Math.sin(now * 0.008)); const pulseA = 0.65 + 0.35 * Math.sin(now * 0.008); ctx.strokeStyle = `rgba(255, 23, 68, ${pulseA})`; ctx.shadowColor = '#ff0033'; ctx.shadowBlur = 12; ctx.lineWidth = 2.5; window._crashedRocks.forEach(rk => { const [rr, rc] = rk.split(',').map(Number); ctx.beginPath(); ctx.arc(padL + rc * cellW + cellW / 2, padT + rr * cellH + cellH / 2, pulseR, 0, Math.PI * 2); ctx.stroke(); }); ctx.restore(); } if (currentMode === 'START' && !isSailing && routeCells.length > (window._sailStartIdx || 0)) { isSailing = true; window._sailT0 = now; } if (isSailing && routeCells.length > 0) { const sIdx = window._sailStartIdx || 0; const prog = sIdx + (now - (window._sailT0 || now)) / 380; const idx = Math.floor(prog); const t = prog - idx; if (idx < pts.length - 1) { const p0 = pts[idx], p1 = pts[idx + 1]; drawX = p0.x + (p1.x - p0.x) * t; drawY = p0.y + (p1.y - p0.y) * t; drawAng = Math.atan2(p1.y - p0.y, p1.x - p0.x) - Math.PI; const g = window.SonarEngine && window.SonarEngine.state.grid; if (t > 0.35 && g && g[p1.r] && g[p1.r][p1.c] && g[p1.r][p1.c].isRock) { isSailing = false; currentMode = 'ROUTE'; markedCells.add(`${p1.r},${p1.c}`); (window._crashedRocks = window._crashedRocks || new Set()).add(`${p1.r},${p1.c}`); window._parkedBoat = { x: p0.x, y: p0.y, ang: drawAng, r: p0.r, c: p0.c }; window._crashIdx = idx; window._sailStartIdx = idx; routeCells.splice(idx); if (window.SonarEngine) { const st = window.SonarEngine.state; st.hp = Math.max(0, st.hp - 1); st.crashesThisCourse = (st.crashesThisCourse || 0) + 1; if (window.SonarGauges) window.SonarGauges.renderHullNeedle(st.hp, st.maxHp || 10, st.hp < 2); if (st.hp < 2) { playSfx('assets/sounds/failfare.mp3'); if (window.onSonarGameEnd) window.onSonarGameEnd({ status: 'TOWED', hp: st.hp, maxHp: st.maxHp || 10 }); } else { const al = new Audio('assets/sounds/alarm.mp3'); if (window.SonarVolumes) al.volume = window.SonarVolumes.SS; al.play().catch(() => {}); setTimeout(() => { al.pause(); al.currentTime = 0; }, 3580); const btnR = document.getElementById('btn-mode-route'); if (btnR) btnR.click(); } } } } else { const last = pts[pts.length - 1]; isSailing = false; if (last.c === 0 && window.SonarEngine) { const st = window.SonarEngine.state; if (st.isAutoNav) { st.isAutoNav = false; const imgAn = document.getElementById('img-switch-an-down'); if (imgAn) imgAn.classList.remove('hidden'); routeCells = []; markedCells.clear(); persistentHints.clear(); activeWaves = []; window._parkedBoat = null; window._crashIdx = undefined; window._sailStartIdx = 0; if (window._crashedRocks) window._crashedRocks.clear(); const nextMode = window.SonarEngine.getDifficultyForStreak(st.streak); window.SonarEngine.initCourse(nextMode); if (window.SonarGauges) window.SonarGauges.renderSonarNeedle(st.pingsCur, st.pingsMax); const btnS = document.getElementById('btn-mode-sonar'); if (btnS) btnS.click(); } else { playSfx('assets/sounds/victory.mp3'); const gainedNp = window.SonarEngine.calculateWinNavPoints(routeCells.length); st.streak = (st.streak || 0) + 1; st.navPoints = (st.navPoints || 0) + gainedNp; if (window.setOdometerValue) { window.setOdometerValue('odometer-sorozat', st.streak); window.setOdometerValue('odometer-navi', st.navPoints); } const wonExtra = (st.extraReward && last.r === st.extraReward.row) ? st.extraReward : null; routeCells = []; markedCells.clear(); persistentHints.clear(); activeWaves = []; window._parkedBoat = null; window._crashIdx = undefined; window._sailStartIdx = 0; if (window._crashedRocks) window._crashedRocks.clear(); const nextMode = window.SonarEngine.getDifficultyForStreak(st.streak); window.SonarEngine.initCourse(nextMode); if (window.SonarGauges) window.SonarGauges.renderSonarNeedle(st.pingsCur, st.pingsMax); const btnS = document.getElementById('btn-mode-sonar'); if (btnS) btnS.click(); if (window.onSonarGameEnd) window.onSonarGameEnd({ status: 'WIN', navPoints: gainedNp, extraReward: wonExtra, hp: st.hp, maxHp: st.maxHp || 10, streak: st.streak }); } } else { window._parkedBoat = { x: last.x, y: last.y, ang: drawAng, r: last.r, c: last.c }; window._sailStartIdx = pts.length - 1; const btnR = document.getElementById('btn-mode-route'); if (btnR) btnR.click(); } } } ctx.translate(drawX, drawY); ctx.rotate(drawAng);
      ctx.strokeStyle = '#39ff14';
      ctx.fillStyle = 'rgba(57, 255, 20, 0.22)';
      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.8;
      const bw = cellW * 0.56, bh = cellH * 0.34;
      ctx.beginPath();
      ctx.moveTo(-bw * 0.55, 0);
      ctx.quadraticCurveTo(-bw * 0.15, -bh * 0.5, bw * 0.45, -bh * 0.38);
      ctx.lineTo(bw * 0.45, bh * 0.38);
      ctx.quadraticCurveTo(-bw * 0.15, bh * 0.5, -bw * 0.55, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#39ff14';
      ctx.beginPath();
      ctx.arc(bw * 0.05, 0, Math.max(2, bh * 0.16), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Szonár hanghullám-ívek terjedése
      if (activeWaves.length > 0) {
        renderWaves(padL, padT, cellW, cellH, now);
      }
    }
  }

  function renderWaves(padX, padY, cellW, cellH, now) {
    const grid = window.SonarEngine && window.SonarEngine.state ? window.SonarEngine.state.grid : null;
    activeWaves = activeWaves.filter(wave => {
      const elapsed = now - wave.startTime;
      if (elapsed >= wave.duration) return false;

      const delayMs = 250;
      const waveProg = elapsed <= delayMs ? 0 : (elapsed - delayMs) / (wave.duration - delayMs);
      const sk = getNavSkill();
      const minR = cellW * 0.5;
      const maxR = sk >= 90 ? cellW * 15 : (sk >= 50 ? cellW * (2.2 + ((sk - 50) / 40) * 3.5) : cellW * (2.0 + (sk / 49) * 1.0));
      const curR = minR + waveProg * (maxR - minR);
      const alpha = elapsed <= delayMs ? 1.0 : Math.max(0, 1.0 - Math.pow(waveProg, 1.35) * 0.92);

      const cx = padX + wave.c * cellW + cellW / 2;
      const cy = padY + wave.r * cellH + cellH / 2;

      ctx.save();
      if (elapsed > delayMs) {
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#39ff14';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.arc(cx, cy, curR, 0, Math.PI * 2);
        ctx.stroke();

        if (curR > cellW * 0.85) {
          ctx.beginPath();
          ctx.arc(cx, cy, curR - cellW * 0.45, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.45})`;
          ctx.stroke();
        }
      }

      if (grid && grid.length > 0) {
        const fontSize = Math.max(12, Math.floor(cellH * 0.46));
        ctx.font = `bold ${fontSize}px 'Share Tech Mono', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 8;

        for (let r = 0; r < gridConfig.rows; r++) {
          for (let c = 0; c < gridConfig.cols; c++) {
            const isTarget = (r === wave.r && c === wave.c);
            const dist = Math.hypot((c - wave.c) * cellW, (r - wave.r) * cellH);
            if (isTarget || (elapsed > delayMs && dist <= curR)) {
              const count = grid[r] && grid[r][c] ? (isTarget ? (grid[r][c].isRock ? 'X' : '0') : grid[r][c].adjacentCount) : 0;
              const tx = padX + c * cellW + cellW / 2;
              const ty = padY + r * cellH + cellH / 2;
              ctx.fillText(String(count), tx, ty);
            }
          }
        }
      }
      ctx.restore();
      return true;
    });
  }

  function triggerAutoNav() {
    if (!window.SonarEngine || !window.SonarEngine.state) return;
    const st = window.SonarEngine.state;
    playSfx('assets/sounds/failfare.mp3');
    st.isAutoNav = true;
    const avoidRow = st.extraReward ? st.extraReward.row : null;
    const startPt = st.secretPath && st.secretPath[0] ? st.secretPath[0] : { r: 4, c: 9 };
    const sr = window._parkedBoat && typeof window._parkedBoat.r === 'number' ? window._parkedBoat.r : startPt.r;
    const sc = window._parkedBoat && typeof window._parkedBoat.c === 'number' ? window._parkedBoat.c : 9;
    const safeSuffix = window.SonarEngine.findSafePathFrom(sr, sc, avoidRow);
    const keepPrefix = window._parkedBoat ? routeCells.slice(0, window._sailStartIdx || 0) : [];
    routeCells = [...keepPrefix, ...safeSuffix];
    if (!window._parkedBoat && routeCells.length > 0 && routeCells[0].c !== 9) {
      routeCells.unshift({ r: startPt.r, c: 9 });
    }
    currentMode = 'START';
    isSailing = true;
    window._sailT0 = performance.now();
    const btnStart = document.getElementById('btn-mode-start');
    if (btnStart) btnStart.click();
  }

  return {
    init,
    setText,
    startMorphToGrid,
    finishMorphNow,
    triggerSonarWave,
    triggerAutoNav,
    getState: () => displayState, setMode: (m) => { currentMode = m; },
    resize
  };
})();
