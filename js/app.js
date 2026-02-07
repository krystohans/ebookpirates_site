// Core frontend helpers extracted from index.html
// NOTE: Follow project rule: no template literals in client-side code.

// 1. GLOBÁLIS VÁLTOZÓK DEFINÍCIÓJA
var currentUserEmail = "";       // Az aktuális felhasználó
var currentLogEntryData = null;  // Hajónapló szerkesztéshez
const MAP_COPY_COST = 30;        // Konstans: másolás ára

/**
 * Ez a függvény végzi a kommunikációt a Google Apps Script Backenddel.
 * KIZÁRÓLAG a GitHub/Külső környezetben használd!
 */
function callBackend(funcName, params, onSuccess, onFailure) {
    // 1. A Web App URL-ed (Ezt cseréld le a saját /exec végű URL-edre!)
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxbliKmT_PpEi8VXztxWIAoNfaJHEaeKAjZl5gwwLkRLsY1x4PdeejtjTTEwLGDx4p_/exec";

    // 2. Token beszerzése
    var token = localStorage.getItem('ebookPiratesToken'); // Ellenőrizd, hogy nálad így hívják-e a tárolt tokent!

    // 3. Kérés összeállítása
    // Fontos: A 'text/plain' típus trükk a CORS hibák elkerülésére Apps Scriptnél.
    fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
            action: funcName,  // EZ A LÉNYEG! A doPost ezt várja 'functionName'-ként
            data: params,      // A paraméterek tömbje
            token: token       // A belépési token
        })
    })
    .then(response => response.json())
    .then(data => {
        // 4. Válasz feldolgozása
        // Ha a backend { error: "..." } objektumot küldött
        if (data && data.error) {
            console.error("Backend Hiba:", data.error);
            
            // Külön kezeljük a lejárt munkamenetet
            if (data.error.indexOf("AUTH_ERROR") !== -1 || data.error.indexOf("Jelentkezz be") !== -1) {
                alert("⚠️ A munkamenet lejárt! Kérlek, jelentkezz be újra.");
                // Opcionális: visszairányítás a főoldalra
                // showPage('login_page'); 
            }

            if (onFailure) onFailure(new Error(data.error));
        } else {
            // Siker!
            if (onSuccess) onSuccess(data);
        }
    })
    .catch(error => {
        // 5. Hálózati hiba (pl. nincs internet, vagy rossz az URL)
        console.error("Hálózati Hiba:", error);
        alert("Hálózati hiba történt. Ellenőrizd az internetkapcsolatot!");
        if (onFailure) onFailure(error);
    });
}

function login() {
    // 1. UI Előkészítése
    document.getElementById('login-status').innerText = "Ellenőrzés...";
    const registerButtonContainer = document.getElementById('registerButtonContainer');
    registerButtonContainer.innerHTML = ''; 
    
    // 2. Adatok begyűjtése
    const formData = { 
        name: document.getElementById('name').value, 
        jelszo: document.getElementById('jelszo').value 
    };
    
    // 3. Hívás a callBackend-en keresztül
    callBackend('performLogin', [formData], 
        function(response) {
            if (response && response.success) {
                localStorage.setItem('ebookPiratesToken', response.token); 
                initializeApp(response.user);
            } else {
                document.getElementById('login-status').innerText = response.message;
                
                // Hibás login -> Regisztráció felkínálása
                const registerButton = document.createElement('button');
                registerButton.id = 'registerButton';
                registerButton.type = 'button'; // Fontos, hogy ne submitolja a formot
                registerButton.innerText = 'Regisztrálás';
                // Ide a TE Web App URL-ed kerüljön, ha van külön regisztrációs linked
                registerButton.onclick = function() { window.open('https://script.google.com/macros/s/AKfycbzcTV8OW0TJmB9HEmgTQzYB-QVfb82xyelgWHH5kkQPsI4OjbFhcON5Vit4wiJqkh2v/exec', '_blank'); };
                registerButtonContainer.appendChild(registerButton);
            }
        },
        function(error) {
            document.getElementById('login-status').innerText = "Hiba: " + error.message;
        }
    );
}

function initializeApp(user) {
    currentUserEmail = user.email; // Elmentjük, de a hívásokhoz nem kell küldeni!
    document.querySelector('.header-title').innerText = user.name;
    
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';
    
    updateCreditDisplay();
    preloadLoadingGif();
    
    // Eseménykezelők
    document.getElementById('creditCell').onclick = updateCreditDisplay;
    document.getElementById('libraryLink').onclick = function() { loadPage('konyvtar'); };
    document.getElementById('treasuresLink').onclick = function() { loadPage('kincsek'); };
    
    // --- MARKETING ÁTIRÁNYÍTÁS ---
    if (window.pendingMarketingData) {
        console.log("Marketing átirányítás aktiválva...");
        loadMarketingView(window.pendingMarketingData.bookId, window.pendingMarketingData.folderId);
        window.pendingMarketingData = null;
    } else {
        // Normál irányítás
        if (user.startPage) {
             loadPage(user.startPage); // A backend mondja meg (tutorial vagy jogosult)
        } else {
             // Fallback (ha régi a backend válasz)
             if (String(user.kalozStatus).toLowerCase() !== 'ok') {
                loadPage('tutorial_oldal');
             } else {
                loadPage('jogosult_tartalom'); 
             }
        }
    }
}

function checkSession() {
  const token = localStorage.getItem('ebookPiratesToken');
  
  if (token) {
    // Itt a tokent paraméterként is átadjuk, mert a getUserDataByToken várja!
    callBackend('getUserDataByToken', [token], 
      function(user) {
        if (user) {
          console.log("Sikeres visszatérés:", user.name);
          initializeApp(user);
        } else {
          console.warn("A token lejárt vagy érvénytelen.");
          localStorage.removeItem('ebookPiratesToken');
        }
      },
      function(err) {
         console.warn("Session check hiba:", err);
         localStorage.removeItem('ebookPiratesToken');
      }
    );
  } else {
    console.log("Nincs mentett token, login szükséges.");
  }
}

// ==========================================
// === LOGOUT (MARAD AZ EREDETI) ===
// ==========================================

function logout() {
    sessionStorage.removeItem('ebookPiratesToken');
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'block';
    
    const loginStatus = document.getElementById('login-status');
    if(loginStatus) loginStatus.innerText = "";
    
    const loginForm = document.getElementById('loginForm');
    if(loginForm) loginForm.reset();
    
    const regContainer = document.getElementById('registerButtonContainer');
    if(regContainer) regContainer.innerHTML = '';
    
    // Globális változók nullázása (ha vannak)
    if(typeof currentUserEmail !== 'undefined') currentUserEmail = '';
    
    const creditVal = document.getElementById('creditValue');
    if(creditVal) creditVal.innerText = '0';
}

// === BETÖLTÉS ÉS UI ===

function preloadLoadingGif() {
    console.log("GIF előtöltése indult...");
    
    // Backend hívás: 'download' kulcsra keresünk a központi tárban
    callBackend('getCentralImageAsset', ['download'], 
        function(imageData) {
            if (imageData && imageData.data) {
                var gifElement = document.getElementById('loading-gif');
                if(gifElement) {
                    // JAVÍTÁS: Backtick helyett hagyományos string összefűzés!
                    // Ez volt a hiba, ami miatt megállt a kód.
                    var mime = imageData.mime || 'image/gif'; // Fallback, ha nincs mime
                    gifElement.src = 'data:' + mime + ';base64,' + imageData.data;
                    console.log("GIF sikeresen beillesztve.");
                }
            } else {
                console.warn("Hiba: A szerver nem küldött képadatot a 'download' kulcsra.");
            }
        },
        function(err) {
            console.error("Hiba a GIF lekérésekor:", err);
        }
    );
}
// Indítás, amikor a HTML kész
document.addEventListener('DOMContentLoaded', function() {
    preloadLoadingGif();
});

function updateCreditDisplay() {
    if (!currentUserEmail) return; // Csak biztonsági check kliens oldalon
    document.getElementById('creditValue').innerText = 'Töltés...';
    
    // ÜRES TÖMB a paraméter, mert a Backend automatikusan megkapja az Emailt!
    callBackend('getPirateCredit', [], 
        function(credit) {
            document.getElementById('creditValue').innerText = credit;
        },
        function(error) {
            document.getElementById('creditValue').innerText = 'Hiba!';
        }
    );
}

/**
 * KÖZPONTI OLDALBETÖLTŐ
 * JAVÍTVA: Nem küldjük az emailt, csak az oldal nevét!
 */
function loadPage(pageName) {
    document.getElementById('content').style.display = 'block';       
    // document.getElementById('marketing-view').style.display = 'none'; // Ha van ilyen div
    document.getElementById('header-stats').style.display = 'flex';

    const contentDiv = document.getElementById('content');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    contentDiv.innerHTML = ''; 
    if(loadingOverlay) loadingOverlay.style.display = 'flex';
    
    // HÍVÁS: Csak az oldal nevét küldjük! A Backend Router beszúrja az emailt elé.
    // Így lesz a szerveren: getPageDataAndContent(email, pageName)
    callBackend('getPageDataAndContent', [pageName], 
        function(result) {
            // 1. HTML beillesztése
            contentDiv.innerHTML = result.htmlContent;
            
            const pagesWithSplash = ['hajomuhely_oldal', 'kikoto_oldal', 'piac_oldal', 'tekercsmester_oldal', 'masolatok_oldal', 'taverna_oldal', 'konyvszentely_oldal', 'felhokolostor_oldal', 'konyvtar', 'kincsek'];
            
            // 2. Inicializálás az adatokkal
            if (pageName === 'tutorial_oldal') { 
                runTutorialScript(); 
            } else if (pageName === 'konyvszentely_oldal') {
                initializePage(pageName);
                if(typeof initializeKonyvszentely === 'function') initializeKonyvszentely();
            } else if (pageName === 'felhokolostor_oldal') {
                 initializePage(pageName);
                 if(typeof refreshMonasteryWork === 'function') refreshMonasteryWork();
            } else if (pageName === 'konyvtar') { 
                initializePage(pageName);
                if(typeof initializeLibraryAndMapPage === 'function') initializeLibraryAndMapPage(result.pageData);
            } else if (pageName === 'tekercsmester_oldal') {
                initializePage(pageName);
                if(typeof initializeTekercsmesterPage === 'function') initializeTekercsmesterPage(result.pageData);
            } else if (pageName === 'piac_oldal') { 
                initializePage(pageName); 
                if(typeof initializePiacOldal === 'function') initializePiacOldal(); 
            } else if (pageName === 'masolatok_oldal') { 
                initializePage(pageName);
                if(typeof initializeMasolatokAndCopyMapPage === 'function') initializeMasolatokAndCopyMapPage(result.pageData);
            } else if (pageName === 'taverna_oldal') { 
                initializePage(pageName);
                if(typeof initializeTavernaPage === 'function') initializeTavernaPage();
            } else if (pageName === 'hajomuhely_oldal') {
                initializePage(pageName); 
                if(typeof initShipyard === 'function') initShipyard();
            } else if (pageName === 'kincsek') {
                initializePage(pageName);
                if(typeof initializeKincsekPage === 'function') initializeKincsekPage(result.pageData);     
            } else if (pagesWithSplash.includes(pageName)) { 
                initializePage(pageName); 
            }
            
            setupAccordionListeners();
            if(loadingOverlay) loadingOverlay.style.display = 'none';
        },
        function(error) {
            contentDiv.innerHTML = "<p>Hiba az oldal betöltésekor: " + error.message + "</p>";
            if(loadingOverlay) loadingOverlay.style.display = 'none';
        }
    );
}

// ==========================================
// === ACCORDION KEZELÉS (EREDETI) ===
// ==========================================

/**
 * Beállítja az eseménykezelőket az összes accordion gombhoz az oldalon.
 */
function setupAccordionListeners() {
  const acc = document.querySelectorAll(".accordion-button"); 
  acc.forEach(button => {
    button.removeEventListener('click', toggleAccordionPanel);
    button.addEventListener('click', toggleAccordionPanel);
  });
}

/**
 * Az accordion gombra kattintáskor lefutó eseménykezelő.
 */
function toggleAccordionPanel() {
  this.classList.toggle("active");
  const panel = this.nextElementSibling; 
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null; // Bezárás
  } else {
    // Kinyitás: a BELSŐ tartalom magasságát használjuk + némi padding
    const content = panel.querySelector('.accordion-panel-content');
    // Biztonsági ellenőrzés, ha nincs belső content div
    const scrollHeight = content ? content.scrollHeight : panel.scrollHeight;
    panel.style.maxHeight = (scrollHeight + 30) + "px"; 
  }
}

// ==========================================
// === SPLASH SCREEN / OLDAL LÁTOGATÁS ===
// ==========================================

/**
 * Ellenőrzi, hogy a felhasználó látta-e már az adott oldalt.
 * Ha igen -> Tartalom megjelenítése.
 * Ha nem -> Splash (Infó) képernyő megjelenítése.
 */
function initializePage(pageName) {
    // callBackend használata (emailt a router intézi)
    callBackend('getPageStatus', [pageName], 
        function(status) {
            const splash = document.getElementById(pageName + '-splash');
            const content = document.getElementById(pageName + '-content');
            
            if (!splash || !content) {
                console.warn(`Hiba: Nem találhatók a HTML elemek ehhez: ${pageName}`);
                return;
            }

            if (status === 'ok') {
                splash.style.display = 'none';
                content.style.display = 'block';
            } else {
                splash.style.display = 'block';
                content.style.display = 'none';
            }
        },
        function(err) {
            console.error("Hiba a getPageStatus híváskor:", err);
            // Hiba esetén biztonsági okból inkább a tartalmat mutatjuk (vagy maradhat rejtve)
            // Itt most nem nyúlunk hozzá, marad az alapállapot.
        }
    );
}

/**
 * A "Megértettem" gomb hívja: rögzíti a látogatást és vált a tartalomra.
 */
function markPageAsSeen(pageName) {
    const splash = document.getElementById(pageName + '-splash');
    const content = document.getElementById(pageName + '-content');
    
    if (!splash || !content) return;
    
    // Azonnali UI váltás (hogy gyorsnak tűnjön)
    splash.style.display = 'none';
    content.style.display = 'block';
    
    // Háttérben mentés callBackend-del
    callBackend('setPageStatus', [pageName], 
        function(res) { console.log(`${pageName} látogatás rögzítve.`); },
        function(err) { console.warn("Hiba a státusz mentésekor:", err); }
    );
}

/**
 * Kézzel visszahozza a Splash képernyőt (az "Infó" gomb).
 * Nem módosít adatbázist, csak UI váltás.
 */
function showSplash(pageName) {
    const splash = document.getElementById(pageName + '-splash');
    const content = document.getElementById(pageName + '-content');
    if (!splash || !content) return;
    
    content.style.display = 'none';
    splash.style.display = 'block';
}

// ==========================================
// === TUTORIAL / QUIZ RENDSZER ===
// ==========================================

function runTutorialScript() {
    console.log("runTutorialScript() FÜGGVÉNY ELINDULT (Routeres verzió).");
    
    // Belső segédfüggvények
    function initializeTutorialPage(status) {
        setupTutorialAccordion();
        const newUserContent = document.getElementById('new-user-content');
        if(newUserContent) newUserContent.style.display = 'block';
        
        if (status === 'ok') {
            document.getElementById('quiz-container').style.display = 'none';
            document.getElementById('quiz-navigation').style.display = 'block';
        } else {
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('quiz-navigation').style.display = 'none';
            startQuiz();
        }
    }

    function setupTutorialAccordion() {
        const acc = document.getElementsByClassName("accordion-button");
        for (let i = 0; i < acc.length; i++) {
            // Itt használhatnánk a globális setupAccordionListeners-t is, 
            // de meghagyom a te logikádat, hogy biztosan ne akadjon össze.
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                const panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }

    let currentQuestionIndex = 0;
    const questionTextEl = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackEl = document.getElementById('feedback-text');
    const submitBtn = document.getElementById('submit-btn');

    function startQuiz() { 
        // Régi listener levétele, hogy ne duplikálódjon
        const newBtn = submitBtn.cloneNode(true);
        submitBtn.parentNode.replaceChild(newBtn, submitBtn);
        newBtn.addEventListener('click', handleAnswer); 
        
        // Frissítjük a referenciát
        // (Vagy használhatnánk a removeEventListener-t, ha a handleAnswer nem lenne closure-ben)
        // De a klónozás itt biztonságosabb a scope miatt.
        loadQuestion(currentQuestionIndex); 
    }

    function showFeedback(message, color) { 
        feedbackEl.textContent = message; 
        feedbackEl.style.color = color; 
    }

    function loadQuestion(index) {
        showFeedback('', 'black'); 
        const btn = document.getElementById('submit-btn'); // Újra lekérjük a klónozás miatt
        if(btn) btn.disabled = true; 
        
        questionTextEl.textContent = 'Kérdés betöltése...'; 
        optionsContainer.innerHTML = '';

        // callBackend: getTutorialQuestion
        callBackend('getTutorialQuestion', [index], 
            displayQuestion,
            function(error) { showFeedback('Hiba: ' + error.message, 'red'); }
        );
    }

    function displayQuestion(qObj) {
        questionTextEl.textContent = qObj.question;
        qObj.options.forEach(option => {
            const label = document.createElement('label'); 
            label.className = 'option-label';
            const radio = document.createElement('input'); 
            radio.type = 'radio'; 
            radio.name = 'answer'; 
            radio.value = option;
            
            label.appendChild(radio); 
            label.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(label);
        });
        const btn = document.getElementById('submit-btn');
        if(btn) btn.disabled = false;
    }

    function handleAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        const btn = document.getElementById('submit-btn');

        if (!selectedOption) { 
            showFeedback('Kérlek, válassz!', 'red'); 
            return; 
        }
        
        if(btn) btn.disabled = true; 
        showFeedback('Válasz ellenőrzése...', 'gray');

        // callBackend: checkTutorialAnswer
        // UserEmail NEM kell, a Router tudja.
        callBackend('checkTutorialAnswer', [currentQuestionIndex, selectedOption.value], 
            function(result) {
                if (result.correct) {
                    if (result.isLast) {
                        showFeedback('Helyes! Sikeresen átmentél a vizsgán!', 'green');
                        document.getElementById('quiz-container').style.display = 'none';
                        document.getElementById('quiz-navigation').style.display = 'block';
                    } else {
                        showFeedback('Helyes válasz! Jöhet a következő!', 'green');
                        currentQuestionIndex++;
                        setTimeout(() => loadQuestion(currentQuestionIndex), 1500);
                    }
                } else {
                    showFeedback('Helytelen válasz. Próbáld újra!', 'red');
                    if(btn) btn.disabled = false;
                }
            },
            function(error) { 
                showFeedback('Hiba: ' + error.message, 'red'); 
                if(btn) btn.disabled = false; 
            }
        );
    }

    // INDÍTÁS
    // callBackend: getUserStatus
    callBackend('getUserStatus', [], 
        initializeTutorialPage,
        function(error) {
            document.querySelector('.tutorial-container').innerHTML = `<h2>Hiba: ${error.message}</h2>`;
        }
    );
}

/* ========================================= */
/* === STÍLUSOS RENDSZER ÜZENETEK (UI) === */
/* ========================================= */

// 1. Az alap függvény (Ezt hívja a többi)
function showSystemModal(title, message, iconClass, buttons) {
    const modal = document.getElementById('system-message-modal');
    const titleEl = document.getElementById('sys-modal-title');
    const bodyEl = document.getElementById('sys-modal-body');
    const iconEl = document.getElementById('sys-modal-icon');
    const btnContainer = document.getElementById('sys-modal-buttons');

    if (!modal) {
        // Fallback, ha nincs HTML: sima uiAlert
        uiAlert(title + "\n\n" + message.replace(/<br>/g, '\n')); 
        return;
    }

    // Tartalom feltöltése
    titleEl.innerText = title;
    bodyEl.innerHTML = message; // HTML-t is engedünk (pl. sortörés, félkövér)
    iconEl.className = iconClass || 'fas fa-scroll'; // Alapértelmezett ikon
    
    // Gombok generálása
    btnContainer.innerHTML = ''; // Töröljük az előzőket
    
    buttons.forEach(btnDef => {
        const btn = document.createElement('button');
        btn.className = 'btn'; // A te alap stílusod
        btn.innerText = btnDef.text;
        
        // Egyedi stílus (opcionális)
        if (btnDef.color) btn.style.backgroundColor = btnDef.color;
        if (btnDef.textColor) btn.style.color = btnDef.textColor;
        
        // Kattintás esemény
        btn.onclick = function() {
            modal.style.display = 'none'; // Bezárás
            if (typeof btnDef.callback === 'function') {
                btnDef.callback();
            }
        };
        
        btnContainer.appendChild(btn);
    });

    // Megjelenítés
    modal.style.display = 'flex';
}

// 2. HELYETTESÍTŐ: alert() helyett -> uiAlert()
function uiAlert(message, title = "Értesítés") {
    showSystemModal(
        title, 
        message, 
        "fas fa-exclamation-circle", // Ikon
        [{ text: "Rendben", color: "#2e8b57", textColor: "white" }]
    );
}

// 3. HELYETTESÍTŐ: confirm() helyett -> uiConfirm()
function uiConfirm(message, title, onYes) {
    showSystemModal(
        title || "Megerősítés",
        message,
        "fas fa-question-circle", // Ikon
        [
            { text: "Igen", color: "#2e8b57", textColor: "white", callback: onYes },
            { text: "Mégse", color: "#8b0000", textColor: "white" } // A Mégse csak bezár
        ]
    );
}

