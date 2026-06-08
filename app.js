// Core frontend helpers extracted from index.html
// NOTE: Follow project rule: no template literals in client-side code.
// FIGYELMEZTETĂ‰S: NEM Ă­rok asszisztenskĂ©nt a kĂłdba, csak a chat ablakon keresztĂĽl adok alternatĂ­vĂˇt! A kĂłd minden esetben csak manuĂˇlisan mĂłdosĂ­thatĂł!

// 1. GLOBĂLIS VĂLTOZĂ“K DEFINĂŤCIĂ“JA
var currentUserEmail = "";       // Az aktuĂˇlis felhasznĂˇlĂł
var currentLogEntryData = null;  // HajĂłnaplĂł szerkesztĂ©shez
var currentPageName = "";        // Az aktuĂˇlisan betoltott oldal neve
const MAP_COPY_COST = 30;        // Konstans: mĂˇsolĂˇs Ăˇra

function getSiteLang() {
    if (typeof localStorage === 'undefined') {
        return 'hu';
    }
    return localStorage.getItem('siteLang') || 'hu';
}

function getPageHtmlUrl(pageName) {
    if (!pageName) {
        return "index.html";
    }
    var cleanName = pageName;
    if (cleanName.indexOf('.html') === -1) {
        cleanName = cleanName + '.html';
    }
    return cleanName;
}

/**
 * Ez a fĂĽggvĂ©ny vĂ©gzi a kommunikĂˇciĂłt a Google Apps Script Backenddel.
 * KIZĂRĂ“LAG a GitHub/KĂĽlsĹ‘ kĂ¶rnyezetben hasznĂˇld!
 * ROBUSZTUS BACKEND HĂŤVĂ“ - JSON VADĂSZ MĂ“DDAL đźŹą
 * KĂ©pes kezelni, ha a Google HTML "szemetet" (fejlĂ©cet/hibaĂĽzenetet) kĂĽld a JSON helyett/mellett.
 */
function handleBackendPayload(payload, funcName, onSuccess, onFailure) {
    var data = parseJsonFromText(payload.text);
    if (data === null || typeof data === 'undefined') {
        if (payload.status >= 200 && payload.status < 300 && funcName === 'updatePlayerRank') {
            if (onSuccess) {
                onSuccess({ success: true });
            }
            return;
        }
        var raw = String(payload.text || '').replace(/\s+/g, ' ').trim();
        var snippet = raw.substring(0, 240);
        throw new Error("Invalid JSON response (" + funcName + "): " + snippet);
    }

    data = translateBackendResponse(data);

    if (data && data.error) {
        var errorObj = new Error(data.error);
        errorObj.details = data.details || "";
        throw errorObj;
    }

    if (payload.status >= 200 && payload.status < 300) {
        if (onSuccess) {
            onSuccess(data);
        }
        return;
    }

    var errorMessage = data.error || data.message || ("HTTP " + payload.status);
    errorMessage = translateBackendText(errorMessage);
    var httpError = new Error(errorMessage);
    httpError.response = data;
    throw httpError;
}

function handleBackendError(error, onFailure) {
    if (onFailure) {
        onFailure(error);
        return;
    }

    var statusDiv = document.getElementById('status') || document.getElementById('login-status');
    if (statusDiv) {
        statusDiv.innerText = t('comm_error_prefix') + error.message;
        statusDiv.style.color = "red";
    }
}

function uploadChunksSequentially(funcName, payloadString, token, onSuccess, onFailure) {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyj9yi2WuDSb63Kgknpr9n8sGbtBVWuI295_bxrTONYlmlidgFkyB2HcxGYRCHyIpNf/exec";
    var CHUNK_SIZE = 1024 * 1024 * 2; // 2 MB
    var totalChunks = Math.ceil(payloadString.length / CHUNK_SIZE);
    var transferId = 'CHUNK_' + new Date().getTime() + '_' + Math.floor(Math.random() * 1000);
    
    var currentChunk = 0;
    
    function setLocalStatus(msg) {
        console.log("đź“¦ " + msg);
        var modalTextLocal = document.getElementById('modal-status-text');
        if (modalTextLocal) modalTextLocal.textContent = msg;
        var statusDiv = document.getElementById('status') || document.getElementById('login-status');
        if (statusDiv) {
            statusDiv.innerText = msg;
            statusDiv.style.color = "blue";
        }
    }
    
    function sendNextChunk() {
        if (currentChunk >= totalChunks) {
            setLocalStatus('FĂˇjlok szerveroldali Ă¶sszefĹ±zĂ©se folyamatban (' + totalChunks + ' adag)...');
            fetch(WEB_APP_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain;charset=utf-8" },
                body: JSON.stringify({
                    action: 'assembleChunkedPayload',
                    data: [transferId, funcName],
                    token: token
                })
            }).then(function (response) {
                return response.text().then(function (text) {
                    return { status: response.status, text: text };
                });
            }).then(function (payload) {
                handleBackendPayload(payload, funcName, onSuccess, onFailure);
            }).catch(function (error) {
                handleBackendError(error, onFailure);
            });
            return;
        }
        
        var chunkData = payloadString.substring(currentChunk * CHUNK_SIZE, (currentChunk + 1) * CHUNK_SIZE);
        setLocalStatus('Nagy fĂˇjl feltĂ¶ltĂ©se... (' + (currentChunk + 1) + '/' + totalChunks + ' adag)');
        
        fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: 'receivePayloadChunk',
                data: [transferId, currentChunk, totalChunks, chunkData],
                token: token
            })
        }).then(function(r){ return r.text(); }).then(function(text){
            var res = null;
            try { res = JSON.parse(text); } catch(e) {}
            if (res && res.success) {
                currentChunk++;
                sendNextChunk();
            } else {
                var err = new Error(res ? res.error : "Adag feltĂ¶ltĂ©si hiba.");
                handleBackendError(err, onFailure);
            }
        }).catch(function(error) {
            handleBackendError(error, onFailure);
        });
    }
    
    sendNextChunk();
}

function callBackend(funcName, params, onSuccess, onFailure) {
    // A TE DEPLOYMENT URL-ED (EllenĹ‘rizd, hogy a legfrissebb legyen!)
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyj9yi2WuDSb63Kgknpr9n8sGbtBVWuI295_bxrTONYlmlidgFkyB2HcxGYRCHyIpNf/exec";

    var token = localStorage.getItem('ebookPiratesToken');

    var requestPayloadString = JSON.stringify({ action: funcName, data: params, token: token });
    
    // LIMIT: 2 MB. E felett automatikusan bekapcsol az adagolĂł (Chunked Upload)!
    var CHUNK_SIZE = 1024 * 1024 * 2;
    if (requestPayloadString.length > CHUNK_SIZE) {
        uploadChunksSequentially(funcName, requestPayloadString, token, onSuccess, onFailure);
        return;
    }

    console.log("đź“ˇ KĂ©rĂ©s indĂ­tĂˇsa: " + funcName);

    fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: requestPayloadString
    })
        .then(function (response) {
            return response.text().then(function (text) {
                return {
                    status: response.status,
                    text: text
                };
            });
        })
        .then(function (payload) {
            handleBackendPayload(payload, funcName, onSuccess, onFailure);
        })
        .catch(function (error) {
            if (error.message && error.message.includes('Failed to fetch')) {
                var isLongProcess = ['initiateGDocSzenteles', 'finalizeUpload', 'initiateUpgradeProcess', 'finalizeTranslation', 'uploadCoverAndFinishTask'].includes(funcName);
                if (isLongProcess) {
                    console.warn("LĂˇtszĂłlagos hĂˇlĂłzati megszakadĂˇs (Failed to fetch). A hĂˇttĂ©rfolyamat valĂłszĂ­nĹ±leg sikeresen fut tovĂˇbb.");
                    if (onFailure) {
                        onFailure(new Error("A szerver vĂˇlaszideje lejĂˇrt, de a kĂ¶nyvszentelĂ©s/mĹ±velet a hĂˇttĂ©rben valĂłszĂ­nĹ±leg sikeresen lefut. KĂ©rjĂĽk, frissĂ­tsd az oldalt nĂ©hĂˇny perc mĂşlva!"));
                    } else {
                        handleBackendError(new Error("A szerver vĂˇlaszideje lejĂˇrt, de a kĂ¶nyvszentelĂ©s a hĂˇttĂ©rben valĂłszĂ­nĹ±leg sikeresen lefut. FrissĂ­ts pĂˇr perc mĂşlva!"), null);
                    }
                    return;
                }
            }
            handleBackendError(error, onFailure);
        });
}

function translateBackendResponse(value) {
    return translateBackendValue(value);
}

function translateBackendValue(value) {
    if (typeof value === 'string') {
        return translateBackendText(value);
    }

    if (!value || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        var mappedArray = new Array(value.length);
        for (var i = 0; i < value.length; i++) {
            mappedArray[i] = translateBackendValue(value[i]);
        }
        return mappedArray;
    }

    var mappedObject = {};
    for (var key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            mappedObject[key] = translateBackendValue(value[key]);
        }
    }
    return mappedObject;
}

function translateBackendText(text) {
    if (!text || typeof text !== 'string') {
        return text;
    }

    if (typeof translations === 'undefined' || typeof currentLang === 'undefined') {
        return text;
    }

    if (currentLang === 'hu' || !translations.hu) {
        return text;
    }

    var huDict = translations.hu;
    var targetDict = translations[currentLang] || {};
    var enDict = translations.en || {};

    function getBestLocalizedValue(key) {
        if (targetDict[key]) {
            return targetDict[key];
        }
        if (enDict[key]) {
            return enDict[key];
        }
        if (huDict[key]) {
            return huDict[key];
        }
        return null;
    }

    for (var key in huDict) {
        if (Object.prototype.hasOwnProperty.call(huDict, key)) {
            if (huDict[key] === text) {
                var exactValue = getBestLocalizedValue(key);
                if (exactValue) {
                    return exactValue;
                }
            }
        }
    }

    var bestKey = null;
    var bestLength = 0;
    for (var prefixKey in huDict) {
        if (Object.prototype.hasOwnProperty.call(huDict, prefixKey)) {
            var huPrefix = huDict[prefixKey];
            if (getBestLocalizedValue(prefixKey) && text.indexOf(huPrefix) === 0 && huPrefix.length > bestLength) {
                bestKey = prefixKey;
                bestLength = huPrefix.length;
            }
        }
    }

    if (bestKey) {
        return getBestLocalizedValue(bestKey) + text.substring(bestLength);
    }

    return text;
}

function parseJsonFromText(text) {
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (err) {
        // continue
    }

    var start = -1;
    var depth = 0;
    var inString = false;
    var escaped = false;

    for (var i = 0; i < text.length; i++) {
        var ch = text.charAt(i);

        if (inString) {
            if (escaped) {
                escaped = false;
                continue;
            }
            if (ch === '\\') {
                escaped = true;
                continue;
            }
            if (ch === '"') {
                inString = false;
            }
            continue;
        }

        if (ch === '"') {
            inString = true;
            continue;
        }

        if (ch === '{') {
            if (depth === 0) {
                start = i;
            }
            depth++;
            continue;
        }

        if (ch === '}') {
            if (depth > 0) {
                depth--;
                if (depth === 0 && start !== -1) {
                    var candidate = text.substring(start, i + 1);
                    try {
                        return JSON.parse(candidate);
                    } catch (err2) {
                        start = -1;
                    }
                }
            }
        }
    }

    return null;
}

function login() {
    // 1. UI ElĹ‘kĂ©szĂ­tĂ©se
    document.getElementById('login-status').innerText = t('login_status_checking');
    const registerButtonContainer = document.getElementById('registerButtonContainer');
    registerButtonContainer.innerHTML = '';

    // 2. Adatok begyĹ±jtĂ©se
    const formData = {
        name: document.getElementById('name').value,
        jelszo: document.getElementById('jelszo').value
    };

    // 3. HĂ­vĂˇs a callBackend-en keresztĂĽl
    callBackend('performLogin', [formData],
        function (response) {
            if (response && response.success) {
                localStorage.setItem('ebookPiratesToken', response.token);
                try {
                    sessionStorage.setItem('ebookPiratesLoginName', formData.name || '');
                    sessionStorage.setItem('ebookPiratesLoginPass', formData.jelszo || '');
                } catch (storageError) {
                    console.warn('Nem sikerĂĽlt ideiglenesen menteni a login adatokat.', storageError);
                }
                initializeApp(response.user);
            } else {
                document.getElementById('login-status').innerText = response.message;

                // HibĂˇs login -> RegisztrĂˇciĂł felkĂ­nĂˇlĂˇsa
                const registerButton = document.createElement('button');
                registerButton.id = 'registerButton';
                registerButton.type = 'button'; // Fontos, hogy ne submitolja a formot
                registerButton.innerText = t('login_register_button');
                // Ide a TE Web App URL-ed kerĂĽljĂ¶n, ha van kĂĽlĂ¶n regisztrĂˇciĂłs linked
                registerButton.onclick = function () { window.open('https://krystohans.github.io/ebookpirates_site/GitHubSite/regisztracio/', '_blank'); };
                registerButtonContainer.appendChild(registerButton);
            }
        },
        function (error) {
            document.getElementById('login-status').innerText = t('error_prefix') + error.message;
        }
    );
}

function initializeApp(user) {
    currentUserEmail = user.email; // ElmentjĂĽk, de a hĂ­vĂˇsokhoz nem kell kĂĽldeni!
    document.querySelector('.header-title').innerText = user.name;
    ensureCreditDisplayIsPresent();

    document.getElementById('login-view').style.display = 'none';
    document.getElementById('app-view').style.display = 'flex';

    updateCreditDisplay();
    preloadLoadingGif();

    // EsemĂ©nykezelĹ‘k
    document.getElementById('creditCell').onclick = updateCreditDisplay;
    document.getElementById('libraryLink').onclick = function () { loadPage('konyvtar'); };
    document.getElementById('treasuresLink').onclick = function () { loadPage('kincsek'); };

    // --- MARKETING ĂTIRĂNYĂŤTĂS ---
    if (window.pendingMarketingData) {
        console.log("Marketing ĂˇtirĂˇnyĂ­tĂˇs aktivĂˇlva...");
        loadMarketingView(window.pendingMarketingData.bookId, window.pendingMarketingData.folderId);
        window.pendingMarketingData = null;
    } else {
        // NormĂˇl irĂˇnyĂ­tĂˇs
        if (user.startPage) {
            loadPage(user.startPage); // A backend mondja meg (tutorial vagy jogosult)
        } else {
            // Fallback: ha a backend valamiĂ©rt nem kĂĽld startPage-et
            loadPage('tutorial_oldal');
        }
    }
}

function checkSession() {
    const token = localStorage.getItem('ebookPiratesToken');

    if (token) {
        callBackend('getUserDataByToken', [token],
            function (user) {
                var isValidUser = !!(user && user.email && user.name && user.isValid === true);
                if (isValidUser) {
                    console.log("Sikeres visszatĂ©rĂ©s:", user.name);
                    initializeApp(user);
                } else {
                    console.warn("A token lejĂˇrt vagy Ă©rvĂ©nytelen.");
                    localStorage.removeItem('ebookPiratesToken');
                    document.getElementById('app-view').style.display = 'none';
                    document.getElementById('login-view').style.display = 'block';
                }
            },
            function (err) {
                console.warn("Session check hiba:", err);
                localStorage.removeItem('ebookPiratesToken');
                document.getElementById('app-view').style.display = 'none';
                document.getElementById('login-view').style.display = 'block';
            }
        );
    } else {
        console.log("Nincs mentett token, login szĂĽksĂ©ges.");
    }
}

// ==========================================
// === LOGOUT (MARAD AZ EREDETI) ===
// ==========================================

function logout() {
    sessionStorage.removeItem('ebookPiratesToken');
    localStorage.removeItem('ebookPiratesToken');
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'block';

    const loginStatus = document.getElementById('login-status');
    if (loginStatus) loginStatus.innerText = "";

    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.reset();

    const regContainer = document.getElementById('registerButtonContainer');
    if (regContainer) regContainer.innerHTML = '';

    // GlobĂˇlis vĂˇltozĂłk nullĂˇzĂˇsa (ha vannak)
    if (typeof currentUserEmail !== 'undefined') currentUserEmail = '';

    const creditVal = document.getElementById('creditValue');
    if (creditVal) creditVal.innerText = '0';
}

/**
 * Returns information about the client's operating system and capabilities.
 */
function getClientOsInfo() {
    var ua = (navigator && navigator.userAgent) ? navigator.userAgent : '';
    var platform = (navigator && navigator.platform) ? navigator.platform : 'unknown';
    var osType = 'PC';

    if (/Android/i.test(ua)) {
        osType = 'ANDROID';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
        osType = 'IOS';
    } else if (/Windows/i.test(ua)) {
        osType = 'WINDOWS';
    } else if (/Mac/i.test(ua)) {
        osType = 'MAC';
    } else if (/Linux/i.test(ua)) {
        osType = 'LINUX';
    }

    return {
        osType: osType,
        platform: platform,
        userAgent: ua,
        touch: !!(('ontouchstart' in window) || (navigator && navigator.maxTouchPoints > 0))
    };
}

/**
 * Builds the full URL to launch the Unity game with necessary parameters.
 */
function buildUnityLaunchUrl(baseUrl, mode, token) {
    var loginName = '';
    var loginPass = '';

    try {
        loginName = sessionStorage.getItem('ebookPiratesLoginName') || '';
        loginPass = sessionStorage.getItem('ebookPiratesLoginPass') || '';
    } catch (e) {
        loginName = '';
        loginPass = '';
    }

    var osInfo = getClientOsInfo();
    var sep = (baseUrl.indexOf('?') === -1) ? '?' : '&';
    var launchUrl = baseUrl + sep +
        'mode=' + encodeURIComponent(mode || 'tutorial') +
        '&email=' + encodeURIComponent(currentUserEmail || '') +
        '&loginName=' + encodeURIComponent(loginName) +
        '&password=' + encodeURIComponent(loginPass) +
        '&os=' + encodeURIComponent(osInfo.osType) +
        '&platform=' + encodeURIComponent(osInfo.platform) +
        '&touch=' + encodeURIComponent(osInfo.touch ? '1' : '0');

    if (token) {
        launchUrl += '&gameStateToken=' + encodeURIComponent(token);
    }

    return launchUrl;
}

/**
 * Placeholder for launching the fishing mini-game.
 */
function launchGame() {
    // TODO: Implement this function to launch the Unity game for fishing.
    uiAlert("HĂˇrtya halĂˇszat hamarosan...");
}

// === BETĂ–LTĂ‰S Ă‰S UI ===

function preloadLoadingGif() {
    console.log("GIF beĂˇllĂ­tĂˇsa helyi forrĂˇsbĂłl...");

    var gifElement = document.getElementById('loading-gif');
    if (gifElement) {
        gifElement.src = 'assets/download.gif';
        console.log("GIF beĂˇllĂ­tva (Backend hĂ­vĂˇs nĂ©lkĂĽl).");
    }
}

// IndĂ­tĂˇs, amikor a HTML kĂ©sz
document.addEventListener('DOMContentLoaded', function () {
    preloadLoadingGif();
});

function updateCreditDisplay() {
    if (!currentUserEmail) return; // Csak biztonsĂˇgi check kliens oldalon
    document.getElementById('creditValue').innerText = t('credit_loading');

    // ĂśRES TĂ–MB a paramĂ©ter, mert a Backend automatikusan megkapja az Emailt!
    callBackend('getPirateCredit', [],
        function (credit) {
            document.getElementById('creditValue').innerText = credit;
        },
        function (error) {
            document.getElementById('creditValue').innerText = t('credit_error');
        }
    );
}

function ensureCreditDisplayIsPresent() {
    if (!document.getElementById('creditValue')) {
        console.warn("Hiba: A 'creditValue' HTML elem nem talĂˇlhatĂł a fejlĂ©cben!");
    }
}
/**
 * KĂ–ZPONTI OLDALBETĂ–LTĹ
 * JAVĂŤTVA: Nem kĂĽldjĂĽk az emailt, csak az oldal nevĂ©t!
 */
function loadPage(pageName) {
    currentPageName = pageName;
    document.getElementById('content').style.display = 'block';
    // document.getElementById('marketing-view').style.display = 'none'; // Ha van ilyen div
    document.getElementById('header-stats').style.display = 'flex';

    const contentDiv = document.getElementById('content');
    const loadingOverlay = document.getElementById('loading-overlay');

    contentDiv.innerHTML = '';
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    fetch(getPageHtmlUrl(pageName), { cache: 'no-cache' })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('HTTP ' + response.status);
            }
            return response.text();
        })
        .then(function (htmlText) {
            contentDiv.innerHTML = htmlText;

            if (typeof updateLanguageUI === 'function') {
                updateLanguageUI();
            }
            if (typeof bindLanguageButtons === 'function') {
                bindLanguageButtons();
            }

            callBackend('getPageDataAndContent', [pageName],
                function (result) {
                    var pageData = (result && result.pageData) ? result.pageData : {};
                    const pagesWithSplash = ['fedelzet_oldal', 'hajomuhely_oldal', 'kikoto_oldal', 'piac_oldal', 'tekercsmester_oldal', 'masolatok_oldal', 'taverna_oldal', 'konyvszentely_oldal', 'felhokolostor_oldal', 'konyvtar', 'kincsek'];

                    if (pageName === 'tutorial_oldal') {
                        runTutorialScript();
                    } else if (pageName === 'konyvszentely_oldal') {
                        initializePage(pageName);
                        if (typeof initializeKonyvszentely === 'function') initializeKonyvszentely();
                    } else if (pageName === 'felhokolostor_oldal') {
                        initializePage(pageName);
                        if (typeof refreshMonasteryWork === 'function') refreshMonasteryWork();
                    } else if (pageName === 'konyvtar') {
                        initializePage(pageName);
                        if (typeof initializeLibraryAndMapPage === 'function') initializeLibraryAndMapPage(pageData);
                    } else if (pageName === 'tekercsmester_oldal') {
                        initializePage(pageName);
                        if (typeof initializeTekercsmesterPage === 'function') initializeTekercsmesterPage(pageData);
                    } else if (pageName === 'piac_oldal') {
                        initializePage(pageName);
                        if (typeof initializePiacOldal === 'function') initializePiacOldal();
                    } else if (pageName === 'masolatok_oldal') {
                        initializePage(pageName);
                        if (typeof initializeMasolatokAndCopyMapPage === 'function') initializeMasolatokAndCopyMapPage(pageData);
                    } else if (pageName === 'taverna_oldal') {
                        initializePage(pageName);
                        if (typeof initializeTavernaPage === 'function') initializeTavernaPage();
                    } else if (pageName === 'hajomuhely_oldal') {
                        initializePage(pageName);
                        if (typeof initShipyard === 'function') initShipyard();
                    } else if (pageName === 'kincsek') {
                        initializePage(pageName);
                        if (typeof initializeKincsekPage === 'function') initializeKincsekPage(pageData);
                    } else if (pageName === 'uj_konyv_bevitel') {
                        if (typeof initializeUploadForm === 'function') {
                            initializeUploadForm();
                        } else {
                            console.error("HIBA: initializeUploadForm nincs definiĂˇlva!");
                        }
                    } else if (pagesWithSplash.includes(pageName)) {
                        initializePage(pageName);
                    }

                    setupAccordionListeners();
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                },
                function (error) {
                    contentDiv.innerHTML = '<p>' + t('page_load_error_prefix') + error.message + '</p>';
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                }
            );
        })
        .catch(function (error) {
            contentDiv.innerHTML = '<p>' + t('page_load_error_prefix') + error.message + '</p>';
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        });
}

function reloadCurrentPageForLanguage() {
    if (!currentPageName) {
        return;
    }
    var appView = document.getElementById('app-view');
    if (!appView || appView.style.display === 'none') {
        return;
    }
    loadPage(currentPageName);
}

// ==========================================
// === ACCORDION KEZELĂ‰S (EREDETI) ===
// ==========================================

/**
 * BeĂˇllĂ­tja az esemĂ©nykezelĹ‘ket az Ă¶sszes accordion gombhoz az oldalon.
 */
function setupAccordionListeners() {
    const acc = document.querySelectorAll(".accordion-button");
    acc.forEach(button => {
        button.removeEventListener('click', toggleAccordionPanel);
        button.addEventListener('click', toggleAccordionPanel);
    });
}

/**
 * Az accordion gombra kattintĂˇskor lefutĂł esemĂ©nykezelĹ‘.
 */
function toggleAccordionPanel() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null; // BezĂˇrĂˇs
    } else {
        // KinyitĂˇs: a BELSĹ tartalom magassĂˇgĂˇt hasznĂˇljuk + nĂ©mi padding
        const content = panel.querySelector('.accordion-panel-content');
        // BiztonsĂˇgi ellenĹ‘rzĂ©s, ha nincs belsĹ‘ content div
        const scrollHeight = content ? content.scrollHeight : panel.scrollHeight;
        panel.style.maxHeight = (scrollHeight + 30) + "px";
    }
}

// ==========================================
// === SPLASH SCREEN / OLDAL LĂTOGATĂS ===
// ==========================================

/**
 * EllenĹ‘rzi, hogy a felhasznĂˇlĂł lĂˇtta-e mĂˇr az adott oldalt.
 * Ha igen -> Tartalom megjelenĂ­tĂ©se.
 * Ha nem -> Splash (InfĂł) kĂ©pernyĹ‘ megjelenĂ­tĂ©se.
 */
function initializePage(pageName) {
    // callBackend hasznĂˇlata (emailt a router intĂ©zi)
    callBackend('getPageStatus', [pageName],
        function (status) {
            const splash = document.getElementById(pageName + '-splash');
            const content = document.getElementById(pageName + '-content');

            if (!splash || !content) {
                console.warn(`Hiba: Nem talĂˇlhatĂłk a HTML elemek ehhez: ${pageName}`);
                return;
            }

            var normalizedStatus = String(status || '').trim().toLowerCase();
            if (normalizedStatus === 'ok') {
                splash.style.display = 'none';
                content.style.display = 'block';
            } else {
                splash.style.display = 'block';
                content.style.display = 'none';
            }
        },
        function (err) {
            console.error("Hiba a getPageStatus hĂ­vĂˇskor:", err);
            const splash = document.getElementById(pageName + '-splash');
            const content = document.getElementById(pageName + '-content');
            if (splash && content) {
                splash.style.display = 'block';
                content.style.display = 'none';
            }
        }
    );
}

/**
 * A "MegĂ©rtettem" gomb hĂ­vja: rĂ¶gzĂ­ti a lĂˇtogatĂˇst Ă©s vĂˇlt a tartalomra.
 */
function markPageAsSeen(pageName) {
    const splash = document.getElementById(pageName + '-splash');
    const content = document.getElementById(pageName + '-content');

    if (!splash || !content) return;

    // Azonnali UI vĂˇltĂˇs (hogy gyorsnak tĹ±njĂ¶n)
    splash.style.display = 'none';
    content.style.display = 'block';

    // HĂˇttĂ©rben mentĂ©s callBackend-del
    callBackend('setPageStatus', [pageName],
        function (res) { console.log(`${pageName} lĂˇtogatĂˇs rĂ¶gzĂ­tve.`); },
        function (err) { console.warn("Hiba a stĂˇtusz mentĂ©sekor:", err); }
    );
}

/**
 * KĂ©zzel visszahozza a Splash kĂ©pernyĹ‘t (az "InfĂł" gomb).
 * Nem mĂłdosĂ­t adatbĂˇzist, csak UI vĂˇltĂˇs.
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
    console.log('runTutorialScript() FĂśGGVĂ‰NY ELINDULT (Unity + fallback verziĂł).');

    var currentQuestionIndex = 0;
    var questionTextEl = document.getElementById('question-text');
    var optionsContainer = document.getElementById('options-container');
    var feedbackEl = document.getElementById('feedback-text');
    var submitBtn = document.getElementById('submit-btn');
    var unityLaunchTimeoutId = null;
    var unityTargetUrl = '';
    var currentFlowState = null;
    var localTutorialQuestions = [];

    function getLocalTutorialQuestionsForLang(siteLang) {
        var normalized = String(siteLang || 'hu').toLowerCase();
        if (normalized.indexOf('-') > -1) {
            normalized = normalized.split('-')[0];
        }

        var questionMap = {
            hu: [
                { question: 'Mi a neve a jĂˇtĂ©kban hasznĂˇlatos fizetĹ‘eszkĂ¶znek?', options: ['Arany', 'KalĂłzkredit', 'GyĂ¶ngy', 'Dublon'], correctAnswer: 'KalĂłzkredit' },
                { question: 'Hol tudsz Ăşj kĂĽldetĂ©seket felvenni?', options: ['A piacon', 'A szentĂ©lyben', 'A kocsmĂˇban', 'A tekercsmesternĂ©l'], correctAnswer: 'A kocsmĂˇban' },
                { question: 'Mire hasznĂˇlhatod a letkristĂˇlyokat?', options: ['Ăšj hajĂł vĂˇsĂˇrlĂˇsĂˇra', 'A kĂ¶nyvek fejlesztĂ©sĂ©re', 'Azonnali utazĂˇsra', 'A jutalĂ©k csĂ¶kkentĂ©sĂ©re'], correctAnswer: 'A kĂ¶nyvek fejlesztĂ©sĂ©re' }
            ],
            en: [
                { question: 'What is the name of the main currency used in the game?', options: ['Gold', 'Pirate Credit', 'Pearl', 'Doubloon'], correctAnswer: 'Pirate Credit' },
                { question: 'Where can you take new quests?', options: ['At the market', 'At the shrine', 'At the tavern', 'At the scroll master'], correctAnswer: 'At the tavern' },
                { question: 'What can spirit crystals be used for?', options: ['Buying a new ship', 'Upgrading books', 'Instant travel', 'Reducing commission'], correctAnswer: 'Upgrading books' }
            ],
            de: [
                { question: 'Wie heiĂźt die wichtigste WĂ¤hrung im Spiel?', options: ['Gold', 'Piratenkredit', 'Perle', 'Dublone'], correctAnswer: 'Piratenkredit' },
                { question: 'Wo kannst du neue AuftrĂ¤ge annehmen?', options: ['Auf dem Markt', 'Im Heiligtum', 'In der Taverne', 'Beim Schriftrollenmeister'], correctAnswer: 'In der Taverne' },
                { question: 'WofĂĽr kannst du Seelenkristalle verwenden?', options: ['Neues Schiff kaufen', 'BĂĽcher verbessern', 'Sofortreise', 'Provision senken'], correctAnswer: 'BĂĽcher verbessern' }
            ],
            fr: [
                { question: 'Quel est le nom de la monnaie principale du jeu ?', options: ['Or', 'Credit pirate', 'Perle', 'Doubloon'], correctAnswer: 'Credit pirate' },
                { question: 'Ou peux-tu prendre de nouvelles quetes ?', options: ['Au marche', 'Au sanctuaire', 'A la taverne', 'Chez le maitre des parchemins'], correctAnswer: 'A la taverne' },
                { question: 'A quoi servent les cristaux d esprit ?', options: ['Acheter un nouveau navire', 'Ameliorer les livres', 'Voyage instantane', 'Reduire la commission'], correctAnswer: 'Ameliorer les livres' }
            ],
            es: [
                { question: 'Como se llama la moneda principal del juego?', options: ['Oro', 'Credito pirata', 'Perla', 'Doblon'], correctAnswer: 'Credito pirata' },
                { question: 'Donde puedes aceptar nuevas misiones?', options: ['En el mercado', 'En el santuario', 'En la taberna', 'Con el maestro de pergaminos'], correctAnswer: 'En la taberna' },
                { question: 'Para que sirven los cristales espirituales?', options: ['Comprar un barco nuevo', 'Mejorar libros', 'Viaje instantaneo', 'Reducir comision'], correctAnswer: 'Mejorar libros' }
            ],
            pl: [
                { question: 'Jak nazywa sie glowna waluta w grze?', options: ['Zloto', 'Kredyt piracki', 'Perla', 'Dublon'], correctAnswer: 'Kredyt piracki' },
                { question: 'Gdzie mozesz przyjmowac nowe zadania?', options: ['Na rynku', 'W swiatyni', 'W tawernie', 'U mistrza zwojow'], correctAnswer: 'W tawernie' },
                { question: 'Do czego sluza krysztaly ducha?', options: ['Kupno nowego statku', 'Ulepszanie ksiazek', 'Natychmiastowa podroz', 'Zmniejszenie prowizji'], correctAnswer: 'Ulepszanie ksiazek' }
            ],
            ru: [
                { question: 'ĐšĐ°Đş Đ˝Đ°Đ·Ń‹Đ˛Đ°ĐµŃ‚ŃŃŹ ĐľŃĐ˝ĐľĐ˛Đ˝Đ°ŃŹ Đ˛Đ°Đ»ŃŽŃ‚Đ° Đ˛ Đ¸ĐłŃ€Đµ?', options: ['Đ—ĐľĐ»ĐľŃ‚Đľ', 'ĐźĐ¸Ń€Đ°Ń‚ŃĐşĐ¸Đą ĐşŃ€ĐµĐ´Đ¸Ń‚', 'Đ–ĐµĐĽŃ‡ŃĐł', 'Đ”ŃĐ±Đ»ĐľĐ˝'], correctAnswer: 'ĐźĐ¸Ń€Đ°Ń‚ŃĐşĐ¸Đą ĐşŃ€ĐµĐ´Đ¸Ń‚' },
                { question: 'Đ“Đ´Đµ ĐĽĐľĐ¶Đ˝Đľ Đ˛Đ·ŃŹŃ‚ŃŚ Đ˝ĐľĐ˛Ń‹Đµ Đ·Đ°Đ´Đ°Đ˝Đ¸ŃŹ?', options: ['ĐťĐ° Ń€Ń‹Đ˝ĐşĐµ', 'Đ’ ŃĐ˛ŃŹŃ‚Đ¸Đ»Đ¸Ń‰Đµ', 'Đ’ Ń‚Đ°Đ˛ĐµŃ€Đ˝Đµ', 'ĐŁ ĐĽĐ°ŃŃ‚ĐµŃ€Đ° ŃĐ˛Đ¸Ń‚ĐşĐľĐ˛'], correctAnswer: 'Đ’ Ń‚Đ°Đ˛ĐµŃ€Đ˝Đµ' },
                { question: 'Đ”Đ»ŃŹ Ń‡ĐµĐłĐľ Đ˝ŃĐ¶Đ˝Ń‹ ĐşŃ€Đ¸ŃŃ‚Đ°Đ»Đ»Ń‹ Đ´ŃŃ…Đ°?', options: ['ĐźĐľĐşŃĐżĐşĐ° Đ˝ĐľĐ˛ĐľĐłĐľ ĐşĐľŃ€Đ°Đ±Đ»ŃŹ', 'ĐŁĐ»ŃŃ‡ŃĐµĐ˝Đ¸Đµ ĐşĐ˝Đ¸Đł', 'ĐśĐłĐ˝ĐľĐ˛ĐµĐ˝Đ˝ĐľĐµ ĐżŃŃ‚ĐµŃĐµŃŃ‚Đ˛Đ¸Đµ', 'ĐˇĐ˝Đ¸Đ¶ĐµĐ˝Đ¸Đµ ĐşĐľĐĽĐ¸ŃŃĐ¸Đ¸'], correctAnswer: 'ĐŁĐ»ŃŃ‡ŃĐµĐ˝Đ¸Đµ ĐşĐ˝Đ¸Đł' }
            ]
        };

        return questionMap[normalized] || questionMap.hu;
    }

    function activateLocalQuizMode() {
        localTutorialQuestions = getLocalTutorialQuestionsForLang(getSiteLang());
    }

    function completeQuizLocally() {
        callBackend('markTutorialCompleted', ['quiz'], function (res) {
            if (res && res.success) {
                if (document.getElementById('quiz-container')) {
                    document.getElementById('quiz-container').style.display = 'none';
                }
                if (document.getElementById('quiz-navigation')) {
                    document.getElementById('quiz-navigation').style.display = 'block';
                }
            }
        }, function () {
            if (document.getElementById('quiz-container')) {
                document.getElementById('quiz-container').style.display = 'none';
            }
            if (document.getElementById('quiz-navigation')) {
                document.getElementById('quiz-navigation').style.display = 'block';
            }
        });
    }

    function ensureUnityUiElements() {
        var newUserContent = document.getElementById('new-user-content');
        if (!newUserContent) {
            return;
        }

        var panel = document.getElementById('tutorial-unity-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'tutorial-unity-panel';
            panel.className = 'page-section';
            panel.style.display = 'none';
            panel.style.marginTop = '20px';
            panel.style.backgroundColor = '#fff';
            panel.innerHTML = '<h2 style="border-bottom:2px solid var(--color-primary); padding-bottom:10px;">' + t('tutorial_unity_title') + '</h2>' +
                '<p id="tutorial-unity-status" style="font-weight:bold;">' + t('tutorial_unity_status_starting') + '</p>' +
                '<div id="tutorial-unity-host" style="width:100%; min-height:560px; border:1px solid #ccc; border-radius:6px; overflow:hidden; background:#111;"></div>' +
                '<div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">' +
                '<button id="tutorial-open-unity-btn" class="btn" type="button">' + t('tutorial_unity_open_external') + '</button>' +
                '<button id="tutorial-fallback-btn" class="btn" type="button" style="background:#8b0000;">' + t('tutorial_unity_fallback_quiz') + '</button>' +
                '</div>';

            var quizContainer = document.getElementById('quiz-container');
            if (quizContainer && quizContainer.parentNode) {
                quizContainer.parentNode.insertBefore(panel, quizContainer);
            } else {
                newUserContent.appendChild(panel);
            }
        }

        var continueBtn = document.getElementById('tutorial-continue-btn');
        var nav = document.getElementById('quiz-navigation');
        if (!continueBtn && nav) {
            continueBtn = document.createElement('button');
            continueBtn.id = 'tutorial-continue-btn';
            continueBtn.className = 'btn';
            continueBtn.type = 'button';
            continueBtn.style.display = 'none';
            continueBtn.style.backgroundColor = '#1d6a96';
            continueBtn.innerText = t('tutorial_unity_continue_button');

            var wrapper = nav.querySelector('div');
            if (wrapper) {
                wrapper.appendChild(continueBtn);
            } else {
                nav.appendChild(continueBtn);
            }
        }

        var panelTitleEl = panel ? panel.querySelector('h2') : null;
        if (panelTitleEl) {
            panelTitleEl.innerText = t('tutorial_unity_title');
        }

        var statusEl = document.getElementById('tutorial-unity-status');
        if (statusEl && !statusEl.innerText) {
            statusEl.innerText = t('tutorial_unity_status_starting');
        }

        var openBtn = document.getElementById('tutorial-open-unity-btn');
        if (openBtn) {
            openBtn.innerText = t('tutorial_unity_open_external');
        }

        var fallbackBtn = document.getElementById('tutorial-fallback-btn');
        if (fallbackBtn) {
            fallbackBtn.innerText = t('tutorial_unity_fallback_quiz');
        }

        var startBtn = document.getElementById('tutorial-unity-start-btn');
        if (startBtn) {
            startBtn.innerText = t('tutorial_unity_start_button');
        }

        if (continueBtn) {
            continueBtn.innerText = t('tutorial_unity_continue_button');
        }
    }

    function setUnityStatus(text, color) {
        var statusEl = document.getElementById('tutorial-unity-status');
        if (statusEl) {
            statusEl.innerText = text;
            if (color) {
                statusEl.style.color = color;
            }
        }
    }

    function stopUnityTimeout() {
        if (unityLaunchTimeoutId) {
            clearTimeout(unityLaunchTimeoutId);
            unityLaunchTimeoutId = null;
        }
    }

    function showQuizMode() {
        stopUnityTimeout();
        var panel = document.getElementById('tutorial-unity-panel');
        if (panel) {
            panel.style.display = 'none';
        }

        var quiz = document.getElementById('quiz-container');
        var nav = document.getElementById('quiz-navigation');
        if (quiz) {
            quiz.style.display = 'block';
        }
        if (nav) {
            nav.style.display = 'none';
        }

        startQuiz();
    }

    function checkUnityWebGLSupport() {
        try {
            var canvas = document.createElement('canvas');
            var gl2 = canvas.getContext('webgl2', { antialias: false, alpha: false });
            if (!gl2) {
                return { ok: false, reason: t('tutorial_unity_status_webgl_not_supported') };
            }
            return { ok: true, reason: '' };
        } catch (e) {
            return { ok: false, reason: t('tutorial_unity_status_webgl_not_supported') };
        }
    }

    function mountUnityIframe(host) {
        if (!host || !unityTargetUrl) {
            setUnityStatus(t('tutorial_unity_status_missing_url'), '#c0392b');
            showQuizMode();
            return;
        }

        host.innerHTML = '';
        var iframe = document.createElement('iframe');
        iframe.src = unityTargetUrl;
        iframe.style.width = '100%';
        iframe.style.height = '560px';
        iframe.style.border = '0';
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('title', t('tutorial_unity_iframe_title'));

        iframe.onload = function () {
            stopUnityTimeout();
            setUnityStatus(t('tutorial_unity_status_loaded'), '#1f7a1f');
        };

        iframe.onerror = function () {
            setUnityStatus(t('tutorial_unity_status_unavailable'), '#c0392b');
            showQuizMode();
        };

        host.appendChild(iframe);
        setUnityStatus(t('tutorial_unity_status_launching'), '#333');

        stopUnityTimeout();
        unityLaunchTimeoutId = setTimeout(function () {
            setUnityStatus(t('tutorial_unity_status_timeout'), '#c0392b');
            showQuizMode();
        }, 12000);
    }

    function tryLaunchUnity(flow, autoStart) {
        ensureUnityUiElements();

        var panel = document.getElementById('tutorial-unity-panel');
        var host = document.getElementById('tutorial-unity-host');
        var fallbackBtn = document.getElementById('tutorial-fallback-btn');
        var openBtn = document.getElementById('tutorial-open-unity-btn');
        var startBtn = document.getElementById('tutorial-unity-start-btn');

        if (!panel || !host) {
            showQuizMode();
            return;
        }

        var unityUrl = (flow && flow.unityUrl) ? flow.unityUrl : '';
        if (!unityUrl) {
            setUnityStatus(t('tutorial_unity_status_missing_url'), '#c0392b');
            showQuizMode();
            return;
        }

        var support = checkUnityWebGLSupport();
        if (!support.ok) {
            setUnityStatus(support.reason, '#c0392b');
            showQuizMode();
            return;
        }

        panel.style.display = 'block';
        var quiz = document.getElementById('quiz-container');
        var nav = document.getElementById('quiz-navigation');
        if (quiz) {
            quiz.style.display = 'none';
        }
        if (nav) {
            nav.style.display = 'none';
        }

        var mode = flow && flow.tutorialCompleted ? 'continue' : 'tutorial';
        unityTargetUrl = buildUnityLaunchUrl(unityUrl, mode, flow ? flow.gameStateToken : '');

        if (startBtn) {
            startBtn.style.display = 'inline-block';
            startBtn.onclick = function () {
                mountUnityIframe(host);
            };
        }

        if (autoStart) {
            mountUnityIframe(host);
        } else {
            setUnityStatus(t('tutorial_unity_status_waiting_click'), '#333');
        }

        if (fallbackBtn) {
            fallbackBtn.onclick = function () {
                setUnityStatus(t('tutorial_unity_status_manual_fallback'), '#c0392b');
                showQuizMode();
            };
        }

        if (openBtn) {
            openBtn.onclick = function () {
                if (unityTargetUrl) {
                    window.open(unityTargetUrl, '_blank');
                }
            };
        }
    }

    function bindContinueButton(flow) {
        var btn = document.getElementById('tutorial-continue-btn');
        if (!btn) {
            return;
        }

        if (flow && flow.gameStateToken) {
            btn.style.display = 'inline-block';
            btn.onclick = function () {
                tryLaunchUnity({
                    tutorialCompleted: true,
                    gameStateToken: flow.gameStateToken,
                    unityUrl: flow.unityUrl
                }, true);
            };
        } else {
            btn.style.display = 'none';
            btn.onclick = null;
        }
    }

    function initializeTutorialPage(flow) {
        currentFlowState = flow || {};

        if (typeof setupAccordionListeners === 'function') {
            setupAccordionListeners();
        }
        ensureUnityUiElements();

        var newUserContent = document.getElementById('new-user-content');
        if (newUserContent) {
            newUserContent.style.display = 'block';
        }

        var status = (flow && flow.status) ? String(flow.status).toLowerCase() : '';
        var quiz = document.getElementById('quiz-container');
        var nav = document.getElementById('quiz-navigation');
        var panel = document.getElementById('tutorial-unity-panel');

        if (status === 'ok') {
            if (quiz) {
                quiz.style.display = 'none';
            }
            if (nav) {
                nav.style.display = 'block';
            }
            if (panel) {
                panel.style.display = 'none';
            }
            bindContinueButton(flow);
        } else {
            if (nav) {
                nav.style.display = 'none';
            }
            bindContinueButton(null);
            tryLaunchUnity(flow || {}, false);
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        activateLocalQuizMode();
        var currentSubmitBtn = document.getElementById('submit-btn');
        if (!currentSubmitBtn) {
            return;
        }
        var newBtn = currentSubmitBtn.cloneNode(true);
        currentSubmitBtn.parentNode.replaceChild(newBtn, currentSubmitBtn);
        newBtn.addEventListener('click', handleAnswer);
        loadQuestion(currentQuestionIndex);
    }

    function showFeedback(message, color) {
        if (!feedbackEl) {
            return;
        }
        feedbackEl.textContent = message;
        feedbackEl.style.color = color;
    }

    function loadQuestion(index) {
        showFeedback('', 'black');
        var btn = document.getElementById('submit-btn');
        if (btn) {
            btn.disabled = true;
        }

        if (questionTextEl) {
            questionTextEl.textContent = t('tutorial_question_loading');
        }
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
        }

        var localQuestion = localTutorialQuestions[index];
        if (!localQuestion) {
            showFeedback(t('error_prefix') + 'Nem sikerĂĽlt kĂ©rdĂ©st betĂ¶lteni.', 'red');
            return;
        }

        displayQuestion(localQuestion);
    }

    function displayQuestion(qObj) {
        if (!qObj || !questionTextEl || !optionsContainer) {
            return;
        }
        var questionText = (typeof qObj.question === 'string' && qObj.question) ? qObj.question : t('tutorial_question_loading');
        var options = Array.isArray(qObj.options) ? qObj.options : [];

        questionTextEl.textContent = questionText;

        if (options.length === 0) {
            showFeedback(t('error_prefix') + 'Ă‰rvĂ©nytelen kĂ©rdĂ©s adatok Ă©rkeztek.', 'red');
            var invalidBtn = document.getElementById('submit-btn');
            if (invalidBtn) {
                invalidBtn.disabled = true;
            }
            return;
        }

        for (var i = 0; i < options.length; i++) {
            var option = options[i];
            var label = document.createElement('label');
            label.className = 'option-label';

            var radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'answer';
            radio.value = option;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsContainer.appendChild(label);
        }

        var btn = document.getElementById('submit-btn');
        if (btn) {
            btn.disabled = false;
        }
    }

    function handleAnswer() {
        var selectedOption = document.querySelector('input[name="answer"]:checked');
        var btn = document.getElementById('submit-btn');

        if (!selectedOption) {
            showFeedback(t('tutorial_select_prompt'), 'red');
            return;
        }

        if (btn) {
            btn.disabled = true;
        }
        showFeedback(t('tutorial_checking_answer'), 'gray');

        var currentQuestion = localTutorialQuestions[currentQuestionIndex];
        var isCorrect = !!(currentQuestion && selectedOption.value === currentQuestion.correctAnswer);
        var isLastQuestion = currentQuestionIndex >= (localTutorialQuestions.length - 1);

        if (isCorrect) {
            if (isLastQuestion) {
                showFeedback(t('tutorial_correct_finished'), 'green');
                completeQuizLocally();
            } else {
                showFeedback(t('tutorial_correct_next'), 'green');
                currentQuestionIndex++;
                setTimeout(function () {
                    loadQuestion(currentQuestionIndex);
                }, 1500);
            }
        } else {
            showFeedback(t('tutorial_incorrect_try'), 'red');
            if (btn) {
                btn.disabled = false;
            }
        }
    }

    window.SaveTokenToSheet = function (email, token) {
        var finalToken = token || '';
        if (!finalToken) {
            return;
        }
        callBackend('saveGameStateToken', [finalToken], function () { }, function (err) {
            console.warn('JĂˇtĂ©kĂˇllĂˇs token mentĂ©se sikertelen:', err);
        });
    };

    window.onTutorialSuccess = function (email) {
        callBackend('markTutorialCompleted', ['unity'], function (res) {
                loadPage('kikoto_oldal');
        }, function (err) {
            console.warn('Tutorial OK mentĂ©si hiba:', err);
            loadPage('kikoto_oldal');
        });
    };

    window.onUnityTutorialFailed = function (reason) {
        console.warn('Unity tutorial hiba jelzĂ©s:', reason || t('tutorial_unity_fail_reason_unknown'));
        showQuizMode();
    };

    callBackend('getTutorialFlowState', [],
        initializeTutorialPage,
        function (error) {
            var tc = document.querySelector('.tutorial-container');
            if (tc) {
                tc.innerHTML = '<h2>' + t('error_prefix') + error.message + '</h2>';
            }
        }
    );
}

/* ========================================= */
/* === STĂŤLUSOS RENDSZER ĂśZENETEK (UI) === */
/* ========================================= */

// 1. Az alap fĂĽggvĂ©ny (Ezt hĂ­vja a tĂ¶bbi)
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

    // Tartalom feltĂ¶ltĂ©se
    titleEl.innerText = title;
    bodyEl.innerHTML = message; // HTML-t is engedĂĽnk (pl. sortĂ¶rĂ©s, fĂ©lkĂ¶vĂ©r)
    iconEl.className = iconClass || 'fas fa-scroll'; // AlapĂ©rtelmezett ikon

    // Gombok generĂˇlĂˇsa
    btnContainer.innerHTML = ''; // TĂ¶rĂ¶ljĂĽk az elĹ‘zĹ‘ket

    buttons.forEach(btnDef => {
        const btn = document.createElement('button');
        btn.className = 'btn'; // A te alap stĂ­lusod
        btn.innerText = btnDef.text;

        // Egyedi stĂ­lus (opcionĂˇlis)
        if (btnDef.color) btn.style.backgroundColor = btnDef.color;
        if (btnDef.textColor) btn.style.color = btnDef.textColor;

        // KattintĂˇs esemĂ©ny
        btn.onclick = function () {
            modal.style.display = 'none'; // BezĂˇrĂˇs
            if (typeof btnDef.callback === 'function') {
                btnDef.callback();
            }
        };

        btnContainer.appendChild(btn);
    });

    // MegjelenĂ­tĂ©s
    modal.style.display = 'flex';
}

// 2. HELYETTESĂŤTĹ: alert() helyett -> uiAlert()
function uiAlert(message, title = t('modal_notice_title')) {
    showSystemModal(
        title,
        message,
        "fas fa-exclamation-circle", // Ikon
        [{ text: t('modal_ok'), color: "#2e8b57", textColor: "white" }]
    );
}

// 3. HELYETTESĂŤTĹ: confirm() helyett -> uiConfirm()
function uiConfirm(message, title, onYes) {
    showSystemModal(
        title || t('modal_confirm_title'),
        message,
        "fas fa-question-circle", // Ikon
        [
            { text: t('modal_yes'), color: "#2e8b57", textColor: "white", callback: onYes },
            { text: t('modal_cancel'), color: "#8b0000", textColor: "white" } // A MĂ©gse csak bezĂˇr
        ]
    );
}

// 4. HELYETTESĂŤTĹ: prompt() helyett -> uiPrompt()
function uiPrompt(message, title, placeholder, onCommit) {
    // Egyedi ID a beviteli mezĹ‘nek
    const inputId = 'sys-modal-input-' + Date.now();

    // HTML tartalom: SzĂ¶veg + Input mezĹ‘
    const content = `
        <p>${message}</p>
        <div style="margin-top: 15px;">
            <input type="text" id="${inputId}" placeholder="${placeholder || ''}" 
                   style="width: 80%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px;">
        </div>
    `;

    showSystemModal(
        title || t('modal_prompt_title'),
        content,
        "fas fa-pen-nib", // Ikon
        [
            {
                text: t('modal_continue'),
                color: "#2e8b57",
                textColor: "white",
                callback: function () {
                    // Itt olvassuk ki az Ă©rtĂ©ket, mĂ©g mielĹ‘tt a modal tartalma tĂ¶rlĹ‘dne
                    const val = document.getElementById(inputId).value;
                    if (onCommit) onCommit(val);
                }
            },
            { text: t('modal_cancel'), color: "#555", textColor: "white" }
        ]
    );
}


// ===============
// === TAVERNA ===
// ===============


// === GLOBĂLIS VĂLTOZĂ“ A KĂRTYAKĂ‰PEKNEK Ă‰S EGYĂ‰B ASSETEKNEK ===
const tavernaImageSources = {
    kartya_hatlap: null,
    kartya_pirosasz: null,
    kartya_fekbub: null,
    kartya_fekkar: null,
    kartyakeveres_gif: null,
    dark_wood: null
};

/**
 * ElĹ‘tĂ¶lti a Taverna Ă¶sszes szĂĽksĂ©ges kĂ©pĂ©t a kĂ¶zponti kĂ©pkezelĹ‘bĹ‘l.
 * @param {function} callback A fĂĽggvĂ©ny, ami a sikeres betĂ¶ltĂ©s utĂˇn lefut.
 */
function preloadTavernaImages(callback) {
    // Ha mĂˇr be vannak tĂ¶ltve a kĂ©pek, nem kĂ©rjĂĽk le Ăşjra.
    if (tavernaImageSources.kartya_hatlap) {
        if (callback) callback(); // <--- ITT VOLT A HIBA (tĂ¶rĂ¶ltem a "uiAlert"-et)
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    // HĂ­vĂˇs a callBackend-del (paramĂ©terek nĂ©lkĂĽl, mert a Router nem kĂ©r semmit ehhez)
    callBackend('getCardImageAssets', [],
        function (response) {
            if (response.success) {
                for (const key in response.assets) {
                    const imageData = response.assets[key];
                    if (imageData && imageData.data) {
                        tavernaImageSources[key] = `data:${imageData.mime};base64,${imageData.data}`;
                    }
                }
                if (callback) callback();
            } else {
                if (typeof uiAlert === 'function') uiAlert(t('taverna_assets_error_prefix') + response.error);
            }
            document.getElementById('loading-overlay').style.display = 'none';
        },
        function (error) {
            if (typeof uiAlert === 'function') uiAlert(t('taverna_assets_error_fatal_prefix') + error.message);
            document.getElementById('loading-overlay').style.display = 'none';
        }
    );
}

/**
* SegĂ©dfĂĽggvĂ©ny a Pult modal nĂ©zeteinek vĂˇltogatĂˇsĂˇhoz.
* @param {string} viewName A megjelenĂ­tendĹ‘ nĂ©zet neve (read, compose, check_status_init, feedback).
*/
function showPultView(viewName) {
    // Ă–sszes nĂ©zet elrejtĂ©se
    document.getElementById('pult-view-read').style.display = 'none';
    document.getElementById('pult-view-compose').style.display = 'none';
    document.getElementById('pult-view-check_status_init').style.display = 'none';
    document.getElementById('pult-view-feedback').style.display = 'none';

    // A "compose again" gomb alaphelyzetbe ĂˇllĂ­tĂˇsa
    document.getElementById('pult-feedback-compose-again-btn').style.display = 'none';

    // A kĂ©rt nĂ©zet megjelenĂ­tĂ©se
    const viewToShow = document.getElementById(`pult-view-${viewName}`);
    if (viewToShow) {
        viewToShow.style.display = 'block';
    }

    // Ha a fĹ‘ nĂ©zetre tĂ©rĂĽnk vissza, frissĂ­tjĂĽk az ĂĽzenetlistĂˇt
    if (viewName === 'read') {
        loadTavernaMessages();
    }
}

/**
 * BetĂ¶lti a felhasznĂˇlĂł ĂĽzeneteit a szerverrĹ‘l Ă©s megjelenĂ­ti Ĺ‘ket.
 */
function loadTavernaMessages() {
    const messagesListDiv = document.getElementById('pult-messages-list');
    messagesListDiv.innerHTML = '<p>' + t('taverna_messages_loading') + '</p>';

    const userName = document.querySelector('.header-title').innerText;

    // ĂšJ HĂŤVĂS (Router):
    // Csak a userName-t kĂĽldjĂĽk, az emailt a Router intĂ©zi!
    callBackend('getTavernaMessages', [userName],
        function (messages) {
            if (messages && messages.length > 0) {
                let messagesHTML = '';
                messages.forEach(msg => {
                    messagesHTML += `<p><strong>${msg.sender} ĂĽzeni:</strong> ${msg.message}</p>`;
                });
                messagesListDiv.innerHTML = messagesHTML;
            } else {
                messagesListDiv.innerHTML = '<p>' + t('taverna_messages_empty') + '</p>';
            }
        },
        function (error) {
            messagesListDiv.innerHTML = '<p style="color:red;">' + t('taverna_messages_error_prefix') + error.message + '</p>';
        }
    );
}

/**
 * BezĂˇrja az Ă¶sszes taverna oldali modalt/panelt.
 */
function closeAllTavernaModals() {
    const pultModal = document.getElementById('pult-modal');
    const asztalConfirmModal = document.getElementById('asztal-confirm-modal');
    const chatModal = document.getElementById('chat-modal');
    const jatekteremModal = document.getElementById('jatekterem-modal');

    if (pultModal) pultModal.style.display = 'none';
    if (asztalConfirmModal) asztalConfirmModal.style.display = 'none';
    if (jatekteremModal) jatekteremModal.style.display = 'none';

    // A chat panelt kĂĽlĂ¶n kezeljĂĽk, hogy a bezĂˇrĂˇskor a kapcsolat is megszakadjon.
    if (chatModal && chatModal.style.display !== 'none') {
        chatModal.style.display = 'none';
        const chatIframe = document.getElementById('chat-iframe');
        if (chatIframe) chatIframe.src = 'about:blank';
    }
}


/**
* InicializĂˇlja a Taverna oldalt: megjelenĂ­ti a kezdĹ‘ ĂĽzenetet
* Ă©s esemĂ©nykezelĹ‘ket rendel a gombokhoz.
*/
function initializeTavernaPage() {
    // --- VĂLTOZĂ“K FELVĂ‰TELE ---
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

    // JĂˇtĂ©k elemek (ha kellenek kĂ©sĹ‘bb)
    const gameInfoText = document.getElementById('game-info-text');
    const gameFeedbackText = document.getElementById('game-feedback-text');
    const gameCardArea = document.getElementById('game-card-area');
    const gameBettingArea = document.getElementById('game-betting-area');

    // JĂˇtĂ©k Ăˇllapot vĂˇltozĂłk
    let playerCredit = 0;
    let prizePool = 0;
    let gameState = 'betting';
    let currentTavernPin = null;

    if (!pultBtn || !asztalBtn || !csevegBtn || !chatModal || !jatekteremBtn) {
        console.error(t('taverna_missing_controls'));
        return;
    }

    // Ezt az URL-t majd ellenĹ‘rizd, hogy helyes-e!
    const CHAT_ALKALMAZAS_URL = "https://script.google.com/macros/s/AKfycbyxkJipgYkB2K38MF5UzqB9kVYJnqk0QeaeIquVXdFgGL57zFDlVjGKQct-M605PqrS/exec";

    // --- ESEMĂ‰NYKEZELĹK ---

    // 1. ĂśdvĂ¶zlĹ‘panel (Bartender)
    setTimeout(() => {
        if (typeof toggleBartender === 'function') {
            const panel = document.getElementById('bartender-panel');
            if (panel && panel.style.display === 'none') {
                toggleBartender();
            }
        }
    }, 500);

    // 2. PULT FUNKCIĂ“K (JAVĂŤTVA callBackend-re!)
    pultBtn.onclick = () => {
        if (typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        pultModal.style.display = 'flex';
        if (typeof showPultView === 'function') showPultView('read');
    };

    sendMessageBtn.onclick = function () {
        const recipientName = document.getElementById('pult-recipient-name').value;
        const messageText = document.getElementById('pult-message-text').value;
        const senderName = document.querySelector('.header-title').innerText;

        if (!recipientName || !messageText) {
            if (typeof uiAlert === 'function') uiAlert(t('taverna_missing_recipient_message'));
            else alert(t('taverna_missing_data'));
            return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';

        // --- JAVĂŤTĂS: callBackend ---
        // NEM kĂĽldjĂĽk a currentUserEmail-t! (A Router intĂ©zi)
        // ParamĂ©terek sorrendje a Backendben: (email, senderName, recipientName, messageText)
        // Itt csak a maradĂ©k hĂˇrmat kĂĽldjĂĽk:
        callBackend('sendTavernaMessage', [senderName, recipientName, messageText],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = response.message;

                if (response.success) {
                    updateCreditDisplay(); // Ez mĂˇr a javĂ­tott verziĂł
                    document.getElementById('pult-recipient-name').value = '';
                    document.getElementById('pult-message-text').value = '';
                    const composeAgainBtn = document.getElementById('pult-feedback-compose-again-btn');
                    if (composeAgainBtn) composeAgainBtn.style.display = 'inline-block';
                }
                if (typeof showPultView === 'function') showPultView('feedback');
            },
            function (error) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = t('error_prefix') + error.message;
                if (typeof showPultView === 'function') showPultView('feedback');
            }
        );
    };

    checkStatusBtn.onclick = function () {
        const recipientName = document.getElementById('pult-check-recipient-name').value;
        if (!recipientName) {
            if (typeof uiAlert === 'function') uiAlert(t('taverna_missing_pirate_name'));
            return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';

        // --- JAVĂŤTĂS: callBackend ---
        // NEM kĂĽldjĂĽk a currentUserEmail-t!
        callBackend('checkMessageStatusByRecipient', [recipientName],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = response.message;
                document.getElementById('pult-check-recipient-name').value = '';
                if (typeof showPultView === 'function') showPultView('feedback');
            },
            function (error) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = t('error_prefix') + error.message;
                if (typeof showPultView === 'function') showPultView('feedback');
            }
        );
    };

    // 3. ASZTAL (CHAT) FUNKCIĂ“K
    asztalBtn.onclick = () => {
        if (typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        asztalConfirmModal.style.display = 'flex';
    };

    csevegBtn.onclick = () => {
        const userName = document.querySelector('.header-title').innerText;
        // Itt HASZNĂLHATJUK a globĂˇlis vĂˇltozĂłt az URL Ă©pĂ­tĂ©shez (ez nem backend hĂ­vĂˇs)
        if (!userName || !currentUserEmail) {
            if (typeof uiAlert === 'function') uiAlert(t('taverna_user_data_missing'));
            return;
        }

        if (CHAT_ALKALMAZAS_URL.includes("IDE_JON")) {
            alert(t('taverna_chat_url_missing'));
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

    // 4. JĂTĂ‰KTEREM (MĂˇr jĂł volt, de biztos ami biztos)
    jatekteremBtn.onclick = () => {
        if (typeof closeAllTavernaModals === 'function') closeAllTavernaModals();

        if (typeof requestPin !== 'function') {
            console.error(t('taverna_request_pin_missing'));
            return;
        }

        requestPin(function (pinCode) {
            currentTavernPin = pinCode;

            if (typeof preloadTavernaImages === 'function') {
                preloadTavernaImages(() => {
                    if (typeof tavernaImageSources !== 'undefined' && tavernaImageSources.dark_wood) {
                        gameModalContent.style.backgroundImage = `url(${tavernaImageSources.dark_wood})`;
                    }

                    document.getElementById('loading-overlay').style.display = 'flex';

                    // callBackend Helyes hasznĂˇlata (Nincs paramĂ©ter, nincs email)
                    callBackend('getGameInitialData', [],
                        function (data) {
                            document.getElementById('loading-overlay').style.display = 'none';
                            if (data.success) {
                                playerCredit = data.credit;
                                prizePool = data.prizePool;
                                if (typeof resetGame === 'function') resetGame();
                                jatekteremModal.style.display = 'flex';
                            } else {
                                if (typeof uiAlert === 'function') uiAlert(t('error_prefix') + data.error);
                            }
                        },
                        function (err) {
                            document.getElementById('loading-overlay').style.display = 'none';
                            if (typeof uiAlert === 'function') uiAlert(t('server_error_prefix') + err.message);
                        }
                    );
                });
            }
        }, t('taverna_game_entry_prompt'));
    };

    closeGameBtn.onclick = () => { jatekteremModal.style.display = 'none'; };
}

// === JĂTĂ‰KVEZĂ‰RLĹ FĂśGGVĂ‰NYEK ===

function resetGame() {
    gameState = 'betting';

    // 1. SzĂ¶vegek alaphelyzetbe
    const infoText = document.getElementById('game-info-text');
    const feedbackText = document.getElementById('game-feedback-text');
    const cardArea = document.getElementById('game-card-area');
    const bettingArea = document.getElementById('game-betting-area');

    if (infoText) infoText.innerText = t('game_info_bet_prompt');
    if (feedbackText) feedbackText.innerText = '';

    // 2. KĂRTYĂK KIRAJZOLĂSA (Csak dekorĂˇciĂł, NINCS kattintĂˇs esemĂ©ny!)
    if (typeof tavernaImageSources !== 'undefined' && tavernaImageSources.kartya_hatlap && cardArea) {
        cardArea.innerHTML =
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>' +
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>' +
            '<div class="card" style="width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; background-image: url(' + tavernaImageSources.kartya_hatlap + '); cursor: default; margin: 0 5px;"></div>';

        cardArea.style.display = 'flex';
        cardArea.style.justifyContent = 'center';
        cardArea.style.marginBottom = '20px';
    } else if (cardArea) {
        cardArea.innerHTML = '<p>(' + t('game_cards_loading') + ')</p>';
    }

    // 3. TĂ‰T MEZĹ Ă‰S GOMB LĂ‰TREHOZĂSA
    if (bettingArea) {
        bettingArea.innerHTML = ''; // TĂ¶rlĂ©s

        var label = document.createElement('span');
        label.innerText = t('game_bet_label');
        label.style.marginRight = '10px';

        var betInput = document.createElement('input');
        betInput.type = 'number';
        betInput.id = 'game-bet-input';
        betInput.style.padding = '8px';
        betInput.style.width = '100px';
        betInput.style.textAlign = 'center';
        betInput.placeholder = t('game_bet_placeholder');
        betInput.style.marginRight = '10px';

        var playBtn = document.createElement('button');
        playBtn.id = 'game-play-btn';
        playBtn.className = 'btn';
        playBtn.style.backgroundColor = '#d2691e';
        playBtn.style.color = 'white';
        playBtn.innerText = t('game_play_button');

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

    if (!bet || bet <= 0) { gameFeedbackText.innerText = t('game_invalid_bet'); return; }

    // playerCredit globĂˇlis vĂˇltozĂł
    if (typeof playerCredit !== 'undefined' && bet > playerCredit) {
        gameInfoText.innerText = t('game_all_in_warning');
        gameFeedbackText.innerText = t('game_not_enough_credit');
        gameBetInput.value = playerCredit;
        return;
    }
    // prizePool globĂˇlis vĂˇltozĂł
    if (typeof prizePool !== 'undefined' && bet > prizePool) {
        gameInfoText.innerText = t('game_pool_limit_warning');
        gameFeedbackText.innerText = t('game_pool_limit_detail');
        gameBetInput.value = prizePool;
        return;
    }

    startGameAnimation(bet);
}

function startGameAnimation(bet) {
    gameState = 'animating';
    document.getElementById('game-betting-area').style.display = 'none';
    document.getElementById('game-info-text').innerText = t('game_shuffling');

    const cardArea = document.getElementById('game-card-area');
    // Backtick helyett string Ă¶sszefĹ±zĂ©s a biztonsĂˇg kedvĂ©Ă©rt
    cardArea.innerHTML = '<img id="shuffle-gif" src="' + tavernaImageSources.kartyakeveres_gif + '" style="height: 300px; max-width: 100%;">';

    // Az animĂˇciĂł ideje (pl. 3 mĂˇsodperc)
    setTimeout(function () {
        showCardsForChoice(bet);
    }, 3000);
}

function showCardsForChoice(bet) {
    gameState = 'choosing';
    document.getElementById('game-info-text').innerText = t('game_pick_card_prompt');

    const cardArea = document.getElementById('game-card-area');
    cardArea.innerHTML =
        '<div class="card" id="card-1"></div>' +
        '<div class="card" id="card-2"></div>' +
        '<div class="card" id="card-3"></div>';

    // StĂ­lus beszĂşrĂˇsa dinamikusan (hogy a hover mĹ±kĂ¶djĂ¶n)
    var styleId = 'card-game-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = '.card { width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; transition: all 0.3s; cursor: pointer; background-image: url(' + tavernaImageSources.kartya_hatlap + '); } .card:hover { transform: scale(1.1); }';
        document.head.appendChild(style);
    }

    // EsemĂ©nykezelĹ‘k hozzĂˇadĂˇsa
    // ITT adjuk Ăˇt a 'bet' vĂˇltozĂłt a handleCardChoice-nak!
    var cards = cardArea.querySelectorAll('.card');
    for (var i = 0; i < cards.length; i++) {
        (function (cardElement) {
            cardElement.onclick = function () {
                handleCardChoice(bet, cardElement);
            };
        })(cards[i]);
    }
}

function handleCardChoice(bet, chosenCard) {
    if (gameState !== 'choosing') return;
    gameState = 'result';

    // UI frissĂ­tĂ©s: TĂ¶ltĂ©s
    document.getElementById('loading-overlay').style.display = 'flex';

    // GlobĂˇlis currentTavernPin hasznĂˇlata
    var pin = (typeof currentTavernPin !== 'undefined') ? currentTavernPin : null;

    // Backend hĂ­vĂˇs (Nincs email paramĂ©ter!)
    callBackend('playCardGame', [bet, pin],
        function (result) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (result.success) {
                // GlobĂˇlis vĂˇltozĂłk frissĂ­tĂ©se
                if (typeof playerCredit !== 'undefined') playerCredit = result.newCredit;
                updateCreditDisplay();

                // KĂˇrtyĂˇk felfordĂ­tĂˇsa
                // A vĂˇlasztott kĂˇrtya
                if (result.outcome === 'win') {
                    chosenCard.style.backgroundImage = 'url(' + tavernaImageSources.kartya_pirosasz + ')';
                } else {
                    // VĂ©letlenszerĹ± vesztes kĂˇrtya (Bub vagy KirĂˇly)
                    var lossCards = ['kartya_fekbub', 'kartya_fekkar'];
                    var randomLoss = lossCards[Math.floor(Math.random() * lossCards.length)];
                    chosenCard.style.backgroundImage = 'url(' + tavernaImageSources[randomLoss] + ')';
                }

                var infoText = document.getElementById('game-info-text');
                if (result.outcome === 'win') {
                    infoText.innerText = t('game_win_prefix') + result.prize + t('game_win_suffix');
                } else {
                    infoText.innerText = t('game_lose_prefix') + bet + t('game_lose_suffix');
                }

                // Gombok visszaĂˇllĂ­tĂˇsa
                var playBtn = document.getElementById('game-play-btn');
                var betArea = document.getElementById('game-betting-area');
                var betInput = document.getElementById('game-bet-input');

                if (playBtn) {
                    playBtn.innerText = t('game_new_button');
                    playBtn.onclick = resetGame;
                }
                if (betArea) betArea.style.display = 'block';
                if (betInput) betInput.style.display = 'none'; // ElrejtjĂĽk az inputot az eredmĂ©ny kĂ©pernyĹ‘n

            } else {
                if (typeof uiAlert === 'function') uiAlert(t('game_error_prefix') + result.error);
                resetGame();
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') uiAlert(t('server_error_prefix') + err.message);
            resetGame();
        }
    );
}

// --- BĂ‰TA ASZTAL FRONTEND LOGIKA ---

// Pult nĂ©zetvĂˇltĂł bĹ‘vĂ­tĂ©se
/**
* VĂˇltogat a Pult belsĹ‘ nĂ©zetei kĂ¶zĂ¶tt.
* @param {string} viewSuffix A nĂ©zet azonosĂ­tĂłja (pl. 'read', 'compose', 'beta_menu').
*/
function showPultView(viewSuffix) {
    // A lehetsĂ©ges nĂ©zetek ID-jainak listĂˇja
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

    // Mindenkit elrejtĂĽnk
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // A kivĂˇlasztottat megjelenĂ­tjĂĽk
    const targetId = `pult-view-${viewSuffix}`;
    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
    } else {
        console.warn(`Figyelem: A kĂ©rt nĂ©zet (${targetId}) nem talĂˇlhatĂł.`);
    }

    // --- SpeciĂˇlis betĂ¶ltĂ©si logikĂˇk ---

    // Ha visszalĂ©pĂĽnk a fĹ‘menĂĽbe, frissĂ­tsĂĽk az ĂĽzeneteket
    if (viewSuffix === 'read') {
        loadTavernaMessages();
    }

    // Ha a bĂ©ta listĂˇt nyitjuk, tĂ¶ltsĂĽk le az adatokat
    if (viewSuffix === 'beta_list') {
        loadBetaWorks(); // Ez a fĂĽggvĂ©ny mĂˇr lĂ©tezik a kĂłdodban
    }
}

// 1. JAVĂŤTOTT MODAL NYITĂ“ (Flex display + Suffix hĂ­vĂˇs)
function openPultModal() {
    const modal = document.getElementById('pult-modal');
    if (modal) {
        modal.style.display = 'flex'; // FONTOS: Flex a kĂ¶zĂ©pre igazĂ­tĂˇshoz!

        // FONTOS: Csak a 'read' utĂłtagot adjuk Ăˇt, a showPultView kiegĂ©szĂ­ti!
        showPultView('read');
    } else {
        console.error("Hiba: Nem talĂˇlhatĂł a 'pult-modal' elem!");
    }
}

// 1.B Ăšj Taverna AsztaltĂˇrsasĂˇg hĂ­vĂˇsa
function openTavernJobs() {
    const modal = document.getElementById('tavern-jobs-modal');
    if (modal) {
        modal.style.display = 'flex';
        const contentDiv = document.getElementById('tavern-jobs-content');
        contentDiv.innerHTML = '<p style="text-align: center;"><i>OdalĂ©psz a leghangosabb asztalhoz...<br>A rendszer hallgatĂłzik...</i></p>';
        
        if (typeof callBackend === 'function') {
            callBackend("getTavernJobs", [], function(response) {
                if (response && response.text) {
                    contentDiv.innerHTML = response.text.replace(/\n/g, '<br>');
                } else {
                    contentDiv.innerHTML = '<p>Az asztalnĂˇl lĂ©vĹ‘k csak morognak. (Hiba: ' + (response.error || "Nincs vĂˇlasz") + ')</p>';
                }
            });
        } else {
             contentDiv.innerHTML = '<p>A hĂˇlĂłzati kapcsolat megszakadt, nem hallod, mit mondanak.</p>';
        }
    }
}

// 2. JAVĂŤTOTT KĂ–LTSĂ‰G SZĂMOLĂ“ (EsemĂ©ny delegĂˇlĂˇs - Nincs tĂ¶bb "null" hiba!)
// Ez helyettesĂ­ti a rĂ©gi 'DOMContentLoaded' blokkot
document.addEventListener('input', function (e) {
    // FigyeljĂĽk, ha valaki Ă­r a bĂ©ta mezĹ‘kbe
    if (e.target && (e.target.id === 'beta-bonus' || e.target.id === 'beta-max')) {
        updateBetaCost();
    }
});

function updateBetaCost() {
    const fee = 10;
    const bonusInput = document.getElementById('beta-bonus');
    const maxInput = document.getElementById('beta-max');

    // Ha mĂ©g nincs betĂ¶ltve a HTML, kilĂ©pĂĽnk hiba nĂ©lkĂĽl
    if (!bonusInput || !maxInput) return;

    const bonus = parseInt(bonusInput.value) || 0;
    const max = parseInt(maxInput.value) || 0;
    const pool = bonus * max;
    const total = fee + pool;

    const totalCalcEl = document.getElementById('beta-total-calc');
    const finalCostEl = document.getElementById('beta-final-cost');

    if (totalCalcEl) totalCalcEl.textContent = pool + " Kr";
    if (finalCostEl) finalCostEl.textContent = total + " Kr";
}

// 1. FELTĂ–LTĂ‰S INDĂŤTĂSA (PIN KĂ©rĂ©ssel)
function initiateBetaUpload() {
    const title = document.getElementById('beta-title').value;
    const content = document.getElementById('beta-content').value;
    const bonus = document.getElementById('beta-bonus').value;
    const max = document.getElementById('beta-max').value;

    if (!title || !content) {
        uiAlert(t('beta_upload_missing_fields'));
        return;
    }

    // Adatok Ă¶sszegyĹ±jtĂ©se
    const payload = {
        title: title,
        contentHtml: content.replace(/\n/g, '<br>'), // SortĂ¶rĂ©sek konvertĂˇlĂˇsa HTML-re
        bonusPerReader: bonus,
        maxReaders: max
    };

    // PIN bekĂ©rĂ©se a globĂˇlis panellel
    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            sendBetaUploadToServer(pinCode, payload);
        }, t('beta_upload_confirm_html'));
    } else {
        // Ha valami csoda folytĂˇn mĂ©gsem lenne betĂ¶ltve (fallback)
        const p = prompt(t('pin_prompt_label'));
        if (p) sendBetaUploadToServer(p, payload);
    }
}

// =========================================
// === BĂ‰TA FELTĂ–LTĂ‰S KĂśLDĂ‰SE (VISSZAJELZĂ‰SSEL) ===
// =========================================

function sendBetaUploadToServer(pinCode, payload) {
    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('uploadBetaWorkToTavern', [pinCode, payload],
        function (response) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (response.success) {
                var feedbackEl = document.getElementById('pult-feedback-text');

                // JAVĂŤTVA: Sima string Ă¶sszefĹ±zĂ©s
                feedbackEl.innerHTML = '<div style="text-align: center; color: #5d3a1a;">' +
                    '<i class="fas fa-feather-alt" style="font-size: 3em; color: #8b0000; margin-bottom: 15px;"></i>' +
                    '<br><strong>' + t('beta_upload_success_title') + '</strong><br><br>' +
                    t('beta_upload_success_body') +
                    '</div>';

                feedbackEl.style.color = 'inherit';
                var againBtn = document.getElementById('pult-feedback-compose-again-btn');
                if (againBtn) againBtn.style.display = 'none';

                showPultView('feedback');

                document.getElementById('beta-title').value = '';
                document.getElementById('beta-content').value = '';
            } else {
                uiAlert(t('error_prefix') + response.error);
            }
        },
        function (e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_prefix') + e.message);
        }
    );
}

// 2. LISTA BETĂ–LTĂ‰SE
function loadBetaWorks() {
    var container = document.getElementById('beta-list-container');
    container.innerHTML = '<p style="text-align:center;">' + t('beta_list_loading') + '</p>';

    // === ĂšJ HĂŤVĂS (callBackend) ===
    // Backend: getAvailableBetaWorks
    // ParamĂ©terek: [] (ĂĽres tĂ¶mb, mert az emailt a Router intĂ©zi a TokenbĹ‘l!)
    callBackend('getAvailableBetaWorks', [],
        function (res) {
            if (res.success) {
                // Ez hĂ­vja meg a renderelĹ‘t, ami kirajzolja a cĂ­meket!
                renderBetaList(res.works);
            } else {
                // JAVĂŤTVA: Backtick helyett sima string Ă¶sszefĹ±zĂ©s
                container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>';
            }
        },
        function (err) {
            // JAVĂŤTVA: Backtick helyett sima string Ă¶sszefĹ±zĂ©s
            container.innerHTML = '<p style="color:red;">' + t('server_error_prefix') + err.message + '</p>';
        }
    );
}

// A lista kirajzolĂˇsa (Kliens oldal)
function renderBetaList(works) {
    const container = document.getElementById('beta-list-container');
    container.innerHTML = '';

    // --- 1. ĂśRES ĂLLAPOT KEZELĂ‰SE ---
    if (!works || works.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding: 20px; color: #5d3a1a;">' +
            '<i class="fas fa-feather-alt" style="font-size: 3em; opacity: 0.5; margin-bottom: 10px;"></i>' +
            '<p><strong>' + t('beta_list_empty_title') + '</strong></p>' +
            '<p style="font-size: 0.9em; font-style: italic;">' +
            t('beta_list_empty_body') +
            '</p>' +
            '<button class="btn btn-sm" style="background-color: #8b0000; color: white; margin-top: 10px;" onclick="showPultView(\'beta_upload\')">' +
            t('beta_list_empty_cta') +
            '</button>' +
            '</div>';
        return;
    }

    // --- 2. HA VANNAK MĹ°VEK, LISTĂZZUK ---
    works.forEach(function (work) {
        var div = document.createElement('div');
        div.style.cssText = "background: #fff; padding: 10px; margin-bottom: 5px; border-bottom: 1px dashed #8b4513; border-radius: 4px;";

        var actionBtn = '';

        if (work.isMyWork) {
            actionBtn = '<span style="color: #666; font-size: 0.8em; font-style: italic;">' + t('beta_list_my_work_note') + '</span>';

        } else if (work.alreadyRead) {
            actionBtn = '<button class="btn btn-sm" style="background-color: #ccc; color: #666; cursor: not-allowed;" disabled title="' + t('beta_list_already_rated_title') + '">' +
                t('beta_list_already_read') + '</button>';
        } else {
            var bonusText = '+' + work.bonus + ' Kr';
            if (work.remainingPool < work.bonus) {
                bonusText = '+' + work.remainingPool + ' Kr (' + t('beta_list_pool_end') + ')';
            }
            if (work.remainingPool <= 0) {
                bonusText = '(' + t('beta_list_base_fee') + ')';
            }

            actionBtn = '<button class="btn btn-sm" style="background-color: #2e8b57; color: white;" onclick="openBetaReader(\'' + work.id + '\', \'' + work.title + '\')">' +
                t('beta_list_read_button_prefix') + bonusText + t('beta_list_read_button_suffix') + '</button>';
        }

        // JAVĂŤTVA: Sima string Ă¶sszefĹ±zĂ©s
        div.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div style="flex: 1; padding-right: 10px;">' +
            '<strong style="color: #8b0000; font-size: 1.1em;">' + work.title + '</strong><br>' +
            '<small style="color: #555;">' + t('beta_list_author_label') + ' <strong>' + work.author + '</strong> | đź“… ' + work.date + '</small>' +
            '</div>' +
            '<div>' + actionBtn + '</div>' +
            '</div>';

        container.appendChild(div);
    });
}

// ===================================
// === BĂ‰TA OLVASĂ“ (FRONTEND) ===
// ===================================

let currentBetaWorkId = null;
let currentBetaWorkTitle = null;

// 1. OlvasĂł MegnyitĂˇsa
// (Ezt hĂ­vja a lista "OlvasĂˇs" gombja)
function openBetaReader(workId, workTitle) {
    currentBetaWorkId = workId;
    currentBetaWorkTitle = workTitle;

    var modal = document.getElementById('beta-reader-modal');
    modal.style.display = 'block';

    var contentArea = document.getElementById('reader-content-area');
    contentArea.innerHTML = '<div style="text-align:center; padding-top:100px;"><i class="fas fa-circle-notch fa-spin fa-3x" style="color:#8b0000;"></i><br><br>' + t('beta_reader_loading') + '</div>';

    callBackend('getBetaWorkContent', [workId],
        function (content) {
            contentArea.innerHTML = content;
        },
        function (e) {
            // JAVĂŤTVA: Sima string
            contentArea.innerHTML = '<div class="status-box error">' + t('beta_reader_error_prefix') + e.message + '</div>';
        }
    );
}

// Ezt a fĂĽggvĂ©nyt hĂ­vja a "đź“– Olvasok (KreditszerzĂ©s)" gomb
function listBetaWorksForReader() {
    // 1. ĂtvĂˇltunk a listĂˇzĂł nĂ©zetre a pulton belĂĽl
    showPultView('beta_list');

    // 2. MeghĂ­vjuk az adatbetĂ¶ltĹ‘ fĂĽggvĂ©nyt (ami mĂˇr lĂ©tezik loadBetaWorks nĂ©ven)
    // EllenĹ‘rizzĂĽk, hogy lĂ©tezik-e, hogy ne legyen hiba
    if (typeof loadBetaWorks === 'function') {
        loadBetaWorks();
    } else {
        console.error("Hiba: A 'loadBetaWorks' fĂĽggvĂ©ny nem talĂˇlhatĂł!");
        document.getElementById('beta-list-container').innerHTML = t('beta_reader_loader_missing');
    }
}

// 2. KilĂ©pĂ©s (MegerĹ‘sĂ­tĂ©ssel)
function closeBetaReader() {
    // EllenĹ‘rizzĂĽk, Ă­rt-e mĂˇr valamit
    const opinion = document.getElementById('log-opinion').value;

    // BelsĹ‘ fĂĽggvĂ©ny: Ez vĂ©gzi a tĂ©nyleges bezĂˇrĂˇst Ă©s tĂ¶rlĂ©st
    const veglegesBezaras = function () {
        document.getElementById('beta-reader-modal').style.display = 'none';
        document.getElementById('beta-log-form').reset();
    };

    if (opinion.length > 10) {
        // 1. ESET: Van szĂ¶veg -> KĂ©rdezĂĽnk
        uiConfirm(
            t('beta_reader_exit_confirm'), // Ăśzenet
            t('beta_reader_exit_title'), // CĂ­m
            function () {
                // Ez a CALLBACK: Csak akkor fut le, ha az "Igen"-re nyomott
                veglegesBezaras();
            }
        );
    } else {
        // 2. ESET: Nincs szĂ¶veg -> Azonnal bezĂˇrjuk kĂ©rdĂ©s nĂ©lkĂĽl
        veglegesBezaras();
    }
}

// 3. NaplĂł BekĂĽldĂ©se
function submitLogbook() {
    const gender = document.getElementById('log-gender').value;
    const age = document.getElementById('log-age').value;
    const genre = document.getElementById('log-genre').value;
    const language = document.getElementById('log-language').value;
    const opinion = document.getElementById('log-opinion').value;

    // ValidĂˇciĂł
    if (!gender || !age || !genre || !language) {
        uiAlert(t('beta_log_missing_demo'));
        return;
    }
    if (!opinion || opinion.length < 50) {
        uiAlert(t('beta_log_too_short'));
        return;
    }

    const logData = {
        gender: gender,
        age: age,
        genre: genre,
        language: language,
        opinionHtml: opinion.replace(/\n/g, '<br>'), // SortĂ¶rĂ©sek megĹ‘rzĂ©se
        workTitle: currentBetaWorkTitle
    };

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('submitBetaLogbook', [currentBetaWorkId, logData],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert(res.message);
                document.getElementById('beta-reader-modal').style.display = 'none';
                document.getElementById('beta-log-form').reset();
                if (typeof listBetaWorksForReader === 'function') listBetaWorksForReader();
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_prefix') + e.message);
        }
    );
}

// ===================================
// === SZERZĹI STATISZTIKA (FRONTEND) ===
// ===================================

// 1. SajĂˇt mĹ±vek listĂˇzĂˇsa
function showMyBetaStats() {
    showPultView('beta_my_works');

    const container = document.getElementById('beta-my-works-container');
    container.innerHTML = '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> ' + t('beta_my_works_loading') + '</p>';

    // === ĂšJ HĂŤVĂS ===
    // Backend: getAuthorBetaWorks
    // ParamĂ©terek: []
    callBackend('getAuthorBetaWorks', [],
        function (res) {
            if (res.success) {
                renderMyWorksList(res.works);
            } else {
                container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>';
            }
        },
        function (err) { container.innerHTML = '<p style="color:red;">' + t('server_error_prefix') + err.message + '</p>'; }
    );
}

// Lista kirajzolĂˇsa (SajĂˇt MĹ±vek) - BĹVĂŤTETT VERZIĂ“
function renderMyWorksList(works) {
    var container = document.getElementById('beta-my-works-container');
    container.innerHTML = '';

    if (works.length === 0) {
        container.innerHTML = '<p>' + t('beta_my_works_empty') + '</p>';
        return;
    }

    works.forEach(function (work) {
        var div = document.createElement('div');
        div.style.cssText = "background: #fff; padding: 10px; margin-bottom: 8px; border-bottom: 1px dashed #8b4513; border-radius: 5px;";

        var statusColor = work.status === 'AKTĂŤV' ? 'green' : 'gray';

        var controlButtons = '';
        if (work.status === 'AKTĂŤV') {
            // JAVĂŤTVA: String Ă¶sszefĹ±zĂ©s
            controlButtons = '<div style="margin-top: 8px; display: flex; gap: 5px; justify-content: flex-end;">' +
                '<button class="btn btn-sm" style="background-color: #d2691e; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaRefill(\'' + work.id + '\', \'' + work.title + '\')">đź’° ' + t('beta_my_works_refill_button') + '</button> ' +
                '<button class="btn btn-sm" style="background-color: #8b0000; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaClose(\'' + work.id + '\', \'' + work.title + '\')">âťŚ ' + t('beta_my_works_close_button') + '</button>' +
                '</div>';
        } else {
            controlButtons = '<div style="text-align: right; font-size: 0.8em; color: gray; margin-top:5px;">' + t('beta_my_works_closed_note') + '</div>';
        }

        // JAVĂŤTVA: String Ă¶sszefĹ±zĂ©s
        div.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
            '<strong style="color: #5d3a1a;">' + work.title + '</strong><br>' +
            '<small style="color: #555;">' + work.date + ' | <span style="color:' + statusColor + '; font-weight:bold;">' + work.status + '</span></small>' +
            '</div>' +
            '<button class="btn btn-sm" style="background-color: #4682b4; color: white;" onclick="initiateStatPurchase(\'' + work.id + '\')">đź“Š ' + t('beta_my_works_report_button') + '</button>' +
            '</div>' +
            controlButtons;

        container.appendChild(div);
    });
}

// 2. VĂˇsĂˇrlĂˇs indĂ­tĂˇsa (PIN bekĂ©rĂ©se)
function initiateStatPurchase(workId) {
    uiConfirm(
        t('beta_stats_purchase_message'), // Ăśzenet
        t('beta_stats_purchase_title'), // CĂ­m
        function () {
            // Ez a kĂłd fut le, ha a felhasznĂˇlĂł az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function (pinCode) {
                    // Ez fut le, ha beĂ­rta a PIN-t Ă©s rĂˇnyomott a rendben gombra
                    fetchBetaStats(workId, pinCode);
                }, t('beta_stats_purchase_confirm_title'));
            } else {
                // Ha valamiĂ©rt nincs betĂ¶ltve a PIN bekĂ©rĹ‘ script, szĂłlunk (szĂ©pen)
                uiAlert(t('pin_module_missing'), t('system_error_title'));
            }
        }
    );
}

// 3. Adatok lekĂ©rĂ©se Ă©s megjelenĂ­tĂ©se
function fetchBetaStats(workId, pinCode) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ĂšJ HĂŤVĂS ===
    // Backend: buyBetaReport
    // ParamĂ©terek: [pinCode, workId] (Figyelj a sorrendre a backendben!)
    // RĂ©gi hĂ­vĂˇs: buyBetaReport(email, pin, workId) -> Ăšj backendben: (userEmail, pin, workId)
    callBackend('buyBetaReport', [pinCode, workId],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                renderStatsTable(res.title, res.data);
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_prefix') + e.message);
        }
    );
}

// TĂˇblĂˇzat kirajzolĂˇsa a Modalban
function renderStatsTable(title, rows) {
    var modal = document.getElementById('beta-stats-modal');
    var titleEl = document.getElementById('stats-modal-title');
    var tbody = document.getElementById('stats-table-body');

    // JAVĂŤTVA
    titleEl.textContent = t('beta_report_title_prefix') + title;
    tbody.innerHTML = '';

    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">' + t('beta_report_empty') + '</td></tr>';
    } else {
        rows.forEach(function (row) {
            var tr = document.createElement('tr');
            var cellStyle = "padding: 8px; border: 1px solid #eee; vertical-align: top;";

            // JAVĂŤTVA: HosszĂş string Ă¶sszefĹ±zĂ©s
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
// === BĂ‰TA MĹ°VEK KEZELĂ‰SE (USER) ===
// ===================================

// 1. UTĂNTĂ–LTĂ‰S INDĂŤTĂSA
function initiateBetaRefill(workId, title) {
    // Mennyit tĂ¶ltsĂĽnk?
    const amountStr = prompt(t('beta_refill_prompt_prefix') + title + t('beta_refill_prompt_suffix'));
    if (!amountStr) return; // MĂ©gse

    const amount = parseInt(amountStr);
    if (!amount || amount <= 0) {
        uiAlert(t('invalid_amount'));
        return;
    }

    // PIN bekĂ©rĂ©se
    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            sendManageRequest(pinCode, 'REFILL', workId, amount);
        }, t('beta_refill_confirm_title'));
    } else {
        const p = prompt(t('pin_prompt_label'));
        if (p) sendManageRequest(p, 'REFILL', workId, amount);
    }
}

// 2. LEZĂRĂS INDĂŤTĂSA
function initiateBetaClose(workId, title) {
    // A szĂ¶veg formĂˇzĂˇsa HTML-lel a szebb megjelenĂ©sĂ©rt
    const message = t('beta_close_confirm_html_prefix') + title + t('beta_close_confirm_html_suffix');

    uiConfirm(
        message,
        t('beta_close_title'),
        function () {
            // Ez fut le, ha az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function (pinCode) {
                    // Ez fut le, ha beĂ­rta a PIN-t
                    sendManageRequest(pinCode, 'CLOSE', workId, 0);
                }, t('beta_close_confirm_title'));
            } else {
                // Prompt helyett hibaĂĽzenet, ha nincs PIN modul
                uiAlert(t('pin_module_missing'), t('system_error_title'));
            }
        }
    );
}

// KĂ¶zĂ¶s szerverhĂ­vĂł
function sendManageRequest(pinCode, action, workId, amount) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ĂšJ HĂŤVĂS ===
    // Backend: manageBetaWork
    // ParamĂ©terek: [pinCode, action, workId, amount]
    callBackend('manageBetaWork', [pinCode, action, workId, amount],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert(t('success_prefix') + res.message);
                showMyBetaStats(); // Lista frissĂ­tĂ©se
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (e) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_prefix') + e.message);
        }
    );
}


//  ========
//  ==BANK==
//  ========

/**
 * SEGĂ‰DFĂśGGVĂ‰NY: InicializĂˇlja a Bank szekciĂłt a Piac oldalon.
 */
function initializeBankSection() {
    var exchangeBtn = document.getElementById('bank-exchange-btn');
    var sendBtn = document.getElementById('bank-send-btn');
    var itemTypeSelect = document.getElementById('bank-send-item-type');
    var itemSelectorDiv = document.getElementById('bank-send-item-selector');

    exchangeBtn.onclick = function () {
        var amount = document.getElementById('bank-exchange-amount').value;
        var pinCode = document.getElementById('bank-exchange-pin').value;

        if (!amount || amount <= 0) { uiAlert(t('bank_exchange_positive_amount')); return; }
        if (!pinCode) { uiAlert(t('pin_required')); return; }

        document.getElementById('loading-overlay').style.display = 'flex';

        callBackend('exchangeTalentumToCredit', [amount, pinCode],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(response.message || response.error);
                if (response.success) {
                    updateCreditDisplay();
                    document.getElementById('bank-exchange-amount').value = '';
                    document.getElementById('bank-exchange-pin').value = '';
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('server_error_prefix') + err.message);
            }
        );
    };

    itemTypeSelect.onchange = function () {
        var selectedType = this.value;
        itemSelectorDiv.innerHTML = '';

        if (!selectedType) return;

        if (selectedType === 'kredit' || selectedType === 'talentum') {
            var amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.id = 'bank-send-item-identifier';
            // JAVĂŤTVA: String Ă¶sszefĹ±zĂ©s
            amountInput.placeholder = t('bank_send_amount_placeholder_prefix') + selectedType + t('bank_send_amount_placeholder_suffix');
            amountInput.style.width = '100%';
            amountInput.style.padding = '8px';
            itemSelectorDiv.appendChild(amountInput);
        } else {
            var itemsKey = null;
            switch (selectedType) {
                case 'masolat': itemsKey = 'masolatok'; break;
                case 'tekercs': itemsKey = 'tekercsek'; break;
                case 'kincs': itemsKey = 'kincsek'; break;
                case 'terkep': itemsKey = 'terkepek'; break;
                case 'hajok': itemsKey = 'hajok'; break;
                case 'buvarhajok': itemsKey = 'buvarhajok'; break;
                case 'leghajok': itemsKey = 'leghajok'; break;
            }

            if (!userTradableItemsCache) {
                // JAVĂŤTVA: Sima string
                itemSelectorDiv.innerHTML = '<p>' + t('bank_items_loading') + '</p>';

                callBackend('getUserTradableItems', [],
                    function (response) {
                        if (response.success) {
                            userTradableItemsCache = response.items;
                            itemTypeSelect.onchange();
                        } else {
                            itemSelectorDiv.innerHTML = '<p>' + t('bank_items_load_error') + '</p>';
                        }
                    },
                    function (err) { console.error(err); }
                );
                return;
            }

            var items = itemsKey ? userTradableItemsCache[itemsKey] : [];

            if (items && items.length > 0) {
                var itemSelect = document.createElement('select');
                itemSelect.id = 'bank-send-item-identifier';
                itemSelect.style.width = '100%';
                itemSelect.style.padding = '8px';

                var optionsHTML = '<option value="">' + t('bank_select_item_placeholder') + '</option>';
                // Sima sort()
                items.sort(function (a, b) { return a.name.localeCompare(b.name); });

                items.forEach(function (item) {
                    if (item.identifier) {
                        // JAVĂŤTVA: String Ă¶sszefĹ±zĂ©s
                        optionsHTML += '<option value="' + item.identifier + '">' + item.name + '</option>';
                    }
                });
                itemSelect.innerHTML = optionsHTML;
                itemSelectorDiv.appendChild(itemSelect);
            } else {
                itemSelectorDiv.innerHTML = '<p>' + t('bank_no_items_for_type') + '</p>';
            }
        }
    };

    sendBtn.onclick = function () {
        var recipientEmail = document.getElementById('bank-send-recipient').value;
        var itemType = document.getElementById('bank-send-item-type').value;
        var itemIdentifierEl = document.getElementById('bank-send-item-identifier');
        var pinCode = document.getElementById('bank-send-pin').value;

        if (!recipientEmail || !itemType || !itemIdentifierEl || !itemIdentifierEl.value || !pinCode) {
            uiAlert(t('bank_send_fill_all'));
            return;
        }

        var itemIdentifier = itemIdentifierEl.value;

        document.getElementById('loading-overlay').style.display = 'flex';

        callBackend('sendItemToUser', [recipientEmail, itemType, itemIdentifier, pinCode],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(response.message || response.error);
                if (response.success) {
                    if (response.offerLogPublication === true) {
                        uiAlert(t('bank_ship_transferred_notice'));
                    }
                    userTradableItemsCache = null;
                    updateCreditDisplay();
                    loadPage('piac_oldal');
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('server_error_prefix') + err.message);
            }
        );
    };

    if (!userTradableItemsCache) {
        callBackend('getUserTradableItems', [],
            function (response) {
                if (response.success) {
                    userTradableItemsCache = response.items;
                    console.log("Bank: EladhatĂł tĂ©telek gyorsĂ­tĂłtĂˇrazva.");
                    if (itemTypeSelect.value && itemTypeSelect.value !== 'kredit' && itemTypeSelect.value !== 'talentum') {
                        itemTypeSelect.onchange();
                    }
                }
            },
            function (err) { console.warn("Cache init hiba:", err); }
        );
    }
}

// =========================================
// === PIAC RENDSZER (HIBRID SZĹ°RĂ‰SSEL) ===
// =========================================

// GlobĂˇlis vĂˇltozĂłk a piachoz
var currentItemToSell = { identifier: null, type: null };
var currentOfferAction = { action: null, listingId: null, offerId: null };
var userTradableItemsCache = null;
var marketListingsCache = [];
var CLIENT_SIDE_FILTER_THRESHOLD = 100; // E felett szerver oldali a keresĂ©s

/**
 * Piac oldal inicializĂˇlĂˇsa (HIBRID SZĹ°RĂ‰SSEL)
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

    // Loader megjelenĂ­tĂ©se
    if (loaders.piaci) loaders.piaci.style.display = 'block';
    if (loaders.ajanlatok) loaders.ajanlatok.style.display = 'block';

    loadMyListedItems();
    initializeSellableItemsSection();
    loadMyActiveOffers(containers.ajanlatok, loaders.ajanlatok);

    // BANK SZEKCIĂ“ INDĂŤTĂSA (FeltĂ©telezzĂĽk, hogy a fĂĽggvĂ©ny mĂˇr lĂ©tezik feljebb!)
    if (typeof initializeBankSection === 'function') {
        initializeBankSection();
    }

    var searchInput = document.getElementById('piac-kereso');
    var searchButton = document.getElementById('piac-kereso-gomb');

    // 1. TĂ©telszĂˇm lekĂ©rĂ©se a dĂ¶ntĂ©shez (callBackend)
    callBackend('getMarketItemCount', [], function (response) {
        if (!response.success) {
            containers.piaci.innerHTML = '<p style="color:red;">' + t('market_load_error_prefix') + response.error + '</p>';
            return;
        }

        // 2. DĂ¶ntĂ©s a szĹ±rĂ©si mĂłd kĂ¶zĂ¶tt
        if (response.count <= CLIENT_SIDE_FILTER_THRESHOLD) {
            // --- KLIENSOLDALI MĂ“D (Gyors, mindent letĂ¶lt) ---
            if (searchButton) searchButton.style.display = 'none';
            if (searchInput) searchInput.placeholder = t('market_filter_placeholder');

            // Null paramĂ©terrel mindent lekĂ©rĂĽnk
            callBackend('getMarketListings', [null], function (listingResponse) {
                if (loaders.piaci) loaders.piaci.style.display = 'none';
                if (listingResponse.success) {
                    marketListingsCache = listingResponse.listings;
                    displayListings(marketListingsCache, containers.piaci);

                    // Kliens oldali keresĂ©s esemĂ©nykezelĹ‘je
                    searchInput.onkeyup = function () {
                        var searchTerm = this.value.toLowerCase();
                        var filteredList = marketListingsCache.filter(function (item) {
                            return item.itemName.toLowerCase().indexOf(searchTerm) !== -1;
                        });
                        displayListings(filteredList, containers.piaci);
                    };
                }
            });

        } else {
            // --- SZERVEROLDALI MĂ“D (KĂ­mĂ©lĹ‘, csak keresĂ©sre tĂ¶lt) ---
            if (loaders.piaci) loaders.piaci.style.display = 'none';
            if (searchButton) searchButton.style.display = 'inline-block';
            if (searchInput) searchInput.placeholder = t('market_search_placeholder');
            containers.piaci.innerHTML = '<p>' + t('market_search_help') + '</p>';

            searchButton.onclick = function () {
                var searchTerm = searchInput.value;
                if (!searchTerm || searchTerm.length < 2) {
                    if (typeof uiAlert === 'function') uiAlert(t('market_search_min_chars'));
                    return;
                }
                if (loaders.piaci) loaders.piaci.style.display = 'block';
                containers.piaci.innerHTML = '';

                callBackend('getMarketListings', [{ name: searchTerm }], function (listingResponse) {
                    if (loaders.piaci) loaders.piaci.style.display = 'none';
                    if (listingResponse.success) {
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
        container.innerHTML = "<p>Nincsenek a keresĂ©snek megfelelĹ‘ hirdetĂ©sek.</p>";
        return;
    }

    listings.forEach(function (listing) {
        // SajĂˇt hirdetĂ©s szĹ±rĂ©se (ha a szerver nem tette meg)
        if (listing.sellerEmail && currentUserEmail && listing.sellerEmail.toLowerCase() === currentUserEmail.toLowerCase()) return;

        var entryDiv = document.createElement('div');
        entryDiv.className = 'item-entry';

        var actionButtonHTML = '';
        var priceOrOfferInfo = '';

        if (listing.isFixedPrice) {
            priceOrOfferInfo = 'Fix Ăˇr: ' + listing.price + ' kr';
            actionButtonHTML = '<button class="btn buy-now-btn">Megveszem (' + listing.price + ' kr)</button>';
        } else {
            priceOrOfferInfo = 'AjĂˇnlat alapĂş';
            if (listing.buyNowPrice) {
                priceOrOfferInfo += ' (Azonnali vĂ©tel: ' + listing.buyNowPrice + ' kr)';
                actionButtonHTML = '<button class="btn make-offer-btn">AjĂˇnlatot teszek</button> ' +
                    '<button class="btn buy-now-btn">Megveszem (' + listing.buyNowPrice + ' kr)</button>';
            } else {
                actionButtonHTML = '<button class="btn make-offer-btn">AjĂˇnlatot teszek</button>';
            }
        }

        // HTML Ă¶sszeĂˇllĂ­tĂˇsa string Ă¶sszefĹ±zĂ©ssel (NEM backtick)
        entryDiv.innerHTML = '<div class="item-details">' +
            '<div class="item-title">' + listing.itemName + '</div>' +
            '<div class="item-author"><em>' + priceOrOfferInfo + '</em></div>' +
            '<small>EladĂł: ' + listing.sellerEmail + '</small>' +
            '</div>' +
            '<div class="item-actions">' + actionButtonHTML + '</div>';

        var buyNowBtn = entryDiv.querySelector('.buy-now-btn');
        var makeOfferBtn = entryDiv.querySelector('.make-offer-btn');

        if (buyNowBtn) {
            buyNowBtn.onclick = function () { buyNowAction(listing.listingId); };
        }
        if (makeOfferBtn) {
            makeOfferBtn.onclick = function () { openOfferModal('make', listing.listingId, null, listing.itemName); };
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

    // callBackend hasznĂˇlata (email nĂ©lkĂĽl)
    callBackend('getMyListedItems', [], function (response) {
        loader.style.display = 'none';
        if (!response.success) {
            container.innerHTML = '<p style="color:red;">Hiba: ' + response.error + '</p>';
            return;
        }

        if (response.listings.length === 0) {
            container.innerHTML = "<p>Nincsenek jelenleg meghirdetett tĂ©teleid.</p>";
        } else {
            response.listings.forEach(function (listing) {
                var priceInfo = listing.isFixedPrice ? t('market_fixed_price_prefix') + listing.price + t('market_price_suffix') : t('market_offer_based');
                if (!listing.isFixedPrice && listing.buyNowPrice) priceInfo += t('market_buy_now_prefix') + listing.buyNowPrice + t('market_buy_now_suffix');

                var entryDiv = document.createElement('div');
                entryDiv.className = 'item-entry';

                // HTML Ă¶sszeĂˇllĂ­tĂˇsa
                entryDiv.innerHTML = '<div class="item-details">' +
                    '<div class="item-title">' + listing.itemName + '</div>' +
                    '<div class="item-author"><em>' + priceInfo + '</em></div>' +
                    '</div>' +
                    '<div><button class="btn withdraw-listing-btn" style="background-color: #c82333;">' + t('market_withdraw_button') + '</button></div>';

                entryDiv.querySelector('.withdraw-listing-btn').onclick = function () { withdrawListingAction(listing.listingId, listing.itemName); };
                container.appendChild(entryDiv);
            });
        }
    });
}

function withdrawListingAction(listingId, itemName) {
    var pinCode = prompt(t('market_withdraw_pin_prefix') + itemName + t('market_withdraw_pin_suffix'));
    if (pinCode === null || !pinCode) return;

    document.getElementById('loading-overlay').style.display = 'flex';
    // callBackend hasznĂˇlata (email nĂ©lkĂĽl)
    callBackend('withdrawListing', [listingId, pinCode], handleServerResponse);
}

function initializeSellableItemsSection() {
    var typeSelect = document.getElementById('sell-item-type-select');
    var itemSelect = document.getElementById('sell-item-select');
    var sellButton = document.getElementById('sell-selected-item-button');
    var loader = document.getElementById('sajat-eladhato-lista-loader');

    typeSelect.onchange = function () {
        var selectedType = this.value;
        itemSelect.innerHTML = '<option value="">' + t('market_select_item_placeholder') + '</option>';
        if (!selectedType) return;

        loader.style.display = 'block';

        callBackend('getUserTradableItems', [], function (response) {
            loader.style.display = 'none';
            if (response.success) {
                userTradableItemsCache = response.items;
                var itemsKey = (selectedType === 'masolat') ? 'masolatok' :
                    (selectedType === 'tekercs') ? 'tekercsek' :
                        (selectedType === 'kincs') ? 'kincsek' :
                            (selectedType === 'terkep') ? 'terkepek' : selectedType;

                var items = userTradableItemsCache[itemsKey] || [];
                items.forEach(function (item) {
                    var opt = document.createElement('option');
                    opt.value = item.identifier;
                    opt.textContent = item.name;
                    itemSelect.appendChild(opt);
                });
                itemSelect.style.display = 'block';
            }
        });
    };

    sellButton.onclick = function () {
        var type = typeSelect.value;
        var id = itemSelect.value;
        var name = itemSelect.options[itemSelect.selectedIndex].text;
        if (type && id) openSellModal(id, type, name);
    };
}

function loadMyActiveOffers(container, loader) {
    callBackend('getMyActiveOffers', [], function (response) {
        if (loader) loader.style.display = 'none';
        if (response.success && response.offers.length > 0) {
            container.innerHTML = '';
            response.offers.forEach(function (offer) {
                var entryDiv = document.createElement('div');
                entryDiv.className = 'item-entry';

                // HTML Ă¶sszeĂˇllĂ­tĂˇsa
                entryDiv.innerHTML = '<div class="item-details"><div class="item-title">' + t('market_offer_label_prefix') + offer.listingItemName + '</div></div>' +
                    '<div><button class="btn retract-offer-btn" style="background-color: #c82333;">' + t('market_retract_button') + '</button></div>';

                entryDiv.querySelector('.retract-offer-btn').onclick = function () { retractOfferAction(offer.offerId); };
                container.appendChild(entryDiv);
            });
        }
    });
}

function buyNowAction(listingId) {
    var pinCode = prompt(t('market_buy_pin_prompt'));
    if (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        // callBackend, email nĂ©lkĂĽl
        callBackend('buyNow', [listingId, pinCode], handleServerResponse);
    }
}

function retractOfferAction(offerId) {
    var pinCode = prompt(t('market_retract_pin_prompt'));
    if (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        // callBackend, email nĂ©lkĂĽl
        callBackend('retractOffer', [offerId, pinCode], handleServerResponse);
    }
}

function openOfferModal(action, listingId, offerId, itemName) {
    currentOfferAction = { action: action, listingId: listingId, offerId: offerId };
    document.getElementById('ajanlat-modal-item-name').textContent = itemName;

    var kincsekContainer = document.getElementById('ajanlat-kincsek-lista');
    kincsekContainer.innerHTML = '';

    if (userTradableItemsCache && userTradableItemsCache.kincsek) {
        userTradableItemsCache.kincsek.forEach(function (kincs) {
            // String Ă¶sszefĹ±zĂ©s
            kincsekContainer.innerHTML += '<label><input type="checkbox" class="kincs-checkbox" value="' + kincs.identifier + '"> ' + kincs.name + '</label><br>';
        });
    }
    document.getElementById('ajanlat-modal').style.display = 'flex';
}

function setupOfferModalListeners() {
    var submitBtn = document.getElementById('ajanlat-submit-btn');
    if (submitBtn) {
        submitBtn.onclick = function () {
            var pinCode = document.getElementById('ajanlat-pin').value;
            var offeredItems = {
                kredit: parseInt(document.getElementById('ajanlat-kredit').value, 10) || 0,
                kincsek: Array.from(document.querySelectorAll('.kincs-checkbox:checked')).map(function (cb) { return cb.value; })
            };
            document.getElementById('loading-overlay').style.display = 'flex';
            var func = (currentOfferAction.action === 'make') ? 'makeOffer' : 'addToOffer';
            // listingId vagy offerId attĂłl fĂĽggĹ‘en mi az action, email nĂ©lkĂĽl
            var params = (currentOfferAction.action === 'make') ? [currentOfferAction.listingId, offeredItems, pinCode] : [currentOfferAction.offerId, offeredItems, pinCode];

            callBackend(func, params, handleServerResponse);
        };
    }
}

function setupSellModalListeners() {
    // --- SZĂśKSĂ‰GES ELEMEK ---
    var fixedPriceContainer = document.getElementById('fixed-price-container');
    var buyNowPriceContainer = document.getElementById('buy-now-price-container');
    var priceTypeRadios = document.querySelectorAll('input[name="priceType"]');
    var submitBtn = document.getElementById('hirdetes-submit-btn');

    if (!fixedPriceContainer || !buyNowPriceContainer || !priceTypeRadios || !submitBtn) return;

    // --- RĂDIĂ“GOMBOK ESEMĂ‰NYKEZELĹJE ---
    for (var i = 0; i < priceTypeRadios.length; i++) {
        priceTypeRadios[i].onchange = function () {
            var isFixedSelected = (this.value === 'fixed');
            fixedPriceContainer.style.display = isFixedSelected ? 'block' : 'none';
            buyNowPriceContainer.style.display = isFixedSelected ? 'none' : 'block';
        };
    }

    // --- SUBMIT GOMB ---
    submitBtn.onclick = function () {
        var isFixedPrice = document.querySelector('input[name="priceType"]:checked').value === 'fixed';
        var priceInput = document.getElementById('hirdetes-ar');
        var buyNowInput = document.getElementById('hirdetes-buy-now-ar');
        var pinCode = document.getElementById('hirdetes-pin').value;

        var priceValue = null;
        var buyNowValue = null;

        if (!pinCode) { if (typeof uiAlert === 'function') uiAlert(t('pin_required')); return; }

        if (isFixedPrice) {
            priceValue = priceInput.value;
            if (!priceValue || parseFloat(priceValue) <= 0) {
                if (typeof uiAlert === 'function') uiAlert(t('market_fixed_price_invalid'));
                return;
            }
            buyNowValue = null;
        } else {
            priceValue = null;
            buyNowValue = buyNowInput ? buyNowInput.value.trim() : '';
            if (buyNowValue !== '' && (isNaN(parseFloat(buyNowValue)) || parseFloat(buyNowValue) <= 0)) {
                if (typeof uiAlert === 'function') uiAlert(t('market_buy_now_invalid'));
                return;
            }
            if (buyNowValue === '') buyNowValue = null;
        }

        document.getElementById('loading-overlay').style.display = 'flex';

        // callBackend, email nĂ©lkĂĽl
        callBackend('listItemForSale', [currentItemToSell.identifier, currentItemToSell.type, isFixedPrice, priceValue, pinCode, buyNowValue],
            handleServerResponse,
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (typeof uiAlert === 'function') uiAlert(t('market_list_error_prefix') + err.message);
                var pinInput = document.getElementById('hirdetes-pin');
                if (pinInput) pinInput.value = '';
            }
        );
    };
}

// KĂ¶zĂ¶s vĂˇlaszkezelĹ‘ fĂĽggvĂ©ny
function handleServerResponse(response) {
    document.getElementById('loading-overlay').style.display = 'none';

    // Modalok bezĂˇrĂˇsa, ha vannak
    var hModal = document.getElementById('hirdetes-modal');
    if (hModal) hModal.style.display = 'none';
    var aModal = document.getElementById('ajanlat-modal');
    if (aModal) aModal.style.display = 'none';

    // Reset mezĹ‘k
    var idsToReset = ['hirdetes-pin', 'hirdetes-ar', 'ajanlat-pin', 'ajanlat-kredit', 'hirdetes-buy-now-ar'];
    idsToReset.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.value = '';
    });

    if (typeof uiAlert === 'function') uiAlert(response.message || response.error);

    if (response.success) {
        userTradableItemsCache = null;
        loadPage('piac_oldal');
    }
}

// =========================================
// === HAJĂ“MĹ°HELY FUNKCIĂ“K (JAVĂŤTOTT)    ===
// =========================================

var shipyardData = null;
var userCredits = 0; // Helyi vĂˇltozĂł a pontos szĂˇmĂ­tĂˇshoz

// InicializĂˇlĂˇs
function initShipyard() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    callBackend('getShipyardData', [],
        function (data) {
            // SIKER ĂG
            shipyardData = data;

            if (typeof playerCredit !== 'undefined') {
                userCredits = Number(playerCredit);
            }

            renderRepairList();
            renderMarketList();
            updateBuildOptions();

            if (overlay) overlay.style.display = 'none';
        },
        function (err) {
            // HIBA ĂG
            if (overlay) overlay.style.display = 'none';
            uiAlert(t('shipyard_load_error_prefix') + err.message);
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
        container.innerHTML = '<p style="text-align:center; padding:20px;">' + t('shipyard_no_owned_ships') + '</p>';
        return;
    }

    shipyardData.playerShips.forEach(function (ship) {
        var div = document.createElement('div');
        div.className = 'work-card';
        div.style.borderLeftColor = 'var(--color-secondary)';

        var html = '<h4>' + ship.name + ' (' + ship.type + ')</h4>' +
            '<div style="display:flex; justify-content:space-between; margin-bottom:10px;">' +
            '<span>' + t('shipyard_status_label') + '</span>' +
            '<span style="font-weight:bold; color:var(--color-accent);">' + ship.hp + ' HP</span>' +
            '</div>' +
            '<div class="action-row" style="background:#f9f9f9; padding:10px; border-radius:5px;">' +
            '<input type="number" min="1" placeholder="' + t('shipyard_repair_placeholder') + '" class="hp-input" id="repair-input-' + ship.id + '" style="width:70px; margin-bottom:0;">' +
            '<button class="btn btn-sm" onclick="confirmRepair(\'' + ship.id + '\')">' + t('shipyard_repair_button') + '</button>' +
            '</div>' +
            '<div id="repair-cost-' + ship.id + '" style="font-size: 0.9em; color: #666; margin-top:5px; text-align:right; font-style:italic;">' + t('shipyard_cost_prefix') + '0 ' + t('credit_short') + '</div>';

        div.innerHTML = html;
        container.appendChild(div);

        var input = div.querySelector('#repair-input-' + ship.id);
        if (input) {
            input.addEventListener('input', function () {
                var val = this.value;
                var amount = parseInt(val) || 0;
                var total = amount * 100;

                // JAVĂŤTVA: A szinkronizĂˇlt userCredits vĂˇltozĂłt hasznĂˇljuk
                var currentMoney = userCredits;

                var display = document.getElementById('repair-cost-' + ship.id);
                if (display) {
                    display.innerText = t('shipyard_cost_prefix') + total + ' ' + t('credit_long');

                    // JAVĂŤTVA: Csak akkor Ă­rjuk ki a hibĂˇt, ha TĂ‰NYLEG nincs elĂ©g pĂ©nz
                    if (total > currentMoney) {
                        display.style.color = 'red';
                        display.innerText += t('shipyard_no_funds_suffix');
                    } else {
                        display.style.color = '#666';
                        // Ha van fedezet, nem Ă­runk ki semmit, csak az Ăˇrat (a szĂ­n visszaĂˇllĂ­tĂˇsa elĂ©g)
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
        if (typeof uiAlert === 'function') uiAlert(t('invalid_number'));
        return;
    }

    var cost = amount * 100;

    // FeltĂ©telezzĂĽk, hogy a requestPin lĂ©tezik
    requestPin(function (pin) {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'flex';

        var ship = null;
        // BiztonsĂˇgi ellenĹ‘rzĂ©s, hogy lĂ©tezik-e a globĂˇlis adat
        if (typeof shipyardData !== 'undefined' && shipyardData.playerShips) {
            for (var i = 0; i < shipyardData.playerShips.length; i++) {
                if (shipyardData.playerShips[i].id === shipId) { ship = shipyardData.playerShips[i]; break; }
            }
        }

        if (!ship) {
            if (overlay) overlay.style.display = 'none';
            console.error(t('shipyard_ship_not_found_error'));
            return;
        }

        // --- JAVĂŤTOTT RĂ‰SZ: callBackend ---
        // NEM kĂĽldjĂĽk a currentUserEmail-t!
        // ParamĂ©terek sorrendje: transactionType, dataObject, pin
        callBackend('processShipyardTransaction', ['repair', {
            sheetName: ship.category,
            rowIndex: ship.rowIndex,
            hpToAdd: amount,
            id: ship.id
        }, pin],
            function (res) {
                if (overlay) overlay.style.display = 'none';

                if (res.success) {
                    if (typeof uiAlert === 'function') uiAlert(res.message);

                    // Kredit frissĂ­tĂ©se
                    if (res.newBalance !== undefined && typeof updateLocalCredit === 'function') {
                        updateLocalCredit(res.newBalance);
                    } else {
                        updateCreditDisplay(); // Fallback
                    }

                    // ĂšjratĂ¶ltjĂĽk a mĹ±helyt
                    if (typeof initShipyard === 'function') initShipyard();
                } else {
                    if (typeof uiAlert === 'function') uiAlert(t('error_prefix') + res.error);
                }
            },
            function (err) {
                if (overlay) overlay.style.display = 'none';
                if (typeof uiAlert === 'function') uiAlert(t('server_error_prefix') + err.message);
            });

    }, t('shipyard_repair_prompt_prefix') + cost + ' ' + t('credit_long') + t('shipyard_repair_prompt_suffix'));
}

function renderMarketList() {
    var sellContainer = document.getElementById('market-sell-list');
    if (sellContainer) {
        sellContainer.innerHTML = '';
        var ownShipsFound = false;
        if (shipyardData && shipyardData.playerShips) {
            shipyardData.playerShips.forEach(function (ship) {
                if (!ship.canSell) return;
                ownShipsFound = true;
                var price = ship.hp * 100;
                var div = document.createElement('div');
                div.className = 'work-card';
                div.style.borderLeftColor = '#2e8b57';
                div.innerHTML = '<h4>' + ship.name + '</h4>' +
                    '<p style="margin:5px 0; font-size:0.9em;">' + ship.type + ' | HP: <b>' + ship.hp + '</b></p>' +
                    '<button class="btn btn-sm" style="background:#c82333; width:100%;" onclick="confirmSell(\'' + ship.id + '\', ' + price + ')">' + t('shipyard_sell_button_prefix') + price + ' ' + t('credit_short') + '</button>';
                sellContainer.appendChild(div);
            });
        }
        if (!ownShipsFound) sellContainer.innerHTML = '<p style="font-style:italic; color:#999;">' + t('shipyard_no_sellable_ships') + '</p>';
    }

    var buyContainer = document.getElementById('market-buy-list');
    if (buyContainer) {
        buyContainer.innerHTML = '';
        if (!shipyardData || !shipyardData.shopShips || shipyardData.shopShips.length === 0) {
            buyContainer.innerHTML = '<p style="font-style:italic; color:#999;">' + t('shipyard_shop_empty') + '</p>';
        } else {
            shipyardData.shopShips.forEach(function (sShip) {
                var sPrice = sShip.hp * 110;
                var sDiv = document.createElement('div');
                sDiv.className = 'work-card';
                sDiv.style.borderLeftColor = '#8b4513';
                sDiv.innerHTML = '<h4>' + sShip.name + '</h4>' +
                    '<p style="margin:5px 0; font-size:0.9em;">' + sShip.type + ' | HP: <b>' + sShip.hp + '</b></p>' +
                    '<button class="btn btn-sm" style="background:var(--color-primary); width:100%;" onclick="confirmBuy(\'' + sShip.id + '\', ' + sPrice + ')">' + t('shipyard_buy_button_prefix') + sPrice + ' ' + t('credit_short') + '</button>';
                buyContainer.appendChild(sDiv);
            });
        }
    }
}

function confirmSell(shipId, price) {
    requestPin(function (pin) {
        var ship = null;
        for (var i = 0; i < shipyardData.playerShips.length; i++) {
            if (shipyardData.playerShips[i].id === shipId) { ship = shipyardData.playerShips[i]; break; }
        }
        if (ship) sendTransaction('sell_to_shop', { sheetName: ship.category, rowIndex: ship.rowIndex, hp: ship.hp, id: ship.id }, pin);
    }, t('shipyard_sell_confirm_prefix') + price + t('shipyard_sell_confirm_suffix'));
}

function confirmBuy(shipId, price) {
    requestPin(function (pin) {
        var ship = null;
        for (var i = 0; i < shipyardData.shopShips.length; i++) {
            if (shipyardData.shopShips[i].id === shipId) { ship = shipyardData.shopShips[i]; break; }
        }
        if (ship) sendTransaction('buy_from_shop', { sheetName: ship.category, rowIndex: ship.rowIndex, hp: ship.hp, id: ship.id }, pin);
    }, t('shipyard_buy_confirm_prefix') + price + ' ' + t('credit_long') + t('shipyard_buy_confirm_suffix'));
}

function updateBuildOptions() {
    var catEl = document.getElementById('build-category');
    var select = document.getElementById('build-type');
    if (!catEl || !select) return;

    var cat = catEl.value;
    select.innerHTML = '';

    var typesToShow = [];
    if (cat === 'hajok') typesToShow = ['Dingi', 'Daysailer', 'Sloop', 'Ketch', 'Yawl', 'Cutter', 'KatamarĂˇn', 'Schooner', 'Brigantin', 'Bark / Barque', 'Tall ship'];
    if (cat === 'buvarhajok') typesToShow = ['Mini bĂşvĂˇrhajĂł', 'KĂ¶nnyĹ± bĂşvĂˇrhajĂł', 'Delejes bĂşvĂˇrhajĂł', 'VadĂˇsz bĂşvĂˇrhajĂł', 'NehĂ©z hordozĂł bĂşvĂˇrhajĂł', 'SzupernehĂ©z bĂşvĂˇrhajĂł'];
    if (cat === 'leghajok') typesToShow = ['Mini lĂ©ghajĂł (blimp)', 'KĂ¶nnyĹ± nem merev lĂ©ghajĂł', 'FĂ©lmerev lĂ©ghajĂł', 'Merev lĂ©ghajĂł (Zeppelin-tĂ­pus)', 'SzuperlĂ©ghajĂł'];

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
    if (prevHp) prevHp.innerText = hp;
    if (prevCost) prevCost.innerText = cost;
}

function initiateBuild() {
    var type = document.getElementById('build-type').value;
    var name = document.getElementById('build-name').value;
    var category = document.getElementById('build-category').value;
    if (!shipyardData || !shipyardData.baseStats) return;
    var hp = shipyardData.baseStats[type];
    var cost = hp * 150;

    if (!name) { uiAlert(t('shipyard_name_required')); return; }

    requestPin(function (pin) {
        // JAVĂŤTVA: Callback fĂĽggvĂ©nyt adunk Ăˇt, ami ĂˇtvĂˇlt a Repair fĂĽlre
        sendTransaction('build_new', { type: type, name: name, category: category, baseHp: hp }, pin, function () {
            showWorkshopTab('repair'); // Sikeres Ă©pĂ­tĂ©s utĂˇn a "SajĂˇt hajĂłk" listĂˇra ugrunk
        });
    }, t('shipyard_build_prefix') + type + t('shipyard_build_cost_prefix') + cost + ' ' + t('credit_long') + '.');
}

// JAVĂŤTVA: A sendTransaction most mĂˇr elfogad egy 4. (opcionĂˇlis) callback paramĂ©tert
function sendTransaction(action, data, pin, onSuccess) {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    callBackend('processShipyardTransaction', [action, data, pin],
        function (res) {
            // SIKER ĂG
            if (overlay) overlay.style.display = 'none';

            if (res.success) {
                uiAlert(res.message);
                if (res.newBalance !== undefined) updateLocalCredit(res.newBalance);

                // ĂšjratĂ¶ltjĂĽk az adatokat, hogy lĂˇssuk a vĂˇltozĂˇst
                initShipyard();

                // Ha volt extra teendĹ‘ (pl. fĂĽl vĂˇltĂˇs Ă©pĂ­tĂ©s utĂˇn)
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess();
                }
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (err) {
            // HIBA ĂG
            if (overlay) overlay.style.display = 'none';
            uiAlert(t('shipyard_transaction_server_error_prefix') + err.message);
        }
    );
}

function updateLocalCredit(amount) {
    // FrissĂ­tjĂĽk a globĂˇlis Ă©s helyi vĂˇltozĂłt is
    amount = Number(amount);
    userCredits = amount;
    if (typeof playerCredit !== 'undefined') playerCredit = amount;

    // FrissĂ­tjĂĽk a fĹ‘ fejlĂ©cet
    var headerCredit = document.getElementById('creditCell');
    if (headerCredit) {
        if (amount < 0) {
            headerCredit.innerHTML = '<span style="color:red; font-weight:bold;"><i class="fas fa-exclamation-circle"></i> TartozĂˇs: ' + Math.abs(amount) + '</span>';
        } else {
            headerCredit.innerHTML = '<i class="fas fa-coins"></i> ' + amount;
        }
    }
}

/* ================================================= */
/* === KĂ–NYVSZENTĂ‰LY (ROUTERESĂŤTVE) START === */
/* ================================================= */

// GlobĂˇlis vĂˇltozĂłk (var hasznĂˇlata)
var selectedCopy = null;
var searchBtn = null;
var upgradeBtn = null;
var searchTypeSelect = null;

/**
 * A konyvszentely_oldal.html logikĂˇja (InicializĂˇlĂˇs)
 */
function initializeKonyvszentely() {
    // EllenĹ‘rzĂ©s
    // (A Router mĂˇr tudja az emailt, de a UI miatt maradhat a kliens oldali check)
    // if (typeof currentUserEmail === 'undefined' || !currentUserEmail) ... 

    // Elemek keresĂ©se
    searchBtn = document.getElementById('ksz-search-btn');
    upgradeBtn = document.getElementById('ksz-upgrade-btn');
    searchTypeSelect = document.getElementById('ksz-search-type');

    // Ha valami hiĂˇnyzik, kilĂ©pĂĽnk
    if (!searchBtn || !searchTypeSelect || !upgradeBtn) {
        console.error("KĂ¶nyvszentĂ©ly elemek nem talĂˇlhatĂłak!");
        return;
    }

    // EsemĂ©nykezelĹ‘k
    searchBtn.onclick = searchCopies;
    searchTypeSelect.onchange = toggleSearchTerm;
    upgradeBtn.onclick = processUpgrade;

    // 1. Vagyon betĂ¶ltĂ©se Ă©s eladĂˇs gomb
    loadWalletStats();

    // 2. IndĂ­tĂł keresĂ©s
    searchCopies();
}

/**
 * Vagyon lekĂ©rdezĂ©se (KristĂˇly, TĂˇlentum)
 */
function loadWalletStats() {
    // ĂšJ HĂŤVĂS (callBackend)
    callBackend('getKonyvszentelyStats', [],
        function (data) {
            var crystalEl = document.getElementById('ksz-crystal-count');
            var talentEl = document.getElementById('ksz-talent-count');

            if (crystalEl) crystalEl.textContent = data.letkristaly;
            if (talentEl) talentEl.textContent = data.talentum;

            // Gomb megjelenĂ­tĂ©se
            renderSellButton();
        },
        function (err) {
            console.error("Vagyon hiba:", err);
        }
    );
}

/**
 * LetkristĂˇly eladĂˇs gomb
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

        sellBtn.innerHTML = '<i class="fas fa-gem"></i> ' + t('crystal_sell_button');

        sellBtn.onclick = function () {
            var msg = t('crystal_sell_confirm_html');

            uiConfirm(msg, t('crystal_sacrifice_title'), function () {

                // PIN modul ellenĹ‘rzĂ©se
                if (typeof requestPin === 'function') {

                    requestPin(function (pinCode) {
                        document.getElementById('loading-overlay').style.display = 'flex';

                        // ĂšJ HĂŤVĂS (callBackend)
                        callBackend('sellLetkristalyToPapno', [pinCode],
                            function (res) {
                                document.getElementById('loading-overlay').style.display = 'none';

                                var title = res.success ? t('crystal_sacrifice_accepted') : t('crystal_sacrifice_failed');
                                uiAlert(res.message || res.error, title);

                                if (res.success) {
                                    // UI frissĂ­tĂ©s
                                    var cEl = document.getElementById('ksz-crystal-count');
                                    var tEl = document.getElementById('ksz-talent-count');
                                    if (cEl) cEl.textContent = res.newCrystal;
                                    if (tEl) tEl.textContent = res.newTalent;
                                }
                            },
                            function (err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(t('error_prefix') + err.message, t('system_error_title'));
                            }
                        );

                    }, t('transaction_confirm_title'));

                } else {
                    uiAlert(t('pin_module_missing'), t('system_error_title'));
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

    // ĂšJ HĂŤVĂS (callBackend)
    callBackend('getUserCopies', [searchTerm, searchType],
        function (copies) {
            displayResults(copies);
        },
        function (err) {
            setLoadingState(false, 'search');
            var list = document.getElementById('ksz-results-list');
            if (list) list.innerHTML = '<p style="color:red; text-align:center;">' + t('ksz_search_error_prefix') + err.message + '</p>';
        }
    );
}

function displayResults(copies) {
    var list = document.getElementById('ksz-results-list');
    list.innerHTML = '';

    if (copies && copies.length > 0) {
        for (var i = 0; i < copies.length; i++) {
            (function (copy) {
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
                    '<div style="font-size: 1.2em;">đź‘‰</div>';

                item.onclick = function () { selectCopy(item, copy); };
                list.appendChild(item);
            })(copies[i]);
        }
    } else {
        list.innerHTML = '<p style="padding: 10px; color: #718096; text-align:center;">' + t('ksz_no_results') + '</p>';
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

    var detailsHTML = '<p><strong>' + t('ksz_label_title') + '</strong> ' + copy.title + '</p>' +
        '<p><strong>' + t('ksz_label_author') + '</strong> ' + copy.author + '</p>' +
        '<p><strong>' + t('ksz_label_code') + '</strong> ' + copy.code + '</p>' +
        '<p><strong>' + t('ksz_label_value') + '</strong> ' + copy.value + ' ' + t('talentum_label') + '</p>';

    document.getElementById('ksz-selection-details').innerHTML = detailsHTML;
    document.getElementById('ksz-action-section').style.display = 'block';
}

function processUpgrade() {
    if (!selectedCopy) { uiAlert(t('ksz_select_copy_first'), t('missing_data_title')); return; }

    var giftEmailInput = document.getElementById('ksz-gift-email');
    var giftEmail = giftEmailInput ? giftEmailInput.value : '';

    var confirmMsg = t('ksz_upgrade_confirm_prefix') + selectedCopy.title + t('ksz_upgrade_confirm_middle');
    if (giftEmail) {
        confirmMsg += t('ksz_gift_label_html_prefix') + giftEmail + t('ksz_gift_label_html_suffix');
    }
    confirmMsg += t('ksz_upgrade_confirm_suffix');

    uiConfirm(confirmMsg, t('ksz_upgrade_title'), function () {
        requestPin(function(pinCode) {
            setLoadingState(true, 'upgrade');

            var data = {
                productCode: selectedCopy.code,
                // currentUserEmail NEM KELL, a Router intĂ©zi!
                giftToEmail: giftEmail,
                pinCode: pinCode
            };

            // ĂšJ HĂŤVĂS (callBackend)
            callBackend('initiateUpgradeProcess', [data],
                function (result) {
                    handleProcessResult(result);
                },
                function (err) {
                    setLoadingState(false, 'upgrade');
                    uiAlert(t('error_prefix') + err.message);
                }
            );
        }, "KĂ©rlek add meg a PIN kĂłdodat a(z) <b>" + selectedCopy.title + "</b> felszentelĂ©sĂ©hez:");
    });
}

function handleProcessResult(result) {
    var title = result.success ? t('success_title') : t('error_title');
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
    }
}

function setLoadingState(isLoading, type) {
    if (searchBtn) searchBtn.disabled = isLoading;
    if (upgradeBtn) upgradeBtn.disabled = isLoading;

    if (isLoading && type === 'search') {
        var list = document.getElementById('ksz-results-list');
        if (list) list.innerHTML = '<p style="padding: 10px; color: #718096; text-align:center;">' + t('ksz_searching') + '</p>';
    }

    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = isLoading ? 'flex' : 'none';
}

// ===============================
// === FELHĹKOLOSTOR FUNKCIĂ“K (JAVĂŤTOTT - ES5 BIZTOS) ===
// ===============================

// GlobĂˇlis callback a PIN modalhoz
var pinCallback = null;

function requestPin(callback, customMessage) {
    pinCallback = callback;
    var modal = document.getElementById('monk-pin-modal');
    var input = document.getElementById('monk-pin-input');
    var messageP = modal ? modal.querySelector('p') : null;

    // Ăśzenet beĂˇllĂ­tĂˇsa
    if (messageP) {
        messageP.innerHTML = customMessage || t('monk_pin_default_html');
    }

    // MezĹ‘ ĂĽrĂ­tĂ©se Ă©s modal nyitĂˇsa
    if (input) input.value = '';
    if (modal) {
        modal.style.display = 'flex';
        if (input) input.focus();
    } else {
        // BiztonsĂˇgi tartalĂ©k
        var p = prompt((customMessage || t('pin_prompt_fallback')).replace(/<br>/g, '\n'));
        if (p) callback(p);
    }
}

function finalizeMonkUpload() {
    var input = document.getElementById('monk-pin-input');
    var pin = input ? input.value : null;
    if (!pin) { uiAlert(t('pin_required')); return; }

    document.getElementById('monk-pin-modal').style.display = 'none';
    if (pinCallback) pinCallback(pin);
    pinCallback = null; // Reset
}

function closeMonkPinModal() {
    document.getElementById('monk-pin-modal').style.display = 'none';
    pinCallback = null;
}

// FĂĽlvĂˇltĂł logika
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
    setTimeout(function () { document.getElementById(tabName).classList.add("active"); }, 10);
    if (evt) {
        evt.currentTarget.className += " active";
    }

    // Adatok betĂ¶ltĂ©se
    if (tabName === 'Munkapad') refreshMonasteryWork();
    if (tabName === 'Forum') loadForumPosts();
    if (tabName === 'Suttogo') loadChatPartners();
}

// --- MUNKAPAD FUNKCIĂ“K ---

function toggleUploadType() {
    var type = document.querySelector('input[name="uploadType"]:checked').value;
    var titleInput = document.getElementById('monk-upload-title');
    var fileLabel = document.getElementById('upload-file-label');
    var desc = document.getElementById('upload-description');
    var coverContainer = document.getElementById('cover-upload-container');
    var appOptions = document.getElementById('monk-application-options');

    if (type === 'work') {
        titleInput.placeholder = t('monk_upload_title_placeholder_work');
        fileLabel.textContent = t('monk_upload_file_label_work');
        desc.innerHTML = t('monk_upload_desc_work_html');
        if (coverContainer) coverContainer.style.display = 'block';
        if (appOptions) appOptions.style.display = 'none';
    } else {
        titleInput.placeholder = t('monk_upload_title_placeholder_application');
        fileLabel.textContent = t('monk_upload_file_label_application');
        desc.innerHTML = t('monk_upload_desc_application_html');
        if (coverContainer) coverContainer.style.display = 'none';
        if (appOptions) appOptions.style.display = 'block';
    }
}

function toggleTranslatorLanguage() {
    // Deprecated since checkboxes are used now.
}

var ALL_MONK_ROLES = [
    {val: 'editor', text: 'Lektor'},
    {val: 'szkriptor', text: 'Szkriptor'},
    {val: 'piktor', text: 'Piktor'},
    {val: 'inspektor', text: 'Inspektor'},
    {val: 'translator_Angol', text: 'FordĂ­tĂł (Angol)'},
    {val: 'translator_Spanyol', text: 'FordĂ­tĂł (Spanyol)'},
    {val: 'translator_NĂ©met', text: 'FordĂ­tĂł (NĂ©met)'},
    {val: 'translator_Francia', text: 'FordĂ­tĂł (Francia)'},
    {val: 'translator_Orosz', text: 'FordĂ­tĂł (Orosz)'},
    {val: 'translator_Lengyel', text: 'FordĂ­tĂł (Lengyel)'}
];

function getRoleCheckboxesHtml(checkedRolesArray, idPrefix) {
    var html = '<details style="background:#fff; border:1px solid #ccc; border-radius:4px; margin: 10px 0; text-align: left;">';
    html += '<summary style="padding:8px 10px; cursor:pointer; font-weight:bold; outline:none; background:#f9f9f9; border-bottom:1px solid #eee;">MunkakĂ¶rĂ¶k kivĂˇlasztĂˇsa...</summary>';
    html += '<div style="display:flex; flex-direction:column; padding:10px; max-height:250px; overflow-y:auto;">';
    ALL_MONK_ROLES.forEach(function(r, index) {
        var isChecked = checkedRolesArray.includes(r.val) ? 'checked' : '';
        var borderStyle = index < ALL_MONK_ROLES.length - 1 ? 'border-bottom: 1px solid #f0f0f0;' : '';
        html += '<label style="font-size:0.9em; cursor:pointer; display:grid; grid-template-columns: 1fr auto; align-items:center; padding: 6px 0; ' + borderStyle + '">' +
                '<span>' + r.text + '</span>' +
                '<input type="checkbox" class="role-select-' + idPrefix + '" value="' + r.val + '" ' + isChecked + ' style="margin:0; width:16px; height:16px;">' +
                '</label>';
    });
    html += '</div></details>';
    return html;
}

async function submitMonasteryWork() {
    var title = document.getElementById('monk-upload-title').value;
    var fileInput = document.getElementById('monk-upload-file');
    var coverInput = document.getElementById('monk-upload-cover');
    // Itt a biztonsĂˇg kedvĂ©Ă©rt sima 'var' Ă©s nincs backtick a selectorban
    var submissionType = document.querySelector('input[name="uploadType"]:checked').value;

    var manuscriptFile = fileInput.files[0];
    var coverFile = (coverInput && coverInput.files.length > 0) ? coverInput.files[0] : null;

    if (!title) { uiAlert(t('monk_upload_title_required')); return; }
    if (!manuscriptFile) { uiAlert(t('monk_upload_file_required')); return; }

    // Itt az async function marad callbackkĂ©nt!
    requestPin(async function (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';

        // BelsĹ‘ segĂ©dfĂĽggvĂ©ny Promise-al (ez kell az await-hez)
        var readFileToBase64 = function (file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    // Backtick helyett sima string split
                    resolve({
                        base64: e.target.result.split(',')[1],
                        mimeType: file.type,
                        filename: file.name
                    });
                };
                reader.onerror = function (e) { reject(t('monk_upload_file_error_prefix') + file.name); };
                reader.readAsDataURL(file);
            });
        };

        try {
            // Itt hasznĂˇljuk az AWAIT-et, ahogy kĂ©rted!
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
            if (submissionType === 'application') {
                var checkedRoles = [];
                document.querySelectorAll('.monk-role-checkbox:checked').forEach(function(cb) {
                    checkedRoles.push(cb.value);
                });
                payload.roles = checkedRoles;
            }

            // callBackend hĂ­vĂˇs
            callBackend('uploadWorkToMonastery', [payload, pinCode],
                function (res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (res.success) {
                        uiAlert(res.message);
                        document.getElementById('monk-upload-title').value = '';
                        fileInput.value = '';
                        if (coverInput) coverInput.value = '';
                        refreshMonasteryWork();
                        updateCreditDisplay();
                    } else {
                        // Sima string Ă¶sszefĹ±zĂ©s
                        uiAlert(t('monk_upload_error_prefix') + res.error);
                    }
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(t('server_error_prefix') + err.message);
                }
            );

        } catch (err) {
            // Catch Ăˇg: ez dobta a hibĂˇt, ha elĹ‘tte nem volt lezĂˇrva valami. 
            // Most ellenĹ‘riztem, a fenti blokkban minden zĂˇrĂłjel a helyĂ©n van.
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('monk_upload_prep_error_prefix') + err);
        }
    });
}

var agentPollingInterval = null;

function setupAgentPolling(hasPending) {
    if (agentPollingInterval) {
        clearInterval(agentPollingInterval);
        agentPollingInterval = null;
    }
    if (hasPending) {
        // FrissĂ­tjĂĽk a kolostort csendben minden 15 mĂˇsodpercben
        agentPollingInterval = setInterval(function () {
            if (document.getElementById('monastery-work-list')) {
                refreshMonasteryWork(true);
            }
        }, 15000);
    }
}

function refreshMonasteryWork(silent) {
    var container = document.getElementById('monastery-work-list');
    if (!silent) {
        container.innerHTML = '<p><i>' + t('monk_work_loading') + '</i></p>';
    }

    callBackend('getMonasteryWorks', [],
        function (res) {
            if (!res.success) { if (!silent) container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>'; return; }
            if (res.works.length === 0) { if (!silent) container.innerHTML = '<p>' + t('monk_work_none') + '</p>'; return; }

            var hasPendingAgent = res.works.some(function (w) { return w.status === 'Agent elemzĂ©s alatt'; });
            setupAgentPolling(hasPendingAgent);

            var html = '';
            window.currentMonasteryWorks = res.works;

            var isPapatUser = res.works.some(function (w) { return w.isPapat; });
            if (isPapatUser) {
                var adminBtn = document.getElementById('open-personnel-btn');
                if (adminBtn) adminBtn.style.display = 'block';
            }

            res.works.forEach(function (work) {
                var topControls = '';

                // --- 0. FORDĂŤTĂSI KĂRTYĂK ---
                if (work.status && work.status.indexOf('[FORDĂŤTĂS') === 0) {
                    var langMatch = work.status.match(/\[FORDĂŤTĂS\s+([^\]]+)\]/);
                    var targetLang = langMatch ? langMatch[1] : 'Ismeretlen';
                    
                    if ((work.isMyWork || (work.isPapat && work.hasDebt)) && work.status === '[FORDĂŤTĂS ' + targetLang + '] VĂ©glegesĂ­tĂ©sre vĂˇr') {
                        var safeTitle = work.title.replace(/'/g, "\\'");
                        var btnId = 'pub-trans-btn-' + work.id;
                        topControls = '<div style="background:#f4ebf9; padding:10px; text-align:center; border:1px solid #8e44ad; margin-top:10px; border-radius:5px;">' +
                            '<h4 style="margin-top:0; color:#8e44ad;"><i class="fas fa-language"></i> FordĂ­tĂˇs ElfogadĂˇsa</h4>' +
                            '<p>A(z) <b>' + targetLang + '</b> nyelvĹ± fordĂ­tĂˇs elkĂ©szĂĽlt Ă©s lektorĂˇlva lett.</p>' +
                            '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitle + ' (' + targetLang + ')\', \'\')">FordĂ­tĂˇs PublikĂˇlĂˇsa</button>' +
                            '</div>';
                    } else if (work.status === 'Folyamatban' || work.status === 'EllenĹ‘rzĂ©s alatt' || 
                               work.status === '[FORDĂŤTĂS ' + targetLang + '] folyamatban' || work.status === '[FORDĂŤTĂS ' + targetLang + '] Folyamatban' || 
                               work.status === '[FORDĂŤTĂS ' + targetLang + '] EllenĹ‘rzĂ©s alatt') {
                        if (work.isPapat || work.userRoles.length > 0) {
                           topControls = '<div style="margin:5px 0;"><button class="btn btn-sm" onclick="doWorkAction(\'' + work.id + '\', \'send_for_approval\')">' + t('monk_review_ready_button') + '</button></div>';
                        }
                    }
                } 
                // --- 1. PAPĂT JOGKĂ–RĂ–K (Eredeti) ---
                else if (work.isPapat) {
                    var isApplication = work.checklist && work.checklist.hasOwnProperty('referencia');

                    if (work.status === 'ElbĂ­rĂˇlĂˇs alatt') {
                        if (isApplication) {
                            var requestedRolesStr = (work.checklist && work.checklist.referencia && work.checklist.referencia.extraInfo) ? work.checklist.referencia.extraInfo : "";
                            var appliedRolesArray = requestedRolesStr ? requestedRolesStr.split(',') : [];
                            
                            topControls =
                                '<div style="margin:5px 0; background:#f0f8ff; padding:10px; border:1px solid blue; border-radius:5px; text-align:center;">' +
                                '<strong>Szerzetes felvĂ©tele szerepkĂ¶rĂ¶kbe:</strong><br>' +
                                getRoleCheckboxesHtml(appliedRolesArray, work.id) +
                                '<button class="btn btn-sm" style="margin-top:5px; background-color:#28a745; width:48%;" onclick="hireMinistransMulti(\'' + work.id + '\', \'' + work.author + '\')">' + t('monk_hire_button') + '</button> ' +
                                '<button class="btn btn-sm btn-danger" style="margin-top:5px; width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                '</div>';
                        } else {
                            if (work.checklist && work.checklist.papat_report) {
                                topControls = '<div style="margin:5px 0; background:#f4ebf9; border:1px solid #8e44ad; border-radius:5px; padding:10px;">' +
                                    '<div style="text-align:center; margin-bottom:10px;">' +
                                    '<strong><i class="fas fa-robot"></i> AI ElemzĂ©s KĂ©sz</strong><br>' +
                                    '<button class="btn btn-sm" style="background-color:#8e44ad; margin-top:5px; width:100%;" onclick="openPapatReportModal(\'' + work.id + '\')"><i class="fas fa-eye"></i> Ă‰rtĂ©kelĹ‘ JelentĂ©s OlvasĂˇsa</button>' +
                                    '</div>' +
                                    '<button class="btn btn-sm" style="background-color:#28a745; width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'approve_submission\')">' + t('monk_approve_button') + '</button> ' +
                                    '<button class="btn btn-sm btn-danger" style="width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                    '</div>';
                            } else {
                                topControls = '<div style="margin:5px 0;">' +
                                    '<button class="btn btn-sm" style="background-color:#8e44ad; margin-bottom: 5px; width: 100%; color:white; border:1px solid #ffd700;" onclick="triggerAgentAnalysis(\'' + work.id + '\')"><i class="fas fa-robot"></i> ElemzĂ©s IndĂ­tĂˇsa (PapĂˇt AI)</button><br>' +
                                    '<button class="btn btn-sm" style="background-color:#28a745;" onclick="doWorkAction(\'' + work.id + '\', \'approve_submission\')">' + t('monk_approve_button') + '</button> ' +
                                    '<button class="btn btn-sm btn-danger" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                    '</div>';
                            }
                        }
                    } else if (work.status === 'Agent elemzĂ©s alatt') {
                        topControls = '<div style="margin:5px 0; padding:10px; background:#f4ebf9; border:1px solid #8e44ad; border-radius:5px; text-align:center; color: #8e44ad;">' +
                                      '<strong><i class="fas fa-robot"></i> PapĂˇt AI elemzĂ©se folyamatban...</strong><br>' +
                                      '<small>A kĂ©zirat le van foglalva az elemzĹ‘modul szĂˇmĂˇra.</small><br>' +
                                      '<button class="btn btn-sm btn-warning" style="margin-top:10px; color:#333; font-weight:bold; width:100%;" onclick="cancelAgentAnalysis(\'' + work.id + '\')"><i class="fas fa-undo"></i> AI ElemzĂ©s MegszakĂ­tĂˇsa (VisszavonĂˇs)</button>' +
                                      '</div>';

                    } else if (work.status === 'Folyamatban' || work.status === 'EllenĹ‘rzĂ©s alatt') {
                        topControls = '<div style="margin:5px 0;"><button class="btn btn-sm" onclick="doWorkAction(\'' + work.id + '\', \'send_for_approval\')">' + t('monk_review_ready_button') + '</button></div>';
                    }
                }

                // --- 2. SZERZĹ / PAPĂT PUBLIKĂLĂS ---
                if (!work.title.startsWith('[FORDĂŤTĂS') && (work.isMyWork || (work.isPapat && work.hasDebt)) && work.status === 'VĂ©glegesĂ­tĂ©sre vĂˇr') {

                    var safeTitleForOnclick = work.title.replace(/'/g, "\\'");
                    var btnId = 'pub-btn-' + work.id;

                    if (work.isMyWork) {
                        if (work.hasDebt) {
                            topControls = '<div style="background:#fff3cd; padding:10px; text-align:center; border:1px solid orange; margin-top:10px; border-radius:5px;">' +
                                '<h4 style="margin-top:0;">' + t('monk_debt_title') + '</h4>' +
                                '<p style="margin-bottom:0;">' + t('monk_debt_body') + '</p>' +
                                '</div>';
                        } else {
                            topControls = '<div style="background:#e6fffa; padding:10px; text-align:center; border:1px solid green; margin-top:10px; border-radius:5px;">' +
                                '<h4 style="margin-top:0;">' + t('monk_final_approval_title') + '</h4>' +
                                '<p>' + t('monk_final_approval_body') + '</p>' +
                                '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitleForOnclick + '\', \'' + work.coverId + '\')">' + t('monk_publish_button') + '</button>' +
                                '</div>';
                        }
                    }

                    if (work.isPapat && work.hasDebt) {
                        topControls = '<div style="background:#ffeeba; padding:10px; text-align:center; border:1px solid orange; margin-top:10px; border-radius:5px;">' +
                            '<h4 style="margin-top:0;">' + t('monk_lien_title') + '</h4>' +
                            '<p>' + t('monk_lien_body') + '</p>' +
                            '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitleForOnclick + '\', \'' + work.coverId + '\')">' + t('monk_publish_button_papat') + '</button>' +
                            '</div>';
                    }
                }

                // KĂRTYA HTML
                html += '<div class="work-card">' +
                    '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding-bottom:10px; margin-bottom:10px;">' +
                    '<div>' +
                    '<strong style="font-size:1.1em;">' + work.title + '</strong> ' +
                    '<span style="background:#eee; padding:2px 6px; border-radius:4px; font-size:0.8em;">' + getMonasteryWorkStatusLabel(work.status) + '</span><br>' +
                    '<small>' + t('author_label') + ' ' + work.author + '</small>' +
                    '</div>' +
                    '<button class="btn btn-sm btn-secondary" onclick="window.open(\'' + work.url + '\', \'_blank\')">' + t('gdoc_button') + '</button>' +
                    '</div>' +
                    topControls +
                    '<div style="margin-top:10px;">' +
                    renderDetailedChecklist(work, res.availableMonks, currentUserEmail) +
                    '</div>' +
                    '</div>';
            });

            // --- 3. SZEMĂ‰THALOM ---
            if (res.isAntipat && res.trashItems && res.trashItems.length > 0) {
                html += '<div style="margin-top:40px; padding-top:20px; border-top:3px dashed #8b0000; text-align:center;">';
                html += '<h3 style="color:#8b0000;">' + t('monk_trash_title') + '</h3>';
                html += '<p style="font-size:0.9em;">' + t('monk_trash_body') + '</p>';

                res.trashItems.forEach(function (item) {
                    // --- BIZTONSĂGI JAVĂŤTĂS: CĂ­m escaping ---
                    var safeTrashTitle = item.title.replace(/'/g, "\\'");

                    html += '<div class="work-card" style="border-left-color:darkred; background-color:#fff5f5;">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                        '<div><strong>' + item.title + '</strong> <small>(' + item.date + ')</small><br>' +
                        '<small>' + t('author_label') + ' ' + item.authorEmail + '</small></div>' +
                        '<div style="text-align:right;">' +
                        '<button class="btn btn-sm btn-secondary" onclick="window.open(\'' + item.url + '\', \'_blank\')">' + t('open_button') + '</button> ' +
                        // ITT HASZNĂLJUK A JAVĂŤTOTT CĂŤMET:
                        '<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="purgeWork(\'' + item.workId + '\', \'' + safeTrashTitle + '\')">' + t('monk_purge_button') + '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                });
                html += '</div>';
            }

            container.innerHTML = html;
        },
        function (err) {
            container.innerHTML = '<p style="color:red;">' + t('error_prefix') + err.message + '</p>';
        }
    );
}

function purgeWork(workId, title) {
    var message = t('monk_purge_confirm_html_prefix') + title + t('monk_purge_confirm_html_suffix');

    uiConfirm(message, t('delete_confirm_title'), function () {
        document.getElementById('loading-overlay').style.display = 'flex';

        callBackend('purgeTrashItem', [workId],
            function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(res.message || res.error, res.success ? t('success_title') : t('error_title'));
                if (res.success) refreshMonasteryWork();
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('error_prefix') + err.message, t('system_error_title'));
            }
        );
    });
}

function openPublishWindowForTranslation(btnId, workId, gdocId, translatedTitle, targetLang, rootCode) {
    var btnElement = document.getElementById(btnId);
    if (btnElement) {
        btnElement.style.display = 'none';
        if (btnElement.parentNode) {
            var msg = document.createElement('span');
            msg.id = 'pub-status-' + workId;
            msg.innerHTML = "KĂ¶nyv adatainak lekĂ©rĂ©se...";
            msg.style.color = '#d9534f';
            msg.style.fontWeight = 'bold';
            btnElement.parentNode.appendChild(msg);
        }
    }
    
    if (!gdocId || gdocId === 'undefined' || gdocId === 'null') {
        uiAlert(t('monk_publish_missing_gdoc'));
        return;
    }
    
    setLoadingState(true, 'monastery');
    callBackend('getOriginalBookDataForTranslation', [rootCode], function(res) {
        setLoadingState(false, 'monastery');
        if (!res.success) {
            var statusMsg = document.getElementById('pub-status-' + workId);
            if (statusMsg) statusMsg.innerHTML = "Hiba az adatok betĂ¶ltĂ©sekor.";
            uiAlert(res.error);
            return;
        }
        
        var konyvFeltoltoUrl = 'https://script.google.com/macros/s/AKfycbzZZV2QQ4fOExg_dv0ddkWVEFgNTCXzYtFhWlOs1Kn5R3wUCHDXV7IpE3Kx3DNT53Npbw/exec';
        var params = new URLSearchParams();
        params.append('action', 'szenteles');
        params.append('gdocId', gdocId);
        params.append('logId', workId);
        params.append('userEmail', currentUserEmail);
        params.append('title', translatedTitle);
        
        if (res.book.author) params.append('origAuthor', res.book.author);
        if (res.book.publisher) params.append('origPublisher', res.book.publisher);
        if (res.book.type) params.append('origType', res.book.type);
        if (res.book.isbn) params.append('origIsbn', res.book.isbn);
        params.append('targetLang', targetLang);
        
        window.open(konyvFeltoltoUrl + '?' + params.toString(), '_blank');
        
        if (document.getElementById('pub-status-' + workId)) {
            document.getElementById('pub-status-' + workId).innerHTML = t('monk_publish_in_progress_html');
        }
        
        // Start polling
        var attempts = 0;
        var maxAttempts = 60;
        var poller = setInterval(function () {
            attempts++;
            if (attempts > maxAttempts) {
                clearInterval(poller);
                var sMsg = document.getElementById('pub-status-' + workId);
                if (sMsg) sMsg.innerHTML = t('monk_publish_timeout_html');
                return;
            }
            callBackend('checkWorkExists', [workId], function (exists) {
                if (exists === false) {
                    clearInterval(poller);
                    var sMsg = document.getElementById('pub-status-' + workId);
                    if (sMsg) {
                        sMsg.innerHTML = t('monk_publish_done_html');
                        sMsg.style.color = "green";
                    }
                    if (typeof refreshMonasteryWork === 'function') refreshMonasteryWork();
                }
            });
        }, 5000);
    });
}

function openPublishWindow(btnId, workId, gdocId, workTitle, coverId) {
    var btnElement = document.getElementById(btnId);
    if (btnElement) {
        btnElement.style.display = 'none';
        if (btnElement.parentNode) {
            var msg = document.createElement('span');
            msg.id = 'pub-status-' + workId;
            msg.innerHTML = t('monk_publish_in_progress_html');
            msg.style.color = '#d9534f';
            msg.style.fontWeight = 'bold';
            btnElement.parentNode.appendChild(msg);
        }
    }
    if (!gdocId || gdocId === 'undefined' || gdocId === 'null') {
        uiAlert(t('monk_publish_missing_gdoc'));
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

    var poller = setInterval(function () {
        attempts++;
        if (attempts > maxAttempts) {
            clearInterval(poller);
            var statusMsg = document.getElementById('pub-status-' + workId);
            if (statusMsg) statusMsg.innerHTML = t('monk_publish_timeout_html');
            return;
        }

        callBackend('checkWorkExists', [workId],
            function (exists) {
                if (exists === false) {
                    clearInterval(poller);
                    var statusMsg = document.getElementById('pub-status-' + workId);
                    if (statusMsg) {
                        statusMsg.innerHTML = t('monk_publish_done_html');
                        statusMsg.style.color = "green";
                    }
                    refreshMonasteryWork();
                }
            },
            function (err) { console.warn("Polling hiba: " + err.message); }
        );
    }, 5000);
}

function finalizeTranslationProcess(workId, title, targetLangName, gdocId, rootCode, targetLangCode) {
    if (!rootCode || rootCode === 'null') {
        uiAlert("Hiba: A kĂ¶nyv forrĂˇskĂłdja nem talĂˇlhatĂł a fordĂ­tĂˇshoz!");
        return;
    }
    
    requestPin(function(pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        
        var payload = {
            logId: workId,
            gdocId: gdocId,
            rootCode: rootCode,
            targetLangCode: targetLangCode,
            targetLangName: targetLangName,
            email: currentUserEmail,
            pinCode: pinCode
        };
        
        callBackend('finalizeTranslation', payload, 
            function(res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (res.success) {
                    uiAlert("Sikeresen publikĂˇlva! Ăšj KĂłd: " + res.newBaseCode, "FordĂ­tĂˇs Elfogadva");
                    refreshMonasteryWork();
                } else {
                    uiAlert("Hiba tĂ¶rtĂ©nt: " + res.error, "PublikĂˇciĂłs hiba");
                }
            },
            function(err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("HĂˇlĂłzati hiba: " + err.message);
            }
        );
    }, "Add meg a MesterkĂłdot a <b>" + title + "</b> publikĂˇlĂˇsĂˇhoz:");
}

// --- PAPĂT CLOUD INDĂŤTĂSA ---
function triggerPapatAgent(workId) {
    if (!confirm("Biztosan elindĂ­tod az AI elemzĂ©st (PapĂˇt)? Ez eltarthat 1-2 percig.")) return;

    showLoading("PapĂˇt hĂ­vĂˇsa...");

    // 1. Ăllapot frissĂ­tĂ©se (hogy lĂˇtszĂłdjon a folyamat)
    callBackend('manageWorkStatus', [workId, 'set_status', 'Agent elemzĂ©s alatt'], function (res) {
        if (!res || !res.success) {
            hideLoading();
            alert("Hiba az Ăˇllapot frissĂ­tĂ©sekor: " + (res ? res.error : "Ismeretlen hiba"));
            return;
        }

        // 2. FelhĹ‘ alapĂş folyamat elindĂ­tĂˇsa a Backend-en keresztĂĽl
        callBackend('triggerPapatCloudProcess', [workId], function (papatRes) {
            hideLoading();
            if (papatRes && papatRes.success) {
                alert("PapĂˇt megkezdte az elemzĂ©st! KĂ©rlek vĂˇrj pĂˇr percet, majd frissĂ­ts rĂˇ a munkapadra.");
                refreshMonasteryWork();
            } else {
                alert("PapĂˇt sajnos nem tudott elindulni: " + (papatRes ? papatRes.error : "Szerver hiba. Ha a helyi AI ĂĽgynĂ¶k fut, az automatikusan Ăˇtveszi a feladatot!"));
                // FrissĂ­tsĂĽk a munkapadot, hogy lĂˇtszĂłdjon az "Agent elemzĂ©s alatt" stĂˇtusz!
                refreshMonasteryWork();
            }
        });
    });
}

function cancelAgentAnalysis(workId) {
    if (!confirm("Biztosan megszakĂ­tod az AI elemzĂ©st? A mĹ± visszakerĂĽl 'ElbĂ­rĂˇlĂˇs alatt' stĂˇtuszba, Ă©s kĂ©zzel kell elbĂ­rĂˇlnod.")) return;
    
    document.getElementById('loading-overlay').style.display = 'flex';
    callBackend('manageWorkStatus', [workId, 'set_status', 'ElbĂ­rĂˇlĂˇs alatt'], function (res) {
        document.getElementById('loading-overlay').style.display = 'none';
        if (res && res.success) {
            refreshMonasteryWork();
        } else {
            alert("Hiba: " + (res ? res.error : "Szerver hiba"));
        }
    });
}

function getMonasteryWorkStatusLabel(status) {
    var statusMap = {
        'ElbĂ­rĂˇlĂˇs alatt': 'monk_work_status_under_review',
        'Folyamatban': 'monk_work_status_in_progress',
        'EllenĹ‘rzĂ©s alatt': 'monk_work_status_quality_check',
        'VĂ©glegesĂ­tĂ©sre vĂˇr': 'monk_work_status_waiting_finalize',
        'ElutasĂ­tva': 'monk_work_status_rejected'
    };
    var key = statusMap[status];
    if (!key) return status;
    var translated = t(key);
    return translated === key ? status : translated;
}

function getMonasteryTaskStatusLabel(status) {
    var statusMap = {
        'inaktĂ­v': 'monk_task_status_inactive',
        'vĂˇrakozĂł': 'monk_task_status_waiting',
        'folyamatban': 'monk_task_status_in_progress',
        'javĂ­tĂˇs alatt': 'monk_task_status_revision',
        'ellenĹ‘rzĂ©s alatt': 'monk_task_status_under_review',
        'elfogadva': 'monk_task_status_accepted'
    };
    var key = statusMap[status];
    if (!key) return status;
    var translated = t(key);
    return translated === key ? status : translated;
}

function getMonasteryTaskLabel(taskKey, fallbackLabel) {
    var key = 'monk_task_label_' + taskKey;
    var translated = t(key);
    return translated === key ? (fallbackLabel || taskKey) : translated;
}

function renderDetailedChecklist(work, allMonks, currentUser) {
    var html = '<table style="width:100%; font-size:0.9em; border-collapse:collapse;">';

    for (var key in work.checklist) {
        var task = work.checklist[key];
        var action = getMonasteryTaskStatusLabel(task.status);
        var userHasRole = work.userRoles && work.userRoles.some(function (r) { return r.includes(task.requiredRole); });
        var isOwnerOrPapat = work.isMyWork || work.isPapat;

        // BelsĹ‘ segĂ©dfĂĽggvĂ©ny (closure) a gombokhoz
        var makeBtn = (function () {
            return function (txt, clr, func) {
                return '<button class="btn" style="background-color:' + clr + '; padding:4px 8px; font-size:0.8em; margin:2px;" onclick="' + func + '">' + txt + '</button>';
            };
        })();

        var isWorkInProgress = work.status === 'Folyamatban' || work.status.indexOf('[FORDĂŤTĂS') !== -1;

        if (task.status === 'inaktĂ­v') {
            if (isOwnerOrPapat) action = makeBtn(t('monk_task_activate'), '#17a2b8', 'doWorkAction(\'' + work.id + '\', \'activate_task\', \'' + key + '\')');
            else action = '<span style="color:#999;">' + t('monk_task_inactive') + '</span>';
        }
        else if (isWorkInProgress && (task.status === 'vĂˇrakozĂł' || task.status === 'javĂ­tĂˇs alatt')) {
            if (isOwnerOrPapat) {
                if (task.applicants.length > 0) {
                    var opts = '<option value="">' + t('monk_select_placeholder') + '</option>';
                    task.applicants.forEach(function (email) {
                        var m = allMonks.find(function (monk) { return monk.email === email; });
                        opts += '<option value="' + email + '">' + (m ? m.fullName : email) + '</option>';
                    });
                    action = '<select style="padding:2px;" onchange="doWorkAction(\'' + work.id + '\', \'select_monk\', \'' + key + '\', this.value)">' + opts + '</select>';
                } else {
                    action = '<span style="color:#d9534f;">' + t('monk_no_applicant') + '</span>';
                }
                if (userHasRole && !task.selectedMonk) {
                    action += '<br>' + makeBtn(t('monk_assign_self'), '#333', 'doWorkAction(\'' + work.id + '\', \'select_monk\', \'' + key + '\', \'' + currentUser + '\')');
                }
            } else if (userHasRole && !task.applicants.includes(currentUser)) {
                action = makeBtn(t('monk_apply_task'), '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'apply_task\', \'' + key + '\')');
            } else if (task.applicants.includes(currentUser)) {
                action = '<span style="color:orange;">' + t('monk_applied') + '</span>';
            }
        }
        else if (task.status === 'ellenĹ‘rzĂ©s alatt') {
            if (isOwnerOrPapat) {
                action = makeBtn(t('monk_task_accept'), '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'accept_task_work\', \'' + key + '\')') +
                    makeBtn(t('monk_task_revision'), '#f0ad4e', 'doWorkAction(\'' + work.id + '\', \'request_revision\', \'' + key + '\')');
            } else {
                action = t('monk_task_reviewing');
            }
        }

        if (task.selectedMonk === currentUser && task.paymentStatus === 'none' && task.status !== 'inaktĂ­v') {
            action = '<input type="number" id="price-' + key + '" placeholder="' + t('talentum_short') + '" style="width:50px; padding:2px;"> ' +
                makeBtn(t('ok_button'), '#2e8b57', 'offerPrice(\'' + work.id + '\', \'' + key + '\')');
        }

        if (isOwnerOrPapat && task.paymentStatus === 'pending_approval') {
            action = '<b>' + task.priceRequest + ' ' + t('talentum_short') + '</b><br>' +
                makeBtn(t('pay_button'), '#2e8b57', 'payDirect(\'' + work.id + '\', \'' + key + '\')') +
                makeBtn(t('credit_button'), '#f0ad4e', 'acceptCredit(\'' + work.id + '\', \'' + key + '\')');
        }

        if (task.paymentStatus === 'paid_direct' || task.paymentStatus === 'paid_out') action += ' <span title="' + t('paid_title') + '">đź’°</span>';
        if (task.paymentStatus === 'credit_agreed') action += ' <span title="' + t('credit_title') + '">âš ď¸Ź</span>';

        if (task.selectedMonk === currentUser && task.status !== 'elfogadva' && task.status !== 'ellenĹ‘rzĂ©s alatt' && task.status !== 'inaktĂ­v') {
            if (action.indexOf('button') === -1) action = '';
            action += makeBtn(t('ready_button'), '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'report_ready\', \'' + key + '\')') +
                makeBtn(t('cancel_short_button'), '#c82333', 'resignTask(\'' + work.id + '\', \'' + key + '\')');
        }

        if (key === 'borito' && (isOwnerOrPapat || task.selectedMonk === currentUser)) {
            if (task.status === 'vĂˇrakozĂł' || task.status === 'javĂ­tĂˇs alatt') {
                action = '<input type="file" id="cover-upload-' + work.id + '" accept="image/png" style="width:180px; font-size:0.8em;">' +
                    makeBtn(t('upload_button'), '#2e8b57', 'uploadCoverFromCard(\'' + work.id + '\', \'' + key + '\')');
            }
        }

        if (isOwnerOrPapat && task.selectedMonk && task.status !== 'elfogadva' && task.status !== 'ellenĹ‘rzĂ©s alatt') {
            if (action.indexOf('button') !== -1 || action.indexOf('select') !== -1) action += '<br>';
            action += makeBtn(t('monk_revoke_penalty_button'), '#d9534f', 'resignTask(\'' + work.id + '\', \'' + key + '\')');
        }

        var monkData = allMonks.find(function (m) { return m.email === task.selectedMonk; });
        var monkName = task.selectedMonk ? (monkData ? monkData.fullName : t('unknown_label_html')) : '-';

        html += '<tr style="border-bottom:1px solid #f0f0f0;">' +
            '<td style="padding:8px;">' + getMonasteryTaskLabel(key, task.label) + '</td>' +
            '<td style="padding:8px; color:#555;">' + monkName + '</td>' +
            '<td style="padding:8px; text-align:right;">' + action + '</td>' +
            '</tr>';
    }
    html += '</table>';
    return html;
}

function resignTask(workId, taskKey) {
    var message = t('monk_resign_confirm_html');
    uiConfirm(message, t('task_withdraw_title'), function () {
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
        function (res) {
            if (loading) loading.style.display = 'none';
            var title = res.success ? t('success_title') : t('notice_title');
            uiAlert(res.message || res.error, title);
            refreshMonasteryWork();
        },
        function (err) {
            if (loading) loading.style.display = 'none';
            uiAlert(t('server_call_error_prefix') + err.message, t('system_error_title'));
        }
    );
}

// --- 2. FĂ“RUM (KĂ¶zĂ¶s Terem) ---
function loadForumPosts() {
    var container = document.getElementById('monastery-forum-posts');
    if (!container) return;
    container.innerHTML = '<i>' + t('loading') + '</i>';

    callBackend('getMonasteryForumPostsSecure', [],
        function (res) {
            if (!res.success) {
                container.innerHTML = '<div style="padding:20px; color:#8b0000;"><h3>đźš« ' + t('monk_forum_closed_title') + '</h3><p>' + res.error + '</p></div>';
                document.getElementById('forum-post-input').disabled = true;
                return;
            }
            if (res.posts.length === 0) { container.innerHTML = '<p><i>' + t('monk_forum_empty') + '</i></p>'; return; }
            var html = '';
            res.posts.forEach(function (post) {
                html += '<div class="forum-post"><div class="forum-header"><span class="forum-author">' + post.author + '</span><span>' + post.date + '</span></div><div>' + post.message + '</div></div>';
            });
            container.innerHTML = html;
            document.getElementById('forum-post-input').disabled = false;
        },
        function (err) { container.innerHTML = '<p style="color:red;">' + t('error_prefix') + err.message + '</p>'; }
    );
}

function submitForumPost() {
    var input = document.getElementById('forum-post-input');
    var text = input.value;
    if (!text) return;

    var btn = event.target;
    btn.disabled = true;

    callBackend('addForumPost', [text],
        function (res) {
            btn.disabled = false;
            if (res.success) {
                input.value = '';
                loadForumPosts();
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (err) {
            btn.disabled = false;
            uiAlert(t('server_error_prefix') + err.message);
        }
    );
}

// --- 3. SUTTOGĂ“ (Chat) ---
var currentChatPartnerEmail = null;

function loadChatPartners() {
    var list = document.getElementById('chat-partners-list');
    list.innerHTML = '<i>' + t('monk_chat_loading') + '</i>';

    callBackend('getMonasteryChatPartners', [],
        function (res) {
            if (!res.success) { list.innerHTML = '<p style="color:red; padding:10px;">' + t('error_prefix') + res.error + '</p>'; return; }

            if (res.partners.length === 0) {
                list.innerHTML = '<p style="padding:10px; font-size:0.8em; color:#666;">' + t('monk_chat_none') + '</p>';
                return;
            }

            var html = '';
            var systemEmail = "rendszer@felhokolostor.com";
            var systemElemId = null;

            res.partners.forEach(function (p, index) {
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
        function (err) { list.innerHTML = '<p style="color:red;">' + t('error_prefix') + err.message + '</p>'; }
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
    msgArea.innerHTML = '<p style="text-align:center; color:#888; font-size:0.8em;">' + t('monk_chat_loading_prefix') + '<strong>' + name + '</strong>' + t('monk_chat_loading_suffix') + '</p>';

    callBackend('getPrivateMessages', [email],
        function (data) {
            msgArea.innerHTML = '';
            if (data && data.messages) {
                data.messages.forEach(function (msg) {
                    var typeClass = (msg.direction === 'out') ? 'outgoing' : 'incoming';
                    msgArea.innerHTML += '<div class="chat-bubble ' + typeClass + '">' + msg.message + '</div>';
                });
                msgArea.scrollTop = msgArea.scrollHeight;
            }
        },
        function (err) { msgArea.innerHTML = '<p style="color:red;">' + t('error_prefix') + err.message + '</p>'; }
    );
}

function sendPrivateMessage() {
    var input = document.getElementById('chat-message-input');
    var msg = input.value;
    if (!msg || !currentChatPartnerEmail) return;

    var msgArea = document.getElementById('chat-messages-area');
    msgArea.innerHTML += '<div class="chat-bubble outgoing">' + msg + '</div>';
    msgArea.scrollTop = msgArea.scrollHeight;
    input.value = '';

    callBackend('sendPrivateMessage', [currentChatPartnerEmail, msg],
        function () { },
        function (err) { console.error(t('chat_error_prefix'), err); }
    );
}

function offerPrice(workId, taskKey) {
    var priceInput = document.getElementById('price-' + taskKey);
    var price = priceInput.value;
    if (!price || price <= 0) { uiAlert(t('monk_offer_price_invalid')); return; }
    doWorkAction(workId, 'offer_price', { taskKey: taskKey, price: price });
}

function payDirect(workId, taskKey) {
    requestPin(function (pin) {
        doWorkAction(workId, 'pay_direct', { taskKey: taskKey, pinCode: pin });
    });
}

function acceptCredit(workId, taskKey) {
    var message = t('monk_credit_confirm_html');
    uiConfirm(message, t('credit_request_title'), function () {
        doWorkAction(workId, 'accept_credit', { taskKey: taskKey });
    });
}

function hireMinistransMulti(workId, applicantName) {
    var roles = [];
    var checkboxes = document.querySelectorAll('.role-select-' + workId + ':checked');
    for (var i = 0; i < checkboxes.length; i++) {
        roles.push(checkboxes[i].value);
    }

    if (roles.length === 0) {
        uiAlert(t('monk_hire_role_missing'), t('missing_data_title'));
        return;
    }

    var message = t('monk_hire_confirm_prefix') + applicantName + " felvĂ©tele a megjelĂ¶lt szerepkĂ¶r(Ă¶k)be?";
    uiConfirm(message, t('monk_hire_title'), function () {
        doWorkAction(workId, 'hire_ministrans', { roles: roles.join(","), applicantName: applicantName });
    });
}

// --- SZEMĂ‰LYZETI KEZELĹ FUNKCIĂ“K ---

function loadPersonnelData() {
    var panel = document.getElementById('personnel-panel');
    var container = document.getElementById('personnel-list-container');

    panel.style.display = 'block';
    container.innerHTML = '<p>' + t('monk_personnel_loading') + '</p>';

    callBackend('getMonkManagementData', [],
        function (res) {
            if (!res.success) { container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>'; return; }

            if (res.monks.length === 0) { container.innerHTML = '<p>' + t('monk_personnel_empty') + '</p>'; return; }

            var html = '';
            res.monks.forEach(function (monk) {
                var tasksHtml = '';
                if (monk.activeTasks.length > 0) {
                    tasksHtml = '<ul style="margin: 5px 0; padding-left: 20px; font-size: 0.9em;">';
                    monk.activeTasks.forEach(function (task) {
                        tasksHtml += '<li style="margin-bottom: 5px;">' +
                            '<strong>' + task.workTitle + '</strong> - ' + task.taskLabel + ' ' +
                            '<span style="background:#eee; padding:2px 5px; border-radius:3px;">' + task.status + '</span> ' +
                            '<button class="btn btn-sm btn-danger" style="padding: 2px 6px; font-size: 0.7em; margin-left: 5px;" ' +
                            'onclick="adminRevokeTask(\'' + task.workId + '\', \'' + task.taskKey + '\')">' + t('monk_revoke_button') + '</button>' +
                            '</li>';
                    });
                    tasksHtml += '</ul>';
                } else {
                    tasksHtml = '<em style="color:#777;">' + t('monk_no_active_task') + '</em>';
                }

                html += '<div class="item-entry" style="display:block;">' +
                    '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 10px;">' +
                    '<div>' +
                    '<div class="item-title">' + monk.name + '</div>' +
                    '<small>' + monk.email + '</small><br>' +
                    '<div style="margin-top: 5px;">' +
                    '<span style="color: var(--color-secondary); font-weight:bold;">SzerepkĂ¶rĂ¶k mĂłdosĂ­tĂˇsa:</span><br>' +
                    getRoleCheckboxesHtml(monk.roles ? monk.roles.split(',').map(function(s){return s.trim();}) : [], 'admin_' + CSS.escape(monk.email)) +
                    '<button class="btn btn-sm" style="background-color:var(--color-primary); color:white; margin-top:5px;" onclick="adminUpdateMonkRoles(\'' + monk.email + '\')">SzerepkĂ¶rĂ¶k MentĂ©se</button>' +
                    '</div>' +
                    '</div>' +
                    '<button class="btn btn-danger" onclick="adminExpelMonk(\'' + monk.email + '\')">' + t('monk_expel_button') + '</button>' +
                    '</div>' +
                    '<div>' + tasksHtml + '</div>' +
                    '</div>';
            });
            container.innerHTML = html;
        },
        function (err) { container.innerHTML = '<p style="color:red;">' + t('error_prefix') + err.message + '</p>'; }
    );
}

function adminUpdateMonkRoles(email) {
    var roles = [];
    var safeEmail = CSS.escape(email);
    var checkboxes = document.querySelectorAll('.role-select-admin_' + safeEmail + ':checked');
    for (var i = 0; i < checkboxes.length; i++) {
        roles.push(checkboxes[i].value);
    }
    
    var rolesStr = roles.join(",");
    document.getElementById('loading-overlay').style.display = 'flex';
    callBackend('updateMonkRoles', [email, rolesStr],
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert("SzerepkĂ¶rĂ¶k sikeresen frissĂ­tve!", t('success_title'));
                loadPersonnelData();
            } else {
                uiAlert(res.error, t('error_title'));
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('error_prefix') + err.message, t('system_error_title'));
        }
    );
}

function adminRevokeTask(workId, taskKey) {
    var message = t('monk_admin_revoke_confirm_html');
    uiConfirm(message, t('task_retake_title'), function () {
        doWorkAction(workId, 'resign_task', { taskKey: taskKey });
        setTimeout(loadPersonnelData, 1500);
    });
}

function adminExpelMonk(email) {
    uiPrompt(t('monk_expel_prompt_prefix') + email + t('monk_expel_prompt_suffix'),
        t('monk_expel_title'), t('monk_expel_placeholder'),
        function (reason) {
            if (!reason || reason.trim() === "") { uiAlert(t('monk_expel_reason_required'), t('missing_data_title')); return; }

            var confirmMessage = t('monk_expel_confirm_html');
            uiConfirm(confirmMessage, t('monk_expel_confirm_title'), function () {
                document.getElementById('loading-overlay').style.display = 'flex';

                callBackend('expelBadMonk', [email, reason],
                    function (res) {
                        document.getElementById('loading-overlay').style.display = 'none';
                        uiAlert(res.message || res.error, res.success ? t('success_title') : t('error_title'));
                        loadPersonnelData();
                    },
                    function (err) {
                        document.getElementById('loading-overlay').style.display = 'none';
                        uiAlert(t('error_prefix') + err.message, t('system_error_title'));
                    }
                );
            });
        }
    );
}

function uploadCoverFromCard(workId, taskKey) {
    var fileInput = document.getElementById('cover-upload-' + workId);
    var file = fileInput ? fileInput.files[0] : null;
    if (!file) { uiAlert(t('monk_cover_missing'), t('missing_file_title')); return; }

    var message = t('monk_cover_confirm_html');
    uiConfirm(message, t('monk_cover_upload_title'), async function () {
        document.getElementById('loading-overlay').style.display = 'flex';
        try {
            var reader = new FileReader();
            var dataUrl = await new Promise(function(resolve, reject) {
                reader.onload = function(e) { resolve(e.target.result); };
                reader.onerror = function(e) { reject(new Error("Hiba a fĂˇjl olvasĂˇsa kĂ¶zben")); };
                reader.readAsDataURL(file);
            });
            
            var pngDataUrl = await convertToPngDataUrl(dataUrl);
            var fileData = {
                base64: pngDataUrl.split(',')[1],
                mimeType: 'image/png',
                filename: file.name.replace(/\.[^/.]+$/, "") + ".png"
            };

            callBackend('uploadCoverAndFinishTask', [workId, taskKey, fileData],
                function (res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(res.message || res.error, res.success ? t('success_title') : t('notice_title'));
                    if (res.success) refreshMonasteryWork();
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(t('monk_cover_upload_error_prefix') + err.message, t('system_error_title'));
                }
            );
        } catch (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Hiba a kĂ©p konvertĂˇlĂˇsa sorĂˇn: " + err.message, t('system_error_title'));
        }
    });
}

function resignFromOrder() {
    var message1 = t('monk_resign_order_confirm_html');
    uiConfirm(message1, t('monk_resign_order_title'), function () {
        showSystemModal(t('monk_game_status_title'), t('monk_game_status_body_html'), "fas fa-door-open",
            [
                {
                    text: t('monk_resign_game_yes'),
                    color: "#c0392b", textColor: "white",
                    callback: function () { finalizeResignation(true); }
                },
                {
                    text: t('monk_resign_game_no'),
                    color: "#2980b9", textColor: "white",
                    callback: function () { finalizeResignation(false); }
                }
            ]
        );
    });
}

function finalizeResignation(leaveGame) {
    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('resignFromMonastery', [leaveGame],
        function (res) {
            if (loading) loading.style.display = 'none';
            uiAlert(res.message, res.success ? t('success_title') : t('notice_title'));
            if (res.success) {
                if (leaveGame) logout();
                else loadPage('felhokolostor_oldal');
            }
        },
        function (err) {
            if (loading) loading.style.display = 'none';
            uiAlert(t('error_prefix') + err.message, t('system_error_title'));
        }
    );
}

// ============================================================================
// KĂ–NYVFELTĂ–LTĹ Ă‰S SZENTELĹ MODUL (Eredeti, szĂ©tvĂˇlasztott logika)
// ============================================================================

(function () { // BezĂˇrjuk egy fĂĽggvĂ©nybe, hogy a vĂˇltozĂłk ne szennyezzĂ©k a globĂˇlis teret, de a globĂˇlis esemĂ©nyek mĹ±kĂ¶djenek

    // --- HELYI VĂLTOZĂ“K ---
    var submitButton = null;
    var statusDiv = null;
    var modalText = null;
    var isSubmitting = false;
    var serverParams = {};

    // SzentelĂ©shez szĂĽksĂ©ges vĂˇltozĂłk
    var globalGdocId = null;
    var globalCoverId = null;
    var globalLogId = null;
    var globalUserEmail = null;
    var isSzentelesMode = false;

    // --- PARAMĂ‰TEREK BEOLVASĂSA (URL-bĹ‘l) ---
    try {
        if (typeof window !== 'undefined' && window.location && window.location.search) {
            const params = new URLSearchParams(window.location.search);
            const obj = {};
            for (const [k, v] of params.entries()) {
                obj[k] = [v]; // Apps Script kompatibilis formĂˇtum (tĂ¶mb)
            }
            serverParams = obj;
        }
    } catch (e) { console.warn('ParamĂ©ter feldolgozĂˇsi hiba:', e); }

    function getParam(key) {
        return (serverParams && serverParams[key] && serverParams[key][0]) ? serverParams[key][0] : null;
    }

    // --- INICIALIZĂLĂS (DOM betĂ¶ltĂ©skor) ---
    document.addEventListener("DOMContentLoaded", function () {
        // Csak akkor fusson, ha van kĂ¶nyvfeltĂ¶ltĹ‘ Ĺ±rlap az oldalon
        var form = document.getElementById('bookForm');
        if (!form) return; // Ha nincs Ĺ±rlap, kilĂ©pĂĽnk (ne zavarja a tĂ¶bbi oldalt)

        console.log("KĂ¶nyvfeltĂ¶ltĹ‘ modul inicializĂˇlĂˇsa...");

        try {
            // UI elemek mentĂ©se
            submitButton = document.getElementById('submitButton');
            statusDiv = document.getElementById('status');
            modalText = document.getElementById('modal-status-text');

            // ParamĂ©terek
            globalGdocId = getParam('gdocId');
            globalUserEmail = getParam('userEmail');
            globalLogId = getParam('logId');
            globalCoverId = getParam('coverId');
            var action = getParam('action');
            var titleParam = getParam('title');

            // --- 1. ĂG: SZENTELĂ‰S MĂ“D (FelhĹ‘kolostorbĂłl jĂ¶tt) ---
            if (action === 'szenteles' && globalGdocId && globalUserEmail && globalLogId) {
                console.log(">>> MĂ“D: SzentelĂ©s aktĂ­v.");
                isSzentelesMode = true;

                // FĂˇjlmezĹ‘k elrejtĂ©se (a szerver adja Ĺ‘ket)
                var epubElem = document.getElementById('epubFile');
                var coverElem = document.getElementById('coverImageFile');

                if (epubElem) {
                    var epubGroup = epubElem.closest('.form-group');
                    if (epubGroup) epubGroup.style.display = 'none';
                    epubElem.required = false; // KĂ¶telezĹ‘sĂ©g levĂ©tele
                }

                if (coverElem) {
                    var coverGroup = coverElem.closest('.form-group');
                    if (coverGroup) coverGroup.style.display = 'none';
                }

                // Adatok elĹ‘tĂ¶ltĂ©se
                if (titleParam) document.getElementById('title').value = titleParam;
                var ownerEmailField = document.getElementById('ownerEmail');
                if (ownerEmailField) ownerEmailField.value = globalUserEmail;

                var origAuthor = getParam('origAuthor');
                var authorNameField = document.getElementById('authorName');
                if (authorNameField) authorNameField.value = origAuthor ? origAuthor : "FelhĹ‘kolostor SzerzĹ‘je";
                
                var origPublisher = getParam('origPublisher');
                var publisherNameField = document.getElementById('publisherName');
                if (publisherNameField && origPublisher) publisherNameField.value = origPublisher;
                
                var origIsbn = getParam('origIsbn');
                var isbnField = document.getElementById('isbn');
                if (isbnField && origIsbn) isbnField.value = origIsbn;
                
                // Set the dropdowns asynchronously once they are populated!
                var origType = getParam('origType');
                var targetLang = getParam('targetLang');
                
                if (origType) window.prefillProductType = origType;
                if (targetLang) window.prefillLanguage = targetLang;

                // Backend hĂ­vĂˇsok (SzentelĂ©s specifikus vagy kĂ¶zĂ¶s)
                callBackend('getDropdownData', [], populateDropdowns, showError);
                callBackend('getCentralImageAsset', ['logo'], displayLogo, displayLogoError);

            } else {
                // --- 2. ĂG: NORMĂL MĂ“D ---
                console.log(">>> MĂ“D: NormĂˇl feltĂ¶ltĂ©s.");

                // Backend hĂ­vĂˇsok (NormĂˇl specifikus)
                callBackend('getDropdownData', [], populateDropdowns, showError);
                callBackend('getCentralImageAsset', ['logo'], displayLogo, displayLogoError);
                callBackend('getCentralImageAsset', ['book_upload'], displayLoadingGif, function (e) { console.warn('Gif hiba', e); });
            }

            // Ĺ°rlap bekĂĽldĂ©s esemĂ©nykezelĹ‘ csatolĂˇsa
            form.addEventListener('submit', handleFormSubmit);

        } catch (e) {
            showError(new Error("InicializĂˇlĂˇsi hiba: " + e.message));
        }
    });

    // --- Ĺ°RLAP BEKĂśLDĂ‰SE (A KĂ‰T ĂG KEZELĂ‰SE) ---
    function handleFormSubmit(event) {
        event.preventDefault();
        if (isSubmitting) return;

        var formObject = event.target;
        var formData = buildBaseFormData(formObject, null);

        // ParamĂ©terek ĂşjraolvasĂˇsa a biztonsĂˇg kedvĂ©Ă©rt
        var gdocId = getParam('gdocId');
        var logId = getParam('logId');
        var coverId = getParam('coverId');
        var action = getParam('action');

        if (action === 'szenteles' && gdocId && logId) {
            // === SZENTELĂ‰S ĂG ===
            setUiState('loading', 'Szentelt kĂ¶nyv adatainak feldolgozĂˇsa a szerveren...');

            // Itt a 'initiateGDocSzenteles' backend fĂĽggvĂ©nyt hĂ­vjuk
            callBackend('initiateGDocSzenteles', [gdocId, formData.ownerEmail, logId, coverId, formData],
                function (response) {
                    if (!response.success) {
                        showError(new Error(response.error));
                        return;
                    }
                    // Ha sikeres, a kliens oldalon dolgozzuk fel a vĂˇlaszt
                    handleSzentelesResponse(response, formData);
                },
                showError
            );

        } else {
            // === NORMĂL ĂG ===
            setUiState('loading', 'AzonosĂ­tĂł foglalĂˇsa a szerveren...');

            // Itt a 'initiateUploadAndGetId' backend fĂĽggvĂ©nyt hĂ­vjuk
            callBackend('initiateUploadAndGetId', [formData],
                function (response) {
                    // Ha megvan az ID, indul a helyi fĂˇjlfeldolgozĂˇs
                    processFilesAndFinalize(formObject, response.basicCode, response.rowNumber, null, null, formData.ownerEmail);
                },
                showError
            );
        }
    }

    // --- SZENTELĂ‰S SPECIFIKUS FELDOLGOZĂ“ ---
    function handleSzentelesResponse(response, formData) {
        setUiState('loading', 'FĂˇjlok visszaalakĂ­tĂˇsa Ă©s vĂ©glegesĂ­tĂ©s...');
        try {
            // 1. ePub visszaalakĂ­tĂˇsa base64-bĹ‘l Blob-bĂˇ
            var epubBlob = base64ToBlob(response.base64Epub);
            var cleanTitle = sanitizeForFilename(formData.title);
            epubBlob.name = cleanTitle + ".epub";

            // 2. BorĂ­tĂł visszaalakĂ­tĂˇsa (ha van)
            var coverFilesArray = [];
            if (response.base64Cover) {
                var coverBlob = base64ToBlob(response.base64Cover, 'image/png');
                coverBlob.name = cleanTitle + "_cover.png";
                coverFilesArray = [coverBlob];
            }

            // 3. Mock (szimulĂˇlt) Ĺ±rlap objektum lĂ©trehozĂˇsa
            // Ez azĂ©rt kell, hogy a kĂ¶zĂ¶s 'processFilesAndFinalize' fĂĽggvĂ©ny azt higgye, Ĺ±rlaprĂłl jĂ¶tt az adat
            var mockFormObject = {
                title: { value: formData.title },
                epubFile: { files: [epubBlob] },
                coverImageFile: { files: coverFilesArray },
                epubBaseName: cleanTitle
            };

            // 4. ĂtadĂˇs a kĂ¶zĂ¶s feldolgozĂłnak
            processFilesAndFinalize(mockFormObject, response.basicCode, response.rowNumber, globalGdocId, globalLogId, globalUserEmail);

        } catch (e) {
            showError(new Error("FeldolgozĂˇsi hiba (SzentelĂ©s): " + e.message));
        }
    }

    // --- KĂ–ZĂ–S FĂJLFELDOLGOZĂ“ Ă‰S FELTĂ–LTĹ (Core Logic) ---
    async function processFilesAndFinalize(formObject, basicCode, rowNumber, gdocId, logId, userEmail) {
        try {
            setUiState('loading', 'FĂˇjlok vĂ­zjelezĂ©se, kicsomagolĂˇsa Ă©s feltĂ¶ltĂ©se...');

            // CĂ­m meghatĂˇrozĂˇsa (tĂˇmogatja a Mock objektumot Ă©s a HTML elemet is)
            var bookTitle = (formObject.title && formObject.title.value) ? formObject.title.value : "Nocim";
            if (!bookTitle && typeof formObject.title === 'string') bookTitle = formObject.title;
            var sanitizedTitle = sanitizeForFilename(bookTitle);

            var epubFile = (formObject.epubFile && formObject.epubFile.files) ? formObject.epubFile.files[0] : null;
            var coverFile = (formObject.coverImageFile && formObject.coverImageFile.files) ? formObject.coverImageFile.files[0] : null;

            // VĂ©gsĹ‘ adatcsomag
            var finalData = {
                rowNumber: rowNumber,
                gdocId: gdocId,
                logId: logId,
                userEmail: userEmail,
                epubBaseName: sanitizedTitle,
                quizData: getVerificationData()
            };

            // 1. BorĂ­tĂł vĂ­zjelezĂ©se
            if (coverFile) {
                var watermarkedCoverBase64 = await embedIdInImage(coverFile, basicCode);
                finalData.coverImageData = watermarkedCoverBase64.split(',')[1];
                finalData.coverImageFilename = sanitizedTitle + '_cover.png';
                finalData.coverImageMimeType = 'image/png';
            }

            // 2. ePub feldolgozĂˇsa
            if (epubFile) {
                var zip = new JSZip(); // FeltĂ©telezzĂĽk, hogy a JSZip globĂˇlisan elĂ©rhetĹ‘
                var epubData = await epubFile.arrayBuffer();
                var loadedZip = await zip.loadAsync(epubData);
                var zeroWidthId = encodeIdToZeroWidth(basicCode);

                // XHTML fĂˇjlok tisztĂ­tĂˇsa
                var xhtmlFileNames = Object.keys(loadedZip.files).filter(name => name.toLowerCase().endsWith('.xhtml'));
                var xhtmlPromises = xhtmlFileNames.map(async (fileName) => {
                    var content = await loadedZip.file(fileName).async('string');
                    // CSS tisztĂ­tĂˇs (eredeti regexek)
                    content = content.replace(/(background-color|background):\s*[^;"]+;?/gi, '');
                    content = content.replace(/color:\s*[^;"]+;?/gi, '');
                    content = content.replace(/font-family:[^;"]+;?/gi, '');
                    content = content.replace(/font-size:[^;"]+;?/gi, '');
                    content = content.replace(/line-height:[^;"]+;?/gi, '');
                    content = content.replace(/style="\s*"/gi, '');
                    var shortName = fileName.split('/').pop();
                    return { filename: shortName, content: content };
                });
                finalData.xhtmlFiles = await Promise.all(xhtmlPromises);

                // KĂ©pek vĂ­zjelezĂ©se
                var imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
                var imageFileNames = Object.keys(loadedZip.files).filter(fileName =>
                    imageExtensions.some(ext => fileName.toLowerCase().endsWith(ext)) && !fileName.startsWith('__MACOSX')
                );

                var imagePromises = imageFileNames.map(async (fileName) => {
                    var file = loadedZip.file(fileName);
                    var imageName = fileName.split('/').pop();
                    try {
                        var imageBlob = await file.async('blob');
                        var base64Url = await readBlobAsDataURL(imageBlob);
                        var watermarkedBase64Url = await embedIdInImage(base64Url, basicCode);
                        return {
                            filename: imageName.replace(/\.[^/.]+$/, "") + '.png',
                            base64: watermarkedBase64Url.split(',')[1]
                        };
                    } catch (e) { return null; }
                });
                finalData.base64Images = (await Promise.all(imagePromises)).filter(img => img);

                // SzĂ¶veges vĂ­zjel beszĂşrĂˇsa
                try {
                    var containerXmlContent = await loadedZip.file('META-INF/container.xml').async('string');
                    var containerParser = new DOMParser();
                    var containerDoc = containerParser.parseFromString(containerXmlContent, 'text/xml');
                    var opfPath = containerDoc.querySelector('rootfile').getAttribute('full-path');
                    var opfContent = await loadedZip.file(opfPath).async('string');
                    var xmlDoc = new DOMParser().parseFromString(opfContent, 'text/xml');
                    var itemrefs = xmlDoc.querySelectorAll('spine itemref');

                    for (const itemref of itemrefs) {
                        var idref = itemref.getAttribute('idref');
                        var manifestItem = xmlDoc.querySelector(`manifest item[id="${idref}"]`);
                        if (manifestItem && manifestItem.getAttribute('media-type') === 'application/xhtml+xml') {
                            var href = manifestItem.getAttribute('href');
                            var pathPrefix = opfPath.substring(0, opfPath.lastIndexOf('/') + 1);
                            var chapterContent = await loadedZip.file(pathPrefix + href).async('string');
                            var watermarkedChapterContent = chapterContent.replace(/<\/p>/i, `${zeroWidthId}</p>`);
                            loadedZip.file(pathPrefix + href, watermarkedChapterContent);
                        }
                    }
                } catch (err) { console.warn("VĂ­zjelezĂ©si hiba (nem blokkolĂł):", err); }

                var watermarkedEpubBlob = await loadedZip.generateAsync({ type: 'blob' });
                var epubBase64 = await readFileAsBase64(watermarkedEpubBlob);
                finalData.epubFileData = epubBase64.split(',')[1];
                finalData.epubFilename = sanitizedTitle + '.epub';
                finalData.epubMimeType = epubFile.type;

            } else {
                throw new Error("ePub fĂˇjl hiĂˇnyzik a csomagbĂłl!");
            }

            setUiState('loading', 'VĂ©glegesĂ­tĂ©s Ă©s fĂˇjlfeltĂ¶ltĂ©s...');

            // VĂ©glegesĂ­tĂ©s a szerveren
            callBackend('finalizeUpload', [finalData], showResult, showError);

        } catch (error) {
            showError(error);
        }
    }


    // --- SEGĂ‰DFĂśGGVĂ‰NYEK ---

    function buildBaseFormData(form, basicCode) {
        var data = {
            ownerEmail: form.ownerEmail.value,
            productType: form.productType.value,
            language: form.language.value,
            authorName: form.authorName.value,
            publisherName: form.publisherName.value,
            title: form.title.value,
            isbn: form.isbn.value,
            price: form.price.value,
            acceptance: form.acceptance.checked
        };
        if (basicCode) data.basicCode = basicCode;
        return data;
    }

    function getVerificationData() {
        var q1 = document.getElementById('quiz_q1');
        var a1 = document.getElementById('quiz_a1');
        var q2 = document.getElementById('quiz_q2');
        var a2 = document.getElementById('quiz_a2');
        var q3 = document.getElementById('quiz_q3');
        var a3 = document.getElementById('quiz_a3');
        if (!q1 || !a1 || !q2 || !a2 || !q3 || !a3) return [];
        return [
            { question: q1.value.trim(), answer: a1.value.trim() },
            { question: q2.value.trim(), answer: a2.value.trim() },
            { question: q3.value.trim(), answer: a3.value.trim() }
        ];
    }

    function setUiState(state, message) {
        var modal = document.getElementById('loading-modal');
        var modalTextLocal = document.getElementById('modal-status-text');
        if (state === 'loading') {
            isSubmitting = true;
            if (submitButton) submitButton.disabled = true;
            if (statusDiv) { statusDiv.textContent = message || 'FeldolgozĂˇs...'; statusDiv.className = ''; }
            if (modalTextLocal) modalTextLocal.textContent = message || 'FeldolgozĂˇs folyamatban...';
            if (modal) modal.style.display = 'flex';
        } else {
            isSubmitting = false;
            if (submitButton) submitButton.disabled = false;
            if (statusDiv) {
                statusDiv.textContent = message || '';
                statusDiv.className = (message && (message.startsWith('Hiba') || message.startsWith('IdĹ‘tĂşllĂ©pĂ©s'))) ? 'error' : 'success';
            }
            if (modal) modal.style.display = 'none';
        }
    }

    function showResult(message) {
        setUiState('finished', message);
        if (!message.startsWith(t('error_prefix'))) {
            var form = document.getElementById('bookForm');
            if (form) form.style.display = 'none';
            var logo = document.getElementById('logo-container');
            if (logo) logo.style.display = 'none';
            if (statusDiv) {
                statusDiv.innerHTML = '<div style="padding:30px; background-color:#e3fcef; color:#006644; border:2px solid #006644; border-radius:8px;"><h3>âś… ' + t('upload_success_title') + '</h3><p>' + message + '</p></div>';
            }
            var title = document.getElementById('page-title');
            if (title) title.innerText = t('upload_completed_title');
        }
    }

    function showError(error) {
        var msg = (error && error.message) ? error.message : t('unknown_error');
        setUiState('finished', t('error_prefix') + msg);
    }

    // --- Backend Handler Callbackek ---
    function populateDropdowns(data) {
        var genreSelect = document.getElementById('productType');
        var languageSelect = document.getElementById('language');
        if (!genreSelect || !languageSelect) return;

        genreSelect.innerHTML = '<option value="">' + t('select_option') + '</option>';
        languageSelect.innerHTML = '<option value="">' + t('select_option') + '</option>';
        if (data && data.genres) data.genres.forEach(g => { 
            var o = document.createElement('option'); 
            o.value = g; o.textContent = g; 
            if (window.prefillProductType && g.toLowerCase() === window.prefillProductType.toLowerCase()) o.selected = true;
            genreSelect.appendChild(o); 
        });
        if (data && data.languages) data.languages.forEach(l => { 
            var o = document.createElement('option'); 
            o.value = l; o.textContent = l; 
            if (window.prefillLanguage && l.toLowerCase() === window.prefillLanguage.toLowerCase()) o.selected = true;
            languageSelect.appendChild(o); 
        });
    }

    function displayLogo(imageData) {
        var logoElement = document.getElementById('oldal-logo');
        if (logoElement && imageData && imageData.data) {
            logoElement.src = `data:${imageData.mime};base64,${imageData.data}`;
            logoElement.style.display = 'block';
        }
    }

    function displayLogoError(error) { console.error("Logo betĂ¶ltĂ©si hiba:", error); }

    function displayLoadingGif(imageData) {
        var gifElement = document.getElementById('book_upload-image');
        if (gifElement && imageData && imageData.data) gifElement.src = `data:${imageData.mime};base64,${imageData.data}`;
    }

    // --- Utilitik (VĂ­zjelezĂ©shez, stb.) ---
    function sanitizeForFilename(text) { if (!text) return "nevtelen_konyv"; return text.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, ''); }
    function encodeIdToZeroWidth(id) { var b = ''; for (var i = 0; i < id.length; i++) b += id[i].charCodeAt(0).toString(2).padStart(8, '0'); var z = ''; for (const x of b) z += (x === '0') ? '\u200b' : '\u200c'; return z + '\u200d'; }
    function readFileAsBase64(file) { return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(r.result); r.onerror = e => rej(e); r.readAsDataURL(file); }); }
    function readBlobAsDataURL(blob) { return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(r.result); r.onerror = e => rej(e); r.readAsDataURL(blob); }); }
    function base64ToBlob(b64, mime) { mime = mime || 'application/epub+zip'; var c = atob(b64); var b = new Uint8Array(c.length); for (var i = 0; i < c.length; i++) b[i] = c.charCodeAt(i); return new Blob([b], { type: mime }); }
    function embedIdInImage(src, id) { return new Promise((res, rej) => { var i = new Image(); i.onload = function () { var c = document.createElement('canvas'); c.width = i.width; c.height = i.height; var x = c.getContext('2d'); x.drawImage(i, 0, 0); var b = ''; for (var k = 0; k < id.length; k++) b += id[k].charCodeAt(0).toString(2).padStart(8, '0'); b += "11111111"; var p = x.getImageData(0, 0, c.width, c.height); var d = 0; for (var k = 0; k < b.length; k++) { if ((d + 1) % 4 === 0) d++; var v = p.data[d]; p.data[d] = (b[k] === '1') ? (v | 1) : (v & 254); d++; } x.putImageData(p, 0, 0); res(c.toDataURL('image/png')); }; i.onerror = e => rej(new Error("KĂ©p hiba")); if (typeof src === 'string') i.src = src; else { var r = new FileReader(); r.onload = e => i.src = e.target.result; r.readAsDataURL(src); } }); }

})();


// =========================================
// === ĂšJ Ă‰S ĂTHELYEZETT TĂ‰RKĂ‰P FUNKCIĂ“K ===
// =========================================


// === 1. BIZTONSĂGI SEGĂ‰DFĂśGGVĂ‰NYEK (VISSZAĂLLĂŤTVA) ===


/**
 * MegakadĂˇlyozza az alapĂ©rtelmezett jobbklikk menĂĽt.
 */
function preventContextMenuDefault(event) {
    event.preventDefault();
    return false;
}

/**
 * SzigorĂş jobbklikk-tiltĂˇs egy adott elemen Ă©s annak gyermekein.
 * @param {string} elementId Az elem ID-ja.
 */
function disableContextMenuOnElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // EltĂˇvolĂ­tjuk a rĂ©git, hogy ne halmozĂłdjon
        element.removeEventListener('contextmenu', preventContextMenuDefault);
        // HozzĂˇadjuk az Ăşjat
        element.addEventListener('contextmenu', preventContextMenuDefault);

        // Extra vĂ©delem: Ha az elem egy kĂ©p, tiltjuk a "drag"-ot is (hogy ne lehessen kihĂşzni asztalra)
        if (element.tagName === 'IMG') {
            element.setAttribute('draggable', 'false');
        }
    }
}

// =====================================
// === ĂšJ TĂ‰RKĂ‰P (FREE MOVE & ZOOM) ===
// =====================================

// ĂllapotvĂˇltozĂłk
let mapState = {
    scale: 1,
    panning: false,
    pointX: 0, // X koordinĂˇta (eltolĂˇs)
    pointY: 0, // Y koordinĂˇta (eltolĂˇs)
    startX: 0,
    startY: 0
};

const ZOOM_SPEED = 0.2;
const MAX_ZOOM = 5.0;
const MIN_ZOOM = 0.5;

/**
 * MegnyitĂˇs Ă©s inicializĂˇlĂˇs
 */
function openMapViewer(fileId, mapName) {
    const modal = document.getElementById('map-viewer-modal');
    const img = document.getElementById('map-viewer-image');
    const wrapper = document.querySelector('.map-viewer-image-wrapper');
    const loading = document.getElementById('loading-overlay');

    if (!modal || !img) return;

    // Reset UI
    img.src = '';
    // Backtick maradhat, ha modern a kĂ¶rnyezeted
    img.alt = `${mapName} betĂ¶ltĂ©se...`;
    img.style.transform = ''; // TĂ¶rĂ¶ljĂĽk az elĹ‘zĹ‘ pozĂ­ciĂłt
    modal.style.display = 'flex';
    if (loading) loading.style.display = 'flex';

    // --- JAVĂŤTĂS: callBackend ---
    // ParamĂ©ter: csak a fileId (emailt a router intĂ©zi)
    callBackend('getMapImageData', [fileId],
        function (base64Uri) {
            if (loading) loading.style.display = 'none';
            if (base64Uri) {
                // EllenĹ‘rzĂ©s: ha nincs 'data:image' elĹ‘tag, pĂłtoljuk
                if (!base64Uri.startsWith('data:image')) {
                    img.src = 'data:image/png;base64,' + base64Uri;
                } else {
                    img.src = base64Uri;
                }
                img.alt = mapName;

                // 1. ReseteljĂĽk a koordinĂˇtĂˇkat kĂ¶zĂ©pre (0,0)
                resetMapState();

                // 2. BekĂ¶tjĂĽk a vezĂ©rlĹ‘ket
                setupFreeControls(wrapper);

                // 3. BiztonsĂˇg
                disableContextMenuOnElement('map-viewer-modal');
            } else {
                closeMapViewer();
                alert(`Hiba: Nem sikerĂĽlt betĂ¶lteni a tĂ©rkĂ©pet.`);
            }
        },
        function (err) {
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
 * Alaphelyzetbe ĂˇllĂ­tja a vĂˇltozĂłkat
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
 * A transzformĂˇciĂł (CSS) alkalmazĂˇsa a kĂ©pre
 * Ez a "motor", ami mozgatja a kĂ©pet
 */
function updateMapTransform() {
    const img = document.getElementById('map-viewer-image');
    if (!img) return;

    // Itt tĂ¶rtĂ©nik a varĂˇzslat: egyszerre mozgatjuk (translate) Ă©s nagyĂ­tjuk (scale)
    img.style.transform = `translate(${mapState.pointX}px, ${mapState.pointY}px) scale(${mapState.scale})`;
}

/**
 * EsemĂ©nykezelĹ‘k (Drag & Zoom)
 */
function setupFreeControls(wrapper) {
    // --- GOMBOK ---
    document.getElementById('zoom-in-btn').onclick = () => zoomFree('in');
    document.getElementById('zoom-out-btn').onclick = () => zoomFree('out');
    document.getElementById('reset-zoom-btn').onclick = resetMapState;

    // --- EGĂ‰RGĂ–RGĹ (WHEEL) ---
    wrapper.onwheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoomFree('in');
        else zoomFree('out');
    };

    // --- VONSZOLĂS (DRAG) ---
    wrapper.onmousedown = (e) => {
        if (e.button !== 0) return; // Csak bal klikk
        e.preventDefault(); // SzellemkĂ©p tiltĂˇsa!

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

        // KiszĂˇmoljuk az Ăşj pozĂ­ciĂłt
        // AzĂ©rt vonjuk ki az egĂ©rbĹ‘l a startot, mert a translate koordinĂˇtĂˇkat frissĂ­tjĂĽk
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

    // KerekĂ­tĂ©s
    mapState.scale = Math.round(mapState.scale * 10) / 10;
    updateMapTransform();
}

// BiztonsĂˇg
function disableContextMenuOnElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.oncontextmenu = (e) => { e.preventDefault(); return false; };
    }
}

// ===============================

/**
 * ElindĂ­tja a tĂ©rkĂ©pmĂˇsolĂˇsi folyamatot.
 */
function initiateMapCopy(mapSheetRowIndex, mapName) {
    const pinCodeInput = document.getElementById('copy-map-pin');
    const pinCode = pinCodeInput ? pinCodeInput.value : null;

    if (pinCode === null || pinCode === "") {
        uiAlert(t('pin_required'));
        if (pinCodeInput) pinCodeInput.focus();
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';
    callBackend('copyMap', [mapSheetRowIndex, pinCode],
        function (response) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(response.message || response.error);
            if (response.success) {
                updateCreditDisplay();
                loadPage('masolatok_oldal');
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('map_copy_server_error_prefix') + err.message);
        }
    );
}

/**
 * Kezeli a tĂ©rkĂ©pfeltĂ¶ltĹ‘ modal "FeltĂ¶ltĂ©s" gombjĂˇnak megnyomĂˇsĂˇt.
 */
function handleMapUploadSubmit() {
    var identifierInput = document.getElementById('map-identifier');
    var fileInput = document.getElementById('map-file');
    var statusDiv = document.getElementById('upload-status');
    var submitBtn = document.getElementById('submit-map-upload-btn');

    var identifier = identifierInput.value.trim();
    var file = fileInput.files[0];

    if (!identifier || !file) {
        statusDiv.textContent = t('map_upload_missing_fields');
        statusDiv.style.color = 'red';
        return;
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(identifier)) {
        statusDiv.textContent = t('map_upload_invalid_identifier');
        statusDiv.style.color = 'red';
        return;
    }

    submitBtn.disabled = true;
    statusDiv.textContent = 'FĂˇjl olvasĂˇsa Ă©s konvertĂˇlĂˇsa...';
    statusDiv.style.color = 'black';
    document.getElementById('loading-overlay').style.display = 'flex';

    var reader = new FileReader();

    // ASYNC FĂśGGVĂ‰NY MARADT, de nyĂ­l (=>) helyett function()
    reader.onload = async function (e) {
        try {
            // AWAIT MARADT
            var inputDataUrl = e.target.result;
            var pngDataUrl = await convertToPngDataUrl(inputDataUrl);

            var mapData = {
                identifier: identifier,
                base64Data: pngDataUrl.split(',')[1],
                mimeType: 'image/png'
            };

            statusDiv.textContent = 'FeltĂ¶ltĂ©s a szerverre...';

            callBackend('uploadMapImage', [mapData],
                function (response) {
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
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    submitBtn.disabled = false;
                    statusDiv.textContent = 'Szerverhiba: ' + err.message;
                    statusDiv.style.color = 'red';
                }
            );

        } catch (convertError) {
            document.getElementById('loading-overlay').style.display = 'none';
            submitBtn.disabled = false;
            statusDiv.textContent = 'Hiba a kĂ©p konvertĂˇlĂˇsa kĂ¶zben: ' + convertError.message;
            statusDiv.style.color = 'red';
        }
    };

    reader.onerror = function () {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = 'Hiba a fĂˇjl olvasĂˇsa kĂ¶zben.';
        statusDiv.style.color = 'red';
    };
    reader.readAsDataURL(file);
}

/**
 * SEGĂ‰DFĂśGGVĂ‰NY: BĂˇrmilyen kĂ©p DataURL-t PNG DataURL-lĂ© konvertĂˇl Canvas segĂ­tsĂ©gĂ©vel.
 */
function convertToPngDataUrl(inputDataUrl) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = function () {
            var maxWidth = 1920;
            var scale = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
            var newWidth = Math.floor(img.naturalWidth * scale);
            var newHeight = Math.floor(img.naturalHeight * scale);
            var canvas = document.createElement('canvas');
            canvas.width = newWidth;
            canvas.height = newHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newWidth, newHeight);
            try {
                var pngDataUrl = canvas.toDataURL('image/png');
                resolve(pngDataUrl);
            } catch (e) {
                reject(new Error("Canvas PNG export sikertelen: " + e.message));
            }
        };
        img.onerror = function () {
            reject(new Error("A kĂ©pfĂˇjl nem tĂ¶lthetĹ‘ be a konvertĂˇlĂˇshoz."));
        };
        img.src = inputDataUrl;
    });
}

// =====================================
// --- KĂ–NYVTĂR Ă‰S LETĂ–LTĂ‰S FUNKCIĂ“K ---
// =====================================

/**
* === ĂšJ, KIBĹVĂŤTETT KĂ–NYVTĂR INICIALIZĂLĂ“ ===
* FeltĂ¶lti a KĂ¶nyvtĂˇr oldalt kĂ¶nyvekkel, mĂˇsolatokkal, tekercsekkel Ă‰S a felhasznĂˇlĂł tĂ©rkĂ©peivel.
* Kezeli a tĂ©rkĂ©p feltĂ¶ltĂ©s gomb lĂˇthatĂłsĂˇgĂˇt Ă©s a modalokat.
* @param {object} data A szerverrĹ‘l kapott, elĹ‘re betĂ¶ltĂ¶tt adatcsomag.
*/
function initializeLibraryAndMapPage(data) {
    var booksContainer = document.getElementById('konyvtar-books-content');
    var copiesContainer = document.getElementById('konyvtar-copies-content');
    var scrollsContainer = document.getElementById('konyvtar-scrolls-content');
    var mapsContainer = document.getElementById('konyvtar-maps-content');
    var logsContainer = document.getElementById('konyvtar-logs-content');
    var uploadButton = document.getElementById('upload-map-button');

    // EllenĹ‘rzĂ©s
    if (!booksContainer || !copiesContainer || !scrollsContainer || !mapsContainer || !logsContainer || !uploadButton) {
        console.error("Hiba: A KĂ¶nyvtĂˇr oldal szĂĽksĂ©ges HTML kontĂ©nerei hiĂˇnyosak!");
        return;
    }

    // TĂ¶ltĹ‘ ĂĽzenetek eltĂˇvolĂ­tĂˇsa/alaphelyzet
    booksContainer.innerHTML = '';
    copiesContainer.innerHTML = '';
    scrollsContainer.innerHTML = '';
    mapsContainer.innerHTML = '';
    logsContainer.innerHTML = '';

    // ĂltalĂˇnos hiba kezelĂ©se
    if (data.error) {
        booksContainer.innerHTML = '<p style="color: red;">Hiba a kĂ¶nyvtĂˇr betĂ¶ltĂ©sekor: ' + data.error + '</p>';
        return;
    }

    // ============================================================
    // 1. LETĂ–LTHETĹ KĂ–NYVEK (BIZTONSĂGOS JAVĂŤTĂS)
    // ============================================================
    if (data.books && data.books.length > 0) {
        data.books.forEach(function (book) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';

            // 1. LĂ©trehozzuk a szĂ¶veges rĂ©szt stringkĂ©nt (ez biztonsĂˇgos)
            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + book.title + '</div>' +
                '<div class="item-author">' + book.author + '</div>' +
                '</div>';

            // 2. A gombot programkĂłddal hozzuk lĂ©tre, hogy a speciĂˇlis karakterek (pl. "idĂ©zĹ‘jel") 
            // ne tĂ¶rjĂ©k el a HTML-t a data-title attribĂştumban.
            var downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = 'LetĂ¶ltĂ©s';

            // ĂŤgy a rendszer automatikusan kezeli az idĂ©zĹ‘jeleket
            downloadBtn.setAttribute('data-id', book.downloadLink);
            downloadBtn.setAttribute('data-title', book.title);

            downloadBtn.onclick = function () {
                var id = this.getAttribute('data-id');
                var title = this.getAttribute('data-title');
                startClientSideDownloadProcess(id, title);
            };

            entryDiv.appendChild(downloadBtn);
            booksContainer.appendChild(entryDiv);
        });
    } else {
        booksContainer.innerHTML = "<p>Nincsenek letĂ¶lthetĹ‘ kĂ¶nyveid.</p>";
    }

    // ============================================================
    // 2. OLVASHATĂ“ MĂSOLATOK
    // ============================================================
    if (data.copies && data.copies.length > 0) {
        data.copies.forEach(function (copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var inPlayHtml = copy.inPlay ? '<small style="color: orange; display: block;"><i>(JĂˇtĂ©kban van)</i></small>' : '';
            var btnDisabled = copy.inPlay ? 'disabled title="JĂˇtĂ©kban lĂ©vĹ‘ mĂˇsolat nem olvashatĂł itt."' : '';

            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + copy.title + '</div>' +
                '<div class="item-author">' + copy.author + '</div>' +
                inPlayHtml +
                '</div>' +
                '<button class="btn" ' + btnDisabled + '>Olvasom</button>';

            if (!copy.inPlay) {
                entryDiv.querySelector('.btn').onclick = function () {
                    openReaderFor(copy.code);
                };
            }
            copiesContainer.appendChild(entryDiv);
        });
    } else {
        copiesContainer.innerHTML = "<p>Nincsenek olvashatĂł mĂˇsolataid.</p>";
    }

    // ============================================================
    // 3. MEGSZERZETT TEKERCSEK
    // ============================================================
    if (data.scrolls && data.scrolls.length > 0) {
        data.scrolls.forEach(function (scroll) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + scroll.title + '</div>' +
                '<div class="item-author"><em>Fejezet: ' + scroll.fejezet + '</em></div>' +
                '</div>' +
                '<button class="btn">Olvasom</button>';

            entryDiv.querySelector('.btn').onclick = function () {
                openReaderForScroll(scroll.token);
            };
            scrollsContainer.appendChild(entryDiv);
        });
    } else {
        scrollsContainer.innerHTML = "<p>Nincsenek megszerzett tekercseid.</p>";
    }

    // ============================================================
    // 4. HAJĂ“NAPLĂ“K
    // ============================================================
    if (data.logs && data.logs.length > 0) {
        data.logs.forEach(function (log) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var logName = log.name || ('NaplĂł (' + log.id + ')');

            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + logName + '</div>' +
                '<small class="item-author">NaplĂł ID: ' + log.id + '</small>' +
                '</div>' +
                '<button class="btn">Olvasom</button>';

            entryDiv.querySelector('.btn').onclick = function () {
                openLogReader(log.id);
            };
            logsContainer.appendChild(entryDiv);
        });
    } else {
        logsContainer.innerHTML = "<p>Nincsenek olvashatĂł hajĂłnaplĂłid.</p>";
    }

    // ============================================================
    // 5. SAJĂT TĂ‰RKĂ‰PEK
    // ============================================================
    if (data.maps && data.maps.length > 0) {
        data.maps.forEach(function (map) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry map-entry';
            var dateStr = map.date ? new Date(map.date).toLocaleDateString() : 'Ismeretlen';

            entryDiv.innerHTML = '<div class="map-details item-details">' +
                '<div class="map-name item-title">' + map.identifier + '</div>' +
                '<small class="item-author">FeltĂ¶ltve: ' + dateStr + '</small>' +
                '</div>' +
                '<div class="map-actions">' +
                '<button class="btn">MegnĂ©z</button>' +
                '</div>';

            entryDiv.querySelector('.map-actions button').onclick = function () {
                openMapViewer(map.fileId, map.identifier);
            };
            mapsContainer.appendChild(entryDiv);
        });
    } else {
        mapsContainer.innerHTML = "<p>Nincsenek sajĂˇt tĂ©rkĂ©peid.</p>";
    }

    // ============================================================
    // 6. FELTĂ–LTĂ‰S GOMB
    // ============================================================
    if (data.canUpload) {
        uploadButton.style.display = 'block';
        uploadButton.onclick = function () {
            var uploadModal = document.getElementById('upload-map-modal');
            if (uploadModal) {
                uploadModal.style.display = 'flex';
                var statusDiv = document.getElementById('upload-status');
                if (statusDiv) statusDiv.textContent = '';
                var submitBtn = document.getElementById('submit-map-upload-btn');

                if (submitBtn && !submitBtn.hasAttribute('data-listener-added')) {
                    submitBtn.onclick = handleMapUploadSubmit;
                    submitBtn.setAttribute('data-listener-added', 'true');
                }
            } else {
                console.error("Hiba: A feltĂ¶ltĹ‘ modal HTML ('upload-map-modal') hiĂˇnyzik!");
            }
        };
    } else {
        uploadButton.style.display = 'none';
    }

    // ============================================================
    // 7. PAPĂT FUNKCIĂ“K (TĂ‰RKĂ‰PEK ELBĂŤRĂLĂSA)
    // ============================================================
    var papatApprovalSection = document.getElementById('papat-map-approval-section');
    var pendingMapsContainer = document.getElementById('konyvtar-pending-maps-content');
    if (papatApprovalSection && pendingMapsContainer) {
        if (data.isPapat === true) {
            papatApprovalSection.style.display = 'block';
            pendingMapsContainer.innerHTML = '';
            
            if (data.pendingMaps && data.pendingMaps.length > 0) {
                data.pendingMaps.forEach(function (map) {
                    var entryDiv = document.createElement('div');
                    entryDiv.className = 'item-entry map-entry';
                    
                    entryDiv.innerHTML = 
                        '<div class="item-icon"><i class="fas fa-map" style="color: #b71c1c;"></i></div>' +
                        '<div class="item-details">' +
                            '<div class="item-title">' + map.identifier + '</div>' +
                            '<small class="item-author">FeltĂ¶ltĹ‘: ' + map.email + '</small>' +
                        '</div>' +
                        '<div class="map-actions">' +
                            '<button class="btn view-btn" style="background:#17a2b8;">MegtekintĂ©s</button>' +
                            '<button class="btn approve-btn" style="background:#28a745;">JĂłvĂˇhagyĂˇs</button>' +
                            '<button class="btn reject-btn" style="background:#dc3545;">ElutasĂ­tĂˇs</button>' +
                        '</div>';
                    
                    entryDiv.querySelector('.view-btn').onclick = function() {
                        openMapViewer(map.fileId, map.identifier);
                    };
                    
                    entryDiv.querySelector('.approve-btn').onclick = function() {
                        if(typeof uiConfirm === 'function') {
                            uiConfirm('Biztosan jĂłvĂˇhagyod ezt a tĂ©rkĂ©pet?', 'MegerĹ‘sĂ­tĂ©s', function() {
                                handleMapApproval(map.rowIndex, 'approve');
                            });
                        }
                    };
                    
                    entryDiv.querySelector('.reject-btn').onclick = function() {
                        if(typeof uiConfirm === 'function') {
                            uiConfirm('Biztosan elutasĂ­tod ezt a tĂ©rkĂ©pet?', 'MegerĹ‘sĂ­tĂ©s', function() {
                                handleMapApproval(map.rowIndex, 'reject');
                            });
                        }
                    };
                    
                    pendingMapsContainer.appendChild(entryDiv);
                });
            } else {
                pendingMapsContainer.innerHTML = '<p>Nincs elbĂ­rĂˇlĂˇsra vĂˇrĂł tĂ©rkĂ©p.</p>';
            }
        } else {
            papatApprovalSection.style.display = 'none';
        }
    }
}

/**
 * PapĂˇt tĂ©rkĂ©p elbĂ­rĂˇlĂˇs backend hĂ­vĂˇs
 */
function handleMapApproval(rowIndex, action) {
    document.getElementById('loading-overlay').style.display = 'flex';
    var functionName = action === 'approve' ? 'approveMapImage' : 'rejectMapImage';
    
    callBackend(functionName, [rowIndex],
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if(typeof uiAlert === 'function') uiAlert(res.message || res.error);
            if(res.success) {
                loadPage('konyvtar'); // ĂšjratĂ¶ltjĂĽk a kĂ¶nyvtĂˇrat a frissĂ­tett listĂˇĂ©rt
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if(typeof uiAlert === 'function') uiAlert('Szerverhiba: ' + err.message);
        }
    );
}

// =========================================================
// === KĂ–NYVTĂR OLVASĂ“K (VĂ‰GLEGES, MĹ°KĂ–DĹ VERZIĂ“) ===
// =========================================================

// SEGĂ‰DFĂśGGVĂ‰NY: MegjelenĂ­tĂ©s (VĂ‰DELEMMEL Ă‰S SCROLL JAVĂŤTĂSSAL)
function displayInReader(htmlContent) {
    var modal = document.getElementById('reader-modal');
    var readerContent = document.getElementById('reader-content-display');
    var readerShield = document.getElementById('reader-shield');
    var container = document.querySelector('.reader-container');

    if (!modal || !readerContent) {
        console.error("Hiba: OlvasĂł elemek nem talĂˇlhatĂłk!");
        return;
    }

    // Tartalom beillesztĂ©se
    readerContent.innerHTML = htmlContent;

    // MegjelenĂ­tĂ©s
    modal.style.display = 'flex';

    // === VĂ‰DELEM VISSZAĂLLĂŤTĂSA ===

    // 1. Jobbklikk tiltĂˇsa az EGĂ‰SZ olvasĂłban (nem csak a kĂ©peken)
    // Ez megakadĂˇlyozza a "KĂ©p mentĂ©se mĂˇskĂ©nt" Ă©s a "MĂˇsolĂˇs" menĂĽt is.
    modal.oncontextmenu = function (e) {
        e.preventDefault();
        return false;
    };

    // 2. KijelĂ¶lĂ©s, mĂˇsolĂˇs, vĂˇgĂˇs tiltĂˇsa billentyĹ±zettel (Ctrl+C, stb.)
    modal.oncopy = function (e) { e.preventDefault(); return false; };
    modal.oncut = function (e) { e.preventDefault(); return false; };
    modal.onselectstart = function (e) { e.preventDefault(); return false; };

    // === SCROLL POZĂŤCIĂ“ JAVĂŤTĂSA ===
    // Azonnal a tetejĂ©re gĂ¶rgetĂĽnk mindent
    if (container) container.scrollTop = 0;
    modal.scrollTop = 0;
    window.scrollTo(0, 0);

    // Shield (OpcionĂˇlis extra vĂ©delem) mĂ©retezĂ©se
    setTimeout(function () {
        if (readerContent && readerShield) {
            readerShield.style.height = readerContent.scrollHeight + 'px';
        }
    }, 200);
}

// 1. HAJĂ“NAPLĂ“ OLVASĂ“ (Biztos mĂłdszer: getLogEntry + Kliens oldali HTML)
function openLogReader(logId) {
    if (!logId) return;
    console.log(`NaplĂł olvasĂˇsĂˇnak indĂ­tĂˇsa: ${logId}`);
    document.getElementById('loading-overlay').style.display = 'flex';

    // --- JAVĂŤTĂS: callBackend ---
    // ParamĂ©ter: csak [logId] (emailt a router intĂ©zi)
    callBackend('getLogContentForReading', [logId],
        function (response) { // Objektumot kapunk: { htmlContent, imageData }
            try {
                // HibakezelĂ©s a szerver vĂˇlasza alapjĂˇn
                if (response.error) {
                    throw new Error(response.error);
                }
                if (!response.htmlContent) {
                    throw new Error("HiĂˇnyzĂł HTML tartalom a szerver vĂˇlaszĂˇban.");
                }

                let htmlToShow = response.htmlContent;
                const imageDataMap = response.imageData || {};

                // KĂ©p placeholder-ek keresĂ©se Ă©s cserĂ©je a kliens oldalon
                const imagePlaceholderRegex = /\[IMAGE:([^:]+):([^\]]+)\]/g;
                htmlToShow = htmlToShow.replace(imagePlaceholderRegex, (match, fileId, fileName) => {
                    const dataUri = imageDataMap[fileId]; // Itt mĂˇr a teljes "data:image/png;base64,..." URI van

                    if (dataUri) {
                        // KĂ¶zvetlenĂĽl hasznĂˇljuk a kapott Data URI-t az src attribĂştumban
                        const escapedFileName = fileName.replace('.txt', '').replace(/"/g, '&quot;'); // Alap escape

                        // EllenĹ‘rzĂ©s: ha nincs 'data:image' elĹ‘tag, pĂłtoljuk
                        const src = dataUri.startsWith('data:image') ? dataUri : `data:image/png;base64,${dataUri}`;

                        // Visszaadjuk az img taget a teljes Data URI-val
                        return `<img src="${src}" alt="${escapedFileName}" style="max-width: 100%; height: auto; display: block; margin: 1em auto;">`;
                    } else {
                        // Ha a szerver nem tudta lekĂ©rni a kĂ©p adatĂˇt (null-t adott vissza)
                        console.warn(`HiĂˇnyzĂł kĂ©p adat a naplĂłban: ID=${fileId}, FĂˇjlnĂ©v=${fileName}`);
                        // JelenĂ­tsĂĽnk meg egyĂ©rtelmĹ± hibaĂĽzenetet a felhasznĂˇlĂłnak
                        return `<p style="color:orange; border: 1px dashed orange; padding: 5px; text-align: center;">[KĂ©p (${fileName.replace('.txt', '')}) nem tĂ¶lthetĹ‘ be]</p>`;
                    }
                });

                // Body tartalom kinyerĂ©se a teljes HTML-bĹ‘l
                const bodyMatch = htmlToShow.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                // Csak a body tartalmĂˇt, vagy ha nincs body, a teljes stringet adjuk Ăˇt
                const bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : htmlToShow;

                // Tartalom megjelenĂ­tĂ©se az olvasĂłban
                displayInReader(bodyContent);

            } catch (e) {
                // Kliensoldali hiba esetĂ©n
                uiAlert(t('log_content_process_error_prefix') + e.message);
                console.error("NaplĂł olvasĂˇsi hiba (kliens):", e);
            } finally {
                // Biztosan elrejtjĂĽk a tĂ¶ltĹ‘kĂ©pernyĹ‘t
                document.getElementById('loading-overlay').style.display = 'none';
            }
        },
        function (err) {
            // SzerverhĂ­vĂˇs hiba esetĂ©n
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('log_content_fetch_error_prefix') + err.message);
            console.error("NaplĂł olvasĂˇsi hiba (szerver hĂ­vĂˇs):", err);
        }
    );
}

// 2. MĂSOLAT OLVASĂ“ (A TE LOGIKĂDDAL!)
function openReaderFor(copyCode) {
    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('getAllChapterContents', [copyCode],
        function (result) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (!result || !result.chapters || result.chapters.length === 0) {
                uiAlert(t('copy_chapters_load_error'));
                return;
            }

            var fullHtmlContent = '';

            try {
                // 1. Fejezetek Ă¶sszefĹ±zĂ©se
                result.chapters.forEach(function (chapterHtml) {
                    var bodyMatch = chapterHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                    if (bodyMatch && bodyMatch[1]) {
                        fullHtmlContent += bodyMatch[1];
                    } else {
                        fullHtmlContent += chapterHtml;
                    }
                });

                // 2. KĂ©pek cserĂ©je
                var coverFoundInText = false;

                if (result.embeddedImages && Object.keys(result.embeddedImages).length > 0) {
                    var imgTagRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;

                    fullHtmlContent = fullHtmlContent.replace(imgTagRegex, function (match, srcValue) {
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

                            // BorĂ­tĂł ellenĹ‘rzĂ©s
                            if (foundKey.toLowerCase().indexOf('cover') !== -1 ||
                                (result.coverBase64 && newDataUri.indexOf(result.coverBase64.substring(0, 50)) !== -1)) {
                                coverFoundInText = true;
                            }

                            return match.replace(srcValue, newDataUri);
                        }

                        return match;
                    });
                }

                // 3. BorĂ­tĂł beszĂşrĂˇsa (ha nem volt a szĂ¶vegben)
                if (result.coverBase64 && !coverFoundInText) {
                    var srcData = result.coverBase64.indexOf('data:') === 0
                        ? result.coverBase64
                        : 'data:image/png;base64,' + result.coverBase64;

                    // Backtick mentes HTML
                    fullHtmlContent = '<div style="text-align:center; margin-bottom:40px;">' +
                        '<img src="' + srcData + '" alt="' + t('cover_image_alt') + '" style="max-width:90%; height:auto; box-shadow: 0 4px 8px rgba(0,0,0,0.5);">' +
                        '</div>' + fullHtmlContent;
                }

                displayInReader(fullHtmlContent);

            } catch (e) {
                uiAlert(t('content_process_error_prefix') + e.message);
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_prefix') + err.message);
        }
    );
}

// 3. TEKERCS OLVASĂ“ (Ugyanazzal a logikĂˇval)
function openReaderForScroll(tekercsToken) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // callBackend hĂ­vĂˇs
    callBackend('getContentForReading', [tekercsToken, 'tekercs'],
        function (fileData) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (!fileData || !fileData.content) {
                uiAlert(t('scroll_empty'));
                return;
            }

            var contentToShow = '';

            // Tartalom kinyerĂ©se
            var bodyMatch = fileData.content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            var bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : fileData.content;

            // KĂ©pcsere logika
            if (fileData.embeddedImages) {
                for (var imgName in fileData.embeddedImages) {
                    var imgData = fileData.embeddedImages[imgName];
                    // String replace
                    bodyContent = bodyContent.split('Images/' + imgName).join(imgData);
                    bodyContent = bodyContent.split('"' + imgName + '"').join('"' + imgData + '"');
                }
            }

            // BorĂ­tĂł beszĂşrĂˇsa
            if (fileData.coverBase64) {
                var srcData = fileData.coverBase64.indexOf('data:') === 0
                    ? fileData.coverBase64
                    : 'data:image/png;base64,' + fileData.coverBase64;

                contentToShow += '<div style="text-align:center; margin-bottom:20px;"><img src="' + srcData + '" style="max-width:80%;"></div>';
            }

            contentToShow += bodyContent;
            displayInReader(contentToShow);
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('error_prefix') + err.message);
        }
    );
}

// =====================================
// === TEKERCSMESTER FUNKCIĂ“K (ROUTERESĂŤTVE) ===
// =====================================

function initializeTekercsmesterPage(preloadedData) {
    var loader = document.getElementById('sajat-tekercs-lista-loader');
    var sajatListaDiv = document.getElementById('sajat-tekercs-lista');
    var eladoLista = document.getElementById('elado-tekercs-lista');

    loader.style.display = 'block';

    // callBackend hĂ­vĂˇs (paramĂ©ter nĂ©lkĂĽli lekĂ©rdezĂ©s)
    callBackend('getTekercsmesterData', [],
        function (data) {
            loader.style.display = 'none';

            if (data.error) {
                // String Ă¶sszefĹ±zĂ©s
                sajatListaDiv.innerHTML = '<p style="color:red;">' + t('error_prefix') + data.error + '</p>';
                return;
            }

            document.getElementById('hartya-count').textContent = data.hartya;
            setupTekercsButtons(data.hartya);

            eladoLista.innerHTML = '<option value="">' + t('select_scroll_option') + '</option>';
            if (data.eladoTekercs && data.eladoTekercs.length > 0) {
                data.eladoTekercs.forEach(function (item) {
                    var option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.title + ' - ' + item.fejezet;
                    eladoLista.appendChild(option);
                });
            }

            renderMyScrollList(data.myTekercs, sajatListaDiv);
        },
        function (err) {
            loader.style.display = 'none';
            sajatListaDiv.innerHTML = '<p style="color:red;">' + t('server_error_prefix') + err.message + '</p>';
        }
    );

    var buyBtn = document.getElementById('buy-tekercs-btn');
    var newBuyBtn = buyBtn.cloneNode(true);
    buyBtn.parentNode.replaceChild(newBuyBtn, buyBtn);

    newBuyBtn.onclick = function () {
        var selectedId = eladoLista.value;
        if (!selectedId) {
            uiAlert(t('select_scroll_alert'), t('missing_data_title'));
            return;
        }

        document.getElementById('loading-overlay').style.display = 'flex';

        callBackend('buyTekercs', [selectedId],
            function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(res.message || res.error, res.success ? t('success_title') : t('notice_title'));
                if (res.success) {
                    updateCreditDisplay();
                    initializeTekercsmesterPage();
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('scroll_buy_error_prefix') + err.message);
            }
        );
    };
}

function setupTekercsButtons(currentHartya) {
    var hartyaCountSpan = document.getElementById('hartya-count');
    // .closest() helyett biztonsĂˇgosabb parentNode bejĂˇrĂˇst is hasznĂˇlhatnĂˇnk, de a modern bĂ¶ngĂ©szĹ‘k ismerik
    var hartyaContainer = hartyaCountSpan ? hartyaCountSpan.parentNode : null;
    // KeresĂĽnk felfelĂ©, ha nem kĂ¶zvetlen szĂĽlĹ‘
    while (hartyaContainer && !hartyaContainer.classList.contains('stat-box')) {
        hartyaContainer = hartyaContainer.parentNode;
    }

    if (hartyaContainer) {
        // 1. TEKERCSPRĂ‰S GOMB
        if (!document.getElementById('press-scroll-btn')) {
            var pressButton = document.createElement('button');
            pressButton.id = 'press-scroll-btn';
            pressButton.className = 'btn';
            pressButton.textContent = t('scroll_press_button');
            pressButton.style.marginTop = '15px';
            pressButton.style.width = '100%';

            pressButton.onclick = function () {
                uiConfirm(
                    t('scroll_press_confirm_html'),
                    t('scroll_press_title'),
                    function () {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('pressNewScroll', [],
                            function (response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? t('success_title') : t('error_title'));
                                if (response.success) {
                                    updateCreditDisplay();
                                    initializeTekercsmesterPage();
                                }
                            },
                            function (err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(t('critical_error_prefix') + err.message);
                            }
                        );
                    }
                );
            };
            hartyaContainer.appendChild(pressButton);
        }

        // 2. HĂRTYA ELADĂS GOMB
        if (!document.getElementById('sell-hartya-btn')) {
            var sellButton = document.createElement('button');
            sellButton.id = 'sell-hartya-btn';
            sellButton.className = 'btn';
            sellButton.style.marginTop = '10px';
            sellButton.style.backgroundColor = '#d35400';
            sellButton.style.width = '100%';
            sellButton.textContent = t('hartya_sell_button');

            sellButton.onclick = function () {
                uiConfirm(
                    t('hartya_exchange_confirm_html'),
                    t('hartya_exchange_title'),
                    function () {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('exchangeHartyaForCredit', [],
                            function (response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? t('success_title') : t('error_title'));
                                if (response.success) {
                                    updateCreditDisplay();
                                    if (response.newHartya !== undefined) {
                                        document.getElementById('hartya-count').textContent = response.newHartya;
                                    } else {
                                        initializeTekercsmesterPage();
                                    }
                                }
                            },
                            function (err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(t('critical_error_prefix') + err.message);
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
        myTekercs.forEach(function (szett) {
            var szettDiv = document.createElement('div');
            szettDiv.className = 'item-entry';

            var reszletekDiv = document.createElement('div');
            reszletekDiv.className = 'item-details';
            // String Ă¶sszefĹ±zĂ©s
            reszletekDiv.innerHTML = '<div class="item-title">' + szett.title + ' (' + szett.tekercsek.length + ' db)</div>' +
                '<div class="item-author">' + szett.author + '</div>';

            var gombokDiv = document.createElement('div');

            // --- A. Ă–sszefĹ±zĂ©s gomb ---
            if (szett.tekercsek.length >= 48) {
                var assembleButton = document.createElement('button');
                assembleButton.className = 'btn';
                assembleButton.textContent = t('scroll_assemble_button');
                assembleButton.onclick = function () {
                    uiConfirm(t('scroll_assemble_confirm_prefix') + szett.title + t('scroll_assemble_confirm_suffix'), t('scroll_assemble_title'), function () {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('assembleScrolls', [szett.code],
                            function (response) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(response.message || response.error, response.success ? t('success_title') : t('error_title'));
                                initializeTekercsmesterPage();
                            },
                            function (err) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(err.message);
                            }
                        );
                    });
                };
                gombokDiv.appendChild(assembleButton);
            }

            // --- B. Egyedi tekercsek eladĂˇsa ---
            szett.tekercsek.forEach(function (tekercs) {
                var sellButton = document.createElement('button');
                sellButton.className = 'btn';
                sellButton.textContent = tekercs.fejezet + ' ' + t('scroll_sell_suffix');
                sellButton.style.fontSize = '0.8em';
                sellButton.style.margin = '2px';

                sellButton.onclick = function () {
                    uiConfirm(t('scroll_sell_confirm_prefix') + tekercs.fejezet + t('scroll_sell_confirm_suffix'), t('scroll_sell_title'), function () {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('sellTekercs', [tekercs.token],
                            function (res) {
                                document.getElementById('loading-overlay').style.display = 'none';
                                uiAlert(res.message || res.error, res.success ? t('success_title') : t('error_title'));
                                if (res.success) {
                                    updateCreditDisplay();
                                    initializeTekercsmesterPage();
                                }
                            },
                            function (err) {
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
        container.innerHTML = '<p>' + t('no_scrolls_yet') + '</p>';
    }
}

// =====================================
// === MĂSOLATOK OLDAL INICIALIZĂLĂ“ ===
// =====================================

/**
 * InicializĂˇlja a MĂˇsolatok oldalt.
 * JAVĂŤTVA: callBackend hĂ­vĂˇsokbĂłl kivĂ©ve a currentUserEmail.
 */
function initializeMasolatokAndCopyMapPage(data) {
    var myCopiesLoader = document.getElementById('sajat-masolat-lista-loader');
    var myCopiesContainer = document.getElementById('sajat-masolat-lista-content');
    var forSaleCopiesSelect = document.getElementById('elado-masolat-lista');
    var buyCopySection = document.getElementById('buy-copy-section');
    var buyCopyDetailsDiv = document.getElementById('buy-copy-selection-details');
    var buyCopyBtn = document.getElementById('buy-copy-btn');
    var buyCopyPinInput = document.getElementById('buy-copy-pin-code');

    // Ăšj elemek a tĂ©rkĂ©pmĂˇsolĂˇshoz
    var availableMapsLoader = document.getElementById('available-maps-list-loader');
    var availableMapsContainer = document.getElementById('available-maps-list-content');
    var copyMapPinInput = document.getElementById('copy-map-pin');
    var copyMapPinLabel = copyMapPinInput ? copyMapPinInput.previousElementSibling : null;

    if (!myCopiesLoader || !myCopiesContainer || !forSaleCopiesSelect || !buyCopySection || !buyCopyDetailsDiv || !buyCopyBtn || !buyCopyPinInput || !availableMapsLoader || !availableMapsContainer || !copyMapPinInput || !copyMapPinLabel) {
        console.error("Hiba: A MĂˇsolatok oldal szĂĽksĂ©ges HTML elemei hiĂˇnyosak! EllenĹ‘rizd az ID-kat.");
        return;
    }

    myCopiesLoader.style.display = 'none';
    availableMapsLoader.style.display = 'none';

    if (data.error) {
        myCopiesContainer.innerHTML = '<p style="color:red;">' + t('error_prefix') + data.error + '</p>';
        availableMapsContainer.innerHTML = '<p style="color:red;">' + t('error_prefix') + data.error + '</p>';
        return;
    }

    // --- SajĂˇt mĂˇsolatok listĂˇzĂˇsa ---
    myCopiesContainer.innerHTML = '';
    if (data.myCopies && data.myCopies.length > 0) {
        data.myCopies.forEach(function (copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            entryDiv.innerHTML = '<div class="item-details"><div class="item-title">' + copy.title + '</div><div class="item-author">' + copy.author + '</div></div>';
            var gombokDiv = document.createElement('div');
            if (!copy.inPlay) {
                // JĂˇtĂ©kba viszem gomb
                var playBtn = document.createElement('button');
                playBtn.className = 'btn';
                playBtn.textContent = t('copy_play_button');
                playBtn.onclick = function() {
    var gmBtn = document.getElementById('floating-gamemaster-btn');
    if (gmBtn) gmBtn.click();
    
    setTimeout(function() {
        var chatArea = document.getElementById('universal-chat-area');
        chatArea.innerHTML = '';
        var loaderId = "loader-" + Date.now();
        var loader = document.createElement('div');
        loader.id = loaderId;
        loader.innerHTML = '<i class="fas fa-chess-knight fa-spin" style="color:#fff; margin-right:8px;"></i> <i>A JĂˇtĂ©kmester felkĂ©szĂĽl...</i>';
        chatArea.appendChild(loader);
        
        callBackend('handleNPCInteraction', ['gamemaster', '', 'START_GM_SESSION', copy.code], 
            function(response) {
                var l = document.getElementById(loaderId);
                if (l) l.remove();
                handleUniversalResponse(response);
            },
            function(err) {
                var l = document.getElementById(loaderId);
                if (l) l.remove();
                addBubbleToUniversal("System", "Hiba: " + err.message, "system");
            }
        );
    }, 500);
};
                gombokDiv.appendChild(playBtn);

                // Eladom gomb
                var sellBtn = document.createElement('button');
                sellBtn.className = 'btn';
                sellBtn.textContent = t('copy_sell_button');
                sellBtn.style.backgroundColor = '#c82333';

                sellBtn.onclick = function () {
                    var confirmMsg = t('copy_sell_confirm_prefix') + copy.title + t('copy_sell_confirm_suffix');

                    if (typeof uiConfirm === 'function') {
                        uiConfirm(
                            confirmMsg,
                            t('copy_sell_title'),
                            function () {
                                document.getElementById('loading-overlay').style.display = 'flex';

                                // --- JAVĂŤTĂS: callBackend ---
                                // currentUserEmail KIVĂ‰VE!
                                callBackend('sellCopy', [copy.code],
                                    function (res) {
                                        document.getElementById('loading-overlay').style.display = 'none';
                                        if (typeof uiAlert === 'function') uiAlert(res.message || res.error, res.success ? t('success_title') : t('notice_title'));

                                        if (res.success) {
                                            updateCreditDisplay();
                                            loadPage('masolatok_oldal');
                                        }
                                    },
                                    function (err) {
                                        document.getElementById('loading-overlay').style.display = 'none';
                                        if (typeof uiAlert === 'function') uiAlert(t('error_happened_prefix') + err.message, t('system_error_title'));
                                    }
                                );
                            }
                        );
                    }
                };
                gombokDiv.appendChild(sellBtn);

            } else {
                var inPlayLabel = document.createElement('span');
                inPlayLabel.textContent = t('copy_in_play_label');
                inPlayLabel.style.fontWeight = 'bold';
                gombokDiv.appendChild(inPlayLabel);
            }

            entryDiv.appendChild(gombokDiv);
            myCopiesContainer.appendChild(entryDiv);
        });
    } else {
        myCopiesContainer.innerHTML = '<p>' + t('no_copies_yet') + '</p>';
    }

    // --- EladĂł mĂˇsolatok listĂˇzĂˇsa ---
    forSaleCopiesSelect.innerHTML = '<option value="">' + t('select_copy_option') + '</option>';
    if (data.forSale && data.forSale.length > 0) {
        data.forSale.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.rowIndex;
            // JSON stringify, hogy adatot tĂˇroljunk
            option.setAttribute('data-item-data', JSON.stringify(item));
            option.textContent = item.title + ' (' + item.author + ')';
            forSaleCopiesSelect.appendChild(option);
        });
    }

    forSaleCopiesSelect.onchange = function () {
        buyCopyDetailsDiv.innerHTML = '';
        if (this.value) {
            var selectedOption = this.options[this.selectedIndex];
            var selectedData = JSON.parse(selectedOption.getAttribute('data-item-data'));
            var cost = (selectedData.seller.toLowerCase() === currentUserEmail.toLowerCase()) ? 11 : 110;
            // String Ă¶sszefĹ±zĂ©s
            buyCopyDetailsDiv.innerHTML = '<p><strong>' + t('copy_price_label') + '</strong> ' + cost + ' ' + t('credit_label') + '</p><p><small>' + t('copy_seller_label') + ': ' + selectedData.seller + '</small></p>';
            buyCopySection.style.display = 'block';
        } else {
            buyCopySection.style.display = 'none';
        }
    };
    buyCopySection.style.display = 'none';

    buyCopyBtn.onclick = function () {
        var selectedRowIndex = forSaleCopiesSelect.value;
        if (!selectedRowIndex) {
            if (typeof uiAlert === 'function') uiAlert(t('select_copy_alert'));
            return;
        }
        var pinCode = buyCopyPinInput.value;
        if (!pinCode) {
            if (typeof uiAlert === 'function') uiAlert(t('pin_required_buy_copy'));
            return;
        }
        document.getElementById('loading-overlay').style.display = 'flex';

        // --- JAVĂŤTĂS: callBackend ---
        // currentUserEmail KIVĂ‰VE!
        callBackend('buyCopy', [selectedRowIndex, pinCode],
            function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (typeof uiAlert === 'function') uiAlert(res.message || res.error);
                buyCopyPinInput.value = '';
                if (res.success) {
                    updateCreditDisplay();
                    loadPage('masolatok_oldal');
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (typeof uiAlert === 'function') uiAlert(t('error_prefix') + err.message);
            }
        );
    };

    // --- MĂˇsolhatĂł tĂ©rkĂ©pek listĂˇzĂˇsa ---
    availableMapsContainer.innerHTML = '';

    if (data.availableMaps && data.availableMaps.length > 0) {
        console.log("ElĂ©rhetĹ‘ tĂ©rkĂ©pek talĂˇlva.");

        // CsoportosĂ­tĂˇs (manuĂˇlis loop)
        var mapGroups = {};
        data.availableMaps.forEach(function (map) {
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

        // Object.values manuĂˇlis emulĂˇlĂˇsa (vagy hasznĂˇlata, ha tĂˇmogatott) Ă©s rendezĂ©s
        var groupsArray = [];
        for (var key in mapGroups) {
            if (mapGroups.hasOwnProperty(key)) {
                groupsArray.push(mapGroups[key]);
            }
        }
        groupsArray.sort(function (a, b) { return a.name.localeCompare(b.name); });

        groupsArray.forEach(function (group) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry map-entry';
            // FeltĂ©telezzĂĽk, hogy MAP_COPY_COST definiĂˇlva van globĂˇlisan
            var cost = (typeof MAP_COPY_COST !== 'undefined') ? MAP_COPY_COST : 10;

            entryDiv.innerHTML =
                '<div class="map-details item-details">' +
                '<div class="map-name item-title">' + group.name + ' (' + group.count + ' db)</div>' +
                '<small class="item-author">MĂˇsolĂˇs Ăˇra: ' + cost + ' kredit</small>' +
                '</div>' +
                '<div class="map-actions">' +
                '<button class="btn">MĂˇsolĂˇs</button>' +
                '</div>';

            entryDiv.querySelector('.map-actions button').onclick = function () {
                if (typeof initiateMapCopy === 'function') initiateMapCopy(group.firstRowIndex, group.name);
            };
            availableMapsContainer.appendChild(entryDiv);
        });

        if (copyMapPinInput) copyMapPinInput.style.display = 'block';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'block';

    } else {
        availableMapsContainer.innerHTML = "<p>Jelenleg nincsenek mĂˇsolhatĂł tĂ©rkĂ©pek.</p>";
        if (copyMapPinInput) copyMapPinInput.style.display = 'none';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'none';
    }

    // --- HajĂłnaplĂł KivonatolĂˇs ListĂˇzĂˇsa ---
    var logExtractSelect = document.getElementById('log-extract-select');
    if (logExtractSelect) {
        logExtractSelect.innerHTML = '<option value="">VĂˇlassz hajĂłnaplĂłt...</option>';
        if (data.logs && data.logs.length > 0) {
            data.logs.forEach(function (log) {
                var option = document.createElement('option');
                option.value = log.id;
                option.textContent = log.name;
                logExtractSelect.appendChild(option);
            });
        }
    }

    // --- PapĂˇt FunkciĂłk MegjelenĂ­tĂ©se ---
    var papatUploadSection = document.getElementById('papat-log-upload-section');
    if (papatUploadSection) {
        if (data.isPapat === true) {
            papatUploadSection.style.display = 'block';
        } else {
            papatUploadSection.style.display = 'none';
        }
    }
}

/**
 * BetĂ¶lti a kivĂˇlasztott hajĂłnaplĂłt kivonatolĂˇs cĂ©ljĂˇbĂłl
 */
function loadLogForExtraction() {
    var select = document.getElementById('log-extract-select');
    var modalDiv = document.getElementById('log-extract-modal');
    var entriesDiv = document.getElementById('log-extract-entries');
    var loader = document.getElementById('log-extract-loader');
    var costSpan = document.getElementById('log-extract-total-cost');
    var logId = select.value;

    if (!logId) {
        if(modalDiv) modalDiv.style.display = 'none';
        return;
    }

    if(modalDiv) modalDiv.style.display = 'none';
    loader.style.display = 'block';

    callBackend('getLogContentForReading', [logId],
        function(res) {
            loader.style.display = 'none';
            if (res.error) {
                if (typeof uiAlert === 'function') uiAlert(res.error);
                select.value = '';
                return;
            }

            entriesDiv.innerHTML = '';
            costSpan.textContent = '0';
            
            var processedHtml = res.htmlContent;
            if (res.imageData) {
                var imgRegex = /\[IMAGE:([^:]+):([^\]]+)\]/g;
                var imgMatch;
                while ((imgMatch = imgRegex.exec(processedHtml)) !== null) {
                    var imgId = imgMatch[1];
                    var imgName = imgMatch[2];
                    var base64 = res.imageData[imgId];
                    if (base64) {
                        var imgTag = '<img src="' + base64 + '" alt="' + imgName + '" style="max-width:100%; height:auto;" />';
                        processedHtml = processedHtml.replace(imgMatch[0], imgTag);
                    }
                }
            }

            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = processedHtml;
            
            var entries = tempDiv.querySelectorAll('.log-entry');
            if (entries.length === 0) {
                entriesDiv.innerHTML = '<p>A naplĂł ĂĽres.</p>';
            } else {
                entries.forEach(function(entry) {
                    var entryId = entry.getAttribute('data-entry-id');
                    var dateAttr = entry.getAttribute('data-date');
                    var entryTitle = 'BejegyzĂ©s: ' + (dateAttr || 'Ismeretlen dĂˇtum');

                    var wrapper = document.createElement('div');
                    wrapper.style.marginBottom = '10px';
                    wrapper.style.padding = '10px';
                    wrapper.style.border = '1px solid #eee';
                    wrapper.style.borderRadius = '5px';
                    wrapper.style.display = 'flex';
                    wrapper.style.alignItems = 'flex-start';

                    var checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.value = entryId;
                    checkbox.className = 'log-extract-checkbox';
                    checkbox.style.marginRight = '15px';
                    checkbox.style.marginTop = '5px';
                    checkbox.style.transform = 'scale(1.5)';
                    
                    checkbox.onchange = function() {
                        var checked = document.querySelectorAll('.log-extract-checkbox:checked').length;
                        costSpan.textContent = (checked * 10).toString();
                        var btn = document.getElementById('log-extract-btn');
                        if (btn) btn.textContent = 'KivonatolĂˇs (' + (checked * 10) + ' Kredit)';
                    };

                    var textContainer = document.createElement('div');
                    textContainer.style.flex = "1";
                    
                    var headerDiv = document.createElement('div');
                    headerDiv.style.cursor = 'pointer';
                    headerDiv.style.display = 'flex';
                    headerDiv.style.justifyContent = 'space-between';
                    headerDiv.innerHTML = '<strong>' + entryTitle + '</strong><small style="color: #666; font-weight: bold;">â–Ľ OlvasĂˇs</small>';
                    
                    var contentDiv = document.createElement('div');
                    contentDiv.style.display = 'none';
                    contentDiv.style.marginTop = '10px';
                    contentDiv.style.paddingTop = '10px';
                    contentDiv.style.borderTop = '1px dashed #ccc';
                    contentDiv.style.fontFamily = 'var(--font-serif)';
                    contentDiv.style.fontSize = '1.1em';
                    contentDiv.style.lineHeight = '1.6';
                    contentDiv.innerHTML = entry.innerHTML;
                    
                    headerDiv.onclick = function() {
                        var isHidden = contentDiv.style.display === 'none';
                        contentDiv.style.display = isHidden ? 'block' : 'none';
                        headerDiv.querySelector('small').innerHTML = isHidden ? 'â–˛ BezĂˇrĂˇs' : 'â–Ľ OlvasĂˇs';
                    };
                    
                    textContainer.appendChild(headerDiv);
                    textContainer.appendChild(contentDiv);

                    wrapper.appendChild(checkbox);
                    wrapper.appendChild(textContainer);
                    entriesDiv.appendChild(wrapper);
                });
            }
            if(modalDiv) modalDiv.style.display = 'flex';
        },
        function(err) {
            loader.style.display = 'none';
            if (typeof uiAlert === 'function') uiAlert("Hiba tĂ¶rtĂ©nt a naplĂł betĂ¶ltĂ©sekor: " + err.message);
            select.value = '';
        }
    );
}

/**
 * PapĂˇt feltĂ¶lti a GDoc naplĂłmĂˇsolatot.
 */
function submitPapatLogUpload() {
    var gdocUrl = document.getElementById('papat-log-gdoc').value.trim();
    var copyName = document.getElementById('papat-log-name').value.trim();

    if (!gdocUrl || !copyName) {
        if (typeof uiAlert === 'function') uiAlert("Minden mezĹ‘ kitĂ¶ltĂ©se kĂ¶telezĹ‘!", "Hiba");
        return;
    }

    var urlMatch = gdocUrl.match(/[-\w]{25,}/);
    if (!urlMatch) {
        if (typeof uiAlert === 'function') uiAlert("KĂ©rlek adj meg egy Ă©rvĂ©nyes Google Docs linket!", "Hiba");
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('uploadPapatLogCopy', [gdocUrl, copyName],
        function(res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') {
                uiAlert(res.message || res.error, res.success ? "Siker" : "Hiba");
            }
            if (res.success) {
                document.getElementById('papat-log-gdoc').value = '';
                document.getElementById('papat-log-name').value = '';
                loadPage('masolatok_oldal');
            }
        },
        function(err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') {
                uiAlert("Szerverhiba tĂ¶rtĂ©nt: " + err.message, "Hiba");
            }
        }
    );
}

/**
 * VĂ©grehajtja a kivĂˇlasztott bejegyzĂ©sek kivonatolĂˇsĂˇt Ă©s a kifizetĂ©st
 */
function executeLogExtraction() {
    var select = document.getElementById('log-extract-select');
    var checkboxes = document.querySelectorAll('.log-extract-checkbox:checked');
    
    var logId = select.value;
    
    if (!logId) {
        if (typeof uiAlert === 'function') uiAlert("VĂˇlassz ki egy hajĂłnaplĂłt!");
        return;
    }
    if (checkboxes.length === 0) {
        if (typeof uiAlert === 'function') uiAlert("LegalĂˇbb egy bejegyzĂ©st ki kell vĂˇlasztanod!");
        return;
    }

    var selectedIds = [];
    for (var i = 0; i < checkboxes.length; i++) {
        selectedIds.push(checkboxes[i].value);
    }
    
    var totalCost = selectedIds.length * 10;
    var customMessage = "A mĹ±velet dĂ­ja " + totalCost + " KalĂłzkredit.<br>KĂ©rlek, add meg a PIN kĂłdodat a folytatĂˇshoz!";

    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            document.getElementById('loading-overlay').style.display = 'flex';
            
            callBackend('extractLogEntriesToCopy', [logId, selectedIds, pinCode],
                function(res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (res.error) {
                        if (typeof uiAlert === 'function') uiAlert(res.error, "Hiba");
                    } else {
                        if (typeof uiAlert === 'function') uiAlert(res.message, "Sikeres kivonatolĂˇs");
                        select.value = '';
                        var modalDiv = document.getElementById('log-extract-modal');
                        if(modalDiv) modalDiv.style.display = 'none';
                        updateCreditDisplay();
                        loadPage('masolatok_oldal');
                    }
                },
                function(err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (typeof uiAlert === 'function') uiAlert("Rendszerhiba tĂ¶rtĂ©nt: " + err.message, "Hiba");
                }
            );
        }, customMessage);
    } else {
        if (typeof uiAlert === 'function') uiAlert("A PIN bekĂ©rĹ‘ modul nem elĂ©rhetĹ‘!");
    }
}

/**
 * ElindĂ­tja a kliensoldali letĂ¶ltĂ©si Ă©s vĂ­zjelezĂ©si folyamatot.
 * @param {string} contentId A kĂ¶nyv forrĂˇsĂˇnak azonosĂ­tĂłja (Mappa ID az O oszlopbĂłl).
 */
async function startClientSideDownloadProcess(contentId, bookTitle) {
    var statusOverlay = document.getElementById('loading-overlay');
    var allDownloadButtons = Array.prototype.slice.call(document.querySelectorAll('.download-btn'));

    if (statusOverlay) statusOverlay.style.display = 'flex';
    allDownloadButtons.forEach(function (btn) { btn.disabled = true; });

    try {
        console.log("LetĂ¶ltĂ©s indĂ­tĂˇsa. ID:", contentId, "CĂ­m:", bookTitle);

        if (!contentId) throw new Error("HiĂˇnyzĂł kĂ¶nyv azonosĂ­tĂł!");

        // 1. ADATOK LEKĂ‰RĂ‰SE A SZERVERRĹL
        // Ătadjuk a cĂ­met is mĂˇsodik paramĂ©terkĂ©nt!
        var data = await new Promise(function (resolve, reject) {
            callBackend('getRawFilesForDownload', [contentId, bookTitle],
                function (res) { resolve(res); },
                function (err) { reject(err); }
            );
        });

        if (data.error) throw new Error(data.error);
        if (!data.epubBase64 || !data.coverBase64) throw new Error("HiĂˇnyos adat Ă©rkezett a szervertĹ‘l.");

        // 2. ADATOK VISSZAALAKĂŤTĂSA (Base64 -> Blob)
        // String Ă¶sszefĹ±zĂ©s backtick helyett
        var epubRes = await fetch('data:application/epub+zip;base64,' + data.epubBase64);
        var epubBlob = await epubRes.blob();

        var coverRes = await fetch('data:image/png;base64,' + data.coverBase64);
        var coverBlob = await coverRes.blob();

        // 3. VĂŤZJELEZĂ‰S (KĂ‰P)
        // A data.bookCode a felhasznĂˇlĂł egyedi kĂłdja, amit a szerver kĂĽld vissza
        var finalImageBlob = coverBlob;
        if (typeof embedIdInImage === 'function') {
            var watermarkedCoverBase64 = await embedIdInImage(coverBlob, data.bookCode);
            var finalImageRes = await fetch(watermarkedCoverBase64);
            finalImageBlob = await finalImageRes.blob();
        } else {
            console.warn("embedIdInImage hiĂˇnyzik, a borĂ­tĂł vĂ­zjelezĂ©se kimaradt.");
        }

        // 4. EPUB CSOMAGOLĂS Ă‰S VĂŤZJELEZĂ‰S (SZĂ–VEG)
        // Ez a fĂĽggvĂ©ny (processEpubFile) vĂ©gzi a szĂ¶veges vĂ­zjelezĂ©st Ă©s az Ăşj borĂ­tĂł beillesztĂ©sĂ©t
        var finalEpubBlob = await processEpubFile(epubBlob, finalImageBlob, data.bookCode, data.coverFilename);

        // 5. LETĂ–LTĂ‰S INDĂŤTĂSA A BĂ–NGĂ‰SZĹBEN
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(finalEpubBlob);
        downloadAnchor.download = data.epubFilename || 'konyv.epub';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);

        // MemĂłria felszabadĂ­tĂˇsa
        setTimeout(function () { URL.revokeObjectURL(downloadAnchor.href); }, 1000);

        if (typeof uiAlert === 'function') uiAlert(t('download_success'));

    } catch (error) {
        console.error("LetĂ¶ltĂ©si hiba:", error);
        var msg = error.message || error;
        if (typeof uiAlert === "function") {
            uiAlert(t('download_error_prefix') + msg);
        } else {
            alert(t('download_error_prefix') + msg);
        }
    } finally {
        if (statusOverlay) statusOverlay.style.display = 'none';
        allDownloadButtons.forEach(function (btn) { btn.disabled = false; });
    }
}


/**
 * Feldolgozza az ePub fĂˇjlt Ă©s QR KĂ“DOT is beszĂşr a link mellĂ©.
 * JAVĂŤTOTT MARKETINGES VERZIĂ“.
 * @param {Blob} epubBlob Az eredeti ePub.
 * @param {Blob} newCoverBlob Az Ăşj, vĂ­zjeles borĂ­tĂł (PNG).
 * @param {string} bookCode Az Ăşj, beillesztendĹ‘ kĂłd.
 * @param {string} newCoverFilename Az Ăşj borĂ­tĂł kĂ­vĂˇnt fĂˇjlneve (pl. "kep.png").
 * @returns {Promise<Blob>} A kĂ©sz, vĂ©gleges ePub fĂˇjl.
 */
async function processEpubFile(epubBlob, newCoverBlob, bookCode, newCoverFilename) {
    var zip = new JSZip();
    var loadedZip = await zip.loadAsync(epubBlob);

    var zeroWidthId = (typeof encodeIdToZeroWidth === 'function') ? encodeIdToZeroWidth(bookCode) : bookCode;

    // FĂˇjlok szĹ±rĂ©se (ES5)
    var allFiles = Object.keys(loadedZip.files);
    var xhtmlFiles = allFiles.filter(function (name) {
        return name.indexOf('.xhtml') !== -1 || name.indexOf('.html') !== -1;
    });

    // === MARKETING LINK Ă‰S QR KĂ“D ===
    var appUrl = "https://script.google.com/macros/s/AKfycbzZZV2QQ4fOExg_dv0ddkWVEFgNTCXzYtFhWlOs1Kn5R3wUCHDXV7IpE3Kx3DNT53Npbw/exec";
    var feedbackLink = appUrl + "?page=marketing&bookId=" + bookCode;
    var qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(feedbackLink);

    // HTML Blokk (String Ă¶sszefĹ±zĂ©s backtick helyett!)
    var feedbackHtmlBlock = "";
    feedbackHtmlBlock += '<div style="margin-top: 50px; padding: 20px; border-top: 2px solid #ccc; text-align: center; font-family: sans-serif; page-break-before: always;">';
    feedbackHtmlBlock += '<hr/>';
    feedbackHtmlBlock += '<h3>â ď¸Ź Tetszett a zsĂˇkmĂˇny? â ď¸Ź</h3>';
    feedbackHtmlBlock += '<p>Oszd meg vĂ©lemĂ©nyedet a szerzĹ‘vel Ă©s a kĂ©szĂ­tĹ‘kkel!</p>';
    feedbackHtmlBlock += '<p>Minden vĂˇlaszodĂ©rt <strong>KalĂłzkreditet</strong> kapsz jutalmul.</p>';

    feedbackHtmlBlock += '<div style="margin: 20px auto;">';
    feedbackHtmlBlock += '<img src="' + qrImageUrl + '" alt="Szkenneld be" style="width: 150px; height: 150px; border: 2px solid #333; padding: 5px;"/>';
    feedbackHtmlBlock += '<p><small>Szkenneld be a telefonoddal!</small></p>';
    feedbackHtmlBlock += '</div>';

    feedbackHtmlBlock += '<p>';
    feedbackHtmlBlock += '<a href="' + feedbackLink + '" target="_blank" style="background-color: #8b0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">';
    feedbackHtmlBlock += 'VĂ©lemĂ©ny Ă­rĂˇsa a bĂ¶ngĂ©szĹ‘ben';
    feedbackHtmlBlock += '</a>';
    feedbackHtmlBlock += '</p>';
    feedbackHtmlBlock += '<p><small>(Ha az olvasĂłd nem kezeli a bĂ¶ngĂ©szĹ‘t, hasznĂˇld a fenti kĂłdot)</small></p>';
    feedbackHtmlBlock += '</div>';

    var lastFile = xhtmlFiles[xhtmlFiles.length - 1];

    for (var i = 0; i < xhtmlFiles.length; i++) {
        var fileName = xhtmlFiles[i];
        var content = await loadedZip.file(fileName).async('string');

        // VĂ­zjel csere
        content = content.replace(/[\u200b-\u2d0d]/g, '');
        // RegExp objektum a vĂˇltozĂł miatt
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

    // === HIBRID BORĂŤTĂ“AZONOSĂŤTĂS Ă‰S CSERE ===
    var oldCoverFullPath = null;
    var opfFile = allFiles.find(function (name) { return name.indexOf('.opf') !== -1; });

    if (!opfFile) throw new Error("Hiba: A kĂ¶nyv tartalomjegyzĂ©ke (.opf fĂˇjl) nem talĂˇlhatĂł.");

    var opfContent = await loadedZip.file(opfFile).async('string');

    // 1. KĂŤSĂ‰RLET: cover.xhtml
    var coverXhtmlFile = allFiles.find(function (name) { return name.toLowerCase().indexOf('cover.xhtml') !== -1; });
    if (coverXhtmlFile) {
        var coverXhtmlContent = await loadedZip.file(coverXhtmlFile).async('string');
        var imgSrcRegex = /<img[^>]*src="([^"]+)"/;
        var match = coverXhtmlContent.match(imgSrcRegex);
        if (match && match[1]) {
            oldCoverFullPath = (typeof resolvePath === 'function') ? resolvePath(coverXhtmlFile, match[1]) : match[1];
        }
    }

    // 2. KĂŤSĂ‰RLET: Manifeszt
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
        // Regex escape nĂ©lkĂĽl veszĂ©lyes lehet, de feltĂ©telezzĂĽk a normĂˇl fĂˇjlnevet
        opfContent = opfContent.replace(new RegExp(oldCoverFilename, "g"), newCoverFilename);
        opfContent = opfContent.replace(/media-type="image\/jpeg"/g, 'media-type="image/png"');
        loadedZip.file(opfFile, opfContent);

        if (loadedZip.files[oldCoverFullPath]) {
            loadedZip.remove(oldCoverFullPath);
        }

        var pathPrefix = oldCoverFullPath.substring(0, oldCoverFullPath.lastIndexOf('/') + 1);
        loadedZip.file(pathPrefix + newCoverFilename, newCoverBlob);
    }

    return await loadedZip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
}

// ===================================
// === MARKETING (VĂ‰LEMĂ‰NY) MODUL ===
// ===================================

var currentMarketingBookId = null;
var currentMarketingFolderId = null;

// URL ParamĂ©terek ellenĹ‘rzĂ©se
function checkUrlParametersForMarketing() {
    try {
        // 1. SzabvĂˇnyos URL paramĂ©ter olvasĂˇs (BĂ¶ngĂ©szĹ‘ fĂĽggetlen)
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Keresett paramĂ©terek
        const bookId = urlParams.get('bookId');
        const folderId = urlParams.get('folderId');

        if (bookId) {
            console.log("Marketing paramĂ©ter talĂˇlat:", bookId);

            // GlobĂˇlis vĂˇltozĂłba mentjĂĽk a kĂ©sĹ‘bbi hasznĂˇlatra
            window.pendingMarketingData = {
                bookId: bookId,
                folderId: folderId
            };

            // --- EZT HOZTUK VISSZA A RĂ‰GIBĹL (UI Ăśzenet) ---
            var loginStatus = document.getElementById('login-status');
            var loginView = document.getElementById('login-view');

            // Ha a belĂ©pĹ‘ kĂ©pernyĹ‘n vagyunk, jelezzĂĽk a felhasznĂˇlĂłnak
            if (loginStatus && loginView && window.getComputedStyle(loginView).display !== 'none') {
                loginStatus.innerHTML = '<span style="color:#2e8b57; font-weight:bold;">â ď¸Ź A zsĂˇkmĂˇny Ă©rtĂ©kelĂ©sĂ©hez Ă©s a jutalom ĂˇtvĂ©telĂ©hez kĂ©rlek, lĂ©pj be!</span>';
            }
        }
    } catch (e) {
        console.error("Hiba az URL paramĂ©terek olvasĂˇsakor:", e);
    }
}

// BetĂ¶lti a kĂ©rdĹ‘Ă­vet
function loadMarketingView(bookId, folderId) {
    console.log(">>> loadMarketingView MEGHĂŤVVA: " + bookId);

    currentMarketingBookId = bookId;
    currentMarketingFolderId = folderId;

    // 1. NĂ‰ZETEK KEZELĂ‰SE
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'none';

    var marketingView = document.getElementById('marketing-view');
    if (marketingView) {
        marketingView.style.display = 'block';
    } else {
        console.error("KRITIKUS HIBA: Nem talĂˇlhatĂł a 'marketing-view' div!");
        return;
    }

    // 2. TĂ–LTĂ‰S JELZĹ
    var container = document.getElementById('marketing-questions-area');
    if (container) {
        container.innerHTML = '<div style="text-align:center; padding:50px; color:#555;">' +
            '<i class="fas fa-spinner fa-spin fa-3x"></i>' +
            '<p style="margin-top:15px;">KĂ©rdĂ©seink a kĂ¶nyvrĹ‘l...</p>' +
            '</div>';
    }

    // 3. SZERVER HĂŤVĂS (callBackend)
    callBackend('getFeedbackFormConfig', [bookId, folderId], // currentUserEmail-t a Router adja hozzĂˇ
        function (response) {
            console.log(">>> SZERVER VĂLASZ:", response);

            if (response.success) {
                renderMarketingQuestions(response.config, response.isOwner, bookId, folderId);
            }
            else if (response.error === "ALREADY_VOTED") {
                container.innerHTML = '';
                showSystemModal(
                    "MĂˇr szavaztĂˇl!",
                    response.message,
                    "fas fa-check-double",
                    [{
                        text: "Rendben, vissza a KikĂ¶tĹ‘be",
                        color: "#2e8b57",
                        textColor: "white",
                        callback: function () { returnToPort(); }
                    }]
                );
            }
            else {
                container.innerHTML = '';
                showSystemModal(
                    "Hiba tĂ¶rtĂ©nt",
                    response.error,
                    "fas fa-exclamation-triangle",
                    [{
                        text: "Vissza",
                        callback: function () { returnToPort(); }
                    }]
                );
            }
        },
        function (err) {
            console.error(">>> HĂLĂ“ZATI HIBA:", err);
            if (container) container.innerHTML = '';
            showSystemModal(
                "KapcsolĂłdĂˇsi Hiba",
                "Nem sikerĂĽlt elĂ©rni a szervert: " + err.message,
                "fas fa-wifi",
                [{ text: "Vissza", callback: function () { returnToPort(); } }]
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
        loadPage('kikoto_oldal');
    }
}

/**
 * Dinamikusan kirajzolja a kĂ©rdĂ©seket.
 * KĂ©tlĂ©pcsĹ‘s folyamat: EllenĹ‘rzĂ©s -> Ă‰rtĂ©kelĂ©s
 */
function renderMarketingQuestions(config, isOwner, bookId, folderId) {
    console.log(">>> RENDER START. Kapott kĂ©rdĂ©sek:", config.questions);

    var container = document.getElementById('marketing-questions-area');
    if (!container) return;
    container.innerHTML = '';

    // --- DOBOZOK ---
    var verifyDiv = document.createElement('div');
    verifyDiv.id = 'verify-section';
    verifyDiv.style.cssText = "background:#fff3e0; padding:20px; border-radius:8px; border:1px solid #ffcc80; margin-bottom:20px;";
    verifyDiv.innerHTML = '<h3 style="margin-top:0; color:#e65100;"><i class="fas fa-shield-alt"></i> 1. LĂ©pĂ©s: OlvasottsĂˇgi PrĂłba</h3>' +
        '<p style="margin-bottom:15px; font-style:italic;">VĂˇlaszolj helyesen, kĂĽlĂ¶nben a rendszer visszakĂĽld a kikĂ¶tĹ‘be!</p>';

    var marketingDiv = document.createElement('div');
    marketingDiv.id = 'marketing-section';
    marketingDiv.style.display = 'none';
    marketingDiv.innerHTML = '<h3 style="margin-top:20px; color:#2e8b57; border-top:1px dashed #ccc; padding-top:20px;"><i class="fas fa-star"></i> 2. LĂ©pĂ©s: Ă‰rtĂ©kelĂ©s</h3>';

    // --- KĂ‰RDĂ‰SEK GENERĂLĂSA ---
    var verifyCount = 0;

    // forEach + function
    config.questions.forEach(function (q) {
        var card = document.createElement('div');
        card.className = 'question-card';
        card.style.cssText = "margin-bottom: 15px; padding: 10px; background: white; border-radius: 5px; border: 1px solid #eee;";

        var inputHtml = '';

        if (q.type === 'rating') {
            inputHtml = '<div class="star-rating">';
            for (var i = 5; i >= 1; i--) {
                inputHtml += '<input type="radio" id="' + q.id + '_' + i + '" name="' + q.id + '" value="' + i + '"><label for="' + q.id + '_' + i + '">â…</label>';
            }
            inputHtml += '</div>';
        }
        else if (q.type === 'yesno') {
            inputHtml = '<div style="margin-top:5px;">' +
                '<label style="margin-right:15px;"><input type="radio" name="' + q.id + '" value="' + t('yes_label') + '"> ' + t('yes_label') + '</label>' +
                '<label><input type="radio" name="' + q.id + '" value="' + t('no_label') + '"> ' + t('no_label') + '</label>' +
                '</div>';
        }
        else {
            var correct = q.gatekeeper || "";
            // Dataset hasznĂˇlata helyett data- attribĂştum stringben is jĂł, vagy JS-bĹ‘l ĂˇllĂ­tva
            inputHtml = '<input type="text" name="' + q.id + '" ' +
                'data-answer="' + correct + '" ' +
                'autocomplete="off" ' +
                'style="width:100%; padding:8px; margin-top:5px; border:1px solid #ccc; border-radius:4px;" ' +
                'placeholder="' + t('answer_placeholder') + '">';
        }

        card.innerHTML = '<label style="font-weight:bold; display:block; color:#444;">' + q.text + '</label>' + inputHtml;

        if (q.type === 'verify') {
            verifyDiv.appendChild(card);
            verifyCount++;
        } else {
            marketingDiv.appendChild(card);
        }
    });

    // --- VEZĂ‰RLĂ‰S ---
    var submitBtn = document.getElementById('submit-marketing-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    // HA VAN ELLENĹRZĹ KĂ‰RDĂ‰S
    if (verifyCount > 0) {
        var nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'btn';
        nextBtn.innerHTML = t('verify_next_button_html');
        nextBtn.style.cssText = "background:#e65100; color:white; margin-top:10px; width:100%; font-weight:bold;";

        nextBtn.onclick = function (e) {
            if (e) e.preventDefault();

            var inputs = verifyDiv.querySelectorAll('input[type="text"]');
            var failed = false;

            // forEach + function
            // NodeList forEach tĂˇmogatĂˇs IE-ben nincs, de modern bĂ¶ngĂ©szĹ‘ben okĂ©. BiztonsĂˇgosabb lenne Array.from().forEach
            for (var k = 0; k < inputs.length; k++) {
                var input = inputs[k];
                var userAnswer = input.value.trim().toLowerCase();
                var correctAnswer = (input.dataset.answer || "").trim().toLowerCase();

                console.log('EllenĹ‘rzĂ©s: User="' + userAnswer + '" vs Correct="' + correctAnswer + '"');

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
                    "HibĂˇs vĂˇlasz!",
                    "SajnĂˇlom, de az ellenĹ‘rzĹ‘ kĂ©rdĂ©sekre adott vĂˇlaszaid nem megfelelĹ‘ek. A rendszer most visszairĂˇnyĂ­t.",
                    "fas fa-ban",
                    [{
                        text: "KilĂ©pĂ©s",
                        color: "#8b0000",
                        textColor: "white",
                        callback: function () {
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
            // scrollIntoView smooth opciĂłval
            try { marketingDiv.scrollIntoView({ behavior: "smooth" }); } catch (e) { marketingDiv.scrollIntoView(); }
            if (submitBtn) submitBtn.style.display = 'inline-block';
        };

        verifyDiv.appendChild(nextBtn);
        container.appendChild(verifyDiv);
        container.appendChild(marketingDiv);

    } else {
        marketingDiv.style.display = 'block';
        var h3 = marketingDiv.querySelector('h3');
        if (h3) h3.style.display = 'none';

        container.appendChild(marketingDiv);
        if (submitBtn) submitBtn.style.display = 'inline-block';
    }

    // SzerzĹ‘i panel
    if (isOwner) {
        var authorPanel = document.createElement('div');
        authorPanel.style.cssText = "margin-bottom: 20px; padding: 15px; background: #e6fffa; border: 2px dashed #319795; text-align: center; border-radius:8px;";
        authorPanel.innerHTML = '<h3 style="margin-top:0; color:#2c7a7b;">âś’ď¸Ź ĂśdvĂ¶zlet, SzerzĹ‘!</h3>' +
            '<button class="btn" style="background:#319795; color:white;" onclick="openAuthorDashboard(\'' + bookId + '\', \'' + folderId + '\', \'A KĂ¶nyved\')">đź“Š StatisztikĂˇk</button>';
        container.insertBefore(authorPanel, container.firstChild);
    }
}

/**
 * VĂˇlaszok Ă¶sszegyĹ±jtĂ©se Ă©s bekĂĽldĂ©se.
 */
function submitMarketingForm() {
    var form = document.getElementById('marketing-form');
    var formData = new FormData(form);
    var answers = {};

    // FormData iterĂˇlĂˇs ES5 mĂłdon (nem for...of)
    // A modern bĂ¶ngĂ©szĹ‘k tĂˇmogatjĂˇk a for...of-ot, de a biztonsĂˇg kedvĂ©Ă©rt:
    // Mivel a FormData.entries() iterĂˇtort ad, Ă©s az IE nem tĂˇmogatja,
    // a legbiztosabb, ha manuĂˇlisan szedjĂĽk Ă¶ssze az inputokat, 
    // VAGY bĂ­zunk benne, hogy a Chrome/FF futtatja.
    // JavĂ­tĂˇs: Sima DOM bejĂˇrĂˇs a form elemein.
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
            "Ăśres a palack?",
            "KĂ©rlek, vĂˇlaszolj legalĂˇbb egy kĂ©rdĂ©sre, mielĹ‘tt a tengerbe dobnĂˇd az ĂĽzenetet!",
            "fas fa-exclamation-circle",
            [{ text: "Rendben", color: "#e65100", textColor: "white" }]
        );
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('submitBookFeedback', [currentMarketingBookId, currentMarketingFolderId, answers],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (res.success) {
                showSystemModal(
                    "Sikeres KĂĽldetĂ©s!",
                    '<div style="text-align:center;">' +
                    '<p style="font-size:1.1em; margin-bottom:15px;">' + res.message + '</p>' +
                    '<p style="color:#2e8b57; font-weight:bold;">+1 KalĂłzkredit jĂłvĂˇĂ­rva!</p>' +
                    '</div>',
                    "fas fa-gem",
                    [{
                        text: "Kreditek ZsebretĂ©tele & KilĂ©pĂ©s",
                        color: "#2e8b57",
                        textColor: "white",
                        callback: function () {
                            returnToPort();
                            updateCreditDisplay();
                        }
                    }]
                );
            } else {
                showSystemModal(
                    "Hiba tĂ¶rtĂ©nt",
                    "A szerver visszautasĂ­totta a kĂ©rĂ©st:<br><b>" + res.error + "</b>",
                    "fas fa-skull-crossbones",
                    [{ text: "MegĂ©rtettem", color: "#8b0000", textColor: "white" }]
                );
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            showSystemModal(
                "KapcsolĂłdĂˇsi Hiba",
                "Nem sikerĂĽlt elĂ©rni a szervert. EllenĹ‘rizd az internetkapcsolatot!<br><small>" + err.message + "</small>",
                "fas fa-wifi",
                [{ text: "Rendben", color: "#555", textColor: "white" }]
            );
        }
    );
}

// ===============================================
// === SZERZĹI DASHBOARD FUNKCIĂ“K MARKETINGHEZ ===
// ===============================================

let currentDashBookId = null;
let currentDashFolderId = null;

// FĂĽlvĂˇltĂł a Dashboardon belĂĽl
function openDashboardTab(evt, tabName) {
    var tabs = document.querySelectorAll('#author-dashboard-modal .tab-content');
    for (var i = 0; i < tabs.length; i++) { tabs[i].style.display = 'none'; }

    var btns = document.querySelectorAll('#author-dashboard-modal .tab-button');
    for (var j = 0; j < btns.length; j++) { btns[j].classList.remove('active'); }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

/**
 * Megnyitja a Dashboardot egy adott kĂ¶nyvhĂ¶z.
 * @param {string} bookId - A kĂ¶nyv azonosĂ­tĂłja (KĂłdja).
 * @param {string} folderId - A kĂ¶nyv mappĂˇjĂˇnak ID-ja (ahol a JSON van).
 * @param {string} title - A kĂ¶nyv cĂ­me (fejlĂ©chez).
 */
function openAuthorDashboard(bookId, folderId, title) {
    currentDashBookId = bookId;
    currentDashFolderId = folderId;

    document.getElementById('dashboard-book-title').textContent = title + " - Marketing ElemzĹ‘";
    document.getElementById('author-dashboard-modal').style.display = 'flex';
    document.getElementById('dashboard-loading').style.display = 'block';
    document.getElementById('dashboard-content').style.display = 'none';

    // Alaphelyzetbe ĂˇllĂ­tĂˇs
    document.querySelector('#author-dashboard-modal .tab-button').click();

    callBackend('getAuthorMarketingStats', [bookId, folderId],
        renderDashboardStats,
        function (err) {
            document.getElementById('dashboard-loading').innerHTML = '<p style="color:red;">Hiba: ' + err.message + '</p>';
        }
    );
}

/**
 * Kirajzolja a Dashboard adatait.
 * 1. FeltĂ¶lti a "MeglĂ©vĹ‘ kĂ©rdĂ©sek" listĂˇt a Settings fĂĽlĂ¶n.
 * 2. Kirajzolja a StatisztikĂˇkat az EredmĂ©nyek fĂĽlĂ¶n.
 */
function renderDashboardStats(response) {
    const loadingEl = document.getElementById('dashboard-loading');
    const contentEl = document.getElementById('dashboard-content');

    if (loadingEl) loadingEl.style.display = 'none';
    if (contentEl) contentEl.style.display = 'block';

    if (!response.success) {
        const detailsList = document.getElementById('dashboard-details-list');
        if (detailsList) detailsList.innerHTML = `<p style="color:red;">${response.error}</p>`;
        return;
    }

    // === 0. LĂ‰PĂ‰S: VERIFY KĂ‰RDĂ‰SEK ===
    const allQuestions = (response.config && response.config.questions) ? response.config.questions : [];
    const verifyQs = allQuestions.filter(q => q.type === 'verify');

    for (let i = 0; i < 3; i++) {
        const txtInput = document.getElementById('v-q' + (i + 1) + '-text');
        const ansInput = document.getElementById('v-q' + (i + 1) + '-ans');

        if (txtInput && ansInput) {
            if (verifyQs[i]) {
                txtInput.value = verifyQs[i].text || "";
                ansInput.value = verifyQs[i].gatekeeper || "";
            } else {
                txtInput.value = "";
                ansInput.value = "";
            }
        }
    }

    // === 1. MEGLĂ‰VĹ KĂ‰RDĂ‰SEK LISTĂZĂSA ===
    const questionsListContainer = document.getElementById('existing-questions-list');

    if (questionsListContainer) {
        questionsListContainer.innerHTML = '';
        const questions = (response.config && response.config.questions) ? response.config.questions : [];

        if (questions.length === 0) {
            questionsListContainer.innerHTML = '<p style="color:#888;">Nincsenek aktĂ­v kĂ©rdĂ©sek.</p>';
        } else {
            const ul = document.createElement('ul');
            ul.style.cssText = "list-style: none; padding: 0; margin: 0;";

            questions.forEach(q => {
                const li = document.createElement('li');
                li.style.cssText = "padding: 8px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;";

                let typeIcon = '<i class="fas fa-font" title="SzĂ¶veges"></i>';
                if (q.type === 'rating') typeIcon = '<i class="fas fa-star" style="color: gold;" title="Ă‰rtĂ©kelĂ©s"></i>';
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

    // === 2. STATISZTIKĂK KIRAJZOLĂSA ===
    const stats = response.stats;
    const detailsList = document.getElementById('dashboard-details-list');
    const totalRespEl = document.getElementById('stat-total-responses');

    if (!stats) {
        if (detailsList) detailsList.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">MĂ©g nem Ă©rkezett vĂˇlasz az olvasĂłktĂłl.</p>`;
        if (totalRespEl) totalRespEl.textContent = "0";
        return;
    }

    if (totalRespEl) totalRespEl.textContent = stats.totalResponses;
    if (detailsList) detailsList.innerHTML = '';

    // Modern Object.entries ciklus
    for (const [qId, data] of Object.entries(stats.questions)) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'result-item';
        itemDiv.style.cssText = "margin-bottom: 15px; background: #fff; padding: 10px; border-radius: 5px; border: 1px solid #eee;";

        let visualHtml = '';

        if (data.type === 'rating') {
            const avg = parseFloat(data.average) || 0; // BiztonsĂˇgos parszolĂˇs
            const percent = (avg / 5) * 100;
            // BiztonsĂˇgos csillag generĂˇlĂˇs
            const starCount = Math.round(avg);
            const stars = 'â…'.repeat(starCount) + 'â†'.repeat(5 - starCount);

            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Ătlag: <strong>${avg.toFixed(1)}</strong> / 5</span>
                    <span style="color:#f6e05e;">${stars}</span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${percent}%; background:#ecc94b; height:100%;"></div>
                </div>`;
        } else if (data.type === 'yesno') {
            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Igen vĂˇlaszok: <strong>${data.yesPercent}%</strong></span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${data.yesPercent}%; background:#4299e1; height:100%;"></div>
                </div>`;
        } else if (data.type === 'text') {
            let answersHtml = (data.answers && data.answers.length > 0)
                ? data.answers.map(ans => `<div style="background:#f7fafc; padding:8px; border-left:3px solid #cbd5e0; margin-bottom:5px; font-style:italic;">"${ans}"</div>`).join('')
                : '<div style="color:#aaa; font-style:italic;">(Nincs szĂ¶veges vĂˇlasz)</div>';
            visualHtml = `<div style="margin-top:10px;">${answersHtml}</div>`;
        }

        itemDiv.innerHTML = `<div style="font-weight:bold; margin-bottom:10px; color:#2d3748;">${data.label}</div>${visualHtml}`;
        detailsList.appendChild(itemDiv);
    }
}

/**
 * Ă–sszeszedi a 3 Verify mezĹ‘t Ă©s elkĂĽldi a szervernek mentĂ©sre.
 */
function submitVerificationQuiz() {
    var questionsToSave = [];

    for (var i = 1; i <= 3; i++) {
        var text = document.getElementById('v-q' + i + '-text').value.trim();
        var answer = document.getElementById('v-q' + i + '-ans').value.trim();

        if (text) {
            if (!answer) {
                showSystemModal(t('incomplete_data_title'), i + t('quiz_missing_answer_suffix'), "fas fa-exclamation-triangle", [{ text: t('ok_button') }]);
                return;
            }
            questionsToSave.push({ text: text, answer: answer });
        }
    }

    if (questionsToSave.length === 0) {
        showSystemModal(t('empty_form_title'), t('quiz_min_one_required'), "fas fa-exclamation-triangle", [{ text: t('ok_button') }]);
        return;
    }

    var btn = document.querySelector('#verification-quiz-form button');
    var originalText = btn.innerHTML;
    btn.innerText = t('save_in_progress');
    btn.disabled = true;

    callBackend('saveVerificationQuiz', [currentDashBookId, currentDashFolderId, questionsToSave],
        function (res) {
            btn.innerHTML = originalText;
            btn.disabled = false;

            if (res.success) {
                showSystemModal(t('success_title'), t('quiz_questions_updated'), "fas fa-check-circle", [{ text: t('ok_button'), color: "#276749", textColor: "white" }]);
            } else {
                showSystemModal(t('error_title'), t('save_error_prefix') + res.error, "fas fa-times-circle", [{ text: t('close_button') }]);
            }
        },
        function (err) {
            btn.innerHTML = originalText;
            btn.disabled = false;
            showSystemModal(t('server_error_title'), err.message, "fas fa-wifi", [{ text: t('close_button') }]);
        }
    );
}

function submitNewQuestion() {
    var text = document.getElementById('nq-text').value;
    var type = document.getElementById('nq-type').value;
    var category = document.getElementById('nq-category').value;
    var isGame = document.getElementById('nq-isgame').checked;

    if (!text) { uiAlert(t('question_text_required')); return; }

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
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert(t('question_added_notice'));
                document.getElementById('new-question-form').reset();
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('server_error_short_prefix') + err.message);
        }
    );
}

// =============
// == KINCSEK ==
// =============

function initializeKincsekPage(response) {
    if (!response || !response.success) {
        var errorMessage = response ? response.error : t('unknown_server_error');
        var sheetElement = document.querySelector('.character-sheet');
        if (sheetElement) {
            sheetElement.innerHTML = '<h2>' + t('character_data_load_error_title') + '</h2><p style="color:red; font-size: 0.9em; margin-top: 15px;"><b>' + t('details_label') + '</b> ' + errorMessage + '</p>';
        } else {
            console.error(t('character_sheet_missing_error'));
            var contentDiv = document.getElementById('content');
            if (contentDiv) contentDiv.innerHTML = '<p style="color:red;">' + t('character_sheet_render_error') + '</p>';
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
    if (rankImgElement) {
        rankImgElement.alt = data.rang;
        if (data.rang_kep_data && data.rang_kep_data.data) {
            rankImgElement.src = 'data:' + data.rang_kep_data.mime + ';base64,' + data.rang_kep_data.data;
        } else {
            rankImgElement.src = "";
        }
    }

    // A feltĂ©tel maradhat (kliens oldali ellenĹ‘rzĂ©snek jĂł), de a hĂ­vĂˇsbĂłl kivesszĂĽk!
    if (currentUserEmail && data.rang) {
        console.log('[initializeKincsekPage] Rang frissĂ­tĂ©sĂ©nek indĂ­tĂˇsa: ' + currentUserEmail + ', ' + data.rang);

        // --- JAVĂŤTOTT callBackend ---
        // Csak a [data.rang]-ot kĂĽldjĂĽk! Az emailt a Router intĂ©zi.
        callBackend('updatePlayerRank', [data.rang],
            function () { }, // Siker esetĂ©n csendben maradunk
            function (error) {
                console.error('!!! HIBA a rang szerveroldali frissĂ­tĂ©sekor: ' + error.message);
            }
        );
    } else {
        console.warn("[initializeKincsekPage] FigyelmeztetĂ©s: HiĂˇnyzĂł currentUserEmail vagy data.rang a rangfrissĂ­tĂ©shez.");
    }

    // --- ZSOLDOSOK BETĂ–LTĂ‰SE ---
    var mercContainer = document.getElementById('char-sheet-mercenaries');
    if (mercContainer) {
        callBackend('getMyMercenaries', [],
            function (mercResponse) {
                if (mercResponse && mercResponse.length > 0) {
                    var html = '';
                    mercResponse.forEach(function (merc) {
                        html += '<div style="background: rgba(255, 255, 255, 0.85); padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid #8b4513; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">';
                        html += '<strong style="color:#000; font-size:1.1em;">' + merc.name + '</strong> <span style="font-size:0.9em; color:#3e2723; font-style:italic;">(' + merc.role + ')</span><br>';
                        html += '<span style="font-size:0.9em; color:#8b0000; font-weight:bold;">SzerzĹ‘dĂ©s: ' + merc.remainingDays + ' nap hĂˇtra (lejĂˇr: ' + merc.endDateStr + ')</span><br>';
                        html += '<div style="margin-top:8px; display:flex; gap:5px;">';
                        html += '<button class="btn btn-sm" onclick="handleMercenaryAction(\'extend\', \'' + merc.name + '\')" style="flex:1; padding:5px; font-size:0.8em;">MeghosszabbĂ­tom (' + merc.cost + ' Kr)</button>';
                        html += '<button class="btn btn-danger btn-sm" onclick="handleMercenaryAction(\'dismiss\', \'' + merc.name + '\')" style="flex:1; padding:5px; font-size:0.8em;">ElkĂĽldĂ¶m</button>';
                        html += '</div></div>';
                    });
                    mercContainer.innerHTML = html;
                } else {
                    mercContainer.innerHTML = '<div class="stat-line">Nincs aktĂ­v zsoldosod.</div>';
                }
            },
            function (err) {
                console.error("Zsoldosok betĂ¶ltĂ©se sikertelen:", err);
                mercContainer.innerHTML = '<div class="stat-line" style="color:red;">Hiba a lekĂ©rdezĂ©snĂ©l.</div>';
            }
        );
    }
}

function handleMercenaryAction(actionType, targetEmail) {
    if (!confirm("Biztosan " + (actionType === 'extend' ? "meghosszabbĂ­tod" : "elkĂĽldĂ¶d") + " ezt a zsoldost: " + npcName + "?")) {
        return;
    }
    document.getElementById('loading-overlay').style.display = 'flex';
    var actionFunc = actionType === 'extend' ? 'extendMercenary' : 'dismissMercenary';
    callBackend(actionFunc, [targetEmail],
        function (response) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (response.success) {
                uiAlert("Sikeres mĹ±velet: " + response.message);
                loadPage('kincsek'); // ĂšjratĂ¶ltjĂĽk a kincsek oldalt
            } else {
                uiAlert("Hiba: " + response.error);
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("HĂˇlĂłzati hiba: " + err.message);
        }
    );
}


// ==========================
// === TITKOSĂŤTĂS SEGĂ‰DEK ===
// ==========================

// RelatĂ­v Ă©s valĂłs Ăştvonal Ă¶sszefĹ±zĂ©se
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

// LSB VĂ­zjelezĂ©s BorĂ­tĂłkĂ©pnĂ©l (Async marad, de szintaxis tisztĂ­tĂˇs)
function embedIdInImage(imageFile, id) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (event) {
            var img = new Image();
            img.onload = function () {
                var maxWidth = 1920;
                var scale = img.width > maxWidth ? maxWidth / img.width : 1;
                var newWidth = Math.floor(img.width * scale);
                var newHeight = Math.floor(img.height * scale);
                var canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                var ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                var binaryId = '';
                for (var i = 0; i < id.length; i++) {
                    // padStart helyett manuĂˇlis kiegĂ©szĂ­tĂ©s
                    var bin = id[i].charCodeAt(0).toString(2);
                    while (bin.length < 8) bin = "0" + bin;
                    binaryId += bin;
                }
                binaryId += "11111111";

                var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var data = pixelData.data;

                if (binaryId.length > (data.length / 4) * 3) {
                    return reject(new Error("A kĂ©p tĂşl kicsi az azonosĂ­tĂł elrejtĂ©sĂ©hez."));
                }

                var dataIndex = 0;
                for (var j = 0; j < binaryId.length; j++) {
                    var bit = binaryId[j];

                    while ((dataIndex + 1) % 4 === 0) {
                        dataIndex++;
                    }

                    if (dataIndex >= data.length) {
                        return reject(new Error("Hiba a vĂ­zjel Ă­rĂˇsa kĂ¶zben: a kĂ©p mĂ©rete nem elegendĹ‘."));
                    }

                    var oldValue = data[dataIndex];
                    data[dataIndex] = (bit === '1') ? (oldValue | 1) : (oldValue & 254);

                    dataIndex++;
                }

                ctx.putImageData(pixelData, 0, 0);

                var finalDataURL = canvas.toDataURL('image/png');
                console.log("DEBUG: VĂ­zjelezett kĂ©p kĂ©sz.");

                resolve(finalDataURL);
            };
            img.onerror = function (err) { reject(new Error("A kĂ©pfĂˇjl nem tĂ¶lthetĹ‘ be. Lehet, hogy sĂ©rĂĽlt.")); };
            img.src = event.target.result;
        };
        reader.onerror = function (err) { reject(new Error("A fĂˇjl olvasĂˇsa sikertelen.")); };
        reader.readAsDataURL(imageFile);
    });
}

// nulla szĂ©les titkos kĂłd
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

// JelszĂł lĂˇthatĂłsĂˇg
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
    console.warn("A jelszĂł lĂˇthatĂłsĂˇg kapcsolĂł elemei (ikon vagy input) nem talĂˇlhatĂłak!");
}

// ==========================
// === HAJĂ“NAPLĂ“ FUNKCIĂ“K ===
// ==========================

var MIN_LOG_RANK = 'FregattkapitĂˇny';

function checkRankAndOpenLogModal() {
    console.log("Rang ellenĹ‘rzĂ©se Ă©s naplĂł ID lekĂ©rĂ©se a naplĂłĂ­rĂˇshoz...");
    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. LĂ‰PĂ‰S: Rang ellenĹ‘rzĂ©se
    callBackend('getCharacterSheetData', [],
        function (rankResponse) {
            if (!rankResponse.success || !rankResponse.data || !rankResponse.data.rang) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('log_rank_check_error_prefix') + (rankResponse.error || t('unknown_error')));
                return;
            }

            // 2. LĂ‰PĂ‰S: ĂŤrĂˇsi jogosultsĂˇg Ă©s NaplĂł ID
            callBackend('checkLogWritePermission', [],
                function (logId) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    console.log("checkLogWritePermission vĂˇlasz: " + logId);

                    if (logId && typeof logId === 'string') {
                        console.log("NaplĂł ID rendben (" + logId + "), modal megnyitĂˇsa.");
                        openLogEntryModal();
                    } else {
                        uiAlert(t('log_prepare_failed'));
                        console.error("checkLogWritePermission Ă©rvĂ©nytelen vĂˇlasz:", logId);
                    }
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(t('error_prefix') + err.message);
                    console.error("checkLogWritePermission hiba:", err);
                }
            );
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('log_rank_server_error_prefix') + err.message);
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

    imageInput.onchange = function (event) {
        var file = event.target.files[0];
        imagePreview.innerHTML = '';
        if (file && file.type === "image/png") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else if (file) {
            uiAlert(t('png_only_error'));
            imageInput.value = '';
        }
    };

    var newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    newSubmitBtn.addEventListener('click', submitLogEntry);

    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. Log ID lekĂ©rĂ©se (IsmĂ©tlĂ©s a biztonsĂˇgĂ©rt)
    callBackend('checkLogWritePermission', [],
        function (currentLogId) {
            if (!currentLogId || typeof currentLogId !== 'string') {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('log_writable_id_missing'));
                closeLogEntryModal();
                return;
            }

            // 2. BejegyzĂ©s lekĂ©rĂ©se
            callBackend('getLogEntry', [currentLogId, entryId || 'last'], // currentUserEmail-t a Router adja
                function (entry) {
                    document.getElementById('loading-overlay').style.display = 'none';

                    if (entry.error) {
                        uiAlert(t('log_entry_load_error_prefix') + entry.error);
                        closeLogEntryModal();
                        return;
                    }

                    window.currentLogEntryData = entry;

                    if (entryId === null || entry.id === null) {
                        // === ĂšJ BEJEGYZĂ‰S ===
                        title.textContent = t('log_new_entry_title');
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
                            prevBtn.onclick = function () { openLogEntryModal(entry.prevId); };
                        } else if (window.currentLogEntryData && window.currentLogEntryData.id) {
                            prevBtn.style.visibility = 'visible';
                            prevBtn.onclick = function () { openLogEntryModal(window.currentLogEntryData.id); };
                        }
                        nextBtn.style.visibility = 'hidden';

                    } else {
                        // === SZERKESZTĂ‰S ===
                        title.textContent = t('log_edit_entry_title');
                        entryIdInput.value = entry.id || '';
                        document.getElementById('log-date').value = entry.date || '';
                        document.getElementById('log-time').value = entry.time || '';
                        document.getElementById('log-wind').value = entry.wind || '';
                        document.getElementById('log-weather').value = entry.weather || '';
                        document.getElementById('log-lat').value = entry.latitude || '';
                        document.getElementById('log-lon').value = entry.longitude || '';
                        document.getElementById('log-report').value = entry.report || '';

                        if (entry.imageId) {
                            imagePreview.innerHTML = '<p><small><i>KĂ©p csatolva. Ăšj kĂ©p feltĂ¶ltĂ©se felĂĽlĂ­rja.</i></small></p>';
                        }

                        if (entry.prevId) {
                            prevBtn.style.visibility = 'visible';
                            prevBtn.onclick = function () { openLogEntryModal(entry.prevId); };
                        } else {
                            prevBtn.style.visibility = 'hidden';
                        }

                        if (entry.nextId) {
                            nextBtn.style.visibility = 'visible';
                            nextBtn.onclick = function () { openLogEntryModal(entry.nextId); };
                        } else {
                            nextBtn.style.visibility = 'visible';
                            nextBtn.textContent = t('log_new_entry_next');
                            nextBtn.onclick = function () { openLogEntryModal(null); };
                        }
                    }

                    modal.style.display = 'flex';
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(t('log_entry_fetch_error_prefix') + err.message);
                    closeLogEntryModal();
                }
            );
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('log_prepare_error_prefix') + err.message);
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
            function (position) {
                document.getElementById('log-lat').value = position.coords.latitude.toFixed(4);
                document.getElementById('log-lon').value = position.coords.longitude.toFixed(4);
            },
            function (error) {
                var message = t('geo_error_prefix') + error.message;
                console.warn(message);
                if (!silentMode) {
                    uiAlert(message + t('geo_error_manual_suffix'));
                }
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
    } else {
        var message = t('geo_not_supported');
        console.warn(message);
        if (!silentMode) {
            uiAlert(message);
        }
    }
}

// Async maradhat, mert a kĂ©pfeldolgozĂˇshoz kell
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
        statusDiv.textContent = 'A dĂˇtum Ă©s idĹ‘ megadĂˇsa kĂ¶telezĹ‘!';
        submitBtn.disabled = false;
        return;
    }
    if (!entryData.report.trim()) {
        statusDiv.textContent = 'A napi jelentĂ©s kitĂ¶ltĂ©se kĂ¶telezĹ‘!';
        submitBtn.disabled = false;
        return;
    }

    var imageInput = document.getElementById('log-image');
    var file = imageInput.files[0];

    document.getElementById('loading-overlay').style.display = 'flex';

    try {
        if (file) {
            var fileReader = new FileReader();
            var dataUrl = await new Promise(function (resolve, reject) {
                fileReader.onload = function (e) { resolve(e.target.result); };
                fileReader.onerror = function (e) { reject(new Error("Hiba a kĂ©pfĂˇjl olvasĂˇsa kĂ¶zben.")); };
                fileReader.readAsDataURL(file);
            });
            var pngDataUrl = await convertToPngDataUrl(dataUrl);
            entryData.imageBase64 = pngDataUrl.split(',')[1];
        }

        console.log("MentĂ©sre kĂĽldĂ¶tt adatok:", entryData);

        // callBackend hĂ­vĂˇs
        callBackend('saveLogEntry', [entryData],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                if (response.success) {
                    uiAlert(t('log_save_success'));
                    closeLogEntryModal();
                } else {
                    statusDiv.textContent = t('log_save_error_prefix') + response.error;
                    console.error("MentĂ©si hiba:", response.error);
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                statusDiv.textContent = t('server_error_short_prefix') + err.message;
                console.error("Szerverhiba mentĂ©skor:", err);
            }
        );

    } catch (error) {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = t('image_process_error_prefix') + error.message;
        console.error("KĂ©pfeldolgozĂˇsi hiba:", error);
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
        console.error("Hiba: A 'log-publish-section' HTML elem nem talĂˇlhatĂł!");
        return;
    }

    // Backtick helyett string Ă¶sszefĹ±zĂ©s
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

    // KlĂłnozĂˇssal eltĂˇvolĂ­tjuk a rĂ©gi listenereket
    var newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);

    newSubmitBtn.onclick = function () {
        if (this.disabled) return;
        var pinCode = document.getElementById('log-publish-pin').value;
        var statusDiv = document.getElementById('log-publish-status');

        if (!pinCode) {
            statusDiv.textContent = t('pin_required');
            statusDiv.className = 'msg-error';
            return;
        }

        this.disabled = true;
        this.textContent = t('sanctify_in_progress');
        document.getElementById('loading-overlay').style.display = 'flex';
        statusDiv.textContent = '';

        callBackend('publishEditedLogbook', [gdocId, pinCode, logId],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                newSubmitBtn.disabled = false;
                newSubmitBtn.textContent = t('finalize_sanctify_button');
                if (response.success) {
                    uiAlert(t('log_publish_success'));
                    section.style.display = 'none';
                    updateCreditDisplay();
                } else {
                    statusDiv.textContent = t('sanctify_error_prefix') + response.error;
                    statusDiv.className = 'msg-error';
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                newSubmitBtn.disabled = false;
                newSubmitBtn.textContent = t('finalize_sanctify_button');
                statusDiv.textContent = t('server_error_short_prefix') + err.message;
                statusDiv.className = 'msg-error';
            }
        );
    };
}

// ===================== NPC INTERFĂ‰SZEK =====================================

// === UNIVERZĂLIS MEGJELENĂŤTĹ ===

var ACTIVE_NPC_CONFIG = {};

function openUniversalNPC(npcId, config) {
    var modal = document.getElementById('universal-npc-modal');
    var modalContent = modal.querySelector('.gamemode-modal-content');
    var portraitPanel = document.getElementById('npc-portrait-panel');
    var portraitImg = document.getElementById('npc-portrait-image');

    // 1. Ăllapot mentĂ©se
    document.getElementById('current-npc-id').value = npcId;
    // GlobĂˇlis vĂˇltozĂłba mentjĂĽk, hogy elĂ©rhetĹ‘ legyen mĂˇshol is
    window.currentNPCConfig = config || {};
    ACTIVE_NPC_CONFIG = window.currentNPCConfig;

    config = ACTIVE_NPC_CONFIG;
    var name = config.name || 'NPC';
    var role = config.role || '';
    var icon = config.icon || 'đź‘¤';
    var headerColor = config.headerColor || '#333';

    document.getElementById('npc-name').innerText = name;
    document.getElementById('npc-role').innerText = role;
    document.getElementById('npc-icon').innerHTML = icon;
    document.getElementById('npc-header').style.backgroundColor = headerColor;

    modal.style.cssText = "display: flex; z-index: 100; background: rgba(0,0,0,0.5);";
    modalContent.style.cssText = "";
    modalContent.className = "gamemode-modal-content";

    // 4. PORTRĂ‰ KEZELĂ‰S
    portraitPanel.className = 'npc-portrait-closed';
    portraitImg.src = '';

    if (config.portrait) {
        portraitImg.src = config.portrait;

        setTimeout(function () {
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

    // callBackend hasznĂˇlata
    if (!config || !config.skipInit) {
        callBackend('handleNPCInteraction', [npcId, "", "INIT", null], handleUniversalResponse);
    }
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
        function (response) {
            var l = document.getElementById(loaderId);
            if (l) l.remove();
            input.disabled = false;
            input.focus();
            handleUniversalResponse(response);
        },
        function (err) {
            var l = document.getElementById(loaderId);
            if (l) l.remove();
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

    setTimeout(function () {
        chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
}

function adjustColorBrightness(col, amt) {
    if (col[0] !== "#") return col;
    var num = parseInt(col.slice(1), 16);
    var r = (num >> 16) + amt;
    var b = ((num >> 8) & 0x00FF) + amt;
    var g = (num & 0x0000FF) + amt;
    var newColor = g | (b << 8) | (r << 16);
    return "#" + (0x1000000 + (newColor < 0 ? 0 : newColor > 0xFFFFFF ? 0xFFFFFF : newColor)).toString(16).slice(1);
}

// === SZERVER VĂLASZ FELDOLGOZĂSA ===
function handleUniversalResponse(response) {
    var chatArea = document.getElementById('universal-chat-area');
    console.log("Szerver vĂˇlasz Ă©rkezett:", response);

    if (!response) {
        console.error("Hiba: A szerver ĂĽres vĂˇlaszt kĂĽldĂ¶tt!");
        addBubbleToUniversal("System", "Hiba: A szerver nem kĂĽldĂ¶tt adatot. (Null Response)", "system");
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

        buttons.forEach(function (btn) {
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

            b.onclick = function () {
                if (btnContainer.parentNode) btnContainer.parentNode.removeChild(btnContainer);
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
        setTimeout(function () { chatArea.scrollTop = chatArea.scrollHeight; }, 50);
    }

    if (response.dropdown) {
        var dpContainer = document.createElement('div');
        dpContainer.className = "npc-response-dropdown";
        dpContainer.style.marginTop = "10px";
        dpContainer.style.display = "flex";
        dpContainer.style.flexDirection = "column";
        dpContainer.style.gap = "10px";
        dpContainer.style.alignItems = "center";

        var select = document.createElement('select');
        select.style.padding = "8px";
        select.style.borderRadius = "5px";
        select.style.width = "100%";
        select.style.backgroundColor = "#444";
        select.style.color = "#fff";
        select.style.border = "1px solid #777";

        var defaultOpt = document.createElement('option');
        defaultOpt.value = "";
        defaultOpt.text = "--- VĂˇlassz egyet ---";
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        if (response.dropdown.options) {
            response.dropdown.options.forEach(function(opt) {
                var option = document.createElement('option');
                option.value = opt.value;
                option.text = opt.label;
                select.appendChild(option);
            });
        }

        var submitBtn = document.createElement('button');
        submitBtn.className = 'btn';
        submitBtn.style.cssText = "width: 100%; font-size: 0.9em; padding: 8px;";
        submitBtn.innerHTML = response.dropdown.submitText || "KivĂˇlaszt";
        
        submitBtn.onclick = function() {
            if (!select.value) {
                addBubbleToUniversal("System", "Hiba: KĂ©rlek, vĂˇlassz a listĂˇbĂłl!", "system");
                return;
            }
            if (dpContainer.parentNode) dpContainer.parentNode.removeChild(dpContainer);
            else dpContainer.remove();
            
            var btnAction = response.dropdown.action;
            if (btnAction.indexOf('CLIENT_REQ_PIN') === 0) {
                handleNPCButtonAction({ action: btnAction + select.value });
            } else {
                handleNPCButtonAction({ action: btnAction, payload: select.value });
            }
        };

        dpContainer.appendChild(select);
        dpContainer.appendChild(submitBtn);
        chatArea.appendChild(dpContainer);
        setTimeout(function () { chatArea.scrollTop = chatArea.scrollHeight; }, 50);
    }

    if (response.clientFn) {
        setTimeout(function() {
            var fnName = response.clientFn;
            if (typeof window[fnName] === 'function') {
                window[fnName]();
            } else {
                console.error("Hiba: A '" + fnName + "' automatikus fĂĽggvĂ©ny nem lĂ©tezik.");
            }
        }, 1500); // KĂ©sleltetĂ©s, hogy a jĂˇtĂ©kos elolvashassa a siker ĂĽzenetet
    }
}

// === UNIVERZĂLIS GOMBKEZELĹ ===
function handleNPCButtonAction(btn) {
    console.log("Gomb megnyomva:", btn);

    var buttonContainer = document.getElementById('universal-button-area');
    if (buttonContainer) buttonContainer.innerHTML = '';

    if (btn.action === 'CLIENT_FN') {
        var fnName = btn.payload;
        if (typeof window[fnName] === 'function') {
            window[fnName]();
        } else {
            console.error("Hiba: A '" + fnName + "' fĂĽggvĂ©ny nem lĂ©tezik.");
        }
        return;
    }

    if (btn.action === 'CLIENT_REDIRECT') {
        var targetTab = btn.payload;
        if (targetTab === 'MUNKAPAD') targetTab = 'Munkapad';
        
        if (typeof openMonasteryTab === 'function') {
            openMonasteryTab(null, targetTab);
            var modal = document.getElementById('universal-npc-modal');
            if (modal) modal.style.display = 'none';
        } else {
            console.error("Hiba: openMonasteryTab fuggveny nem letezik.");
        }
        return;
    }

    if (btn.action && btn.action.indexOf('CLIENT_OPEN_DASHBOARD') === 0) {
        var parts = btn.action.split('|');
        var bookId = parts[1];
        var folderId = parts[2];
        var title = parts[3];
        if (typeof openAuthorDashboard === 'function') {
            openAuthorDashboard(bookId, folderId, title);
            var modal = document.getElementById('universal-npc-modal');
            if (modal) modal.style.display = 'none';
        } else {
            console.error("Hiba: openAuthorDashboard fuggveny nem letezik.");
        }
        return;
    }

    if (btn.action && btn.action.indexOf('CLIENT_REQ_PIN') === 0) {
        var parts = btn.action.split('|');
        var funcName = parts[1];
        var modalTitle = parts[2] || t('security_check_title');
        var params = parts.slice(3);
        var npcId = document.getElementById('current-npc-id').value;

        requestPin(function (pinCode) {
            addBubbleToUniversal(t('chat_me_label'), t('pin_provided_masked'), "outgoing");

            var loaderId = "pin-load-" + Date.now();
            var chatArea = document.getElementById('universal-chat-area');
            var loader = document.createElement('div');
            loader.id = loaderId;
            loader.style.cssText = "color:#888; font-style:italic; margin:5px 15px;";
            loader.innerText = t('processing');
            chatArea.appendChild(loader);
            chatArea.scrollTop = chatArea.scrollHeight;

            callBackend('handleNPCInteraction', [npcId, pinCode, "EXECUTE_PIN_ACTION", { func: funcName, args: params }],
                function (response) {
                    var l = document.getElementById(loaderId);
                    if (l) l.remove();
                    handleUniversalResponse(response);
                },
                function (err) {
                    var l = document.getElementById(loaderId);
                    if (l) l.remove();
                    addBubbleToUniversal(t('system_label'), t('error_prefix') + err.message, "system");
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
        addBubbleToUniversal(t('chat_me_label'), userBubbleText, "outgoing");
    }

    var actionType = btn.action;
    var extraData = btn.payload;

    if (typeof extraData === 'string' && extraData.indexOf('{') === 0) {
        try { extraData = JSON.parse(extraData); } catch (e) { }
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
    loader.innerText = t('thinking');
    chatArea.appendChild(loader);
    chatArea.scrollTop = chatArea.scrollHeight;

    callBackend('handleNPCInteraction', [npcId, "", actionType, extraData],
        function (response) {
            var l = document.getElementById(loaderId);
            if (l) l.remove();
            handleUniversalResponse(response);
        },
        function (err) {
            var l = document.getElementById(loaderId);
            if (l) l.remove();
            addBubbleToUniversal(t('system_label'), t('error_happened_prefix') + err.message, "system");
        }
    );
}

function triggerNPCPayment(amount) {
    var npcId = document.getElementById('current-npc-id').value;
    addBubbleToUniversal(t('chat_you_label'), t('payment_sent_prefix') + amount + ' ' + t('credit_short') + t('payment_sent_suffix'), "outgoing");

    callBackend('handleNPCInteraction', [npcId, "", "PAY_FOR_INFO", { cost: amount }],
        handleUniversalResponse,
        function (err) {
            addBubbleToUniversal(t('system_label'), t('transaction_error_prefix') + err.message, "system");
        }
    );
}

// Enter tĂˇmogatĂˇs
var univInput = document.getElementById('universal-chat-input');
if (univInput) {
    univInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendUniversalMessage();
    });
}

// ================================= UNIVERZĂLIS NPC VEZĂ‰RLĹ VĂ‰GE ====================================

// SegĂ©dfĂĽggvĂ©ny a harmonikĂˇhoz
function toggleAccordionPanel() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

// ... (elĹ‘zĹ‘ kĂłdok vĂ©ge) ...

// === WINDOW ONLOAD (INDĂŤTĂS) ===
window.onload = function () {
    console.log(">>> OLLDAL BETĂ–LTVE. Rendszer indĂ­tĂˇsa...");

    // 1. AUTOMATIKUS BELĂ‰PĂ‰S
    try {
        console.log("1. Auto-login indĂ­tĂˇsa...");
        if (typeof checkSession === 'function') {
            checkSession();
        } else {
            console.error("HIBA: A checkSession fĂĽggvĂ©ny nem lĂ©tezik!");
        }
    } catch (e) {
        console.error("KRITIKUS HIBA az Auto-login sorĂˇn:", e);
    }

    // 2. HARMONIKA GOMBOK (Accordion)
    try {
        var acc = document.getElementsByClassName("accordion-button");
        if (acc.length > 0) {
            for (var i = 0; i < acc.length; i++) {
                acc[i].removeEventListener("click", toggleAccordionPanel);
                acc[i].addEventListener("click", toggleAccordionPanel);
            }
            console.log("2. Harmonika gombok beĂˇllĂ­tva.");
        }
    } catch (e) {
        console.warn("Hiba a harmonika gomboknĂˇl (nem kritikus):", e);
    }

    // 3. MARKETING URL
    try {
        if (typeof checkUrlParametersForMarketing === 'function') {
            checkUrlParametersForMarketing();
        }
    } catch (e) {
        console.warn("Marketing hiba:", e);
    }

    // 5. === MONK PIN KĂ“D LĂTHATĂ“SĂGA ===
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
            console.log("5. Monk PIN gomb beĂˇllĂ­tva.");
        } else {
            console.warn("A Monk PIN mezĹ‘ vagy az ikon nem talĂˇlhatĂł.");
        }
    } catch (e) {
        console.warn("Monk PIN hiba:", e);
    }

    console.log(">>> Minden rendszer kĂ©sz.");
};

// SegĂ©dfĂĽggvĂ©ny a harmonikĂˇhoz (KĂŤVĂśL HAGYJUK, hogy globĂˇlis legyen)
function toggleAccordionPanel() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

/**
 * ElindĂ­tja a jĂˇtĂ©kot a szerverrĹ‘l lekĂ©rt mentett jĂˇtĂ©kĂˇllĂˇssal.
 * Ezt a 'tutorial_oldal.html'-en lĂ©vĹ‘ "UgrĂˇs a mentett ĂˇllĂˇshoz" gomb hĂ­vja.
 */
function jumpToSavedState() {
    console.log("KĂ­sĂ©rlet a mentett jĂˇtĂ©kĂˇllĂˇs betĂ¶ltĂ©sĂ©re...");
    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. Backend hĂ­vĂˇs a jĂˇtĂ©kĂˇllĂˇs (AH oszlop) Ă©s a Unity URL lekĂ©rĂ©sĂ©hez
    callBackend('getGameState', [],
        function (response) {
            if (response && response.success && response.gameState && response.unityUrl) {
                console.log("Sikeresen megkapva a jĂˇtĂ©kĂˇllĂˇs, Unity indĂ­tĂˇsa...");

                // A 'tryLaunchUnity' egy 'flow' objektumot vĂˇr, ezt itt Ă¶sszeĂˇllĂ­tjuk.
                const flow = {
                    unityUrl: response.unityUrl,
                    gameStateToken: response.gameState, // A 'gameStateToken' nevet hasznĂˇljuk a konzisztencia Ă©rdekĂ©ben.
                    tutorialCompleted: true // FeltĂ©telezzĂĽk, hogy ha van mentĂ©se, a tutorialt mĂˇr befejezte.
                };

                // 2. IndĂ­tjuk a Unity-t a tryLaunchUnity fĂĽggvĂ©nnyel.
                // Az 'autoStart' paramĂ©ter (true) biztosĂ­tja, hogy a jĂˇtĂ©k azonnal induljon.
                tryLaunchUnity(flow, true);

            } else {
                document.getElementById('loading-overlay').style.display = 'none';
                var errorMessage = response.error || "A mentett jĂˇtĂ©kĂˇllĂˇs nem Ă©rhetĹ‘ el vagy hibĂˇs a vĂˇlasz.";
                if (typeof uiAlert === 'function') {
                    uiAlert(errorMessage, "BetĂ¶ltĂ©si Hiba");
                } else {
                    alert("Hiba: " + errorMessage);
                }
            }
        },
        function (error) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') {
                uiAlert("Hiba tĂ¶rtĂ©nt a szerverrel valĂł kommunikĂˇciĂł sorĂˇn: " + error.message, "Szerver Hiba");
            } else {
                alert("Szerver Hiba: " + error.message);
            }
        }
    );
}

function triggerAgentAnalysis(workId) {
    if (!confirm('Biztosan Ăˇtadod ezt a kĂ©ziratot a PapĂˇt AI asszisztensnek elemzĂ©sre? A hĂˇttĂ©rfolyamat perceket is igĂ©nybe vehet.')) return;

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('manageWorkStatus', [workId, 'agent_analysis_start', null],
        function (res) {
            if (loading) loading.style.display = 'none';
            uiAlert(res.message || "Az elemzĂ©s elindult. NemsokĂˇra jelentkezik az Agent egy Ă©rtĂ©kelĂ©ssel.", "Siker");
            refreshMonasteryWork();
        },
        function (err) {
            if (loading) loading.style.display = 'none';
            uiAlert("Hiba a szerverhĂ­vĂˇsban: " + err.message, "Rendszerhiba");
        }
    );
}

// --- PAPĂT REPORT MEGJELENĂŤTĹ LOGIKA ---
function openPapatReportModal(workId) {
    if (!window.currentMonasteryWorks) {
        uiAlert("Hiba: Nem talĂˇlhatĂłak a mĹ±vek a memĂłriĂˇban. FrissĂ­tsd a listĂˇt!", "Rendszerhiba");
        return;
    }

    var foundWork = window.currentMonasteryWorks.find(function (w) { return w.id === workId; });
    if (!foundWork || !foundWork.checklist || !foundWork.checklist.papat_report) {
        uiAlert("Ehhez a kĂ©zirathoz nem talĂˇlhatĂł PapĂˇt AI jelentĂ©s!", "Hiba");
        return;
    }

    var report = foundWork.checklist.papat_report;
    var html = "";

    html += "<p><strong>MĹ± cĂ­me:</strong> " + foundWork.title + "</p>";
    html += "<p><strong>KiĂˇllĂ­tĂˇs DĂˇtuma:</strong> " + (report.timestamp || 'N/A') + "</p>";
    html += "<hr>";

    // BELSĹ PLĂGIUM
    var plagColor = "green";
    var plagText = "Tiszta (Nincs BelsĹ‘ PlĂˇgium)";
    if (report.plagiarism && report.plagiarism.status === "failed") {
        plagColor = "red";
        plagText = "VIGYĂZAT: RĂ©szleges vagy teljes Ă–NPLĂGIUM/MĂSOLAT! (" + report.plagiarism.score_percent + "%)";
    }
    html += "<div style='margin-bottom: 15px; padding: 10px; border: 1px solid " + plagColor + "; background-color: " + (plagColor === 'red' ? '#ffe6e6' : '#e6ffe6') + "; border-radius: 5px;'>";
    html += "<strong><i class='fas fa-search'></i> FĂˇjl-alapĂş PlĂˇgiumszĹ±rĂ©s:</strong> <span style='color: " + plagColor + "; font-weight: bold;'>" + plagText + "</span>";
    if (report.plagiarism && report.plagiarism.message) {
        html += "<br><small>" + report.plagiarism.message + "</small>";
    }
    html += "</div>";

    // PONTOZĂ“ SĂVOK (KohĂ©ziĂł)
    var coheScore = report.cohesion_score || 0;
    var coheColor = coheScore > 75 ? '#28a745' : (coheScore > 50 ? '#f39c12' : '#dc3545');
    html += "<div style='margin-bottom: 10px;'>";
    html += "<strong>Logikai KohĂ©ziĂł Ă©s StĂ­lus:</strong> <span style='float:right; font-weight:bold; color:" + coheColor + "'>" + coheScore + "/100</span>";
    html += "<div style='width: 100%; background-color: #e9ecef; border-radius: 4px; overflow: hidden; height: 15px; margin-top: 5px;'>";
    html += "  <div style='height: 100%; width: " + coheScore + "%; background-color: " + coheColor + ";'></div>";
    html += "</div></div>";

    // PONTOZĂ“ SĂVOK (FelĂĽtĂ©s/Hook)
    var hookScore = report.hook_score || 0;
    var hookColor = hookScore > 75 ? '#28a745' : (hookScore > 50 ? '#f39c12' : '#dc3545');
    html += "<div style='margin-bottom: 15px;'>";
    html += "<strong>FelĂĽtĂ©s (FigyelemfelkeltĂ©s):</strong> <span style='float:right; font-weight:bold; color:" + hookColor + "'>" + hookScore + "/100</span>";
    html += "<div style='width: 100%; background-color: #e9ecef; border-radius: 4px; overflow: hidden; height: 15px; margin-top: 5px;'>";
    html += "  <div style='height: 100%; width: " + hookScore + "%; background-color: " + hookColor + ";'></div>";
    html += "</div></div>";

    // FANFIC RIASZTĂS
    if (report.is_fanfic) {
        html += "<div style='margin-bottom: 15px; padding: 10px; border: 1px solid #ff9800; background-color: #fff3e0; border-radius: 5px; color: #d84315;'>";
        html += "<strong><i class='fas fa-exclamation-triangle'></i> Fanfic GYANĂš!</strong> A tĂ¶rtĂ©net valĂłszĂ­nĹ±leg egy ismert szellemi termĂ©khez kĂ¶tĹ‘dik.";
        html += "</div>";
    }

    html += "<h4>đź“ť Ă–sszefoglalĂł:</h4>";
    html += "<p style='font-style: italic; border-left: 3px solid #8e44ad; padding-left: 10px; color: #555;'>" + (report.summary || 'Nincs Ă¶sszefoglalĂł.') + "</p>";

    html += "<h4>âš–ď¸Ź Kritikai VisszajelzĂ©s:</h4>";
    html += "<p>" + (report.feedback || 'Nincs visszajelzĂ©s.') + "</p>";

    document.getElementById('papat-report-content').innerHTML = html;
    var modal = document.getElementById('papat-report-modal');
    if (modal) modal.style.display = 'flex';
}

function closePapatReportModal() {
    var modal = document.getElementById('papat-report-modal');
    if (modal) modal.style.display = 'none';
}

console.log("EOF");


// === KOCSMAI HIRDETOTABLA ===
function openNoticeBoard() {
    var modal = document.getElementById('notice-board-modal');
    if(modal) modal.style.display = 'flex';
    var boardDiv = document.getElementById('notice-board-content');
    if(boardDiv) boardDiv.innerHTML = '<p style="color: #f5deb3; text-align: center; width: 100%; font-size: 1.2em;"><i class="fas fa-spinner fa-spin"></i> A pultosfiĂş Ă©pp szĂ¶geli fel az Ăşj papĂ­rokat...</p>';

    if (typeof callBackend === 'function') {
        callBackend("getNoticeBoardData", [], function(response) {
            if (response && response.success && response.data) {
                renderNoticeBoard(response.data);
            } else {
                if(boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">A szĂ©l lefĂşjta az Ă¶sszes papĂ­rt. (Hiba: ' + (response ? response.error : 'Nincs vĂˇlasz') + ')</p>';
            }
        });
    } else {
        if(boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">HĂˇlĂłzati hiba: A backend nem elĂ©rhetĹ‘.</p>';
    }
}

function renderNoticeBoard(data) {
    var boardDiv = document.getElementById('notice-board-content');
    if(!boardDiv) return;
    boardDiv.innerHTML = '';

    // 1. WANTED PlakĂˇtok
    if (data.wanted && data.wanted.length > 0) {
        data.wanted.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #e0d8b0; padding: 15px; width: 220px; border: 2px dashed #8b4513; box-shadow: 2px 2px 8px rgba(0,0,0,0.7); transform: rotate(" + (Math.random() * 8 - 4) + "deg); position: relative; font-family: 'Courier New', monospace;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: silver; font-size: 1.5em; text-shadow: 1px 1px 2px black;">đź—ˇď¸Ź</div>' +
                             '<h3 style="margin: 10px 0 5px 0; color: black; text-align: center; font-size: 1.8em; letter-spacing: 2px; font-weight: 900;">WANTED</h3>' +
                             '<p style="text-align: center; margin-bottom: 10px;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Skull_and_crossbones.svg/120px-Skull_and_crossbones.svg.png" style="width:60px; opacity: 0.8; filter: sepia(1);"></p>' +
                             '<p style="font-weight: bold; text-align: center; font-size: 1.2em; margin-bottom: 5px; color: #8b0000; text-transform: uppercase;">' + item.name + '</p>' +
                             '<p style="text-align: center; margin-bottom: 10px; font-size: 0.85em; color: #333;"><b>BĹ±ntette:</b><br>' + item.crime + '</p>' +
                             '<h4 style="text-align: center; color: black; margin-bottom: 0; background: rgba(0,0,0,0.1); padding: 5px; border-radius: 3px;">VĂ©rdĂ­j: ' + item.bounty + ' Kr</h4>';
            boardDiv.appendChild(card);
        });
    }

    // 2. Priori ĂšjdonsĂˇgok
    if (data.priori && data.priori.length > 0) {
        data.priori.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #fdf5e6; padding: 15px; width: 220px; border: 1px solid #d2b48c; box-shadow: 2px 2px 5px rgba(0,0,0,0.5); transform: rotate(" + (Math.random() * 6 - 3) + "deg); position: relative; font-family: 'Georgia', serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: #8b0000; font-size: 1.5em; text-shadow: 1px 1px 1px #000;">đź“Ś</div>' +
                             '<h4 style="margin: 10px 0 10px 0; color: #8b4513; text-align: center; font-family: \'Pirata One\', cursive; font-size: 1.5em; border-bottom: 1px solid #d2b48c; padding-bottom: 5px;">ĂšjdonsĂˇg a KikĂ¶tĹ‘ben!</h4>' +
                             '<p style="font-size: 0.85em; margin: 0 0 10px 0; text-align: center; color: #666;">' + item.date + '</p>' +
                             '<p style="font-weight: bold; text-align: center; margin-bottom: 5px; color: #2c1a0b; font-size: 1.1em;">' + item.title + '</p>' +
                             '<p style="font-style: italic; text-align: center; margin-bottom: 15px; color: #5c3a21;">SzerzĹ‘: ' + item.author + '</p>' +
                             '<p style="text-align: center; color: #1b5e20; font-weight: bold; font-size: 1.1em; background: rgba(27,94,32,0.1); padding: 5px; border-radius: 3px;">Ăr: ' + item.price + ' Kr</p>';
            boardDiv.appendChild(card);
        });
    }

    // 3. Kalandmodulok (Jobs)
    if (data.jobs && data.jobs.length > 0) {
        data.jobs.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #f0ebd8; padding: 15px; width: 220px; border: 2px solid #3e2723; box-shadow: 2px 2px 6px rgba(0,0,0,0.6); transform: rotate(" + (Math.random() * 6 - 3) + "deg); position: relative; font-family: 'Georgia', serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 10px; color: gold; font-size: 1.5em; text-shadow: 1px 1px 1px #000;">đź“Ś</div>' +
                             '<h4 style="margin: 10px 0 10px 0; color: #1b5e20; text-align: center; font-family: \'Pirata One\', cursive; font-size: 1.5em; border-bottom: 1px solid #ccc; padding-bottom: 5px;"><i class="fas fa-scroll"></i> KĂĽldetĂ©s!</h4>' +
                             '<p style="font-weight: bold; text-align: center; margin-bottom: 15px; font-size: 1.1em; color: #3e2723;">' + item.title + '</p>' +
                             '<p style="font-size: 0.9em; margin-bottom: 5px; color: #4e342e;"><strong>Keresnek:</strong><br>' + item.specialists + '</p>' +
                             '<p style="font-size: 0.9em; margin-bottom: 10px; color: #8b0000;"><strong>VeszĂ©ly:</strong> ' + item.danger + '</p>' +
                             '<p style="text-align: center; color: #1b5e20; font-style: italic; font-size: 0.85em; margin-bottom: 5px;">(Jelentkezz a csaposnĂˇl!)</p>' +
                             '<p style="text-align: center; color: #b71c1c; font-weight: bold; font-size: 1.1em; background: rgba(183,28,28,0.1); padding: 5px; border-radius: 3px;">Jutalom: ' + item.reward + '</p>';
            boardDiv.appendChild(card);
        });
    }

    // 4. PletykĂˇk (Gossip)
    if (data.gossip && data.gossip.length > 0) {
        data.gossip.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #fffafa; padding: 15px; width: 220px; border: 1px solid #ccc; box-shadow: 2px 2px 4px rgba(0,0,0,0.4); transform: rotate(" + (Math.random() * 8 - 4) + "deg); position: relative; font-family: 'Comic Sans MS', cursive, sans-serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; right: 10px; color: #555; font-size: 1.5em; transform: rotate(45deg);">đź“Ž</div>' +
                             '<h4 style="margin: 5px 0 10px 0; color: #4b0082; text-align: left; font-size: 1.1em;"><i class="fas fa-comment-dots"></i> Hallottad...?</h4>' +
                             '<p style="font-size: 0.9em; text-align: left; margin-bottom: 15px; color: #333; line-height: 1.4;"><i>' + item.text + '</i></p>' +
                             '<p style="text-align: right; font-size: 0.8em; color: #666; font-style: italic;">- ' + item.npc + '</p>';
            boardDiv.appendChild(card);
        });
    }

    if (boardDiv.innerHTML === '') {
        boardDiv.innerHTML = '<p style="color: #f5deb3; text-align: center; width: 100%; font-size: 1.5em; font-family: \'Pirata One\', cursive;">A tĂˇbla jelenleg kong az ĂĽressĂ©gtĹ‘l...</p>';
    }
}

function reloadCopiesPage() {
    var modal = document.getElementById('universal-npc-modal');
    if (modal) modal.style.display = 'none';
    if (typeof updateCreditDisplay === 'function') updateCreditDisplay();
    loadPage('masolatok_oldal');
}

// --- TOBORZĂ“BARAKK LOGIKA ---

function openToborzoBarakk() {
    // UI Initialization
    document.getElementById('toborzo-modal').style.display = 'flex';
    document.getElementById('toborzo-loading').style.display = 'flex';
    switchToborzoTab('munkavallalo');

    // Fetch initial data
    callBackend('getToborzoData', [], 
        function(data) {
            document.getElementById('toborzo-loading').style.display = 'none';
            if (data.success) {
                // Populate Worker Tab
                if (data.playerStatus) {
                    document.getElementById('toborzo-status-select').value = data.playerStatus.status || "Keresek munkĂˇt";
                    document.getElementById('toborzo-role-select').value = data.playerStatus.role || "";
                }

                // Populate Captain Tab
                window.toborzoOwnedShips = data.ownedShips || [];
                window.toborzoAvailableCrew = data.availableCrew || [];
                const myshipsSelect = document.getElementById('toborzo-myships-select');
                myshipsSelect.innerHTML = '<option value="">Nincs kivĂˇlasztott hajĂł</option>';
                window.toborzoOwnedShips.forEach(ship => {
                    const opt = document.createElement('option');
                    opt.value = ship.id;
                    opt.textContent = ship.name + (ship.inHarbor ? "" : " (ExpedĂ­ciĂłn)");
                    opt.disabled = !ship.inHarbor;
                    myshipsSelect.appendChild(opt);
                });
                renderSelectedShipCrew(); // clear details
            } else {
                uiAlert('Hiba az adatok lekĂ©rdezĂ©sekor: ' + (data.error || 'Ismeretlen hiba'));
            }
        },
        function(err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert('HĂˇlĂłzati hiba a ToborzĂłbarakk lekĂ©rdezĂ©sekor: ' + err.message);
        }
    );
}

function switchToborzoTab(tab) {
    document.getElementById('toborzo-tab-munkavallalo').style.display = (tab === 'munkavallalo') ? 'block' : 'none';
    document.getElementById('toborzo-tab-kapitany').style.display = (tab === 'kapitany') ? 'block' : 'none';
    
    document.getElementById('tab-btn-munkavallalo').style.background = (tab === 'munkavallalo') ? 'var(--color-gold)' : '#bdbdbd';
    document.getElementById('tab-btn-kapitany').style.background = (tab === 'kapitany') ? 'var(--color-gold)' : '#bdbdbd';
}

function hasRequiredRank(playerRank, role) {
    var rankHierarchy = [
      '4. osztĂˇlyĂş kalĂłz', '3. osztĂˇlyĂş kalĂłz', '2. osztĂˇlyĂş kalĂłz', '1. osztĂˇlyĂş kalĂłz',
      'AlhajĂłmester', 'TĂ¶rzshajĂłmester', 'TĂ¶rzsfĹ‘hajĂłmester',
      'TengerĂ©sz-hadaprĂłd', 'Korvetthadnagy', 'Fregatthadnagy', 'SorhajĂłhadnagy',
      'KorvettkapitĂˇny', 'FregattkapitĂˇny', 'SorhajĂłkapitĂˇny',
      'Ellentengernagy', 'Altengernagy', 'Tengernagy', 'FĹ‘tengernagy'
    ];
    var szakmaiTisztek = ['HajĂłorvos', 'HajĂłszakĂˇcs', 'TĂ©rkĂ©prajzolĂł', 'Tekercsmester', 'FelfedezĹ‘', 'Letmester', 'Monk'];
    var parancsnokiTisztek = ['NavigĂˇtor', 'KormĂˇnyos', 'Vitorlamester', 'FedĂ©lzetmester', 'GĂ©pĂ©sz'];
    
    var playerIdx = rankHierarchy.indexOf(playerRank);
    if (playerIdx === -1) playerIdx = 0; // fallback
    
    var requiredIdx = 0;
    if (role === 'KapitĂˇny') {
        requiredIdx = 11;
    } else if (parancsnokiTisztek.indexOf(role) !== -1) {
        requiredIdx = 7;
    } else if (szakmaiTisztek.indexOf(role) !== -1) {
        requiredIdx = 4;
    }
    
    return playerIdx >= requiredIdx;
}

function savePlayerJobStatus() {
    const status = document.getElementById('toborzo-status-select').value;
    const role = document.getElementById('toborzo-role-select').value;
    const costInput = document.getElementById('toborzo-cost-input');
    const cost = costInput ? (parseInt(costInput.value, 10) || 10) : 10;
    
    if (status === 'Keresek munkĂˇt' && !role) {
        uiAlert("KĂ©rlek, vĂˇlassz ki egy keresett pozĂ­ciĂłt!");
        return;
    }

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('updatePlayerJobStatus', [status, role, cost], 
        function(data) {
            document.getElementById('toborzo-loading').style.display = 'none';
            if (data.success) {
                uiAlert("StĂˇtuszod sikeresen mentve! A kapitĂˇnyok mostantĂłl lĂˇthatjĂˇk a faliĂşjsĂˇgon.");
            } else {
                uiAlert("Hiba a mentĂ©s sorĂˇn: " + data.error);
            }
        },
        function(err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("HĂˇlĂłzati hiba: " + err.message);
        }
    );
}

function renderSelectedShipCrew() {
    var select = document.getElementById('toborzo-myships-select');
    var detailsDiv = document.getElementById('toborzo-myship-details');
    var rolesContainer = document.getElementById('toborzo-myship-roles');
    var shipNameSpan = document.getElementById('toborzo-selected-ship-name');
    
    if (!select.value) {
        detailsDiv.style.display = 'none';
        if (shipNameSpan) shipNameSpan.textContent = '';
        return;
    }

    var ship = window.toborzoOwnedShips.find(function(s) { return s.id === select.value; });
    if (!ship) return;

    if (shipNameSpan) shipNameSpan.textContent = ship.name;

    detailsDiv.style.display = 'block';
    rolesContainer.innerHTML = '';

    var formDiv = document.createElement('div');
    formDiv.id = 'bulk-crew-form';
    
    var allRoles = [
        "KapitĂˇny", "NavigĂˇtor", "KormĂˇnyos", "Vitorlamester", "FedĂ©lzetmester", 
        "TĂĽzĂ©r", "HajĂłorvos", "HajĂłszakĂˇcs", "TĂ©rkĂ©prajzolĂł", 
        "Tekercsmester", "FelfedezĹ‘", "GĂ©pĂ©sz", "HajĂłĂˇcs", 
        "Letmester", "Monk", "TengerĂ©sz"
    ];
    
    var availableCrew = window.toborzoAvailableCrew || []; 
    var sortedCrew = availableCrew.slice().sort(function(a, b) { return a.name.localeCompare(b.name); });
    
    allRoles.forEach(function(role) {
        var isSingle = (role !== 'TengerĂ©sz');
        var currentEmails = ship.crew[role] ? ship.crew[role].split(',').map(function(e) { return e.trim().toLowerCase(); }).filter(function(e) { return e; }) : [];
        
        var rowDiv = document.createElement('div');
        rowDiv.style.cssText = 'display: flex; flex-direction: column; padding: 10px; border-bottom: 1px dashed #ccc; background: #fafafa; border-radius: 4px; margin-bottom: 8px;';
        
        var roleHeader = document.createElement('div');
        roleHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';
        
        var roleLabel = document.createElement('strong');
        roleLabel.style.color = '#1f0901';
        roleLabel.innerHTML = '<i class="fas fa-user-tag" style="color: var(--color-gold);"></i> ' + role + (isSingle ? ' <span style="font-size:0.8em; color:#888;">(1 fĹ‘)</span>' : ' <span style="font-size:0.8em; color:#888;">(TĂ¶bb fĹ‘)</span>');
        
        roleHeader.appendChild(roleLabel);
        rowDiv.appendChild(roleHeader);
        
        // Dropdown kontĂ©ner a kijelĂ¶lĂ©shez
        var customSelectContainer = document.createElement('div');
        customSelectContainer.style.cssText = 'position: relative; width: 100%; border: 1px solid #aaa; border-radius: 4px; background: white;';
        
        var selectHeader = document.createElement('div');
        selectHeader.style.cssText = 'padding: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 0.9em; color: #555;';
        
        var currentNamesHtml = "--- Ăśres ---";
        if (currentEmails.length > 0) {
            var namesArr = currentEmails.map(function(e) {
                var match = availableCrew.find(function(c) { return c.email.toLowerCase() === e; });
                return match ? match.name : e;
            });
            currentNamesHtml = '<span style="color:#1b5e20; font-weight:bold;">' + namesArr.join(', ') + '</span>';
        }
        
        selectHeader.innerHTML = '<span>' + currentNamesHtml + '</span> <i class="fas fa-chevron-down"></i>';
        
        var optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #aaa; z-index: 10; max-height: 200px; overflow-y: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        optionsContainer.className = 'bulk-options-container';
        
        selectHeader.onclick = function(e) {
            e.stopPropagation();
            var isVisible = optionsContainer.style.display === 'block';
            document.querySelectorAll('.bulk-options-container').forEach(function(el) { el.style.display = 'none'; });
            optionsContainer.style.display = isVisible ? 'none' : 'block';
        };

        // Checkbox logika
        optionsContainer.addEventListener('change', function(e) {
            if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                if (isSingle && e.target.checked) {
                    var allCbs = optionsContainer.querySelectorAll('input[type="checkbox"]');
                    allCbs.forEach(function(cb) {
                        if (cb !== e.target) cb.checked = false;
                    });
                }
                
                // CĂ­msor frissĂ­tĂ©se
                var checkedCbs = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
                if (checkedCbs.length === 0) {
                    selectHeader.innerHTML = '<span>--- Ăśres ---</span> <i class="fas fa-chevron-down"></i>';
                } else {
                    var nArr = [];
                    checkedCbs.forEach(function(cb) { nArr.push(cb.getAttribute('data-name')); });
                    selectHeader.innerHTML = '<span><span style="color:#1b5e20; font-weight:bold;">' + nArr.join(', ') + '</span></span> <i class="fas fa-chevron-down"></i>';
                }
            }
        });

        // HozzĂˇadjuk az Ă¶sszes elĂ©rhetĹ‘ jĂˇtĂ©kost, akik ehhez a hajĂłhoz kijelĂ¶lhetĹ‘k
        var optionAdded = false;
        
        // Akik mĂˇr ezen a pozĂ­ciĂłn vannak
        currentEmails.forEach(function(currEmail) {
            var cMatch = availableCrew.find(function(c) { return c.email.toLowerCase() === currEmail; });
            var dName = cMatch ? cMatch.name : currEmail;
            var label = document.createElement('label');
            label.style.cssText = 'display: block; padding: 5px 8px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 0.9em; background: #e8f5e9;';
            label.innerHTML = '<input type="checkbox" value="' + currEmail + '" data-role="' + role + '" data-name="' + dName + '" checked> <strong>' + dName + '</strong>';
            optionsContainer.appendChild(label);
            optionAdded = true;
        });

        // Akik szabadok (nincsenek ezen a pozĂ­ciĂłn, de nincsenek mĂˇshol sem a hajĂłn - VAGY ha mĂˇshol vannak, az szerveroldalon ki lesz szĹ±rve, de itt mindent mutatunk)
        sortedCrew.forEach(function(player) {
            if (currentEmails.includes(player.email.toLowerCase())) return;
            if (player.isBusy) return; // SKIP BUSY PLAYERS
            
            // KiszĹ±rjĂĽk azokat, akiknek nincs meg a megfelelĹ‘ rangjuk
            if (!hasRequiredRank(player.rank, role)) return;
            
            var label = document.createElement('label');
            label.style.cssText = 'display: block; padding: 5px 8px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 0.9em;';
            label.innerHTML = '<input type="checkbox" value="' + player.email + '" data-role="' + role + '" data-name="' + player.name + '"> ' + player.name + ' <span style="color:#888; font-size:0.8em;">(' + (player.rank || '') + ')</span>';
            optionsContainer.appendChild(label);
            optionAdded = true;
        });

        if (!optionAdded) {
            var noMore = document.createElement('div');
            noMore.style.cssText = 'padding: 8px; color: #888; font-style: italic;';
            noMore.innerText = 'Nincs felbĂ©relhetĹ‘ tag.';
            optionsContainer.appendChild(noMore);
        }

        customSelectContainer.appendChild(selectHeader);
        customSelectContainer.appendChild(optionsContainer);
        
        rowDiv.appendChild(customSelectContainer);
        formDiv.appendChild(rowDiv);
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.bulk-options-container') && !e.target.closest('div[style*="cursor: pointer"]')) {
            document.querySelectorAll('.bulk-options-container').forEach(function(el) { el.style.display = 'none'; });
        }
    });

    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn';
    submitBtn.style.cssText = 'width: 100%; padding: 12px; background: var(--color-primary); color: white; border: 2px solid var(--color-gold); font-size: 1.1em; font-weight: bold; margin-top: 15px; border-radius: 4px; cursor: pointer; transition: 0.2s;';
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> KijelĂ¶ltek FelĂ­rĂˇsa (OK)';
    submitBtn.onmouseover = function() { submitBtn.style.background = '#3e2723'; };
    submitBtn.onmouseout = function() { submitBtn.style.background = 'var(--color-primary)'; };
    submitBtn.onclick = function() { submitBulkCrewAssignment(ship.id); };

    rolesContainer.appendChild(formDiv);
    rolesContainer.appendChild(submitBtn);
}

function submitBulkCrewAssignment(shipId) {
    var assignmentsMap = {
        "KapitĂˇny": [], "NavigĂˇtor": [], "KormĂˇnyos": [], "Vitorlamester": [], "FedĂ©lzetmester": [], 
        "TĂĽzĂ©r": [], "HajĂłorvos": [], "HajĂłszakĂˇcs": [], "TĂ©rkĂ©prajzolĂł": [], 
        "Tekercsmester": [], "FelfedezĹ‘": [], "GĂ©pĂ©sz": [], "HajĂłĂˇcs": [], 
        "Letmester": [], "Monk": [], "TengerĂ©sz": []
    };
    
    var checkboxes = document.querySelectorAll('#bulk-crew-form input[type="checkbox"]');
    var seenEmails = {};
    var hasDuplicates = false;
    
    for (var i = 0; i < checkboxes.length; i++) {
        var cb = checkboxes[i];
        if (cb.checked) {
            var role = cb.getAttribute('data-role');
            var val = cb.value;
            if (val) {
                if (seenEmails[val]) {
                    hasDuplicates = true;
                }
                seenEmails[val] = true;
                assignmentsMap[role].push(val);
            }
        }
    }

    if (hasDuplicates) {
        if (typeof uiAlert === 'function') {
            uiAlert("Egy kalĂłz egyszerre csak EGY pozĂ­ciĂłt tĂ¶lthet be a hajĂłn! KĂ©rlek javĂ­tsd a kijelĂ¶lĂ©st.");
        } else {
            alert("Egy kalĂłz egyszerre csak EGY pozĂ­ciĂłt tĂ¶lthet be a hajĂłn! KĂ©rlek javĂ­tsd a kijelĂ¶lĂ©st.");
        }
        return;
    }

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('saveBulkCrewAssignment', [shipId, assignmentsMap], 
        function(data) {
            if (data.success) {
                uiAlert(data.message || "A legĂ©nysĂ©g beosztĂˇsa sikeresen frissĂ­tve!", "Siker");
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba: " + data.error);
            }
        },
        function(err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("HĂˇlĂłzati hiba: " + err.message);
        }
    );
}

function assignToRole(shipId, role) {
    var targetEmail = prompt("Kit szeretnĂ©l beosztani a(z) " + role + " pozĂ­ciĂłra ezen a hajĂłn?\\n\\nĂŤrd be a zsoldos/jĂˇtĂ©kos email cĂ­mĂ©t. Ha SAJĂT MAGADAT akarod beosztani, hagyd ĂĽresen a mezĹ‘t!", "");
    
    if (targetEmail === null) return;

    var crewEmail = (targetEmail.trim() === "") ? 'self' : targetEmail.trim();

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('assignCrewToOwnedShip', [shipId, role, crewEmail], 
        function(data) {
            if (data.success) {
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba: " + data.error);
            }
        },
        function(err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("Hiba: " + err.message);
        }
    );
}

function removeRole(shipId, roleToClear, specificEmail) {
    var msg = specificEmail ? "Biztosan ki akarod rĂşgni ezt a szemĂ©lyt: " + specificEmail + "?" : "Biztosan ki akarod rĂşgni a(z) " + roleToClear + " pozĂ­ciĂłn lĂ©vĹ‘ Ă¶sszes szemĂ©lyt?";
    if (!confirm(msg)) return;

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('removeRole', [shipId, roleToClear, specificEmail], 
        function(data) {
            if (data.success) {
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba a kirĂşgĂˇs sorĂˇn: " + data.error);
            }
        },
        function(err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("HĂˇlĂłzati hiba: " + err.message);
        }
    );
}


function tryGoToDeck() {
    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('getUserShips', [], 
        function(response) {
            if (loading) loading.style.display = 'none';
            if (response.success) {
                if (response.ships && response.ships.length > 0) {
                    window.userShips = response.ships; // MentsĂĽk el a frontendnek
                    loadPage('fedelzet_oldal');
                } else {
                    uiAlert("MĂ©g egy rozzant tutajod sincs, hova akarsz felszĂˇllni?! Jelentkezz egy hajĂłra a ToborzĂłbarakkban vagy vĂˇsĂˇrolj egyet a HajĂłmĹ±helyben!", "Nincs hajĂłd!");
                }
            } else {
                uiAlert("Hiba a hajĂłk lekĂ©rdezĂ©sekor: " + response.error);
            }
        },
        function(err) {
            if (loading) loading.style.display = 'none';
            uiAlert("HĂˇlĂłzati hiba: " + err.message);
        }
    );
}




