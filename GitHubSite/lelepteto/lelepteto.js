var DELETION_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxbliKmT_PpEi8VXztxWIAoNfaJHEaeKAjZl5gwwLkRLsY1x4PdeejtjTTEwLGDx4p_/exec";

// === [#HEX:F.04.1EE.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1EE.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1EE.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1FF.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1FF.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.21B.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.21B.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22B.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22B.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22C.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22C.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22C.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22C.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22C.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22D.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22D.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.230.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.230.00] START | name: tt | lines: 9 ===
// @calls: none | @calledBy: none
function tt(key, fallback) {
    if (typeof t === 'function') {
        var value = t(key);
        if (value && value !== key) {
            return value;
        }
    }
    return fallback || key;
}
// === [#HEX:F.04.230.00] END ===
// === [#HEX:F.04.230.00] END ===
// === [#HEX:F.04.22D.00] END ===
// === [#HEX:F.04.22D.00] END ===
// === [#HEX:F.04.22C.00] END ===
// === [#HEX:F.04.22C.00] END ===
// === [#HEX:F.04.22C.00] END ===
// === [#HEX:F.04.22C.00] END ===
// === [#HEX:F.04.22C.00] END ===
// === [#HEX:F.04.22B.00] END ===
// === [#HEX:F.04.22B.00] END ===
// === [#HEX:F.04.21B.00] END ===
// === [#HEX:F.04.21B.00] END ===
// === [#HEX:F.04.1FF.00] END ===
// === [#HEX:F.04.1FF.00] END ===
// === [#HEX:F.04.1EE.00] END ===
// === [#HEX:F.04.1EE.00] END ===
// === [#HEX:F.04.1EE.00] END ===

// === [#HEX:F.04.1EF.00] START | name: localizeByDictionary | lines: 19 ===
// @calls: none | @calledBy: [#HEX:F.06.56.00], [#HEX:F.06.57.00], [#HEX:F.06.58.00], [#HEX:F.06.59.00]
function localizeByDictionary(rawText) {
    var text = (rawText || '').toString();
    if (!text) {
        return text;
    }
    if (typeof translations === 'undefined' || typeof currentLang === 'undefined' || currentLang === 'hu') {
        return text;
    }

    var huDict = translations.hu || {};
    var activeDict = translations[currentLang] || {};
    var enDict = translations.en || {};
    for (var key in huDict) {
        if (Object.prototype.hasOwnProperty.call(huDict, key) && huDict[key] === text) {
            return activeDict[key] || enDict[key] || text;
        }
    }
    return text;
}
// === [#HEX:F.04.1EF.00] END ===

// === [#HEX:F.04.1F0.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1F0.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.1F0.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.201.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.201.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.21D.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.21D.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22D.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22D.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22E.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22E.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22E.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22E.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22E.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22F.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.22F.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.232.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
// === [#HEX:F.04.232.00] START | name: applyDeletionPageMetaTranslation | lines: 3 ===
// @calls: none | @calledBy: none
function applyDeletionPageMetaTranslation() {
    document.title = tt('del_page_title', 'Leléptető');
}
// === [#HEX:F.04.232.00] END ===
// === [#HEX:F.04.232.00] END ===
// === [#HEX:F.04.22F.00] END ===
// === [#HEX:F.04.22F.00] END ===
// === [#HEX:F.04.22E.00] END ===
// === [#HEX:F.04.22E.00] END ===
// === [#HEX:F.04.22E.00] END ===
// === [#HEX:F.04.22E.00] END ===
// === [#HEX:F.04.22E.00] END ===
// === [#HEX:F.04.22D.00] END ===
// === [#HEX:F.04.22D.00] END ===
// === [#HEX:F.04.21D.00] END ===
// === [#HEX:F.04.21D.00] END ===
// === [#HEX:F.04.201.00] END ===
// === [#HEX:F.04.201.00] END ===
// === [#HEX:F.04.1F0.00] END ===
// === [#HEX:F.04.1F0.00] END ===
// === [#HEX:F.04.1F0.00] END ===

// === [#HEX:F.06.58.00] START | name: callBackend | lines: 46 ===
// @calls: [#HEX:F.04.1EF.00], [#HEX:F.04.1F1.00] | @calledBy: none
function callBackend(funcName, params, onSuccess, onFailure) {
    var token = null;
    try {
        token = localStorage.getItem('ebookPiratesToken');
    } catch (e) {
        token = null;
    }

    fetch(DELETION_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: funcName, data: params || [], token: token })
    })
    .then(function(response) {
        return response.text().then(function(text) {
            return { status: response.status, text: text };
        });
    })
    .then(function(payload) {
        var parsed = safeParseJson(payload.text);
        if (!parsed) {
            throw new Error(tt('del_invalid_server_response', 'Érvénytelen szerverválasz.'));
        }

        if (parsed.message) {
            parsed.message = localizeByDictionary(parsed.message);
        }
        if (parsed.error) {
            parsed.error = localizeByDictionary(parsed.error);
        }

        if (payload.status >= 200 && payload.status < 300) {
            if (onSuccess) {
                onSuccess(parsed);
            }
            return;
        }

        throw new Error(parsed.error || parsed.message || ('HTTP ' + payload.status));
    })
    .catch(function(error) {
        if (onFailure) {
            onFailure(error);
        }
    });
}
// === [#HEX:F.06.58.00] END ===

// === [#HEX:F.04.1F1.00] START | name: safeParseJson | lines: 20 ===
// @calls: [#HEX:F.04.13.00] | @calledBy: [#HEX:F.06.56.00], [#HEX:F.06.58.00]
function safeParseJson(text) {
    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        var start = text.indexOf('{');
        var end = text.lastIndexOf('}');
        if (start !== -1 && end !== -1 && end > start) {
            try {
                return JSON.parse(text.substring(start, end + 1));
            } catch (e2) {
                return null;
            }
        }
        return null;
    }
}
// === [#HEX:F.04.1F1.00] END ===

document.getElementById('deletionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var submitButton = document.getElementById('submit-button');
    var statusMessage = document.getElementById('status-message');

    submitButton.disabled = true;
    statusMessage.textContent = tt('del_processing', 'Kérelem feldolgozása...');
    statusMessage.style.color = '#5f6368';

    var formData = {
        name: this.name.value,
        email: this.email.value,
        reason: this.reason.value
    };

// === [#HEX:F.06.59.00] START | name: callBackend | lines: 7 ===
// @calls: [#HEX:B.07.E2.00], [#HEX:F.04.1EF.00] | @calledBy: none
    callBackend('submitDeletionRequest', [formData], function(response) {
        statusMessage.textContent = response.message
            ? localizeByDictionary(response.message)
            : tt('del_submit_recorded', 'A kijelentkezési kérelmet rögzítettük.');
        statusMessage.style.color = 'green';
        document.getElementById('deletionForm').style.display = 'none';
    }, function(error) {
// === [#HEX:F.06.59.00] END ===
        statusMessage.textContent = tt('form_error_prefix', 'Hiba történt: ') + localizeByDictionary(error.message);
        statusMessage.style.color = 'red';
        submitButton.disabled = false;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    applyDeletionPageMetaTranslation();
    if (typeof bindLanguageButtons === 'function') {
        bindLanguageButtons();
    }
    document.addEventListener('click', function(event) {
        var target = event.target;
        while (target && target !== document) {
            if (target.classList && target.classList.contains('lang-btn')) {
                setTimeout(applyDeletionPageMetaTranslation, 0);
                return;
            }
            target = target.parentNode;
        }
    });
});
