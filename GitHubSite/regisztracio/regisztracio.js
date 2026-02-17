var REGISTRATION_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxbliKmT_PpEi8VXztxWIAoNfaJHEaeKAjZl5gwwLkRLsY1x4PdeejtjTTEwLGDx4p_/exec";

function callBackend(funcName, params, onSuccess, onFailure) {
    var token = null;
    try {
        token = localStorage.getItem('ebookPiratesToken');
    } catch (e) {
        token = null;
    }

    fetch(REGISTRATION_WEB_APP_URL, {
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
            throw new Error('Érvénytelen szerverválasz.');
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

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var submitButton = document.getElementById('submit-button');
    var statusMessage = document.getElementById('status-message');

    submitButton.disabled = true;
    statusMessage.textContent = 'Feldolgozás...';
    statusMessage.style.color = '#5f6368';

    var formData = {
        email: this.email.value,
        name: this.name.value
    };

    callBackend('submitRegistrationRequest', [formData], function(response) {
        statusMessage.textContent = response.message || 'A regisztrációs kérelmet rögzítettük.';
        statusMessage.style.color = 'green';
        document.getElementById('registrationForm').style.display = 'none';
    }, function(error) {
        statusMessage.textContent = 'Hiba történt: ' + error.message;
        statusMessage.style.color = 'red';
        submitButton.disabled = false;
    });
});
