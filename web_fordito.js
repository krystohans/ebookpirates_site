/**
 * web_fordito.js
 * A kliens oldali többnyelvűsítés motorja.
 * * Működés elve:
 * 1. Betöltéskor megnézi a localStorage-t vagy alapértelmezett 'hu'-t használ.
 * 2. A 'translations' objektumból kikeresi a szövegeket.
 * 3. Kicseréli a HTML-ben a [data-lang] attribútummal ellátott elemek tartalmát.
 */

// 1. KONFIGURÁCIÓ ÉS ÁLLAPOT
// ----------------------------------------------------------------

// A kiválasztott nyelv betöltése (alapértelmezett: magyar)
var currentLang = localStorage.getItem('siteLang') || 'hu';

// 2. A SZÓTÁR (Translations Object)
// ----------------------------------------------------------------
// IDE KELL MAJD BEÍRNOD A TÖBBI SZÖVEGET IS!
const translations = {
    'hu': {
        // --- Általános ---
        'app_title': 'Kalóz Portál',
        'login_btn': 'Bejelentkezés',
        'loading': 'Betöltés...',
        'welcome_msg': 'Üdvözöllek a fedélzeten!',

        // --- Hibaüzenetek (JavaScriptből használva) ---
        'error_auth': 'Jelentkezz be a folytatáshoz!',
        'success_save': 'Sikeres mentés!',

        // --- Játék Lore (Fontos a pontos fordítás!) ---
        'role_scroll_master': 'Tekercsmester',
        'item_map': 'Térkép'
        
        // ... IDE JÖHET A TÖBBI 1000 SOR ...
    },
    'en': {
        // --- General ---
        'app_title': 'Pirate Portal',
        'login_btn': 'Login',
        'loading': 'Loading...',
        'welcome_msg': 'Welcome aboard!',

        // --- Error messages ---
        'error_auth': 'Please log in to continue!',
        'success_save': 'Saved successfully!',

        // --- Game Lore ---
        'role_scroll_master': 'Scroll Master',
        'item_map': 'Map'
    }
};

// 3. A MOTOR (Logika)
// ----------------------------------------------------------------

/**
 * Ez a függvény frissíti a felhasználói felületet (UI).
 * Megkeres minden 'data-lang' attribútummal rendelkező elemet a HTML-ben.
 */
function updateLanguageUI() {
    console.log('Nyelv frissítése erre:', currentLang);
    
    // Minden elem megkeresése, aminek van data-lang attribútuma
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-lang');
        
        // Ellenőrizzük, hogy létezik-e a kulcs az aktuális nyelvben
        if (translations[currentLang] && translations[currentLang][key]) {
            
            // Ha input gomb (pl. <input type="button">), akkor a 'value'-t kell cserélni
            if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                element.value = translations[currentLang][key];
            } 
            // Minden más esetben (div, span, p, h1, button) a szöveges tartalmat cseréljük
            else {
                element.innerText = translations[currentLang][key];
            }
        } else {
            console.warn(`Hiányzó fordítás ehhez a kulcshoz (${currentLang}):`, key);
        }
    });

    // Mentés a böngészőbe, hogy frissítésnél megmaradjon a nyelv
    localStorage.setItem('siteLang', currentLang);
    
    // Jelzés a HTML tag-en is (pl. CSS formázáshoz hasznos lehet: html[lang="en"])
    document.documentElement.lang = currentLang;
}

/**
 * Segédfüggvény a JavaScript kódban lévő dinamikus szövegekhez (pl. alert, generált HTML).
 * Használat: alert(t('error_auth'));
 */
function t(key) {
    if (translations[currentLang] && translations[currentLang][key]) {
        return translations[currentLang][key];
    }
    // Ha nincs fordítás, visszaadja a kulcsot, hogy lássuk, mi hiányzik
    return key; 
}

/**
 * Nyelvváltó gomb funkciója.
 * Ezt hívd meg a zászlókra kattintáskor: onclick="switchLanguage('en')"
 */
function switchLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        updateLanguageUI();
    } else {
        console.error('Ismeretlen nyelv:', lang);
    }
}

// 4. INDÍTÁS
// ----------------------------------------------------------------

// Amikor az oldal betöltődött, azonnal futtatjuk a fordítást
document.addEventListener('DOMContentLoaded', () => {
    updateLanguageUI();
});