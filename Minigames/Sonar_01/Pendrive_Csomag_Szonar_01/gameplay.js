/**
 * SONAR_01 - Ködhasító
 * Játékmenet és Térképgeneráló Logika (Core Engine)
 */

window.SonarEngine = (function() {
  const cfg = window.SonarConfig;

  // Játékállapot (State)
  const state = {
    mode: 'EASY', // TUTORIAL, EASY, MEDIUM, HARD
    cols: 10,
    rows: 10,
    grid: [], // 2D array: { r, c, isRock, rockSize, rockId, adjacentCount, isScanned, isFogged, isPath, isGoal, isStart }
    secretPath: [], // A script által garantált tiszta folyosó
    playerPath: [], // A játékos által megrajzolt útvonal
    rockCounts: { small: 0, medium: 0, large: 0, wreck: 0 },
    
    // Szonárok
    pingsMax: 6,
    pingsCur: 6,
    pingsBanked: 0, // Előző pályáról áthozott szonárok

    // Játékos Statisztika
    hp: 10,
    maxHp: 10,
    isAutoNav: false,
    extraReward: null,
    credits: 9764,
    navPoints: 0,
    navSkill: 0,
    isFirstTime: false,
    streak: 0, // "Row" számláló
    crashesThisCourse: 0,
    shortestPathLen: 0,
    
    // Segítségek
    perks: {
      magnifier: 1,
      buoy: 1,
      undo: 2
    },

    // Fázisok: 'BRIEFING', 'EXPLORING', 'READY_TO_LAUNCH', 'SAILING', 'RESULT_WIN', 'RESULT_FAIL'
    phase: 'BRIEFING',
    
    // Animáció
    ship: {
      x: 0,
      y: 0,
      angle: 0,
      pathIndex: 0,
      progress: 0,
      isSailing: false
    },

    // Köd-animációs részecskék
    fogPuffs: [],
    radarAngle: 0
  };

  // 1. Garantáltan Járható Útvonal Generálása (A-ból B-be)
  function generateSolvableCourse(cols, rows) {
    const startCol = Math.floor(Math.random() * (cols - 2)) + 1;
    const endCol = Math.floor(Math.random() * (cols - 2)) + 1;

    let curR = rows - 1;
    let curC = startCol;
    const path = [{ r: curR, c: curC }];
    const visited = new Set([`${curR},${curC}`]);

    while (curR > 0) {
      const moves = [];
      // Mindig preferáljuk a felfelé lépést, de tehetünk kanyarokat jobbra-balra
      if (curR > 0 && !visited.has(`${curR - 1},${curC}`)) {
        moves.push({ r: curR - 1, c: curC, weight: 3 });
      }
      if (curC > 0 && !visited.has(`${curR},${curC - 1}`)) {
        moves.push({ r: curR, c: curC - 1, weight: 1 });
      }
      if (curC < cols - 1 && !visited.has(`${curR},${curC + 1}`)) {
        moves.push({ r: curR, c: curC + 1, weight: 1 });
      }

      if (moves.length === 0) {
        // Vész-lépés: egyenesen fel
        curR--;
      } else {
        // Súlyozott választás
        const totalW = moves.reduce((sum, m) => sum + m.weight, 0);
        let rnd = Math.random() * totalW;
        let chosen = moves[0];
        for (const m of moves) {
          rnd -= m.weight;
          if (rnd <= 0) {
            chosen = m;
            break;
          }
        }
        curR = chosen.r;
        curC = chosen.c;
      }

      visited.add(`${curR},${curC}`);
      path.push({ r: curR, c: curC });
    }

    // Elérjük a céloszlopot a legfelső sorban
    while (curC !== endCol) {
      curC += curC < endCol ? 1 : -1;
      visited.add(`0,${curC}`);
      path.push({ r: 0, c: curC });
    }

    return path.map(p => ({ r: p.c, c: p.r }));
  }

  // 2. Sziklák és Zátonyok Lehelyezése (a tiszta út kizárásával!)
  function populateRocks(diffConfig, secretPath) {
    const pathSet = new Set(secretPath.map(p => `${p.r},${p.c}`));
    // Biztonsági puffer a start és cél körül
    pathSet.add(`${state.rows - 1},${secretPath[0].c}`);
    pathSet.add(`0,${secretPath[secretPath.length - 1].c}`);

    const freeCells = [];
    for (let r = 0; r < state.rows; r++) {
      for (let c = 0; c < state.cols; c++) {
        if (!pathSet.has(`${r},${c}`)) {
          freeCells.push({ r, c });
        }
      }
    }

    // Véletlen sorrend
    freeCells.sort(() => Math.random() - 0.5);

    let rockIdCounter = 1;
    const placedCounts = { small: 0, medium: 0, large: 0, wreck: 0 };
    const occupied = new Set();

    function tryPlaceRockCluster(size, typeKey) {
      for (let i = 0; i < freeCells.length; i++) {
        const root = freeCells[i];
        if (occupied.has(`${root.r},${root.c}`)) continue;

        const cluster = [root];
        occupied.add(`${root.r},${root.c}`);

        // Kiterjesztés a méretnek megfelelően
        const neighbors = [
          { r: root.r, c: root.c + 1 },
          { r: root.r, c: root.c - 1 },
          { r: root.r + 1, c: root.c },
          { r: root.r - 1, c: root.c }
        ].filter(n => n.r >= 0 && n.r < state.rows && n.c >= 0 && n.c < state.cols && !pathSet.has(`${n.r},${n.c}`) && !occupied.has(`${n.r},${n.c}`));

        while (cluster.length < size && neighbors.length > 0) {
          const next = neighbors.pop();
          if (!occupied.has(`${next.r},${next.c}`)) {
            occupied.add(`${next.r},${next.c}`);
            cluster.push(next);
          }
        }

        if (cluster.length >= size) {
          cluster.forEach(cell => {
            const gridCell = state.grid[cell.r][cell.c];
            gridCell.isRock = true;
            gridCell.rockSize = size;
            gridCell.rockId = rockIdCounter;
          });
          cluster.forEach(cell => { for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) occupied.add(`${cell.r + dr},${cell.c + dc}`); }); rockIdCounter++;
          placedCounts[typeKey]++;
          return true;
        } else {
          // Visszavonjuk ha nem sikerült a teljes méret
          cluster.forEach(c => occupied.delete(`${c.r},${c.c}`));
        }
      }
      return false;
    }

    const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
    const rRanges = state.mode === 'HARD'
      ? { small: [5, 7], medium: [3, 5], large: [2, 3], wreck: [1, 2] }
      : (state.mode === 'MEDIUM'
        ? { small: [4, 6], medium: [2, 4], large: [1, 3], wreck: [0, 1] }
        : { small: [3, 5], medium: [1, 3], large: [1, 2], wreck: [0, 1] });
    const targetWreck = randInt(rRanges.wreck[0], rRanges.wreck[1]);
    const targetLarge = randInt(rRanges.large[0], rRanges.large[1]);
    const targetMedium = randInt(rRanges.medium[0], rRanges.medium[1]);
    const targetSmall = randInt(rRanges.small[0], rRanges.small[1]);

    // Lerakás: Hajóroncs (4-es, ha van)
    for (let i = 0; i < targetWreck; i++) {
      tryPlaceRockCluster(4, 'wreck');
    }
    // Óriás sziklák (3-as)
    for (let i = 0; i < targetLarge; i++) {
      tryPlaceRockCluster(3, 'large');
    }
    // Közepes sziklák (2-es)
    for (let i = 0; i < targetMedium; i++) {
      tryPlaceRockCluster(2, 'medium');
    }
    // Kicsi sziklák (1-es)
    for (let i = 0; i < targetSmall; i++) {
      for (const cell of freeCells) {
        if (!occupied.has(`${cell.r},${cell.c}`)) {
          for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) occupied.add(`${cell.r + dr},${cell.c + dc}`);
          const gridCell = state.grid[cell.r][cell.c];
          gridCell.isRock = true;
          gridCell.rockSize = 1;
          gridCell.rockId = rockIdCounter++;
          placedCounts.small++;
          break;
        }
      }
    }

    state.rockCounts = placedCounts;
  }

  // 3. Szomszédos Sziklák Megszámolása (Aknakereső-logika)
  function calculateAdjacencies() {
    for (let r = 0; r < state.rows; r++) {
      for (let c = 0; c < state.cols; c++) {
        // Minden cellára kiszámoljuk az érintkező sziklák számát
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < state.rows && nc >= 0 && nc < state.cols) {
              if (state.grid[nr][nc].isRock) count++;
            }
          }
        }
        state.grid[r][c].adjacentCount = count;
      }
    }
  }

  // Új Pálya Inicializálása
  function initCourse(modeKey = 'EASY') {
    const diff = (cfg && cfg.DIFFICULTIES && cfg.DIFFICULTIES[modeKey]) || { cols: 10, rows: 10, basePings: 6, rocks: { small: 4, medium: 2, large: 1, wreck: 0 } };
    state.mode = modeKey;
    state.cols = diff.cols;
    state.rows = diff.rows;
    state.playerPath = [];
    state.phase = 'BRIEFING';
    
    // Szonárok kalkulálása: a megmaradt szonárok elvesznek (nincs továbbvitel)
    state.pingsBanked = 0;
    state.crashesThisCourse = 0;
    state.pingsMax = diff.basePings;
    state.pingsCur = state.pingsMax;

    // Rács felépítése
    state.grid = [];
    for (let r = 0; r < state.rows; r++) {
      const row = [];
      for (let c = 0; c < state.cols; c++) {
        row.push({
          r,
          c,
          isRock: false,
          rockSize: 0,
          rockId: 0,
          adjacentCount: 0,
          isScanned: false,
          isFogged: true,
          isPath: false,
          isGoal: false,
          isStart: false
        });
      }
      state.grid.push(row);
    }

    // 1. lépés: Titkos útvonal
    state.secretPath = generateSolvableCourse(state.cols, state.rows);
    
    // Start és Cél jelölése
    const startPt = state.secretPath[0];
    const goalPt = state.secretPath[state.secretPath.length - 1];
    state.grid[startPt.r][startPt.c].isStart = true;
    state.grid[goalPt.r][goalPt.c].isGoal = true;
    state.grid[startPt.r][startPt.c].isFogged = false; state.grid[goalPt.r][goalPt.c].isFogged = false;

    // Kezdeti hajó pozíció
    state.ship.x = startPt.c;
    state.ship.y = startPt.r;
    state.ship.angle = 0;
    state.ship.pathIndex = 0;
    state.ship.progress = 0;
    state.ship.isSailing = false;

    // A játékos induló útvonala a Start pontot már tartalmazza
    state.playerPath = [startPt];
    state.grid[startPt.r][startPt.c].isPath = true;

    // 2. lépés: Sziklák elhelyezése
    populateRocks(diff, state.secretPath);

    // 3. lépés: Szomszédossági számok
    calculateAdjacencies();

    // 4. lépés: Valódi legrövidebb akadálymentes út hossza (BFS, 8 irányú lépés)
    state.shortestPathLen = computeShortestPathLen();

    // 5. lépés: Extra jutalom (láda / hordó / palack) elhelyezése a bal szél nehezebben elérhető sorában
    state.isAutoNav = false;
    state.extraReward = generateExtraReward();
  }

  function loadExternalShipHp() {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlHp = parseFloat(params.get('hp'));
      const urlMax = parseFloat(params.get('maxHp'));
      let hpVal = !isNaN(urlHp) ? urlHp : NaN;
      let maxVal = !isNaN(urlMax) ? urlMax : NaN;

      if (isNaN(hpVal)) {
        const lsHp = parseFloat(localStorage.getItem('ebook_pirates_ship_hp'));
        if (!isNaN(lsHp)) hpVal = lsHp;
      }
      if (isNaN(maxVal)) {
        const lsMax = parseFloat(localStorage.getItem('ebook_pirates_ship_max_hp'));
        if (!isNaN(lsMax)) maxVal = lsMax;
      }
      if (isNaN(hpVal) && window.parent && window.parent !== window) {
        try {
          if (typeof window.parent.boatDurability === 'number') hpVal = window.parent.boatDurability;
          if (typeof window.parent.boatMaxDurability === 'number') maxVal = window.parent.boatMaxDurability;
        } catch (e) {}
      }

      if (!isNaN(maxVal) && maxVal > 0) state.maxHp = maxVal;
      if (!isNaN(hpVal) && hpVal >= 0) state.hp = Math.min(state.maxHp, hpVal);
    } catch (e) {}
  }

  function generateExtraReward() {
    const rows = state.rows, cols = state.cols;
    const startPt = state.secretPath && state.secretPath[0];
    if (!startPt || !state.grid.length) return null;

    // BFS minden elérhető c = 0 cella távolságához
    const distMap = Array.from({ length: rows }, () => Array(cols).fill(-1));
    const queue = [];
    for (let dr = -1; dr <= 1; dr++) {
      const nr = startPt.r + dr;
      if (nr >= 0 && nr < rows && !state.grid[nr][cols - 1].isRock) {
        distMap[nr][cols - 1] = 1;
        queue.push({ r: nr, c: cols - 1 });
      }
    }
    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cur.r + dr, nc = cur.c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && distMap[nr][nc] === -1 && !state.grid[nr][nc].isRock) {
            distMap[nr][nc] = distMap[cur.r][cur.c] + 1;
            queue.push({ r: nr, c: nc });
          }
        }
      }
    }

    const candidates = [];
    for (let r = 0; r < rows; r++) {
      if (distMap[r][0] > 0) candidates.push({ r, dist: distMap[r][0] });
    }
    if (candidates.length === 0) return null;

    // Nehezebben megközelíthető, de elérhető sorok (felső 50% távolság)
    candidates.sort((a, b) => b.dist - a.dist);
    const poolSize = Math.max(1, Math.ceil(candidates.length * 0.5));
    const chosen = candidates[Math.floor(Math.random() * poolSize)];

    const t = (key, fb) => (window.SonarI18n && window.SonarI18n.t) ? window.SonarI18n.t(key) : fb;
    const roll = Math.random();
    if (roll < 1 / 3) {
      const amt = 2 + Math.floor(Math.random() * 4); // 2-5 kredit
      return { type: 'CHEST', row: chosen.r, amount: amt, label: `+${amt} ${t('rew_credit', 'Kredit')}` };
    } else if (roll < 2 / 3) {
      const amt = 3 + Math.floor(Math.random() * 8); // 3-10 hártya
      return { type: 'BARREL', row: chosen.r, amount: amt, label: `+${amt} ${t('rew_membrane', 'Hártya')}` };
    } else {
      const subType = Math.random() < 0.5 ? 'élelem' : 'rum';
      return { type: 'BOTTLE', row: chosen.r, amount: 1, subType, label: `+1 ${subType === 'rum' ? t('rew_rum', 'Rum') : t('rew_food', 'Élelem')}` };
    }
  }

  function findSafePathFrom(startR, startC, avoidRow) {
    const rows = state.rows, cols = state.cols;
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const parent = Array.from({ length: rows }, () => Array(cols).fill(null));
    const queue = [{ r: startR, c: startC }];
    visited[startR][startC] = true;

    let fallbackGoal = null;
    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      if (cur.c === 0) {
        if (avoidRow !== undefined && avoidRow !== null && cur.r === avoidRow) {
          if (!fallbackGoal) fallbackGoal = cur;
        } else {
          const path = [];
          let p = cur;
          while (p && !(p.r === startR && p.c === startC)) {
            path.push({ r: p.r, c: p.c });
            p = parent[p.r][p.c];
          }
          path.reverse();
          return path;
        }
      }
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cur.r + dr, nc = cur.c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !state.grid[nr][nc].isRock) {
            visited[nr][nc] = true;
            parent[nr][nc] = cur;
            queue.push({ r: nr, c: nc });
          }
        }
      }
    }
    if (fallbackGoal) {
      const path = [];
      let p = fallbackGoal;
      while (p && !(p.r === startR && p.c === startC)) {
        path.push({ r: p.r, c: p.c });
        p = parent[p.r][p.c];
      }
      path.reverse();
      return path;
    }
    return [];
  }

  function getDifficultyForStreak(streakVal) {
    const s = streakVal || 0;
    if (s < 2) return 'EASY';
    const pool = ['EASY', 'MEDIUM', 'HARD'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function computeShortestPathLen() {
    const rows = state.rows, cols = state.cols;
    const startPt = state.secretPath && state.secretPath[0];
    if (!startPt || !state.grid.length) return 0;

    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [];
    const startCol = cols - 1;
    for (let dr = -1; dr <= 1; dr++) {
      const nr = startPt.r + dr;
      if (nr >= 0 && nr < rows && !state.grid[nr][startCol].isRock) {
        visited[nr][startCol] = true;
        queue.push({ r: nr, c: startCol, dist: 1 });
      }
    }

    let head = 0;
    while (head < queue.length) {
      const cur = queue[head++];
      if (cur.c === 0) return cur.dist;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = cur.r + dr;
          const nc = cur.c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && !state.grid[nr][nc].isRock) {
            visited[nr][nc] = true;
            queue.push({ r: nr, c: nc, dist: cur.dist + 1 });
          }
        }
      }
    }
    return state.secretPath.length;
  }

  function calculateWinNavPoints(playerStepCount, hitBonus = false) {
    const diff = (cfg && cfg.DIFFICULTIES && cfg.DIFFICULTIES[state.mode]) || { navPoints: 2 };
    const baseNp = diff.navPoints || 2;
    const unusedSonarBonus = Math.max(0, state.pingsCur || 0);
    const maxShortestBonus = (cfg && cfg.ECONOMY && cfg.ECONOMY.MAX_SHORTEST_PATH_BONUS_NP) || 3;
    const optLen = state.shortestPathLen || 0;
    let shortestBonus = 0;
    if (optLen > 0 && playerStepCount > 0) {
      const extraSteps = Math.max(0, playerStepCount - optLen);
      shortestBonus = Math.max(0, maxShortestBonus - extraSteps);
    }
    const crashPenalty = Math.max(0, state.crashesThisCourse || 0);
    return Math.max(1, (baseNp + (crashPenalty > 0 ? 0 : unusedSonarBonus + shortestBonus) - crashPenalty) * (hitBonus ? 2 : 1));
  }

  // Szonár Pásztázás egy mezőre
  function scanCell(r, c) {
    if (state.phase !== 'EXPLORING' && state.phase !== 'READY_TO_LAUNCH') return false;
    if (r < 0 || r >= state.rows || c < 0 || c >= state.cols) return false;
    
    const cell = state.grid[r][c];
    if (cell.isScanned) return false;
    if (state.pingsCur <= 0) return false;

    // Szonár fogyasztás
    state.pingsCur--;
    cell.isScanned = true;
    cell.isFogged = false;

    window.SonarAudio.play('ping', 0.85);

    // Ha sziklát talált: az egész sziklaalakzat vagy a közvetlen szomszédai is felvillannak!
    if (cell.isRock) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < state.rows && nc >= 0 && nc < state.cols) {
            const neighbor = state.grid[nr][nc];
            // Ha a szomszéd is ugyanahhoz a sziklához tartozik, feltárjuk
            if (neighbor.isRock && neighbor.rockId === cell.rockId) {
              neighbor.isScanned = true;
              neighbor.isFogged = false;
            }
          }
        }
      }
    }

    return true;
  }

  // Útvonalponthoz adás (Kattintásos útvonaltervezés)
  function plotPathCell(r, c) {
    if (state.phase !== 'EXPLORING' && state.phase !== 'READY_TO_LAUNCH') return false;
    if (state.playerPath.length === 0) return false;

    const last = state.playerPath[state.playerPath.length - 1];
    
    // Csak szomszédos mezőre léphetünk (vízszintesen vagy függőlegesen)
    const dist = Math.abs(last.r - r) + Math.abs(last.c - c);
    if (dist !== 1) return false;

    // Nem léphetünk vissza saját magunkba
    const exists = state.playerPath.some(p => p.r === r && p.c === c);
    if (exists) return false;

    const cell = state.grid[r][c];
    cell.isPath = true;
    state.playerPath.push({ r, c });

    // Ha elértük a cél mezőt, kész az útvonal!
    if (cell.isGoal) {
      state.phase = 'READY_TO_LAUNCH';
    }

    return true;
  }

  // Visszavonás (Undo)
  function undoLastPathStep() {
    if (state.playerPath.length <= 1) return false;
    const removed = state.playerPath.pop();
    state.grid[removed.r][removed.c].isPath = false;
    
    // Ha levettük a célt, visszaváltunk felfedező módba
    if (state.grid[removed.r][removed.c].isGoal) {
      state.phase = 'EXPLORING';
    }
    return true;
  }

  // Hajó Indítása (Suhanás)
  function launchShip() {
    if (state.phase !== 'READY_TO_LAUNCH') return false;
    state.phase = 'SAILING';
    state.ship.isSailing = true;
    state.ship.pathIndex = 0;
    state.ship.progress = 0;
    return true;
  }

  function loadExternalNavSkill() {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlSkill = parseFloat(params.get('navSkill'));
      let skillVal = !isNaN(urlSkill) ? urlSkill : NaN;
      if (isNaN(skillVal)) {
        const lsSkill = parseFloat(localStorage.getItem('ebook_pirates_nav_skill'));
        if (!isNaN(lsSkill)) skillVal = lsSkill;
      }
      if (isNaN(skillVal) && window.parent && window.parent !== window) {
        try {
          if (typeof window.parent.navSkill === 'number') skillVal = window.parent.navSkill;
        } catch (e) {}
      }
      if (!isNaN(skillVal)) {
        state.navSkill = Math.max(0, Math.min(100, skillVal));
      }
    } catch (e) {}
  }

  function hasPlayedBefore() {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('played') === '1') return true;
      if (localStorage.getItem('ebook_pirates_sonar_played') === '1') return true;
    } catch (e) {}
    return state.streak > 0 || state.navPoints > 0;
  }

  function markSonarPlayed() {
    state.isFirstTime = false;
    try { localStorage.setItem('ebook_pirates_sonar_played', '1'); } catch (e) {}
  }

  loadExternalShipHp();
  loadExternalNavSkill();
  state.isFirstTime = !hasPlayedBefore();
  initCourse(getDifficultyForStreak(state.streak));

  return {
    state,
    initCourse,
    loadExternalShipHp,
    loadExternalNavSkill,
    hasPlayedBefore,
    markSonarPlayed,
    findSafePathFrom,
    getDifficultyForStreak,
    computeShortestPathLen,
    calculateWinNavPoints,
    scanCell,
    plotPathCell,
    undoLastPathStep,
    launchShip
  };
})();

