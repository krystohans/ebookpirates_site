window.QuizConfig = {
  TUTORZEP: {
    panelWidth: 831, panelHeight: 768,
    padTop: 210, padRight: 120, padBottom: 180, padLeft: 120,
    qMarginBottom: 25, qMinHeight: 75,
    qWidth: "100%",
    ansGap: 0,
    btnMt0: -12, btnMt1: 32, btnMt2: 24, btnMt3: 24,
    btnHeight: 45
  },
  DEFAULT: {
    panelWidth: 780, panelHeight: 0,
    padTop: 85, padRight: 105, padBottom: 65, padLeft: 105,
    qMarginBottom: 20, qMinHeight: 60,
    qWidth: "100%",
    ansGap: 10,
    btnMt0: 0, btnMt1: 0, btnMt2: 0, btnMt3: 0,
    btnHeight: 0
  }
};

class QuizManager {
  constructor() {
    this.questions = [];
    this.askedQuestionIds = new Set();
    this.currentQuestion = null;
    this.currentMode = null;
    this.onCompleteCallback = null;
    this.isRendering = false;
    this.uiReady = false;
    this.literatureQuestions = [];

    this.loadQuestions();
    this.loadUI();
  }

  async loadQuestions() {
    try {
      const res = await fetch('quiz_questions.json');
      if (res.ok) {
        this.questions = await res.json();
      }
    } catch (e) {
      console.error("Hiba a kvízkérdések betöltésekor:", e);
    }

    // Irodalmi kérdések betöltése a Google Sheets backendből (vagy irodalmi alapbázisból)
    if (window.parent && window.parent !== window && typeof window.parent.callBackend === 'function') {
      const self = this;
      window.parent.callBackend('getQuizQuestions', [], function (backendQuestions) {
        if (Array.isArray(backendQuestions) && backendQuestions.length > 0) {
          self.literatureQuestions = backendQuestions;
          console.log("📚 " + backendQuestions.length + " db irodalmi kvízkérdés sikeresen betöltve a backendből!");
        }
      }, function (err) {
        console.warn("Backend kérdésbetöltési figyelmeztetés:", err);
      });
    }

    if (!this.literatureQuestions || this.literatureQuestions.length === 0) {
      this.literatureQuestions = [
        { id: 'lit_1', question: "Ki írta A kőszívű ember fiai című történelmi regényt?", answers: ["Jókai Mór", "Mikszáth Kálmán", "Arany János", "Gárdonyi Géza"], correctIndex: 0 },
        { id: 'lit_2', question: "Melyik híres kalózregényben szerepel Long John Silver?", answers: ["A kincses sziget", "Robinson Crusoe", "Pán Péter", "Monte Cristo grófja"], correctIndex: 0 },
        { id: 'lit_3', question: "Ki a szerzője az Egri csillagok című regénynek?", answers: ["Gárdonyi Géza", "Móra Ferenc", "Jókai Mór", "Kölcsey Ferenc"], correctIndex: 0 },
        { id: 'lit_4', question: "Milyen hajón szolgált Piszkos Fred Rejtő Jenő regényeiben?", answers: ["Radzeer gőzös", "Hispaniola", "Nautilus", "Bounty"], correctIndex: 0 },
        { id: 'lit_5', question: "Ki írta a Robinson Crusoe című kalandregényt?", answers: ["Daniel Defoe", "Jonathan Swift", "Mark Twain", "Jack London"], correctIndex: 0 },
        { id: 'lit_6', question: "Melyik tenger alatti hajó parancsnoka Nemo kapitány Verne regényében?", answers: ["Nautilus", "Cachalot", "Pequod", "Flying Dutchman"], correctIndex: 0 },
        { id: 'lit_7', question: "Ki írta a Toldi trilógiát?", answers: ["Arany János", "Petőfi Sándor", "Vörösmarty Mihály", "Kisfaludy Károly"], correctIndex: 0 },
        { id: 'lit_8', question: "Melyik Shakespeare műben szerepel a 'Lenni vagy nem lenni' monológ?", answers: ["Hamlet", "Rómeó és Júlia", "Macbeth", "Othello"], correctIndex: 0 },
        { id: 'lit_9', question: "Melyik fehér bálna után kutat Ahab kapitány Melville regényében?", answers: ["Moby Dick", "Leviathan", "Kraken", "Cthulhu"], correctIndex: 0 },
        { id: 'lit_10', question: "Ki írta a Pál utcai fiúk című ifjúsági regényt?", answers: ["Molnár Ferenc", "Karinthy Frigyes", "Kosztolányi Dezső", "Móricz Zsigmond"], correctIndex: 0 },
        { id: 'lit_11', question: "Ki a főhőse Robert Louis Stevenson Kincses sziget című művének?", answers: ["Jim Hawkins", "Tom Sawyer", "Huckleberry Finn", "David Copperfield"], correctIndex: 0 },
        { id: 'lit_12', question: "Melyik szigeten játszódik Homérosz művében Odüsszeusz hazatérése?", answers: ["Ithaka", "Kréta", "Rodosz", "Küprosz"], correctIndex: 0 }
      ];
    }
  }

