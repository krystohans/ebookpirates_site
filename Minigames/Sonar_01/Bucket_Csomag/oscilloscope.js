/**
 * SONAR_01 - KÖR ALAKÚ RADAR & AKUSZTIKUS HANGHULLÁM (oscilloscope.js)
 * Közvetlenül a jobb alsó kék radar kijelzőre illesztve
 * Alapjáraton körbeforgó radarpásztázó fénysugár.
 * Pásztázáskor a képernyőn horizontálisan átfut az akusztikus hanghullám (1 csúcs víz, 2 csúcs szikla).
 */

window.SonarOscilloscope = (function() {
  let canvas = null;
  let ctx = null;
  let animId = null;
  let radarAngle = 0;

  // Aktív pásztázási hanghullám állapota
  let activePulse = null; // { startTime, isRock, duration: 1500 }

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);

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

  // Szonár hanghullám lefutása
  function triggerPing(isRock) {
    activePulse = {
      startTime: performance.now(),
      isRock: !!isRock,
      duration: 1500
    };
  }

  function animate() {
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
    const now = performance.now();

    // Teljes törlés (hogy a fotó kék radarja érvényesüljön)
    ctx.clearRect(0, 0, w, h);

    // Kör alakú maszkolás a radar peremén belülre
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.clip();

    // 1. Forgó radarpásztázó sugár (finom kék/cián fénycsóva)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(radarAngle);

    // Radarpászta cikkely
    const grad = ctx.createLinearGradient(0, 0, radius, 0);
    grad.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
    grad.addColorStop(1, 'rgba(56, 189, 248, 0.05)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, radius, -0.45, 0);
    ctx.closePath();
    ctx.fill();

    // Vezető fénysugár vonal
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.0;
    ctx.shadowColor = '#00ddff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(radius, 0);
    ctx.stroke();
    ctx.restore();

    // 2. Ha pásztázás van folyamatban: akusztikus hanghullám lefutása a radar közepén
    if (activePulse) {
      const elapsed = now - activePulse.startTime;
      if (elapsed < activePulse.duration) {
        const progress = elapsed / activePulse.duration; // 0.0 -> 1.0
        renderPulseWave(w, h, cx, cy, radius, progress, activePulse.isRock);
      } else {
        activePulse = null;
      }
    }

    ctx.restore(); // Maszk feloldása
  }

  function renderPulseWave(w, h, cx, cy, radius, progress, isRock) {
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

      // Alapvonal
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
    resize
  };
})();
