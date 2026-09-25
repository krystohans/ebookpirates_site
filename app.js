// Core frontend helpers extracted from index.html
// NOTE: Follow project rule: no template literals in client-side code.
// FIGYELMEZTETÉS: NEM írok asszisztensként a kódba, csak a chat ablakon keresztül adok alternatívát! A kód minden esetben csak manuálisan módosítható!

// 1. GLOBÁLIS VÁLTOZÓK DEFINÍCIÓJA
var currentUserEmail = "";       // Az aktuális felhasználó
var currentLogEntryData = null;  // Hajónapló szerkesztéshez
var currentPageName = "";        // Az aktuálisan betoltott oldal neve
const MAP_COPY_COST = 30;        // Konstans: másolás ára

// ============================================================================
// 🚀 INTELLIGENS ALOLDAL ÉS 3D ASSET ELŐTÖLTŐ RENDSZER (Smart Preload Pipeline)
// ============================================================================
window.pageTemplateCache = window.pageTemplateCache || {};

const PRELOAD_PAGES_LIST = [
    'kikoto_oldal', 'tutorial_oldal', 'taverna_oldal', 'bank_oldal',
    'piac_oldal', 'fedelzet_oldal', 'hajomuhely_oldal', 'masolatok_oldal',
    'tekercsmester_oldal', 'konyvszentely_oldal', 'felhokolostor_oldal',
    'konyvtar', 'kincsek'
];

function preloadPageTemplate(pageName) {
    if (!pageName || (window.pageTemplateCache && window.pageTemplateCache[pageName])) {
        return Promise.resolve(window.pageTemplateCache ? window.pageTemplateCache[pageName] : null);
    }
    var url = getPageHtmlUrl(pageName);
    return fetch(url, { cache: 'no-cache' })
        .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
        })
        .then(function (html) {
            if (window.pageTemplateCache) {
                window.pageTemplateCache[pageName] = html;
            }
            return html;
        })
        .catch(function (err) {
            console.warn("⚠️ Nem sikerült előtölteni az aloldalt (" + pageName + "):", err);
            return null;
        });
}
window.preloadPageTemplate = preloadPageTemplate;

var _universalLoadingWatchdog = null;

function showUniversalLoading(statusText, customPhrases) {
    var overlay = document.getElementById('kikoto-3d-loading-overlay') || document.getElementById('loading-overlay');
    if (overlay) {
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
        overlay.classList.add('active');
    }
    if (statusText) {
        var statusEl = document.getElementById('loader-status');
        if (statusEl) {
            var translated = (typeof t === 'function') ? t(statusText) : statusText;
            statusEl.textContent = translated;
        }
    }
    if (window.ClockworkEngine) {
        window.ClockworkEngine.start();
    }
    if (window.ClockworkDispenser) {
        window.ClockworkDispenser.start(customPhrases);
    }

    if (_universalLoadingWatchdog) {
        clearTimeout(_universalLoadingWatchdog);
    }
    // Biztonsági Védelmi Időzítő (Watchdog): Ha 15 mp-ig nem érkezne feloldás (pl. hálózati/3D akadás), kényszerített direkt átváltás az aloldalra
    _universalLoadingWatchdog = setTimeout(function () {
        console.warn("⚠️ [Watchdog] Betöltési biztonsági időkorlát elérve (15s), kényszerített direkt feloldás az aloldalra.");
        hideUniversalLoading("sot_loading_complete", 300);
    }, 15000);
}
window.showUniversalLoading = showUniversalLoading;

function updateUniversalLoadingProgress(percent, statusText) {
    var fill = document.getElementById('loader-fill');
    if (fill) {
        fill.style.width = Math.min(100, Math.max(0, percent)) + '%';
    }
    if (statusText) {
        var statusEl = document.getElementById('loader-status');
        if (statusEl) statusEl.textContent = statusText;
    }
}
window.updateUniversalLoadingProgress = updateUniversalLoadingProgress;

function hideUniversalLoading(completionText, delayMs, force) {
    if (!force) {
        // Ha az aktív céloldal a 3D Kikötő és a 3D modell még töltődik a háttérben, a betöltő aktív marad
        if (currentPageName === 'kikoto_oldal' && !window._kikoto3DInitialized && !window._kikoto2DFallbackActive) {
            console.log("⏳ [Universal Loader] 3D Kikötő még inicializálódik a háttérben, óramű animáció aktív marad...");
            return;
        }
    }

    if (_universalLoadingWatchdog) {
        clearTimeout(_universalLoadingWatchdog);
        _universalLoadingWatchdog = null;
    }
    var wait = typeof delayMs === 'number' ? delayMs : 500;
    if (completionText && window.ClockworkDispenser) {
        var translated = (typeof t === 'function') ? t(completionText) : completionText;
        window.ClockworkDispenser.showSingle(translated);
    }
    var fill = document.getElementById('loader-fill');
    if (fill) fill.style.width = '100%';

    setTimeout(function () {
        if (window.ClockworkEngine) {
            window.ClockworkEngine.stop();
        }
        if (window.ClockworkDispenser) {
            window.ClockworkDispenser.stop();
        }
        var overlay = document.getElementById('kikoto-3d-loading-overlay') || document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.classList.remove('active');
            setTimeout(function () {
                overlay.style.display = 'none';
            }, 600);
        }
    }, wait);
}
window.hideUniversalLoading = hideUniversalLoading;

function preloadAllSubpages(onComplete) {
    if (window._hasPreloadedSubpages) {
        if (onComplete) onComplete();
        return;
    }
    window._hasPreloadedSubpages = true;
    console.log("⚡ [Preload Pipeline] Aloldal sablonok párhuzamos előtöltése és prepozícionálása...");

    var total = PRELOAD_PAGES_LIST.length;
    var loaded = 0;

    var promises = PRELOAD_PAGES_LIST.map(function (pName) {
        return preloadPageTemplate(pName).then(function () {
            loaded++;
            var pct = Math.round((loaded / total) * 100);
            var prefix = (typeof t === 'function') ? t('sot_preload_subpages') : 'ALOLDALAK PREPOZÍCIONÁLÁSA: ';
            updateUniversalLoadingProgress(pct, prefix + pct + "% (" + pName + ")");
        }).catch(function () {
            loaded++;
        });
    });

    Promise.all(promises).then(function () {
        console.log("✅ [Preload Pipeline] Minden aloldal sablon sikeresen előtöltve a memóriába.");
        var doneMsg = (typeof t === 'function') ? t('sot_all_subpages_ready') : 'MINDEN ALOLDAL PREPOZÍCIONÁLVA (100%)';
        updateUniversalLoadingProgress(100, doneMsg);
        if (onComplete) onComplete();
    });
}
window.preloadAllSubpages = preloadAllSubpages;

// ============================================================================
// ⚡ FELHASZNÁLÓI ALAPCSOMAG ELŐTÖLTŐ PIPELINE (User Base Data Preload Pipeline)
// ============================================================================
window._isPreloadingUserData = false;
window._hasPreloadedUserData = false;
var _userDataPreloadCallbacks = [];

function preloadUserBaseData(user, onComplete) {
    if (typeof onComplete === 'function') {
        _userDataPreloadCallbacks.push(onComplete);
    }
    if (window.userShips && window.userShips.length > 0) {
        while (_userDataPreloadCallbacks.length > 0) {
            var cb = _userDataPreloadCallbacks.shift();
            try { cb(window.userShips, window.toborzoMarketData); } catch (e) { }
        }
        return;
    }
    if (window._isPreloadingUserData) {
        return;
    }
    window._isPreloadingUserData = true;

    var finishPreload = function (ships) {
        window._isPreloadingUserData = false;
        window._hasPreloadedUserData = true;
        while (_userDataPreloadCallbacks.length > 0) {
            var cb = _userDataPreloadCallbacks.shift();
            try { cb(ships || window.userShips || [], window.toborzoMarketData); } catch (e) { }
        }
    };

    var backendCaller = (typeof callBackend === 'function') ? callBackend :
        (window.parent && typeof window.parent.callBackend === 'function') ? window.parent.callBackend : null;

    if (!backendCaller) {
        finishPreload([]);
        return;
    }

    backendCaller('getToborzoData', [], function (response) {
        if (response && response.success && Array.isArray(response.ownedShips)) {
            window.toborzoMarketData = response;
            window.toborzoNameDict = response.nameDict || {};
            var normFunc = (typeof normalizeShipData === 'function') ? normalizeShipData :
                (window.normalizeShipData ? window.normalizeShipData : function(s) { return s; });
            window.userShips = response.ownedShips.map(function (s) {
                return normFunc(s, window.toborzoNameDict);
            });
            if ((!window.selectedShipForDeparture || !selectedShipForDeparture) && window.userShips.length > 0) {
                window.selectedShipForDeparture = window.userShips[0];
                try { selectedShipForDeparture = window.userShips[0]; } catch (e) { }
            }
        }
        finishPreload(window.userShips || []);
    }, function (err) {
        finishPreload(window.userShips || []);
    });
}
window.preloadUserBaseData = preloadUserBaseData;


// ==========================================================
// === STEAMPUNK CLOCKWORK KINETIC TYPOGRAPHY DISPENSER ===
// ==========================================================
(function () {
    var defaultPhrases = [
        "Hajók kirakodása...",
        "Legénységi sorakozó...",
        "Piaci leltár felvétele...",
        "Horgonyok felhúzása...",
        "Kikötői vizek kalibrálása...",
        "Térképek kicsomagolása...",
        "Kincsesládák számlálása...",
        "Ágyúk tisztítása és készletezése...",
        "Hajónapló előkészítése..."
    ];

    var phrases = defaultPhrases.slice();
    var currentPhraseIndex = 0;
    var timerId = null;
    var isRunning = false;

    function getContainers() {
        return document.querySelectorAll('#clockwork-dispenser-text, .clockwork-text-line');
    }

    function renderPhrase(text) {
        var containers = getContainers();
        if (!containers || containers.length === 0) return;

        containers.forEach(function (container) {
            container.innerHTML = '';
            for (var i = 0; i < text.length; i++) {
                var ch = text[i];
                var span = document.createElement('span');
                span.className = 'dispenser-char char-drop-in';
                if (ch === ' ') {
                    span.className += ' char-space';
                    span.innerHTML = '&nbsp;';
                } else {
                    span.textContent = ch;
                }

                var randRot = ((Math.random() * 36) - 18).toFixed(1) + 'deg';
                var charDelay = (i * 0.045).toFixed(3) + 's';

                span.style.setProperty('--rand-rot', randRot);
                span.style.setProperty('--char-delay', charDelay);
                container.appendChild(span);
            }
        });
    }

    function triggerFallOut(onComplete) {
        var containers = getContainers();
        if (!containers || containers.length === 0) {
            if (onComplete) onComplete();
            return;
        }

        var maxFallTime = 0;
        containers.forEach(function (container) {
            var chars = container.querySelectorAll('.dispenser-char');
            for (var i = 0; i < chars.length; i++) {
                var span = chars[i];
                span.classList.remove('char-drop-in');
                span.classList.add('char-fall-out');
                var fallDelay = (i * 0.025 + (Math.random() * 0.05)).toFixed(3) + 's';
                var randRot = ((Math.random() * 60) - 30).toFixed(1) + 'deg';
                span.style.setProperty('--fall-delay', fallDelay);
                span.style.setProperty('--rand-rot', randRot);
                var totalTime = parseFloat(fallDelay) + 0.65;
                if (totalTime > maxFallTime) maxFallTime = totalTime;
            }
        });

        setTimeout(function () {
            if (onComplete) onComplete();
        }, Math.max(700, Math.round(maxFallTime * 1000)));
    }

    function cycle() {
        if (!isRunning) return;
        var containers = getContainers();
        if (!containers || containers.length === 0) {
            timerId = setTimeout(cycle, 400);
            return;
        }

        var text = phrases[currentPhraseIndex];
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;

        renderPhrase(text);

        var readTime = 800 + (text.length * 45) + 2000;

        timerId = setTimeout(function () {
            if (!isRunning) return;
            triggerFallOut(function () {
                if (!isRunning) return;
                timerId = setTimeout(cycle, 250);
            });
        }, readTime);
    }

    window.ClockworkDispenser = {
        start: function (customPhrases) {
            if (customPhrases && Array.isArray(customPhrases) && customPhrases.length > 0) {
                phrases = customPhrases;
            } else if (typeof getClockworkPhrases === 'function') {
                phrases = getClockworkPhrases(typeof currentLang !== 'undefined' ? currentLang : 'hu');
            } else if (!phrases || phrases.length === 0) {
                phrases = defaultPhrases.slice();
            }
            if (isRunning) return;
            isRunning = true;
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            currentPhraseIndex = 0;
            cycle();
        },
        stop: function () {
            isRunning = false;
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            var containers = getContainers();
            if (containers) {
                containers.forEach(function (c) { c.innerHTML = ''; });
            }
        },
        showSingle: function (text) {
            isRunning = false;
            if (timerId) {
                clearTimeout(timerId);
                timerId = null;
            }
            renderPhrase(text);
        }
    };
})();

// ==========================================================
// === PROCEDURAL 3D THREE.JS CLOCKWORK ENGINE (NO GLB) ===
// ==========================================================
var clockworkEngine = (function () {
    var renderer = null;
    var scene = null;
    var camera = null;
    var animFrameId = null;
    var gears = [];
    var clockworkGroup = null;

    function createGearGeometry(T, numTeeth, rootRadius, pitchRadius, outerRadius, holeRadius, thickness) {
        var shape = new T.Shape();
        var toothAngle = (Math.PI * 2) / numTeeth;

        for (var i = 0; i < numTeeth; i++) {
            var angle = i * toothAngle;
            var a0 = angle;
            var a1 = angle + toothAngle * 0.22;
            var a2 = angle + toothAngle * 0.38;
            var a3 = angle + toothAngle * 0.62;
            var a4 = angle + toothAngle * 0.78;
            var a5 = angle + toothAngle;

            var r0x = Math.cos(a0) * rootRadius, r0y = Math.sin(a0) * rootRadius;
            var t1x = Math.cos(a1) * pitchRadius, t1y = Math.sin(a1) * pitchRadius;
            var tip1x = Math.cos(a2) * outerRadius, tip1y = Math.sin(a2) * outerRadius;
            var tip2x = Math.cos(a3) * outerRadius, tip2y = Math.sin(a3) * outerRadius;
            var t2x = Math.cos(a4) * pitchRadius, t2y = Math.sin(a4) * pitchRadius;
            var r1x = Math.cos(a5) * rootRadius, r1y = Math.sin(a5) * rootRadius;

            if (i === 0) shape.moveTo(r0x, r0y);
            else shape.lineTo(r0x, r0y);

            shape.lineTo(t1x, t1y);
            shape.lineTo(tip1x, tip1y);
            shape.lineTo(tip2x, tip2y);
            shape.lineTo(t2x, t2y);
            shape.lineTo(r1x, r1y);
        }
        shape.closePath();

        var centerHole = new T.Path();
        centerHole.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
        shape.holes.push(centerHole);

        var numSpokes = numTeeth >= 20 ? 6 : (numTeeth >= 14 ? 5 : 4);
        var spokeHoleRadius = (rootRadius - holeRadius) * 0.26;
        var spokeDist = holeRadius + spokeHoleRadius * 1.55;

        for (var s = 0; s < numSpokes; s++) {
            var sa = (s * Math.PI * 2) / numSpokes;
            var sp = new T.Path();
            sp.absarc(Math.cos(sa) * spokeDist, Math.sin(sa) * spokeDist, spokeHoleRadius, 0, Math.PI * 2, true);
            shape.holes.push(sp);
        }

        var extrudeSettings = {
            depth: thickness,
            bevelEnabled: true,
            bevelSegments: 3,
            steps: 1,
            bevelSize: thickness * 0.12,
            bevelThickness: thickness * 0.12
        };

        var geo = new T.ExtrudeGeometry(shape, extrudeSettings);
        geo.center();
        return geo;
    }

    function init(container) {
        if (!container) return;
        if (renderer && renderer.domElement && container.contains(renderer.domElement)) return;
        var T = window.THREE;
        if (!T) return;

        container.innerHTML = '';
        var w = container.clientWidth || 480;
        var h = container.clientHeight || 280;

        scene = new T.Scene();
        camera = new T.PerspectiveCamera(40, w / h, 0.1, 100);
        camera.position.set(0, 0, 15.5);

        renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = T.PCFSoftShadowMap;
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;
        container.appendChild(renderer.domElement);

        var ambientLight = new T.AmbientLight(0xfff0dd, 0.9);
        scene.add(ambientLight);

        var mainSun = new T.DirectionalLight(0xffd700, 3.5);
        mainSun.position.set(8, 12, 10);
        mainSun.castShadow = true;
        scene.add(mainSun);

        var fillLight = new T.DirectionalLight(0x00e5ff, 1.8);
        fillLight.position.set(-10, -6, 6);
        scene.add(fillLight);

        var goldMaterial = new T.MeshStandardMaterial({ color: 0xe6b800, metalness: 0.92, roughness: 0.22 });
        var copperMaterial = new T.MeshStandardMaterial({ color: 0xcc6633, metalness: 0.90, roughness: 0.28 });
        var brassMaterial = new T.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.88, roughness: 0.25 });
        var steelMaterial = new T.MeshStandardMaterial({ color: 0x8899aa, metalness: 0.95, roughness: 0.20 });
        var rubyMaterial = new T.MeshStandardMaterial({ color: 0xcc0022, metalness: 0.2, roughness: 0.1, emissive: 0x440008, emissiveIntensity: 0.4 });

        clockworkGroup = new T.Group();
        clockworkGroup.rotation.x = 0.38;
        clockworkGroup.rotation.y = -0.25;
        clockworkGroup.rotation.z = 0.06;
        scene.add(clockworkGroup);

        var g1Geo = createGearGeometry(T, 24, 2.3, 2.55, 2.85, 0.7, 0.45);
        var gear1 = new T.Mesh(g1Geo, goldMaterial);
        gear1.position.set(-2.1, 0.2, 0.1);
        gear1.castShadow = true;
        gear1.receiveShadow = true;
        clockworkGroup.add(gear1);

        var capGeo = new T.CylinderGeometry(0.5, 0.55, 0.55, 24);
        capGeo.rotateX(Math.PI / 2);
        var capMesh1 = new T.Mesh(capGeo, brassMaterial);
        gear1.add(capMesh1);
        var rubyGeo = new T.SphereGeometry(0.25, 16, 16);
        var rubyMesh = new T.Mesh(rubyGeo, rubyMaterial);
        rubyMesh.position.z = 0.32;
        gear1.add(rubyMesh);

        var g2Geo = createGearGeometry(T, 16, 1.5, 1.7, 1.95, 0.5, 0.4);
        var gear2 = new T.Mesh(g2Geo, copperMaterial);
        gear2.position.set(1.9, 1.2, -0.15);
        gear2.castShadow = true;
        gear2.receiveShadow = true;
        clockworkGroup.add(gear2);

        var g3Geo = createGearGeometry(T, 12, 1.1, 1.25, 1.45, 0.4, 0.35);
        var gear3 = new T.Mesh(g3Geo, brassMaterial);
        gear3.position.set(1.5, -1.8, 0.25);
        gear3.castShadow = true;
        gear3.receiveShadow = true;
        clockworkGroup.add(gear3);

        var g4Geo = createGearGeometry(T, 8, 0.7, 0.82, 0.98, 0.3, 0.3);
        var gear4 = new T.Mesh(g4Geo, steelMaterial);
        gear4.position.set(3.4, -0.6, -0.2);
        gear4.castShadow = true;
        gear4.receiveShadow = true;
        clockworkGroup.add(gear4);

        var backplateGeo = new T.CylinderGeometry(4.8, 4.8, 0.15, 32);
        backplateGeo.rotateX(Math.PI / 2);
        var backplateMat = new T.MeshStandardMaterial({ color: 0x0a1420, metalness: 0.8, roughness: 0.6 });
        var backplate = new T.Mesh(backplateGeo, backplateMat);
        backplate.position.set(0.4, -0.2, -0.6);
        clockworkGroup.add(backplate);

        gears = [gear1, gear2, gear3, gear4];
    }

    function ensureThreeAndInit(container) {
        if (window.THREE) {
            init(container);
            if (!animFrameId && renderer) animate();
            return;
        }
        import('three').then(function (module) {
            window.THREE = module;
            init(container);
            if (!animFrameId && renderer) animate();
        }).catch(function (err) {
            console.warn("⚠️ Three.js dinamikus betöltési figyelmeztetés az óraműhöz:", err);
        });
    }

    function animate() {
        if (!renderer || !scene || !camera) return;
        animFrameId = requestAnimationFrame(animate);

        var speed = 0.008;
        if (gears.length >= 4) {
            gears[0].rotation.z += speed;
            gears[1].rotation.z -= speed * (24 / 16);
            gears[2].rotation.z += speed * (24 / 12);
            gears[3].rotation.z -= speed * (24 / 8);
        }

        var time = Date.now() * 0.0015;
        if (clockworkGroup) {
            clockworkGroup.rotation.x = 0.38 + Math.sin(time) * 0.03;
            clockworkGroup.rotation.y = -0.25 + Math.cos(time * 0.8) * 0.04;
        }

        renderer.render(scene, camera);
    }

    return {
        start: function (container) {
            var c = container || document.getElementById('clockwork-canvas-container');
            if (c) {
                if (!renderer) {
                    ensureThreeAndInit(c);
                } else {
                    if (renderer.domElement && !c.contains(renderer.domElement)) {
                        c.innerHTML = '';
                        c.appendChild(renderer.domElement);
                    }
                    if (!animFrameId) {
                        animate();
                    }
                }
            }
        },
        stop: function () {
            if (animFrameId) {
                cancelAnimationFrame(animFrameId);
                animFrameId = null;
            }
        }
    };
})();
window.ClockworkEngine = clockworkEngine;

function warmup3DHarborAssets() {
    if (window._hasWarmedUp3DHarbor) return;
    window._hasWarmedUp3DHarbor = true;
    console.log("🌊 [3D Warmup Pipeline] Three.js és 3D Kikötő assetek előmelegítése a háttérben...");

    // 1. Three.js modulok előtöltése
    Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('three/addons/objects/Water.js')
    ]).catch(function () { });

    // 2. GCS 3D modell és textúra előtöltése a böngésző cache-be
    var critical3DUrls = [
        'https://storage.googleapis.com/kalozsziget-assets/assets/models/HEBOK_Kikoto_egyszerusitett_Blender.glb',
        'https://storage.googleapis.com/kalozsziget-assets/demojatek/models/waternormals.jpg'
    ];
    critical3DUrls.forEach(function (url) {
        fetch(url, { mode: 'cors' }).catch(function () { });
    });

    // 3. Kikötő sablon előtöltése a memóriába
    preloadPageTemplate('kikoto_oldal').catch(function () { });
}
window.warmup3DHarborAssets = warmup3DHarborAssets;

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

// Globális Unity / Tutorial befejező rutin (mindig elérhető a szülő ablakban!)
window.onTutorialSuccess = function (boatData) {
    var extraData = (typeof boatData === 'object' && boatData !== null) ? boatData : { boatName: boatData || 'Gyöngyhalász', passed: true, score: 10 };
    callBackend('markTutorialCompleted', ['unity', extraData], function (res) {
        console.log('Tutorial OK mentve:', res);
        if (typeof loadPage === 'function') loadPage('kikoto_oldal');
    }, function (err) {
        console.warn('Tutorial OK mentési hiba:', err);
        if (typeof loadPage === 'function') loadPage('kikoto_oldal');
    });
};

// Globális PostMessage figyelő a Tutorial és Minigame Iframe eseményeihez (mindig aktív!)
if (typeof window !== 'undefined' && !window._ebpGlobalTutorialMessageBound) {
    window._ebpGlobalTutorialMessageBound = true;
    window.addEventListener('message', function (event) {
        if (!event.data) return;

        // 1. Three.js Minijáték események (Hártyavadász)
        if (event.data.source === 'threejs-minigame') {
            console.log('🎮 [Global] Three.js Minijáték esemény érkezett:', event.data);
            if (event.data.status === 'COMPLETED') {
                var target = event.data.targetPage || 'fedelzet_oldal';
                if (typeof loadPage === 'function') {
                    loadPage(target);
                }
            }
            return;
        }

        // 2. Tutorial Iframe események
        if (event.data.type !== 'EBOOK_PIRATES_TUTORIAL') return;
        console.log('🎮 [Global] Tutorial Iframe esemény érkezett:', event.data);

        if (event.data.action === 'saveTutorialState') {
            if (event.data.data) {
                try {
                    localStorage.setItem('ebp_tutorial_save', JSON.stringify(event.data.data));
                } catch (e) { }
                callBackend('saveTutorialState', [JSON.stringify(event.data.data)], function (res) {
                    console.log('Tutorial állapot felhőbe mentve:', res);
                });
            }
        } else if (event.data.action === 'tutorial_completed') {
            callBackend('markTutorialCompleted', ['3d_tutorial', event.data], function (res) {
                console.log('Tutorial befejezve és felírva válasz:', res);
                window.userTutorialCompleted = true;

                if (res && res.alreadyCompleted) {
                    var veteranMsg = res.message || "Te már tapasztalt tengeri zsivány vagy, ezeket a kincseket már megkaptad korábban! Menj vissza Hebokba!";
                    if (typeof window.showPopUp === 'function') {
                        window.showPopUp(veteranMsg, function () {
                            if (typeof loadPage === 'function') loadPage('kikoto_oldal');
                        });
                    } else {
                        alert(veteranMsg);
                        if (typeof loadPage === 'function') loadPage('kikoto_oldal');
                    }
                } else {
                    console.log('✅ Kincsek sikeresen felírva a felhőbe.');
                }
            }, function (err) {
                console.warn('Tutorial mentési hiba:', err);
            });
        } else if (event.data.action === 'navigate_to_page') {
            if (typeof loadPage === 'function') {
                loadPage(event.data.page || 'kikoto_oldal');
            }
        } else if (event.data.action === 'start_hartyahalaszat') {
            console.log('🎣 Átlépés a hivatalos Hártyahalászat minijátékba (minigame_fishing.html)...');
            var token = localStorage.getItem('ebookPiratesToken') || sessionStorage.getItem('ebookPiratesToken') || '';
            var host = document.getElementById('tutorial-unity-host');
            if (host) {
                host.innerHTML = '';
                var iframe = document.createElement('iframe');
                iframe.src = 'minigame_fishing.html?token=' + encodeURIComponent(token) + '&v=' + Date.now();
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0';
                iframe.setAttribute('allowfullscreen', 'true');
                iframe.setAttribute('allow', 'autoplay; fullscreen');
                iframe.setAttribute('title', 'eBookPirates Hártyahalászat');
                host.appendChild(iframe);
            }
        }
    });
}

/**
 * Ez a függvény végzi a kommunikációt a Google Apps Script Backenddel.
 * KIZÁRÓLAG a GitHub/Külső környezetben használd!
 * ROBUSZTUS BACKEND HÍVÓ - JSON VADÁSZ MÓDDAL 🏹
 * Képes kezelni, ha a Google HTML "szemetet" (fejlécet/hibaüzenetet) küld a JSON helyett/mellett.
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
        console.log("📦 " + msg);
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
            setLocalStatus('Fájlok szerveroldali összefűzése folyamatban (' + totalChunks + ' adag)...');
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
        setLocalStatus('Nagy fájl feltöltése... (' + (currentChunk + 1) + '/' + totalChunks + ' adag)');

        fetch(WEB_APP_URL, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify({
                action: 'receivePayloadChunk',
                data: [transferId, currentChunk, totalChunks, chunkData],
                token: token
            })
        }).then(function (r) { return r.text(); }).then(function (text) {
            var res = null;
            try { res = JSON.parse(text); } catch (e) { }
            if (res && res.success) {
                currentChunk++;
                sendNextChunk();
            } else {
                var err = new Error(res ? res.error : "Adag feltöltési hiba.");
                handleBackendError(err, onFailure);
            }
        }).catch(function (error) {
            handleBackendError(error, onFailure);
        });
    }

    sendNextChunk();
}

function callBackend(funcName, params, onSuccess, onFailure) {
    // A TE DEPLOYMENT URL-ED (Ellenőrizd, hogy a legfrissebb legyen!)
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyj9yi2WuDSb63Kgknpr9n8sGbtBVWuI295_bxrTONYlmlidgFkyB2HcxGYRCHyIpNf/exec";

    var token = localStorage.getItem('ebookPiratesToken');

    var requestPayloadString = JSON.stringify({ action: funcName, data: params, token: token });

    // LIMIT: 2 MB. E felett automatikusan bekapcsol az adagoló (Chunked Upload)!
    var CHUNK_SIZE = 1024 * 1024 * 2;
    if (requestPayloadString.length > CHUNK_SIZE) {
        uploadChunksSequentially(funcName, requestPayloadString, token, onSuccess, onFailure);
        return;
    }

    console.log("📡 Kérés indítása: " + funcName);

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
                    console.warn("Látszólagos hálózati megszakadás (Failed to fetch). A háttérfolyamat valószínűleg sikeresen fut tovább.");
                    if (onFailure) {
                        onFailure(new Error("A szerver válaszideje lejárt, de a könyvszentelés/művelet a háttérben valószínűleg sikeresen lefut. Kérjük, frissítsd az oldalt néhány perc múlva!"));
                    } else {
                        handleBackendError(new Error("A szerver válaszideje lejárt, de a könyvszentelés a háttérben valószínűleg sikeresen lefut. Frissíts pár perc múlva!"), null);
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
    // 1. UI Előkészítése
    document.getElementById('login-status').innerText = t('login_status_checking');
    const registerButtonContainer = document.getElementById('registerButtonContainer');
    registerButtonContainer.innerHTML = '';

    // 2. Adatok begyűjtése
    const formData = {
        name: document.getElementById('name').value,
        jelszo: document.getElementById('jelszo').value
    };

    // 3. Hívás a callBackend-en keresztül
    callBackend('performLogin', [formData],
        function (response) {
            if (response && response.success) {
                localStorage.setItem('ebookPiratesToken', response.token);
                try {
                    sessionStorage.setItem('ebookPiratesLoginName', formData.name || '');
                    sessionStorage.setItem('ebookPiratesLoginPass', formData.jelszo || '');
                } catch (storageError) {
                    console.warn('Nem sikerült ideiglenesen menteni a login adatokat.', storageError);
                }
                initializeApp(response.user);
            } else {
                document.getElementById('login-status').innerText = response.message;

                // Hibás login -> Regisztráció felkínálása
                const registerButton = document.createElement('button');
                registerButton.id = 'registerButton';
                registerButton.type = 'button'; // Fontos, hogy ne submitolja a formot
                registerButton.innerText = t('login_register_button');
                // Ide a TE Web App URL-ed kerüljön, ha van külön regisztrációs linked
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
    if (typeof showUniversalLoading === 'function') {
        showUniversalLoading("sot_preload_island");
    }
    if (typeof warmup3DHarborAssets === 'function') warmup3DHarborAssets();
    if (typeof preloadUserBaseData === 'function') preloadUserBaseData(user);
    window.inGame = user.inGame === true;
    window.activeShipId = user.activeShipId || '';
    window.currentUser = user;
    currentUserEmail = user.email; // Elmentjük, de a hívásokhoz nem kell küldeni!
    window.userTutorialCompleted = (user.tutorialCompleted === true || (user.startPage && user.startPage !== 'tutorial_oldal'));
    try {
        localStorage.setItem('ebook_pirates_username', user.name || '');
        localStorage.setItem('ebook_pirates_user_email', user.email || '');
        if (user.activeShipId) localStorage.setItem('ebook_pirates_active_ship_id', user.activeShipId);
        sessionStorage.setItem('ebook_is_logged_in', 'true');
        sessionStorage.setItem('ebookPiratesLoginName', user.name || '');
        sessionStorage.setItem('cached_user_data', JSON.stringify(user));
    } catch (e) { }
    var displayName = (user && user.name) ? user.name : (localStorage.getItem('ebook_pirates_username') || 'Turista');
    var userEl = document.getElementById('header-user-name');
    if (userEl) userEl.innerText = displayName;
    var titleEl = document.querySelector('.header-title');
    if (titleEl) titleEl.innerText = displayName;
    ensureCreditDisplayIsPresent();

    // 3D Terminál, Mobil Dokk és 2D Login elrejtése
    document.documentElement.classList.add('ebp-authenticated');
    var auth3d = document.getElementById('auth-3d-container');
    if (auth3d) auth3d.style.display = 'none';
    var mobDock = document.getElementById('mobile-input-dock');
    if (mobDock) mobDock.style.display = 'none';
    var loginView = document.getElementById('login-view');
    if (loginView) loginView.style.display = 'none';

    // Fő védett alkalmazás nézet (fejléc + tartalom) megjelenítése
    var appView = document.getElementById('app-view');
    if (appView) appView.style.display = 'flex';

    updateCreditDisplay();
    preloadLoadingGif();

    // Eseménykezelők
    var creditCellEl = document.getElementById('creditCell');
    if (creditCellEl) creditCellEl.onclick = updateCreditDisplay;
    var libLinkEl = document.getElementById('libraryLink');
    if (libLinkEl) libLinkEl.onclick = function () { loadPage('konyvtar'); };
    var treasLinkEl = document.getElementById('treasuresLink');
    if (treasLinkEl) treasLinkEl.onclick = function () { loadPage('kincsek'); };

    // --- ALOLDALAK PREPOZÍCIONÁLÁSA ÉS ÁTIRÁNYÍTÁS ---
    preloadAllSubpages(function () {
        console.log("⚓ Minden aloldal prepozícionálva a memóriában!");
        if (window.pendingMarketingData) {
            console.log("Marketing átirányítás aktiválva...");
            loadMarketingView(window.pendingMarketingData.bookId, window.pendingMarketingData.folderId);
            window.pendingMarketingData = null;
        } else {
            // Normál irányítás: utolsó látogatott aloldal vagy alapértelmezett
            var lastPage = null;
            try { lastPage = localStorage.getItem('ebook_last_active_page'); } catch (e) { }

            if (window.userTutorialCompleted) {
                if (lastPage && lastPage !== 'login' && lastPage !== 'index' && lastPage !== 'tutorial_oldal') {
                    console.log("⚓ Visszatérés az utoljára látogatott aloldalra:", lastPage);
                    loadPage(lastPage);
                } else if (user.startPage && user.startPage !== 'tutorial_oldal') {
                    loadPage(user.startPage);
                } else {
                    loadPage('kikoto_oldal');
                }
            } else {
                loadPage('tutorial_oldal');
            }
        }
    });
}

var isSessionChecked = false;

function checkSession() {
    if (isSessionChecked) return;
    const token = localStorage.getItem('ebookPiratesToken') || sessionStorage.getItem('ebookPiratesToken');

    function show3DAuthTerminal() {
        document.documentElement.classList.remove('ebp-authenticated');
        var appView = document.getElementById('app-view');
        if (appView) appView.style.display = 'none';
        var auth3d = document.getElementById('auth-3d-container');
        if (auth3d) auth3d.style.display = 'block';
        var mobDock = document.getElementById('mobile-input-dock');
        var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia('(max-width: 820px)').matches;
        if (mobDock) mobDock.style.display = isTouch ? 'block' : 'none';
        if (typeof initAuthTerminal3D === 'function') {
            initAuthTerminal3D();
        }
    }

    if (token) {
        document.documentElement.classList.add('ebp-authenticated');
        var auth3dEarly = document.getElementById('auth-3d-container');
        if (auth3dEarly) auth3dEarly.style.display = 'none';
        var appViewEarly = document.getElementById('app-view');
        if (appViewEarly) appViewEarly.style.display = 'flex';

        var cachedUserStr = sessionStorage.getItem('cached_user_data');
        if (cachedUserStr) {
            try {
                var cachedUser = JSON.parse(cachedUserStr);
                if (cachedUser && (cachedUser.email || cachedUser.name) && (cachedUser.isValid === true || cachedUser.startPage)) {
                    isSessionChecked = true;
                    console.log("⚡ Azonnali indulás gyorsítótárazott profilból:", cachedUser.name);
                    initializeApp(cachedUser);
                    // Háttérben frissítjük az aktuális profilt a backendről
                    callBackend('getUserDataByToken', [token], function (freshUser) {
                        if (freshUser && (freshUser.email || freshUser.name) && freshUser.isValid === true) {
                            sessionStorage.setItem('cached_user_data', JSON.stringify(freshUser));
                            window.currentUser = freshUser;
                            if (freshUser.activeShipId) window.activeShipId = freshUser.activeShipId;
                        }
                    }, function () { });
                    return;
                }
            } catch (e) {
                console.warn("Gyorsítótárazott profil elemzési hiba:", e);
            }
        }

        isSessionChecked = true;
        callBackend('getUserDataByToken', [token],
            function (user) {
                var isValidUser = !!(user && (user.email || user.name) && user.isValid === true);
                if (isValidUser) {
                    console.log("Sikeres visszatérés:", user.name);
                    initializeApp(user);
                } else {
                    console.warn("A token lejárt vagy érvénytelen, 3D terminál aktiválása.");
                    localStorage.removeItem('ebookPiratesToken');
                    sessionStorage.removeItem('ebookPiratesToken');
                    sessionStorage.removeItem('ebook_is_logged_in');
                    sessionStorage.removeItem('cached_user_data');
                    show3DAuthTerminal();
                }
            },
            function (err) {
                console.warn("Session check hiba, 3D terminál aktiválása:", err);
                show3DAuthTerminal();
            }
        );
    } else {
        console.log("Nincs mentett token, 3D terminál aktiválása.");
        show3DAuthTerminal();
    }
}

// ==========================================
// === LOGOUT (3D TERMINÁLRA VISSZAVÁLTVA) ===
// ==========================================

function logout() {
    document.documentElement.classList.remove('ebp-authenticated');
    sessionStorage.removeItem('ebookPiratesToken');
    localStorage.removeItem('ebookPiratesToken');
    localStorage.removeItem('ebook_pirates_username');
    localStorage.removeItem('ebook_pirates_user_email');
    localStorage.removeItem('ebook_last_active_page');
    sessionStorage.removeItem('ebookPiratesLoginName');
    sessionStorage.removeItem('ebookPiratesLoginPass');
    sessionStorage.removeItem('ebook_is_logged_in');
    sessionStorage.removeItem('cached_user_data');

    // Globális változók nullázása
    if (typeof currentUserEmail !== 'undefined') currentUserEmail = '';

    // Tiszta frissítés a belépő aloldalra, hogy a 3D kamera és vezérlő fókuszba álljon
    window.location.href = 'index.html';
}

// ==========================================
// === KALÓZKREDIT BEOLVASÁS ÉS FRISSÍTÉS ===
// ==========================================

function updateCreditDisplay() {
    var token = localStorage.getItem('ebookPiratesToken') || sessionStorage.getItem('ebookPiratesToken') || '';
    if (!currentUserEmail && !token) return;
    var creditValEl = document.getElementById('creditValue');
    if (creditValEl) {
        creditValEl.innerText = (typeof t === 'function') ? t('credit_loading') : '...';
    }

    // ÜRES TÖMB a paraméter, mert a Backend automatikusan megkapja az Emailt / Tokent!
    callBackend('getPirateCredit', [],
        function (credit) {
            var creditValEl = document.getElementById('creditValue');
            if (creditValEl) {
                creditValEl.innerText = (credit !== undefined && credit !== null) ? credit : '0';
            }
        },
        function (error) {
            var creditValEl = document.getElementById('creditValue');
            if (creditValEl) {
                creditValEl.innerText = (typeof t === 'function') ? t('credit_error') : '0';
            }
        }
    );
}

function ensureCreditDisplayIsPresent() {
    if (!document.getElementById('creditValue')) {
        console.warn("Hiba: A 'creditValue' HTML elem nem található a fejlécben!");
    }
}

// =======================================================
// === FEJLÉC VEZÉRLŐK (NYELVVÁLASZTÓ ÉS MOBIL MENÜ) ===
// =======================================================

function toggleHeaderLangDropdown(event, forceState) {
    if (event && event.stopPropagation) event.stopPropagation();
    var dropdown = document.getElementById('header-lang-dropdown');
    if (!dropdown) return;
    var mobilePopup = document.getElementById('header-mobile-popup');
    if (mobilePopup) mobilePopup.style.display = 'none';

    if (typeof forceState === 'boolean') {
        dropdown.style.display = forceState ? 'flex' : 'none';
    } else {
        dropdown.style.display = (dropdown.style.display === 'none' || !dropdown.style.display) ? 'flex' : 'none';
    }
}

function toggleHeaderMobileSettings(event, forceState) {
    if (event && event.stopPropagation) event.stopPropagation();
    var popup = document.getElementById('header-mobile-popup');
    if (!popup) return;
    var langDropdown = document.getElementById('header-lang-dropdown');
    if (langDropdown) langDropdown.style.display = 'none';

    if (typeof forceState === 'boolean') {
        popup.style.display = forceState ? 'flex' : 'none';
    } else {
        popup.style.display = (popup.style.display === 'none' || !popup.style.display) ? 'flex' : 'none';
    }
}

// Globális kattintás figyelő a felugró fejlécpanelek bezárására
if (typeof document !== 'undefined' && !window._headerDropdownListenerBound) {
    window._headerDropdownListenerBound = true;
    document.addEventListener('click', function (e) {
        var langDropdown = document.getElementById('header-lang-dropdown');
        if (langDropdown && langDropdown.style.display !== 'none') {
            langDropdown.style.display = 'none';
        }
        var mobilePopup = document.getElementById('header-mobile-popup');
        if (mobilePopup && mobilePopup.style.display !== 'none') {
            mobilePopup.style.display = 'none';
        }
    });
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
    uiAlert("Hártya halászat hamarosan...");
}

// === BETÖLTÉS ÉS UI ===

function preloadLoadingGif() {
    console.log("GIF beállítása helyi forrásból...");

    var gifElement = document.getElementById('loading-gif');
    if (gifElement) {
        gifElement.src = 'https://storage.googleapis.com/kalozsziget-assets/images/download.gif';
        console.log("GIF beállítva (Backend hívás nélkül).");
    }
}

// Indítás, amikor a HTML kész
document.addEventListener('DOMContentLoaded', function () {
    preloadLoadingGif();

    // Jelszó megjelenítése / elrejtése szem ikon kezelő
    var togglePass = document.getElementById('togglePassword');
    var passInput = document.getElementById('jelszo');
    if (togglePass && passInput) {
        togglePass.style.cursor = 'pointer';
        togglePass.onclick = function () {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                togglePass.classList.remove('fa-eye');
                togglePass.classList.add('fa-eye-slash');
            } else {
                passInput.type = 'password';
                togglePass.classList.remove('fa-eye-slash');
                togglePass.classList.add('fa-eye');
            }
        };
    }
});

function updateCreditDisplay() {
    if (!currentUserEmail) return; // Csak biztonsági check kliens oldalon
    document.getElementById('creditValue').innerText = t('credit_loading');

    // ÜRES TÖMB a paraméter, mert a Backend automatikusan megkapja az Emailt!
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
        console.warn("Hiba: A 'creditValue' HTML elem nem található a fejlécben!");
    }
}
/**
 * KÖZPONTI OLDALBETÖLTŐ
 * JAVÍTVA: Nem küldjük az emailt, csak az oldal nevét!
 */
function loadPage(pageName) {
    var closeIcon = document.querySelector('.header-close-icon');

    // === 0. TUTORIAL JOGOSULTSÁG KAPUŐRZŐ ===
    if (window.userTutorialCompleted === false) {
        if (pageName !== 'tutorial_oldal') {
            console.warn("⚠️ Jogosulatlan oldalhozzáférés blokkolva:", pageName, "(A tutorial még nincs teljesítve!)");
            if (typeof uiAlert === 'function') {
                uiAlert("Előbb el kell végezned a bevezető matrózképzést a Kalózszigeten, csak utána hajózhatsz ki a Kikötőbe!", "Kikötőmester: Belépés Megtagadva");
            } else {
                alert("Előbb el kell végezned a bevezető matrózképzést a Kalózszigeten!");
            }
            if (closeIcon) closeIcon.style.display = 'none';
            if (currentPageName !== 'tutorial_oldal') {
                loadPage('tutorial_oldal');
            }
            return;
        }
    }

    if (pageName === 'game_oldal') {
        window.inGame = true;
        if (closeIcon) closeIcon.style.display = 'none';
    } else if (pageName === 'fedelzet_oldal' || pageName === 'hajomuhely_oldal') {
        window.inGame = false;
        if (closeIcon) closeIcon.style.display = 'block';
    } else if (pageName === 'tutorial_oldal' && window.userTutorialCompleted === false) {
        if (closeIcon) closeIcon.style.display = 'none';
    } else {
        if (closeIcon) closeIcon.style.display = 'block';
    }

    // === JÁTÉK STÁTUSZ BLOKKOLÁS ===
    if (window.inGame) {
        if (pageName !== 'game_oldal' && pageName !== 'konyvtar' && pageName !== 'kincsek') {
            if (typeof uiAlert === 'function') {
                uiAlert("Nem hagyhatod el a játékot! (Kivéve Könyvtár és Kincsek)", "Kikötőmester: Megtagadva");
            }
            return;
        }
    }

    currentPageName = pageName;
    if (pageName && pageName !== 'login' && pageName !== 'index') {
        try { localStorage.setItem('ebook_last_active_page', pageName); } catch (e) { }
    }

    var isFullScreenGameplay = (pageName === 'tutorial_oldal' || pageName === 'game_oldal');

    var headerElem = document.getElementById('header');
    if (headerElem) {
        headerElem.style.display = isFullScreenGameplay ? 'none' : 'flex';
    }
    var headerStats = document.getElementById('header-stats');
    if (headerStats) {
        headerStats.style.display = isFullScreenGameplay ? 'none' : 'flex';
    }

    const contentDiv = document.getElementById('content');
    const kikotoContainer = document.getElementById('persistent-kikoto-container');
    const loadingOverlay = document.getElementById('loading-overlay');

    // =========================================================================
    // === A. KIKÖTŐ OLDAL (PERZISZTENS 3D NÉZET - 0 MS AZONNALI MEGJELENÍTÉS) ===
    // =========================================================================
    if (pageName === 'kikoto_oldal') {
        if (contentDiv) {
            contentDiv.style.display = 'none';
            contentDiv.innerHTML = '';
        }
        if (kikotoContainer) {
            kikotoContainer.style.display = 'block';
        }
        var kContent = document.getElementById('kikoto_oldal-content');
        if (kContent) kContent.style.display = 'block';
        var kSplash = document.getElementById('kikoto_oldal-splash');
        if (kSplash) kSplash.style.display = 'none';

        function afterKikotoMount() {
            var kContentEl = document.getElementById('kikoto_oldal-content');
            if (kContentEl) kContentEl.style.display = 'block';
            var kSplashEl = document.getElementById('kikoto_oldal-splash');
            if (kSplashEl) kSplashEl.style.display = 'none';

            if (typeof updateLanguageUI === 'function') updateLanguageUI();
            if (typeof bindLanguageButtons === 'function') bindLanguageButtons();

            if (typeof initializeKikotoOldal === 'function') {
                initializeKikotoOldal();
            }
            if (typeof initializePage === 'function') {
                initializePage('kikoto_oldal');
            }

            callBackend('getPageDataAndContent', ['kikoto_oldal'],
                function (result) {
                    setupAccordionListeners();
                },
                function (error) {
                    console.warn("Kikötő adatok betöltési figyelmeztetés:", error);
                    setupAccordionListeners();
                }
            );
        }

        // Ha a kikötő 3D már egyszer felépült a GPU memóriában -> Azonnali aktiválás és állapot visszaállítás (0 ms)!
        if (kikotoContainer && kikotoContainer.children.length > 0 && window._kikoto3DInitialized) {
            if (loadingOverlay) loadingOverlay.style.display = 'none';

            // ⚓ Állapot, kamera, sötétítő réteg és hover buborékok garantált felébresztése/visszaállítása
            if (typeof window._resetKikotoViewport === 'function') {
                window._resetKikotoViewport();
            } else if (typeof window._kikotoResizeHandler === 'function') {
                window._kikotoResizeHandler();
            }

            // Biztonsági sötétítő rétegek takarítása a DOM-ban is
            var sceneOverlay = document.getElementById('scene-transition-overlay');
            if (sceneOverlay) {
                sceneOverlay.classList.remove('active');
                sceneOverlay.style.opacity = '0';
                sceneOverlay.style.pointerEvents = 'none';
                sceneOverlay.style.display = 'none';
            }
            var kikoto3DOverlay = document.getElementById('kikoto-3d-loading-overlay');
            if (kikoto3DOverlay) {
                kikoto3DOverlay.style.opacity = '0';
                kikoto3DOverlay.style.pointerEvents = 'none';
                kikoto3DOverlay.style.display = 'none';
            }

            window.dispatchEvent(new Event('resize'));
            if (typeof updateLanguageUI === 'function') updateLanguageUI();
            if (typeof initializePage === 'function') initializePage('kikoto_oldal');
            return;
        }

        // Első inicializálás: Sablon beillesztése és motor indítása
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
        if (window.pageTemplateCache && window.pageTemplateCache['kikoto_oldal']) {
            if (kikotoContainer) kikotoContainer.innerHTML = window.pageTemplateCache['kikoto_oldal'];
            afterKikotoMount();
        } else {
            fetch(getPageHtmlUrl('kikoto_oldal'), { cache: 'no-cache' })
                .then(function (res) {
                    if (!res.ok) throw new Error('HTTP ' + res.status);
                    return res.text();
                })
                .then(function (htmlText) {
                    if (window.pageTemplateCache) window.pageTemplateCache['kikoto_oldal'] = htmlText;
                    if (kikotoContainer) kikotoContainer.innerHTML = htmlText;
                    afterKikotoMount();
                })
                .catch(function (err) {
                    if (kikotoContainer) kikotoContainer.innerHTML = '<p>Hiba a Kikötő betöltésekor: ' + err.message + '</p>';
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                });
        }
        return;
    }

    // =========================================================================
    // === B. MINDEN EGYÉB ALOLDAL (Taverna, Bank, Piac, Fedélzet, stb.) =====
    // =========================================================================
    if (kikotoContainer) {
        kikotoContainer.style.display = 'none'; // 3D kikötő háttérbe rejtése altatás nélkül
    }
    if (contentDiv) {
        contentDiv.style.display = 'block';
        if (pageName === 'tutorial_oldal' || pageName === 'game_oldal') {
            contentDiv.style.padding = '0';
            contentDiv.style.overflow = 'hidden';
        } else {
            contentDiv.style.padding = '20px';
            contentDiv.style.overflowY = 'auto';
        }
        contentDiv.innerHTML = '';
    }
    if (loadingOverlay) loadingOverlay.style.display = 'flex';

    function renderAndInitPage(htmlText) {
        if (contentDiv) contentDiv.innerHTML = htmlText;

        if (typeof updateLanguageUI === 'function') {
            updateLanguageUI();
        }
        if (typeof bindLanguageButtons === 'function') {
            bindLanguageButtons();
        }

        callBackend('getPageDataAndContent', [pageName],
            function (result) {
                var pageData = (result && result.pageData) ? result.pageData : {};
                const pagesWithSplash = ['fedelzet_oldal', 'hajomuhely_oldal', 'piac_oldal', 'bank_oldal', 'tekercsmester_oldal', 'masolatok_oldal', 'taverna_oldal', 'konyvszentely_oldal', 'felhokolostor_oldal', 'konyvtar', 'kincsek'];

                if (pageName === 'tutorial_oldal') {
                    runTutorialScript();
                } else if (pageName === 'konyvszentely_oldal') {
                    initializePage(pageName);
                    if (typeof initializeKonyvszentely === 'function') initializeKonyvszentely();
                } else if (pageName === 'felhokolostor_oldal') {
                    initializePage(pageName);
                    if (typeof refreshMonasteryWork === 'function') refreshMonasteryWork();
                } else if (pageName === 'fedelzet_oldal') {
                    initializePage(pageName);
                    if (typeof initFedelzetOldal === 'function') initFedelzetOldal();
                } else if (pageName === 'konyvtar') {
                    initializePage(pageName);
                    if (typeof initializeLibraryAndMapPage === 'function') initializeLibraryAndMapPage(pageData);
                } else if (pageName === 'tekercsmester_oldal') {
                    initializePage(pageName);
                    if (typeof initializeTekercsmesterPage === 'function') initializeTekercsmesterPage(pageData);
                    if (typeof loadCompletableScrolls === 'function') loadCompletableScrolls();
                } else if (pageName === 'piac_oldal') {
                    initializePage(pageName);
                    if (typeof initializePiacOldal === 'function') initializePiacOldal();
                } else if (pageName === 'bank_oldal') {
                    initializePage(pageName);
                    if (typeof initializeBankOldal === 'function') initializeBankOldal();
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
                        console.error("HIBA: initializeUploadForm nincs definiálva!");
                    }
                } else if (pagesWithSplash.includes(pageName)) {
                    initializePage(pageName);
                }

                setupAccordionListeners();
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (typeof hideUniversalLoading === 'function') hideUniversalLoading("sot_welcome_pirate_island", 600);
            },
            function (error) {
                console.warn("Oldal adatok betöltési hiba (fallback inicializálás):", error);
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (typeof hideUniversalLoading === 'function') hideUniversalLoading();
                if (pageName === 'tutorial_oldal') {
                    runTutorialScript();
                } else {
                    initializePage(pageName);
                }
            }
        );
    }

    // ⚡ Memóriabeli sablon gyorsítótár azonnali betöltése (0 ms várakozás)
    if (window.pageTemplateCache && window.pageTemplateCache[pageName]) {
        renderAndInitPage(window.pageTemplateCache[pageName]);
    } else {
        fetch(getPageHtmlUrl(pageName), { cache: 'no-cache' })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('HTTP ' + response.status);
                }
                return response.text();
            })
            .then(function (htmlText) {
                if (window.pageTemplateCache) {
                    window.pageTemplateCache[pageName] = htmlText;
                }
                renderAndInitPage(htmlText);
            })
            .catch(function (error) {
                if (contentDiv) {
                    contentDiv.innerHTML = '<p>' + (typeof t === 'function' ? t('page_load_error_prefix') : 'Hiba: ') + error.message + '</p>';
                }
                if (loadingOverlay) loadingOverlay.style.display = 'none';
                if (typeof hideUniversalLoading === 'function') hideUniversalLoading();
            });
    }
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
// === ACCORDION KEZELÉS (EREDETI) ===
// ==========================================

/**
 * Beállítja az eseménykezelőket az összes accordion gombhoz az oldalon.
 */
function setupAccordionListeners() {
    const acc = document.querySelectorAll(".accordion-button");
    acc.forEach(button => {
        button.removeEventListener('click', toggleAccordionPanel);
        button.addEventListener('click', toggleAccordionPanel);
    });
}

/**
 * Az accordion gombra kattintáskor lefutó eseménykezelő.
 */
function toggleAccordionPanel() {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null; // Bezárás
    } else {
        // Kinyitás: a BELSŐ tartalom magasságát használjuk + némi padding
        const content = panel.querySelector('.accordion-panel-content');
        // Biztonsági ellenőrzés, ha nincs belső content div
        const scrollHeight = content ? content.scrollHeight : panel.scrollHeight;
        panel.style.maxHeight = (scrollHeight + 30) + "px";
    }
}

// ==========================================
// === SPLASH SCREEN / OLDAL LÁTOGATÁS ===
// ==========================================

/**
 * Ellenőrzi, hogy a felhasználó látta-e már az adott oldalt.
 * Ha igen -> Tartalom megjelenítése.
 * Ha nem -> Splash (Infó) képernyő megjelenítése.
 */
function initializePage(pageName) {
    if (pageName === 'kikoto_oldal') {
        const kSplash = document.getElementById('kikoto_oldal-splash');
        const kContent = document.getElementById('kikoto_oldal-content');
        if (kSplash) kSplash.style.display = 'none';
        if (kContent) kContent.style.display = 'block';
        return;
    }
    const splash = document.getElementById(pageName + '-splash');
    const content = document.getElementById(pageName + '-content');

    // Helyi gyorsítótár ellenőrzése
    var isLocallySeen = (localStorage.getItem('seen_' + pageName) === 'true');
    if (isLocallySeen && splash && content) {
        splash.style.display = 'none';
        content.style.display = 'block';
    }

    callBackend('getPageStatus', [pageName],
        function (status) {
            if (!splash || !content) {
                console.warn("Hiba: Nem találhatók a HTML elemek ehhez: " + pageName);
                return;
            }

            var normalizedStatus = String(status || '').trim().toLowerCase();
            if (normalizedStatus === 'ok') {
                localStorage.setItem('seen_' + pageName, 'true');
                splash.style.display = 'none';
                content.style.display = 'block';
                if (pageName === 'kikoto_oldal' && typeof initializeKikotoOldal === 'function') {
                    initializeKikotoOldal();
                }
            } else {
                splash.style.display = 'block';
                content.style.display = 'none';
            }
        },
        function (err) {
            console.warn("getPageStatus fallback (" + pageName + "):", err.message || err);
            if (splash && content) {
                // Ha már látta helyileg, vagy aktív a játékos, nem rekesztjük a splash-be
                if (isLocallySeen || window.userTutorialCompleted) {
                    splash.style.display = 'none';
                    content.style.display = 'block';
                    if (pageName === 'kikoto_oldal' && typeof initializeKikotoOldal === 'function') {
                        initializeKikotoOldal();
                    }
                } else {
                    splash.style.display = 'block';
                    content.style.display = 'none';
                }
            }
        }
    );
}

/**
 * A "Megértettem" gomb hívja: rögzíti a látogatást és vált a tartalomra.
 */
function markPageAsSeen(pageName) {
    const splash = document.getElementById(pageName + '-splash');
    const content = document.getElementById(pageName + '-content');

    if (!splash || !content) return;

    // Azonnali UI váltás (hogy gyorsnak tűnjön)
    splash.style.display = 'none';
    content.style.display = 'block';

    if (pageName === 'kikoto_oldal' && typeof initializeKikotoOldal === 'function') {
        initializeKikotoOldal();
    }

    // Háttérben mentés callBackend-del
    callBackend('setPageStatus', [pageName],
        function (res) { console.log(`${pageName} látogatás rögzítve.`); },
        function (err) { console.warn("Hiba a státusz mentésekor:", err); }
    );
}

/**
 * Kézzel visszahozza a Splash képernyőt (az "Infó" gomb).
 * Nem módosít adatbázist, csak UI váltás.
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
    console.log('runTutorialScript() FÜGGVÉNY ELINDULT (Unity + fallback verzió).');

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
                { question: 'Mi a neve a játékban használatos fizetőeszköznek?', options: ['Arany', 'Kalózkredit', 'Gyöngy', 'Dublon'], correctAnswer: 'Kalózkredit' },
                { question: 'Hol tudsz új küldetéseket felvenni?', options: ['A piacon', 'A szentélyben', 'A kocsmában', 'A tekercsmesternél'], correctAnswer: 'A kocsmában' },
                { question: 'Mire használhatod a letkristályokat?', options: ['Új hajó vásárlására', 'A könyvek fejlesztésére', 'Azonnali utazásra', 'A jutalék csökkentésére'], correctAnswer: 'A könyvek fejlesztésére' }
            ],
            en: [
                { question: 'What is the name of the main currency used in the game?', options: ['Gold', 'Pirate Credit', 'Pearl', 'Doubloon'], correctAnswer: 'Pirate Credit' },
                { question: 'Where can you take new quests?', options: ['At the market', 'At the shrine', 'At the tavern', 'At the scroll master'], correctAnswer: 'At the tavern' },
                { question: 'What can spirit crystals be used for?', options: ['Buying a new ship', 'Upgrading books', 'Instant travel', 'Reducing commission'], correctAnswer: 'Upgrading books' }
            ],
            de: [
                { question: 'Wie heißt die wichtigste Währung im Spiel?', options: ['Gold', 'Piratenkredit', 'Perle', 'Dublone'], correctAnswer: 'Piratenkredit' },
                { question: 'Wo kannst du neue Aufträge annehmen?', options: ['Auf dem Markt', 'Im Heiligtum', 'In der Taverne', 'Beim Schriftrollenmeister'], correctAnswer: 'In der Taverne' },
                { question: 'Wofür kannst du Seelenkristalle verwenden?', options: ['Neues Schiff kaufen', 'Bücher verbessern', 'Sofortreise', 'Provision senken'], correctAnswer: 'Bücher verbessern' }
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
                { question: 'Как называется основная валюта в игре?', options: ['Золото', 'Пиратский кредит', 'Жемчуг', 'Дублон'], correctAnswer: 'Пиратский кредит' },
                { question: 'Где можно взять новые задания?', options: ['На рынке', 'В святилище', 'В таверне', 'У мастера свитков'], correctAnswer: 'В таверне' },
                { question: 'Для чего нужны кристаллы духа?', options: ['Покупка нового корабля', 'Улучшение книг', 'Мгновенное путешествие', 'Снижение комиссии'], correctAnswer: 'Улучшение книг' }
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
            setUnityStatus('Hiányzó játékmotor útvonal.', '#c0392b');
            return;
        }

        host.innerHTML = '';
        var iframe = document.createElement('iframe');
        iframe.src = unityTargetUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        iframe.setAttribute('allowfullscreen', 'true');
        iframe.setAttribute('allow', 'autoplay; fullscreen');
        iframe.setAttribute('title', 'eBookPirates Tutorial');

        iframe.onload = function () {
            stopUnityTimeout();
            setUnityStatus('Tutorial betöltve.', '#00ffcc');
        };

        iframe.onerror = function () {
            setUnityStatus('Hiba a tutorial betöltésekor.', '#c0392b');
        };

        host.appendChild(iframe);
        setUnityStatus('Tutorial indítása...', '#d4af37');

        stopUnityTimeout();
        unityLaunchTimeoutId = setTimeout(function () {
            setUnityStatus('Tutorial aktív.', '#00ffcc');
        }, 8000);
    }

    function tryLaunchUnity(flow, autoStart) {
        ensureUnityUiElements();

        var gamePanel = document.getElementById('tutorial-game-panel');
        var host = document.getElementById('tutorial-unity-host');

        if (!gamePanel || !host) {
            return;
        }

        var unityUrl = 'demojatek/MainMenuTutorial.html';
        var mode = (flow && flow.tutorialCompleted) ? 'completed' : 'tutorial';
        var isLoadParam = (flow && flow.isLoad) ? '&load=1' : '';
        unityTargetUrl = unityUrl + '?mode=' + mode + '&new=1' + isLoadParam;

        gamePanel.style.display = 'block';
        mountUnityIframe(host);
    }

    function initializeTutorialPage(flow) {
        currentFlowState = flow || {};
        var gamePanel = document.getElementById('tutorial-game-panel');
        if (gamePanel) gamePanel.style.display = 'block';
        tryLaunchUnity(flow || {}, true);
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
            showFeedback(t('error_prefix') + 'Nem sikerült kérdést betölteni.', 'red');
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
            showFeedback(t('error_prefix') + 'Érvénytelen kérdés adatok érkeztek.', 'red');
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
            console.warn('Játékállás token mentése sikertelen:', err);
        });
    };

    window.onTutorialSuccess = function (boatData) {
        var extraData = (typeof boatData === 'object' && boatData !== null) ? boatData : { boatName: boatData || 'Gyöngyhalász', passed: true, score: 10 };
        callBackend('markTutorialCompleted', ['unity', extraData], function (res) {
            console.log('Tutorial OK mentve:', res);
            loadPage('kikoto_oldal');
        }, function (err) {
            console.warn('Tutorial OK mentési hiba:', err);
            loadPage('kikoto_oldal');
        });
    };

    window.onUnityTutorialFailed = function (reason) {
        console.warn('Unity tutorial hiba jelzés:', reason || t('tutorial_unity_fail_reason_unknown'));
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
/* === STÍLUSOS RENDSZER ÜZENETEK (UI) === */
/* ========================================= */

// 1. Az alap függvény (Ezt hívja a többi)
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

    // Tartalom feltöltése
    titleEl.innerText = title;
    bodyEl.innerHTML = message; // HTML-t is engedünk (pl. sortörés, félkövér)
    iconEl.className = iconClass || 'fas fa-scroll'; // Alapértelmezett ikon

    // Gombok generálása
    btnContainer.innerHTML = ''; // Töröljük az előzőket

    buttons.forEach(btnDef => {
        const btn = document.createElement('button');
        btn.className = 'btn'; // A te alap stílusod
        btn.innerText = btnDef.text;

        // Egyedi stílus (opcionális)
        if (btnDef.color) btn.style.backgroundColor = btnDef.color;
        if (btnDef.textColor) btn.style.color = btnDef.textColor;

        // Kattintás esemény
        btn.onclick = function () {
            modal.style.display = 'none'; // Bezárás
            if (typeof btnDef.callback === 'function') {
                btnDef.callback();
            }
        };

        btnContainer.appendChild(btn);
    });

    // Megjelenítés
    modal.style.display = 'flex';
}

// 2. HELYETTESÍTŐ: alert() helyett -> uiAlert()
function uiAlert(message, title = t('modal_notice_title')) {
    showSystemModal(
        title,
        message,
        "fas fa-exclamation-circle", // Ikon
        [{ text: t('modal_ok'), color: "#2e8b57", textColor: "white" }]
    );
}

// 3. HELYETTESÍTŐ: confirm() helyett -> uiConfirm()
function uiConfirm(message, title, onYes) {
    showSystemModal(
        title || t('modal_confirm_title'),
        message,
        "fas fa-question-circle", // Ikon
        [
            { text: t('modal_yes'), color: "#2e8b57", textColor: "white", callback: onYes },
            { text: t('modal_cancel'), color: "#8b0000", textColor: "white" } // A Mégse csak bezár
        ]
    );
}

// 4. HELYETTESÍTŐ: prompt() helyett -> uiPrompt()
function uiPrompt(message, title, placeholder, onCommit) {
    // Egyedi ID a beviteli mezőnek
    const inputId = 'sys-modal-input-' + Date.now();

    // HTML tartalom: Szöveg + Input mező
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
                    // Itt olvassuk ki az értéket, még mielőtt a modal tartalma törlődne
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


// === GLOBÁLIS VÁLTOZÓ A KÁRTYAKÉPEKNEK ÉS EGYÉB ASSETEKNEK ===
const tavernaImageSources = {
    kartya_hatlap: null,
    kartya_pirosasz: null,
    kartya_fekbub: null,
    kartya_fekkar: null,
    kartyakeveres_gif: null,
    dark_wood: null
};

/**
 * Előtölti a Taverna összes szükséges képét a központi képkezelőből.
 * @param {function} callback A függvény, ami a sikeres betöltés után lefut.
 */
function preloadTavernaImages(callback) {
    // Ha már be vannak töltve a képek, nem kérjük le újra.
    if (tavernaImageSources.kartya_hatlap) {
        if (callback) callback(); // <--- ITT VOLT A HIBA (töröltem a "uiAlert"-et)
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    // Hívás a callBackend-del (paraméterek nélkül, mert a Router nem kér semmit ehhez)
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
* Segédfüggvény a Pult modal nézeteinek váltogatásához.
* @param {string} viewName A megjelenítendő nézet neve (read, compose, check_status_init, feedback).
*/
function showPultView(viewName) {
    // Összes nézet elrejtése
    document.getElementById('pult-view-read').style.display = 'none';
    document.getElementById('pult-view-compose').style.display = 'none';
    document.getElementById('pult-view-check_status_init').style.display = 'none';
    document.getElementById('pult-view-feedback').style.display = 'none';

    // A "compose again" gomb alaphelyzetbe állítása
    document.getElementById('pult-feedback-compose-again-btn').style.display = 'none';

    // A kért nézet megjelenítése
    const viewToShow = document.getElementById(`pult-view-${viewName}`);
    if (viewToShow) {
        viewToShow.style.display = 'block';
    }

    // Ha a fő nézetre térünk vissza, frissítjük az üzenetlistát
    if (viewName === 'read') {
        loadTavernaMessages();
    }
}

/**
 * Betölti a felhasználó üzeneteit a szerverről és megjeleníti őket.
 */
function loadTavernaMessages() {
    const messagesListDiv = document.getElementById('pult-messages-list');
    messagesListDiv.innerHTML = '<p>' + t('taverna_messages_loading') + '</p>';

    const userName = document.querySelector('.header-title').innerText;

    // ÚJ HÍVÁS (Router):
    // Csak a userName-t küldjük, az emailt a Router intézi!
    callBackend('getTavernaMessages', [userName],
        function (messages) {
            if (messages && messages.length > 0) {
                let messagesHTML = '';
                messages.forEach(msg => {
                    messagesHTML += `<p><strong>${msg.sender} üzeni:</strong> ${msg.message}</p>`;
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
 * Bezárja az összes taverna oldali modalt/panelt.
 */
function closeAllTavernaModals() {
    const pultModal = document.getElementById('pult-modal');
    const asztalConfirmModal = document.getElementById('asztal-confirm-modal');
    const chatModal = document.getElementById('chat-modal');
    const jatekteremModal = document.getElementById('jatekterem-modal');

    if (pultModal) pultModal.style.display = 'none';
    if (asztalConfirmModal) asztalConfirmModal.style.display = 'none';
    if (jatekteremModal) jatekteremModal.style.display = 'none';

    // A chat panelt külön kezeljük, hogy a bezáráskor a kapcsolat is megszakadjon.
    if (chatModal && chatModal.style.display !== 'none') {
        chatModal.style.display = 'none';
        const chatIframe = document.getElementById('chat-iframe');
        if (chatIframe) chatIframe.src = 'about:blank';
    }
}


/**
* Inicializálja a Taverna oldalt: megjeleníti a kezdő üzenetet
* és eseménykezelőket rendel a gombokhoz.
*/
function initializeTavernaPage() {
    // --- VÁLTOZÓK FELVÉTELE ---
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

    // Játék elemek (ha kellenek később)
    const gameInfoText = document.getElementById('game-info-text');
    const gameFeedbackText = document.getElementById('game-feedback-text');
    const gameCardArea = document.getElementById('game-card-area');
    const gameBettingArea = document.getElementById('game-betting-area');

    // Játék állapot változók
    let playerCredit = 0;
    let prizePool = 0;
    let gameState = 'betting';
    let currentTavernPin = null;

    if (!pultBtn || !asztalBtn || !csevegBtn || !chatModal || !jatekteremBtn) {
        console.error(t('taverna_missing_controls'));
        return;
    }

    // Ezt az URL-t majd ellenőrizd, hogy helyes-e!
    const CHAT_ALKALMAZAS_URL = "https://script.google.com/macros/s/AKfycbyxkJipgYkB2K38MF5UzqB9kVYJnqk0QeaeIquVXdFgGL57zFDlVjGKQct-M605PqrS/exec";

    // --- ESEMÉNYKEZELŐK ---

    // 1. Üdvözlőpanel (Bartender)
    setTimeout(() => {
        if (typeof toggleBartender === 'function') {
            const panel = document.getElementById('bartender-panel');
            if (panel && panel.style.display === 'none') {
                toggleBartender();
            }
        }
    }, 500);

    // 2. PULT FUNKCIÓK (JAVÍTVA callBackend-re!)
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

        // --- JAVÍTÁS: callBackend ---
        // NEM küldjük a currentUserEmail-t! (A Router intézi)
        // Paraméterek sorrendje a Backendben: (email, senderName, recipientName, messageText)
        // Itt csak a maradék hármat küldjük:
        callBackend('sendTavernaMessage', [senderName, recipientName, messageText],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                document.getElementById('pult-feedback-text').innerText = response.message;

                if (response.success) {
                    updateCreditDisplay(); // Ez már a javított verzió
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

        // --- JAVÍTÁS: callBackend ---
        // NEM küldjük a currentUserEmail-t!
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

    // 3. ASZTAL (CHAT) FUNKCIÓK
    asztalBtn.onclick = () => {
        if (typeof closeAllTavernaModals === 'function') closeAllTavernaModals();
        asztalConfirmModal.style.display = 'flex';
    };

    csevegBtn.onclick = () => {
        const userName = document.querySelector('.header-title').innerText;
        // Itt HASZNÁLHATJUK a globális változót az URL építéshez (ez nem backend hívás)
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

    // 4. JÁTÉKTEREM (Már jó volt, de biztos ami biztos)
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

                    // callBackend Helyes használata (Nincs paraméter, nincs email)
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

// === JÁTÉKVEZÉRLŐ FÜGGVÉNYEK ===

function resetGame() {
    gameState = 'betting';

    // 1. Szövegek alaphelyzetbe
    const infoText = document.getElementById('game-info-text');
    const feedbackText = document.getElementById('game-feedback-text');
    const cardArea = document.getElementById('game-card-area');
    const bettingArea = document.getElementById('game-betting-area');

    if (infoText) infoText.innerText = t('game_info_bet_prompt');
    if (feedbackText) feedbackText.innerText = '';

    // 2. KÁRTYÁK KIRAJZOLÁSA (Csak dekoráció, NINCS kattintás esemény!)
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

    // 3. TÉT MEZŐ ÉS GOMB LÉTREHOZÁSA
    if (bettingArea) {
        bettingArea.innerHTML = ''; // Törlés

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

    // playerCredit globális változó
    if (typeof playerCredit !== 'undefined' && bet > playerCredit) {
        gameInfoText.innerText = t('game_all_in_warning');
        gameFeedbackText.innerText = t('game_not_enough_credit');
        gameBetInput.value = playerCredit;
        return;
    }
    // prizePool globális változó
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
    // Backtick helyett string összefűzés a biztonság kedvéért
    cardArea.innerHTML = '<img id="shuffle-gif" src="' + tavernaImageSources.kartyakeveres_gif + '" style="height: 300px; max-width: 100%;">';

    // Az animáció ideje (pl. 3 másodperc)
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

    // Stílus beszúrása dinamikusan (hogy a hover működjön)
    var styleId = 'card-game-style';
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = '.card { width: 120px; height: 180px; background-size: contain; background-repeat: no-repeat; transition: all 0.3s; cursor: pointer; background-image: url(' + tavernaImageSources.kartya_hatlap + '); } .card:hover { transform: scale(1.1); }';
        document.head.appendChild(style);
    }

    // Eseménykezelők hozzáadása
    // ITT adjuk át a 'bet' változót a handleCardChoice-nak!
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

    // UI frissítés: Töltés
    document.getElementById('loading-overlay').style.display = 'flex';

    // Globális currentTavernPin használata
    var pin = (typeof currentTavernPin !== 'undefined') ? currentTavernPin : null;

    // Backend hívás (Nincs email paraméter!)
    callBackend('playCardGame', [bet, pin],
        function (result) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (result.success) {
                // Globális változók frissítése
                if (typeof playerCredit !== 'undefined') playerCredit = result.newCredit;
                updateCreditDisplay();

                // Kártyák felfordítása
                // A választott kártya
                if (result.outcome === 'win') {
                    chosenCard.style.backgroundImage = 'url(' + tavernaImageSources.kartya_pirosasz + ')';
                } else {
                    // Véletlenszerű vesztes kártya (Bub vagy Király)
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

                // Gombok visszaállítása
                var playBtn = document.getElementById('game-play-btn');
                var betArea = document.getElementById('game-betting-area');
                var betInput = document.getElementById('game-bet-input');

                if (playBtn) {
                    playBtn.innerText = t('game_new_button');
                    playBtn.onclick = resetGame;
                }
                if (betArea) betArea.style.display = 'block';
                if (betInput) betInput.style.display = 'none'; // Elrejtjük az inputot az eredmény képernyőn

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

// --- BÉTA ASZTAL FRONTEND LOGIKA ---

// Pult nézetváltó bővítése
/**
* Váltogat a Pult belső nézetei között.
* @param {string} viewSuffix A nézet azonosítója (pl. 'read', 'compose', 'beta_menu').
*/
function showPultView(viewSuffix) {
    // A lehetséges nézetek ID-jainak listája
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

    // Mindenkit elrejtünk
    views.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });

    // A kiválasztottat megjelenítjük
    const targetId = `pult-view-${viewSuffix}`;
    const target = document.getElementById(targetId);
    if (target) {
        target.style.display = 'block';
    } else {
        console.warn(`Figyelem: A kért nézet (${targetId}) nem található.`);
    }

    // --- Speciális betöltési logikák ---

    // Ha visszalépünk a főmenübe, frissítsük az üzeneteket
    if (viewSuffix === 'read') {
        loadTavernaMessages();
    }

    // Ha a béta listát nyitjuk, töltsük le az adatokat
    if (viewSuffix === 'beta_list') {
        loadBetaWorks(); // Ez a függvény már létezik a kódodban
    }
}

// 1. JAVÍTOTT MODAL NYITÓ (Flex display + Suffix hívás)
function openPultModal() {
    const modal = document.getElementById('pult-modal');
    if (modal) {
        modal.style.display = 'flex'; // FONTOS: Flex a középre igazításhoz!

        // FONTOS: Csak a 'read' utótagot adjuk át, a showPultView kiegészíti!
        showPultView('read');
    } else {
        console.error("Hiba: Nem található a 'pult-modal' elem!");
    }
}

// 1.B Új Taverna Asztaltársaság hívása

function sendTavernJobsChat() {
    var inputEl = document.getElementById('tavern-jobs-chat-input');
    if (!inputEl) return;
    var message = inputEl.value.trim();
    if (!message) return;

    inputEl.value = '';
    var contentDiv = document.getElementById('tavern-jobs-content');
    contentDiv.innerHTML += '<p style="color: #000;"><b>Te:</b> ' + message + '</p>';
    contentDiv.scrollTop = contentDiv.scrollHeight;

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('handleTavernTableChat', [message], function (response) {
        if (loading) loading.style.display = 'none';
        if (response && response.reply) {
            contentDiv.innerHTML += '<p style="color: #8b0000;"><b>Munkások (NPC):</b> ' + response.reply.replace(/\n/g, '<br>') + '</p>';
        } else {
            contentDiv.innerHTML += '<p style="color: #8b0000;"><b>Munkások (NPC):</b> (Morgás és egyet nem értés hallatszik, de nincs érdemi válasz.)</p>';
        }
        contentDiv.scrollTop = contentDiv.scrollHeight;
    }, function (err) {
        if (loading) loading.style.display = 'none';
        contentDiv.innerHTML += '<p style="color: red;"><i>A kocsmazaj elnyomta a hangodat. (Hálózati hiba: ' + err.message + ')</i></p>';
    });
}

function openMercenaryMarketFromTavern() {
    var modal = document.getElementById('mercenary-market-modal');
    var listContainer = document.getElementById('mercenary-market-list');

    if (modal) modal.style.display = 'flex';
    if (listContainer) listContainer.innerHTML = '<p>Zsoldosok keresése a kocsmában...</p>';

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('getAvailableMercenaries', [], function (response) {
        if (loading) loading.style.display = 'none';

        if (response && response.success) {
            var html = '';
            var mercenaries = response.mercenaries || [];

            if (mercenaries.length === 0) {
                html = '<p>Jelenleg senki sem keres munkát a kocsmában.</p>';
            } else {
                mercenaries.forEach(function (merc) {
                    var mercCost = parseInt(merc.cost) || 10;
                    html += '<div style="background: rgba(255, 255, 255, 0.9); padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid #8b4513; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">';
                    html += '<strong style="color:#000; font-size:1.1em;">' + merc.name + '</strong> <span style="font-size:0.9em; color:#3e2723; font-style:italic;">(' + merc.role + ')</span><br>';
                    html += '<span style="font-size:0.9em; color:#8b0000; font-weight:bold;">Bérigény: ' + mercCost + ' Kr / hónap</span><br>';
                    html += '<span style="font-size:0.8em; color:#555;">Típus: ' + merc.type + '</span><br>';
                    html += '<div style="margin-top:8px; text-align:right;">';
                    // We call handleHireMercenary
                    html += '<button class="btn btn-sm" onclick="handleHireMercenary(\'' + merc.name + '\', ' + mercCost + ')" style="padding:5px 15px; font-size:0.9em;">Felbérel (' + mercCost + ' Kr)</button>';
                    html += '</div></div>';
                });
            }
            if (listContainer) listContainer.innerHTML = html;
        } else {
            if (listContainer) listContainer.innerHTML = '<p style="color:red;">Hiba a zsoldosok betöltésekor: ' + (response ? response.error : 'Ismeretlen hiba') + '</p>';
        }
    }, function (err) {
        if (loading) loading.style.display = 'none';
        if (listContainer) listContainer.innerHTML = '<p style="color:red;">Hálózati hiba: ' + err.message + '</p>';
    });
}

function handleHireMercenary(mercName, cost) {
    var pinCode = prompt("Zsoldos felbérlése: " + mercName + "\nÁr: " + cost + " Kr\n\nKérlek, add meg a Munkavállalói PIN kódodat a szerződés hitelesítéséhez:");
    if (!pinCode) return;

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('BT_hireMercenary', [pinCode, mercName, cost], function (response) {
        if (loading) loading.style.display = 'none';

        if (response && response.npcResponse && !response.npcResponse.includes("Hiba")) {
            uiAlert("Sikeres bérlés!", response.npcResponse);
            openMercenaryMarketFromTavern(); // Refresh the list!
        } else {
            uiAlert("Hiba", response ? response.npcResponse : "Ismeretlen hiba történt.");
        }
    }, function (err) {
        if (loading) loading.style.display = 'none';
        uiAlert("Hálózati hiba", err.message);
    });
}

function openTavernJobs() {
    const modal = document.getElementById('tavern-jobs-modal');
    if (modal) {
        modal.style.display = 'flex';
        const contentDiv = document.getElementById('tavern-jobs-content');
        contentDiv.innerHTML = '<p style="text-align: center;"><i>Odalépsz a leghangosabb asztalhoz...<br>A rendszer hallgatózik...</i></p>';

        if (typeof callBackend === 'function') {
            callBackend("getTavernJobs", [], function (response) {
                if (response && response.text) {
                    contentDiv.innerHTML = response.text.replace(/\n/g, '<br>');
                } else {
                    contentDiv.innerHTML = '<p>Az asztalnál lévők csak morognak. (Hiba: ' + (response.error || "Nincs válasz") + ')</p>';
                }
            });
        } else {
            contentDiv.innerHTML = '<p>A hálózati kapcsolat megszakadt, nem hallod, mit mondanak.</p>';
        }
    }
}

// 2. JAVÍTOTT KÖLTSÉG SZÁMOLÓ (Esemény delegálás - Nincs több "null" hiba!)
// Ez helyettesíti a régi 'DOMContentLoaded' blokkot
document.addEventListener('input', function (e) {
    // Figyeljük, ha valaki ír a béta mezőkbe
    if (e.target && (e.target.id === 'beta-bonus' || e.target.id === 'beta-max')) {
        updateBetaCost();
    }
});

function updateBetaCost() {
    const fee = 10;
    const bonusInput = document.getElementById('beta-bonus');
    const maxInput = document.getElementById('beta-max');

    // Ha még nincs betöltve a HTML, kilépünk hiba nélkül
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

// 1. FELTÖLTÉS INDÍTÁSA (PIN Kéréssel)
function initiateBetaUpload() {
    const title = document.getElementById('beta-title').value;
    const content = document.getElementById('beta-content').value;
    const bonus = document.getElementById('beta-bonus').value;
    const max = document.getElementById('beta-max').value;

    if (!title || !content) {
        uiAlert(t('beta_upload_missing_fields'));
        return;
    }

    // Adatok összegyűjtése
    const payload = {
        title: title,
        contentHtml: content.replace(/\n/g, '<br>'), // Sortörések konvertálása HTML-re
        bonusPerReader: bonus,
        maxReaders: max
    };

    // PIN bekérése a globális panellel
    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            sendBetaUploadToServer(pinCode, payload);
        }, t('beta_upload_confirm_html'));
    } else {
        // Ha valami csoda folytán mégsem lenne betöltve (fallback)
        const p = prompt(t('pin_prompt_label'));
        if (p) sendBetaUploadToServer(p, payload);
    }
}

// =========================================
// === BÉTA FELTÖLTÉS KÜLDÉSE (VISSZAJELZÉSSEL) ===
// =========================================

function sendBetaUploadToServer(pinCode, payload) {
    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('uploadBetaWorkToTavern', [pinCode, payload],
        function (response) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (response.success) {
                var feedbackEl = document.getElementById('pult-feedback-text');

                // JAVÍTVA: Sima string összefűzés
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

// 2. LISTA BETÖLTÉSE
function loadBetaWorks() {
    var container = document.getElementById('beta-list-container');
    container.innerHTML = '<p style="text-align:center;">' + t('beta_list_loading') + '</p>';

    // === ÚJ HÍVÁS (callBackend) ===
    // Backend: getAvailableBetaWorks
    // Paraméterek: [] (üres tömb, mert az emailt a Router intézi a Tokenből!)
    callBackend('getAvailableBetaWorks', [],
        function (res) {
            if (res.success) {
                // Ez hívja meg a renderelőt, ami kirajzolja a címeket!
                renderBetaList(res.works);
            } else {
                // JAVÍTVA: Backtick helyett sima string összefűzés
                container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>';
            }
        },
        function (err) {
            // JAVÍTVA: Backtick helyett sima string összefűzés
            container.innerHTML = '<p style="color:red;">' + t('server_error_prefix') + err.message + '</p>';
        }
    );
}

// A lista kirajzolása (Kliens oldal)
function renderBetaList(works) {
    const container = document.getElementById('beta-list-container');
    container.innerHTML = '';

    // --- 1. ÜRES ÁLLAPOT KEZELÉSE ---
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

    // --- 2. HA VANNAK MŰVEK, LISTÁZZUK ---
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

        // JAVÍTVA: Sima string összefűzés
        div.innerHTML = '<div style="display:flex; justify-content:space-between; align-items:center;">' +
            '<div style="flex: 1; padding-right: 10px;">' +
            '<strong style="color: #8b0000; font-size: 1.1em;">' + work.title + '</strong><br>' +
            '<small style="color: #555;">' + t('beta_list_author_label') + ' <strong>' + work.author + '</strong> | 📅 ' + work.date + '</small>' +
            '</div>' +
            '<div>' + actionBtn + '</div>' +
            '</div>';

        container.appendChild(div);
    });
}

// ===================================
// === BÉTA OLVASÓ (FRONTEND) ===
// ===================================

let currentBetaWorkId = null;
let currentBetaWorkTitle = null;

// 1. Olvasó Megnyitása
// (Ezt hívja a lista "Olvasás" gombja)
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
            // JAVÍTVA: Sima string
            contentArea.innerHTML = '<div class="status-box error">' + t('beta_reader_error_prefix') + e.message + '</div>';
        }
    );
}

// Ezt a függvényt hívja a "📖 Olvasok (Kreditszerzés)" gomb
function listBetaWorksForReader() {
    // 1. Átváltunk a listázó nézetre a pulton belül
    showPultView('beta_list');

    // 2. Meghívjuk az adatbetöltő függvényt (ami már létezik loadBetaWorks néven)
    // Ellenőrizzük, hogy létezik-e, hogy ne legyen hiba
    if (typeof loadBetaWorks === 'function') {
        loadBetaWorks();
    } else {
        console.error("Hiba: A 'loadBetaWorks' függvény nem található!");
        document.getElementById('beta-list-container').innerHTML = t('beta_reader_loader_missing');
    }
}

// 2. Kilépés (Megerősítéssel)
function closeBetaReader() {
    // Ellenőrizzük, írt-e már valamit
    const opinion = document.getElementById('log-opinion').value;

    // Belső függvény: Ez végzi a tényleges bezárást és törlést
    const veglegesBezaras = function () {
        document.getElementById('beta-reader-modal').style.display = 'none';
        document.getElementById('beta-log-form').reset();
    };

    if (opinion.length > 10) {
        // 1. ESET: Van szöveg -> Kérdezünk
        uiConfirm(
            t('beta_reader_exit_confirm'), // Üzenet
            t('beta_reader_exit_title'), // Cím
            function () {
                // Ez a CALLBACK: Csak akkor fut le, ha az "Igen"-re nyomott
                veglegesBezaras();
            }
        );
    } else {
        // 2. ESET: Nincs szöveg -> Azonnal bezárjuk kérdés nélkül
        veglegesBezaras();
    }
}

// 3. Napló Beküldése
function submitLogbook() {
    const gender = document.getElementById('log-gender').value;
    const age = document.getElementById('log-age').value;
    const genre = document.getElementById('log-genre').value;
    const language = document.getElementById('log-language').value;
    const opinion = document.getElementById('log-opinion').value;

    // Validáció
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
        opinionHtml: opinion.replace(/\n/g, '<br>'), // Sortörések megőrzése
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
// === SZERZŐI STATISZTIKA (FRONTEND) ===
// ===================================

// 1. Saját művek listázása
function showMyBetaStats() {
    showPultView('beta_my_works');

    const container = document.getElementById('beta-my-works-container');
    container.innerHTML = '<p style="text-align:center;"><i class="fas fa-spinner fa-spin"></i> ' + t('beta_my_works_loading') + '</p>';

    // === ÚJ HÍVÁS ===
    // Backend: getAuthorBetaWorks
    // Paraméterek: []
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

// Lista kirajzolása (Saját Művek) - BŐVÍTETT VERZIÓ
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

        var statusColor = work.status === 'AKTÍV' ? 'green' : 'gray';

        var controlButtons = '';
        if (work.status === 'AKTÍV') {
            // JAVÍTVA: String összefűzés
            controlButtons = '<div style="margin-top: 8px; display: flex; gap: 5px; justify-content: flex-end;">' +
                '<button class="btn btn-sm" style="background-color: #d2691e; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaRefill(\'' + work.id + '\', \'' + work.title + '\')">💰 ' + t('beta_my_works_refill_button') + '</button> ' +
                '<button class="btn btn-sm" style="background-color: #8b0000; color: white; padding: 4px 8px; font-size: 0.85em;" onclick="initiateBetaClose(\'' + work.id + '\', \'' + work.title + '\')">❌ ' + t('beta_my_works_close_button') + '</button>' +
                '</div>';
        } else {
            controlButtons = '<div style="text-align: right; font-size: 0.8em; color: gray; margin-top:5px;">' + t('beta_my_works_closed_note') + '</div>';
        }

        // JAVÍTVA: String összefűzés
        div.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;">' +
            '<div>' +
            '<strong style="color: #5d3a1a;">' + work.title + '</strong><br>' +
            '<small style="color: #555;">' + work.date + ' | <span style="color:' + statusColor + '; font-weight:bold;">' + work.status + '</span></small>' +
            '</div>' +
            '<button class="btn btn-sm" style="background-color: #4682b4; color: white;" onclick="initiateStatPurchase(\'' + work.id + '\')">📊 ' + t('beta_my_works_report_button') + '</button>' +
            '</div>' +
            controlButtons;

        container.appendChild(div);
    });
}

// 2. Vásárlás indítása (PIN bekérése)
function initiateStatPurchase(workId) {
    uiConfirm(
        t('beta_stats_purchase_message'), // Üzenet
        t('beta_stats_purchase_title'), // Cím
        function () {
            // Ez a kód fut le, ha a felhasználó az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function (pinCode) {
                    // Ez fut le, ha beírta a PIN-t és rányomott a rendben gombra
                    fetchBetaStats(workId, pinCode);
                }, t('beta_stats_purchase_confirm_title'));
            } else {
                // Ha valamiért nincs betöltve a PIN bekérő script, szólunk (szépen)
                uiAlert(t('pin_module_missing'), t('system_error_title'));
            }
        }
    );
}

// 3. Adatok lekérése és megjelenítése
function fetchBetaStats(workId, pinCode) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ÚJ HÍVÁS ===
    // Backend: buyBetaReport
    // Paraméterek: [pinCode, workId] (Figyelj a sorrendre a backendben!)
    // Régi hívás: buyBetaReport(email, pin, workId) -> Új backendben: (userEmail, pin, workId)
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

// Táblázat kirajzolása a Modalban
function renderStatsTable(title, rows) {
    var modal = document.getElementById('beta-stats-modal');
    var titleEl = document.getElementById('stats-modal-title');
    var tbody = document.getElementById('stats-table-body');

    // JAVÍTVA
    titleEl.textContent = t('beta_report_title_prefix') + title;
    tbody.innerHTML = '';

    if (rows.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">' + t('beta_report_empty') + '</td></tr>';
    } else {
        rows.forEach(function (row) {
            var tr = document.createElement('tr');
            var cellStyle = "padding: 8px; border: 1px solid #eee; vertical-align: top;";

            // JAVÍTVA: Hosszú string összefűzés
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
// === BÉTA MŰVEK KEZELÉSE (USER) ===
// ===================================

// 1. UTÁNTÖLTÉS INDÍTÁSA
function initiateBetaRefill(workId, title) {
    // Mennyit töltsünk?
    const amountStr = prompt(t('beta_refill_prompt_prefix') + title + t('beta_refill_prompt_suffix'));
    if (!amountStr) return; // Mégse

    const amount = parseInt(amountStr);
    if (!amount || amount <= 0) {
        uiAlert(t('invalid_amount'));
        return;
    }

    // PIN bekérése
    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            sendManageRequest(pinCode, 'REFILL', workId, amount);
        }, t('beta_refill_confirm_title'));
    } else {
        const p = prompt(t('pin_prompt_label'));
        if (p) sendManageRequest(p, 'REFILL', workId, amount);
    }
}

// 2. LEZÁRÁS INDÍTÁSA
function initiateBetaClose(workId, title) {
    // A szöveg formázása HTML-lel a szebb megjelenésért
    const message = t('beta_close_confirm_html_prefix') + title + t('beta_close_confirm_html_suffix');

    uiConfirm(
        message,
        t('beta_close_title'),
        function () {
            // Ez fut le, ha az IGEN-re kattintott
            if (typeof requestPin === 'function') {
                requestPin(function (pinCode) {
                    // Ez fut le, ha beírta a PIN-t
                    sendManageRequest(pinCode, 'CLOSE', workId, 0);
                }, t('beta_close_confirm_title'));
            } else {
                // Prompt helyett hibaüzenet, ha nincs PIN modul
                uiAlert(t('pin_module_missing'), t('system_error_title'));
            }
        }
    );
}

// Közös szerverhívó
function sendManageRequest(pinCode, action, workId, amount) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // === ÚJ HÍVÁS ===
    // Backend: manageBetaWork
    // Paraméterek: [pinCode, action, workId, amount]
    callBackend('manageBetaWork', [pinCode, action, workId, amount],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert(t('success_prefix') + res.message);
                showMyBetaStats(); // Lista frissítése
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
 * SEGÉDFÜGGVÉNY: Inicializálja a Bank szekciót a Piac oldalon.
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
            // JAVÍTVA: String összefűzés
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
                // JAVÍTVA: Sima string
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
                        // JAVÍTVA: String összefűzés
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
                    console.log("Bank: Eladható tételek gyorsítótárazva.");
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
// === PIAC RENDSZER (HIBRID SZŰRÉSSEL) ===
// =========================================

// Globális változók a piachoz
var currentItemToSell = { identifier: null, type: null };
var currentOfferAction = { action: null, listingId: null, offerId: null };
var userTradableItemsCache = null;
var marketListingsCache = [];
var CLIENT_SIDE_FILTER_THRESHOLD = 100; // E felett szerver oldali a keresés

/**
 * Piac oldal inicializálása (HIBRID SZŰRÉSSEL)
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

    // Loader megjelenítése
    if (loaders.piaci) loaders.piaci.style.display = 'block';
    if (loaders.ajanlatok) loaders.ajanlatok.style.display = 'block';

    loadMyListedItems();
    initializeSellableItemsSection();
    loadMyActiveOffers(containers.ajanlatok, loaders.ajanlatok);

    // BANK SZEKCIÓ INDÍTÁSA (Feltételezzük, hogy a függvény már létezik feljebb!)
    if (typeof initializeBankSection === 'function') {
        initializeBankSection();
    }

    var searchInput = document.getElementById('piac-kereso');
    var searchButton = document.getElementById('piac-kereso-gomb');

    // 1. Tételszám lekérése a döntéshez (callBackend)
    callBackend('getMarketItemCount', [], function (response) {
        if (!response.success) {
            containers.piaci.innerHTML = '<p style="color:red;">' + t('market_load_error_prefix') + response.error + '</p>';
            return;
        }

        // 2. Döntés a szűrési mód között
        if (response.count <= CLIENT_SIDE_FILTER_THRESHOLD) {
            // --- KLIENSOLDALI MÓD (Gyors, mindent letölt) ---
            if (searchButton) searchButton.style.display = 'none';
            if (searchInput) searchInput.placeholder = t('market_filter_placeholder');

            // Null paraméterrel mindent lekérünk
            callBackend('getMarketListings', [null], function (listingResponse) {
                if (loaders.piaci) loaders.piaci.style.display = 'none';
                if (listingResponse.success) {
                    marketListingsCache = listingResponse.listings;
                    displayListings(marketListingsCache, containers.piaci);

                    // Kliens oldali keresés eseménykezelője
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
            // --- SZERVEROLDALI MÓD (Kímélő, csak keresésre tölt) ---
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

function initializeBankOldal() {
    initializePiacOldal();
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
        container.innerHTML = "<p>Nincsenek a keresésnek megfelelő hirdetések.</p>";
        return;
    }

    listings.forEach(function (listing) {
        // Saját hirdetés szűrése (ha a szerver nem tette meg)
        if (listing.sellerEmail && currentUserEmail && listing.sellerEmail.toLowerCase() === currentUserEmail.toLowerCase()) return;

        var entryDiv = document.createElement('div');
        entryDiv.className = 'item-entry';

        var actionButtonHTML = '';
        var priceOrOfferInfo = '';

        if (listing.isFixedPrice) {
            priceOrOfferInfo = 'Fix ár: ' + listing.price + ' kr';
            actionButtonHTML = '<button class="btn buy-now-btn">Megveszem (' + listing.price + ' kr)</button>';
        } else {
            priceOrOfferInfo = 'Ajánlat alapú';
            if (listing.buyNowPrice) {
                priceOrOfferInfo += ' (Azonnali vétel: ' + listing.buyNowPrice + ' kr)';
                actionButtonHTML = '<button class="btn make-offer-btn">Ajánlatot teszek</button> ' +
                    '<button class="btn buy-now-btn">Megveszem (' + listing.buyNowPrice + ' kr)</button>';
            } else {
                actionButtonHTML = '<button class="btn make-offer-btn">Ajánlatot teszek</button>';
            }
        }

        // HTML összeállítása string összefűzéssel (NEM backtick)
        entryDiv.innerHTML = '<div class="item-details">' +
            '<div class="item-title">' + listing.itemName + '</div>' +
            '<div class="item-author"><em>' + priceOrOfferInfo + '</em></div>' +
            '<small>Eladó: ' + listing.sellerEmail + '</small>' +
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

    // callBackend használata (email nélkül)
    callBackend('getMyListedItems', [], function (response) {
        loader.style.display = 'none';
        if (!response.success) {
            container.innerHTML = '<p style="color:red;">Hiba: ' + response.error + '</p>';
            return;
        }

        if (response.listings.length === 0) {
            container.innerHTML = "<p>Nincsenek jelenleg meghirdetett tételeid.</p>";
        } else {
            response.listings.forEach(function (listing) {
                var priceInfo = listing.isFixedPrice ? t('market_fixed_price_prefix') + listing.price + t('market_price_suffix') : t('market_offer_based');
                if (!listing.isFixedPrice && listing.buyNowPrice) priceInfo += t('market_buy_now_prefix') + listing.buyNowPrice + t('market_buy_now_suffix');

                var entryDiv = document.createElement('div');
                entryDiv.className = 'item-entry';

                // HTML összeállítása
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
    // callBackend használata (email nélkül)
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

                // HTML összeállítása
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
        // callBackend, email nélkül
        callBackend('buyNow', [listingId, pinCode], handleServerResponse);
    }
}

function retractOfferAction(offerId) {
    var pinCode = prompt(t('market_retract_pin_prompt'));
    if (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';
        // callBackend, email nélkül
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
            // String összefűzés
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
            // listingId vagy offerId attól függően mi az action, email nélkül
            var params = (currentOfferAction.action === 'make') ? [currentOfferAction.listingId, offeredItems, pinCode] : [currentOfferAction.offerId, offeredItems, pinCode];

            callBackend(func, params, handleServerResponse);
        };
    }
}

function setupSellModalListeners() {
    // --- SZÜKSÉGES ELEMEK ---
    var fixedPriceContainer = document.getElementById('fixed-price-container');
    var buyNowPriceContainer = document.getElementById('buy-now-price-container');
    var priceTypeRadios = document.querySelectorAll('input[name="priceType"]');
    var submitBtn = document.getElementById('hirdetes-submit-btn');

    if (!fixedPriceContainer || !buyNowPriceContainer || !priceTypeRadios || !submitBtn) return;

    // --- RÁDIÓGOMBOK ESEMÉNYKEZELŐJE ---
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

        // callBackend, email nélkül
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

// Közös válaszkezelő függvény
function handleServerResponse(response) {
    document.getElementById('loading-overlay').style.display = 'none';

    // Modalok bezárása, ha vannak
    var hModal = document.getElementById('hirdetes-modal');
    if (hModal) hModal.style.display = 'none';
    var aModal = document.getElementById('ajanlat-modal');
    if (aModal) aModal.style.display = 'none';

    // Reset mezők
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
// === HAJÓMŰHELY FUNKCIÓK (JAVÍTOTT)    ===
// =========================================

var shipyardData = null;
var userCredits = 0; // Helyi változó a pontos számításhoz

// Inicializálás
function initShipyard() {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    callBackend('getShipyardData', [],
        function (data) {
            // SIKER ÁG
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
            // HIBA ÁG
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

                // JAVÍTVA: A szinkronizált userCredits változót használjuk
                var currentMoney = userCredits;

                var display = document.getElementById('repair-cost-' + ship.id);
                if (display) {
                    display.innerText = t('shipyard_cost_prefix') + total + ' ' + t('credit_long');

                    // JAVÍTVA: Csak akkor írjuk ki a hibát, ha TÉNYLEG nincs elég pénz
                    if (total > currentMoney) {
                        display.style.color = 'red';
                        display.innerText += t('shipyard_no_funds_suffix');
                    } else {
                        display.style.color = '#666';
                        // Ha van fedezet, nem írunk ki semmit, csak az árat (a szín visszaállítása elég)
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

    // Feltételezzük, hogy a requestPin létezik
    requestPin(function (pin) {
        var overlay = document.getElementById('loading-overlay');
        if (overlay) overlay.style.display = 'flex';

        var ship = null;
        // Biztonsági ellenőrzés, hogy létezik-e a globális adat
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

        // --- JAVÍTOTT RÉSZ: callBackend ---
        // NEM küldjük a currentUserEmail-t!
        // Paraméterek sorrendje: transactionType, dataObject, pin
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

                    // Kredit frissítése
                    if (res.newBalance !== undefined && typeof updateLocalCredit === 'function') {
                        updateLocalCredit(res.newBalance);
                    } else {
                        updateCreditDisplay(); // Fallback
                    }

                    // Újratöltjük a műhelyt
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
    if (cat === 'hajok') typesToShow = ['Dingi', 'Daysailer', 'Sloop', 'Ketch', 'Yawl', 'Cutter', 'Katamarán', 'Schooner', 'Brigantin', 'Bark / Barque', 'Tall ship'];
    if (cat === 'buvarhajok') typesToShow = ['Mini búvárhajó', 'Könnyű búvárhajó', 'Delejes búvárhajó', 'Vadász búvárhajó', 'Nehéz hordozó búvárhajó', 'Szupernehéz búvárhajó'];
    if (cat === 'leghajok') typesToShow = ['Mini léghajó (blimp)', 'Könnyű nem merev léghajó', 'Félmerev léghajó', 'Merev léghajó (Zeppelin-típus)', 'Szuperléghajó'];

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
        // JAVÍTVA: Callback függvényt adunk át, ami átvált a Repair fülre
        sendTransaction('build_new', { type: type, name: name, category: category, baseHp: hp }, pin, function () {
            showWorkshopTab('repair'); // Sikeres építés után a "Saját hajók" listára ugrunk
        });
    }, t('shipyard_build_prefix') + type + t('shipyard_build_cost_prefix') + cost + ' ' + t('credit_long') + '.');
}

// JAVÍTVA: A sendTransaction most már elfogad egy 4. (opcionális) callback paramétert
function sendTransaction(action, data, pin, onSuccess) {
    var overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'flex';

    callBackend('processShipyardTransaction', [action, data, pin],
        function (res) {
            // SIKER ÁG
            if (overlay) overlay.style.display = 'none';

            if (res.success) {
                uiAlert(res.message);
                if (res.newBalance !== undefined) updateLocalCredit(res.newBalance);

                // Újratöltjük az adatokat, hogy lássuk a változást
                initShipyard();

                // Ha volt extra teendő (pl. fül váltás építés után)
                if (onSuccess && typeof onSuccess === 'function') {
                    onSuccess();
                }
            } else {
                uiAlert(t('error_prefix') + res.error);
            }
        },
        function (err) {
            // HIBA ÁG
            if (overlay) overlay.style.display = 'none';
            uiAlert(t('shipyard_transaction_server_error_prefix') + err.message);
        }
    );
}

function updateLocalCredit(amount) {
    // Frissítjük a globális és helyi változót is
    amount = Number(amount);
    userCredits = amount;
    if (typeof playerCredit !== 'undefined') playerCredit = amount;

    // Frissítjük a fő fejlécet
    var headerCredit = document.getElementById('creditCell');
    if (headerCredit) {
        if (amount < 0) {
            headerCredit.innerHTML = '<span style="color:red; font-weight:bold;"><i class="fas fa-exclamation-circle"></i> Tartozás: ' + Math.abs(amount) + '</span>';
        } else {
            headerCredit.innerHTML = '<i class="fas fa-coins"></i> ' + amount;
        }
    }
}

/* ================================================= */
/* === KÖNYVSZENTÉLY (ROUTERESÍTVE) START === */
/* ================================================= */

// Globális változók (var használata)
var selectedCopy = null;
var searchBtn = null;
var upgradeBtn = null;
var searchTypeSelect = null;

/**
 * A konyvszentely_oldal.html logikája (Inicializálás)
 */
function initializeKonyvszentely(retryCount) {
    retryCount = retryCount || 0;

    // Elemek keresése
    searchBtn = document.getElementById('ksz-search-btn');
    upgradeBtn = document.getElementById('ksz-upgrade-btn');
    searchTypeSelect = document.getElementById('ksz-search-type');

    // Ha valami hiányzik, várunk egy picit, hátha a DOM renderelés folyamatban van
    if (!searchBtn || !searchTypeSelect || !upgradeBtn) {
        if (retryCount < 4) {
            setTimeout(function () {
                initializeKonyvszentely(retryCount + 1);
            }, 100);
            return;
        }
        console.warn("Könyvszentély elemek nem találhatóak (többszöri ellenőrzés után sem)!");
        return;
    }

    // Eseménykezelők
    searchBtn.onclick = function () { searchCopies(0); };
    searchTypeSelect.onchange = toggleSearchTerm;
    upgradeBtn.onclick = processUpgrade;

    // Szekvenciális lekérdezések a GAS rate-limit elkerülésére
    setTimeout(function () {
        loadWalletStats(0);
        setTimeout(function () {
            searchCopies(0);
        }, 150);
    }, 100);
}

/**
 * Vagyon lekérdezése (Kristály, Tálentum)
 */
function loadWalletStats(retryCount) {
    retryCount = retryCount || 0;
    callBackend('getKonyvszentelyStats', [],
        function (data) {
            var crystalEl = document.getElementById('ksz-crystal-count');
            var talentEl = document.getElementById('ksz-talent-count');

            if (crystalEl) crystalEl.textContent = (data && typeof data.letkristaly !== 'undefined') ? data.letkristaly : 0;
            if (talentEl) talentEl.textContent = (data && typeof data.talentum !== 'undefined') ? data.talentum : 0;

            // Gomb megjelenítése
            renderSellButton();
        },
        function (err) {
            console.warn("Vagyon lekérdezési figyelmeztetés:", err.message || err);
            if (retryCount < 2) {
                setTimeout(function () {
                    loadWalletStats(retryCount + 1);
                }, 800);
            } else {
                var crystalEl = document.getElementById('ksz-crystal-count');
                var talentEl = document.getElementById('ksz-talent-count');
                if (crystalEl && crystalEl.textContent === '...') crystalEl.textContent = '-';
                if (talentEl && talentEl.textContent === '...') talentEl.textContent = '-';
            }
        }
    );
}

/**
 * Letkristály eladás gomb
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

                // PIN modul ellenőrzése
                if (typeof requestPin === 'function') {

                    requestPin(function (pinCode) {
                        document.getElementById('loading-overlay').style.display = 'flex';

                        // ÚJ HÍVÁS (callBackend)
                        callBackend('sellLetkristalyToPapno', [pinCode],
                            function (res) {
                                document.getElementById('loading-overlay').style.display = 'none';

                                var title = res.success ? t('crystal_sacrifice_accepted') : t('crystal_sacrifice_failed');
                                uiAlert(res.message || res.error, title);

                                if (res.success) {
                                    // UI frissítés
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

function searchCopies(retryCount) {
    retryCount = retryCount || 0;
    setLoadingState(true, 'search');
    var searchTermInput = document.getElementById('ksz-search-term');
    var searchTerm = searchTermInput ? searchTermInput.value : '';
    var searchType = searchTypeSelect ? searchTypeSelect.value : 'all';

    // ÚJ HÍVÁS (callBackend)
    callBackend('getUserCopies', [searchTerm, searchType],
        function (copies) {
            displayResults(copies);
        },
        function (err) {
            setLoadingState(false, 'search');
            console.warn("Keresési figyelmeztetés (getUserCopies):", err.message || err);
            if (retryCount < 2) {
                setTimeout(function () {
                    searchCopies(retryCount + 1);
                }, 1000);
            } else {
                var list = document.getElementById('ksz-results-list');
                if (list) list.innerHTML = '<p style="color:red; text-align:center;">' + t('ksz_search_error_prefix') + (err.message || 'Hálózati hiba') + '</p>';
            }
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
                    '<div style="font-size: 1.2em;">👉</div>';

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
        requestPin(function (pinCode) {
            setLoadingState(true, 'upgrade');

            var data = {
                productCode: selectedCopy.code,
                // currentUserEmail NEM KELL, a Router intézi!
                giftToEmail: giftEmail,
                pinCode: pinCode
            };

            // ÚJ HÍVÁS (callBackend)
            callBackend('initiateUpgradeProcess', [data],
                function (result) {
                    handleProcessResult(result);
                },
                function (err) {
                    setLoadingState(false, 'upgrade');
                    uiAlert(t('error_prefix') + err.message);
                }
            );
        }, "Kérlek add meg a PIN kódodat a(z) <b>" + selectedCopy.title + "</b> felszenteléséhez:");
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
// === FELHŐKOLOSTOR FUNKCIÓK (JAVÍTOTT - ES5 BIZTOS) ===
// ===============================

// Globális callback a PIN modalhoz
var pinCallback = null;

function requestPin(callback, customMessage) {
    pinCallback = callback;
    var modal = document.getElementById('monk-pin-modal');
    var input = document.getElementById('monk-pin-input');
    var messageP = modal ? modal.querySelector('p') : null;

    // Üzenet beállítása
    if (messageP) {
        messageP.innerHTML = customMessage || t('monk_pin_default_html');
    }

    // Mező ürítése és modal nyitása
    if (input) input.value = '';
    if (modal) {
        modal.style.display = 'flex';
        if (input) input.focus();
    } else {
        // Biztonsági tartalék
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

// Fülváltó logika
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

    // Adatok betöltése
    if (tabName === 'Munkapad') refreshMonasteryWork();
    if (tabName === 'Forum') loadForumPosts();
    if (tabName === 'Suttogo') loadChatPartners();
}

// --- MUNKAPAD FUNKCIÓK ---

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
    { val: 'editor', text: 'Lektor' },
    { val: 'szkriptor', text: 'Szkriptor' },
    { val: 'piktor', text: 'Piktor' },
    { val: 'inspektor', text: 'Inspektor' },
    { val: 'translator_Angol', text: 'Fordító (Angol)' },
    { val: 'translator_Spanyol', text: 'Fordító (Spanyol)' },
    { val: 'translator_Német', text: 'Fordító (Német)' },
    { val: 'translator_Francia', text: 'Fordító (Francia)' },
    { val: 'translator_Orosz', text: 'Fordító (Orosz)' },
    { val: 'translator_Lengyel', text: 'Fordító (Lengyel)' }
];

function getRoleCheckboxesHtml(checkedRolesArray, idPrefix) {
    var html = '<details style="background:#fff; border:1px solid #ccc; border-radius:4px; margin: 10px 0; text-align: left;">';
    html += '<summary style="padding:8px 10px; cursor:pointer; font-weight:bold; outline:none; background:#f9f9f9; border-bottom:1px solid #eee;">Munkakörök kiválasztása...</summary>';
    html += '<div style="display:flex; flex-direction:column; padding:10px; max-height:250px; overflow-y:auto;">';
    ALL_MONK_ROLES.forEach(function (r, index) {
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
    // Itt a biztonság kedvéért sima 'var' és nincs backtick a selectorban
    var submissionType = document.querySelector('input[name="uploadType"]:checked').value;

    var manuscriptFile = fileInput.files[0];
    var coverFile = (coverInput && coverInput.files.length > 0) ? coverInput.files[0] : null;

    if (!title) { uiAlert(t('monk_upload_title_required')); return; }
    if (!manuscriptFile) { uiAlert(t('monk_upload_file_required')); return; }

    // Itt az async function marad callbackként!
    requestPin(async function (pinCode) {
        document.getElementById('loading-overlay').style.display = 'flex';

        // Belső segédfüggvény Promise-al (ez kell az await-hez)
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
            // Itt használjuk az AWAIT-et, ahogy kérted!
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
                document.querySelectorAll('.monk-role-checkbox:checked').forEach(function (cb) {
                    checkedRoles.push(cb.value);
                });
                payload.roles = checkedRoles;
            }

            // callBackend hívás
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
                        // Sima string összefűzés
                        uiAlert(t('monk_upload_error_prefix') + res.error);
                    }
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    uiAlert(t('server_error_prefix') + err.message);
                }
            );

        } catch (err) {
            // Catch ág: ez dobta a hibát, ha előtte nem volt lezárva valami. 
            // Most ellenőriztem, a fenti blokkban minden zárójel a helyén van.
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
        // Frissítjük a kolostort csendben minden 15 másodpercben
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

    // Várakozó kvízkérdések lekérése a jóváhagyó panelhez
    callBackend('getPendingQuizQuestions', [], function (quizRes) {
        var quizPanel = document.getElementById('monk-quiz-approval-panel');
        var quizList = document.getElementById('monk-quiz-approval-list');
        if (!quizPanel || !quizList) return;

        if (quizRes && quizRes.success && quizRes.questions && quizRes.questions.length > 0) {
            quizPanel.style.display = 'block';
            var qHtml = '<div style="display: flex; flex-direction: column; gap: 15px;">';
            quizRes.questions.forEach(function (q) {
                qHtml += '<div style="background: #fff; padding: 12px; border-radius: 6px; border: 1px solid #ffe066; display: flex; flex-direction: column; gap: 6px; font-size: 0.9em; box-shadow: 0 2px 4px rgba(0,0,0,0.02); color: #333;">' +
                    '<div><b>' + t('monk_quiz_question_prefix') + '</b> <span style="font-style: italic;">' + escapeHtml(q.question) + '</span></div>' +
                    '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 5px;">' +
                    '<div><span style="color: green; font-weight: bold;">' + t('monk_quiz_correct_prefix') + '</span> ' + escapeHtml(q.correctAnswer) + '</div>' +
                    '<div><span style="color: #c53030; font-weight: bold;">' + t('monk_quiz_alt1_prefix') + '</span> ' + escapeHtml(q.alt1) + '</div>' +
                    '<div><span style="color: #c53030; font-weight: bold;">' + t('monk_quiz_alt2_prefix') + '</span> ' + escapeHtml(q.alt2) + '</div>' +
                    '<div><span style="color: #c53030; font-weight: bold;">' + t('monk_quiz_alt3_prefix') + '</span> ' + escapeHtml(q.alt3) + '</div>' +
                    '</div>' +
                    '<div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; border-top: 1px dashed #eee; padding-top: 8px;">' +
                    '<button class="btn btn-sm" style="background-color: #2f855a; color: white;" onclick="handleQuizDecision(' + q.rowIndex + ', \'OK\')"><i class="fas fa-check"></i> ' + t('monk_approve_button') + '</button>' +
                    '<button class="btn btn-sm btn-danger" style="margin-top: 0;" onclick="handleQuizDecision(' + q.rowIndex + ', \'ELUTASÍTVA\')"><i class="fas fa-times"></i> ' + t('monk_reject_button') + '</button>' +
                    '</div>' +
                    '</div>';
            });
            qHtml += '</div>';
            quizList.innerHTML = qHtml;
        } else {
            quizPanel.style.display = 'none';
            quizList.innerHTML = '';
        }
    }, function (err) {
        var quizPanel = document.getElementById('monk-quiz-approval-panel');
        if (quizPanel) quizPanel.style.display = 'none';
    });

    callBackend('getMonasteryWorks', [],
        function (res) {
            if (!res.success) { if (!silent) container.innerHTML = '<p style="color:red;">' + t('error_prefix') + res.error + '</p>'; return; }
            if (res.works.length === 0) { if (!silent) container.innerHTML = '<p>' + t('monk_work_none') + '</p>'; return; }

            var hasPendingAgent = res.works.some(function (w) { return w.status === 'Agent elemzés alatt'; });
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

                // --- 0. FORDÍTÁSI KÁRTYÁK ---
                if (work.status && work.status.indexOf('[FORDÍTÁS') === 0) {
                    var langMatch = work.status.match(/\[FORDÍTÁS\s+([^\]]+)\]/);
                    var targetLang = langMatch ? langMatch[1] : 'Ismeretlen';

                    if ((work.isMyWork || (work.isPapat && work.hasDebt)) && work.status === '[FORDÍTÁS ' + targetLang + '] Véglegesítésre vár') {
                        var safeTitle = work.title.replace(/'/g, "\\'");
                        var btnId = 'pub-trans-btn-' + work.id;
                        topControls = '<div style="background:#f4ebf9; padding:10px; text-align:center; border:1px solid #8e44ad; margin-top:10px; border-radius:5px;">' +
                            '<h4 style="margin-top:0; color:#8e44ad;"><i class="fas fa-language"></i> Fordítás Elfogadása</h4>' +
                            '<p>A(z) <b>' + targetLang + '</b> nyelvű fordítás elkészült és lektorálva lett.</p>' +
                            '<button id="' + btnId + '" class="btn btn-success" onclick="openPublishWindow(\'' + btnId + '\', \'' + work.id + '\', \'' + work.gdocId + '\', \'' + safeTitle + ' (' + targetLang + ')\', \'\')">Fordítás Publikálása</button>' +
                            '</div>';
                    } else if (work.status === 'Folyamatban' || work.status === 'Ellenőrzés alatt' ||
                        work.status === '[FORDÍTÁS ' + targetLang + '] folyamatban' || work.status === '[FORDÍTÁS ' + targetLang + '] Folyamatban' ||
                        work.status === '[FORDÍTÁS ' + targetLang + '] Ellenőrzés alatt') {
                        if (work.isPapat || work.userRoles.length > 0) {
                            topControls = '<div style="margin:5px 0;"><button class="btn btn-sm" onclick="doWorkAction(\'' + work.id + '\', \'send_for_approval\')">' + t('monk_review_ready_button') + '</button></div>';
                        }
                    }
                }
                // --- 1. PAPÁT JOGKÖRÖK (Eredeti) ---
                else if (work.isPapat) {
                    var isApplication = work.checklist && work.checklist.hasOwnProperty('referencia');

                    if (work.status === 'Elbírálás alatt') {
                        if (isApplication) {
                            var requestedRolesStr = (work.checklist && work.checklist.referencia && work.checklist.referencia.extraInfo) ? work.checklist.referencia.extraInfo : "";
                            var appliedRolesArray = requestedRolesStr ? requestedRolesStr.split(',') : [];

                            topControls =
                                '<div style="margin:5px 0; background:#f0f8ff; padding:10px; border:1px solid blue; border-radius:5px; text-align:center;">' +
                                '<strong>Szerzetes felvétele szerepkörökbe:</strong><br>' +
                                getRoleCheckboxesHtml(appliedRolesArray, work.id) +
                                '<button class="btn btn-sm" style="margin-top:5px; background-color:#28a745; width:48%;" onclick="hireMinistransMulti(\'' + work.id + '\', \'' + work.author + '\')">' + t('monk_hire_button') + '</button> ' +
                                '<button class="btn btn-sm btn-danger" style="margin-top:5px; width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                '</div>';
                        } else {
                            if (work.checklist && work.checklist.papat_report) {
                                topControls = '<div style="margin:5px 0; background:#f4ebf9; border:1px solid #8e44ad; border-radius:5px; padding:10px;">' +
                                    '<div style="text-align:center; margin-bottom:10px;">' +
                                    '<strong><i class="fas fa-robot"></i> AI Elemzés Kész</strong><br>' +
                                    '<button class="btn btn-sm" style="background-color:#8e44ad; margin-top:5px; width:100%;" onclick="openPapatReportModal(\'' + work.id + '\')"><i class="fas fa-eye"></i> Értékelő Jelentés Olvasása</button>' +
                                    '</div>' +
                                    '<button class="btn btn-sm" style="background-color:#28a745; width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'approve_submission\')">' + t('monk_approve_button') + '</button> ' +
                                    '<button class="btn btn-sm btn-danger" style="width:48%;" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                    '</div>';
                            } else {
                                topControls = '<div style="margin:5px 0;">' +
                                    '<button class="btn btn-sm" style="background-color:#8e44ad; margin-bottom: 5px; width: 100%; color:white; border:1px solid #ffd700;" onclick="triggerAgentAnalysis(\'' + work.id + '\')"><i class="fas fa-robot"></i> Elemzés Indítása (Papát AI)</button><br>' +
                                    '<button class="btn btn-sm" style="background-color:#28a745;" onclick="doWorkAction(\'' + work.id + '\', \'approve_submission\')">' + t('monk_approve_button') + '</button> ' +
                                    '<button class="btn btn-sm btn-danger" onclick="doWorkAction(\'' + work.id + '\', \'reject_submission\')">' + t('monk_reject_button') + '</button>' +
                                    '</div>';
                            }
                        }
                    } else if (work.status === 'Agent elemzés alatt') {
                        topControls = '<div style="margin:5px 0; padding:10px; background:#f4ebf9; border:1px solid #8e44ad; border-radius:5px; text-align:center; color: #8e44ad;">' +
                            '<strong><i class="fas fa-robot"></i> Papát AI elemzése folyamatban...</strong><br>' +
                            '<small>A kézirat le van foglalva az elemzőmodul számára.</small><br>' +
                            '<button class="btn btn-sm btn-warning" style="margin-top:10px; color:#333; font-weight:bold; width:100%;" onclick="cancelAgentAnalysis(\'' + work.id + '\')"><i class="fas fa-undo"></i> AI Elemzés Megszakítása (Visszavonás)</button>' +
                            '</div>';

                    } else if (work.status === 'Folyamatban' || work.status === 'Ellenőrzés alatt') {
                        topControls = '<div style="margin:5px 0;"><button class="btn btn-sm" onclick="doWorkAction(\'' + work.id + '\', \'send_for_approval\')">' + t('monk_review_ready_button') + '</button></div>';
                    }
                }

                // --- 2. SZERZŐ / PAPÁT PUBLIKÁLÁS ---
                if (!work.title.startsWith('[FORDÍTÁS') && (work.isMyWork || (work.isPapat && work.hasDebt)) && work.status === 'Véglegesítésre vár') {

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

                // KÁRTYA HTML
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

            // --- 3. SZEMÉTHALOM ---
            if (res.isAntipat && res.trashItems && res.trashItems.length > 0) {
                html += '<div style="margin-top:40px; padding-top:20px; border-top:3px dashed #8b0000; text-align:center;">';
                html += '<h3 style="color:#8b0000;">' + t('monk_trash_title') + '</h3>';
                html += '<p style="font-size:0.9em;">' + t('monk_trash_body') + '</p>';

                res.trashItems.forEach(function (item) {
                    // --- BIZTONSÁGI JAVÍTÁS: Cím escaping ---
                    var safeTrashTitle = item.title.replace(/'/g, "\\'");

                    html += '<div class="work-card" style="border-left-color:darkred; background-color:#fff5f5;">' +
                        '<div style="display:flex; justify-content:space-between; align-items:center;">' +
                        '<div><strong>' + item.title + '</strong> <small>(' + item.date + ')</small><br>' +
                        '<small>' + t('author_label') + ' ' + item.authorEmail + '</small></div>' +
                        '<div style="text-align:right;">' +
                        '<button class="btn btn-sm btn-secondary" onclick="window.open(\'' + item.url + '\', \'_blank\')">' + t('open_button') + '</button> ' +
                        // ITT HASZNÁLJUK A JAVÍTOTT CÍMET:
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

function escapeHtml(text) {
    if (!text) return '';
    return text.toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function handleQuizDecision(rowIndex, decision) {
    var confirmMsg = decision === 'OK' ?
        t('monk_quiz_approve_confirm') :
        t('monk_quiz_reject_confirm');

    uiConfirm(confirmMsg, t('modal_confirm_title'), function () {
        document.getElementById('loading-overlay').style.display = 'flex';
        callBackend('evaluateQuizQuestion', [rowIndex, decision], function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res && res.success) {
                uiAlert(res.message || t('monk_quiz_evaluation_success'), t('modal_notice_title'));
                refreshMonasteryWork();
            } else {
                uiAlert(t('error_prefix') + (res ? res.message || res.error : 'Szerver hiba'), t('modal_notice_title'));
            }
        }, function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('error_prefix') + err.message, t('modal_notice_title'));
        });
    });
}

// --- KVÍZKÉRDÉS BEKÜLDŐ MODÁLIS ABLAK ---

function openQuizBookModal() {
    try {
        console.log("openQuizBookModal() elindult");
        var loading = document.getElementById('loading-overlay');
        if (loading) loading.style.display = 'flex';

        callBackend('checkIfUserIsMonk', [], function (res) {
            try {
                if (loading) loading.style.display = 'none';
                console.log("checkIfUserIsMonk válasz:", res);
                if (res && res.success && res.isMonk) {
                    openQuizBookModalDirect();
                } else {
                    console.log("Nem szerzetes kalóz, Anonymus testvér NPC megnyitása...");
                    openUniversalNPC('anonymus', {
                        name: 'Anonymus Testvér',
                        role: 'Rendi Írnok',
                        icon: '<i class=\'fas fa-scroll\'></i>',
                        headerColor: '#37474f',
                        portrait: 'https://img.index.hu/imgfrm/2/5/4/1/THM_0000922541.jpg',
                        msgIcon: '<i class=\'fas fa-scroll\' style=\'color:#d4af37; margin-right:5px;\'></i>',
                        loaderHTML: '<i class=\'fas fa-scroll fa-spin\' style=\'color:#d4af37; margin-right:8px;\'></i> <i>A Testvér gondolkodik...</i>',
                        styles: {
                            modal: {
                                justifyContent: 'flex-end',
                                alignItems: 'stretch',
                                background: '',
                                padding: '0'
                            },
                            content: {
                                width: '350px',
                                height: '100vh',
                                maxWidth: '85vw',
                                margin: '0',
                                borderRadius: '2',
                                border: 'none',
                                borderLeft: '5px solid #d4af37',
                                backgroundColor: '#1f0901',
                                color: '#241512',
                                backgroundImage: 'url(https://www.transparenttextures.com/patterns/wood-pattern.png)',
                                boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                            }
                        },
                        skipInit: false
                    });
                }
            } catch (innerErr) {
                console.error("Hiba a checkIfUserIsMonk sikeres ágában:", innerErr);
                alert("Hiba a válasz feldolgozásakor: " + innerErr.message);
                openQuizBookModalDirect();
            }
        }, function (err) {
            try {
                if (loading) loading.style.display = 'none';
                console.warn("checkIfUserIsMonk sikertelen (hibás ág):", err);
                alert("Szerver hiba történt a Monk ellenőrzéskor. Fallback mód: Kvízkönyv megnyitása.");
                openQuizBookModalDirect();
            } catch (fallbackErr) {
                console.error("Hiba a checkIfUserIsMonk hibakezelő ágában:", fallbackErr);
                openQuizBookModalDirect();
            }
        });
    } catch (globalErr) {
        console.error("Kritikus hiba az openQuizBookModal-ban:", globalErr);
        alert("Kritikus kliens hiba: " + globalErr.message);
    }
}

function openQuizBookModalDirect() {
    var npcModal = document.getElementById('universal-npc-modal');
    if (npcModal) npcModal.style.display = 'none';

    var modal = document.getElementById('quiz-book-modal');
    if (!modal) return;

    // Bejelentkezett kalóz nevének beállítása
    var nameField = document.getElementById('modal-submitter-name');
    if (nameField && typeof currentUserEmail !== 'undefined') {
        nameField.value = currentUserEmail;
    }

    // Feedback és form tisztítása nyitáskor
    var feedback = document.getElementById('modal-question-feedback');
    if (feedback) {
        feedback.textContent = '';
        feedback.style.color = '';
    }

    // Submit gomb engedélyezése
    var submitBtn = document.getElementById('modal-submit-question-btn');
    if (submitBtn) submitBtn.disabled = false;

    modal.style.display = 'flex';
}

function closeUniversalNPCChat() {
    var modal = document.getElementById('universal-npc-modal');
    if (modal) modal.style.display = 'none';
}

function closeQuizBookModal() {
    var modal = document.getElementById('quiz-book-modal');
    if (!modal) return;

    // Minden beviteli mező törlése
    var fields = ['modal-question-text', 'modal-correct-answer', 'modal-alt-1', 'modal-alt-2', 'modal-alt-3'];
    for (var i = 0; i < fields.length; i++) {
        var el = document.getElementById(fields[i]);
        if (el) el.value = '';
    }

    // Feedback törlése
    var feedback = document.getElementById('modal-question-feedback');
    if (feedback) {
        feedback.textContent = '';
        feedback.style.color = '';
    }

    // Honeypot törlése
    var hp = document.getElementById('modal-website-url-hp');
    if (hp) hp.value = '';

    modal.style.display = 'none';
}

function submitQuizFromModal() {
    // Honeypot ellenőrzés (bot védelem)
    var honeypot = document.getElementById('modal-website-url-hp');
    if (honeypot && honeypot.value !== '') {
        console.warn('Spam bot detektálva!');
        return;
    }

    var formData = {
        question: document.getElementById('modal-question-text').value,
        correctAnswer: document.getElementById('modal-correct-answer').value,
        alt1: document.getElementById('modal-alt-1').value,
        alt2: document.getElementById('modal-alt-2').value,
        alt3: document.getElementById('modal-alt-3').value
    };

    if (!formData.question || !formData.correctAnswer) {
        var fb = document.getElementById('modal-question-feedback');
        fb.textContent = t('kerdesbekuldo_validation_error') !== 'kerdesbekuldo_validation_error' ? t('kerdesbekuldo_validation_error') : 'Kérlek, töltsd ki a kérdés és a helyes válasz mezőket!';
        fb.style.color = 'red';
        return;
    }

    var feedbackDiv = document.getElementById('modal-question-feedback');
    var submitBtn = document.getElementById('modal-submit-question-btn');

    feedbackDiv.textContent = t('kerdesbekuldo_sending') !== 'kerdesbekuldo_sending' ? t('kerdesbekuldo_sending') : 'Beküldés folyamatban...';
    feedbackDiv.style.color = '#b38600';
    submitBtn.disabled = true;

    callBackend('submitNewQuestion', [formData], function (res) {
        if (res && res.success) {
            feedbackDiv.textContent = res.message || 'Sikeres beküldés!';
            feedbackDiv.style.color = 'green';

            // 2 másodperc múlva automatikus bezárás és aloldal frissítés
            setTimeout(function () {
                closeQuizBookModal();
                if (typeof currentPageName !== 'undefined' && currentPageName === 'felhokolostor_oldal') {
                    loadPage('felhokolostor_oldal');
                }
            }, 2000);
        } else {
            feedbackDiv.textContent = (res && res.message) || 'Hiba a beküldés során!';
            feedbackDiv.style.color = 'red';
            submitBtn.disabled = false;
        }
    }, function (err) {
        feedbackDiv.textContent = 'Hálózati hiba: ' + err.message;
        feedbackDiv.style.color = 'red';
        submitBtn.disabled = false;
    });
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
            msg.innerHTML = "Könyv adatainak lekérése...";
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
    callBackend('getOriginalBookDataForTranslation', [rootCode], function (res) {
        setLoadingState(false, 'monastery');
        if (!res.success) {
            var statusMsg = document.getElementById('pub-status-' + workId);
            if (statusMsg) statusMsg.innerHTML = "Hiba az adatok betöltésekor.";
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
        uiAlert("Hiba: A könyv forráskódja nem található a fordításhoz!");
        return;
    }

    requestPin(function (pinCode) {
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
            function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (res.success) {
                    uiAlert("Sikeresen publikálva! Új Kód: " + res.newBaseCode, "Fordítás Elfogadva");
                    refreshMonasteryWork();
                } else {
                    uiAlert("Hiba történt: " + res.error, "Publikációs hiba");
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert("Hálózati hiba: " + err.message);
            }
        );
    }, "Add meg a Mesterkódot a <b>" + title + "</b> publikálásához:");
}

// --- PAPÁT CLOUD INDÍTÁSA ---
function triggerPapatAgent(workId) {
    if (!confirm("Biztosan elindítod az AI elemzést (Papát)? Ez eltarthat 1-2 percig.")) return;

    showLoading("Papát hívása...");

    // 1. Állapot frissítése (hogy látszódjon a folyamat)
    callBackend('manageWorkStatus', [workId, 'set_status', 'Agent elemzés alatt'], function (res) {
        if (!res || !res.success) {
            hideLoading();
            alert("Hiba az állapot frissítésekor: " + (res ? res.error : "Ismeretlen hiba"));
            return;
        }

        // 2. Felhő alapú folyamat elindítása a Backend-en keresztül
        callBackend('triggerPapatCloudProcess', [workId], function (papatRes) {
            hideLoading();
            if (papatRes && papatRes.success) {
                alert("Papát megkezdte az elemzést! Kérlek várj pár percet, majd frissíts rá a munkapadra.");
                refreshMonasteryWork();
            } else {
                alert("Papát sajnos nem tudott elindulni: " + (papatRes ? papatRes.error : "Szerver hiba. Ha a helyi AI ügynök fut, az automatikusan átveszi a feladatot!"));
                // Frissítsük a munkapadot, hogy látszódjon az "Agent elemzés alatt" státusz!
                refreshMonasteryWork();
            }
        });
    });
}

function cancelAgentAnalysis(workId) {
    if (!confirm("Biztosan megszakítod az AI elemzést? A mű visszakerül 'Elbírálás alatt' státuszba, és kézzel kell elbírálnod.")) return;

    document.getElementById('loading-overlay').style.display = 'flex';
    callBackend('manageWorkStatus', [workId, 'set_status', 'Elbírálás alatt'], function (res) {
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
        'Elbírálás alatt': 'monk_work_status_under_review',
        'Folyamatban': 'monk_work_status_in_progress',
        'Ellenőrzés alatt': 'monk_work_status_quality_check',
        'Véglegesítésre vár': 'monk_work_status_waiting_finalize',
        'Elutasítva': 'monk_work_status_rejected'
    };
    var key = statusMap[status];
    if (!key) return status;
    var translated = t(key);
    return translated === key ? status : translated;
}

function getMonasteryTaskStatusLabel(status) {
    var statusMap = {
        'inaktív': 'monk_task_status_inactive',
        'várakozó': 'monk_task_status_waiting',
        'folyamatban': 'monk_task_status_in_progress',
        'javítás alatt': 'monk_task_status_revision',
        'ellenőrzés alatt': 'monk_task_status_under_review',
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

        // Belső segédfüggvény (closure) a gombokhoz
        var makeBtn = (function () {
            return function (txt, clr, func) {
                return '<button class="btn" style="background-color:' + clr + '; padding:4px 8px; font-size:0.8em; margin:2px;" onclick="' + func + '">' + txt + '</button>';
            };
        })();

        var isWorkInProgress = work.status === 'Folyamatban' || work.status.indexOf('[FORDÍTÁS') !== -1;

        if (task.status === 'inaktív') {
            if (isOwnerOrPapat) action = makeBtn(t('monk_task_activate'), '#17a2b8', 'doWorkAction(\'' + work.id + '\', \'activate_task\', \'' + key + '\')');
            else action = '<span style="color:#999;">' + t('monk_task_inactive') + '</span>';
        }
        else if (isWorkInProgress && (task.status === 'várakozó' || task.status === 'javítás alatt')) {
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
        else if (task.status === 'ellenőrzés alatt') {
            if (isOwnerOrPapat) {
                action = makeBtn(t('monk_task_accept'), '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'accept_task_work\', \'' + key + '\')') +
                    makeBtn(t('monk_task_revision'), '#f0ad4e', 'doWorkAction(\'' + work.id + '\', \'request_revision\', \'' + key + '\')');
            } else {
                action = t('monk_task_reviewing');
            }
        }

        if (task.selectedMonk === currentUser && task.paymentStatus === 'none' && task.status !== 'inaktív') {
            action = '<input type="number" id="price-' + key + '" placeholder="' + t('talentum_short') + '" style="width:50px; padding:2px;"> ' +
                makeBtn(t('ok_button'), '#2e8b57', 'offerPrice(\'' + work.id + '\', \'' + key + '\')');
        }

        if (isOwnerOrPapat && task.paymentStatus === 'pending_approval') {
            action = '<b>' + task.priceRequest + ' ' + t('talentum_short') + '</b><br>' +
                makeBtn(t('pay_button'), '#2e8b57', 'payDirect(\'' + work.id + '\', \'' + key + '\')') +
                makeBtn(t('credit_button'), '#f0ad4e', 'acceptCredit(\'' + work.id + '\', \'' + key + '\')');
        }

        if (task.paymentStatus === 'paid_direct' || task.paymentStatus === 'paid_out') action += ' <span title="' + t('paid_title') + '">💰</span>';
        if (task.paymentStatus === 'credit_agreed') action += ' <span title="' + t('credit_title') + '">⚠️</span>';

        if (task.selectedMonk === currentUser && task.status !== 'elfogadva' && task.status !== 'ellenőrzés alatt' && task.status !== 'inaktív') {
            if (action.indexOf('button') === -1) action = '';
            action += makeBtn(t('ready_button'), '#2e8b57', 'doWorkAction(\'' + work.id + '\', \'report_ready\', \'' + key + '\')') +
                makeBtn(t('cancel_short_button'), '#c82333', 'resignTask(\'' + work.id + '\', \'' + key + '\')');
        }

        if (key === 'borito' && (isOwnerOrPapat || task.selectedMonk === currentUser)) {
            if (task.status === 'várakozó' || task.status === 'javítás alatt') {
                action = '<input type="file" id="cover-upload-' + work.id + '" accept="image/png" style="width:180px; font-size:0.8em;">' +
                    makeBtn(t('upload_button'), '#2e8b57', 'uploadCoverFromCard(\'' + work.id + '\', \'' + key + '\')');
            }
        }

        if (isOwnerOrPapat && task.selectedMonk && task.status !== 'elfogadva' && task.status !== 'ellenőrzés alatt') {
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

// --- 2. FÓRUM (Közös Terem) ---
function loadForumPosts() {
    var container = document.getElementById('monastery-forum-posts');
    if (!container) return;
    container.innerHTML = '<i>' + t('loading') + '</i>';

    callBackend('getMonasteryForumPostsSecure', [],
        function (res) {
            if (!res.success) {
                container.innerHTML = '<div style="padding:20px; color:#8b0000;"><h3>🚫 ' + t('monk_forum_closed_title') + '</h3><p>' + res.error + '</p></div>';
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

// --- 3. SUTTOGÓ (Chat) ---
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

    var message = t('monk_hire_confirm_prefix') + applicantName + " felvétele a megjelölt szerepkör(ök)be?";
    uiConfirm(message, t('monk_hire_title'), function () {
        doWorkAction(workId, 'hire_ministrans', { roles: roles.join(","), applicantName: applicantName });
    });
}

// --- SZEMÉLYZETI KEZELŐ FUNKCIÓK ---

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
                    '<span style="color: var(--color-secondary); font-weight:bold;">Szerepkörök módosítása:</span><br>' +
                    getRoleCheckboxesHtml(monk.roles ? monk.roles.split(',').map(function (s) { return s.trim(); }) : [], 'admin_' + CSS.escape(monk.email)) +
                    '<button class="btn btn-sm" style="background-color:var(--color-primary); color:white; margin-top:5px;" onclick="adminUpdateMonkRoles(\'' + monk.email + '\')">Szerepkörök Mentése</button>' +
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
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (res.success) {
                uiAlert("Szerepkörök sikeresen frissítve!", t('success_title'));
                loadPersonnelData();
            } else {
                uiAlert(res.error, t('error_title'));
            }
        },
        function (err) {
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
            var dataUrl = await new Promise(function (resolve, reject) {
                reader.onload = function (e) { resolve(e.target.result); };
                reader.onerror = function (e) { reject(new Error("Hiba a fájl olvasása közben")); };
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
            uiAlert("Hiba a kép konvertálása során: " + err.message, t('system_error_title'));
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
// KÖNYVFELTÖLTŐ ÉS SZENTELŐ MODUL (Eredeti, szétválasztott logika)
// ============================================================================

(function () { // Bezárjuk egy függvénybe, hogy a változók ne szennyezzék a globális teret, de a globális események működjenek

    // --- HELYI VÁLTOZÓK ---
    var submitButton = null;
    var statusDiv = null;
    var modalText = null;
    var isSubmitting = false;
    var serverParams = {};

    // Szenteléshez szükséges változók
    var globalGdocId = null;
    var globalCoverId = null;
    var globalLogId = null;
    var globalUserEmail = null;
    var isSzentelesMode = false;

    // --- PARAMÉTEREK BEOLVASÁSA (URL-ből) ---
    try {
        if (typeof window !== 'undefined' && window.location && window.location.search) {
            const params = new URLSearchParams(window.location.search);
            const obj = {};
            for (const [k, v] of params.entries()) {
                obj[k] = [v]; // Apps Script kompatibilis formátum (tömb)
            }
            serverParams = obj;
        }
    } catch (e) { console.warn('Paraméter feldolgozási hiba:', e); }

    function getParam(key) {
        return (serverParams && serverParams[key] && serverParams[key][0]) ? serverParams[key][0] : null;
    }

    // --- INICIALIZÁLÁS (DOM betöltéskor) ---
    document.addEventListener("DOMContentLoaded", function () {
        // Csak akkor fusson, ha van könyvfeltöltő űrlap az oldalon
        var form = document.getElementById('bookForm');
        if (!form) return; // Ha nincs űrlap, kilépünk (ne zavarja a többi oldalt)

        console.log("Könyvfeltöltő modul inicializálása...");

        try {
            // UI elemek mentése
            submitButton = document.getElementById('submitButton');
            statusDiv = document.getElementById('status');
            modalText = document.getElementById('modal-status-text');

            // Paraméterek
            globalGdocId = getParam('gdocId');
            globalUserEmail = getParam('userEmail');
            globalLogId = getParam('logId');
            globalCoverId = getParam('coverId');
            var action = getParam('action');
            var titleParam = getParam('title');

            // --- 1. ÁG: SZENTELÉS MÓD (Felhőkolostorból jött) ---
            if (action === 'szenteles' && globalGdocId && globalUserEmail && globalLogId) {
                console.log(">>> MÓD: Szentelés aktív.");
                isSzentelesMode = true;

                // Fájlmezők elrejtése (a szerver adja őket)
                var epubElem = document.getElementById('epubFile');
                var coverElem = document.getElementById('coverImageFile');

                if (epubElem) {
                    var epubGroup = epubElem.closest('.form-group');
                    if (epubGroup) epubGroup.style.display = 'none';
                    epubElem.required = false; // Kötelezőség levétele
                }

                if (coverElem) {
                    var coverGroup = coverElem.closest('.form-group');
                    if (coverGroup) coverGroup.style.display = 'none';
                }

                // Adatok előtöltése
                if (titleParam) document.getElementById('title').value = titleParam;
                var ownerEmailField = document.getElementById('ownerEmail');
                if (ownerEmailField) ownerEmailField.value = globalUserEmail;

                var origAuthor = getParam('origAuthor');
                var authorNameField = document.getElementById('authorName');
                if (authorNameField) authorNameField.value = origAuthor ? origAuthor : "Felhőkolostor Szerzője";

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

                // Backend hívások (Szentelés specifikus vagy közös)
                callBackend('getDropdownData', [], populateDropdowns, showError);
                callBackend('getCentralImageAsset', ['logo'], displayLogo, displayLogoError);

            } else {
                // --- 2. ÁG: NORMÁL MÓD ---
                console.log(">>> MÓD: Normál feltöltés.");

                // Backend hívások (Normál specifikus)
                callBackend('getDropdownData', [], populateDropdowns, showError);
                callBackend('getCentralImageAsset', ['logo'], displayLogo, displayLogoError);
                // callBackend('getCentralImageAsset', ['book_upload'], displayLoadingGif, function (e) { console.warn('Gif hiba', e); });
                displayLoadingGif(); // Helyette direktben hívjuk meg
            }

            // Űrlap beküldés eseménykezelő csatolása
            form.addEventListener('submit', handleFormSubmit);

        } catch (e) {
            showError(new Error("Inicializálási hiba: " + e.message));
        }
    });

    // --- ŰRLAP BEKÜLDÉSE (A KÉT ÁG KEZELÉSE) ---
    function handleFormSubmit(event) {
        event.preventDefault();
        if (isSubmitting) return;

        var formObject = event.target;
        var formData = buildBaseFormData(formObject, null);

        // Paraméterek újraolvasása a biztonság kedvéért
        var gdocId = getParam('gdocId');
        var logId = getParam('logId');
        var coverId = getParam('coverId');
        var action = getParam('action');

        if (action === 'szenteles' && gdocId && logId) {
            // === SZENTELÉS ÁG ===
            setUiState('loading', 'Szentelt könyv adatainak feldolgozása a szerveren...');

            // Itt a 'initiateGDocSzenteles' backend függvényt hívjuk
            callBackend('initiateGDocSzenteles', [gdocId, formData.ownerEmail, logId, coverId, formData],
                function (response) {
                    if (!response.success) {
                        showError(new Error(response.error));
                        return;
                    }
                    // Ha sikeres, a kliens oldalon dolgozzuk fel a választ
                    handleSzentelesResponse(response, formData);
                },
                showError
            );

        } else {
            // === NORMÁL ÁG ===
            setUiState('loading', 'Azonosító foglalása a szerveren...');

            // Itt a 'initiateUploadAndGetId' backend függvényt hívjuk
            callBackend('initiateUploadAndGetId', [formData],
                function (response) {
                    // Ha megvan az ID, indul a helyi fájlfeldolgozás
                    processFilesAndFinalize(formObject, response.basicCode, response.rowNumber, null, null, formData.ownerEmail);
                },
                showError
            );
        }
    }

    // --- SZENTELÉS SPECIFIKUS FELDOLGOZÓ ---
    function handleSzentelesResponse(response, formData) {
        setUiState('loading', 'Fájlok visszaalakítása és véglegesítés...');
        try {
            // 1. ePub visszaalakítása base64-ből Blob-bá
            var epubBlob = base64ToBlob(response.base64Epub);
            var cleanTitle = sanitizeForFilename(formData.title);
            epubBlob.name = cleanTitle + ".epub";

            // 2. Borító visszaalakítása (ha van)
            var coverFilesArray = [];
            if (response.base64Cover) {
                var coverBlob = base64ToBlob(response.base64Cover, 'image/png');
                coverBlob.name = cleanTitle + "_cover.png";
                coverFilesArray = [coverBlob];
            }

            // 3. Mock (szimulált) űrlap objektum létrehozása
            // Ez azért kell, hogy a közös 'processFilesAndFinalize' függvény azt higgye, űrlapról jött az adat
            var mockFormObject = {
                title: { value: formData.title },
                epubFile: { files: [epubBlob] },
                coverImageFile: { files: coverFilesArray },
                epubBaseName: cleanTitle
            };

            // 4. Átadás a közös feldolgozónak
            processFilesAndFinalize(mockFormObject, response.basicCode, response.rowNumber, globalGdocId, globalLogId, globalUserEmail);

        } catch (e) {
            showError(new Error("Feldolgozási hiba (Szentelés): " + e.message));
        }
    }

    // --- KÖZÖS FÁJLFELDOLGOZÓ ÉS FELTÖLTŐ (Core Logic) ---
    async function processFilesAndFinalize(formObject, basicCode, rowNumber, gdocId, logId, userEmail) {
        try {
            setUiState('loading', 'Fájlok vízjelezése, kicsomagolása és feltöltése...');

            // Cím meghatározása (támogatja a Mock objektumot és a HTML elemet is)
            var bookTitle = (formObject.title && formObject.title.value) ? formObject.title.value : "Nocim";
            if (!bookTitle && typeof formObject.title === 'string') bookTitle = formObject.title;
            var sanitizedTitle = sanitizeForFilename(bookTitle);

            var epubFile = (formObject.epubFile && formObject.epubFile.files) ? formObject.epubFile.files[0] : null;
            var coverFile = (formObject.coverImageFile && formObject.coverImageFile.files) ? formObject.coverImageFile.files[0] : null;

            // Végső adatcsomag
            var finalData = {
                rowNumber: rowNumber,
                gdocId: gdocId,
                logId: logId,
                userEmail: userEmail,
                epubBaseName: sanitizedTitle,
                quizData: getVerificationData()
            };

            // 1. Borító vízjelezése
            if (coverFile) {
                var watermarkedCoverBase64 = await embedIdInImage(coverFile, basicCode);
                finalData.coverImageData = watermarkedCoverBase64.split(',')[1];
                finalData.coverImageFilename = sanitizedTitle + '_cover.png';
                finalData.coverImageMimeType = 'image/png';
            }

            // 2. ePub feldolgozása
            if (epubFile) {
                var zip = new JSZip(); // Feltételezzük, hogy a JSZip globálisan elérhető
                var epubData = await epubFile.arrayBuffer();
                var loadedZip = await zip.loadAsync(epubData);
                var zeroWidthId = encodeIdToZeroWidth(basicCode);

                // XHTML fájlok tisztítása
                var xhtmlFileNames = Object.keys(loadedZip.files).filter(name => name.toLowerCase().endsWith('.xhtml'));
                var xhtmlPromises = xhtmlFileNames.map(async (fileName) => {
                    var content = await loadedZip.file(fileName).async('string');
                    // CSS tisztítás (eredeti regexek)
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

                // Képek vízjelezése
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

                // Szöveges vízjel beszúrása
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
                } catch (err) { console.warn("Vízjelezési hiba (nem blokkoló):", err); }

                var watermarkedEpubBlob = await loadedZip.generateAsync({ type: 'blob' });
                var epubBase64 = await readFileAsBase64(watermarkedEpubBlob);
                finalData.epubFileData = epubBase64.split(',')[1];
                finalData.epubFilename = sanitizedTitle + '.epub';
                finalData.epubMimeType = epubFile.type;

            } else {
                throw new Error("ePub fájl hiányzik a csomagból!");
            }

            setUiState('loading', 'Véglegesítés és fájlfeltöltés...');

            // Véglegesítés a szerveren
            callBackend('finalizeUpload', [finalData], showResult, showError);

        } catch (error) {
            showError(error);
        }
    }


    // --- SEGÉDFÜGGVÉNYEK ---

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
            if (statusDiv) { statusDiv.textContent = message || 'Feldolgozás...'; statusDiv.className = ''; }
            if (modalTextLocal) modalTextLocal.textContent = message || 'Feldolgozás folyamatban...';
            if (modal) modal.style.display = 'flex';
        } else {
            isSubmitting = false;
            if (submitButton) submitButton.disabled = false;
            if (statusDiv) {
                statusDiv.textContent = message || '';
                statusDiv.className = (message && (message.startsWith('Hiba') || message.startsWith('Időtúllépés'))) ? 'error' : 'success';
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
                statusDiv.innerHTML = '<div style="padding:30px; background-color:#e3fcef; color:#006644; border:2px solid #006644; border-radius:8px;"><h3>✅ ' + t('upload_success_title') + '</h3><p>' + message + '</p></div>';
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

    function displayLogoError(error) { console.error("Logo betöltési hiba:", error); }

    function displayLoadingGif(imageData) {
        var gifElement = document.getElementById('book_upload-image');
        if (gifElement) gifElement.src = 'https://storage.googleapis.com/kalozsziget-assets/images/book_upload.gif';
    }

    // --- Utilitik (Vízjelezéshez, stb.) ---
    function sanitizeForFilename(text) { if (!text) return "nevtelen_konyv"; return text.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, ''); }
    function encodeIdToZeroWidth(id) { var b = ''; for (var i = 0; i < id.length; i++) b += id[i].charCodeAt(0).toString(2).padStart(8, '0'); var z = ''; for (const x of b) z += (x === '0') ? '\u200b' : '\u200c'; return z + '\u200d'; }
    function readFileAsBase64(file) { return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(r.result); r.onerror = e => rej(e); r.readAsDataURL(file); }); }
    function readBlobAsDataURL(blob) { return new Promise((res, rej) => { var r = new FileReader(); r.onload = () => res(r.result); r.onerror = e => rej(e); r.readAsDataURL(blob); }); }
    function base64ToBlob(b64, mime) { mime = mime || 'application/epub+zip'; var c = atob(b64); var b = new Uint8Array(c.length); for (var i = 0; i < c.length; i++) b[i] = c.charCodeAt(i); return new Blob([b], { type: mime }); }
    function embedIdInImage(src, id) { return new Promise((res, rej) => { var i = new Image(); i.onload = function () { var c = document.createElement('canvas'); c.width = i.width; c.height = i.height; var x = c.getContext('2d'); x.drawImage(i, 0, 0); var b = ''; for (var k = 0; k < id.length; k++) b += id[k].charCodeAt(0).toString(2).padStart(8, '0'); b += "11111111"; var p = x.getImageData(0, 0, c.width, c.height); var d = 0; for (var k = 0; k < b.length; k++) { if ((d + 1) % 4 === 0) d++; var v = p.data[d]; p.data[d] = (b[k] === '1') ? (v | 1) : (v & 254); d++; } x.putImageData(p, 0, 0); res(c.toDataURL('image/png')); }; i.onerror = e => rej(new Error("Kép hiba")); if (typeof src === 'string') i.src = src; else { var r = new FileReader(); r.onload = e => i.src = e.target.result; r.readAsDataURL(src); } }); }

})();


// =========================================
// === ÚJ ÉS ÁTHELYEZETT TÉRKÉP FUNKCIÓK ===
// =========================================


// === 1. BIZTONSÁGI SEGÉDFÜGGVÉNYEK (VISSZAÁLLÍTVA) ===


/**
 * Megakadályozza az alapértelmezett jobbklikk menüt.
 */
function preventContextMenuDefault(event) {
    event.preventDefault();
    return false;
}

/**
 * Szigorú jobbklikk-tiltás egy adott elemen és annak gyermekein.
 * @param {string} elementId Az elem ID-ja.
 */
function disableContextMenuOnElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        // Eltávolítjuk a régit, hogy ne halmozódjon
        element.removeEventListener('contextmenu', preventContextMenuDefault);
        // Hozzáadjuk az újat
        element.addEventListener('contextmenu', preventContextMenuDefault);

        // Extra védelem: Ha az elem egy kép, tiltjuk a "drag"-ot is (hogy ne lehessen kihúzni asztalra)
        if (element.tagName === 'IMG') {
            element.setAttribute('draggable', 'false');
        }
    }
}

// =====================================
// === ÚJ TÉRKÉP (FREE MOVE & ZOOM) ===
// =====================================

// Állapotváltozók
let mapState = {
    scale: 1,
    panning: false,
    pointX: 0, // X koordináta (eltolás)
    pointY: 0, // Y koordináta (eltolás)
    startX: 0,
    startY: 0
};

const ZOOM_SPEED = 0.2;
const MAX_ZOOM = 5.0;
const MIN_ZOOM = 0.5;

/**
 * Megnyitás és inicializálás
 */
function openMapViewer(fileId, mapName) {
    const modal = document.getElementById('map-viewer-modal');
    const img = document.getElementById('map-viewer-image');
    const wrapper = document.querySelector('.map-viewer-image-wrapper');
    const loading = document.getElementById('loading-overlay');

    if (!modal || !img) return;

    // Reset UI
    img.src = '';
    // Backtick maradhat, ha modern a környezeted
    img.alt = `${mapName} betöltése...`;
    img.style.transform = ''; // Töröljük az előző pozíciót
    modal.style.display = 'flex';
    if (loading) loading.style.display = 'flex';

    // --- JAVÍTÁS: callBackend ---
    // Paraméter: csak a fileId (emailt a router intézi)
    callBackend('getMapImageData', [fileId],
        function (base64Uri) {
            if (loading) loading.style.display = 'none';
            if (base64Uri) {
                // Ellenőrzés: ha nincs 'data:image' előtag, pótoljuk
                if (!base64Uri.startsWith('data:image')) {
                    img.src = 'data:image/png;base64,' + base64Uri;
                } else {
                    img.src = base64Uri;
                }
                img.alt = mapName;

                // 1. Reseteljük a koordinátákat középre (0,0)
                resetMapState();

                // 2. Bekötjük a vezérlőket
                setupFreeControls(wrapper);

                // 3. Biztonság
                disableContextMenuOnElement('map-viewer-modal');
            } else {
                closeMapViewer();
                alert(`Hiba: Nem sikerült betölteni a térképet.`);
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
 * Alaphelyzetbe állítja a változókat
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
 * A transzformáció (CSS) alkalmazása a képre
 * Ez a "motor", ami mozgatja a képet
 */
function updateMapTransform() {
    const img = document.getElementById('map-viewer-image');
    if (!img) return;

    // Itt történik a varázslat: egyszerre mozgatjuk (translate) és nagyítjuk (scale)
    img.style.transform = `translate(${mapState.pointX}px, ${mapState.pointY}px) scale(${mapState.scale})`;
}

/**
 * Eseménykezelők (Drag & Zoom)
 */
function setupFreeControls(wrapper) {
    // --- GOMBOK ---
    document.getElementById('zoom-in-btn').onclick = () => zoomFree('in');
    document.getElementById('zoom-out-btn').onclick = () => zoomFree('out');
    document.getElementById('reset-zoom-btn').onclick = resetMapState;

    // --- EGÉRGÖRGŐ (WHEEL) ---
    wrapper.onwheel = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoomFree('in');
        else zoomFree('out');
    };

    // --- VONSZOLÁS (DRAG) ---
    wrapper.onmousedown = (e) => {
        if (e.button !== 0) return; // Csak bal klikk
        e.preventDefault(); // Szellemkép tiltása!

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

        // Kiszámoljuk az új pozíciót
        // Azért vonjuk ki az egérből a startot, mert a translate koordinátákat frissítjük
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

    // Kerekítés
    mapState.scale = Math.round(mapState.scale * 10) / 10;
    updateMapTransform();
}

// Biztonság
function disableContextMenuOnElement(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.oncontextmenu = (e) => { e.preventDefault(); return false; };
    }
}

// ===============================

/**
 * Elindítja a térképmásolási folyamatot.
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
 * Kezeli a térképfeltöltő modal "Feltöltés" gombjának megnyomását.
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
    statusDiv.textContent = 'Fájl olvasása és konvertálása...';
    statusDiv.style.color = 'black';
    document.getElementById('loading-overlay').style.display = 'flex';

    var reader = new FileReader();

    // ASYNC FÜGGVÉNY MARADT, de nyíl (=>) helyett function()
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

            statusDiv.textContent = 'Feltöltés a szerverre...';

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
            statusDiv.textContent = 'Hiba a kép konvertálása közben: ' + convertError.message;
            statusDiv.style.color = 'red';
        }
    };

    reader.onerror = function () {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = 'Hiba a fájl olvasása közben.';
        statusDiv.style.color = 'red';
    };
    reader.readAsDataURL(file);
}

/**
 * SEGÉDFÜGGVÉNY: Bármilyen kép DataURL-t PNG DataURL-lé konvertál Canvas segítségével.
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
            reject(new Error("A képfájl nem tölthető be a konvertáláshoz."));
        };
        img.src = inputDataUrl;
    });
}

// =====================================
// --- KÖNYVTÁR ÉS LETÖLTÉS FUNKCIÓK ---
// =====================================

/**
* === ÚJ, KIBŐVÍTETT KÖNYVTÁR INICIALIZÁLÓ ===
* Feltölti a Könyvtár oldalt könyvekkel, másolatokkal, tekercsekkel ÉS a felhasználó térképeivel.
* Kezeli a térkép feltöltés gomb láthatóságát és a modalokat.
* @param {object} data A szerverről kapott, előre betöltött adatcsomag.
*/
function initializeLibraryAndMapPage(data) {
    var booksContainer = document.getElementById('konyvtar-books-content');
    var copiesContainer = document.getElementById('konyvtar-copies-content');
    var scrollsContainer = document.getElementById('konyvtar-scrolls-content');
    var mapsContainer = document.getElementById('konyvtar-maps-content');
    var logsContainer = document.getElementById('konyvtar-logs-content');
    var uploadButton = document.getElementById('upload-map-button');

    // Ellenőrzés
    if (!booksContainer || !copiesContainer || !scrollsContainer || !mapsContainer || !logsContainer || !uploadButton) {
        console.error("Hiba: A Könyvtár oldal szükséges HTML konténerei hiányosak!");
        return;
    }

    // Töltő üzenetek eltávolítása/alaphelyzet
    booksContainer.innerHTML = '';
    copiesContainer.innerHTML = '';
    scrollsContainer.innerHTML = '';
    mapsContainer.innerHTML = '';
    logsContainer.innerHTML = '';

    // Általános hiba kezelése
    if (data.error) {
        booksContainer.innerHTML = '<p style="color: red;">Hiba a könyvtár betöltésekor: ' + data.error + '</p>';
        return;
    }

    // ============================================================
    // 1. LETÖLTHETŐ KÖNYVEK (BIZTONSÁGOS JAVÍTÁS)
    // ============================================================
    if (data.books && data.books.length > 0) {
        data.books.forEach(function (book) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';

            // 1. Létrehozzuk a szöveges részt stringként (ez biztonságos)
            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + book.title + '</div>' +
                '<div class="item-author">' + book.author + '</div>' +
                '</div>';

            // 2. A gombot programkóddal hozzuk létre, hogy a speciális karakterek (pl. "idézőjel") 
            // ne törjék el a HTML-t a data-title attribútumban.
            var downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = 'Letöltés';

            // Így a rendszer automatikusan kezeli az idézőjeleket
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
        booksContainer.innerHTML = "<p>Nincsenek letölthető könyveid.</p>";
    }

    // ============================================================
    // 2. OLVASHATÓ MÁSOLATOK
    // ============================================================
    if (data.copies && data.copies.length > 0) {
        data.copies.forEach(function (copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var inPlayHtml = copy.inPlay ? '<small style="color: orange; display: block;"><i>(Játékban van)</i></small>' : '';
            var btnDisabled = copy.inPlay ? 'disabled title="Játékban lévő másolat nem olvasható itt."' : '';

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
        copiesContainer.innerHTML = "<p>Nincsenek olvasható másolataid.</p>";
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
    // 4. HAJÓNAPLÓK
    // ============================================================
    if (data.logs && data.logs.length > 0) {
        data.logs.forEach(function (log) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            var logName = log.name || ('Napló (' + log.id + ')');

            entryDiv.innerHTML = '<div class="item-details">' +
                '<div class="item-title">' + logName + '</div>' +
                '<small class="item-author">Napló ID: ' + log.id + '</small>' +
                '</div>' +
                '<button class="btn">Olvasom</button>';

            entryDiv.querySelector('.btn').onclick = function () {
                openLogReader(log.id);
            };
            logsContainer.appendChild(entryDiv);
        });
    } else {
        logsContainer.innerHTML = "<p>Nincsenek olvasható hajónaplóid.</p>";
    }

    // ============================================================
    // 5. SAJÁT TÉRKÉPEK
    // ============================================================
    if (data.maps && data.maps.length > 0) {
        data.maps.forEach(function (map) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry map-entry';
            var dateStr = map.date ? new Date(map.date).toLocaleDateString() : 'Ismeretlen';

            entryDiv.innerHTML = '<div class="map-details item-details">' +
                '<div class="map-name item-title">' + map.identifier + '</div>' +
                '<small class="item-author">Feltöltve: ' + dateStr + '</small>' +
                '</div>' +
                '<div class="map-actions">' +
                '<button class="btn">Megnéz</button>' +
                '</div>';

            entryDiv.querySelector('.map-actions button').onclick = function () {
                openMapViewer(map.fileId, map.identifier);
            };
            mapsContainer.appendChild(entryDiv);
        });
    } else {
        mapsContainer.innerHTML = "<p>Nincsenek saját térképeid.</p>";
    }

    // ============================================================
    // 6. FELTÖLTÉS GOMB
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
                console.error("Hiba: A feltöltő modal HTML ('upload-map-modal') hiányzik!");
            }
        };
    } else {
        uploadButton.style.display = 'none';
    }

    // ============================================================
    // 7. PAPÁT FUNKCIÓK (TÉRKÉPEK ELBÍRÁLÁSA)
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
                        '<small class="item-author">Feltöltő: ' + map.email + '</small>' +
                        '</div>' +
                        '<div class="map-actions">' +
                        '<button class="btn view-btn" style="background:#17a2b8;">Megtekintés</button>' +
                        '<button class="btn approve-btn" style="background:#28a745;">Jóváhagyás</button>' +
                        '<button class="btn reject-btn" style="background:#dc3545;">Elutasítás</button>' +
                        '</div>';

                    entryDiv.querySelector('.view-btn').onclick = function () {
                        openMapViewer(map.fileId, map.identifier);
                    };

                    entryDiv.querySelector('.approve-btn').onclick = function () {
                        if (typeof uiConfirm === 'function') {
                            uiConfirm('Biztosan jóváhagyod ezt a térképet?', 'Megerősítés', function () {
                                handleMapApproval(map.rowIndex, 'approve');
                            });
                        }
                    };

                    entryDiv.querySelector('.reject-btn').onclick = function () {
                        if (typeof uiConfirm === 'function') {
                            uiConfirm('Biztosan elutasítod ezt a térképet?', 'Megerősítés', function () {
                                handleMapApproval(map.rowIndex, 'reject');
                            });
                        }
                    };

                    pendingMapsContainer.appendChild(entryDiv);
                });
            } else {
                pendingMapsContainer.innerHTML = '<p>Nincs elbírálásra váró térkép.</p>';
            }
        } else {
            papatApprovalSection.style.display = 'none';
        }
    }
}

/**
 * Papát térkép elbírálás backend hívás
 */
function handleMapApproval(rowIndex, action) {
    document.getElementById('loading-overlay').style.display = 'flex';
    var functionName = action === 'approve' ? 'approveMapImage' : 'rejectMapImage';

    callBackend(functionName, [rowIndex],
        function (res) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') uiAlert(res.message || res.error);
            if (res.success) {
                loadPage('konyvtar'); // Újratöltjük a könyvtárat a frissített listáért
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') uiAlert('Szerverhiba: ' + err.message);
        }
    );
}

// =========================================================
// === KÖNYVTÁR OLVASÓK (VÉGLEGES, MŰKÖDŐ VERZIÓ) ===
// =========================================================

// SEGÉDFÜGGVÉNY: Megjelenítés (VÉDELEMMEL ÉS SCROLL JAVÍTÁSSAL)
function displayInReader(htmlContent) {
    var modal = document.getElementById('reader-modal');
    var readerContent = document.getElementById('reader-content-display');
    var readerShield = document.getElementById('reader-shield');
    var container = document.querySelector('.reader-container');

    if (!modal || !readerContent) {
        console.error("Hiba: Olvasó elemek nem találhatók!");
        return;
    }

    // Tartalom beillesztése
    readerContent.innerHTML = htmlContent;

    // Megjelenítés
    modal.style.display = 'flex';

    // === VÉDELEM VISSZAÁLLÍTÁSA ===

    // 1. Jobbklikk tiltása az EGÉSZ olvasóban (nem csak a képeken)
    // Ez megakadályozza a "Kép mentése másként" és a "Másolás" menüt is.
    modal.oncontextmenu = function (e) {
        e.preventDefault();
        return false;
    };

    // 2. Kijelölés, másolás, vágás tiltása billentyűzettel (Ctrl+C, stb.)
    modal.oncopy = function (e) { e.preventDefault(); return false; };
    modal.oncut = function (e) { e.preventDefault(); return false; };
    modal.onselectstart = function (e) { e.preventDefault(); return false; };

    // === SCROLL POZÍCIÓ JAVÍTÁSA ===
    // Azonnal a tetejére görgetünk mindent
    if (container) container.scrollTop = 0;
    modal.scrollTop = 0;
    window.scrollTo(0, 0);

    // Shield (Opcionális extra védelem) méretezése
    setTimeout(function () {
        if (readerContent && readerShield) {
            readerShield.style.height = readerContent.scrollHeight + 'px';
        }
    }, 200);
}

// 1. HAJÓNAPLÓ OLVASÓ (Biztos módszer: getLogEntry + Kliens oldali HTML)
function openLogReader(logId) {
    if (!logId) return;
    console.log(`Napló olvasásának indítása: ${logId}`);
    document.getElementById('loading-overlay').style.display = 'flex';

    // --- JAVÍTÁS: callBackend ---
    // Paraméter: csak [logId] (emailt a router intézi)
    callBackend('getLogContentForReading', [logId],
        function (response) { // Objektumot kapunk: { htmlContent, imageData }
            try {
                // Hibakezelés a szerver válasza alapján
                if (response.error) {
                    throw new Error(response.error);
                }
                if (!response.htmlContent) {
                    throw new Error("Hiányzó HTML tartalom a szerver válaszában.");
                }

                let htmlToShow = response.htmlContent;
                const imageDataMap = response.imageData || {};

                // Kép placeholder-ek keresése és cseréje a kliens oldalon
                const imagePlaceholderRegex = /\[IMAGE:([^:]+):([^\]]+)\]/g;
                htmlToShow = htmlToShow.replace(imagePlaceholderRegex, (match, fileId, fileName) => {
                    const dataUri = imageDataMap[fileId]; // Itt már a teljes "data:image/png;base64,..." URI van

                    if (dataUri) {
                        // Közvetlenül használjuk a kapott Data URI-t az src attribútumban
                        const escapedFileName = fileName.replace('.txt', '').replace(/"/g, '&quot;'); // Alap escape

                        // Ellenőrzés: ha nincs 'data:image' előtag, pótoljuk
                        const src = dataUri.startsWith('data:image') ? dataUri : `data:image/png;base64,${dataUri}`;

                        // Visszaadjuk az img taget a teljes Data URI-val
                        return `<img src="${src}" alt="${escapedFileName}" style="max-width: 100%; height: auto; display: block; margin: 1em auto;">`;
                    } else {
                        // Ha a szerver nem tudta lekérni a kép adatát (null-t adott vissza)
                        console.warn(`Hiányzó kép adat a naplóban: ID=${fileId}, Fájlnév=${fileName}`);
                        // Jelenítsünk meg egyértelmű hibaüzenetet a felhasználónak
                        return `<p style="color:orange; border: 1px dashed orange; padding: 5px; text-align: center;">[Kép (${fileName.replace('.txt', '')}) nem tölthető be]</p>`;
                    }
                });

                // Body tartalom kinyerése a teljes HTML-ből
                const bodyMatch = htmlToShow.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                // Csak a body tartalmát, vagy ha nincs body, a teljes stringet adjuk át
                const bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : htmlToShow;

                // Tartalom megjelenítése az olvasóban
                displayInReader(bodyContent);

            } catch (e) {
                // Kliensoldali hiba esetén
                uiAlert(t('log_content_process_error_prefix') + e.message);
                console.error("Napló olvasási hiba (kliens):", e);
            } finally {
                // Biztosan elrejtjük a töltőképernyőt
                document.getElementById('loading-overlay').style.display = 'none';
            }
        },
        function (err) {
            // Szerverhívás hiba esetén
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert(t('log_content_fetch_error_prefix') + err.message);
            console.error("Napló olvasási hiba (szerver hívás):", err);
        }
    );
}

// 2. MÁSOLAT OLVASÓ (A TE LOGIKÁDDAL!)
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
                // 1. Fejezetek összefűzése
                result.chapters.forEach(function (chapterHtml) {
                    var bodyMatch = chapterHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i);
                    if (bodyMatch && bodyMatch[1]) {
                        fullHtmlContent += bodyMatch[1];
                    } else {
                        fullHtmlContent += chapterHtml;
                    }
                });

                // 2. Képek cseréje
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

                            // Borító ellenőrzés
                            if (foundKey.toLowerCase().indexOf('cover') !== -1 ||
                                (result.coverBase64 && newDataUri.indexOf(result.coverBase64.substring(0, 50)) !== -1)) {
                                coverFoundInText = true;
                            }

                            return match.replace(srcValue, newDataUri);
                        }

                        return match;
                    });
                }

                // 3. Borító beszúrása (ha nem volt a szövegben)
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

// 3. TEKERCS OLVASÓ (Ugyanazzal a logikával)
function openReaderForScroll(tekercsToken) {
    document.getElementById('loading-overlay').style.display = 'flex';

    // callBackend hívás
    callBackend('getContentForReading', [tekercsToken, 'tekercs'],
        function (fileData) {
            document.getElementById('loading-overlay').style.display = 'none';

            if (!fileData || !fileData.content) {
                uiAlert(t('scroll_empty'));
                return;
            }

            var contentToShow = '';

            // Tartalom kinyerése
            var bodyMatch = fileData.content.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            var bodyContent = (bodyMatch && bodyMatch[1]) ? bodyMatch[1] : fileData.content;

            // Képcsere logika
            if (fileData.embeddedImages) {
                for (var imgName in fileData.embeddedImages) {
                    var imgData = fileData.embeddedImages[imgName];
                    // String replace
                    bodyContent = bodyContent.split('Images/' + imgName).join(imgData);
                    bodyContent = bodyContent.split('"' + imgName + '"').join('"' + imgData + '"');
                }
            }

            // Borító beszúrása
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
// === TEKERCSMESTER FUNKCIÓK (ROUTERESÍTVE) ===
// =====================================

function initializeTekercsmesterPage(preloadedData) {
    var loader = document.getElementById('sajat-tekercs-lista-loader');
    var sajatListaDiv = document.getElementById('sajat-tekercs-lista');
    var eladoLista = document.getElementById('elado-tekercs-lista');

    loader.style.display = 'block';

    // callBackend hívás (paraméter nélküli lekérdezés)
    callBackend('getTekercsmesterData', [],
        function (data) {
            loader.style.display = 'none';

            if (data.error) {
                // String összefűzés
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
    // .closest() helyett biztonságosabb parentNode bejárást is használhatnánk, de a modern böngészők ismerik
    var hartyaContainer = hartyaCountSpan ? hartyaCountSpan.parentNode : null;
    // Keresünk felfelé, ha nem közvetlen szülő
    while (hartyaContainer && !hartyaContainer.classList.contains('stat-box')) {
        hartyaContainer = hartyaContainer.parentNode;
    }

    if (hartyaContainer) {
        // 1. TEKERCSPRÉS GOMB
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

        // 2. HÁRTYA ELADÁS GOMB
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
            // String összefűzés
            reszletekDiv.innerHTML = '<div class="item-title">' + szett.title + ' (' + szett.tekercsek.length + ' db)</div>' +
                '<div class="item-author">' + szett.author + '</div>';

            var gombokDiv = document.createElement('div');

            // --- A. Összefűzés gomb ---
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

            // --- B. Egyedi tekercsek eladása ---
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
// === MÁSOLATOK OLDAL INICIALIZÁLÓ ===
// =====================================

/**
 * Inicializálja a Másolatok oldalt.
 * JAVÍTVA: callBackend hívásokból kivéve a currentUserEmail.
 */
function initializeMasolatokAndCopyMapPage(data) {
    var myCopiesLoader = document.getElementById('sajat-masolat-lista-loader');
    var myCopiesContainer = document.getElementById('sajat-masolat-lista-content');
    var forSaleCopiesSelect = document.getElementById('elado-masolat-lista');
    var buyCopySection = document.getElementById('buy-copy-section');
    var buyCopyDetailsDiv = document.getElementById('buy-copy-selection-details');
    var buyCopyBtn = document.getElementById('buy-copy-btn');
    var buyCopyPinInput = document.getElementById('buy-copy-pin-code');

    // Új elemek a térképmásoláshoz
    var availableMapsLoader = document.getElementById('available-maps-list-loader');
    var availableMapsContainer = document.getElementById('available-maps-list-content');
    var copyMapPinInput = document.getElementById('copy-map-pin');
    var copyMapPinLabel = copyMapPinInput ? copyMapPinInput.previousElementSibling : null;

    if (!myCopiesLoader || !myCopiesContainer || !forSaleCopiesSelect || !buyCopySection || !buyCopyDetailsDiv || !buyCopyBtn || !buyCopyPinInput || !availableMapsLoader || !availableMapsContainer || !copyMapPinInput || !copyMapPinLabel) {
        console.error("Hiba: A Másolatok oldal szükséges HTML elemei hiányosak! Ellenőrizd az ID-kat.");
        return;
    }

    myCopiesLoader.style.display = 'none';
    availableMapsLoader.style.display = 'none';

    if (data.error) {
        myCopiesContainer.innerHTML = '<p style="color:red;">' + t('error_prefix') + data.error + '</p>';
        availableMapsContainer.innerHTML = '<p style="color:red;">' + t('error_prefix') + data.error + '</p>';
        return;
    }

    // --- Saját másolatok listázása ---
    myCopiesContainer.innerHTML = '';
    if (data.myCopies && data.myCopies.length > 0) {
        data.myCopies.forEach(function (copy) {
            var entryDiv = document.createElement('div');
            entryDiv.className = 'item-entry';
            entryDiv.innerHTML = '<div class="item-details"><div class="item-title">' + copy.title + '</div><div class="item-author">' + copy.author + '</div></div>';
            var gombokDiv = document.createElement('div');
            if (!copy.inPlay) {
                // Játékba viszem gomb
                var playBtn = document.createElement('button');
                playBtn.className = 'btn';
                playBtn.textContent = t('copy_play_button');
                playBtn.onclick = function () {
                    var gmBtn = document.getElementById('floating-gamemaster-btn');
                    if (gmBtn) gmBtn.click();

                    setTimeout(function () {
                        var chatArea = document.getElementById('universal-chat-area');
                        chatArea.innerHTML = '';
                        var loaderId = "loader-" + Date.now();
                        var loader = document.createElement('div');
                        loader.id = loaderId;
                        loader.innerHTML = '<i class="fas fa-chess-knight fa-spin" style="color:#fff; margin-right:8px;"></i> <i>A Játékmester felkészül...</i>';
                        chatArea.appendChild(loader);

                        callBackend('handleNPCInteraction', ['gamemaster', '', 'START_GM_SESSION', copy.code],
                            function (response) {
                                var l = document.getElementById(loaderId);
                                if (l) l.remove();
                                handleUniversalResponse(response);
                            },
                            function (err) {
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

                                // --- JAVÍTÁS: callBackend ---
                                // currentUserEmail KIVÉVE!
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

    // --- Eladó másolatok listázása ---
    forSaleCopiesSelect.innerHTML = '<option value="">' + t('select_copy_option') + '</option>';
    if (data.forSale && data.forSale.length > 0) {
        data.forSale.forEach(function (item) {
            var option = document.createElement('option');
            option.value = item.rowIndex;
            // JSON stringify, hogy adatot tároljunk
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
            // String összefűzés
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

        // --- JAVÍTÁS: callBackend ---
        // currentUserEmail KIVÉVE!
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

    // --- Másolható térképek listázása ---
    availableMapsContainer.innerHTML = '';

    if (data.availableMaps && data.availableMaps.length > 0) {
        console.log("Elérhető térképek találva.");

        // Csoportosítás (manuális loop)
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

        // Object.values manuális emulálása (vagy használata, ha támogatott) és rendezés
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
            // Feltételezzük, hogy MAP_COPY_COST definiálva van globálisan
            var cost = (typeof MAP_COPY_COST !== 'undefined') ? MAP_COPY_COST : 10;

            entryDiv.innerHTML =
                '<div class="map-details item-details">' +
                '<div class="map-name item-title">' + group.name + ' (' + group.count + ' db)</div>' +
                '<small class="item-author">Másolás ára: ' + cost + ' kredit</small>' +
                '</div>' +
                '<div class="map-actions">' +
                '<button class="btn">Másolás</button>' +
                '</div>';

            entryDiv.querySelector('.map-actions button').onclick = function () {
                if (typeof initiateMapCopy === 'function') initiateMapCopy(group.firstRowIndex, group.name);
            };
            availableMapsContainer.appendChild(entryDiv);
        });

        if (copyMapPinInput) copyMapPinInput.style.display = 'block';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'block';

    } else {
        availableMapsContainer.innerHTML = "<p>Jelenleg nincsenek másolható térképek.</p>";
        if (copyMapPinInput) copyMapPinInput.style.display = 'none';
        if (copyMapPinLabel) copyMapPinLabel.style.display = 'none';
    }

    // --- Hajónapló Kivonatolás Listázása ---
    var logExtractSelect = document.getElementById('log-extract-select');
    if (logExtractSelect) {
        logExtractSelect.innerHTML = '<option value="">Válassz hajónaplót...</option>';
        if (data.logs && data.logs.length > 0) {
            data.logs.forEach(function (log) {
                var option = document.createElement('option');
                option.value = log.id;
                option.textContent = log.name;
                logExtractSelect.appendChild(option);
            });
        }
    }

    // --- Papát Funkciók Megjelenítése ---
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
 * Betölti a kiválasztott hajónaplót kivonatolás céljából
 */
function loadLogForExtraction() {
    var select = document.getElementById('log-extract-select');
    var modalDiv = document.getElementById('log-extract-modal');
    var entriesDiv = document.getElementById('log-extract-entries');
    var loader = document.getElementById('log-extract-loader');
    var costSpan = document.getElementById('log-extract-total-cost');
    var logId = select.value;

    if (!logId) {
        if (modalDiv) modalDiv.style.display = 'none';
        return;
    }

    if (modalDiv) modalDiv.style.display = 'none';
    loader.style.display = 'block';

    callBackend('getLogContentForReading', [logId],
        function (res) {
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
                entriesDiv.innerHTML = '<p>A napló üres.</p>';
            } else {
                entries.forEach(function (entry) {
                    var entryId = entry.getAttribute('data-entry-id');
                    var dateAttr = entry.getAttribute('data-date');
                    var entryTitle = 'Bejegyzés: ' + (dateAttr || 'Ismeretlen dátum');

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

                    checkbox.onchange = function () {
                        var checked = document.querySelectorAll('.log-extract-checkbox:checked').length;
                        costSpan.textContent = (checked * 10).toString();
                        var btn = document.getElementById('log-extract-btn');
                        if (btn) btn.textContent = 'Kivonatolás (' + (checked * 10) + ' Kredit)';
                    };

                    var textContainer = document.createElement('div');
                    textContainer.style.flex = "1";

                    var headerDiv = document.createElement('div');
                    headerDiv.style.cursor = 'pointer';
                    headerDiv.style.display = 'flex';
                    headerDiv.style.justifyContent = 'space-between';
                    headerDiv.innerHTML = '<strong>' + entryTitle + '</strong><small style="color: #666; font-weight: bold;">▼ Olvasás</small>';

                    var contentDiv = document.createElement('div');
                    contentDiv.style.display = 'none';
                    contentDiv.style.marginTop = '10px';
                    contentDiv.style.paddingTop = '10px';
                    contentDiv.style.borderTop = '1px dashed #ccc';
                    contentDiv.style.fontFamily = 'var(--font-serif)';
                    contentDiv.style.fontSize = '1.1em';
                    contentDiv.style.lineHeight = '1.6';
                    contentDiv.innerHTML = entry.innerHTML;

                    headerDiv.onclick = function () {
                        var isHidden = contentDiv.style.display === 'none';
                        contentDiv.style.display = isHidden ? 'block' : 'none';
                        headerDiv.querySelector('small').innerHTML = isHidden ? '▲ Bezárás' : '▼ Olvasás';
                    };

                    textContainer.appendChild(headerDiv);
                    textContainer.appendChild(contentDiv);

                    wrapper.appendChild(checkbox);
                    wrapper.appendChild(textContainer);
                    entriesDiv.appendChild(wrapper);
                });
            }
            if (modalDiv) modalDiv.style.display = 'flex';
        },
        function (err) {
            loader.style.display = 'none';
            if (typeof uiAlert === 'function') uiAlert("Hiba történt a napló betöltésekor: " + err.message);
            select.value = '';
        }
    );
}

/**
 * Papát feltölti a GDoc naplómásolatot.
 */
function submitPapatLogUpload() {
    var gdocUrl = document.getElementById('papat-log-gdoc').value.trim();
    var copyName = document.getElementById('papat-log-name').value.trim();

    if (!gdocUrl || !copyName) {
        if (typeof uiAlert === 'function') uiAlert("Minden mező kitöltése kötelező!", "Hiba");
        return;
    }

    var urlMatch = gdocUrl.match(/[-\w]{25,}/);
    if (!urlMatch) {
        if (typeof uiAlert === 'function') uiAlert("Kérlek adj meg egy érvényes Google Docs linket!", "Hiba");
        return;
    }

    document.getElementById('loading-overlay').style.display = 'flex';

    callBackend('uploadPapatLogCopy', [gdocUrl, copyName],
        function (res) {
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
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') {
                uiAlert("Szerverhiba történt: " + err.message, "Hiba");
            }
        }
    );
}

/**
 * Végrehajtja a kiválasztott bejegyzések kivonatolását és a kifizetést
 */
function executeLogExtraction() {
    var select = document.getElementById('log-extract-select');
    var checkboxes = document.querySelectorAll('.log-extract-checkbox:checked');

    var logId = select.value;

    if (!logId) {
        if (typeof uiAlert === 'function') uiAlert("Válassz ki egy hajónaplót!");
        return;
    }
    if (checkboxes.length === 0) {
        if (typeof uiAlert === 'function') uiAlert("Legalább egy bejegyzést ki kell választanod!");
        return;
    }

    var selectedIds = [];
    for (var i = 0; i < checkboxes.length; i++) {
        selectedIds.push(checkboxes[i].value);
    }

    var totalCost = selectedIds.length * 10;
    var customMessage = "A művelet díja " + totalCost + " Kalózkredit.<br>Kérlek, add meg a PIN kódodat a folytatáshoz!";

    if (typeof requestPin === 'function') {
        requestPin(function (pinCode) {
            document.getElementById('loading-overlay').style.display = 'flex';

            callBackend('extractLogEntriesToCopy', [logId, selectedIds, pinCode],
                function (res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (res.error) {
                        if (typeof uiAlert === 'function') uiAlert(res.error, "Hiba");
                    } else {
                        if (typeof uiAlert === 'function') uiAlert(res.message, "Sikeres kivonatolás");
                        select.value = '';
                        var modalDiv = document.getElementById('log-extract-modal');
                        if (modalDiv) modalDiv.style.display = 'none';
                        updateCreditDisplay();
                        loadPage('masolatok_oldal');
                    }
                },
                function (err) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (typeof uiAlert === 'function') uiAlert("Rendszerhiba történt: " + err.message, "Hiba");
                }
            );
        }, customMessage);
    } else {
        if (typeof uiAlert === 'function') uiAlert("A PIN bekérő modul nem elérhető!");
    }
}

/**
 * Elindítja a kliensoldali letöltési és vízjelezési folyamatot.
 * @param {string} contentId A könyv forrásának azonosítója (Mappa ID az O oszlopból).
 */
async function startClientSideDownloadProcess(contentId, bookTitle) {
    var statusOverlay = document.getElementById('loading-overlay');
    var allDownloadButtons = Array.prototype.slice.call(document.querySelectorAll('.download-btn'));

    if (statusOverlay) statusOverlay.style.display = 'flex';
    allDownloadButtons.forEach(function (btn) { btn.disabled = true; });

    try {
        console.log("Letöltés indítása. ID:", contentId, "Cím:", bookTitle);

        if (!contentId) throw new Error("Hiányzó könyv azonosító!");

        // 1. ADATOK LEKÉRÉSE A SZERVERRŐL
        // Átadjuk a címet is második paraméterként!
        var data = await new Promise(function (resolve, reject) {
            callBackend('getRawFilesForDownload', [contentId, bookTitle],
                function (res) { resolve(res); },
                function (err) { reject(err); }
            );
        });

        if (data.error) throw new Error(data.error);
        if (!data.epubBase64 || !data.coverBase64) throw new Error("Hiányos adat érkezett a szervertől.");

        // 2. ADATOK VISSZAALAKÍTÁSA (Base64 -> Blob)
        // String összefűzés backtick helyett
        var epubRes = await fetch('data:application/epub+zip;base64,' + data.epubBase64);
        var epubBlob = await epubRes.blob();

        var coverRes = await fetch('data:image/png;base64,' + data.coverBase64);
        var coverBlob = await coverRes.blob();

        // 3. VÍZJELEZÉS (KÉP)
        // A data.bookCode a felhasználó egyedi kódja, amit a szerver küld vissza
        var finalImageBlob = coverBlob;
        if (typeof embedIdInImage === 'function') {
            var watermarkedCoverBase64 = await embedIdInImage(coverBlob, data.bookCode);
            var finalImageRes = await fetch(watermarkedCoverBase64);
            finalImageBlob = await finalImageRes.blob();
        } else {
            console.warn("embedIdInImage hiányzik, a borító vízjelezése kimaradt.");
        }

        // 4. EPUB CSOMAGOLÁS ÉS VÍZJELEZÉS (SZÖVEG)
        // Ez a függvény (processEpubFile) végzi a szöveges vízjelezést és az új borító beillesztését
        var finalEpubBlob = await processEpubFile(epubBlob, finalImageBlob, data.bookCode, data.coverFilename);

        // 5. LETÖLTÉS INDÍTÁSA A BÖNGÉSZŐBEN
        var downloadAnchor = document.createElement('a');
        downloadAnchor.href = URL.createObjectURL(finalEpubBlob);
        downloadAnchor.download = data.epubFilename || 'konyv.epub';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);

        // Memória felszabadítása
        setTimeout(function () { URL.revokeObjectURL(downloadAnchor.href); }, 1000);

        if (typeof uiAlert === 'function') uiAlert(t('download_success'));

    } catch (error) {
        console.error("Letöltési hiba:", error);
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
 * Feldolgozza az ePub fájlt és QR KÓDOT is beszúr a link mellé.
 * JAVÍTOTT MARKETINGES VERZIÓ.
 * @param {Blob} epubBlob Az eredeti ePub.
 * @param {Blob} newCoverBlob Az új, vízjeles borító (PNG).
 * @param {string} bookCode Az új, beillesztendő kód.
 * @param {string} newCoverFilename Az új borító kívánt fájlneve (pl. "kep.png").
 * @returns {Promise<Blob>} A kész, végleges ePub fájl.
 */
async function processEpubFile(epubBlob, newCoverBlob, bookCode, newCoverFilename) {
    var zip = new JSZip();
    var loadedZip = await zip.loadAsync(epubBlob);

    var zeroWidthId = (typeof encodeIdToZeroWidth === 'function') ? encodeIdToZeroWidth(bookCode) : bookCode;

    // Fájlok szűrése (ES5)
    var allFiles = Object.keys(loadedZip.files);
    var xhtmlFiles = allFiles.filter(function (name) {
        return name.indexOf('.xhtml') !== -1 || name.indexOf('.html') !== -1;
    });

    // === MARKETING LINK ÉS QR KÓD ===
    var appUrl = "https://script.google.com/macros/s/AKfycbzZZV2QQ4fOExg_dv0ddkWVEFgNTCXzYtFhWlOs1Kn5R3wUCHDXV7IpE3Kx3DNT53Npbw/exec";
    var feedbackLink = appUrl + "?page=marketing&bookId=" + bookCode;
    var qrImageUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(feedbackLink);

    // HTML Blokk (String összefűzés backtick helyett!)
    var feedbackHtmlBlock = "";
    feedbackHtmlBlock += '<div style="margin-top: 50px; padding: 20px; border-top: 2px solid #ccc; text-align: center; font-family: sans-serif; page-break-before: always;">';
    feedbackHtmlBlock += '<hr/>';
    feedbackHtmlBlock += '<h3>☠️ Tetszett a zsákmány? ☠️</h3>';
    feedbackHtmlBlock += '<p>Oszd meg véleményedet a szerzővel és a készítőkkel!</p>';
    feedbackHtmlBlock += '<p>Minden válaszodért <strong>Kalózkreditet</strong> kapsz jutalmul.</p>';

    feedbackHtmlBlock += '<div style="margin: 20px auto;">';
    feedbackHtmlBlock += '<img src="' + qrImageUrl + '" alt="Szkenneld be" style="width: 150px; height: 150px; border: 2px solid #333; padding: 5px;"/>';
    feedbackHtmlBlock += '<p><small>Szkenneld be a telefonoddal!</small></p>';
    feedbackHtmlBlock += '</div>';

    feedbackHtmlBlock += '<p>';
    feedbackHtmlBlock += '<a href="' + feedbackLink + '" target="_blank" style="background-color: #8b0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">';
    feedbackHtmlBlock += 'Vélemény írása a böngészőben';
    feedbackHtmlBlock += '</a>';
    feedbackHtmlBlock += '</p>';
    feedbackHtmlBlock += '<p><small>(Ha az olvasód nem kezeli a böngészőt, használd a fenti kódot)</small></p>';
    feedbackHtmlBlock += '</div>';

    var lastFile = xhtmlFiles[xhtmlFiles.length - 1];

    for (var i = 0; i < xhtmlFiles.length; i++) {
        var fileName = xhtmlFiles[i];
        var content = await loadedZip.file(fileName).async('string');

        // Vízjel csere
        content = content.replace(/[\u200b-\u2d0d]/g, '');
        // RegExp objektum a változó miatt
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

    // === HIBRID BORÍTÓAZONOSÍTÁS ÉS CSERE ===
    var oldCoverFullPath = null;
    var opfFile = allFiles.find(function (name) { return name.indexOf('.opf') !== -1; });

    if (!opfFile) throw new Error("Hiba: A könyv tartalomjegyzéke (.opf fájl) nem található.");

    var opfContent = await loadedZip.file(opfFile).async('string');

    // 1. KÍSÉRLET: cover.xhtml
    var coverXhtmlFile = allFiles.find(function (name) { return name.toLowerCase().indexOf('cover.xhtml') !== -1; });
    if (coverXhtmlFile) {
        var coverXhtmlContent = await loadedZip.file(coverXhtmlFile).async('string');
        var imgSrcRegex = /<img[^>]*src="([^"]+)"/;
        var match = coverXhtmlContent.match(imgSrcRegex);
        if (match && match[1]) {
            oldCoverFullPath = (typeof resolvePath === 'function') ? resolvePath(coverXhtmlFile, match[1]) : match[1];
        }
    }

    // 2. KÍSÉRLET: Manifeszt
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
        // Regex escape nélkül veszélyes lehet, de feltételezzük a normál fájlnevet
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
// === MARKETING (VÉLEMÉNY) MODUL ===
// ===================================

var currentMarketingBookId = null;
var currentMarketingFolderId = null;

// URL Paraméterek ellenőrzése
function checkUrlParametersForMarketing() {
    try {
        // 1. Szabványos URL paraméter olvasás (Böngésző független)
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        // Keresett paraméterek
        const bookId = urlParams.get('bookId');
        const folderId = urlParams.get('folderId');

        if (bookId) {
            console.log("Marketing paraméter találat:", bookId);

            // Globális változóba mentjük a későbbi használatra
            window.pendingMarketingData = {
                bookId: bookId,
                folderId: folderId
            };

            // --- EZT HOZTUK VISSZA A RÉGIBŐL (UI Üzenet) ---
            var loginStatus = document.getElementById('login-status');
            var loginView = document.getElementById('login-view');

            // Ha a belépő képernyőn vagyunk, jelezzük a felhasználónak
            if (loginStatus && loginView && window.getComputedStyle(loginView).display !== 'none') {
                loginStatus.innerHTML = '<span style="color:#2e8b57; font-weight:bold;">☠️ A zsákmány értékeléséhez és a jutalom átvételéhez kérlek, lépj be!</span>';
            }
        }
    } catch (e) {
        console.error("Hiba az URL paraméterek olvasásakor:", e);
    }
}

// Betölti a kérdőívet
function loadMarketingView(bookId, folderId) {
    console.log(">>> loadMarketingView MEGHÍVVA: " + bookId);

    currentMarketingBookId = bookId;
    currentMarketingFolderId = folderId;

    // 1. NÉZETEK KEZELÉSE
    document.getElementById('app-view').style.display = 'none';
    document.getElementById('login-view').style.display = 'none';

    var marketingView = document.getElementById('marketing-view');
    if (marketingView) {
        marketingView.style.display = 'block';
    } else {
        console.error("KRITIKUS HIBA: Nem található a 'marketing-view' div!");
        return;
    }

    // 2. TÖLTÉS JELZŐ
    var container = document.getElementById('marketing-questions-area');
    if (container) {
        container.innerHTML = '<div style="text-align:center; padding:50px; color:#555;">' +
            '<i class="fas fa-spinner fa-spin fa-3x"></i>' +
            '<p style="margin-top:15px;">Kérdéseink a könyvről...</p>' +
            '</div>';
    }

    // 3. SZERVER HÍVÁS (callBackend)
    callBackend('getFeedbackFormConfig', [bookId, folderId], // currentUserEmail-t a Router adja hozzá
        function (response) {
            console.log(">>> SZERVER VÁLASZ:", response);

            if (response.success) {
                renderMarketingQuestions(response.config, response.isOwner, bookId, folderId);
            }
            else if (response.error === "ALREADY_VOTED") {
                container.innerHTML = '';
                showSystemModal(
                    "Már szavaztál!",
                    response.message,
                    "fas fa-check-double",
                    [{
                        text: "Rendben, vissza a Kikötőbe",
                        color: "#2e8b57",
                        textColor: "white",
                        callback: function () { returnToPort(); }
                    }]
                );
            }
            else {
                container.innerHTML = '';
                showSystemModal(
                    "Hiba történt",
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
            console.error(">>> HÁLÓZATI HIBA:", err);
            if (container) container.innerHTML = '';
            showSystemModal(
                "Kapcsolódási Hiba",
                "Nem sikerült elérni a szervert: " + err.message,
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
 * Dinamikusan kirajzolja a kérdéseket.
 * Kétlépcsős folyamat: Ellenőrzés -> Értékelés
 */
function renderMarketingQuestions(config, isOwner, bookId, folderId) {
    console.log(">>> RENDER START. Kapott kérdések:", config.questions);

    var container = document.getElementById('marketing-questions-area');
    if (!container) return;
    container.innerHTML = '';

    // --- DOBOZOK ---
    var verifyDiv = document.createElement('div');
    verifyDiv.id = 'verify-section';
    verifyDiv.style.cssText = "background:#fff3e0; padding:20px; border-radius:8px; border:1px solid #ffcc80; margin-bottom:20px;";
    verifyDiv.innerHTML = '<h3 style="margin-top:0; color:#e65100;"><i class="fas fa-shield-alt"></i> 1. Lépés: Olvasottsági Próba</h3>' +
        '<p style="margin-bottom:15px; font-style:italic;">Válaszolj helyesen, különben a rendszer visszaküld a kikötőbe!</p>';

    var marketingDiv = document.createElement('div');
    marketingDiv.id = 'marketing-section';
    marketingDiv.style.display = 'none';
    marketingDiv.innerHTML = '<h3 style="margin-top:20px; color:#2e8b57; border-top:1px dashed #ccc; padding-top:20px;"><i class="fas fa-star"></i> 2. Lépés: Értékelés</h3>';

    // --- KÉRDÉSEK GENERÁLÁSA ---
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
                inputHtml += '<input type="radio" id="' + q.id + '_' + i + '" name="' + q.id + '" value="' + i + '"><label for="' + q.id + '_' + i + '">★</label>';
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
            // Dataset használata helyett data- attribútum stringben is jó, vagy JS-ből állítva
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

    // --- VEZÉRLÉS ---
    var submitBtn = document.getElementById('submit-marketing-btn');
    if (submitBtn) submitBtn.style.display = 'none';

    // HA VAN ELLENŐRZŐ KÉRDÉS
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
            // NodeList forEach támogatás IE-ben nincs, de modern böngészőben oké. Biztonságosabb lenne Array.from().forEach
            for (var k = 0; k < inputs.length; k++) {
                var input = inputs[k];
                var userAnswer = input.value.trim().toLowerCase();
                var correctAnswer = (input.dataset.answer || "").trim().toLowerCase();

                console.log('Ellenőrzés: User="' + userAnswer + '" vs Correct="' + correctAnswer + '"');

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
                    "Hibás válasz!",
                    "Sajnálom, de az ellenőrző kérdésekre adott válaszaid nem megfelelőek. A rendszer most visszairányít.",
                    "fas fa-ban",
                    [{
                        text: "Kilépés",
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
            // scrollIntoView smooth opcióval
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

    // Szerzői panel
    if (isOwner) {
        var authorPanel = document.createElement('div');
        authorPanel.style.cssText = "margin-bottom: 20px; padding: 15px; background: #e6fffa; border: 2px dashed #319795; text-align: center; border-radius:8px;";
        authorPanel.innerHTML = '<h3 style="margin-top:0; color:#2c7a7b;">✒️ Üdvözlet, Szerző!</h3>' +
            '<button class="btn" style="background:#319795; color:white;" onclick="openAuthorDashboard(\'' + bookId + '\', \'' + folderId + '\', \'A Könyved\')">📊 Statisztikák</button>';
        container.insertBefore(authorPanel, container.firstChild);
    }
}

/**
 * Válaszok összegyűjtése és beküldése.
 */
function submitMarketingForm() {
    var form = document.getElementById('marketing-form');
    var formData = new FormData(form);
    var answers = {};

    // FormData iterálás ES5 módon (nem for...of)
    // A modern böngészők támogatják a for...of-ot, de a biztonság kedvéért:
    // Mivel a FormData.entries() iterátort ad, és az IE nem támogatja,
    // a legbiztosabb, ha manuálisan szedjük össze az inputokat, 
    // VAGY bízunk benne, hogy a Chrome/FF futtatja.
    // Javítás: Sima DOM bejárás a form elemein.
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
            "Üres a palack?",
            "Kérlek, válaszolj legalább egy kérdésre, mielőtt a tengerbe dobnád az üzenetet!",
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
                    "Sikeres Küldetés!",
                    '<div style="text-align:center;">' +
                    '<p style="font-size:1.1em; margin-bottom:15px;">' + res.message + '</p>' +
                    '<p style="color:#2e8b57; font-weight:bold;">+1 Kalózkredit jóváírva!</p>' +
                    '</div>',
                    "fas fa-gem",
                    [{
                        text: "Kreditek Zsebretétele & Kilépés",
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
                    "Hiba történt",
                    "A szerver visszautasította a kérést:<br><b>" + res.error + "</b>",
                    "fas fa-skull-crossbones",
                    [{ text: "Megértettem", color: "#8b0000", textColor: "white" }]
                );
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            showSystemModal(
                "Kapcsolódási Hiba",
                "Nem sikerült elérni a szervert. Ellenőrizd az internetkapcsolatot!<br><small>" + err.message + "</small>",
                "fas fa-wifi",
                [{ text: "Rendben", color: "#555", textColor: "white" }]
            );
        }
    );
}

// ===============================================
// === SZERZŐI DASHBOARD FUNKCIÓK MARKETINGHEZ ===
// ===============================================

let currentDashBookId = null;
let currentDashFolderId = null;

// Fülváltó a Dashboardon belül
function openDashboardTab(evt, tabName) {
    var tabs = document.querySelectorAll('#author-dashboard-modal .tab-content');
    for (var i = 0; i < tabs.length; i++) { tabs[i].style.display = 'none'; }

    var btns = document.querySelectorAll('#author-dashboard-modal .tab-button');
    for (var j = 0; j < btns.length; j++) { btns[j].classList.remove('active'); }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

/**
 * Megnyitja a Dashboardot egy adott könyvhöz.
 * @param {string} bookId - A könyv azonosítója (Kódja).
 * @param {string} folderId - A könyv mappájának ID-ja (ahol a JSON van).
 * @param {string} title - A könyv címe (fejléchez).
 */
function openAuthorDashboard(bookId, folderId, title) {
    currentDashBookId = bookId;
    currentDashFolderId = folderId;

    document.getElementById('dashboard-book-title').textContent = title + " - Marketing Elemző";
    document.getElementById('author-dashboard-modal').style.display = 'flex';
    document.getElementById('dashboard-loading').style.display = 'block';
    document.getElementById('dashboard-content').style.display = 'none';

    // Alaphelyzetbe állítás
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
 * 1. Feltölti a "Meglévő kérdések" listát a Settings fülön.
 * 2. Kirajzolja a Statisztikákat az Eredmények fülön.
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

    // === 0. LÉPÉS: VERIFY KÉRDÉSEK ===
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

    // === 1. MEGLÉVŐ KÉRDÉSEK LISTÁZÁSA ===
    const questionsListContainer = document.getElementById('existing-questions-list');

    if (questionsListContainer) {
        questionsListContainer.innerHTML = '';
        const questions = (response.config && response.config.questions) ? response.config.questions : [];

        if (questions.length === 0) {
            questionsListContainer.innerHTML = '<p style="color:#888;">Nincsenek aktív kérdések.</p>';
        } else {
            const ul = document.createElement('ul');
            ul.style.cssText = "list-style: none; padding: 0; margin: 0;";

            questions.forEach(q => {
                const li = document.createElement('li');
                li.style.cssText = "padding: 8px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px;";

                let typeIcon = '<i class="fas fa-font" title="Szöveges"></i>';
                if (q.type === 'rating') typeIcon = '<i class="fas fa-star" style="color: gold;" title="Értékelés"></i>';
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

    // === 2. STATISZTIKÁK KIRAJZOLÁSA ===
    const stats = response.stats;
    const detailsList = document.getElementById('dashboard-details-list');
    const totalRespEl = document.getElementById('stat-total-responses');

    if (!stats) {
        if (detailsList) detailsList.innerHTML = `<p style="text-align:center; color:#666; padding:20px;">Még nem érkezett válasz az olvasóktól.</p>`;
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
            const avg = parseFloat(data.average) || 0; // Biztonságos parszolás
            const percent = (avg / 5) * 100;
            // Biztonságos csillag generálás
            const starCount = Math.round(avg);
            const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);

            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Átlag: <strong>${avg.toFixed(1)}</strong> / 5</span>
                    <span style="color:#f6e05e;">${stars}</span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${percent}%; background:#ecc94b; height:100%;"></div>
                </div>`;
        } else if (data.type === 'yesno') {
            visualHtml = `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>Igen válaszok: <strong>${data.yesPercent}%</strong></span>
                </div>
                <div class="progress-container" style="background:#edf2f7; height:10px; border-radius:5px; overflow:hidden;">
                    <div class="progress-bar" style="width: ${data.yesPercent}%; background:#4299e1; height:100%;"></div>
                </div>`;
        } else if (data.type === 'text') {
            let answersHtml = (data.answers && data.answers.length > 0)
                ? data.answers.map(ans => `<div style="background:#f7fafc; padding:8px; border-left:3px solid #cbd5e0; margin-bottom:5px; font-style:italic;">"${ans}"</div>`).join('')
                : '<div style="color:#aaa; font-style:italic;">(Nincs szöveges válasz)</div>';
            visualHtml = `<div style="margin-top:10px;">${answersHtml}</div>`;
        }

        itemDiv.innerHTML = `<div style="font-weight:bold; margin-bottom:10px; color:#2d3748;">${data.label}</div>${visualHtml}`;
        detailsList.appendChild(itemDiv);
    }
}

/**
 * Összeszedi a 3 Verify mezőt és elküldi a szervernek mentésre.
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
    if (talentumEl) {
        var rawTalentum = Number(data.talentum) || 0;
        talentumEl.innerText = Math.floor(rawTalentum);
        talentumEl.title = "Pontos Tálentum: " + rawTalentum;
        talentumEl.style.cursor = 'help';
        talentumEl.style.borderBottom = '1px dotted #D2E505'; // Kis vizuális jelzés a tooltiphez
    }

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

    // A feltétel maradhat (kliens oldali ellenőrzésnek jó), de a hívásból kivesszük!
    if (currentUserEmail && data.rang) {
        console.log('[initializeKincsekPage] Rang frissítésének indítása: ' + currentUserEmail + ', ' + data.rang);

        // --- JAVÍTOTT callBackend ---
        // Csak a [data.rang]-ot küldjük! Az emailt a Router intézi.
        callBackend('updatePlayerRank', [data.rang],
            function () { }, // Siker esetén csendben maradunk
            function (error) {
                console.error('!!! HIBA a rang szerveroldali frissítésekor: ' + error.message);
            }
        );
    } else {
        console.warn("[initializeKincsekPage] Figyelmeztetés: Hiányzó currentUserEmail vagy data.rang a rangfrissítéshez.");
    }

    // --- ZSOLDOSOK BETÖLTÉSE ---
    var mercContainer = document.getElementById('char-sheet-mercenaries');
    if (mercContainer) {
        callBackend('getMyMercenaries', [],
            function (mercResponse) {
                if (mercResponse && mercResponse.length > 0) {
                    var html = '';
                    mercResponse.forEach(function (merc) {
                        html += '<div style="background: rgba(255, 255, 255, 0.85); padding: 10px; margin-bottom: 10px; border-radius: 5px; border-left: 4px solid #8b4513; box-shadow: 0 1px 3px rgba(0,0,0,0.3);">';
                        html += '<strong style="color:#000; font-size:1.1em;">' + merc.name + '</strong> <span style="font-size:0.9em; color:#3e2723; font-style:italic;">(' + merc.role + ')</span><br>';
                        html += '<span style="font-size:0.9em; color:#8b0000; font-weight:bold;">Szerződés: ' + merc.remainingDays + ' nap hátra (lejár: ' + merc.endDateStr + ')</span><br>';
                        html += '<div style="margin-top:8px; display:flex; gap:5px;">';
                        html += '<button class="btn btn-sm" onclick="handleMercenaryAction(\'extend\', \'' + merc.name + '\')" style="flex:1; padding:5px; font-size:0.8em;">Meghosszabbítom (' + merc.cost + ' Kr)</button>';
                        html += '<button class="btn btn-danger btn-sm" onclick="handleMercenaryAction(\'dismiss\', \'' + merc.name + '\')" style="flex:1; padding:5px; font-size:0.8em;">Elküldöm</button>';
                        html += '</div></div>';
                    });
                    mercContainer.innerHTML = html;
                } else {
                    mercContainer.innerHTML = '<div class="stat-line">Nincs aktív zsoldosod.</div>';
                }
            },
            function (err) {
                console.error("Zsoldosok betöltése sikertelen:", err);
                mercContainer.innerHTML = '<div class="stat-line" style="color:red;">Hiba a lekérdezésnél.</div>';
            }
        );
    }
}

function handleMercenaryAction(actionType, targetEmail) {
    if (!confirm("Biztosan " + (actionType === 'extend' ? "meghosszabbítod" : "elküldöd") + " ezt a zsoldost?")) {
        return;
    }
    document.getElementById('loading-overlay').style.display = 'flex';
    var actionFunc = actionType === 'extend' ? 'extendMercenary' : 'dismissMercenary';
    callBackend(actionFunc, [targetEmail],
        function (response) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (response.success) {
                uiAlert("Sikeres művelet: " + response.message);
                loadPage('kincsek'); // Újratöltjük a kincsek oldalt
            } else {
                uiAlert("Hiba: " + response.error);
            }
        },
        function (err) {
            document.getElementById('loading-overlay').style.display = 'none';
            uiAlert("Hálózati hiba: " + err.message);
        }
    );
}


// ==========================
// === TITKOSÍTÁS SEGÉDEK ===
// ==========================

// Relatív és valós útvonal összefűzése
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

// LSB Vízjelezés Borítóképnél (Async marad, de szintaxis tisztítás)
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
                    // padStart helyett manuális kiegészítés
                    var bin = id[i].charCodeAt(0).toString(2);
                    while (bin.length < 8) bin = "0" + bin;
                    binaryId += bin;
                }
                binaryId += "11111111";

                var pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var data = pixelData.data;

                if (binaryId.length > (data.length / 4) * 3) {
                    return reject(new Error("A kép túl kicsi az azonosító elrejtéséhez."));
                }

                var dataIndex = 0;
                for (var j = 0; j < binaryId.length; j++) {
                    var bit = binaryId[j];

                    while ((dataIndex + 1) % 4 === 0) {
                        dataIndex++;
                    }

                    if (dataIndex >= data.length) {
                        return reject(new Error("Hiba a vízjel írása közben: a kép mérete nem elegendő."));
                    }

                    var oldValue = data[dataIndex];
                    data[dataIndex] = (bit === '1') ? (oldValue | 1) : (oldValue & 254);

                    dataIndex++;
                }

                ctx.putImageData(pixelData, 0, 0);

                var finalDataURL = canvas.toDataURL('image/png');
                console.log("DEBUG: Vízjelezett kép kész.");

                resolve(finalDataURL);
            };
            img.onerror = function (err) { reject(new Error("A képfájl nem tölthető be. Lehet, hogy sérült.")); };
            img.src = event.target.result;
        };
        reader.onerror = function (err) { reject(new Error("A fájl olvasása sikertelen.")); };
        reader.readAsDataURL(imageFile);
    });
}

// nulla széles titkos kód
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

// Jelszó láthatóság
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
    console.warn("A jelszó láthatóság kapcsoló elemei (ikon vagy input) nem találhatóak!");
}

// ==========================
// === HAJÓNAPLÓ FUNKCIÓK ===
// ==========================

var MIN_LOG_RANK = 'Fregattkapitány';

function checkRankAndOpenLogModal() {
    console.log("Rang ellenőrzése és napló ID lekérése a naplóíráshoz...");
    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. LÉPÉS: Rang ellenőrzése
    callBackend('getCharacterSheetData', [],
        function (rankResponse) {
            if (!rankResponse.success || !rankResponse.data || !rankResponse.data.rang) {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('log_rank_check_error_prefix') + (rankResponse.error || t('unknown_error')));
                return;
            }

            // 2. LÉPÉS: Írási jogosultság és Napló ID
            callBackend('checkLogWritePermission', [],
                function (logId) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    console.log("checkLogWritePermission válasz: " + logId);

                    if (logId && typeof logId === 'string') {
                        console.log("Napló ID rendben (" + logId + "), modal megnyitása.");
                        openLogEntryModal();
                    } else {
                        uiAlert(t('log_prepare_failed'));
                        console.error("checkLogWritePermission érvénytelen válasz:", logId);
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

    // 1. Log ID lekérése (Ismétlés a biztonságért)
    callBackend('checkLogWritePermission', [],
        function (currentLogId) {
            if (!currentLogId || typeof currentLogId !== 'string') {
                document.getElementById('loading-overlay').style.display = 'none';
                uiAlert(t('log_writable_id_missing'));
                closeLogEntryModal();
                return;
            }

            // 2. Bejegyzés lekérése
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
                        // === ÚJ BEJEGYZÉS ===
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
                        // === SZERKESZTÉS ===
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
                            imagePreview.innerHTML = '<p><small><i>Kép csatolva. Új kép feltöltése felülírja.</i></small></p>';
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

// Async maradhat, mert a képfeldolgozáshoz kell
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
        statusDiv.textContent = 'A dátum és idő megadása kötelező!';
        submitBtn.disabled = false;
        return;
    }
    if (!entryData.report.trim()) {
        statusDiv.textContent = 'A napi jelentés kitöltése kötelező!';
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
                fileReader.onerror = function (e) { reject(new Error("Hiba a képfájl olvasása közben.")); };
                fileReader.readAsDataURL(file);
            });
            var pngDataUrl = await convertToPngDataUrl(dataUrl);
            entryData.imageBase64 = pngDataUrl.split(',')[1];
        }

        console.log("Mentésre küldött adatok:", entryData);

        // callBackend hívás
        callBackend('saveLogEntry', [entryData],
            function (response) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                if (response.success) {
                    uiAlert(t('log_save_success'));
                    closeLogEntryModal();
                } else {
                    statusDiv.textContent = t('log_save_error_prefix') + response.error;
                    console.error("Mentési hiba:", response.error);
                }
            },
            function (err) {
                document.getElementById('loading-overlay').style.display = 'none';
                submitBtn.disabled = false;
                statusDiv.textContent = t('server_error_short_prefix') + err.message;
                console.error("Szerverhiba mentéskor:", err);
            }
        );

    } catch (error) {
        document.getElementById('loading-overlay').style.display = 'none';
        submitBtn.disabled = false;
        statusDiv.textContent = t('image_process_error_prefix') + error.message;
        console.error("Képfeldolgozási hiba:", error);
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
        console.error("Hiba: A 'log-publish-section' HTML elem nem található!");
        return;
    }

    // Backtick helyett string összefűzés
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

    // Klónozással eltávolítjuk a régi listenereket
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

// ===================== NPC INTERFÉSZEK =====================================

// === HANGVEZÉRLŐ SEGÉDFÜGGVÉNY PORTRÉ VIDEÓKHOZ ===
function toggleVideoAudio(videoId, btnId) {
    var video = document.getElementById(videoId);
    var btn = document.getElementById(btnId);
    if (!video || !btn) return;

    video.muted = !video.muted;
    if (!video.muted) {
        video.volume = 1.0;
        btn.innerHTML = '<i class="fas fa-volume-up"></i>';
        btn.title = 'Némítás';
        if (video.paused) {
            video.play().catch(function (e) { console.log("Play error on unmute:", e); });
        }
    } else {
        btn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        btn.title = 'Hang bekapcsolása';
    }
}
window.toggleVideoAudio = toggleVideoAudio;

// === UNIVERZÁLIS MEGJELENÍTŐ ===

var ACTIVE_NPC_CONFIG = {};

function openUniversalNPC(npcId, config) {
    var modal = document.getElementById('universal-npc-modal');
    if (!modal) return;
    var modalContent = modal.querySelector('.gamemode-modal-content');
    var portraitPanel = document.getElementById('npc-portrait-panel');
    var portraitImg = document.getElementById('npc-portrait-image');

    // 1. Állapot mentése
    var currentIdEl = document.getElementById('current-npc-id');
    if (currentIdEl) currentIdEl.value = npcId;
    // Globális változóba mentjük, hogy elérhető legyen máshol is
    window.currentNPCConfig = config || {};
    ACTIVE_NPC_CONFIG = window.currentNPCConfig;

    config = ACTIVE_NPC_CONFIG;
    var name = config.name || 'NPC';
    var role = config.role || '';
    var icon = config.icon || '👤';
    var headerColor = config.headerColor || '#333';

    var nameEl = document.getElementById('npc-name');
    var roleEl = document.getElementById('npc-role');
    var iconEl = document.getElementById('npc-icon');
    var headerEl = document.getElementById('npc-header');

    if (nameEl) nameEl.innerText = name;
    if (roleEl) roleEl.innerText = role;
    if (iconEl) iconEl.innerHTML = icon;
    if (headerEl) headerEl.style.backgroundColor = headerColor;

    modal.style.cssText = "display: flex; z-index: 1000; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5);";
    if (modalContent) {
        modalContent.style.cssText = "";
        modalContent.className = "gamemode-modal-content";
    }

    // 4. PORTRÉ ÉS VIDEÓ KEZELÉS
    var portraitVideo = document.getElementById('npc-portrait-video');
    var audioBtn = document.getElementById('npc-portrait-audio-btn');

    if (portraitPanel) {
        if (!portraitVideo) {
            portraitVideo = document.createElement('video');
            portraitVideo.id = 'npc-portrait-video';
            portraitVideo.setAttribute('playsinline', '');
            portraitVideo.muted = true;
            portraitVideo.autoplay = true;
            portraitVideo.loop = true;
            portraitVideo.style.display = 'none';
            portraitPanel.appendChild(portraitVideo);
        }

        if (!audioBtn) {
            audioBtn = document.createElement('button');
            audioBtn.id = 'npc-portrait-audio-btn';
            audioBtn.type = 'button';
            audioBtn.className = 'portrait-audio-btn';
            audioBtn.title = 'Hang némítása / bekapcsolása';
            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioBtn.onclick = function (e) {
                if (e) { e.stopPropagation(); e.preventDefault(); }
                toggleVideoAudio('npc-portrait-video', 'npc-portrait-audio-btn');
            };
            portraitPanel.appendChild(audioBtn);
        }

        portraitPanel.className = 'npc-portrait-closed';

        if (portraitVideo && config.video) {
            if (portraitImg) portraitImg.style.display = 'none';
            portraitVideo.style.display = 'block';
            portraitVideo.src = config.video;
            if (config.portrait) {
                portraitVideo.poster = config.portrait;
            }
            portraitVideo.loop = (config.videoLoop !== undefined) ? config.videoLoop : true;
            portraitVideo.currentTime = 0;
            portraitVideo.muted = false;
            portraitVideo.volume = 1.0;

            portraitVideo.onended = function () {
                if (audioBtn) audioBtn.style.display = 'none';
            };

            var playProm = portraitVideo.play();
            if (playProm !== undefined) {
                playProm.then(function () {
                    if (audioBtn) {
                        audioBtn.style.display = 'flex';
                        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                        audioBtn.title = 'Némítás';
                    }
                }).catch(function (e) {
                    console.log("NPC portré videó unmuted autoplay megjegyzés, némított fallback:", e);
                    portraitVideo.muted = true;
                    portraitVideo.play().catch(function () { });
                    if (audioBtn) {
                        audioBtn.style.display = 'flex';
                        audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                        audioBtn.title = 'Hang bekapcsolása';
                    }
                });
            }
        } else if (portraitImg) {
            if (audioBtn) audioBtn.style.display = 'none';
            if (portraitVideo) {
                try { portraitVideo.pause(); portraitVideo.src = ''; } catch (e) { }
                portraitVideo.style.display = 'none';
            }
            portraitImg.style.display = 'block';
            portraitImg.src = config.portrait || '';
        }

        if (config.video || config.portrait) {
            setTimeout(function () {
                portraitPanel.className = 'npc-portrait-open';
                if (config.styles && config.styles.content && (config.styles.content.height === '100%' || config.styles.content.height === '100vh')) {
                    portraitPanel.style.height = '100%';
                } else {
                    portraitPanel.style.height = '80vh';
                }
            }, 100);
        }
    }

    if (config.styles) {
        if (config.styles.modal && modal) {
            for (var key in config.styles.modal) { modal.style[key] = config.styles.modal[key]; }
        }
        if (config.styles.content && modalContent) {
            for (var k in config.styles.content) { modalContent.style[k] = config.styles.content[k]; }
        }
    }

    var chatArea = document.getElementById('universal-chat-area');
    if (chatArea) chatArea.innerHTML = '';

    var input = document.getElementById('universal-chat-input');
    if (input) {
        input.value = '';
        input.disabled = false;
        input.placeholder = name + " figyel...";
    }

    modal.style.display = 'flex';

    // callBackend használata
    if (!config || !config.skipInit) {
        callBackend('handleNPCInteraction', [npcId, "", "INIT", null], handleUniversalResponse);
    }
}
window.openUniversalNPC = openUniversalNPC;

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

// === SZERVER VÁLASZ FELDOLGOZÁSA ===
function handleUniversalResponse(response) {
    var chatArea = document.getElementById('universal-chat-area');
    console.log("Szerver válasz érkezett:", response);

    if (!response) {
        console.error("Hiba: A szerver üres választ küldött!");
        addBubbleToUniversal("System", "Hiba: A szerver nem küldött adatot. (Null Response)", "system");
        return;
    }

    // --- RENDSZERMODAL KEZELÉS ---
    if (response.systemModal) {
        var sm = response.systemModal;
        if (typeof showSystemModal === 'function') {
            showSystemModal(
                sm.title || "Rendszerüzenet",
                sm.body || sm.message || "",
                sm.icon || "fas fa-info-circle",
                [{
                    text: "Rendben", color: "#2e8b57", textColor: "white", callback: function () {
                        if (typeof updateCreditDisplay === 'function') {
                            updateCreditDisplay();
                        }
                    }
                }]
            );
        } else {
            alert((sm.title || "Rendszerüzenet") + "\n\n" + (sm.body || sm.message || ""));
            if (typeof updateCreditDisplay === 'function') {
                updateCreditDisplay();
            }
        }
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
        defaultOpt.text = "--- Válassz egyet ---";
        defaultOpt.disabled = true;
        defaultOpt.selected = true;
        select.appendChild(defaultOpt);

        if (response.dropdown.options) {
            response.dropdown.options.forEach(function (opt) {
                var option = document.createElement('option');
                option.value = opt.value;
                option.text = opt.label;
                select.appendChild(option);
            });
        }

        var submitBtn = document.createElement('button');
        submitBtn.className = 'btn';
        submitBtn.style.cssText = "width: 100%; font-size: 0.9em; padding: 8px;";
        submitBtn.innerHTML = response.dropdown.submitText || "Kiválaszt";

        submitBtn.onclick = function () {
            if (!select.value) {
                addBubbleToUniversal("System", "Hiba: Kérlek, válassz a listából!", "system");
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
        setTimeout(function () {
            var fnName = response.clientFn;
            if (typeof window[fnName] === 'function') {
                window[fnName]();
            } else {
                console.error("Hiba: A '" + fnName + "' automatikus függvény nem létezik.");
            }
        }, 1500); // Késleltetés, hogy a játékos elolvashassa a siker üzenetet
    }
}

// === UNIVERZÁLIS GOMBKEZELŐ ===
function handleNPCButtonAction(btn) {
    console.log("Gomb megnyomva:", btn);

    var buttonContainer = document.getElementById('universal-button-area');
    if (buttonContainer) buttonContainer.innerHTML = '';

    if (btn.action === 'CLIENT_FN') {
        var fnName = btn.payload;
        if (typeof window[fnName] === 'function') {
            window[fnName]();
        } else {
            console.error("Hiba: A '" + fnName + "' függvény nem létezik.");
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

// Enter támogatás
var univInput = document.getElementById('universal-chat-input');
if (univInput) {
    univInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendUniversalMessage();
    });
}

// ================================= UNIVERZÁLIS NPC VEZÉRLŐ VÉGE ====================================

// Segédfüggvény a harmonikához
function toggleAccordionPanel() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
}

// ... (előző kódok vége) ...

// === KORAI INDÍTÁS (DOMContentLoaded) ===
document.addEventListener("DOMContentLoaded", function () {
    try {
        if (typeof checkSession === 'function') {
            checkSession();
        }
    } catch (e) {
        console.warn("Korai session ellenőrzés hiba:", e);
    }
});

// === WINDOW ONLOAD (INDÍTÁS) ===
window.onload = function () {
    console.log(">>> OLLDAL BETÖLTVE. Rendszer indítása...");

    // 1. AUTOMATIKUS BELÉPÉS
    try {
        console.log("1. Auto-login indítása...");
        if (typeof checkSession === 'function') {
            checkSession();
        } else {
            console.error("HIBA: A checkSession függvény nem létezik!");
        }
    } catch (e) {
        console.error("KRITIKUS HIBA az Auto-login során:", e);
    }

    // 2. HARMONIKA GOMBOK (Accordion)
    try {
        var acc = document.getElementsByClassName("accordion-button");
        if (acc.length > 0) {
            for (var i = 0; i < acc.length; i++) {
                acc[i].removeEventListener("click", toggleAccordionPanel);
                acc[i].addEventListener("click", toggleAccordionPanel);
            }
            console.log("2. Harmonika gombok beállítva.");
        }
    } catch (e) {
        console.warn("Hiba a harmonika gomboknál (nem kritikus):", e);
    }

    // 3. MARKETING URL
    try {
        if (typeof checkUrlParametersForMarketing === 'function') {
            checkUrlParametersForMarketing();
        }
    } catch (e) {
        console.warn("Marketing hiba:", e);
    }

    // 5. === MONK PIN KÓD LÁTHATÓSÁGA ===
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
            console.log("5. Monk PIN gomb beállítva.");
        } else {
            console.warn("A Monk PIN mező vagy az ikon nem található.");
        }
    } catch (e) {
        console.warn("Monk PIN hiba:", e);
    }

    console.log(">>> Minden rendszer kész.");
};

// Segédfüggvény a harmonikához (KÍVÜL HAGYJUK, hogy globális legyen)
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
 * Elindítja a játékot a szerverről lekért mentett játékállással.
 * Ezt a 'tutorial_oldal.html'-en lévő "Ugrás a mentett álláshoz" gomb hívja.
 */
function jumpToSavedState() {
    console.log("Kísérlet a mentett játékállás betöltésére...");
    document.getElementById('loading-overlay').style.display = 'flex';

    // 1. Backend hívás a játékállás (AH oszlop) és a Unity URL lekéréséhez
    callBackend('getTutorialFlowState', [],
        function (response) {
            if (response && response.success && response.gameState && response.unityUrl) {
                console.log("Sikeresen megkapva a játékállás, Unity indítása...");

                // A 'tryLaunchUnity' egy 'flow' objektumot vár, ezt itt összeállítjuk.
                const flow = {
                    unityUrl: response.unityUrl,
                    gameStateToken: response.gameStateToken, // A 'gameStateToken' nevet használjuk a konzisztencia érdekében.
                    tutorialCompleted: true // Feltételezzük, hogy ha van mentése, a tutorialt már befejezte.
                };

                // 2. Indítjuk a Unity-t a tryLaunchUnity függvénnyel.
                // Az 'autoStart' paraméter (true) biztosítja, hogy a játék azonnal induljon.
                tryLaunchUnity(flow, true);

            } else {
                document.getElementById('loading-overlay').style.display = 'none';
                var errorMessage = response.error || "A mentett játékállás nem érhető el vagy hibás a válasz.";
                if (typeof uiAlert === 'function') {
                    uiAlert(errorMessage, "Betöltési Hiba");
                } else {
                    alert("Hiba: " + errorMessage);
                }
            }
        },
        function (error) {
            document.getElementById('loading-overlay').style.display = 'none';
            if (typeof uiAlert === 'function') {
                uiAlert("Hiba történt a szerverrel való kommunikáció során: " + error.message, "Szerver Hiba");
            } else {
                alert("Szerver Hiba: " + error.message);
            }
        }
    );
}

function triggerAgentAnalysis(workId) {
    if (!confirm('Biztosan átadod ezt a kéziratot a Papát AI asszisztensnek elemzésre? A háttérfolyamat perceket is igénybe vehet.')) return;

    var loading = document.getElementById('loading-overlay');
    if (loading) loading.style.display = 'flex';

    callBackend('manageWorkStatus', [workId, 'agent_analysis_start', null],
        function (res) {
            if (loading) loading.style.display = 'none';
            uiAlert(res.message || "Az elemzés elindult. Nemsokára jelentkezik az Agent egy értékeléssel.", "Siker");
            refreshMonasteryWork();
        },
        function (err) {
            if (loading) loading.style.display = 'none';
            uiAlert("Hiba a szerverhívásban: " + err.message, "Rendszerhiba");
        }
    );
}

// --- PAPÁT REPORT MEGJELENÍTŐ LOGIKA ---
function openPapatReportModal(workId) {
    if (!window.currentMonasteryWorks) {
        uiAlert("Hiba: Nem találhatóak a művek a memóriában. Frissítsd a listát!", "Rendszerhiba");
        return;
    }

    var foundWork = window.currentMonasteryWorks.find(function (w) { return w.id === workId; });
    if (!foundWork || !foundWork.checklist || !foundWork.checklist.papat_report) {
        uiAlert("Ehhez a kézirathoz nem található Papát AI jelentés!", "Hiba");
        return;
    }

    var report = foundWork.checklist.papat_report;
    var html = "";

    html += "<p><strong>Mű címe:</strong> " + foundWork.title + "</p>";
    html += "<p><strong>Kiállítás Dátuma:</strong> " + (report.timestamp || 'N/A') + "</p>";
    html += "<hr>";

    // BELSŐ PLÁGIUM
    var plagColor = "green";
    var plagText = "Tiszta (Nincs Belső Plágium)";
    if (report.plagiarism && report.plagiarism.status === "failed") {
        plagColor = "red";
        plagText = "VIGYÁZAT: Részleges vagy teljes ÖNPLÁGIUM/MÁSOLAT! (" + report.plagiarism.score_percent + "%)";
    }
    html += "<div style='margin-bottom: 15px; padding: 10px; border: 1px solid " + plagColor + "; background-color: " + (plagColor === 'red' ? '#ffe6e6' : '#e6ffe6') + "; border-radius: 5px;'>";
    html += "<strong><i class='fas fa-search'></i> Fájl-alapú Plágiumszűrés:</strong> <span style='color: " + plagColor + "; font-weight: bold;'>" + plagText + "</span>";
    if (report.plagiarism && report.plagiarism.message) {
        html += "<br><small>" + report.plagiarism.message + "</small>";
    }
    html += "</div>";

    // PONTOZÓ SÁVOK (Kohézió)
    var coheScore = report.cohesion_score || 0;
    var coheColor = coheScore > 75 ? '#28a745' : (coheScore > 50 ? '#f39c12' : '#dc3545');
    html += "<div style='margin-bottom: 10px;'>";
    html += "<strong>Logikai Kohézió és Stílus:</strong> <span style='float:right; font-weight:bold; color:" + coheColor + "'>" + coheScore + "/100</span>";
    html += "<div style='width: 100%; background-color: #e9ecef; border-radius: 4px; overflow: hidden; height: 15px; margin-top: 5px;'>";
    html += "  <div style='height: 100%; width: " + coheScore + "%; background-color: " + coheColor + ";'></div>";
    html += "</div></div>";

    // PONTOZÓ SÁVOK (Felütés/Hook)
    var hookScore = report.hook_score || 0;
    var hookColor = hookScore > 75 ? '#28a745' : (hookScore > 50 ? '#f39c12' : '#dc3545');
    html += "<div style='margin-bottom: 15px;'>";
    html += "<strong>Felütés (Figyelemfelkeltés):</strong> <span style='float:right; font-weight:bold; color:" + hookColor + "'>" + hookScore + "/100</span>";
    html += "<div style='width: 100%; background-color: #e9ecef; border-radius: 4px; overflow: hidden; height: 15px; margin-top: 5px;'>";
    html += "  <div style='height: 100%; width: " + hookScore + "%; background-color: " + hookColor + ";'></div>";
    html += "</div></div>";

    // FANFIC RIASZTÁS
    if (report.is_fanfic) {
        html += "<div style='margin-bottom: 15px; padding: 10px; border: 1px solid #ff9800; background-color: #fff3e0; border-radius: 5px; color: #d84315;'>";
        html += "<strong><i class='fas fa-exclamation-triangle'></i> Fanfic GYANÚ!</strong> A történet valószínűleg egy ismert szellemi termékhez kötődik.";
        html += "</div>";
    }

    html += "<h4>📝 Összefoglaló:</h4>";
    html += "<p style='font-style: italic; border-left: 3px solid #8e44ad; padding-left: 10px; color: #555;'>" + (report.summary || 'Nincs összefoglaló.') + "</p>";

    html += "<h4>⚖️ Kritikai Visszajelzés:</h4>";
    html += "<p>" + (report.feedback || 'Nincs visszajelzés.') + "</p>";

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
    if (modal) modal.style.display = 'flex';
    var boardDiv = document.getElementById('notice-board-content');
    if (boardDiv) boardDiv.innerHTML = '<p style="color: #f5deb3; text-align: center; width: 100%; font-size: 1.2em;"><i class="fas fa-spinner fa-spin"></i> A pultosfiú épp szögeli fel az új papírokat...</p>';

    if (typeof callBackend === 'function') {
        callBackend("getNoticeBoardData", [], function (response) {
            if (response && response.success && response.data) {
                renderNoticeBoard(response.data);
            } else {
                if (boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">A szél lefújta az összes papírt. (Hiba: ' + (response ? response.error : 'Nincs válasz') + ')</p>';
            }
        });
    } else {
        if (boardDiv) boardDiv.innerHTML = '<p style="color: #ff5555; text-align: center; width: 100%; font-size: 1.2em;">Hálózati hiba: A backend nem elérhető.</p>';
    }
}

function renderNoticeBoard(data) {
    var boardDiv = document.getElementById('notice-board-content');
    if (!boardDiv) return;
    boardDiv.innerHTML = '';

    // 1. WANTED Plakátok
    if (data.wanted && data.wanted.length > 0) {
        data.wanted.forEach(function (item) {
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
        data.priori.forEach(function (item) {
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
        data.jobs.forEach(function (item) {
            var card = document.createElement('div');
            card.style.cssText = "background: #f0ebd8; padding: 15px; width: 220px; border: 2px solid #3e2723; box-shadow: 2px 2px 6px rgba(0,0,0,0.6); transform: rotate(" + (Math.random() * 6 - 3) + "deg); position: relative; font-family: 'Georgia', serif;";
            card.innerHTML = '<div style="position: absolute; top: -10px; left: 10px; color: gold; font-size: 1.5em; text-shadow: 1px 1px 1px #000;">📌</div>' +
                '<h4 style="margin: 10px 0 10px 0; color: #1b5e20; text-align: center; font-family: \'Pirata One\', cursive; font-size: 1.5em; border-bottom: 1px solid #ccc; padding-bottom: 5px;"><i class="fas fa-scroll"></i> Küldetés!</h4>' +
                '<p style="font-weight: bold; text-align: center; margin-bottom: 15px; font-size: 1.1em; color: #3e2723;">' + item.title + '</p>' +
                '<p style="font-size: 0.9em; margin-bottom: 5px; color: #4e342e;"><strong>Keresnek:</strong><br>' + item.specialists + '</p>' +
                '<p style="font-size: 0.9em; margin-bottom: 10px; color: #8b0000;"><strong>Veszély:</strong> ' + item.danger + '</p>' +
                '<p style="text-align: center; color: #1b5e20; font-style: italic; font-size: 0.85em; margin-bottom: 5px;">(Jelentkezz a csaposnál!)</p>' +
                '<p style="text-align: center; color: #b71c1c; font-weight: bold; font-size: 1.1em; background: rgba(183,28,28,0.1); padding: 5px; border-radius: 3px;">Jutalom: ' + item.reward + '</p>';
            boardDiv.appendChild(card);
        });
    }

    // 4. Pletykák (Gossip)
    if (data.gossip && data.gossip.length > 0) {
        data.gossip.forEach(function (item) {
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

function reloadCopiesPage() {
    var modal = document.getElementById('universal-npc-modal');
    if (modal) modal.style.display = 'none';
    if (typeof updateCreditDisplay === 'function') updateCreditDisplay();
    loadPage('masolatok_oldal');
}

// --- TOBORZÓBARAKK LOGIKA ---

function openToborzoBarakk() {
    // UI Initialization
    document.getElementById('toborzo-modal').style.display = 'flex';
    document.getElementById('toborzo-loading').style.display = 'flex';
    switchToborzoTab('munkavallalo');

    // Fetch initial data
    callBackend('getToborzoData', [],
        function (data) {
            document.getElementById('toborzo-loading').style.display = 'none';
            if (data.success) {
                // Populate Worker Tab
                if (data.playerStatus) {
                    document.getElementById('toborzo-status-select').value = data.playerStatus.status || "Keresek munkát";
                    document.getElementById('toborzo-role-select').value = data.playerStatus.role || "";
                }

                // Populate Captain Tab
                window.toborzoOwnedShips = data.ownedShips || [];
                window.toborzoAvailableCrew = data.availableCrew || [];
                const myshipsSelect = document.getElementById('toborzo-myships-select');
                myshipsSelect.innerHTML = '<option value="">Nincs kiválasztott hajó</option>';
                window.toborzoOwnedShips.forEach(ship => {
                    const opt = document.createElement('option');
                    opt.value = ship.id;
                    opt.textContent = ship.name + (ship.inHarbor ? "" : " (Expedíción)");
                    opt.disabled = !ship.inHarbor;
                    myshipsSelect.appendChild(opt);
                });
                renderSelectedShipCrew(); // clear details
            } else {
                uiAlert('Hiba az adatok lekérdezésekor: ' + (data.error || 'Ismeretlen hiba'));
            }
        },
        function (err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert('Hálózati hiba a Toborzóbarakk lekérdezésekor: ' + err.message);
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
        '4. osztályú kalóz', '3. osztályú kalóz', '2. osztályú kalóz', '1. osztályú kalóz',
        'Alhajómester', 'Törzshajómester', 'Törzsfőhajómester',
        'Tengerész-hadapród', 'Korvetthadnagy', 'Fregatthadnagy', 'Sorhajóhadnagy',
        'Korvettkapitány', 'Fregattkapitány', 'Sorhajókapitány',
        'Ellentengernagy', 'Altengernagy', 'Tengernagy', 'Főtengernagy'
    ];
    var szakmaiTisztek = ['Hajóorvos', 'Hajószakács', 'Térképrajzoló', 'Tekercsmester', 'Felfedező', 'Letmester', 'Monk'];
    var parancsnokiTisztek = ['Navigátor', 'Kormányos', 'Vitorlamester', 'Fedélzetmester', 'Gépész'];

    var playerIdx = rankHierarchy.indexOf(playerRank);
    if (playerIdx === -1) playerIdx = 0; // fallback

    var requiredIdx = 0;
    if (role === 'Kapitány') {
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

    if (status === 'Keresek munkát' && !role) {
        uiAlert("Kérlek, válassz ki egy keresett pozíciót!");
        return;
    }

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('updatePlayerJobStatus', [status, role, cost],
        function (data) {
            document.getElementById('toborzo-loading').style.display = 'none';
            if (data.success) {
                uiAlert("Státuszod sikeresen mentve! A kapitányok mostantól láthatják a faliújságon.");
            } else {
                uiAlert("Hiba a mentés során: " + data.error);
            }
        },
        function (err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("Hálózati hiba: " + err.message);
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

    var ship = window.toborzoOwnedShips.find(function (s) { return s.id === select.value; });
    if (!ship) return;

    if (shipNameSpan) shipNameSpan.textContent = ship.name;

    detailsDiv.style.display = 'block';
    rolesContainer.innerHTML = '';

    var formDiv = document.createElement('div');
    formDiv.id = 'bulk-crew-form';

    var allRoles = [
        "Kapitány", "Navigátor", "Kormányos", "Vitorlamester", "Fedélzetmester",
        "Tüzér", "Hajóorvos", "Hajószakács", "Térképrajzoló",
        "Tekercsmester", "Felfedező", "Gépész", "Hajóács",
        "Letmester", "Monk", "Tengerész"
    ];

    var availableCrew = window.toborzoAvailableCrew || [];
    var nameDict = window.toborzoNameDict || (window.toborzoMarketData && window.toborzoMarketData.nameDict) || {};

    var resolvePirateName = function (email) {
        if (!email) return '';
        var lower = String(email).toLowerCase().trim();
        if (nameDict[lower]) return nameDict[lower];
        var match = availableCrew.find(function (c) { return String(c.email).toLowerCase().trim() === lower; });
        if (match && match.name) return match.name;
        return email;
    };

    var sortedCrew = availableCrew.slice().sort(function (a, b) {
        var nameA = resolvePirateName(a.email) || a.name || '';
        var nameB = resolvePirateName(b.email) || b.name || '';
        return nameA.localeCompare(nameB);
    });

    allRoles.forEach(function (role) {
        var isSingle = (role !== 'Tengerész');
        var currentEmails = (ship.crew && ship.crew[role]) ? ship.crew[role].split(',').map(function (e) { return e.trim().toLowerCase(); }).filter(function (e) { return e; }) : [];

        var rowDiv = document.createElement('div');
        rowDiv.style.cssText = 'display: flex; flex-direction: column; padding: 10px; border-bottom: 1px dashed #ccc; background: #fafafa; border-radius: 4px; margin-bottom: 8px;';

        var roleHeader = document.createElement('div');
        roleHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;';

        var roleLabel = document.createElement('strong');
        roleLabel.style.color = '#1f0901';
        roleLabel.innerHTML = '<i class="fas fa-user-tag" style="color: var(--color-gold);"></i> ' + role + (isSingle ? ' <span style="font-size:0.8em; color:#888;">(1 fő)</span>' : ' <span style="font-size:0.8em; color:#888;">(Több fő)</span>');

        roleHeader.appendChild(roleLabel);
        rowDiv.appendChild(roleHeader);

        // Dropdown konténer a kijelöléshez
        var customSelectContainer = document.createElement('div');
        customSelectContainer.style.cssText = 'position: relative; width: 100%; border: 1px solid #aaa; border-radius: 4px; background: white;';

        var selectHeader = document.createElement('div');
        selectHeader.style.cssText = 'padding: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; font-size: 0.9em; color: #555;';

        var currentNamesHtml = "--- Üres ---";
        if (currentEmails.length > 0) {
            var namesArr = currentEmails.map(function (e) {
                return resolvePirateName(e);
            });
            currentNamesHtml = '<span style="color:#d4af37; font-weight:bold;">' + namesArr.join(', ') + '</span>';
        }

        selectHeader.innerHTML = '<span>' + currentNamesHtml + '</span> <i class="fas fa-chevron-down"></i>';

        var optionsContainer = document.createElement('div');
        optionsContainer.style.cssText = 'display: none; position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #aaa; z-index: 10; max-height: 200px; overflow-y: auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
        optionsContainer.className = 'bulk-options-container';

        selectHeader.onclick = function (e) {
            e.stopPropagation();
            var isVisible = optionsContainer.style.display === 'block';
            document.querySelectorAll('.bulk-options-container').forEach(function (el) { el.style.display = 'none'; });
            optionsContainer.style.display = isVisible ? 'none' : 'block';
        };

        // Checkbox logika
        optionsContainer.addEventListener('change', function (e) {
            if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                if (isSingle && e.target.checked) {
                    var allCbs = optionsContainer.querySelectorAll('input[type="checkbox"]');
                    allCbs.forEach(function (cb) {
                        if (cb !== e.target) cb.checked = false;
                    });
                }

                // Címsor frissítése
                var checkedCbs = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
                if (checkedCbs.length === 0) {
                    selectHeader.innerHTML = '<span>--- Üres ---</span> <i class="fas fa-chevron-down"></i>';
                } else {
                    var nArr = [];
                    checkedCbs.forEach(function (cb) {
                        var cName = resolvePirateName(cb.value) || cb.getAttribute('data-name') || cb.value;
                        nArr.push(cName);
                    });
                    selectHeader.innerHTML = '<span><span style="color:#d4af37; font-weight:bold;">' + nArr.join(', ') + '</span></span> <i class="fas fa-chevron-down"></i>';
                }
            }
        });

        // Hozzáadjuk az összes elérhető játékost, akik ehhez a hajóhoz kijelölhetők
        var optionAdded = false;

        // Akik már ezen a pozíción vannak
        currentEmails.forEach(function (currEmail) {
            var dName = resolvePirateName(currEmail);
            var label = document.createElement('label');
            label.style.cssText = 'display: block; padding: 5px 8px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 0.9em; background: #e8f5e9;';
            label.innerHTML = '<input type="checkbox" value="' + currEmail + '" data-role="' + role + '" data-name="' + dName + '" checked> <strong>' + dName + '</strong>';
            optionsContainer.appendChild(label);
            optionAdded = true;
        });

        // Akik szabadok
        sortedCrew.forEach(function (player) {
            if (currentEmails.includes(player.email.toLowerCase())) return;
            if (player.isBusy) return;
            if (!hasRequiredRank(player.rank, role)) return;

            var dName = resolvePirateName(player.email) || player.name;
            var label = document.createElement('label');
            label.style.cssText = 'display: block; padding: 5px 8px; border-bottom: 1px solid #eee; cursor: pointer; font-size: 0.9em;';
            label.innerHTML = '<input type="checkbox" value="' + player.email + '" data-role="' + role + '" data-name="' + dName + '"> ' + dName + ' <span style="color:#888; font-size:0.8em;">(' + (player.rank || '') + ')</span>';
            optionsContainer.appendChild(label);
            optionAdded = true;
        });

        if (!optionAdded) {
            var noMore = document.createElement('div');
            noMore.style.cssText = 'padding: 8px; color: #888; font-style: italic;';
            noMore.innerText = 'Nincs felbérelhető tag.';
            optionsContainer.appendChild(noMore);
        }

        customSelectContainer.appendChild(selectHeader);
        customSelectContainer.appendChild(optionsContainer);

        rowDiv.appendChild(customSelectContainer);
        formDiv.appendChild(rowDiv);
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.bulk-options-container') && !e.target.closest('div[style*="cursor: pointer"]')) {
            document.querySelectorAll('.bulk-options-container').forEach(function (el) { el.style.display = 'none'; });
        }
    });

    var submitBtn = document.createElement('button');
    submitBtn.className = 'btn';
    submitBtn.style.cssText = 'width: 100%; padding: 12px; background: var(--color-primary); color: white; border: 2px solid var(--color-gold); font-size: 1.1em; font-weight: bold; margin-top: 15px; border-radius: 4px; cursor: pointer; transition: 0.2s;';
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Kijelöltek Felírása (OK)';
    submitBtn.onmouseover = function () { submitBtn.style.background = '#3e2723'; };
    submitBtn.onmouseout = function () { submitBtn.style.background = 'var(--color-primary)'; };
    submitBtn.onclick = function () { submitBulkCrewAssignment(ship.id); };

    rolesContainer.appendChild(formDiv);
    rolesContainer.appendChild(submitBtn);
}

function submitBulkCrewAssignment(shipId) {
    var assignmentsMap = {
        "Kapitány": [], "Navigátor": [], "Kormányos": [], "Vitorlamester": [], "Fedélzetmester": [],
        "Tüzér": [], "Hajóorvos": [], "Hajószakács": [], "Térképrajzoló": [],
        "Tekercsmester": [], "Felfedező": [], "Gépész": [], "Hajóács": [],
        "Letmester": [], "Monk": [], "Tengerész": []
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
            uiAlert("Egy kalóz egyszerre csak EGY pozíciót tölthet be a hajón! Kérlek javítsd a kijelölést.");
        } else {
            alert("Egy kalóz egyszerre csak EGY pozíciót tölthet be a hajón! Kérlek javítsd a kijelölést.");
        }
        return;
    }

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('saveBulkCrewAssignment', [shipId, assignmentsMap],
        function (data) {
            if (data.success) {
                uiAlert(data.message || "A legénység beosztása sikeresen frissítve!", "Siker");
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba: " + data.error);
            }
        },
        function (err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("Hálózati hiba: " + err.message);
        }
    );
}

function assignToRole(shipId, role) {
    var targetEmail = prompt("Kit szeretnél beosztani a(z) " + role + " pozícióra ezen a hajón?\\n\\nÍrd be a zsoldos/játékos email címét. Ha SAJÁT MAGADAT akarod beosztani, hagyd üresen a mezőt!", "");

    if (targetEmail === null) return;

    var crewEmail = (targetEmail.trim() === "") ? 'self' : targetEmail.trim();

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('assignCrewToOwnedShip', [shipId, role, crewEmail],
        function (data) {
            if (data.success) {
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba: " + data.error);
            }
        },
        function (err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("Hiba: " + err.message);
        }
    );
}

function removeRole(shipId, roleToClear, specificEmail) {
    var msg = specificEmail ? "Biztosan ki akarod rúgni ezt a személyt: " + specificEmail + "?" : "Biztosan ki akarod rúgni a(z) " + roleToClear + " pozíción lévő összes személyt?";
    if (!confirm(msg)) return;

    document.getElementById('toborzo-loading').style.display = 'flex';
    callBackend('removeRole', [shipId, roleToClear, specificEmail],
        function (data) {
            if (data.success) {
                openToborzoBarakk();
            } else {
                document.getElementById('toborzo-loading').style.display = 'none';
                uiAlert("Hiba a kirúgás során: " + data.error);
            }
        },
        function (err) {
            document.getElementById('toborzo-loading').style.display = 'none';
            uiAlert("Hálózati hiba: " + err.message);
        }
    );
}


function tryGoToDeck() {
    if (typeof openFedelzetModal === 'function') {
        openFedelzetModal();
    } else if (typeof window.openFedelzetModal === 'function') {
        window.openFedelzetModal();
    } else if (window.parent && typeof window.parent.openFedelzetModal === 'function') {
        window.parent.openFedelzetModal();
    } else if (typeof loadPage === 'function') {
        loadPage('fedelzet_oldal');
    }
}
window.tryGoToDeck = tryGoToDeck;


// ==========================================
// === FEDÉLZET LOGIKA (Hajók, Indulás) ===
// ==========================================

let selectedShipForDeparture = null;
let selectedGameTypeForDeparture = null;
let deckChatState = 'IDLE'; // IDLE, AWAITING_HARTYA_CONFIRM, AWAITING_KALAND_TARGET, AWAITING_EXPEDITION_ISLAND, AWAITING_EXPEDITION_BOOK, AWAITING_FINAL_CONFIRM
let deckExpeditionIsland = '';
let deckExpeditionBook = '';

function normalizeShipData(ship, nameDict) {
    if (!ship || typeof ship !== 'object') return ship;
    nameDict = nameDict || window.toborzoNameDict || (window.toborzoMarketData && window.toborzoMarketData.nameDict) || {};

    // Segédfüggvény: Email vagy név feloldása kalóznévre a kalozadatok A->B oszlopai alapján (nameDict)
    var resolvePirateName = function (emailOrName) {
        if (!emailOrName) return '';
        var raw = String(emailOrName).trim();
        if (!raw || raw === 'undefined' || raw === 'null') return '';
        var lower = raw.toLowerCase();

        // 1. Keresés az átadott nameDict-ben (kalozadatok A -> B oszlop)
        if (nameDict && nameDict[lower]) return nameDict[lower];
        if (nameDict && nameDict[raw]) return nameDict[raw];
        if (window.toborzoNameDict && window.toborzoNameDict[lower]) return window.toborzoNameDict[lower];
        if (window.toborzoNameDict && window.toborzoNameDict[raw]) return window.toborzoNameDict[raw];
        if (window.parent && window.parent.toborzoNameDict && window.parent.toborzoNameDict[lower]) {
            return window.parent.toborzoNameDict[lower];
        }

        // 2. Ha nem email cím (nincs benne @), akkor közvetlenül a név
        if (raw.indexOf('@') === -1) return raw;

        // 3. Ha email maradt és nem találtuk a szótárban, az email előtagját formázzuk
        var prefix = raw.split('@')[0];
        return prefix.charAt(0).toUpperCase() + prefix.slice(1);
    };

    var BLOCKED_ATTR_ROLES = [
        'méret', 'mérettartomány', 'ár', 'költség', 'sebesség', 'gyorsaság', 'élettartam',
        'helyzet', 'szövetség', 'zászló', 'hossz', 'jellemző hossz', 'leírás', 'id', 'típus',
        'férőhely', 'kapacitás', 'hajó id', 'hajónapló id', 'hajó neve', 'hajó típusa',
        'tüzérségi szint', 'védelmi szint', 'lokátor szint', 'utazási magasság max.', 'merülési mélység'
    ];
    var BLOCKED_SIZE_VALUES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'true', 'false', 'undefined', 'null'];

    // 1. Alapvető azonosítók és nevek
    ship.id = String(ship.id || ship.shipId || ship['Hajó ID'] || ship['ID'] || '').trim();
    ship.name = ship.name || ship.shipName || ship['Hajó neve'] || 'Névtelen hajó';
    ship.type = ship.type || ship.shipType || ship.tipus || ship['Hajó típusa'] || 'Vitorlás';

    var crewObj = (ship.crew && typeof ship.crew === 'object') ? ship.crew : {};

    // 2. TULAJDONOS (G OSZLOP): kiolvasás és lefordítás a kalozadatok B oszlopbeli Kalóznevére
    var rawOwnerStr = ship['Tulajdonos email'] || ship.ownerEmail || ship['Tulajdonos'] || ship.owner || crewObj['Tulajdonos email'] || crewObj['Tulajdonos'] || (ship.crewNames && ship.crewNames['Tulajdonos']) || '';
    var rawOwnerEmails = [];
    var resolvedOwnerNames = [];

    if (rawOwnerStr && rawOwnerStr !== 'undefined' && rawOwnerStr !== 'null') {
        var ownerTokens = String(rawOwnerStr).split(',');
        for (var oi = 0; oi < ownerTokens.length; oi++) {
            var oTok = ownerTokens[oi].trim();
            if (oTok && oTok !== 'undefined' && oTok !== 'null' && BLOCKED_SIZE_VALUES.indexOf(oTok.toLowerCase()) === -1) {
                rawOwnerEmails.push(oTok);
                var oName = resolvePirateName(oTok);
                if (oName) resolvedOwnerNames.push(oName);
            }
        }
    }

    ship.ownerEmails = rawOwnerEmails;
    ship.ownerNames = resolvedOwnerNames;
    ship.ownerEmail = rawOwnerEmails.join(', ');
    ship.ownerName = resolvedOwnerNames.join(', ') || 'Ismeretlen Tulajdonos';
    ship.owner = ship.ownerName;

    // 3. KAPITÁNY (H OSZLOP): kiolvasás és lefordítás
    var rawCapStr = ship['Kapitány email'] || ship.captain || crewObj['Kapitány email'] || crewObj['Kapitány'] || (ship.crewNames && ship.crewNames['Kapitány']) || '';
    var rawCapEmails = [];
    var resolvedCapNames = [];

    if (rawCapStr && rawCapStr !== 'undefined' && rawCapStr !== 'null') {
        var capTokens = String(rawCapStr).split(',');
        for (var ci = 0; ci < capTokens.length; ci++) {
            var cTok = capTokens[ci].trim();
            if (cTok && cTok !== 'undefined' && cTok !== 'null' && BLOCKED_SIZE_VALUES.indexOf(cTok.toLowerCase()) === -1) {
                rawCapEmails.push(cTok);
                var cName = resolvePirateName(cTok);
                if (cName) resolvedCapNames.push(cName);
            }
        }
    }

    ship.captainEmails = rawCapEmails;
    ship.captainNames = resolvedCapNames;
    ship.captainName = resolvedCapNames.join(', ');
    ship.captain = ship.captainName || rawCapStr;

    // 4. ÉLETTARTAM (P OSZLOP)
    var rawDurability = (crewObj['Élettartam'] !== undefined && crewObj['Élettartam'] !== null && crewObj['Élettartam'] !== '') 
        ? crewObj['Élettartam'] 
        : ((ship['Élettartam'] !== undefined && ship['Élettartam'] !== null && ship['Élettartam'] !== '')
            ? ship['Élettartam']
            : ((ship.durability !== undefined && ship.durability !== null && ship.durability !== '')
                ? ship.durability
                : (ship.durabilityPoints || '')));

    if (rawDurability !== '' && rawDurability !== undefined && rawDurability !== null) {
        var numDur = parseInt(rawDurability, 10);
        ship.durability = isNaN(numDur) ? rawDurability : numDur;
        ship['Élettartam'] = ship.durability;
    } else {
        ship.durability = 10;
        ship['Élettartam'] = 10;
    }

    // Technikai adatok
    if (crewObj['Mérettartomány'] || ship['Mérettartomány']) ship['Mérettartomány'] = crewObj['Mérettartomány'] || ship['Mérettartomány'];
    if (crewObj['Jellemző hossz'] || crewObj['Jelemző hossz'] || ship['Jellemző hossz'] || ship['Jelemző hossz']) ship['Jellemző hossz'] = crewObj['Jellemző hossz'] || crewObj['Jelemző hossz'] || ship['Jellemző hossz'] || ship['Jelemző hossz'];
    if (crewObj['Leírás'] || ship['Leírás']) ship['Leírás'] = crewObj['Leírás'] || ship['Leírás'];
    if (crewObj['Sebesség max.'] || crewObj['Sebesség'] || ship['Sebesség max.'] || ship['Sebesség']) ship['Sebesség max.'] = crewObj['Sebesség max.'] || crewObj['Sebesség'] || ship['Sebesség max.'] || ship['Sebesség'];
    if (crewObj['Tüzérségi szint'] || ship['Tüzérségi szint']) ship['Tüzérségi szint'] = crewObj['Tüzérségi szint'] || ship['Tüzérségi szint'];
    if (crewObj['Védelmi szint'] || ship['Védelmi szint']) ship['Védelmi szint'] = crewObj['Védelmi szint'] || ship['Védelmi szint'];
    if (crewObj['Lokátor szint'] || ship['Lokátor szint']) ship['Lokátor szint'] = crewObj['Lokátor szint'] || ship['Lokátor szint'];
    if (crewObj['Utazási magasság max.'] || ship['Utazási magasság max.']) ship['Utazási magasság max.'] = crewObj['Utazási magasság max.'] || ship['Utazási magasság max.'];
    if (crewObj['Merülési mélység'] || ship['Merülési mélység']) ship['Merülési mélység'] = crewObj['Merülési mélység'] || ship['Merülési mélység'];
    if (crewObj['Férőhely'] || ship['Férőhely']) ship['Férőhely'] = crewObj['Férőhely'] || ship['Férőhely'];
    if (crewObj['Kapacitás'] || ship['Kapacitás']) ship['Kapacitás'] = crewObj['Kapacitás'] || ship['Kapacitás'];
    if (crewObj['Helyzet'] || ship['Helyzet'] || ship.helyzet) ship['Helyzet'] = crewObj['Helyzet'] || ship['Helyzet'] || ship.helyzet;
    else ship['Helyzet'] = (ship.inHarbor !== false) ? 'Kikötő' : 'Tengeren';

    // 5. REGISZTRÁLT LEGÉNYSÉG (crewMembers): 1. helyen mindig a Tulajdonos(ok) a feloldott kalóznévvel
    var crewMembers = [];
    var addedMemberKeys = {};

    if (resolvedOwnerNames.length > 0) {
        for (var onIdx = 0; onIdx < resolvedOwnerNames.length; onIdx++) {
            var oName = resolvedOwnerNames[onIdx];
            var oEmail = rawOwnerEmails[onIdx] || '';
            crewMembers.push({
                role: 'Tulajdonos',
                name: oName,
                email: oEmail
            });
            addedMemberKeys[oName.toLowerCase() + '__tulajdonos'] = true;
            if (oEmail) addedMemberKeys[oEmail.toLowerCase() + '__tulajdonos'] = true;
        }
    }

    var addMember = function (rawVal, role) {
        if (!rawVal) return;
        var valStr = String(rawVal).trim();
        if (!valStr || BLOCKED_SIZE_VALUES.indexOf(valStr.toLowerCase()) !== -1 || /^\d+$/.test(valStr)) return;

        var displayRole = role || 'Matróz';
        var rLower = displayRole.trim().toLowerCase();
        for (var b = 0; b < BLOCKED_ATTR_ROLES.length; b++) {
            if (rLower === BLOCKED_ATTR_ROLES[b] || rLower.indexOf(BLOCKED_ATTR_ROLES[b]) !== -1) return;
        }

        if (displayRole === 'Kapitány email') displayRole = 'Kapitány';
        else if (displayRole === 'Tulajdonos email') displayRole = 'Tulajdonos';
        else if (displayRole === 'Legénység (Tengerészek)' || displayRole.indexOf('Tengerész_') === 0) displayRole = 'Tengerész';
        else if (displayRole === 'Utasok' || displayRole.indexOf('Utas_') === 0) displayRole = 'Utas';

        var cleanName = resolvePirateName(valStr);
        if (!cleanName || BLOCKED_SIZE_VALUES.indexOf(cleanName.toLowerCase()) !== -1) return;

        var keyByName = cleanName.toLowerCase() + '__' + displayRole.toLowerCase();
        var keyByEmail = valStr.toLowerCase() + '__' + displayRole.toLowerCase();
        if (addedMemberKeys[keyByName] || addedMemberKeys[keyByEmail]) return;

        addedMemberKeys[keyByName] = true;
        addedMemberKeys[keyByEmail] = true;

        crewMembers.push({
            role: displayRole,
            name: cleanName,
            email: valStr
        });
    };

    // A: crew objektumból
    for (var rKey in crewObj) {
        if (rKey.toLowerCase().indexOf('tulajdonos') !== -1) continue;
        var rVal = crewObj[rKey];
        if (rVal) {
            String(rVal).split(',').forEach(function (em) { addMember(em.trim(), rKey); });
        }
    }

    // B: crewNames objektumból
    if (ship.crewNames && typeof ship.crewNames === 'object') {
        for (var cnRole in ship.crewNames) {
            if (cnRole.toLowerCase().indexOf('tulajdonos') !== -1) continue;
            var cnVal = ship.crewNames[cnRole];
            if (cnVal) {
                String(cnVal).split(',').forEach(function (nm) { addMember(nm.trim(), cnRole); });
            }
        }
    }

    // C: Hajó szintű mezők
    var standardRoles = [
        'Kapitány', 'Kapitány email', 'Navigátor', 'Kormányos', 'Vitorlamester', 'Fedélzetmester',
        'Tüzér', 'Hajóorvos', 'Hajószakács', 'Térképrajzoló', 'Tekercsmester',
        'Felfedező', 'Gépész', 'Hajóács', 'Letmester', 'Monk',
        'Legénység (Tengerészek)', 'Utasok', 'Tengerész', 'Utas'
    ];
    standardRoles.forEach(function (stRole) {
        var sVal = ship[stRole];
        if (sVal && typeof sVal === 'string') {
            sVal.split(',').forEach(function (nm) {
                var dispRole = (stRole === 'Kapitány email') ? 'Kapitány' :
                    ((stRole === 'Legénység (Tengerészek)') ? 'Tengerész' :
                    ((stRole === 'Utasok') ? 'Utas' : stRole));
                addMember(nm.trim(), dispRole);
            });
        }
    });

    ship.crewMembers = crewMembers;
    ship.crewCount = crewMembers.length;

    // 6. FELHASZNÁLÓ SZEREPKÖRÉNEK MEGÁLLAPÍTÁSA (pl. Nemere hajónál a felhasználó Kapitány)
    var curUser = window.currentUser || (window.parent && window.parent.currentUser) || {};
    var curEmail = (currentUserEmail || curUser.email || (typeof localStorage !== 'undefined' ? (localStorage.getItem('ebook_pirates_user_email') || localStorage.getItem('ebookPiratesUser')) : '') || '').toLowerCase().trim();

    var userFoundRole = '';
    if (curEmail) {
        for (var o = 0; o < rawOwnerEmails.length; o++) {
            if (rawOwnerEmails[o].toLowerCase() === curEmail) {
                userFoundRole = 'Tulajdonos';
                break;
            }
        }
        if (!userFoundRole && rawCapStr && rawCapStr.toLowerCase().indexOf(curEmail) !== -1) {
            userFoundRole = 'Kapitány';
        }
        if (!userFoundRole) {
            for (var cm = 0; cm < crewMembers.length; cm++) {
                if (crewMembers[cm].email && crewMembers[cm].email.toLowerCase() === curEmail) {
                    userFoundRole = crewMembers[cm].role;
                    break;
                }
            }
        }
    }

    ship.userRole = userFoundRole || (ship.isOwner ? 'Tulajdonos' : (ship.isCaptain ? 'Kapitány' : 'Készenlétben'));
    ship.role = ship.userRole;
    ship.isOwner = (ship.userRole === 'Tulajdonos');
    ship.isCaptain = (ship.userRole === 'Kapitány');

    return ship;
}
window.normalizeShipData = normalizeShipData;

var isFetchingDeckShips = false;
var deckShipsCallbacks = [];

function loadDeckShips(onComplete) {
    if (onComplete) deckShipsCallbacks.push(onComplete);

    // 1. Ha már van betöltött hajólista a memóriában, azonnal használjuk (0 ms)
    if (window.userShips && window.userShips.length > 0) {
        window.userShips = window.userShips.map(function (s) { return normalizeShipData(s); });
        if (!selectedShipForDeparture && window.userShips.length > 0) {
            selectedShipForDeparture = window.userShips[0];
            window.selectedShipForDeparture = window.userShips[0];
        }
        renderDeckShipCards();
        populateDeckCrewRecipients();
        while (deckShipsCallbacks.length > 0) {
            var cb = deckShipsCallbacks.shift();
            try { cb(window.userShips); } catch (e) { }
        }
        return;
    }

    if (isFetchingDeckShips) return;
    isFetchingDeckShips = true;

    var finishLoading = function (ships) {
        isFetchingDeckShips = false;
        renderDeckShipCards();
        populateDeckCrewRecipients();
        while (deckShipsCallbacks.length > 0) {
            var cb = deckShipsCallbacks.shift();
            try { cb(ships || window.userShips || []); } catch (e) { }
        }
    };

    callBackend('getToborzoData', [], function (response) {
        if (response && response.success && Array.isArray(response.ownedShips)) {
            window.toborzoMarketData = response;
            window.toborzoNameDict = response.nameDict || {};
            window.userShips = response.ownedShips.map(function (s) { return normalizeShipData(s, window.toborzoNameDict); });
            if ((!selectedShipForDeparture || !window.selectedShipForDeparture) && window.userShips.length > 0) {
                selectedShipForDeparture = window.userShips[0];
                window.selectedShipForDeparture = window.userShips[0];
            }
        }
        finishLoading(window.userShips || []);
    }, function (err) {
        console.warn('Fedélzet getToborzoData figyelmeztetés:', err);
        finishLoading(window.userShips || []);
    });
}

function initFedelzetOldal() {
    // Háttérvideó garantált némítása
    var bgVid = document.getElementById('fedelzet-video-player');
    if (bgVid) {
        bgVid.muted = true;
        bgVid.volume = 0;
    }

    // Képernyő nyugalmi állapotban szigorúan tiszta és üres
    setDeckScreenText('');

    // Valós járműadatok és legénység betöltése
    loadDeckShips();

    if (typeof startSessionPolling === 'function') {
        startSessionPolling();
    }
}

function setDeckScreenText(htmlText) {
    var txtEl = document.getElementById('deck-screen-text');
    var kepernyoPath = document.getElementById('kepernyo');

    if (htmlText && htmlText.trim().length > 0) {
        if (txtEl) txtEl.innerHTML = htmlText;
        if (kepernyoPath) kepernyoPath.classList.add('deck-screen-active');
    } else {
        if (txtEl) txtEl.innerHTML = '';
        if (kepernyoPath) kepernyoPath.classList.remove('deck-screen-active');
    }
}

function populateDeckCrewRecipients() {
    var crewSelect = document.getElementById('deck-msg-recipient-select');
    if (!crewSelect) return;

    var ship = selectedShipForDeparture || window.selectedShipForDeparture || (window.userShips && window.userShips[0]);
    if (!ship) {
        crewSelect.innerHTML = '<option value="">⚠️ Válassz hajót a Hajólajstromban (Kormánykerék)!</option>';
        return;
    }

    crewSelect.innerHTML = '<option value="ALL">👥 TELJES LEGÉNYSÉG (Mindenki)</option>';

    var addedMembers = {};
    var nameDict = window.toborzoNameDict || (window.toborzoMarketData && window.toborzoMarketData.nameDict) || {};

    var BLOCKED_ATTR_ROLES = [
        'méret', 'mérettartomány', 'ár', 'költség', 'sebesség', 'gyorsaság', 'élettartam', 
        'helyzet', 'szövetség', 'zászló', 'hossz', 'jellemző hossz', 'leírás', 'id', 'típus', 
        'férőhely', 'kapacitás', 'hajó id', 'hajónapló id', 'hajó neve', 'hajó típusa'
    ];

    var BLOCKED_SIZE_VALUES = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'true', 'false', 'undefined', 'null'];

    var resolveName = function (emailOrName) {
        if (!emailOrName) return '';
        var raw = String(emailOrName).trim();
        var lower = raw.toLowerCase();
        if (nameDict[lower]) return nameDict[lower];
        if (nameDict[raw]) return nameDict[raw];
        return raw;
    };

    var addRecipientOption = function (rawVal, role) {
        if (!rawVal) return;
        var valStr = String(rawVal).trim();
        var valLower = valStr.toLowerCase();

        // 1. Kizárjuk a méretkódokat (XL, L, M stb.), a számokat és a technikai értékeket
        if (BLOCKED_SIZE_VALUES.indexOf(valLower) !== -1 || /^\d+$/.test(valStr)) return;

        // 2. Kizárjuk a nem legénységi oszlopokat (pl. Mérettartomány, Sebesség, Ár)
        if (role) {
            var roleLower = String(role).trim().toLowerCase();
            for (var b = 0; b < BLOCKED_ATTR_ROLES.length; b++) {
                if (roleLower === BLOCKED_ATTR_ROLES[b] || roleLower.indexOf(BLOCKED_ATTR_ROLES[b]) !== -1) {
                    return;
                }
            }
        }

        var cleanName = resolveName(valStr);
        if (!cleanName || cleanName === 'undefined' || cleanName === 'null') return;
        var lowerKey = cleanName.toLowerCase();
        if (BLOCKED_SIZE_VALUES.indexOf(lowerKey) !== -1) return;

        if (!addedMembers[lowerKey]) {
            addedMembers[lowerKey] = true;
            var opt = document.createElement('option');
            opt.value = valStr || cleanName;
            opt.textContent = '👤 ' + cleanName + (role ? (' (' + role + ')') : '');
            crewSelect.appendChild(opt);
        }
    };

    // 1. Ha crewNames objektum van (pl. getToborzoData)
    if (ship.crewNames && typeof ship.crewNames === 'object') {
        for (var cRole in ship.crewNames) {
            var cVal = ship.crewNames[cRole];
            if (cVal) {
                var cNames = String(cVal).split(',');
                cNames.forEach(function (cn) {
                    addRecipientOption(cn.trim(), cRole);
                });
            }
        }
    }

    // 2. Ha crew objektum van (pl. { 'Kapitány': 'email' })
    if (ship.crew && typeof ship.crew === 'object') {
        for (var role in ship.crew) {
            var cVal2 = ship.crew[role];
            if (cVal2) {
                var cEmails = String(cVal2).split(',');
                cEmails.forEach(function (em) {
                    addRecipientOption(em.trim(), role);
                });
            }
        }
    }

    // 3. Ha crewMembers tömb van (pl. [{name, email, role}])
    if (Array.isArray(ship.crewMembers) && ship.crewMembers.length > 0) {
        ship.crewMembers.forEach(function (member) {
            var rawVal = member.name || member.email || member;
            var memberRole = member.role || 'Matróz';
            addRecipientOption(rawVal, memberRole);
        });
    }

    // 4. Ha vehicleData kulcs-értékek vannak a ship objektumban
    var roleKeys = [
        'Kapitány', 'Kapitány email', 'Navigátor', 'Kormányos', 'Vitorlamester', 'Fedélzetmester',
        'Tüzér', 'Hajóorvos', 'Hajószakács', 'Térképrajzoló', 'Tekercsmester',
        'Felfedező', 'Gépész', 'Hajóács', 'Letmester', 'Monk',
        'Legénység (Tengerészek)', 'Utasok', 'Tengerész', 'Utas'
    ];

    roleKeys.forEach(function (roleKey) {
        var val = ship[roleKey];
        if (val && typeof val === 'string') {
            var names = val.split(',');
            names.forEach(function (n) {
                var displayRole = (roleKey === 'Kapitány email') ? 'Kapitány' :
                    ((roleKey === 'Legénység (Tengerészek)') ? 'Tengerész' :
                    ((roleKey === 'Utasok') ? 'Utas' : roleKey));
                addRecipientOption(n.trim(), displayRole);
            });
        }
    });

    // 5. Kapitány / Tulajdonos mezők pótlása
    if (ship.captain) addRecipientOption(ship.captain, 'Kapitány');
    if (ship.owner) addRecipientOption(ship.owner, 'Tulajdonos');
}

function renderDeckShipCards() {
    var list = document.getElementById('deck-ship-cards-list');
    if (!list) return;
    list.innerHTML = '';

    if (!window.userShips || window.userShips.length === 0) {
        list.innerHTML = '<div style="padding: 15px; text-align: center; color: #00ffcc;"><i class="fas fa-spinner fa-spin"></i> Hajólajstrom lekérdezése a kikötőből...</div>';
        return;
    }

    // 1. Típus és Helyzet szerinti szűrés a frontenden: Csak vízi hajók, amik a kikötőben vannak
    var waterShips = window.userShips.filter(function (ship) {
        var t = String(ship.type || ship.shipType || ship.tipus || ship['Hajó típusa'] || '').toLowerCase().trim();
        if (t.includes('búvár') || t.includes('buvar') || t.includes('léghajó') || t.includes('leghajo') || t.includes('zeppelin')) {
            return false;
        }
        var h = String(ship['Helyzet'] || ship.helyzet || '').toLowerCase().trim();
        if (h === 'tengeren' || ship.isOutAtSea === true || ship.inHarbor === false) {
            return false;
        }
        return true;
    });

    if (waterShips.length === 0) {
        list.innerHTML = '<div style="padding: 15px; text-align: center; color: #ffe680;">Nincs kikötőben állomásozó hajód! (Minden hajód a nyílt tengeren van vagy nem vízi jármű)</div>';
        return;
    }

    var selObj = selectedShipForDeparture || window.selectedShipForDeparture;
    var selId = selObj ? String(selObj.id || selObj.shipId || selObj['Hajó ID'] || selObj['ID'] || '').trim() : '';

    waterShips.forEach(function (ship, idx) {
        var sId = String(ship.id || ship.shipId || ship['Hajó ID'] || ship['ID'] || ('SHIP_' + idx)).trim();
        var sName = ship.name || ship.shipName || ship['Hajó neve'] || 'Névtelen hajó';
        var sType = ship.type || ship.shipType || ship.tipus || ship['Hajó típusa'] || 'Vitorlás';
        var isSelected = Boolean(selId && sId && selId === sId);

        var card = document.createElement('div');
        card.className = 'deck-ship-card' + (isSelected ? ' active-ship' : '');

        var durabilityVal = (ship.durability !== undefined && ship.durability !== null && ship.durability !== '') ? ship.durability : (ship.durabilityPoints || ship['Élettartam'] || 10);
        var durabilityText = durabilityVal + ' pont';

        var userRoleDisplay = ship.userRole || ship.role || 'Készenlétben';
        if (userRoleDisplay === 'Tulajdonos email' || userRoleDisplay === 'Tulajdonos') userRoleDisplay = 'Tulajdonos';
        else if (userRoleDisplay === 'Kapitány email' || userRoleDisplay === 'Kapitány') userRoleDisplay = 'Kapitány';
        else if (userRoleDisplay.indexOf('Tengerész_') === 0) userRoleDisplay = 'Tengerész';
        else if (userRoleDisplay.indexOf('Utasszemély_') === 0 || userRoleDisplay.indexOf('Utas_') === 0) userRoleDisplay = 'Utas';

        var crewStatus = ship.crewStatusText || (userRoleDisplay + (ship.crewCount ? (' (' + ship.crewCount + ' fő)') : ''));
        var isReady = ship.isReady !== false;
        var crewColor = isReady ? '#00ffcc' : '#ffaa00';

        card.innerHTML =
            '<div style="flex: 1;">' +
            '<div style="font-family: \'Orbitron\', sans-serif; font-size: 1.1em; color: #ffe680; font-weight: bold;">' + sName + '</div>' +
            '<div style="font-size: 0.85em; color: #a0c0c0; margin-top: 4px; font-family: \'Share Tech Mono\', monospace;">' +
            '🛡️ Élettartam: <b style="color:#00ffcc;">' + durabilityText + '</b> | ' +
            '⛵ Típus: <b style="color:#00ffcc;">' + sType + '</b> | ' +
            '👥 Szerepkör: <b style="color:' + crewColor + ';">' + crewStatus + '</b>' +
            '</div>' +
            '</div>' +
            '<div style="display: flex; gap: 8px; align-items: center;">' +
            '<button class="btn" style="background: rgba(0,255,204,0.15); color: #00ffcc; border: 1px solid #00ffcc; font-weight: bold; padding: 6px 12px;" onclick="openDeckShipModal(' + idx + ')">' +
            '🔍 ADATLAP' +
            '</button>' +
            '<button class="btn" style="background: ' + (isSelected ? '#2e8b57' : '#d4af37') + '; color: ' + (isSelected ? '#fff' : '#111') + '; font-weight: bold; padding: 6px 14px;" onclick="selectDeckShip(\'' + sId + '\')">' +
            (isSelected ? '✓ KIVÁLASZTVA' : 'KIVÁLASZTÁS') +
            '</button>' +
            '</div>';

        list.appendChild(card);
    });

    populateDeckCrewRecipients();
}

function openDeckShipModal(index) {
    if (!window.userShips || !window.userShips[index]) return;
    currentFetchedVehicles = window.userShips;
    var modal = document.getElementById('vehicle-modal');
    var title = document.getElementById('vehicle-modal-title');
    if (modal) {
        modal.style.display = 'block';
        if (title) title.innerText = "Hajó Adatlap";
        showVehicleDetails(index);
    }
}

function selectDeckShip(shipId, isInitial) {
    if (!window.userShips) return;
    var targetId = String(shipId || '').trim();
    var ship = window.userShips.find(function (s) { 
        var curId = String(s.id || s.shipId || s['Hajó ID'] || s['ID'] || '').trim();
        return (curId === targetId); 
    });
    if (ship) {
        selectedShipForDeparture = ship;
        window.selectedShipForDeparture = ship;
        window.activeShipId = ship.id || ship.shipId;

        renderDeckShipCards();
        populateDeckCrewRecipients();

        if (!isInitial) {
            setTimeout(function () {
                closeDeckConsole();
            }, 350);
        }
    }
}

function handleDeckElementHover(elemId) {
    var hoverItems = {
        'tekero_gomb': {
            title: 'Melyik hajódra mész?',
            desc: 'Válaszd ki, melyik hajóval és legénységgel szeretnél kihajózni!'
        },
        'sector_gomb': {
            title: 'Hártyahalászat',
            desc: 'Átcsónakázhatsz a zátonyos öbölbe, és lehalászhatod a mai termést.'
        },
        'comms_gomb': {
            title: 'Kalandjáték',
            desc: 'Ha felkészültél a kincskeresésre, akkor itt indulhatsz neki a csapatoddal!'
        },
        'log_gomb': {
            title: 'Könyvexpedíció',
            desc: 'Ha megvan, pontosan milyen zsánerben vagy pontosan melyik könyvet akarjátok levadászni, akkor itt indulhatsz neki a csapatoddal!'
        },
        'master_gomb': {
            title: 'Legénységi üzenetküldő',
            desc: 'A beírt szövegedet itt címezheted meg, vagy küldheted el az összes legénységi tagnak.'
        },
        'emergency_gomb': {
            title: 'Kilépés a dokkolóból',
            desc: 'Bezárja a készüléket, maradsz a kikötőben.'
        },
        'kepernyo': {
            title: 'Hajónapló',
            desc: 'Amennyiben a te kötelességed a hajónapló vezetése, ide kattintva tudod megnyitni az új bejegyzéshez.'
        },
        'auto_gomb': {
            title: 'Tutorial ismeretek frissítése',
            desc: 'Hebok kikötő legalapvetőbb szabályainak gyűjteménye.'
        }
    };

    if (hoverItems[elemId]) {
        var item = hoverItems[elemId];
        var html = '<div style="font-family: \'Orbitron\', sans-serif; font-size: clamp(11px, 1.25vw, 15px); color: #ffe680; font-weight: bold; margin-bottom: 4px; text-shadow: 0 0 8px rgba(255,230,128,0.7); letter-spacing: 0.5px;">' +
            '► ' + item.title +
            '</div>' +
            '<div style="font-family: \'Share Tech Mono\', monospace; font-size: clamp(9px, 1.05vw, 12px); color: #00ffcc; line-height: 1.35; opacity: 0.95;">' +
            '(' + item.desc + ')' +
            '</div>';
        setDeckScreenText(html);
    }
}

function handleDeckElementLeave() {
    setDeckScreenText('');
}

function handleDeckElementClick(elemId) {
    if (elemId === 'auto_gomb') {
        loadPage('tutorial_oldal');
        return;
    }

    if (elemId === 'emergency_gomb') {
        if (typeof closeFedelzetModal === 'function') {
            closeFedelzetModal();
        }
        loadPage('kikoto_oldal');
        return;
    }

    if (elemId === 'tekero_gomb') {
        openDeckConsole('ships', 'HAJÓVÁLASZTÓ // KIKÖTŐI LAJSTROM');
        return;
    }

    // Hajóválasztási kényszer ellenőrzése
    if (!selectedShipForDeparture) {
        var html = '<div style="font-family: \'Orbitron\', sans-serif; font-size: clamp(11px, 1.25vw, 15px); color: #ff4444; font-weight: bold; margin-bottom: 4px;">' +
            '⚠️ VÁLASSZ HAJÓT!' +
            '</div>' +
            '<div style="font-family: \'Share Tech Mono\', monospace; font-size: clamp(9px, 1.05vw, 12px); color: #ffcccc;">' +
            '(Először válaszd ki a hajódat a tekerőgombbal [FELÜL]!)' +
            '</div>';
        setDeckScreenText(html);
        return;
    }

    if (elemId === 'sector_gomb') {
        openDeckConsole('fishing', 'HÁRTYAHALÁSZAT VEZÉRLŐ');
    } else if (elemId === 'comms_gomb') {
        openDeckConsole('adventure', 'KALANDJÁTÉK INDÍTÓ');
    } else if (elemId === 'log_gomb') {
        openDeckConsole('expedition', 'KÖNYVEXPEDÍCIÓ INDÍTÓ');
    } else if (elemId === 'master_gomb') {
        openDeckConsole('crew-msg', 'LEGÉNYSÉGI ÜZENETKÜLDŐ');
    } else if (elemId === 'kepernyo') {
        // Hajónapló jogosultság ellenőrzés (backend checkLogWritePermission és hajó adatok alapján)
        var ship = selectedShipForDeparture || (window.userShips && window.userShips[0]) || {};
        var myEmail = (window.currentUserEmail || localStorage.getItem('ebook_pirates_useremail') || '').toLowerCase().trim();
        var myNick = (window.currentUserNick || localStorage.getItem('ebook_pirates_username') || '').toLowerCase().trim();

        var isOwner = ship.isOwner || (ship.owner && (ship.owner.toLowerCase().includes(myEmail) || ship.owner.toLowerCase().includes(myNick)));
        var isCaptain = ship.isCaptain || (ship.captain && (ship.captain.toLowerCase().includes(myEmail) || ship.captain.toLowerCase().includes(myNick)));

        setDeckScreenText('Hajónapló hozzáférési jogosultság ellenőrzése... <span class=\"crt-cursor\">▋</span>');
        callBackend('checkLogWritePermission', [], function (logId) {
            if (logId && typeof logId === 'string') {
                var form = document.getElementById('deck-logbook-form');
                var denied = document.getElementById('deck-logbook-denied');
                if (form) form.style.display = 'block';
                if (denied) denied.style.display = 'none';
                openDeckConsole('logbook', 'HAJÓNAPLÓ BEJEGYZÉS SZERKESZTŐ');
                setupDeckLogImagePreview();
                loadDeckLogEntry('last');
                setDeckScreenText('📜 <b style=\"color:#00ffcc;\">Hajónapló Eszköztár megnyitva.</b> (Napló ID: ' + logId + ')');
            } else if (isOwner || isCaptain || ship.canEditLog !== false) {
                var form2 = document.getElementById('deck-logbook-form');
                var denied2 = document.getElementById('deck-logbook-denied');
                if (form2) form2.style.display = 'block';
                if (denied2) denied2.style.display = 'none';
                openDeckConsole('logbook', 'HAJÓNAPLÓ BEJEGYZÉS SZERKESZTŐ');
                setupDeckLogImagePreview();
                loadDeckLogEntry('new');
                setDeckScreenText('📜 <b style=\"color:#00ffcc;\">Hajónapló Eszköztár megnyitva.</b>');
            } else {
                var form3 = document.getElementById('deck-logbook-form');
                var denied3 = document.getElementById('deck-logbook-denied');
                if (form3) form3.style.display = 'none';
                if (denied3) denied3.style.display = 'block';
                openDeckConsole('logbook', 'HAJÓNAPLÓ // HOZZÁFÉRÉS MEGTAGADVA');
                var htmlDenied = '<div style=\"font-family: \'Orbitron\', sans-serif; font-size: clamp(11px, 1.25vw, 15px); color: #ff4444; font-weight: bold; margin-bottom: 4px;\">' +
                    '⛔ HOZZÁFÉRÉS MEGTAGADVA' +
                    '</div>' +
                    '<div style=\"font-family: \'Share Tech Mono\', monospace; font-size: clamp(9px, 1.05vw, 12px); color: #ffcccc;\">' +
                    '(Csak a hajó Tulajdonosa vagy Kapitánya vezethet hajónaplót!)' +
                    '</div>';
                setDeckScreenText(htmlDenied);
            }
        }, function (err) {
            if (isOwner || isCaptain) {
                var form4 = document.getElementById('deck-logbook-form');
                var denied4 = document.getElementById('deck-logbook-denied');
                if (form4) form4.style.display = 'block';
                if (denied4) denied4.style.display = 'none';
                openDeckConsole('logbook', 'HAJÓNAPLÓ BEJEGYZÉS SZERKESZTŐ');
                setupDeckLogImagePreview();
                loadDeckLogEntry('new');
            } else {
                setDeckScreenText('❌ <span style=\"color:#ff6666;\">Hiba: Nem sikerült a jogosultság ellenőrzése.</span>');
            }
        });
    }
}

function openDeckConsole(subId, titleText) {
    var panel = document.getElementById('deck-console-panel');
    var title = document.getElementById('deck-console-title');
    if (!panel) return;

    if (title && titleText) {
        title.innerHTML = '<i class=\"fas fa-terminal\" style=\"color: #00ffcc;\"></i> [ ' + titleText + ' ] <span class=\"crt-cursor\">_</span>';
    }

    var subconsoles = panel.querySelectorAll('.deck-subconsole');
    subconsoles.forEach(function (el) { el.style.display = 'none'; });

    var targetSub = document.getElementById('deck-console-' + subId);
    if (targetSub) {
        targetSub.style.display = 'block';
    }

    if (subId === 'ships') {
        if (!window.userShips || window.userShips.length === 0) {
            loadDeckShips();
        } else {
            renderDeckShipCards();
        }
    } else if (subId === 'crew-msg') {
        populateDeckCrewRecipients();
    }

    panel.style.display = 'flex';
}

function closeDeckConsole() {
    var panel = document.getElementById('deck-console-panel');
    if (panel) {
        panel.style.display = 'none';
    }
}

function setupDeckLogImagePreview() {
    var imageInput = document.getElementById('deck-log-image');
    var imagePreview = document.getElementById('deck-log-image-preview');
    if (!imageInput || imageInput.dataset.previewBound) return;
    imageInput.dataset.previewBound = "true";

    imageInput.onchange = function (event) {
        var file = event.target.files[0];
        if (!imagePreview) return;
        imagePreview.innerHTML = '';
        if (file && file.type === "image/png") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '140px';
                img.style.borderRadius = '4px';
                img.style.border = '1px solid #00ffcc';
                imagePreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        } else if (file) {
            if (typeof uiAlert === 'function') {
                uiAlert('Csak PNG formátumú kép csatolható a hajónaplóhoz!', 'Figyelmeztetés');
            } else {
                alert('Csak PNG formátumú kép csatolható a hajónaplóhoz!');
            }
            imageInput.value = '';
        }
    };
}

function onDeckLogDateChange(dateValue) {
    if (!dateValue || typeof dateValue !== 'string') return;
    dateValue = dateValue.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        if (window.currentDeckLogEntry && window.currentDeckLogEntry.date === dateValue && window.currentDeckLogEntry.id) {
            return;
        }
        loadDeckLogEntry(dateValue);
    }
}
window.onDeckLogDateChange = onDeckLogDateChange;

function getDeckLogGeoLocation(silent) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var latEl = document.getElementById('deck-log-lat');
                var lonEl = document.getElementById('deck-log-lon');
                if (latEl) latEl.value = position.coords.latitude.toFixed(4);
                if (lonEl) lonEl.value = position.coords.longitude.toFixed(4);
            },
            function (error) {
                var message = 'GPS bemérési hiba: ' + error.message;
                console.warn(message);
                if (!silent) {
                    var status = document.getElementById('deck-log-status');
                    if (status) status.textContent = message + ' (Kérjük, add meg manuálisan a koordinátákat!)';
                }
            },
            { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
        );
    } else {
        console.warn('Geolocation nem támogatott');
        if (!silent) {
            var status2 = document.getElementById('deck-log-status');
            if (status2) status2.textContent = 'A böngésző nem támogatja a geolokációt.';
        }
    }
}

function loadDeckLogEntry(entryId) {
    var entryIdInput = document.getElementById('deck-log-entry-id');
    var dateInput = document.getElementById('deck-log-date');
    var timeInput = document.getElementById('deck-log-time');
    var windSelect = document.getElementById('deck-log-wind');
    var weatherSelect = document.getElementById('deck-log-weather');
    var latInput = document.getElementById('deck-log-lat');
    var lonInput = document.getElementById('deck-log-lon');
    var reportText = document.getElementById('deck-log-report');
    var imageInput = document.getElementById('deck-log-image');
    var imagePreview = document.getElementById('deck-log-image-preview');
    var statusDiv = document.getElementById('deck-log-status');
    var statusTag = document.getElementById('deck-log-entry-status-tag');
    var prevBtn = document.getElementById('deck-log-prev-btn');
    var nextBtn = document.getElementById('deck-log-next-btn');

    if (imagePreview) imagePreview.innerHTML = '';
    if (statusDiv) statusDiv.textContent = '';
    if (imageInput) imageInput.value = '';

    // Alapértelmezett állapot
    if (prevBtn) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.35';
        prevBtn.style.cursor = 'not-allowed';
        prevBtn.innerHTML = '<i class="fas fa-book"></i> <i class="fas fa-chevron-left"></i> Előző bejegyzés';
        prevBtn.onclick = null;
    }
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.35';
        nextBtn.style.cursor = 'not-allowed';
        nextBtn.innerHTML = 'Következő <i class="fas fa-chevron-right"></i> <i class="fas fa-book"></i>';
        nextBtn.onclick = null;
    }

    callBackend('checkLogWritePermission', [], function (currentLogId) {
        if (!currentLogId || typeof currentLogId !== 'string') {
            if (statusDiv) statusDiv.textContent = 'Nem található írható hajónapló azonosító.';
            return;
        }

        if (entryId === 'new' || entryId === null) {
            // === ÚJ BEJEGYZÉS ===
            if (statusTag) statusTag.innerHTML = '📜 [ ÚJ BEJEGYZÉS ]';
            if (entryIdInput) entryIdInput.value = '';

            var now = new Date();
            var y = now.getFullYear();
            var m = ("0" + (now.getMonth() + 1)).slice(-2);
            var d = ("0" + now.getDate()).slice(-2);
            var hh = ("0" + now.getHours()).slice(-2);
            var mm = ("0" + now.getMinutes()).slice(-2);

            if (dateInput) dateInput.value = y + '-' + m + '-' + d;
            if (timeInput) timeInput.value = hh + ':' + mm;
            if (windSelect) windSelect.value = '';
            if (weatherSelect) weatherSelect.value = '';
            if (latInput) latInput.value = '';
            if (lonInput) lonInput.value = '';
            if (reportText) reportText.value = '';
            getDeckLogGeoLocation(true);

            if (window.currentDeckLogEntry && window.currentDeckLogEntry.id) {
                if (prevBtn) {
                    prevBtn.disabled = false;
                    prevBtn.style.opacity = '1';
                    prevBtn.style.cursor = 'pointer';
                    prevBtn.innerHTML = '<i class="fas fa-book"></i> <i class="fas fa-chevron-left"></i> Előző bejegyzés';
                    prevBtn.onclick = function () { loadDeckLogEntry(window.currentDeckLogEntry.id); };
                }
            }
            if (nextBtn) {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.35';
                nextBtn.style.cursor = 'not-allowed';
                nextBtn.innerHTML = '+ Új bejegyzés <i class="fas fa-book-open"></i>';
            }
        } else {
            // === BEJEGYZÉS BETÖLTÉSE (ID, dátum vagy 'last') ===
            callBackend('getLogEntry', [currentLogId, entryId || 'last'], function (entry) {
                if (!entry || entry.error) {
                    if (statusDiv) statusDiv.textContent = 'Hiba a bejegyzés betöltésekor: ' + (entry ? entry.error : 'Ismeretlen hiba');
                    return;
                }

                window.currentDeckLogEntry = entry;

                if (entry.isNewForDate) {
                    // Adott dátumhoz még nincs bejegyzés -> tiszta űrlap arra a dátumra
                    if (statusTag) statusTag.innerHTML = '📜 [ ÚJ BEJEGYZÉS: ' + entry.date + ' ]';
                    if (entryIdInput) entryIdInput.value = '';
                    if (dateInput) dateInput.value = entry.date;
                    var nowD = new Date();
                    var hhD = ("0" + nowD.getHours()).slice(-2);
                    var mmD = ("0" + nowD.getMinutes()).slice(-2);
                    if (timeInput) timeInput.value = hhD + ':' + mmD;
                    if (windSelect) windSelect.value = '';
                    if (weatherSelect) weatherSelect.value = '';
                    if (latInput) latInput.value = '';
                    if (lonInput) lonInput.value = '';
                    if (reportText) reportText.value = '';
                    getDeckLogGeoLocation(true);

                    if (entry.prevId && prevBtn) {
                        prevBtn.disabled = false;
                        prevBtn.style.opacity = '1';
                        prevBtn.style.cursor = 'pointer';
                        prevBtn.innerHTML = '<i class="fas fa-book"></i> <i class="fas fa-chevron-left"></i> Előző bejegyzés';
                        prevBtn.onclick = function () { loadDeckLogEntry(entry.prevId); };
                    }
                    if (nextBtn) {
                        nextBtn.disabled = true;
                        nextBtn.style.opacity = '0.35';
                        nextBtn.style.cursor = 'not-allowed';
                        nextBtn.innerHTML = '+ Új bejegyzés <i class="fas fa-book-open"></i>';
                    }
                } else if (entry.id === null) {
                    // Üres napló
                    if (statusTag) statusTag.innerHTML = '📜 [ ÚJ BEJEGYZÉS ]';
                    if (entryIdInput) entryIdInput.value = '';
                    var now2 = new Date();
                    var y2 = now2.getFullYear();
                    var m2 = ("0" + (now2.getMonth() + 1)).slice(-2);
                    var d2 = ("0" + now2.getDate()).slice(-2);
                    var hh2 = ("0" + now2.getHours()).slice(-2);
                    var mm2 = ("0" + now2.getMinutes()).slice(-2);

                    if (dateInput) dateInput.value = y2 + '-' + m2 + '-' + d2;
                    if (timeInput) timeInput.value = hh2 + ':' + mm2;
                    if (windSelect) windSelect.value = '';
                    if (weatherSelect) weatherSelect.value = '';
                    if (latInput) latInput.value = '';
                    if (lonInput) lonInput.value = '';
                    if (reportText) reportText.value = '';
                    getDeckLogGeoLocation(true);
                } else {
                    // Meglévő bejegyzés betöltve
                    var entryDateStr = (entry.date || '') + (entry.time ? (' ' + entry.time) : '');
                    if (statusTag) statusTag.innerHTML = '📜 [ BEJEGYZÉS: ' + entryDateStr + ' ]';
                    if (entryIdInput) entryIdInput.value = entry.id || '';
                    if (dateInput) dateInput.value = entry.date || '';
                    if (timeInput) timeInput.value = entry.time || '';
                    if (windSelect) windSelect.value = entry.wind || '';
                    if (weatherSelect) weatherSelect.value = entry.weather || '';
                    if (latInput) latInput.value = entry.latitude || '';
                    if (lonInput) lonInput.value = entry.longitude || '';
                    if (reportText) reportText.value = entry.report || '';

                    if (entry.imageId && imagePreview) {
                        imagePreview.innerHTML = '<p style=\"margin: 4px 0; color: #00ffcc; font-size: 0.85em;\"><i class=\"fas fa-image\"></i> Csatolt kép a bejegyzéshez. Új kép feltöltése felülírja.</p>';
                    }

                    if (entry.prevId) {
                        if (prevBtn) {
                            prevBtn.disabled = false;
                            prevBtn.style.opacity = '1';
                            prevBtn.style.cursor = 'pointer';
                            prevBtn.innerHTML = '<i class="fas fa-book"></i> <i class="fas fa-chevron-left"></i> Előző bejegyzés';
                            prevBtn.onclick = function () { loadDeckLogEntry(entry.prevId); };
                        }
                    } else {
                        if (prevBtn) {
                            prevBtn.disabled = true;
                            prevBtn.style.opacity = '0.35';
                            prevBtn.style.cursor = 'not-allowed';
                            prevBtn.innerHTML = '<i class="fas fa-book"></i> <i class="fas fa-chevron-left"></i> Előző bejegyzés';
                        }
                    }

                    if (entry.nextId) {
                        if (nextBtn) {
                            nextBtn.disabled = false;
                            nextBtn.style.opacity = '1';
                            nextBtn.style.cursor = 'pointer';
                            nextBtn.innerHTML = 'Következő <i class=\"fas fa-chevron-right\"></i> <i class=\"fas fa-book\"></i>';
                            nextBtn.onclick = function () { loadDeckLogEntry(entry.nextId); };
                        }
                    } else {
                        if (nextBtn) {
                            nextBtn.disabled = false;
                            nextBtn.style.opacity = '1';
                            nextBtn.style.cursor = 'pointer';
                            nextBtn.innerHTML = '+ Új bejegyzés <i class=\"fas fa-book-open\"></i>';
                            nextBtn.onclick = function () { loadDeckLogEntry('new'); };
                        }
                    }
                }
            }, function (err) {
                if (statusDiv) statusDiv.textContent = 'Hálózati hiba: ' + err.message;
            });
        }
    }, function (err) {
        if (statusDiv) statusDiv.textContent = 'Jogosultság lekérdezési hiba: ' + err.message;
    });
}

function navigateDeckLogEntry(direction) {
    if (!window.currentDeckLogEntry) return;
    if (direction === 'prev' && window.currentDeckLogEntry.prevId) {
        loadDeckLogEntry(window.currentDeckLogEntry.prevId);
    } else if (direction === 'next') {
        if (window.currentDeckLogEntry.nextId) {
            loadDeckLogEntry(window.currentDeckLogEntry.nextId);
        } else {
            loadDeckLogEntry('new');
        }
    }
}

async function executeDeckSaveLogEntry() {
    var dateEl = document.getElementById('deck-log-date');
    var timeEl = document.getElementById('deck-log-time');
    var windEl = document.getElementById('deck-log-wind');
    var weatherEl = document.getElementById('deck-log-weather');
    var latEl = document.getElementById('deck-log-lat');
    var lonEl = document.getElementById('deck-log-lon');
    var reportEl = document.getElementById('deck-log-report');
    var entryIdEl = document.getElementById('deck-log-entry-id');
    var imageEl = document.getElementById('deck-log-image');
    var statusEl = document.getElementById('deck-log-status');
    var saveBtn = document.getElementById('deck-log-save-btn');

    if (statusEl) statusEl.textContent = '';

    var dateVal = dateEl ? dateEl.value.trim() : '';
    var timeVal = timeEl ? timeEl.value.trim() : '';
    var reportVal = reportEl ? reportEl.value.trim() : '';

    if (!dateVal || !timeVal) {
        if (statusEl) {
            statusEl.style.color = '#ff6666';
            statusEl.textContent = 'A dátum és az időpont megadása kötelező!';
        }
        return;
    }
    if (!reportVal) {
        if (statusEl) {
            statusEl.style.color = '#ff6666';
            statusEl.textContent = 'A napi jelentés szövegének kitöltése kötelező!';
        }
        return;
    }

    var entryData = {
        date: dateVal,
        time: timeVal,
        wind: windEl ? windEl.value : '',
        weather: weatherEl ? weatherEl.value : '',
        latitude: latEl ? latEl.value.trim() : '',
        longitude: lonEl ? lonEl.value.trim() : '',
        report: reportVal,
        imageBase64: null,
        id: entryIdEl && entryIdEl.value ? entryIdEl.value.trim() : null
    };

    if (saveBtn) saveBtn.disabled = true;
    setDeckScreenText('Hajónapló bejegyzés mentése folyamatban... <span class=\"crt-cursor\">▋</span>');

    try {
        var file = imageEl && imageEl.files ? imageEl.files[0] : null;
        if (file) {
            var fileReader = new FileReader();
            var dataUrl = await new Promise(function (resolve, reject) {
                fileReader.onload = function (e) { resolve(e.target.result); };
                fileReader.onerror = function (e) { reject(new Error("Hiba a képfájl olvasása közben.")); };
                fileReader.readAsDataURL(file);
            });
            if (typeof convertToPngDataUrl === 'function') {
                var pngDataUrl = await convertToPngDataUrl(dataUrl);
                entryData.imageBase64 = pngDataUrl.split(',')[1];
            } else {
                entryData.imageBase64 = dataUrl.split(',')[1];
            }
        }

        callBackend('saveLogEntry', [entryData], function (response) {
            if (saveBtn) saveBtn.disabled = false;
            if (response && response.success) {
                setDeckScreenText('📜 <b style=\"color:#00ffcc;\">Hajónapló bejegyzés sikeresen elmentve!</b> (' + dateVal + ' ' + timeVal + ')');
                if (statusEl) {
                    statusEl.style.color = '#00ffcc';
                    statusEl.textContent = '✅ Bejegyzés sikeresen elmentve!';
                }
                loadDeckLogEntry('last');
            } else {
                var errText = (response && response.error) ? response.error : 'Ismeretlen mentési hiba';
                setDeckScreenText('❌ <span style=\"color:#ff6666;\">Hajónapló mentési hiba: ' + errText + '</span>');
                if (statusEl) {
                    statusEl.style.color = '#ff6666';
                    statusEl.textContent = 'Hiba: ' + errText;
                }
            }
        }, function (err) {
            if (saveBtn) saveBtn.disabled = false;
            setDeckScreenText('❌ <span style=\"color:#ff6666;\">Szerverhiba mentéskor: ' + err.message + '</span>');
            if (statusEl) {
                statusEl.style.color = '#ff6666';
                statusEl.textContent = 'Szerverhiba: ' + err.message;
            }
        });

    } catch (err) {
        if (saveBtn) saveBtn.disabled = false;
        setDeckScreenText('❌ <span style=\"color:#ff6666;\">Képfeldolgozási hiba: ' + err.message + '</span>');
        if (statusEl) {
            statusEl.style.color = '#ff6666';
            statusEl.textContent = 'Képfeldolgozási hiba: ' + err.message;
        }
    }
}

function loadCompletableScrolls() {
    callBackend('getCompletableScrollSets', [], function (res) {
        var container = document.getElementById('completable-scrolls-list');
        var section = document.getElementById('masolatta-fuzes-section');
        if (!container || !section) return;

        container.innerHTML = '';
        if (res && res.length > 0) {
            section.style.display = 'block';
            res.forEach(function (item) {
                var div = document.createElement('div');
                div.style.border = '1px solid #d2b48c';
                div.style.borderRadius = '5px';
                div.style.padding = '15px';
                div.style.marginBottom = '10px';
                div.style.backgroundColor = 'rgba(255,255,255,0.6)';

                div.innerHTML = '<h4 style="margin:0 0 5px 0;">' + item.title + '</h4>' +
                    '<p style="margin:0 0 10px 0; font-style:italic;">' + item.author + '</p>' +
                    '<button class="btn" style="background-color: var(--color-gold); color: #000; width: 100%;" ' +
                    'onclick="bindScrolls(\'' + item.code + '\')"><i class="fas fa-scroll"></i> Másolattá Fűzöm!</button>';
                container.appendChild(div);
            });
        } else {
            section.style.display = 'none';
        }
    });
}

function bindScrolls(baseCode) {
    if (!confirm("Biztosan összefűzöd a tekercseket? A felhasznált fejezetek eltűnnek, és egy új Másolat jön létre!")) return;

    document.getElementById('loading-overlay').style.display = 'flex';
    callBackend('bindScrollsToCopy', [baseCode], function (res) {
        document.getElementById('loading-overlay').style.display = 'none';
        if (res && res.success) {
            uiAlert("Sikeresen összefűzted a tekercseket! A Másolat bekerült a gyűjteményedbe.", "Siker!");
            loadPage('tekercsmester_oldal');
        } else {
            uiAlert("Hiba: " + (res ? res.error : "Ismeretlen hiba történt."), "Kudarc");
        }
    }, function (err) {
        document.getElementById('loading-overlay').style.display = 'none';
        uiAlert("Hálózati hiba: " + err.message);
    });
}


// --- JÁRMŰ MODAL LOGIKA ---
var currentFetchedVehicles = [];

function openVehicleModal(category) {
    var modal = document.getElementById('vehicle-modal');
    var title = document.getElementById('vehicle-modal-title');
    var body = document.getElementById('vehicle-modal-body');

    if (!modal || !title || !body) return;

    title.innerText = category + " flottád";
    body.innerHTML = '<div style="text-align:center;"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Hajónaplók felnyitása...</div>';
    modal.style.display = 'block';

    var token = localStorage.getItem('session_token');
    callBackend('getUserVehiclesByCategory', [category],
        function (res) {
            if (res && res.success) {
                currentFetchedVehicles = (res.vehicles || []).map(function (v) { return normalizeShipData(v); });
                renderVehicleList();
            } else {
                var msg = res ? res.message : "Ismeretlen hiba";
                body.innerHTML = '<div style="color:red;">Hiba: ' + msg + '</div>';
            }
        },
        function (err) {
            body.innerHTML = '<div style="color:red;">Hálózati hiba történt.</div>';
        }
    );
}

function closeVehicleModal() {
    var modal = document.getElementById('vehicle-modal');
    if (modal) modal.style.display = 'none';
}

function renderVehicleList() {
    var body = document.getElementById('vehicle-modal-body');
    if (currentFetchedVehicles.length === 0) {
        body.innerHTML = '<div class="stat-block" style="text-align:center;">Nincs a neveden ilyen kategóriájú jármű.</div>';
        return;
    }

    var html = '<ul style="list-style:none; padding:0; margin:0;">';
    for (var i = 0; i < currentFetchedVehicles.length; i++) {
        var v = currentFetchedVehicles[i];
        var vName = v['Hajó neve'] || 'Névtelen jármű';
        var vType = v['Hajó típusa'] || '';

        html += '<li class="stat-block" style="margin-bottom:10px; cursor:pointer;" onclick="showVehicleDetails(' + i + ')">';
        html += '<strong style="color:var(--color-accent); font-size:1.1em;">' + vName + '</strong>';
        if (vType) html += '<br><small style="color:#aaa;">' + vType + '</small>';
        html += '</li>';
    }
    html += '</ul>';
    body.innerHTML = html;
}

function showVehicleDetails(index) {
    var v = currentFetchedVehicles[index];
    if (!v) return;

    // Normalizálás a legfrissebb névtárral
    v = normalizeShipData(v);
    currentFetchedVehicles[index] = v;

    var body = document.getElementById('vehicle-modal-body');
    if (!body) return;
    var vName = v['Hajó neve'] || v.name || v.shipName || 'Névtelen jármű';
    var rawType = v['Hajó típusa'] || v.type || v.shipType || v.tipus || 'Vitorlás';

    var isCategoryList = (typeof currentPageName !== 'undefined' && currentPageName === 'kincsek');
    var backBtnHtml = isCategoryList
        ? '<button onclick="renderVehicleList()" class="btn" style="margin-bottom:15px; width:100%;"><i class="fas fa-arrow-left"></i> Vissza a listához</button>'
        : ''; // A fejléc pirosX gombja zárja be, felesleges a belső 'X Bezárás' gomb

    var html = backBtnHtml;
    html += '<h3 style="margin-top:0; color:var(--color-accent); font-family:\'Orbitron\', sans-serif;">' + vName + '</h3>';

    // Hajókép helye a típus alapján
    var safeType = rawType.toLowerCase().replace(/[\s\/\(\)]+/g, '_').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ö/g, 'o').replace(/ő/g, 'o').replace(/ú/g, 'u').replace(/ü/g, 'u').replace(/ű/g, 'u');
    html += '<div style="text-align:center; margin-bottom:15px; padding:10px; background:rgba(0,0,0,0.4); border-radius:5px; border:1px dashed var(--color-accent);">';
    html += '<img src="assets/ships/' + safeType + '.png" alt="' + rawType + '" style="max-width:100%; max-height:200px; object-fit:contain;" onerror="this.onerror=null; this.src=\'assets/ship_placeholder.png\'; this.style.opacity=\'0.5\';">';
    html += '<div style="font-size:0.8em; color:#aaa; margin-top:5px;">Látványterv (' + safeType + '.png)</div>';
    html += '</div>';

    html += '<div class="stat-block">';

    // 1. Főbb Állapot és Élettartam (P oszlop)
    var durabilityVal = (v.durability !== undefined && v.durability !== null && v.durability !== '') ? v.durability : (v['Élettartam'] || 10);
    html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>🛡️ Élettartam (P oszlop):</strong> <span style="color:#00ffcc; font-weight:bold;">' + durabilityVal + ' pont</span></div>';
    html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>⛵ Hajó típusa:</strong> <span style="color:#00ffcc;">' + rawType + '</span></div>';
    
    var inHarborStatus = (v.inHarbor !== false && String(v['Helyzet'] || '').toLowerCase() !== 'tengeren') 
        ? '<span style="color:#00ffcc; font-weight:bold;">⚓ Kikötőben állomásozik</span>' 
        : '<span style="color:#ffaa00; font-weight:bold;">🌊 Nyílt tengeren van</span>';
    html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>📍 Helyzet:</strong> ' + inHarborStatus + '</div>';

    // 2. Technikai Jellemzők (strukturált, szép kiírás)
    var techSpecs = [
        { label: '📐 Mérettartomány', key: 'Mérettartomány' },
        { label: '📏 Jellemző hossz', key: 'Jellemző hossz' },
        { label: '💨 Sebesség max.', key: 'Sebesség max.' },
        { label: '💣 Tüzérségi szint', key: 'Tüzérségi szint' },
        { label: '🛡️ Védelmi szint', key: 'Védelmi szint' },
        { label: '📡 Lokátor szint', key: 'Lokátor szint' },
        { label: '☁️ Utazási magasság max.', key: 'Utazási magasság max.' },
        { label: '🌊 Merülési mélység', key: 'Merülési mélység' },
        { label: '🪑 Férőhely', key: 'Férőhely' },
        { label: '📦 Kapacitás', key: 'Kapacitás' },
        { label: '📜 Leírás', key: 'Leírás' }
    ];

    var hasTech = false;
    for (var i = 0; i < techSpecs.length; i++) {
        var spec = techSpecs[i];
        var val = v[spec.key];
        if (val !== undefined && val !== null && typeof val !== 'object' && String(val).trim() !== '') {
            if (!hasTech) {
                html += '<hr style="border-color:var(--color-border); margin:10px 0;">';
                html += '<h4 style="color:#00ffcc; margin:8px 0 5px 0; font-family:\'Share Tech Mono\', monospace;"><i class="fas fa-cogs"></i> Technikai Jellemzők:</h4>';
                hasTech = true;
            }
            html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>' + spec.label + ':</strong> <span style="color:#ffe680;">' + val + '</span></div>';
        }
    }

    html += '<hr style="border-color:var(--color-border); margin:10px 0;">';

    // 3. Regisztrált Legénység (Valós nevekkel, Tulajdonos(ok) az 1. helyen, duplikációmentesen)
    html += '<h4 style="color:#ffe680; margin:10px 0 5px 0; font-family:\'Share Tech Mono\', monospace;"><i class="fas fa-users"></i> Regisztrált Legénység:</h4>';
    
    var nonOwnerCrew = (v.crewMembers || []).filter(function (m) { return m.role !== 'Tulajdonos'; });
    var ownerMembers = (v.crewMembers || []).filter(function (m) { return m.role === 'Tulajdonos'; });
    var ownerDisplayNames = (ownerMembers.length > 0) ? ownerMembers.map(function (m) { return m.name; }).join(', ') : (v.ownerName || 'Ismeretlen Tulajdonos');

    if (Array.isArray(v.crewMembers) && v.crewMembers.length > 0) {
        v.crewMembers.forEach(function (m) {
            html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>👤 ' + (m.role || 'Matróz') + ':</strong> <span style="color:#d4af37; font-weight:bold;">' + (m.name || m.email) + '</span></div>';
        });
        if (nonOwnerCrew.length === 0) {
            html += '<div style="color:#aaa; font-style:italic; padding:6px 0 2px 0;">Nincs további bejegyzett legénység a lajstromban (csak a tulajdonos: <span style="color:#d4af37; font-weight:bold;">' + ownerDisplayNames + '</span>).</div>';
        }
    } else {
        html += '<div class="stat-line" style="justify-content:flex-start; gap:10px;"><strong>👤 Tulajdonos:</strong> <span style="color:#d4af37; font-weight:bold;">' + ownerDisplayNames + '</span></div>';
        html += '<div style="color:#aaa; font-style:italic; padding:6px 0 2px 0;">Nincs bejegyzett legénység a lajstromban (csak a tulajdonos: <span style="color:#d4af37; font-weight:bold;">' + ownerDisplayNames + '</span>).</div>';
    }

    html += '</div>';
    body.innerHTML = html;
}
window.showVehicleDetails = showVehicleDetails;

// --- VÁRÓTEREM ÉS SESSION POLLING LOGIKA ---
var sessionPollInterval = null;

function startSessionPolling() {
    stopSessionPolling();
    checkActiveSessionStatus(); // Első hívás azonnal
    sessionPollInterval = setInterval(checkActiveSessionStatus, 15000); // 15 másodpercenként
}

function stopSessionPolling() {
    if (sessionPollInterval) {
        clearInterval(sessionPollInterval);
        sessionPollInterval = null;
    }
}

function checkActiveSessionStatus() {
    if (!selectedShipForDeparture || typeof currentPageName === 'undefined' || currentPageName !== 'fedelzet_oldal') {
        stopSessionPolling();
        return;
    }

    callBackend('getActiveSessionStatus', [selectedShipForDeparture.id], function (res) {
        if (!res || res.error) return;

        var kihajozunkPanel = document.getElementById('kihajozunk-container');
        var waitingRoomPanel = document.getElementById('waiting-room-container');
        var fishingBtn = document.getElementById('waiting-room-fishing-btn');
        var pvpOverlay = document.getElementById('pvp-alarm-overlay');

        if (kihajozunkPanel && waitingRoomPanel) {
            if (res.isActive) {
                // Hajó aktív sessionben van
                kihajozunkPanel.style.display = 'none';
                waitingRoomPanel.style.display = 'block';

                if (res.status === 'WAITING') {
                    pvpOverlay.style.display = 'none';
                    if (res.waitingRoom && res.waitingRoom.allowFishing) {
                        fishingBtn.style.display = 'block';
                    } else {
                        fishingBtn.style.display = 'none';
                    }
                } else if (res.status === 'DIVERTED_TO_PVP') {
                    fishingBtn.style.display = 'none';
                    pvpOverlay.style.display = 'flex';
                } else if (res.status === 'ACTIVE' || res.status === 'IN_PROGRESS') {
                    // Már a nyílt tengeren van, kalandozik
                    pvpOverlay.style.display = 'none';
                    fishingBtn.style.display = 'none';

                    // Ha még nem vagyunk a game_oldal-on, váltsunk át!
                    if (currentPageName !== 'game_oldal') {
                        uiAlert("A Játékmenet aktív! Átirányítás a kalandmezőre...", "Indulás");
                        loadGamePage(res);
                    }
                }
            } else {
                // Nincs aktív session, szabad a pálya
                kihajozunkPanel.style.display = 'block';
                waitingRoomPanel.style.display = 'none';
            }
        }
    }, function (err) {
        // Csendes naplózás háttérbeli lekérdezésnél
        console.warn("Session állapot lekérdezési figyelmeztetés:", err && err.message ? err.message : err);
    });
}

function startFishingMiniGame() {
    uiAlert("A Hártyahalászat elindult!", "Horgászat");
    loadGamePage({ gameType: 'Hártyahalászat' });
}

function joinPvpDefense() {
    uiAlert("Mindenki a fedélzetre! Fegyvereket tölts! (PvP Harci modul betöltése)", "Riadó");
}
// ---------------------------------------------


// --- GAME OLDAL LOGIKA ---
function loadGamePage(sessionData) {
    loadPage('game_oldal');

    // Várjuk meg, amíg a loadPage aszinkron fetch-e betölti a game_oldal.html-t a DOM-ba
    var checkExist = setInterval(function () {
        if (document.getElementById('game-media-container')) {
            clearInterval(checkExist);

            // UI Alaphelyzetbe állítása
            var titleEl = document.getElementById('game-title');
            var mediaContainer = document.getElementById('game-media-container');
            var narrativeOverlay = document.getElementById('game-narrative-overlay');
            var minigameContainer = document.getElementById('game-minigame-container');
            var returnShipBtn = document.getElementById('btn-return-ship');
            var actionsContainer = document.getElementById('game-actions-container');
            var narrativeText = document.getElementById('game-narrative-text');
            var minigameFrame = document.getElementById('game-minigame-frame');

            mediaContainer.style.display = 'block';
            narrativeOverlay.style.display = 'none';
            minigameContainer.style.display = 'none';
            if (returnShipBtn) returnShipBtn.style.display = 'block';
            actionsContainer.innerHTML = ''; // Gombok törlése

            // HA HÁRTYAHALÁSZAT
            if (sessionData && sessionData.gameType === 'Hártyahalászat') {
                if (titleEl) titleEl.textContent = "Helyszín megközelítése...";
                narrativeOverlay.style.display = 'none';

                // Ideiglenes: a felhőből hívjuk meg a webhatter02.mp4-et, ha nincs backend által küldött URL
                var introVid = sessionData.introVideo || { video_url: 'https://storage.googleapis.com/kalozsziget-assets/videos/webhatter02.mp4', fallback_image: 'placeholder_fish.jpg' };

                playMediaSequence([introVid], function () {
                    if (titleEl) titleEl.textContent = "Hártyahalászat";

                    // Azonnal indítjuk a minijátékot a videó lejátszása után, gomb nélkül!
                    narrativeOverlay.style.display = 'none';
                    var closeIcon = document.querySelector('.header-close-icon');
                    if (closeIcon) closeIcon.style.display = 'none';

                    minigameContainer.style.top = '0';
                    minigameContainer.style.left = '0';
                    minigameContainer.style.right = '0';
                    minigameContainer.style.bottom = '0';
                    minigameContainer.style.border = 'none';
                    minigameContainer.style.borderRadius = '0';
                    minigameContainer.style.zIndex = '100';
                    minigameContainer.style.display = 'block';

                    var token = localStorage.getItem('ebookPiratesToken') || sessionStorage.getItem('ebookPiratesToken') || '';
                    var shipId = (typeof selectedShipForDeparture !== 'undefined' && selectedShipForDeparture) ? selectedShipForDeparture.id : '';
                    minigameFrame.src = 'minigame_fishing.html?token=' + encodeURIComponent(token) + '&shipId=' + encodeURIComponent(shipId) + '&v=' + Date.now();
                });
                return;
            }

            // HA KALANDJÁTÉK VAGY KÖNYVEXPEDÍCIÓ
            if (sessionData) {
                titleEl.textContent = sessionData.targetName ? sessionData.targetName + " (" + sessionData.gameType + ")" : "Aktív Játékmenet";
                narrativeOverlay.style.display = 'block';
                narrativeText.textContent = "A kaland elkezdődött. Az adatok szinkronizálása a szerverrel folyamatban van...";

                // Placeholder gomb, amíg a Játékmester AI meg nem érkezik
                // Meghívjuk a Játékmegjelenítő Motort!
                var currentJsonTree = null;
                if (sessionData.adventureTree) {
                    // Ha közvetlenül benne van a JSON
                    currentJsonTree = typeof sessionData.adventureTree === 'string' ? JSON.parse(sessionData.adventureTree) : sessionData.adventureTree;
                } else if (sessionData.kalandfa) {
                    currentJsonTree = typeof sessionData.kalandfa === 'string' ? JSON.parse(sessionData.kalandfa) : sessionData.kalandfa;
                }

                if (currentJsonTree && currentJsonTree.nodes) {
                    renderGameCheckpoint(currentJsonTree, sessionData.currentCheckpoint || 'HAJO_START');
                } else {
                    var placeholderBtn = document.createElement('button');
                    placeholderBtn.className = 'btn-primary';
                    placeholderBtn.textContent = 'Kaland Folytatása (Fallback)';
                    placeholderBtn.onclick = function () {
                        uiAlert("Várakozás a Játékmester AI JSON generálására...", "Rendszerüzenet");
                    };
                    actionsContainer.appendChild(placeholderBtn);
                }
            } else {
                titleEl.textContent = "Ismeretlen Kaland";
            }

            // Gomb eseménykezelők (statikusak)
            returnShipBtn.onclick = function () {
                uiAlert("Visszatérés a hajóra... (Itt kell backend mentést indítani)", "Útirány");
                setTimeout(function () {
                    loadPage('fedelzet_oldal');
                }, 1500);
            };

            var btnCloseMinigame = document.getElementById('btn-close-minigame');
            if (btnCloseMinigame) {
                btnCloseMinigame.onclick = function () {
                    minigameContainer.style.display = 'none';
                };
            }
        }
    }, 100);
}


// =====================================================================
// GAME ASSET PRELOADER (Okos Előtöltéses Rendszer)
// =====================================================================
var GameAssetPreloader = {
    preloadedImages: {},
    preloadedIframes: {}, // Google Drive / Minigame iframe-ek

    // Képek előtöltése (Fallback)
    preloadImage: function (url) {
        if (!url || this.preloadedImages[url]) return;
        var img = new Image();
        img.src = url;
        this.preloadedImages[url] = img;
        console.log("[Preloader] Kép előtöltve: " + url);
    },

    // Videó / Iframe előtöltése (Láthatatlan DOM elemmel)
    preloadIframe: function (url) {
        if (!url || this.preloadedIframes[url]) return;

        // Memória-gazdálkodás: Egyszerre max 2 előtöltött videó/minijáték lehet a RAM-ban!
        var keys = Object.keys(this.preloadedIframes);
        if (keys.length >= 2) {
            var oldestKey = keys[0];
            var oldIframe = this.preloadedIframes[oldestKey];
            if (oldIframe.parentNode) {
                oldIframe.parentNode.removeChild(oldIframe); // DOM-ból törlés
            }
            delete this.preloadedIframes[oldestKey];
            console.log("[Preloader] Memória felszabadítva: " + oldestKey);
        }

        var iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.top = '-9999px';
        iframe.style.left = '-9999px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.opacity = '0';

        // Ha Google Drive link, át kell alakítani /view-ról /preview-ra a beágyazáshoz
        var finalUrl = url;
        if (url.includes('drive.google.com') && url.includes('/view')) {
            finalUrl = url.replace('/view', '/preview');
        }

        iframe.src = finalUrl;
        document.body.appendChild(iframe);
        this.preloadedIframes[url] = iframe;
        console.log("[Preloader] Videó/Minigame Iframe előtöltve: " + finalUrl);
    },

    // Intelligens fa-elemző (Kiolvassa a következő lehetséges utakat)
    analyzeAndPreloadNext: function (sessionData, currentCheckpoint) {
        if (!sessionData) return;

        // TODO: A JSON fa bejárása és a checkpoint utáni közvetlen csomópontok media fájljainak kiszedése
        // Jelenleg egy Placeholder logika:
        console.log("[Preloader] Elemzés a következő csomópontokhoz (" + currentCheckpoint + ")...");
        // Pl. ha a hajón vagyunk, a DEPARTURE_VIDEO és BLIND_MAP a következő
        // this.preloadImage("fallback_url.jpg");
        // this.preloadIframe("https://drive.google.com/.../preview");
    }
};


// =====================================================================
// GAME RENDERER (A Játékmenet Megjelenítő Motorja)
// =====================================================================

// Szekvenciális videólejátszó segédfüggvény
function playMediaSequence(mediaArray, onCompleteCallback) {
    var videoEl = document.getElementById('game-video-player');
    var fallbackImg = document.getElementById('game-fallback-image');

    if (!mediaArray || mediaArray.length === 0) {
        if (onCompleteCallback) onCompleteCallback();
        return;
    }

    var currentIndex = 0;

    function playNext() {
        if (currentIndex >= mediaArray.length) {
            if (onCompleteCallback) onCompleteCallback();
            return;
        }

        var media = mediaArray[currentIndex];
        currentIndex++;

        if (media.video_url) {
            videoEl.src = media.video_url; // Később itt kezeljük a Drive nyers mp4 linkeket is
            videoEl.style.display = 'block';
            fallbackImg.style.display = 'none';
            videoEl.onended = playNext;
            videoEl.onerror = function () {
                // Ha a videó nem tölt be, jön a fallback
                videoEl.style.display = 'none';
                if (media.fallback_image) {
                    fallbackImg.src = media.fallback_image;
                    fallbackImg.style.display = 'block';
                    setTimeout(playNext, 3000); // Kép esetén 3 másodperc várakozás
                } else {
                    playNext();
                }
            };
            videoEl.play().catch(function (e) {
                // Autoplay block esetén is ugrik a fallbackre
                videoEl.onerror();
            });
        } else if (media.fallback_image) {
            videoEl.style.display = 'none';
            fallbackImg.src = media.fallback_image;
            fallbackImg.style.display = 'block';
            setTimeout(playNext, 3000);
        } else {
            playNext();
        }
    }

    playNext();
}

function renderGameCheckpoint(sessionData, currentCheckpoint) {
    if (!sessionData || !sessionData.nodes) {
        console.error("Érvénytelen JSON struktúra a renderelőben!");
        return;
    }

    var titleEl = document.getElementById('game-title');
    var videoEl = document.getElementById('game-video-player');
    var fallbackImg = document.getElementById('game-fallback-image');
    var narrativeText = document.getElementById('game-narrative-text');
    var actionsContainer = document.getElementById('game-actions-container');
    var narrativeOverlay = document.getElementById('game-narrative-overlay');

    // Alaphelyzet
    if (videoEl) videoEl.style.display = 'none';
    if (fallbackImg) fallbackImg.style.display = 'none';
    narrativeOverlay.style.display = 'block';
    actionsContainer.innerHTML = '';

    var currentNode = null;
    var isTravel = false;

    // NODE KIKERESÉSE (Támogatja a Könyvexpedíció és a Kalandjáték struktúrákat is)
    if (Array.isArray(sessionData.nodes)) {
        // Kalandjáték struktúra (CP_1_DEPARTURE, CP_2_TRAVEL...)
        for (var n = 0; n < sessionData.nodes.length; n++) {
            if (sessionData.nodes[n].id === currentCheckpoint) {
                currentNode = sessionData.nodes[n];
                break;
            }
        }
        if (currentNode && (currentNode.type === "NARRATIVE_TRAVEL" || currentCheckpoint.includes("TRAVEL"))) {
            isTravel = true;
        }
    } else {
        // Könyvexpedíció struktúra (Object: HAJO_START, TRAVEL_EVENTS, LOCATIONS)
        if (currentCheckpoint === 'HAJO' || currentCheckpoint === 'HAJO_START') {
            currentNode = sessionData.nodes.HAJO_START;
        } else if (currentCheckpoint.startsWith('TRAVEL')) {
            isTravel = true;
            if (sessionData.nodes.TRAVEL_EVENTS) {
                for (var i = 0; i < sessionData.nodes.TRAVEL_EVENTS.length; i++) {
                    if (sessionData.nodes.TRAVEL_EVENTS[i].travelId === currentCheckpoint) {
                        currentNode = sessionData.nodes.TRAVEL_EVENTS[i];
                        break;
                    }
                }
            }
        } else if (currentCheckpoint.startsWith('LOC')) {
            if (sessionData.nodes.LOCATIONS) {
                for (var j = 0; j < sessionData.nodes.LOCATIONS.length; j++) {
                    if (sessionData.nodes.LOCATIONS[j].locationId === currentCheckpoint) {
                        currentNode = sessionData.nodes.LOCATIONS[j];
                        break;
                    }
                }
            }
        }
    }

    // Ha nem találtuk meg a Node-ot a hálóban, mert már vége van (vagy egyedi Waiting Room van)
    if (!currentNode) {
        if (currentCheckpoint === 'WAITING_ROOM') {
            titleEl.textContent = "Várakozó a zsákmányosztásra";
            narrativeText.textContent = "A kaland véget ért, a legénység gyülekezik. Hamarosan indul a BANK...";
            var btnReturn = document.createElement('button');
            btnReturn.className = 'btn-primary';
            btnReturn.textContent = 'Visszatérés a Hajóra';
            btnReturn.onclick = function () {
                callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'RETURN_TO_SHIP' }], function () {
                    loadPage('fedelzet_oldal');
                });
            };
            actionsContainer.appendChild(btnReturn);
            return;
        }
        narrativeText.textContent = "Hiba: Az aktuális állomás (" + currentCheckpoint + ") nem található a térképen!";
        return;
    }

    // ALAP CÍM BEÁLLÍTÁS
    titleEl.textContent = currentNode.title || currentNode.name || "Kaland folyamatban...";

    // 1. HAJÓ (SAFE_ZONE) - KÖNYVEXPEDÍCIÓ
    if (currentNode.type === "SAFE_ZONE") {
        narrativeText.textContent = "A hajó biztonságos vizeken ringatózik. Legénység várja a parancsot!";

        if (currentNode.actions) {
            currentNode.actions.forEach(function (action) {
                var btn = document.createElement('button');
                if (action === 'DEPART_TO_FIRST_LOCATION') {
                    btn.className = 'btn-primary';
                    btn.textContent = 'Indulás az Expedícióra';
                    btn.onclick = function () {
                        document.getElementById('loading-overlay').style.display = 'flex';
                        callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'DEPART_TO_FIRST_LOCATION' }], function (res) {
                            document.getElementById('loading-overlay').style.display = 'none';
                            if (res.success && res.sessionData) {
                                renderGameCheckpoint(res.sessionData, res.sessionData.crew[0].currentCheckpoint);
                            } else { uiAlert(res.error || "Hiba az induláskor!"); }
                        });
                    };
                } else if (action === 'START_FISHING') {
                    btn.className = 'btn-info';
                    btn.textContent = 'Hártyahalászat (Minigame)';
                    btn.onclick = function () {
                        document.getElementById('game-minigame-container').style.display = 'block';
                        document.getElementById('game-minigame-frame').src = "about:blank";
                    };
                } else if (action === 'RETURN_TO_SHIP') {
                    btn.className = 'btn-danger';
                    btn.textContent = 'Visszatérés a Hajóra';
                    btn.onclick = function () { loadPage('fedelzet_oldal'); };
                }
                actionsContainer.appendChild(btn);
            });
        }
    }

    // 2. KÖNYVEXPEDÍCIÓ UTAZÁS
    else if (isTravel && currentNode.mediaSequence) {
        narrativeText.textContent = "Az utazás folyamatban van...";
        actionsContainer.innerHTML = "<em>Kérlek várj, a videók betöltése folyamatban...</em>";

        var mediaToPlay = [];
        if (currentNode.mediaSequence.departure) mediaToPlay.push(currentNode.mediaSequence.departure);
        if (currentNode.mediaSequence.map_directives) {
            mediaToPlay.push(currentNode.mediaSequence.map_directives.blind);
        }
        if (currentNode.mediaSequence.arrival) mediaToPlay.push(currentNode.mediaSequence.arrival);

        playMediaSequence(mediaToPlay, function () {
            narrativeText.textContent = "Megérkeztetek a célhoz. Itt az ideje a Képzettségpróbának!";
            actionsContainer.innerHTML = '';

            var btnArrive = document.createElement('button');
            btnArrive.className = 'btn-primary';
            btnArrive.textContent = 'Utazás folytatása / Képzettségpróba';
            btnArrive.onclick = function () {
                document.getElementById('loading-overlay').style.display = 'flex';
                callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'CONTINUE_TRAVEL_TO_LOCATION', actionData: { targetNodeId: currentNode.toNode || 'LOC_1' } }], function (res) {
                    document.getElementById('loading-overlay').style.display = 'none';
                    if (res.success && res.sessionData) {
                        renderGameCheckpoint(res.sessionData, res.sessionData.crew[0].currentCheckpoint);
                    } else { uiAlert(res.error || "Hiba a továbbutazáskor!"); }
                });
            };
            actionsContainer.appendChild(btnArrive);
        });
    }

    // 3. KALANDJÁTÉK ÁLTALÁNOS NODE (NARRATIVE, MINIGAME)
    else if (Array.isArray(sessionData.nodes)) {
        // Ha van introVideo, megpróbáljuk lejátszani (a Kalandjáték JSON videói a kellektárból vagy egyedi URL-ekből jöhetnek)
        if (currentNode.introVideo) {
            actionsContainer.innerHTML = "<em>Videó betöltése...</em>";
            var kMedia = [{ video_url: currentNode.introVideo, fallback_image: '' }]; // Ideális esetben ez URL lesz, most csak ID van az .md-ben
            playMediaSequence(kMedia, function () {
                renderKalandjatekOptions(currentNode, sessionData, narrativeText, actionsContainer);
            });
        } else {
            renderKalandjatekOptions(currentNode, sessionData, narrativeText, actionsContainer);
        }
    }

    // 4. KÖNYVEXPEDÍCIÓ LELŐHELY (LOCATIONS)
    else if (currentNode.minigameData) {
        narrativeText.textContent = "Megérkeztetek. Itt az idő belevetni magatokat a feladatba, hátha lapul itt egy fejezet!";

        var btnPlay = document.createElement('button');
        btnPlay.className = 'btn-primary';
        btnPlay.textContent = 'Minijáték Indítása';
        btnPlay.onclick = function () {
            uiAlert("Minijáték (" + currentNode.minigameData.id + ") betöltése...");
            document.getElementById('game-minigame-container').style.display = 'block';
            document.getElementById('game-minigame-frame').src = "about:blank";
        };
        actionsContainer.appendChild(btnPlay);

        var btnReturnLoc = document.createElement('button');
        btnReturnLoc.className = 'btn-danger';
        btnReturnLoc.textContent = 'Visszatérés a Hajóra';
        btnReturnLoc.onclick = function () {
            document.getElementById('loading-overlay').style.display = 'flex';
            callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'RETURN_TO_SHIP' }], function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (res.success && res.sessionData) {
                    renderGameCheckpoint(res.sessionData, 'HAJO_START');
                } else { uiAlert(res.error || "Hiba a hajóra téréskor!"); }
            });
        };
        actionsContainer.appendChild(btnReturnLoc);
    }

    // Intelligens előtöltés indítása a háttérben!
    GameAssetPreloader.analyzeAndPreloadNext(sessionData, currentCheckpoint);
}

function renderKalandjatekOptions(currentNode, sessionData, narrativeText, actionsContainer) {
    narrativeText.textContent = currentNode.introNarrative || currentNode.narrative || "Esemény a kaland során.";
    actionsContainer.innerHTML = '';

    // Döntési gombok a success/failed ágak alapján (Kalandjáték specifikus)
    if (currentNode.successBranch) {
        var btnS = document.createElement('button');
        btnS.className = 'btn-success';
        btnS.textContent = 'Kaland Sikeres Folytatása';
        btnS.onclick = function () {
            document.getElementById('loading-overlay').style.display = 'flex';
            callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'CONTINUE_TRAVEL_TO_LOCATION', actionData: { targetNodeId: currentNode.successBranch.nextCheckpoint } }], function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (res.success && res.sessionData) {
                    renderGameCheckpoint(res.sessionData, res.sessionData.crew[0].currentCheckpoint || currentNode.successBranch.nextCheckpoint);
                }
            });
        };
        actionsContainer.appendChild(btnS);
    }
    if (currentNode.failedBranch) {
        var btnF = document.createElement('button');
        btnF.className = 'btn-danger';
        btnF.textContent = 'Kudarc/Harc';
        btnF.onclick = function () {
            var nextCP = currentNode.failedBranch.nextCheckpoint || 'FAILED';
            if (currentNode.failedBranch.status === 'FAILED') nextCP = 'FAILED';

            if (nextCP === 'FAILED') {
                uiAlert(currentNode.failedBranch.narrative || "Súlyos kudarc.");
                loadPage('fedelzet_oldal');
                return;
            }

            document.getElementById('loading-overlay').style.display = 'flex';
            callBackend('updateCheckpoint', [{ sessionId: sessionData.sessionId, action: 'CONTINUE_TRAVEL_TO_LOCATION', actionData: { targetNodeId: nextCP } }], function (res) {
                document.getElementById('loading-overlay').style.display = 'none';
                if (res.success && res.sessionData) {
                    renderGameCheckpoint(res.sessionData, res.sessionData.crew[0].currentCheckpoint || nextCP);
                }
            });
        };
        actionsContainer.appendChild(btnF);
    }

    if (!currentNode.successBranch && !currentNode.failedBranch) {
        var btnRet = document.createElement('button');
        btnRet.className = 'btn-primary';
        btnRet.textContent = 'Zárás és Visszatérés';
        btnRet.onclick = function () { loadPage('fedelzet_oldal'); };
        actionsContainer.appendChild(btnRet);
    }
}





// =====================================================================
// THREE.JS MINIGAME (D100 KOCKADOBÁS) INTEGRÁCIÓ
// =====================================================================

// Globális változó az utolsó dobás eredményének
window.lastDiceRollResult = 0;
window.onDiceRollCompleted = null; // Callback a Kalandjátékhoz

// Ez a függvény bármelyik kaland-gombra ráköthető!
function launchDiceRoller(callback) {
    var minigameContainer = document.getElementById('game-minigame-container');
    var minigameFrame = document.getElementById('game-minigame-frame');

    if (!minigameContainer || !minigameFrame) {
        console.error("Nem található a minigame konténer a DOM-ban!");
        return;
    }

    // Callback elmentése
    if (typeof callback === 'function') {
        window.onDiceRollCompleted = callback;
    }

    // Középre igazított elegáns felugró panel
    minigameContainer.style.position = 'fixed';
    minigameContainer.style.top = '50%';
    minigameContainer.style.left = '50%';
    minigameContainer.style.transform = 'translate(-50%, -50%)';
    minigameContainer.style.width = '800px';
    minigameContainer.style.height = '500px';
    minigameContainer.style.maxWidth = '95vw';
    minigameContainer.style.maxHeight = '90vh';
    minigameContainer.style.border = '3px solid #d4af37'; // Arany keret
    minigameContainer.style.borderRadius = '15px';
    minigameContainer.style.zIndex = '1000';
    minigameContainer.style.backgroundColor = 'rgba(100, 10, 15, 0.9)'; // Bársonyvörös, 90% áttetszőség
    minigameContainer.style.backdropFilter = 'blur(10px)'; // Mögötte lévő blur
    minigameContainer.style.boxShadow = '0 0 50px rgba(0,0,0,0.8), 0 0 0 9999px rgba(0,0,0,0.6)'; // Külső sötétítés
    minigameContainer.style.display = 'block';

    // Betöltjük a D100 minijátékot (Lokálisan is működik!)
    minigameFrame.src = 'minigame_dice.html';
    minigameFrame.onload = function () { minigameFrame.contentWindow.focus(); };
}

// Figyeljük a postMessage üzeneteket az iframe-ből
window.addEventListener('message', function (event) {
    if (event.data && event.data.type === 'backendCall') {
        callBackend(event.data.action, event.data.params,
            function (response) {
                if (event.source) {
                    event.source.postMessage({ messageId: event.data.messageId, response: response }, '*');
                }
            },
            function (error) {
                if (event.source) {
                    event.source.postMessage({ messageId: event.data.messageId, error: error }, '*');
                }
            }
        );
        return;
    }

    if (event.data && event.data.source === 'threejs-minigame' && event.data.status === 'COMPLETED') {

        // Visszaállítjuk a kikötő gombot
        var closeIcon = document.querySelector('.header-close-icon');
        if (closeIcon) closeIcon.style.display = 'block';

        // Eltüntetjük a 3D játékot
        var minigameContainer = document.getElementById('game-minigame-container');
        if (minigameContainer) {
            minigameContainer.style.display = 'none';
        }

        if (event.data.gameType === 'FISHING') {
            // Hártyahalászat lezárása
            console.log("Hártyahalászat vége. Típus: " + event.data.exitType);

            var targetPage = event.data.targetPage || (event.data.exitType === 'DESTROYED' ? 'hajomuhely_oldal' : 'fedelzet_oldal');

            if (event.data.exitType === 'DESTROYED') {
                loadPage('hajomuhely_oldal');
                return;
            }

            // Hebok kikötőbe utazó videó (terkeputazas01.mp4) lejátszása és fedelzet_oldal betöltése
            playMediaSequence([{
                video_url: 'https://storage.googleapis.com/kalozsziget-assets/videos/terkeputazas01.mp4',
                fallback_image: ''
            }], function () {
                console.log("Hebok kikötőbe utazás videó sikeresen lejátszva.");
                loadPage(targetPage);
            });
            return;
        }

        console.log("Kockadobás sikeresen befejeződött! Eredmény: " + event.data.finalScore);
        // Töltőképernyő bekapcsolása amíg a szerverre mentünk
        document.getElementById('loading-overlay').style.display = 'flex';

        // 1. Mentés a Google Sheets-be (I oszlop) a biztonság és perzisztencia érdekében!
        callBackend('saveDiceRoll', [event.data.finalScore],
            // Sikeres lefutás
            function (response) {
                var loader = document.getElementById('loading-overlay');
                if (loader) loader.style.display = 'none';

                if (response && response.success) {
                    console.log("Szerver válasza: " + response.message);
                } else {
                    console.error("Hiba a dobás mentésekor a szerverre!", response);
                }

                window.lastDiceRollResult = event.data.finalScore;
                if (typeof window.onDiceRollCompleted === 'function') {
                    window.onDiceRollCompleted(window.lastDiceRollResult);
                    window.onDiceRollCompleted = null;
                }
            },
            // Hiba esetén
            function (err) {
                var loader = document.getElementById('loading-overlay');
                if (loader) loader.style.display = 'none';
                console.error("FATAL: Nem sikerült elérni a szervert vagy a mentés összeomlott!", err);

                // Azért lokálisan tovább engedjük a játékost, hogy ne akadjon el!
                window.lastDiceRollResult = event.data.finalScore;
                if (typeof window.onDiceRollCompleted === 'function') {
                    window.onDiceRollCompleted(window.lastDiceRollResult);
                    window.onDiceRollCompleted = null;
                }
            });
    }
});




/* ==========================================================================
   === 3D KIKÖTŐ & FEDÉLZET LÁTKÉP ENGINE (Three.js WebGL & 2D Fallback) ===
   ========================================================================== */

function isWebGLAvailable() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

let kikoto3DRunning = false;
let kikotoAnimFrameId = null;
let kikotoCleanupCallbacks = [];

function cleanupKikotoOldal() {
    kikoto3DRunning = false;
    if (kikotoAnimFrameId) {
        cancelAnimationFrame(kikotoAnimFrameId);
        kikotoAnimFrameId = null;
    }
    kikotoCleanupCallbacks.forEach(function (cb) {
        try { cb(); } catch (e) { console.warn('Kikoto cleanup error:', e); }
    });
    kikotoCleanupCallbacks = [];

    var container = document.getElementById('webgl-canvas-container');
    if (container) {
        container.innerHTML = '';
    }
    var tooltip = document.getElementById('interactive-tooltip');
    if (tooltip) {
        tooltip.classList.remove('visible');
    }
    var overlay = document.getElementById('scene-transition-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}
window.cleanupKikotoOldal = cleanupKikotoOldal;

function initializeKikotoOldal() {
    var canvasContainer = document.getElementById('webgl-canvas-container');
    var container2D = document.getElementById('kikoto-2d-container');
    var loadingOverlay = document.getElementById('loading-overlay');
    var kContent = document.getElementById('kikoto_oldal-content');
    if (kContent) kContent.style.display = 'block';
    var kSplash = document.getElementById('kikoto_oldal-splash');
    if (kSplash) kSplash.style.display = 'none';

    if (!isWebGLAvailable()) {
        console.warn("⚠️ WebGL nem támogatott a böngészőben! 2D Fallback Kikötő felület aktiválva.");
        if (canvasContainer) canvasContainer.style.display = 'none';
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (container2D) container2D.style.display = 'block';
        return;
    }

    // Ha a 3D kikötő már inicializálva van és él a jelenet, nem töröljük le!
    if (window._kikoto3DInitialized && window._kikotoScene) {
        if (container2D) container2D.style.display = 'none';
        if (canvasContainer) canvasContainer.style.display = 'block';
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (typeof window._kikotoResizeHandler === 'function') {
            window._kikotoResizeHandler();
        }
        return;
    }

    if (window._kikoto3DLoading) {
        return;
    }
    window._kikoto3DLoading = true;

    // WebGL támogatott: 3D indítása
    if (container2D) container2D.style.display = 'none';
    if (canvasContainer) canvasContainer.style.display = 'block';
    if (typeof showUniversalLoading === 'function') {
        showUniversalLoading("sot_build_3d_harbor");
    }

    Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/loaders/GLTFLoader.js'),
        import('three/addons/environments/RoomEnvironment.js'),
        import('three/addons/objects/Water.js')
    ]).then(function (modules) {
        const THREE = modules[0];
        const { OrbitControls } = modules[1];
        const { GLTFLoader } = modules[2];
        const { RoomEnvironment } = modules[3];
        const { Water } = modules[4];

        window.THREE = THREE;
        runKikoto3DModule(THREE, OrbitControls, GLTFLoader, RoomEnvironment, Water);
    }).catch(function (err) {
        console.error("❌ Hiba a Three.js 3D Kikötő modulok betöltésekor, visszaváltás 2D felületre:", err);
        window._kikoto3DLoading = false;
        window._kikoto3DInitialized = false;
        if (canvasContainer) canvasContainer.style.display = 'none';
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (container2D) container2D.style.display = 'block';
    });
}
window.initializeKikotoOldal = initializeKikotoOldal;
window.initKikotoOldal = initializeKikotoOldal;

function tryGoToDeck() {
    if (typeof openFedelzetModal === 'function') {
        openFedelzetModal();
    } else if (typeof window.openFedelzetModal === 'function') {
        window.openFedelzetModal();
    } else if (window.parent && typeof window.parent.openFedelzetModal === 'function') {
        window.parent.openFedelzetModal();
    } else if (typeof loadPage === 'function') {
        loadPage('fedelzet_oldal');
    }
}
window.tryGoToDeck = tryGoToDeck;

function runKikoto3DModule(THREE, OrbitControls, GLTFLoader, RoomEnvironment, Water) {
    kikoto3DRunning = true;

    // Globális Three.js referencia a Toolbox és segédeszközök számára
    window.THREE = THREE;

    let scene, camera, renderer, controls;
    let harborModel = null;
    let water = null;
    let defaultCameraPos = new THREE.Vector3();
    let defaultTargetPos = new THREE.Vector3();
    let clock = new THREE.Clock();
    let animationMixer = null;
    let foamRingMesh = null;
    let cranePadMesh = null;
    let cranePadBaseRotation = null;
    let palmTreesList = [];
    let cegerMesh = null;
    let cegerBaseRotation = null;
    let palmBokorMesh = null;
    let palmBokorBaseRotation = null;
    let boatGroup = null;
    let boatBasePos = new THREE.Vector3(-35.3, 0.10, -7.55);
    let boatBaseRot = new THREE.Euler(0, Math.PI / 2, 0);
    let pirateShipGroup = null;
    let pirateShipBasePos = new THREE.Vector3(-45.0, -0.40, -13.3);
    let pirateShipBaseRot = new THREE.Euler(0, Math.PI / 2, 0);
    let smallShipGroup = null;
    let smallShipBasePos = new THREE.Vector3(-44.6, -0.40, 14.7);
    let smallShipBaseRot = new THREE.Euler(0, Math.PI / 2, 0);
    let repairShipGroup = null;
    let repairShipBasePos = new THREE.Vector3(-35.7, -0.40, -27.9);
    let repairShipBaseRot = new THREE.Euler(0, -Math.PI / 2 - THREE.MathUtils.degToRad(40), 0);
    let steampunkBoat2Group = null;
    let steampunkBoat2BasePos = new THREE.Vector3(-33.5, 0.25, 10.4);
    let steampunkBoat2BaseRot = new THREE.Euler(0, Math.PI, 0);
    let steampunkBoat3Group = null;
    let steampunkBoat3BasePos = new THREE.Vector3(-33.8, 0.25, 5.7);
    let steampunkBoat3BaseRot = new THREE.Euler(0, Math.PI, 0);
    let rowBoat1Group = null;
    let rowBoat1BasePos = new THREE.Vector3(-21.5, 0.00, 27.1);
    let rowBoat1BaseRot = new THREE.Euler(0, Math.PI / 2, 0);
    let rowBoat2Group = null;
    let rowBoat2BasePos = new THREE.Vector3(-20.4, 0.00, -31.9);
    let rowBoat2BaseRot = new THREE.Euler(0, Math.PI / 2, 0);
    let brownBoat1Group = null;
    let brownBoat1BasePos = new THREE.Vector3(-13.0, 0.00, -34.5);
    let brownBoat1BaseRot = new THREE.Euler(0, Math.PI / 4, 0);
    let brownBoat2Group = null;
    let brownBoat2BasePos = new THREE.Vector3(-29.0, 0.00, 20.3);
    let brownBoat2BaseRot = new THREE.Euler(0, Math.PI / 2 + THREE.MathUtils.degToRad(10), 0);
    let greyBoatGroup = null;
    let greyBoatBasePos = new THREE.Vector3(-11.5, 0.00, 30.9);
    let greyBoatBaseRot = new THREE.Euler(0, Math.PI / 4, 0);

    // Víz alatti és találkozási hullám rendszerek
    let boatRipplesList = [];
    let boatRipplesGroup = null;
    let boatReflectionsList = [];
    let boatReflectionsGroup = null;

    // ─── INTERAKTÍV ÉPÜLETEK ÉS HELYSZÍNVÁLASZTÓ MOTOR ───────────────────────────
    const raycaster = new THREE.Raycaster();
    const mousePointer = new THREE.Vector2();
    let interactiveLocations = [];
    let currentHoveredLocation = null;
    let isCinematicTransitioning = false;
    let isModalOpen = false;
    let cinematicStartTime = 0;
    let cinematicDuration = 1.2; // másodperc
    let cinematicStartCamPos = new THREE.Vector3();
    let cinematicStartLookAt = new THREE.Vector3();
    let cinematicEndCamPos = new THREE.Vector3();
    let cinematicEndLookAt = new THREE.Vector3();
    let pointerDownPos = { x: 0, y: 0 };
    let pointerDownTime = 0;

    /**
     * Nyelvi fordítás dinamikus lekérdezése (web_fordito.js / parent ablak alapján)
     */
    function getLocalizedText(langKey, fallback) {
        try {
            if (window.t && typeof window.t === 'function') {
                const res = window.t(langKey);
                if (res && res !== langKey) return res;
            }
            if (window.parent && window.parent.t && typeof window.parent.t === 'function') {
                const res = window.parent.t(langKey);
                if (res && res !== langKey) return res;
            }
        } catch (e) {
            console.warn("Nyelvi fordítás sikertelen:", e);
        }
        return fallback;
    }

    /**
     * Épület hover derengés / emissive kiemelés aktiválása
     */
    function applyHighlight(meshes) {
        if (!meshes || meshes.length === 0) return;
        meshes.forEach(mesh => {
            if (!mesh || !mesh.material) return;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach(mat => {
                if (!mat) return;
                if (mat._origEmissive === undefined) {
                    mat._origEmissive = mat.emissive ? mat.emissive.clone() : new THREE.Color(0x000000);
                    mat._origEmissiveIntensity = (mat.emissiveIntensity !== undefined) ? mat.emissiveIntensity : 0.0;
                }
                if (mat.emissive) {
                    // Finom, diszkrét tengerkék derengés
                    mat.emissive.set(0x183b48);
                    mat.emissiveIntensity = 0.32;
                    mat.needsUpdate = true;
                }
            });
        });
    }

    /**
     * Épület hover derengés visszaállítása alapállapotra
     */
    function removeHighlight(meshes) {
        if (!meshes || meshes.length === 0) return;
        meshes.forEach(mesh => {
            if (!mesh || !mesh.material) return;
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach(mat => {
                if (!mat || mat._origEmissive === undefined) return;
                if (mat.emissive) {
                    mat.emissive.copy(mat._origEmissive);
                    mat.emissiveIntensity = mat._origEmissiveIntensity;
                    mat.needsUpdate = true;
                }
            });
        });
    }

    /**
     * Dinamikus Modál Állapot Vizsgálat (Garantálja, hogy nyitott felugró ablak esetén ne kattintsunk a színtérre)
     */
    function isAnyModalOpen() {
        const modalEls = document.querySelectorAll('#universal-npc-modal, #toborzo-modal, #fedelzet-modal, #info-modal, #monk-pin-modal, #system-message-modal, #log-entry-modal, .gamemode-modal');
        let openFound = false;
        for (let i = 0; i < modalEls.length; i++) {
            const m = modalEls[i];
            if (m && m.style.display && m.style.display !== 'none') {
                openFound = true;
                break;
            }
        }
        if (!openFound) {
            isModalOpen = false;
            return false;
        }
        return true;
    }

    /**
     * Kurzor mozgatás & Épület Raycast Hover Eseménykezelő
     */
    function onPointerMove(e) {
        if (isCinematicTransitioning || isAnyModalOpen()) {
            if (currentHoveredLocation) {
                removeHighlight(currentHoveredLocation.meshes);
                currentHoveredLocation = null;
            }
            const tooltipEl = document.getElementById('interactive-tooltip');
            if (tooltipEl) tooltipEl.classList.remove('visible');
            document.body.style.cursor = 'default';
            return;
        }

        // 1. Pontos Normalizált Eszközkoordináta (NDC) a WebGL vászon tényleges mérete és elhelyezkedése alapján
        const rect = (renderer && renderer.domElement) ? renderer.domElement.getBoundingClientRect() : null;
        if (rect && rect.width > 0 && rect.height > 0) {
            mousePointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mousePointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        } else {
            mousePointer.x = (e.clientX / window.innerWidth) * 2 - 1;
            mousePointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
        }

        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) {
            tooltipEl.style.left = e.clientX + 'px';
            tooltipEl.style.top = e.clientY + 'px';
        }

        if (!camera || !scene) return;

        raycaster.setFromCamera(mousePointer, camera);

        // 2. Valódi 3D Mélységi Keresés: a kamerához legközelebb lévő legelső felület (minimum distance) kiválasztása
        let closestHit = null;
        let closestLoc = null;

        for (let i = 0; i < interactiveLocations.length; i++) {
            const loc = interactiveLocations[i];
            if (!loc.meshes || loc.meshes.length === 0) continue;
            const intersects = raycaster.intersectObjects(loc.meshes, true);
            if (intersects.length > 0) {
                const firstHit = intersects[0];
                if (!closestHit || firstHit.distance < closestHit.distance) {
                    closestHit = firstHit;
                    closestLoc = loc;
                }
            }
        }

        let hovered = closestLoc;

        if (hovered !== currentHoveredLocation) {
            if (currentHoveredLocation) {
                removeHighlight(currentHoveredLocation.meshes);
            }
            if (hovered) {
                applyHighlight(hovered.meshes);
                const labelText = getLocalizedText(hovered.langKey, hovered.defaultLabel);
                const tooltipTextEl = document.getElementById('tooltip-text');
                if (tooltipTextEl) tooltipTextEl.textContent = labelText;
                if (tooltipEl) tooltipEl.classList.add('visible');
                document.body.style.cursor = 'pointer';
            } else {
                if (tooltipEl) tooltipEl.classList.remove('visible');
                document.body.style.cursor = 'default';
            }
            currentHoveredLocation = hovered;
        }
    }

    /**
     * Kattintás indítás (Kamera drag vs kattintás megkülönböztetéshez)
     */
    function onPointerDown(e) {
        if (isCinematicTransitioning || isAnyModalOpen()) return;
        pointerDownPos = { x: e.clientX, y: e.clientY };
        pointerDownTime = performance.now();
    }

    /**
     * Kattintás befejezés & Épületre fókuszáló átmenet elindítása
     */
    function onPointerUp(e) {
        if (isCinematicTransitioning || isAnyModalOpen()) return;
        const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
        const timeDiff = performance.now() - pointerDownTime;

        // Csak akkor aktiváljuk, ha tiszta kattintás történt (nem kameramozgatási húzás)
        if (dist < 8 && timeDiff < 600 && currentHoveredLocation) {
            triggerLocationTransition(currentHoveredLocation);
        }
    }

    /**
     * Filmes kameraközelítés és sötétedő átmenet aktiválása a kiválasztott épületre
     */
    function triggerLocationTransition(location) {
        if (isCinematicTransitioning) return;
        isCinematicTransitioning = true;

        // Kurzor és tooltip azonnali elrejtése
        document.body.style.cursor = 'default';
        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) tooltipEl.classList.remove('visible');

        // OrbitControls interakciók kikapcsolása
        if (controls) controls.enabled = false;

        // Képernyő elsötétülés indítása
        const overlay = document.getElementById('scene-transition-overlay');
        if (overlay) overlay.classList.add('active');

        // Kameramozgás kezdő- és célpontjai
        cinematicStartTime = clock.getElapsedTime();
        cinematicStartCamPos.copy(camera.position);
        cinematicStartLookAt.copy(controls ? controls.target : defaultTargetPos);

        cinematicEndCamPos.copy(location.camTargetPos);
        cinematicEndLookAt.copy(location.lookAtTarget);

        // Aloldal vagy funkció meghívása a filmes átmenet végén
        setTimeout(() => {
            navigateToSubpage(location);
        }, 1100);
    }

    /**
     * Cél aloldal vagy funkció meghívása a központi rendszeren keresztül
     */
    function navigateToSubpage(target) {
        const pageId = (typeof target === 'object' && target.id) ? target.id : target;
        console.log("⚓ 3D Kikötő: Cél aloldal / funkció meghívása ->", pageId);

        // 1. Univerzális NPC modal megnyitása felöltöztetett konfigurációval
        if (typeof target === 'object' && target.npcId && target.npcConfig) {
            isModalOpen = true;
            // Kameraállás azonnali visszaállítása az alapértelmezett kikötői pozícióra
            if (defaultCameraPos && defaultTargetPos) {
                camera.position.copy(defaultCameraPos);
                if (controls) {
                    controls.target.copy(defaultTargetPos);
                    controls.update();
                    controls.enabled = true;
                }
            }

            if (window.parent && window.parent !== window && typeof window.parent.openUniversalNPC === 'function') {
                window.parent.openUniversalNPC(target.npcId, target.npcConfig);
            } else if (typeof window.openUniversalNPC === 'function') {
                window.openUniversalNPC(target.npcId, target.npcConfig);
            }
            const overlay = document.getElementById('scene-transition-overlay');
            if (overlay) overlay.classList.remove('active');
            isCinematicTransitioning = false;
            return;
        }

        // 2. Toborzóbarakk modal megnyitása
        if (pageId === 'openToborzoBarakk') {
            isModalOpen = true;
            // Kameraállás azonnali visszaállítása az alapértelmezett kikötői pozícióra
            if (defaultCameraPos && defaultTargetPos) {
                camera.position.copy(defaultCameraPos);
                if (controls) {
                    controls.target.copy(defaultTargetPos);
                    controls.update();
                    controls.enabled = true;
                }
            }

            if (window.parent && window.parent !== window && typeof window.parent.openToborzoBarakk === 'function') {
                window.parent.openToborzoBarakk();
            } else if (typeof window.openToborzoBarakk === 'function') {
                window.openToborzoBarakk();
            }
            const overlay = document.getElementById('scene-transition-overlay');
            if (overlay) overlay.classList.remove('active');
            isCinematicTransitioning = false;
            return;
        }

        // 3. Fedélzet modal megnyitása
        if (pageId === 'openFedelzetModal') {
            isModalOpen = true;
            // Kameraállás azonnali visszaállítása az alapértelmezett kikötői pozícióra
            if (defaultCameraPos && defaultTargetPos) {
                camera.position.copy(defaultCameraPos);
                if (controls) {
                    controls.target.copy(defaultTargetPos);
                    controls.update();
                    controls.enabled = true;
                }
            }

            if (typeof window.openFedelzetModal === 'function') {
                window.openFedelzetModal();
            } else if (typeof openFedelzetModal === 'function') {
                openFedelzetModal();
            } else if (typeof loadPage === 'function') {
                loadPage('fedelzet_oldal');
            }
            const overlay = document.getElementById('scene-transition-overlay');
            if (overlay) overlay.classList.remove('active');
            isCinematicTransitioning = false;
            return;
        }

        // 4. Hagyományos aloldal betöltése
        if (typeof resetKikotoViewport === 'function') {
            resetKikotoViewport();
        } else {
            const overlay = document.getElementById('scene-transition-overlay');
            if (overlay) overlay.classList.remove('active');
            isCinematicTransitioning = false;
            if (defaultCameraPos && defaultTargetPos && camera) {
                camera.position.copy(defaultCameraPos);
                if (controls) {
                    controls.target.copy(defaultTargetPos);
                    controls.update();
                    controls.enabled = true;
                }
            }
        }

        if (window.parent && window.parent !== window && typeof window.parent.loadPage === 'function') {
            window.parent.loadPage(pageId);
        } else if (typeof window.loadPage === 'function') {
            window.loadPage(pageId);
        } else {
            window.location.href = pageId + '.html';
        }
    }

    // ─── UNIVERZÁLIS NPC & TOBORZÓ MODAL VEZÉRLÉS (STANDALONE & BEÁGYAZOTT TÁMOGATÁS) ─────────────
    window.ACTIVE_NPC_CONFIG = {};

    window.closeUniversalNPCModal = function (e) {
        if (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        var portraitVideo = document.getElementById('npc-portrait-video');
        if (portraitVideo) {
            try { portraitVideo.pause(); } catch (err) { }
        }
        var audioBtn = document.getElementById('npc-portrait-audio-btn');
        if (audioBtn) audioBtn.style.display = 'none';

        document.querySelectorAll('#universal-npc-modal').forEach(function (m) {
            m.style.display = 'none';
        });
        const overlay = document.getElementById('scene-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
        }
        if (defaultCameraPos && defaultTargetPos && camera && defaultCameraPos.length() > 0) {
            camera.position.copy(defaultCameraPos);
            if (controls) {
                controls.target.copy(defaultTargetPos);
                controls.update();
                controls.enabled = true;
            }
        } else if (controls) {
            controls.enabled = true;
            controls.update();
        }
        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) tooltipEl.classList.remove('visible');
        if (interactiveLocations) {
            interactiveLocations.forEach(function (loc) {
                removeHighlight(loc.meshes);
            });
        }
        document.body.style.cursor = 'default';
        pointerDownTime = 0;
        currentHoveredLocation = null;
        isModalOpen = false;
        isCinematicTransitioning = false;
    };

    window.closeToborzoModal = function (e) {
        if (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        var vid = document.getElementById('toborzo-video-player');
        if (vid) {
            try { vid.pause(); } catch (err) { }
        }
        var cMunk = document.getElementById('toborzo-console-munkavallalo');
        var cKap = document.getElementById('toborzo-console-kapitany');
        if (cMunk) cMunk.style.display = 'none';
        if (cKap) cKap.style.display = 'none';

        document.querySelectorAll('.toborzo-brass-nametag-container').forEach(function (el) {
            el.style.display = 'flex';
        });

        document.querySelectorAll('#toborzo-modal').forEach(function (m) {
            m.style.display = 'none';
        });
        const overlay = document.getElementById('scene-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
        }
        if (defaultCameraPos && defaultTargetPos && camera && defaultCameraPos.length() > 0) {
            camera.position.copy(defaultCameraPos);
            if (controls) {
                controls.target.copy(defaultTargetPos);
                controls.update();
                controls.enabled = true;
            }
        } else if (controls) {
            controls.enabled = true;
            controls.update();
        }
        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) tooltipEl.classList.remove('visible');
        if (interactiveLocations) {
            interactiveLocations.forEach(function (loc) {
                removeHighlight(loc.meshes);
            });
        }
        document.body.style.cursor = 'default';
        pointerDownTime = 0;
        currentHoveredLocation = null;
        isModalOpen = false;
        isCinematicTransitioning = false;
    };

    window.sendUniversalMessage = function () {
        var input = document.getElementById('universal-chat-input');
        if (!input) return;
        var msg = input.value.trim();
        if (!msg) return;

        var npcId = (document.getElementById('current-npc-id') && document.getElementById('current-npc-id').value) || 'harbormaster';
        window.addBubbleToUniversal("Te", msg, "outgoing");
        input.value = '';
        input.disabled = true;

        var chatArea = document.getElementById('universal-chat-area');
        var loaderId = "load-" + Date.now();
        var loader = document.createElement('div');
        loader.id = loaderId;
        loader.style.cssText = "font-style: italic; color: #666; margin: 5px 15px;";

        if (window.ACTIVE_NPC_CONFIG && window.ACTIVE_NPC_CONFIG.loaderHTML) {
            loader.innerHTML = window.ACTIVE_NPC_CONFIG.loaderHTML;
        } else {
            var npcName = (document.getElementById('npc-name') && document.getElementById('npc-name').innerText) || "Kikötőmester";
            loader.innerText = npcName + " gondolkodik...";
        }

        if (chatArea) {
            chatArea.appendChild(loader);
            chatArea.scrollTop = chatArea.scrollHeight;
        }

        if (typeof window.callBackend === 'function') {
            window.callBackend('handleNPCInteraction', [npcId, msg, "CHAT"],
                function (response) {
                    var l = document.getElementById(loaderId);
                    if (l) l.remove();
                    input.disabled = false;
                    input.focus();
                    window.handleUniversalResponse(response);
                },
                function (err) {
                    var l = document.getElementById(loaderId);
                    if (l) l.remove();
                    input.disabled = false;
                    window.addBubbleToUniversal("Rendszer", "Hiba: " + err.message, "system");
                }
            );
        } else {
            setTimeout(function () {
                var l = document.getElementById(loaderId);
                if (l) l.remove();
                input.disabled = false;
                input.focus();
                window.addBubbleToUniversal("Barba Negra", "Üdv a Kikötőben! A tenger ma csendes, a legénység készen áll.", "incoming");
            }, 800);
        }
    };

    window.addBubbleToUniversal = function (sender, text, type) {
        var chatArea = document.getElementById('universal-chat-area');
        if (!chatArea) return;
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
    };

    window.handleUniversalResponse = function (response) {
        if (!response) return;
        var text = typeof response === 'string' ? response : (response.text || response.message || JSON.stringify(response));
        var name = (window.currentNPCConfig && window.currentNPCConfig.name) || 'NPC';
        window.addBubbleToUniversal(name, text, "incoming");
    };

    // ─── TOBORZÓBARAKK LOGIKA (INTERAKTÍV SVG + MP4 ANIMÁCIÓ + KIBER KONZOLOK) ───────────────────────────
    window.toborzoOwnedShips = [];
    window.toborzoAvailableCrew = [];

    window.initToborzoSvgInteractions = function () {
        var svg = document.getElementById('toborzo-interactive-svg');
        var tooltip = document.getElementById('toborzo-tooltip');
        var tooltipText = document.getElementById('toborzo-tooltip-text');
        var stage = document.getElementById('toborzo-stage-container');
        if (!svg || !tooltip || !tooltipText || !stage) return;
        if (svg._interactionsInitialized) return;
        svg._interactionsInitialized = true;

        var titles = {
            'kepernyo_bal': '🛠️ Munkavállalói Konzol',
            'kepernyo_jobb': '🚢 Kapitányi Konzol',
            'kepernyo_kozepfel': '📡 Álláshirdetések & Nyitott Pozíciók',
            'kepernyo_kozeple': '📜 Szabadúszó Zsoldosok & Ajánlattétel'
        };

        var paths = svg.querySelectorAll('.toborzo-screen-path');
        paths.forEach(function (p) {
            p.removeAttribute('title');
            p.addEventListener('mouseenter', function () {
                var text = titles[p.id] || '';
                if (text) {
                    tooltipText.textContent = text;
                    tooltip.style.display = 'block';
                    tooltip.style.opacity = '1';
                }
            });
            p.addEventListener('mousemove', function (e) {
                var rect = stage.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                tooltip.style.left = x + 'px';
                tooltip.style.top = y + 'px';
            });
            p.addEventListener('mouseleave', function () {
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
            });
        });
    };

    window.openToborzoConsole = function (type) {
        var cMunk = document.getElementById('toborzo-console-munkavallalo');
        var cKap = document.getElementById('toborzo-console-kapitany');
        var cHird = document.getElementById('toborzo-console-hirdetesek');
        var cZsol = document.getElementById('toborzo-console-zsoldosok');
        var tooltip = document.getElementById('toborzo-tooltip');
        if (tooltip) tooltip.style.display = 'none';

        // Névtábla elrejtése a konzolok felugrásakor
        document.querySelectorAll('.toborzo-brass-nametag-container').forEach(function (el) {
            el.style.display = 'none';
        });

        if (cMunk) cMunk.style.display = (type === 'munkavallalo') ? 'flex' : 'none';
        if (cKap) cKap.style.display = (type === 'kapitany') ? 'flex' : 'none';
        if (cHird) cHird.style.display = (type === 'hirdetesek') ? 'flex' : 'none';
        if (cZsol) cZsol.style.display = (type === 'zsoldosok') ? 'flex' : 'none';

        if (type === 'kapitany' && typeof window.renderSelectedShipCrew === 'function') {
            window.renderSelectedShipCrew();
        }
    };

    window.closeToborzoConsole = function () {
        var cMunk = document.getElementById('toborzo-console-munkavallalo');
        var cKap = document.getElementById('toborzo-console-kapitany');
        var cHird = document.getElementById('toborzo-console-hirdetesek');
        var cZsol = document.getElementById('toborzo-console-zsoldosok');
        if (cMunk) cMunk.style.display = 'none';
        if (cKap) cKap.style.display = 'none';
        if (cHird) cHird.style.display = 'none';
        if (cZsol) cZsol.style.display = 'none';

        if (typeof window.closeToborzoSubmodals === 'function') {
            window.closeToborzoSubmodals();
        }

        // Névtábla megjelenítése kizárólag az SVG felületen
        document.querySelectorAll('.toborzo-brass-nametag-container').forEach(function (el) {
            el.style.display = 'flex';
        });
    };

    window.hasRequiredRank = function (playerRank, role) {
        var rankHierarchy = [
            '4. osztályú kalóz', '3. osztályú kalóz', '2. osztályú kalóz', '1. osztályú kalóz',
            'Alhajómester', 'Törzshajómester', 'Törzsfőhajómester',
            'Tengerész-hadapród', 'Korvetthadnagy', 'Fregatthadnagy', 'Sorhajóhadnagy',
            'Korvettkapitány', 'Fregattkapitány', 'Sorhajókapitány',
            'Ellentengernagy', 'Altengernagy', 'Tengernagy', 'Főtengernagy'
        ];
        var szakmaiTisztek = ['Hajóorvos', 'Hajószakács', 'Térképrajzoló', 'Tekercsmester', 'Felfedező', 'Letmester', 'Monk'];
        var parancsnokiTisztek = ['Navigátor', 'Kormányos', 'Vitorlamester', 'Fedélzetmester', 'Gépész'];

        var playerIdx = rankHierarchy.indexOf(playerRank);
        if (playerIdx === -1) playerIdx = 0;

        var requiredIdx = 0;
        if (role === 'Kapitány') {
            requiredIdx = 11;
        } else if (parancsnokiTisztek.indexOf(role) !== -1) {
            requiredIdx = 7;
        } else if (szakmaiTisztek.indexOf(role) !== -1) {
            requiredIdx = 4;
        }
        return playerIdx >= requiredIdx;
    };

    window.openToborzoBarakk = function () {
        var modal = document.getElementById('toborzo-modal');
        if (modal) modal.style.display = 'flex';

        // Reset consoles and start video
        window.closeToborzoConsole();
        if (typeof window.initToborzoSvgInteractions === 'function') {
            window.initToborzoSvgInteractions();
        }

        var vid = document.getElementById('toborzo-video-player');
        if (vid) {
            try {
                vid.currentTime = 0;
                var p = vid.play();
                if (p && p.catch) p.catch(function () { });
            } catch (e) { }
        }

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            var loadFallback = function () {
                window.callBackend('getToborzoData', [],
                    function (fbData) {
                        if (loadingEl) loadingEl.style.display = 'none';
                        if (fbData && fbData.success) {
                            window.toborzoMarketData = fbData;
                            window.toborzoOwnedShips = fbData.ownedShips || [];
                            window.toborzoAvailableCrew = fbData.availableCrew || [];
                            window.toborzoNameDict = fbData.nameDict || {};
                            window.toborzoGameScrolls = fbData.gameScrolls || fbData.availableScrolls || [];
                            window.renderToborzoFullMarket(fbData);
                            window.renderSelectedShipCrew();
                        }
                    },
                    function (fbErr) {
                        if (loadingEl) loadingEl.style.display = 'none';
                        console.warn('ToborzoData fallback lekérdezési hiba:', fbErr);
                    }
                );
            };

            window.callBackend('getToborzoFullMarketData', [],
                function (data) {
                    if (data && data.success) {
                        if (loadingEl) loadingEl.style.display = 'none';
                        window.toborzoMarketData = data;
                        window.toborzoOwnedShips = data.ownedShips || [];
                        window.toborzoAvailableCrew = data.availableCrew || [];
                        window.toborzoNameDict = data.nameDict || {};
                        window.toborzoGameScrolls = data.gameScrolls || data.availableScrolls || [];
                        window.renderToborzoFullMarket(data);
                        window.renderSelectedShipCrew();
                    } else {
                        loadFallback();
                    }
                },
                function (err) {
                    loadFallback();
                }
            );
        } else {
            setTimeout(function () {
                if (loadingEl) loadingEl.style.display = 'none';
            }, 300);
        }
    };

    window.renderToborzoFullMarket = function (data) {
        if (!data) return;

        // 1. Bal Monitor: Munkavállaló adatok és Kapott állásajánlatok
        if (data.playerStatus) {
            var stSelect = document.getElementById('toborzo-status-select');
            var rSelect = document.getElementById('toborzo-role-select');
            var cInput = document.getElementById('toborzo-cost-input');
            if (stSelect) stSelect.value = data.playerStatus.status || "Keresek munkát";
            if (rSelect) rSelect.value = data.playerStatus.role || "";
            if (cInput && data.playerStatus.cost !== undefined) cInput.value = data.playerStatus.cost;
        }

        var offersList = document.getElementById('toborzo-incoming-offers-list');
        var offersCount = document.getElementById('toborzo-incoming-offers-count');
        if (offersList) {
            var incoming = data.incomingOffers || [];
            if (offersCount) offersCount.textContent = incoming.length + ' db';
            if (incoming.length === 0) {
                offersList.innerHTML = '<div style="color: #78909c; font-style: italic; font-size: 0.85em; padding: 6px;">Jelenleg nincs függőben lévő ajánlatod.</div>';
            } else {
                offersList.innerHTML = '';
                incoming.forEach(function (offer) {
                    var card = document.createElement('div');
                    card.className = 'cyber-card';
                    card.style.cssText = 'margin-bottom: 8px; padding: 10px;';

                    var isPending = (offer.statusz === 'Függőben');
                    var badgeClass = isPending ? 'cyber-badge-gold' : (offer.statusz === 'Elfogadva' ? 'cyber-badge-cyan' : 'cyber-badge-danger');

                    var html = '<div style="display: flex; justify-content: space-between; align-items: flex-start;">' +
                        '<div>' +
                        '<strong style="color: #00ffcc; font-size: 0.95em;">' + (offer.hajoNev || 'Hajó') + '</strong>' +
                        '<div style="color: #d4af37; font-size: 0.85em; font-weight: bold; margin-top: 2px;">Tisztség: ' + (offer.pozicio || '-') + '</div>' +
                        '<div style="color: #90a4ae; font-size: 0.8em; margin-top: 2px;">Kapitány: ' + (offer.kapitanyNev || offer.kapitanyEmail || '-') + '</div>' +
                        '<div style="color: #b0bec5; font-size: 0.78em; margin-top: 2px;">' + (offer.megjegyzes || (offer.idotartam ? (offer.idotartam + ' hónapra') : '')) + '</div>' +
                        '</div>' +
                        '<div><span class="cyber-badge ' + badgeClass + '">' + (offer.statusz || 'Függőben') + '</span></div>' +
                        '</div>';

                    if (isPending) {
                        html += '<div style="display: flex; gap: 8px; margin-top: 8px;">' +
                            '<button type="button" class="cyber-btn-sm cyber-btn-success" onclick="window.respondToJobOffer(\'' + offer.id + '\', true)" style="flex: 1;"><i class="fas fa-check"></i> Elfogadom</button>' +
                            '<button type="button" class="cyber-btn-sm cyber-btn-danger" onclick="window.respondToJobOffer(\'' + offer.id + '\', false)" style="flex: 1;"><i class="fas fa-times"></i> Nem fogadom el</button>' +
                            '</div>';
                    }
                    card.innerHTML = html;
                    offersList.appendChild(card);
                });
            }
        }

        // 2. Jobb Monitor: Kapitány hajóválasztó és Beérkezett jelentkezők
        var myshipsSelect = document.getElementById('toborzo-myships-select');
        if (myshipsSelect) {
            var currentVal = myshipsSelect.value;
            myshipsSelect.innerHTML = '<option value="">Nincs kiválasztott hajó</option>';
            (data.ownedShips || []).forEach(function (ship) {
                var opt = document.createElement('option');
                opt.value = ship.id;
                opt.textContent = ship.name + (ship.inHarbor ? "" : " (Expedíción)");
                opt.disabled = !ship.inHarbor;
                if (ship.id === currentVal) opt.selected = true;
                myshipsSelect.appendChild(opt);
            });
        }

        var capAppsSection = document.getElementById('toborzo-captain-applicants-section');
        var capAppsList = document.getElementById('toborzo-captain-applicants-list');
        var capAppsCount = document.getElementById('toborzo-captain-applicants-count');
        if (capAppsSection && capAppsList) {
            var applicants = data.captainApplicants || [];
            capAppsSection.style.display = (data.ownedShips && data.ownedShips.length > 0) ? 'block' : 'none';
            if (capAppsCount) capAppsCount.textContent = applicants.length + ' db';
            if (applicants.length === 0) {
                capAppsList.innerHTML = '<div style="color: #78909c; font-style: italic; font-size: 0.85em; padding: 6px;">Nincsenek elbírálásra váró jelentkezők.</div>';
            } else {
                capAppsList.innerHTML = '';
                applicants.forEach(function (app) {
                    var card = document.createElement('div');
                    card.className = 'cyber-card';
                    card.style.cssText = 'margin-bottom: 8px; padding: 10px;';
                    var isPending = (app.statusz === 'Függőben');
                    var badgeClass = isPending ? 'cyber-badge-gold' : (app.statusz === 'Elfogadva' ? 'cyber-badge-cyan' : 'cyber-badge-danger');

                    var html = '<div style="display: flex; justify-content: space-between; align-items: flex-start;">' +
                        '<div>' +
                        '<strong style="color: #d4af37; font-size: 0.95em;">' + (app.matrozName || app.matrozEmail) + '</strong>' +
                        '<div style="color: #00e5ff; font-size: 0.85em; margin-top: 2px;">Hajó: ' + (app.hajoNev || '-') + ' &bull; Tisztség: ' + (app.pozicio || '-') + '</div>' +
                        '<div style="color: #90a4ae; font-size: 0.8em; margin-top: 2px;">Képzettség: <strong style="color: #00ffcc;">' + (app.kepzettsegSzazalek || 0) + '%</strong> &bull; Bérigény: <strong style="color: #ffd700;">' + (app.berigeny || 10) + ' KR/hó</strong></div>' +
                        '<div style="color: #78909c; font-size: 0.75em; margin-top: 2px;">Jelentkezés dátuma: ' + (app.datum || '-') + '</div>' +
                        '</div>' +
                        '<div><span class="cyber-badge ' + badgeClass + '">' + (app.statusz || 'Függőben') + '</span></div>' +
                        '</div>';

                    if (isPending) {
                        html += '<div style="display: flex; gap: 8px; margin-top: 8px;">' +
                            '<button type="button" class="cyber-btn-sm cyber-btn-success" onclick="window.reviewJobApplicant(\'' + app.id + '\', true)" style="flex: 1;"><i class="fas fa-check"></i> Elfogadom</button>' +
                            '<button type="button" class="cyber-btn-sm cyber-btn-danger" onclick="window.reviewJobApplicant(\'' + app.id + '\', false)" style="flex: 1;"><i class="fas fa-times"></i> Nem fogadom el</button>' +
                            '</div>';
                    }
                    card.innerHTML = html;
                    capAppsList.appendChild(card);
                });
            }
        }

        // 3. Közép-Felső Monitor: Álláshirdetések és aktív szolgálat kapuőr
        var dutyWarning = document.getElementById('toborzo-duty-warning');
        if (dutyWarning) {
            dutyWarning.style.display = data.hasActiveDuty ? 'block' : 'none';
        }

        var jobList = document.getElementById('toborzo-job-postings-list');
        if (jobList) {
            var postings = data.activeJobPostings || [];
            if (postings.length === 0) {
                jobList.innerHTML = '<div style="color: #78909c; font-style: italic; font-size: 0.9em; padding: 12px; text-align: center;">Jelenleg nincsenek aktív álláshirdetések a faliújságon.</div>';
            } else {
                jobList.innerHTML = '';
                postings.forEach(function (job) {
                    var card = document.createElement('div');
                    card.className = 'cyber-card';
                    card.style.cssText = 'margin-bottom: 8px; padding: 10px;';

                    var alreadyApplied = (data.userAppliedJobIds && data.userAppliedJobIds.indexOf(job.id) !== -1);
                    var actionHtml = '';
                    if (alreadyApplied) {
                        actionHtml = '<span class="cyber-badge cyber-badge-cyan"><i class="fas fa-check"></i> Jelentkezve</span>';
                    } else if (data.hasActiveDuty) {
                        actionHtml = '<button type="button" class="cyber-btn-sm" disabled style="opacity: 0.5; cursor: not-allowed;" title="Aktív szolgálat miatt lezárva"><i class="fas fa-lock"></i> Szolgálatban</button>';
                    } else {
                        actionHtml = '<button type="button" class="cyber-btn-sm cyber-btn-primary" onclick="window.applyForJobOpening(\'' + job.id + '\')"><i class="fas fa-paper-plane"></i> Jelentkezem</button>';
                    }

                    card.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: flex-start;">' +
                        '<div style="flex: 1;">' +
                        '<strong style="color: #00ffcc; font-size: 1em;">' + (job.hajoNev || 'Hajó') + '</strong>' +
                        '<div style="color: #d4af37; font-size: 0.88em; font-weight: bold; margin-top: 2px;"><i class="fas fa-user-tag"></i> ' + (job.pozicio || '-') + '</div>' +
                        '<div style="color: #90a4ae; font-size: 0.8em; margin-top: 2px;">Kapitány: <span style="color: #cfd8dc;">' + (job.kapitanyNev || '-') + '</span> &bull; Feladva: ' + (job.datum || '-') + '</div>' +
                        '<div style="color: #80cbc4; font-size: 0.82em; margin-top: 4px; background: rgba(0,255,204,0.06); padding: 4px 6px; border-radius: 3px; border-left: 2px solid #00ffcc;">' +
                        '<i class="fas fa-scroll"></i> Küldetés célja: <strong>' + (job.kuldetesCelja || 'Általános szolgálat') + '</strong>' +
                        '</div>' +
                        '</div>' +
                        '<div style="margin-left: 10px; align-self: center;">' + actionHtml + '</div>' +
                        '</div>';
                    jobList.appendChild(card);
                });
            }
        }

        // 4. Közép-Alsó Monitor: Zsoldosok listája
        var mercList = document.getElementById('toborzo-mercenaries-list');
        if (mercList) {
            var mercs = data.availableMercenaries || [];
            if (mercs.length === 0) {
                mercList.innerHTML = '<div style="color: #78909c; font-style: italic; font-size: 0.9em; padding: 12px; text-align: center;">Jelenleg nincsenek munkát kereső szabad matrózok a kikötőben.</div>';
            } else {
                mercList.innerHTML = '';
                mercs.forEach(function (merc) {
                    var card = document.createElement('div');
                    card.className = 'cyber-card';
                    card.style.cssText = 'margin-bottom: 8px; padding: 10px;';

                    var safeEmail = (merc.email || '').replace(/'/g, "\\'");
                    var safeName = (merc.name || '').replace(/'/g, "\\'");
                    var safeRole = (merc.role || '').replace(/'/g, "\\'");
                    var cost = merc.cost || 10;

                    card.innerHTML = '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                        '<div>' +
                        '<strong style="color: #d4af37; font-size: 0.98em;">' + (merc.name || merc.email) + '</strong>' +
                        '<div style="color: #00e5ff; font-size: 0.85em; margin-top: 2px;">Keresett poszt: <strong>' + (merc.role || 'Bármilyen') + '</strong></div>' +
                        '<div style="color: #90a4ae; font-size: 0.8em; margin-top: 2px;">Rang: <span style="color: #cfd8dc;">' + (merc.rank || '-') + '</span></div>' +
                        '<div style="color: #00ffcc; font-size: 0.82em; margin-top: 2px;">Bérigény: <strong>' + cost + ' KR / hó</strong></div>' +
                        '</div>' +
                        '<div>' +
                        '<button type="button" class="cyber-btn-sm cyber-btn-primary" onclick="window.openDirectOfferSubmodal(\'' + safeEmail + '\', \'' + safeName + '\', \'' + safeRole + '\', ' + cost + ')">' +
                        '<i class="fas fa-handshake"></i> Állásajánlat' +
                        '</button>' +
                        '</div>' +
                        '</div>';
                    mercList.appendChild(card);
                });
            }
        }

        // 5. Küldetés tekercsek dropdown feltöltése a Meghirdetés Submodalban
        var missionSelect = document.getElementById('post-job-mission-select');
        if (missionSelect && data.gameScrolls) {
            missionSelect.innerHTML = '<option value="">- Nincs kitűzött küldetés cél (Általános szolgálat) -</option>';
            data.gameScrolls.forEach(function (scroll) {
                if (!scroll) return;
                var opt = document.createElement('option');
                opt.value = scroll;
                opt.textContent = scroll;
                missionSelect.appendChild(opt);
            });
        }
    };

    window.savePlayerJobStatus = function () {
        var stSelect = document.getElementById('toborzo-status-select');
        var rSelect = document.getElementById('toborzo-role-select');
        var cInput = document.getElementById('toborzo-cost-input');

        var status = stSelect ? stSelect.value : 'Keresek munkát';
        var role = rSelect ? rSelect.value : '';
        var cost = cInput ? (parseInt(cInput.value, 10) || 10) : 10;

        if (status === 'Keresek munkát' && !role) {
            if (typeof window.uiAlert === 'function') {
                window.uiAlert("Kérlek, válassz ki egy keresett pozíciót!");
            } else {
                alert("Kérlek, válassz ki egy keresett pozíciót!");
            }
            return;
        }

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('updatePlayerJobStatus', [status, role, cost],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') {
                            window.uiAlert("Státuszod sikeresen mentve! A kapitányok mostantól láthatják a faliújságon.", "Siker");
                        } else {
                            alert("Státuszod sikeresen mentve! A kapitányok mostantól láthatják a faliújságon.");
                        }
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a mentés során: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        } else {
            setTimeout(function () {
                if (loadingEl) loadingEl.style.display = 'none';
                if (typeof window.uiAlert === 'function') {
                    window.uiAlert("Státuszod sikeresen mentve! (Offline szimuláció)", "Siker");
                } else {
                    alert("Státuszod sikeresen mentve! (Offline szimuláció)");
                }
                window.closeToborzoConsole();
            }, 400);
        }
    };

    window.renderSelectedShipCrew = function () {
        var select = document.getElementById('toborzo-myships-select');
        var detailsDiv = document.getElementById('toborzo-myship-details');
        var rolesContainer = document.getElementById('toborzo-myship-roles');

        if (!select || !select.value) {
            if (detailsDiv) detailsDiv.style.display = 'none';
            return;
        }

        var ship = (window.toborzoOwnedShips || []).find(function (s) { return s.id === select.value; });
        if (!ship) return;

        if (detailsDiv) detailsDiv.style.display = 'block';
        if (rolesContainer) rolesContainer.innerHTML = '';

        var formDiv = document.createElement('div');
        formDiv.id = 'bulk-crew-form';

        var allRoles = [
            "Kapitány", "Navigátor", "Kormányos", "Vitorlamester", "Fedélzetmester",
            "Tüzér", "Hajóorvos", "Hajószakács", "Térképrajzoló",
            "Tekercsmester", "Felfedező", "Gépész", "Hajóács",
            "Letmester", "Monk", "Tengerész"
        ];

        var availableCrew = window.toborzoAvailableCrew || [];
        var nameDict = window.toborzoNameDict || (window.toborzoMarketData && window.toborzoMarketData.nameDict) || {};

        var resolvePirateName = function (email) {
            if (!email) return '';
            var lower = String(email).toLowerCase().trim();
            if (nameDict[lower]) return nameDict[lower];
            var match = availableCrew.find(function (c) { return String(c.email).toLowerCase().trim() === lower; });
            if (match && match.name) return match.name;
            return email;
        };

        var sortedCrew = availableCrew.slice().sort(function (a, b) {
            var nameA = resolvePirateName(a.email) || a.name || '';
            var nameB = resolvePirateName(b.email) || b.name || '';
            return nameA.localeCompare(nameB);
        });

        allRoles.forEach(function (role) {
            var isSingle = (role !== 'Tengerész');
            var currentEmails = (ship.crew && ship.crew[role]) ? ship.crew[role].split(',').map(function (e) { return e.trim().toLowerCase(); }).filter(function (e) { return e; }) : [];
            var isVacant = (currentEmails.length === 0);

            var rowDiv = document.createElement('div');
            rowDiv.className = 'cyber-roster-row';

            var roleHeader = document.createElement('div');
            roleHeader.className = 'cyber-roster-role-header';
            roleHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;';

            var roleLabel = document.createElement('strong');
            roleLabel.className = 'cyber-roster-role-label';
            roleLabel.innerHTML = '<i class="fas fa-user-tag" style="color: #00e5ff;"></i> <span style="color: #00e5ff; font-weight: bold;">' + role + '</span>' + (isSingle ? ' <span style="font-size:0.8em; color:#90a4ae; font-family: monospace;">(1 fő)</span>' : ' <span style="font-size:0.8em; color:#90a4ae; font-family: monospace;">(Több fő)</span>');
            roleHeader.appendChild(roleLabel);

            // Ha betöltetlen a pozíció, hozzáadunk egy Meghirdetem gombot
            if (isVacant) {
                var postBtn = document.createElement('button');
                postBtn.type = 'button';
                postBtn.className = 'cyber-btn-sm cyber-btn-primary';
                postBtn.style.cssText = 'padding: 3px 8px; font-size: 0.78em;';
                postBtn.innerHTML = '<i class="fas fa-bullhorn"></i> Meghirdetem';
                postBtn.onclick = (function (sId, sName, rName) {
                    return function (e) {
                        e.stopPropagation();
                        window.openPostJobSubmodal(sId, sName, rName);
                    };
                })(ship.id, ship.name, role);
                roleHeader.appendChild(postBtn);
            }

            rowDiv.appendChild(roleHeader);

            var customSelectContainer = document.createElement('div');
            customSelectContainer.className = 'cyber-custom-select';

            var selectHeader = document.createElement('div');
            selectHeader.className = 'cyber-custom-select-header';

            var currentNamesHtml = "--- Üres ---";
            if (currentEmails.length > 0) {
                var namesArr = currentEmails.map(function (e) {
                    return resolvePirateName(e);
                });
                currentNamesHtml = '<span style="color:#d4af37; font-weight:bold;">' + namesArr.join(', ') + '</span>';
            }

            selectHeader.innerHTML = '<span>' + currentNamesHtml + '</span> <i class="fas fa-chevron-down"></i>';

            var optionsContainer = document.createElement('div');
            optionsContainer.className = 'cyber-custom-options-container bulk-options-container';
            optionsContainer.style.display = 'none';

            selectHeader.onclick = function (e) {
                e.stopPropagation();
                var isVisible = optionsContainer.style.display === 'block';
                document.querySelectorAll('.bulk-options-container').forEach(function (el) { el.style.display = 'none'; });
                optionsContainer.style.display = isVisible ? 'none' : 'block';
            };

            // Checkbox logika
            optionsContainer.addEventListener('change', function (e) {
                if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
                    if (isSingle && e.target.checked) {
                        var allCbs = optionsContainer.querySelectorAll('input[type="checkbox"]');
                        allCbs.forEach(function (cb) {
                            if (cb !== e.target) cb.checked = false;
                        });
                    }
                    var checkedCbs = optionsContainer.querySelectorAll('input[type="checkbox"]:checked');
                    if (checkedCbs.length === 0) {
                        selectHeader.innerHTML = '<span>--- Üres ---</span> <i class="fas fa-chevron-down"></i>';
                    } else {
                        var nArr = [];
                        checkedCbs.forEach(function (cb) {
                            var cName = resolvePirateName(cb.value) || cb.getAttribute('data-name') || cb.value;
                            nArr.push(cName);
                        });
                        selectHeader.innerHTML = '<span><span style="color:#d4af37; font-weight:bold;">' + nArr.join(', ') + '</span></span> <i class="fas fa-chevron-down"></i>';
                    }
                }
            });

            var optionAdded = false;
            currentEmails.forEach(function (currEmail) {
                var dName = resolvePirateName(currEmail);
                var label = document.createElement('label');
                label.className = 'cyber-option-label';
                label.innerHTML = '<input type="checkbox" value="' + currEmail + '" data-role="' + role + '" data-name="' + dName + '" checked> <strong style="color:#d4af37;">' + dName + '</strong>';
                optionsContainer.appendChild(label);
                optionAdded = true;
            });

            sortedCrew.forEach(function (player) {
                if (currentEmails.includes(player.email.toLowerCase())) return;
                if (player.isBusy) return;
                if (!window.hasRequiredRank(player.rank, role)) return;

                var dName = resolvePirateName(player.email) || player.name;
                var label = document.createElement('label');
                label.className = 'cyber-option-label';
                label.innerHTML = '<input type="checkbox" value="' + player.email + '" data-role="' + role + '" data-name="' + dName + '"> ' + dName + ' <span style="color:#888; font-size:0.8em;">(' + (player.rank || '') + ')</span>';
                optionsContainer.appendChild(label);
                optionAdded = true;
            });

            if (!optionAdded) {
                var noMore = document.createElement('div');
                noMore.style.cssText = 'padding: 8px 12px; color: #78909c; font-style: italic; font-size: 0.9em;';
                noMore.innerText = 'Nincs felbérelhető tag erre a posztra.';
                optionsContainer.appendChild(noMore);
            }

            customSelectContainer.appendChild(selectHeader);
            customSelectContainer.appendChild(optionsContainer);
            rowDiv.appendChild(customSelectContainer);
            formDiv.appendChild(rowDiv);
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.bulk-options-container') && !e.target.closest('.cyber-custom-select-header') && !e.target.closest('div[style*="cursor: pointer"]')) {
                document.querySelectorAll('.bulk-options-container').forEach(function (el) { el.style.display = 'none'; });
            }
        });

        var submitBtn = document.createElement('button');
        submitBtn.type = 'button';
        submitBtn.className = 'cyber-btn cyber-btn-primary';
        submitBtn.style.cssText = 'width: 100%; margin-top: 15px;';
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>BEOSZTÁS MENTÉSE ÉS JÓVÁHAGYÁSA</span>';
        submitBtn.onclick = function () { window.submitBulkCrewAssignment(ship.id); };

        if (rolesContainer) {
            rolesContainer.appendChild(formDiv);
            rolesContainer.appendChild(submitBtn);
        }
    };

    window.submitBulkCrewAssignment = function (shipId) {
        var assignmentsMap = {
            "Kapitány": [], "Navigátor": [], "Kormányos": [], "Vitorlamester": [], "Fedélzetmester": [],
            "Tüzér": [], "Hajóorvos": [], "Hajószakács": [], "Térképrajzoló": [],
            "Tekercsmester": [], "Felfedező": [], "Gépész": [], "Hajóács": [],
            "Letmester": [], "Monk": [], "Tengerész": []
        };

        var form = document.getElementById('bulk-crew-form');
        if (!form) return;

        var allChecked = form.querySelectorAll('input[type="checkbox"]:checked');
        allChecked.forEach(function (cb) {
            var role = cb.getAttribute('data-role');
            var email = cb.value;
            if (assignmentsMap[role]) {
                assignmentsMap[role].push(email);
            }
        });

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('updateBulkCrewAssignments', [shipId, assignmentsMap],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert("Legénység sikeresen beosztva!", "Siker");
                        else alert("Legénység sikeresen beosztva!");
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a legénység mentésekor: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        } else {
            setTimeout(function () {
                if (loadingEl) loadingEl.style.display = 'none';
                alert("Legénység sikeresen beosztva! (Offline szimuláció)");
            }, 400);
        }
    };

    // ─── SUBMODAL ÉS TOBORZÓBARAKK PIACI LOGIKÁK ──────────────────────────────────
    window.closeToborzoSubmodals = function () {
        var postModal = document.getElementById('toborzo-post-job-submodal');
        var directModal = document.getElementById('toborzo-direct-offer-submodal');
        if (postModal) postModal.style.display = 'none';
        if (directModal) directModal.style.display = 'none';
    };

    window.openPostJobSubmodal = function (shipId, shipName, role) {
        var submodal = document.getElementById('toborzo-post-job-submodal');
        if (!submodal) return;

        var sIdEl = document.getElementById('post-job-ship-id');
        var rEl = document.getElementById('post-job-role');
        var sNameDisp = document.getElementById('post-job-ship-name-display');
        var rDisp = document.getElementById('post-job-role-display');

        if (sIdEl) sIdEl.value = shipId;
        if (rEl) rEl.value = role;
        if (sNameDisp) sNameDisp.textContent = shipName;
        if (rDisp) rDisp.textContent = role;

        // Küldetés tekercsek lista betöltése a jatektekercsek E oszlopából
        var missionSelect = document.getElementById('post-job-mission-select');
        var scrolls = window.toborzoGameScrolls || (window.toborzoMarketData && (window.toborzoMarketData.gameScrolls || window.toborzoMarketData.availableScrolls)) || [];

        if (missionSelect) {
            missionSelect.innerHTML = '<option value="">- Nincs kitűzött küldetés cél (Általános szolgálat) -</option>';
            if (scrolls && scrolls.length > 0) {
                scrolls.forEach(function (scroll) {
                    if (!scroll) return;
                    var opt = document.createElement('option');
                    opt.value = scroll;
                    opt.textContent = scroll;
                    missionSelect.appendChild(opt);
                });
            }
        }

        submodal.style.display = 'flex';
    };

    window.submitPostJobOpening = function () {
        var shipId = document.getElementById('post-job-ship-id').value;
        var role = document.getElementById('post-job-role').value;
        var missionSelect = document.getElementById('post-job-mission-select');
        var missionGoal = missionSelect ? missionSelect.value : '';

        if (!shipId || !role) {
            if (typeof window.uiAlert === 'function') window.uiAlert("Hiányzó hajó vagy pozíció adat!");
            else alert("Hiányzó hajó vagy pozíció adat!");
            return;
        }

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('postShipJobOpening', [shipId, role, missionGoal],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert(data.message || "Pozíció sikeresen meghirdetve a faliújságon!", "Siker");
                        else alert(data.message || "Pozíció sikeresen meghirdetve a faliújságon!");
                        window.closeToborzoSubmodals();
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a hirdetés feladásakor: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        }
    };

    window.openDirectOfferSubmodal = function (matrozEmail, matrozName, matrozRole, matrozWage) {
        var submodal = document.getElementById('toborzo-direct-offer-submodal');
        if (!submodal) return;

        document.getElementById('direct-offer-matroz-email').value = matrozEmail;
        document.getElementById('direct-offer-matroz-name').textContent = matrozName;
        document.getElementById('direct-offer-matroz-role').textContent = matrozRole || 'Bármilyen';
        document.getElementById('direct-offer-matroz-wage').textContent = matrozWage || 10;

        var shipSelect = document.getElementById('direct-offer-ship-select');
        if (shipSelect) {
            shipSelect.innerHTML = '<option value="">- Válassz saját hajót -</option>';
            (window.toborzoOwnedShips || []).forEach(function (ship) {
                if (ship.inHarbor) {
                    var opt = document.createElement('option');
                    opt.value = ship.id;
                    opt.textContent = ship.name;
                    shipSelect.appendChild(opt);
                }
            });
        }
        window.updateDirectOfferRolesDropdown();
        submodal.style.display = 'flex';
    };

    window.updateDirectOfferRolesDropdown = function () {
        var shipSelect = document.getElementById('direct-offer-ship-select');
        var roleSelect = document.getElementById('direct-offer-role-select');
        if (!roleSelect) return;
        roleSelect.innerHTML = '<option value="">- Válassz tisztséget -</option>';

        if (!shipSelect || !shipSelect.value) return;
        var ship = (window.toborzoOwnedShips || []).find(function (s) { return s.id === shipSelect.value; });
        if (!ship) return;

        var allRoles = [
            "Kapitány", "Navigátor", "Kormányos", "Vitorlamester", "Fedélzetmester",
            "Tüzér", "Hajóorvos", "Hajószakács", "Térképrajzoló",
            "Tekercsmester", "Felfedező", "Gépész", "Hajóács",
            "Letmester", "Monk", "Tengerész"
        ];

        allRoles.forEach(function (role) {
            var currentEmails = (ship.crew && ship.crew[role]) ? ship.crew[role].split(',').map(function (e) { return e.trim().toLowerCase(); }).filter(function (e) { return e; }) : [];
            // Csak betöltetlen vagy többszemélyes tisztség
            if (currentEmails.length === 0 || role === 'Tengerész') {
                var opt = document.createElement('option');
                opt.value = role;
                opt.textContent = role + (currentEmails.length === 0 ? ' (Üres)' : ' (' + currentEmails.length + ' fő)');
                roleSelect.appendChild(opt);
            }
        });
    };

    window.submitDirectJobOffer = function () {
        var targetMatrozEmail = document.getElementById('direct-offer-matroz-email').value;
        var shipSelect = document.getElementById('direct-offer-ship-select');
        var roleSelect = document.getElementById('direct-offer-role-select');
        var durationInput = document.getElementById('direct-offer-duration-input');

        var shipId = shipSelect ? shipSelect.value : '';
        var role = roleSelect ? roleSelect.value : '';
        var durationMonths = durationInput ? (parseInt(durationInput.value, 10) || 1) : 1;

        if (!targetMatrozEmail || !shipId || !role) {
            if (typeof window.uiAlert === 'function') window.uiAlert("Kérlek, válassz ki egy hajót és egy szabad pozíciót!");
            else alert("Kérlek, válassz ki egy hajót és egy szabad pozíciót!");
            return;
        }

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('sendDirectJobOffer', [targetMatrozEmail, shipId, role, durationMonths],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert(data.message || "Állásajánlat sikeresen elküldve a matróznak!", "Siker");
                        else alert(data.message || "Állásajánlat sikeresen elküldve a matróznak!");
                        window.closeToborzoSubmodals();
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba az ajánlat küldésekor: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        }
    };

    window.applyForJobOpening = function (hirdetesId) {
        if (!confirm("Biztosan jelentkezni szeretnél erre a hajós pozícióra?")) return;

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('applyForJobOpening', [hirdetesId],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert(data.message || "Jelentkezés sikeresen elküldve!", "Siker");
                        else alert(data.message || "Jelentkezés sikeresen elküldve!");
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a jelentkezés során: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        }
    };

    window.reviewJobApplicant = function (jelentkezesId, isApproved) {
        var actionName = isApproved ? "elfogadni és ajánlatot tenni a pozícióra" : "elutasítani ezt a jelentkezést";
        if (!confirm("Biztosan szeretnéd " + actionName + "?")) return;

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('reviewJobApplicant', [jelentkezesId, isApproved],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert(data.message || "Döntés sikeresen rögzítve!", "Siker");
                        else alert(data.message || "Döntés sikeresen rögzítve!");
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a döntés rögzítésekor: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        }
    };

    window.respondToJobOffer = function (ajanlatId, isAccepted) {
        var promptMsg = isAccepted ?
            "Biztosan ELFOGADOD az állásajánlatot? Ezzel a szerződés azonnal megkötésre kerül, és szolgálatba lépsz a hajón!" :
            "Biztosan ELUTASÍTOD az állásajánlatot?";
        if (!confirm(promptMsg)) return;

        var loadingEl = document.getElementById('toborzo-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        if (typeof window.callBackend === 'function') {
            window.callBackend('respondToJobOffer', [ajanlatId, isAccepted],
                function (data) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (data && data.success) {
                        if (typeof window.uiAlert === 'function') window.uiAlert(data.message || "Válaszod sikeresen rögzítve!", "Siker");
                        else alert(data.message || "Válaszod sikeresen rögzítve!");
                        window.openToborzoBarakk();
                    } else {
                        var errMsg = "Hiba a válaszadás során: " + (data ? data.error : 'Ismeretlen hiba');
                        if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                        else alert(errMsg);
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    var errMsg = "Hálózati hiba: " + err.message;
                    if (typeof window.uiAlert === 'function') window.uiAlert(errMsg);
                    else alert(errMsg);
                }
            );
        }
    };


    // ─── FEDÉLZET MODAL LOGIKA & IRÁNYÍTÁS (STANDALONE & BEÁGYAZOTT TÁMOGATÁS) ────────
    window.fedelzetUserShips = [];
    window.fedelzetSelectedShip = null;
    window.fedelzetSelectedGameType = null;
    window.fedelzetChatState = 'IDLE'; // IDLE, AWAITING_HARTYA_CONFIRM, AWAITING_KALAND_TARGET, AWAITING_EXPEDITION_ISLAND, AWAITING_EXPEDITION_BOOK, AWAITING_FINAL_CONFIRM
    window.fedelzetExpeditionIsland = '';
    window.fedelzetExpeditionBook = '';

    window.fedelzetAddChatMessage = function (sender, text, type) {
        var history = document.getElementById('fedelzet-deck-chat-history');
        if (!history) return;

        var div = document.createElement('div');
        div.style.cssText = "padding: 8px 12px; border-radius: 8px; max-width: 85%; line-height: 1.35; margin-bottom: 6px; box-shadow: 1px 1px 3px rgba(0,0,0,0.15); word-wrap: break-word;";

        if (type === "incoming") {
            div.style.background = "#f0f4f8";
            div.style.color = "#1b263b";
            div.style.alignSelf = "flex-start";
            div.style.borderLeft = (sender === "Kikötőmester") ? "4px solid #d4af37" : "4px solid #37474f";
            div.innerHTML = "<strong style='color:#37474f;'>" + sender + ":</strong><div style='margin-top:3px;'>" + text + "</div>";
        } else if (type === "outgoing") {
            div.style.background = "#d4af37";
            div.style.color = "#1f0901";
            div.style.fontWeight = "500";
            div.style.alignSelf = "flex-end";
            div.style.marginLeft = "auto";
            div.style.textAlign = "right";
            div.innerHTML = "<strong>Te:</strong><div style='margin-top:3px;'>" + text + "</div>";
        } else {
            div.style.background = "transparent";
            div.style.boxShadow = "none";
            div.style.color = "#888";
            div.style.fontStyle = "italic";
            div.style.textAlign = "center";
            div.style.margin = "0 auto";
            div.style.fontSize = "0.85em";
            div.innerHTML = text;
        }

        history.appendChild(div);
        setTimeout(function () {
            history.scrollTop = history.scrollHeight;
        }, 30);
    };

    window.openFedelzetModal = function () {
        console.log("🚢 3D Kikötő: Fedélzet modal megnyitása (Opálos háttér)");
        var modal = document.getElementById('fedelzet-modal');
        if (!modal) return;

        isModalOpen = true;

        var portraitPanel = document.getElementById('fedelzet-portrait-panel');
        var portraitImg = document.getElementById('fedelzet-portrait-image');
        var portraitVideo = document.getElementById('fedelzet-portrait-video');
        var audioBtn = document.getElementById('fedelzet-portrait-audio-btn');

        if (portraitPanel) {
            if (!audioBtn) {
                audioBtn = document.createElement('button');
                audioBtn.id = 'fedelzet-portrait-audio-btn';
                audioBtn.type = 'button';
                audioBtn.className = 'portrait-audio-btn';
                audioBtn.title = 'Hang némítása / bekapcsolása';
                audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                audioBtn.onclick = function (e) {
                    if (e) { e.stopPropagation(); e.preventDefault(); }
                    toggleVideoAudio('fedelzet-portrait-video', 'fedelzet-portrait-audio-btn');
                };
                portraitPanel.appendChild(audioBtn);
            }

            portraitPanel.className = 'npc-portrait-closed';
            if (portraitVideo) {
                portraitVideo.style.display = 'block';
                if (portraitImg) portraitImg.style.display = 'none';
                portraitVideo.currentTime = 0;
                portraitVideo.loop = false;
                portraitVideo.muted = false;
                portraitVideo.volume = 1.0;
                portraitVideo.onended = function () {
                    if (audioBtn) audioBtn.style.display = 'none';
                    portraitVideo.style.display = 'none';
                    if (portraitImg) {
                        portraitImg.style.display = 'block';
                        portraitImg.src = 'https://storage.googleapis.com/kalozsziget-assets/assets/images/Barba_Negra_greeting_on_dock.jpg';
                    }
                };
                var playProm = portraitVideo.play();
                if (playProm !== undefined) {
                    playProm.then(function () {
                        if (audioBtn) {
                            audioBtn.style.display = 'flex';
                            audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                            audioBtn.title = 'Némítás';
                        }
                    }).catch(function (e) {
                        console.log('Fedélzet videó autoplay fallback muted:', e);
                        portraitVideo.muted = true;
                        portraitVideo.play().catch(function () { });
                        if (audioBtn) {
                            audioBtn.style.display = 'flex';
                            audioBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                            audioBtn.title = 'Hang bekapcsolása';
                        }
                    });
                }
            } else if (portraitImg) {
                if (audioBtn) audioBtn.style.display = 'none';
                portraitImg.style.display = 'block';
                portraitImg.src = 'https://storage.googleapis.com/kalozsziget-assets/assets/images/Barba_Negra_greeting_on_dock.jpg';
            }

            setTimeout(function () {
                portraitPanel.className = 'npc-portrait-open';
            }, 100);
        }

        modal.style.display = 'flex';

        var container = document.getElementById('fedelzet-modal-body');
        if (container) {
            if (!container.dataset.loaded) {
                fetch('fedelzet_oldal.html')
                    .then(function (res) { return res.text(); })
                    .then(function (html) {
                        container.innerHTML = html;
                        container.dataset.loaded = 'true';
                        var contentEl = container.querySelector('#fedelzet_oldal-content');
                        if (contentEl) contentEl.style.display = 'block';
                        var sidePanel = container.querySelector('#fedelzet-subpage-portrait-panel');
                        if (sidePanel) sidePanel.style.display = 'none';
                        if (typeof initFedelzetOldal === 'function') {
                            initFedelzetOldal();
                        }
                    })
                    .catch(function (err) {
                        console.error('Hiba a fedelzet_oldal.html betöltésekor:', err);
                        container.innerHTML = '<p style="color:red; text-align:center;">Hiba a fedélzet aloldal betöltésekor.</p>';
                    });
            } else {
                var contentEl = container.querySelector('#fedelzet_oldal-content');
                if (contentEl) contentEl.style.display = 'block';
                var sidePanel = container.querySelector('#fedelzet-subpage-portrait-panel');
                if (sidePanel) sidePanel.style.display = 'none';
                if (typeof initFedelzetOldal === 'function') {
                    initFedelzetOldal();
                }
            }
        }
    };

    window.closeFedelzetModal = function (e) {
        if (e) {
            if (e.stopPropagation) e.stopPropagation();
            if (e.preventDefault) e.preventDefault();
        }
        var portraitVideo = document.getElementById('fedelzet-portrait-video');
        if (portraitVideo) {
            try { portraitVideo.pause(); } catch (err) { }
        }
        var audioBtn = document.getElementById('fedelzet-portrait-audio-btn');
        if (audioBtn) audioBtn.style.display = 'none';

        var portraitPanel = document.getElementById('fedelzet-portrait-panel');
        if (portraitPanel) portraitPanel.className = 'npc-portrait-closed';

        document.querySelectorAll('#fedelzet-modal').forEach(function (m) {
            m.style.display = 'none';
        });
        const overlay = document.getElementById('scene-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            overlay.style.opacity = '0';
        }
        if (defaultCameraPos && defaultTargetPos && camera && defaultCameraPos.length() > 0) {
            camera.position.copy(defaultCameraPos);
            if (controls) {
                controls.target.copy(defaultTargetPos);
                controls.update();
                controls.enabled = true;
            }
        } else if (controls) {
            controls.enabled = true;
            controls.update();
        }
        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) tooltipEl.classList.remove('visible');
        if (interactiveLocations) {
            interactiveLocations.forEach(function (loc) {
                removeHighlight(loc.meshes);
            });
        }
        document.body.style.cursor = 'default';
        pointerDownTime = 0;
        currentHoveredLocation = null;
        isModalOpen = false;
        isCinematicTransitioning = false;
    };

    window.fedelzetInit = function () {
        var loadingEl = document.getElementById('fedelzet-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        var nameHeader = document.getElementById('fedelzet-active-ship-name');
        var subHeader = document.getElementById('fedelzet-modal-subtitle');
        var selectorContainer = document.getElementById('fedelzet-ship-selector-container');
        var selector = document.getElementById('fedelzet-ship-selector');
        var jumpBtn = document.getElementById('fedelzet-jump-to-save-btn');
        var chatHistory = document.getElementById('fedelzet-deck-chat-history');

        window.fedelzetSelectedShip = null;
        window.fedelzetSelectedGameType = null;
        window.fedelzetChatState = 'IDLE';
        window.fedelzetExpeditionIsland = '';
        window.fedelzetExpeditionBook = '';

        // Szigorúan "Rakodás alatt..." a beolvasás végéig!
        if (nameHeader) nameHeader.textContent = "Rakodás alatt...";
        if (subHeader) subHeader.textContent = "Hajók lajstromozása a táblázatból...";
        if (selectorContainer) selectorContainer.style.display = 'none';
        if (chatHistory) {
            chatHistory.innerHTML = '<p style="color: #888; margin: 0; font-style: italic;">A hajódeszkák csendesen nyikorognak a lábad alatt. A kikötői lajstrom beolvasása folyamatban van...</p>';
        }

        // Ellenőrizzük, van-e mentett játékállás
        try {
            var save = localStorage.getItem('ebp_tutorial_save') || localStorage.getItem('game_save');
            if (save && jumpBtn) jumpBtn.style.display = 'inline-block';
        } catch (e) { }

        var backendCaller = (typeof window.callBackend === 'function') ? window.callBackend :
            (window.parent && typeof window.parent.callBackend === 'function') ? window.parent.callBackend : null;

        if (backendCaller) {
            backendCaller('getUserShips', [],
                function (response) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    if (response && response.success && response.ships) {
                        window.fedelzetUserShips = response.ships;
                        if (window.fedelzetUserShips.length === 0) {
                            if (nameHeader) nameHeader.textContent = "Nincs elérhető hajód a kikötőben!";
                            if (subHeader) subHeader.textContent = "Látogass el a Hajóácsműhelybe vagy a Piacra!";
                            if (selectorContainer) selectorContainer.style.display = 'none';
                            window.fedelzetAddChatMessage("Kikötőmester", "Nem látok a nevedre bejegyzett hajót a kikötői lajstromban, kalóz! Előbb szerezz egyet a Hajóácsműhelyben vagy a Piacon.", "incoming");
                        } else {
                            if (nameHeader) nameHeader.textContent = "Melyik hajódra mész?";
                            if (selectorContainer) selectorContainer.style.display = 'block';
                            if (selector) {
                                selector.innerHTML = '';
                                window.fedelzetUserShips.forEach(function (ship) {
                                    var sId = ship.shipId || ship.id;
                                    var sName = ship.shipName || ship.name;
                                    var opt = document.createElement('option');
                                    opt.value = sId;
                                    opt.textContent = sName + " (" + (ship.role || ship.type || 'Hajó') + ")";
                                    selector.appendChild(opt);
                                });
                            }
                            window.fedelzetSelectShip(window.fedelzetUserShips[0].id, true);
                        }
                    } else {
                        if (nameHeader) nameHeader.textContent = "Nincs elérhető hajó";
                        if (subHeader) subHeader.textContent = "A hajók lajstroma nem érhető el.";
                        window.fedelzetAddChatMessage("Kikötőmester", "A kikötői lajstrom jelenleg nem érhető el. Kérlek, próbáld újra később!", "incoming");
                    }
                },
                function (err) {
                    if (loadingEl) loadingEl.style.display = 'none';
                    console.warn('Fedélzet hajók lekérdezési hiba:', err);
                    if (nameHeader) nameHeader.textContent = "Hiba a lekérdezéskor";
                    window.fedelzetAddChatMessage("Kikötőmester", "Hiba történt a hajók lekérdezésekor: " + (err ? err.message : 'Hálózati hiba'), "incoming");
                }
            );
        } else {
            // Offline teszt szimuláció ha nincs backend kapcsolat
            setTimeout(function () {
                if (loadingEl) loadingEl.style.display = 'none';
                window.fedelzetUserShips = [
                    { id: 'ship_01', name: 'Gyöngyhalász', type: 'Dingi' },
                    { id: 'ship_02', name: 'Fekete Gyöngy', type: 'Fregatt' }
                ];
                if (nameHeader) nameHeader.textContent = "Melyik hajódra mész?";
                if (selectorContainer) selectorContainer.style.display = 'block';
                if (selector) {
                    selector.innerHTML = '<option value="ship_01">Gyöngyhalász (Dingi)</option><option value="ship_02">Fekete Gyöngy (Fregatt)</option>';
                }
                window.fedelzetSelectShip('ship_01', true);
            }, 400);
        }
    };

    window.fedelzetSelectShip = function (shipId, isInitial) {
        var ship = (window.fedelzetUserShips || []).find(function (s) { return s.id === shipId; });
        if (ship) {
            window.fedelzetSelectedShip = ship;
            var nameHeader = document.getElementById('fedelzet-active-ship-name');
            if (nameHeader) nameHeader.textContent = "Melyik hajódra mész?";
            var subHeader = document.getElementById('fedelzet-modal-subtitle');
            if (subHeader) subHeader.textContent = "Aktív hajó: " + ship.name + " (" + (ship.type || 'Hajó') + ")";

            var selector = document.getElementById('fedelzet-ship-selector');
            if (selector && selector.value !== ship.id) {
                selector.value = ship.id;
            }

            var msg = isInitial
                ? "Üdv a fedélzeten, Kapitány! A(z) <b>" + ship.name + "</b> (" + (ship.type || 'Hajó') + ") lajstromozva, és készen áll a kihajózásra. Milyen küldetésre indulunk ma? Válassz a fenti küldetésgombok közül, vagy szólj hozzám itt a fedélzeti megbeszélésben!"
                : "Átszálltál a(z) <b>" + ship.name + "</b> fedélzetére. A legénység várja a parancsodat!";
            window.fedelzetAddChatMessage("Kikötőmester", msg, "incoming");
        }
    };

    window.fedelzetPrepareDeparture = function (gameType) {
        window.fedelzetSelectedGameType = gameType;
        var targetInput = document.getElementById('fedelzet-departure-target');
        var bookInput = document.getElementById('fedelzet-departure-book-target');
        var confirmBtn = document.getElementById('fedelzet-confirm-departure-btn');
        var chatInput = document.getElementById('fedelzet-deck-chat-input');
        var ship = window.fedelzetSelectedShip || { name: 'Hajód' };

        if (gameType === 'Hártyahalászat') {
            window.fedelzetChatState = 'AWAITING_HARTYA_CONFIRM';
            if (targetInput) targetInput.style.display = 'none';
            if (bookInput) bookInput.style.display = 'none';
            if (confirmBtn) {
                confirmBtn.style.display = 'block';
                confirmBtn.innerHTML = '<i class="fas fa-fish"></i> INDULÁS: Hártyahalászat!';
            }
            window.fedelzetAddChatMessage("Te", "Hártyahalászatra készülök a(z) <b>" + ship.name + "</b> fedélzetén.", "outgoing");
            window.fedelzetAddChatMessage("Kikötőmester", "A merítőhálókat felkötöttük, a tenger csendes! Készen állsz a kifutásra? Írd be ide a chatbe: <b>'Indulás'</b> (vagy 'Mehet'), vagy kattints a lenti narancssárga <b>INDULÁS</b> gombra!", "incoming");
        } else if (gameType === 'Kalandjáték') {
            window.fedelzetChatState = 'AWAITING_KALAND_TARGET';
            if (targetInput) {
                targetInput.style.display = 'block';
                targetInput.placeholder = 'Add meg a Kaland nevét pontosan!';
                targetInput.value = '';
            }
            if (bookInput) {
                bookInput.style.display = 'none';
                bookInput.value = '';
            }
            if (confirmBtn) {
                confirmBtn.style.display = 'block';
                confirmBtn.innerHTML = '<i class="fas fa-skull-crossbones"></i> INDULÁS: Kalandjáték!';
            }
            window.fedelzetAddChatMessage("Te", "Kalandjáték küldetésre indulunk!", "outgoing");
            window.fedelzetAddChatMessage("Kikötőmester", "Merre vegyük az irányt, Kapitány? Kérlek, írd be ide a fedélzeti megbeszélésbe a <b>Kaland pontos nevét</b>!", "incoming");
        } else if (gameType === 'Könyvexpedíció') {
            window.fedelzetChatState = 'AWAITING_EXPEDITION_ISLAND';
            window.fedelzetExpeditionIsland = '';
            window.fedelzetExpeditionBook = '';
            if (targetInput) {
                targetInput.style.display = 'block';
                targetInput.placeholder = 'Add meg a Zsánersziget nevét!';
                targetInput.value = '';
            }
            if (bookInput) {
                bookInput.style.display = 'block';
                bookInput.placeholder = 'Keresett Könyv címe';
                bookInput.value = '';
            }
            if (confirmBtn) {
                confirmBtn.style.display = 'block';
                confirmBtn.innerHTML = '<i class="fas fa-book"></i> INDULÁS: Könyvexpedíció!';
            }
            window.fedelzetAddChatMessage("Te", "Könyvexpedíciót indítunk!", "outgoing");
            window.fedelzetAddChatMessage("Kikötőmester", "Nemes cél, az elveszett tudás nyomába eredünk! Melyik <b>Zsánerszigetre</b> hajózunk? Írd be a sziget nevét ide a chatbe!", "incoming");
        }

        if (chatInput) {
            chatInput.focus();
        }
    };

    window.fedelzetExecuteDeparture = function () {
        var gameType = window.fedelzetSelectedGameType || 'Hártyahalászat';
        var ship = window.fedelzetSelectedShip;
        if (!ship) {
            alert("Nincs kiválasztva érvényes hajó!");
            return;
        }

        var targetInput = document.getElementById('fedelzet-departure-target');
        var bookInput = document.getElementById('fedelzet-departure-book-target');

        var targetName = targetInput ? targetInput.value.trim() : '';
        var targetBook = bookInput ? bookInput.value.trim() : '';

        if (gameType !== 'Hártyahalászat' && (!targetName || targetName.length < 3)) {
            alert("Kérlek, adj meg egy érvényes célpontot (legalább 3 karakter)!");
            if (targetInput) targetInput.focus();
            return;
        }

        if (gameType === 'Könyvexpedíció' && (!targetBook || targetBook.length < 2)) {
            alert("Könyvexpedíció esetén add meg a keresett könyv címét is!");
            if (bookInput) bookInput.focus();
            return;
        }

        var loadingEl = document.getElementById('fedelzet-loading');
        if (loadingEl) loadingEl.style.display = 'flex';

        var backendCaller = (typeof window.callBackend === 'function') ? window.callBackend :
            (window.parent && typeof window.parent.callBackend === 'function') ? window.parent.callBackend : null;

        var finalTarget = (gameType === 'Könyvexpedíció') ? (targetName + "|||" + targetBook) : targetName;
        var targetDesc = (gameType === 'Hártyahalászat') ? "Hártyahalászat" : (gameType + " -> " + targetName + (targetBook ? " (" + targetBook + ")" : ""));

        window.fedelzetAddChatMessage("Te", "Kihajózási engedélyt kérek: <b>" + targetDesc + "</b>!", "outgoing");
        window.fedelzetAddChatMessage("Kikötőmester", "Hajónapló és engedélyek ellenőrzése... Kérelem küldése a parancsnokságnak.", "incoming");

        if (gameType === 'Hártyahalászat') {
            if (backendCaller) {
                backendCaller('getBoatDurability', [ship.id],
                    function (dur) {
                        var d = parseInt(dur);
                        if (!isNaN(d) && d < 2) {
                            if (loadingEl) loadingEl.style.display = 'none';
                            var durMsg = "A(z) " + ship.name + " állapota túl alacsony (" + d + ") a kihajózáshoz! Minimum 2 élettartam szükséges. Javíttasd meg a Hajóműhelyben!";
                            alert("Kikötőmester: Megtagadva! " + durMsg);
                            window.fedelzetAddChatMessage("Kikötőmester", "❌ Megtagadva: " + durMsg, "incoming");
                            return;
                        }
                        proceedWithDeparture();
                    },
                    function (err) {
                        proceedWithDeparture();
                    }
                );
            } else {
                proceedWithDeparture();
            }
        } else {
            proceedWithDeparture();
        }

        function proceedWithDeparture() {
            if (backendCaller) {
                backendCaller('requestDeparture', [ship.id, gameType, finalTarget],
                    function (res) {
                        if (loadingEl) loadingEl.style.display = 'none';
                        if (res && res.success) {
                            var succMsg = res.message || "Kihajózás engedélyezve! Irány: " + finalTarget;
                            window.fedelzetAddChatMessage("Kikötőmester", "✅ " + succMsg, "incoming");
                            alert("Sikeres Kihajózás!\n" + succMsg);
                            if (targetInput) targetInput.value = '';
                            if (bookInput) bookInput.value = '';
                            window.fedelzetChatState = 'IDLE';
                            if (gameType === 'Hártyahalászat') {
                                window.closeFedelzetModal();
                                if (window.parent && window.parent !== window && typeof window.parent.loadPage === 'function') {
                                    window.parent.loadPage('game_oldal');
                                } else {
                                    window.location.href = 'minigame_fishing.html';
                                }
                            }
                        } else {
                            var errMsg = (res ? res.error : 'Ismeretlen hiba');
                            window.fedelzetAddChatMessage("Kikötőmester", "❌ Kihajózás megtagadva: " + errMsg, "incoming");
                            alert("Kikötőmester: Megtagadva!\n" + errMsg);
                        }
                    },
                    function (err) {
                        if (loadingEl) loadingEl.style.display = 'none';
                        window.fedelzetAddChatMessage("Kikötőmester", "❌ Hálózati hiba: " + err.message, "incoming");
                        alert("Hálózati hiba: " + err.message);
                    }
                );
            } else {
                setTimeout(function () {
                    if (loadingEl) loadingEl.style.display = 'none';
                    window.fedelzetAddChatMessage("Kikötőmester", "✅ Kihajózás engedélyezve: " + targetDesc + " (Offline szimuláció)", "incoming");
                    alert("Kihajózás elindítva: " + targetDesc + " (Szimuláció)");
                    window.fedelzetChatState = 'IDLE';
                    if (gameType === 'Hártyahalászat') {
                        window.closeFedelzetModal();
                        window.location.href = 'minigame_fishing.html';
                    }
                }, 400);
            }
        }
    };

    window.fedelzetSendDeckChat = function () {
        var input = document.getElementById('fedelzet-deck-chat-input');
        if (!input) return;
        var msg = input.value.trim();
        if (!msg) return;

        window.fedelzetAddChatMessage("Te", msg, "outgoing");
        input.value = '';

        var lower = msg.toLowerCase();
        var targetInput = document.getElementById('fedelzet-departure-target');
        var bookInput = document.getElementById('fedelzet-departure-book-target');

        // 1. ÁLLAPOTGÉP: Célkijelölési párbeszéd a Kikötőmesterrel
        if (window.fedelzetChatState === 'AWAITING_HARTYA_CONFIRM' || window.fedelzetChatState === 'AWAITING_FINAL_CONFIRM') {
            if (lower.includes('indul') || lower.includes('mehet') || lower.includes('igen') || lower.includes('start') || lower.includes('gyerünk') || lower.includes('ok')) {
                window.fedelzetAddChatMessage("Kikötőmester", "Horgonyt fel! Vitorlákat bontani! Irány a nyílt víz!", "incoming");
                setTimeout(function () {
                    window.fedelzetExecuteDeparture();
                }, 400);
                return;
            }
        }

        if (window.fedelzetChatState === 'AWAITING_KALAND_TARGET') {
            if (msg.length >= 2) {
                if (targetInput) targetInput.value = msg;
                window.fedelzetChatState = 'AWAITING_FINAL_CONFIRM';
                window.fedelzetAddChatMessage("Kikötőmester", "Rögzítettem a Kaland nevét a hajónaplóba: <b>" + msg + "</b>! Indulhatunk a szigetre? Írd be: <b>'Indulás'</b> vagy nyomd meg a lenti narancssárga <b>INDULÁS</b> gombot!", "incoming");
                return;
            }
        }

        if (window.fedelzetChatState === 'AWAITING_EXPEDITION_ISLAND') {
            if (msg.length >= 2) {
                window.fedelzetExpeditionIsland = msg;
                if (targetInput) targetInput.value = msg;
                window.fedelzetChatState = 'AWAITING_EXPEDITION_BOOK';
                window.fedelzetAddChatMessage("Kikötőmester", "Célpont Zsánersziget rögzítve: <b>" + msg + "</b>! Most kérlek, add meg a keresett <b>Könyv pontos címét</b> ide a chatbe!", "incoming");
                return;
            }
        }

        if (window.fedelzetChatState === 'AWAITING_EXPEDITION_BOOK') {
            if (msg.length >= 2) {
                window.fedelzetExpeditionBook = msg;
                if (bookInput) bookInput.value = msg;
                window.fedelzetChatState = 'AWAITING_FINAL_CONFIRM';
                window.fedelzetAddChatMessage("Kikötőmester", "Minden adat rögzítve: <b>" + window.fedelzetExpeditionIsland + "</b> / <b>" + msg + "</b>! Készen áll a hajó a kifutásra? Írd be: <b>'Indulás'</b> vagy kattints az <b>INDULÁS</b> gombra!", "incoming");
                return;
            }
        }

        // 2. SZABAD BESZÉLGETÉS & KULCSSZÓ FELISMERÉS
        if (lower.includes('hártya') || lower.includes('halász')) {
            window.fedelzetPrepareDeparture('Hártyahalászat');
            return;
        } else if (lower.includes('kaland')) {
            window.fedelzetPrepareDeparture('Kalandjáték');
            return;
        } else if (lower.includes('könyv') || lower.includes('expedíció') || lower.includes('expedicio')) {
            window.fedelzetPrepareDeparture('Könyvexpedíció');
            return;
        } else if ((lower.includes('indul') || lower.includes('mehet')) && window.fedelzetSelectedGameType) {
            window.fedelzetExecuteDeparture();
            return;
        }

        // 3. HANGULATI LEGÉNYSÉGI VÁLASZOK
        setTimeout(function () {
            var responses = [
                "Értettem, Kapitány! Mindenki a posztján áll!",
                "A vitorlák felkötve, a szélirány kedvező!",
                "Igenis! A raktár feltöltve, indulásra készen állunk.",
                "A tenger zúgása hívogat. Készen állunk a kihajózásra!"
            ];
            var reply = responses[Math.floor(Math.random() * responses.length)];
            window.fedelzetAddChatMessage("Legénység", reply, "incoming");
        }, 500);
    };

    window.fedelzetJumpToSavedState = function () {
        window.closeFedelzetModal();
        if (window.parent && window.parent !== window && typeof window.parent.loadPage === 'function') {
            window.parent.loadPage('game_oldal');
        } else {
            window.location.href = 'minigame_fishing.html';
        }
    };

    // ─── 14 DB MÓLÓ, HÍD ÉS HAJÓ ELEM INTERAKTÍV DEFINÍCIÓJA (FEDÉLZET) ────────────
    const deckInteractiveDefs = [
        { name: "defaultMaterial004", fallbackPos: new THREE.Vector3(-32.3, 1.0, -14.4), camTarget: new THREE.Vector3(-39.5, 3.5, -14.4), lookAt: new THREE.Vector3(-32.3, 1.8, -14.4) },
        { name: "defaultMaterial003", fallbackPos: new THREE.Vector3(-45.0, 1.0, -17.3), camTarget: new THREE.Vector3(-52.0, 3.5, -17.3), lookAt: new THREE.Vector3(-45.0, 1.8, -17.3) },
        { name: "SM_Veh_Veh_Boat_Large_01_Hull", fallbackPos: new THREE.Vector3(-46.6, -1.1, -13.3), camTarget: new THREE.Vector3(-54.0, 3.5, -13.3), lookAt: new THREE.Vector3(-46.6, 1.5, -13.3) },
        { name: "mesh_id5", fallbackPos: new THREE.Vector3(-34.6, -0.2, -7.5), camTarget: new THREE.Vector3(-41.5, 3.0, -7.5), lookAt: new THREE.Vector3(-34.6, 1.2, -7.5) },
        { name: "node_id4001", fallbackPos: new THREE.Vector3(-33.0, -4.3, -4.7), camTarget: new THREE.Vector3(-40.0, 2.5, -4.7), lookAt: new THREE.Vector3(-33.0, 0.5, -4.7) },
        { name: "Bridge001_Bridge_0", fallbackPos: new THREE.Vector3(-34.0, 3.5, 1.0), camTarget: new THREE.Vector3(-41.0, 5.0, 1.0), lookAt: new THREE.Vector3(-34.0, 3.8, 1.0) },
        { name: "Bridge001_Bridge_0001", fallbackPos: new THREE.Vector3(-43.6, 3.5, 1.0), camTarget: new THREE.Vector3(-50.5, 5.0, 1.0), lookAt: new THREE.Vector3(-43.6, 3.8, 1.0) },
        { name: "Bridge001_Bridge_0002", fallbackPos: new THREE.Vector3(-53.2, 3.5, 1.0), camTarget: new THREE.Vector3(-60.0, 5.0, 1.0), lookAt: new THREE.Vector3(-53.2, 3.8, 1.0) },
        { name: "Bridge001_Bridge_0003", fallbackPos: new THREE.Vector3(-62.8, 3.5, 1.0), camTarget: new THREE.Vector3(-69.5, 5.0, 1.0), lookAt: new THREE.Vector3(-62.8, 3.8, 1.0) },
        { name: "Mesh_0001", fallbackPos: new THREE.Vector3(-33.7, 1.8, 7.6), camTarget: new THREE.Vector3(-40.5, 3.8, 7.6), lookAt: new THREE.Vector3(-33.7, 2.2, 7.6) },
        { name: "Mesh_0", fallbackPos: new THREE.Vector3(-33.8, 2.0, 7.5), camTarget: new THREE.Vector3(-40.5, 4.0, 7.5), lookAt: new THREE.Vector3(-33.8, 2.4, 7.5) },
        { name: "defaultMaterial002", fallbackPos: new THREE.Vector3(-33.3, 0.9, 14.4), camTarget: new THREE.Vector3(-40.5, 3.5, 14.4), lookAt: new THREE.Vector3(-33.3, 1.8, 14.4) },
        { name: "defaultMaterial005", fallbackPos: new THREE.Vector3(-44.6, 0.9, 18.7), camTarget: new THREE.Vector3(-51.5, 3.5, 18.7), lookAt: new THREE.Vector3(-44.6, 1.8, 18.7) },
        { name: "SM_Veh_Boat_Medium_01_Hull_Attachments", fallbackPos: new THREE.Vector3(-45.7, -1.0, 14.7), camTarget: new THREE.Vector3(-53.0, 3.2, 14.7), lookAt: new THREE.Vector3(-45.7, 1.5, 14.7) }
    ];

    function registerDeckInteractiveElements() {
        if (!scene) return;
        deckInteractiveDefs.forEach(def => {
            if (interactiveLocations.some(loc => loc.name === def.name)) return;

            let targetNode = null;
            scene.traverse(node => {
                if (!targetNode && node.name) {
                    const nName = node.name.trim();
                    const dName = def.name.trim();
                    if (nName === dName || nName.startsWith(dName) || nName.replace(/\./g, '') === dName.replace(/\./g, '') || nName.replace(/_/g, '') === dName.replace(/_/g, '')) {
                        targetNode = node;
                    }
                }
            });

            let meshes = [];
            if (targetNode) {
                if (targetNode.isMesh) meshes.push(targetNode);
                targetNode.traverse(c => {
                    if (c.isMesh && !meshes.includes(c)) meshes.push(c);
                });

                // Ha a node egy hajómodell gyermeke, a környező vizuális elemeket is kijelölhetővé tesszük
                if (targetNode.parent && targetNode.parent.name && targetNode.parent.name.includes("Group")) {
                    targetNode.parent.traverse(c => {
                        if (c.isMesh && !meshes.includes(c)) meshes.push(c);
                    });
                }

                meshes.forEach(m => {
                    if (m && m.material) {
                        const mats = Array.isArray(m.material) ? m.material : [m.material];
                        mats.forEach(mat => {
                            if (mat) {
                                mat.side = THREE.DoubleSide;
                                mat.needsUpdate = true;
                            }
                        });
                    }
                });
            }

            if (targetNode && meshes.length > 0) {
                interactiveLocations.push({
                    id: 'openFedelzetModal',
                    name: def.name,
                    langKey: 'harbor_nav_deck',
                    defaultLabel: '🚢 A fedélzetre',
                    node: targetNode,
                    meshes: meshes,
                    worldPos: def.fallbackPos,
                    camTargetPos: def.camTarget,
                    lookAtTarget: def.lookAt
                });
            }
        });
    }

    /**
     * 🌀 Dinamikus Hullámgyűrű Generátor (Módszer 2: Dynamic Wave & Ripple System)
     * Koncentrikus, kifelé terjedő animált hullámokat generál a hajók, mólók, hidak és partvonal körül.
     */
    function createBoatRipple(targetOrPos, sizeX, sizeZ, speed, intensity) {
        if (typeof speed === 'undefined') speed = 1.0;
        if (typeof intensity === 'undefined') intensity = 1.0;
        if (!targetOrPos) return;

        const rippleGeo = new THREE.PlaneGeometry(sizeZ * 2.2, sizeZ * 2.2);
        const aspectVal = sizeZ / sizeX;

        const rippleMat = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uSpeed: { value: speed },
                uColor: { value: new THREE.Color(0xd8f5ff) },
                uAspect: { value: aspectVal },
                uIntensity: { value: intensity }
            },
            vertexShader: `
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
            fragmentShader: `
                    uniform float uTime;
                    uniform float uSpeed;
                    uniform vec3 uColor;
                    uniform float uAspect;
                    uniform float uIntensity;
                    varying vec2 vUv;

                    void main() {
                        vec2 centered = vUv - vec2(0.5);
                        centered.x *= uAspect;
                        float dist = length(centered) * 2.0;

                        if (dist > 1.0 || dist < 0.06) discard;

                        // Koncentrikus, kifelé terjedő hullámgyűrűk fázisa (megfelezett, lágy terjedési sebesség)
                        float wavePhase = dist * 24.0 - uTime * uSpeed * 1.8;
                        float ring1 = sin(wavePhase);
                        float ring2 = sin(wavePhase * 0.5 + 1.57);
                        float rings = ring1 * 0.7 + ring2 * 0.3;

                        // Lágy elhalványulás a testnél és a külső peremnél
                        float edgeFade = smoothstep(1.0, 0.40, dist) * smoothstep(0.06, 0.26, dist);
                        float ringIntensity = clamp(rings * 0.5 + 0.5, 0.0, 1.0);

                        // Fénylő hullámtaraj és lágy, diszkrét tengeri tajték (tizedére visszafogott, finom áttetszőség)
                        float crest = pow(ringIntensity, 3.5) * 0.95;
                        float alpha = edgeFade * (crest + 0.10 * ringIntensity) * 0.07 * uIntensity;

                        gl_FragColor = vec4(uColor, alpha);
                    }
                `,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.NormalBlending
        });

        const rippleMesh = new THREE.Mesh(rippleGeo, rippleMat);
        rippleMesh.rotation.x = -Math.PI / 2;
        rippleMesh.position.y = 0.11; // Közvetlenül a vízfelszín fölött
        rippleMesh.name = "BoatRippleMesh";

        let targetObj = null;
        let fixedPos = null;

        if (targetOrPos.isObject3D) {
            targetObj = targetOrPos;
            const wPos = new THREE.Vector3();
            targetOrPos.getWorldPosition(wPos);
            rippleMesh.position.x = wPos.x;
            rippleMesh.position.z = wPos.z;
        } else if (targetOrPos.x !== undefined && targetOrPos.z !== undefined) {
            fixedPos = new THREE.Vector3(targetOrPos.x, targetOrPos.y || 0.1, targetOrPos.z);
            rippleMesh.position.x = fixedPos.x;
            rippleMesh.position.z = fixedPos.z;
        }

        if (!boatRipplesGroup) {
            boatRipplesGroup = new THREE.Group();
            boatRipplesGroup.name = "BoatRipplesGroup";
            scene.add(boatRipplesGroup);
        }
        boatRipplesGroup.add(rippleMesh);

        boatRipplesList.push({
            mesh: rippleMesh,
            target: targetObj,
            fixedPos: fixedPos,
            material: rippleMat
        });
    }

    // 1. Háromdimenziós Tér Inicializálása
    function init() {
        const container = document.getElementById('webgl-canvas-container');

        // Jelenet & Égbolt Háttér
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x87ceeb); // Természetes tengeri égkék
        scene.fog = new THREE.FogExp2(0xa0d8ef, 0.002); // Alapértelmezett ködsűrűség: 0.002

        // Kamera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 5000);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(renderer.domElement);

        // Környezeti tükröződési térkép (IBL / Environment Map) a fémek és üvegek fizikai megjelenítéséhez
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        const environment = new RoomEnvironment();
        scene.environment = pmremGenerator.fromScene(environment, 0.04).texture;
        environment.dispose();
        pmremGenerator.dispose();

        // OrbitControls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minPolarAngle = THREE.MathUtils.degToRad(55); // Maximum 35°-os lefelé dőlés a horizonttól (55° polárszög | ~0.9599 rad)
        controls.maxPolarAngle = 1.46; // Legnagyobb vertikális szög (~83.64° | Pos: -132.0, 20.0, 48.0 -> Target: -23.3, 6.8, 1.0)
        controls.minDistance = 13.13; // Legközelebbi megengedett távolság a fókusztól (-36.4, 7.6, 0.8)
        controls.maxDistance = 118.0; // Legnagyobb megengedett zoom távolság (max 118)

        // Horizontális elfordulás korlátozása 30 fokos tartományra (±15° az alapértelmezett rálátási szög körül)
        const baseAzimuth = -1.5567; // atan2(-42.4, 0.6) ~ -89.19°
        controls.minAzimuthAngle = baseAzimuth - THREE.MathUtils.degToRad(15); // -104.19°
        controls.maxAzimuthAngle = baseAzimuth + THREE.MathUtils.degToRad(15); // -74.19°

        // Globális elérések a Toolbox számára
        window._kikotoScene = scene;
        window._kikotoCamera = camera;
        window._kikotoControls = controls;

        // 2. Standard és Környezeti Fények Beállítása
        setupLighting();

        // 3. Valós Idejű Napszak szerinti Fénykezelés (Tutorial & Hártyahalász algoritmus)
        updateEnvironmentLighting();
        setInterval(updateEnvironmentLighting, 60000); // 1 percenkénti folyamatos frissítés

        // 4. Realisztikus Vízfelület (Tutorial & Hártyahalász Shader Víz) a FoamRing (Y: -0.2) síkja alá
        const waterGeometry = new THREE.PlaneGeometry(3500, 3500);
        const textureLoader = new THREE.TextureLoader();
        const waterNormals = textureLoader.load(
            'https://storage.googleapis.com/kalozsziget-assets/demojatek/models/waternormals.jpg',
            function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            },
            undefined,
            function () {
                // Fallback CDN ha helyi modell mappa nem érhető el
                textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/waternormals.jpg', function (tex) {
                    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                    if (water) water.material.uniforms['normalSampler'].value = tex;
                });
            }
        );

        water = new Water(
            waterGeometry,
            {
                textureWidth: 512,
                textureHeight: 512,
                waterNormals: waterNormals,
                sunDirection: new THREE.Vector3(),
                sunColor: 0xffffff,
                waterColor: 0x1476a6,
                distortionScale: 3.7,
                fog: scene.fog !== undefined
            }
        );
        water.rotation.x = -Math.PI / 2;
        water.position.y = 0.1; // Visszavéve 4.5 egységgel (0.1)
        scene.add(water);
        window._kikotoWater = water;

        // 5. Modell Betöltése
        loadHarborModel();

        // Eseménykezelők
        window.addEventListener('resize', onWindowResize);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointerup', onPointerUp);

        // Modálok eseményvédelme: megakadályozzuk, hogy a felugró ablakok belső kattintásai vagy bezárása elérje a Three.js színteret
        ['universal-npc-modal', 'toborzo-modal', 'fedelzet-modal'].forEach(function (modalId) {
            const modalEl = document.getElementById(modalId);
            if (modalEl) {
                ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'click', 'mousemove', 'wheel', 'touchstart', 'touchend'].forEach(function (evtName) {
                    modalEl.addEventListener(evtName, function (ev) {
                        ev.stopPropagation();
                    }, { passive: false });
                });
            }
        });

        // Render ciklus indítása
        animate();
    }

    // Standard Fényforrások (Alapbeállítások: Napfény 1.0, Dőlésszög 900, Hemi 1.6, Ambient 0.7, IBL 1.0, Köd 0.002)
    function setupLighting() {
        // Félgömb / Szórt Égbolt Fény (felül égkék, alul meleg föld/tenger tónus - Hemi: 1.6)
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x3d4a36, 1.6);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);
        window._kikotoHemiLight = hemiLight;

        // Környezeti Fény (Ambient: 0.7)
        const ambientLight = new THREE.AmbientLight(0xffecd2, 0.7);
        scene.add(ambientLight);
        window._kikotoAmbientLight = ambientLight;

        // Napfény (Standard Fő Irányított Fény: Intenzitás 1.0, Dőlésszög / Y: 900)
        const sunLight = new THREE.DirectionalLight(0xfffaed, 1.0);
        sunLight.position.set(250, 900, 200);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 2048;
        sunLight.shadow.mapSize.height = 2048;
        sunLight.shadow.camera.near = 10;
        sunLight.shadow.camera.far = 2500;
        const d = 350;
        sunLight.shadow.camera.left = -d;
        sunLight.shadow.camera.right = d;
        sunLight.shadow.camera.top = d;
        sunLight.shadow.camera.bottom = -d;
        sunLight.shadow.bias = -0.0005;
        scene.add(sunLight);
        window._kikotoSunLight = sunLight;

    }

    /**
     * Napszak Szerinti Környezeti és Fény Dinamika (Tutorial & Hártyahalász Motor)
     * A böngésző helyi órája alapján finoman skálázza a fényeket a beállított alapértékekig.
     */
    function updateEnvironmentLighting() {
        const now = new Date();
        const hrs = now.getHours() + now.getMinutes() / 60;
        let p = 0.5; // Alapértelmezett dél

        if (hrs >= 5 && hrs < 11) {
            // 1. Hajnal / Reggel: 5:00 -> 11:00 (p: 0.10 -> 0.35) - 0.1-ről fokozatosan növekszik vissza nappali fényerőre
            p = 0.10 + ((hrs - 5) / 6) * 0.25;
        } else if (hrs >= 11 && hrs < 17) {
            // 2. Nappal / Dél: 11:00 -> 17:00 (p: 0.35 -> 0.60) - Teljes nappali fényerő!
            p = 0.35 + ((hrs - 11) / 6) * 0.25;
        } else if (hrs >= 17 && hrs < 21) {
            // 3. Alkonyat / Sötétedés: 17:00 -> 21:00 (p: 0.60 -> 0.85) - Fokozatosan 0.1 értékig csökken
            p = 0.60 + ((hrs - 17) / 4) * 0.25;
        } else {
            // 4. Éjszaka: 21:00 -> 5:00 (p: 0.85 -> 1.0) - Fix 0.1 éjszakai fényérték
            p = (hrs >= 21) ? 0.85 + ((hrs - 21) / 8) * 0.15 : 0.85 + ((hrs + 3) / 8) * 0.15;
        }

        // Nap & Hold pályagörbe pozíció (Dőlésszög Y: max 900)
        const angle = p * Math.PI;
        const sunX = Math.cos(angle) * 1500;
        const sunY = Math.sin(angle) * 900;
        const sunZ = Math.sin(angle * 2) * 350 + (1 - p * 2) * 900;

        if (window._kikotoSunLight) {
            window._kikotoSunLight.position.set(sunX, Math.max(sunY, -100), sunZ);
        }

        let sunColor, skyColor, fogColor, sunIntensity, hemiIntensity, ambIntensity, iblIntensity, fogDensity;

        if (p >= 0.10 && p < 0.35) {
            // 1. HAJNAL (5:00 -> 11:00): Fényerő 0.1-ről fokozatosan növekszik a nappali maximális értékig
            const t = (p - 0.10) / 0.25;
            sunColor = new THREE.Color(0x336699).lerp(new THREE.Color(0xffe8b5), Math.min(1.0, t * 1.5)).lerp(new THREE.Color(0xfffaed), Math.max(0, (t - 0.5) * 2));
            skyColor = new THREE.Color(0x050a12).lerp(new THREE.Color(0x7ec8e8), Math.min(1.0, t * 1.5)).lerp(new THREE.Color(0x87ceeb), Math.max(0, (t - 0.5) * 2));
            fogColor = skyColor.clone();
            sunIntensity = THREE.MathUtils.lerp(0.1, 1.0, t);
            hemiIntensity = THREE.MathUtils.lerp(0.1, 1.6, t);
            ambIntensity = THREE.MathUtils.lerp(0.1, 0.7, t);
            iblIntensity = THREE.MathUtils.lerp(0.1, 1.0, t);
            fogDensity = THREE.MathUtils.lerp(0.0022, 0.002, t);
        } else if (p >= 0.35 && p < 0.60) {
            // 2. NAPPAL (11:00 -> 17:00): Teljes nappali maximális fényerő
            sunColor = new THREE.Color(0xfffaed);
            skyColor = new THREE.Color(0x87ceeb);
            fogColor = new THREE.Color(0x87ceeb);
            sunIntensity = 1.0;
            hemiIntensity = 1.6;
            ambIntensity = 0.7;
            iblIntensity = 1.0;
            fogDensity = 0.002;
        } else if (p >= 0.60 && p < 0.85) {
            // 3. SÖTÉT оптиKAI ÁTMENET / ALKONYAT (17:00 -> 21:00): Fokozatosan 0.1 értékig csökken
            const t = (p - 0.60) / 0.25;
            sunColor = new THREE.Color(0xfffaed).lerp(new THREE.Color(0xff5500), Math.min(1.0, t * 1.5)).lerp(new THREE.Color(0x336699), Math.max(0, (t - 0.5) * 2));
            skyColor = new THREE.Color(0x87ceeb).lerp(new THREE.Color(0xe2583e), Math.min(1.0, t * 1.5)).lerp(new THREE.Color(0x050a12), Math.max(0, (t - 0.5) * 2));
            fogColor = new THREE.Color(0x87ceeb).lerp(new THREE.Color(0xd35400), Math.min(1.0, t * 1.5)).lerp(new THREE.Color(0x050a12), Math.max(0, (t - 0.5) * 2));
            sunIntensity = THREE.MathUtils.lerp(1.0, 0.1, t);
            hemiIntensity = THREE.MathUtils.lerp(1.6, 0.1, t);
            ambIntensity = THREE.MathUtils.lerp(0.7, 0.1, t);
            iblIntensity = THREE.MathUtils.lerp(1.0, 0.1, t);
            fogDensity = THREE.MathUtils.lerp(0.002, 0.0022, t);
        } else {
            // 4. ÉJSZAKA (21:00 -> 5:00): A környezeti fények stabilan 0.1 értéken maradnak
            sunColor = new THREE.Color(0x336699);
            skyColor = new THREE.Color(0x050a12);
            fogColor = new THREE.Color(0x050a12);
            sunIntensity = 0.1;
            hemiIntensity = 0.1;
            ambIntensity = 0.1;
            iblIntensity = 0.1;
            fogDensity = 0.0022;
        }

        if (window._kikotoSunLight) {
            window._kikotoSunLight.color.copy(sunColor);
            window._kikotoSunLight.intensity = sunIntensity;
        }
        if (window._kikotoHemiLight) {
            window._kikotoHemiLight.intensity = hemiIntensity;
        }
        if (window._kikotoAmbientLight) {
            window._kikotoAmbientLight.intensity = ambIntensity;
        }
        if (window._kikotoWater && window._kikotoWater.material && window._kikotoWater.material.uniforms) {
            if (window._kikotoWater.material.uniforms['sunDirection']) {
                window._kikotoWater.material.uniforms['sunDirection'].value.set(sunX, sunY, sunZ).normalize();
            }
            if (window._kikotoWater.material.uniforms['sunColor']) {
                window._kikotoWater.material.uniforms['sunColor'].value.copy(sunColor);
            }
        }

        // Éjszakai kivilágítási faktor (0.0: nappal, 1.0: éjszaka, folyamatos átmenet alkonyatkor és hajnalban)
        let nightGlowFactor = 0.0;
        if (p >= 0.60 && p < 0.85) {
            nightGlowFactor = (p - 0.60) / 0.25; // 0.0 -> 1.0 (sötétedéskor felkapcsol)
        } else if (p >= 0.85 || p < 0.10) {
            nightGlowFactor = 1.0; // 1.0 (éjszaka teljes kivilágítás)
        } else if (p >= 0.10 && p < 0.35) {
            nightGlowFactor = 1.0 - ((p - 0.10) / 0.25); // 1.0 -> 0.0 (hajnalban lekapcsol)
        }

        // Bank Belső Mécses/Lámpa (Mesh1006 / Bank) & Ablakok Kapcsolása:
        // Reggel 6:00-kor lekapcsol 5-re, este 18:00-kor felkapcsol 160-ra
        const isBankNight = (hrs >= 18 || hrs < 6);
        const bankLanternInt = isBankNight ? 160.0 : 5.0;
        const bankGlowFactor = isBankNight ? 1.0 : 0.0;

        if (window._kikotoBankLight) {
            window._kikotoBankLight.intensity = bankLanternInt;
        }

        // Bank ablakok ragyogása (Kékes tónusú Emissive Glow az uveg_ablak felületen 18:00-tól 6:00-ig):
        if (window._kikotoBankWindowMaterials && window._kikotoBankWindowMaterials.length > 0) {
            const windowEmissiveColor = new THREE.Color(0x33bbee); // Misztikus / Kékes ragyogás
            window._kikotoBankWindowMaterials.forEach(mat => {
                if (mat) {
                    if (!mat.emissive) mat.emissive = new THREE.Color(0x000000);
                    mat.emissive.copy(windowEmissiveColor).multiplyScalar(bankGlowFactor);
                    if ('emissiveIntensity' in mat) {
                        mat.emissiveIntensity = bankGlowFactor * 2.2;
                    }
                    mat.needsUpdate = true;
                }
            });
        }

        // Taverna Lámpa (Taverna.001 > LampaMesh > KocsmaMaterial.001) lámpafény és sárga izzófény:
        // Nappal is látható meleg sárga izzás (1.5), éjszaka teljes világítás (25.0 pontfény, 3.5 izzás)
        const tavernaLightInt = THREE.MathUtils.lerp(5.0, 25.0, nightGlowFactor);
        if (window._kikotoTavernaLight) {
            window._kikotoTavernaLight.intensity = tavernaLightInt;
        }
        if (window._kikotoTavernaLampMaterials && window._kikotoTavernaLampMaterials.length > 0) {
            const glowInt = THREE.MathUtils.lerp(1.5, 3.5, nightGlowFactor);
            const lampEmissiveColor = new THREE.Color(0xffcc22); // Szép meleg arany-sárga lámpaizzó fény
            window._kikotoTavernaLampMaterials.forEach(mat => {
                if (mat) {
                    if (!mat.emissive) mat.emissive = new THREE.Color(0x000000);
                    mat.emissive.copy(lampEmissiveColor);
                    mat.emissiveIntensity = glowInt;
                    mat.toneMapped = false;
                    mat.needsUpdate = true;
                }
            });
        }

        // Hajóácsműhely (Hajoacsmuhely) éjszakai belső kivilágítás (70.0):
        const hajoacsLightInt = THREE.MathUtils.lerp(0.0, 70.0, nightGlowFactor);
        if (window._kikotoHajoacsLight) {
            window._kikotoHajoacsLight.intensity = hajoacsLightInt;
        }

        if (scene) {
            scene.background.copy(skyColor);
            if (scene.fog) {
                scene.fog.color.copy(fogColor);
                scene.fog.density = fogDensity;
            }
        }
        if (scene) {
            scene.traverse(child => {
                if (child.isMesh && child.material && child !== water) {
                    const mats = Array.isArray(child.material) ? child.material : [child.material];
                    mats.forEach(m => {
                        if (m && 'envMapIntensity' in m) {
                            m.envMapIntensity = iblIntensity;
                        }
                    });
                }
            });
        }
        if (water && water.material && water.material.uniforms) {
            if (window._kikotoSunLight) {
                water.material.uniforms['sunDirection'].value.copy(window._kikotoSunLight.position).normalize();
                water.material.uniforms['sunColor'].value.copy(window._kikotoSunLight.color);
            }
            if (p < 0.35) {
                water.material.uniforms['waterColor'].value.setHex(0x1476a6);
            } else if (p < 0.85) {
                water.material.uniforms['waterColor'].value.setHex(0x10557a);
            } else {
                water.material.uniforms['waterColor'].value.setHex(0x061826);
            }
        }
    }

    // Modell Betöltő (GLTFLoader)
    function loadHarborModel() {
        const modelPath = 'https://storage.googleapis.com/kalozsziget-assets/assets/models/HEBOK_Kikoto_egyszerusitett_Blender.glb';
        const loader = new GLTFLoader();

        const loaderFill = document.getElementById('loader-fill');
        const loaderStatus = document.getElementById('loader-status');
        const overlay = document.getElementById('kikoto-3d-loading-overlay') || document.getElementById('loading-overlay');
        const statsText = document.getElementById('model-stats-text');

        if (overlay) {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'all';
            overlay.classList.add('active');
        }
        if (window.ClockworkEngine) {
            window.ClockworkEngine.start();
        }
        if (window.ClockworkDispenser) {
            window.ClockworkDispenser.start();
        }

        loader.load(
            modelPath,
            function (gltf) {
                harborModel = gltf.scene;
                window._kikotoModel = harborModel;

                // Modell anyag- és árnyékolási beállításainak érvényesítése
                harborModel.traverse(function (child) {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;

                        if (child.material) {
                            const materials = Array.isArray(child.material) ? child.material : [child.material];
                            materials.forEach(mat => {
                                mat.needsUpdate = true;

                                // Textúrák sRGB színterének biztosítása
                                if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
                                if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;

                                // Átlátszó üveg, víz és transmission anyagok megfelelő megjelenítése
                                if (mat.transparent || mat.opacity < 1.0 || (typeof mat.transmission !== 'undefined' && mat.transmission > 0)) {
                                    mat.transparent = true;
                                    mat.depthWrite = true;
                                    mat.side = THREE.DoubleSide;
                                }

                                // Környezeti tükröződés (fémekhez és üvegekhez)
                                mat.envMapIntensity = 1.0;
                            });
                        }
                    }
                });

                scene.add(harborModel);

                // 1. Blenderben beágyazott akciók és animációk indítása (ha vannak)
                if (gltf.animations && gltf.animations.length > 0) {
                    animationMixer = new THREE.AnimationMixer(harborModel);
                    gltf.animations.forEach(clip => {
                        const action = animationMixer.clipAction(clip);
                        action.play();
                    });
                }

                // 2. FoamRing kikapcsolása (Megszüntetve, helyette a valós idejű Depth Buffer parti hab működik)
                foamRingMesh = harborModel.getObjectByName("FoamRing");
                if (!foamRingMesh) {
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && node.name.toLowerCase().includes('foamring')) {
                            foamRingMesh = node;
                        }
                    });
                }
                if (foamRingMesh) {
                    foamRingMesh.visible = false;
                }

                // 3. Bank (Mesh1006 / Bank / Mesh1.001) belső mécses / lámpa fényforrás és KIZÁRÓLAG az uveg_ablak anyag éjszakai ragyogása
                let bankNode = null;
                let bankWindowMaterials = [];
                harborModel.traverse(node => {
                    if (node.isMesh) {
                        const isBank = (node.name === "Mesh1006" || node.name === "Bank" || node.name === "Mesh1.001" || node.name === "Mesh1001" || (node.name && (node.name.includes("1006") || node.name.includes("1.001") || node.name.toLowerCase().includes("bank"))));
                        if (isBank && !bankNode && (node.name === "Mesh1006" || node.name.toLowerCase().includes("bank") || node.name === "Mesh1.001")) {
                            bankNode = node;
                        }
                        const mats = Array.isArray(node.material) ? node.material : [node.material];
                        mats.forEach(mat => {
                            if (mat) {
                                const matName = mat.name ? mat.name.toLowerCase() : "";
                                const isUvegAblak = matName === "uveg_ablak" ||
                                    matName.includes("uveg_ablak") ||
                                    matName.includes("uveg.ablak") ||
                                    matName.includes("uveg ablak") ||
                                    (matName.includes("uveg") && matName.includes("ablak"));

                                if (isUvegAblak) {
                                    mat.transparent = true;
                                    mat.depthWrite = true;
                                    mat.side = THREE.DoubleSide; // Kétoldalas renderelés, hogy a belső fény átvilágítson
                                    mat.needsUpdate = true;
                                    if (!bankWindowMaterials.includes(mat)) {
                                        bankWindowMaterials.push(mat);
                                    }
                                } else if (isBank) {
                                    // A Bank falai, tetőzete és egyéb alkatrészei NE világítsanak és ne kapjanak emissziót!
                                    if (mat.emissive) {
                                        mat.emissive.setHex(0x000000);
                                    }
                                    if ('emissiveIntensity' in mat) {
                                        mat.emissiveIntensity = 0.0;
                                    }
                                    mat.needsUpdate = true;
                                }
                            }
                        });
                    }
                });
                window._kikotoBankWindowMaterials = bankWindowMaterials;

                // A Bank (Mesh1006) belsejének mértani közepébe helyezett kékes lámpás fényforrás
                if (bankNode) {
                    const bankLantern = new THREE.PointLight(0x33bbee, 160.0, 100);
                    // Helyi koordináták a Bank elemen belül: X: 0, Y: 3.0 (az ablakok magasságában), Z: -0.5 (a szoba mértani közepe)
                    bankLantern.position.set(0, 3.0, -0.5);
                    bankNode.add(bankLantern);
                    window._kikotoBankLight = bankLantern;
                }

                // 4. Taverna Lámpa (Taverna.001 > LampaMesh > KocsmaMaterial.001) lámpafény és lámpaizzó sárga ragyogás
                let tavernaLampNode = harborModel.getObjectByName("Taverna001") || harborModel.getObjectByName("Taverna.001");
                let tavernaLampMaterials = [];

                function isTavernaBulb(mat) {
                    if (!mat || !mat.name) return false;
                    const name = mat.name.trim().toLowerCase();
                    // Kifejezetten a .001 izzó anyag azonosítása, a sima kocsmamaterial épületanyag KIZÁRÁSÁVAL!
                    return name === "kocsmamaterial.001" || name.startsWith("kocsmamaterial.001") || name.startsWith("kocsma_material.001");
                }

                harborModel.traverse(node => {
                    if (node.name && (node.name === "Taverna001" || node.name === "Taverna.001" || node.name.includes("Taverna001") || node.name.includes("Taverna.001"))) {
                        if (!tavernaLampNode) tavernaLampNode = node;
                    }
                    if (node.isMesh && node.material) {
                        const mats = Array.isArray(node.material) ? node.material : [node.material];
                        mats.forEach(mat => {
                            if (isTavernaBulb(mat)) {
                                mat.emissive = new THREE.Color(0xffcc22);
                                mat.emissiveIntensity = 2.8;
                                mat.toneMapped = false;
                                mat.needsUpdate = true;
                                if (!tavernaLampMaterials.includes(mat)) {
                                    tavernaLampMaterials.push(mat);
                                }
                            } else {
                                // A sima KocsmaMaterial (a kocsma épülete), fa, kő és lámpaoszlop anyagok NE világítsanak!
                                const mNameLower = (mat.name || '').toLowerCase();
                                if (mNameLower.includes("kocsma") || mNameLower.includes("lampa") || (node.name && node.name.toLowerCase().includes("lampa"))) {
                                    if (mat.emissive) mat.emissive.setHex(0x000000);
                                    if ('emissiveIntensity' in mat) mat.emissiveIntensity = 0.0;
                                    mat.needsUpdate = true;
                                }
                            }
                        });
                    }
                });

                if (tavernaLampNode) {
                    tavernaLampNode.traverse(child => {
                        if (child.isMesh && child.material) {
                            const mats = Array.isArray(child.material) ? child.material : [child.material];
                            mats.forEach(mat => {
                                if (isTavernaBulb(mat)) {
                                    mat.emissive = new THREE.Color(0xffcc22);
                                    mat.emissiveIntensity = 2.8;
                                    mat.toneMapped = false;
                                    mat.needsUpdate = true;
                                    if (!tavernaLampMaterials.includes(mat)) {
                                        tavernaLampMaterials.push(mat);
                                    }
                                } else {
                                    if (mat.emissive) mat.emissive.setHex(0x000000);
                                    if ('emissiveIntensity' in mat) mat.emissiveIntensity = 0.0;
                                    mat.needsUpdate = true;
                                }
                            });
                        }
                    });

                    const tavernaLight = new THREE.PointLight(0xffaa33, 8.0, 7.5, 1.5);
                    // Helyi koordináták a Taverna elemen belül a LampaMesh lámpafejéhez: X: 2.44, Y: 1.98, Z: 2.61
                    tavernaLight.position.set(2.44, 1.98, 2.61);
                    tavernaLampNode.add(tavernaLight);
                    window._kikotoTavernaLight = tavernaLight;
                }
                window._kikotoTavernaLampMaterials = tavernaLampMaterials;

                // 5. Hajóácsműhely (Hajoacsmuhely pozíció: -15.8, 1.0, -15.3) éjszakai belső kivilágítás és interaktív regisztráció
                let hajoacsNode = harborModel.getObjectByName("Hajoacsmuhely");
                if (!hajoacsNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Hajoacsmuhely" || node.name.includes("Hajoacs") || node.name.toLowerCase().includes("hajoacs"))) {
                            hajoacsNode = node;
                        }
                    });
                }
                if (hajoacsNode) {
                    const mats = Array.isArray(hajoacsNode.material) ? hajoacsNode.material : [hajoacsNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });
                    const hajoacsLight = new THREE.PointLight(0xffaa33, 0.0, 30.0, 1.3);
                    // Helyi koordináták a műhely belsejében a függő mécses magasságában: X: 0.0, Y: 2.5, Z: 0.0
                    hajoacsLight.position.set(0.0, 2.5, 0.0);
                    hajoacsNode.add(hajoacsLight);
                    window._kikotoHajoacsLight = hajoacsLight;

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let hajoacsMeshes = [];
                    if (hajoacsNode.isMesh) hajoacsMeshes.push(hajoacsNode);
                    hajoacsNode.traverse(node => {
                        if (node.isMesh && !hajoacsMeshes.includes(node)) {
                            hajoacsMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Hajoacsmuhely" || node.name.startsWith("Hajoacs") || node.name.toLowerCase().includes("hajoacs"))) {
                            if (!hajoacsMeshes.includes(node)) {
                                hajoacsMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'hajomuhely_oldal',
                        name: 'Hajoacsmuhely',
                        langKey: 'title_hajoacs',
                        defaultLabel: '🛠️ A Hajóács Műhely',
                        node: hajoacsNode,
                        meshes: hajoacsMeshes,
                        worldPos: new THREE.Vector3(-15.8, 1.0, -15.3),
                        camTargetPos: new THREE.Vector3(-22.0, 3.2, -15.8),
                        lookAtTarget: new THREE.Vector3(-15.8, 2.2, -15.3)
                    });
                }

                // 5/B. Másolóműhely (Masolomuhely pozíció: 2.8, 10.1, -12.5) interaktív regisztráció
                let masoloNode = harborModel.getObjectByName("Masolomuhely");
                if (!masoloNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Masolomuhely" || node.name.includes("Masolo") || node.name.toLowerCase().includes("masolo"))) {
                            masoloNode = node;
                        }
                    });
                }
                if (masoloNode) {
                    const mats = Array.isArray(masoloNode.material) ? masoloNode.material : [masoloNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let masoloMeshes = [];
                    if (masoloNode.isMesh) masoloMeshes.push(masoloNode);
                    masoloNode.traverse(node => {
                        if (node.isMesh && !masoloMeshes.includes(node)) {
                            masoloMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Masolomuhely" || node.name.startsWith("Masolo") || node.name.toLowerCase().includes("masolo"))) {
                            if (!masoloMeshes.includes(node)) {
                                masoloMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'masolatok_oldal',
                        name: 'Masolomuhely',
                        langKey: 'title_masolatbolt',
                        defaultLabel: '📚 A Másolatok Boltja',
                        node: masoloNode,
                        meshes: masoloMeshes,
                        worldPos: new THREE.Vector3(2.8, 10.1, -12.5),
                        camTargetPos: new THREE.Vector3(-3.5, 12.0, -13.0),
                        lookAtTarget: new THREE.Vector3(2.8, 11.2, -12.5)
                    });
                }

                // 5/C. Tekercsmester (Tekercsmester pozíció: 1.3, 9.5, -7.6) interaktív regisztráció
                let tekercsNode = harborModel.getObjectByName("Tekercsmester");
                if (!tekercsNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Tekercsmester" || node.name.includes("Tekercs") || node.name.toLowerCase().includes("tekercs"))) {
                            tekercsNode = node;
                        }
                    });
                }
                if (tekercsNode) {
                    const mats = Array.isArray(tekercsNode.material) ? tekercsNode.material : [tekercsNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let tekercsMeshes = [];
                    if (tekercsNode.isMesh) tekercsMeshes.push(tekercsNode);
                    tekercsNode.traverse(node => {
                        if (node.isMesh && !tekercsMeshes.includes(node)) {
                            tekercsMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Tekercsmester" || node.name.startsWith("Tekercs") || node.name.toLowerCase().includes("tekercs"))) {
                            if (!tekercsMeshes.includes(node)) {
                                tekercsMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'tekercsmester_oldal',
                        name: 'Tekercsmester',
                        langKey: 'title_tekercsmester',
                        defaultLabel: '📜 A Tekercspréselő Műhely',
                        node: tekercsNode,
                        meshes: tekercsMeshes,
                        worldPos: new THREE.Vector3(1.3, 9.5, -7.6),
                        camTargetPos: new THREE.Vector3(-4.8, 11.5, -8.0),
                        lookAtTarget: new THREE.Vector3(1.3, 10.6, -7.6)
                    });
                }

                // 5/D. Szentély (Szentely pozíció: 17.6, 12.7, 0.7) interaktív regisztráció
                let szentelyNode = harborModel.getObjectByName("Szentely");
                if (!szentelyNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Szentely" || node.name.includes("Szentely") || node.name.toLowerCase().includes("szentely") || node.name.toLowerCase().includes("shrine"))) {
                            szentelyNode = node;
                        }
                    });
                }
                if (szentelyNode) {
                    const mats = Array.isArray(szentelyNode.material) ? szentelyNode.material : [szentelyNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let szentelyMeshes = [];
                    if (szentelyNode.isMesh) szentelyMeshes.push(szentelyNode);
                    szentelyNode.traverse(node => {
                        if (node.isMesh && !szentelyMeshes.includes(node)) {
                            szentelyMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Szentely" || node.name.startsWith("Szentely") || node.name.toLowerCase().includes("szentely"))) {
                            if (!szentelyMeshes.includes(node)) {
                                szentelyMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'konyvszentely_oldal',
                        name: 'Szentely',
                        langKey: 'title_konyvszentely',
                        defaultLabel: '✨ Paideia Könyvszentélye',
                        node: szentelyNode,
                        meshes: szentelyMeshes,
                        worldPos: new THREE.Vector3(17.6, 12.7, 0.7),
                        camTargetPos: new THREE.Vector3(10.5, 14.5, 0.7),
                        lookAtTarget: new THREE.Vector3(17.6, 13.8, 0.7)
                    });
                }

                // 5/E. Útjelző tábla / Felhőkolostor útjelző (Utjelzotabla pozíció: 6.3, 8.2, 20.6) interaktív regisztráció
                let utjelzoNode = harborModel.getObjectByName("Utjelzotabla");
                if (!utjelzoNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Utjelzotabla" || node.name.includes("Utjelzo") || node.name.toLowerCase().includes("utjelzo") || node.name.toLowerCase().includes("signpost") || node.name.toLowerCase().includes("tabla"))) {
                            utjelzoNode = node;
                        }
                    });
                }
                if (utjelzoNode) {
                    const mats = Array.isArray(utjelzoNode.material) ? utjelzoNode.material : [utjelzoNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let utjelzoMeshes = [];
                    if (utjelzoNode.isMesh) utjelzoMeshes.push(utjelzoNode);
                    utjelzoNode.traverse(node => {
                        if (node.isMesh && !utjelzoMeshes.includes(node)) {
                            utjelzoMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Utjelzotabla" || node.name.startsWith("Utjelzo") || node.name.toLowerCase().includes("utjelzo"))) {
                            if (!utjelzoMeshes.includes(node)) {
                                utjelzoMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'felhokolostor_oldal',
                        name: 'Utjelzotabla',
                        langKey: 'title_felhokolostor',
                        defaultLabel: '☁️ A Felhőkolostor',
                        node: utjelzoNode,
                        meshes: utjelzoMeshes,
                        worldPos: new THREE.Vector3(6.3, 8.2, 20.6),
                        camTargetPos: new THREE.Vector3(0.8, 9.6, 19.8),
                        lookAtTarget: new THREE.Vector3(6.3, 9.2, 20.6)
                    });
                }

                // 5/F. Taverna / Kocsma (Taverna pozíció: -22.7, 0.9, 12.5) interaktív regisztráció
                let tavernaMainNode = harborModel.getObjectByName("Taverna") || harborModel.getObjectByName("Taverna.001") || harborModel.getObjectByName("Taverna001");
                if (!tavernaMainNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Taverna" || node.name.startsWith("Taverna") || node.name.toLowerCase().includes("taverna") || node.name.toLowerCase().includes("kocsma"))) {
                            tavernaMainNode = node;
                        }
                    });
                }
                if (tavernaMainNode) {
                    const mats = Array.isArray(tavernaMainNode.material) ? tavernaMainNode.material : [tavernaMainNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let tavernaMeshes = [];
                    if (tavernaMainNode.isMesh) tavernaMeshes.push(tavernaMainNode);
                    tavernaMainNode.traverse(node => {
                        if (node.isMesh && !tavernaMeshes.includes(node)) {
                            tavernaMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Taverna" || node.name.startsWith("Taverna") || node.name.toLowerCase().includes("taverna"))) {
                            if (!tavernaMeshes.includes(node)) {
                                tavernaMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'taverna_oldal',
                        name: 'Taverna',
                        langKey: 'title_taverna',
                        defaultLabel: '🍺 Fogadó a Rózsaszín Gyöngyhöz',
                        node: tavernaMainNode,
                        meshes: tavernaMeshes,
                        worldPos: new THREE.Vector3(-22.7, 0.9, 12.5),
                        camTargetPos: new THREE.Vector3(-30.8, 3.8, 12.2),
                        lookAtTarget: new THREE.Vector3(-22.7, 2.5, 12.5)
                    });
                }

                // 5/G. Toborzóbarakk (SM_Bld_Shanty_Preset_01 pozíció: -19.6, 1.0, 17.3) interaktív regisztráció
                let toborzoNode = harborModel.getObjectByName("SM_Bld_Shanty_Preset_01");
                if (!toborzoNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "SM_Bld_Shanty_Preset_01" || node.name.includes("Shanty_Preset_01") || node.name.includes("Toborzo") || node.name.toLowerCase().includes("toborzo"))) {
                            toborzoNode = node;
                        }
                    });
                }
                if (toborzoNode) {
                    const mats = Array.isArray(toborzoNode.material) ? toborzoNode.material : [toborzoNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let toborzoMeshes = [];
                    if (toborzoNode.isMesh) toborzoMeshes.push(toborzoNode);
                    toborzoNode.traverse(node => {
                        if (node.isMesh && !toborzoMeshes.includes(node)) {
                            toborzoMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "SM_Bld_Shanty_Preset_01" || node.name.startsWith("SM_Bld_Shanty_Preset_01") || node.name.includes("Shanty_Preset_01"))) {
                            if (!toborzoMeshes.includes(node)) {
                                toborzoMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'openToborzoBarakk',
                        name: 'SM_Bld_Shanty_Preset_01',
                        langKey: 'harbor_nav_barracks',
                        defaultLabel: '⚓ Toborzóbarakk',
                        node: toborzoNode,
                        meshes: toborzoMeshes,
                        worldPos: new THREE.Vector3(-19.6, 1.0, 17.3),
                        camTargetPos: new THREE.Vector3(-27.5, 3.8, 17.0),
                        lookAtTarget: new THREE.Vector3(-19.6, 2.5, 17.3)
                    });
                }

                // 5/H. Piac / A kikötői piac (Piac pozíció: -18.8, 1.0, -0.4) interaktív regisztráció
                let piacNode = harborModel.getObjectByName("Piac");
                if (!piacNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Piac" || node.name.startsWith("Piac") || node.name.toLowerCase().includes("piac") || node.name.toLowerCase().includes("market"))) {
                            piacNode = node;
                        }
                    });
                }
                if (piacNode) {
                    const mats = Array.isArray(piacNode.material) ? piacNode.material : [piacNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let piacMeshes = [];
                    if (piacNode.isMesh) piacMeshes.push(piacNode);
                    piacNode.traverse(node => {
                        if (node.isMesh && !piacMeshes.includes(node)) {
                            piacMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Piac" || node.name.startsWith("Piac") || node.name.includes("Piac"))) {
                            if (!piacMeshes.includes(node)) {
                                piacMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'piac_oldal',
                        name: 'Piac',
                        langKey: 'title_piac',
                        defaultLabel: '💰 A kikötői piac',
                        node: piacNode,
                        meshes: piacMeshes,
                        worldPos: new THREE.Vector3(-18.8, 1.0, -0.4),
                        camTargetPos: new THREE.Vector3(-26.8, 3.8, -0.4),
                        lookAtTarget: new THREE.Vector3(-18.8, 2.5, -0.4)
                    });
                }

                // 5/I. Bank / eBankPirates (Mesh1006_1 pozíció: -7.0, 0.9, 0.8) interaktív regisztráció
                let bankBuildingNode = harborModel.getObjectByName("Mesh1006_1");
                if (!bankBuildingNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "Mesh1006_1" || node.name === "Mesh1006" || node.name.startsWith("Mesh1006") || node.name.toLowerCase().includes("bank"))) {
                            bankBuildingNode = node;
                        }
                    });
                }
                if (bankBuildingNode) {
                    const mats = Array.isArray(bankBuildingNode.material) ? bankBuildingNode.material : [bankBuildingNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let bankMeshes = [];
                    if (bankBuildingNode.isMesh) bankMeshes.push(bankBuildingNode);
                    bankBuildingNode.traverse(node => {
                        if (node.isMesh && !bankMeshes.includes(node)) {
                            bankMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "Mesh1006_1" || node.name.startsWith("Mesh1006_1") || node.name.startsWith("Mesh1006"))) {
                            if (!bankMeshes.includes(node)) {
                                bankMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'bank_oldal',
                        name: 'Mesh1006_1',
                        langKey: 'title_bank',
                        defaultLabel: '🏦 Az eBankPirates',
                        node: bankBuildingNode,
                        meshes: bankMeshes,
                        worldPos: new THREE.Vector3(-7.0, 0.9, 0.8),
                        camTargetPos: new THREE.Vector3(-15.0, 3.8, 0.8),
                        lookAtTarget: new THREE.Vector3(-7.0, 2.5, 0.8)
                    });
                }

                // 5/J. Kikötőmester Kunyhó / Barba Negra (SM_Bld_Shanty_Preset_03 pozíció: -4.9, 0.9, -25.0) interaktív regisztráció
                let harbormasterNode = harborModel.getObjectByName("SM_Bld_Shanty_Preset_03");
                if (!harbormasterNode) {
                    harborModel.traverse(node => {
                        if (node.name && (node.name === "SM_Bld_Shanty_Preset_03" || node.name.includes("Shanty_Preset_03") || node.name.toLowerCase().includes("harbormaster") || node.name.toLowerCase().includes("kikotomester"))) {
                            harbormasterNode = node;
                        }
                    });
                }
                if (harbormasterNode) {
                    const mats = Array.isArray(harbormasterNode.material) ? harbormasterNode.material : [harbormasterNode.material];
                    mats.forEach(mat => {
                        if (mat) {
                            mat.side = THREE.DoubleSide;
                            mat.needsUpdate = true;
                        }
                    });

                    // Összes almesh összegyűjtése az interaktív raycastinghez és derengéshez
                    let harbormasterMeshes = [];
                    if (harbormasterNode.isMesh) harbormasterMeshes.push(harbormasterNode);
                    harbormasterNode.traverse(node => {
                        if (node.isMesh && !harbormasterMeshes.includes(node)) {
                            harbormasterMeshes.push(node);
                        }
                    });
                    harborModel.traverse(node => {
                        if (node.isMesh && node.name && (node.name === "SM_Bld_Shanty_Preset_03" || node.name.startsWith("SM_Bld_Shanty_Preset_03") || node.name.includes("Shanty_Preset_03"))) {
                            if (!harbormasterMeshes.includes(node)) {
                                harbormasterMeshes.push(node);
                            }
                        }
                    });

                    interactiveLocations.push({
                        id: 'openHarbormasterNPC',
                        name: 'SM_Bld_Shanty_Preset_03',
                        langKey: 'harbor_nav_harbormaster',
                        defaultLabel: '⚓ Kikötőmester (Barba Negra)',
                        node: harbormasterNode,
                        meshes: harbormasterMeshes,
                        worldPos: new THREE.Vector3(-4.9, 0.9, -25.0),
                        camTargetPos: new THREE.Vector3(-12.8, 3.8, -25.0),
                        lookAtTarget: new THREE.Vector3(-4.9, 2.5, -25.0),
                        npcId: 'harbormaster',
                        npcConfig: {
                            name: 'Barba Negra',
                            role: 'Kikötőmester',
                            icon: '<i class="fas fa-anchor"></i>',
                            headerColor: '#37474f',
                            portrait: 'https://storage.googleapis.com/kalozsziget-assets/assets/images/Pirate_sitting_in_pilot_chair.jpg',
                            video: 'https://storage.googleapis.com/kalozsziget-assets/assets/videos/Pirate_sitting_in_pilot_chair.mp4',
                            videoLoop: true,
                            msgIcon: '<i class="fas fa-anchor" style="color:#d4af37; margin-right:5px;"></i>',
                            loaderHTML: '<i class="fas fa-anchor fa-spin" style="color:#d4af37; margin-right:8px;"></i> <i>A Kikötőmester számol...</i>',
                            styles: {
                                modal: {
                                    justifyContent: 'flex-end',
                                    alignItems: 'stretch',
                                    background: '',
                                    padding: '0'
                                },
                                content: {
                                    width: '350px',
                                    height: '100vh',
                                    maxWidth: '85vw',
                                    margin: '0',
                                    borderRadius: '2',
                                    border: 'none',
                                    borderLeft: '5px solid #d4af37',
                                    backgroundColor: '#1f0901',
                                    color: '#241512',
                                    backgroundImage: 'https://www.transparenttextures.com/patterns/wood-pattern.png',
                                    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
                                }
                            }
                        }
                    });
                }

                // 6. Darupad (SM_Prop_Crane_02001 / DarupadMesh) felfüggesztése a felső rögzítési középpont körül
                let cranePadFound = harborModel.getObjectByName("SM_Prop_Crane_02001") ||
                    harborModel.getObjectByName("SM_Prop_Crane_02.001") ||
                    harborModel.getObjectByName("DarupadMesh");
                if (!cranePadFound) {
                    harborModel.traverse(node => {
                        if (node.isMesh && (node.name.includes("Crane_02") || node.name.includes("Darupad") || node.name.includes("crane"))) {
                            if (node.name.includes("001") || node.name.includes("Darupad")) {
                                cranePadFound = node;
                            }
                        }
                    });
                }
                if (cranePadFound && cranePadFound.geometry) {
                    cranePadMesh = cranePadFound;
                    cranePadMesh.geometry.computeBoundingBox();
                    const b = cranePadMesh.geometry.boundingBox;

                    // Valódi felső felfüggesztési középpont a darukaron (a kötél/lánc felső rögzítése a darugémen, Y: ~8.56m magasságban)
                    const localAnchor = new THREE.Vector3((b.min.x + b.max.x) / 2, (b.min.y + b.max.y) / 2, b.min.z);

                    // Geometria eltolása, hogy a helyi origó (0,0,0) a felső fix felfüggesztési pont legyen
                    cranePadMesh.geometry.translate(-localAnchor.x, -localAnchor.y, -localAnchor.z);

                    // Az eltolt origó kompenzálása az objektum pozícióján
                    const worldOffset = localAnchor.clone().applyEuler(cranePadMesh.rotation).multiply(cranePadMesh.scale);
                    cranePadMesh.position.add(worldOffset);

                    cranePadBaseRotation = cranePadMesh.rotation.clone();
                    window._kikotoCranePad = cranePadMesh;
                    window._kikotoCranePadBaseRot = cranePadBaseRotation;
                }

                // 7. Pálmafák alsó fix gyökérponthoz igazított imbolygása (SM_Env_PalmTree_Tall_02, SM_Env_PalmTree_02002, SM_Env_PalmTree_02, SM_Env_PalmTree_02001)
                palmTreesList = [];
                const standardPalmNames = [
                    "SM_Env_PalmTree_Tall_02",
                    "SM_Env_PalmTree_02002",
                    "SM_Env_PalmTree_02.002",
                    "SM_Env_PalmTree_02",
                    "SM_Env_PalmTree_02001",
                    "SM_Env_PalmTree_02.001"
                ];
                harborModel.traverse(node => {
                    if (node.isMesh && node.name && standardPalmNames.some(pName => node.name === pName || (node.name.includes(pName) && !node.name.includes("Tall_02001") && !node.name.includes("Tall_02.001")))) {
                        // Geometria egyediesítése (klónozás), hogy a megosztott hálók ne írják felül egymást
                        node.geometry = node.geometry.clone();
                        node.geometry.computeBoundingBox();
                        const b = node.geometry.boundingBox;

                        // Alsó fix rögzítési pont a gyökérzetnél (b.max.z -> talajszint)
                        const localAnchor = new THREE.Vector3(0, 0, b.max.z);

                        // Geometria eltolása, hogy a helyi origó (0,0,0) az alsó fix gyökérpont legyen
                        node.geometry.translate(-localAnchor.x, -localAnchor.y, -localAnchor.z);

                        // Az eltolt origó kompenzálása az objektum pozícióján
                        const worldOffset = localAnchor.clone().applyEuler(node.rotation).multiply(node.scale);
                        node.position.add(worldOffset);

                        const isTall = node.name.includes("Tall");
                        const idx = palmTreesList.length;

                        palmTreesList.push({
                            mesh: node,
                            baseRot: node.rotation.clone(),
                            phase: idx * 1.57 + 0.3,
                            speed: 0.85 + (idx % 3) * 0.15,
                            amplitude: isTall ? 0.030 : 0.022
                        });
                    }
                });
                window._kikotoPalmTrees = palmTreesList;

                // 8. Taverna Cégér (Taverna002 / CegerMesh pozíció: -22.7, 0.9, 12.5) felső fix felfüggesztési ponthoz rögzített lengése
                let cegerFound = harborModel.getObjectByName("Taverna002") ||
                    harborModel.getObjectByName("Taverna.002") ||
                    harborModel.getObjectByName("CegerMesh");
                if (!cegerFound) {
                    harborModel.traverse(node => {
                        if (node.isMesh && (node.name.includes("Taverna002") || node.name.includes("Taverna.002") || node.name.toLowerCase().includes("ceger"))) {
                            cegerFound = node;
                        }
                    });
                }
                if (cegerFound && cegerFound.geometry) {
                    cegerMesh = cegerFound;
                    cegerMesh.geometry = cegerMesh.geometry.clone();
                    cegerMesh.geometry.computeBoundingBox();
                    const b = cegerMesh.geometry.boundingBox;

                    // Felső fix felfüggesztési pont a cégértartó vasnál (b.max.y -> Y: ~5.94m)
                    const localAnchor = new THREE.Vector3((b.min.x + b.max.x) / 2, b.max.y, (b.min.z + b.max.z) / 2);

                    // Geometria eltolása, hogy a helyi origó (0,0,0) a felső fix felfüggesztési pont legyen
                    cegerMesh.geometry.translate(-localAnchor.x, -localAnchor.y, -localAnchor.z);

                    // Az eltolt origó kompenzálása az objektum pozícióján
                    const worldOffset = localAnchor.clone().applyEuler(cegerMesh.rotation).multiply(cegerMesh.scale);
                    cegerMesh.position.add(worldOffset);

                    cegerBaseRotation = cegerMesh.rotation.clone();
                    window._kikotoCeger = cegerMesh;
                    window._kikotoCegerBaseRot = cegerBaseRotation;
                }

                // 9. Pálma Bokor (SM_Env_PalmTree_Tall_02001 pozíció: 2.7, -6.5, 16.0) 2/3 magasságban fixált szélkifordulása
                let palmBokorFound = harborModel.getObjectByName("SM_Env_PalmTree_Tall_02001") ||
                    harborModel.getObjectByName("SM_Env_PalmTree_Tall_02.001");
                if (!palmBokorFound) {
                    harborModel.traverse(node => {
                        if (node.isMesh && (node.name.includes("Tall_02001") || node.name.includes("Tall_02.001") || (node.name.includes("Tall") && node.position.y < 0))) {
                            palmBokorFound = node;
                        }
                    });
                }
                if (palmBokorFound && palmBokorFound.geometry) {
                    palmBokorMesh = palmBokorFound;
                    // Geometria egyediesítése (klónozás), hogy ne módosítsa a magas SM_Env_PalmTree_Tall_02 geometriáját
                    palmBokorMesh.geometry = palmBokorMesh.geometry.clone();
                    palmBokorMesh.geometry.computeBoundingBox();
                    const b = palmBokorMesh.geometry.boundingBox;

                    // Fixációs rögzítési pont a magasság 2/3-ánál (a gyökértől felfelé a korona felé)
                    const anchorZ = THREE.MathUtils.lerp(b.max.z, b.min.z, 2 / 3);
                    const localAnchor = new THREE.Vector3(0, 0, anchorZ);

                    // Geometria eltolása, hogy a helyi origó (0,0,0) a kétharmad magassági fixációs pont legyen
                    palmBokorMesh.geometry.translate(-localAnchor.x, -localAnchor.y, -localAnchor.z);

                    // Az eltolt origó kompenzálása az objektum pozícióján
                    const worldOffset = localAnchor.clone().applyEuler(palmBokorMesh.rotation).multiply(palmBokorMesh.scale);
                    palmBokorMesh.position.add(worldOffset);

                    palmBokorBaseRotation = palmBokorMesh.rotation.clone();
                    window._kikotoPalmBokor = palmBokorMesh;
                    window._kikotoPalmBokorBaseRot = palmBokorBaseRotation;
                }

                // 9.1. Móló, Híd, Cölöpök és Sziget Bázis Hullámgyűrűk (Módszer 2 kiterjesztése a kikötői építményekre)
                const pierRippleDefs = [
                    { name: "defaultMaterial011", fallbackPos: new THREE.Vector3(-31.7, 1.0, -14.2), sizeX: 5.0, sizeZ: 7.0, speed: 0.85, intensity: 1.0 },
                    { name: "node_id4001", fallbackPos: new THREE.Vector3(-33.0, -4.3, -4.7), sizeX: 6.0, sizeZ: 8.0, speed: 0.90, intensity: 1.0 },
                    { name: "Bridge001_Bridge_0", fallbackPos: new THREE.Vector3(-34.0, 3.5, 1.0), sizeX: 9.6, sizeZ: 4.5, speed: 0.85, intensity: 1.0 },
                    { name: "Bridge001_Bridge_0001", fallbackPos: new THREE.Vector3(-43.6, 3.5, 1.0), sizeX: 9.6, sizeZ: 4.5, speed: 0.85, intensity: 1.0 },
                    { name: "Bridge001_Bridge_0002", fallbackPos: new THREE.Vector3(-53.2, 3.5, 1.0), sizeX: 9.6, sizeZ: 4.5, speed: 0.85, intensity: 1.0 },
                    { name: "Bridge001_Bridge_0003", fallbackPos: new THREE.Vector3(-62.8, 3.5, 1.0), sizeX: 9.6, sizeZ: 4.5, speed: 0.85, intensity: 1.0 },
                    { name: "defaultMaterial003", fallbackPos: new THREE.Vector3(-45.0, 1.0, -17.3), sizeX: 5.0, sizeZ: 8.0, speed: 0.85, intensity: 1.0 },
                    { name: "Mesh_0001", fallbackPos: new THREE.Vector3(-33.7, 1.6, 7.7), sizeX: 5.0, sizeZ: 7.0, speed: 0.90, intensity: 1.0 },
                    { name: "Mesh_0", fallbackPos: new THREE.Vector3(-33.8, 1.8, 7.5), sizeX: 5.0, sizeZ: 7.0, speed: 0.90, intensity: 1.0 },
                    { name: "defaultMaterial002", fallbackPos: new THREE.Vector3(-33.3, 0.9, 14.4), sizeX: 5.5, sizeZ: 8.0, speed: 0.85, intensity: 1.0 },
                    { name: "defaultMaterial005", fallbackPos: new THREE.Vector3(-44.6, 0.9, 18.7), sizeX: 5.5, sizeZ: 8.0, speed: 0.85, intensity: 1.0 },
                    { name: "SM_Veh_Boat_Warship_01_Hull_Bare", fallbackPos: new THREE.Vector3(-34.1, -1.2, -26.4), sizeX: 7.5, sizeZ: 18.0, speed: 0.90, intensity: 1.1 },
                    { name: "Grass_bottom", fallbackPos: new THREE.Vector3(18.3, 0.9, -2.5), sizeX: 55.0, sizeZ: 75.0, speed: 0.55, intensity: 1.2 }
                ];

                pierRippleDefs.forEach(def => {
                    let targetObj = harborModel.getObjectByName(def.name);
                    if (!targetObj) {
                        harborModel.traverse(child => {
                            if (!targetObj && child.name && child.name === def.name) {
                                targetObj = child;
                            }
                        });
                    }
                    if (targetObj) {
                        createBoatRipple(targetObj, def.sizeX, def.sizeZ, def.speed, def.intensity);
                    } else {
                        createBoatRipple(def.fallbackPos, def.sizeX, def.sizeZ, def.speed, def.intensity);
                    }
                });

                // 9.2. Fedélzeti interaktív móló-, híd- és kikötői elemek regisztrálása
                registerDeckInteractiveElements();

                // 10. Tutorial Csónak (boat.glb) betöltése a móló (node_id4001: -33.0, -4.3, -4.7) mellé a vízre
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/boat.glb',
                    function (boatGltf) {
                        const boatModel = boatGltf.scene;
                        boatModel.scale.set(16.66, 16.66, 16.66); // Megduplázott csónakméret (~5.8m hossz, 2.0m szélesség)
                        boatModel.rotation.y = Math.PI; // Orrával a tenger felé fordítva
                        boatModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly beállítása
                        const bBox = new THREE.Box3().setFromObject(boatModel);
                        const bCenter = bBox.getCenter(new THREE.Vector3());
                        boatModel.position.x = -bCenter.x;
                        boatModel.position.z = -bCenter.z;
                        boatModel.position.y = -bBox.min.y - 0.30; // Természetes arányos vízbemerülés

                        boatGroup = new THREE.Group();
                        boatGroup.name = "TutorialBoatGroup";
                        // A móló melletti vízpozíció node_id4001 elemtől 0.5m-rel messzebb tolva: (-35.3, 0.10, -7.55)
                        boatGroup.position.set(-35.3, 0.10, -7.55);
                        boatGroup.rotation.y = Math.PI / 2; // 90 fokos elforgatás a móló mellé
                        boatGroup.add(boatModel);

                        boatModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(boatGroup);
                        boatBasePos.copy(boatGroup.position);
                        boatBaseRot.copy(boatGroup.rotation);
                        window._kikotoBoatGroup = boatGroup;
                        window._kikotoBoatBasePos = boatBasePos;
                        window._kikotoBoatBaseRot = boatBaseRot;
                        createBoatRipple(boatGroup, 3.5, 6.5, 1.5, 1.0);
                        updateEnvironmentLighting();
                        registerDeckInteractiveElements();
                    },
                    undefined,
                    function (err) {
                        console.warn('Csónak modell betöltési figyelmeztetés:', err);
                    }
                );

                // 11. Kalózhajó (kalozhajo01.glb) betöltése a móló (defaultMaterial004: -32.3, 1.0, -14.4) mellé a vízre (0.3m-re a móló mellé)
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/kalozhajo01.glb',
                    function (shipGltf) {
                        // 1. A gltf belső gyökérelemének (SM_Veh_Veh_Boat_Large_01_Hull) 400 méteres Blender ofszetjét nullázzuk:
                        shipGltf.scene.traverse(node => {
                            if (node.name && node.name.includes("Hull")) {
                                node.position.set(0, 0, 0);
                            }
                        });

                        const shipModel = shipGltf.scene;
                        shipModel.scale.set(0.65, 0.65, 0.65); // Mólóhoz arányosított kalózhajó méret (~21.5m hajóhossz)
                        shipModel.rotation.set(0, 0, 0);
                        shipModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly merülés beállítása
                        const sBox = new THREE.Box3().setFromObject(shipModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        shipModel.position.x = -sCenter.x;
                        shipModel.position.z = -sCenter.z;
                        shipModel.position.y = -sBox.min.y - 0.75; // Vízbemerülés a vízvonalhoz

                        pirateShipGroup = new THREE.Group();
                        pirateShipGroup.name = "TutorialPirateShipGroup";
                        // A móló (defaultMaterial003: -45.0, 1.0, -17.3) melletti vízpozíció 4 méterrel jobbra: (-45.0, -0.40, -13.3)
                        pirateShipGroup.position.set(-45.0, -0.40, -13.3);
                        pirateShipGroup.rotation.y = Math.PI / 2; // 90 fokos elforgatás a móló mentén
                        pirateShipGroup.add(shipModel);

                        shipModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false; // Ne váljon láthatatlanná a Blender alphaMode: BLEND miatt
                                        m.depthWrite = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(pirateShipGroup);
                        pirateShipBasePos.copy(pirateShipGroup.position);
                        pirateShipBaseRot.copy(pirateShipGroup.rotation);
                        window._kikotoPirateShipGroup = pirateShipGroup;
                        window._kikotoPirateShipBasePos = pirateShipBasePos;
                        window._kikotoPirateShipBaseRot = pirateShipBaseRot;
                        createBoatRipple(pirateShipGroup, 8.5, 22.0, 1.0, 1.2);
                        updateEnvironmentLighting();
                        registerDeckInteractiveElements();
                    },
                    undefined,
                    function (err) {
                        console.warn('Kalózhajó modell betöltési figyelmeztetés:', err);
                    }
                );

                // 12. Kishajó (kishajo.glb) betöltése az északi móló (defaultMaterial005: -44.6, 0.9, 18.7) mellé a vízre (0.65 nagyítással)
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/kishajo.glb',
                    function (smallShipGltf) {
                        const smallShipModel = smallShipGltf.scene;
                        smallShipModel.scale.set(0.65, 0.65, 0.65); // 0.65-ös mólóarányos nagyítás
                        smallShipModel.rotation.set(0, 0, 0);
                        smallShipModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly merülés beállítása
                        const sBox = new THREE.Box3().setFromObject(smallShipModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        smallShipModel.position.x = -sCenter.x;
                        smallShipModel.position.z = -sCenter.z;
                        smallShipModel.position.y = -sBox.min.y - 0.55; // Természetes vízbemerülés a vízvonalhoz

                        smallShipGroup = new THREE.Group();
                        smallShipGroup.name = "TutorialSmallShipGroup";
                        // A móló (defaultMaterial005: -44.6, 0.9, 18.7) melletti vízpozíció 4 méterrel balra: (-44.6, -0.40, 14.7)
                        smallShipGroup.position.set(-44.6, -0.40, 14.7);
                        smallShipGroup.rotation.y = Math.PI / 2; // 90 fokos elforgatás a móló mentén
                        smallShipGroup.add(smallShipModel);

                        smallShipModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(smallShipGroup);
                        smallShipBasePos.copy(smallShipGroup.position);
                        smallShipBaseRot.copy(smallShipGroup.rotation);
                        window._kikotoSmallShipGroup = smallShipGroup;
                        window._kikotoSmallShipBasePos = smallShipBasePos;
                        window._kikotoSmallShipBaseRot = smallShipBaseRot;
                        createBoatRipple(smallShipGroup, 6.5, 15.0, 1.2, 1.1);
                        updateEnvironmentLighting();
                        registerDeckInteractiveElements();
                    },
                    undefined,
                    function (err) {
                        console.warn('Kishajó modell betöltési figyelmeztetés:', err);
                    }
                );

                // 13. Javítás alatti Hajó (javitotthajo.glb) betöltése a móló (defaultMaterial006: -23.2, 1.0, -28.4) mellé jobbról a vízre, parthoz közel, farral a part felé
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/javitotthajo.glb',
                    function (repairGltf) {
                        const repairModel = repairGltf.scene;
                        repairModel.scale.set(0.65, 0.65, 0.65); // Mólóarányos nagyítás
                        repairModel.rotation.set(0, 0, 0);
                        repairModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly merülés beállítása
                        const sBox = new THREE.Box3().setFromObject(repairModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        repairModel.position.x = -sCenter.x;
                        repairModel.position.z = -sCenter.z;
                        repairModel.position.y = -sBox.min.y - 0.75; // Vízbemerülés a vízvonalhoz

                        repairShipGroup = new THREE.Group();
                        repairShipGroup.name = "TutorialRepairShipGroup";
                        // A Hajoacsmuhely (-15.8, 1.0, -15.3) elemtől 5m-rel messzebb helyezve a vízre: (-35.7, -0.40, -27.9)
                        repairShipGroup.position.set(-35.7, -0.40, -27.9);
                        repairShipGroup.rotation.y = -Math.PI / 2 - THREE.MathUtils.degToRad(40);
                        repairShipGroup.add(repairModel);

                        repairModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(repairShipGroup);
                        repairShipBasePos.copy(repairShipGroup.position);
                        repairShipBaseRot.copy(repairShipGroup.rotation);
                        window._kikotoRepairShipGroup = repairShipGroup;
                        window._kikotoRepairShipBasePos = repairShipBasePos;
                        window._kikotoRepairShipBaseRot = repairShipBaseRot;
                        createBoatRipple(repairShipGroup, 7.5, 18.0, 0.9, 1.1);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Javított hajó modell betöltési figyelmeztetés:', err);
                    }
                );

                // 14. Steampunk Csónak 02 (steampunk_csonak02.glb) betöltése a Híd (Bridge001_Bridge_0: -34.0, 3.5, 1.0) és az északi móló (defaultMaterial002: -33.3, 0.9, 14.4) közé a vízre
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/steampunk_csonak02.glb',
                    function (boatGltf) {
                        const boatModel = boatGltf.scene;
                        boatModel.scale.set(5.2, 5.2, 5.2); // 2x nagyobb csónakméret
                        boatModel.rotation.set(0, 0, 0);
                        boatModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly merülés beállítása
                        const sBox = new THREE.Box3().setFromObject(boatModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        boatModel.position.x = -sCenter.x;
                        boatModel.position.z = -sCenter.z;
                        boatModel.position.y = -sBox.min.y - 0.25; // Természetes vízbemerülés

                        steampunkBoat2Group = new THREE.Group();
                        steampunkBoat2Group.name = "TutorialSteampunkBoat02Group";
                        // A Híd és az északi móló közötti 2/3-os vízpozíció: (-33.5, 0.25, 10.4)
                        steampunkBoat2Group.position.set(-33.5, 0.25, 10.4);
                        steampunkBoat2Group.rotation.y = Math.PI; // CCW 90° fordulat (180°)
                        steampunkBoat2Group.add(boatModel);

                        boatModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(steampunkBoat2Group);
                        steampunkBoat2BasePos.copy(steampunkBoat2Group.position);
                        steampunkBoat2BaseRot.copy(steampunkBoat2Group.rotation);
                        window._kikotoSteampunkBoat2Group = steampunkBoat2Group;
                        window._kikotoSteampunkBoat2BasePos = steampunkBoat2BasePos;
                        window._kikotoSteampunkBoat2BaseRot = steampunkBoat2BaseRot;
                        createBoatRipple(steampunkBoat2Group, 4.0, 8.0, 1.4, 1.0);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Steampunk csónak 02 modell betöltési figyelmeztetés:', err);
                    }
                );

                // 15. Steampunk Csónak 03 (steampunk_csonak03.glb) betöltése a Híd (Bridge001_Bridge_0: -34.0, 3.5, 1.0) és az északi móló (defaultMaterial002: -33.3, 0.9, 14.4) közé a vízre
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/steampunk_csonak03.glb',
                    function (boatGltf) {
                        const boatModel = boatGltf.scene;
                        boatModel.scale.set(4.5, 4.5, 4.5); // 2.5x nagyobb csónakméret
                        boatModel.rotation.set(0, 0, 0);
                        boatModel.updateMatrixWorld(true);

                        // Centerezés és tőkesúly merülés beállítása
                        const sBox = new THREE.Box3().setFromObject(boatModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        boatModel.position.x = -sCenter.x;
                        boatModel.position.z = -sCenter.z;
                        boatModel.position.y = -sBox.min.y - 0.25; // Természetes vízbemerülés

                        steampunkBoat3Group = new THREE.Group();
                        steampunkBoat3Group.name = "TutorialSteampunkBoat03Group";
                        // A Híd és az északi móló közötti 1/3-os vízpozíció: (-33.8, 0.25, 5.7)
                        steampunkBoat3Group.position.set(-33.8, 0.25, 5.7);
                        steampunkBoat3Group.rotation.y = Math.PI; // CCW 90° fordulat (180°)
                        steampunkBoat3Group.add(boatModel);

                        boatModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        scene.add(steampunkBoat3Group);
                        steampunkBoat3BasePos.copy(steampunkBoat3Group.position);
                        steampunkBoat3BaseRot.copy(steampunkBoat3Group.rotation);
                        window._kikotoSteampunkBoat3Group = steampunkBoat3Group;
                        window._kikotoSteampunkBoat3BasePos = steampunkBoat3BasePos;
                        window._kikotoSteampunkBoat3BaseRot = steampunkBoat3BaseRot;
                        createBoatRipple(steampunkBoat3Group, 4.0, 8.0, 1.35, 1.0);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Steampunk csónak 03 modell betöltési figyelmeztetés:', err);
                    }
                );

                // 16. Evezős Csónakok (evezoscsonak.glb) betöltése 2 külön példányban a kijelölt Object_70002 és defaultMaterial elemek elé a vízre
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/evezoscsonak.glb',
                    function (boatGltf) {
                        // 1. Nullázzuk a belső Blender 387 méteres ofszetet
                        boatGltf.scene.traverse(node => {
                            if (node.name && (node.name.includes("Hull") || node.name.includes("Attachments") || node.name.includes("Boat"))) {
                                node.position.set(0, 0, 0);
                            }
                        });

                        const boatModel1 = boatGltf.scene;
                        boatModel1.scale.set(0.45, 0.45, 0.45); // Megduplázott méretarány (0.225 * 2 = 0.45)
                        boatModel1.rotation.set(0, 0, 0);
                        boatModel1.updateMatrixWorld(true);

                        // Centerezés
                        const sBox = new THREE.Box3().setFromObject(boatModel1);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        boatModel1.position.x = -sCenter.x;
                        boatModel1.position.z = -sCenter.z;
                        boatModel1.position.y = 0;

                        boatModel1.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                child.frustumCulled = false;
                                child.renderOrder = 10;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.depthTest = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        // 1. Példány: Object_70002 és SurfPatch (-204.4, 21.7, 5.4) felé közelebb a vízre: (-21.5, 0.00, 27.1)
                        rowBoat1Group = new THREE.Group();
                        rowBoat1Group.name = "TutorialRowBoat1Group";
                        rowBoat1Group.renderOrder = 10;
                        rowBoat1Group.position.set(-21.5, 0.00, 27.1);
                        rowBoat1Group.rotation.y = Math.PI / 2;
                        rowBoat1Group.add(boatModel1);

                        scene.add(rowBoat1Group);
                        rowBoat1BasePos.copy(rowBoat1Group.position);
                        rowBoat1BaseRot.copy(rowBoat1Group.rotation);
                        window._kikotoRowBoat1Group = rowBoat1Group;
                        window._kikotoRowBoat1BasePos = rowBoat1BasePos;
                        window._kikotoRowBoat1BaseRot = rowBoat1BaseRot;
                        createBoatRipple(rowBoat1Group, 2.8, 5.2, 1.25, 0.9);

                        // 2. Példány: defaultMaterial (-9.2, 1.0, -34.5) és SurfPatch (-204.4, 21.7, 5.4) felé közelebb a vízre: (-20.4, 0.00, -31.9)
                        const boatModel2 = boatModel1.clone(true);
                        rowBoat2Group = new THREE.Group();
                        rowBoat2Group.name = "TutorialRowBoat2Group";
                        rowBoat2Group.renderOrder = 10;
                        rowBoat2Group.position.set(-20.4, 0.00, -31.9);
                        rowBoat2Group.rotation.y = Math.PI / 2;
                        rowBoat2Group.add(boatModel2);

                        scene.add(rowBoat2Group);
                        rowBoat2BasePos.copy(rowBoat2Group.position);
                        rowBoat2BaseRot.copy(rowBoat2Group.rotation);
                        window._kikotoRowBoat2Group = rowBoat2Group;
                        window._kikotoRowBoat2BasePos = rowBoat2BasePos;
                        window._kikotoRowBoat2BaseRot = rowBoat2BaseRot;
                        createBoatRipple(rowBoat2Group, 2.8, 5.2, 1.25, 0.9);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Evezős csónak modell betöltési figyelmeztetés:', err);
                    }
                );

                // 17. Barna Csónakok (barna_csonak.glb) betöltése 2 példányban (defaultMaterial előtt és node_id4004 jobb oldalán a vízre)
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/barna_csonak.glb',
                    function (brownGltf) {
                        brownGltf.scene.traverse(node => {
                            if (node.name && (node.name.includes("Hull") || node.name.includes("Attachments") || node.name.includes("Boat"))) {
                                node.position.set(0, 0, 0);
                            }
                        });

                        const brownBoatModel1 = brownGltf.scene;
                        brownBoatModel1.scale.set(0.45, 0.45, 0.45); // Ugyanaz a méretarány, mint az evezőscsónak
                        brownBoatModel1.rotation.set(0, 0, 0);
                        brownBoatModel1.updateMatrixWorld(true);

                        // Centerezés
                        const sBox = new THREE.Box3().setFromObject(brownBoatModel1);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        brownBoatModel1.position.x = -sCenter.x;
                        brownBoatModel1.position.z = -sCenter.z;
                        brownBoatModel1.position.y = 0;

                        brownBoatModel1.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                child.frustumCulled = false;
                                child.renderOrder = 10;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.depthTest = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        // 1. Példány: defaultMaterial (-9.2, 1.0, -34.5) előtt a vízre: (-13.0, 0.00, -34.5)
                        brownBoat1Group = new THREE.Group();
                        brownBoat1Group.name = "TutorialBrownBoat1Group";
                        brownBoat1Group.renderOrder = 10;
                        brownBoat1Group.position.set(-13.0, 0.00, -34.5);
                        brownBoat1Group.rotation.y = Math.PI / 4;
                        brownBoat1Group.add(brownBoatModel1);

                        scene.add(brownBoat1Group);
                        brownBoat1BasePos.copy(brownBoat1Group.position);
                        brownBoat1BaseRot.copy(brownBoat1Group.rotation);
                        window._kikotoBrownBoat1Group = brownBoat1Group;
                        window._kikotoBrownBoat1BasePos = brownBoat1BasePos;
                        window._kikotoBrownBoat1BaseRot = brownBoat1BaseRot;
                        window._kikotoBrownBoatGroup = brownBoat1Group;
                        window._kikotoBrownBoatBasePos = brownBoat1BasePos;
                        window._kikotoBrownBoatBaseRot = brownBoat1BaseRot;
                        createBoatRipple(brownBoat1Group, 2.8, 5.2, 1.3, 0.9);

                        // 2. Példány: node_id4004 (-27.9, -4.3, 17.2) másik oldalára a vízre: (-29.0, 0.00, 20.3)
                        const brownBoatModel2 = brownBoatModel1.clone(true);
                        brownBoat2Group = new THREE.Group();
                        brownBoat2Group.name = "TutorialBrownBoat2Group";
                        brownBoat2Group.renderOrder = 10;
                        brownBoat2Group.position.set(-29.0, 0.00, 20.3);
                        brownBoat2Group.rotation.y = Math.PI / 2 + THREE.MathUtils.degToRad(10);
                        brownBoat2Group.add(brownBoatModel2);

                        scene.add(brownBoat2Group);
                        brownBoat2BasePos.copy(brownBoat2Group.position);
                        brownBoat2BaseRot.copy(brownBoat2Group.rotation);
                        window._kikotoBrownBoat2Group = brownBoat2Group;
                        window._kikotoBrownBoat2BasePos = brownBoat2BasePos;
                        window._kikotoBrownBoat2BaseRot = brownBoat2BaseRot;
                        createBoatRipple(brownBoat2Group, 2.8, 5.2, 1.3, 0.9);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Barna csónak modell betöltési figyelmeztetés:', err);
                    }
                );

                // 18. Szürke Csónak (szurke_csonak.glb) betöltése Object_82002 (-11.1, 0.1, 30.6) elé a vízre
                loader.load(
                    'https://storage.googleapis.com/kalozsziget-assets/assets/models/szurke_csonak.glb',
                    function (greyGltf) {
                        greyGltf.scene.traverse(node => {
                            if (node.name && (node.name.includes("Hull") || node.name.includes("Attachments") || node.name.includes("Boat"))) {
                                node.position.set(0, 0, 0);
                            }
                        });

                        const greyBoatModel = greyGltf.scene;
                        greyBoatModel.scale.set(0.45, 0.45, 0.45);
                        greyBoatModel.rotation.set(0, 0, 0);
                        greyBoatModel.updateMatrixWorld(true);

                        // Centerezés
                        const sBox = new THREE.Box3().setFromObject(greyBoatModel);
                        const sCenter = sBox.getCenter(new THREE.Vector3());
                        greyBoatModel.position.x = -sCenter.x;
                        greyBoatModel.position.z = -sCenter.z;
                        greyBoatModel.position.y = 0;

                        greyBoatModel.traverse(child => {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                                child.frustumCulled = false;
                                child.renderOrder = 10;
                                const mats = Array.isArray(child.material) ? child.material : [child.material];
                                mats.forEach(m => {
                                    if (m) {
                                        m.transparent = false;
                                        m.depthWrite = true;
                                        m.depthTest = true;
                                        m.side = THREE.DoubleSide;
                                        m.envMapIntensity = 1.0;
                                        m.needsUpdate = true;
                                    }
                                });
                            }
                        });

                        greyBoatGroup = new THREE.Group();
                        greyBoatGroup.name = "TutorialGreyBoatGroup";
                        greyBoatGroup.renderOrder = 10;
                        greyBoatGroup.position.set(-11.5, 0.00, 30.9);
                        greyBoatGroup.rotation.y = Math.PI / 4;
                        greyBoatGroup.add(greyBoatModel);

                        scene.add(greyBoatGroup);
                        greyBoatBasePos.copy(greyBoatGroup.position);
                        greyBoatBaseRot.copy(greyBoatGroup.rotation);
                        window._kikotoGreyBoatGroup = greyBoatGroup;
                        window._kikotoGreyBoatBasePos = greyBoatBasePos;
                        window._kikotoGreyBoatBaseRot = greyBoatBaseRot;
                        createBoatRipple(greyBoatGroup, 2.8, 5.2, 1.32, 0.9);
                        updateEnvironmentLighting();
                    },
                    undefined,
                    function (err) {
                        console.warn('Szürke csónak modell betöltési figyelmeztetés:', err);
                    }
                );

                updateEnvironmentLighting();

                // 4. Modell Fókusz és 45 fokos, 2x méretarányos Kamera Beállítás
                setupCameraToModel(harborModel);

                window._kikoto3DInitialized = true;
                window._kikoto3DLoading = false;

                // Betöltő képernyő sima átmenetes eltüntetése a 3D modell teljes felépülésekor
                if (typeof hideUniversalLoading === 'function') {
                    hideUniversalLoading('sot_harbor_loaded', 600, true);
                }
                const transOverlay = document.getElementById('scene-transition-overlay');
                if (transOverlay) {
                    transOverlay.classList.remove('active');
                    transOverlay.style.opacity = '0';
                    transOverlay.style.pointerEvents = 'none';
                }

                // Modell információk kiírása (ha van statsText elem)
                if (statsText) {
                    const box = new THREE.Box3().setFromObject(harborModel);
                    const size = box.getSize(new THREE.Vector3());
                    statsText.textContent = 'Kikötő Méret: ' + Math.round(size.x) + 'm × ' + Math.round(size.z) + 'm | 45° Kamera Fókusz Aktív';
                }
            },
            function (xhr) {
                if (xhr.total > 0) {
                    const percent = (xhr.loaded / xhr.total * 100).toFixed(0);
                    loaderFill.style.width = percent + '%';
                    const loadedMb = (xhr.loaded / 1048576).toFixed(1);
                    const totalMb = (xhr.total / 1048576).toFixed(1);
                    loaderStatus.textContent = '3D MODELL BETÖLTÉSE: ' + percent + '% (' + loadedMb + ' / ' + totalMb + ' MB)';
                } else {
                    const loadedMb = (xhr.loaded / 1048576).toFixed(1);
                    loaderStatus.textContent = '3D MODELL BETÖLTÉSE: ' + loadedMb + ' MB...';
                }
            },
            function (error) {
                console.error('Hiba a 3D modell betöltése során:', error);
                loaderStatus.textContent = 'HIBA A MODELL BETÖLTÉSEKOR: ' + error.message;
                loaderStatus.style.color = '#ff4444';
                setTimeout(function () {
                    if (typeof hideUniversalLoading === 'function') hideUniversalLoading();
                    var container2D = document.getElementById('kikoto-2d-container');
                    if (container2D) container2D.style.display = 'block';
                }, 1500);
            }
        );
    }

    /**
     * Alapértelmezett Kikötő Kamera Beállítás
     */
    function setupCameraToModel(model) {
        // A kiválasztott tökéletes kameraállás és fókuszpont
        camera.position.set(-65.7, 10.9, 1.6);
        controls.target.set(-23.3, 6.8, 1.0);

        camera.near = 0.5;
        camera.far = 4000;
        camera.updateProjectionMatrix();

        controls.update();

        // Elmentjük a kezdőpozíciókat az alaphelyzetbe állításhoz
        defaultCameraPos.copy(camera.position);
        defaultTargetPos.copy(controls.target);
    }

    // Globális kamera visszaállító
    window.resetPortCamera = function () {
        if (controls && defaultCameraPos.length() > 0) {
            camera.position.copy(defaultCameraPos);
            controls.target.copy(defaultTargetPos);
            controls.update();
        }
    };

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);


    }

    function animate() {
        if (!kikoto3DRunning) return;
        kikotoAnimFrameId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // 1. Blender AnimationMixer frissítése (ha van beágyazott Blender akció)
        if (animationMixer) {
            animationMixer.update(delta);
        }

        // 2. Realisztikus Vízfelület hullámmozgásának léptetése (megfelezve: 0.8 -> 0.4)
        if (water && water.material && water.material.uniforms && water.material.uniforms['time']) {
            water.material.uniforms['time'].value += delta * 0.4;
        }

        // 4. Darupad (SM_Prop_Crane_02001 / DarupadMesh) szélfútta, lassan imbolygó és forgó mozgása a felső fix pont körül
        if (cranePadMesh && cranePadBaseRotation) {
            // Természetes, aszimmetrikus szélmozgás (hosszanti lengés + keresztlengés + lassú pördülés)
            const swayX = Math.sin(elapsedTime * 0.85) * 0.045 + Math.sin(elapsedTime * 1.4) * 0.02;
            const swayZ = Math.cos(elapsedTime * 0.70) * 0.040 + Math.sin(elapsedTime * 1.15) * 0.015;
            const twistY = Math.sin(elapsedTime * 0.35) * 0.05 + Math.sin(elapsedTime * 0.20) * 0.03;

            cranePadMesh.rotation.x = cranePadBaseRotation.x + swayX;
            cranePadMesh.rotation.y = cranePadBaseRotation.y + twistY;
            cranePadMesh.rotation.z = cranePadBaseRotation.z + swayZ;
        }

        // 5. Pálmafák (SM_Env_PalmTree_...) enyhe, természetes szélfútta imbolygása az alsó gyökérpontjuk körül
        if (palmTreesList && palmTreesList.length > 0) {
            palmTreesList.forEach(item => {
                const t = elapsedTime * item.speed + item.phase;
                const swayX = Math.sin(t * 1.1) * item.amplitude + Math.sin(t * 0.6) * (item.amplitude * 0.5);
                const swayZ = Math.cos(t * 0.95) * (item.amplitude * 0.8) + Math.sin(t * 1.5) * (item.amplitude * 0.4);

                item.mesh.rotation.x = item.baseRot.x + swayX;
                item.mesh.rotation.z = item.baseRot.z + swayZ;
            });
        }

        // 6. Taverna Cégér (Taverna002 / CegerMesh) szélfútta lengése a felső fix felfüggesztés körül
        if (cegerMesh && cegerBaseRotation) {
            const cegerSwayZ = Math.sin(elapsedTime * 1.35) * 0.065 + Math.sin(elapsedTime * 0.75) * 0.025;
            const cegerTwistY = Math.sin(elapsedTime * 0.5) * 0.025;

            cegerMesh.rotation.z = cegerBaseRotation.z + cegerSwayZ;
            cegerMesh.rotation.y = cegerBaseRotation.y + cegerTwistY;
        }

        // 7. Pálma Bokor (SM_Env_PalmTree_Tall_02002 / PalmabokorMesh) szélfútta kifordulása és finom mozgása az alsó fix gyökérpont körül
        if (palmBokorMesh && palmBokorBaseRotation) {
            // Kisebb billenési amplitúdó, de kifejezett szélirányú kifordulás (twist / yaw)
            const bokorTwistY = Math.sin(elapsedTime * 0.85) * 0.045 + Math.sin(elapsedTime * 0.4) * 0.025;
            const bokorLeanX = Math.sin(elapsedTime * 0.70) * 0.012 + Math.sin(elapsedTime * 1.2) * 0.005;
            const bokorLeanZ = Math.cos(elapsedTime * 0.90) * 0.010;

            palmBokorMesh.rotation.y = palmBokorBaseRotation.y + bokorTwistY;
            palmBokorMesh.rotation.x = palmBokorBaseRotation.x + bokorLeanX;
            palmBokorMesh.rotation.z = palmBokorBaseRotation.z + bokorLeanZ;
        }

        // 8. Csónak (TutorialBoat) lágy vízi ringatózása és lebegése a móló mellett
        if (boatGroup) {
            const t = elapsedTime;
            // Függőleges hullámzó lebegés
            boatGroup.position.y = boatBasePos.y + Math.sin(t * 1.5) * 0.045 + Math.sin(t * 0.8) * 0.02;
            // Hosszirányú bólintás (pitch)
            boatGroup.rotation.x = boatBaseRot.x + Math.sin(t * 1.2) * 0.025 + Math.sin(t * 0.7) * 0.012;
            // Keresztirányú dülöngélés (roll)
            boatGroup.rotation.z = boatBaseRot.z + Math.cos(t * 1.0) * 0.035 + Math.sin(t * 1.6) * 0.015;
            // Enyhe hullámmozgásos tekeredés (yaw)
            boatGroup.rotation.y = boatBaseRot.y + Math.sin(t * 0.45) * 0.018;
        }

        // 9. Kalózhajó (kalozhajo01.glb / TutorialPirateShipGroup) méltóságteljes vízi ringatózása a móló mellett
        if (pirateShipGroup) {
            const t = elapsedTime;
            // Függőleges lassú lebegés
            pirateShipGroup.position.y = pirateShipBasePos.y + Math.sin(t * 1.1) * 0.045 + Math.sin(t * 0.6) * 0.020;
            // Hosszirányú bólintás (pitch)
            pirateShipGroup.rotation.x = pirateShipBaseRot.x + Math.sin(t * 0.9) * 0.018 + Math.sin(t * 0.45) * 0.009;
            // Keresztirányú dülöngélés (roll)
            pirateShipGroup.rotation.z = pirateShipBaseRot.z + Math.cos(t * 0.75) * 0.025 + Math.sin(t * 1.3) * 0.010;
            // Enyhe hullámsodródás (yaw)
            pirateShipGroup.rotation.y = pirateShipBaseRot.y + Math.sin(t * 0.35) * 0.014;
        }

        // 10. Kishajó (kishajo.glb / TutorialSmallShipGroup) lágy vízi ringatózása a móló mellett
        if (smallShipGroup) {
            const t = elapsedTime;
            // Függőleges hullámzó lebegés
            smallShipGroup.position.y = smallShipBasePos.y + Math.sin(t * 1.3) * 0.040 + Math.sin(t * 0.75) * 0.018;
            // Hosszirányú bólintás (pitch)
            smallShipGroup.rotation.x = smallShipBaseRot.x + Math.sin(t * 1.05) * 0.020 + Math.sin(t * 0.55) * 0.010;
            // Keresztirányú dülöngélés (roll)
            smallShipGroup.rotation.z = smallShipBaseRot.z + Math.cos(t * 0.85) * 0.028 + Math.sin(t * 1.45) * 0.012;
            // Enyhe hullámsodródás (yaw)
            smallShipGroup.rotation.y = smallShipBaseRot.y + Math.sin(t * 0.40) * 0.015;
        }

        // 11. Javítás alatti Hajó (javitotthajo.glb / TutorialRepairShipGroup) lágy vízi ringatózása a móló és part mellett
        if (repairShipGroup) {
            const t = elapsedTime;
            // Függőleges hullámzó lebegés
            repairShipGroup.position.y = repairShipBasePos.y + Math.sin(t * 1.0) * 0.035 + Math.sin(t * 0.65) * 0.015;
            // Hosszirányú bólintás (pitch)
            repairShipGroup.rotation.x = repairShipBaseRot.x + Math.sin(t * 0.85) * 0.015 + Math.sin(t * 0.5) * 0.008;
            // Keresztirányú dülöngélés (roll)
            repairShipGroup.rotation.z = repairShipBaseRot.z + Math.cos(t * 0.70) * 0.022 + Math.sin(t * 1.2) * 0.008;
            // Enyhe hullámsodródás (yaw)
            repairShipGroup.rotation.y = repairShipBaseRot.y + Math.sin(t * 0.3) * 0.012;
        }

        // 12. Steampunk Csónak 02 (steampunk_csonak02.glb / TutorialSteampunkBoat02Group) lágy vízi ringatózása
        if (steampunkBoat2Group) {
            const t = elapsedTime;
            steampunkBoat2Group.position.y = steampunkBoat2BasePos.y + Math.sin(t * 1.4 + 1.2) * 0.038 + Math.sin(t * 0.75) * 0.016;
            steampunkBoat2Group.rotation.x = steampunkBoat2BaseRot.x + Math.sin(t * 1.1 + 0.8) * 0.020 + Math.sin(t * 0.6) * 0.010;
            steampunkBoat2Group.rotation.z = steampunkBoat2BaseRot.z + Math.cos(t * 0.95 + 1.5) * 0.028 + Math.sin(t * 1.5) * 0.012;
            steampunkBoat2Group.rotation.y = steampunkBoat2BaseRot.y + Math.sin(t * 0.42 + 0.5) * 0.015;
        }

        // 13. Steampunk Csónak 03 (steampunk_csonak03.glb / TutorialSteampunkBoat03Group) lágy vízi ringatózása
        if (steampunkBoat3Group) {
            const t = elapsedTime;
            steampunkBoat3Group.position.y = steampunkBoat3BasePos.y + Math.sin(t * 1.35 + 2.5) * 0.040 + Math.sin(t * 0.70) * 0.018;
            steampunkBoat3Group.rotation.x = steampunkBoat3BaseRot.x + Math.sin(t * 1.05 + 1.8) * 0.022 + Math.sin(t * 0.55) * 0.011;
            steampunkBoat3Group.rotation.z = steampunkBoat3BaseRot.z + Math.cos(t * 0.90 + 2.1) * 0.030 + Math.sin(t * 1.4) * 0.014;
            steampunkBoat3Group.rotation.y = steampunkBoat3BaseRot.y + Math.sin(t * 0.38 + 1.2) * 0.016;
        }

        // 14. Evezős Csónak 1 (Object_70002 előtt a vízre) lágy vízi ringatózása
        if (rowBoat1Group) {
            const t = elapsedTime;
            rowBoat1Group.position.y = rowBoat1BasePos.y + Math.sin(t * 1.25 + 3.1) * 0.038 + Math.sin(t * 0.65) * 0.015;
            rowBoat1Group.rotation.x = rowBoat1BaseRot.x + Math.sin(t * 0.95 + 2.0) * 0.020 + Math.sin(t * 0.5) * 0.010;
            rowBoat1Group.rotation.z = rowBoat1BaseRot.z + Math.cos(t * 0.85 + 1.1) * 0.028 + Math.sin(t * 1.3) * 0.012;
            rowBoat1Group.rotation.y = rowBoat1BaseRot.y + Math.sin(t * 0.35 + 2.4) * 0.015;
        }

        // 15. Evezős Csónak 2 (defaultMaterial előtt a vízre) lágy vízi ringatózása
        if (rowBoat2Group) {
            const t = elapsedTime;
            rowBoat2Group.position.y = rowBoat2BasePos.y + Math.sin(t * 1.30 + 0.8) * 0.038 + Math.sin(t * 0.70) * 0.015;
            rowBoat2Group.rotation.x = rowBoat2BaseRot.x + Math.sin(t * 1.00 + 1.5) * 0.020 + Math.sin(t * 0.55) * 0.010;
            rowBoat2Group.rotation.z = rowBoat2BaseRot.z + Math.cos(t * 0.90 + 0.5) * 0.028 + Math.sin(t * 1.35) * 0.012;
            rowBoat2Group.rotation.y = rowBoat2BaseRot.y + Math.sin(t * 0.38 + 1.1) * 0.015;
        }

        // 16. Barna Csónak 1 (defaultMaterial előtt a vízre) lágy vízi ringatózása
        if (brownBoat1Group) {
            const t = elapsedTime;
            brownBoat1Group.position.y = brownBoat1BasePos.y + Math.sin(t * 1.35 + 1.8) * 0.038 + Math.sin(t * 0.75) * 0.015;
            brownBoat1Group.rotation.x = brownBoat1BaseRot.x + Math.sin(t * 1.05 + 0.9) * 0.020 + Math.sin(t * 0.6) * 0.010;
            brownBoat1Group.rotation.z = brownBoat1BaseRot.z + Math.cos(t * 0.95 + 2.2) * 0.028 + Math.sin(t * 1.4) * 0.012;
            brownBoat1Group.rotation.y = brownBoat1BaseRot.y + Math.sin(t * 0.40 + 1.7) * 0.015;
        }

        // 17. Barna Csónak 2 (node_id4004 jobb oldalán a vízre) lágy vízi ringatózása
        if (brownBoat2Group) {
            const t = elapsedTime;
            brownBoat2Group.position.y = brownBoat2BasePos.y + Math.sin(t * 1.28 + 0.4) * 0.038 + Math.sin(t * 0.70) * 0.015;
            brownBoat2Group.rotation.x = brownBoat2BaseRot.x + Math.sin(t * 0.98 + 1.2) * 0.020 + Math.sin(t * 0.52) * 0.010;
            brownBoat2Group.rotation.z = brownBoat2BaseRot.z + Math.cos(t * 0.88 + 1.6) * 0.028 + Math.sin(t * 1.32) * 0.012;
            brownBoat2Group.rotation.y = brownBoat2BaseRot.y + Math.sin(t * 0.36 + 0.9) * 0.015;
        }

        // 18. Szürke Csónak (szurke_csonak.glb / Object_82002 előtt a vízre) lágy vízi ringatózása
        if (greyBoatGroup) {
            const t = elapsedTime;
            greyBoatGroup.position.y = greyBoatBasePos.y + Math.sin(t * 1.32 + 2.7) * 0.038 + Math.sin(t * 0.68) * 0.015;
            greyBoatGroup.rotation.x = greyBoatBaseRot.x + Math.sin(t * 1.02 + 1.9) * 0.020 + Math.sin(t * 0.58) * 0.010;
            greyBoatGroup.rotation.z = greyBoatBaseRot.z + Math.cos(t * 0.92 + 0.7) * 0.028 + Math.sin(t * 1.38) * 0.012;
            greyBoatGroup.rotation.y = greyBoatBaseRot.y + Math.sin(t * 0.37 + 2.1) * 0.015;
        }

        // 19. Hajótest, csónak, móló, híd és bázis hullámgyűrűk frissítése (Módszer 2: Dynamic Wave & Ripple System)
        if (boatRipplesList && boatRipplesList.length > 0) {
            const tempWPos = new THREE.Vector3();
            boatRipplesList.forEach(item => {
                if (item.mesh) {
                    if (item.target && item.target.isObject3D) {
                        item.target.getWorldPosition(tempWPos);
                        item.mesh.position.x = tempWPos.x;
                        item.mesh.position.z = tempWPos.z;
                        if (item.target.rotation) {
                            item.mesh.rotation.z = -item.target.rotation.y;
                        }
                    } else if (item.fixedPos) {
                        item.mesh.position.x = item.fixedPos.x;
                        item.mesh.position.z = item.fixedPos.z;
                    }
                    if (water) {
                        item.mesh.position.y = water.position.y + 0.01;
                    }
                    if (item.material && item.material.uniforms && item.material.uniforms.uTime) {
                        item.material.uniforms.uTime.value = elapsedTime;
                    }
                }
            });
        }

        // 20. Filmes Kameraközelítés és Átmenet (Cinematic Building Zoom Transition)
        if (isCinematicTransitioning) {
            const now = clock.getElapsedTime();
            const elapsed = now - cinematicStartTime;
            const progress = Math.min(1.0, elapsed / cinematicDuration);

            // Sima Ease-In-Out S-görbe a filmszerű finom ráközelítéshez
            const ease = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            camera.position.lerpVectors(cinematicStartCamPos, cinematicEndCamPos, ease);

            const currentLookAt = new THREE.Vector3().lerpVectors(cinematicStartLookAt, cinematicEndLookAt, ease);
            camera.lookAt(currentLookAt);
            if (controls) controls.target.copy(currentLookAt);
        } else if (controls) {
            // Először a controls.update() – ez alkalmazza a felhasználó bevitelét és a dampinget
            controls.update();

            // CSAK EZUTÁN korrigálunk!

            // ─── HORIZONTÁLIS ÉS VERTIKÁLIS MOZGATÁSI KERETEK ───────────────────────────
            // Alapértelmezett fókuszpont: (-23.3, 6.8, 1.0)
            const baseTargetX = -23.3;
            const baseTargetZ = 1.0;

            // 1. Horizontális mozgathatóság: az alapállapottól mért ±10 egység (Z tengely mentén: -9.0 .. +11.0)
            const clampedZ = THREE.MathUtils.clamp(controls.target.z, baseTargetZ - 10.0, baseTargetZ + 10.0);
            const corrZ = controls.target.z - clampedZ;
            if (Math.abs(corrZ) > 0.0001) {
                controls.target.z = clampedZ;
                camera.position.z -= corrZ;
            }

            // 2. Mélységi / X mozgathatóság: az alapállapottól mért ±10 egység (-33.3 .. -13.3)
            const clampedX = THREE.MathUtils.clamp(controls.target.x, baseTargetX - 10.0, baseTargetX + 10.0);
            const corrX = controls.target.x - clampedX;
            if (Math.abs(corrX) > 0.0001) {
                controls.target.x = clampedX;
                camera.position.x -= corrX;
            }

            // 3. Vertikális mozgási keret: Y tengely 2 és 42 között föl-le
            const clampedY = THREE.MathUtils.clamp(controls.target.y, 2, 42);
            const corrY = controls.target.y - clampedY;
            if (Math.abs(corrY) > 0.0001) {
                controls.target.y = clampedY;
                camera.position.y -= corrY;
            }
        }

        // Fő színtér renderelése a képernyőre
        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }
    }

    // Indítás

    function resetKikotoViewport() {
        console.log("⚓ 3D Kikötő Viewport Állapot Visszaállítása (0 ms ébresztés)");
        isCinematicTransitioning = false;
        isModalOpen = false;
        pointerDownTime = 0;

        // 1. Fekete sötétítő rétegek azonnali feloldása
        if (window.ClockworkEngine) {
            window.ClockworkEngine.stop();
        }
        if (window.ClockworkDispenser) {
            window.ClockworkDispenser.stop();
        }
        const overlay = document.getElementById('scene-transition-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            overlay.style.display = 'none';
        }
        const kikoto3DOverlay = document.getElementById('kikoto-3d-loading-overlay');
        if (kikoto3DOverlay) {
            kikoto3DOverlay.classList.remove('active');
            kikoto3DOverlay.style.opacity = '0';
            kikoto3DOverlay.style.pointerEvents = 'none';
            kikoto3DOverlay.style.display = 'none';
        }
        const generalLoadingOverlay = document.getElementById('loading-overlay');
        if (generalLoadingOverlay) {
            generalLoadingOverlay.style.opacity = '0';
            generalLoadingOverlay.style.pointerEvents = 'none';
            generalLoadingOverlay.style.display = 'none';
        }

        // 2. Kijelölések, hover derengések és buborékszövegek alaphelyzetbe állítása
        if (currentHoveredLocation) {
            removeHighlight(currentHoveredLocation.meshes);
            currentHoveredLocation = null;
        }
        const tooltipEl = document.getElementById('interactive-tooltip');
        if (tooltipEl) {
            tooltipEl.classList.remove('visible');
        }
        document.body.style.cursor = 'default';

        // 3. Kamera és vezérlők visszaállítása az alapértelmezett kikötői rálátási pozícióra
        if (defaultCameraPos && defaultTargetPos && camera && defaultCameraPos.length() > 0) {
            camera.position.copy(defaultCameraPos);
            if (controls) {
                controls.target.copy(defaultTargetPos);
                controls.update();
                controls.enabled = true;
            }
        } else if (controls) {
            controls.enabled = true;
            controls.update();
        }

        // 4. Képernyőméret, képarány és vetítési mátrix azonnali frissítése
        onWindowResize();

        // 5. Esetlegesen nyitva maradt modálok bezárása
        ['universal-npc-modal', 'toborzo-modal', 'fedelzet-modal'].forEach(function (mId) {
            var m = document.getElementById(mId);
            if (m) m.style.display = 'none';
        });
    }

    // Inicializálás hívása
    init();
    window._kikotoResizeHandler = onWindowResize;
    window._resetKikotoViewport = resetKikotoViewport;

    // Regisztráljuk a takarító callback-eket
    kikotoCleanupCallbacks.push(function () {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointerup', onPointerUp);
        if (controls && typeof controls.dispose === 'function') {
            try { controls.dispose(); } catch (e) { }
        }
        if (renderer && typeof renderer.dispose === 'function') {
            try { renderer.dispose(); } catch (e) { }
        }
    });
}



// ============================================================================
// 🌌 3D KOZMOSZ BELÉPTETŐ TERMINÁL MODUL (runAuthTerminal3DModule)
// ============================================================================
var authTerminal3DRunning = false;
var authTerminal3DInitialized = false;

function initAuthTerminal3D() {
    if (authTerminal3DRunning || authTerminal3DInitialized) {
        if (typeof window.reset3DTerminalState === 'function') {
            window.reset3DTerminalState();
        }
        return;
    }

    var container = document.getElementById('auth-3d-container');
    if (!container) return;

    authTerminal3DInitialized = true;
    console.log("🚀 Three.js 3D Beléptető Terminál modulok dinamikus betöltése...");

    Promise.all([
        import('three'),
        import('three/addons/controls/OrbitControls.js'),
        import('three/addons/loaders/GLTFLoader.js')
    ]).then(function (modules) {
        var THREE = modules[0];
        var OrbitControls = modules[1].OrbitControls;
        var GLTFLoader = modules[2].GLTFLoader;

        window.THREE = THREE;
        runAuthTerminal3DModule(THREE, OrbitControls, GLTFLoader);
    }).catch(function (err) {
        console.error("❌ Hiba a 3D Beléptető Terminál modulok betöltésekor:", err);
    });
}
window.initAuthTerminal3D = initAuthTerminal3D;

function runAuthTerminal3DModule(THREE, OrbitControls, GLTFLoader) {
    if (authTerminal3DRunning) return;
    authTerminal3DRunning = true;

    // --- GLOBÁLIS KONSTANSOK & ÁLLAPOTOK ---
    const BACKEND_URL = "https://script.google.com/macros/s/AKfycbyj9yi2WuDSb63Kgknpr9n8sGbtBVWuI295_bxrTONYlmlidgFkyB2HcxGYRCHyIpNf/exec";
    const SPHERE_RADIUS = 30;

    let currentMode = 'LOGIN'; // 'LOGIN' | 'REGISTER' | 'DEREGISTER' | 'INFO'
    let previousMode = 'LOGIN';
    let activeFieldIndex = 0;

    // Mezők aktuális szöveges értékei (Kétirányú szinkron a 3D monitor és a modal között)
    const formValues = {
        LOGIN: { username: '', password: '' },
        REGISTER: { email: '', username: '' },
        DEREGISTER: { username: '', email: '', reason: '' }
    };

    let cursorVisible = true;
    let lastCursorBlink = 0;
    let currentStatusKey = 'status_ready';
    let currentStatusParam = '';
    let terminalStatusText = "SYSTEM READY // CLICK SCREEN TO TYPE";
    let isStatusError = false;
    let isPasswordVisible = false;

    let scene, camera, renderer, controls;
    let cosmosSphere, deviceModel, screenMaterial, screenTexture, infoMaterial, fokuszMaterial;
    const langMaterials = {};
    let meteorManager;

    const screenCanvas = document.getElementById('screen-canvas');
    const ctx = screenCanvas ? screenCanvas.getContext('2d') : null;
    const virtualInput = document.getElementById('virtual-input-capturer');

    // Nyelvi szótár címkék a 3D monitorhoz


    // Nyelvi címkék kiolvasása a központi web_fordito.js szótárból
    function getL() {
        if (typeof window.getTerminalLabels === 'function') {
            var activeLang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : (localStorage.getItem('siteLang') || 'hu');
            return window.getTerminalLabels(activeLang);
        }
        return {};
    }

    // --- JELSZÓ LÁTHATÓSÁG VÁLTÓ ---
    function togglePasswordVisibility() {
        isPasswordVisible = !isPasswordVisible;
        const modalPassInput = document.querySelector('#m-login-password');
        const toggleModalPass = document.querySelector('#toggle-modal-password');

        if (modalPassInput) modalPassInput.type = isPasswordVisible ? 'text' : 'password';

        if (toggleModalPass) {
            if (isPasswordVisible) {
                toggleModalPass.classList.remove('fa-eye');
                toggleModalPass.classList.add('fa-eye-slash');
                toggleModalPass.style.color = '#ffdd00';
            } else {
                toggleModalPass.classList.remove('fa-eye-slash');
                toggleModalPass.classList.add('fa-eye');
                toggleModalPass.style.color = '#00ffcc';
            }
        }

        setTerminalStatus(isPasswordVisible ? 'status_pass_visible' : 'status_pass_masked', false);
    }
    window.togglePasswordVisibility = togglePasswordVisibility;

    function setupPasswordToggle() {
        const toggleModalPass = document.querySelector('#toggle-modal-password');
        if (toggleModalPass) {
            toggleModalPass.addEventListener('click', function (e) {
                e.preventDefault();
                togglePasswordVisibility();
            });
        }
    }

    // --- THREE.JS INICIALIZÁLÁS ---
    function initThree() {
        const container = document.getElementById('webgl-container');
        if (!container) return;

        // 1. Jelenet
        scene = new THREE.Scene();

        // 2. Kamera
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0.35, 2.6);

        // 3. Renderelő
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.tabIndex = 0;
        renderer.domElement.style.outline = 'none';
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // 4. Kamera Vezérlő
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.target.set(0, 0.15, 0);
        controls.minDistance = 1.4;
        controls.maxDistance = SPHERE_RADIUS - 1.5;
        controls.maxPolarAngle = Math.PI * 0.95;
        controls.minPolarAngle = Math.PI * 0.05;

        // 5. Megvilágítás
        const ambientLight = new THREE.AmbientLight(0xddeeff, 1.3);
        scene.add(ambientLight);

        const dirLight1 = new THREE.DirectionalLight(0xffeedd, 1.6);
        dirLight1.position.set(6, 12, 8);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0x4488ff, 0.8);
        dirLight2.position.set(-6, -5, -6);
        scene.add(dirLight2);

        const screenGlowLight = new THREE.PointLight(0x00ffcc, 1.2, 6);
        screenGlowLight.position.set(0, 0.3, 0.8);
        scene.add(screenGlowLight);

        // 6. Kozmosz Gömb
        initCosmosSphere();

        // 7. Dinamikus Képernyő Textúra
        initScreenCanvasTexture();

        // 8. Meteor / Üstökös Rendszer
        meteorManager = new MeteorManager(scene, SPHERE_RADIUS);

        // 9. GLB Modell Betöltése
        loadDeviceModel();

        // Eseményfigyelők (Billentyűzet, Raycast & Modal szinkron)
        window.addEventListener('resize', onWindowResize);
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', onVisualViewportResize);
        }
        setupDirectKeyboardAndRaycast();
        setupModalInputSync();
        setupPasswordToggle();

        // Render loop indítása
        animate(0);
    }

    // --- KOZMOSZ GÖMB ---
    function initCosmosSphere() {
        const textureLoader = new THREE.TextureLoader();
        const gcsUrl = 'https://storage.googleapis.com/kalozsziget-assets/images/galaxiskep_globusba.jpg';
        const localPath = 'assets/images/galaxiskep_globusba.jpg';

        const spaceTexture = textureLoader.load(
            gcsUrl,
            () => { console.info('Kozmosz panorámakép sikeresen betöltve (GCS).'); },
            undefined,
            () => {
                console.warn('GCS kozmosz kép nem található, helyi fallback betöltése...');
                textureLoader.load(localPath, (localTex) => {
                    spaceTexture.image = localTex.image;
                    spaceTexture.needsUpdate = true;
                });
            }
        );

        spaceTexture.wrapS = THREE.MirroredRepeatWrapping;
        spaceTexture.wrapT = THREE.ClampToEdgeWrapping;
        spaceTexture.repeat.set(2, 1);
        spaceTexture.colorSpace = THREE.SRGBColorSpace;

        const sphereGeo = new THREE.SphereGeometry(SPHERE_RADIUS, 64, 32);
        const sphereMat = new THREE.MeshBasicMaterial({
            map: spaceTexture,
            side: THREE.BackSide,
            depthWrite: false
        });

        cosmosSphere = new THREE.Mesh(sphereGeo, sphereMat);
        cosmosSphere.rotation.y = -Math.PI / 2;
        scene.add(cosmosSphere);
    }

    // --- METEOR / ÜSTÖKÖS KEZELŐ ---
    class MeteorManager {
        constructor(targetScene, radius) {
            this.scene = targetScene;
            this.radius = radius - 2;
            this.activeMeteors = [];
            this.scheduleNext();
        }

        scheduleNext() {
            const delay = 3500 + Math.random() * 6000;
            setTimeout(() => {
                this.spawn();
                this.scheduleNext();
            }, delay);
        }

        spawn() {
            const startPos = new THREE.Vector3(
                (Math.random() - 0.5) * this.radius * 1.6,
                (Math.random() * 0.6 + 0.2) * this.radius,
                (Math.random() - 0.5) * this.radius * 1.6
            );

            const dir = new THREE.Vector3(-1.2 - Math.random() * 0.6, -0.6 - Math.random() * 0.4, -0.8 - Math.random() * 0.8).normalize();
            const length = 5 + Math.random() * 6;
            const speed = 0.5 + Math.random() * 0.4;

            const points = [startPos.clone(), startPos.clone().addScaledVector(dir, -length)];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
                color: 0x66ffff,
                transparent: true,
                opacity: 0.85,
                blending: THREE.AdditiveBlending
            });

            const line = new THREE.Line(geo, mat);
            this.scene.add(line);

            this.activeMeteors.push({
                mesh: line,
                dir: dir,
                speed: speed,
                life: 1.0,
                decay: 0.012 + Math.random() * 0.01
            });
        }

        update() {
            for (let i = this.activeMeteors.length - 1; i >= 0; i--) {
                const m = this.activeMeteors[i];
                m.mesh.position.addScaledVector(m.dir, m.speed);
                m.life -= m.decay;
                m.mesh.material.opacity = Math.max(0, m.life);

                if (m.life <= 0) {
                    this.scene.remove(m.mesh);
                    m.mesh.geometry.dispose();
                    m.mesh.material.dispose();
                    this.activeMeteors.splice(i, 1);
                }
            }
        }
    }

    // --- DINAMIKUS KIJELZŐ TEXTÚRA (CANVAS) ---
    function initScreenCanvasTexture() {
        if (!screenCanvas) return;
        screenTexture = new THREE.CanvasTexture(screenCanvas);
        screenTexture.colorSpace = THREE.SRGBColorSpace;
        screenTexture.minFilter = THREE.LinearFilter;
        screenTexture.magFilter = THREE.LinearFilter;

        screenMaterial = new THREE.MeshBasicMaterial({
            map: screenTexture,
            toneMapped: false
        });

        updateScreenDisplay();
    }

    // --- 3D Képernyő Szem-ikon rajzoló ---
    function drawEyeIconOnCanvas(context, cx, cy, isVisible) {
        context.save();
        context.fillStyle = isVisible ? 'rgba(255, 221, 0, 0.25)' : 'rgba(0, 255, 204, 0.14)';
        context.fillRect(cx - 28, cy - 20, 56, 40);
        context.strokeStyle = isVisible ? '#ffdd00' : '#00ffcc';
        context.lineWidth = 2;
        context.strokeRect(cx - 28, cy - 20, 56, 40);

        context.strokeStyle = isVisible ? '#ffdd00' : '#00ffcc';
        context.fillStyle = isVisible ? '#ffdd00' : '#00ffcc';
        context.lineWidth = 2.5;
        context.beginPath();
        context.moveTo(cx - 16, cy);
        context.quadraticCurveTo(cx, cy - 11, cx + 16, cy);
        context.quadraticCurveTo(cx, cy + 11, cx - 16, cy);
        context.stroke();

        context.beginPath();
        context.arc(cx, cy, 4.5, 0, Math.PI * 2);
        context.fill();

        if (isVisible) {
            context.strokeStyle = '#ffdd00';
            context.lineWidth = 2.8;
            context.beginPath();
            context.moveTo(cx - 16, cy - 12);
            context.lineTo(cx + 16, cy + 12);
            context.stroke();
        }
        context.restore();
    }

    // Képernyő újra-rajzolása többnyelvű feliratokkal (1.5x NÖVELT BETŰMÉRET & ÚJ TABSOR)
    function updateScreenDisplay() {
        if (!screenCanvas || !ctx) return;
        const w = screenCanvas.width;
        const h = screenCanvas.height;
        const L = getL();

        // 1. Háttér
        ctx.fillStyle = '#040b12';
        ctx.fillRect(0, 0, w, h);

        // Háttér rácsháló
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.04)';
        ctx.lineWidth = 1;
        for (let x = 0; x < w; x += 32) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += 32) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // 2. Kijelző díszítő keret
        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 8;
        ctx.strokeRect(16, 16, w - 32, h - 32);

        ctx.strokeStyle = 'rgba(0, 255, 204, 0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(26, 26, w - 52, h - 52);

        // 3. I. SOR: Főcím (1.5x Növelt Orbitron cím)
        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 24px "Orbitron", "Segoe UI", sans-serif';
        ctx.fillText(currentMode === 'INFO' ? (L.guideTitle || 'eBookPirates // HASZNÁLATI ÚTMUTATÓ') : (L.title || 'eBookPirates // NEURÁLIS TERMINÁL v4.2'), 45, 52);

        // 4. II. SOR: Különálló, Nagyobb Fül-gombok (3 nagy tab a cím alatt)
        drawTerminalTab(ctx, 45, 68, 298, 40, L.loginTab, currentMode === 'LOGIN');
        drawTerminalTab(ctx, 359, 68, 298, 40, L.regTab, currentMode === 'REGISTER');
        drawTerminalTab(ctx, 673, 68, 306, 40, L.delTab, currentMode === 'DEREGISTER');

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(45, 118);
        ctx.lineTo(w - 45, 118);
        ctx.stroke();

        // 5. Tartalom kirajzolása mód szerint (1.5x Növelt Tipográfia)
        const cursorChar = cursorVisible ? '█' : ' ';

        if (currentMode === 'LOGIN') {
            const u = formValues.LOGIN.username;
            const p = isPasswordVisible ? formValues.LOGIN.password : '•'.repeat(formValues.LOGIN.password.length);

            drawField(ctx, 45, 144, L.userLabel, u, activeFieldIndex === 0, cursorChar, 48, 20, 28);
            drawField(ctx, 45, 228, L.passLabel, p, activeFieldIndex === 1, cursorChar, 48, 20, 28);
            drawEyeIconOnCanvas(ctx, 940, 258, isPasswordVisible);

            drawActionButton(ctx, 45, 318, w - 90, 58, L.loginBtn, false, 24);

        } else if (currentMode === 'REGISTER') {
            const em = formValues.REGISTER.email;
            const un = formValues.REGISTER.username;

            drawField(ctx, 45, 144, L.emailLabel, em, activeFieldIndex === 0, cursorChar, 48, 20, 26);
            drawField(ctx, 45, 228, L.newNickLabel, un, activeFieldIndex === 1, cursorChar, 48, 20, 28);

            drawActionButton(ctx, 45, 318, w - 90, 58, L.regBtn, false, 24);

        } else if (currentMode === 'DEREGISTER') {
            const un = formValues.DEREGISTER.username;
            const em = formValues.DEREGISTER.email;
            const rz = formValues.DEREGISTER.reason;

            drawField(ctx, 45, 136, L.delNickLabel, un, activeFieldIndex === 0, cursorChar, 38, 16, 22);
            drawField(ctx, 45, 200, L.delEmailLabel, em, activeFieldIndex === 1, cursorChar, 38, 16, 22);
            drawField(ctx, 45, 264, L.delReasonLabel, rz, activeFieldIndex === 2, cursorChar, 38, 16, 22);

            drawActionButton(ctx, 45, 328, w - 90, 52, L.delBtn, true, 22);

        } else if (currentMode === 'INFO') {
            ctx.fillStyle = 'rgba(0, 30, 45, 0.75)';
            ctx.fillRect(45, 126, w - 90, 192);
            ctx.strokeStyle = 'rgba(0, 255, 204, 0.35)';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(45, 126, w - 90, 192);

            ctx.fillStyle = '#00ffcc';
            ctx.font = 'bold 18px "Consolas", "Roboto Mono", "Segoe UI", monospace';
            ctx.fillText('> ' + (L.guideLine1 || '1. 3D GÉPELÉS: Kattints a monitorra a gépeléshez!'), 65, 156);
            ctx.fillText('> ' + (L.guideLine2 || '2. MEZŐVÁLTÁS: [TAB] billentyűvel válthatsz mezőt.'), 65, 192);
            ctx.fillText('> ' + (L.guideLine3 || '3. BEKÜLDÉS: Nyomj [ENTER]-t vagy kattints a Küldés gombra.'), 65, 228);
            ctx.fillText('> ' + (L.guideLine4 || '4. KAMERA: Bal egérgomb forgat, görgő nagyít.'), 65, 264);
            ctx.fillText('> ' + (L.guideLine5 || '5. INFÓ GOMB: A 3D gomb megnyomásával bármikor visszahívható.'), 65, 300);

            drawActionButton(ctx, 45, 328, w - 90, 52, L.guideCloseBtn || '✖ VISSZA A TERMINÁLHOZ [ENTER]', false, 22);
        }

        // 6. Alsó Rendszer Státuszsor (1.5x Növelt 20px Tipográfia)
        let displayStatus = terminalStatusText;
        if (currentStatusKey && L[currentStatusKey]) {
            displayStatus = L[currentStatusKey];
            if (currentStatusParam !== undefined && currentStatusParam !== '') {
                displayStatus = displayStatus.replace('{0}', currentStatusParam);
            }
        } else if (!displayStatus) {
            displayStatus = L.status_ready || L.readyStatus || 'SYSTEM READY // CLICK SCREEN TO TYPE';
        }

        ctx.fillStyle = isStatusError ? 'rgba(50, 10, 10, 0.95)' : 'rgba(0, 20, 30, 0.9)';
        ctx.fillRect(45, h - 82, w - 90, 46);
        ctx.strokeStyle = isStatusError ? '#ff4444' : 'rgba(0, 255, 204, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(45, h - 82, w - 90, 46);

        ctx.fillStyle = isStatusError ? '#ff6666' : '#00ffcc';
        ctx.font = 'bold 20px "Orbitron", "Consolas", sans-serif';
        ctx.fillText('> ' + displayStatus, 60, h - 52);

        if (screenTexture) screenTexture.needsUpdate = true;
    }

    function drawTerminalTab(context, x, y, w, h, text, isActive) {
        context.fillStyle = isActive ? 'rgba(0, 255, 204, 0.32)' : 'rgba(0, 255, 204, 0.06)';
        context.fillRect(x, y, w, h);
        context.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.35)';
        context.lineWidth = isActive ? 2.5 : 1;
        context.strokeRect(x, y, w, h);

        context.fillStyle = isActive ? '#ffffff' : '#88c0b0';
        context.font = 'bold 18px "Orbitron", "Segoe UI", sans-serif';
        context.textAlign = 'center';
        context.fillText(text || '', x + w / 2, y + 26);
        context.textAlign = 'left';
    }

    function drawField(context, x, y, label, value, isActive, cursor, boxHeight = 48, labelSize = 20, valueSize = 28) {
        context.fillStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.7)';
        context.font = 'bold ' + labelSize + 'px "Orbitron", "Segoe UI", sans-serif';
        context.fillText(label || '', x, y);

        context.fillStyle = isActive ? 'rgba(0, 50, 60, 0.88)' : 'rgba(0, 30, 40, 0.55)';
        context.fillRect(x, y + 6, 934, boxHeight);
        context.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.3)';
        context.lineWidth = isActive ? 2.5 : 1;
        context.strokeRect(x, y + 6, 934, boxHeight);

        context.fillStyle = '#ffffff';
        context.font = 'bold ' + valueSize + 'px "Consolas", "Roboto Mono", "Courier New", monospace';
        const displayText = (value || '') + (isActive ? cursor : '');
        context.fillText(displayText, x + 16, y + 6 + (boxHeight * 0.68));
    }

    function drawActionButton(context, x, y, w, h, text, isDanger = false, fontSize = 24) {
        context.fillStyle = isDanger ? '#661111' : '#004d40';
        context.fillRect(x, y, w, h);
        context.strokeStyle = isDanger ? '#ff4444' : '#00ffcc';
        context.lineWidth = 2.5;
        context.strokeRect(x, y, w, h);

        context.fillStyle = '#ffffff';
        context.font = 'bold ' + fontSize + 'px "Orbitron", "Segoe UI", sans-serif';
        context.textAlign = 'center';
        context.fillText(text || '', x + w / 2, y + h / 2 + 8);
        context.textAlign = 'left';
    }

    // InfoMesh és ScreenMesh Anyag és UV kezelők
    function applyInfoMeshMaterial(mesh) {
        if (!mesh || !mesh.geometry) return;
        try {
            const posAttr = mesh.geometry.attributes.position;
            if (!posAttr) return;

            let uvAttr = mesh.geometry.attributes.uv;
            if (!uvAttr || uvAttr.count !== posAttr.count) {
                uvAttr = new THREE.BufferAttribute(new Float32Array(posAttr.count * 2), 2);
                mesh.geometry.setAttribute('uv', uvAttr);
            }

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            for (let i = 0; i < posAttr.count; i++) {
                const px = posAttr.getX(i);
                const py = posAttr.getY(i);
                if (px < minX) minX = px;
                if (px > maxX) maxX = px;
                if (py < minY) minY = py;
                if (py > maxY) maxY = py;
            }
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const maxSpan = Math.max(rangeX, rangeY);

            if (maxSpan > 0.001) {
                for (let i = 0; i < posAttr.count; i++) {
                    const u = (posAttr.getX(i) - (centerX - maxSpan / 2)) / maxSpan;
                    const v = (posAttr.getY(i) - (centerY - maxSpan / 2)) / maxSpan;
                    uvAttr.setXY(i, u, v);
                }
                uvAttr.needsUpdate = true;
            }

            mesh.geometry.computeVertexNormals();

            if (!infoMaterial) {
                const texLoader = new THREE.TextureLoader();
                const gcsUrl = 'https://storage.googleapis.com/kalozsziget-assets/icons/info-r%201.png';
                const localPath = 'assets/icons/info-r 1.png';
                const infoTex = texLoader.load(
                    gcsUrl,
                    () => {
                        console.info('Info-gomb ikon sikeresen betöltve (GCS).');
                        if (mesh && mesh.material) mesh.material.needsUpdate = true;
                    },
                    undefined,
                    () => {
                        console.warn('GCS ikon nem található, helyi fallback...');
                        texLoader.load(localPath, (localTex) => {
                            if (infoMaterial) {
                                infoMaterial.map = localTex;
                                infoMaterial.needsUpdate = true;
                            }
                        });
                    }
                );
                infoTex.colorSpace = THREE.SRGBColorSpace;
                infoTex.wrapS = THREE.ClampToEdgeWrapping;
                infoTex.wrapT = THREE.ClampToEdgeWrapping;
                infoMaterial = new THREE.MeshStandardMaterial({
                    map: infoTex,
                    roughness: 0.35,
                    metalness: 0.15,
                    transparent: true,
                    alphaTest: 0.05,
                    side: THREE.DoubleSide
                });
            }

            mesh.material = infoMaterial;
            mesh.material.needsUpdate = true;
        } catch (e) {
            console.warn('Hiba az InfoMesh anyag hozzárendelésekor:', e);
        }
    }

    // Célkereszt ikon generálása FokuszMesh gombra
    function createCrosshairCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const c = canvas.getContext('2d');
        const cx = 256, cy = 256;

        const bgGrad = c.createRadialGradient(cx, cy, 20, cx, cy, 240);
        bgGrad.addColorStop(0, '#04222a');
        bgGrad.addColorStop(0.7, '#021218');
        bgGrad.addColorStop(1, '#01090d');
        c.fillStyle = bgGrad;
        c.beginPath();
        c.arc(cx, cy, 245, 0, Math.PI * 2);
        c.fill();

        c.strokeStyle = '#005544';
        c.lineWidth = 4;
        c.beginPath();
        c.arc(cx, cy, 242, 0, Math.PI * 2);
        c.stroke();

        c.shadowColor = '#00ffff';
        c.shadowBlur = 22;

        c.strokeStyle = '#00ffcc';
        c.lineWidth = 8;
        c.beginPath();
        c.arc(cx, cy, 180, 0, Math.PI * 2);
        c.stroke();

        c.strokeStyle = '#33ffff';
        c.lineWidth = 4;
        c.beginPath();
        c.arc(cx, cy, 90, 0, Math.PI * 2);
        c.stroke();

        c.strokeStyle = '#ffffff';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(cx, cy, 28, 0, Math.PI * 2);
        c.stroke();

        c.fillStyle = '#ffffff';
        c.beginPath();
        c.arc(cx, cy, 7, 0, Math.PI * 2);
        c.fill();

        c.strokeStyle = '#00ffcc';
        c.lineWidth = 6;
        c.lineCap = 'round';
        c.beginPath(); c.moveTo(cx, cy - 38); c.lineTo(cx, cy - 225); c.stroke();
        c.beginPath(); c.moveTo(cx, cy + 38); c.lineTo(cx, cy + 225); c.stroke();
        c.beginPath(); c.moveTo(cx - 38, cy); c.lineTo(cx - 225, cy); c.stroke();
        c.beginPath(); c.moveTo(cx + 38, cy); c.lineTo(cx + 225, cy); c.stroke();

        c.shadowBlur = 10;
        c.lineWidth = 3;
        [135, 180].forEach(r => {
            c.beginPath(); c.moveTo(cx - r, cy - 12); c.lineTo(cx - r, cy + 12); c.stroke();
            c.beginPath(); c.moveTo(cx + r, cy - 12); c.lineTo(cx + r, cy + 12); c.stroke();
            c.beginPath(); c.moveTo(cx - 12, cy - r); c.lineTo(cx + 12, cy - r); c.stroke();
            c.beginPath(); c.moveTo(cx - 12, cy + r); c.lineTo(cx + 12, cy + r); c.stroke();
        });

        c.strokeStyle = 'rgba(0, 255, 204, 0.7)';
        c.lineWidth = 3;
        const dist = 125;
        [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
            c.beginPath();
            c.arc(cx + sx * dist, cy + sy * dist, 6, 0, Math.PI * 2);
            c.stroke();
        });

        return canvas;
    }

    function applyFokuszMeshMaterial(mesh) {
        if (!mesh || !mesh.geometry) return;
        try {
            const posAttr = mesh.geometry.attributes.position;
            if (!posAttr) return;

            let uvAttr = mesh.geometry.attributes.uv;
            if (!uvAttr || uvAttr.count !== posAttr.count) {
                uvAttr = new THREE.BufferAttribute(new Float32Array(posAttr.count * 2), 2);
                mesh.geometry.setAttribute('uv', uvAttr);
            }

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            for (let i = 0; i < posAttr.count; i++) {
                const px = posAttr.getX(i);
                const py = posAttr.getY(i);
                if (px < minX) minX = px;
                if (px > maxX) maxX = px;
                if (py < minY) minY = py;
                if (py > maxY) maxY = py;
            }
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const maxSpan = Math.max(rangeX, rangeY);

            if (maxSpan > 0.001) {
                for (let i = 0; i < posAttr.count; i++) {
                    const u = (posAttr.getX(i) - (centerX - maxSpan / 2)) / maxSpan;
                    const v = (posAttr.getY(i) - (centerY - maxSpan / 2)) / maxSpan;
                    uvAttr.setXY(i, u, v);
                }
                uvAttr.needsUpdate = true;
            }

            mesh.geometry.computeVertexNormals();

            if (!fokuszMaterial) {
                const crosshairCanvas = createCrosshairCanvas();
                const crosshairTex = new THREE.CanvasTexture(crosshairCanvas);
                crosshairTex.colorSpace = THREE.SRGBColorSpace;
                crosshairTex.minFilter = THREE.LinearFilter;
                crosshairTex.magFilter = THREE.LinearFilter;

                fokuszMaterial = new THREE.MeshStandardMaterial({
                    map: crosshairTex,
                    roughness: 0.25,
                    metalness: 0.3,
                    emissive: 0x00443a,
                    emissiveIntensity: 0.7,
                    side: THREE.DoubleSide
                });
            }

            mesh.material = fokuszMaterial;
            mesh.material.needsUpdate = true;
        } catch (e) {
            console.warn('Hiba a FokuszMesh anyag hozzárendelésekor:', e);
        }
    }

    // Nyelvválasztó Gombok Anyag és Síkbeli UV kezelője
    function applyLangMeshMaterial(mesh, lang) {
        if (!mesh || !mesh.geometry) return;
        try {
            const posAttr = mesh.geometry.attributes.position;
            if (!posAttr) return;

            let uvAttr = mesh.geometry.attributes.uv;
            if (!uvAttr || uvAttr.count !== posAttr.count) {
                uvAttr = new THREE.BufferAttribute(new Float32Array(posAttr.count * 2), 2);
                mesh.geometry.setAttribute('uv', uvAttr);
            }

            let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
            for (let i = 0; i < posAttr.count; i++) {
                const px = posAttr.getX(i);
                const py = posAttr.getY(i);
                if (px < minX) minX = px;
                if (px > maxX) maxX = px;
                if (py < minY) minY = py;
                if (py > maxY) maxY = py;
            }
            const rangeX = maxX - minX;
            const rangeY = maxY - minY;
            const centerX = (minX + maxX) / 2;
            const centerY = (minY + maxY) / 2;
            const maxSpan = Math.max(rangeX, rangeY);

            if (maxSpan > 0.001) {
                for (let i = 0; i < posAttr.count; i++) {
                    const u = (posAttr.getX(i) - (centerX - maxSpan / 2)) / maxSpan;
                    const v = (posAttr.getY(i) - (centerY - maxSpan / 2)) / maxSpan;
                    uvAttr.setXY(i, u, v);
                }
                uvAttr.needsUpdate = true;
            }

            mesh.geometry.computeVertexNormals();

            if (!langMaterials[lang]) {
                const texLoader = new THREE.TextureLoader();
                const gcsUrl = 'https://storage.googleapis.com/kalozsziget-assets/tutorial/assets/images/flags/lang_' + lang + '-removebg-preview.png';
                const localPath = 'assets/images/flags/lang_' + lang + '-removebg-preview.png';
                const langTex = texLoader.load(
                    gcsUrl,
                    () => {
                        console.info('Nyelv zászló textúra sikeresen betöltve (GCS):', lang);
                        if (mesh && mesh.material) mesh.material.needsUpdate = true;
                    },
                    undefined,
                    () => {
                        console.warn('GCS zászló nem található, helyi fallback (' + lang + ')');
                        texLoader.load(localPath, (localTex) => {
                            if (langMaterials[lang]) {
                                langMaterials[lang].map = localTex;
                                langMaterials[lang].needsUpdate = true;
                            }
                        });
                    }
                );
                langTex.colorSpace = THREE.SRGBColorSpace;
                langTex.wrapS = THREE.ClampToEdgeWrapping;
                langTex.wrapT = THREE.ClampToEdgeWrapping;
                langMaterials[lang] = new THREE.MeshStandardMaterial({
                    map: langTex,
                    roughness: 0.35,
                    metalness: 0.2,
                    transparent: true,
                    alphaTest: 0.05,
                    side: THREE.DoubleSide
                });
            }

            mesh.material = langMaterials[lang];
            mesh.material.needsUpdate = true;
            mesh.userData.lang = lang;
        } catch (e) {
            console.warn('Hiba a nyelvválasztó material hozzárendelésekor (' + lang + '):', e);
        }
    }

    // --- GLB MODELL BETÖLTÉSE ---
    function loadDeviceModel() {
        const gltfLoader = new GLTFLoader();
        const modelPaths = [
            'assets/models/belepo_kozmosz_kutyu.glb',
            'https://storage.googleapis.com/kalozsziget-assets/models/belepo_kozmosz_kutyu.glb',
            'assets/models/belepooldal_kozmosz_kutyu.glb',
            'https://storage.googleapis.com/kalozsziget-assets/models/belepooldal_kozmosz_kutyu.glb'
        ];

        function tryLoad(index) {
            if (index >= modelPaths.length) {
                console.warn('Nem található GLB fájl, fallback terminál mesh generálása.');
                createFallbackDevice();
                const ls = document.getElementById('loading-screen');
                if (ls) {
                    ls.style.opacity = '0';
                    setTimeout(() => ls.style.display = 'none', 600);
                }
                openInfoModalAuto();
                return;
            }

            gltfLoader.load(
                modelPaths[index],
                (gltf) => {
                    console.info('GLB modell sikeresen betöltve:', modelPaths[index]);
                    deviceModel = gltf.scene;

                    deviceModel.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;

                            const meshName = (child.name || '').toLowerCase();
                            const parentName = (child.parent && child.parent.name) ? child.parent.name.toLowerCase() : '';
                            const matName = (child.material && child.material.name) ? child.material.name.toLowerCase() : '';

                            if (meshName.includes('screen') || parentName.includes('screen') ||
                                meshName === 'mesh_0.001' || matName.includes('screen') ||
                                matName.includes('kijelzo') || matName.includes('monitor')) {
                                child.material = screenMaterial;

                                if (child.geometry && child.geometry.attributes && child.geometry.attributes.uv) {
                                    const uvAttr = child.geometry.attributes.uv;
                                    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
                                    for (let i = 0; i < uvAttr.count; i++) {
                                        const u = uvAttr.getX(i);
                                        const v = uvAttr.getY(i);
                                        if (u < minU) minU = u;
                                        if (u > maxU) maxU = u;
                                        if (v < minV) minV = v;
                                        if (v > maxV) maxV = v;
                                    }
                                    const rangeU = maxU - minU;
                                    const rangeV = maxV - minV;
                                    if (rangeU > 0.01 && rangeV > 0.01) {
                                        for (let i = 0; i < uvAttr.count; i++) {
                                            const normU = 1.0 - ((uvAttr.getX(i) - minU) / rangeU);
                                            const normV = (uvAttr.getY(i) - minV) / rangeV;
                                            uvAttr.setXY(i, normU, normV);
                                        }
                                        uvAttr.needsUpdate = true;
                                    }
                                }
                            }
                            else if (meshName.includes('info') || parentName.includes('info') || meshName === 'mesh_0.009') {
                                applyInfoMeshMaterial(child);
                            }
                            else if (meshName.includes('fokusz') || parentName.includes('fokusz') || meshName === 'mesh_0.010') {
                                applyFokuszMeshMaterial(child);
                            }
                            else if (meshName.includes('magyar') || parentName.includes('magyar') || meshName === 'mesh_0.002') {
                                applyLangMeshMaterial(child, 'hu');
                            }
                            else if (meshName.includes('angol') || parentName.includes('angol') || meshName === 'mesh_0.003') {
                                applyLangMeshMaterial(child, 'en');
                            }
                            else if (meshName.includes('nemet') || parentName.includes('nemet') || meshName === 'mesh_0.004') {
                                applyLangMeshMaterial(child, 'de');
                            }
                            else if (meshName.includes('francia') || parentName.includes('francia') || meshName === 'mesh_0.005') {
                                applyLangMeshMaterial(child, 'fr');
                            }
                            else if (meshName.includes('spanyol') || parentName.includes('spanyol') || meshName === 'mesh_0.006') {
                                applyLangMeshMaterial(child, 'es');
                            }
                            else if (meshName.includes('lengyel') || parentName.includes('lengyel') || meshName === 'mesh_0.007') {
                                applyLangMeshMaterial(child, 'pl');
                            }
                            else if (meshName.includes('orosz') || parentName.includes('orosz') || meshName === 'mesh_0.008') {
                                applyLangMeshMaterial(child, 'ru');
                            }
                        }
                    });

                    const box = new THREE.Box3().setFromObject(deviceModel);
                    const center = box.getCenter(new THREE.Vector3());

                    deviceModel.position.x += (deviceModel.position.x - center.x);
                    deviceModel.position.y += (deviceModel.position.y - center.y);
                    deviceModel.position.z += (deviceModel.position.z - center.z);

                    scene.add(deviceModel);

                    const ls = document.getElementById('loading-screen');
                    if (ls) {
                        ls.style.opacity = '0';
                        setTimeout(() => ls.style.display = 'none', 600);
                    }
                },
                undefined,
                (err) => {
                    console.warn('Hiba a modell betöltésekor (' + modelPaths[index] + '), következő próba...');
                    tryLoad(index + 1);
                }
            );
        }

        tryLoad(0);
    }

    function createFallbackDevice() {
        const group = new THREE.Group();
        const bodyGeo = new THREE.BoxGeometry(2.8, 1.8, 1.2);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x182028, metalness: 0.85, roughness: 0.25 });
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(bodyMesh);

        const screenGeo = new THREE.PlaneGeometry(2.4, 1.2);
        const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
        screenMesh.position.set(0, 0, 0.61);
        group.add(screenMesh);

        group.position.set(0, 0, 0);
        scene.add(group);
        deviceModel = group;
    }

    // --- KÖZVETLEN 3D BILLENTYŰZET & RAYCAST INTERAKCIÓ ---
    function setupDirectKeyboardAndRaycast() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        let pointerDownPos = { x: 0, y: 0, time: 0 };

        window.addEventListener('pointerdown', (event) => {
            pointerDownPos.x = event.clientX;
            pointerDownPos.y = event.clientY;
            pointerDownPos.time = Date.now();
        });

        window.addEventListener('pointerup', (event) => {
            if (event.target.closest('#info-modal') || event.target.closest('#info-toggle-btn')) {
                return;
            }

            const dist = Math.hypot(event.clientX - pointerDownPos.x, event.clientY - pointerDownPos.y);
            const elapsed = Date.now() - pointerDownPos.time;
            // Érintőképernyőkhöz optimalizált küszöbértékek (mikromozgás és koppintási idő rugalmas kezelése)
            if (dist > 30 || elapsed > 1200) {
                return;
            }

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            for (let hit of intersects) {
                const objName = (hit.object.name || '').toLowerCase();
                const parentName = (hit.object.parent && hit.object.parent.name) ? hit.object.parent.name.toLowerCase() : '';

                if (objName.includes('info') || parentName.includes('info') || hit.object.material === infoMaterial) {
                    blurVirtualInput();
                    toggle3DInfoMode();
                    break;
                }

                if (objName.includes('fokusz') || parentName.includes('fokusz') || hit.object.material === fokuszMaterial || objName === 'mesh_0.010') {
                    blurVirtualInput();
                    focusOnScreen();
                    setTerminalStatus("status_cam_focused", false);
                    break;
                }

                if (hit.object.userData && hit.object.userData.lang) {
                    blurVirtualInput();
                    handleLangSwitch(hit.object.userData.lang);
                    break;
                }
                if (objName.includes('magyar') || parentName.includes('magyar') || objName === 'mesh_0.002') { blurVirtualInput(); handleLangSwitch('hu'); break; }
                if (objName.includes('angol') || parentName.includes('angol') || objName === 'mesh_0.003') { blurVirtualInput(); handleLangSwitch('en'); break; }
                if (objName.includes('nemet') || parentName.includes('nemet') || objName === 'mesh_0.004') { blurVirtualInput(); handleLangSwitch('de'); break; }
                if (objName.includes('francia') || parentName.includes('francia') || objName === 'mesh_0.005') { blurVirtualInput(); handleLangSwitch('fr'); break; }
                if (objName.includes('spanyol') || parentName.includes('spanyol') || objName === 'mesh_0.006') { blurVirtualInput(); handleLangSwitch('es'); break; }
                if (objName.includes('lengyel') || parentName.includes('lengyel') || objName === 'mesh_0.007') { blurVirtualInput(); handleLangSwitch('pl'); break; }
                if (objName.includes('orosz') || parentName.includes('orosz') || objName === 'mesh_0.008') { blurVirtualInput(); handleLangSwitch('ru'); break; }

                if (hit.object.material === screenMaterial || objName.includes('screen') || parentName.includes('screen') || objName.includes('mesh_0.001')) {
                    if (event.cancelable) {
                        event.preventDefault();
                    }
                    if (hit.uv) {
                        handleScreenUVClick(hit.uv, event.clientX, event.clientY);
                    } else {
                        focusVirtualInput(event.clientX, event.clientY);
                    }
                    break;
                }
            }
        });

        window.addEventListener('pointermove', (event) => {
            if (event.target.closest('#info-modal') || event.target.closest('#info-toggle-btn')) {
                return;
            }
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);
            let isHovering = false;

            for (let hit of intersects) {
                const objName = (hit.object.name || '').toLowerCase();
                const parentName = (hit.object.parent && hit.object.parent.name) ? hit.object.parent.name.toLowerCase() : '';
                if (objName.includes('info') || objName.includes('screen') || objName.includes('fokusz') ||
                    objName === 'mesh_0.010' || objName === 'mesh_0.009' || objName === 'mesh_0.001' ||
                    objName === 'mesh_0.002' || objName === 'mesh_0.003' || objName === 'mesh_0.004' ||
                    objName === 'mesh_0.005' || objName === 'mesh_0.006' || objName === 'mesh_0.007' ||
                    objName === 'mesh_0.008' ||
                    objName.includes('magyar') || objName.includes('angol') || objName.includes('nemet') ||
                    objName.includes('francia') || objName.includes('spanyol') || objName.includes('lengyel') ||
                    objName.includes('orosz') || hit.object.material === screenMaterial ||
                    hit.object.material === infoMaterial || hit.object.material === fokuszMaterial ||
                    (hit.object.userData && hit.object.userData.lang)) {
                    isHovering = true;
                    break;
                }
            }
            document.body.style.cursor = isHovering ? 'pointer' : 'default';
        });

        // Globális billentyűzet figyelő (ha a capturer nincs fókuszban)
        window.addEventListener('keydown', (event) => {
            const infoModal = document.getElementById('info-modal');
            if (infoModal && infoModal.style.display === 'flex') {
                return;
            }
            if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
                return;
            }
            handleDirectKeyInput(event);
        });

        // Virtuális input capturer eseménykezelők (Mobilos virtuális billentyűzet fókuszhoz)
        if (virtualInput) {
            virtualInput.addEventListener('input', () => {
                syncVirtualInput(virtualInput.value);
            });

            virtualInput.addEventListener('compositionend', () => {
                syncVirtualInput(virtualInput.value);
            });

            virtualInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const maxFields = (currentMode === 'DEREGISTER') ? 3 : 2;
                    if (activeFieldIndex < maxFields - 1) {
                        activeFieldIndex++;
                        setTerminalStatus("status_field_switched", false, activeFieldIndex + 1);
                        focusVirtualInput();
                    } else {
                        blurVirtualInput();
                        executeCurrentMode();
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    const maxFields = (currentMode === 'DEREGISTER') ? 3 : 2;
                    activeFieldIndex = (activeFieldIndex + 1) % maxFields;
                    setTerminalStatus("status_field_switched", false, activeFieldIndex + 1);
                    focusVirtualInput();
                } else if (e.key === 'Escape') {
                    e.preventDefault();
                    blurVirtualInput();
                }
            });

            virtualInput.addEventListener('focus', () => {
                cursorVisible = true;
                updateScreenDisplay();
            });

            virtualInput.addEventListener('blur', () => {
                cursorVisible = false;
                updateScreenDisplay();
                if (renderer && renderer.domElement) {
                    try { renderer.domElement.focus(); } catch (e) { }
                }
            });
        }
    }

    function onVisualViewportResize() {
        if (!renderer || !camera) return;
        const vv = window.visualViewport;
        if (vv) {
            camera.aspect = vv.width / vv.height;
            camera.updateProjectionMatrix();
            renderer.setSize(vv.width, vv.height);
        }
    }

    function setupModalInputSync() {
        const bindInput = (id, mode, key) => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', () => {
                formValues[mode][key] = el.value;
                syncModalInputsFrom3D();
                updateScreenDisplay();
            });
        };

        bindInput('m-login-username', 'LOGIN', 'username');
        bindInput('m-login-password', 'LOGIN', 'password');
        bindInput('m-reg-email', 'REGISTER', 'email');
        bindInput('m-reg-username', 'REGISTER', 'username');
        bindInput('m-del-username', 'DEREGISTER', 'username');
        bindInput('m-del-email', 'DEREGISTER', 'email');
        bindInput('m-del-reason', 'DEREGISTER', 'reason');
    }

    function syncModalInputsFrom3D() {
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el && el.value !== val) el.value = val || '';
        };

        setVal('m-login-username', formValues.LOGIN.username);
        setVal('m-login-password', formValues.LOGIN.password);
        setVal('m-reg-email', formValues.REGISTER.email);
        setVal('m-reg-username', formValues.REGISTER.username);
        setVal('m-del-username', formValues.DEREGISTER.username);
        setVal('m-del-email', formValues.DEREGISTER.email);
        setVal('m-del-reason', formValues.DEREGISTER.reason);
    }

    function handleScreenUVClick(uv, clickX, clickY) {
        const pxX = uv.x * 1024;
        const pxY = (1 - uv.y) * 512;

        // Felső Dedikált Tab-sor kattintása (Y: 60 - 116)
        if (pxY >= 55 && pxY <= 116) {
            blurVirtualInput();
            if (pxX >= 45 && pxX < 350) {
                switchMode('LOGIN');
                return;
            } else if (pxX >= 350 && pxX < 665) {
                switchMode('REGISTER');
                return;
            } else if (pxX >= 665 && pxX <= 985) {
                switchMode('DEREGISTER');
                return;
            }
        }

        // Info mód bezáró gomb
        if (currentMode === 'INFO') {
            if (pxY >= 320 && pxY <= 395 && pxX >= 45 && pxX <= 979) {
                blurVirtualInput();
                switchMode(previousMode || 'LOGIN');
                return;
            }
        }

        // Mezők és Szem-ikon kiválasztása
        if (currentMode === 'LOGIN') {
            if (pxY >= 225 && pxY <= 295 && pxX >= 890 && pxX <= 985) {
                togglePasswordVisibility();
                return;
            }

            if (pxY >= 125 && pxY <= 215) {
                activeFieldIndex = 0;
                setTerminalStatus("status_field_selected", false, 1);
                focusVirtualInput(clickX, clickY);
            } else if (pxY > 215 && pxY <= 305) {
                activeFieldIndex = 1;
                setTerminalStatus("status_field_selected", false, 2);
                focusVirtualInput(clickX, clickY);
            } else if (pxY >= 310 && pxY <= 390) {
                blurVirtualInput();
                executeCurrentMode();
            } else {
                focusVirtualInput(clickX, clickY);
            }
        } else if (currentMode === 'REGISTER') {
            if (pxY >= 125 && pxY <= 215) {
                activeFieldIndex = 0;
                setTerminalStatus("status_field_selected", false, 1);
                focusVirtualInput(clickX, clickY);
            } else if (pxY > 215 && pxY <= 305) {
                activeFieldIndex = 1;
                setTerminalStatus("status_field_selected", false, 2);
                focusVirtualInput(clickX, clickY);
            } else if (pxY >= 310 && pxY <= 390) {
                blurVirtualInput();
                executeCurrentMode();
            } else {
                focusVirtualInput(clickX, clickY);
            }
        } else if (currentMode === 'DEREGISTER') {
            if (pxY >= 120 && pxY <= 188) {
                activeFieldIndex = 0;
                focusVirtualInput(clickX, clickY);
            } else if (pxY > 188 && pxY <= 252) {
                activeFieldIndex = 1;
                focusVirtualInput(clickX, clickY);
            } else if (pxY > 252 && pxY <= 316) {
                activeFieldIndex = 2;
                focusVirtualInput(clickX, clickY);
            } else if (pxY >= 320 && pxY <= 395) {
                blurVirtualInput();
                executeCurrentMode();
            } else {
                focusVirtualInput(clickX, clickY);
            }
        }

        updateScreenDisplay();
    }

    function blurVirtualInput() {
        if (!virtualInput) return;
        try {
            virtualInput.blur();
        } catch (e) { }
        cursorVisible = false;
        updateScreenDisplay();
        if (renderer && renderer.domElement) {
            try {
                renderer.domElement.focus();
            } catch (e) { }
        }
    }

    function focusVirtualInput(touchX, touchY) {
        if (!virtualInput) return;
        const targetFieldKey = getActiveFieldKey();
        if (targetFieldKey && formValues[currentMode]) {
            const val = formValues[currentMode][targetFieldKey] || '';
            if (virtualInput.value !== val) {
                virtualInput.value = val;
            }
        }

        if (typeof touchX === 'number' && typeof touchY === 'number') {
            virtualInput.style.left = Math.max(0, Math.min(window.innerWidth - 30, touchX - 10)) + 'px';
            virtualInput.style.top = Math.max(0, Math.min(window.innerHeight - 30, touchY - 10)) + 'px';
        }

        if (targetFieldKey === 'email') {
            virtualInput.type = 'email';
            virtualInput.inputMode = 'email';
        } else {
            virtualInput.type = 'text';
            virtualInput.inputMode = 'text';
        }

        const doFocus = () => {
            try {
                virtualInput.focus({ preventScroll: true });
                if (typeof virtualInput.setSelectionRange === 'function') {
                    const len = (virtualInput.value || '').length;
                    virtualInput.setSelectionRange(len, len);
                }
            } catch (e) {
                try { virtualInput.focus(); } catch (err) { }
            }
        };

        doFocus();
        setTimeout(doFocus, 30);
        setTimeout(doFocus, 100);
    }

    function handleDirectKeyInput(event) {
        if (!event || typeof event.key === 'undefined' || event.key === null) return;
        const key = event.key;
        if (typeof key !== 'string' || !key) return;

        if (key === 'Tab') {
            event.preventDefault();
            const maxFields = (currentMode === 'DEREGISTER') ? 3 : 2;
            activeFieldIndex = (activeFieldIndex + 1) % maxFields;
            setTerminalStatus("status_field_switched", false, activeFieldIndex + 1);
            focusVirtualInput();
            return;
        }

        if (currentMode === 'INFO') {
            if (key === 'Enter' || key === 'Escape' || key === ' ') {
                event.preventDefault();
                switchMode(previousMode || 'LOGIN');
                return;
            }
        }

        if (key === 'Enter') {
            event.preventDefault();
            executeCurrentMode();
            return;
        }

        let targetFieldKey = getActiveFieldKey();
        if (!targetFieldKey) return;

        if (!formValues[currentMode]) {
            formValues[currentMode] = {};
        }
        let currentVal = formValues[currentMode][targetFieldKey] || '';

        if (key === 'Backspace') {
            event.preventDefault();
            formValues[currentMode][targetFieldKey] = currentVal.slice(0, -1);
            if (virtualInput) virtualInput.value = formValues[currentMode][targetFieldKey];
            syncModalInputsFrom3D();
            updateScreenDisplay();
            return;
        }

        if (key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) {
            formValues[currentMode][targetFieldKey] = currentVal + key;
            if (virtualInput) virtualInput.value = formValues[currentMode][targetFieldKey];
            var L = getL();
            terminalStatusText = (L.status_editing || "EDITING // ") + targetFieldKey.toUpperCase();
            currentStatusKey = null;
            isStatusError = false;
            syncModalInputsFrom3D();
            updateScreenDisplay();
        }
    }

    function syncVirtualInput(val) {
        let targetFieldKey = getActiveFieldKey();
        if (!targetFieldKey) return;
        if (!formValues[currentMode]) formValues[currentMode] = {};
        formValues[currentMode][targetFieldKey] = val || '';
        syncModalInputsFrom3D();
        updateScreenDisplay();
    }

    function getActiveFieldKey() {
        if (currentMode === 'LOGIN') {
            return (activeFieldIndex === 0) ? 'username' : 'password';
        } else if (currentMode === 'REGISTER') {
            return (activeFieldIndex === 0) ? 'email' : 'username';
        } else if (currentMode === 'DEREGISTER') {
            if (activeFieldIndex === 0) return 'username';
            if (activeFieldIndex === 1) return 'email';
            return 'reason';
        }
        return null;
    }

    // --- MÓDVÁLTÁS ---
    function switchMode(mode) {
        if (currentMode !== 'INFO' && mode !== 'INFO') {
            previousMode = currentMode;
        }
        currentMode = mode;
        activeFieldIndex = 0;
        isStatusError = false;

        document.querySelectorAll('.modal-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.modal-form-view').forEach(f => f.style.display = 'none');

        if (mode === 'LOGIN') {
            const b = document.getElementById('modal-tab-login');
            if (b) b.classList.add('active');
            const f = document.getElementById('modal-form-login');
            if (f) f.style.display = 'block';
            setTerminalStatus("status_login_mode", false);
        } else if (mode === 'REGISTER') {
            const b = document.getElementById('modal-tab-register');
            if (b) b.classList.add('active');
            const f = document.getElementById('modal-form-register');
            if (f) f.style.display = 'block';
            setTerminalStatus("status_reg_mode", false);
        } else if (mode === 'DEREGISTER') {
            const b = document.getElementById('modal-tab-deregister');
            if (b) b.classList.add('active');
            const f = document.getElementById('modal-form-deregister');
            if (f) f.style.display = 'block';
            setTerminalStatus("status_del_mode", false);
        } else if (mode === 'INFO') {
            setTerminalStatus("status_info_mode", false);
        }

        syncModalInputsFrom3D();
        updateScreenDisplay();
    }

    function toggle3DInfoMode() {
        if (currentMode === 'INFO') {
            switchMode(previousMode || 'LOGIN');
        } else {
            previousMode = currentMode;
            switchMode('INFO');
        }
    }

    function executeCurrentMode() {
        if (currentMode === 'LOGIN') executeLogin();
        else if (currentMode === 'REGISTER') executeRegister();
        else if (currentMode === 'DEREGISTER') executeDeregister();
    }

    // --- NYELVVÁLTÁS KEZELŐ (web_fordito.js szinkron) ---
    function handleLangSwitch(lang) {
        window.currentLang = lang;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('siteLang', lang);
        }
        if (typeof window.switchLanguage === 'function') {
            window.switchLanguage(lang);
        } else if (typeof switchLanguage === 'function') {
            switchLanguage(lang);
        }
        if (typeof window.updateLanguageUI === 'function') {
            window.updateLanguageUI();
        }
        updateActiveLangButtonsInModal();
        updateScreenDisplay();
    }

    function updateActiveLangButtonsInModal() {
        const lang = window.currentLang || localStorage.getItem('siteLang') || 'hu';
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', btnLang === lang);
        });
    }

    // --- KAMERA GYORSPOZÍCIÓK ---
    function focusOnScreen() {
        if (!controls) return;
        camera.position.set(0, 0.25, 2.2);
        controls.target.set(0, 0.15, 0);
        controls.update();
    }

    function resetCamera() {
        if (!controls) return;
        camera.position.set(0, 0.35, 2.6);
        controls.target.set(0, 0.15, 0);
        controls.update();
    }

    // --- INFÓ MODAL KEZELŐ ---
    function toggleInfoModal() {
        const modal = document.getElementById('info-modal');
        if (!modal) return;
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        } else {
            modal.style.display = 'flex';
            syncModalInputsFrom3D();
            updateActiveLangButtonsInModal();
        }
    }

    function openInfoModalAuto() {
        const modal = document.getElementById('info-modal');
        if (modal) {
            modal.style.display = 'flex';
            syncModalInputsFrom3D();
            updateActiveLangButtonsInModal();
        }
    }

    function onModalBackdropClick(e) {
        if (e.target.id === 'info-modal') {
            toggleInfoModal();
        }
    }

    // --- BACKEND MŰVELETEK ---
    // --- ROBUSZTUS BACKEND KOMMUNIKÁCIÓ & JSON ÉRTELMEZŐ ---
    function parseJsonSafe(text) {
        if (!text) return null;
        try {
            return JSON.parse(text);
        } catch (e) { }

        var start = -1;
        var depth = 0;
        var inString = false;
        var escaped = false;

        for (var i = 0; i < text.length; i++) {
            var ch = text.charAt(i);
            if (inString) {
                if (escaped) { escaped = false; continue; }
                if (ch === '\\') { escaped = true; continue; }
                if (ch === '"') { inString = false; }
                continue;
            }
            if (ch === '"') { inString = true; continue; }
            if (ch === '{') {
                if (depth === 0) start = i;
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

    function callBackendApi(action, dataObj, onSuccess, onFailure) {
        const payload = {
            action: action,
            data: Array.isArray(dataObj) ? dataObj : [dataObj],
            token: localStorage.getItem('ebookPiratesToken') || ''
        };

        fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
            .then(res => res.text())
            .then(rawText => {
                const parsed = parseJsonSafe(rawText);
                if (!parsed) {
                    if (rawText && rawText.includes('<title>')) {
                        const titleMatch = rawText.match(/<title>(.*?)<\/title>/i);
                        const titleText = titleMatch ? titleMatch[1] : "Szerverhiba";
                        throw new Error(titleText);
                    }
                    throw new Error("A szerver válasza nem értelmezhető adat.");
                }
                if (onSuccess) onSuccess(parsed);
            })
            .catch(err => {
                if (onFailure) onFailure(err);
            });
    }

    function setTerminalStatus(keyOrText, isError = false, param = '') {
        isStatusError = isError;
        if (typeof keyOrText === 'string' && keyOrText.startsWith('status_')) {
            currentStatusKey = keyOrText;
            currentStatusParam = param;
        } else {
            currentStatusKey = null;
            terminalStatusText = keyOrText;
        }
        updateScreenDisplay();
    }

    function executeLogin() {
        const u = formValues.LOGIN.username.trim();
        const p = formValues.LOGIN.password.trim();

        if (!u || !p) {
            setTerminalStatus("status_err_login_empty", true);
            return;
        }

        setTerminalStatus("status_auth_checking", false);

        callBackendApi('performLogin', { name: u, jelszo: p }, (data) => {
            if (data && data.success) {
                const user = data.user || {};
                const startPage = user.startPage || (user.tutorialCompleted ? 'kikoto_oldal' : 'tutorial_oldal');
                const isTutorial = (startPage.indexOf('tutorial') !== -1);
                setTerminalStatus("status_login_success", false);

                try {
                    if (data.token) {
                        localStorage.setItem('ebookPiratesToken', data.token);
                        sessionStorage.setItem('ebookPiratesToken', data.token);
                    }
                    localStorage.setItem('ebook_pirates_username', user.name || u);
                    if (user.email) localStorage.setItem('ebook_pirates_user_email', user.email);
                    if (user.activeShipId) localStorage.setItem('ebook_pirates_active_ship_id', user.activeShipId);
                    sessionStorage.setItem('ebook_is_logged_in', 'true');
                    sessionStorage.setItem('ebookPiratesLoginName', user.name || u);
                    sessionStorage.setItem('ebookPiratesLoginPass', p);
                    sessionStorage.setItem('cached_user_data', JSON.stringify(user));
                } catch (e) { }

                // Háttérbeli előtöltés az animáció 3-4 másodperce alatt
                try {
                    const targetHtml = (startPage.indexOf('.html') === -1) ? (startPage + '.html') : startPage;
                    fetch(targetHtml).catch(() => { });
                } catch (e) { }

                // 🚀 Dinamikus űrhajó kamera-mozgás indítása a gömbpalást bolygója felé
                startHyperspaceCinematic(() => {
                    const auth3d = document.getElementById('auth-3d-container');
                    if (auth3d) auth3d.style.display = 'none';

                    if (typeof window.initializeApp === 'function') {
                        window.initializeApp(user);
                    } else if (typeof initializeApp === 'function') {
                        initializeApp(user);
                    } else {
                        window.location.href = 'index.html';
                    }
                });
            } else {
                const msg = (data && (data.message || data.error)) ? (data.message || data.error) : "Érvénytelen kalóznév vagy jelszó!";
                var L = getL(); setTerminalStatus((L.status_rejected || "ELUTASÍTVA // ") + msg.toUpperCase(), true);
            }
        }, (err) => {
            var L = getL(); setTerminalStatus((L.status_net_error || "HÁLÓZATI HIBA: ") + (err.message || "A szerver nem elérhető"), true);
        });
    }

    function executeRegister() {
        const em = formValues.REGISTER.email.trim();
        const un = formValues.REGISTER.username.trim();

        if (!em || !un) {
            setTerminalStatus("status_err_reg_empty", true);
            return;
        }

        setTerminalStatus("status_reg_progress", false);

        callBackendApi('submitRegistrationRequest', { email: em, name: un }, (data) => {
            if (data && data.success) {
                setTerminalStatus("status_reg_success", false);
            } else {
                setTerminalStatus("HIBA: " + (data.message || data.error || "Sikertelen regisztráció!"), true);
            }
        }, (err) => {
            var L = getL(); setTerminalStatus((L.status_net_error || "HÁLÓZATI HIBA: ") + (err.message || "A szerver nem elérhető"), true);
        });
    }

    function executeDeregister() {
        const un = formValues.DEREGISTER.username.trim();
        const em = formValues.DEREGISTER.email.trim();
        const rz = formValues.DEREGISTER.reason.trim();

        if (!un || !em || !rz) {
            setTerminalStatus("status_err_del_empty", true);
            return;
        }

        setTerminalStatus("status_del_progress", false);

        callBackendApi('submitDeletionRequest', { name: un, email: em, reason: rz }, (data) => {
            if (data && data.success) {
                setTerminalStatus("status_del_success", false);
            } else {
                setTerminalStatus("HIBA: " + (data.message || data.error || "Sikertelen leléptetés!"), true);
            }
        }, (err) => {
            var L = getL(); setTerminalStatus((L.status_net_error || "HÁLÓZATI HIBA: ") + (err.message || "A szerver nem elérhető"), true);
        });
    }

    // --- 🚀 HIPERUGRÁS & KAMERA-ANIMÁCIÓS MOTOR ---
    let isCinematicFlight = false;
    let flightStartTime = 0;
    let flightDuration = 3800; // 3.8 mp dinamikus űrhajó gyorsulás
    let flightPathCurve = null;
    let flightStartTarget = null;
    let flightFinalTarget = null;
    let flightOnComplete = null;
    let initialCameraFov = 50;

    function startHyperspaceCinematic(onComplete) {
        if (typeof preloadAllSubpages === 'function') preloadAllSubpages();
        if (typeof warmup3DHarborAssets === 'function') warmup3DHarborAssets();
        if (typeof preloadUserBaseData === 'function') preloadUserBaseData(window.currentUser);
        if (!camera || !scene) {
            if (onComplete) onComplete();
            return;
        }

        if (controls) controls.enabled = false;
        blurVirtualInput();

        const infoModal = document.getElementById('info-modal');
        if (infoModal) infoModal.style.display = 'none';

        initialCameraFov = camera.fov || 50;

        // 1. Aktuális kamera- és fókuszpozíció rögzítése a validálás pillanatában
        const currentPos = camera.position.clone();
        const currentTarget = (controls && controls.target) ? controls.target.clone() : new THREE.Vector3(0, 0.15, 0);
        const centerObstacle = new THREE.Vector3(0, 0.15, 0);

        // 2. Pontos célpont kijelölése a köpeny forgásának pillanatnyi állása alapján (EGYSZER, a validálás után)
        const planetLocalPos = new THREE.Vector3(1.0, 2.3, -29.8).normalize().multiplyScalar(SPHERE_RADIUS);
        const targetWorldPos = cosmosSphere ? cosmosSphere.localToWorld(planetLocalPos.clone()) : new THREE.Vector3(29.8, 2.3, 1.0);

        flightStartTarget = currentTarget.clone();
        flightFinalTarget = targetWorldPos.clone();

        // 3. Irányvektorok meghatározása a sima kikerülő ívhez
        const dirToTarget = targetWorldPos.clone().sub(centerObstacle).normalize();
        let dirFromCenter = currentPos.clone().sub(centerObstacle);
        if (dirFromCenter.lengthSq() < 0.01) {
            dirFromCenter.set(0, 0, 1);
        }
        dirFromCenter.normalize();

        // Kitérési oldalirány a konzol bal széle mellé
        const up = new THREE.Vector3(0, 1, 0);
        let sideDir = new THREE.Vector3().crossVectors(up, dirFromCenter).normalize();
        if (sideDir.lengthSq() < 0.001) {
            sideDir.set(-1, 0, 0);
        }

        // 4. Egyetlen, szép, folytonos ívű kikerülő röppálya kiszámítása (Centripetal Catmull-Rom spline)
        const p0 = currentPos.clone();
        const p1 = currentPos.clone()
            .add(dirFromCenter.clone().multiplyScalar(1.5))
            .add(new THREE.Vector3(0, 0.8, 0))
            .add(sideDir.clone().multiplyScalar(1.4));

        const flankDir = dirFromCenter.clone().multiplyScalar(0.25).add(sideDir.clone().multiplyScalar(0.95)).normalize();
        const p2 = centerObstacle.clone()
            .add(flankDir.clone().multiplyScalar(4.8))
            .add(new THREE.Vector3(0, 1.6, 0));

        const alignDir = flankDir.clone().multiplyScalar(0.35).add(dirToTarget.clone().multiplyScalar(0.65)).normalize();
        const p3 = centerObstacle.clone()
            .add(alignDir.clone().multiplyScalar(11.0))
            .add(new THREE.Vector3(0, 2.2, 0));

        const p4 = centerObstacle.clone()
            .add(dirToTarget.clone().multiplyScalar(19.5))
            .add(new THREE.Vector3(0, 2.2, 0));

        const p5 = targetWorldPos.clone().multiplyScalar(26.2 / SPHERE_RADIUS);

        // Centripetális spline: kizárja a szaggatást, hirtelen ugrásokat és túllendüléseket
        flightPathCurve = new THREE.CatmullRomCurve3([p0, p1, p2, p3, p4, p5], false, 'centripetal');

        isCinematicFlight = true;
        flightStartTime = performance.now();
        flightDuration = 3800; // ~3.8 mp
        flightOnComplete = onComplete;
    }
    function reset3DTerminalState() {
        isCinematicFlight = false;
        if (camera) {
            camera.position.set(0, 0.35, 2.6);
            camera.fov = 45;
            camera.updateProjectionMatrix();
        }
        if (controls) {
            controls.enabled = true;
            controls.target.set(0, 0.15, 0);
            controls.update();
        }
        if (renderer && renderer.domElement) {
            renderer.domElement.style.filter = 'none';
        }
        terminalStatusText = "SYSTEM READY // CLICK SCREEN TO TYPE";
        isStatusError = false;
        switchMode('LOGIN');
        updateScreenDisplay();
    }

    // --- RENDER & ANIMÁCIÓS CIKLUS ---
    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate(timestamp) {
        requestAnimationFrame(animate);

        // 1. Kozmosz háttér lassú forgása (csak a normál nézetben, a hiperugrás alatt rögzítve marad a kijelölt célhoz)
        if (cosmosSphere && !isCinematicFlight) {
            cosmosSphere.rotation.y += 0.0002;
            cosmosSphere.rotation.x += 0.00004;
        }

        if (meteorManager) {
            meteorManager.update();
        }

        if (timestamp - lastCursorBlink > 500) {
            cursorVisible = !cursorVisible;
            lastCursorBlink = timestamp;
            updateScreenDisplay();
        }

        // 🚀 Dinamikus Űrhajó Kamera Hiperhajtómű Animáció
        if (isCinematicFlight && flightPathCurve && flightStartTarget && flightFinalTarget) {
            const elapsed = timestamp - flightStartTime;
            let progress = Math.min(1.0, elapsed / flightDuration);

            // Kétfázisú sima gyorsulási görbe (Cubic Ease In-Out)
            const easeProgress = progress < 0.5
                ? 4 * Math.pow(progress, 3)
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            const clampedT = Math.max(0, Math.min(1, easeProgress));

            const newPos = flightPathCurve.getPoint(clampedT);
            camera.position.copy(newPos);

            // Sima, elegáns fókuszpont átmenet: a konzolról folyamatosan átfordul a fix kijelölt bolygóra
            const smoothLookT = Math.min(1.0, Math.pow(clampedT, 1.25));
            const currentLookTarget = new THREE.Vector3().lerpVectors(flightStartTarget, flightFinalTarget, smoothLookT);
            camera.lookAt(currentLookTarget);
            if (controls) controls.target.copy(currentLookTarget);

            // Dinamikus FOV hiperugrás lencse-torzítás (50 -> 74 -> 50)
            if (progress > 0.2) {
                const fovFactor = Math.sin((progress - 0.2) / 0.8 * Math.PI);
                camera.fov = initialCameraFov + fovFactor * 24;
                camera.updateProjectionMatrix();
            }

            // Kiszürkülés (Grayscale) és finom sötétülés mielőtt eléri a gömbpalástot (progress > 0.58)
            if (renderer && renderer.domElement) {
                if (progress > 0.58) {
                    const grayProgress = (progress - 0.58) / 0.42; // 0.0 -> 1.0
                    const grayVal = Math.min(100, Math.floor(grayProgress * 100));
                    const brightVal = (1.0 - grayProgress * 0.40).toFixed(2);
                    renderer.domElement.style.filter = 'grayscale(' + grayVal + '%) brightness(' + brightVal + ')';
                }
            }

            if (progress >= 1.0) {
                isCinematicFlight = false;
                if (renderer && renderer.domElement) {
                    renderer.domElement.style.filter = 'none';
                }
                if (typeof flightOnComplete === 'function') {
                    const cb = flightOnComplete;
                    flightOnComplete = null;
                    cb();
                }
            }
        } else {
            if (controls) controls.update();
        }

        if (renderer && scene && camera) renderer.render(scene, camera);
    }

    // Window exportok
    window.switchMode = switchMode;
    window.executeCurrentMode = executeCurrentMode;
    window.focusOnScreen = focusOnScreen;
    window.resetCamera = resetCamera;
    window.toggleInfoModal = toggleInfoModal;
    window.toggle3DInfoMode = toggle3DInfoMode;
    window.onModalBackdropClick = onModalBackdropClick;
    window.handleLangSwitch = handleLangSwitch;
    window.initThreeTerminal = initThree;
    window.setTerminalStatus = setTerminalStatus;
    window.blurVirtualInput = blurVirtualInput;
    window.focusVirtualInput = focusVirtualInput;
    window.startHyperspaceCinematic = startHyperspaceCinematic;
    window.reset3DTerminalState = reset3DTerminalState;
    // Inicializálás elindítása a modulon belül
    initThree();
}
window.runAuthTerminal3DModule = runAuthTerminal3DModule;
