/**
 * SONAR_01 - Vezérlés és Grafikai Renderelő (Canvas, Animációk & Események)
 */

window.SonarControls = (function() {
  const engine = window.SonarEngine;
  const cfg = window.SONAR_CONFIG;
  const hud = window.SonarHUD;

  let canvas = null;
  let ctx = null;
  let activeTool = 'sonar'; // 'sonar' vagy 'route'

  // Kép-gyorsítótár (Preloaded Sprites)
  const sprites = {};
  const SPRITE_URLS = {
    ship: 'assets/images/ship_simple-r.png',
    rockSmall: 'assets/images/rock_small.png',
    rockMedium: 'assets/images/rock_medium.png',
    rockLarge: 'assets/images/rock_large.png',
    sonarDevice: 'assets/images/sonar_device.png',
    buoy: 'assets/images/perk_buoy.png',
    hp: 'assets/images/hp_boat.png'
  };

  let radarAngle = 0;
  let fogOffset = 0;

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    // Képek betöltése
    for (const [key, url] of Object.entries(SPRITE_URLS)) {
      const img = new Image();
      img.src = url;
      sprites[key] = img;
    }

    setupEvents();
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(renderLoop);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
  }

  function setupEvents() {
    canvas.addEventListener('click', handleCanvasClick);
    
    // Szerszámváltó gombok (Szonár vs Útvonal)
    const btnToolSonar = document.getElementById('tool-sonar');
    const btnToolRoute = document.getElementById('tool-route');

    if (btnToolSonar) {
      btnToolSonar.addEventListener('click', () => {
        activeTool = 'sonar';
        btnToolSonar.classList.add('border-cyan-400', 'bg-cyan-950/60');
        btnToolRoute.classList.remove('border-cyan-400', 'bg-cyan-950/60');
      });
    }

    if (btnToolRoute) {
      btnToolRoute.addEventListener('click', () => {
        activeTool = 'route';
        btnToolRoute.classList.add('border-cyan-400', 'bg-cyan-950/60');
        btnToolSonar.classList.remove('border-cyan-400', 'bg-cyan-950/60');
      });
    }

    // Hajó Indítása Gomb
    const btnLaunch = document.getElementById('btn-launch-ship');
    if (btnLaunch) {
      btnLaunch.addEventListener('click', () => {
        if (engine.launchShip()) {
          hud.updateTopBar();
        }
      });
    }

    // Segítségek Gombjai
    const btnUndo = document.getElementById('btn-perk-undo');
    if (btnUndo) {
      btnUndo.addEventListener('click', () => {
        if (engine.state.perks.undo > 0 && engine.undoLastPathStep()) {
          engine.state.perks.undo--;
          window.SonarAudio.play('sonar_ping', 0.5);
          hud.updateTopBar();
        }
      });
    }

    const btnBuoy = document.getElementById('btn-perk-buoy');
    if (btnBuoy) {
      btnBuoy.addEventListener('click', () => {
        if (engine.state.perks.buoy > 0) {
          // Felfed 3 garantáltan tiszta utat a titkos útvonalból
          const sec = engine.state.secretPath;
          let revealed = 0;
          for (let i = 1; i < sec.length && revealed < 3; i++) {
            const cell = engine.state.grid[sec[i].r][sec[i].c];
            if (cell.isFogged) {
              cell.isFogged = false;
              cell.isScanned = true;
              revealed++;
            }
          }
          engine.state.perks.buoy--;
          window.SonarAudio.play('sonar_ping', 0.8);
          hud.updateTopBar();
        }
      });
    }

    const btnMag = document.getElementById('btn-perk-mag');
    if (btnMag) {
      btnMag.addEventListener('click', () => {
        if (engine.state.perks.magnifier > 0) {
          // Nagyító aktiválása a következő kattintásra
          activeTool = 'magnifier';
          canvas.style.cursor = 'crosshair';
        }
      });
    }
  }

  function handleCanvasClick(e) {
    const s = engine.state;
    if (s.phase !== 'EXPLORING' && s.phase !== 'READY_TO_LAUNCH') return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellW = rect.width / s.cols;
    const cellH = rect.height / s.rows;

    const c = Math.floor(x / cellW);
    const r = Math.floor(y / cellH);

    if (r < 0 || r >= s.rows || c < 0 || c >= s.cols) return;

    if (activeTool === 'magnifier') {
      // 3x3-as terület felfedése
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < s.rows && nc >= 0 && nc < s.cols) {
            s.grid[nr][nc].isFogged = false;
            s.grid[nr][nc].isScanned = true;
          }
        }
      }
      s.perks.magnifier--;
      activeTool = 'sonar';
      canvas.style.cursor = 'default';
      window.SonarAudio.play('sonar_ping', 1.0);
      hud.updateTopBar();
      return;
    }

    if (activeTool === 'sonar') {
      if (engine.scanCell(r, c)) {
        hud.updateTopBar();
      }
    } else if (activeTool === 'route') {
      if (engine.plotPathCell(r, c)) {
        window.SonarAudio.play('sonar_ping', 0.4);
        hud.updateTopBar();
      }
    }
  }

  // Fő Render Ciklus (60 FPS)
  function renderLoop() {
    render();
    updatePhysics();
    requestAnimationFrame(renderLoop);
  }

  function render() {
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    const s = engine.state;

    // 1. Mélytengeri Víz Háttér Batimetrikus Vonalakkal
    ctx.fillStyle = cfg.THEME.SEA_DEEP;
    ctx.fillRect(0, 0, w, h);

    // Finom mélységi hullámok
    ctx.strokeStyle = 'rgba(15, 240, 252, 0.05)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const waveY = (h / 5) * i + Math.sin(fogOffset + i) * 6;
      ctx.moveTo(0, waveY);
      ctx.bezierCurveTo(w * 0.33, waveY - 10, w * 0.66, waveY + 10, w, waveY);
      ctx.stroke();
    }

    const cellW = w / s.cols;
    const cellH = h / s.rows;

    // 2. Rács Vonalak
    ctx.strokeStyle = cfg.THEME.GRID_LINE;
    ctx.lineWidth = 1;
    for (let c = 0; c <= s.cols; c++) {
      ctx.beginPath();
      ctx.moveTo(c * cellW, 0);
      ctx.lineTo(c * cellW, h);
      ctx.stroke();
    }
    for (let r = 0; r <= s.rows; r++) {
      ctx.beginPath();
      ctx.moveTo(0, r * cellH);
      ctx.lineTo(w, r * cellH);
      ctx.stroke();
    }

    // 3. Mezők (Felfedezett elemek és köd)
    for (let r = 0; r < s.rows; r++) {
      for (let c = 0; c < s.cols; c++) {
        const cell = s.grid[r][c];
        const cx = c * cellW;
        const cy = r * cellH;

        // Start és Cél Állomások
        if (cell.isStart) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
          ctx.fillRect(cx, cy, cellW, cellH); ctx.fillStyle = '#34d399'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('⚓ START', cx + cellW / 2, cy + cellH - 8);
        } else if (cell.isGoal) {
          ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
          ctx.fillRect(cx, cy, cellW, cellH); ctx.fillStyle = '#fbbf24'; ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('🏁 CÉL', cx + cellW / 2, cy + cellH - 8);
          // Célbója ikon
          if (sprites.buoy && sprites.buoy.complete) {
            ctx.drawImage(sprites.buoy, cx + cellW * 0.2, cy + cellH * 0.2, cellW * 0.6, cellH * 0.6);
          }
        }

        // Ha fel van tárva:
        if (cell.isScanned) {
          if (cell.isRock) {
            // Valódi szikla rajzolása
            const rockImg = cell.rockSize === 1 ? sprites.rockSmall : cell.rockSize === 2 ? sprites.rockMedium : sprites.rockLarge;
            if (rockImg && rockImg.complete) {
              ctx.drawImage(rockImg, cx + 4, cy + 4, cellW - 8, cellH - 8);
            } else {
              // Tartalék X jelölés
              ctx.fillStyle = cfg.THEME.DANGER_RED;
              ctx.font = `bold ${cellH * 0.5}px sans-serif`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText('X', cx + cellW / 2, cy + cellH / 2);
            }
          } else {
            // Tiszta víz számokkal (0, 1, 2...)
            ctx.fillStyle = cell.adjacentCount === 0 ? 'rgba(15, 240, 252, 0.4)' : '#ffd700';
            ctx.font = `bold ${cellH * 0.45}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(cell.adjacentCount, cx + cellW / 2, cy + cellH / 2);
          }
        }

        // Ködréteg (ha még ködös)
        if (cell.isFogged) {
          ctx.fillStyle = cfg.THEME.FOG_COLOR;
          ctx.beginPath();
          ctx.roundRect(cx + 1, cy + 1, cellW - 2, cellH - 2, 4);
          ctx.fill();

          // Lágy ködfelhő-textúra
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.arc(cx + cellW * 0.4 + Math.sin(fogOffset + r) * 3, cy + cellH * 0.5, cellW * 0.25, 0, Math.PI * 2);
          ctx.arc(cx + cellW * 0.6, cy + cellH * 0.45, cellW * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 4. Megrajzolt Útvonal (Zölden világító tengeri kábel)
    if (s.playerPath.length > 1) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      for (let i = 0; i < s.playerPath.length; i++) {
        const pt = s.playerPath[i];
        const px = pt.c * cellW + cellW / 2;
        const py = pt.r * cellH + cellH / 2;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset
    }

    // 5. Hajó Kirajzolása & Elforgatása
    if (sprites.ship && sprites.ship.complete) {
      const shipPixX = s.ship.x * cellW + cellW / 2;
      const shipPixY = s.ship.y * cellH + cellH / 2;

      ctx.save();
      ctx.translate(shipPixX, shipPixY);
      ctx.rotate(s.ship.angle);
      
      const shipSize = Math.min(cellW, cellH) * 0.85;
      ctx.drawImage(sprites.ship, -shipSize / 2, -shipSize / 2, shipSize, shipSize);
      ctx.restore();
    }
  }

  // Hajó Animáció Frissítése (Suhanás)
  function updatePhysics() {
    radarAngle += 0.035;
    fogOffset += 0.02;

    const s = engine.state;
    if (!s.ship.isSailing) return;

    const path = s.playerPath;
    if (s.ship.pathIndex >= path.length - 1) {
      // Megérkeztünk a célhoz!
      s.ship.isSailing = false;
      handleReachGoal();
      return;
    }

    const curPt = path[s.ship.pathIndex];
    const nextPt = path[s.ship.pathIndex + 1];

    s.ship.progress += 0.045; // Suhanási sebesség
    if (s.ship.progress >= 1.0) {
      s.ship.progress = 0;
      s.ship.pathIndex++;
      s.ship.x = nextPt.c;
      s.ship.y = nextPt.r;

      // Széttereli a ködöt maga körül
      s.grid[nextPt.r][nextPt.c].isFogged = false;
      s.grid[nextPt.r][nextPt.c].isScanned = true;

      // ÜTKÖZÉS VIZSGÁLATA: Sziklába futottunk?
      if (s.grid[nextPt.r][nextPt.c].isRock) {
        handleCollision();
        return;
      }
    } else {
      // Pozíció interpoláció
      s.ship.x = curPt.c + (nextPt.c - curPt.c) * s.ship.progress;
      s.ship.y = curPt.r + (nextPt.r - curPt.r) * s.ship.progress;

      // Elforgatás a haladás irányába (Angle in Radians)
      const dx = nextPt.c - curPt.c;
      const dy = nextPt.r - curPt.r;
      s.ship.angle = Math.atan2(dy, dx) + Math.PI / 2;
    }
  }

  // Sziklaütközés kezelése
  function handleCollision() {
    const s = engine.state;
    s.ship.isSailing = false;
    s.hp--;
    window.SonarAudio.play('boatCrash', 1.0);
    window.SonarAudio.play('rockCrash', 1.0);

    hud.updateTopBar();

    if (s.hp <= 0) {
      // Hajótörés (Defeat)
      s.phase = 'RESULT_FAIL';
      s.streak = 0;
      hud.showResultModal(false, 0, 0);
    } else {
      // Sérülés: megáll a hajó, a játékos újratervezheti a kerülőt!
      s.phase = 'EXPLORING';
    }
  }

  // Sikeres célba érés kezelése
  function handleReachGoal() {
    const s = engine.state;
    s.phase = 'RESULT_WIN';
    s.streak++;

    // Pontok és Kreditek jóváírása
    const diff = cfg.DIFFICULTIES[s.mode];
    const gainedPts = diff.navPoints;
    s.navPoints += gainedPts;

    // Konzervatív Széria-Kredit (2 hatványai)
    const gainedCredits = cfg.STREAK_REWARDS[s.streak] || 0;
    s.credits += gainedCredits;

    // Megőrzött szonárok bankolása a következőre!
    s.pingsBanked = s.pingsCur;

    window.SonarAudio.play('victoryFanfare', 0.9);
    window.SonarAudio.play('victoryWhohoo', 0.85);

    hud.updateTopBar();
    hud.showResultModal(true, gainedPts, gainedCredits);
  }

  return {
    init,
    resizeCanvas
  };
})();

