// ======================================================================
// FÜGGVÉNYDEFINÍCIÓK - Globális térben, minden oldal számára elérhető
// ======================================================================

const BUCKET_URL = 'https://storage.googleapis.com/kalozsziget-assets/hic_assets';

// Manuálisan összeállított szótár a kódban lévő azonosítókhoz és a nyers fájlnevekhez
const ASSET_MAP = {
    'logo': 'logo.png',
    'kaloz_sziget_fejlec': 'ebookpirates_harbour1.jpg', // kikötő háttere
    'dark_wood': 'dark-wood.png',
    'soft_wallpaper': 'soft-wallpaper.png',
    'vilagterkep': 'vilagterkep.png',
    
    // Tengerészeti rangok (közelítőleges megfeleltetés a letöltött fájlok alapján)
    'rang_matroz_4': 'KUK-Navy-Seekadett.svg',
    'rang_matroz_3': 'KUK-Navy-Maate.svg.png',
    'rang_matroz_2': 'KUK-Navy-Geschützvormeister_1._Klasse.svg.png',
    'rang_matroz_1': 'KUK-Navy-Geschützgast.svg.png',
    'rang_alhajomester': 'KUK-Navy-Korvettenkapitän.svg',
    'rang_torzshajomester': 'KUK-Navy-Fregattenkapitän.svg',
    'rang_torzsfohajomester': 'KUK-Navy-Linienschiffskapitän.svg',
    'rang_hadaprod': 'Generic-Navy-2.svg',
    'rang_korvetthadnagy': 'Generic-Navy-4.svg',
    'rang_fregatthadnagy': 'Generic-Navy-6.svg',
    'rang_sorhajohadnagy': 'KUK-Navy-Konteradmiral.svg',
    'rang_korvettkapitany': 'KUK-Navy-Vizeadmiral.svg',
    'rang_fregattkapitany': 'KUK-Navy-Admiral.svg',
    'rang_sorhajokapitany': 'KUK-Navy-Großadmiral.svg',
    'rang_ellentengernagy': 'KUK-Navy-Großadmiral.svg',
    'rang_altengernagy': 'KUK-Navy-Großadmiral.svg',
    'rang_tengernagy': 'KUK-Navy-Großadmiral.svg',
    'rang_fotengernagy': 'KUK-Navy-Großadmiral.svg'
};

function getAssetUrl(assetId) {
    if (ASSET_MAP[assetId]) {
        return `${BUCKET_URL}/${ASSET_MAP[assetId]}`;
    }
    return `${BUCKET_URL}/${assetId}.jpg`;
}

function loadImage(assetId, elementId, isBackground = false) {
    if (!assetId || !elementId) return;

    const element = document.getElementById(elementId);
    if (element) {
        const url = getAssetUrl(assetId);
        if (isBackground) {
            element.style.backgroundImage = `url('${url}')`;
        } else {
            element.src = url;
        }
    }
}

