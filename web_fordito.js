// A kiválasztott nyelv (alapértelmezett: magyar)
var currentLang = localStorage.getItem('siteLang') || 'hu';

const translations = {
    'hu': {
        // Általános
        'app_title': 'Kalóz Portál',
        'login_btn': 'Bejelentkezés',
        'loading': 'Betöltés...',
        'welcome_msg': 'Üdvözöllek a fedélzeten!',
        
        // Hibaüzenetek (JavaScriptből használva)
        'error_auth': 'Jelentkezz be a folytatáshoz!',
        'success_save': 'Sikeres mentés!',
        
        // Játék Lore (Fontos a pontos fordítás!)
        'role_scroll_master': 'Tekercsmester',
        'item_map': 'Térkép'
    },
    'en': {
        // General
        'app_title': 'Pirate Portal',
        'login_btn': 'Login',
        'loading': 'Loading...',
        'welcome_msg': 'Welcome aboard!',
        
        // Error messages
        'error_auth': 'Please log in to continue!',
        'success_save': 'Saved successfully!',
        
        // Game Lore
        'role_scroll_master': 'Scroll Master',
        'item_map': 'Map'
    }
};

/**
 * Ez a függvény fordítja le a HTML elemeket.
 * Megkeres minden 'data-lang' attribútummal rendelkező elemet.
 */
function updateLanguageUI() {
    // 1. HTML elemek cseréje
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[currentLang] && translations[currentLang][key]) {
            // Ha input gomb (value), akkor máshogy kezeljük, mint a sima szöveget
            if (element.tagName === 'INPUT' && element.type === 'button') {
                element.value = translations[currentLang][key];
            } else {
                element.innerText = translations[currentLang][key];
            }
        }
    });

    // Mentés, hogy frissítésnél megmaradjon
    localStorage.setItem('siteLang', currentLang);
    
    // Opcionális: Ha vannak dinamikusan generált listák, azokat újra kell renderelni
    // pl. if (typeof renderLibrary === 'function') renderLibrary();
}

/**
 * Ezt használd a JavaScript kódban lévő szövegekhez (pl. alert, generált HTML)
 * Használat: alert(t('error_auth'));
 */
function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    return key; // Ha nincs fordítás, visszaadja a kulcsot (vagy az eredeti szöveget)
}

/**
 * Nyelvváltó gomb funkciója
 */
function switchLanguage(lang) {
    currentLang = lang;
    updateLanguageUI();
}