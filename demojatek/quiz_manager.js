// ============================================================================
// 📜 eBookPirates – Kalózsziget QuizManager & Protocol Chain
// ============================================================================

window.QuizConfig = {
  // ─── 🔴 TZQSvA: Hosszú kérdések (> 50 karakter) – 3 Soros elrendezés (Rézívbe felhúzva) ───
  TZQSvA: {
    name: "TZQSvA",
    description: "TUTORZEP Hosszú kérdések (> 50 karakter) – 3 Soros elrendezés",
    panelWidth: 831,
    panelHeight: 768,
    question_line1: {
      top: 195,
      left: 300,
      width: 235,
      height: 30,
      fontSize: 22,
      lineHeight: 1,
      maxChars: 16
    },
    question_line2: {
      top: 220,
      left: 145,
      width: 555,
      height: 35,
      fontSize: 22,
      lineHeight: 1,
      maxChars: 42
    },
    question_line3: {
      top: 256,
      left: 145,
      width: 555,
      height: 30,
      fontSize: 22,
      lineHeight: 1,
      maxChars: 42
    },
    answers: [
      { top: 295, left: 145, width: 560, height: 42, fontSize: 20 },
      { top: 370, left: 145, width: 560, height: 42, fontSize: 20 },
      { top: 455, left: 145, width: 560, height: 42, fontSize: 20 },
      { top: 517, left: 145, width: 560, height: 42, fontSize: 20 }
    ]
  },
  // ─── 🔵 TZQSvB: Normál/Rövid kérdések (<= 50 karakter) – 2 Soros kiegyensúlyozott elrendezés ───
  TZQSvB: {
    name: "TZQSvB",
    description: "TUTORZEP Normál/Rövid kérdések (<= 50 karakter) – 2 Soros elrendezés",
    panelWidth: 831,
    panelHeight: 768,
    question_line1: {
      top: 196,
      left: 302,
      width: 230,
      height: 38,
      fontSize: 23,
      lineHeight: 1.25,
      maxChars: 18
    },
    question_line2: {
      top: 236,
      left: 145,
      width: 555,
      height: 38,
      fontSize: 23,
      lineHeight: 1.25,
      maxChars: 42
    },
    question_line3: null,
    answers: [
      { top: 293, left: 145, width: 560, height: 42, fontSize: 21 },
      { top: 370, left: 145, width: 560, height: 42, fontSize: 21 },
      { top: 455, left: 145, width: 560, height: 42, fontSize: 21 },
      { top: 517, left: 145, width: 560, height: 42, fontSize: 21 }
    ]
  },
  TUTORZEP: {
    panelWidth: 831,
    panelHeight: 768
  },
  DEFAULT: {
    panelWidth: 780,
    panelHeight: 0,
    padTop: 85, padRight: 105, padBottom: 65, padLeft: 105,
    qMarginBottom: 20, qMinHeight: 60, qFontSize: 20,
    qWidth: "100%",
    ansGap: 10, ansFontSize: 15,
    btnMt0: 0, btnMt1: 0, btnMt2: 0, btnMt3: 0,
    btnHeight: 0
  }
};

class QuizManager {
  constructor() {
    this.questions = [];
    this.questionsByBaseId = {}; // { HU: { baseId: q }, EN: { ... } }
    this.rawLanguageData = {};   // { HU: { GameInfo: [], TUTORZEP: [] } }

    this.currentQuestion = null;
    this.currentBaseId = null;
    this.currentShuffledOrder = null;
    this.currentCorrectIndex = 0;
    this.currentMode = null;
    this.isQuizModalOpen = false;
    this.onCompleteCallback = null;
    this.isRendering = false;
    this.uiReady = false;
    this.pendingSync = false;

    // Pedagógiai és szekvenciális kérdéskövető Set-ek (sessionStorage-al szinkronban)
    this.answeredCorrectlyIds = new Set();
    this.missedQuestionIds = new Set();
    this.currentlySeenIds = new Set();

    this.initSessionState();
    this.loadQuestions();

    if (document.getElementById("quiz-overlay")) {
      this.uiReady = true;
      this.bindEvents();
      this.initVisualEditor();
    } else {
      this.loadUI();
    }
  }

  // ─── 💾 [ASKED PROTOKOLL]: SESSION STORAGE ÁLLAPOTKEZELÉS ───
  initSessionState() {
    const state = this.getSessionState();
    Object.keys(state).forEach(baseId => {
      const rec = state[baseId];
      if (rec.asked) this.currentlySeenIds.add(baseId);
      if (rec.answeredCorrectly === true) this.answeredCorrectlyIds.add(baseId);
      if (rec.answeredCorrectly === false) this.missedQuestionIds.add(baseId);
    });
  }