// 4. HELYETTESÍTŐ: prompt() helyett -> uiPrompt()
function uiPrompt(message, title, placeholder, onCommit) {
    // Egyedi ID a beviteli mezőnek
    const inputId = 'sys-modal-input-' + Date.now();
    
    // HTML tartalom: Szöveg + Input mező
    const content = `
        <p>${message}</p>
        <div style="margin-top: 15px;">
            <input type="text" id="${inputId}" placeholder="${placeholder || ''}" 
                   style="width: 80%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
        </div>
    `;

    showSystemModal(
        title || "Adatbekérés",
        content,
        "fas fa-pen-nib", // Ikon
        [
            { 
                text: "Tovább", 
                color: "#2e8b57", 
                textColor: "white", 
                callback: function() {
                    // Itt olvassuk ki az értéket, még mielőtt a modal tartalma törlődne
                    const val = document.getElementById(inputId).value;
                    if (onCommit) onCommit(val);
                } 
            },
            { text: "Mégse", color: "#555", textColor: "white" }
        ]
    );
}
  

   // ===============
    // === TAVERNA ===
    // ===============

     
         // === GLOBÁLIS VÁLTOZÓ A KÁRTYAKÉPEKNEK ÉS EGYÉB ASSETEKNEK ===
    const tavernaImageSources = {
        kartya_hatlap: null,
        kartya_pirosasz: null,
        kartya_fekbub: null,
        kartya_fekkar: null,
        kartyakeveres_gif: null,
        dark_wood: null
    };

    /**
     * Előtölti a Taverna összes szükséges képét a központi képkezelőből.
     * @param {function} callback A függvény, ami a sikeres betöltés után lefut.
     */
    function preloadTavernaImages(callback) {
        // Ha már be vannak töltve a képek, nem kérjük le újra.
        if (tavernaImageSources.kartya_hatlap) {
            if (callback) callback(); // <--- ITT VOLT A HIBA (töröltem a "uiAlert"-et)
            return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';
        
        // Hívás a callBackend-del (paraméterek nélkül, mert a Router nem kér semmit ehhez)
        callBackend('getCardImageAssets', [], 
            function(response) {
                if (response.success) {
                    for (const key in response.assets) {
                        const imageData = response.assets[key];
                        if (imageData && imageData.data) {
                            tavernaImageSources[key] = `data:${imageData.mime};base64,${imageData.data}`;
                        }
                    }
                    if (callback) callback();
                } else {
                    if(typeof uiAlert === 'function') uiAlert("Hiba a taverna képeinek betöltésekor: " + response.error);
                }
                document.getElementById('loading-overlay').style.display = 'none';
            },
            function(error) {
                if(typeof uiAlert === 'function') uiAlert("Súlyos hiba a taverna képeinek betöltésekor: " + error.message);
                document.getElementById('loading-overlay').style.display = 'none';
            }
        );
    }
     
     /**
     * Segédfüggvény a Pult modal nézeteinek váltogatásához.
     * @param {string} viewName A megjelenítendő nézet neve (read, compose, check_status_init, feedback).
     */
    function showPultView(viewName) {
        // Összes nézet elrejtése
        document.getElementById('pult-view-read').style.display = 'none';
        document.getElementById('pult-view-compose').style.display = 'none';
        document.getElementById('pult-view-check_status_init').style.display = 'none';
        document.getElementById('pult-view-feedback').style.display = 'none';
        
        // A "compose again" gomb alaphelyzetbe állítása
        document.getElementById('pult-feedback-compose-again-btn').style.display = 'none';

        // A kért nézet megjelenítése
        const viewToShow = document.getElementById(`pult-view-${viewName}`);
        if(viewToShow) {
            viewToShow.style.display = 'block';
        }

        // Ha a fő nézetre térünk vissza, frissítjük az üzenetlistát
        if (viewName === 'read') {
            loadTavernaMessages();
        }
    }

    /**
     * Betölti a felhasználó üzeneteit a szerverről és megjeleníti őket.
     */
    function loadTavernaMessages() {
    const messagesListDiv = document.getElementById('pult-messages-list');
    messagesListDiv.innerHTML = '<p>Üzenetek betöltése...</p>';
    
    const userName = document.querySelector('.header-title').innerText;

    // ÚJ HÍVÁS (Router):
    // Csak a userName-t küldjük, az emailt a Router intézi!
    callBackend('getTavernaMessages', [userName], 
        function(messages) {
            if (messages && messages.length > 0) {
                let messagesHTML = '';
                messages.forEach(msg => {
                    messagesHTML += `<p><strong>${msg.sender} üzeni:</strong> ${msg.message}</p>`;
                });
                messagesListDiv.innerHTML = messagesHTML;
            } else {
                messagesListDiv.innerHTML = "<p>Drága barátom, ma még alig jártak nálam, nincs semmi üzenet a számodra!</p>";
            }
        },
        function(error) {
            messagesListDiv.innerHTML = `<p style="color:red;">Hiba az üzenetek lekérésekor: ${error.message}</p>`;
        }
    );
}

    /**
     * Bezárja az összes taverna oldali modalt/panelt.
     */
    function closeAllTavernaModals() {
        const pultModal = document.getElementById('pult-modal');
        const asztalConfirmModal = document.getElementById('asztal-confirm-modal');
        const chatModal = document.getElementById('chat-modal');
        const jatekteremModal = document.getElementById('jatekterem-modal');

        if (pultModal) pultModal.style.display = 'none';
        if (asztalConfirmModal) asztalConfirmModal.style.display = 'none';
        if (jatekteremModal) jatekteremModal.style.display = 'none';
        
        // A chat panelt külön kezeljük, hogy a bezáráskor a kapcsolat is megszakadjon.
        if (chatModal && chatModal.style.display !== 'none') {
            chatModal.style.display = 'none';
            const chatIframe = document.getElementById('chat-iframe');
            if (chatIframe) chatIframe.src = 'about:blank'; 
        }
    }


    /**
 * Inicializálja a Taverna oldalt: megjeleníti a kezdő üzenetet
 * és eseménykezelőket rendel a gombokhoz.
 */
function initializeTavernaPage() {
    // --- VÁLTOZÓK FELVÉTELE ---
    const pultModal = document.getElementById('pult-modal');
    const asztalConfirmModal = document.getElementById('asztal-confirm-modal');
    const chatModal = document.getElementById('chat-modal');
    const chatIframe = document.getElementById('chat-iframe');
    const jatekteremModal = document.getElementById('jatekterem-modal');
    const gameModalContent = document.getElementById('game-modal-content');
    
    // Gombok
    const pultBtn = document.getElementById('pult-btn');
    const asztalBtn = document.getElementById('asztal-btn');
    const jatekteremBtn = document.getElementById('jatekterem-btn');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const checkStatusBtn = document.getElementById('check-status-btn');
    const csevegBtn = document.getElementById('cseveg-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const closeGameBtn = document.getElementById('close-game-btn');

    // Játék elemek (ha kellenek később)
    const gameInfoText = document.getElementById('game-info-text');
    const gameFeedbackText = document.getElementById('game-feedback-text');
    const gameCardArea = document.getElementById('game-card-area');
    const gameBettingArea = document.getElementById('game-betting-area');

    // Játék állapot változók
    let playerCredit = 0;
    let prizePool = 0;
    let gameState = 'betting';
    let currentTavernPin = null;

    if (!pultBtn || !asztalBtn || !csevegBtn || !chatModal || !jatekteremBtn) {
        console.error("A taverna oldalon hiányoznak a szükséges vezérlőelemek!");
        return;
    }
    
    // Ezt az URL-t majd ellenőrizd, hogy helyes-e!
    const CHAT_ALKALMAZAS_URL = "https://script.google.com/macros/s/AKfycbyxkJipgYkB2K38MF5UzqB9kVYJnqk0QeaeIquVXdFgGL57zFDlVjGKQct-M605PqrS/exec";

    // --- ESEMÉNYKEZELŐK ---

    // 1. Üdvözlőpanel (Bartender)
    setTimeout(() => {
     if (typeof toggleBartender === 'function') {
         const panel = document.getElementById('bartender-panel');
         if(panel && panel.style.display === 'none') {
             toggleBartender();
         }
     }
    }, 500);

    // 2. PULT FUNKCIÓK (JAVÍTVA callBackend-re!)
    pultBtn.onclick = () => {
        if(typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        pultModal.style.display = 'flex';
        if(typeof showPultView === 'function') showPultView('read');
    };
    
    sendMessageBtn.onclick = function() {
        const recipientName = document.getElementById('pult-recipient-name').value;
        const messageText = document.getElementById('pult-message-text').value;
        const senderName = document.querySelector('.header-title').innerText;

        if (!recipientName || !messageText) {
            if(typeof uiAlert === 'function') uiAlert("Kérlek, add meg a címzett nevét és az üzenetet is!");
            else alert("Hiányzó adatok!");
            return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';
        
        // --- JAVÍTÁS: callBackend ---
        // NEM küldjük a currentUserEmail-t! (A Router intézi)
        // Paraméterek sorrendje a Backendben: (email, senderName, recipientName, messageText)
        // Itt csak a maradék hármat küldjük:
        callBackend('sendTavernaMessage', [senderName, recipientName, messageText], 
            function(response) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = response.message;
                
                if (response.success) {
                    updateCreditDisplay(); // Ez már a javított verzió
                    document.getElementById('pult-recipient-name').value = '';
                    document.getElementById('pult-message-text').value = '';
                    const composeAgainBtn = document.getElementById('pult-feedback-compose-again-btn');
                    if(composeAgainBtn) composeAgainBtn.style.display = 'inline-block';
                }
                if(typeof showPultView === 'function') showPultView('feedback');
            },
            function(error) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = "Hiba: " + error.message;
                if(typeof showPultView === 'function') showPultView('feedback');
            }
        );
    };
    
    checkStatusBtn.onclick = function() {
        const recipientName = document.getElementById('pult-check-recipient-name').value;
        if (!recipientName) {
            if(typeof uiAlert === 'function') uiAlert("Kérlek, add meg a kalóz nevét!");
            return;
        }
        
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // --- JAVÍTÁS: callBackend ---
        // NEM küldjük a currentUserEmail-t!
        callBackend('checkMessageStatusByRecipient', [recipientName], 
            function(response) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = response.message;
                document.getElementById('pult-check-recipient-name').value = '';
                if(typeof showPultView === 'function') showPultView('feedback');
            },
            function(error) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = "Hiba: " + error.message;
                if(typeof showPultView === 'function') showPultView('feedback');
            }
        );
    };

    // 3. ASZTAL (CHAT) FUNKCIÓK
    asztalBtn.onclick = () => {
        if(typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        asztalConfirmModal.style.display = 'flex';
    };

    csevegBtn.onclick = () => {
        const userName = document.querySelector('.header-title').innerText;
        // Itt HASZNÁLHATJUK a globális változót az URL építéshez (ez nem backend hívás)
        if (!userName || !currentUserEmail) {
            if(typeof uiAlert === 'function') uiAlert("Hiba: A felhasználói adatok nem érhetők el.");
            return;
        }
        
        if (CHAT_ALKALMAZAS_URL.includes("IDE_JON")) {
             alert("A Chat URL nincs beállítva!"); 
             return;
        }

        const chatUrl = `${CHAT_ALKALMAZAS_URL}?name=${encodeURIComponent(userName)}&email=${encodeURIComponent(currentUserEmail)}`;
        
        chatIframe.src = chatUrl;
        asztalConfirmModal.style.display = 'none';
        chatModal.style.display = 'flex';
    };

    closeChatBtn.onclick = () => {
        chatModal.style.display = 'none';
        chatIframe.src = 'about:blank'; 
    };
    
    // 4. JÁTÉKTEREM (Már jó volt, de biztos ami biztos)
    jatekteremBtn.onclick = () => {
        if(typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        
        if(typeof requestPin !== 'function') {
            console.error("Hiányzik a requestPin függvény!");
            return;
        }

        requestPin(function(pinCode) {
            currentTavernPin = pinCode;
            
            if(typeof preloadTavernaImages === 'function') {
                preloadTavernaImages(() => {
                    if (typeof tavernaImageSources !== 'undefined' && tavernaImageSources.dark_wood) {
                        gameModalContent.style.backgroundImage = `url(${tavernaImageSources.dark_wood})`;
                    }
                    
                    document.getElementById('loading-overlay').style.display = 'flex';
                    
                    // callBackend Helyes használata (Nincs paraméter, nincs email)
                    callBackend('getGameInitialData', [], 
                        function(data) {
                            document.getElementById('loading-overlay').style.display = 'none';
                            if (data.success) {
                                playerCredit = data.credit;
                                prizePool = data.prizePool;
                                if(typeof resetGame === 'function') resetGame();
                                jatekteremModal.style.display = 'flex';
                            } else {
                                if(typeof uiAlert === 'function') uiAlert("Hiba: " + data.error);
                            }
                        },
                        function(err) {
                            document.getElementById('loading-overlay').style.display = 'none';
                            if(typeof uiAlert === 'function') uiAlert("Szerverhiba: " + err.message);
                        }
                    );
                });
            }
        }, "Játékterem Belépés<br>Add meg a PIN kódodat!");
    };
    
    closeGameBtn.onclick = () => { jatekteremModal.style.display = 'none'; };
}

        // === JÁTÉKVEZÉRLŐ FÜGGVÉNYEK ===

       function resetGame() {
    gameState = 'betting';
    
    // 1. Szövegek alaphelyzetbe
    const infoText = document.getElementById('game-info-text');
    const feedbackText = document.getElementById('game-feedback-text');
    const cardArea = document.getElementById('game-card-area');
    const bettingArea = document.getElementById('game-betting-area');

    if(infoText) infoText.innerText = "Melyik a piros ász? Tedd meg a téted, kalóz! Ha utána jól tippelsz, akkor a dupláját adom vissza!";
    if(feedbackText) feedbackText.innerText = '';

    // 2. KÁRTYÁK KIRAJZOLÁSA (Csak dekoráció, NINCS kattintás esemény!)
    if (typeof tavernaImageSources !== 'undefined' && tavernaImageSources.kartya_hatlap && cardArea) {
        cardArea.innerHTML = 
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>' +
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>' +
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>';
        
        cardArea.style.display = 'flex';
        cardArea.style.justifyContent = 'center';
        cardArea.style.marginBottom = '20px';
    } else if (cardArea) {
        cardArea.innerHTML = '<p>(Kártyaképek betöltése...)</p>'; 
    }
    
    // 3. TÉT MEZŐ ÉS GOMB LÉTREHOZÁSA
    if (bettingArea) {
        bettingArea.innerHTML = ''; // Törlés
        
        var label = document.createElement('span');
        label.innerText = 'A téted: ';
        label.style.marginRight = '10px';
        
        var betInput = document.createElement('input');
        betInput.type = 'number';
        betInput.id = 'game-bet-input';
        betInput.style.padding = '8px';
        betInput.style.width = '100px';
        betInput.style.textAlign = 'center';
        betInput.placeholder = 'Kredit';
        betInput.style.marginRight = '10px';
        
        var playBtn = document.createElement('button');
        playBtn.id = 'game-play-btn';
        playBtn.className = 'btn';
        playBtn.style.backgroundColor = '#d2691e';
        playBtn.style.color = 'white';
        playBtn.innerText = 'Játsszunk!';

        bettingArea.appendChild(label);
        bettingArea.appendChild(betInput);
        bettingArea.appendChild(playBtn);
        
        playBtn.onclick = handlePlayButtonClick;
        bettingArea.style.display = 'block';
    }
}

       function handlePlayButtonClick() {
    const gameBetInput = document.getElementById('game-bet-input');
    const gameFeedbackText = document.getElementById('game-feedback-text');
    const gameInfoText = document.getElementById('game-info-text');
    
    const bet = parseInt(gameBetInput.value, 10);
    gameFeedbackText.innerText = '';

    if (!bet || bet <= 0) { gameFeedbackText.innerText = "Érvénytelen tét!"; return; }
    
    // playerCredit globális változó
    if (typeof playerCredit !== 'undefined' && bet > playerCredit) {
        gameInfoText.innerText = "Fel mered tenni az összes vagyonodat egy játékra?";
        gameFeedbackText.innerText = "Nincs ennyi kredited!";
        gameBetInput.value = playerCredit;
        return;
    }
    // prizePool globális változó
    if (typeof prizePool !== 'undefined' && bet > prizePool) {
        gameInfoText.innerText = "Ez az összes kredit, amit most feltehetsz. Megjátsszuk?";
        gameFeedbackText.innerText = "Csak kisebb tétet tudok elfogadni.";
        gameBetInput.value = prizePool;
        return;
    }
    
    startGameAnimation(bet);
}

      function startGameAnimation(bet) {
    gameState = 'animating';
    document.getElementById('game-betting-area').style.display = 'none';
    document.getElementById('game-info-text').innerText = "Keverem a lapokat...";
    
    const cardArea = document.getElementById('game-card-area');
    // Backtick helyett string összefűzés a biztonság kedvéért
    cardArea.innerHTML = '<img id="shuffle-gif" src="' + tavernaImageSources.kartyakeveres_gif + '" style="height: 300px; max-width: 100%;">';
    
    // Az animáció ideje (pl. 3 másodperc)
    setTimeout(function() {
        showCardsForChoice(bet);
    }, 3000); 
}

      function showCardsForChoice(bet) {
    gameState = 'choosing';
    document.getElementById('game-info-text').innerText = "Na, hol a piros ász? Válassz egy lapot!";
    
    const cardArea = document.getElementById('game-card-area');
    cardArea.innerHTML = 
        '<div class="card" id="card-1"></div>' +
        '<div class="card" id="card-2"></div>' +
        '<div class="card" id="card-3"></div>';
    
    // Stílus beszúrása dinamikusan (hogy a hover működjön)
    var styleId = 'card-game-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = '.card { width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; transition: all 0.3s; cursor: pointer; background-image: url(' + tavernaImageSources.kartya_hatlap + '); } .card:hover { transform: scale(1.1); }';
        document.head.appendChild(style);
    }

    // Eseménykezelők hozzáadása
    // ITT adjuk át a 'bet' változót a handleCardChoice-nak!
    var cards = cardArea.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
        (function(cardElement) {
            cardElement.onclick = function() {
                handleCardChoice(bet, cardElement);
            };
        })(cards[i]);
    }
}

  function handleCardChoice(bet, chosenCard) {
    if (gameState !== 'choosing') return;
    gameState = 'result';
    
    // UI frissítés: Töltés
    document.getElementById('loading-overlay').style.display = 'flex';
    
    // Globális currentTavernPin használata
    var pin = (typeof currentTavernPin !== 'undefined') ? currentTavernPin : null;

    // Backend hívás (Nincs email paraméter!)
    callBackend('playCardGame', [bet, pin], 
        function(result) {
            document.getElementById('loading-overlay').style.display = 'none';
            
            if (result.success) {
                // Globális változók frissítése
                if (typeof playerCredit !== 'undefined') playerCredit = result.newCredit;
                updateCreditDisplay();
                
                // Kártyák felfordítása
                // A választott kártya
                if (result.outcome === 'win') {
                    chosenCard.style.backgroundImage = 'url(' + tavernaImageSources.kartya_pirosasz + ')';
                } else {
                    // Véletlenszerű vesztes kártya (Bub vagy Király)
                    var lossCards = ['kartya_fekbub', 'kartya_fekkar'];
                    var randomLoss = lossCards[Math.floor(Math.random() * lossCards.length)];
                    chosenCard.style.backgroundImage = 'url(' + tavernaImageSources[randomLoss] + ')';
                }

                var infoText = document.getElementById('game-info-text');
                if (result.outcome === 'win') {
                    infoText.innerText = 'Nyertél ' + result.prize + ' kreditet! Ügyes vagy, gazfickó!';
                } else {
                    infoText.innerText = 'Vesztettél ' + bet + ' kreditet! Majd legközelebb, barátom!';
                }
                
                // Gombok visszaállítása
                var playBtn = document.getElementById('game-play-btn');
                var betArea = document.getElementById('game-betting-area');
                var betInput = document.getElementById('game-bet-input');
                
                if(playBtn) {
                    playBtn.innerText = 'Új Játék';
                    playBtn.onclick = resetGame;
                }
                if(betArea) betArea.style.display = 'block';
                if(betInput) betInput.style.display = 'none'; // Elrejtjük az inputot az eredmény képernyőn

            } else {
                if(typeof uiAlert === 'function') uiAlert("Hiba a játék során: " + result.error);
                resetGame();
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if(typeof uiAlert === 'function') uiAlert("Szerverhiba: " + err.message);
            resetGame();
        }
    );
} 

    // --- BÉTA ASZTAL FRONTEND LOGIKA ---

      // Pult nézetváltó bővítése
      /**
     * Váltogat a Pult belső nézetei között.
     * @param {string} viewSuffix A nézet azonosítója (pl. 'read', 'compose', 'beta_menu').
     */
    function showPultView(viewSuffix) {
        // A lehetséges nézetek ID-jainak listája
        const views = [
            'pult-view-read', 
            'pult-view-compose', 
            'pult-view-check_status_init', 
            'pult-view-feedback', 
            'pult-view-beta_menu', 
            'pult-view-beta_upload', 
            'pult-view-beta_list',
            'pult-view-beta_my_works' // Ezt is kezelni kell!
        ];

        // Mindenkit elrejtünk
        views.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.style.display = 'none';
        });

        // A kiválasztottat megjelenítjük
        const targetId = `pult-view-${viewSuffix}`;
        const target = document.getElementById(targetId);
        if(target) {
            target.style.display = 'block';
        } else {
            console.warn(`Figyelem: A kért nézet (${targetId}) nem található.`);
        }

        // --- Speciális betöltési logikák ---
        
        // Ha visszalépünk a főmenübe, frissítsük az üzeneteket
        if (viewSuffix === 'read') {
            loadTavernaMessages();
        }
        
        // Ha a béta listát nyitjuk, töltsük le az adatokat
        if (viewSuffix === 'beta_list') {
            loadBetaWorks(); // Ez a függvény már létezik a kódodban
        }
    }

      // 1. JAVÍTOTT MODAL NYITÓ (Flex display + Suffix hívás)
    function openPultModal() {
        const modal = document.getElementById('pult-modal');
        if (modal) {
            modal.style.display = 'flex'; // FONTOS: Flex a középre igazításhoz!
            
            // FONTOS: Csak a 'read' utótagot adjuk át, a showPultView kiegészíti!
            showPultView('read'); 
        } else {
            console.error("Hiba: Nem található a 'pult-modal' elem!");
        }
    }

    // 2. JAVÍTOTT KÖLTSÉG SZÁMOLÓ (Esemény delegálás - Nincs több "null" hiba!)
    // Ez helyettesíti a régi 'DOMContentLoaded' blokkot
    document.addEventListener('input', function(e) {
        // Figyeljük, ha valaki ír a béta mezőkbe
        if (e.target && (e.target.id === 'beta-bonus' || e.target.id === 'beta-max')) {
            updateBetaCost();
        }
    });

    function updateBetaCost() {
        const fee = 10;
        const bonusInput = document.getElementById('beta-bonus');
        const maxInput = document.getElementById('beta-max');
        
        // Ha még nincs betöltve a HTML, kilépünk hiba nélkül
        if (!bonusInput || !maxInput) return;

        const bonus = parseInt(bonusInput.value) || 0;
        const max = parseInt(maxInput.value) || 0;
        const pool = bonus * max;
        const total = fee + pool;
        
        const totalCalcEl = document.getElementById('beta-total-calc');
        const finalCostEl = document.getElementById('beta-final-cost');

        if(totalCalcEl) totalCalcEl.textContent = pool + " Kr";
        if(finalCostEl) finalCostEl.textContent = total + " Kr";
    }

      // 1. FELTÖLTÉS INDÍTÁSA (PIN Kéréssel)
      function initiateBetaUpload() {
          const title = document.getElementById('beta-title').value;
          const content = document.getElementById('beta-content').value;
          const bonus = document.getElementById('beta-bonus').value;
          const max = document.getElementById('beta-max').value;

          if (!title || !content) {
              uiAlert("Kérlek, töltsd ki a címet és a szöveget!");
              return;
          }

          // Adatok összegyűjtése
          const payload = {
              title: title,
              contentHtml: content.replace(/\n/g, '<br>'), // Sortörések konvertálása HTML-re
              bonusPerReader: bonus,
              maxReaders: max
          };

          // PIN bekérése a globális panellel
          if (typeof requestPin === 'function') {
        requestPin(function(pinCode) {
            sendBetaUploadToServer(pinCode, payload);
        }, "Feltöltés Megerősítése<br><small>A költségek levonásához add meg a kódodat!</small>");
    } else {
        // Ha valami csoda folytán mégsem lenne betöltve (fallback)
        const p = prompt("PIN kód:");
        if(p) sendBetaUploadToServer(p, payload);
    }
}

// =========================================
// === BÉTA FELTÖLTÉS KÜLDÉSE (VISSZAJELZÉSSEL) ===
// =========================================

function sendBetaUploadToServer(pinCode, payload) {
    document.getElementById('loading-overlay').style.display = 'flex';
    
    callBackend('uploadBetaWorkToTavern', [pinCode, payload], 
        function(response) {
            document.getElementById('loading-overlay').style.display = 'none';
            
            if (response.success) {
                var feedbackEl = document.getElementById('pult-feedback-text');
                
                // JAVÍTVA: Sima string összefűzés
                feedbackEl.innerHTML = '<div style="text-align: center; color: #5d3a1a;">' +
                    '<i class="fas fa-feather-alt" style="font-size: 3em; color: #8b0000; margin-bottom: 15px;"></i>' +
                    '<br><strong>Sikeres feltöltés!</strong><br><br>' +
                    '"Irományod a bétázók prédája lett! Nincs további teendőd, zárd be ezt az ablakot, rendelj egy italt, aztán majd pár nap múlva érdeklődj az eredmény felől!"' +
                    '</div>';
                
                feedbackEl.style.color = 'inherit'; 
                var againBtn = document.getElementById('pult-feedback-compose-again-btn');
                if(againBtn) againBtn.style.display = 'none';
                
                showPultView('feedback');
                
                document.getElementById('beta-title').value = '';
                document.getElementById('beta-content').value = '';
            } else {
                uiAlert("Hiba: " + response.error);
            }
        },
        function(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba: " + e.message);
        }
    );
}

      // 2. LISTA BETÖLTÉSE
    function loadBetaWorks() {
    var container = document.getElementById('beta-list-container');
    container.innerHTML = '<p style="text-align:center;">Tekercsek rendezése...</p>';
    
    // === ÚJ HÍVÁS (callBackend) ===
    // Backend: getAvailableBetaWorks
    // Paraméterek: [] (üres tömb, mert az emailt a Router intézi a Tokenből!)
    callBackend('getAvailableBetaWorks', [], 
        function(res) {
            if (res.success) {
                // Ez hívja meg a renderelőt, ami kirajzolja a címeket!
                renderBetaList(res.works);
            } else {
                // JAVÍTVA: Backtick helyett sima string összefűzés
                container.innerHTML = '<p style="color:red;">Hiba: ' + res.error + '</p>';
            }
        },
        function(err) {
             // JAVÍTVA: Backtick helyett sima string összefűzés
             container.innerHTML = '<p style="color:red;">Szerverhiba: ' + err.message + '</p>';
        }
    );
}

      // A lista kirajzolása (Kliens oldal)
    function renderBetaList(works) {
    const container = document.getElementById('beta-list-container');
    container.innerHTML = '';
    
    // --- 1. ÜRES ÁLLAPOT KEZELÉSE ---
    if (!works || works.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 20px; color: #5d3a1a;">' +
            '<i class="fas fa-feather-alt" style="font-size: 3em; opacity: 0.5; margin-bottom: 10px;"></i>' +
            '<p><strong>Az asztal jelenleg üres!</strong></p>' +
            '<p style="font-size: 0.9em; font-style: italic;">' +
                '"Úgy tűnik, mindenki a kocsmában mulat írás helyett.<br>' +
                'Légy te az első, aki leteszi a garast (és a történetet)!"' +
            '</p>' +
            '<button class="btn btn-sm" style="background-color: #8b0000; color: white; margin-top: 10px;" onclick="showPultView(\'beta_upload\')">' +
                '🖋️ Én írok valamit! (Feltöltés)' +
            '</button>' +
        '</div>';
        return;
    }
    
    // --- 2. HA VANNAK MŰVEK, LISTÁZZUK ---
    works.forEach(function(work) {
        var div = document.createElement('div');
        div.style.cssText = "background: #fff; padding: 10px; margin-bottom: 5px; border-bottom: 1px dashed #8b4513; border-radius: 4px;";
        
        var actionBtn = '';

        if (work.isMyWork) {
            actionBtn = '<span style="color: #666; font-size: 0.8em; font-style: italic;">(Ez a te irományod)</span>';
        
        } else if (work.alreadyRead) {
            actionBtn = '<button class="btn btn-sm" style="background-color: #ccc; color: #666; cursor: not-allowed;" disabled title="Ezt a művet már értékelted.">' +
                        '✅ Már olvastad</button>';
        } else {
            var bonusText = '+' + work.bonus + ' Kr';
            if(work.remainingPool < work.bonus) {
                 bonusText = '+' + work.remainingPool + ' Kr (Keret vége)';
            }
            if(work.remainingPool <= 0) {
                 bonusText = '(Csak Alapdíj)';
            }

            actionBtn = '<button class="btn btn-sm" style="background-color: #2e8b57; color: white;" onclick="openBetaReader(\'' + work.id + '\', \'' + work.title + '\')">' +
                        'Olvasás (60 ' + bonusText + ')</button>';
        }

        // JAVÍTVA: Sima string összefűzés
        div.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                '<div style="flex: 1; padding-right: 10px;">' +
                    '<strong style="color: #8b0000; font-size: 1.1em;">' + work.title + '</strong><br>' +
                    '<small style="color: #555;">Szerző: <strong>' + work.author + '</strong> | 📅 ' + work.date + '</small>' +
                '</div>' +
                '<div>' + actionBtn + '</div>' +
            '</div>';
            
        container.appendChild(div);
    });
}

// ===================================
// === BÉTA OLVASÓ (FRONTEND) ===
// ===================================

let currentBetaWorkId = null;
let currentBetaWorkTitle = null;

// 1. Olvasó Megnyitása
// (Ezt hívja a lista "Olvasás" gombja)
function openBetaReader(workId, workTitle) {
    currentBetaWorkId = workId;
    currentBetaWorkTitle = workTitle;
    
    var modal = document.getElementById('beta-reader-modal');
    modal.style.display = 'block';
    
    var contentArea = document.getElementById('reader-content-area');
    contentArea.innerHTML = '<div style="text-align:center; padding-top:100px;"><i class="fas fa-circle-notch fa-spin fa-3x" style="color:#8b0000;"></i><br><br>A mű betöltése...</div>';
    
    callBackend('getBetaWorkContent', [workId], 
        function(content) {
             contentArea.innerHTML = content;
        },
        function(e) {
             // JAVÍTVA: Sima string
             contentArea.innerHTML = '<div class="status-box error">Hiba a betöltéskor: ' + e.message + '</div>';
        }
    );
}

// Ezt a függvényt hívja a "📖 Olvasok (Kreditszerzés)" gomb
function listBetaWorksForReader() {
    // 1. Átváltunk a listázó nézetre a pulton belül
    showPultView('beta_list');
    
    // 2. Meghívjuk az adatbetöltő függvényt (ami már létezik loadBetaWorks néven)
    // Ellenőrizzük, hogy létezik-e, hogy ne legyen hiba
    if (typeof loadBetaWorks === 'function') {
        loadBetaWorks();
    } else {
        console.error("Hiba: A 'loadBetaWorks' függvény nem található!");
        document.getElementById('beta-list-container').innerHTML = "Hiba: A betöltő program hiányzik.";
    }
}

// 2. Kilépés (Megerősítéssel)
function closeBetaReader() {
    // Ellenőrizzük, írt-e már valamit
    const opinion = document.getElementById('log-opinion').value;

    // Belső függvény: Ez végzi a tényleges bezárást és törlést
    const veglegesBezaras = function() {
        document.getElementById('beta-reader-modal').style.display = 'none';
        document.getElementById('beta-log-form').reset();
    };

    if (opinion.length > 10) {
        // 1. ESET: Van szöveg -> Kérdezünk
        uiConfirm(
            "A megkezdett naplód elveszik, ha most kilépsz! Biztosan folytatod?", // Üzenet
            "Figyelem", // Cím
            function() {
                // Ez a CALLBACK: Csak akkor fut le, ha az "Igen"-re nyomott
                veglegesBezaras();
            }
        );
    } else {
        // 2. ESET: Nincs szöveg -> Azonnal bezárjuk kérdés nélkül
        veglegesBezaras();
    }
}

// 3. Napló Beküldése
function submitLogbook() {
    const gender = document.getElementById('log-gender').value;
    const age = document.getElementById('log-age').value;
    const genre = document.getElementById('log-genre').value;
    const language = document.getElementById('log-language').value;
    const opinion = document.getElementById('log-opinion').value;

    // Validáció
    if (!gender || !age || !genre || !language) {
        uiAlert("Kérlek, töltsd ki a demográfiai adatokat (Kor, Nem, stb.)!");
        return;
    }
    if (!opinion || opinion.length < 50) {
        alert("A véleménynek legalább pár mondatból (min. 50 karakter) kell állnia!");
        return;
    }

    const logData = {
        gender: gender,
        age: age,
        genre: genre,
        language: language,
        opinionHtml: opinion.replace(/\n/g, '<br>'), // Sortörések megőrzése
        workTitle: currentBetaWorkTitle
    };

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('submitBetaLogbook', [currentBetaWorkId, logData], 
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert(res.message); 
                document.getElementById('beta-reader-modal').style.display = 'none';
                document.getElementById('beta-log-form').reset();
                if(typeof listBetaWorksForReader === 'function') listBetaWorksForReader(); 
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba: " + e.message);
        }
    );
}

// ===================================
// === SZERZŐI STATISZTIKA (FRONTEND) ===
// ===================================

// 1. Saját művek listázása
function showMyBetaStats() {
    showPultView('beta_my_works'); 
    
    const container = document.getElementById('beta-my-works-container');
    container.innerHTML = '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> Tekercsek keresése...</p>';

    // === ÚJ HÍVÁS ===
    // Backend: getAuthorBetaWorks
    // Paraméterek: []
    callBackend('getAuthorBetaWorks', [], 
        function(res) {
            if(res.success) {
                renderMyWorksList(res.works);
            } else {
                container.innerHTML = `<p style="color:red;">Hiba: ${res.error}</p>`;
            }
        },
        function(err) { container.innerHTML = `<p style="color:red;">Szerverhiba: ${err.message}</p>`; }
    );
}

// Lista kirajzolása (Saját Művek) - BŐVÍTETT VERZIÓ
function renderMyWorksList(works) {
    var container = document.getElementById('beta-my-works-container');
    container.innerHTML = '';

    if (works.length === 0) {
        container.innerHTML = '<p>Még nem töltöttél fel béta művet.</p>';
        return;
    }

    works.forEach(function(work) {
        var div = document.createElement('div');
        div.style.cssText = "background: #fff; padding: 10px; margin-bottom: 8px; border-bottom: 1px dashed #8b4513; border-radius: 5px;";
        
        var statusColor = work.status === 'AKTÍV' ? 'green' : 'gray';
        
        var controlButtons = '';
        if (work.status === 'AKTÍV') {
            // JAVÍTVA: String összefűzés
            controlButtons = '<div style="margin-top: 8px; display: flex; gap: 5px; justify-content: flex-end;">' +
                    '<button class="btn btn-sm" style="background-color: #d2691e; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaRefill(\'' + work.id + '\', \'' + work.title + '\')">💰 Töltés</button> ' +
                    '<button class="btn btn-sm" style="background-color: #8b0000; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaClose(\'' + work.id + '\', \'' + work.title + '\')">❌ Lezárás</button>' +
                '</div>';
        } else {
            controlButtons = '<div style="text-align: right; font-size: 0.8em; color: gray; margin-top:5px;">(Ez a tekercs már lezárult)</div>';
        }

        // JAVÍTVA: String összefűzés
        div.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<div>' +
                    '<strong style="color: #5d3a1a;">' + work.title + '</strong><br>' +
                    '<small style="color: #555;">' + work.date + ' | <span style="color:' + statusColor + '; font-weight:bold;">' + work.status + '</span></small>' +
                '</div>' +
                '<button class="btn btn-sm" style="background-color: #4682b4; color: white;" onclick="initiateStatPurchase(\'' + work.id + '\')">📊 Kimutatás</button>' +
            '</div>' +
            controlButtons;
            
        container.appendChild(div);
    });
}

// 2. Vásárlás indítása (PIN bekérése)
function initiateStatPurchase(workId) {
    uiConfirm(
        "A részletes statisztika lekérése 10 Kalózkreditbe kerül. Folytatod?", // Üzenet
        "Vásárlás", // Cím
        function() {
            // Ez a kód fut le, ha a felhasználó az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function(pinCode) {
                    // Ez fut le, ha beírta a PIN-t és rányomott a rendben gombra
                    fetchBetaStats(workId, pinCode);
                }, "Vásárlás Megerősítése");
            } else {
                // Ha valamiért nincs betöltve a PIN bekérő script, szólunk (szépen)
                uiAlert("Hiba: A PIN bekérő modul nem elérhető!", "Rendszerhiba");
            }
        }
    );
}

// 3. Adatok lekérése és megjelenítése
function fetchBetaStats(workId, pinCode) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ÚJ HÍVÁS ===
    // Backend: buyBetaReport
    // Paraméterek: [pinCode, workId] (Figyelj a sorrendre a backendben!)
    // Régi hívás: buyBetaReport(email, pin, workId) -> Új backendben: (userEmail, pin, workId)
    callBackend('buyBetaReport', [pinCode, workId], 
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                renderStatsTable(res.title, res.data);
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba: " + e.message);
        }
    );
}

// Táblázat kirajzolása a Modalban
function renderStatsTable(title, rows) {
    var modal = document.getElementById('beta-stats-modal');
    var titleEl = document.getElementById('stats-modal-title');
    var tbody = document.getElementById('stats-table-body');
    
    // JAVÍTVA
    titleEl.textContent = 'Béta Jelentés: ' + title;
    tbody.innerHTML = '';
    
    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">Még nem érkezett visszajelzés.</td></tr>';
    } else {
        rows.forEach(function(row) {
            var tr = document.createElement('tr');
            var cellStyle = "padding: 8px; border: 1px solid #eee; vertical-align: top;";
            
            // JAVÍTVA: Hosszú string összefűzés
            tr.innerHTML = '<td style="' + cellStyle + ' white-space: nowrap;">' + row.date + '</td>' +
                '<td style="' + cellStyle + '"><strong>' + row.readerName + '</strong></td>' +
                '<td style="' + cellStyle + '">' + row.age + '<br>' + row.gender + '</td>' +
                '<td style="' + cellStyle + '">' + row.genre + '<br>' + row.lang + '</td>' +
                '<td style="' + cellStyle + ' font-style: italic; font-size: 0.9em;">' + row.opinion + '</td>' +
                '<td style="' + cellStyle + ' color: green; font-weight: bold;">+' + row.bonusPaid + ' Kr</td>';
                
            tbody.appendChild(tr);
        });
    }
    
    modal.style.display = 'flex';
}

// ===================================
// === BÉTA MŰVEK KEZELÉSE (USER) ===
// ===================================

// 1. UTÁNTÖLTÉS INDÍTÁSA
function initiateBetaRefill(workId, title) {
    // Mennyit töltsünk?
    const amountStr = prompt(`Mennyi kredittel szeretnéd feltölteni a(z) "${title}" keretét?`);
    if (!amountStr) return; // Mégse
    
    const amount = parseInt(amountStr);
    if (!amount || amount <= 0) {
        uiAlert("Hibás összeg!");
        return;
    }

    // PIN bekérése
    if (typeof requestPin === 'function') {
        requestPin(function(pinCode) {
            sendManageRequest(pinCode, 'REFILL', workId, amount);
        }, "Egyenleg Feltöltése");
    } else {
        const p = prompt("PIN kód:");
        if(p) sendManageRequest(p, 'REFILL', workId, amount);
    }
}

// 2. LEZÁRÁS INDÍTÁSA
function initiateBetaClose(workId, title) {
    // A szöveg formázása HTML-lel a szebb megjelenésért
    const message = `Biztosan le akarod zárni a(z) "<b>${title}</b>" bétáztatását?<br><br><b>FONTOS:</b> A fel nem használt kreditkeretet visszakapod!`;

    uiConfirm(
        message, 
        "Bétáztatás Lezárása", 
        function() {
            // Ez fut le, ha az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function(pinCode) {
                    // Ez fut le, ha beírta a PIN-t
                    sendManageRequest(pinCode, 'CLOSE', workId, 0);
                }, "Lezárás Megerősítése");
            } else {
                // Prompt helyett hibaüzenet, ha nincs PIN modul
                uiAlert("Hiba: A PIN bekérő modul nem elérhető!", "Rendszerhiba");
            }
        }
    );
}

// Közös szerverhívó
function sendManageRequest(pinCode, action, workId, amount) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ÚJ HÍVÁS ===
    // Backend: manageBetaWork
    // Paraméterek: [pinCode, action, workId, amount]
    callBackend('manageBetaWork', [pinCode, action, workId, amount], 
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert("✅ " + res.message);
                showMyBetaStats(); // Lista frissítése
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba: " + e.message);
        }
    );
}   


//  ========
//  ==BANK==
//  ========

/**
 * SEGÉDFÜGGVÉNY: Inicializálja a Bank szekciót a Piac oldalon.
 */
