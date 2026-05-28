
// === KOCSMAI HIRDETOTABLA ===
function openNoticeBoard() {
    var modal = document.getElementById('notice-board-modal');
    if(modal) modal.style.display = 'flex';
    var boardDiv = document.getElementById('notice-board-content');
    if(boardDiv) boardDiv.innerHTML = '<p style="color: #f5deb3; text-align: center; width: 100%; font-size: 1.2em;"><i class="fas fa-spinner fa-spin"></i> A pultosfiú épp szögeli fel az új papírokat...</p>';

    if (typeof callBackend === 'function') {
        callBackend("getNoticeBoardData", [], function(response) {
            if (response && response.success && response.data) {
                renderNoticeBoard(response.data);
            } else {
                if(boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">A szél lefújta az összes papírt. (Hiba: ' + (response ? response.error : 'Nincs válasz') + ')</p>';
            }
        });
    } else {
        if(boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">Hálózati hiba: A backend nem elérhető.</p>';
    }
}

function renderNoticeBoard(data) {
    var boardDiv = document.getElementById('notice-board-content');
    if(!boardDiv) return;
    boardDiv.innerHTML = '';

    // 1. WANTED Plakátok
    if (data.wanted && data.wanted.length > 0) {
        data.wanted.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #e0d8b0; padding: 15px; width: 220px; border: 2px dashed #8b4513; box-shadow: 2px 2px 8px rgba(0,0,0,0.7); transform: rotate(" + (Math.random() * 8 - 4) + "deg); position: relative; font-family: 'Courier New', monospace;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: silver; font-size: 1.5em; text-shadow: 1px 1px 2px black;">🗡️</div>' +
                             '<h3 style="margin: 10px 0 5px 0; color: black; text-align: center; font-size: 1.8em; letter-spacing: 2px; font-weight: 900;">WANTED</h3>' +
                             '<p style="text-align: center; margin-bottom: 10px;"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Skull_and_crossbones.svg/120px-Skull_and_crossbones.svg.png" style="width:60px; opacity: 0.8; filter: sepia(1);"></p>' +
                             '<p style="font-weight: bold; text-align: center; font-size: 1.2em; margin-bottom: 5px; color: #8b0000; text-transform: uppercase;">' + item.name + '</p>' +
                             '<p style="text-align: center; margin-bottom: 10px; font-size: 0.85em; color: #333;"><b>Bűntette:</b><br>' + item.crime + '</p>' +
                             '<h4 style="text-align: center; color: black; margin-bottom: 0; background: rgba(0,0,0,0.1); padding: 5px; border-radius: 3px;">Vérdíj: ' + item.bounty + ' Kr</h4>';
            boardDiv.appendChild(card);
        });
    }

    // 2. Priori Újdonságok
    if (data.priori && data.priori.length > 0) {
        data.priori.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #fdf5e6; padding: 15px; width: 220px; border: 1px solid #d2b48c; box-shadow: 2px 2px 5px rgba(0,0,0,0.5); transform: rotate(" + (Math.random() * 6 - 3) + "deg); position: relative; font-family: 'Georgia', serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); color: #8b0000; font-size: 1.5em; text-shadow: 1px 1px 1px #000;">📌</div>' +
                             '<h4 style="margin: 10px 0 10px 0; color: #8b4513; text-align: center; font-family: \'Pirata One\', cursive; font-size: 1.5em; border-bottom: 1px solid #d2b48c; padding-bottom: 5px;">Újdonság a Kikötőben!</h4>' +
                             '<p style="font-size: 0.85em; margin: 0 0 10px 0; text-align: center; color: #666;">' + item.date + '</p>' +
                             '<p style="font-weight: bold; text-align: center; margin-bottom: 5px; color: #2c1a0b; font-size: 1.1em;">' + item.title + '</p>' +
                             '<p style="font-style: italic; text-align: center; margin-bottom: 15px; color: #5c3a21;">Szerző: ' + item.author + '</p>' +
                             '<p style="text-align: center; color: #1b5e20; font-weight: bold; font-size: 1.1em; background: rgba(27,94,32,0.1); padding: 5px; border-radius: 3px;">Ár: ' + item.price + ' Kr</p>';
            boardDiv.appendChild(card);
        });
    }

    // 3. Kalandmodulok (Jobs)
    if (data.jobs && data.jobs.length > 0) {
        data.jobs.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #f0ebd8; padding: 15px; width: 220px; border: 2px solid #3e2723; box-shadow: 2px 2px 6px rgba(0,0,0,0.6); transform: rotate(" + (Math.random() * 6 - 3) + "deg); position: relative; font-family: 'Georgia', serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 10px; color: gold; font-size: 1.5em; text-shadow: 1px 1px 1px #000;">📌</div>' +
                             '<h4 style="margin: 10px 0 10px 0; color: #1b5e20; text-align: center; font-family: \'Pirata One\', cursive; font-size: 1.5em; border-bottom: 1px solid #ccc; padding-bottom: 5px;"><i class="fas fa-scroll"></i> Küldetés!</h4>' +
                             '<p style="font-weight: bold; text-align: center; margin-bottom: 15px; font-size: 1.1em; color: #3e2723;">' + item.title + '</p>' +
                             '<p style="font-size: 0.9em; margin-bottom: 5px; color: #4e342e;"><strong>Keresnek:</strong><br>' + item.specialists + '</p>' +
                             '<p style="font-size: 0.9em; margin-bottom: 15px; color: #8b0000;"><strong>Veszély:</strong> ' + item.danger + '</p>' +
                             '<p style="text-align: center; color: #b71c1c; font-weight: bold; font-size: 1.1em; background: rgba(183,28,28,0.1); padding: 5px; border-radius: 3px;">Jutalom: ' + item.reward + '</p>';
            boardDiv.appendChild(card);
        });
    }

    // 4. Pletykák (Gossip)
    if (data.gossip && data.gossip.length > 0) {
        data.gossip.forEach(function(item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #fffafa; padding: 15px; width: 220px; border: 1px solid #ccc; box-shadow: 2px 2px 4px rgba(0,0,0,0.4); transform: rotate(" + (Math.random() * 8 - 4) + "deg); position: relative; font-family: 'Comic Sans MS', cursive, sans-serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; right: 10px; color: #555; font-size: 1.5em; transform: rotate(45deg);">📎</div>' +
                             '<h4 style="margin: 5px 0 10px 0; color: #4b0082; text-align: left; font-size: 1.1em;"><i class="fas fa-comment-dots"></i> Hallottad...?</h4>' +
                             '<p style="font-size: 0.9em; text-align: left; margin-bottom: 15px; color: #333; line-height: 1.4;"><i>' + item.text + '</i></p>' +
                             '<p style="text-align: right; font-size: 0.8em; color: #666; font-style: italic;">- ' + item.npc + '</p>';
            boardDiv.appendChild(card);
        });
    }

    if (boardDiv.innerHTML === '') {
        boardDiv.innerHTML = '<p style="color: #f5deb3; text-align: center; width: 100%; font-size: 1.5em; font-family: \'Pirata One\', cursive;">A tábla jelenleg kong az ürességtől...</p>';
    }
}
