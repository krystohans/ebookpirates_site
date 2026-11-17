/**
 * SONAR_01 - MŰSZEREK ÉS ABAKUSZ (gauges.js)
 * Tiszta analóg vintage számlap az első (Szonár) műszerhez,
 * benzintank-stílusú skálával (10..3 fekete, 2..1 piros zóna).
 * Csak a számlapot jeleníti meg, semmi mást.
 */

window.SonarGauges = (function() {
  let sonarCanvas = null;
  let sonarCtx = null;
  let hullCanvas = null;
  let hullCtx = null;

  let sonarFaceImg = null; let needleImg = null;

  let currentSonar = 6;
  let maxSonar = 6;
  let currentHp = 3;
  let maxHp = 3;
  let isCriticalHp = false;

  let abacusState = [0, 0, 0, 0]; // 4 rúd áthúzott értékei

  function init() {
    sonarCanvas = document.getElementById('gauge-sonar-canvas');
    if (sonarCanvas) sonarCtx = sonarCanvas.getContext('2d');

    hullCanvas = document.getElementById('gauge-hull-canvas');
    if (hullCanvas) hullCtx = hullCanvas.getContext('2d');

    // Szonár vintage benzintank skála számlap betöltése
    sonarFaceImg = new Image();
    sonarFaceImg.src = 'assets/images/dial_sonar_face.png';
    sonarFaceImg.onload = () => renderSonarNeedle(currentSonar, maxSonar); needleImg = new Image(); needleImg.src = 'assets/images/needle_sonar.png'; needleImg.onload = () => { renderSonarNeedle(currentSonar, maxSonar); renderHullNeedle(currentHp, maxHp, isCriticalHp); };

    if (window.SonarEngine && window.SonarEngine.state) {
      currentSonar = window.SonarEngine.state.pingsCur;
      maxSonar = window.SonarEngine.state.pingsMax;
      currentHp = window.SonarEngine.state.hp;
      maxHp = window.SonarEngine.state.maxHp;
      isCriticalHp = currentHp < 2;
    }

    resize();
    window.addEventListener('resize', resize);

    renderSonarNeedle(currentSonar, maxSonar);
    renderHullNeedle(currentHp, maxHp, isCriticalHp);
    initAbacusInteraction();
  }

  function resize() {
    [sonarCanvas, hullCanvas].forEach(c => {
      if (!c) return;
      const rect = c.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        c.width = rect.width * (window.devicePixelRatio || 1);
        c.height = rect.height * (window.devicePixelRatio || 1);
      }
    });
    renderSonarNeedle(currentSonar, maxSonar);
    renderHullNeedle(currentHp, maxHp, isCriticalHp);
  }

  // Szonár műszer: KIZÁRÓLAG a szerkesztett vintage benzintank skálájú számlapot jeleníti meg
  function renderSonarNeedle(current, max) {
    currentSonar = current;
    maxSonar = max;
    if (!sonarCtx || !sonarCanvas) return;

    sonarCtx.clearRect(0, 0, sonarCanvas.width, sonarCanvas.height);

    if (sonarFaceImg && sonarFaceImg.complete && sonarFaceImg.naturalWidth > 0) {
      sonarCtx.drawImage(sonarFaceImg, 0, 0, sonarCanvas.width, sonarCanvas.height);
    } if (needleImg && needleImg.complete && needleImg.naturalWidth > 0) { const w = sonarCanvas.width, h = sonarCanvas.height, rad = (-130 + (max > 0 ? (current / max) : 0) * 267) * Math.PI / 180; sonarCtx.save(); sonarCtx.translate(w / 2, h / 2); sonarCtx.rotate(rad); sonarCtx.drawImage(needleImg, -w / 2, -h / 2, w, h); sonarCtx.restore(); }
  }

  // Második műszer (Szerkezet): érintetlen, üres átlátszó canvas
  function renderHullNeedle(hp, max, isCritical) {
    currentHp = hp;
    maxHp = max;
    isCriticalHp = isCritical;
    if (!hullCtx || !hullCanvas) return;
    hullCtx.clearRect(0, 0, hullCanvas.width, hullCanvas.height); if (sonarFaceImg && sonarFaceImg.complete && sonarFaceImg.naturalWidth > 0) hullCtx.drawImage(sonarFaceImg, 0, 0, hullCanvas.width, hullCanvas.height); else if (sonarFaceImg) sonarFaceImg.addEventListener('load', () => renderHullNeedle(currentHp, maxHp, isCriticalHp), { once: true }); if (needleImg && needleImg.complete && needleImg.naturalWidth > 0) { const w = hullCanvas.width, h = hullCanvas.height, rad = (-130 + (max > 0 ? (hp / max) : 0) * 267) * Math.PI / 180; hullCtx.save(); hullCtx.translate(w / 2, h / 2); hullCtx.rotate(rad); hullCtx.drawImage(needleImg, -w / 2, -h / 2, w, h); hullCtx.restore(); }
  }

  // Abakusz interakció a felső 4 rúd felett
  function initAbacusInteraction() {
    const rows = document.querySelectorAll('.abacus-hit-row');
    rows.forEach((row, rIdx) => {
      row.addEventListener('click', (e) => {
        const rect = row.getBoundingClientRect();
        const clickRatio = (e.clientX - rect.left) / rect.width;
        if (clickRatio > 0.5) {
          abacusState[rIdx] = Math.min(10, abacusState[rIdx] + 1);
        } else {
          abacusState[rIdx] = Math.max(0, abacusState[rIdx] - 1);
        }
        updateAbacusMarkers();
      });
    });
    updateAbacusMarkers();
  }

  function updateAbacusMarkers() {
    for (let r = 0; r < 4; r++) {
      const badge = document.getElementById(`abacus-count-${r}`);
      if (badge) {
        badge.textContent = abacusState[r];
        badge.style.display = abacusState[r] > 0 ? 'inline-block' : 'none';
      }
    }
  }

  return {
    init,
    resize,
    renderSonarNeedle,
    renderHullNeedle
  };
})();