function initializeBankSection() {
    var exchangeBtn = document.getElementById('bank-exchange-btn');
    var sendBtn = document.getElementById('bank-send-btn');
    var itemTypeSelect = document.getElementById('bank-send-item-type');
    var itemSelectorDiv = document.getElementById('bank-send-item-selector');

    exchangeBtn.onclick = function() {
        var amount = document.getElementById('bank-exchange-amount').value;
        var pinCode = document.getElementById('bank-exchange-pin').value;

        if (!amount || amount <= 0) { uiAlert("Kérlek, adj meg egy pozitív számot az átváltáshoz."); return; }
        if (!pinCode) { uiAlert("A PIN kód megadása kötelező!"); return; }

        document.getElementById('loading-overlay').style.display = 'flex';
        
        callBackend('exchangeTalentumToCredit', [amount, pinCode], 
            function(response){
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(response.message || response.error);
                if (response.success) {
                    updateCreditDisplay(); 
                    document.getElementById('bank-exchange-amount').value = '';
                    document.getElementById('bank-exchange-pin').value = '';
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Szerverhiba: " + err.message);
            }
        );
    };

    itemTypeSelect.onchange = function() {
        var selectedType = this.value;
        itemSelectorDiv.innerHTML = ''; 

        if (!selectedType) return;

        if (selectedType === 'kredit' || selectedType === 'talentum') {
            var amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.id = 'bank-send-item-identifier';
            // JAVÍTVA: String összefűzés
            amountInput.placeholder = 'Küldendő ' + selectedType + ' összege';
            amountInput.style.width = '100%';
            amountInput.style.padding = '8px';
            itemSelectorDiv.appendChild(amountInput);
        } else {
            var itemsKey = null; 
            switch (selectedType) {
                case 'masolat': itemsKey = 'masolatok'; break;
                case 'tekercs': itemsKey = 'tekercsek'; break;
                case 'kincs':   itemsKey = 'kincsek';   break;
                case 'terkep':  itemsKey = 'terkepek';  break;
                case 'hajok': itemsKey = 'hajok'; break; 
                case 'buvarhajok': itemsKey = 'buvarhajok'; break; 
                case 'leghajok': itemsKey = 'leghajok'; break; 
            }

            if (!userTradableItemsCache) {
                 // JAVÍTVA: Sima string
                 itemSelectorDiv.innerHTML = '<p>Tárgyak betöltése folyamatban...</p>';
                 
                 callBackend('getUserTradableItems', [], 
                    function(response) {
                        if(response.success) {
                            userTradableItemsCache = response.items;
                            itemTypeSelect.onchange();
                        } else {
                            itemSelectorDiv.innerHTML = "<p>Hiba a tárgyak betöltésekor.</p>";
                        }
                    },
                    function(err) { console.error(err); }
                 );
                 return;
            }

            var items = itemsKey ? userTradableItemsCache[itemsKey] : [];

            if (items && items.length > 0) {
                var itemSelect = document.createElement('select');
                itemSelect.id = 'bank-send-item-identifier';
                itemSelect.style.width = '100%';
                itemSelect.style.padding = '8px';

                var optionsHTML = '<option value="">Válassz egy tételt...</option>';
                // Sima sort()
                items.sort(function(a, b) { return a.name.localeCompare(b.name); });
                
                items.forEach(function(item) {
                    if (item.identifier) {
                        // JAVÍTVA: String összefűzés
                        optionsHTML += '<option value="' + item.identifier + '">' + item.name + '</option>';
                    }
                });
                itemSelect.innerHTML = optionsHTML;
                itemSelectorDiv.appendChild(itemSelect);
            } else {
                itemSelectorDiv.innerHTML = '<p>Nincs ilyen típusú küldhető tételed.</p>';
            }
        }
    };
    
    sendBtn.onclick = function() {
        var recipientEmail = document.getElementById('bank-send-recipient').value;
        var itemType = document.getElementById('bank-send-item-type').value;
        var itemIdentifierEl = document.getElementById('bank-send-item-identifier');
        var pinCode = document.getElementById('bank-send-pin').value;

        if (!recipientEmail || !itemType || !itemIdentifierEl || !itemIdentifierEl.value || !pinCode) {
            uiAlert("Kérjük, tölts ki minden mezőt a küldéshez!");
            return;
        }

        var itemIdentifier = itemIdentifierEl.value;

        document.getElementById('loading-overlay').style.display = 'flex';
        
        callBackend('sendItemToUser', [recipientEmail, itemType, itemIdentifier, pinCode], 
            function(response) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(response.message || response.error); 
                if (response.success) {
                    if (response.offerLogPublication === true) {
                        uiAlert("A hajó átadva! A hajónapló kiadásának lehetőségét mostantól megtalálod a Könyvszentélyben.");
                    }
                    userTradableItemsCache = null; 
                    updateCreditDisplay();
                    loadPage('piac_oldal'); 
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Szerverhiba: " + err.message);
            }
        );
    };

    if (!userTradableItemsCache) {
         callBackend('getUserTradableItems', [], 
            function(response) {
              if(response.success) {
                userTradableItemsCache = response.items;
                console.log("Bank: Eladható tételek gyorsítótárazva.");
                if (itemTypeSelect.value && itemTypeSelect.value !== 'kredit' && itemTypeSelect.value !== 'talentum') {
                    itemTypeSelect.onchange(); 
                }
              }
            },
            function(err) { console.warn("Cache init hiba:", err); }
         );
    }
}        

// =========================================
// === PIAC RENDSZER (HIBRID SZŰRÉSSEL) ===
// =========================================

// Globális változók a piachoz
var currentItemToSell = { identifier: null, type: null };
var currentOfferAction = { action: null, listingId: null, offerId: null };
var userTradableItemsCache = null;
var marketListingsCache = []; 
var CLIENT_SIDE_FILTER_THRESHOLD = 100; // E felett szerver oldali a keresés

/**
 * Piac oldal inicializálása (HIBRID SZŰRÉSSEL)
 */
function initializePiacOldal() {
    var loaders = {
        piaci: document.getElementById('piaci-lista-loader'),
        ajanlatok: document.getElementById('aktiv-ajanlatok-loader')
    };
    var containers = {
        piaci: document.getElementById('piaci-lista'),
        ajanlatok: document.getElementById('aktiv-ajanlatok-lista')
    };
  
    // Loader megjelenítése
    if(loaders.piaci) loaders.piaci.style.display = 'block';
    if(loaders.ajanlatok) loaders.ajanlatok.style.display = 'block';

    loadMyListedItems(); 
    initializeSellableItemsSection();
    loadMyActiveOffers(containers.ajanlatok, loaders.ajanlatok);
    
    // BANK SZEKCIÓ INDÍTÁSA (Feltételezzük, hogy a függvény már létezik feljebb!)
    if (typeof initializeBankSection === 'function') {
        initializeBankSection();
    }

    var searchInput = document.getElementById('piac-kereso');
    var searchButton = document.getElementById('piac-kereso-gomb');

    // 1. Tételszám lekérése a döntéshez (callBackend)
    callBackend('getMarketItemCount', [], function(response) {
        if (!response.success) {
            containers.piaci.innerHTML = '<p style="color:red;">Hiba a piac betöltésekor: ' + response.error + '</p>';
            return;
        }

        // 2. Döntés a szűrési mód között
        if (response.count <= CLIENT_SIDE_FILTER_THRESHOLD) {
            // --- KLIENSOLDALI MÓD (Gyors, mindent letölt) ---
            if(searchButton) searchButton.style.display = 'none';
            if(searchInput) searchInput.placeholder = 'Szűrés a hirdetések között...';
        
            // Null paraméterrel mindent lekérünk
            callBackend('getMarketListings', [null], function(listingResponse){
                if(loaders.piaci) loaders.piaci.style.display = 'none';
                if(listingResponse.success){
                    marketListingsCache = listingResponse.listings;
                    displayListings(marketListingsCache, containers.piaci);
                    
                    // Kliens oldali keresés eseménykezelője
                    searchInput.onkeyup = function() {
                        var searchTerm = this.value.toLowerCase();
                        var filteredList = marketListingsCache.filter(function(item) { 
                            return item.itemName.toLowerCase().indexOf(searchTerm) !== -1;
                        });
                        displayListings(filteredList, containers.piaci);
                    };
                }
            });

        } else {
            // --- SZERVEROLDALI MÓD (Kímélő, csak keresésre tölt) ---
            if(loaders.piaci) loaders.piaci.style.display = 'none';
            if(searchButton) searchButton.style.display = 'inline-block';
            if(searchInput) searchInput.placeholder = 'Keress a hirdetések között, majd kattints a gombra';
            containers.piaci.innerHTML = "<p>Használd a keresőt a hirdetések megtekintéséhez.</p>";
        
            searchButton.onclick = function() {
                var searchTerm = searchInput.value;
                if (!searchTerm || searchTerm.length < 2) {
                    if(typeof uiAlert === 'function') uiAlert("A kereséshez legalább 2 karaktert kell beírnod.");
                    return;
                }
                if(loaders.piaci) loaders.piaci.style.display = 'block';
                containers.piaci.innerHTML = '';
            
                callBackend('getMarketListings', [{ name: searchTerm }], function(listingResponse){
                    if(loaders.piaci) loaders.piaci.style.display = 'none';
                    if(listingResponse.success){
                        displayListings(listingResponse.listings, containers.piaci);
                    }
                });
            };
        }
    });
  
    setupSellModalListeners();
    setupOfferModalListeners();
}

function toggleBuyNowInput(isFixedSelected) {
    document.getElementById('fixed-price-container').style.display = isFixedSelected ? 'block' : 'none';
    document.getElementById('buy-now-price-container').style.display = isFixedSelected ? 'none' : 'block';
    if (isFixedSelected) {
        document.getElementById('hirdetes-buy-now-ar').value = '';
    } else {
        document.getElementById('hirdetes-ar').value = '';
    }
}

function displayListings(listings, container) {
    container.innerHTML = '';
    if (listings.length === 0) {
        container.innerHTML = "<p>Nincsenek a keresésnek megfelelő hirdetések.</p>";
        return;
    }

    listings.forEach(function(listing) {
        // Saját hirdetés szűrése (ha a szerver nem tette meg)
        if (listing.sellerEmail && currentUserEmail && listing.sellerEmail.toLowerCase() === currentUserEmail.toLowerCase()) return;

        var entryDiv = document.createElement('div');
        entryDiv.className = 'item-entry';

        var actionButtonHTML = '';
        var priceOrOfferInfo = ''; 

        if (listing.isFixedPrice) {
            priceOrOfferInfo = 'Fix ár: ' + listing.price + ' kr';
            actionButtonHTML = '<button class="btn buy-now-btn">Megveszem (' + listing.price + ' kr)</button>';
        } else {
            priceOrOfferInfo = 'Ajánlat alapú';
            if (listing.buyNowPrice) {
                priceOrOfferInfo += ' (Azonnali vétel: ' + listing.buyNowPrice + ' kr)';
                actionButtonHTML = '<button class="btn make-offer-btn">Ajánlatot teszek</button> ' +
                                   '<button class="btn buy-now-btn">Megveszem (' + listing.buyNowPrice + ' kr)</button>';
            } else {
                actionButtonHTML = '<button class="btn make-offer-btn">Ajánlatot teszek</button>';
            }
        }

        // HTML összeállítása string összefűzéssel (NEM backtick)
        entryDiv.innerHTML = '<div class="item-details">' +
                                '<div class="item-title">' + listing.itemName + '</div>' +
                                '<div class="item-author"><em>' + priceOrOfferInfo + '</em></div>' +
                                '<small>Eladó: ' + listing.sellerEmail + '</small>' +
                             '</div>' +
                             '<div class="item-actions">' + actionButtonHTML + '</div>';

        var buyNowBtn = entryDiv.querySelector('.buy-now-btn');
        var makeOfferBtn = entryDiv.querySelector('.make-offer-btn');

        if (buyNowBtn) {
            buyNowBtn.onclick = function() { buyNowAction(listing.listingId); };
        }
        if (makeOfferBtn) {
            makeOfferBtn.onclick = function() { openOfferModal('make', listing.listingId, null, listing.itemName); };
        }

        container.appendChild(entryDiv);
    });
}

function loadMyListedItems() {
    var loader = document.getElementById('meghirdetett-lista-loader');
    var container = document.getElementById('meghirdetett-lista');
    if (!loader || !container) return;

    loader.style.display = 'block';
    container.innerHTML = ''; 

    // callBackend használata (email nélkül)
    callBackend('getMyListedItems', [], function(response) {
        loader.style.display = 'none';
        if (!response.success) {
            container.innerHTML = '<p style="color:red;">Hiba: ' + response.error + '</p>';
            return;
        }

        if (response.listings.length === 0) {
            container.innerHTML = "<p>Nincsenek jelenleg meghirdetett tételeid.</p>";
        } else {
            response.listings.forEach(function(listing) {
                var priceInfo = listing.isFixedPrice ? 'Fix ár: ' + listing.price + ' kr' : 'Ajánlat alapú';
                if (!listing.isFixedPrice && listing.buyNowPrice) priceInfo += ' (Azonnali: ' + listing.buyNowPrice + ' kr)';

                var entryDiv = document.createElement('div');
                entryDiv.className = 'item-entry';
                
                // HTML összeállítása
                entryDiv.innerHTML = '<div class="item-details">' +
                                        '<div class="item-title">' + listing.itemName + '</div>' +
                                        '<div class="item-author"><em>' + priceInfo + '</em></div>' +
                                     '</div>' +
                                     '<div><button class="btn withdraw-listing-btn" style="background-color: #c82333;">Visszavonás</button></div>';
                
                entryDiv.querySelector('.withdraw-listing-btn').onclick = function() { withdrawListingAction(listing.listingId, listing.itemName); };
                container.appendChild(entryDiv);
            });
        }
    });
}

function withdrawListingAction(listingId, itemName) {
    var pinCode = prompt('Add meg a PIN kódodat a(z) "' + itemName + '" hirdetés visszavonásához:');
    if (pinCode === null || !pinCode) return;

    document.getElementById('loading-overlay').style.display = 'flex';
    // callBackend használata (email nélkül)
    callBackend('withdrawListing', [listingId, pinCode], handleServerResponse);
}

function initializeSellableItemsSection() {
    var typeSelect = document.getElementById('sell-item-type-select');
    var itemSelect = document.getElementById('sell-item-select');
    var sellButton = document.getElementById('sell-selected-item-button');
    var loader = document.getElementById('sajat-eladhato-lista-loader');

    typeSelect.onchange = function() {
        var selectedType = this.value;
        itemSelect.innerHTML = '<option value="">Válassz tételt...</option>';
        if (!selectedType) return;

        loader.style.display = 'block';
        
        callBackend('getUserTradableItems', [], function(response) {
            loader.style.display = 'none';
            if (response.success) {
                userTradableItemsCache = response.items;
                var itemsKey = (selectedType === 'masolat') ? 'masolatok' : 
                               (selectedType === 'tekercs') ? 'tekercsek' :
                               (selectedType === 'kincs') ? 'kincsek' : 
                               (selectedType === 'terkep') ? 'terkepek' : selectedType;
                
                var items = userTradableItemsCache[itemsKey] || [];
                items.forEach(function(item) {
                    var opt = document.createElement('option');
                    opt.value = item.identifier;
                    opt.textContent = item.name;
                    itemSelect.appendChild(opt);
                });
                itemSelect.style.display = 'block';
            }
        });
    };

    sellButton.onclick = function() {
        var type = typeSelect.value;
        var id = itemSelect.value;
        var name = itemSelect.options[itemSelect.selectedIndex].text;
        if (type && id) openSellModal(id, type, name);
    };
}

function loadMyActiveOffers(container, loader) {
    callBackend('getMyActiveOffers', [], function(response){
        if(loader) loader.style.display = 'none';
        if (response.success && response.offers.length > 0) {
            container.innerHTML = '';
            response.offers.forEach(function(offer) {
                var entryDiv = document.createElement('div');
                entryDiv.className = 'item-entry';
                
                // HTML összeállítása
                entryDiv.innerHTML = '<div class="item-details"><div class="item-title">Ajánlat: ' + offer.listingItemName + '</div></div>' +
                                     '<div><button class="btn retract-offer-btn" style="background-color: #c82333;">Retract</button></div>';
                
                entryDiv.querySelector('.retract-offer-btn').onclick = function() { retractOfferAction(offer.offerId); };
                container.appendChild(entryDiv);
            });
        }
    });
}

function buyNowAction(listingId) {
    var pinCode = prompt("PIN kód a vásárláshoz:");
    if (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        // callBackend, email nélkül
        callBackend('buyNow', [listingId, pinCode], handleServerResponse);
    }
}

function retractOfferAction(offerId) {
    var pinCode = prompt("PIN kód a visszavonáshoz:");
    if (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        // callBackend, email nélkül
        callBackend('retractOffer', [offerId, pinCode], handleServerResponse);
    }
}

function openOfferModal(action, listingId, offerId, itemName) {
    currentOfferAction = { action: action, listingId: listingId, offerId: offerId };
    document.getElementById('ajanlat-modal-item-name').textContent = itemName;
    
    var kincsekContainer = document.getElementById('ajanlat-kincsek-lista');
    kincsekContainer.innerHTML = '';
    
    if (userTradableItemsCache && userTradableItemsCache.kincsek) {
        userTradableItemsCache.kincsek.forEach(function(kincs) {
            // String összefűzés
            kincsekContainer.innerHTML += '<label><input type="checkbox" class="kincs-checkbox" value="' + kincs.identifier + '"> ' + kincs.name + '</label><br>';
        });
    }
    document.getElementById('ajanlat-modal').style.display = 'flex';
}

function setupOfferModalListeners() {
    var submitBtn = document.getElementById('ajanlat-submit-btn');
    if(submitBtn) {
        submitBtn.onclick = function() {
            var pinCode = document.getElementById('ajanlat-pin').value;
            var offeredItems = {
                kredit: parseInt(document.getElementById('ajanlat-kredit').value, 10) || 0,
                kincsek: Array.from(document.querySelectorAll('.kincs-checkbox:checked')).map(function(cb) { return cb.value; })
            };
            document.getElementById('loading-overlay').style.display = 'flex';
            var func = (currentOfferAction.action === 'make') ? 'makeOffer' : 'addToOffer';
            // listingId vagy offerId attól függően mi az action, email nélkül
            var params = (currentOfferAction.action === 'make') ? [currentOfferAction.listingId, offeredItems, pinCode] : [currentOfferAction.offerId, offeredItems, pinCode];
            
            callBackend(func, params, handleServerResponse);
        };
    }
}

function setupSellModalListeners() {
      // --- SZÜKSÉGES ELEMEK ---
      var fixedPriceContainer = document.getElementById('fixed-price-container');
      var buyNowPriceContainer = document.getElementById('buy-now-price-container');
      var priceTypeRadios = document.querySelectorAll('input[name="priceType"]');
      var submitBtn = document.getElementById('hirdetes-submit-btn');

      if (!fixedPriceContainer || !buyNowPriceContainer || !priceTypeRadios || !submitBtn) return;

      // --- RÁDIÓGOMBOK ESEMÉNYKEZELŐJE ---
      for (var i = 0; i < priceTypeRadios.length; i++) {
        priceTypeRadios[i].onchange = function() {
            var isFixedSelected = (this.value === 'fixed');
            fixedPriceContainer.style.display = isFixedSelected ? 'block' : 'none';
            buyNowPriceContainer.style.display = isFixedSelected ? 'none' : 'block';
        };
      }

      // --- SUBMIT GOMB ---
      submitBtn.onclick = function() {
        var isFixedPrice = document.querySelector('input[name="priceType"]:checked').value === 'fixed';
        var priceInput = document.getElementById('hirdetes-ar');
        var buyNowInput = document.getElementById('hirdetes-buy-now-ar');
        var pinCode = document.getElementById('hirdetes-pin').value;

        var priceValue = null;
        var buyNowValue = null;

        if (!pinCode) { if(typeof uiAlert === 'function') uiAlert("PIN kód megadása kötelező!"); return; }

        if (isFixedPrice) {
            priceValue = priceInput.value;
            if (!priceValue || parseFloat(priceValue) <= 0) {
                if(typeof uiAlert === 'function') uiAlert("Fix ár esetén érvényes, pozitív árat kell megadni!");
                return;
            }
            buyNowValue = null;
        } else {
            priceValue = null;
            buyNowValue = buyNowInput ? buyNowInput.value.trim() : '';
            if (buyNowValue !== '' && (isNaN(parseFloat(buyNowValue)) || parseFloat(buyNowValue) <= 0)) {
                if(typeof uiAlert === 'function') uiAlert("Ha megadsz azonnali vétel árat, annak érvényes számnak kell lennie!");
                return;
            }
            if (buyNowValue === '') buyNowValue = null;
        }

        document.getElementById('loading-overlay').style.display = 'flex';
        
        // callBackend, email nélkül
        callBackend('listItemForSale', [currentItemToSell.identifier, currentItemToSell.type, isFixedPrice, priceValue, pinCode, buyNowValue], 
            handleServerResponse,
            function(err) {
               document.getElementById('loading-overlay').style.display = 'none';
               if(typeof uiAlert === 'function') uiAlert("Hiba a meghirdetéskor: " + err.message);
               var pinInput = document.getElementById('hirdetes-pin');
               if(pinInput) pinInput.value = '';
            }
        );
      };
}

// Közös válaszkezelő függvény
function handleServerResponse(response) {
    document.getElementById('loading-overlay').style.display = 'none';
    
    // Modalok bezárása, ha vannak
    var hModal = document.getElementById('hirdetes-modal');
    if(hModal) hModal.style.display = 'none';
    var aModal = document.getElementById('ajanlat-modal');
    if(aModal) aModal.style.display = 'none';

    // Reset mezők
    var idsToReset = ['hirdetes-pin', 'hirdetes-ar', 'ajanlat-pin', 'ajanlat-kredit', 'hirdetes-buy-now-ar'];
    idsToReset.forEach(function(id) {
        var el = document.getElementById(id);
        if(el) el.value = '';
    });

    if(typeof uiAlert === 'function') uiAlert(response.message || response.error);
    
    if (response.success) {
        userTradableItemsCache = null;
        loadPage('piac_oldal');
    }
}

// =========================================
// === HAJÓMŰHELY FUNKCIÓK (JAVÍTOTT)    ===
// =========================================

var shipyardData = null; 
var userCredits = 0; // Helyi változó a pontos számításhoz

// Inicializálás
function initShipyard() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    callBackend('getShipyardData', [], 
        function(data) {
            // SIKER ÁG
            shipyardData = data;
            
            if (typeof playerCredit !== 'undefined') {
                userCredits = Number(playerCredit); 
            }
            
            renderRepairList();
            renderMarketList();
            updateBuildOptions();
            
            if (overlay) overlay.style.display = 'none';
        },
        function(err) {
            // HIBA ÁG
            if (overlay) overlay.style.display = 'none';
            uiAlert("Hiba a műhely betöltésekor: " + err.message);
        }
    );
}

function showWorkshopTab(tabName) {
    var tabs = document.querySelectorAll('.workshop-tab');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    var activeTab = document.getElementById('tab-' + tabName);
    if (activeTab) activeTab.style.display = 'block';
}

function renderRepairList() {
    var container = document.getElementById('repair-list');
    if (!container) return;
    container.innerHTML = '';
    
    if (!shipyardData.playerShips || shipyardData.playerShips.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px;">Nincs saját hajód.</p>';
        return;
    }

    shipyardData.playerShips.forEach(function(ship) {
        var div = document.createElement('div');
        div.className = 'work-card'; 
        div.style.borderLeftColor = 'var(--color-secondary)'; 

        var html = '<h4>' + ship.name + ' (' + ship.type + ')</h4>' +
            '<div style="display:flex; justify-content:space-between; margin-bottom:10px;">' +
                '<span>Állapot:</span>' +
                '<span style="font-weight:bold; color:var(--color-accent);">' + ship.hp + ' HP</span>' +
            '</div>' +
            '<div class="action-row" style="background:#f9f9f9; padding:10px; border-radius:5px;">' +
                '<input type="number" min="1" placeholder="+HP" class="hp-input" id="repair-input-' + ship.id + '" style="width:70px; margin-bottom:0;">' +
                '<button class="btn btn-sm" onclick="confirmRepair(\'' + ship.id + '\')">Javítás</button>' +
            '</div>' +
            '<div id="repair-cost-' + ship.id + '" style="font-size: 0.9em; color: #666; margin-top:5px; text-align:right; font-style:italic;">Költség: 0 Kr</div>';
        
        div.innerHTML = html;
        container.appendChild(div);
        
        var input = div.querySelector('#repair-input-' + ship.id);
        if (input) {
            input.addEventListener('input', function() {
                var val = this.value; 
                var amount = parseInt(val) || 0;
                var total = amount * 100;
                
                // JAVÍTVA: A szinkronizált userCredits változót használjuk
                var currentMoney = userCredits;
                
                var display = document.getElementById('repair-cost-' + ship.id);
                if (display) {
                    display.innerText = 'Költség: ' + total + ' Kredit';
                    
                    // JAVÍTVA: Csak akkor írjuk ki a hibát, ha TÉNYLEG nincs elég pénz
                    if (total > currentMoney) {
                        display.style.color = 'red';
                        display.innerText += ' (Nincs fedezet!)';
                    } else {
                        display.style.color = '#666';
                        // Ha van fedezet, nem írunk ki semmit, csak az árat (a szín visszaállítása elég)
                    }
                }
            });
        }
    });
}

function confirmRepair(shipId) {
    var inputEl = document.getElementById('repair-input-' + shipId);
    if (!inputEl) return;
    
    var amount = parseInt(inputEl.value);
    if (!amount || amount <= 0) { 
        if(typeof uiAlert === 'function') uiAlert("Adj meg egy érvényes számot!"); 
        return; 
    }
    
    var cost = amount * 100;
    
    // Feltételezzük, hogy a requestPin létezik
    requestPin(function(pin) {
        var overlay = document.getElementById('loading-overlay');
        if(overlay) overlay.style.display = 'flex';
        
        var ship = null;
        // Biztonsági ellenőrzés, hogy létezik-e a globális adat
        if (typeof shipyardData !== 'undefined' && shipyardData.playerShips) {
            for (var i = 0; i < shipyardData.playerShips.length; i++) {
                if (shipyardData.playerShips[i].id === shipId) { ship = shipyardData.playerShips[i]; break; }
            }
        }
        
        if (!ship) {
            if(overlay) overlay.style.display = 'none';
            console.error("Hiba: A hajó nem található a helyi adatokban.");
            return;
        }
        
        // --- JAVÍTOTT RÉSZ: callBackend ---
        // NEM küldjük a currentUserEmail-t!
        // Paraméterek sorrendje: transactionType, dataObject, pin
        callBackend('processShipyardTransaction', ['repair', {
            sheetName: ship.category, 
            rowIndex: ship.rowIndex, 
            hpToAdd: amount, 
            id: ship.id
        }, pin], 
        function(res) {
            if(overlay) overlay.style.display = 'none';
            
            if (res.success) {
                if(typeof uiAlert === 'function') uiAlert(res.message);
                
                // Kredit frissítése
                if(res.newBalance !== undefined && typeof updateLocalCredit === 'function') {
                    updateLocalCredit(res.newBalance);
                } else {
                    updateCreditDisplay(); // Fallback
                }
                
                // Újratöltjük a műhelyt
                if(typeof initShipyard === 'function') initShipyard(); 
            } else {
                if(typeof uiAlert === 'function') uiAlert("Hiba: " + res.error);
            }
        },
        function(err) {
            if(overlay) overlay.style.display = 'none';
            if(typeof uiAlert === 'function') uiAlert("Szerverhiba: " + err.message);
        });
        
    }, 'A javítás ára: ' + cost + ' Kredit.<br>Add meg a PIN kódod!');
}

function renderMarketList() {
    var sellContainer = document.getElementById('market-sell-list');
    if (sellContainer) {
        sellContainer.innerHTML = '';
        var ownShipsFound = false;
        if (shipyardData && shipyardData.playerShips) {
            shipyardData.playerShips.forEach(function(ship) {
                if (!ship.canSell) return; 
                ownShipsFound = true;
                var price = ship.hp * 100;
                var div = document.createElement('div');
                div.className = 'work-card';
                div.style.borderLeftColor = '#2e8b57'; 
                div.innerHTML = '<h4>' + ship.name + '</h4>' +
                    '<p style="margin:5px 0; font-size:0.9em;">' + ship.type + ' | HP: <b>' + ship.hp + '</b></p>' +
                    '<button class="btn btn-sm" style="background:#c82333; width:100%;" onclick="confirmSell(\'' + ship.id + '\', ' + price + ')">Eladás: ' + price + ' Kr</button>';
                sellContainer.appendChild(div);
            });
        }
        if (!ownShipsFound) sellContainer.innerHTML = '<p style="font-style:italic; color:#999;">Nincs eladható hajód.</p>';
    }

    var buyContainer = document.getElementById('market-buy-list');
    if (buyContainer) {
        buyContainer.innerHTML = '';
        if (!shipyardData || !shipyardData.shopShips || shipyardData.shopShips.length === 0) {
            buyContainer.innerHTML = '<p style="font-style:italic; color:#999;">A műhely raktára jelenleg üres.</p>';
        } else {
            shipyardData.shopShips.forEach(function(sShip) {
                var sPrice = sShip.hp * 110;
                var sDiv = document.createElement('div');
                sDiv.className = 'work-card';
                sDiv.style.borderLeftColor = '#8b4513';
                sDiv.innerHTML = '<h4>' + sShip.name + '</h4>' +
                    '<p style="margin:5px 0; font-size:0.9em;">' + sShip.type + ' | HP: <b>' + sShip.hp + '</b></p>' +
                    '<button class="btn btn-sm" style="background:var(--color-primary); width:100%;" onclick="confirmBuy(\'' + sShip.id + '\', ' + sPrice + ')">Megvétel: ' + sPrice + ' Kr</button>';
                buyContainer.appendChild(sDiv);
            });
        }
    }
}

function confirmSell(shipId, price) {
    requestPin(function(pin) {
        var ship = null;
        for(var i=0; i<shipyardData.playerShips.length; i++) {
             if(shipyardData.playerShips[i].id === shipId) { ship = shipyardData.playerShips[i]; break; }
        }
        if(ship) sendTransaction('sell_to_shop', { sheetName: ship.category, rowIndex: ship.rowIndex, hp: ship.hp, id: ship.id }, pin);
    }, 'Biztosan eladod a hajódat ' + price + ' kreditért?');
}

function confirmBuy(shipId, price) {
    requestPin(function(pin) {
        var ship = null;
        for(var i=0; i<shipyardData.shopShips.length; i++) {
             if(shipyardData.shopShips[i].id === shipId) { ship = shipyardData.shopShips[i]; break; }
        }
        if(ship) sendTransaction('buy_from_shop', { sheetName: ship.category, rowIndex: ship.rowIndex, hp: ship.hp, id: ship.id }, pin);
    }, 'A hajó ára: ' + price + ' Kredit.<br>Vásárlás megerősítése:');
}

function updateBuildOptions() {
    var catEl = document.getElementById('build-category');
    var select = document.getElementById('build-type');
    if (!catEl || !select) return;
    
    var cat = catEl.value;
    select.innerHTML = '';
    
    var typesToShow = [];
    if (cat === 'hajok') typesToShow = ['Dingi', 'Daysailer', 'Sloop', 'Ketch', 'Yawl', 'Cutter', 'Katamarán', 'Schooner', 'Brigantin', 'Bark / Barque', 'Tall ship'];
    if (cat === 'buvarhajok') typesToShow = ['Mini búvárhajó', 'Könnyű búvárhajó', 'Delejes búvárhajó', 'Vadász búvárhajó', 'Nehéz hordozó búvárhajó', 'Szupernehéz búvárhajó'];
    if (cat === 'leghajok') typesToShow = ['Mini léghajó (blimp)', 'Könnyű nem merev léghajó', 'Félmerev léghajó', 'Merev léghajó (Zeppelin-típus)', 'Szuperléghajó'];

    for (var k = 0; k < typesToShow.length; k++) {
        var opt = document.createElement('option');
        opt.value = typesToShow[k];
        opt.innerText = typesToShow[k];
        select.appendChild(opt);
    }
    calculateBuildCost();
}

