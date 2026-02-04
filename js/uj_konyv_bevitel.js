// --- GLOBÁLIS VÁLTOZÓK ---
var submitButton = null;
var statusDiv = null;
var modalText = null;
var isSubmitting = false; 
var serverParams = {};

// Szenteléshez szükséges globális változók
var globalGdocId = null;
var globalCoverId = null;
var globalLogId = null; // Ez a workId
var globalUserEmail = null;
var isSzentelesMode = false;

// --- PARAMÉTEREK OLVASÁSA ---
(function loadParams(){
  // 1) Próbáljuk meglévő szerver-oldali változót olvasni (Apps Script-hosted view esetén)
  try {
    if (typeof urlParams !== 'undefined' && urlParams) {
      serverParams = urlParams;
      return;
    }
  } catch(e) { /* no server-provided params */ }

  // 2) Fallback: parse window.location.search (GitHub Pages vagy bármely más host esetén)
  try {
    if (typeof window !== 'undefined' && window.location && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const obj = {};
      for (const [k,v] of params.entries()) {
        // keep same shape as Apps Script e.parameters (array-of-values)
        obj[k] = [v];
      }
      serverParams = obj;
    }
  } catch(e) { console.warn('Paraméter feldolgozási hiba:', e); }
})();

function getParam(key) {
    return (serverParams && serverParams[key] && serverParams[key][0]) ? serverParams[key][0] : null;
}

// --- 3. ESEMÉNYKEZELŐK ÉS LOGIKA ---

document.addEventListener("DOMContentLoaded", function() {
  try {
      globalGdocId = getParam('gdocId');
      globalUserEmail = getParam('userEmail');
      globalLogId = getParam('logId'); // Ez a workId
      globalCoverId = getParam('coverId');
      var action = getParam('action');
      var titleParam = getParam('title');

      // elem referenciák
      submitButton = document.getElementById('submitButton');
      statusDiv = document.getElementById('status');
      modalText = document.getElementById('modal-status-text');

      if (action === 'szenteles' && globalGdocId && globalUserEmail && globalLogId) {
          console.log("Szentelés mód aktív! Fájlmezők elrejtése...");
          isSzentelesMode = true;

          var epubGroup = document.getElementById('epubFile').closest('.form-group');
          var coverGroup = document.getElementById('coverImageFile').closest('.form-group');
          if(epubGroup) epubGroup.style.display = 'none';
          if(coverGroup) coverGroup.style.display = 'none';

          document.getElementById('epubFile').required = false;

          // Dropdownok betöltése - IF hosted by Apps Script, google.script.run will work; otherwise these calls will fail
          if (typeof google !== 'undefined' && google.script && google.script.run) {
            google.script.run.withSuccessHandler(populateDropdowns).getDropdownData();
            google.script.run.withSuccessHandler(displayLogo).getCentralImageAsset('logo');
          }

          if (titleParam) document.getElementById('title').value = titleParam;
          document.getElementById('ownerEmail').value = globalUserEmail;
          document.getElementById('authorName').value = "Felhőkolostor Szerzője";

      } else {
          console.log("Normál mód.");
          if (typeof google !== 'undefined' && google.script && google.script.run) {
            google.script.run.withSuccessHandler(populateDropdowns).getDropdownData();
            google.script.run.withSuccessHandler(displayLogo).getCentralImageAsset('logo');
            google.script.run.withSuccessHandler(displayLoadingGif).getCentralImageAsset('book_upload');
          }
      }

      // form submit handler hookup
      var form = document.getElementById('bookForm');
      if (form) form.addEventListener('submit', handleFormSubmit);

  } catch (e) {
      showError(new Error("Inicializálási hiba: " + e.message));
  }
});