// ======================================================================
// OLDALBETÖLTŐDÉS UTÁNI ESEMÉNYEK
// ======================================================================
document.addEventListener("DOMContentLoaded", function() {

    // Sima görgetés az oldalon belüli linkekhez
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ELLENŐRIZZÜK, HOGY AZ INDEX OLDALON VAGYUNK-E
    if (document.getElementById('public-logo')) {
        
        const initialImages = {
            'logo': { elementId: 'public-logo', isBackground: false },
            'kaloz_sziget_fejlec': { elementId: 'kikoto', isBackground: true },
            'dark_wood': { elementId: 'document-body', isBackground: true },
            'soft_wallpaper': { elementClasses: ['.item-wrapper', '.accordion-body'], isBackground: true },
            'rang_matroz_4': { elementId: 'rang_matroz_4', isBackground: false },
            'rang_matroz_3': { elementId: 'rang_matroz_3', isBackground: false },
            'rang_matroz_2': { elementId: 'rang_matroz_2', isBackground: false },
            'rang_matroz_1': { elementId: 'rang_matroz_1', isBackground: false },
            'rang_alhajomester': { elementId: 'rang_alhajomester', isBackground: false },
            'rang_torzshajomester': { elementId: 'rang_torzshajomester', isBackground: false },
            'rang_torzsfohajomester': { elementId: 'rang_torzsfohajomester', isBackground: false },
            'rang_hadaprod': { elementId: 'rang_hadaprod', isBackground: false },
            'rang_korvetthadnagy': { elementId: 'rang_korvetthadnagy', isBackground: false },
            'rang_fregatthadnagy': { elementId: 'rang_fregatthadnagy', isBackground: false },
            'rang_sorhajohadnagy': { elementId: 'rang_sorhajohadnagy', isBackground: false },
            'rang_korvettkapitany': { elementId: 'rang_korvettkapitany', isBackground: false },
            'rang_fregattkapitany': { elementId: 'rang_fregattkapitany', isBackground: false },
            'rang_sorhajokapitany': { elementId: 'rang_sorhajokapitany', isBackground: false },
            'rang_ellentengernagy': { elementId: 'rang_ellentengernagy', isBackground: false },
            'rang_altengernagy': { elementId: 'rang_altengernagy', isBackground: false },
            'rang_tengernagy': { elementId: 'rang_tengernagy', isBackground: false },
            'rang_fotengernagy': { elementId: 'rang_fotengernagy', isBackground: false }
        };

        document.body.id = 'document-body';

        for (const [assetId, details] of Object.entries(initialImages)) {
            if (details.elementId) {
                loadImage(assetId, details.elementId, details.isBackground);
            } else if (details.elementClasses) {
                const url = getAssetUrl(assetId);
                details.elementClasses.forEach(className => {
                    document.querySelectorAll(className).forEach(el => {
                        el.style.backgroundImage = `url('${url}')`;
                    });
                });
            }
        }

        // Csapattagok animációjának kezelése (Közvetlen betöltés a Bucketből!)
        const teamImages = document.querySelectorAll('img[data-static-id]');
        teamImages.forEach(img => {
            const staticId = img.dataset.staticId; // Pl. betti_kaloz
            
            // Jelenlegi statikus JPG beállítása
            img.src = `${BUCKET_URL}/${staticId}.jpg`;
            
            // Animált GIF betöltése a memóriába
            const animatedImage = new Image();
            animatedImage.src = `${BUCKET_URL}/${staticId}.gif`;

            img.addEventListener('mouseover', function() {
                if (animatedImage.complete) {
                    this.src = animatedImage.src;
                }
            });
            img.addEventListener('mouseout', function() {
                this.src = `${BUCKET_URL}/${staticId}.jpg`;
            });
        });
    }

    initializeKerdesbekuldoPage();

});

function initializeKerdesbekuldoPage() {
    const submitBtn = document.getElementById('submit-question-btn');
    if (!submitBtn) return;

    submitBtn.onclick = function() {
        const emailInput = document.getElementById('submitter-email');
        const email = emailInput.value;
        const feedbackDiv = document.getElementById('question-feedback-message');
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedbackDiv.textContent = 'Kérlek, adj meg egy érvényes e-mail címet!';
            feedbackDiv.style.color = 'red';
            emailInput.focus();
            return;
        }

        const formData = {
            question: document.getElementById('new-question-text').value,
            correctAnswer: document.getElementById('new-correct-answer').value,
            alt1: document.getElementById('new-alt-1').value,
            alt2: document.getElementById('new-alt-2').value,
            alt3: document.getElementById('new-alt-3').value,
            email: email
        };
        
        feedbackDiv.textContent = 'Beküldés folyamatban...';
        feedbackDiv.style.color = 'var(--szin-cim)';
        submitBtn.disabled = true;

        // CSERÉLD LE EZT A VALÓDI BACKEND URL-RE:
        const API_URL = 'https://script.google.com/macros/s/IDE_JON_A_VALODI_WEBAPP_URL/exec';

        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
               action: 'submitNewQuestion',
               data: formData
            })
        }).then(res => res.json())
          .then(response => {
              feedbackDiv.textContent = response.message || 'Sikeres beküldés!';
              feedbackDiv.style.color = 'green';
              submitBtn.disabled = false;
              
              document.getElementById('new-question-text').value = '';
              document.getElementById('new-correct-answer').value = '';
              document.getElementById('new-alt-1').value = '';
              document.getElementById('new-alt-2').value = '';
              document.getElementById('new-alt-3').value = '';
              emailInput.value = '';
          }).catch(err => {
              feedbackDiv.textContent = 'Súlyos hiba: Hálózati hiba.';
              feedbackDiv.style.color = 'red';
              submitBtn.disabled = false;
          });
    };
}