function calculateBuildCost() {
    var typeEl = document.getElementById('build-type');
    if (!typeEl) return;
    var type = typeEl.value;
    if (!shipyardData || !shipyardData.baseStats) return;
    var hp = shipyardData.baseStats[type] || 0;
    var cost = hp * 150;
    
    var prevHp = document.getElementById('preview-hp');
    var prevCost = document.getElementById('preview-cost');
    if(prevHp) prevHp.innerText = hp;
    if(prevCost) prevCost.innerText = cost;
}

function initiateBuild() {
    var type = document.getElementById('build-type').value;
    var name = document.getElementById('build-name').value;
    var category = document.getElementById('build-category').value;
    if (!shipyardData || !shipyardData.baseStats) return;
    var hp = shipyardData.baseStats[type];
    var cost = hp * 150;

    if (!name) { uiAlert("Adj nevet az új hajódnak!"); return; }

    requestPin(function(pin) {
        // JAVÍTVA: Callback függvényt adunk át, ami átvált a Repair fülre
        sendTransaction('build_new', { type: type, name: name, category: category, baseHp: hp }, pin, function() {
             showWorkshopTab('repair'); // Sikeres építés után a "Saját hajók" listára ugrunk
        });
    }, 'Új ' + type + ' építése.<br>Költség: ' + cost + ' Kredit.');
}

// JAVÍTVA: A sendTransaction most már elfogad egy 4. (opcionális) callback paramétert
function sendTransaction(action, data, pin, onSuccess) {
    var overlay = document.getElementById('loading-overlay');
    if(overlay) overlay.style.display = 'flex';
    
    callBackend('processShipyardTransaction', [action, data, pin], 
        function(res) {
            // SIKER ÁG
            if(overlay) overlay.style.display = 'none';
            
            if (res.success) {
                uiAlert(res.message);
                if(res.newBalance !== undefined) updateLocalCredit(res.newBalance);
                
                // Újratöltjük az adatokat, hogy lássuk a változást
                initShipyard(); 
                
                // Ha volt extra teendő (pl. fül váltás építés után)
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess();
                }
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(err) {
            // HIBA ÁG
            if(overlay) overlay.style.display = 'none';
            uiAlert("Szerverhiba a tranzakciónál: " + err.message);
        }
    );
}

function updateLocalCredit(amount) {
    // Frissítjük a globális és helyi változót is
    amount = Number(amount);
    userCredits = amount;
    if (typeof playerCredit !== 'undefined') playerCredit = amount;
    
    // Frissítjük a fő fejlécet
    var headerCredit = document.getElementById('creditCell');
    if (headerCredit) {
        if (amount < 0) {
            headerCredit.innerHTML = '<span style="color:red; font-weight:bold;"><i class="fas fa-exclamation-circle"></i> Tartozás: ' + Math.abs(amount) + '</span>';
        } else {
            headerCredit.innerHTML = '<i class="fas fa-coins"></i> ' + amount;
        }
    }
}

/* ================================================= */
/* === KÖNYVSZENTÉLY (ROUTERESÍTVE) START === */
/* ================================================= */

// Globális változók (var használata)
var selectedCopy = null;
var searchBtn = null; 
var upgradeBtn = null; 
var searchTypeSelect = null; 

/**
 * A konyvszentely_oldal.html logikája (Inicializálás)
 */
function initializeKonyvszentely() {
    // Ellenőrzés
    // (A Router már tudja az emailt, de a UI miatt maradhat a kliens oldali check)
    // if (typeof currentUserEmail === 'undefined' || !currentUserEmail) ... 
    
    // Elemek keresése
    searchBtn = document.getElementById('ksz-search-btn');
    upgradeBtn = document.getElementById('ksz-upgrade-btn');
    searchTypeSelect = document.getElementById('ksz-search-type');
    
    // Ha valami hiányzik, kilépünk
    if (!searchBtn || !searchTypeSelect || !upgradeBtn) { 
        console.error("Könyvszentély elemek nem találhatóak!");
        return; 
    }
    
    // Eseménykezelők
    searchBtn.onclick = searchCopies;
    searchTypeSelect.onchange = toggleSearchTerm;
    upgradeBtn.onclick = processUpgrade;
    
    // 1. Vagyon betöltése és eladás gomb
    loadWalletStats(); 

    // 2. Indító keresés
    searchCopies(); 
}

/**
 * Vagyon lekérdezése (Kristály, Tálentum)
 */
function loadWalletStats() {
    // ÚJ HÍVÁS (callBackend)
    callBackend('getKonyvszentelyStats', [], 
        function(data) {
            var crystalEl = document.getElementById('ksz-crystal-count');
            var talentEl = document.getElementById('ksz-talent-count');
            
            if (crystalEl) crystalEl.textContent = data.letkristaly;
            if (talentEl) talentEl.textContent = data.talentum;
            
            // Gomb megjelenítése
            renderSellButton();
        },
        function(err) {
            console.error("Vagyon hiba:", err);
        }
    );
}

/**
 * Letkristály eladás gomb
 */
function renderSellButton() {
    var sellContainer = document.getElementById('ksz-sell-container');
    
    if (sellContainer && !document.getElementById('sell-crystal-btn')) {
        var sellBtn = document.createElement('button');
        sellBtn.id = 'sell-crystal-btn';
        sellBtn.className = 'btn';
        sellBtn.style.backgroundColor = '#8e44ad';
        sellBtn.style.width = '100%';
        sellBtn.style.marginTop = '10px';
        
        sellBtn.innerHTML = '<i class="fas fa-gem"></i> Letkristály Eladása (1db &rarr; 1 Tálentum)';
        
        sellBtn.onclick = function() {
            var msg = 'Biztosan eladsz <b>1 db Letkristályt</b> a Papnőnek?<br><br>' +
                      'Kapcsolatba lépsz a szférákkal, és <b>1 Tálentumot</b> kapsz cserébe.';
            
            uiConfirm(msg, "Áldozat a Papnőnek", function() {
                
                // PIN modul ellenőrzése
                if (typeof requestPin === 'function') {
                    
                    requestPin(function(pinCode) {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        
                        // ÚJ HÍVÁS (callBackend)
                        callBackend('sellLetkristalyToPapno', [pinCode], 
                            function(res) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                
                                var title = res.success ? "Áldozat elfogadva" : "Sikertelen áldozat";
                                uiAlert(res.message || res.error, title);
                                
                                if (res.success) {
                                    // UI frissítés
                                    var cEl = document.getElementById('ksz-crystal-count');
                                    var tEl = document.getElementById('ksz-talent-count');
                                    if(cEl) cEl.textContent = res.newCrystal;
                                    if(tEl) tEl.textContent = res.newTalent;
                                }
                            },
                            function(err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert("Hiba történt: " + err.message, "Rendszerhiba");
                            }
                        );
                        
                    }, "Tranzakcio Megerositese");
                    
                } else {
                    uiAlert("Hiba: A PIN bekérő modul nem elérhető.", "Rendszerhiba");
                }
            });
        };
        sellContainer.appendChild(sellBtn);
    }
}

function toggleSearchTerm() {
    var searchType = searchTypeSelect.value;
    var searchTermInput = document.getElementById('ksz-search-term');
    if (searchTermInput) {
        searchTermInput.disabled = (searchType === 'all');
        if (searchType === 'all') searchTermInput.value = '';
    }
}

function searchCopies() {
    setLoadingState(true, 'search');
    var searchTermInput = document.getElementById('ksz-search-term');
    var searchTerm = searchTermInput ? searchTermInput.value : '';
    var searchType = searchTypeSelect ? searchTypeSelect.value : 'all';
    
    // ÚJ HÍVÁS (callBackend)
    callBackend('getUserCopies', [searchTerm, searchType], 
        function(copies) {
            displayResults(copies);
        },
        function(err){
             setLoadingState(false, 'search');
             var list = document.getElementById('ksz-results-list');
             if (list) list.innerHTML = '<p style="color:red; text-align:center;">Hiba a keresésben: ' + err.message + '</p>';
        }
    );
}

function displayResults(copies) {
    var list = document.getElementById('ksz-results-list');
    list.innerHTML = '';
    
    if (copies && copies.length > 0) {
        for (var i = 0; i < copies.length; i++) {
            (function(copy) {
                var item = document.createElement('div');
                item.className = 'item-entry';
                item.style.cursor = 'pointer';
                item.style.borderBottom = '1px solid #eee';
                item.style.padding = '10px';
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.alignItems = 'center';
                
                item.innerHTML = 
                    '<div class="item-details">' +
                        '<div class="item-title" style="font-weight:bold;">' + copy.title + '</div>' +
                        '<small class="item-author" style="color:#666;">' + copy.author + ' (Kod: ' + copy.code + ')</small>' +
                    '</div>' +
                    '<div style="font-size: 1.2em;">👉</div>';
                
                item.onclick = function() { selectCopy(item, copy); };
                list.appendChild(item);
            })(copies[i]);
        }
    } else {
        list.innerHTML = '<p style="padding: 10px; color: #718096; text-align:center;">Nincsenek a keresesnek megfelelo tekercseid.</p>';
    }
    setLoadingState(false, 'search');
}

function selectCopy(element, copy) {
    var allItems = document.querySelectorAll('#ksz-results-list .item-entry');
    for (var i = 0; i < allItems.length; i++) {
        allItems[i].style.backgroundColor = 'transparent';
        allItems[i].style.border = 'none';
        allItems[i].style.borderBottom = '1px solid #eee';
    }
    
    element.style.backgroundColor = '#e6fffa';
    element.style.border = '2px solid var(--color-accent)';
    
    selectedCopy = copy;
    
    var detailsHTML = '<p><strong>Cim:</strong> ' + copy.title + '</p>' +
                      '<p><strong>Szerzo:</strong> ' + copy.author + '</p>' +
                      '<p><strong>Kod:</strong> ' + copy.code + '</p>' +
                      '<p><strong>Ertek:</strong> ' + copy.value + ' Talentum</p>';
                      
    document.getElementById('ksz-selection-details').innerHTML = detailsHTML;
    document.getElementById('ksz-action-section').style.display = 'block';
}

function processUpgrade() {
    if (!selectedCopy) { uiAlert('Valassz ki egy tekercset a listabol!', 'Hianyzo adat'); return; }
    
    var pinCodeInput = document.getElementById('ksz-pin-code');
    var pinCode = pinCodeInput.value;
    var giftEmailInput = document.getElementById('ksz-gift-email');
    var giftEmail = giftEmailInput ? giftEmailInput.value : '';
    
    if (!pinCode) { 
        uiAlert('Kérlek, add meg a PIN kódodat a folytatáshoz!', 'Hiányzó PIN'); 
        pinCodeInput.focus(); 
        return; 
    }
    
    var confirmMsg = 'Biztosan könyvvé alakítod a(z) "<b>' + selectedCopy.title + '</b>" tekercset?<br><br>';
    if (giftEmail) {
        confirmMsg += '<b>Ajándékozott:</b> ' + giftEmail + '<br>';
    }
    confirmMsg += 'Ez a művelet végleges.';

    uiConfirm(confirmMsg, "Könyvszentelés", function() {
        setLoadingState(true, 'upgrade');
        
        var data = { 
            productCode: selectedCopy.code, 
            // currentUserEmail NEM KELL, a Router intézi!
            giftToEmail: giftEmail, 
            pinCode: pinCode 
        };
        
        // ÚJ HÍVÁS (callBackend)
        callBackend('initiateUpgradeProcess', [data], 
            function(result) {
                handleProcessResult(result);
            },
            function(err) {
                setLoadingState(false, 'upgrade');
                uiAlert("Hiba: " + err.message);
            }
        );
    });
}

function handleProcessResult(result) {
    var title = result.success ? "Siker" : "Hiba";
    uiAlert(result.message, title);
    
    setLoadingState(false, 'upgrade');
    
    if (result.success) {
        document.getElementById('ksz-action-section').style.display = 'none';
        selectedCopy = null;
        searchCopies(); 
        
        if (typeof updateCreditDisplay === 'function') {
            updateCreditDisplay();
        }
        loadWalletStats(); 
    } else {
        document.getElementById('ksz-pin-code').value = '';
    }
}

function setLoadingState(isLoading, type) {
    if(searchBtn) searchBtn.disabled = isLoading;
    if(upgradeBtn) upgradeBtn.disabled = isLoading;
    
    if (isLoading && type === 'search') {
        var list = document.getElementById('ksz-results-list');
        if(list) list.innerHTML = '<p style="padding: 10px; color: #718096; text-align:center;">Kereses...</p>';
    }
    
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = isLoading ? 'flex' : 'none';
}

// ===============================
// === FELHŐKOLOSTOR FUNKCIÓK (JAVÍTOTT - ES5 BIZTOS) ===
// ===============================

// Globális callback a PIN modalhoz
var pinCallback = null;

function requestPin(callback, customMessage) {
    pinCallback = callback;
    var modal = document.getElementById('monk-pin-modal');
    var input = document.getElementById('monk-pin-input');
    var messageP = modal ? modal.querySelector('p') : null;
    
    // Üzenet beállítása
    if (messageP) {
        messageP.innerHTML = customMessage || "A művelet díja 10 Tálentum.<br>Kérlek, add meg a PIN kódodat a folytatáshoz!";
    }

    // Mező ürítése és modal nyitása
    if (input) input.value = '';
    if (modal) {
        modal.style.display = 'flex';
        if (input) input.focus();
    } else {
        // Biztonsági tartalék
        var p = prompt((customMessage || "Add meg a PIN kódodat:").replace(/<br>/g, '\n'));
        if (p) callback(p);
    }
}

function finalizeMonkUpload() { 
    var input = document.getElementById('monk-pin-input');
    var pin = input ? input.value : null;
    if (!pin) { uiAlert("A PIN kód megadása kötelező!"); return; }
    
    document.getElementById('monk-pin-modal').style.display = 'none';
    if (pinCallback) pinCallback(pin);
    pinCallback = null; // Reset
}

function closeMonkPinModal() {
    document.getElementById('monk-pin-modal').style.display = 'none';
    pinCallback = null;
}

// Fülváltó logika
function openMonasteryTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    document.getElementById(tabName).style.display = "block";
    setTimeout(function() { document.getElementById(tabName).classList.add("active"); }, 10);
    if (evt) {
        evt.currentTarget.className += " active";
    }
    
    // Adatok betöltése
    if(tabName === 'Munkapad') refreshMonasteryWork(); 
    if(tabName === 'Forum') loadForumPosts();
    if(tabName === 'Suttogo') loadChatPartners();
}

// --- MUNKAPAD FUNKCIÓK ---

function toggleUploadType() {
    var type = document.querySelector('input[name="uploadType"]:checked').value;
    var titleInput = document.getElementById('monk-upload-title');
    var fileLabel = document.getElementById('upload-file-label');
    var desc = document.getElementById('upload-description');
    var coverContainer = document.getElementById('cover-upload-container');

    if (type === 'work') {
        titleInput.placeholder = "A mű címe";
        fileLabel.textContent = "Kézirat fájl:";
        desc.innerHTML = "Támogatott formátumok: <b>.docx, .doc</b> (konverzió), <b>.epub</b> (csatolmány).";
        if (coverContainer) coverContainer.style.display = 'block'; 
    } else {
        titleInput.placeholder = "Jelentkezés tárgya (pl. Korrektor jelentkezés)";
        fileLabel.textContent = "Referenciaanyag / Önéletrajz:";
        desc.innerHTML = "Töltsd fel a referenciáidat vagy a próbamunkádat egy dokumentumban (.docx, .pdf).";
        if (coverContainer) coverContainer.style.display = 'none'; 
    }
}

async function submitMonasteryWork() {
    var title = document.getElementById('monk-upload-title').value;
    var fileInput = document.getElementById('monk-upload-file');
    var coverInput = document.getElementById('monk-upload-cover');
    // Itt a biztonság kedvéért sima 'var' és nincs backtick a selectorban
    var submissionType = document.querySelector('input[name="uploadType"]:checked').value;
    
    var manuscriptFile = fileInput.files[0];
    var coverFile = (coverInput && coverInput.files.length > 0) ? coverInput.files[0] : null;

    if (!title) { uiAlert("Kérlek, add meg a címet!"); return; }
    if (!manuscriptFile) { uiAlert("Kérlek, válassz ki egy kéziratot!"); return; }
    
    // Itt az async function marad callbackként!
    requestPin(async function(pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';

        // Belső segédfüggvény Promise-al (ez kell az await-hez)
        var readFileToBase64 = function(file) {
            return new Promise(function(resolve, reject) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    // Backtick helyett sima string split
                    resolve({
                        base64: e.target.result.split(',')[1],
                        mimeType: file.type,
                        filename: file.name
                    });
                };
                reader.onerror = function(e) { reject("Fájlhiba: " + file.name); };
                reader.readAsDataURL(file);
            });
        };

        try {
            // Itt használjuk az AWAIT-et, ahogy kérted!
            var manuscriptData = await readFileToBase64(manuscriptFile);
            var coverData = null;
            
            if (coverFile) {
                coverData = await readFileToBase64(coverFile);
            }

            var payload = {
                title: title,
                type: submissionType,
                manuscript: manuscriptData,
                cover: coverData
            };

            // callBackend hívás
            callBackend('uploadWorkToMonastery', [payload, pinCode], 
                function(res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (res.success) {
                        uiAlert(res.message);
                        document.getElementById('monk-upload-title').value = '';
                        fileInput.value = '';
                        if(coverInput) coverInput.value = '';
                        refreshMonasteryWork();
                        updateCreditDisplay();
                    } else {
                        // Sima string összefűzés
                        uiAlert("Hiba a feltöltéskor: " + res.error);
                    }
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert("Szerverhiba: " + err.message);
                }
            );

        } catch (err) {
            // Catch ág: ez dobta a hibát, ha előtte nem volt lezárva valami. 
            // Most ellenőriztem, a fenti blokkban minden zárójel a helyén van.
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Hiba a fájlok előkészítésekor: " + err);
        }
    });
}