// --- ŰRLAP BEKÜLDÉSE ---
function handleFormSubmit(event) {
  event.preventDefault();
  if (window.isSubmitting) { return; }
  var formObject = event.target;
  
  var formData = buildBaseFormData(formObject, null); 
  
  var gdocId = getParam('gdocId');
  var logId = getParam('logId');
  var coverId = getParam('coverId');
  var action = getParam('action');

  if (action === 'szenteles' && gdocId && logId) {
      setUiState('loading', 'Szentelt könyv adatainak feldolgozása a szerveren...');
      
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(function(response) {
               if (!response.success) { showError(new Error(response.error)); return; }
               handleSzentelesResponse(response, formData); 
          })
          .withFailureHandler(showError)
          .initiateGDocSzenteles(gdocId, formData.ownerEmail, logId, coverId, formData);
      } else {
        showError(new Error('Server calls are not available from this host. Use the Apps Script hosted page or deploy as webapp.'));
      }
          
  } else {
      setUiState('loading', 'Azonosító foglalása a szerveren...');
      if (typeof google !== 'undefined' && google.script && google.script.run) {
        google.script.run
          .withSuccessHandler(function(response) {
            processFilesAndFinalize(formObject, response.basicCode, response.rowNumber, null, null, formData.ownerEmail);
          })
          .withFailureHandler(showError)
          .initiateUploadAndGetId(formData);
      } else {
        showError(new Error('Server calls are not available from this host. Use the Apps Script hosted page or deploy as webapp.'));
      }
  }
}

// --- FELDOLGOZÓ FÜGGVÉNYEK ---

function handleSzentelesResponse(response, formData) {
    setUiState('loading', 'Fájlok visszaalakítása és véglegesítés...');
    try {
        var epubBlob = base64ToBlob(response.base64Epub);
        var cleanTitle = sanitizeForFilename(formData.title);
        epubBlob.name = cleanTitle + ".epub"; 

        var coverFilesArray = [];
        if (response.base64Cover) {
            var coverBlob = base64ToBlob(response.base64Cover, 'image/png');
            coverBlob.name = cleanTitle + "_cover.png"; 
            coverFilesArray = [coverBlob];
        }

        var mockFormObject = {
            title: { value: formData.title },
            epubFile: { files: [epubBlob] },
            coverImageFile: { files: coverFilesArray },
            epubBaseName: cleanTitle 
        };
        
        processFilesAndFinalize(mockFormObject, response.basicCode, response.rowNumber, globalGdocId, globalLogId, globalUserEmail);

    } catch (e) {
        showError(new Error("Feldolgozási hiba: " + e.message));
    }
}