  getSessionState() {
    try {
      const raw = sessionStorage.getItem('ebookpirates_quiz_session_state');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  saveSessionState(state) {
    try {
      sessionStorage.setItem('ebookpirates_quiz_session_state', JSON.stringify(state));
    } catch (e) {
      console.warn("Nem sikerült menteni a sessionStorage-ba:", e);
    }
  }

  setSessionRecord(baseId, updates) {
    if (!baseId) return;
    const state = this.getSessionState();
    state[baseId] = Object.assign(state[baseId] || { baseId: baseId, asked: false, answeredCorrectly: null, shuffledOrder: null }, updates);
    this.saveSessionState(state);
  }

  getSessionRecord(baseId) {
    if (!baseId) return null;
    const state = this.getSessionState();
    return state[baseId] || null;
  }

  // ─── 🌐 AKTUÁLIS NYELV MEGHATÁROZÁSA ───
  getCurrentLang() {
    let lang = window.currentLanguage || localStorage.getItem('ebook_pirates_language') || localStorage.getItem('siteLang') || 'hu';
    lang = String(lang).trim().toUpperCase();
    const validLangs = ['HU', 'EN', 'DE', 'FR', 'ES', 'PL', 'RU'];
    return validLangs.includes(lang) ? lang : 'HU';
  }

  // ─── 📥 [LOAD PROTOKOLL]: NYELVI FÁJLOK BETÖLTÉSE ───
  async loadQuestions(targetLang = null) {
    const lang = targetLang || this.getCurrentLang();
    if (this.questionsByBaseId[lang]) {
      this.questions = this.buildFlatQuestionList(lang);
      return this.questions;
    }

    try {
      const fileName = `QQ_${lang}_Translate.json?t=` + Date.now();
      const res = await fetch(fileName);
      if (res.ok) {
        const data = await res.json();
        this.rawLanguageData[lang] = data;
        this.indexQuestionsForLang(lang, data);
        this.questions = this.buildFlatQuestionList(lang);
        console.log(`⚓ QuizManager: ${lang} kérdésfájl (${this.questions.length} kérdés) sikeresen betöltve.`);
      } else {
        console.warn(`Nem sikerült betölteni a(z) ${fileName} fájlt, fallback a HU-ra.`);
        if (lang !== 'HU') await this.loadQuestions('HU');
      }
    } catch (e) {
      console.error(`Hiba a kvízkérdések (${lang}) betöltésekor:`, e);
      if (lang !== 'HU') await this.loadQuestions('HU');
    }
    return this.questions;
  }

  indexQuestionsForLang(lang, data) {
    if (!this.questionsByBaseId[lang]) {
      this.questionsByBaseId[lang] = {};
    }
    const categories = ['GameInfo', 'TUTORZEP'];
    categories.forEach(cat => {
      const list = data[cat] || [];
      list.forEach(q => {
        const baseId = q.baseId || q.uid || String(q.id);
        this.questionsByBaseId[lang][baseId] = q;
      });
    });
  }

  buildFlatQuestionList(lang) {
    const data = this.rawLanguageData[lang];
    if (!data) return [];
    let list = [];
    if (Array.isArray(data.GameInfo)) list = list.concat(data.GameInfo);
    if (Array.isArray(data.TUTORZEP)) list = list.concat(data.TUTORZEP);
    return list;
  }

  // ─── 🔄 [IDSEARCH PROTOKOLL]: VALÓS IDEJŰ NYELVVÁLTÁS A KVÍZ KÖZBEN ───
  async onLanguageChanged(newLang) {
    const targetLang = String(newLang || 'HU').trim().toUpperCase();
    console.log(`🌐 QuizManager: Nyelvváltás esemény fogadva: -> ${targetLang}`);

    // Betöltjük az új nyelv adatait, ha még nincsenek a memóriában
    if (!this.questionsByBaseId[targetLang]) {
      await this.loadQuestions(targetLang);
    }
    this.questions = this.buildFlatQuestionList(targetLang);

    // HA A KVÍZABLAK ÉPP NYITVA VAN:
    if (this.isQuizModalOpen && this.currentBaseId) {
      const newQuestion = (this.questionsByBaseId[targetLang] && this.questionsByBaseId[targetLang][this.currentBaseId]);
      if (newQuestion) {
        this.currentQuestion = newQuestion;
        console.log(`🎯 Kérdés azonnali frissítése az új nyelvre (${targetLang}), BaseID: ${this.currentBaseId}`);
        // Újrarajzolás: az eredeti shuffledOrder megtartásával!
        this.renderQuestion(true);
      } else {
        console.warn(`Nem található a(z) ${this.currentBaseId} azonosítójú kérdés a(z) ${targetLang} fordításban!`);
      }
    }
  }

  // ─── 📐 PANEL SKÁLÁZÁS ───
  updateScale() {
    const panel = document.getElementById('quiz-panel-box');
    if (!panel) return;
    const isZep = this.currentMode === 'TUTORZEP' || this.currentMode === 'TUTOR_GameInfo' || this.currentMode === 'GameInfo';
    const baseW = isZep ? 831 : 780;
    const baseH = isZep ? 768 : 650;

    const availW = window.innerWidth * 0.95;
    const availH = window.innerHeight * 0.95;
    const scale = Math.min(1.0, availW / baseW, availH / baseH);

    panel.style.transform = `scale(${scale})`;
    panel.style.transformOrigin = 'center center';
  }

  // ─── 🖼️ UI BETÖLTÉSE ───
  async loadUI() {
    try {
      const res = await fetch('quiz_panel.html?t=' + Date.now());
      if (res.ok) {
        const html = await res.text();
        const div = document.createElement('div');
        div.innerHTML = html;
        const appendToDoc = () => {
          if (document.body) {
            document.body.appendChild(div);
            this.uiReady = true;
            this.bindEvents();
            this.initVisualEditor();
            console.log("⚓ Kvíz panel UI sikeresen inicializálva!");
          } else {
            setTimeout(appendToDoc, 50);
          }
        };
        appendToDoc();
      }
    } catch (e) {
      console.error("Hiba a kvíz UI betöltésekor:", e);
    }
  }

  // ─── 🖱️ ESEMÉNYEK BEKÖTÉSE ───
  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.uiReady && this.isQuizModalOpen) this.updateScale();
    });

    window.addEventListener('languageChanged', (e) => {
      const lang = (e && e.detail && e.detail.language) || window.currentLanguage;
      if (lang) this.onLanguageChanged(lang);
    });

    const container = document.getElementById('quiz-answers-container');
    if (container) {
      container.addEventListener('click', (e) => {
        const btn = e.target.closest('.quiz-ans-btn');
        if (btn) {
          const selectedIdx = parseInt(btn.getAttribute('data-index'), 10);
          this.handleAnswer(selectedIdx);
        }
      });
    }
  }

  getQuestionId(q) {
    return q.baseId || q.uid || q.id || q.Kerdes || q.question;
  }

  // ─── 🚀 [TRIGGER PROTOKOLL]: KVÍZ MEGNYITÁSA ───
  openQuiz(category, onComplete) {
    if (!this.uiReady || this.questions.length === 0) {
      setTimeout(() => this.openQuiz(category, onComplete), 100);
      return;
    }

    this.currentMode = category;
    this.onCompleteCallback = onComplete || null;

    let available = [];
    const allQ = this.questions || [];

    if (category === 'TUTORZEP') {
      // 1. Még nem látott TUTORZEP kérdések
      available = allQ.filter(q => {
        const cat = q.category || q.Tipus;
        const baseId = this.getQuestionId(q);
        return cat === 'TUTORZEP' && !this.answeredCorrectlyIds.has(baseId) && !this.currentlySeenIds.has(baseId);
      });

      // 2. Korábban elrontott kérdések újrakérdezése
      if (available.length === 0) {
        available = allQ.filter(q => {
          const cat = q.category || q.Tipus;
          const baseId = this.getQuestionId(q);
          return cat === 'TUTORZEP' && !this.answeredCorrectlyIds.has(baseId) && this.missedQuestionIds.has(baseId);
        });
      }

      // 3. Ha minden kérdés elfogyott: ciklus újraindítása
      if (available.length === 0) {
        const tutorzepIds = new Set(allQ.filter(q => (q.category || q.Tipus) === 'TUTORZEP').map(q => this.getQuestionId(q)));
        for (let id of tutorzepIds) {
          this.answeredCorrectlyIds.delete(id);
          this.currentlySeenIds.delete(id);
          this.missedQuestionIds.delete(id);
        }
        available = allQ.filter(q => (q.category || q.Tipus) === 'TUTORZEP');
      }

    } else if (category === 'TUTOR_GameInfo' || category === 'GameInfo') {
      // Tutorial Hártyafelvétel: Kizárólag GameInfo kérdések
      available = allQ.filter(q => {
        const cat = q.category || q.Tipus;
        const baseId = this.getQuestionId(q);
        return cat === 'GameInfo' && !this.answeredCorrectlyIds.has(baseId) && !this.currentlySeenIds.has(baseId);
      });

      if (available.length === 0) {
        available = allQ.filter(q => {
          const cat = q.category || q.Tipus;
          const baseId = this.getQuestionId(q);
          return cat === 'GameInfo' && !this.answeredCorrectlyIds.has(baseId) && this.missedQuestionIds.has(baseId);
        });
      }

      if (available.length === 0) {
        console.log('🎓 Mind a 14 db GameInfo kérdés sikeresen megtanulva! Nincs több hártyafelvételi kvíz.');
        if (this.onCompleteCallback) {
          const cb = this.onCompleteCallback;
          this.onCompleteCallback = null;
          cb(true);
        }
        return;
      }
    } else {
      // Fallback általános szűrés
      available = allQ.filter(q => {
        const baseId = this.getQuestionId(q);
        return !this.answeredCorrectlyIds.has(baseId) && !this.currentlySeenIds.has(baseId);
      });
      if (available.length === 0) available = allQ;
    }

    this.currentQuestion = available[Math.floor(Math.random() * available.length)];
    this.currentBaseId = this.getQuestionId(this.currentQuestion);
    this.currentlySeenIds.add(this.currentBaseId);

    // Válaszok egyszeri, fix megkeverése a kérdés nyitásakor
    const numAnswers = Array.isArray(this.currentQuestion.answers) ? this.currentQuestion.answers.length : 4;
    const indices = [];
    for (let i = 0; i < numAnswers; i++) indices.push(i);
    indices.sort(() => Math.random() - 0.5);
    this.currentShuffledOrder = indices;

    // Rögzítés a sessionStorage-ba
    this.setSessionRecord(this.currentBaseId, {
      baseId: this.currentBaseId,
      asked: true,
      answeredCorrectly: null,
      shuffledOrder: this.currentShuffledOrder
    });

    this.isQuizModalOpen = true;
    this.renderQuestion(false);
  }

  // ─── 🎨 [DISPLAY, LAYOUT, SETUP & RENDER PROTOKOLLOK] ───
  renderQuestion(isMidQuizSwitch = false) {
    const overlay = document.getElementById('quiz-overlay');
    const panel = document.getElementById('quiz-panel-box');
    const qText = document.getElementById('quiz-question-text');
    const title = document.getElementById('quiz-title');
    const ansContainer = document.getElementById('quiz-answers-container');

    if (!overlay || !panel || !ansContainer) return;

    if (title) title.style.display = 'none';
    if (qText) qText.style.display = 'none';

    // 1. Válaszok és helyes index kinyerése
    const answers = Array.isArray(this.currentQuestion.answers) ? [...this.currentQuestion.answers] : [];
    this.currentCorrectIndex = typeof this.currentQuestion.correctIndex === 'number' ? this.currentQuestion.correctIndex : 0;

    // Ha nincs mentett keverés (vagy hibás), generálunk
    if (!this.currentShuffledOrder || this.currentShuffledOrder.length !== answers.length) {
      const record = this.getSessionRecord(this.currentBaseId);
      if (record && Array.isArray(record.shuffledOrder) && record.shuffledOrder.length === answers.length) {
        this.currentShuffledOrder = record.shuffledOrder;
      } else {
        const ind = answers.map((_, i) => i);
        ind.sort(() => Math.random() - 0.5);
        this.currentShuffledOrder = ind;
      }
    }
    const indices = this.currentShuffledOrder;

    // 2. Tisztítás: Kérdésszöveg megtisztítása szerzői <br> és dupla space-ektől
    const rawQText = this.currentQuestion.question || this.currentQuestion.Kerdes || "";
    const cleanQText = rawQText
      .replace(/<[^>]*>/g, ' ')
      .replace(/[\r\n\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 3. [LAYOUT PROTOKOLL]: Hossz szerinti elrendezés választás
    // <= 50 karakter: TZQSvB (2 soros kiegyensúlyozott elrendezés)
    // > 50 karakter: TZQSvA (3 soros rézívbe felhúzva)
    const isLong = cleanQText.length > 50;
    const activeSetup = isLong ? window.QuizConfig.TZQSvA : window.QuizConfig.TZQSvB;

    // Nyelv és font beállítások (Orosz nyelv esetén cirill-kompatibilis betűtípus)
    const curLang = this.getCurrentLang();
    const isRussian = curLang === 'RU';
    const baseFontFamily = isRussian ? "'Georgia', Arial, sans-serif" : "'Briskb', 'Courier New', monospace";

    panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/airship_quiz_panel_clean.png') no-repeat center / 100% 100%";
    panel.style.position = "relative";
    panel.style.width = "831px";
    panel.style.height = "768px";
    panel.style.padding = "0px";
    panel.style.display = "block";

    // 3 Kérdéssor konténer felépítése/kezelése
    let qBox1 = document.getElementById('quiz-qbox-1');
    let qBox2 = document.getElementById('quiz-qbox-2');
    let qBox3 = document.getElementById('quiz-qbox-3');

    if (!qBox1) { qBox1 = document.createElement('div'); qBox1.id = 'quiz-qbox-1'; panel.appendChild(qBox1); }
    if (!qBox2) { qBox2 = document.createElement('div'); qBox2.id = 'quiz-qbox-2'; panel.appendChild(qBox2); }
    if (!qBox3) { qBox3 = document.createElement('div'); qBox3.id = 'quiz-qbox-3'; panel.appendChild(qBox3); }

    const applyBoxStyle = (box, cfg) => {
      if (!cfg) {
        box.style.display = 'none';
        box.innerText = '';
        return;
      }
      box.style.display = 'flex';
      box.style.position = 'absolute';
      box.style.top = cfg.top + 'px';
      box.style.left = cfg.left + 'px';
      box.style.width = cfg.width + 'px';
      box.style.height = cfg.height + 'px';
      box.style.fontSize = (isRussian ? Math.max(18, cfg.fontSize - 2) : cfg.fontSize) + 'px';
      box.style.lineHeight = cfg.lineHeight || 1.2;
      box.style.fontFamily = baseFontFamily;
      box.style.fontWeight = 'bold';
      box.style.color = '#ffd700';
      box.style.textShadow = '1px 1px 2px rgba(0,0,0,0.85)';
      box.style.alignItems = 'center';
      box.style.justifyContent = 'center';
      box.style.textAlign = 'center';
      box.style.boxSizing = 'border-box';
      box.style.overflow = 'hidden';
      box.style.whiteSpace = 'nowrap';
      box.style.userSelect = 'none';
      box.style.border = window._quizDebugBorders ? '2px dashed cyan' : 'none';
    };

    applyBoxStyle(qBox1, activeSetup.question_line1);
    applyBoxStyle(qBox2, activeSetup.question_line2);
    applyBoxStyle(qBox3, activeSetup.question_line3);

    // 4. [SETUP PROTOKOLL]: Szavak pontos csomagolása
    const words = cleanQText.split(' ').filter(w => w.length > 0);
    let line1 = '', line2 = '', line3 = '';

    if (!isLong) {
      // ─── TZQSvB (<= 50 kar.): 2 Soros Elrendezés (Line 1: max ~18 kar., Line 2: max ~42 kar.) ───
      let wIdx = 0;
      const maxL1 = activeSetup.question_line1.maxChars || 18;
      while (wIdx < words.length) {
        const candidate = line1 ? (line1 + ' ' + words[wIdx]) : words[wIdx];
        if (!line1 || candidate.length <= maxL1) {
          line1 = candidate;
          wIdx++;
        } else {
          break;
        }
      }
      line2 = words.slice(wIdx).join(' ');
      line3 = '';
    } else {
      // ─── TZQSvA (> 50 kar.): 3 Soros Elrendezés (Line 1: max ~16 kar., Line 2 & 3: kiegyensúlyozva ~42 kar.) ───
      let wIdx = 0;
      const maxL1 = activeSetup.question_line1.maxChars || 16;
      while (wIdx < words.length) {
        const candidate = line1 ? (line1 + ' ' + words[wIdx]) : words[wIdx];
        if (!line1 || candidate.length <= maxL1) {
          line1 = candidate;
          wIdx++;
        } else {
          break;
        }
      }
      const remWords = words.slice(wIdx);
      const remLen = remWords.join(' ').length;
      if (remLen > 42) {
        let l2Words = [];
        for (let w of remWords) {
          const cand = l2Words.concat([w]).join(' ');
          if (l2Words.length === 0 || cand.length <= 42) {
            l2Words.push(w);
          } else {
            break;
          }
        }
        line2 = l2Words.join(' ');
        line3 = remWords.slice(l2Words.length).join(' ');
      } else {
        const half = Math.ceil(remWords.length / 2);
        line2 = remWords.slice(0, half).join(' ');
        line3 = remWords.slice(half).join(' ');
      }
    }

    qBox1.innerText = line1;
    qBox2.innerText = line2;
    qBox3.innerText = line3;

    // 5. Válasz Falap Gombok Elhelyezése (Fix pozíciók, új nyelv szerinti feliratok)
    ansContainer.innerHTML = '';
    ansContainer.style.position = "static";
    ansContainer.style.margin = "0px";
    ansContainer.style.padding = "0px";

    const letters = ["A", "B", "C", "D"];

    indices.forEach((actualAnsIdx, displayPos) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-ans-btn';
      btn.setAttribute('data-index', actualAnsIdx);
      btn.id = 'quiz-ans-btn-' + displayPos;

      const rawAnsText = answers[actualAnsIdx] || '';
      const cleanAnsText = rawAnsText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      btn.innerText = `${letters[displayPos]}) ${cleanAnsText}`;

      const ansCfg = activeSetup.answers[displayPos] || { top: 295, left: 145, width: 560, height: 42, fontSize: 20 };

      // Orosz vagy hosszú válasz betűméret-finomítás
      let computedAnsFs = isRussian ? Math.max(16, ansCfg.fontSize - 3) : ansCfg.fontSize;
      if (cleanAnsText.length > 40) computedAnsFs = Math.min(computedAnsFs, 17);
      if (cleanAnsText.length > 50) computedAnsFs = Math.min(computedAnsFs, 15);

      btn.style.position = "absolute";
      btn.style.top = ansCfg.top + "px";
      btn.style.left = ansCfg.left + "px";
      btn.style.width = ansCfg.width + "px";
      btn.style.height = ansCfg.height + "px";
      btn.style.background = "transparent";
      btn.style.border = window._quizDebugBorders ? "2px dashed lime" : "none";
      btn.style.boxShadow = "none";
      btn.style.color = "#ffd700";
      btn.style.textShadow = "1px 1px 2px rgba(0,0,0,0.85)";
      btn.style.fontFamily = baseFontFamily;
      btn.style.fontSize = computedAnsFs + "px";
      btn.style.fontWeight = "bold";
      btn.style.padding = "0px 20px";
      btn.style.margin = "0px";
      btn.style.boxSizing = "border-box";
      btn.style.display = "flex";
      btn.style.alignItems = "center";
      btn.style.justifyContent = "center";
      btn.style.textAlign = "center";
      btn.style.cursor = "pointer";
      btn.style.lineHeight = "1.2";
      btn.style.overflow = "hidden";
      btn.style.whiteSpace = "nowrap";

      btn.onmouseenter = () => { btn.style.color = "#ffffff"; };
      btn.onmouseleave = () => { btn.style.color = "#ffd700"; };

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleAnswer(actualAnsIdx);
      });
      ansContainer.appendChild(btn);
    });

    this.updateScale();
    window.isCutscenePlaying = true;
    overlay.style.display = 'flex';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    overlay.style.zIndex = '99995'; // Topbar alatt (topbar: 100000)
  }

  // ─── 🚪 KVÍZ ABLAK BEZÁRÁSA ───
  closeQuizUI() {
    const overlay = document.getElementById('quiz-overlay');
    if (overlay) overlay.style.display = 'none';
    const qb1 = document.getElementById('quiz-qbox-1');
    const qb2 = document.getElementById('quiz-qbox-2');
    const qb3 = document.getElementById('quiz-qbox-3');
    if (qb1) qb1.style.display = 'none';
    if (qb2) qb2.style.display = 'none';
    if (qb3) qb3.style.display = 'none';

    this.isQuizModalOpen = false;
    window.isCutscenePlaying = false;

    // Ha időközben be volt ütemezve egy háttér-szinkronizáció, most futtatjuk le!
    if (this.pendingSync) {
      this.pendingSync = false;
      if (typeof window.executeDelayedSync === 'function') {
        window.executeDelayedSync();
      }
    }
  }

  // ─── ⚖️ [ANSWER PROTOKOLL]: VÁLASZ KIÉRTÉKELÉSE ÉS EREDMÉNYKEZELÉS ───
  handleAnswer(selectedIdx) {
    const isCorrect = (selectedIdx === this.currentCorrectIndex);
    const qId = this.currentBaseId;

    if (isCorrect) {
      this.answeredCorrectlyIds.add(qId);
      this.missedQuestionIds.delete(qId);
      this.setSessionRecord(qId, { answeredCorrectly: true });
    } else {
      this.missedQuestionIds.add(qId);
      this.setSessionRecord(qId, { answeredCorrectly: false });
    }

    const finishQuiz = () => {
      this.closeQuizUI();
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        try { cb(isCorrect); } catch (err) { console.error('Quiz callback hiba:', err); }
      }
    };

    if (this.currentMode === 'TUTORZEP') {
      if (isCorrect) {
        const msg = (window.gamePopups && window.gamePopups.airship_good) || "Szép volt. Folytasd a melót!";
        if (typeof window.showPopUp === 'function') {
          window.showPopUp(msg, finishQuiz);
        } else {
          finishQuiz();
        }
      } else {
        if (typeof window.carriedMembranes === 'number' && window.carriedMembranes > 0) {
          window.carriedMembranes = 0;
          const msg = (window.gamePopups && window.gamePopups.airship_bad) || "Ezek most kiraboltak.\nMost mehetünk ki tovább halászni.";
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, finishQuiz);
          } else {
            finishQuiz();
          }
        } else {
          const onMonologClosed = () => {
            if (window.boat && window.homePos) {
              window.boat.position.set(window.homePos.x, 0, window.homePos.z);
              if (window.homeRotY !== undefined) {
                window.boat.rotation.y = window.homeRotY;
              } else {
                window.boat.rotation.y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180);
              }
            }
            finishQuiz();
          };

          const emptyText = (window.gameMonologues && window.gameMonologues.airship_bad_empty) ||
            (window.gamePopups && window.gamePopups.airship_bad_empty) ||
            "Most jobb lesz, ha eltűnünk a szemük elől,\nmielőtt a tengerbe hajítanak minket.";

          if (typeof window.showInGameMonolog === 'function') {
            window.showInGameMonolog('airship_bad_empty', onMonologClosed);
          } else if (typeof window.showPopUp === 'function') {
            window.showPopUp(emptyText, onMonologClosed);
          } else {
            onMonologClosed();
          }
        }
      }
    } else {
      finishQuiz();
    }
  }

  // ─── 🛠️ ÉLŐ VIZUÁLIS SZERKESZTŐ PANEL ───
  initVisualEditor() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1' && params.get('editor') !== '1') {
      return;
    }
    let editor = document.getElementById('quiz-visual-editor');
    if (editor) return;

    editor = document.createElement('div');
    editor.id = 'quiz-visual-editor';
    editor.style.cssText = 'display: none; position: fixed; bottom: 10px; right: 10px; width: 380px; max-height: 85vh; background: rgba(20, 15, 10, 0.95); border: 2px solid #ffcc00; border-radius: 8px; color: #ffea00; font-family: sans-serif; font-size: 13px; z-index: 100000; padding: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.8); overflow-y: auto;';

    editor.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #554422; padding-bottom: 4px;">
        <strong style="font-size: 14px;">🛠️ TUTORZEP Falap Szerkesztő</strong>
        <button id="qve-close" style="background:#552222; color:#fff; border:none; border-radius:3px; cursor:pointer; padding:2px 8px;">✕</button>
      </div>

      <div style="margin-bottom: 8px;">
        <label><input type="checkbox" id="qve-borders" checked> 🔲 Keretek megjelenítése (Box Outlines)</label>
      </div>

      <div style="font-weight: bold; color: #66ddff; margin-top: 6px;">📜 Kérdés Doboz (Question Box)</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
        <div>Top: <input type="number" id="qve-q-top" style="width: 60px;"> px</div>
        <div>Height: <input type="number" id="qve-q-height" style="width: 60px;"> px</div>
        <div>Left: <input type="number" id="qve-q-left" style="width: 60px;"> px</div>
        <div>Width: <input type="number" id="qve-q-width" style="width: 60px;"> px</div>
        <div style="grid-column: span 2;">Betűméret: <input type="number" id="qve-q-font" style="width: 60px;"> px</div>
      </div>

      <div style="font-weight: bold; color: #88ff88; margin-top: 6px;">🅰️ Falap 1 - Válasz A</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
        <div>Top: <input type="number" id="qve-a0-top" style="width: 60px;"> px</div>
        <div>Height: <input type="number" id="qve-a0-height" style="width: 60px;"> px</div>
      </div>

      <div style="font-weight: bold; color: #88ff88; margin-top: 6px;">🅱️ Falap 2 - Válasz B</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
        <div>Top: <input type="number" id="qve-a1-top" style="width: 60px;"> px</div>
        <div>Height: <input type="number" id="qve-a1-height" style="width: 60px;"> px</div>
      </div>

      <div style="font-weight: bold; color: #88ff88; margin-top: 6px;">🅲 Falap 3 - Válasz C</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
        <div>Top: <input type="number" id="qve-a2-top" style="width: 60px;"> px</div>
        <div>Height: <input type="number" id="qve-a2-height" style="width: 60px;"> px</div>
      </div>

      <div style="font-weight: bold; color: #88ff88; margin-top: 6px;">🅳 Falap 4 - Válasz D</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 6px;">
        <div>Top: <input type="number" id="qve-a3-top" style="width: 60px;"> px</div>
        <div>Height: <input type="number" id="qve-a3-height" style="width: 60px;"> px</div>
      </div>

      <div style="font-weight: bold; color: #ffaa55; margin-top: 6px;">📐 Válaszok Szélesség & Bal margó</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px;">
        <div>Left: <input type="number" id="qve-ans-left" style="width: 60px;"> px</div>
        <div>Width: <input type="number" id="qve-ans-width" style="width: 60px;"> px</div>
        <div style="grid-column: span 2;">Betűméret: <input type="number" id="qve-ans-font" style="width: 60px;"> px</div>
      </div>

      <div style="margin-top: 10px; display: flex; gap: 6px;">
        <button id="qve-copy-btn" style="flex: 1; padding: 6px; background: #225522; color: #fff; border: 1px solid #44aa44; border-radius: 4px; cursor: pointer; font-weight: bold;">📋 Másolás Vágólapra</button>
        <button id="qve-test-btn" style="padding: 6px 10px; background: #223366; color: #fff; border: 1px solid #4466aa; border-radius: 4px; cursor: pointer;">🎲 Új Kérdés</button>
      </div>
    `;

    document.body.appendChild(editor);

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'qve-toggle-btn';
    toggleBtn.innerText = '🛠️ Kvíz Szerkesztő';
    toggleBtn.style.cssText = 'position: fixed; bottom: 10px; right: 10px; z-index: 99999; background: #332211; color: #ffea00; border: 1px solid #ffcc00; padding: 6px 12px; border-radius: 5px; font-family: sans-serif; font-size: 12px; cursor: pointer; opacity: 0.8;';
    toggleBtn.onclick = () => {
      const isOpening = editor.style.display === 'none';
      editor.style.display = isOpening ? 'block' : 'none';
      if (isOpening) {
        document.getElementById('qve-borders').checked = true;
        window._quizDebugBorders = true;
        this.populateVisualEditorFields();
        this.applyLiveStyles();
      } else {
        window._quizDebugBorders = false;
        this.applyLiveStyles();
      }
    };
    document.body.appendChild(toggleBtn);

    document.getElementById('qve-close').onclick = () => {
      editor.style.display = 'none';
      window._quizDebugBorders = false;
      this.applyLiveStyles();
    };

    const updateLive = () => {
      const cfg = window.QuizConfig.TUTORZEP;
      const qTop = parseInt(document.getElementById('qve-q-top').value, 10);
      const qH = parseInt(document.getElementById('qve-q-height').value, 10);
      const qL = parseInt(document.getElementById('qve-q-left').value, 10);
      const qW = parseInt(document.getElementById('qve-q-width').value, 10);
      const qF = parseInt(document.getElementById('qve-q-font').value, 10);

      if (!isNaN(qTop)) cfg.question_line1 = Object.assign(cfg.question_line1 || {}, { top: qTop });
      if (!isNaN(qH)) cfg.question_line1 = Object.assign(cfg.question_line1 || {}, { height: qH });
      if (!isNaN(qL)) cfg.question_line1 = Object.assign(cfg.question_line1 || {}, { left: qL });
      if (!isNaN(qW)) cfg.question_line1 = Object.assign(cfg.question_line1 || {}, { width: qW });
      if (!isNaN(qF)) cfg.question_line1 = Object.assign(cfg.question_line1 || {}, { fontSize: qF });

      const ansLeft = parseInt(document.getElementById('qve-ans-left').value, 10) || 145;
      const ansWidth = parseInt(document.getElementById('qve-ans-width').value, 10) || 560;
      const ansFont = parseInt(document.getElementById('qve-ans-font').value, 10) || 20;

      for (let i = 0; i < 4; i++) {
        if (!cfg.answers) cfg.answers = [];
        if (!cfg.answers[i]) cfg.answers[i] = {};
        cfg.answers[i].top = parseInt(document.getElementById('qve-a' + i + '-top').value, 10) || cfg.answers[i].top;
        cfg.answers[i].height = parseInt(document.getElementById('qve-a' + i + '-height').value, 10) || cfg.answers[i].height;
        cfg.answers[i].left = ansLeft;
        cfg.answers[i].width = ansWidth;
        cfg.answers[i].fontSize = ansFont;
      }

      window._quizDebugBorders = document.getElementById('qve-borders').checked;
      this.applyLiveStyles();
    };

    const inputs = editor.querySelectorAll('input');
    inputs.forEach(inp => inp.addEventListener('input', updateLive));

    document.getElementById('qve-copy-btn').onclick = () => {
      const jsonStr = JSON.stringify(window.QuizConfig.TUTORZEP, null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        alert('✅ Koordináták másolva a vágólapra!\n\n' + jsonStr);
      }).catch(() => {
        prompt('Másold ki innen a koordinátákat:', jsonStr);
      });
    };

    document.getElementById('qve-test-btn').onclick = () => {
      this.openQuiz('TUTORZEP');
    };
  }

  populateVisualEditorFields() {
    const cfg = window.QuizConfig.TZQSvA;
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    if (cfg && cfg.question_line1) {
      setVal('qve-q-top', cfg.question_line1.top);
      setVal('qve-q-height', cfg.question_line1.height);
      setVal('qve-q-left', cfg.question_line1.left);
      setVal('qve-q-width', cfg.question_line1.width);
      setVal('qve-q-font', cfg.question_line1.fontSize);
    }
    if (cfg && cfg.answers) {
      for (let i = 0; i < 4; i++) {
        if (cfg.answers[i]) {
          setVal('qve-a' + i + '-top', cfg.answers[i].top);
          setVal('qve-a' + i + '-height', cfg.answers[i].height);
        }
      }
      if (cfg.answers[0]) {
        setVal('qve-ans-left', cfg.answers[0].left);
        setVal('qve-ans-width', cfg.answers[0].width);
        setVal('qve-ans-font', cfg.answers[0].fontSize);
      }
    }
  }

  applyLiveStyles() {
    const qBox1 = document.getElementById('quiz-qbox-1');
    if (qBox1) {
      qBox1.style.border = window._quizDebugBorders ? '2px dashed cyan' : 'none';
      qBox1.style.backgroundColor = window._quizDebugBorders ? 'rgba(0, 255, 255, 0.12)' : 'transparent';
    }
    const borderColors = ['#ff3366', '#ffaa00', '#33ff88', '#33ccff'];
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById('quiz-ans-btn-' + i);
      if (btn) {
        btn.style.border = window._quizDebugBorders ? `2px dashed ${borderColors[i]}` : 'none';
        btn.style.backgroundColor = window._quizDebugBorders ? 'rgba(255, 255, 255, 0.08)' : 'transparent';
      }
    }
  }
}

if (typeof window !== 'undefined') {
  if (!window.quizManager) {
    window.quizManager = new QuizManager();
  }
}