function refreshMonasteryWork() {
    var container = document.getElementById('monastery-work-list');
    container.innerHTML = '<p><i>Munkák betöltése...</i></p>';
    
    callBackend('getMonasteryWorks', [], 
        function(res) {
            if (!res.success) { container.innerHTML = '<p style="color:red;">Hiba: ' + res.error + '</p>'; return; }
            if (res.works.length === 0) { container.innerHTML = '<p>Jelenleg nincs aktív munka.</p>'; return; }
            
            var html = '';
            var isPapatUser = res.works.some(function(w) { return w.isPapat; }); 
            if (isPapatUser) {
                var adminBtn = document.getElementById('open-personnel-btn');
                if (adminBtn) adminBtn.style.display = 'block';
            }

            res.works.forEach(function(work) {
                var topControls = '';
                
                // --- 1. PAPÁT JOGKÖRÖK ---
                if (work.isPapat) {
                    var isApplication = work.checklist && work.checklist.hasOwnProperty('referencia');

                    if (work.status === 'Elbírálás alatt') {
                        if (isApplication) {
                             topControls = 
                            '<div style="margin:5px 0; background:#f0f8ff; padding:10px; border:1px solid blue; border-radius:5px;">' +
                                '<strong>Ministráns Felvétele</strong><br>' +
                                '<label><input type="checkbox" class="role-select" value="editor"> Editor</label> ' +
                                '<label><input type="checkbox" class="role-select" value="szkriptor"> Szkriptor</label> ' +
                                '<label><input type="checkbox" class="role-select" value="piktor"> Piktor</label> ' +
                                '<label><input type="checkbox" class="role-select" value="inspektor"> Inspektor</label>' +
                                '<br>' +
                                '<button class="btn btn-sm" style="margin-top:5px; background-color:#28a745;" onclick="hireMinistrans(\'' + work.id + '\', \'' + work.author + '\')">Felvétel (10 T)</button> ' +
                                '<button class="btn btn-sm btn-danger" style="margin-top:5px;" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">Elutasít (5 T)</button>' +
                            '</div>';
                        } else {
                            topControls = '<div style="margin:5px 0;">' + 
                                          '<button class="btn btn-sm" style="background-color:#28a745;" onclick="doWorkAction(\'' + work.id + '\', \'approve_submission\')">Elfogad (5 T)</button> ' + 
                                          '<button class="btn btn-sm btn-danger" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">Elutasít (5 T)</button>' + 
                                          '</div>';
                        }
                    } else if (work.status === 'Folyamatban' || work.status === 'Ellenőrzés alatt') {
                         topControls = '<div style="margin:5px 0;"><button class="btn btn-sm" onclick="doWorkAction(\'' + work.id + '\', \'send_for_approval\')">Ellenőrzés Kész -> Szerzőnek</button></div>';
                    }
                }
                
                // --- 2. SZERZŐ / PAPÁT PUBLIKÁLÁS ---
                if ((work.isMyWork || (work.isPapat && work.hasDebt)) && work.status === 'Véglegesítésre vár') {
                    
                    var safeTitleForOnclick = work.title.replace(/'/g, "\\'");
                    var btnId = 'pub-btn-' + work.id;
                    
                    if (work.isMyWork) {
                        if (work.hasDebt) {
                             topControls = '<div style="background:#fff3cd; padding:10px; text-align:center; border:1px solid orange; margin-top:10px; border-radius:5px;">' +
                                           '<h4 style="margin-top:0;">Függő Tartozás</h4>' +
                                           '<p style="margin-bottom:0;">A mű kiadásra kész, de még rendezetlen tétel (hitel) van rajta. A kiadást a Papát hagyhatja jóvá.</p>' +
                                           '</div>';
                        } else {
                            topControls = '<div style="background:#e6fffa; padding:10px; text-align:center; border:1px solid green; margin-top:10px; border-radius:5px;">' +
                                          '<h4 style="margin-top:0;">Végső Jóváhagyás</h4>' +
                                          '<p>Kattints a gombra a publikáláshoz!</p>' +
                                          '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitleForOnclick + '\', \'' + work.coverId + '\')">✨ MEHET A NYOMDÁBA!</button>' +
                                          '</div>';
                        }
                    }
                    
                    if (work.isPapat && work.hasDebt) {
                         topControls = '<div style="background:#ffeeba; padding:10px; text-align:center; border:1px solid orange; margin-top:10px; border-radius:5px;">' +
                                       '<h4 style="margin-top:0;">Jelzálog Érvényesítése</h4>' +
                                       '<p>A szerző hitellel tartozik, ezért Te döntesz a kiadásról.</p>' +
                                       '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitleForOnclick + '\', \'' + work.coverId + '\')">✨ MEHET A NYOMDÁBA (Papát feloldás)!</button>' +
                                       '</div>';
                    }
                }

                // KÁRTYA HTML
                html += '<div class="work-card">' +
                            '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;">' +
                                '<div>' +
                                    '<strong style="font-size:1.1em;">' + work.title + '</strong> ' + 
                                    '<span style="background:#eee; padding:2px 6px; border-radius:4px; font-size:0.8em;">' + work.status + '</span><br>' +
                                    '<small>Szerző: ' + work.author + '</small>' +
                                '</div>' +
                                '<button class="btn btn-sm btn-secondary" onclick="window.open(\'' + work.url + '\', \'_blank\')">GDoc</button>' +
                            '</div>' +
                            topControls +
                            '<div style="margin-top:10px;">' +
                                renderDetailedChecklist(work, res.availableMonks, currentUserEmail) +
                            '</div>' +
                        '</div>';
            });

            // --- 3. SZEMÉTHALOM ---
            if (res.isAntipat && res.trashItems && res.trashItems.length > 0) {
                html += '<div style="margin-top:40px; padding-top:20px; border-top:3px dashed #8b0000; text-align:center;">';
                html += '<h3 style="color:#8b0000;">☠️ Szeméthalom (Elutasított Művek)</h3>';
                html += '<p style="font-size:0.9em;">Itt találod a selejteket. Ha végeztél a "neveléssel", semmisítsd meg őket!</p>';
                
                res.trashItems.forEach(function(item) {
                    // --- BIZTONSÁGI JAVÍTÁS: Cím escaping ---
                    var safeTrashTitle = item.title.replace(/'/g, "\\'"); 
                    
                    html += '<div class="work-card" style="border-left-color:darkred; background-color:#fff5f5;">' +
                                '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                                    '<div><strong>' + item.title + '</strong> <small>(' + item.date + ')</small><br>' +
                                    '<small>Szerző: ' + item.authorEmail + '</small></div>' +
                                    '<div style="text-align:right;">' +
                                        '<button class="btn btn-sm btn-secondary" onclick="window.open(\'' + item.url + '\', \'_blank\')">Megnyitás</button> ' +
                                        // ITT HASZNÁLJUK A JAVÍTOTT CÍMET:
                                        '<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="purgeWork(\'' + item.workId + '\', \'' + safeTrashTitle + '\')">🔥 Megsemmisítés</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                });
                html += '</div>';
            }

            container.innerHTML = html;
        },
        function(err) {
            container.innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>';
        }
    );
}

function purgeWork(workId, title) {
    var message = '<b>VÉGLEGES TÖRLÉS!</b><br><br>Biztosan megsemmisíted a(z) "<b>' + title + '</b>" című művet?<br>Ez törli a fájlokat a Drive-ról és az adatokat a rendszerből.';

    uiConfirm(message, "Törlés Megerősítése", function() {
        document.getElementById('loading-overlay').style.display = 'flex';
        
        callBackend('purgeTrashItem', [workId], 
            function(res) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(res.message || res.error, res.success ? "Siker" : "Hiba");
                if (res.success) refreshMonasteryWork();
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Hiba: " + err.message, "Rendszerhiba");
            }
        );
    });
}

function openPublishWindow(btnId, workId, gdocId, workTitle, coverId) {
    var btnElement = document.getElementById(btnId);
    if (btnElement) {
        btnElement.style.display = 'none'; 
        if (btnElement.parentNode) {
            var msg = document.createElement('span');
            msg.id = 'pub-status-' + workId;
            msg.innerHTML = '⏳ <i>Publikálás folyamatban... (Várjuk a végét)</i>';
            msg.style.color = '#d9534f'; 
            msg.style.fontWeight = 'bold';
            btnElement.parentNode.appendChild(msg);
        }
    } 
    if (!gdocId || gdocId === 'undefined' || gdocId === 'null') {
        uiAlert("Hiba: Hiányzó GDoc ID! A publikálás nem indítható.");
        return;
    }

    var konyvFeltoltoUrl = 'https://script.google.com/macros/s/AKfycbzZZV2QQ4fOExg_dv0ddkWVEFgNTCXzYtFhWlOs1Kn5R3wUCHDXV7IpE3Kx3DNT53Npbw/exec'; 
    var params = new URLSearchParams();
    params.append('action', 'szenteles');
    params.append('gdocId', gdocId);
    params.append('logId', workId);
    params.append('userEmail', currentUserEmail); 
    
    if (workTitle && workTitle !== 'undefined') params.append('title', workTitle);
    if (coverId && coverId !== 'undefined' && coverId !== 'null' && coverId !== '') params.append('coverId', coverId);
    
    window.open(konyvFeltoltoUrl + '?' + params.toString(), '_blank');

    var attempts = 0;
    var maxAttempts = 60; 
    
    var poller = setInterval(function() {
        attempts++;
        if (attempts > maxAttempts) {
            clearInterval(poller);
            var statusMsg = document.getElementById('pub-status-' + workId);
            if (statusMsg) statusMsg.innerHTML = "⚠️ <i>Időtúllépés. Frissítsd a listát!</i>";
            return;
        }

        callBackend('checkWorkExists', [workId], 
            function(exists) {
                if (exists === false) {
                    clearInterval(poller);
                    var statusMsg = document.getElementById('pub-status-' + workId);
                    if (statusMsg) {
                        statusMsg.innerHTML = "✅ <i>Kész! Frissítés...</i>";
                        statusMsg.style.color = "green";
                    }
                    refreshMonasteryWork();
                }
            },
            function(err) { console.warn("Polling hiba: " + err.message); }
        );
    }, 5000);
}

function renderDetailedChecklist(work, allMonks, currentUser) {
    var html = '<table style="width:100%; font-size:0.9em; border-collapse:collapse;">';
    
    for (var key in work.checklist) {
        var task = work.checklist[key];
        var action = task.status;
        var userHasRole = work.userRoles && work.userRoles.some(function(r) { return r.includes(task.requiredRole); });
        var isOwnerOrPapat = work.isMyWork || work.isPapat;

        // Belső segédfüggvény (closure) a gombokhoz
        // Kiemelve változóba, hogy elkerüljük a függvény-definíciót a ciklusban
        var makeBtn = (function() {
             return function(txt, clr, func) {
                return '<button class="btn" style="background-color:' + clr + '; padding:4px 8px; font-size:0.8em; margin:2px;" onclick="' + func + '">' + txt + '</button>';
             };
        })();

        if (task.status === 'inaktív') {
            if (isOwnerOrPapat) action = makeBtn('Aktiválás', '#17a2b8', 'doWorkAction(\'' + work.id + '\', \'activate_task\', \'' + key + '\')');
            else action = '<span style="color:#999;">Inaktív</span>';
        }
        else if (work.status === 'Folyamatban' && (task.status === 'várakozó' || task.status === 'javítás alatt')) {
             if (isOwnerOrPapat) {
                 if (task.applicants.length > 0) {
                     var opts = '<option value="">Válassz...</option>';
                     task.applicants.forEach(function(email) {
                         var m = allMonks.find(function(monk) { return monk.email === email; });
                         opts += '<option value="' + email + '">' + (m ? m.fullName : email) + '</option>';
                     });
                     action = '<select style="padding:2px;" onchange="doWorkAction(\'' + work.id + '\', \'select_monk\', \'' + key + '\', this.value)">' + opts + '</select>';
                 } else {
                     action = '<span style="color:#d9534f;">Nincs jelentkező</span>';
                 }
                 if (userHasRole && !task.selectedMonk) {
                     action += '<br>' + makeBtn('Magamnak', '#333', 'doWorkAction(\'' + work.id + '\', \'select_monk\', \'' + key + '\', \'' + currentUser + '\')');
                 }
             } else if (userHasRole && !task.applicants.includes(currentUser)) {
                 action = makeBtn('Jelentkezem', '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'apply_task\', \'' + key + '\')');
             } else if (task.applicants.includes(currentUser)) {
                 action = '<span style="color:orange;">Jelentkezve</span>';
             }
        }
        else if (task.status === 'ellenőrzés alatt') {
             if (isOwnerOrPapat) {
                 action = makeBtn('Elfogad', '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'accept_task_work\', \'' + key + '\')') + 
                          makeBtn('Javítás', '#f0ad4e', 'doWorkAction(\'' + work.id + '\', \'request_revision\', \'' + key + '\')');
             } else {
                 action = '⏳ Ellenőrzés...';
             }
        }
        
        if (task.selectedMonk === currentUser && task.paymentStatus === 'none' && task.status !== 'inaktív') {
             action = '<input type="number" id="price-' + key + '" placeholder="T" style="width:50px; padding:2px;"> ' + 
                      makeBtn('Ok', '#2e8b57', 'offerPrice(\'' + work.id + '\', \'' + key + '\')');
        }

        if (isOwnerOrPapat && task.paymentStatus === 'pending_approval') {
            action = '<b>' + task.priceRequest + ' T</b><br>' +
                     makeBtn('Fizet', '#2e8b57', 'payDirect(\'' + work.id + '\', \'' + key + '\')') +
                     makeBtn('Hitel', '#f0ad4e', 'acceptCredit(\'' + work.id + '\', \'' + key + '\')');
        }

        if (task.paymentStatus === 'paid_direct' || task.paymentStatus === 'paid_out') action += ' <span title="Fizetve">💰</span>';
        if (task.paymentStatus === 'credit_agreed') action += ' <span title="Hitel">⚠️</span>';
        
        if (task.selectedMonk === currentUser && task.status !== 'elfogadva' && task.status !== 'ellenőrzés alatt' && task.status !== 'inaktív') {
             if (action.indexOf('button') === -1) action = ''; 
             action += makeBtn('Kész', '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'report_ready\', \'' + key + '\')') + 
                       makeBtn('X', '#c82333', 'resignTask(\'' + work.id + '\', \'' + key + '\')');
        }

        if (key === 'borito' && (isOwnerOrPapat || task.selectedMonk === currentUser)) {
            if (task.status === 'várakozó' || task.status === 'javítás alatt') {
                action = '<input type="file" id="cover-upload-' + work.id + '" accept="image/png" style="width:180px; font-size:0.8em;">' +
                         makeBtn('Feltölt', '#2e8b57', 'uploadCoverFromCard(\'' + work.id + '\', \'' + key + '\')');
            }
        }

        if (isOwnerOrPapat && task.selectedMonk && task.status !== 'elfogadva' && task.status !== 'ellenőrzés alatt') {
             if (action.indexOf('button') !== -1 || action.indexOf('select') !== -1) action += '<br>'; 
             action += makeBtn('Visszavétel (Büntetés)', '#d9534f', 'resignTask(\'' + work.id + '\', \'' + key + '\')');
        }

        var monkData = allMonks.find(function(m) { return m.email === task.selectedMonk; });
        var monkName = task.selectedMonk ? (monkData ? monkData.fullName : '<i>Ismeretlen</i>') : '-';

        html += '<tr style="border-bottom:1px solid #f0f0f0;">' +
                    '<td style="padding:8px;">' + task.label + '</td>' +
                    '<td style="padding:8px; color:#555;">' + monkName + '</td>' +
                    '<td style="padding:8px; text-align:right;">' + action + '</td>' +
                 '</tr>';
    }
    html += '</table>';
    return html;
}

function resignTask(workId, taskKey) {
    var message = "<b>FIGYELEM!</b> Ez a művelet visszavonja a feladatot.<br><br>&bull; Ha Monk vagy: <b>0 értékelést kapsz</b>!<br>&bull; Pénzügy: A letét visszajár a szerzőnek.<br><br>Biztosan folytatod?";
    uiConfirm(message, "Feladat Visszavonása", function() {
        doWorkAction(workId, 'resign_task', { taskKey: taskKey });
    });
}    

function doWorkAction(workId, action, param1, param2) {
    var extraData = param1; 
    if (action === 'select_monk') {
        extraData = { taskKey: param1, monkEmail: param2 };
    }

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('manageWorkStatus', [workId, action, extraData], 
        function(res) {
            if (loading) loading.style.display = 'none';
            var title = res.success ? "Siker" : "Értesítés";
            uiAlert(res.message || res.error, title);
            refreshMonasteryWork();
        },
        function(err) {
            if (loading) loading.style.display = 'none';
            uiAlert("Hiba a szerverhívásban: " + err.message, "Rendszerhiba");
        }
    );
}

// --- 2. FÓRUM (Közös Terem) ---
function loadForumPosts() {
    var container = document.getElementById('monastery-forum-posts');
    if (!container) return;
    container.innerHTML = '<i>Betöltés...</i>';
    
    callBackend('getMonasteryForumPostsSecure', [], 
        function(res) {
            if (!res.success) {
                container.innerHTML = '<div style="padding:20px; color:#8b0000;"><h3>🚫 Zárt Terület</h3><p>' + res.error + '</p></div>';
                document.getElementById('forum-post-input').disabled = true;
                return;
            }
            if (res.posts.length === 0) { container.innerHTML = '<p><i>Még nincsenek üzenetek.</i></p>'; return; }
            var html = '';
            res.posts.forEach(function(post) {
                html += '<div class="forum-post"><div class="forum-header"><span class="forum-author">' + post.author + '</span><span>' + post.date + '</span></div><div>' + post.message + '</div></div>';
            });
            container.innerHTML = html;
            document.getElementById('forum-post-input').disabled = false; 
        },
        function(err) { container.innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>'; }
    );
}

function submitForumPost() {
    var input = document.getElementById('forum-post-input');
    var text = input.value;
    if(!text) return;
    
    var btn = event.target; 
    btn.disabled = true;
    
    callBackend('addForumPost', [text], 
        function(res){
            btn.disabled = false;
            if(res.success) {
                input.value = '';
                loadForumPosts(); 
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(err) {
            btn.disabled = false;
            uiAlert("Szerverhiba: " + err.message);
        }
    );
}

// --- 3. SUTTOGÓ (Chat) ---
var currentChatPartnerEmail = null;

function loadChatPartners() {
    var list = document.getElementById('chat-partners-list');
    list.innerHTML = '<i>Partnerek keresése...</i>';
    
    callBackend('getMonasteryChatPartners', [], 
        function(res) {
            if (!res.success) { list.innerHTML = '<p style="color:red; padding:10px;">' + res.error + '</p>'; return; }
            
            if (res.partners.length === 0) {
                list.innerHTML = '<p style="padding:10px; font-size:0.8em; color:#666;">Nincsenek elérhető partnerek.</p>';
                return;
            }
            
            var html = '';
            var systemEmail = "rendszer@felhokolostor.com"; 
            var systemElemId = null;

            res.partners.forEach(function(p, index) {
                var elemId = 'chat-partner-item-' + index;
                if (p.email === systemEmail) systemElemId = elemId;
                html += '<div id="' + elemId + '" class="chat-user-item" onclick="selectMonasteryChatPartner(this, \'' + p.email + '\', \'' + p.name + '\')">' + p.name + '</div>';
            });
            
            list.innerHTML = html;
            
            if (systemElemId) {
                document.getElementById(systemElemId).click();
            } else if (res.partners.length > 0) {
                document.getElementById('chat-partner-item-0').click();
            }
        },
        function(err) { list.innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>'; }
    );
}

function selectMonasteryChatPartner(element, email, name) {
    var items = document.querySelectorAll('.chat-user-item');
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('active');
    }
    element.classList.add('active');
    
    currentChatPartnerEmail = email;
    
    document.getElementById('chat-message-input').disabled = false;
    document.getElementById('chat-send-btn').disabled = false;
    
    var msgArea = document.getElementById('chat-messages-area');
    msgArea.innerHTML = '<p style="text-align:center; color:#888; font-size:0.8em;">Beszélgetés betöltése vele: <strong>' + name + '</strong>...</p>';
    
    callBackend('getPrivateMessages', [email], 
        function(data){
            msgArea.innerHTML = '';
            if (data && data.messages) {
                data.messages.forEach(function(msg) {
                    var typeClass = (msg.direction === 'out') ? 'outgoing' : 'incoming';
                    msgArea.innerHTML += '<div class="chat-bubble ' + typeClass + '">' + msg.message + '</div>';
                });
                msgArea.scrollTop = msgArea.scrollHeight;
            }
        },
        function(err) { msgArea.innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>'; }
    );
}

function sendPrivateMessage() {
    var input = document.getElementById('chat-message-input');
    var msg = input.value;
    if(!msg || !currentChatPartnerEmail) return;
    
    var msgArea = document.getElementById('chat-messages-area');
    msgArea.innerHTML += '<div class="chat-bubble outgoing">' + msg + '</div>';
    msgArea.scrollTop = msgArea.scrollHeight;
    input.value = '';
    
    callBackend('sendPrivateMessage', [currentChatPartnerEmail, msg], 
        function(){}, 
        function(err) { console.error("Chat hiba:", err); }
    );
}

function offerPrice(workId, taskKey) {
    var priceInput = document.getElementById('price-' + taskKey);
    var price = priceInput.value;
    if (!price || price <= 0) { uiAlert("Adj meg egy reális árat!"); return; }
    doWorkAction(workId, 'offer_price', { taskKey: taskKey, price: price });
}

function payDirect(workId, taskKey) {
    requestPin(function(pin) {
        doWorkAction(workId, 'pay_direct', { taskKey: taskKey, pinCode: pin });
    });
}

function acceptCredit(workId, taskKey) {
    var message = "<b>FIGYELEM!</b> Ha hitelre veszed igénybe a munkát, a 'Mehet a nyomdába' jogot átruházod a Papátra a tartozás rendezéséig.<br>A könyv bevételei először a törlesztésre mennek.<br>Biztosan ezt akarod?";
    uiConfirm(message, "Hitel Felvétele", function() {
        doWorkAction(workId, 'accept_credit', { taskKey: taskKey });
    });
}

function hireMinistrans(workId, applicantName) {
    var roles = [];
    var checkboxes = document.querySelectorAll('.role-select:checked');
    for (var i = 0; i < checkboxes.length; i++) {
        roles.push(checkboxes[i].value);
    }
    
    if (roles.length === 0) {
        uiAlert("Válassz ki legalább egy szerepkört a felvételhez!", "Hiányzó Adat");
        return;
    }
    
    var message = "Biztosan felveszed <b>" + applicantName + "</b> ministránst a következő körökbe?<br><br><i>" + roles.join(", ") + "</i>";
    uiConfirm(message, "Ministráns Felvétele", function() {
        doWorkAction(workId, 'hire_ministrans', { roles: roles.join(", "), applicantName: applicantName });
    });
}

// --- SZEMÉLYZETI KEZELŐ FUNKCIÓK ---

function loadPersonnelData() {
    var panel = document.getElementById('personnel-panel');
    var container = document.getElementById('personnel-list-container');
    
    panel.style.display = 'block';
    container.innerHTML = '<p>Adatok lekérése a szerverről...</p>';
    
    callBackend('getMonkManagementData', [], 
        function(res) {
            if (!res.success) { container.innerHTML = '<p style="color:red;">Hiba: ' + res.error + '</p>'; return; }
            
            if (res.monks.length === 0) { container.innerHTML = '<p>Nincsenek szerzetesek.</p>'; return; }

            var html = '';
            res.monks.forEach(function(monk) {
                var tasksHtml = '';
                if (monk.activeTasks.length > 0) {
                    tasksHtml = '<ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9em;">';
                    monk.activeTasks.forEach(function(task) {
                        tasksHtml += '<li style="margin-bottom: 5px;">' +
                            '<strong>' + task.workTitle + '</strong> - ' + task.taskLabel + ' ' +
                            '<span style="background:#eee; padding:2px 5px; border-radius:3px;">' + task.status + '</span> ' +
                            '<button class="btn btn-sm btn-danger" style="padding: 2px 6px; font-size: 0.7em; margin-left: 5px;" ' +
                            'onclick="adminRevokeTask(\'' + task.workId + '\', \'' + task.taskKey + '\')">Visszavétel</button>' +
                            '</li>';
                    });
                    tasksHtml += '</ul>';
                } else {
                    tasksHtml = '<em style="color:#777;">Nincs aktív feladat.</em>';
                }

                html += '<div class="item-entry" style="display:block;">' +
                    '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">' +
                        '<div>' +
                            '<div class="item-title">' + monk.name + '</div>' +
                            '<small>' + monk.email + '</small><br>' +
                            '<small style="color: var(--color-secondary); font-weight:bold;">' + (monk.roles || 'Nincs titulus') + '</small>' +
                        '</div>' +
                        '<button class="btn btn-danger" onclick="adminExpelMonk(\'' + monk.email + '\')">KIZÁRÁS</button>' +
                    '</div>' +
                    '<div>' + tasksHtml + '</div>' +
                '</div>';
            });
            container.innerHTML = html;
        },
        function(err) { container.innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>'; }
    );
}

function adminRevokeTask(workId, taskKey) {
    var message = "Biztosan visszaveszed ezt a feladatot a Monktól?<br>Ez <b>'lemondásnak'</b> minősül, ami büntetéssel jár a Monk számára.";
    uiConfirm(message, "Feladat Visszavétele", function() {
        doWorkAction(workId, 'resign_task', { taskKey: taskKey });
        setTimeout(loadPersonnelData, 1500);
    });
}

function adminExpelMonk(email) {
    uiPrompt('KIZÁRÁS: <b>' + email + '</b><br><br>Írd be az indoklást (ez bekerül a Feketelistára):', 
        "Kizárás Indoklása", "Pl.: Szabálysértő magatartás...", 
        function(reason) {
            if (!reason || reason.trim() === "") { uiAlert("A kizáráshoz kötelező indoklást megadni!", "Hiányzó Adat"); return; }

            var confirmMessage = '<span style="color: #c0392b; font-weight: bold;">VÉGLEGES DÖNTÉS!</span><br><br>Biztosan kizárod ezt a Monkot?<br>Minden vagyona elkobzásra kerül, munkái visszavonódnak.';
            uiConfirm(confirmMessage, "Végleges Kizárás", function() {
                document.getElementById('loading-overlay').style.display = 'flex';
                
                callBackend('expelBadMonk', [email, reason], 
                    function(res) {
                        document.getElementById('loading-overlay').style.display = 'none';
                        uiAlert(res.message || res.error, res.success ? "Siker" : "Hiba");
                        loadPersonnelData();
                    },
                    function(err) {
                        document.getElementById('loading-overlay').style.display = 'none';
                        uiAlert("Hiba: " + err.message, "Rendszerhiba");
                    }
                );
            });
        }
    );
}

function uploadCoverFromCard(workId, taskKey) {
    var fileInput = document.getElementById('cover-upload-' + workId);
    var file = fileInput ? fileInput.files[0] : null;
    if (!file) { uiAlert("Kérlek, válassz ki egy képet a feltöltéshez!", "Hiányzó Fájl"); return; }

    var message = "Biztosan feltöltöd ezt a borítót?<br>A feladat státusza <b>'Ellenőrzés alatt'</b>-ra vált, és a kép bekerül a rendszerbe.";
    uiConfirm(message, "Borító Feltöltése", function() {
        document.getElementById('loading-overlay').style.display = 'flex';
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileData = {
                base64: e.target.result.split(',')[1],
                mimeType: file.type,
                filename: file.name
            };
            
            callBackend('uploadCoverAndFinishTask', [workId, taskKey, fileData], 
                function(res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(res.message || res.error, res.success ? "Siker" : "Figyelem");
                    if(res.success) refreshMonasteryWork();
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert("Hiba a feltöltés során: " + err.message, "Rendszerhiba");
                }
            );
        };
        reader.readAsDataURL(file);
    });
}

function resignFromOrder() {
    var message1 = "Biztosan lemondasz a szerzetesi rangodról?<br>A folyamatban lévő munkáidat elveszíted, a tartozásaidat rendeznünk kell.";
    uiConfirm(message1, "Lemondás a Rendről", function() {
        showSystemModal("Játék Státusz", "A játékkal is felhagysz végleg?<br><br>Válassz egy lehetőséget:", "fas fa-door-open", 
            [
                { 
                    text: "Igen, a játékból is kilépek", 
                    color: "#c0392b", textColor: "white",
                    callback: function() { finalizeResignation(true); }
                },
                { 
                    text: "Nem, csak a Rendből lépek ki", 
                    color: "#2980b9", textColor: "white",
                    callback: function() { finalizeResignation(false); }
                }
            ]
        );
    });
}

function finalizeResignation(leaveGame) {
    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';
    
    callBackend('resignFromMonastery', [leaveGame], 
        function(res) {
            if (loading) loading.style.display = 'none';
            uiAlert(res.message, res.success ? "Siker" : "Értesítés");
            if (res.success) {
                if (leaveGame) logout(); 
                else loadPage('felhokolostor_oldal');
            }
        },
        function(err) {
            if (loading) loading.style.display = 'none';
            uiAlert("Hiba történt: " + err.message, "Rendszerhiba");
        }
    );
}

    // =====================================
    // === ÚJ ÉS ÁTHELYEZETT TÉRKÉP FUNKCIÓK ===
    // =====================================

    // =====================================
// === 1. BIZTONSÁGI SEGÉDFÜGGVÉNYEK (VISSZAÁLLÍTVA) ===
// =====================================

/**
 * Megakadályozza az alapértelmezett jobbklikk menüt.
 */
function preventContextMenuDefault(event) {
    event.preventDefault();
    return false;
}

/**
 * Szigorú jobbklikk-tiltás egy adott elemen és annak gyermekein.
 * @param {string} elementId Az elem ID-ja.
 */
function disableContextMenuOnElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Eltávolítjuk a régit, hogy ne halmozódjon
        element.removeEventListener('contextmenu', preventContextMenuDefault);
        // Hozzáadjuk az újat
        element.addEventListener('contextmenu', preventContextMenuDefault);
        
        // Extra védelem: Ha az elem egy kép, tiltjuk a "drag"-ot is (hogy ne lehessen kihúzni asztalra)
        if (element.tagName === 'IMG') {
            element.setAttribute('draggable', 'false');
        }
    }
}

// =====================================
// === ÚJ TÉRKÉP (FREE MOVE & ZOOM) ===
// =====================================

// Állapotváltozók
let mapState = {
    scale: 1,
    panning: false,
    pointX: 0, // X koordináta (eltolás)
    pointY: 0, // Y koordináta (eltolás)
    startX: 0,
    startY: 0
};

const ZOOM_SPEED = 0.2;
const MAX_ZOOM = 5.0;
const MIN_ZOOM = 0.5;

/**
 * Megnyitás és inicializálás
 */
function openMapViewer(fileId, mapName) {
    const modal = document.getElementById('map-viewer-modal');
    const img = document.getElementById('map-viewer-image');
    const wrapper = document.querySelector('.map-viewer-image-wrapper');
    const loading = document.getElementById('loading-overlay');

    if (!modal || !img) return;

    // Reset UI
    img.src = '';
    // Backtick maradhat, ha modern a környezeted
    img.alt = `${mapName} betöltése...`;
    img.style.transform = ''; // Töröljük az előző pozíciót
    modal.style.display = 'flex';
    if(loading) loading.style.display = 'flex';

    // --- JAVÍTÁS: callBackend ---
    // Paraméter: csak a fileId (emailt a router intézi)
    callBackend('getMapImageData', [fileId], 
        function(base64Uri) {
            if (loading) loading.style.display = 'none';
            if (base64Uri) {
                // Ellenőrzés: ha nincs 'data:image' előtag, pótoljuk
                if (!base64Uri.startsWith('data:image')) {
                    img.src = 'data:image/png;base64,' + base64Uri;
                } else {
                    img.src = base64Uri;
                }
                img.alt = mapName;
                
                // 1. Reseteljük a koordinátákat középre (0,0)
                resetMapState();
                
                // 2. Bekötjük a vezérlőket
                setupFreeControls(wrapper);
                
                // 3. Biztonság
                disableContextMenuOnElement('map-viewer-modal');
            } else {
                closeMapViewer();
                alert(`Hiba: Nem sikerült betölteni a térképet.`);
            }
        },
        function(err) {
            if (loading) loading.style.display = 'none';
            closeMapViewer();
            alert(`Szerverhiba: ${err.message}`);
        }
    );
}

function closeMapViewer() {
    document.getElementById('map-viewer-modal').style.display = 'none';
    document.getElementById('map-viewer-image').src = '';
}

/**
 * Alaphelyzetbe állítja a változókat
 */
function resetMapState() {
    mapState = {
        scale: 1,
        panning: false,
        pointX: 0,
        pointY: 0,
        startX: 0,
        startY: 0
    };
    updateMapTransform();
}

/**
 * A transzformáció (CSS) alkalmazása a képre
 * Ez a "motor", ami mozgatja a képet
 */
function updateMapTransform() {
    const img = document.getElementById('map-viewer-image');
    if (!img) return;
    
    // Itt történik a varázslat: egyszerre mozgatjuk (translate) és nagyítjuk (scale)
    img.style.transform = `translate(${mapState.pointX}px, ${mapState.pointY}px) scale(${mapState.scale})`;
}

/**
 * Eseménykezelők (Drag & Zoom)
 */
function setupFreeControls(wrapper) {
    // --- GOMBOK ---
    document.getElementById('zoom-in-btn').onclick = () => zoomFree('in');
    document.getElementById('zoom-out-btn').onclick = () => zoomFree('out');
    document.getElementById('reset-zoom-btn').onclick = resetMapState;

    // --- EGÉRGÖRGŐ (WHEEL) ---
    wrapper.onwheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoomFree('in');
        else zoomFree('out');
    };

    // --- VONSZOLÁS (DRAG) ---
    wrapper.onmousedown = (e) => {
        if(e.button !== 0) return; // Csak bal klikk
        e.preventDefault(); // Szellemkép tiltása!
        
        mapState.panning = true;
        mapState.startX = e.clientX - mapState.pointX;
        mapState.startY = e.clientY - mapState.pointY;
        
        wrapper.classList.add('active');
    };

    wrapper.onmouseup = () => {
        mapState.panning = false;
        wrapper.classList.remove('active');
    };

    wrapper.onmouseleave = () => {
        mapState.panning = false;
        wrapper.classList.remove('active');
    };

    wrapper.onmousemove = (e) => {
        if (!mapState.panning) return;
        e.preventDefault();

        // Kiszámoljuk az új pozíciót
        // Azért vonjuk ki az egérből a startot, mert a translate koordinátákat frissítjük
        mapState.pointX = e.clientX - mapState.startX;
        mapState.pointY = e.clientY - mapState.startY;

        updateMapTransform();
    };
}

/**
 * Zoom logika
 */
function zoomFree(direction) {
    if (direction === 'in' && mapState.scale < MAX_ZOOM) {
        mapState.scale += ZOOM_SPEED;
    } else if (direction === 'out' && mapState.scale > MIN_ZOOM) {
        mapState.scale -= ZOOM_SPEED;
    }
    
    // Kerekítés
    mapState.scale = Math.round(mapState.scale * 10) / 10;
    updateMapTransform();
}

// Biztonság
function disableContextMenuOnElement(elementId) {
    const el = document.getElementById(elementId);
    if(el) {
        el.oncontextmenu = (e) => { e.preventDefault(); return false; };
    }
}

// ===============================

    /**
     * Elindítja a térképmásolási folyamatot.
     */
    function initiateMapCopy(mapSheetRowIndex, mapName) {
      const pinCodeInput = document.getElementById('copy-map-pin');
      const pinCode = pinCodeInput ? pinCodeInput.value : null;
        
        if (pinCode === null || pinCode === "") {
        uiAlert("PIN kód megadása kötelező!");
        if (pinCodeInput) pinCodeInput.focus();
        return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';
        callBackend('copyMap', [mapSheetRowIndex, pinCode], 
    function(response) {
        document.getElementById('loading-overlay').style.display = 'none';
        uiAlert(response.message || response.error);
        if (response.success) {
            updateCreditDisplay();
            loadPage('masolatok_oldal');
        }
    },
    function(err) {
        document.getElementById('loading-overlay').style.display = 'none';
        uiAlert(`Szerverhiba a másoláskor: ${err.message}`);
    }
  );
}

    /**
     * Kezeli a térképfeltöltő modal "Feltöltés" gombjának megnyomását.
     */
    function handleMapUploadSubmit() {
    var identifierInput = document.getElementById('map-identifier');
    var fileInput = document.getElementById('map-file');
    var statusDiv = document.getElementById('upload-status');
    var submitBtn = document.getElementById('submit-map-upload-btn');

    var identifier = identifierInput.value.trim();
    var file = fileInput.files[0];

    if (!identifier || !file) {
        statusDiv.textContent = 'Kérlek, add meg az azonosítót és válassz fájlt!';
        statusDiv.style.color = 'red';
        return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(identifier)) {
        statusDiv.textContent = 'Az azonosító csak betűket, számokat, aláhúzást (_) és kötőjelet (-) tartalmazhat!';
        statusDiv.style.color = 'red';
        return;
    }

    submitBtn.disabled = true;
    statusDiv.textContent = 'Fájl olvasása és konvertálása...';
    statusDiv.style.color = 'black';
    document.getElementById('loading-overlay').style.display = 'flex';

    var reader = new FileReader();
    
    // ASYNC FÜGGVÉNY MARADT, de nyíl (=>) helyett function()
    reader.onload = async function(e) {
        try {
            // AWAIT MARADT
            var inputDataUrl = e.target.result;
            var pngDataUrl = await convertToPngDataUrl(inputDataUrl); 

            var mapData = {
                identifier: identifier,
                base64Data: pngDataUrl.split(',')[1],
                mimeType: 'image/png'
            };

            statusDiv.textContent = 'Feltöltés a szerverre...';
            
            callBackend('uploadMapImage', [mapData], 
                function(response) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    submitBtn.disabled = false;
                    statusDiv.textContent = response.message || response.error;
                    statusDiv.style.color = response.success ? 'green' : 'red';
                    if (response.success) {
                        identifierInput.value = '';
                        fileInput.value = ''; 
                        document.getElementById('upload-map-modal').style.display = 'none';
                        loadPage('masolatok_oldal');
                    }
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    submitBtn.disabled = false;
                    statusDiv.textContent = 'Szerverhiba: ' + err.message;
                    statusDiv.style.color = 'red';
                }
            );

        } catch (convertError) {
            document.getElementById('loading-overlay').style.display = 'none';
            submitBtn.disabled = false;
            statusDiv.textContent = 'Hiba a kép konvertálása közben: ' + convertError.message;
            statusDiv.style.color = 'red';
        }
    };

    reader.onerror = function() {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = 'Hiba a fájl olvasása közben.';
        statusDiv.style.color = 'red';
    };
    reader.readAsDataURL(file); 
}

    /**
     * SEGÉDFÜGGVÉNY: Bármilyen kép DataURL-t PNG DataURL-lé konvertál Canvas segítségével.
     */
    function convertToPngDataUrl(inputDataUrl) {
    return new Promise(function(resolve, reject) {
        var img = new Image();
        img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            try {
                var pngDataUrl = canvas.toDataURL('image/png');
                resolve(pngDataUrl);
            } catch (e) {
                reject(new Error("Canvas PNG export sikertelen: " + e.message));
            }
        };
        img.onerror = function() {
            reject(new Error("A képfájl nem tölthető be a konvertáláshoz."));
        };
        img.src = inputDataUrl;
    });
}

// =====================================
// --- KÖNYVTÁR ÉS LETÖLTÉS FUNKCIÓK ---
// =====================================

 /**
 * === ÚJ, KIBŐVÍTETT KÖNYVTÁR INICIALIZÁLÓ ===
 * Feltölti a Könyvtár oldalt könyvekkel, másolatokkal, tekercsekkel ÉS a felhasználó térképeivel.
 * Kezeli a térkép feltöltés gomb láthatóságát és a modalokat.
 * @param {object} data A szerverről kapott, előre betöltött adatcsomag.
 */
function initializeLibraryAndMapPage(data) {
    var booksContainer = document.getElementById('konyvtar-books-content');
    var copiesContainer = document.getElementById('konyvtar-copies-content');
    var scrollsContainer = document.getElementById('konyvtar-scrolls-content');
    var mapsContainer = document.getElementById('konyvtar-maps-content');
    var logsContainer = document.getElementById('konyvtar-logs-content');
    var uploadButton = document.getElementById('upload-map-button');

    // Ellenőrzés
    if (!booksContainer || !copiesContainer || !scrollsContainer || !mapsContainer || !logsContainer || !uploadButton) {
        console.error("Hiba: A Könyvtár oldal szükséges HTML konténerei hiányosak!");
        return;
    }

    // Töltő üzenetek eltávolítása/alaphelyzet
    booksContainer.innerHTML = '';
    copiesContainer.innerHTML = '';
    scrollsContainer.innerHTML = '';
    mapsContainer.innerHTML = '';
    logsContainer.innerHTML = '';

    // Általános hiba kezelése
    if (data.error) {
        booksContainer.innerHTML = '<p style="color: red;">Hiba a könyvtár betöltésekor: ' + data.error + '</p>';
        return;
    }

    // ============================================================
    // 1. LETÖLTHETŐ KÖNYVEK (BIZTONSÁGOS JAVÍTÁS)
    // ============================================================
    if (data.books && data.books.length > 0) {
        data.books.forEach(function(book) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            
            // 1. Létrehozzuk a szöveges részt stringként (ez biztonságos)
            entryDiv.innerHTML = '<div class="item-details">' +
                                    '<div class="item-title">' + book.title + '</div>' +
                                    '<div class="item-author">' + book.author + '</div>' +
                                 '</div>';

            // 2. A gombot programkóddal hozzuk létre, hogy a speciális karakterek (pl. "idézőjel") 
            // ne törjék el a HTML-t a data-title attribútumban.
            var downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = 'Letöltés';
            
            // Így a rendszer automatikusan kezeli az idézőjeleket
            downloadBtn.setAttribute('data-id', book.downloadLink); 
            downloadBtn.setAttribute('data-title', book.title); 

            downloadBtn.onclick = function() {
                var id = this.getAttribute('data-id');
                var title = this.getAttribute('data-title');
                startClientSideDownloadProcess(id, title);
            };

            entryDiv.appendChild(downloadBtn);
            booksContainer.appendChild(entryDiv);
        });
    } else {
        booksContainer.innerHTML = "<p>Nincsenek letölthető könyveid.</p>";
    }

    // ============================================================
    // 2. OLVASHATÓ MÁSOLATOK
    // ============================================================
    if (data.copies && data.copies.length > 0) {
        data.copies.forEach(function(copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var inPlayHtml = copy.inPlay ? '<small style="color: orange; display: block;"><i>(Játékban van)</i></small>' : '';
            var btnDisabled = copy.inPlay ? 'disabled title="Játékban lévő másolat nem olvasható itt."' : '';
            
            entryDiv.innerHTML = '<div class="item-details">' +
                                    '<div class="item-title">' + copy.title + '</div>' +
                                    '<div class="item-author">' + copy.author + '</div>' +
                                    inPlayHtml +
                                 '</div>' +
                                 '<button class="btn" ' + btnDisabled + '>Olvasom</button>';
            
            if (!copy.inPlay) {
                entryDiv.querySelector('.btn').onclick = function() {
                    openReaderFor(copy.code);
                };
            }
            copiesContainer.appendChild(entryDiv);
        });
    } else {
        copiesContainer.innerHTML = "<p>Nincsenek olvasható másolataid.</p>";
    }

    // ============================================================
    // 3. MEGSZERZETT TEKERCSEK
    // ============================================================
    if (data.scrolls && data.scrolls.length > 0) {
        data.scrolls.forEach(function(scroll) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            entryDiv.innerHTML = '<div class="item-details">' +
                                    '<div class="item-title">' + scroll.title + '</div>' +
                                    '<div class="item-author"><em>Fejezet: ' + scroll.fejezet + '</em></div>' +
                                 '</div>' +
                                 '<button class="btn">Olvasom</button>';
            
            entryDiv.querySelector('.btn').onclick = function() {
                openReaderForScroll(scroll.token);
            };
            scrollsContainer.appendChild(entryDiv);
        });
    } else {
        scrollsContainer.innerHTML = "<p>Nincsenek megszerzett tekercseid.</p>";
    }

    // ============================================================
    // 4. HAJÓNAPLÓK
    // ============================================================
    if (data.logs && data.logs.length > 0) {
        data.logs.forEach(function(log) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var logName = log.name || ('Napló (' + log.id + ')');
            
            entryDiv.innerHTML = '<div class="item-details">' +
                                    '<div class="item-title">' + logName + '</div>' +
                                    '<small class="item-author">Napló ID: ' + log.id + '</small>' +
                                 '</div>' +
                                 '<button class="btn">Olvasom</button>';
            
            entryDiv.querySelector('.btn').onclick = function() {
                openLogReader(log.id);
            };
            logsContainer.appendChild(entryDiv);
        });
    } else {
        logsContainer.innerHTML = "<p>Nincsenek olvasható hajónaplóid.</p>";
    }

    // ============================================================
    // 5. SAJÁT TÉRKÉPEK
    // ============================================================
    if (data.maps && data.maps.length > 0) {
        data.maps.forEach(function(map) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry map-entry';
            var dateStr = map.date ? new Date(map.date).toLocaleDateString() : 'Ismeretlen';
            
            entryDiv.innerHTML = '<div class="map-details item-details">' +
                                    '<div class="map-name item-title">' + map.identifier + '</div>' +
                                    '<small class="item-author">Feltöltve: ' + dateStr + '</small>' +
                                 '</div>' +
                                 '<div class="map-actions">' +
                                    '<button class="btn">Megnéz</button>' +
                                 '</div>';
            
            entryDiv.querySelector('.map-actions button').onclick = function() {
                openMapViewer(map.fileId, map.identifier);
            };
            mapsContainer.appendChild(entryDiv);
        });
    } else {
        mapsContainer.innerHTML = "<p>Nincsenek saját térképeid.</p>";
    }

    // ============================================================
    // 6. FELTÖLTÉS GOMB
    // ============================================================
    if (data.canUpload) {
        uploadButton.style.display = 'block';
        uploadButton.onclick = function() {
            var uploadModal = document.getElementById('upload-map-modal');
            if (uploadModal) {
                uploadModal.style.display = 'flex';
                var statusDiv = document.getElementById('upload-status');
                if(statusDiv) statusDiv.textContent = '';
                var submitBtn = document.getElementById('submit-map-upload-btn');
                
                if(submitBtn && !submitBtn.hasAttribute('data-listener-added')) {
                    submitBtn.onclick = handleMapUploadSubmit;
                    submitBtn.setAttribute('data-listener-added', 'true');
                }
            } else {
                console.error("Hiba: A feltöltő modal HTML ('upload-map-modal') hiányzik!");
            }
        };
    } else {
        uploadButton.style.display = 'none';
    }
}

