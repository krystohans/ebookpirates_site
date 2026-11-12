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
      maxChars: 48
    },
    question_line3: {
      top: 256,
      left: 145,
      width: 555,
      height: 30,
      fontSize: 22,
      lineHeight: 1,
      maxChars: 48
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
      maxChars: 48
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
    name: "GameInfo_DEFAULT",
    panelOffsetX: 0,
    panelOffsetY: 46,
    scale: 1.2,
    panelWidth: 600,
    panelHeight: 510,
    padTop: 98,
    padRight: 95,
    padBottom: 39,
    padLeft: 97,
    qFontSize: 18,
    qLineHeight: 1.35,
    qMinHeight: 30,
    qMarginBottom: 18,
    qPaddingTopBottom: 35,
    qPaddingLeftRight: 24,
    qWidth: "100%",
    ansGap: 8,
    ansFontSize: 13,
    btnPaddingTopBottom: 4,
    btnPaddingLeftRight: 14,
    btnHeight: 0,
    btnMt0: 0,
    btnMt1: 0,
    btnMt2: 0,
    btnMt3: 0
  },
  BET_DECISION: {
    titleText: "TÉTES KÉRDÉS KÖVETKEZIK!",
    bodyText: "Kockáztatod a csónakodon lévő hártyáidat egy Dupla vagy Semmi játékban?",
    btnYesText: "Kockáztatok, Dupla vagy Semmi!",
    btnNoText: "Kérem a sima kérdést (kockázat nélkül)",
    titleFontSize: 20,
    titleMarginBottom: 14,
    bodyFontSize: 18,
    bodyLineHeight: 1.45,
    qColor: "#e0d4c2",
    qPadV: 13,
    qPadH: 20,
    qMarginBottom: 13,
    btnWidth: 100,
    ansGap: 37,
    btnFontSize: 16,
    btnPadV: 6,
    btnPadH: 20,
    btnYesAlpha: 0.1,
    btnNoAlpha: 0.1,
    panelWidth: 600,
    panelHeight: 502,
    padTop: 96,
    padRight: 95,
    padBottom: 49,
    padLeft: 94,
    scale: 1.2
  }
};

