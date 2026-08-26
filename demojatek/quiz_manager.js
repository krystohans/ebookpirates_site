window.QuizConfig = {
  TUTORZEP: {
    panelWidth: 826, panelHeight: 768,
    padTop: 187, padRight: 139, padBottom: 180, padLeft: 152,
    qMarginBottom: 34, qMinHeight: 63,
    ansGap: 0,
    btnMt0: -29, btnMt1: 7, btnMt2: 24, btnMt3: 24,
    btnHeight: 55
  },
  DEFAULT: {
    panelWidth: 695, panelHeight: 0,
    padTop: 118, padRight: 105, padBottom: 158, padLeft: 105,
    qMarginBottom: 20, qMinHeight: 60,
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
      available = this.questions.filter(q => {
        const qCat = q.category || q.Tetes_IN || q.Tipus;
        const qId = this.getQuestionId(q);
        return qCat === 'TUTORZEP' && !this.askedQuestionIds.has(qId);
      });

      if (available.length === 0) {
        available = this.questions.filter(q => {
          const qCat = q.category || q.Tetes_IN || q.Tipus;
          const qId = this.getQuestionId(q);
          return qCat === 'SAVE' && !this.askedQuestionIds.has(qId);
        });
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