  async loadUI() {
    try {
      const res = await fetch('quiz_panel.html?t=' + Date.now());
      if (res.ok) {
        const html = await res.text();
        const div = document.createElement('div');
        div.innerHTML = html;
        document.body.appendChild(div);
        this.uiReady = true;
        this.bindEvents();
      }
    } catch (e) {
      console.error("Hiba a kvíz UI betöltésekor:", e);
    }
  }

  bindEvents() {
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
    return q.id !== undefined ? q.id : (q.Kerdes || q.question || JSON.stringify(q));
  }

  extractQuestionText(q) {
    return q.Kerdes || q.question || q.text || "";
  }

  extractAnswersAndCorrect(q) {
    let answers = [];
    let correctIdx = 0;

    if (Array.isArray(q.answers)) {
      answers = [...q.answers];
      correctIdx = typeof q.correctIndex === 'number' ? q.correctIndex : 0;
    } else if (q.A !== undefined && q.B !== undefined) {
      answers = [q.A, q.B, q.C || "", q.D || ""];
      const correctLetter = (q.Helyes || q.correct || "A").toString().trim().toUpperCase();
      const letterMap = { "A": 0, "B": 1, "C": 2, "D": 3 };
      correctIdx = letterMap[correctLetter] !== undefined ? letterMap[correctLetter] : 0;
    } else if (q.Valasz_1 !== undefined) {
      answers = [q.Valasz_1, q.Valasz_2, q.Valasz_3 || "", q.Valasz_4 || ""];
      correctIdx = parseInt(q.Helyes || 1, 10) - 1;
    }

    return { answers, correctIdx };
  }

  openQuiz(category, onComplete) {
    if (!this.uiReady || this.questions.length === 0) {
      setTimeout(() => this.openQuiz(category, onComplete), 100);
      return;
    }

    this.currentMode = category;
    this.onCompleteCallback = onComplete || null;

    let available = [];

    if (category === 'TUTORZEP') {
      const allQ = (this.questions || []).concat(this.literatureQuestions || []);
      available = allQ.filter(q => {
        const isStaked = (q.isStaked === true || q.isStaked === 'TRUE' || q.category === 'TUTORZEP' || q.Tetes_IN === true || q.Tetes === true || q.Tipus === 'TUTORZEP' || q.category === 'SAVE');
        const qId = this.getQuestionId(q);
        return isStaked && !this.askedQuestionIds.has(qId);
      });
      if (available.length === 0) {
        available = allQ.filter(q => {
          return (q.isStaked === true || q.isStaked === 'TRUE' || q.category === 'TUTORZEP' || q.Tetes_IN === true || q.Tetes === true || q.Tipus === 'TUTORZEP' || q.category === 'SAVE');
        });
      }
    } else if (category === 'FISHING_LITERATURE') {
      const source = (this.literatureQuestions && this.literatureQuestions.length > 0) ? this.literatureQuestions : this.questions;
      available = source.filter(q => {
        const qId = this.getQuestionId(q);
        return !this.askedQuestionIds.has(qId);
      });
      if (available.length === 0) {
        this.askedQuestionIds.clear();
        available = source;
      }
    } else {
      available = this.questions.filter(q => {
        const qCat = q.category || q.Tetes_IN || q.Tipus;
        const qId = this.getQuestionId(q);
        return (qCat === category || qCat === 'TUTOR_GameInfo') && !this.askedQuestionIds.has(qId);
      });
    }

    if (available.length === 0) {
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        cb(true);
      }
      return;
    }