class QuizManager {
// === [#HEX:D.07.72.00] START | name: constructor | lines: 33 ===
// @calls: [#HEX:D.07.80.00], [#HEX:D.07.73.00], [#HEX:D.07.7B.00], [#HEX:D.07.7D.00], [#HEX:D.04.25.00] | @calledBy: none
  constructor() {
    this.questions = [];
    this.questionsByBaseId = {}; // { HU: { baseId: q }, EN: { ... } }
    this.rawLanguageData = {};   // { HU: { TRUE: [], FALSE: [], TUTORZEP: [] } }

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
    this._betDecisionMade = false;

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
// === [#HEX:D.07.72.00] END ===

  // ─── 💾 [ASKED PROTOKOLL]: SESSION STORAGE ÁLLAPOTKEZELÉS ───
// === [#HEX:D.07.73.00] START | name: initSessionState | lines: 9 ===
// @calls: [#HEX:D.07.74.00] | @calledBy: [#HEX:D.07.72.00]
  initSessionState() {
    const state = this.getSessionState();
    Object.keys(state).forEach(baseId => {
      const rec = state[baseId];
      if (rec.asked) this.currentlySeenIds.add(baseId);
      if (rec.answeredCorrectly === true) this.answeredCorrectlyIds.add(baseId);
      if (rec.answeredCorrectly === false) this.missedQuestionIds.add(baseId);
    });
  }
// === [#HEX:D.07.73.00] END ===

// === [#HEX:D.07.74.00] START | name: getSessionState | lines: 8 ===
// @calls: none | @calledBy: [#HEX:D.07.73.00], [#HEX:D.07.76.00], [#HEX:D.07.77.00]
  getSessionState() {
    try {
      const raw = sessionStorage.getItem('ebookpirates_quiz_session_state');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
// === [#HEX:D.07.74.00] END ===

// === [#HEX:D.07.75.00] START | name: saveSessionState | lines: 7 ===
// @calls: none | @calledBy: [#HEX:D.07.76.00]
  saveSessionState(state) {
    try {
      sessionStorage.setItem('ebookpirates_quiz_session_state', JSON.stringify(state));
    } catch (e) {
      console.warn("Nem sikerült menteni a sessionStorage-ba:", e);
    }
  }
// === [#HEX:D.07.75.00] END ===

// === [#HEX:D.07.76.00] START | name: setSessionRecord | lines: 6 ===
// @calls: [#HEX:D.07.74.00], [#HEX:D.07.75.00] | @calledBy: [#HEX:D.04.29.00], [#HEX:D.04.2C.00]
  setSessionRecord(baseId, updates) {
    if (!baseId) return;
    const state = this.getSessionState();
    state[baseId] = Object.assign(state[baseId] || { baseId: baseId, asked: false, answeredCorrectly: null, shuffledOrder: null }, updates);
    this.saveSessionState(state);
  }
// === [#HEX:D.07.76.00] END ===

// === [#HEX:D.07.77.00] START | name: getSessionRecord | lines: 5 ===
// @calls: [#HEX:D.07.74.00] | @calledBy: [#HEX:D.04.2A.00]
  getSessionRecord(baseId) {
    if (!baseId) return null;
    const state = this.getSessionState();
    return state[baseId] || null;
  }
// === [#HEX:D.07.77.00] END ===

  // ─── 🌐 AKTUÁLIS NYELV MEGHATÁROZÁSA ───
// === [#HEX:D.07.78.00] START | name: getCurrentLang | lines: 6 ===
// @calls: none | @calledBy: [#HEX:D.04.25.00], [#HEX:D.04.2A.00], [#HEX:D.04.2C.00]
  getCurrentLang() {
    let lang = window.currentLanguage || localStorage.getItem('ebook_pirates_language') || localStorage.getItem('siteLang') || 'hu';
    lang = String(lang).trim().toUpperCase();
    const validLangs = ['HU', 'EN', 'DE', 'FR', 'ES', 'PL', 'RU'];
    return validLangs.includes(lang) ? lang : 'HU';
  }
// === [#HEX:D.07.78.00] END ===

  // ─── 📥 [LOAD PROTOKOLL]: NYELVI FÁJLOK BETÖLTÉSE ───
// === [#HEX:D.04.25.00] START | name: loadQuestions | lines: 26 ===
// @calls: [#HEX:D.04.26.00], [#HEX:D.04.27.00], [#HEX:D.07.78.00] | @calledBy: [#HEX:D.07.72.00], [#HEX:D.07.79.00]
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
        console.log(`⚓ Membrane Hunting QuizManager: ${lang} kérdésfájl (${this.questions.length} kérdés) sikeresen betöltve.`);
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
// === [#HEX:D.04.25.00] END ===

// === [#HEX:D.04.26.00] START | name: indexQuestionsForLang | lines: 13 ===
// @calls: none | @calledBy: [#HEX:D.04.25.00]
  indexQuestionsForLang(lang, data) {
    if (!this.questionsByBaseId[lang]) {
      this.questionsByBaseId[lang] = {};
    }
    const categories = ['TRUE', 'FALSE', 'GameInfo', 'TUTOR_GameInfo', 'TUTORZEP'];
    categories.forEach(cat => {
      const list = data[cat] || [];
      list.forEach(q => {
        const baseId = q.baseId || q.uid || String(q.id);
        this.questionsByBaseId[lang][baseId] = q;
      });
    });
  }
// === [#HEX:D.04.26.00] END ===

// === [#HEX:D.04.27.00] START | name: buildFlatQuestionList | lines: 11 ===
// @calls: none | @calledBy: [#HEX:D.04.25.00], [#HEX:D.07.79.00]
  buildFlatQuestionList(lang) {
    const data = this.rawLanguageData[lang];
    if (!data) return [];
    let list = [];
    if (Array.isArray(data.TRUE)) list = list.concat(data.TRUE);
    if (Array.isArray(data.FALSE)) list = list.concat(data.FALSE);
    if (Array.isArray(data.GameInfo)) list = list.concat(data.GameInfo);
    if (Array.isArray(data.TUTOR_GameInfo)) list = list.concat(data.TUTOR_GameInfo);
    if (Array.isArray(data.TUTORZEP)) list = list.concat(data.TUTORZEP);
    return list;
  }
// === [#HEX:D.04.27.00] END ===

  // ─── 🔄 [IDSEARCH PROTOKOLL]: VALÓS IDEJŰ NYELVVÁLTÁS A KVÍZ KÖZBEN ───
// === [#HEX:D.07.79.00] START | name: onLanguageChanged | lines: 22 ===
// @calls: [#HEX:D.04.2A.00], [#HEX:D.04.27.00], [#HEX:D.04.25.00] | @calledBy: [#HEX:D.01.08.00], [#HEX:D.07.0F.00], [#HEX:D.07.7D.00]
  async onLanguageChanged(newLang) {
    const targetLang = String(newLang || 'HU').trim().toUpperCase();
    console.log(`🌐 QuizManager: Nyelvváltás esemény fogadva: -> ${targetLang}`);

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
        // Újrarajzolás: az eredeti shuffledOrder megtartásával, és ha tétválasztó volt nyitva, az is az új nyelven jön fel!
        this.renderQuestion(true);
      } else {
        console.warn(`Nem található a(z) ${this.currentBaseId} azonosítójú kérdés a(z) ${targetLang} fordításban!`);
      }
    }
  }
// === [#HEX:D.07.79.00] END ===

  // ─── 📐 PANEL SKÁLÁZÁS ───
// === [#HEX:D.07.7A.00] START | name: updateScale | lines: 17 ===
// @calls: none | @calledBy: [#HEX:D.01.08.00], [#HEX:D.05.00.00], [#HEX:D.07.0F.00], [#HEX:D.05.11.00], [#HEX:D.07.7D.00]
  updateScale() {
    const panel = document.getElementById('quiz-panel-box');
    if (!panel) return;
    const isZep = this.currentMode === 'TUTORZEP';
    const cfg = isZep ? window.QuizConfig.TUTORZEP : window.QuizConfig.DEFAULT;
    const baseW = isZep ? 831 : (cfg.panelWidth || 600);
    const baseH = isZep ? 768 : (cfg.panelHeight || 510);

    const availW = window.innerWidth * 0.95;
    const availH = isZep ? (window.innerHeight - 85) * 0.90 : window.innerHeight * 0.95;
    const targetScale = isZep ? 1.0 : (cfg.scale || 1.0);
    const autoScale = Math.min(1.0, availW / baseW, availH / baseH);
    const scale = targetScale * autoScale;

    panel.style.transform = `scale(${scale})`;
    panel.style.transformOrigin = 'center center';
  }
// === [#HEX:D.07.7A.00] END ===

  // ─── 🖼️ UI BETÖLTÉSE ───
// === [#HEX:D.07.7B.00] START | name: loadUI | lines: 24 ===
// @calls: [#HEX:D.07.80.00], [#HEX:D.07.7D.00], [#HEX:D.07.7C.00] | @calledBy: [#HEX:D.07.72.00]
  async loadUI() {
    try {
      const res = await fetch('quiz_panel.html?t=' + Date.now());
      if (res.ok) {
        const html = await res.text();
        const div = document.createElement('div');
        div.innerHTML = html;
// === [#HEX:D.07.7C.00] START | name: appendToDoc | lines: 11 ===
// @calls: [#HEX:D.07.80.00], [#HEX:D.07.7D.00] | @calledBy: [#HEX:D.07.7B.00]
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
// === [#HEX:D.07.7C.00] END ===
        appendToDoc();
      }
    } catch (e) {
      console.error("Hiba a kvíz UI betöltésekor:", e);
    }
  }
// === [#HEX:D.07.7B.00] END ===

  // ─── 🖱️ ESEMÉNYEK BEKÖTÉSE ───
// === [#HEX:D.07.7D.00] START | name: bindEvents | lines: 21 ===
// @calls: [#HEX:D.07.7A.00], [#HEX:D.07.16.00], [#HEX:D.04.2C.00], [#HEX:D.07.79.00] | @calledBy: [#HEX:D.07.72.00], [#HEX:D.07.7B.00], [#HEX:D.07.7C.00]
  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.uiReady && this.isQuizModalOpen) this.updateScale();
    });

    window.addEventListener('languageChanged', (e) => {
      const lang = (e && e.detail && (e.detail.lang || e.detail.language)) || window.currentLanguage;
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
// === [#HEX:D.07.7D.00] END ===

// === [#HEX:D.04.28.00] START | name: getQuestionId | lines: 3 ===
// @calls: none | @calledBy: [#HEX:D.04.29.00]
  getQuestionId(q) {
    return q.baseId || q.uid || q.id || q.Kerdes || q.question;
  }
// === [#HEX:D.04.28.00] END ===

  // ─── 🚀 [TRIGGER PROTOKOLL]: KVÍZ MEGNYITÁSA ───
// === [#HEX:D.04.29.00] START | name: openQuiz | lines: 140 ===
// @calls: [#HEX:D.04.2A.00], [#HEX:D.04.28.00], [#HEX:D.07.76.00] | @calledBy: [#HEX:D.01.24.00], [#HEX:D.04.01.00], [#HEX:D.07.2E.00], [#HEX:D.04.24.00], [#HEX:D.07.80.00]
  openQuiz(category, onComplete) {
    if (!this.uiReady || this.questions.length === 0) {
      setTimeout(() => this.openQuiz(category, onComplete), 100);
      return;
    }

    this.currentMode = category;
    this.onCompleteCallback = onComplete || null;
    this._betDecisionMade = false;

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
      // ─── TUTORIAL HÁRTYAFELVÉTELI KVÍZEK (GameInfo / TUTOR_GameInfo) ───
      available = allQ.filter(q => {
        const cat = q.category || q.Tipus;
        const baseId = this.getQuestionId(q);
        return (cat === 'GameInfo' || cat === 'TUTOR_GameInfo') && !this.answeredCorrectlyIds.has(baseId) && !this.currentlySeenIds.has(baseId);
      });

      if (available.length === 0) {
        available = allQ.filter(q => {
          const cat = q.category || q.Tipus;
          const baseId = this.getQuestionId(q);
          return (cat === 'GameInfo' || cat === 'TUTOR_GameInfo') && !this.answeredCorrectlyIds.has(baseId) && this.missedQuestionIds.has(baseId);
        });
      }

      if (available.length === 0) {
        console.log('🎓 Mind a 14 db GameInfo kérdés sikeresen megtanulva! Nincs több hártyafelvételi kvíz, a hártya azonnal felvehető.');
        if (this.onCompleteCallback) {
          const cb = this.onCompleteCallback;
          this.onCompleteCallback = null;
          cb(true, false);
        }
        return;
      }

    } else {
      // ─── MEMBRANE HUNTING HÁRTYAFELVÉTEL: KIZÁRÓLAG TRUE ÉS FALSE IRODALMI KÉRDÉSEK ───
      available = allQ.filter(q => {
        const cat = q.category || q.Tipus;
        const baseId = this.getQuestionId(q);
        return (cat === 'TRUE' || cat === 'FALSE') && !this.answeredCorrectlyIds.has(baseId) && !this.currentlySeenIds.has(baseId);
      });

      if (available.length === 0) {
        available = allQ.filter(q => {
          const cat = q.category || q.Tipus;
          const baseId = this.getQuestionId(q);
          return (cat === 'TRUE' || cat === 'FALSE') && !this.answeredCorrectlyIds.has(baseId) && this.missedQuestionIds.has(baseId);
        });
      }

      if (available.length === 0) {
        const huntingIds = new Set(allQ.filter(q => ['TRUE', 'FALSE'].includes(q.category || q.Tipus)).map(q => this.getQuestionId(q)));
        for (let id of huntingIds) {
          this.answeredCorrectlyIds.delete(id);
          this.currentlySeenIds.delete(id);
          this.missedQuestionIds.delete(id);
        }
        available = allQ.filter(q => ['TRUE', 'FALSE'].includes(q.category || q.Tipus));
      }
    }

    if (available.length === 0) {
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        cb(true, false);
      }
      return;
    }

    this.currentQuestion = available[Math.floor(Math.random() * available.length)];
    this.currentBaseId = this.getQuestionId(this.currentQuestion);
    this.currentlySeenIds.add(this.currentBaseId);

    // Válaszok egyszeri, fix megkeverése a kérdés nyitásakor
    const numAnswers = Array.isArray(this.currentQuestion.answers) ? this.currentQuestion.answers.length : 4;
    const indices = [];
    for (let i = 0; i < numAnswers; i++) indices.push(i);
    indices.sort(() => Math.random() - 0.5);
    let finalIndices = indices;
    const baseId1 = this.currentBaseId || (this.currentQuestion && (this.currentQuestion.baseId || this.currentQuestion.uid));
    if (baseId1 === 'TUTMHDEMQTU0OK0030' || baseId1 === 'TUTMHDEMQTU0OK0031') {
      const ansArr = Array.isArray(this.currentQuestion.answers) ? this.currentQuestion.answers : [];
      let lIdx = -1;
      if (baseId1 === 'TUTMHDEMQTU0OK0030') {
        lIdx = ansArr.findIndex(a => (a || '').includes('II.') || /(?:edward|eduárd|édouard|эдуард)/i.test(a || ''));
      }
      if (lIdx === -1) {
        lIdx = ansArr.reduce((mI, a, i, arr) => (a || '').length > (arr[mI] || '').length ? i : mI, 0);
      }
      const rem = [0, 1, 2, 3].filter(i => i !== lIdx);
      rem.sort(() => Math.random() - 0.5);
      finalIndices = [rem[0], lIdx, rem[1], rem[2]];
    }
    this.currentShuffledOrder = finalIndices;

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
// === [#HEX:D.04.29.00] END ===

  // ─── 🎨 [DISPLAY, LAYOUT, SETUP & RENDER PROTOKOLLOK] ───
// === [#HEX:D.04.2A.00] START | name: renderQuestion | lines: 478 ===
// @calls: [#HEX:D.07.7A.00], [#HEX:D.07.78.00], [#HEX:D.04.2C.00], [#HEX:D.07.77.00], [#HEX:D.07.7E.00] | @calledBy: [#HEX:D.07.79.00], [#HEX:D.04.29.00]
  renderQuestion(isMidQuizSwitch = false) {
    const overlay = document.getElementById('quiz-overlay');
    const panel = document.getElementById('quiz-panel-box');
    const qText = document.getElementById('quiz-question-text');
    const title = document.getElementById('quiz-title');
    const ansContainer = document.getElementById('quiz-answers-container');

    if (!overlay || !panel || !ansContainer) return;

    if (title) title.style.display = 'none';

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
    const baseId2 = this.currentBaseId || (this.currentQuestion && (this.currentQuestion.baseId || this.currentQuestion.uid));
    if (baseId2 === 'TUTMHDEMQTU0OK0030' || baseId2 === 'TUTMHDEMQTU0OK0031') {
      let lIdx = -1;
      if (baseId2 === 'TUTMHDEMQTU0OK0030') {
        lIdx = answers.findIndex(a => (a || '').includes('II.') || /(?:edward|eduárd|édouard|эдуард)/i.test(a || ''));
      }
      if (lIdx === -1) {
        lIdx = answers.reduce((mI, a, i, arr) => (a || '').length > (arr[mI] || '').length ? i : mI, 0);
      }
      const rem = [0, 1, 2, 3].filter(i => i !== lIdx);
      rem.sort(() => Math.random() - 0.5);
      this.currentShuffledOrder = [rem[0], lIdx, rem[1], rem[2]];
    }
    const indices = this.currentShuffledOrder;

    // Nyelv és font beállítások (Orosz nyelv esetén cirill-kompatibilis betűtípus)
    const curLang = this.getCurrentLang();
    const isRussian = curLang === 'RU';
    const baseFontFamily = isRussian ? "'Georgia', Arial, sans-serif" : "'Briskb', 'Courier New', monospace";

    const isZep = this.currentMode === 'TUTORZEP';

    if (isZep) {
      // ─── 🛸 TUTORZEP LÉGHAJÓ KVÍZ ELRENDEZÉS ───
      if (qText) qText.style.display = 'none';

      // 2. Tisztítás: Kérdésszöveg megtisztítása szerzői <br> és dupla space-ektől
      const rawQText = this.currentQuestion.question || this.currentQuestion.Kerdes || "";
      const cleanQText = rawQText
        .replace(/<[^>]*>/g, ' ')
        .replace(/[\r\n\t]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // 3. [TUTORIAL DETERMINISZTIKUS SORREND]: Szavak csomagolása és elrendezés választása
      const words = cleanQText.split(' ').filter(w => w.length > 0);
      let line1 = '', line2 = '', line3 = '';
      let isLong = false;
      let wIdx = 0;
      while (wIdx < words.length) {
        const candidate = line1 ? (line1 + ' ' + words[wIdx]) : words[wIdx];
        if (!line1 || candidate.length <= 18) {
          line1 = candidate;
          wIdx++;
        } else {
          break;
        }
      }

      const remWords = words.slice(wIdx);
      const remLen = remWords.join(' ').length;

      if (remLen <= 48) {
        // Elfér a 2. sorban! 2 Soros Elrendezés (TZQSvB: 23px kérdés, 21px válaszok)
        isLong = false;
        line2 = remWords.join(' ');
        line3 = '';
      } else {
        // Nem fér el egy sorban -> 3 Soros Elrendezés (TZQSvA: 22px kérdés, 20px válaszok)
        isLong = true;
        line1 = '';
        wIdx = 0;
        while (wIdx < words.length) {
          const candidate = line1 ? (line1 + ' ' + words[wIdx]) : words[wIdx];
          if (!line1 || candidate.length <= 16) {
            line1 = candidate;
            wIdx++;
          } else {
            break;
          }
        }
        const longRemWords = words.slice(wIdx);
        let l2Words = [];
        for (let w of longRemWords) {
          const cand = l2Words.concat([w]).join(' ');
          if (l2Words.length === 0 || cand.length <= 48) {
            l2Words.push(w);
          } else {
            break;
          }
        }
        line2 = l2Words.join(' ');
        line3 = longRemWords.slice(l2Words.length).join(' ');
      }

      const activeSetup = isLong ? window.QuizConfig.TZQSvA : window.QuizConfig.TZQSvB;

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

// === [#HEX:D.07.7E.00] START | name: applyBoxStyle | lines: 27 ===
// @calls: none | @calledBy: [#HEX:D.04.2A.00]
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
// === [#HEX:D.07.7E.00] END ===

      applyBoxStyle(qBox1, activeSetup.question_line1);
      applyBoxStyle(qBox2, activeSetup.question_line2);
      applyBoxStyle(qBox3, activeSetup.question_line3);

      qBox1.innerText = line1;
      qBox2.innerText = line2;
      qBox3.innerText = line3;

      // 5. Válasz Falap Gombok Elhelyezése
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
        const qBaseId = this.currentBaseId || (this.currentQuestion && (this.currentQuestion.baseId || this.currentQuestion.uid)) || '';
        const isTwoLinePlank = ((qBaseId === 'TUTMHDEMQTU0OK0030' || qBaseId === 'TUTMHDEMQTU0OK0031') && displayPos === 1);
        if (isTwoLinePlank) {
          const w = cleanAnsText.split(' ');
          const m = Math.ceil(w.length / 2);
          btn.innerHTML = `${letters[displayPos]}) ${w.slice(0, m).join(' ')}<br>${w.slice(m).join(' ')}`;
        } else {
          btn.innerText = `${letters[displayPos]}) ${cleanAnsText}`;
        }

        const ansCfg = activeSetup.answers[displayPos] || { top: 295, left: 145, width: 560, height: 42, fontSize: 20 };

        const qLang = this.getCurrentLang();
        const FMAP = {
          HU: { TUTMHDEMQTU0OK0030: 20 },
          EN: { TUTMHDEMQTU0OK0031: 20, TUTMHDEMQTU0OK0037: 19, TUTMHDEMQTU0OK0030: 18 },
          DE: { TUTMHDEMQTU0OK0032: 20, TUTMHDEMQTU0OK0037: 20, TUTMHDEMQTU0OK0027: 19, TUTMHDEMQTU0OK0029: 19, TUTMHDEMQTU0OK0022: 18, TUTMHDEMQTU0OK0030: 18, TUTMHDEMQTU0OK0031: 18, TUTMHDEMQTU0OK0033: 18 },
          FR: { TUTMHDEMQTU0OK0030: 19, TUTMHDEMQTU0OK0029: 18, TUTMHDEMQTU0OK0031: 18, TUTMHDEMQTU0OK0033: 18 },
          ES: { TUTMHDEMQTU0OK0037: 20, TUTMHDEMQTU0OK0029: 19, TUTMHDEMQTU0OK0030: 18 },
          PL: { TUTMHDEMQTU0OK0030: 20, TUTMHDEMQTU0OK0032: 20 },
          RU: { TUTMHDEMQTU0OK0030: 19, TUTMHDEMQTU0OK0029: 19, TUTMHDEMQTU0OK0031: 19 }
        };
        let computedAnsFs = (FMAP[qLang] && FMAP[qLang][qBaseId]) || (isRussian ? Math.max(16, ansCfg.fontSize - 3) : ansCfg.fontSize);

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
        btn.style.lineHeight = isTwoLinePlank ? "1.05" : "1.2";
        btn.style.overflow = "hidden";
        btn.style.whiteSpace = isTwoLinePlank ? "normal" : "nowrap";

        btn.onmouseenter = () => { btn.style.color = "#ffffff"; };
        btn.onmouseleave = () => { btn.style.color = "#ffd700"; };

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleAnswer(actualAnsIdx);
        });
        ansContainer.appendChild(btn);
      });

    } else {
      // ─── 📜 DEFAULT / MEMBRANE HUNTING IRODALMI KVÍZ ELRENDEZÉS ───
      const qb1 = document.getElementById('quiz-qbox-1');
      const qb2 = document.getElementById('quiz-qbox-2');
      const qb3 = document.getElementById('quiz-qbox-3');
      if (qb1) qb1.style.display = 'none';
      if (qb2) qb2.style.display = 'none';
      if (qb3) qb3.style.display = 'none';
      if (qText) qText.style.display = 'flex';

      const isStaked = !!(this.currentQuestion.isStaked || (this.currentQuestion.category === 'TRUE'));

      // 1. TÉT KÉRDÉS AJÁNLAT (Dupla vagy Semmi)
      if (isStaked && !this._betDecisionMade) {
        panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/Quiz_window_new_2-r.png') no-repeat center / 100% 100%";
        const bCfg = window.QuizConfig.BET_DECISION || window.QuizConfig.DEFAULT;
        panel.style.position = "relative";
        panel.style.width = (bCfg.panelWidth || 600) + "px";
        panel.style.height = bCfg.panelHeight ? (bCfg.panelHeight + "px") : "auto";
        panel.style.padding = `${bCfg.padTop}px ${bCfg.padRight}px ${bCfg.padBottom}px ${bCfg.padLeft}px`;
        panel.style.display = "flex";
        panel.style.flexDirection = "column";

        const betTitleMap = {
          HU: "TÉTES KÉRDÉS KÖVETKEZIK!",
          EN: "STAKED QUESTION AHEAD!",
          DE: "EINSATZ-FRAGE STEHT BEVOR!",
          FR: "QUESTION À MISE EN JEU !",
          ES: "¡PREGUNTA CON APUESTA!",
          PL: "PYTANIE ZE STAWKĄ!",
          RU: "ВОПРОС СО СТАВКОЙ!"
        };

        const betBodyMap = {
          HU: "Kockáztatod a csónakodon lévő hártyáidat egy Dupla vagy Semmi játékban?",
          EN: "Do you want to risk your membranes in a Double or Nothing game?",
          DE: "Möchtest du deine Membranen für ein Alles-oder-Nichts riskieren?",
          FR: "Veux-tu risquer tes membranes dans un Quitte ou Double ?",
          ES: "¿Quieres arriesgar tus membranas en un Doble o Nada?",
          PL: "Czy chcesz zaryzykować swoje membrany w grze Wszystko albo Nic?",
          RU: "Хочешь рискнуть мембранами в игре «Всё или ничего»?"
        };

        const btnYesTexts = {
          HU: "Kockáztatok, Dupla vagy Semmi!",
          EN: "Yes, Double or Nothing!",
          DE: "Ja, Alles oder Nichts!",
          FR: "Oui, Quitte ou Double !",
          ES: "¡Sí, Doble o Nada!",
          PL: "Tak, Wszystko albo Nic!",
          RU: "Да, «Всё vagy ничего»!"
        };

        const btnNoTexts = {
          HU: "Kérem a sima kérdést (kockázat nélkül)",
          EN: "Regular question (no risk)",
          DE: "Normale Frage (ohne Risiko)",
          FR: "Question normale (sans risque)",
          ES: "Pregunta normal (sin riesgo)",
          PL: "Zwykłe pytanie (bez ryzyka)",
          RU: "Обычный вопрос (без риска)"
        };

        const titleText = (curLang === 'HU' && bCfg.titleText) ? bCfg.titleText : (betTitleMap[curLang] || betTitleMap.HU);
        const bodyText = (curLang === 'HU' && bCfg.bodyText) ? bCfg.bodyText : (betBodyMap[curLang] || betBodyMap.HU);
        const btnYesText = (curLang === 'HU' && bCfg.btnYesText) ? bCfg.btnYesText : (btnYesTexts[curLang] || btnYesTexts.HU);
        const btnNoText = (curLang === 'HU' && bCfg.btnNoText) ? bCfg.btnNoText : (btnNoTexts[curLang] || btnNoTexts.HU);

        qText.style.position = "static";
        qText.style.color = bCfg.qColor || "#e0d4c2";
        qText.style.background = "transparent";
        qText.style.border = "none";
        qText.style.borderRadius = "0px";
        qText.style.padding = `${bCfg.qPadV || 13}px ${bCfg.qPadH || 20}px`;
        qText.style.width = "100%";
        qText.style.boxSizing = "border-box";
        qText.style.fontFamily = baseFontFamily;
        qText.style.fontWeight = "bold";
        qText.style.textAlign = "center";
        qText.style.marginBottom = `${bCfg.qMarginBottom || 13}px`;
        qText.style.display = "flex";
        qText.style.flexDirection = "column";
        qText.style.alignItems = "center";

        const titleFontSize = isRussian ? Math.max(14, (bCfg.titleFontSize || 20) - 2) : (bCfg.titleFontSize || 20);
        const bodyFontSize = isRussian ? Math.max(13, (bCfg.bodyFontSize || 18) - 2) : (bCfg.bodyFontSize || 18);
        const titleHtml = `<div style="font-size:${titleFontSize}px; color:${bCfg.qColor || '#e0d4c2'}; margin-bottom:${bCfg.titleMarginBottom || 14}px; line-height:1.2;">${titleText}</div>`;
        const bodyHtml = `<div style="font-size:${bodyFontSize}px; color:${bCfg.qColor || '#e0d4c2'}; line-height:${bCfg.bodyLineHeight || 1.45};">${bodyText}</div>`;
        qText.innerHTML = titleHtml + bodyHtml;

        ansContainer.innerHTML = '';
        ansContainer.style.position = "static";
        ansContainer.style.display = "flex";
        ansContainer.style.flexDirection = "column";
        ansContainer.style.gap = `${bCfg.ansGap || 37}px`;
        ansContainer.style.alignItems = "center";

        const btnFontSize = isRussian ? Math.max(12, (bCfg.btnFontSize || 16) - 1) : (bCfg.btnFontSize || 16);

        const btnYes = document.createElement('button');
        btnYes.className = 'eog-std-btn';
        btnYes.innerHTML = btnYesText;
        btnYes.style.width = `${bCfg.btnWidth || 100}%`;
        btnYes.style.padding = `${bCfg.btnPadV || 6}px ${bCfg.btnPadH || 20}px`;
        btnYes.style.background = (bCfg.btnYesAlpha > 0) ? `rgba(40, 20, 10, ${bCfg.btnYesAlpha})` : "transparent";
        btnYes.style.border = "none";
        btnYes.style.color = bCfg.qColor || "#e0d4c2";
        btnYes.style.fontFamily = "'BriskB', 'Courier New', monospace";
        btnYes.style.fontSize = `${btnFontSize}px`;
        btnYes.style.fontWeight = "bold";
        btnYes.style.borderRadius = "0px";
        btnYes.style.cursor = "pointer";
        btnYes.style.boxShadow = "none";
        btnYes.onclick = (e) => {
          e.stopPropagation();
          window.isDoubleOrNothingActive = true;
          this._betDecisionMade = true;
          this.renderQuestion();
        };

        const btnNo = document.createElement('button');
        btnNo.className = 'eog-std-btn';
        btnNo.innerHTML = btnNoText;
        btnNo.style.width = `${bCfg.btnWidth || 100}%`;
        btnNo.style.padding = `${bCfg.btnPadV || 6}px ${bCfg.btnPadH || 20}px`;
        btnNo.style.background = (bCfg.btnNoAlpha > 0) ? `rgba(20, 10, 5, ${bCfg.btnNoAlpha})` : "transparent";
        btnNo.style.border = "none";
        btnNo.style.color = bCfg.qColor || "#e0d4c2";
        btnNo.style.fontFamily = "'BriskB', 'Courier New', monospace";
        btnNo.style.fontSize = `${btnFontSize}px`;
        btnNo.style.fontWeight = "bold";
        btnNo.style.borderRadius = "0px";
        btnNo.style.cursor = "pointer";
        btnNo.style.boxShadow = "none";
        btnNo.onclick = (e) => {
          e.stopPropagation();
          window.isDoubleOrNothingActive = false;
          this._betDecisionMade = true;
          this.renderQuestion();
        };

        ansContainer.appendChild(btnYes);
        ansContainer.appendChild(btnNo);

        this.updateScale();
        window.isCutscenePlaying = true;
        overlay.style.display = 'flex';
        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';
        overlay.style.zIndex = '99995';
        return;
      }

      // 📜 2. TÉNYLEGES IRODALMI KÉRDÉS MEGJELENÍTÉSE
      panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/Quiz_window_new_2-r.png') no-repeat center / 100% 100%";
      const cfg = window.QuizConfig.DEFAULT;
      panel.style.position = "relative";
      panel.style.width = cfg.panelWidth + "px";
      panel.style.height = cfg.panelHeight ? (cfg.panelHeight + "px") : "auto";
      panel.style.padding = `${cfg.padTop}px ${cfg.padRight}px ${cfg.padBottom}px ${cfg.padLeft}px`;
      panel.style.display = "flex";
      panel.style.flexDirection = "column";

      const rawQText = this.currentQuestion.question || this.currentQuestion.Kerdes || "";
      const cleanQText = rawQText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

      qText.style.display = 'flex';
      qText.style.alignItems = 'center';
      qText.style.justifyContent = 'center';
      qText.style.textAlign = 'center';
      qText.style.position = "static";
      qText.style.color = "#ffeedd";
      qText.style.background = "transparent";
      qText.style.border = "none";
      qText.style.borderRadius = "6px";
      qText.style.padding = `${cfg.qPaddingTopBottom || 15}px ${cfg.qPaddingLeftRight || 20}px`;
      qText.style.lineHeight = cfg.qLineHeight || 1.3;
      qText.style.width = "100%";
      qText.style.maxWidth = "100%";
      qText.style.boxSizing = "border-box";
      qText.style.fontFamily = baseFontFamily;
      qText.style.fontSize = (isRussian ? "18px" : "20px");
      qText.style.height = "118px";
      qText.style.minHeight = "118px";
      qText.style.marginTop = "0px";
      qText.style.marginBottom = cfg.qMarginBottom + "px";
      qText.innerHTML = cleanQText;

      ansContainer.innerHTML = '';
      ansContainer.style.position = "static";
      ansContainer.style.display = "flex";
      ansContainer.style.flexDirection = "column";
      ansContainer.style.gap = cfg.ansGap + "px";

      const letters = ["A", "B", "C", "D"];
      indices.forEach((actualAnsIdx, displayPos) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-ans-btn';
        btn.setAttribute('data-index', actualAnsIdx);

        const rawAnsText = answers[actualAnsIdx] || '';
        const cleanAnsText = rawAnsText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        btn.innerText = `${letters[displayPos]}) ${cleanAnsText}`;

        btn.style.position = "static";
        btn.style.width = "100%";
        btn.style.background = "transparent";
        btn.style.border = "none";
        btn.style.color = "#ffeedd";
        btn.style.fontFamily = baseFontFamily;
        btn.style.fontSize = isRussian ? Math.max(12, (cfg.ansFontSize || 15) - 1) + "px" : (cfg.ansFontSize || 15) + "px";
        btn.style.padding = `${cfg.btnPaddingTopBottom || 12}px ${cfg.btnPaddingLeftRight || 18}px`;
        if (displayPos === 2) btn.style.marginTop = "4px";
        if (displayPos === 3) btn.style.marginTop = "7px";
        btn.style.cursor = "pointer";
        btn.style.borderRadius = "6px";
        btn.style.textAlign = "left";
        btn.style.transition = "all 0.15s ease-in-out";

        btn.onmouseenter = () => { btn.style.background = "rgba(60, 30, 15, 0.95)"; btn.style.color = "#ffd700"; };
        btn.onmouseleave = () => { btn.style.background = "rgba(20, 10, 5, 0.85)"; btn.style.color = "#ffeedd"; };

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleAnswer(actualAnsIdx);
        });
        ansContainer.appendChild(btn);
      });
    }

    this.updateScale();
    window.isCutscenePlaying = true;
    overlay.style.paddingTop = isZep ? '85px' : '0px';
    overlay.style.display = 'flex';
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    overlay.style.zIndex = '99995'; // Topbar alatt (topbar: 100000)
  }