// =========================================================
// === KÖNYVTÁR OLVASÓK (VÉGLEGES, MŰKÖDŐ VERZIÓ) ===
// =========================================================

// SEGÉDFÜGGVÉNY: Megjelenítés (VÉDELEMMEL ÉS SCROLL JAVÍTÁSSAL)
function displayInReader(htmlContent) {
    var modal = document.getElementById('reader-modal');
    var readerContent = document.getElementById('reader-content-display');
    var readerShield = document.getElementById('reader-shield');
    var container = document.querySelector('.reader-container');

    if (!modal || !readerContent) {
        console.error("Hiba: Olvasó elemek nem találhatók!");
        return;
    }

    // Tartalom beillesztése
    readerContent.innerHTML = htmlContent;
    
    // Megjelenítés
    modal.style.display = 'flex';

    // === VÉDELEM VISSZAÁLLÍTÁSA ===
    
    // 1. Jobbklikk tiltása az EGÉSZ olvasóban (nem csak a képeken)
    // Ez megakadályozza a "Kép mentése másként" és a "Másolás" menüt is.
    modal.oncontextmenu = function(e) { 
        e.preventDefault(); 
        return false; 
    };

    // 2. Kijelölés, másolás, vágás tiltása billentyűzettel (Ctrl+C, stb.)
    modal.oncopy = function(e) { e.preventDefault(); return false; };
    modal.oncut = function(e) { e.preventDefault(); return false; };
    modal.onselectstart = function(e) { e.preventDefault(); return false; };

    // === SCROLL POZÍCIÓ JAVÍTÁSA ===
    // Azonnal a tetejére görgetünk mindent
    if (container) container.scrollTop = 0;
    modal.scrollTop = 0;
    window.scrollTo(0, 0);

    // Shield (Opcionális extra védelem) méretezése
    setTimeout(function() {
        if (readerContent && readerShield) { 
             readerShield.style.height = readerContent.scrollHeight + 'px';
        }
    }, 200);
}

// 1. HAJÓNAPLÓ OLVASÓ (Biztos módszer: getLogEntry + Kliens oldali HTML)
function openLogReader(logId) {
    if (!logId) return;
    console.log(`Napló olvasásának indítása: ${logId}`);
    document.getElementById('loading-overlay').style.display = 'flex';
    
    // --- JAVÍTÁS: callBackend ---
    // Paraméter: csak [logId] (emailt a router intézi)
    callBackend('getLogContentForReading', [logId], 
        function(response) { // Objektumot kapunk: { htmlContent, imageData }
            try {
                // Hibakezelés a szerver válasza alapján
                if (response.error) {
                    throw new Error(response.error);
                }
                if (!response.htmlContent) {
                    throw new Error("Hiányzó HTML tartalom a szerver válaszában.");
                }

                let htmlToShow = response.htmlContent;
                const imageDataMap = response.imageData || {};

                // Kép placeholder-ek keresése és cseréje a kliens oldalon
                const imagePlaceholderRegex = /\[IMAGE:([^:]+):([^\]]+)\]/g;
                htmlToShow = htmlToShow.replace(imagePlaceholderRegex, (match, fileId, fileName) => {
                    const dataUri = imageDataMap[fileId]; // Itt már a teljes "data:image/png;base64,..." URI van

                    if (dataUri) {
                        // Közvetlenül használjuk a kapott Data URI-t az src attribútumban
                        const escapedFileName = fileName.replace('.txt','').replace(/"/g, '&quot;'); // Alap escape
                        
                        // Ellenőrzés: ha nincs 'data:image' előtag, pótoljuk
                        const src = dataUri.startsWith('data:image') ? dataUri : `data:image/png;base64,${dataUri}`;

                        // Visszaadjuk az img taget a teljes Data URI-val
                        return `<img src="${src}" alt="${escapedFileName}" style="max-width: 100%; height: auto; display: block; margin: 1em auto;">`;
                    } else {
                        // Ha a szerver nem tudta lekérni a kép adatát (null-t adott vissza)
                        console.warn(`Hiányzó kép adat a naplóban: ID=${fileId}, Fájlnév=${fileName}`);
                        // Jelenítsünk meg egyértelmű hibaüzenetet a felhasználónak
                        return `<p style="color:orange; border: 1px dashed orange; padding: 5px; text-align: center;">[Kép (${fileName.replace('.txt','')}) nem tölthető be]</p>`;
                    }
                });

                // Body tartalom kinyerése a teljes HTML-ből
                const bodyMatch = htmlToShow.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                // Csak a body tartalmát, vagy ha nincs body, a teljes stringet adjuk át
                const bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : htmlToShow;

                // Tartalom megjelenítése az olvasóban
                displayInReader(bodyContent);

            } catch (e) {
                 // Kliensoldali hiba esetén
                 uiAlert("Hiba a napló tartalmának feldolgozásakor: " + e.message);
                 console.error("Napló olvasási hiba (kliens):", e);
            } finally {
                 // Biztosan elrejtjük a töltőképernyőt
                 document.getElementById('loading-overlay').style.display = 'none';
            }
        },
        function(err) {
             // Szerverhívás hiba esetén
             document.getElementById('loading-overlay').style.display = 'none';
             uiAlert("Szerverhiba a napló tartalmának lekérésekor: " + err.message);
             console.error("Napló olvasási hiba (szerver hívás):", err);
        }
    ); 
}

// 2. MÁSOLAT OLVASÓ (A TE LOGIKÁDDAL!)
function openReaderFor(copyCode) {
    document.getElementById('loading-overlay').style.display = 'flex';
    
    callBackend('getAllChapterContents', [copyCode], 
        function(result) {
            document.getElementById('loading-overlay').style.display = 'none';
            
            if (!result || !result.chapters || result.chapters.length === 0) {
                uiAlert("Hiba: A másolat fejezeteit nem sikerült betölteni.");
                return;
            }
            
            var fullHtmlContent = '';
            
            try {
                // 1. Fejezetek összefűzése
                result.chapters.forEach(function(chapterHtml) {
                    var bodyMatch = chapterHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                    if (bodyMatch && bodyMatch[1]) {
                        fullHtmlContent += bodyMatch[1];
                    } else {
                        fullHtmlContent += chapterHtml; 
                    }
                });
                
                // 2. Képek cseréje
                var coverFoundInText = false; 

                if (result.embeddedImages && Object.keys(result.embeddedImages).length > 0) {
                    var imgTagRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
                    
                    fullHtmlContent = fullHtmlContent.replace(imgTagRegex, function(match, srcValue) {
                        var fileName = srcValue.split('/').pop();
                        var foundKey = null;

                        if (result.embeddedImages[fileName]) {
                            foundKey = fileName;
                        } else {
                            var pngName = fileName.replace(/\.[^/.]+$/, "") + ".png";
                            if (result.embeddedImages[pngName]) {
                                foundKey = pngName;
                            }
                        }

                        if (foundKey) {
                            var newDataUri = result.embeddedImages[foundKey];
                            
                            // Borító ellenőrzés
                            if (foundKey.toLowerCase().indexOf('cover') !== -1 || 
                               (result.coverBase64 && newDataUri.indexOf(result.coverBase64.substring(0, 50)) !== -1)) {
                                 coverFoundInText = true;
                            }
                            
                            return match.replace(srcValue, newDataUri);
                        }
                        
                        return match; 
                    });
                }
                
                // 3. Borító beszúrása (ha nem volt a szövegben)
                if (result.coverBase64 && !coverFoundInText) {
                    var srcData = result.coverBase64.indexOf('data:') === 0 
                                  ? result.coverBase64 
                                  : 'data:image/png;base64,' + result.coverBase64;
                    
                    // Backtick mentes HTML
                    fullHtmlContent = '<div style="text-align:center; margin-bottom:40px;">' +
                                            '<img src="' + srcData + '" alt="Borítókép" style="max-width:90%; height:auto; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">' +
                                       '</div>' + fullHtmlContent;
                }
                
                displayInReader(fullHtmlContent);
                
            } catch (e) {
                uiAlert("Hiba a tartalom feldolgozása közben: " + e.message);
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerveroldali hiba: " + err.message);
        }
    );
}

// 3. TEKERCS OLVASÓ (Ugyanazzal a logikával)
function openReaderForScroll(tekercsToken) {
    document.getElementById('loading-overlay').style.display = 'flex';
    
    // callBackend hívás
    callBackend('getContentForReading', [tekercsToken, 'tekercs'], 
        function(fileData) {
            document.getElementById('loading-overlay').style.display = 'none';
            
            if (!fileData || !fileData.content) {
                uiAlert("A tekercs üres.");
                return;
            }
            
            var contentToShow = '';

            // Tartalom kinyerése
            var bodyMatch = fileData.content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            var bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : fileData.content;
            
            // Képcsere logika
            if (fileData.embeddedImages) {
                for (var imgName in fileData.embeddedImages) {
                    var imgData = fileData.embeddedImages[imgName];
                    // String replace
                    bodyContent = bodyContent.split('Images/' + imgName).join(imgData);
                    bodyContent = bodyContent.split('"' + imgName + '"').join('"' + imgData + '"');
                }
            }
            
            // Borító beszúrása
            if (fileData.coverBase64) {
                var srcData = fileData.coverBase64.indexOf('data:') === 0 
                              ? fileData.coverBase64 
                              : 'data:image/png;base64,' + fileData.coverBase64;
                              
                contentToShow += '<div style="text-align:center; margin-bottom:20px;"><img src="' + srcData + '" style="max-width:80%;"></div>';
            }
            
            contentToShow += bodyContent;
            displayInReader(contentToShow);
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Hiba: " + err.message);
        }
    );
}

// =====================================
// === TEKERCSMESTER FUNKCIÓK (ROUTERESÍTVE) ===
// =====================================

function initializeTekercsmesterPage(preloadedData) {
    var loader = document.getElementById('sajat-tekercs-lista-loader');
    var sajatListaDiv = document.getElementById('sajat-tekercs-lista');
    var eladoLista = document.getElementById('elado-tekercs-lista');
    
    loader.style.display = 'block';
    
    // callBackend hívás (paraméter nélküli lekérdezés)
    callBackend('getTekercsmesterData', [], 
        function(data) {
            loader.style.display = 'none';

            if (data.error) {
                // String összefűzés
                sajatListaDiv.innerHTML = '<p style="color:red;">Hiba: ' + data.error + '</p>';
                return;
            }

            document.getElementById('hartya-count').textContent = data.hartya;
            setupTekercsButtons(data.hartya); 

            eladoLista.innerHTML = '<option value="">Válassz egy tekercset...</option>';
            if (data.eladoTekercs && data.eladoTekercs.length > 0) {
                data.eladoTekercs.forEach(function(item) {
                    var option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.title + ' - ' + item.fejezet;
                    eladoLista.appendChild(option);
                });
            }

            renderMyScrollList(data.myTekercs, sajatListaDiv);
        },
        function(err) {
            loader.style.display = 'none';
            sajatListaDiv.innerHTML = '<p style="color:red;">Szerverhiba: ' + err.message + '</p>';
        }
    );

    var buyBtn = document.getElementById('buy-tekercs-btn');
    var newBuyBtn = buyBtn.cloneNode(true);
    buyBtn.parentNode.replaceChild(newBuyBtn, buyBtn);

    newBuyBtn.onclick = function() {
        var selectedId = eladoLista.value;
        if (!selectedId) {
            uiAlert("Kérlek, válassz egy tekercset a listából!", "Hiányzó Adat");
            return;
        }
        
        document.getElementById('loading-overlay').style.display = 'flex';
        
        callBackend('buyTekercs', [selectedId], 
            function(res) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(res.message || res.error, res.success ? "Siker" : "Értesítés");
                if(res.success) {
                    updateCreditDisplay();
                    initializeTekercsmesterPage(); 
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Hiba a vásárláskor: " + err.message);
            }
        );
    };
}

function setupTekercsButtons(currentHartya) {
    var hartyaCountSpan = document.getElementById('hartya-count');
    // .closest() helyett biztonságosabb parentNode bejárást is használhatnánk, de a modern böngészők ismerik
    var hartyaContainer = hartyaCountSpan ? hartyaCountSpan.parentNode : null;
    // Keresünk felfelé, ha nem közvetlen szülő
    while (hartyaContainer && !hartyaContainer.classList.contains('stat-box')) {
        hartyaContainer = hartyaContainer.parentNode;
    }

    if (hartyaContainer) {
        // 1. TEKERCSPRÉS GOMB
        if (!document.getElementById('press-scroll-btn')) {
            var pressButton = document.createElement('button');
            pressButton.id = 'press-scroll-btn';
            pressButton.className = 'btn';
            pressButton.textContent = 'Tekercsprés (10 kr, 30 hártya)';
            pressButton.style.marginTop = '15px';
            pressButton.style.width = '100%';

            pressButton.onclick = function() {
                uiConfirm(
                    "Biztosan szeretnél egy új tekercset préselni 10 kreditért és 30 hártyáért?", 
                    "Tekercsprés", 
                    function() {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('pressNewScroll', [], 
                            function(response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? "Siker" : "Hiba");
                                if (response.success) {
                                    updateCreditDisplay();
                                    initializeTekercsmesterPage(); 
                                }
                            },
                            function(err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert('Súlyos hiba: ' + err.message);
                            }
                        );
                    }
                );
            };
            hartyaContainer.appendChild(pressButton);
        }

        // 2. HÁRTYA ELADÁS GOMB
        if (!document.getElementById('sell-hartya-btn')) {
            var sellButton = document.createElement('button');
            sellButton.id = 'sell-hartya-btn';
            sellButton.className = 'btn';
            sellButton.style.marginTop = '10px';
            sellButton.style.backgroundColor = '#d35400';
            sellButton.style.width = '100%';
            sellButton.textContent = 'Hártya Eladása (30 db \u2192 1 kr)';

            sellButton.onclick = function() {
                uiConfirm(
                    "Biztosan eladsz <b>30 db hártyát</b>?<br>Cserébe <b>1 Kalózkreditet</b> kapsz.", 
                    "Hártya Beváltása", 
                    function() {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('exchangeHartyaForCredit', [], 
                            function(response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? "Siker" : "Hiba");
                                if (response.success) {
                                    updateCreditDisplay();
                                    if(response.newHartya !== undefined) {
                                         document.getElementById('hartya-count').textContent = response.newHartya;
                                    } else {
                                         initializeTekercsmesterPage();
                                    }
                                }
                            },
                            function(err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert('Súlyos hiba: ' + err.message);
                            }
                        );
                    }
                );
            };
            hartyaContainer.appendChild(sellButton);
        }
    }
}

function renderMyScrollList(myTekercs, container) {
    container.innerHTML = '';
    if (myTekercs && myTekercs.length > 0) {
        myTekercs.forEach(function(szett) {
            var szettDiv = document.createElement('div');
            szettDiv.className = 'item-entry';
            
            var reszletekDiv = document.createElement('div');
            reszletekDiv.className = 'item-details';
            // String összefűzés
            reszletekDiv.innerHTML = '<div class="item-title">' + szett.title + ' (' + szett.tekercsek.length + ' db)</div>' +
                                     '<div class="item-author">' + szett.author + '</div>';
            
            var gombokDiv = document.createElement('div');

            // --- A. Összefűzés gomb ---
            if (szett.tekercsek.length >= 48) {
                 var assembleButton = document.createElement('button');
                 assembleButton.className = 'btn';
                 assembleButton.textContent = 'Összefűzés másolattá';
                 assembleButton.onclick = function() {
                    uiConfirm('Biztosan összefűzöd a(z) "' + szett.title + '" tekercseit?<br>Ez a művelet végleges.', "Összefűzés", function() {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('assembleScrolls', [szett.code], 
                            function(response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? "Siker" : "Hiba");
                                initializeTekercsmesterPage();
                            },
                            function(err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(err.message);
                            }
                        );
                    });
                 };
                 gombokDiv.appendChild(assembleButton);
            }
            
            // --- B. Egyedi tekercsek eladása ---
            szett.tekercsek.forEach(function(tekercs) {
                var sellButton = document.createElement('button');
                sellButton.className = 'btn';
                sellButton.textContent = tekercs.fejezet + ' eladása';
                sellButton.style.fontSize = '0.8em';
                sellButton.style.margin = '2px';
                
                sellButton.onclick = function() {
                    uiConfirm('Biztosan eladod ezt a tekercset 10 kreditért: <b>' + tekercs.fejezet + '</b>?', "Eladás", function() {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('sellTekercs', [tekercs.token], 
                            function(res) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(res.message || res.error, res.success ? "Siker" : "Hiba");
                                if(res.success) {
                                    updateCreditDisplay();
                                    initializeTekercsmesterPage();
                                }
                            },
                            function(err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(err.message);
                            }
                        );
                    });
                };
                gombokDiv.appendChild(sellButton);
            });
            
            szettDiv.appendChild(reszletekDiv);
            szettDiv.appendChild(gombokDiv);
            container.appendChild(szettDiv);
        });
    } else {
        container.innerHTML = "<p>Még nincsenek tekercseid.</p>";
    }
}

// =====================================
// === MÁSOLATOK OLDAL INICIALIZÁLÓ ===
// =====================================

/**
 * Inicializálja a Másolatok oldalt.
 * JAVÍTVA: callBackend hívásokból kivéve a currentUserEmail.
 */
function initializeMasolatokAndCopyMapPage(data) {
    var myCopiesLoader = document.getElementById('sajat-masolat-lista-loader');
    var myCopiesContainer = document.getElementById('sajat-masolat-lista-content');
    var forSaleCopiesSelect = document.getElementById('elado-masolat-lista');
    var buyCopySection = document.getElementById('buy-copy-section'); 
    var buyCopyDetailsDiv = document.getElementById('buy-copy-selection-details'); 
    var buyCopyBtn = document.getElementById('buy-copy-btn');
    var buyCopyPinInput = document.getElementById('buy-copy-pin-code'); 

    // Új elemek a térképmásoláshoz
    var availableMapsLoader = document.getElementById('available-maps-list-loader'); 
    var availableMapsContainer = document.getElementById('available-maps-list-content'); 
    var copyMapPinInput = document.getElementById('copy-map-pin'); 
    var copyMapPinLabel = copyMapPinInput ? copyMapPinInput.previousElementSibling : null;

    if (!myCopiesLoader || !myCopiesContainer || !forSaleCopiesSelect || !buyCopySection || !buyCopyDetailsDiv || !buyCopyBtn || !buyCopyPinInput || !availableMapsLoader || !availableMapsContainer || !copyMapPinInput || !copyMapPinLabel) {
         console.error("Hiba: A Másolatok oldal szükséges HTML elemei hiányosak! Ellenőrizd az ID-kat.");
         return;
    }

    myCopiesLoader.style.display = 'none';
    availableMapsLoader.style.display = 'none';

    if (data.error) {
        myCopiesContainer.innerHTML = '<p style="color:red;">Hiba: ' + data.error + '</p>';
        availableMapsContainer.innerHTML = '<p style="color:red;">Hiba: ' + data.error + '</p>';
        return;
    }

    // --- Saját másolatok listázása ---
    myCopiesContainer.innerHTML = '';
    if (data.myCopies && data.myCopies.length > 0) {
        data.myCopies.forEach(function(copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            entryDiv.innerHTML = '<div class="item-details"><div class="item-title">' + copy.title + '</div><div class="item-author">' + copy.author + '</div></div>';
            var gombokDiv = document.createElement('div');
            if (!copy.inPlay) {
                // Játékba viszem gomb
                var playBtn = document.createElement('button');
                playBtn.className = 'btn';
                playBtn.textContent = 'Játékba viszem';
                playBtn.onclick = function() {
                    uiAlert("A Játékmester jelenleg nem elérhető.\n\nKérlek, jelezd a Tavernában vagy Discordon, hogy a(z) " + copy.code + " kódú másolatot játékba hoznád!");
                  };
                gombokDiv.appendChild(playBtn);

                // Eladom gomb
                var sellBtn = document.createElement('button');
                sellBtn.className = 'btn';
                sellBtn.textContent = 'Eladom';
                sellBtn.style.backgroundColor = '#c82333';
                
                sellBtn.onclick = function() {
                    var confirmMsg = 'Biztosan eladod a(z) "<b>' + copy.title + '</b>" másolatot 10 kreditért?';

                    if(typeof uiConfirm === 'function') {
                        uiConfirm(
                            confirmMsg, 
                            "Másolat Eladása", 
                            function() {
                                document.getElementById('loading-overlay').style.display = 'flex';
                                
                                // --- JAVÍTÁS: callBackend ---
                                // currentUserEmail KIVÉVE!
                                callBackend('sellCopy', [copy.code], 
                                    function(res) {
                                        document.getElementById('loading-overlay').style.display = 'none';
                                        if(typeof uiAlert === 'function') uiAlert(res.message || res.error, res.success ? "Siker" : "Értesítés");
                                        
                                        if(res.success) {
                                            updateCreditDisplay();
                                            loadPage('masolatok_oldal');
                                        }
                                    },
                                    function(err) {
                                        document.getElementById('loading-overlay').style.display = 'none';
                                        if(typeof uiAlert === 'function') uiAlert("Hiba történt: " + err.message, "Rendszerhiba");
                                    }
                                );
                            }
                        );
                    }
                };
                gombokDiv.appendChild(sellBtn);

            } else {
                var inPlayLabel = document.createElement('span');
                inPlayLabel.textContent = 'Játékban van';
                inPlayLabel.style.fontWeight = 'bold';
                gombokDiv.appendChild(inPlayLabel);
            }
            
            entryDiv.appendChild(gombokDiv);
            myCopiesContainer.appendChild(entryDiv);
        });
    } else {
        myCopiesContainer.innerHTML = "<p>Jelenleg nincsenek másolataid.</p>";
    }

    // --- Eladó másolatok listázása ---
    forSaleCopiesSelect.innerHTML = '<option value="">Válassz egy másolatot...</option>';
    if (data.forSale && data.forSale.length > 0) {
        data.forSale.forEach(function(item) {
            var option = document.createElement('option');
            option.value = item.rowIndex;
            // JSON stringify, hogy adatot tároljunk
            option.setAttribute('data-item-data', JSON.stringify(item));
            option.textContent = item.title + ' (' + item.author + ')';
            forSaleCopiesSelect.appendChild(option);
        });
    }

    forSaleCopiesSelect.onchange = function() {
        buyCopyDetailsDiv.innerHTML = ''; 
        if (this.value) {
            var selectedOption = this.options[this.selectedIndex];
            var selectedData = JSON.parse(selectedOption.getAttribute('data-item-data'));
            var cost = (selectedData.seller.toLowerCase() === currentUserEmail.toLowerCase()) ? 11 : 110;
            // String összefűzés
            buyCopyDetailsDiv.innerHTML = '<p><strong>Vételár:</strong> ' + cost + ' kredit</p><p><small>Eladó: ' + selectedData.seller + '</small></p>';
            buyCopySection.style.display = 'block';
        } else {
            buyCopySection.style.display = 'none';
        }
    };
    buyCopySection.style.display = 'none'; 

    buyCopyBtn.onclick = function() {
        var selectedRowIndex = forSaleCopiesSelect.value;
        if (!selectedRowIndex) { 
            if(typeof uiAlert === 'function') uiAlert("Kérlek, válassz egy másolatot a listából!"); 
            return; 
        }
        var pinCode = buyCopyPinInput.value;
        if (!pinCode) { 
            if(typeof uiAlert === 'function') uiAlert("PIN kód megadása kötelező a vásárláshoz!"); 
            return; 
        }
        document.getElementById('loading-overlay').style.display = 'flex';
        
        // --- JAVÍTÁS: callBackend ---
        // currentUserEmail KIVÉVE!
        callBackend('buyCopy', [selectedRowIndex, pinCode], 
            function(res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if(typeof uiAlert === 'function') uiAlert(res.message || res.error);
                buyCopyPinInput.value = '';
                if(res.success) {
                    updateCreditDisplay();
                    loadPage('masolatok_oldal');
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                if(typeof uiAlert === 'function') uiAlert("Hiba: " + err.message);
            }
        );
    };

    // --- Másolható térképek listázása ---
    availableMapsContainer.innerHTML = ''; 

    if (data.availableMaps && data.availableMaps.length > 0) {
        console.log("Elérhető térképek találva.");

        // Csoportosítás (manuális loop)
        var mapGroups = {};
        data.availableMaps.forEach(function(map) {
            var baseIdentifier = map.identifier.indexOf('-') !== -1 ? map.identifier.substring(0, map.identifier.lastIndexOf('-')) : map.identifier;
            if (!mapGroups[baseIdentifier]) {
                mapGroups[baseIdentifier] = {
                    name: baseIdentifier.replace(/_map$/, '').replace(/_/g, ' '),
                    firstRowIndex: map.rowIndex,
                    count: 0
                };
            }
            mapGroups[baseIdentifier].count++;
        });

        // Object.values manuális emulálása (vagy használata, ha támogatott) és rendezés
        var groupsArray = [];
        for (var key in mapGroups) {
            if (mapGroups.hasOwnProperty(key)) {
                groupsArray.push(mapGroups[key]);
            }
        }
        groupsArray.sort(function(a,b) { return a.name.localeCompare(b.name); });

        groupsArray.forEach(function(group) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry map-entry';
            // Feltételezzük, hogy MAP_COPY_COST definiálva van globálisan
            var cost = (typeof MAP_COPY_COST !== 'undefined') ? MAP_COPY_COST : 10;
            
            entryDiv.innerHTML = 
                '<div class="map-details item-details">' +
                    '<div class="map-name item-title">' + group.name + ' (' + group.count + ' db)</div>' +
                    '<small class="item-author">Másolás ára: ' + cost + ' kredit</small>' +
                '</div>' +
                '<div class="map-actions">' +
                    '<button class="btn">Másolás</button>' +
                '</div>';
            
            entryDiv.querySelector('.map-actions button').onclick = function() { 
                if(typeof initiateMapCopy === 'function') initiateMapCopy(group.firstRowIndex, group.name); 
            };
            availableMapsContainer.appendChild(entryDiv);
        });

        if (copyMapPinInput) copyMapPinInput.style.display = 'block';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'block';

    } else { 
        availableMapsContainer.innerHTML = "<p>Jelenleg nincsenek másolható térképek.</p>";
        if (copyMapPinInput) copyMapPinInput.style.display = 'none';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'none';
    }
}

/**
 * Elindítja a kliensoldali letöltési és vízjelezési folyamatot.
 * @param {string} contentId A könyv forrásának azonosítója (Mappa ID az O oszlopból).
 */
async function startClientSideDownloadProcess(contentId, bookTitle) {
    var statusOverlay = document.getElementById('loading-overlay');
    var allDownloadButtons = Array.prototype.slice.call(document.querySelectorAll('.download-btn'));
    
    if (statusOverlay) statusOverlay.style.display = 'flex';
    allDownloadButtons.forEach(function(btn) { btn.disabled = true; });
    
    try {
        console.log("Letöltés indítása. ID:", contentId, "Cím:", bookTitle);

        if (!contentId) throw new Error("Hiányzó könyv azonosító!");

        // 1. ADATOK LEKÉRÉSE A SZERVERRŐL
        // Átadjuk a címet is második paraméterként!
        var data = await new Promise(function(resolve, reject) {
            callBackend('getRawFilesForDownload', [contentId, bookTitle], 
                function(res) { resolve(res); },
                function(err) { reject(err); }
            );
        });

        if (data.error) throw new Error(data.error);
        if (!data.epubBase64 || !data.coverBase64) throw new Error("Hiányos adat érkezett a szervertől.");

        // 2. ADATOK VISSZAALAKÍTÁSA (Base64 -> Blob)
        // String összefűzés backtick helyett
        var epubRes = await fetch('data:application/epub+zip;base64,' + data.epubBase64);
        var epubBlob = await epubRes.blob();
        
        var coverRes = await fetch('data:image/png;base64,' + data.coverBase64);
        var coverBlob = await coverRes.blob();
        
        // 3. VÍZJELEZÉS (KÉP)
        // A data.bookCode a felhasználó egyedi kódja, amit a szerver küld vissza
        var finalImageBlob = coverBlob;
        if (typeof embedIdInImage === 'function') {
             var watermarkedCoverBase64 = await embedIdInImage(coverBlob, data.bookCode);
             var finalImageRes = await fetch(watermarkedCoverBase64);
             finalImageBlob = await finalImageRes.blob();
        } else {
             console.warn("embedIdInImage hiányzik, a borító vízjelezése kimaradt.");
        }
        
        // 4. EPUB CSOMAGOLÁS ÉS VÍZJELEZÉS (SZÖVEG)
        // Ez a függvény (processEpubFile) végzi a szöveges vízjelezést és az új borító beillesztését
        var finalEpubBlob = await processEpubFile(epubBlob, finalImageBlob, data.bookCode, data.coverFilename);
        
        // 5. LETÖLTÉS INDÍTÁSA A BÖNGÉSZŐBEN
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(finalEpubBlob);
        downloadAnchor.download = data.epubFilename || 'konyv.epub';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
        
        // Memória felszabadítása
        setTimeout(function() { URL.revokeObjectURL(downloadAnchor.href); }, 1000);

        if(typeof uiAlert === 'function') uiAlert("A könyv letöltése és vízjelezése sikeres!");

    } catch (error) {
        console.error("Letöltési hiba:", error);
        var msg = error.message || error;
        if (typeof uiAlert === "function") {
            uiAlert('Hiba a letöltés során: ' + msg);
        } else {
            alert('Hiba a letöltés során: ' + msg);
        }
    } finally {
        if (statusOverlay) statusOverlay.style.display = 'none';
        allDownloadButtons.forEach(function(btn) { btn.disabled = false; });
    }
}


/**
 * Feldolgozza az ePub fájlt és QR KÓDOT is beszúr a link mellé.
 * JAVÍTOTT MARKETINGES VERZIÓ.
 * @param {Blob} epubBlob Az eredeti ePub.
 * @param {Blob} newCoverBlob Az új, vízjeles borító (PNG).
 * @param {string} bookCode Az új, beillesztendő kód.
 * @param {string} newCoverFilename Az új borító kívánt fájlneve (pl. "kep.png").
 * @returns {Promise<Blob>} A kész, végleges ePub fájl.
 */
