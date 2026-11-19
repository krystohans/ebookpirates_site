/**
 * WXXX_O_L_GEN_NAV_XXX_sn01 - KÖR ALAKÚ RADAR & AKUSZTIKUS HANGHULLÁM (oscilloscope.js)
 * Közvetlenül a jobb alsó kék radar kijelzőre illesztve
 * Külső peremen 3 rovátka (1, 2, 3 óra), forgatható belső perem + cápauszony kar.
 * Pásztázáskor 1, 2 vagy 3 egymás utáni akusztikus hanghullám fut át a képernyőn.
 */

window.SonarOscilloscope = (function() {
  let canvas = null;
  let ctx = null;
  let animId = null;
  let radarAngle = 0;

  // 1, 2, 3 óra pozíciók (radiánban, ahol 0 = 3 óra, -PI/2 = 12 óra)
  const NOTCH_ANGLES = [-Math.PI / 3, -Math.PI / 6, 0];
  let power = 1; // 1 = 9 mező (3x3), 2 = 25 mező (5x5), 3 = 49 mező (7x7)
  let leverAngle = NOTCH_ANGLES[0];
  let isDragging = false;

  // Aktív pásztázási hanghullámok listája
  let activePulses = []; // { startTime, isRock, duration }

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);
    bindPointerEvents();

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

  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function updateAngleFromPointer(e) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const pt = getCanvasCoords(e);
    let ang = Math.atan2(pt.y - cy, pt.x - cx);

    // Clamp az 1 óra (-PI/3) és 3 óra (0) közötti tartományra kis ráhagyással
    const minA = NOTCH_ANGLES[0] - 0.12;
    const maxA = NOTCH_ANGLES[2] + 0.12;
    if (ang < -Math.PI * 0.75) ang = maxA;
    ang = Math.max(minA, Math.min(maxA, ang));
    leverAngle = ang;

    // Legközelebbi rovátka kiválasztása
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < NOTCH_ANGLES.length; i++) {
      const d = Math.abs(ang - NOTCH_ANGLES[i]);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    power = bestIdx + 1;
  }

  function bindPointerEvents() {
    canvas.addEventListener('pointerdown', (e) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.94;
      const pt = getCanvasCoords(e);
      const dist = Math.hypot(pt.x - cx, pt.y - cy);
      if (dist >= radius * 0.72) {
        e.preventDefault();
        isDragging = true;
        canvas.setPointerCapture(e.pointerId);
        canvas.style.cursor = 'grabbing';
        updateAngleFromPointer(e);
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      if (isDragging) {
        updateAngleFromPointer(e);
        return;
      }
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(cx, cy) * 0.94;
      const pt = getCanvasCoords(e);
      const dist = Math.hypot(pt.x - cx, pt.y - cy);
      canvas.style.cursor = dist >= radius * 0.72 ? 'grab' : 'default';
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      leverAngle = NOTCH_ANGLES[power - 1];
      canvas.style.cursor = 'grab';
      try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
    };

    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);
  }

  function getPower() {
    return power;
  }

  function setPower(p) {
    const clamped = Math.max(1, Math.min(3, Math.round(p || 1)));
    power = clamped;
    leverAngle = NOTCH_ANGLES[power - 1];
  }

  // Szonár hanghullámok lefutása (1, 2 vagy 3 egymás utáni impulzus)
  function triggerPing(isRock, count) {
    const n = Math.max(1, Math.min(3, count || power || 1));
    const baseTime = performance.now();
    for (let i = 0; i < n; i++) {
      activePulses.push({
        startTime: baseTime + i * 280,
        isRock: !!isRock,
        duration: 1400
      });
    }
  }

  function animate() {
    if (!isDragging) {
      const target = NOTCH_ANGLES[power - 1];
      leverAngle += (target - leverAngle) * 0.25;
    }
    render();
    radarAngle += 0.035;
    animId = requestAnimationFrame(animate);
  }

  function render() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) * 0.94;
    const innerR = radius * 0.78;
    const now = performance.now();

    // Teljes törlés (hogy a fotó kék radarja érvényesüljön)
    ctx.clearRect(0, 0, w, h);

    // 1. Belső kör maszkolása a radar pásztához és hanghullámokhoz
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.clip();

    // Forgó radarpásztázó sugár
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(radarAngle);

    const grad = ctx.createLinearGradient(0, 0, innerR, 0);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.05)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, innerR, -0.45, 0);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.0;
    ctx.shadowColor = '#00ddff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(innerR, 0);
    ctx.stroke();
    ctx.restore();

    // Egymás utáni akusztikus hanghullámok
    activePulses = activePulses.filter(p => (now - p.startTime) < p.duration);
    activePulses.forEach(p => {
      const elapsed = now - p.startTime;
      if (elapsed >= 0) {
        const progress = elapsed / p.duration;
        renderPulseWave(cx, cy, innerR, progress, p.isRock);
      }
    });

    ctx.restore(); // Belső maszk feloldása

    // 2. Külső perem 3 rovátkája (1, 2, 3 óra)
    renderNotchesAndDial(cx, cy, radius);
  }

  function renderNotchesAndDial(cx, cy, radius) {
    const ringR = radius * 0.81;

    // Belső elforgatható fémgyűrű
    ctx.save();
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.55)';
    ctx.lineWidth = Math.max(2, radius * 0.028);
    ctx.beginPath();
    ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(20, 12, 4, 0.75)';
    ctx.lineWidth = Math.max(1, radius * 0.010);
    ctx.beginPath();
    ctx.arc(cx, cy, ringR + radius * 0.018, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // 3 rovátka és számok kint a külső réz kereten (1, 2, 3 óra)
    NOTCH_ANGLES.forEach((ang, idx) => {
      const isActive = (power === idx + 1);
      const r1 = radius * 0.90;
      const r2 = radius * 0.96;
      const x1 = cx + Math.cos(ang) * r1;
      const y1 = cy + Math.sin(ang) * r1;
      const x2 = cx + Math.cos(ang) * r2;
      const y2 = cy + Math.sin(ang) * r2;

      ctx.save();
      ctx.strokeStyle = isActive ? '#ffd700' : '#3a2409';
      ctx.lineWidth = isActive ? Math.max(2.5, radius * 0.028) : Math.max(2.0, radius * 0.022);
      ctx.lineCap = 'round';
      if (isActive) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 8;
      }
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // 1, 2, 3 számjegy kint a külső réz kereten
      const lr = radius * 1.02;
      const lx = cx + Math.cos(ang) * lr;
      const ly = cy + Math.sin(ang) * lr;
      ctx.font = `bold ${Math.max(11, Math.round(radius * 0.11))}px Georgia, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeStyle = 'rgba(15, 8, 2, 0.85)';
      ctx.lineWidth = 3;
      ctx.strokeText(String(idx + 1), lx, ly);
      ctx.fillStyle = isActive ? '#ffe066' : '#e6c88a';
      ctx.fillText(String(idx + 1), lx, ly);
      ctx.restore();
    });

    // Sárgaréz cápauszony kar a belső kereten (leverAngle irányában)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(leverAngle);

    const finBaseR = radius * 0.79;
    const finTipR = radius * 0.90;
    const finW = radius * 0.085;

    const finGrad = ctx.createLinearGradient(finBaseR, -finW, finTipR, finW);
    finGrad.addColorStop(0, '#fff3c4');
    finGrad.addColorStop(0.45, '#d4a345');
    finGrad.addColorStop(1, '#6b4a16');

    ctx.fillStyle = finGrad;
    ctx.strokeStyle = '#241605';
    ctx.lineWidth = Math.max(1.2, radius * 0.015);
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.shadowBlur = 5;

    ctx.beginPath();
    ctx.moveTo(finBaseR - radius * 0.02, -finW * 0.85);
    ctx.quadraticCurveTo(finBaseR + radius * 0.08, -finW * 0.65, finTipR, -finW * 0.15);
    ctx.quadraticCurveTo(finBaseR + radius * 0.10, finW * 0.35, finBaseR - radius * 0.02, finW * 0.85);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Kis szegecs a cápauszony tövénél
    ctx.fillStyle = '#f6dfa0';
    ctx.beginPath();
    ctx.arc(finBaseR + radius * 0.03, 0, Math.max(2, radius * 0.022), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  function renderPulseWave(cx, cy, radius, progress, isRock) {
    const waveY = cy;
    ctx.save();
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#00bfff';
    ctx.shadowBlur = 10;
    ctx.beginPath();

    const points = 100;
    for (let i = 0; i <= points; i++) {
      const normX = i / points;
      const px = (cx - radius) + normX * (radius * 2);

      let py = waveY;

      // 1. Csúcs (Kimenő impulzus)
      const p1 = progress * 1.3 - 0.15;
      const d1 = Math.abs(normX - p1);
      if (d1 < 0.12) {
        const amp1 = Math.cos((d1 / 0.12) * (Math.PI / 2)) * (radius * 0.45);
        py += Math.sin((normX - p1) * 60) * amp1;
      }

      // 2. Csúcs (Csak szikla esetén visszatérő reflexió!)
      if (isRock) {
        const p2 = p1 - 0.22;
        const d2 = Math.abs(normX - p2);
        if (d2 < 0.10) {
          const amp2 = Math.cos((d2 / 0.10) * (Math.PI / 2)) * (radius * 0.35);
          py += Math.sin((normX - p2) * 75) * amp2;
        }
      }

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }

    ctx.stroke();
    ctx.restore();
  }

  return {
    init,
    triggerPing,
    getPower,
    setPower,
    resize
  };
})();
