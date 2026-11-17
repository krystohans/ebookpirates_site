/**
 * SONAR_01 - Műszerfal és UI Kezelő (HUD & Abacus Component)
 */

window.SonarHUD = (function() {
  const engine = window.SonarEngine;
  const cfg = window.SONAR_CONFIG;

  // Abakusz Belső Állapot (melyik golyó van balra és melyik jobbra)
  // beadsState[rodIndex] = tömb boolean-ekkel: true = JOBB oldalon (számolva), false = BAL oldalon (pihenő)
  const abacusState = [
    new Array(cfg.ABACUS.ROD_1_SMALL.maxBeads).fill(false),
    new Array(cfg.ABACUS.ROD_2_MEDIUM.maxBeads).fill(false),
    new Array(cfg.ABACUS.ROD_3_LARGE.maxBeads).fill(false),
    new Array(cfg.ABACUS.ROD_4_WRECK.maxBeads).fill(false)
  ];

  function init() {
    renderAbacus();
    updateTopBar();
  }

  // TopBar Frissítése
  function updateTopBar() {
    const s = engine.state;
    
    // Kreditek
    const elCred = document.getElementById('tb-credits');
    if (elCred) elCred.innerText = s.credits;

    // Navigációs Pontok
    const elNav = document.getElementById('tb-nav-points');
    if (elNav) elNav.innerText = `+${s.navPoints} Pont`;

    // Szonárok
    const elPings = document.getElementById('tb-pings');
    if (elPings) {
      const bonusText = s.pingsBanked > 0 ? ` (+${s.pingsBanked})` : '';
      elPings.innerText = `${s.pingsCur}/${s.pingsMax}${bonusText}`;
    }

    // Hajó Életerő (HP ikonok)
    const elHpContainer = document.getElementById('tb-hp-container');
    if (elHpContainer) {
      elHpContainer.innerHTML = '';
      for (let i = 0; i < s.maxHp; i++) {
        const img = document.createElement('img');
        img.src = 'assets/images/hp_boat.png';
        img.className = 'w-7 h-7 object-contain transition-all duration-300';
        if (i >= s.hp) {
          img.style.filter = 'grayscale(100%) opacity(30%)';
        }
        elHpContainer.appendChild(img);
      }
    }

    // Perkek
    const elMag = document.getElementById('perk-mag-count');
    if (elMag) elMag.innerText = s.perks.magnifier;
    const elBuoy = document.getElementById('perk-buoy-count');
    if (elBuoy) elBuoy.innerText = s.perks.buoy;
    const elUndo = document.getElementById('perk-undo-count');
    if (elUndo) elUndo.innerText = s.perks.undo;

    // Indítás gomb állapota
    const btnLaunch = document.getElementById('btn-launch-ship');
    if (btnLaunch) {
      if (s.phase === 'READY_TO_LAUNCH') {
        btnLaunch.disabled = false;
        btnLaunch.classList.remove('opacity-40', 'cursor-not-allowed');
        btnLaunch.classList.add('animate-pulse', 'border-emerald-400');
      } else {
        btnLaunch.disabled = true;
        btnLaunch.classList.add('opacity-40', 'cursor-not-allowed');
        btnLaunch.classList.remove('animate-pulse', 'border-emerald-400');
      }
    }
  }

  // Interaktív Réz Abakusz Renderelése
  function renderAbacus() {
    const container = document.getElementById('abacus-rods-container');
    if (!container) return;
    container.innerHTML = '';

    const isHardMode = engine.state.mode === 'HARD';
    const rodConfigs = [
      { name: 'Kicsi zátony (1)', beads: cfg.ABACUS.ROD_1_SMALL.maxBeads, size: cfg.ABACUS.ROD_1_SMALL.size, tier: 1 },
      { name: 'Kettős szikla (2)', beads: cfg.ABACUS.ROD_2_MEDIUM.maxBeads, size: cfg.ABACUS.ROD_2_MEDIUM.size, tier: 2 },
      { name: 'Óriás zátony (3)', beads: cfg.ABACUS.ROD_3_LARGE.maxBeads, size: cfg.ABACUS.ROD_3_LARGE.size, tier: 3 },
      { name: 'Hajóroncs (4)', beads: cfg.ABACUS.ROD_4_WRECK.maxBeads, size: cfg.ABACUS.ROD_4_WRECK.size, tier: 4, locked: !isHardMode }
    ];

    rodConfigs.forEach((rod, rodIdx) => {
      const rodRow = document.createElement('div');
      rodRow.className = 'relative flex items-center justify-between w-full h-11 px-3 my-1.5';

      // Vízszintes Rézrúd Vonal (háttérben)
      const rodLine = document.createElement('div');
      rodLine.className = 'absolute left-2 right-2 h-1.5 rounded-full shadow-inner pointer-events-none';
      rodLine.style.background = 'linear-gradient(180deg, #ffe082 0%, #b8860b 50%, #4a3306 100%)';
      rodRow.appendChild(rodLine);

      // Ha zárolva van a 4. rúd (Könnyű/Közepes pályán):
      if (rod.locked) {
        const lockWrap = document.createElement('div');
        lockWrap.className = 'absolute inset-0 flex items-center justify-center z-20 bg-black/40 rounded';
        
        const lockImg = document.createElement('img');
        lockImg.src = 'assets/images/padlock.png';
        lockImg.className = 'w-7 h-7 object-contain drop-shadow';
        lockWrap.appendChild(lockImg);

        const lockLabel = document.createElement('span');
        lockLabel.className = 'text-[10px] text-amber-200/60 ml-2 font-mono';
        lockLabel.innerText = 'ZÁROLVA (Nehéz szektor)';
        lockWrap.appendChild(lockLabel);

        rodRow.appendChild(lockWrap);
      } else {
        // Bal és Jobb oldali golyócsoportok
        const leftBox = document.createElement('div');
        leftBox.className = 'flex items-center gap-1 z-10';

        const rightBox = document.createElement('div');
        rightBox.className = 'flex items-center gap-1 z-10 flex-row-reverse';

        rodRow.appendChild(leftBox);
        rodRow.appendChild(rightBox);

        for (let beadIdx = 0; beadIdx < rod.beads; beadIdx++) {
          const isRight = abacusState[rodIdx][beadIdx];
          const bead = document.createElement('button');
          bead.className = 'rounded-full transition-all duration-200 shadow-md transform hover:scale-110 active:scale-95 cursor-pointer';
          bead.style.width = `${rod.size}px`;
          bead.style.height = `${rod.size}px`;

          // Golyó Színezése (Réz vagy Let-kristály)
          if (rod.tier === 4) {
            bead.style.background = 'radial-gradient(circle at 35% 35%, #0ff0fc, #0088cc 70%, #003366)';
            bead.style.boxShadow = '0 0 8px #0ff0fc';
          } else {
            bead.style.background = 'radial-gradient(circle at 35% 35%, #fff2a3, #d49f43 60%, #4a2d04)';
          }

          // Kattintásra átcsúszik a másik oldalra (100% manuális!)
          bead.addEventListener('click', () => {
            abacusState[rodIdx][beadIdx] = !abacusState[rodIdx][beadIdx];
            window.SonarAudio.playAbacusClack(rod.tier);
            renderAbacus();
          });

          if (isRight) {
            rightBox.appendChild(bead);
          } else {
            leftBox.appendChild(bead);
          }
        }
      }

      container.appendChild(rodRow);
    });
  }

  // Múló Hajónapló Megjelenítése
  function showBriefingModal() {
    const s = engine.state;
    const modal = document.getElementById('briefing-modal');
    if (!modal) return;

    const elSector = document.getElementById('briefing-sector');
    if (elSector) elSector.innerText = cfg.DIFFICULTIES[s.mode].name;

    const elPings = document.getElementById('briefing-pings');
    if (elPings) elPings.innerText = `${s.pingsMax} Pásztázás`;

    const elRocks = document.getElementById('briefing-rocks-list');
    if (elRocks) {
      elRocks.innerHTML = `
        <li>• <b>${s.rockCounts.small} db</b> Kicsi zátony (1-es)</li>
        <li>• <b>${s.rockCounts.medium} db</b> Kettős szikla (2-es lánc)</li>
        <li>• <b>${s.rockCounts.large} db</b> Óriás zátonytömb (3-as fal)</li>
        ${s.rockCounts.wreck > 0 ? `<li class="text-cyan-300 font-bold">• 1 db Elsüllyedt 4-es Hajóroncs!</li>` : ''}
      `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  // Hajónapló Eltüntetése (Indulás)
  function dismissBriefing() {
    const modal = document.getElementById('briefing-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    engine.state.phase = 'EXPLORING';
    updateTopBar();
  }

  // Eredményjelző Modal (Győzelem vagy Sérülés/Kiesés)
  function showResultModal(isWin, pointsGained, creditsGained) {
    const s = engine.state;
    const modal = document.getElementById('result-modal');
    if (!modal) return;

    const elTitle = document.getElementById('result-title');
    const elSub = document.getElementById('result-subtitle');
    const elStats = document.getElementById('result-stats');

    if (isWin) {
      elTitle.innerText = 'ÁTJUTOTTÁL A KÖDÖN!';
      elTitle.className = 'text-2xl font-bold font-serif text-emerald-400';
      elSub.innerText = 'A hajó épségben elérte a célbóját.';
    } else {
      elTitle.innerText = 'ZÁTONYRA FUTÁS!';
      elTitle.className = 'text-2xl font-bold font-serif text-red-500';
      elSub.innerText = 'A hajótest megsérült a sziklák között.';
    }

    if (elStats) {
      elStats.innerHTML = `
        <div class="flex justify-between py-1 border-b border-amber-900/40">
          <span>Megszerzett Navigációs Pont:</span>
          <b class="text-amber-300">+${pointsGained} Pont</b>
        </div>
        <div class="flex justify-between py-1 border-b border-amber-900/40">
          <span>Széria Kreditek:</span>
          <b class="text-yellow-400">+${creditsGained} Kredit</b>
        </div>
        <div class="flex justify-between py-1 border-b border-amber-900/40">
          <span>Hajó Életereje:</span>
          <b>${s.hp} / ${s.maxHp} HP</b>
        </div>
        <div class="flex justify-between py-1">
          <span>Következőre átmentett szonár:</span>
          <b class="text-cyan-300">+${s.pingsBanked} Pásztázás</b>
        </div>
      `;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  return {
    init,
    updateTopBar,
    renderAbacus,
    showBriefingModal,
    dismissBriefing,
    showResultModal
  };
})();

