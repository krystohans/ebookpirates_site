/**
 * kikoto_fordito.js
 * A kikötőlátkép oldal többnyelvűsítés motorja.
 */

var currentLang = localStorage.getItem('siteLang') || 'hu';

const kikotoTranslations = {
    'hu': {
        'back_to_intro': '« Vissza a bemutatkozó oldalra',
        'kikoto_main_title': 'HEBOK kikötője',
        'kikoto_subtitle': 'Navigálj az egérrel a területek fölé, és kattints a részletekért!',
        
        // Panelek címei
        'title_hajoacs': 'A Hajóács Műhely',
        'title_masolatbolt': 'A Másolatok Boltja',
        'title_tekercsmester': 'A Tekercspréselő Műhely',
        'title_konyvszentely': 'Paideia Könyvszentélye',
        'title_felhokolostor': 'A Felhőkolostor',
        'title_taverna': 'Fogadó a Rózsaszín Gyöngyhöz',
        'title_piac': 'A kikötői piac',
        'title_bank': 'Az eBank Pirates',
        'title_kikoto': 'Dokkolás a kikötőben'
    },
    'en': {
        'back_to_intro': '« Back to introduction page',
        'kikoto_main_title': 'HEBOK Harbor',
        'kikoto_subtitle': 'Hover over the areas with your mouse and click for details!',
        
        'title_hajoacs': 'The Shipwright\'s Workshop',
        'title_masolatbolt': 'The Replica Shop',
        'title_tekercsmester': 'The Scroll Press Workshop',
        'title_konyvszentely': 'Paideia\'s Book Sanctuary',
        'title_felhokolostor': 'The Cloud Monastery',
        'title_taverna': 'Inn of the Pink Pearl',
        'title_piac': 'The Harbor Market',
        'title_bank': 'The eBank Pirates',
        'title_kikoto': 'Docking at the Harbor'
    },
    'de': {},
    'fr': {},
    'es': {},
    'pl': {},
    'ru': {}
};

function tKikoto(key) {
    if (kikotoTranslations[currentLang] && kikotoTranslations[currentLang][key]) {
        return kikotoTranslations[currentLang][key];
    }
    return key;
}

function updateKikotoLanguageUI() {
    // Sima szövegek frissítése
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (kikotoTranslations[currentLang] && kikotoTranslations[currentLang][key]) {
            element.textContent = kikotoTranslations[currentLang][key];
        }
    });

    // Zászlók aktív állapotának frissítése
    document.querySelectorAll('.lang-btn').forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        button.classList.toggle('active', buttonLang === currentLang);
    });
    
    // Frissítjük a tooltipet, ha éppen meg van nyitva
    const tooltip = document.getElementById('terkep-tooltip');
    if (tooltip && tooltip.style.display === 'block') {
        tooltip.style.display = 'none';
    }
}

function bindKikotoLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        const buttonLang = button.getAttribute('data-lang');
        if (!buttonLang) return;

        button.onclick = function() {
            if (kikotoTranslations[buttonLang]) {
                currentLang = buttonLang;
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('siteLang', buttonLang);
                }
                updateKikotoLanguageUI();
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateKikotoLanguageUI();
    bindKikotoLanguageButtons();
});