// === [#HEX:D.04.2A.00] END ===

  // ─── 🚪 KVÍZ ABLAK BEZÁRÁSA ───
// === [#HEX:D.04.2B.00] START | name: closeQuizUI | lines: 22 ===
// @calls: none | @calledBy: [#HEX:D.04.2C.00], [#HEX:D.04.2D.00]
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
    this._betDecisionMade = false;
    window.isCutscenePlaying = false;

    // Ha időközben be volt ütemezve egy háttér-szinkronizáció, most futtatjuk le!
    if (this.pendingSync) {
      this.pendingSync = false;
      if (typeof window.executeDelayedSync === 'function') {
        window.executeDelayedSync();
      }
    }
  }
// === [#HEX:D.04.2B.00] END ===

  // ─── ⚖️ [ANSWER PROTOKOLL]: VÁLASZ KIÉRTÉKELÉSE ÉS EREDMÉNYKEZELÉS ───
// === [#HEX:D.04.2C.00] START | name: handleAnswer | lines: 157 ===
// @calls: [#HEX:D.07.7F.00], [#HEX:D.04.2B.00], [#HEX:K.05.12.00], [#HEX:D.07.76.00], [#HEX:D.04.2D.00] | @calledBy: [#HEX:D.07.7D.00], [#HEX:D.04.2A.00]
  handleAnswer(selectedIdx) {
    // Kvízfelület és szövegdobozok azonnali, tiszta bezárása
    this.closeQuizUI();

    const isCorrect = (selectedIdx === this.currentCorrectIndex);
    const qId = this.currentBaseId;
    const wasDoubleOrNothing = !!window.isDoubleOrNothingActive;
    window.isDoubleOrNothingActive = false;

    if (isCorrect) {
      this.answeredCorrectlyIds.add(qId);
      this.missedQuestionIds.delete(qId);
      this.setSessionRecord(qId, { answeredCorrectly: true });
    } else {
      this.missedQuestionIds.add(qId);
      this.setSessionRecord(qId, { answeredCorrectly: false });
    }

// === [#HEX:D.04.2D.00] START | name: finishQuiz | lines: 8 ===
// @calls: [#HEX:K.05.12.00], [#HEX:D.04.2B.00] | @calledBy: [#HEX:D.04.2C.00], [#HEX:D.07.7F.00]
    const finishQuiz = () => {
      this.closeQuizUI();
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        try { cb(isCorrect, wasDoubleOrNothing); } catch (err) { console.error('Quiz callback hiba:', err); }
      }
    };