async function processFilesAndFinalize(formObject, basicCode, rowNumber, gdocId, logId, userEmail) {
  try {
    setUiState('loading', 'Fájlok vízjelezése, kicsomagolása és feltöltése...');
    var bookTitle = (formObject.title && formObject.title.value) ? formObject.title.value : "Nocim";
    if (!bookTitle && typeof formObject.title === 'string') bookTitle = formObject.title;
    var sanitizedTitle = sanitizeForFilename(bookTitle);

    var epubFile = (formObject.epubFile && formObject.epubFile.files) ? formObject.epubFile.files[0] : null;
    var coverFile = (formObject.coverImageFile && formObject.coverImageFile.files) ? formObject.coverImageFile.files[0] : null;
    
    var finalData = { 
        rowNumber: rowNumber,
        gdocId: gdocId, 
        logId: logId,
        userEmail: userEmail,
        epubBaseName: sanitizedTitle,
        quizData: getVerificationData()
    };

    if (coverFile) {
      var watermarkedCoverBase64 = await embedIdInImage(coverFile, basicCode);
      finalData.coverImageData = watermarkedCoverBase64.split(',')[1];
      finalData.coverImageFilename = sanitizedTitle + '_cover.png';
      finalData.coverImageMimeType = 'image/png';
    }

    if (epubFile) {
        var zip = new JSZip();
        var epubData = await epubFile.arrayBuffer();
        var loadedZip = await zip.loadAsync(epubData);
        var zeroWidthId = encodeIdToZeroWidth(basicCode); 
        
        var xhtmlFileNames = Object.keys(loadedZip.files).filter(name => name.toLowerCase().endsWith('.xhtml'));
        var xhtmlPromises = xhtmlFileNames.map(async (fileName) => {
            var content = await loadedZip.file(fileName).async('string');
            content = content.replace(/(background-color|background):\s*[^;\"]+;?/gi, '');
            content = content.replace(/color:\s*[^;\"]+;?/gi, '');
            content = content.replace(/font-family:[^;\"]+;?/gi, '');
            content = content.replace(/font-size:[^;\"]+;?/gi, '');
            content = content.replace(/line-height:[^;\"]+;?/gi, '');
            content = content.replace(/style="\s*"/gi, '');
            var shortName = fileName.split('/').pop();
            return { filename: shortName, content: content };
        });
        finalData.xhtmlFiles = await Promise.all(xhtmlPromises);

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
        
        var watermarkedEpubBlob = await loadedZip.generateAsync({ type: 'blob' });
        var epubBase64 = await readFileAsBase64(watermarkedEpubBlob);
        finalData.epubFileData = epubBase64.split(',')[1];
        finalData.epubFilename = sanitizedTitle + '.epub';
        finalData.epubMimeType = epubFile.type;

    } else {
        throw new Error("ePub fájl hiányzik a csomagból!");
    }
    
    setUiState('loading', 'Véglegesítés és fájlfeltöltés...');
    
    if (typeof google !== 'undefined' && google.script && google.script.run) {
      google.script.run
        .withSuccessHandler(showResult)
        .withFailureHandler(showError)
        .finalizeUpload(finalData);
    } else {
      showError(new Error('Server calls are not available from this host. Use the Apps Script hosted page or deploy as webapp.'));
    }
  } catch (error) {
    showError(error);
  }
}

// --- helper functions ---
function sanitizeForFilename(text) { if (!text) return "nevtelen_konyv"; return text.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, ''); }
function encodeIdToZeroWidth(id) { var binaryId = ''; for (var i = 0; i < id.length; i++) { binaryId += id[i].charCodeAt(0).toString(2).padStart(8, '0'); } var zeroWidthCode = ''; for (const bit of binaryId) { zeroWidthCode += (bit === '0') ? '\u200b' : '\u200c'; } return zeroWidthCode + '\u200d'; }
function readFileAsBase64(file) { return new Promise((resolve, reject) => { var reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error); reader.readAsDataURL(file); }); }
function readBlobAsDataURL(imageBlob) { return new Promise((resolve, reject) => { var reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error); reader.readAsDataURL(imageBlob); }); }
function base64ToBlob(base64, mimeType) { mimeType = mimeType || 'application/epub+zip'; var byteCharacters = atob(base64); var byteNumbers = new Array(byteCharacters.length); for (var i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); } var byteArray = new Uint8Array(byteNumbers); return new Blob([byteArray], {type: mimeType}); }
function embedIdInImage(imageFileOrBase64, id) { return new Promise((resolve, reject) => { var img = new Image(); img.onload = function() { var canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height; var ctx = canvas.getContext('2d'); ctx.drawImage(img, 0, 0); var binaryId = ''; for (var i = 0; i < id.length; i++) { binaryId += id[i].charCodeAt(0).toString(2).padStart(8, '0'); } binaryId += "11111111"; var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height); if (binaryId.length * 4 > pixelData.data.length) { return reject(new Error("A kép túl kicsi az azonosító elrejtéséhez.")); } var dataIndex = 0; for (var i = 0; i < binaryId.length; i++) { var bit = binaryId[i]; if ((dataIndex + 1) % 4 === 0) { dataIndex++; } var oldValue = pixelData.data[dataIndex]; pixelData.data[dataIndex] = (bit === '1') ? (oldValue | 1) : (oldValue & 254); dataIndex++; } ctx.putImageData(pixelData, 0, 0); resolve(canvas.toDataURL('image/png')); }; img.onerror = (err) => reject(new Error("A kép nem tölthető be.")); if (typeof imageFileOrBase64 === 'string') { img.src = imageFileOrBase64; } else { var reader = new FileReader(); reader.onload = (event) => { img.src = event.target.result; }; reader.onerror = (err) => reject(new Error("A fájl olvasása sikertelen.")); reader.readAsDataURL(imageFileOrBase64); } }); }
function buildBaseFormData(form, basicCode) { var data = { ownerEmail: form.ownerEmail.value, productType: form.productType.value, language: form.language.value, authorName: form.authorName.value, publisherName: form.publisherName.value, title: form.title.value, isbn: form.isbn.value, price: form.price.value, acceptance: form.acceptance.checked }; if (basicCode) data.basicCode = basicCode; return data; }

function getVerificationData() {
    var q1 = document.getElementById('quiz_q1');
    var a1 = document.getElementById('quiz_a1');
    var q2 = document.getElementById('quiz_q2');
    var a2 = document.getElementById('quiz_a2');
    var q3 = document.getElementById('quiz_q3');
    var a3 = document.getElementById('quiz_a3');
    if (!q1 || !a1 || !q2 || !a2 || !q3 || !a3) return [];
    return [ { question: q1.value.trim(), answer: a1.value.trim() }, { question: q2.value.trim(), answer: a2.value.trim() }, { question: q3.value.trim(), answer: a3.value.trim() } ];
}

function setUiState(state, message) {
  var modal = document.getElementById('loading-modal');
  var modalTextLocal = document.getElementById('modal-status-text');
  if (state === 'loading') {
    window.isSubmitting = true; 
    if(window.submitButton) window.submitButton.disabled = true;
    if(window.statusDiv) {
        window.statusDiv.textContent = message || 'Feldolgozás...';
        window.statusDiv.className = '';
    }
    if(modalTextLocal) modalTextLocal.textContent = message || 'Feldolgozás folyamatban, kérem várjon...';
    if(modal) modal.style.display = 'flex';
  } else { 
    window.isSubmitting = false; 
    if(window.submitButton) window.submitButton.disabled = false; 
    if(window.statusDiv) {
        window.statusDiv.textContent = message || '';
        window.statusDiv.className = (message && (message.startsWith('Hiba') || message.startsWith('Időtúllépés'))) ? 'error' : 'success';
    }
    if(modal) modal.style.display = 'none';
  }
}

function showResult(message) {
  setUiState('finished', message);
  if (!message.startsWith('Hiba')) {
      var form = document.getElementById('bookForm');
      if (form) form.style.display = 'none';
      var logo = document.getElementById('logo-container');
      if (logo) logo.style.display = 'none';
      var statusDivLocal = document.getElementById('status');
      if (statusDivLocal) {
          statusDivLocal.innerHTML = 
              '<div style="padding:30px; background-color:#e3fcef; color:#006644; border:2px solid #006644; border-radius:8px;">' +
              '<h3>✅ SIKERES BEKÜLDÉS!</h3>' +
              '<p>' + message + '</p>' +
              '<p><b>Most már biztonságosan bezárhatod ezt az ablakot.</b></p>' +
              '</div>';
      }
      var title = document.getElementById('page-title');
      if (title) title.innerText = "Feltöltés Befejezve";
  }
}

function showError(error) {
    var errorMessage = "Ismeretlen hiba történt.";
    if (error && error.message) {
        errorMessage = error.message;
        setUiState('finished', 'Hiba: ' + errorMessage);
    } else {
        errorMessage = "A kapcsolat a szerverrel megszakadt.";
        if(window.statusDiv) {
            window.statusDiv.textContent = errorMessage;
            window.statusDiv.className = 'error';
        }
    }
}

function populateDropdowns(data) {
  var genreSelect = document.getElementById('productType');
  var languageSelect = document.getElementById('language');
  genreSelect.innerHTML = '<option value="">Válassz...</option>';
  languageSelect.innerHTML = '<option value="">Válassz...</option>';
  if (data && data.genres) {
    data.genres.forEach(genre => {
      var option = document.createElement('option');
      option.value = genre;
      option.textContent = genre;
      genreSelect.appendChild(option);
    });
  }
  if (data && data.languages) {
    data.languages.forEach(language => {
      var option = document.createElement('option');
      option.value = language;
      option.textContent = language;
      languageSelect.appendChild(option);
    });
  }
}

function displayLogo(imageData) {
  if (imageData && imageData.data && imageData.mime) {
    var logoElement = document.getElementById('oldal-logo');
    if(logoElement) {
        logoElement.src = `data:${imageData.mime};base64,${imageData.data}`;
        logoElement.style.display = 'block';
    }
  }
}

function displayLogoError(error) {
  console.error("Szerveroldali hiba a kép lekérdezésekor:", error.message);
}

function displayLoadingGif(imageData) {
  if (imageData && imageData.data) {
    var gifElement = document.getElementById('book_upload-image');
    if(gifElement) gifElement.src = `data:${imageData.mime};base64,${imageData.data}`;
  }
}