    this.currentQuestion = available[Math.floor(Math.random() * available.length)];
    this.renderQuestion();
  }

  renderQuestion() {
    const overlay = document.getElementById('quiz-overlay');
    const panel = document.getElementById('quiz-panel-box');
    const qText = document.getElementById('quiz-question-text');
    const title = document.getElementById('quiz-title');
    const ansContainer = document.getElementById('quiz-answers-container');

    if (!overlay || !qText || !panel || !ansContainer) return;

    if (this.currentMode === 'TUTORZEP') {
      if (title) title.style.display = 'none';
      panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/airship_quiz_panel_clean.png') no-repeat center / 100% 100%";

      const cfg = window.QuizConfig.TUTORZEP;
      panel.style.width = cfg.panelWidth + "px";
      panel.style.height = cfg.panelHeight ? (cfg.panelHeight + "px") : "auto";
      panel.style.padding = `${cfg.padTop}px ${cfg.padRight}px ${cfg.padBottom}px ${cfg.padLeft}px`;

      qText.style.color = "#ffea00";
      qText.style.fontFamily = "'Briskb', 'Courier New', monospace";
      qText.style.fontSize = "21px";
      qText.style.fontWeight = "bold";
      qText.style.width = cfg.qWidth || "100%";
      qText.style.maxWidth = "100%";
      qText.style.boxSizing = "border-box";
      qText.style.height = "auto";
      qText.style.minHeight = cfg.qMinHeight + "px";
      qText.style.marginTop = "0px";
      qText.style.marginBottom = cfg.qMarginBottom + "px";
      qText.style.background = "transparent";
      qText.style.border = "none";
      qText.style.padding = "0px";
      qText.style.textShadow = "none";
      qText.style.webkitTextStroke = "0px";
    } else {
      if (title) title.style.display = 'none';
      panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/Quiz_window_new_2-r.png') no-repeat center / 100% 100%";
      const cfg = window.QuizConfig.DEFAULT;
      panel.style.width = cfg.panelWidth + "px";
      panel.style.height = cfg.panelHeight ? (cfg.panelHeight + "px") : "auto";
      panel.style.padding = `${cfg.padTop}px ${cfg.padRight}px ${cfg.padBottom}px ${cfg.padLeft}px`;
      qText.style.color = "#ffeedd";
      qText.style.background = "rgba(20, 10, 5, 0.85)";
      qText.style.border = "2px solid #6b4c2a";
      qText.style.borderRadius = "6px";
      qText.style.padding = "15px 20px";
      qText.style.width = cfg.qWidth || "100%";
      qText.style.maxWidth = "100%";
      qText.style.boxSizing = "border-box";
      qText.style.fontFamily = "'Briskb', 'Courier New', monospace";
      qText.style.fontSize = "20px";
      qText.style.height = "auto";
      qText.style.minHeight = cfg.qMinHeight + "px";
      qText.style.marginTop = "0px";
      qText.style.marginBottom = cfg.qMarginBottom + "px";
      qText.style.textShadow = "none";
      qText.style.webkitTextStroke = "0px";
    }

    qText.innerHTML = this.extractQuestionText(this.currentQuestion).replace(/\n/g, '<br>');

    const { answers, correctIdx } = this.extractAnswersAndCorrect(this.currentQuestion);
    this.currentCorrectIndex = correctIdx;

    const indices = answers.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    ansContainer.innerHTML = '';
    const letters = ["A", "B", "C", "D"];

    const cfg = this.currentMode === 'TUTORZEP' ? window.QuizConfig.TUTORZEP : window.QuizConfig.DEFAULT;
    ansContainer.style.gap = cfg.ansGap + "px";
    ansContainer.style.marginTop = "0px";

    indices.forEach((actualAnsIdx, displayPos) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-ans-btn';
      btn.setAttribute('data-index', actualAnsIdx);
      btn.innerText = `${letters[displayPos]}) ${answers[actualAnsIdx]}`;

      if (this.currentMode === 'TUTORZEP') {
        btn.style.background = "transparent";
        btn.style.border = "none";
        btn.style.boxShadow = "none";
        btn.style.color = "#ffea00";
        btn.style.fontFamily = "'Briskb', 'Courier New', monospace";
        btn.style.fontSize = "19px";
        btn.style.fontWeight = "bold";
        btn.style.height = cfg.btnHeight + "px";
        btn.style.padding = "0px 20px";
        btn.style.textShadow = "none";
        btn.style.webkitTextStroke = "0px";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.cursor = "pointer";

        if (displayPos === 0) {
          btn.style.marginTop = cfg.btnMt0 + "px";
        } else if (displayPos === 1) {
          btn.style.marginTop = cfg.btnMt1 + "px";
        } else if (displayPos === 2) {
          btn.style.marginTop = cfg.btnMt2 + "px";
        } else if (displayPos === 3) {
          btn.style.marginTop = cfg.btnMt3 + "px";
        }

        btn.onmouseenter = () => { btn.style.color = "#ffffff"; };
        btn.onmouseleave = () => { btn.style.color = "#ffea00"; };
      } else {
        btn.style.background = "rgba(20, 10, 5, 0.85)";
        btn.style.border = "2px solid #6b4c2a";
        btn.style.color = "#ffeedd";
        btn.style.fontFamily = "'Briskb', 'Courier New', monospace";
        btn.style.fontSize = "15px";
        btn.style.height = cfg.btnHeight ? (cfg.btnHeight + "px") : "auto";
        if (displayPos === 0) btn.style.marginTop = cfg.btnMt0 + "px";
        else if (displayPos === 1) btn.style.marginTop = cfg.btnMt1 + "px";
        else if (displayPos === 2) btn.style.marginTop = cfg.btnMt2 + "px";
        else if (displayPos === 3) btn.style.marginTop = cfg.btnMt3 + "px";
        btn.style.padding = "12px 18px";
        btn.style.textShadow = "none";
        btn.style.webkitTextStroke = "0px";
        btn.style.cursor = "pointer";
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleAnswer(actualAnsIdx);
      });
      ansContainer.appendChild(btn);
    });

    window.isCutscenePlaying = true;
    overlay.style.display = 'flex';
  }

  handleAnswer(selectedIdx) {
    const overlay = document.getElementById('quiz-overlay');
    const isCorrect = (selectedIdx === this.currentCorrectIndex);

    overlay.style.display = 'none';
    window.isCutscenePlaying = false;

    const qId = this.getQuestionId(this.currentQuestion);

    if (isCorrect) {
      this.askedQuestionIds.add(qId);
    }

    const finishQuiz = () => {
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        cb(isCorrect);
      }
    };

    if (this.currentMode === 'TUTORZEP') {
      if (isCorrect) {
        const msg = (window.gamePopups && window.gamePopups.airship_good) || "Szép volt. Folytasd a melót!";
        window.showClickControlledPopUp(msg, finishQuiz);
      } else {
        if (window.carriedMembranes > 0) {
          window.carriedMembranes = 0;
        } else if (window.boat && window.homePos) {
          window.boat.position.set(window.homePos.x, 0, window.homePos.z);
          if (window.homeRotY !== undefined) {
            window.boat.rotation.y = window.homeRotY;
          } else {
            window.boat.rotation.y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180);
          }
        }
        const msg = (window.gamePopups && window.gamePopups.airship_bad) || "Ezek most kiraboltak. Most mehetünk ki tovább halászni.";
        window.showClickControlledPopUp(msg, finishQuiz);
      }
    } else {
      finishQuiz();
    }
  }
}

window.addEventListener('load', () => { 
  window.quizManager = new QuizManager(); 
});

// ==========================================
// QUIZ EDITOR INJECTION (DEACTIVATED)
// ==========================================