async function processEpubFile(epubBlob, newCoverBlob, bookCode, newCoverFilename) { 
    var zip = new JSZip();
    var loadedZip = await zip.loadAsync(epubBlob);
    
    var zeroWidthId = (typeof encodeIdToZeroWidth === 'function') ? encodeIdToZeroWidth(bookCode) : bookCode;

    // Fájlok szűrése (ES5)
    var allFiles = Object.keys(loadedZip.files);
    var xhtmlFiles = allFiles.filter(function(name) {
        return name.indexOf('.xhtml') !== -1 || name.indexOf('.html') !== -1;
    });
    
    // === MARKETING LINK ÉS QR KÓD ===
    var appUrl = "https://script.google.com/macros/s/AKfycbzZZV2QQ4fOExg_dv0ddkWVEFgNTCXzYtFhWlOs1Kn5R3wUCHDXV7IpE3Kx3DNT53Npbw/exec"; 
    var feedbackLink = appUrl + "?page=marketing&bookId=" + bookCode;
    var qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(feedbackLink);
    
    // HTML Blokk (String összefűzés backtick helyett!)
    var feedbackHtmlBlock = "";
    feedbackHtmlBlock += '<div style="margin-top: 50px; padding: 20px; border-top: 2px solid #ccc; text-align: center; font-family: sans-serif; page-break-before: always;">';
    feedbackHtmlBlock +=    '<hr/>';
    feedbackHtmlBlock +=    '<h3>☠️ Tetszett a zsákmány? ☠️</h3>';
    feedbackHtmlBlock +=    '<p>Oszd meg véleményedet a szerzővel és a készítőkkel!</p>';
    feedbackHtmlBlock +=    '<p>Minden válaszodért <strong>Kalózkreditet</strong> kapsz jutalmul.</p>';
    
    feedbackHtmlBlock +=    '<div style="margin: 20px auto;">';
    feedbackHtmlBlock +=        '<img src="' + qrImageUrl + '" alt="Szkenneld be" style="width: 150px; height: 150px; border: 2px solid #333; padding: 5px;"/>';
    feedbackHtmlBlock +=        '<p><small>Szkenneld be a telefonoddal!</small></p>';
    feedbackHtmlBlock +=    '</div>';

    feedbackHtmlBlock +=    '<p>';
    feedbackHtmlBlock +=        '<a href="' + feedbackLink + '" target="_blank" style="background-color: #8b0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">';
    feedbackHtmlBlock +=            'Vélemény írása a böngészőben';
    feedbackHtmlBlock +=        '</a>';
    feedbackHtmlBlock +=    '</p>';
    feedbackHtmlBlock +=    '<p><small>(Ha az olvasód nem kezeli a böngészőt, használd a fenti kódot)</small></p>';
    feedbackHtmlBlock += '</div>';

    var lastFile = xhtmlFiles[xhtmlFiles.length - 1];

    for (var i = 0; i < xhtmlFiles.length; i++) {
        var fileName = xhtmlFiles[i];
        var content = await loadedZip.file(fileName).async('string');
        
        // Vízjel csere
        content = content.replace(/[\u200b-\u2d0d]/g, ''); 
        // RegExp objektum a változó miatt
        var pRegex = new RegExp('</p>', 'i');
        content = content.replace(pRegex, zeroWidthId + '</p>');
        
        // Marketing blokk
        if (fileName === lastFile) {
            if (content.indexOf('</body>') !== -1) {
                content = content.replace('</body>', feedbackHtmlBlock + '</body>');
            } else {
                content += feedbackHtmlBlock;
            }
        }
        
        loadedZip.file(fileName, content);
    }

    // === HIBRID BORÍTÓAZONOSÍTÁS ÉS CSERE ===
    var oldCoverFullPath = null;
    var opfFile = allFiles.find(function(name) { return name.indexOf('.opf') !== -1; });
    
    if (!opfFile) throw new Error("Hiba: A könyv tartalomjegyzéke (.opf fájl) nem található.");
    
    var opfContent = await loadedZip.file(opfFile).async('string');

    // 1. KÍSÉRLET: cover.xhtml
    var coverXhtmlFile = allFiles.find(function(name) { return name.toLowerCase().indexOf('cover.xhtml') !== -1; });
    if (coverXhtmlFile) {
        var coverXhtmlContent = await loadedZip.file(coverXhtmlFile).async('string');
        var imgSrcRegex = /<img[^>]*src="([^"]+)"/;
        var match = coverXhtmlContent.match(imgSrcRegex);
        if (match && match[1]) {
            oldCoverFullPath = (typeof resolvePath === 'function') ? resolvePath(coverXhtmlFile, match[1]) : match[1];
        }
    }

    // 2. KÍSÉRLET: Manifeszt
    if (!oldCoverFullPath) {
        var coverMetaRegex = /<meta\s+name="cover"\s+content="([^"]+)"\s*\/>/;
        var coverMetaMatch = opfContent.match(coverMetaRegex);
        if (coverMetaMatch && coverMetaMatch[1]) {
            var itemRegex = new RegExp('<item[^>]*id="' + coverMetaMatch[1] + '"[^>]*href="([^"]+)"[^>]*\/>');
            var itemMatch = opfContent.match(itemRegex);
            if (itemMatch && itemMatch[1]) {
                var opfPath = opfFile.substring(0, opfFile.lastIndexOf('/'));
                oldCoverFullPath = (typeof resolvePath === 'function') ? resolvePath(opfPath + '/', itemMatch[1]) : itemMatch[1];
            }
        }
    }

    if (oldCoverFullPath) {
        var oldCoverFilename = oldCoverFullPath.split('/').pop();
        // Regex escape nélkül veszélyes lehet, de feltételezzük a normál fájlnevet
        opfContent = opfContent.replace(new RegExp(oldCoverFilename, "g"), newCoverFilename);
        opfContent = opfContent.replace(/media-type="image\/jpeg"/g, 'media-type="image/png"');
        loadedZip.file(opfFile, opfContent);
        
        if(loadedZip.files[oldCoverFullPath]) {
            loadedZip.remove(oldCoverFullPath);
        }
        
        var pathPrefix = oldCoverFullPath.substring(0, oldCoverFullPath.lastIndexOf('/') + 1);
        loadedZip.file(pathPrefix + newCoverFilename, newCoverBlob);
    } 

    return await loadedZip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
}

// ===================================
// === MARKETING (VÉLEMÉNY) MODUL ===
// ===================================

var currentMarketingBookId = null;
var currentMarketingFolderId = null;

// URL Paraméterek ellenőrzése
function checkUrlParametersForMarketing() {
    google.script.url.getLocation(function(location) {
        if (location.parameter && location.parameter.page === 'marketing') {
            var bookId = location.parameter.bookId;
            var folderId = location.parameter.folderId;
            
            if (bookId && folderId) {
                console.log("Marketing mód észlelve: " + bookId);
                window.pendingMarketingData = { bookId: bookId, folderId: folderId };
                var loginStatus = document.getElementById('login-status');
                // Ellenőrzés, hogy látható-e a login nézet
                var loginView = document.getElementById('login-view');
                if (loginStatus && loginView && loginView.style.display !== 'none') {
                    loginStatus.innerHTML = '<span style="color:#2e8b57; font-weight:bold;">☠️ A zsákmány értékeléséhez és a jutalom átvételéhez kérlek, lépj be!</span>';
                }
            }
        }
    });
}

// Betölti a kérdőívet
function loadMarketingView(bookId, folderId) {
    console.log(">>> loadMarketingView MEGHÍVVA: " + bookId);

    currentMarketingBookId = bookId;
    currentMarketingFolderId = folderId;
    
    // 1. NÉZETEK KEZELÉSE
    document.getElementById('app-view').style.display = 'none'; 
    document.getElementById('login-view').style.display = 'none';
    
    var marketingView = document.getElementById('marketing-view');
    if (marketingView) {
        marketingView.style.display = 'block';
    } else {
        console.error("KRITIKUS HIBA: Nem található a 'marketing-view' div!");
        return;
    }
    
    // 2. TÖLTÉS JELZŐ
    var container = document.getElementById('marketing-questions-area');
    if (container) {
        container.innerHTML = '<div style="text-align:center; padding:50px; color:#555;">' +
                              '<i class="fas fa-spinner fa-spin fa-3x"></i>' +
                              '<p style="margin-top:15px;">Kérdéseink a könyvről...</p>' +
                              '</div>';
    }

    // 3. SZERVER HÍVÁS (callBackend)
    callBackend('getFeedbackFormConfig', [bookId, folderId], // currentUserEmail-t a Router adja hozzá
        function(response) {
             console.log(">>> SZERVER VÁLASZ:", response);
             
             if (response.success) {
                 renderMarketingQuestions(response.config, response.isOwner, bookId, folderId);
             } 
             else if (response.error === "ALREADY_VOTED") {
                 container.innerHTML = '';
                 showSystemModal(
                    "Már szavaztál!", 
                    response.message, 
                    "fas fa-check-double", 
                    [{ 
                        text: "Rendben, vissza a Kikötőbe", 
                        color: "#2e8b57",
                        textColor: "white",
                        callback: function() { returnToPort(); } 
                    }]
                 );
             }
             else {
                 container.innerHTML = ''; 
                 showSystemModal(
                    "Hiba történt", 
                    response.error, 
                    "fas fa-exclamation-triangle", 
                    [{ 
                        text: "Vissza", 
                        callback: function() { returnToPort(); } 
                    }]
                 );
             }
        },
        function(err) {
            console.error(">>> HÁLÓZATI HIBA:", err);
            if (container) container.innerHTML = '';
            showSystemModal(
                "Kapcsolódási Hiba", 
                "Nem sikerült elérni a szervert: " + err.message, 
                "fas fa-wifi", 
                [{ text: "Vissza", callback: function() { returnToPort(); } }]
            );
        }
    );
}

function returnToPort() {
    document.getElementById('marketing-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';
    document.getElementById('header-stats').style.display = 'flex'; 
    document.getElementById('content').style.display = 'block'; 
    
    var contentDiv = document.getElementById('content');
    if (!contentDiv.innerHTML.trim()) {
        loadPage('jogosult_tartalom'); 
    }
}

/**
 * Dinamikusan kirajzolja a kérdéseket.
 * Kétlépcsős folyamat: Ellenőrzés -> Értékelés
 */
function renderMarketingQuestions(config, isOwner, bookId, folderId) {
    console.log(">>> RENDER START. Kapott kérdések:", config.questions);

    var container = document.getElementById('marketing-questions-area');
    if (!container) return;
    container.innerHTML = ''; 

    // --- DOBOZOK ---
    var verifyDiv = document.createElement('div');
    verifyDiv.id = 'verify-section';
    verifyDiv.style.cssText = "background:#fff3e0; padding:20px; border-radius:8px; border:1px solid #ffcc80; margin-bottom:20px;";
    verifyDiv.innerHTML = '<h3 style="margin-top:0; color:#e65100;"><i class="fas fa-shield-alt"></i> 1. Lépés: Olvasottsági Próba</h3>' + 
                          '<p style="margin-bottom:15px; font-style:italic;">Válaszolj helyesen, különben a rendszer visszaküld a kikötőbe!</p>';

    var marketingDiv = document.createElement('div');
    marketingDiv.id = 'marketing-section';
    marketingDiv.style.display = 'none'; 
    marketingDiv.innerHTML = '<h3 style="margin-top:20px; color:#2e8b57; border-top:1px dashed #ccc; padding-top:20px;"><i class="fas fa-star"></i> 2. Lépés: Értékelés</h3>';

    // --- KÉRDÉSEK GENERÁLÁSA ---
    var verifyCount = 0;

    // forEach + function
    config.questions.forEach(function(q) {
        var card = document.createElement('div');
        card.className = 'question-card';
        card.style.cssText = "margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; border: 1px solid #eee;";
        
        var inputHtml = '';
        
        if (q.type === 'rating') {
            inputHtml = '<div class="star-rating">';
            for (var i = 5; i >= 1; i--) {
                inputHtml += '<input type="radio" id="' + q.id + '_' + i + '" name="' + q.id + '" value="' + i + '"><label for="' + q.id + '_' + i + '">★</label>';
            }
            inputHtml += '</div>';
        } 
        else if (q.type === 'yesno') {
            inputHtml = '<div style="margin-top:5px;">' +
                        '<label style="margin-right:15px;"><input type="radio" name="' + q.id + '" value="Igen"> Igen</label>' +
                        '<label><input type="radio" name="' + q.id + '" value="Nem"> Nem</label>' +
                        '</div>';
        } 
        else {
            var correct = q.gatekeeper || ""; 
            // Dataset használata helyett data- attribútum stringben is jó, vagy JS-ből állítva
            inputHtml = '<input type="text" name="' + q.id + '" ' +
                        'data-answer="' + correct + '" ' +
                        'autocomplete="off" ' +
                        'style="width:100%; padding:8px; margin-top:5px; border:1px solid #ccc; border-radius:4px;" ' +
                        'placeholder="Válasz...">';
        }

        card.innerHTML = '<label style="font-weight:bold; display:block; color:#444;">' + q.text + '</label>' + inputHtml;

        if (q.type === 'verify') {
            verifyDiv.appendChild(card);
            verifyCount++;
        } else {
            marketingDiv.appendChild(card);
        }
    });

    // --- VEZÉRLÉS ---
    var submitBtn = document.getElementById('submit-marketing-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    // HA VAN ELLENŐRZŐ KÉRDÉS
    if (verifyCount > 0) {
        var nextBtn = document.createElement('button');
        nextBtn.type = 'button'; 
        nextBtn.className = 'btn';
        nextBtn.innerHTML = 'Ellenőrzés és Tovább <i class="fas fa-arrow-right"></i>';
        nextBtn.style.cssText = "background:#e65100; color:white; margin-top:10px; width:100%; font-weight:bold;";
        
        nextBtn.onclick = function(e) {
            if(e) e.preventDefault(); 
            
            var inputs = verifyDiv.querySelectorAll('input[type="text"]');
            var failed = false;

            // forEach + function
            // NodeList forEach támogatás IE-ben nincs, de modern böngészőben oké. Biztonságosabb lenne Array.from().forEach
            for (var k = 0; k < inputs.length; k++) {
                var input = inputs[k];
                var userAnswer = input.value.trim().toLowerCase();
                var correctAnswer = (input.dataset.answer || "").trim().toLowerCase();
                
                console.log('Ellenőrzés: User="' + userAnswer + '" vs Correct="' + correctAnswer + '"');

                if (userAnswer === '') {
                    failed = true;
                    input.style.border = "2px solid red";
                }
                else if (correctAnswer !== "" && userAnswer.indexOf(correctAnswer) === -1) {
                    failed = true;
                    input.style.border = "2px solid red";
                } 
                else {
                    input.style.border = "1px solid #2e8b57";
                }
            }

            if (failed) {
                showSystemModal(
                    "Hibás válasz!", 
                    "Sajnálom, de az ellenőrző kérdésekre adott válaszaid nem megfelelőek. A rendszer most visszairányít.", 
                    "fas fa-ban", 
                    [{ 
                        text: "Kilépés", 
                        color: "#8b0000",
                        textColor: "white",
                        callback: function() { 
                           document.getElementById('marketing-view').style.display = 'none';
                           returnToPort(); 
                        } 
                    }]
                );
                return; 
            }

            verifyDiv.style.opacity = '0.5'; 
            verifyDiv.style.pointerEvents = 'none';
            nextBtn.style.display = 'none';
            marketingDiv.style.display = 'block'; 
            // scrollIntoView smooth opcióval
            try { marketingDiv.scrollIntoView({behavior: "smooth"}); } catch(e) { marketingDiv.scrollIntoView(); }
            if (submitBtn) submitBtn.style.display = 'inline-block';
        };
        
        verifyDiv.appendChild(nextBtn);
        container.appendChild(verifyDiv);
        container.appendChild(marketingDiv);
        
    } else {
        marketingDiv.style.display = 'block';
        var h3 = marketingDiv.querySelector('h3');
        if(h3) h3.style.display = 'none';
        
        container.appendChild(marketingDiv);
        if (submitBtn) submitBtn.style.display = 'inline-block';
    }
    
    // Szerzői panel
    if (isOwner) {
         var authorPanel = document.createElement('div');
         authorPanel.style.cssText = "margin-bottom: 20px; padding: 15px; background: #e6fffa; border: 2px dashed #319795; text-align: center; border-radius:8px;";
         authorPanel.innerHTML = '<h3 style="margin-top:0; color:#2c7a7b;">✒️ Üdvözlet, Szerző!</h3>' + 
                                 '<button class="btn" style="background:#319795; color:white;" onclick="openAuthorDashboard(\'' + bookId + '\', \'' + folderId + '\', \'A Könyved\')">📊 Statisztikák</button>';
         container.insertBefore(authorPanel, container.firstChild);
    }
}

/**
 * Válaszok összegyűjtése és beküldése.
 */
function submitMarketingForm() {
    var form = document.getElementById('marketing-form');
    var formData = new FormData(form);
    var answers = {};
    
    // FormData iterálás ES5 módon (nem for...of)
    // A modern böngészők támogatják a for...of-ot, de a biztonság kedvéért:
    // Mivel a FormData.entries() iterátort ad, és az IE nem támogatja,
    // a legbiztosabb, ha manuálisan szedjük össze az inputokat, 
    // VAGY bízunk benne, hogy a Chrome/FF futtatja.
    // Javítás: Sima DOM bejárás a form elemein.
    var elements = form.elements;
    var hasAnswer = false;

    for (var i = 0; i < elements.length; i++) {
        var item = elements[i];
        if (item.name && !item.disabled) {
            if (item.type === 'radio') {
                if (item.checked) {
                    answers[item.name] = item.value;
                    hasAnswer = true;
                }
            } else if (item.type === 'text' || item.type === 'textarea') {
                if (item.value.trim() !== "") {
                    answers[item.name] = item.value;
                    hasAnswer = true;
                }
            }
        }
    }
    
    if (!hasAnswer) {
        showSystemModal(
            "Üres a palack?", 
            "Kérlek, válaszolj legalább egy kérdésre, mielőtt a tengerbe dobnád az üzenetet!", 
            "fas fa-exclamation-circle", 
            [{ text: "Rendben", color: "#e65100", textColor: "white" }]
        );
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';
    
    callBackend('submitBookFeedback', [currentMarketingBookId, currentMarketingFolderId, answers], 
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            
            if (res.success) {
                showSystemModal(
                    "Sikeres Küldetés!", 
                    '<div style="text-align:center;">' +
                        '<p style="font-size:1.1em; margin-bottom:15px;">' + res.message + '</p>' +
                        '<p style="color:#2e8b57; font-weight:bold;">+1 Kalózkredit jóváírva!</p>' +
                     '</div>', 
                    "fas fa-gem", 
                    [{ 
                        text: "Kreditek Zsebretétele & Kilépés", 
                        color: "#2e8b57", 
                        textColor: "white",
                        callback: function() { 
                            returnToPort(); 
                            updateCreditDisplay(); 
                        }
                    }]
                );
            } else {
                showSystemModal(
                    "Hiba történt", 
                    "A szerver visszautasította a kérést:<br><b>" + res.error + "</b>", 
                    "fas fa-skull-crossbones", 
                    [{ text: "Megértettem", color: "#8b0000", textColor: "white" }]
                );
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            showSystemModal(
                "Kapcsolódási Hiba", 
                "Nem sikerült elérni a szervert. Ellenőrizd az internetkapcsolatot!<br><small>" + err.message + "</small>", 
                "fas fa-wifi", 
                [{ text: "Rendben", color: "#555", textColor: "white" }]
            );
        }
    );
}

// ===============================================
// === SZERZŐI DASHBOARD FUNKCIÓK MARKETINGHEZ ===
// ===============================================

let currentDashBookId = null;
let currentDashFolderId = null;

// Fülváltó a Dashboardon belül
function openDashboardTab(evt, tabName) {
    var tabs = document.querySelectorAll('#author-dashboard-modal .tab-content');
    for(var i=0; i<tabs.length; i++) { tabs[i].style.display = 'none'; }
    
    var btns = document.querySelectorAll('#author-dashboard-modal .tab-button');
    for(var j=0; j<btns.length; j++) { btns[j].classList.remove('active'); }
    
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

/**
 * Megnyitja a Dashboardot egy adott könyvhöz.
 * @param {string} bookId - A könyv azonosítója (Kódja).
 * @param {string} folderId - A könyv mappájának ID-ja (ahol a JSON van).
 * @param {string} title - A könyv címe (fejléchez).
 */
function openAuthorDashboard(bookId, folderId, title) {
    currentDashBookId = bookId;
    currentDashFolderId = folderId;
    
    document.getElementById('dashboard-book-title').textContent = title + " - Marketing Elemző";
    document.getElementById('author-dashboard-modal').style.display = 'flex';
    document.getElementById('dashboard-loading').style.display = 'block';
    document.getElementById('dashboard-content').style.display = 'none';
    
    // Alaphelyzetbe állítás
    document.querySelector('#author-dashboard-modal .tab-button').click();

    callBackend('getAuthorMarketingStats', [bookId, folderId], 
        renderDashboardStats,
        function(err) {
            document.getElementById('dashboard-loading').innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>';
        }
    );
}

/**
 * Kirajzolja a Dashboard adatait.
 * 1. Feltölti a "Meglévő kérdések" listát a Settings fülön.
 * 2. Kirajzolja a Statisztikákat az Eredmények fülön.
 */
function renderDashboardStats(response) {
    const loadingEl = document.getElementById('dashboard-loading');
    const contentEl = document.getElementById('dashboard-content');
    
    if(loadingEl) loadingEl.style.display = 'none';
    if(contentEl) contentEl.style.display = 'block';

    if (!response.success) {
        const detailsList = document.getElementById('dashboard-details-list');
        if(detailsList) detailsList.innerHTML = `<p style="color:red;">${response.error}</p>`;
        return;
    }

    // === 0. LÉPÉS: VERIFY KÉRDÉSEK ===
    const allQuestions = (response.config && response.config.questions) ? response.config.questions : [];
    const verifyQs = allQuestions.filter(q => q.type === 'verify');

    for (let i = 0; i < 3; i++) {
        const txtInput = document.getElementById('v-q' + (i+1) + '-text');
        const ansInput = document.getElementById('v-q' + (i+1) + '-ans');
        
        if(txtInput && ansInput) {
            if (verifyQs[i]) {
                txtInput.value = verifyQs[i].text || "";
                ansInput.value = verifyQs[i].gatekeeper || ""; 
            } else {
                txtInput.value = "";
                ansInput.value = "";
            }
        }
    }

    // === 1. MEGLÉVŐ KÉRDÉSEK LISTÁZÁSA ===
    const questionsListContainer = document.getElementById('existing-questions-list');
    
    if (questionsListContainer) {
        questionsListContainer.innerHTML = ''; 
        const questions = (response.config && response.config.questions) ? response.config.questions : [];

        if (questions.length === 0) {
            questionsListContainer.innerHTML = '<p style="color:#888;">Nincsenek aktív kérdések.</p>';
        } else {
            const ul = document.createElement('ul');
            ul.style.cssText = "list-style: none; padding: 0; margin: 0;";

            questions.forEach(q => {
                const li = document.createElement('li');
                li.style.cssText = "padding: 8px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;";
                
                let typeIcon = '<i class="fas fa-font" title="Szöveges"></i>';
                if (q.type === 'rating') typeIcon = '<i class="fas fa-star" style="color: gold;" title="Értékelés"></i>';
                if (q.type === 'yesno') typeIcon = '<i class="fas fa-check-circle" style="color: blue;" title="Igen/Nem"></i>';

                li.innerHTML = `
                    <span style="width: 25px; text-align: center;">${typeIcon}</span>
                    <span style="flex-grow: 1; font-weight: 500; color: #333;">${q.text}</span>
                    <span style="font-size: 0.8em; color: #999; background: #eee; padding: 2px 6px; border-radius: 4px;">${q.id}</span>
                `;
                ul.appendChild(li);
            });
            questionsListContainer.appendChild(ul);
        }
    }

    // === 2. STATISZTIKÁK KIRAJZOLÁSA ===
    const stats = response.stats;
    const detailsList = document.getElementById('dashboard-details-list');
    const totalRespEl = document.getElementById('stat-total-responses');

    if (!stats) {
        if(detailsList) detailsList.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">Még nem érkezett válasz az olvasóktól.</p>`;
        if(totalRespEl) totalRespEl.textContent = "0";
        return;
    }

    if(totalRespEl) totalRespEl.textContent = stats.totalResponses;
    if(detailsList) detailsList.innerHTML = '';

    // Modern Object.entries ciklus
    for (const [qId, data] of Object.entries(stats.questions)) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'result-item';
        itemDiv.style.cssText = "margin-bottom: 15px; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #eee;";
        
        let visualHtml = '';

        if (data.type === 'rating') {
            const avg = parseFloat(data.average) || 0; // Biztonságos parszolás
            const percent = (avg / 5) * 100;
            // Biztonságos csillag generálás
            const starCount = Math.round(avg);
            const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
            
            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Átlag: <strong>${avg.toFixed(1)}</strong> / 5</span>
                    <span style="color:#f6e05e;">${stars}</span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${percent}%; background:#ecc94b; height:100%;"></div>
                </div>`;
        } else if (data.type === 'yesno') {
            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Igen válaszok: <strong>${data.yesPercent}%</strong></span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${data.yesPercent}%; background:#4299e1; height:100%;"></div>
                </div>`;
        } else if (data.type === 'text') {
             let answersHtml = (data.answers && data.answers.length > 0) 
                ? data.answers.map(ans => `<div style="background:#f7fafc; padding:8px; border-left:3px solid #cbd5e0; margin-bottom:5px; font-style:italic;">"${ans}"</div>`).join('')
                : '<div style="color:#aaa; font-style:italic;">(Nincs szöveges válasz)</div>';
             visualHtml = `<div style="margin-top:10px;">${answersHtml}</div>`;
        }

        itemDiv.innerHTML = `<div style="font-weight:bold; margin-bottom:10px; color:#2d3748;">${data.label}</div>${visualHtml}`;
        detailsList.appendChild(itemDiv);
    }
}

/**
 * Összeszedi a 3 Verify mezőt és elküldi a szervernek mentésre.
 */
function submitVerificationQuiz() {
    var questionsToSave = [];
    
    for (var i = 1; i <= 3; i++) {
        var text = document.getElementById('v-q' + i + '-text').value.trim();
        var answer = document.getElementById('v-q' + i + '-ans').value.trim();
        
        if (text) {
            if (!answer) {
                showSystemModal("Hiányos adat", i + ". kérdésnél megadtad a kérdést, de hiányzik a helyes válasz!", "fas fa-exclamation-triangle", [{text:"Rendben"}]);
                return;
            }
            questionsToSave.push({ text: text, answer: answer });
        }
    }

    if (questionsToSave.length === 0) {
        showSystemModal("Üres űrlap", "Legalább egy ellenőrző kérdést meg kell adnod!", "fas fa-exclamation-triangle", [{text:"Rendben"}]);
        return;
    }

    var btn = document.querySelector('#verification-quiz-form button');
    var originalText = btn.innerHTML;
    btn.innerText = "Mentés folyamatban...";
    btn.disabled = true;

    callBackend('saveVerificationQuiz', [currentDashBookId, currentDashFolderId, questionsToSave], 
        function(res) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            if (res.success) {
                showSystemModal("Siker", "Az ellenőrző kérdések frissültek!", "fas fa-check-circle", [{text:"Rendben", color: "#276749", textColor: "white"}]);
            } else {
                showSystemModal("Hiba", "Mentési hiba: " + res.error, "fas fa-times-circle", [{text:"Bezárás"}]);
            }
        },
        function(err) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            showSystemModal("Szerverhiba", err.message, "fas fa-wifi", [{text:"Bezárás"}]);
        }
    );
}

function submitNewQuestion() {
    var text = document.getElementById('nq-text').value;
    var type = document.getElementById('nq-type').value;
    var category = document.getElementById('nq-category').value;
    var isGame = document.getElementById('nq-isgame').checked;

    if (!text) { uiAlert("Add meg a kérdés szövegét!"); return; }

    var newQuestion = {
        id: 'custom_' + Date.now(), 
        type: type,
        text: text,
        category: category,
        isGame: isGame,
        min: 1, max: 5 
    };

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('addCustomQuestion', [currentDashBookId, currentDashFolderId, newQuestion], 
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert("Kérdés hozzáadva! A következő olvasó már látni fogja.");
                document.getElementById('new-question-form').reset();
            } else {
                uiAlert("Hiba: " + res.error);
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba: " + err.message);
        }
    );
}

// =============
// == KINCSEK ==
// =============

function initializeKincsekPage(response) {
    if (!response || !response.success) {
        var errorMessage = response ? response.error : "Ismeretlen hiba történt a szerverrel való kommunikáció során.";
        var sheetElement = document.querySelector('.character-sheet');
        if(sheetElement){
             sheetElement.innerHTML = '<h2>Hiba a karakteradatok betöltésekor</h2><p style="color:red; font-size: 0.9em; margin-top: 15px;"><b>Részletek:</b> ' + errorMessage + '</p>';
        } else {
             console.error("Hiba: A '.character-sheet' elem nem található a DOM-ban.");
             var contentDiv = document.getElementById('content');
             if(contentDiv) contentDiv.innerHTML = '<p style="color:red;">Hiba a karakterlap megjelenítésekor.</p>';
        }
        return;
    }

    var data = response.data;

    var nameEl = document.getElementById('char-sheet-name');
    if (nameEl) nameEl.innerText = document.querySelector('.header-title').innerText;

    var kreditEl = document.getElementById('char-sheet-kredit');
    if (kreditEl) kreditEl.innerText = data.kredit;

    var hartyaEl = document.getElementById('char-sheet-hartya');
    if (hartyaEl) hartyaEl.innerText = data.hartya;

    var talentumEl = document.getElementById('char-sheet-talentum');
    if (talentumEl) talentumEl.innerText = data.talentum;

    var letkristalyEl = document.getElementById('char-sheet-letkristaly');
    if (letkristalyEl) letkristalyEl.innerText = data.letkristaly;

    var konyvEl = document.getElementById('char-sheet-konyv');
    if (konyvEl) konyvEl.innerText = data.konyv;

    var masolatEl = document.getElementById('char-sheet-masolat');
    if (masolatEl) masolatEl.innerText = data.masolat;

    var tekercsEl = document.getElementById('char-sheet-tekercs');
    if (tekercsEl) tekercsEl.innerText = data.tekercs;

    var terkepEl = document.getElementById('char-sheet-terkep');
    if (terkepEl) terkepEl.innerText = data.terkep;

    var kristalykonyvEl = document.getElementById('char-sheet-kristalykonyv');
    if (kristalykonyvEl) kristalykonyvEl.innerText = data.kristalykonyv;

    var vitorlasEl = document.getElementById('char-sheet-vitorlas');
    if (vitorlasEl) vitorlasEl.innerText = data.vitorlas;

    var csonakEl = document.getElementById('char-sheet-csonak');
    if (csonakEl) csonakEl.innerText = data.csonak;

    var meruloEl = document.getElementById('char-sheet-merulo');
    if (meruloEl) meruloEl.innerText = data.merulo;

    var leghajoEl = document.getElementById('char-sheet-leghajo');
    if (leghajoEl) leghajoEl.innerText = data.leghajo;

    var rankNameEl = document.getElementById('char-sheet-rank-name');
    if (rankNameEl) rankNameEl.innerText = data.rang;

    var rankImgElement = document.getElementById('char-sheet-rank-img');
    if(rankImgElement){
        rankImgElement.alt = data.rang;
        if (data.rang_kep_data && data.rang_kep_data.data) {
            rankImgElement.src = 'data:' + data.rang_kep_data.mime + ';base64,' + data.rang_kep_data.data;
        } else {
            rankImgElement.src = ""; 
        }
    }

    // A feltétel maradhat (kliens oldali ellenőrzésnek jó), de a hívásból kivesszük!
    if (currentUserEmail && data.rang) {
        console.log('[initializeKincsekPage] Rang frissítésének indítása: ' + currentUserEmail + ', ' + data.rang);
        
        // --- JAVÍTOTT callBackend ---
        // Csak a [data.rang]-ot küldjük! Az emailt a Router intézi.
        callBackend('updatePlayerRank', [data.rang], 
            function(){}, // Siker esetén csendben maradunk
            function(error) {
                console.error('!!! HIBA a rang szerveroldali frissítésekor: ' + error.message);
            }
        );
    } else {
        console.warn("[initializeKincsekPage] Figyelmeztetés: Hiányzó currentUserEmail vagy data.rang a rangfrissítéshez.");
    }
}

