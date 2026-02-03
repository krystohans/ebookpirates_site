// Core frontend helpers extracted from index.html
// NOTE: Follow project rule: no template literals in client-side code.

// 1. GLOBÁLIS VÁLTOZÓK DEFINÍCIÓJA
var currentUserEmail = "";       // Az aktuális felhasználó
var currentLogEntryData = null;  // Hajónapló szerkesztéshez
const MAP_COPY_COST = 30;        // Konstans: másolás ára

function callBackend(funcName, params, onSuccess, onFailure) {
    var token = localStorage.getItem('ebookPiratesToken');
    if (!token) token = null;

    google.script.run
        .withSuccessHandler(onSuccess)
        .withFailureHandler(function(error) {
            console.error("API Hiba (" + funcName + "):", error);

            if (error.message && error.message.indexOf("AUTH_ERROR") !== -1) {
                alert("⚠️ A munkamenet lejárt!\n\n" +
                      "Hogy NE vesszen el a munkád:\n" +
                      "1. Nyiss egy ÚJ LAPOT a böngészőben!\n" +
                      "2. Lépj be ott újra!\n" +
                      "3. Gyere ide vissza, és kattints újra a gombra!\n\n" +
                      "(NE frissítsd ezt az oldalt, mert akkor minden beírt adat törlődik!)");
            }

            if (onFailure) onFailure(error);
        })
        .apiRouter(token, funcName, params);
}

function login() {
    document.getElementById('login-status').innerText = "Ellenőrzés...";
    const registerButtonContainer = document.getElementById('registerButtonContainer');
    registerButtonContainer.innerHTML = ''; 

    const formData = { 
        name: document.getElementById('name').value, 
        jelszo: document.getElementById('jelszo').value 
    };

    callBackend('performLogin', [formData], 
        function(response) {
            if (response && response.success) {
                localStorage.setItem('ebookPiratesToken', response.token); 
                initializeApp(response.user);
            } else {
                document.getElementById('login-status').innerText = response.message;

                const registerButton = document.createElement('button');
                registerButton.id = 'registerButton';
                registerButton.type = 'button';
                registerButton.innerText = 'Regisztrálás';
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
    currentUserEmail = user.email;
    document.querySelector('.header-title').innerText = user.name;
    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';

    updateCreditDisplay();
    preloadLoadingGif();

    document.getElementById('creditCell').onclick = updateCreditDisplay;
    document.getElementById('libraryLink').onclick = function() { loadPage('konyvtar'); };
    document.getElementById('treasuresLink').onclick = function() { loadPage('kincsek'); };

    if (window.pendingMarketingData) {
        console.log("Marketing átirányítás aktiválva...");
        loadMarketingView(window.pendingMarketingData.bookId, window.pendingMarketingData.folderId);
        window.pendingMarketingData = null;
    } else {
        if (user.startPage) {
             loadPage(user.startPage);
        } else {
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
    if(typeof currentUserEmail !== 'undefined') currentUserEmail = '';
    const creditVal = document.getElementById('creditValue');
    if(creditVal) creditVal.innerText = '0';
}

function preloadLoadingGif() {
    console.log("GIF előtöltése indult...");
    callBackend('getCentralImageAsset', ['download'], 
        function(imageData) {
            if (imageData && imageData.data) {
                var gifElement = document.getElementById('loading-gif');
                if(gifElement) {
                    var mime = imageData.mime || 'image/gif';
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

document.addEventListener('DOMContentLoaded', function() {
    preloadLoadingGif();
});

function updateCreditDisplay() {
    if (!currentUserEmail) return;
    var el = document.getElementById('creditValue');
    if(el) el.innerText = 'Töltés...';
    callBackend('getPirateCredit', [], 
        function(credit) {
            if(el) el.innerText = credit;
        },
        function(error) {
            if(el) el.innerText = 'Hiba!';
        }
    );
}
