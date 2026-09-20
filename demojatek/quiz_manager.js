window.QuizConfig = {
                TUTORZEP: {
    panelWidth: 831,
    panelHeight: 768,
    // 1 soros kérdés koordinátái (AMIKOR NINCS SORTÖRÉS)
    question_singleline: {
      top: 220,
      left: 121,
      width: 589,
      height: 59,
      fontSize: 20
    },
  // 2 soros kérdés koordinátái (AMIKOR VAN SORTÖRÉS: \n vagy <br>)
    question_multiline: {
      top: 199,
      left: 122,
      width: 589,
      height: 70,
      fontSize: 20
    },
    // Alapértelmezett kompatibilitási mező
    question: {
      top: 199,
      left: 122,
      width: 589,
      height: 70,
      fontSize: 20
    },
    answers: [
      {
        top: 287,
        left: 135,
        width: 560,
        height: 47,
        fontSize: 19
      },
      {
        top: 349,
        left: 135,
        width: 560,
        height: 85,
        fontSize: 19
      },
      {
        top: 448,
        left: 135,
        width: 560,
        height: 48,
        fontSize: 19
      },
      {
        top: 513,
        left: 135,
        width: 560,
        height: 54,
        fontSize: 19
      }
    ]
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
    // Pedagógiai kérdéskövetés:
    // 1. answeredCorrectlyIds: Helyesen megválaszolt kérdések -> SOHA TÖBBÉ nem kerülnek elő
    this.answeredCorrectlyIds = new Set();
    // 2. missedQuestionIds: Elrontott kérdések -> Újra fel kell tenni, miután az új kérdések elfogytak!
    this.missedQuestionIds = new Set();
    // 3. currentlySeenIds: Már legalább egyszer látott kérdések a ciklusban
    this.currentlySeenIds = new Set();

    this.currentQuestion = null;
    this.currentMode = null;
    this.onCompleteCallback = null;
    this.isRendering = false;
    this.uiReady = false;
    this.literatureQuestions = [];

    this.loadQuestions();
    if (document.getElementById("quiz-overlay")) { this.uiReady = true; this.bindEvents(); this.initVisualEditor(); } else { this.loadUI(); }
  }

  updateScale() {
    const panel = document.getElementById('quiz-panel-box');
    if (!panel) return;
    const isZep = this.currentMode === 'TUTORZEP';
    const baseW = isZep ? 831 : 780;
    const baseH = isZep ? 768 : 650;

    const availW = window.innerWidth * 0.95;
    const availH = window.innerHeight * 0.95;
    const scale = Math.min(1.0, availW / baseW, availH / baseH);

    panel.style.transform = `scale(${scale})`;
    panel.style.transformOrigin = 'center center';
  }

  async loadQuestions() {
    try {
      const res = await fetch('quiz_questions.json?t=' + Date.now());
      if (res.ok) {
        this.questions = await res.json();
      }
    } catch (e) {
      console.error("Hiba a kvízkérdések betöltésekor:", e);
    }

    // Irodalmi kérdések betöltése a Google Sheets backendből
    if (window.parent && window.parent !== window && typeof window.parent.callBackend === 'function') {
      const self = this;
      window.parent.callBackend('getQuizQuestions', [], function (backendQuestions) {
        if (Array.isArray(backendQuestions) && backendQuestions.length > 0) {
          self.literatureQuestions = backendQuestions;
          console.log("📚 " + backendQuestions.length + " db irodalmi kvízkérdés betöltve a backendből!");
        }
      }, function (err) {
        console.warn("Backend kérdésbetöltési figyelmeztetés:", err);
      });
    }

    this.literatureQuestions = [];
  }

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

  bindEvents() {
    window.addEventListener('resize', () => {
      if (this.uiReady) this.updateScale();
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
    const allQ = this.questions || [];

    if (category === 'TUTORZEP') {
      // ─── TUTORZEP LÉGHAJÓS KVÍZ PRIORITÁSI LÁNC ───
      // 1. Prioritás: Még SOHA NEM LÁTOTT hivatalos TUTORZEP kérdések
      available = allQ.filter(q => {
        const cat = q.category || q.Tipus;
        const qId = this.getQuestionId(q);
        return cat === 'TUTORZEP' && !this.answeredCorrectlyIds.has(qId) && !this.currentlySeenIds.has(qId);
      });

      // 2. Prioritás: Korábban ELRONTOTT TUTORZEP kérdések (újra-kérdezés)
      if (available.length === 0) {
        available = allQ.filter(q => {
          const cat = q.category || q.Tipus;
          const qId = this.getQuestionId(q);
          return cat === 'TUTORZEP' && !this.answeredCorrectlyIds.has(qId) && this.missedQuestionIds.has(qId);
        });
      }

      // 3. Ha minden TUTORZEP kérdésre jól válaszolt: TUTORZEP kérdéskészlet újraindítása
      if (available.length === 0) {
        // Töröljük a TUTORZEP kérdések látott állapotát, de nem keverünk be mást!
        const tutorzepIds = new Set(allQ.filter(q => (q.category || q.Tipus) === 'TUTORZEP').map(q => this.getQuestionId(q)));
        for (let id of tutorzepIds) {
          this.answeredCorrectlyIds.delete(id);
          this.currentlySeenIds.delete(id);
          this.missedQuestionIds.delete(id);
        }
        available = allQ.filter(q => (q.category || q.Tipus) === 'TUTORZEP');
      }

    } else {
      // ─── HÁRTYAFELVÉTELI KVÍZEK (TUTOR_GameInfo) ───
      // 1. Prioritás: Még SOHA NEM LÁTOTT TUTOR_GameInfo technikai kérdések
      available = allQ.filter(q => {
        const qCat = q.category || q.Tetes_IN || q.Tipus;
        const qId = this.getQuestionId(q);
        return (qCat === 'TUTOR_GameInfo' || qCat === category) && !this.answeredCorrectlyIds.has(qId) && !this.currentlySeenIds.has(qId);
      });

      // 2. Prioritás: Korábban ELRONTOTT TUTOR_GameInfo kérdések (újra-kérdezés a tanításért!)
      if (available.length === 0) {
        available = allQ.filter(q => {
          const qCat = q.category || q.Tetes_IN || q.Tipus;
          const qId = this.getQuestionId(q);
          return (qCat === 'TUTOR_GameInfo' || qCat === category) && !this.answeredCorrectlyIds.has(qId) && this.missedQuestionIds.has(qId);
        });
      }

      // 3. SZABÁLY: Ha a játékos MIND a 14 db TUTOR_GameInfo kérdést helyesen megválaszolta -> NINCS TÖBB HÁRTYAFELVÉTELI KÉRDÉS!
      if (available.length === 0) {
        console.log('🎓 Mind a 14 db TUTOR_GameInfo kérdés sikeresen megtanulva! Nincs több hártyafelvételi kvíz, a hártya azonnal felvehető.');
        if (this.onCompleteCallback) {
          const cb = this.onCompleteCallback;
          this.onCompleteCallback = null;
          cb(true);
        }
        return;
      }
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
    const qId = this.getQuestionId(this.currentQuestion);
    this.currentlySeenIds.add(qId);

    this.renderQuestion();
  }

  renderQuestion() {
    const overlay = document.getElementById('quiz-overlay');
    const panel = document.getElementById('quiz-panel-box');
    const qText = document.getElementById('quiz-question-text');
    const title = document.getElementById('quiz-title');
    const ansContainer = document.getElementById('quiz-answers-container');

    if (!overlay || !qText || !panel || !ansContainer) return;

    const { answers, correctIdx } = this.extractAnswersAndCorrect(this.currentQuestion);
    this.currentCorrectIndex = correctIdx;

    const indices = answers.map((_, i) => i);
    indices.sort(() => Math.random() - 0.5);

    ansContainer.innerHTML = '';
    const letters = ["A", "B", "C", "D"];

    if (this.currentMode === 'TUTORZEP') {
      if (title) title.style.display = 'none';
      panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/airship_quiz_panel_clean.png') no-repeat center / 100% 100%";

      const cfg = window.QuizConfig.TUTORZEP;

      // ── TUTORZEP: 5 FÜGGETLEN FALAP POZICIONÁLÁS ──
      panel.style.position = "relative";
      panel.style.width = cfg.panelWidth + "px";
      panel.style.height = cfg.panelHeight + "px";
      panel.style.padding = "0px";
      panel.style.display = "block";

      // 1. Kérdés falap doboz (Dinamikus választás: 1 soros vs 2 soros sortöréses kérdés)
      const rawQText = this.extractQuestionText(this.currentQuestion);
      const hasLineBreak = rawQText.includes('\n') || rawQText.includes('<br>') || rawQText.includes('<br/>') || rawQText.includes('<BR>') || rawQText.includes('<BR/>');
      const qCfg = hasLineBreak ? (cfg.question_multiline || cfg.question) : (cfg.question_singleline || cfg.question);

      qText.style.position = "absolute";
      qText.style.top = qCfg.top + "px";
      qText.style.left = qCfg.left + "px";
      qText.style.width = qCfg.width + "px";
      qText.style.height = qCfg.height + "px";
      qText.style.color = "#ffea00";
      qText.style.fontFamily = "'Briskb', 'Courier New', monospace";
      qText.style.fontSize = qCfg.fontSize + "px";
      qText.style.fontWeight = "bold";
      qText.style.display = "flex";
      qText.style.alignItems = "center";
      qText.style.justifyContent = "center";
      qText.style.textAlign = "center";
      qText.style.boxSizing = "border-box";
      qText.style.margin = "0px";
      qText.style.padding = "0px 15px";
      qText.style.background = "transparent";
      qText.style.border = window._quizDebugBorders ? "2px dashed cyan" : "none";
      qText.style.lineHeight = "1.3";
      qText.style.overflow = "hidden";
      qText.innerHTML = this.extractQuestionText(this.currentQuestion).replace(/\n/g, '<br>');

      // Válasz konténer
      ansContainer.style.position = "static";
      ansContainer.style.margin = "0px";
      ansContainer.style.padding = "0px";

      // 2-5. Válasz gombok 4 független falap doboza
      indices.forEach((actualAnsIdx, displayPos) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-ans-btn';
        btn.setAttribute('data-index', actualAnsIdx);
        btn.id = 'quiz-ans-btn-' + displayPos;
        btn.innerText = `${letters[displayPos]}) ${answers[actualAnsIdx]}`;

        const ansCfg = cfg.answers[displayPos] || { top: 287, left: 135, width: 560, height: 50, fontSize: 19 };

        btn.style.position = "absolute";
        btn.style.top = ansCfg.top + "px";
        btn.style.left = ansCfg.left + "px";
        btn.style.width = ansCfg.width + "px";
        btn.style.height = ansCfg.height + "px";
        btn.style.background = "transparent";
        btn.style.border = window._quizDebugBorders ? "2px dashed lime" : "none";
        btn.style.boxShadow = "none";
        btn.style.color = "#ffea00";
        btn.style.fontFamily = "'Briskb', 'Courier New', monospace";
        btn.style.fontSize = ansCfg.fontSize + "px";
        btn.style.fontWeight = "bold";
        btn.style.padding = "0px 20px";
        btn.style.margin = "0px";
        btn.style.boxSizing = "border-box";
        btn.style.display = "flex";
        btn.style.alignItems = "center";
        btn.style.justifyContent = "center";
        btn.style.textAlign = "center";
        btn.style.cursor = "pointer";
        btn.style.lineHeight = "1.25";

        btn.onmouseenter = () => { btn.style.color = "#ffffff"; };
        btn.onmouseleave = () => { btn.style.color = "#ffea00"; };

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleAnswer(actualAnsIdx);
        });
        ansContainer.appendChild(btn);
      });

    } else {
      // DEFAULT Kvíz Panel (Halászat / Egyéb)
      if (title) title.style.display = 'none';
      panel.style.background = "url('https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/Quiz_window_new_2-r.png') no-repeat center / 100% 100%";
      const cfg = window.QuizConfig.DEFAULT;
      panel.style.position = "relative";
      panel.style.width = cfg.panelWidth + "px";
      panel.style.height = cfg.panelHeight ? (cfg.panelHeight + "px") : "auto";
      panel.style.padding = `${cfg.padTop}px ${cfg.padRight}px ${cfg.padBottom}px ${cfg.padLeft}px`;
      panel.style.display = "flex";
      panel.style.flexDirection = "column";

      qText.style.position = "static";
      qText.style.color = "#ffeedd";
      qText.style.background = "rgba(20, 10, 5, 0.85)";
      qText.style.border = "2px solid #6b4c2a";
      qText.style.borderRadius = "6px";
      qText.style.padding = "15px 20px";
      qText.style.width = "100%";
      qText.style.maxWidth = "100%";
      qText.style.boxSizing = "border-box";
      qText.style.fontFamily = "'Briskb', 'Courier New', monospace";
      qText.style.fontSize = "20px";
      qText.style.height = "auto";
      qText.style.minHeight = cfg.qMinHeight + "px";
      qText.style.marginTop = "0px";
      qText.style.marginBottom = cfg.qMarginBottom + "px";
      qText.innerHTML = this.extractQuestionText(this.currentQuestion).replace(/\n/g, '<br>');

      ansContainer.style.position = "static";
      ansContainer.style.display = "flex";
      ansContainer.style.flexDirection = "column";
      ansContainer.style.gap = cfg.ansGap + "px";

      indices.forEach((actualAnsIdx, displayPos) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-ans-btn';
        btn.setAttribute('data-index', actualAnsIdx);
        btn.innerText = `${letters[displayPos]}) ${answers[actualAnsIdx]}`;
        btn.style.position = "static";
        btn.style.width = "100%";
        btn.style.background = "rgba(20, 10, 5, 0.85)";
        btn.style.border = "2px solid #6b4c2a";
        btn.style.color = "#ffeedd";
        btn.style.fontFamily = "'Briskb', 'Courier New', monospace";
        btn.style.fontSize = "15px";
        btn.style.padding = "12px 18px";
        btn.style.cursor = "pointer";

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.handleAnswer(actualAnsIdx);
        });
        ansContainer.appendChild(btn);
      });
    }

    this.updateScale();
    window.isCutscenePlaying = true;
    overlay.style.display = 'flex';
 overlay.style.visibility = 'visible';
 overlay.style.opacity = '1';
 overlay.style.zIndex = '99999999';
  }

  closeQuizUI() {
    const overlay = document.getElementById('quiz-overlay');
    if (overlay) overlay.style.display = 'none';
    window.isCutscenePlaying = false;
  }

  handleAnswer(selectedIdx) {
    const overlay = document.getElementById('quiz-overlay');
    const isCorrect = (selectedIdx === this.currentCorrectIndex);

    overlay.style.display = 'none';
    window.isCutscenePlaying = false;

    const qId = this.getQuestionId(this.currentQuestion);
    if (isCorrect) {
      // ✅ HELYES VÁLASZ: Bekerül a sikeresen teljesítettek közé, SOHA TÖBBÉ NEM LESZ MEGKÉRDEZVE!
      this.answeredCorrectlyIds.add(qId);
      this.missedQuestionIds.delete(qId);
    } else {
      // ❌ HIBÁS VÁLASZ: Bekerül az elrontottak közé -> Újra fel kell tenni, miután a többi új kérdés elfogyott!
      this.missedQuestionIds.add(qId);
    }

    const finishQuiz = () => {
      this.closeQuizUI();
      if (this.onCompleteCallback) {
        const cb = this.onCompleteCallback;
        this.onCompleteCallback = null;
        try { cb(isCorrect); } catch(err) { console.error('Quiz callback hiba:', err); }
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
          // 1. Eset: Van nálunk hártya -> kirabolnak, hártya elvész
          window.carriedMembranes = 0;
          const msg = (window.gamePopups && window.gamePopups.airship_bad) || "Ezek most kiraboltak.\nMost mehetünk ki tovább halászni.";
          if (typeof window.showPopUp === 'function') {
            window.showPopUp(msg, finishQuiz);
          } else {
            finishQuiz();
          }
        } else {
          // 2. Eset: carried = 0 -> A monológ ELŐSZÖR a helyszínen ugrik fel, és CSAK A BEZÁRÁSA UTÁN kerül vissza a csónak a mólóra
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

  // ─── 🛠️ ÉLŐ VIZUÁLIS SZERKESZTŐ (AGENTS.md Felhasználói Szabály) ───
  initVisualEditor() {
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

    // Szerkesztő megnyitó lebegő gomb
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

    // Eseménykezelők a csúszkákhoz / mezőkhöz
    document.getElementById('qve-close').onclick = () => { editor.style.display = 'none'; window._quizDebugBorders = false; this.applyLiveStyles(); };

    const updateLive = () => {
      const cfg = window.QuizConfig.TUTORZEP;
      cfg.question.top = parseInt(document.getElementById('qve-q-top').value, 10) || cfg.question.top;
      cfg.question.height = parseInt(document.getElementById('qve-q-height').value, 10) || cfg.question.height;
      cfg.question.left = parseInt(document.getElementById('qve-q-left').value, 10) || cfg.question.left;
      cfg.question.width = parseInt(document.getElementById('qve-q-width').value, 10) || cfg.question.width;
      cfg.question.fontSize = parseInt(document.getElementById('qve-q-font').value, 10) || cfg.question.fontSize;

      const ansLeft = parseInt(document.getElementById('qve-ans-left').value, 10) || 135;
      const ansWidth = parseInt(document.getElementById('qve-ans-width').value, 10) || 560;
      const ansFont = parseInt(document.getElementById('qve-ans-font').value, 10) || 18;

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
    const cfg = window.QuizConfig.TUTORZEP;
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('qve-q-top', cfg.question.top);
    setVal('qve-q-height', cfg.question.height);
    setVal('qve-q-left', cfg.question.left);
    setVal('qve-q-width', cfg.question.width);
    setVal('qve-q-font', cfg.question.fontSize);

    setVal('qve-a0-top', cfg.answers[0].top);
    setVal('qve-a0-height', cfg.answers[0].height);
    setVal('qve-a1-top', cfg.answers[1].top);
    setVal('qve-a1-height', cfg.answers[1].height);
    setVal('qve-a2-top', cfg.answers[2].top);
    setVal('qve-a2-height', cfg.answers[2].height);
    setVal('qve-a3-top', cfg.answers[3].top);
    setVal('qve-a3-height', cfg.answers[3].height);

    setVal('qve-ans-left', cfg.answers[0].left);
    setVal('qve-ans-width', cfg.answers[0].width);
    setVal('qve-ans-font', cfg.answers[0].fontSize);
  }

  applyLiveStyles() {
    if (this.currentMode !== 'TUTORZEP') return;
    const cfg = window.QuizConfig.TUTORZEP;
    const qText = document.getElementById('quiz-question-text');
    if (qText) {
      const rawQText = this.currentQuestion ? this.extractQuestionText(this.currentQuestion) : '';
      const hasLineBreak = rawQText.includes('\n') || rawQText.includes('<br>') || rawQText.includes('<br/>') || rawQText.includes('<BR>') || rawQText.includes('<BR/>');
      const qCfg = hasLineBreak ? (cfg.question_multiline || cfg.question) : (cfg.question_singleline || cfg.question);

      qText.style.top = qCfg.top + 'px';
      qText.style.height = qCfg.height + 'px';
      qText.style.left = qCfg.left + 'px';
      qText.style.width = qCfg.width + 'px';
      qText.style.fontSize = qCfg.fontSize + 'px';
      qText.style.border = window._quizDebugBorders ? '2px dashed cyan' : 'none';
      qText.style.backgroundColor = window._quizDebugBorders ? 'rgba(0, 255, 255, 0.12)' : 'transparent';
    }

    const borderColors = ['#ff3366', '#ffaa00', '#33ff88', '#33ccff'];
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById('quiz-ans-btn-' + i);
      if (btn && cfg.answers[i]) {
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
}

if (typeof window !== 'undefined') {
  if (!window.quizManager) {
    window.quizManager = new QuizManager();
  }
}