// === [#HEX:D.04.2D.00] END ===

    if (this.currentMode === 'TUTORZEP') {
      const curL = (this.getCurrentLang() || 'HU').toLowerCase();
      const tutorzepGoodMsgs = {
        hu: 'Helyes válasz. A rakomány biztonságban.',
        en: 'Correct answer. Cargo is secure.',
        de: 'Richtige Antwort. Die Ladung ist in Sicherheit.',
        fr: 'Bonne réponse. La cargaison est en sécurité.',
        es: 'Respuesta correcta. La carga está a salvo.',
        pl: 'Prawidłowa odpowiedź. Ładunek jest bezpieczny.',
        ru: 'Верный ответ. Груз в безопасности.'
      };

      const tutorzepRobbedMsgs = {
        hu: 'Hibás válasz. A léghajó legénysége elkobozta a fedélzeten lévő hártyákat.',
        en: 'Wrong answer. The airship crew confiscated all membranes from your boat.',
        de: 'Falsche Antwort. Die Luftschiff-Besatzung hat alle Membranen beschlagnahmt.',
        fr: "Mauvaise réponse. L'équipage du dirigeable a confisqué toutes les membranes.",
        es: 'Respuesta incorrecta. La tripulación del dirigible confiscó todas las membranas.',
        pl: 'Błędna odpowiedź. Załoga sterowca skonfiskowała wszystkie membrany z łodzi.',
        ru: 'Неверный ответ. Команда дирижабля конфисковала все мембраны с лодки.'
      };

      const tutorzepEmptyMsgs = {
        hu: 'Hibás válasz. A további konfliktusok elkerülése miatt visszavonulunk a mólóhoz.',
        en: 'Wrong answer. Retreating to the pier to avoid further conflict.',
        de: 'Falsche Antwort. Rückzug zum Pier, um weitere Konflikte zu vermeiden.',
        fr: "Mauvaise réponse. Repli vers le ponton pour éviter d'autres conflits.",
        es: 'Respuesta incorrecta. Retirada al muelle para evitar más conflictos.',
        pl: 'Błędna odpowiedź. Odwrót do molo, aby uniknąć dalszego konfliktu.',
        ru: 'Неверный ответ. Отступаем к пирсу, чтобы избежать дальнейшего конфликта.'
      };

      if (isCorrect) {
        const msg = tutorzepGoodMsgs[curL] || tutorzepGoodMsgs.hu;
        if (typeof window.showPopUp === 'function') {
          window.showPopUp(msg, finishQuiz);
        } else {
          finishQuiz();
        }
      } else {
        if (typeof window.carriedMembranes === 'number' && window.carriedMembranes > 0) {
          window.carriedMembranes = 0;
          const msg = tutorzepRobbedMsgs[curL] || tutorzepRobbedMsgs.hu;
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, finishQuiz);
          } else {
            finishQuiz();
          }
        } else {
// === [#HEX:D.07.7F.00] START | name: onMonologClosed | lines: 11 ===
// @calls: [#HEX:D.04.2D.00] | @calledBy: [#HEX:D.04.2C.00]
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
// === [#HEX:D.07.7F.00] END ===

          const msg = tutorzepEmptyMsgs[curL] || tutorzepEmptyMsgs.hu;
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, onMonologClosed);
          } else {
            onMonologClosed();
          }
        }
      }
    } else if (this.currentMode === 'TUTOR_GameInfo' || this.currentMode === 'GameInfo') {
      finishQuiz();
      if (typeof window.updateTopBarCounts === 'function') window.updateTopBarCounts();
    } else {
      // ─── HÁRTYAFELVÉTEL (FISHING / MB): Tétes (Dupla vagy Semmi) vs Normál eredmény elszámolása ───
      const curL = (this.getCurrentLang() || 'HU').toLowerCase();

      const doubleWinMsgs = {
        hu: "Telitalálat! A Dupla vagy Semmi tét bevált – a rakomány megduplázva.",
        en: "Bullseye! The Double or Nothing gamble paid off – cargo doubled.",
        de: "Volltreffer! Doppelt oder Nichts hat sich gelohnt – Ladung verdoppelt.",
        fr: "Dans le mille ! Le coup Quitte ou Double a réussi – cargaison doublée.",
        es: "¡Pleno! La apuesta Doble o Nada funcionó – carga duplicada.",
        pl: "Strzał w dziesiątkę! Ryzyko się opłaciło – ładunek podwojony.",
        ru: "В яблочко! Ставка «Всё или ничего» сыграла – груз удвоен."
      };

      const doubleLoseMsgs = {
        hu: "Hibás válasz. A csónakon lévő hártyák a vízbe vesztek.",
        en: "Wrong answer. The membranes on your boat were lost to the sea.",
        de: "Falsche Antwort. Die Membranen auf dem Boot gingen im Meer verloren.",
        fr: "Mauvaise réponse. Les membranes du bateau sont perdues en mer.",
        es: "Respuesta incorrecta. Las membranas del barco se perdieron en el mar.",
        pl: "Błędna odpowiedź. Membrany z łodzi przepadły w toni.",
        ru: "Неверный ответ. Мембраны с лодки канули в пучину."
      };

      if (isCorrect) {
        if (wasDoubleOrNothing) {
          const msg = doubleWinMsgs[curL] || doubleWinMsgs.hu;
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, finishQuiz);
          } else {
            finishQuiz();
          }
        } else {
          const goodMsg = (typeof window.getMembraneGoodText === 'function')
            ? window.getMembraneGoodText()
            : "Helyes válasz! Sikeres hártyabegyűjtés (+1 a fedélzeten).";
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(goodMsg, finishQuiz);
          } else {
            finishQuiz();
          }
        }
      } else {
        if (wasDoubleOrNothing) {
          window.carriedMembranes = 0;
          const msg = doubleLoseMsgs[curL] || doubleLoseMsgs.hu;
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, finishQuiz);
          } else {
            finishQuiz();
          }
        } else {
          finishQuiz();
        }
      }
      if (typeof window.updateTopBarCounts === 'function') window.updateTopBarCounts();
    }
  }