// ==========================
// === TITKOSÍTÁS SEGÉDEK ===
// ==========================

// Relatív és valós útvonal összefűzése
function resolvePath(basePath, relativePath) {
    var baseParts = basePath.split('/');
    var relativeParts = relativePath.split('/');
    
    baseParts.pop(); 
    
    // for...of helyett sima for ciklus
    for (var i = 0; i < relativeParts.length; i++) {
        var part = relativeParts[i];
        if (part === '..') {
            baseParts.pop(); 
        } else if (part !== '.') {
            baseParts.push(part); 
        }
    }
    return baseParts.join('/');
}

// LSB Vízjelezés Borítóképnél (Async marad, de szintaxis tisztítás)
function embedIdInImage(imageFile, id) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          var binaryId = '';
          for (var i = 0; i < id.length; i++) {
            // padStart helyett manuális kiegészítés
            var bin = id[i].charCodeAt(0).toString(2);
            while (bin.length < 8) bin = "0" + bin;
            binaryId += bin;
          }
          binaryId += "11111111"; 

          var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          var data = pixelData.data;

          if (binaryId.length > (data.length / 4) * 3) {
             return reject(new Error("A kép túl kicsi az azonosító elrejtéséhez."));
          }
          
          var dataIndex = 0;
          for (var j = 0; j < binaryId.length; j++) {
            var bit = binaryId[j];
            
            while ((dataIndex + 1) % 4 === 0) {
              dataIndex++;
            }
            
            if (dataIndex >= data.length) {
                return reject(new Error("Hiba a vízjel írása közben: a kép mérete nem elegendő."));
            }
            
            var oldValue = data[dataIndex];
            data[dataIndex] = (bit === '1') ? (oldValue | 1) : (oldValue & 254);
            
            dataIndex++;
          }
          
          ctx.putImageData(pixelData, 0, 0);
          
          var finalDataURL = canvas.toDataURL('image/png');
          console.log("DEBUG: Vízjelezett kép kész."); 
          
          resolve(finalDataURL);
        };
        img.onerror = function(err) { reject(new Error("A képfájl nem tölthető be. Lehet, hogy sérült.")); };
        img.src = event.target.result;
      };
      reader.onerror = function(err) { reject(new Error("A fájl olvasása sikertelen.")); };
      reader.readAsDataURL(imageFile);
    });
}

// nulla széles titkos kód
function encodeIdToZeroWidth(id) {
    var binaryId = '';
    for (var i = 0; i < id.length; i++) {
        var bin = id[i].charCodeAt(0).toString(2);
        while (bin.length < 8) bin = "0" + bin;
        binaryId += bin;
    }
    var zeroWidthCode = '';
    for (var j = 0; j < binaryId.length; j++) {
        var bit = binaryId[j];
        zeroWidthCode += (bit === '0') ? '\u200b' : '\u200c';
    }
    return zeroWidthCode + '\u200d'; 
}

// Jelszó láthatóság
var togglePassword = document.querySelector('#togglePassword');
var passwordInput = document.querySelector('#jelszo');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function (e) {
        var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
} else {
    console.warn("A jelszó láthatóság kapcsoló elemei (ikon vagy input) nem találhatóak!");
}

// ==========================
// === HAJÓNAPLÓ FUNKCIÓK ===
// ==========================

var MIN_LOG_RANK = 'Fregattkapitány'; 

function checkRankAndOpenLogModal() {
    console.log("Rang ellenőrzése és napló ID lekérése a naplóíráshoz...");
    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. LÉPÉS: Rang ellenőrzése
    callBackend('getCharacterSheetData', [], 
        function(rankResponse) {
            if (!rankResponse.success || !rankResponse.data || !rankResponse.data.rang) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Hiba a rangod ellenőrzésekor: " + (rankResponse.error || "Ismeretlen hiba"));
                return;
            }
            
            // 2. LÉPÉS: Írási jogosultság és Napló ID
            callBackend('checkLogWritePermission', [], 
                function(logId) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    console.log("checkLogWritePermission válasz: " + logId);
                    
                    if (logId && typeof logId === 'string') {
                        console.log("Napló ID rendben (" + logId + "), modal megnyitása.");
                        openLogEntryModal(); 
                    } else {
                        uiAlert("Hiba: Nem sikerült előkészíteni a hajónaplót.");
                        console.error("checkLogWritePermission érvénytelen válasz:", logId);
                    }
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert("Hiba: " + err.message);
                    console.error("checkLogWritePermission hiba:", err);
                }
            );
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Szerverhiba a rang ellenőrzésekor: " + err.message);
            console.error("getCharacterSheetData hiba:", err);
        }
    );
}

function openLogEntryModal(entryId, logIdForContext) {
    if (typeof entryId === 'undefined') entryId = 'last';
    
    var modal = document.getElementById('log-entry-modal');
    var form = document.getElementById('log-entry-form');
    var title = document.getElementById('log-modal-title');
    var entryIdInput = document.getElementById('log-entry-id');
    var statusDiv = document.getElementById('log-entry-status');
    var imagePreview = document.getElementById('log-image-preview');
    var imageInput = document.getElementById('log-image');
    var prevBtn = document.getElementById('log-prev-btn');
    var nextBtn = document.getElementById('log-next-btn');
    var submitBtn = document.getElementById('submit-log-entry-btn');

    form.reset();
    imagePreview.innerHTML = '';
    statusDiv.textContent = '';
    entryIdInput.value = '';
    document.getElementById('log-entry-splash-text').style.display = 'none';
    prevBtn.style.visibility = 'hidden';
    nextBtn.style.visibility = 'hidden';
    prevBtn.onclick = null;
    nextBtn.onclick = null;

    imageInput.onchange = function(event) {
        var file = event.target.files[0];
        imagePreview.innerHTML = '';
        if (file && file.type === "image/png") {
             var reader = new FileReader();
             reader.onload = function(e) {
                 var img = document.createElement('img');
                 img.src = e.target.result;
                 imagePreview.appendChild(img);
             };
             reader.readAsDataURL(file);
        } else if (file) {
             uiAlert("Csak PNG formátumú kép csatolható!");
             imageInput.value = '';
        }
    };

    var newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', submitLogEntry);

    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. Log ID lekérése (Ismétlés a biztonságért)
    callBackend('checkLogWritePermission', [], 
        function(currentLogId) {
            if (!currentLogId || typeof currentLogId !== 'string') {
                 document.getElementById('loading-overlay').style.display = 'none';
                 uiAlert("Hiba: Nem található az írható hajónapló azonosítója.");
                 closeLogEntryModal();
                 return;
            }

            // 2. Bejegyzés lekérése
            callBackend('getLogEntry', [currentLogId, entryId || 'last'], // currentUserEmail-t a Router adja
                function(entry) {
                    document.getElementById('loading-overlay').style.display = 'none';

                    if (entry.error) {
                        uiAlert("Hiba a bejegyzés betöltésekor: " + entry.error);
                        closeLogEntryModal();
                        return;
                    }

                    window.currentLogEntryData = entry; 

                    if (entryId === null || entry.id === null) {
                        // === ÚJ BEJEGYZÉS ===
                        title.textContent = 'Új Hajónapló Bejegyzés';
                        entryIdInput.value = ''; 
                        var now = new Date();
                        var year = now.getFullYear();
                        var month = ("0" + (now.getMonth() + 1)).slice(-2);
                        var day = ("0" + now.getDate()).slice(-2);
                        var hours = ("0" + now.getHours()).slice(-2);
                        var minutes = ("0" + now.getMinutes()).slice(-2);
                        
                        document.getElementById('log-date').value = year + '-' + month + '-' + day;
                        document.getElementById('log-time').value = hours + ':' + minutes;
                        getGeoLocation(true);

                        if (entry.prevId) { 
                            prevBtn.style.visibility = 'visible';
                            prevBtn.onclick = function() { openLogEntryModal(entry.prevId); };
                        } else if (window.currentLogEntryData && window.currentLogEntryData.id) {
                             prevBtn.style.visibility = 'visible';
                             prevBtn.onclick = function() { openLogEntryModal(window.currentLogEntryData.id); };
                        }
                        nextBtn.style.visibility = 'hidden';

                    } else {
                        // === SZERKESZTÉS ===
                        title.textContent = 'Hajónapló Bejegyzés Szerkesztése';
                        entryIdInput.value = entry.id || '';
                        document.getElementById('log-date').value = entry.date || '';
                        document.getElementById('log-time').value = entry.time || '';
                        document.getElementById('log-wind').value = entry.wind || '';
                        document.getElementById('log-weather').value = entry.weather || '';
                        document.getElementById('log-lat').value = entry.latitude || '';
                        document.getElementById('log-lon').value = entry.longitude || '';
                        document.getElementById('log-report').value = entry.report || '';

                        if (entry.imageId) {
                            imagePreview.innerHTML = '<p><small><i>Kép csatolva. Új kép feltöltése felülírja.</i></small></p>';
                        }

                        if (entry.prevId) {
                            prevBtn.style.visibility = 'visible';
                            prevBtn.onclick = function() { openLogEntryModal(entry.prevId); };
                        } else {
                            prevBtn.style.visibility = 'hidden';
                        }

                        if (entry.nextId) {
                            nextBtn.style.visibility = 'visible';
                            nextBtn.onclick = function() { openLogEntryModal(entry.nextId); };
                        } else {
                            nextBtn.style.visibility = 'visible';
                            nextBtn.textContent = 'Új Bejegyzés >';
                            nextBtn.onclick = function() { openLogEntryModal(null); };
                        }
                    }

                    modal.style.display = 'flex';
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert("Szerverhiba a bejegyzés lekérésekor: " + err.message);
                    closeLogEntryModal();
                }
            );
        },
        function(err) {
             document.getElementById('loading-overlay').style.display = 'none';
             uiAlert("Hiba a napló előkészítésekor: " + err.message);
             closeLogEntryModal();
        }
    );
}

function closeLogEntryModal() {
    var modal = document.getElementById('log-entry-modal');
    if (modal) modal.style.display = 'none';
}

function getGeoLocation(silentMode) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                document.getElementById('log-lat').value = position.coords.latitude.toFixed(4);
                document.getElementById('log-lon').value = position.coords.longitude.toFixed(4);
            },
            function(error) {
                var message = "Hiba a pozíció lekérésekor: " + error.message;
                console.warn(message);
                if (!silentMode) {
                    uiAlert(message + "\nKérlek, add meg manuálisan a koordinátákat.");
                }
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
    } else {
        var message = "A böngésződ nem támogatja a helymeghatározást.";
        console.warn(message);
        if (!silentMode) {
            uiAlert(message);
        }
    }
}

// Async maradhat, mert a képfeldolgozáshoz kell
async function submitLogEntry() {
    var form = document.getElementById('log-entry-form');
    var statusDiv = document.getElementById('log-entry-status');
    var submitBtn = document.getElementById('submit-log-entry-btn');
    var entryIdInput = document.getElementById('log-entry-id'); 
    
    statusDiv.textContent = '';
    submitBtn.disabled = true;

    var entryData = {
        date: document.getElementById('log-date').value,
        time: document.getElementById('log-time').value,
        wind: document.getElementById('log-wind').value,
        weather: document.getElementById('log-weather').value,
        latitude: document.getElementById('log-lat').value,
        longitude: document.getElementById('log-lon').value,
        report: document.getElementById('log-report').value,
        imageBase64: null,
        id: entryIdInput.value || null
    };

    if (!entryData.date || !entryData.time) {
        statusDiv.textContent = 'A dátum és idő megadása kötelező!';
        submitBtn.disabled = false;
        return;
    }
     if (!entryData.report.trim()) {
        statusDiv.textContent = 'A napi jelentés kitöltése kötelező!';
        submitBtn.disabled = false;
        return;
    }

    var imageInput = document.getElementById('log-image');
    var file = imageInput.files[0];

    document.getElementById('loading-overlay').style.display = 'flex';

    try {
        if (file) {
            var fileReader = new FileReader();
            var dataUrl = await new Promise(function(resolve, reject) {
                 fileReader.onload = function(e) { resolve(e.target.result); };
                 fileReader.onerror = function(e) { reject(new Error("Hiba a képfájl olvasása közben.")); };
                 fileReader.readAsDataURL(file);
            });
            var pngDataUrl = await convertToPngDataUrl(dataUrl);
            entryData.imageBase64 = pngDataUrl.split(',')[1];
        }

        console.log("Mentésre küldött adatok:", entryData); 
        
        // callBackend hívás
        callBackend('saveLogEntry', [entryData], 
            function(response) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                if (response.success) {
                    uiAlert("Bejegyzés sikeresen mentve!");
                    closeLogEntryModal();
                } else {
                    statusDiv.textContent = "Hiba mentéskor: " + response.error;
                    console.error("Mentési hiba:", response.error);
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                statusDiv.textContent = "Szerverhiba: " + err.message;
                console.error("Szerverhiba mentéskor:", err);
            }
        );

    } catch (error) {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = "Hiba a kép feldolgozása közben: " + error.message;
        console.error("Képfeldolgozási hiba:", error);
    }
}

function toggleLogSplash() {
    var splashText = document.getElementById('log-entry-splash-text');
    if (splashText) {
        splashText.style.display = (splashText.style.display === 'none') ? 'block' : 'none';
    }
}

function showLogPublishingSection(logId, gdocId) {
    var section = document.getElementById('log-publish-section');
    if (!section) {
        console.error("Hiba: A 'log-publish-section' HTML elem nem található!");
        return;
    }
    
    // Backtick helyett string összefűzés
    var gdocUrl = 'https://docs.google.com/document/d/' + gdocId + '/edit';

    section.style.display = 'block';
    document.getElementById('log-publish-id-display').textContent = logId;
    document.getElementById('log-publish-id-hidden').value = logId; 
    document.getElementById('log-publish-step1').style.display = 'none'; 
    document.getElementById('log-publish-step2').style.display = 'block'; 
    document.getElementById('log-publish-gdoc-link').href = gdocUrl;
    document.getElementById('log-publish-pin').value = '';
    document.getElementById('log-publish-status').textContent = '';

    var submitBtn = document.getElementById('log-publish-submit-btn');
    
    // Klónozással eltávolítjuk a régi listenereket
    var newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.onclick = function() {
        if (this.disabled) return;
        var pinCode = document.getElementById('log-publish-pin').value;
        var statusDiv = document.getElementById('log-publish-status');

        if (!pinCode) {
            statusDiv.textContent = "A PIN kód megadása kötelező!";
            statusDiv.className = 'msg-error';
            return;
        }

        this.disabled = true;
        this.textContent = 'Szentelés folyamatban...';
        document.getElementById('loading-overlay').style.display = 'flex';
        statusDiv.textContent = '';

        callBackend('publishEditedLogbook', [gdocId, pinCode, logId], 
            function(response) {
                document.getElementById('loading-overlay').style.display = 'none';
                newSubmitBtn.disabled = false;
                newSubmitBtn.textContent = 'Véglegesítés és Szentelés';
                if (response.success) {
                    uiAlert("Sikeres kiadás! A naplód könyvként és másolatokként is elérhető a Könyvtáradban.");
                    section.style.display = 'none'; 
                    updateCreditDisplay(); 
                } else {
                    statusDiv.textContent = "Hiba a szenteléskor: " + response.error;
                    statusDiv.className = 'msg-error';
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                newSubmitBtn.disabled = false;
                newSubmitBtn.textContent = 'Véglegesítés és Szentelés';
                statusDiv.textContent = "Szerverhiba: " + err.message;
                statusDiv.className = 'msg-error';
            }
        ); 
    };
}

// ===================== NPC INTERFÉSZEK =====================================

// === UNIVERZÁLIS MEGJELENÍTŐ ===

var ACTIVE_NPC_CONFIG = {}; 

function openUniversalNPC(npcId, config) {
    var modal = document.getElementById('universal-npc-modal');
    var modalContent = modal.querySelector('.gamemode-modal-content');
    var portraitPanel = document.getElementById('npc-portrait-panel');
    var portraitImg = document.getElementById('npc-portrait-image');
    
    // 1. Állapot mentése
    document.getElementById('current-npc-id').value = npcId;
    // Globális változóba mentjük, hogy elérhető legyen máshol is
    window.currentNPCConfig = config || {}; 
    ACTIVE_NPC_CONFIG = window.currentNPCConfig;

    config = ACTIVE_NPC_CONFIG; 
    var name = config.name || 'NPC';
    var role = config.role || '';
    var icon = config.icon || '👤';
    var headerColor = config.headerColor || '#333';

    document.getElementById('npc-name').innerText = name;
    document.getElementById('npc-role').innerText = role;
    document.getElementById('npc-icon').innerHTML = icon;
    document.getElementById('npc-header').style.backgroundColor = headerColor;

    modal.style.cssText = "display: flex; z-index: 100; background: rgba(0,0,0,0.5);";
    modalContent.style.cssText = ""; 
    modalContent.className = "gamemode-modal-content";

    // 4. PORTRÉ KEZELÉS
    portraitPanel.className = 'npc-portrait-closed';
    portraitImg.src = '';

    if (config.portrait) {
        portraitImg.src = config.portrait;
        
        setTimeout(function() {
            portraitPanel.className = 'npc-portrait-open';
            if (config.styles && config.styles.content && config.styles.content.height === '100%') {
                portraitPanel.style.height = '100%';
            } else {
                portraitPanel.style.height = '80vh'; 
            }
        }, 100);
    }

    if (config.styles) {
        if (config.styles.modal) {
            for (var key in config.styles.modal) { modal.style[key] = config.styles.modal[key]; }
        }
        if (config.styles.content) {
            for (var k in config.styles.content) { modalContent.style[k] = config.styles.content[k]; }
        }
    }

    var chatArea = document.getElementById('universal-chat-area');
    chatArea.innerHTML = ''; 
    
    var input = document.getElementById('universal-chat-input');
    if (input) {
        input.value = '';
        input.disabled = false;
        input.placeholder = name + " figyel...";
    }

    modal.style.display = 'flex';
    
    // callBackend használata
    callBackend('handleNPCInteraction', [npcId, "", "INIT", null], handleUniversalResponse);
}

function sendUniversalMessage() {
    var input = document.getElementById('universal-chat-input');
    var msg = input.value.trim();
    if (!msg) return;

    var npcId = document.getElementById('current-npc-id').value;
    
    addBubbleToUniversal("Te", msg, "outgoing");
    input.value = '';
    input.disabled = true;

    var chatArea = document.getElementById('universal-chat-area');
    var loaderId = "load-" + Date.now();
    var loader = document.createElement('div');
    loader.id = loaderId;
    loader.style.cssText = "font-style: italic; color: #666; margin: 5px 15px;";
    
    if (ACTIVE_NPC_CONFIG.loaderHTML) {
        loader.innerHTML = ACTIVE_NPC_CONFIG.loaderHTML; 
    } else {
        var npcName = document.getElementById('npc-name').innerText;
        loader.innerText = npcName + " gondolkodik...";
    }
    
    chatArea.appendChild(loader);
    chatArea.scrollTop = chatArea.scrollHeight;

    callBackend('handleNPCInteraction', [npcId, msg, "CHAT"], 
        function(response) {
            var l = document.getElementById(loaderId);
            if(l) l.remove();
            input.disabled = false;
            input.focus();
            handleUniversalResponse(response);
        },
        function(err) {
            var l = document.getElementById(loaderId);
            if(l) l.remove();
            input.disabled = false;
            addBubbleToUniversal("Rendszer", "Hiba: " + err.message, "system");
        }
    );
}

function addBubbleToUniversal(sender, text, type) {
    var chatArea = document.getElementById('universal-chat-area');
    var div = document.createElement('div');
    var config = window.currentNPCConfig || {}; 

    div.style.padding = "10px 15px";
    div.style.borderRadius = "10px";
    div.style.maxWidth = "80%";
    div.style.lineHeight = "1.4";
    div.style.marginBottom = "8px";
    div.style.boxShadow = "1px 1px 3px rgba(0,0,0,0.3)"; 
    div.style.wordWrap = "break-word"; 

    if (type === "incoming") { 
        div.style.background = "#ffffff";
        div.style.color = "#000000";
        div.style.alignSelf = "flex-start";
        
        var borderColor = config.headerColor || "#37474f"; 
        div.style.borderLeft = "5px solid " + borderColor;

        var iconHtml = "";
        if (config.msgIcon) {
            iconHtml = config.msgIcon + " "; 
        }

        var formattedText = text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); 

        div.innerHTML = '<strong>' + sender + ':</strong><br><div style="margin-top:4px;">' + iconHtml + formattedText + '</div>';

    } else if (type === "outgoing") { 
        div.style.background = "#d4af37"; 
        div.style.color = "#3e2723"; 
        div.style.fontWeight = "bold";
        div.style.alignSelf = "flex-end";
        div.style.marginLeft = "auto";
        div.style.textAlign = "right";
        div.innerHTML = text.replace(/\n/g, '<br>');

    } else { 
        div.style.background = "transparent";
        div.style.boxShadow = "none";
        div.style.color = "#ccc"; 
        div.style.fontStyle = "italic";
        div.style.textAlign = "center";
        div.style.margin = "0 auto";
        div.style.fontSize = "0.85em";
        div.innerHTML = text;
    }

    chatArea.appendChild(div);
    
    setTimeout(function() {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
}

function adjustColorBrightness(col, amt) {
    if (col[0] !== "#") return col;
    var num = parseInt(col.slice(1),16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return "#" + (0x1000000 + (newColor<0?0:newColor>0xFFFFFF?0xFFFFFF:newColor)).toString(16).slice(1);
}

// === SZERVER VÁLASZ FELDOLGOZÁSA ===
function handleUniversalResponse(response) {
    var chatArea = document.getElementById('universal-chat-area');
    console.log("Szerver válasz érkezett:", response); 

    if (!response) {
        console.error("Hiba: A szerver üres választ küldött!");
        addBubbleToUniversal("System", "Hiba: A szerver nem küldött adatot. (Null Response)", "system");
        return;
    }

    if (response.text) {
        addBubbleToUniversal(response.sender || "NPC", response.text, "incoming");
    }

    var buttons = response.buttons || response.actions || [];
    
    if (buttons.length > 0) {
        var btnContainer = document.createElement('div');
        btnContainer.className = "npc-response-buttons"; 
        btnContainer.style.display = "flex";
        btnContainer.style.flexWrap = "wrap";
        btnContainer.style.gap = "8px";
        btnContainer.style.justifyContent = "center";
        
        buttons.forEach(function(btn) {
            var wrapper = document.createElement('div');
            wrapper.className = 'tooltip-wrapper'; 
            wrapper.style.display = "flex";
            wrapper.style.flex = "1 1 auto"; 

            var b = document.createElement('button');
            b.className = 'btn'; 
            b.style.cssText = "width: 100%; flex: 1 1 auto; font-size: 0.9em; white-space: normal; padding: 8px;";
            
            if (btn.action === 'PAY_FOR_INFO' || (btn.text && btn.text.indexOf('Kr') > -1)) {
                b.style.border = "1px solid #ffd700"; 
                b.style.backgroundColor = "#444"; 
                b.style.color = "#ffd700"; 
            }

            b.innerHTML = btn.text || btn.label || "Gomb";
            
            b.onclick = function() {
                if(btnContainer.parentNode) btnContainer.parentNode.removeChild(btnContainer);
                else btnContainer.remove();
                handleNPCButtonAction(btn);
            };
            
            if (btn.tooltipImage || btn.tooltip) {
                var popup = document.createElement('div');
                popup.className = 'tooltip-popup';
                var popupHTML = "";
                if (btn.tooltipImage) {
                    popupHTML += '<img src="' + btn.tooltipImage + '" alt="Info" onerror="this.style.display=\'none\'">';
                }
                if (btn.tooltip) {
                    popupHTML += '<p>' + btn.tooltip + '</p>';
                }
                popup.innerHTML = popupHTML;
                wrapper.appendChild(popup); 
            }

            wrapper.appendChild(b); 
            btnContainer.appendChild(wrapper); 
        });
        
        chatArea.appendChild(btnContainer);
        setTimeout(function() { chatArea.scrollTop = chatArea.scrollHeight; }, 50);
    }
}

// === UNIVERZÁLIS GOMBKEZELŐ ===
function handleNPCButtonAction(btn) {
    console.log("Gomb megnyomva:", btn);

    var buttonContainer = document.getElementById('universal-button-area');
    if (buttonContainer) buttonContainer.innerHTML = '';

    if (btn.action === 'CLIENT_FN') {
        var fnName = btn.payload;
        if (typeof window[fnName] === 'function') {
            window[fnName](); 
        } else {
            console.error("Hiba: A '" + fnName + "' függvény nem létezik.");
        }
        return; 
    }

    if (btn.action && btn.action.indexOf('CLIENT_REQ_PIN') === 0) {
        var parts = btn.action.split('|'); 
        var funcName = parts[1]; 
        var modalTitle = parts[2] || "Biztonsági Ellenőrzés"; 
        var params = parts.slice(3); 
        var npcId = document.getElementById('current-npc-id').value;

        requestPin(function(pinCode) {
            addBubbleToUniversal("Én", "(Adat megadva: ****)", "outgoing");
            
            var loaderId = "pin-load-" + Date.now();
            var chatArea = document.getElementById('universal-chat-area');
            var loader = document.createElement('div');
            loader.id = loaderId;
            loader.style.cssText = "color:#888; font-style:italic; margin:5px 15px;";
            loader.innerText = "Feldolgozás...";
            chatArea.appendChild(loader);
            chatArea.scrollTop = chatArea.scrollHeight;

            callBackend('handleNPCInteraction', [npcId, pinCode, "EXECUTE_PIN_ACTION", { func: funcName, args: params }], 
                function(response) {
                    var l = document.getElementById(loaderId);
                    if(l) l.remove();
                    handleUniversalResponse(response);
                },
                function(err) {
                    var l = document.getElementById(loaderId);
                    if(l) l.remove();
                    addBubbleToUniversal("Rendszer", "Hiba: " + err.message, "system");
                }
            );

        }, '<strong>' + modalTitle + '</strong>');
        
        return; 
    }

    var userBubbleText = "";
    if (btn.reply) {
        userBubbleText = btn.reply;
    } else if (btn.action === 'CHAT') {
        userBubbleText = (typeof btn.payload === 'string') ? btn.payload : btn.text;
    } else {
        userBubbleText = btn.text;
    }

    if (userBubbleText) {
        addBubbleToUniversal("Én", userBubbleText, "outgoing");
    }

    var actionType = btn.action;
    var extraData = btn.payload; 

    if (typeof extraData === 'string' && extraData.indexOf('{') === 0) {
        try { extraData = JSON.parse(extraData); } catch(e) {}
    }

    triggerUniversalServerAction(actionType, extraData);
}

function triggerUniversalServerAction(actionType, extraData) {
    var npcId = document.getElementById('current-npc-id').value;
    var chatArea = document.getElementById('universal-chat-area');

    var loaderId = "loader-" + Date.now();
    var loader = document.createElement('div');
    loader.id = loaderId;
    loader.style.cssText = "font-style: italic; color: #888; font-size: 0.8em; margin: 5px 15px;";
    loader.innerText = "Hogy is mondjam...";
    chatArea.appendChild(loader);
    chatArea.scrollTop = chatArea.scrollHeight; 

    callBackend('handleNPCInteraction', [npcId, "", actionType, extraData], 
        function(response) {
            var l = document.getElementById(loaderId);
            if(l) l.remove();
            handleUniversalResponse(response);          
        },
        function(err) {
            var l = document.getElementById(loaderId);
            if(l) l.remove();
            addBubbleToUniversal("Rendszer", "Hiba történt: " + err.message, "system");
        }
    );
}

function triggerNPCPayment(amount) {
    var npcId = document.getElementById('current-npc-id').value;
    addBubbleToUniversal("Te", "Itt a pénz (" + amount + " Kr).", "outgoing");
    
    callBackend('handleNPCInteraction', [npcId, "", "PAY_FOR_INFO", {cost: amount}], 
        handleUniversalResponse,
        function(err){
            addBubbleToUniversal("System", "Tranzakciós hiba: " + err.message, "system");
        }
    );
}

// Enter támogatás
var univInput = document.getElementById('universal-chat-input');
if (univInput) {
    univInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") sendUniversalMessage();
    });
}

// ================================= UNIVERZÁLIS NPC VEZÉRLŐ VÉGE ====================================

// Segédfüggvény a harmonikához
function toggleAccordionPanel() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

// ... (előző kódok vége) ...

// === WINDOW ONLOAD (INDÍTÁS) ===
window.onload = function() {
    console.log(">>> OLLDAL BETÖLTVE. Rendszer indítása...");

    // 1. AUTOMATIKUS BELÉPÉS
    try {
        console.log("1. Auto-login indítása...");
        if (typeof checkSession === 'function') {
            checkSession();
        } else {
            console.error("HIBA: A checkSession függvény nem létezik!");
        }
    } catch (e) {
        console.error("KRITIKUS HIBA az Auto-login során:", e);
    }

    // 2. HARMONIKA GOMBOK (Accordion)
    try {
        var acc = document.getElementsByClassName("accordion-button");
        if (acc.length > 0) {
            for (var i = 0; i < acc.length; i++) {
                acc[i].removeEventListener("click", toggleAccordionPanel); 
                acc[i].addEventListener("click", toggleAccordionPanel);
            }
            console.log("2. Harmonika gombok beállítva.");
        }
    } catch (e) {
        console.warn("Hiba a harmonika gomboknál (nem kritikus):", e);
    }

    // 3. MARKETING URL
    try {
        if (typeof checkUrlParametersForMarketing === 'function') {
            checkUrlParametersForMarketing();
        }
    } catch (e) {
        console.warn("Marketing hiba:", e);
    }

    // 5. === MONK PIN KÓD LÁTHATÓSÁGA ===
    try {
        var monkPinToggle = document.getElementById('monk-pin-toggle');
        var monkPinInput = document.getElementById('monk-pin-input');

        if (monkPinToggle && monkPinInput) {
            monkPinToggle.addEventListener('click', function (e) {
                var type = monkPinInput.getAttribute('type') === 'password' ? 'text' : 'password';
                monkPinInput.setAttribute('type', type);
                this.classList.toggle('fa-eye');
                this.classList.toggle('fa-eye-slash');
            });
            console.log("5. Monk PIN gomb beállítva.");
        } else {
            console.warn("A Monk PIN mező vagy az ikon nem található.");
        }
    } catch(e) {
        console.warn("Monk PIN hiba:", e);
    }

    console.log(">>> Minden rendszer kész.");
};

// Segédfüggvény a harmonikához (KÍVÜL HAGYJUK, hogy globális legyen)
function toggleAccordionPanel() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

/* SCRIPT VÉGE - BIZTONSÁGI LEZÁRÁS */
console.log("EOF");