// === [#HEX:D.04.2C.00] END ===

  // ─── 🛠️ ÉLŐ VIZUÁLIS SZERKESZTŐ PANEL ───
// === [#HEX:D.07.80.00] START | name: initVisualEditor | lines: 151 ===
// @calls: [#HEX:D.07.82.00], [#HEX:D.07.81.00], [#HEX:D.07.84.00], [#HEX:D.04.29.00] | @calledBy: [#HEX:D.07.72.00], [#HEX:D.07.7B.00], [#HEX:D.07.7C.00]
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
        <button id="qve-test-btn" style="padding: 6px 10px; background: #223366; color: #fff; border: 1px solid #4466aa; border-radius: 4px; cursor: pointer;">Új Kérdés</button>
      </div>
    `;

    document.body.appendChild(editor);

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'qve-toggle-btn';
    toggleBtn.innerText = '🛠️ Kvíz Szerkesztő';
    toggleBtn.style.cssText = 'position: fixed; bottom: 10px; right: 10px; z-index: 99999; background: #332211; color: #ffea00; border: 1px solid #ffcc00; padding: 6px 12px; border-radius: 5px; font-family: sans-serif; font-size: 12px; cursor: pointer; opacity: 0.8;';
    toggleBtn.onmouseenter = () => { toggleBtn.style.opacity = '1'; };
    toggleBtn.onmouseleave = () => { toggleBtn.style.opacity = '0.8'; };
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

    document.getElementById('qve-close').onclick = () => { editor.style.display = 'none'; window._quizDebugBorders = false; this.applyLiveStyles(); };

// === [#HEX:D.07.81.00] START | name: updateLive | lines: 41 ===
// @calls: [#HEX:D.07.84.00] | @calledBy: [#HEX:D.07.80.00]
    const updateLive = () => {
      const cfg = window.QuizConfig.TUTORZEP;
      const qTop = parseInt(document.getElementById('qve-q-top').value, 10);
      const qH = parseInt(document.getElementById('qve-q-height').value, 10);
      const qL = parseInt(document.getElementById('qve-q-left').value, 10);
      const qW = parseInt(document.getElementById('qve-q-width').value, 10);
      const qF = parseInt(document.getElementById('qve-q-font').value, 10);

      if (!isNaN(qTop)) {
        if (cfg.question) cfg.question.top = qTop;
      }
      if (!isNaN(qH)) {
        if (cfg.question) cfg.question.height = qH;
      }
      if (!isNaN(qL)) {
        if (cfg.question) cfg.question.left = qL;
      }
      if (!isNaN(qW)) {
        if (cfg.question) cfg.question.width = qW;
      }
      if (!isNaN(qF)) {
        if (cfg.question) cfg.question.fontSize = qF;
      }

      const ansLeft = parseInt(document.getElementById('qve-ans-left').value, 10) || 135;
      const ansWidth = parseInt(document.getElementById('qve-ans-width').value, 10) || 560;
      const ansFont = parseInt(document.getElementById('qve-ans-font').value, 10) || 18;

      if (!cfg.answers) cfg.answers = [];
      for (let i = 0; i < 4; i++) {
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
// === [#HEX:D.07.81.00] END ===

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
// === [#HEX:D.07.80.00] END ===

// === [#HEX:D.07.82.00] START | name: populateVisualEditorFields | lines: 25 ===
// @calls: [#HEX:D.07.83.00] | @calledBy: [#HEX:D.07.80.00]
  populateVisualEditorFields() {
    const cfg = window.QuizConfig.TUTORZEP;
    const qCfg = (cfg && cfg.question) || { top: 220, height: 59, left: 121, width: 589, fontSize: 19 };

// === [#HEX:D.07.83.00] START | name: setVal | lines: 1 ===
// @calls: none | @calledBy: [#HEX:D.07.82.00]
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
// === [#HEX:D.07.83.00] END ===
    setVal('qve-q-top', qCfg.top);
    setVal('qve-q-height', qCfg.height);
    setVal('qve-q-left', qCfg.left);
    setVal('qve-q-width', qCfg.width);
    setVal('qve-q-font', qCfg.fontSize);

    const ans = (cfg && cfg.answers) || [];
    setVal('qve-a0-top', (ans[0] && ans[0].top) || 287);
    setVal('qve-a0-height', (ans[0] && ans[0].height) || 47);
    setVal('qve-a1-top', (ans[1] && ans[1].top) || 349);
    setVal('qve-a1-height', (ans[1] && ans[1].height) || 85);
    setVal('qve-a2-top', (ans[2] && ans[2].top) || 448);
    setVal('qve-a2-height', (ans[2] && ans[2].height) || 48);
    setVal('qve-a3-top', (ans[3] && ans[3].top) || 513);
    setVal('qve-a3-height', (ans[3] && ans[3].height) || 54);

    setVal('qve-ans-left', (ans[0] && ans[0].left) || 135);
    setVal('qve-ans-width', (ans[0] && ans[0].width) || 560);
    setVal('qve-ans-font', (ans[0] && ans[0].fontSize) || 19);
  }
// === [#HEX:D.07.82.00] END ===

// === [#HEX:D.07.84.00] START | name: applyLiveStyles | lines: 28 ===
// @calls: none | @calledBy: [#HEX:D.07.80.00], [#HEX:D.07.81.00]
  applyLiveStyles() {
    if (this.currentMode !== 'TUTORZEP') return;
    const cfg = window.QuizConfig.TUTORZEP;
    const qText = document.getElementById('quiz-question-text');
    if (qText && cfg.question) {
      qText.style.top = cfg.question.top + 'px';
      qText.style.height = cfg.question.height + 'px';
      qText.style.left = cfg.question.left + 'px';
      qText.style.width = cfg.question.width + 'px';
      qText.style.fontSize = cfg.question.fontSize + 'px';
      qText.style.border = window._quizDebugBorders ? '2px dashed cyan' : 'none';
      qText.style.backgroundColor = window._quizDebugBorders ? 'rgba(0, 255, 255, 0.12)' : 'transparent';
    }

    const borderColors = ['#ff3366', '#ffaa00', '#33ff88', '#33ccff'];
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById('quiz-ans-btn-' + i);
      if (btn && cfg.answers && cfg.answers[i]) {
        btn.style.top = cfg.answers[i].top + 'px';
        btn.style.height = cfg.answers[i].height + 'px';
        btn.style.left = cfg.answers[i].left + 'px';
        btn.style.width = cfg.answers[i].width + 'px';
        btn.style.fontSize = cfg.answers[i].fontSize + 'px';
        btn.style.border = window._quizDebugBorders ? `2px dashed ${borderColors[i]}` : 'none';
        btn.style.backgroundColor = window._quizDebugBorders ? 'rgba(255, 255, 255, 0.08)' : 'transparent';
      }
    }
  }
// === [#HEX:D.07.84.00] END ===
}

if (typeof window !== 'undefined') {
  if (!window.quizManager) {
    window.quizManager = new QuizManager();
  }
}
