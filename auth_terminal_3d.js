import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- GLOBÁLIS KONSTANSOK & ÁLLAPOTOK ---
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbxbliKmT_PpEi8VXztxWIAoNfaJHEaeKAjZl5gwwLkRLsY1x4PdeejtjTTEwLGDx4p_/exec";
const SPHERE_RADIUS = 30;

let currentMode = 'LOGIN'; // 'LOGIN' | 'REGISTER' | 'DEREGISTER' | 'INFO'
let previousMode = 'LOGIN';
let activeFieldIndex = 0;

// Mezők aktuális szöveges értékei (Kétirányú szinkron a 3D monitor és a modal között)
export const formValues = {
    LOGIN: { username: '', password: '' },
    REGISTER: { email: '', username: '' },
    DEREGISTER: { username: '', email: '', reason: '' }
};

let cursorVisible = true;
let lastCursorBlink = 0;
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
const localizedLabels = {
    hu: {
        title: 'eBookPirates // NEURÁLIS TERMINÁL v4.2',
        loginTab: 'BELÉPÉS',
        regTab: 'REGISZTRÁCIÓ',
        delTab: 'LELÉPÉS',
        infoTab: 'INFÓ ℹ️',
        userLabel: '1. KALÓZNÉV (Kattints a gépeléshez):',
        passLabel: '2. JELSZÓ (Kattints a gépeléshez):',
        emailLabel: '1. KALÓZ E-MAIL CÍM:',
        newNickLabel: '2. VÁLASZTOTT KALÓZNÉV:',
        delNickLabel: '1. KALÓZNÉV:',
        delEmailLabel: '2. REGISZTRÁLT E-MAIL:',
        delReasonLabel: '3. KILÉPÉS OKA:',
        loginBtn: '🚀 BESZÁLLÁS A KIKÖTŐBE [ENTER]',
        regBtn: '⚓ JELENTKEZÉS A BANDÁBA [ENTER]',
        delBtn: '☠️ LELÉPTETÉSI KÉRELEM KÜLDÉSE [ENTER]',
        readyStatus: 'RENDSZER KÉSZ // KATTINTS A KIJELZŐRE',
        guideTitle: 'eBookPirates // HASZNÁLATI ÚTMUTATÓ',
        guideLine1: '1. 3D GÉPELÉS: Kattints a monitorra a gépeléshez!',
        guideLine2: '2. MEZŐVÁLTÁS: [TAB] billentyűvel válthatsz mezőt.',
        guideLine3: '3. BEKÜLDÉS: Nyomj [ENTER]-t vagy kattints a Küldés gombra.',
        guideLine4: '4. KAMERA: Bal egérgomb forgat, görgő nagyít.',
        guideLine5: '5. INFÓ GOMB: A 3D gomb megnyomásával bármikor visszahívható.',
        guideCloseBtn: '✖ VISSZA A TERMINÁLHOZ [ENTER]'
    },
    en: {
        title: 'eBookPirates // NEURAL TERMINAL v4.2',
        loginTab: 'LOGIN',
        regTab: 'REGISTER',
        delTab: 'DISCHARGE',
        infoTab: 'INFO ℹ️',
        userLabel: '1. PIRATE CALLSIGN (Click to type):',
        passLabel: '2. SECURITY KEY (Click to type):',
        emailLabel: '1. PIRATE EMAIL ADDRESS:',
        newNickLabel: '2. CHOSEN PIRATE CALLSIGN:',
        delNickLabel: '1. PIRATE CALLSIGN:',
        delEmailLabel: '2. REGISTERED EMAIL:',
        delReasonLabel: '3. DISCHARGE REASON:',
        loginBtn: '🚀 BOARD THE HARBOR [ENTER]',
        regBtn: '⚓ JOIN THE CREW [ENTER]',
        delBtn: '☠️ SUBMIT DISCHARGE REQUEST [ENTER]',
        readyStatus: 'SYSTEM READY // CLICK SCREEN TO TYPE',
        guideTitle: 'eBookPirates // USER MANUAL',
        guideLine1: '1. 3D TYPING: Click on screen to type on keyboard!',
        guideLine2: '2. SWITCH FIELD: Press [TAB] to navigate fields.',
        guideLine3: '3. SUBMIT: Press [ENTER] or click the action button.',
        guideLine4: '4. CAMERA: Left mouse orbits, scroll wheel zooms.',
        guideLine5: '5. INFO BUTTON: Press the 3D button anytime to reopen.',
        guideCloseBtn: '✖ RETURN TO TERMINAL [ENTER]'
    },
    de: {
        title: 'eBookPirates // NEURALES TERMINAL v4.2',
        loginTab: 'LOGIN',
        regTab: 'REGISTRIEREN',
        delTab: 'ABMELDEN',
        infoTab: 'INFO ℹ️',
        userLabel: '1. PIRATENNAME (Klicken zum Tippen):',
        passLabel: '2. PASSWORT (Klicken zum Tippen):',
        emailLabel: '1. PIRATEN E-MAIL:',
        newNickLabel: '2. PIRATENNAME:',
        delNickLabel: '1. PIRATENNAME:',
        delEmailLabel: '2. E-MAIL-ADRESSE:',
        delReasonLabel: '3. GRUND DES AUSTRITTS:',
        loginBtn: '🚀 INS HAFENBECKEN EINSTEIGEN [ENTER]',
        regBtn: '⚓ DER CREW BEITRETEN [ENTER]',
        delBtn: '☠️ ABMELDUNG EINREICHEN [ENTER]',
        readyStatus: 'SYSTEM BEREIT // AUF BILDSCHIRM TIPPEN',
        guideTitle: 'eBookPirates // BEDIENUNGSANLEITUNG',
        guideLine1: '1. 3D-TIPPEN: Klicke auf den Bildschirm zum Tippen!',
        guideLine2: '2. FELDWECHSEL: Mit [TAB] zwischen Feldern springen.',
        guideLine3: '3. ABSENDEN: [ENTER] drücken oder Button klicken.',
        guideLine4: '4. KAMERA: Linksklick dreht, Mausrad zoomt heran.',
        guideLine5: '5. INFO-TASTE: Jederzeit über 3D-Taste aufrufbar.',
        guideCloseBtn: '✖ ZURÜCK ZUM TERMINAL [ENTER]'
    },
    fr: {
        title: 'eBookPirates // TERMINAL NEURAL v4.2',
        loginTab: 'CONNEXION',
        regTab: 'INSCRIPTION',
        delTab: 'DEPART',
        infoTab: 'INFO ℹ️',
        userLabel: '1. NOM DE PIRATE (Cliquez pour taper):',
        passLabel: '2. MOT DE PASSE (Cliquez pour taper):',
        emailLabel: '1. EMAIL DU PIRATE:',
        newNickLabel: '2. NOM DE PIRATE CHOISI:',
        delNickLabel: '1. NOM DE PIRATE:',
        delEmailLabel: '2. EMAIL ENREGISTRE:',
        delReasonLabel: '3. RAISON DU DEPART:',
        loginBtn: '🚀 EMBARQUER DANS LE PORT [ENTER]',
        regBtn: '⚓ REJOINDRE L\'EQUIPAGE [ENTER]',
        delBtn: '☠️ ENVOYER LA DEMANDE DE SORTIE [ENTER]',
        readyStatus: 'SYSTEME PRET // CLIQUEZ POUR SAISIR',
        guideTitle: 'eBookPirates // GUIDE D\'UTILISATION',
        guideLine1: '1. SAISIE 3D : Cliquez sur l\'écran pour taper !',
        guideLine2: '2. CHANGER DE CHAMP : Utilisez [TAB] pour naviguer.',
        guideLine3: '3. ENVOYER : Appuyez sur [ENTER] ou cliquez le bouton.',
        guideLine4: '4. CAMÉRA : Clic gauche pivote, molette zoome.',
        guideLine5: '5. BOUTON INFO : Disponible à tout moment sur le boîtier.',
        guideCloseBtn: '✖ RETOUR AU TERMINAL [ENTER]'
    },
    es: {
        title: 'eBookPirates // TERMINAL NEURONAL v4.2',
        loginTab: 'ENTRAR',
        regTab: 'REGISTRO',
        delTab: 'BAJA',
        infoTab: 'INFO ℹ️',
        userLabel: '1. NOMBRE PIRATA (Clic para escribir):',
        passLabel: '2. CLAVE SECRETA (Clic para escribir):',
        emailLabel: '1. CORREO DEL PIRATA:',
        newNickLabel: '2. NOMBRE PIRATA ELEGIDO:',
        delNickLabel: '1. NOMBRE PIRATA:',
        delEmailLabel: '2. CORREO REGISTRADO:',
        delReasonLabel: '3. MOTIVO DE SALIDA:',
        loginBtn: '🚀 SUBIR A BORDO [ENTER]',
        regBtn: '⚓ UNIRSE A LA TRIPULACION [ENTER]',
        delBtn: '☠️ ENVIAR SOLICITUD DE BAJA [ENTER]',
        readyStatus: 'SISTEMA LISTO // CLIC EN PANTALLA',
        guideTitle: 'eBookPirates // GUÍA DE USO',
        guideLine1: '1. ESCRITURA 3D: ¡Haz clic en pantalla para escribir!',
        guideLine2: '2. CAMBIAR CAMPO: Presiona [TAB] para alternar.',
        guideLine3: '3. ENVIAR: Pulsa [ENTER] o haz clic en el botón.',
        guideLine4: '4. CÁMARA: Clic izquierdo gira, rueda hace zoom.',
        guideLine5: '5. BOTÓN INFO: Actívalo desde el botón del dispositivo.',
        guideCloseBtn: '✖ VOLVER AL TERMINAL [ENTER]'
    },
    pl: {
        title: 'eBookPirates // TERMINAL NEURONOWY v4.2',
        loginTab: 'LOGOWANIE',
        regTab: 'REJESTRACJA',
        delTab: 'WYPISANIE',
        infoTab: 'INFO ℹ️',
        userLabel: '1. IMIE PIRATA (Kliknij aby pisac):',
        passLabel: '2. HASLO (Kliknij aby pisac):',
        emailLabel: '1. ADRES EMAIL PIRATA:',
        newNickLabel: '2. WYBRANE IMIE PIRATA:',
        delNickLabel: '1. IMIE PIRATA:',
        delEmailLabel: '2. ZAREJESTROWANY EMAIL:',
        delReasonLabel: '3. POWOD REZYGNACJI:',
        loginBtn: '🚀 WEJDZ DO PORTU [ENTER]',
        regBtn: '⚓ DOLACZ DO ZALOGI [ENTER]',
        delBtn: '☠️ WYSLIJ PROSBE O WYPISANIE [ENTER]',
        readyStatus: 'SYSTEM GOTOWY // KLIKNIJ EKRAN',
        guideTitle: 'eBookPirates // INSTRUKCJA OBSŁUGI',
        guideLine1: '1. PISANIE 3D: Kliknij ekran, aby pisać na klawiaturze!',
        guideLine2: '2. ZMIANA POLA: Naciśnij [TAB], aby przełączać pola.',
        guideLine3: '3. WYSYŁANIE: Naciśnij [ENTER] lub kliknij przycisk.',
        guideLine4: '4. KAMERA: Lewy przycisk obraca, kółko przybliża.',
        guideLine5: '5. PRZYCISK INFO: Dostępny w każdej chwili na obudowie.',
        guideCloseBtn: '✖ POWRÓT DO TERMINALA [ENTER]'
    },
    ru: {
        title: 'eBookPirates // НЕЙРОТЕРМИНАЛ v4.2',
        loginTab: 'ВХОД',
        regTab: 'РЕГИСТРАЦИЯ',
        delTab: 'ВЫХОД',
        infoTab: 'ИНФО ℹ️',
        userLabel: '1. ИМЯ ПИРАТА (Клик для ввода):',
        passLabel: '2. ПАРОЛЬ (Клик для ввода):',
        emailLabel: '1. ЭЛ. ПОЧТА ПИРАТА:',
        newNickLabel: '2. ВЫБРАННОЕ ИМЯ ПИРАТА:',
        delNickLabel: '1. ИМЯ ПИРАТА:',
        delEmailLabel: '2. ЗАРЕГИСТРИРОВАННАЯ ПОЧТА:',
        delReasonLabel: '3. ПРИЧИНA ВЫХОДА:',
        loginBtn: '🚀 ВОЙТИ В ПОРТ [ENTER]',
        regBtn: '⚓ ВСТУПИТЬ В КОМАНДУ [ENTER]',
        delBtn: '☠️ ПОДАТЬ ЗАЯВКУ НА ВЫХОД [ENTER]',
        readyStatus: 'СИСТЕМА ГОТОВА // НАЖМИТЕ НА ЭКРАН',
        guideTitle: 'eBookPirates // РУКОВОДСТВО ПОЛЬЗОВАТЕЛЯ',
        guideLine1: '1. 3D-ВВОД: Нажмите на экран для ввода с клавиатуры!',
        guideLine2: '2. СМЕНА ПОЛЯ: Нажмите [TAB] для перехода между полями.',
        guideLine3: '3. ОТПРАВКА: Нажмите [ENTER] или кнопку действия.',
        guideLine4: '4. КАМЕРА: ЛКМ вращает обзор, колесико приближает.',
        guideLine5: '5. КНОПКА ИНФО: Доступна на корпусе устройства.',
        guideCloseBtn: '✖ ВЕРНУТЬСЯ К ТЕРМИНАЛУ [ENTER]'
    }
};

function getL() {
    const lang = (window.currentLang && localizedLabels[window.currentLang]) 
        ? window.currentLang 
        : ((typeof currentLang !== 'undefined' && localizedLabels[currentLang]) 
            ? currentLang 
            : ((typeof localStorage !== 'undefined' && localStorage.getItem('siteLang') && localizedLabels[localStorage.getItem('siteLang')]) 
                ? localStorage.getItem('siteLang') 
                : 'hu'));
    return localizedLabels[lang] || localizedLabels.hu;
}

// --- JELSZÓ LÁTHATÓSÁG VÁLTÓ ---
export function togglePasswordVisibility() {
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

    terminalStatusText = isPasswordVisible ? "PASSWORD VISIBLE // JELSZÓ MEGJELENÍTVE" : "PASSWORD MASKED // JELSZÓ ELREJTVE";
    isStatusError = false;
    updateScreenDisplay();
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
export function initThree() {
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
    context.fillStyle = isVisible ? 'rgba(255, 221, 0, 0.22)' : 'rgba(0, 255, 204, 0.12)';
    context.fillRect(cx - 24, cy - 16, 48, 32);
    context.strokeStyle = isVisible ? '#ffdd00' : '#00ffcc';
    context.lineWidth = 1.5;
    context.strokeRect(cx - 24, cy - 16, 48, 32);

    context.strokeStyle = isVisible ? '#ffdd00' : '#00ffcc';
    context.fillStyle = isVisible ? '#ffdd00' : '#00ffcc';
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(cx - 14, cy);
    context.quadraticCurveTo(cx, cy - 9, cx + 14, cy);
    context.quadraticCurveTo(cx, cy + 9, cx - 14, cy);
    context.stroke();

    context.beginPath();
    context.arc(cx, cy, 3.5, 0, Math.PI * 2);
    context.fill();

    if (isVisible) {
        context.strokeStyle = '#ffdd00';
        context.lineWidth = 2.2;
        context.beginPath();
        context.moveTo(cx - 14, cy - 10);
        context.lineTo(cx + 14, cy + 10);
        context.stroke();
    }
    context.restore();
}

// Képernyő újra-rajzolása többnyelvű feliratokkal
export function updateScreenDisplay() {
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

    // 3. Fejléc és Mód Tabok a 3D kijelzőn
    ctx.fillStyle = '#00ffcc';
    ctx.font = 'bold 24px "Share Tech Mono", monospace';
    ctx.fillText(currentMode === 'INFO' ? (L.guideTitle || 'eBookPirates // HASZNÁLATI ÚTMUTATÓ') : L.title, 45, 65);

    drawTerminalTab(ctx, 620, 36, 115, 34, L.loginTab, currentMode === 'LOGIN');
    drawTerminalTab(ctx, 745, 36, 125, 34, L.regTab, currentMode === 'REGISTER');
    drawTerminalTab(ctx, 880, 36, 95, 34, L.delTab, currentMode === 'DEREGISTER');

    ctx.strokeStyle = '#00ffcc';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(45, 82);
    ctx.lineTo(w - 45, 82);
    ctx.stroke();

    // 4. Mezők és Tartalom kirajzolása mód szerint
    const cursorChar = cursorVisible ? '█' : ' ';

    if (currentMode === 'LOGIN') {
        const u = formValues.LOGIN.username;
        const p = isPasswordVisible ? formValues.LOGIN.password : '•'.repeat(formValues.LOGIN.password.length);

        drawField(ctx, 45, 145, L.userLabel, u, activeFieldIndex === 0, cursorChar);
        drawField(ctx, 45, 250, L.passLabel, p, activeFieldIndex === 1, cursorChar);
        drawEyeIconOnCanvas(ctx, 940, 278, isPasswordVisible);

        drawActionButton(ctx, 45, 360, w - 90, 52, L.loginBtn);

    } else if (currentMode === 'REGISTER') {
        const em = formValues.REGISTER.email;
        const un = formValues.REGISTER.username;

        drawField(ctx, 45, 145, L.emailLabel, em, activeFieldIndex === 0, cursorChar);
        drawField(ctx, 45, 250, L.newNickLabel, un, activeFieldIndex === 1, cursorChar);

        drawActionButton(ctx, 45, 360, w - 90, 52, L.regBtn);

    } else if (currentMode === 'DEREGISTER') {
        const un = formValues.DEREGISTER.username;
        const em = formValues.DEREGISTER.email;
        const rz = formValues.DEREGISTER.reason;

        drawField(ctx, 45, 125, L.delNickLabel, un, activeFieldIndex === 0, cursorChar, 36);
        drawField(ctx, 45, 205, L.delEmailLabel, em, activeFieldIndex === 1, cursorChar, 36);
        drawField(ctx, 45, 285, L.delReasonLabel, rz, activeFieldIndex === 2, cursorChar, 36);

        drawActionButton(ctx, 45, 365, w - 90, 48, L.delBtn, true);

    } else if (currentMode === 'INFO') {
        ctx.fillStyle = 'rgba(0, 30, 45, 0.75)';
        ctx.fillRect(45, 110, w - 90, 235);
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(45, 110, w - 90, 235);

        ctx.fillStyle = '#00ffcc';
        ctx.font = 'bold 16px "Share Tech Mono", monospace';
        ctx.fillText('> ' + (L.guideLine1 || '1. 3D GÉPELÉS: Kattints a monitorra a gépeléshez!'), 65, 148);
        ctx.fillText('> ' + (L.guideLine2 || '2. MEZŐVÁLTÁS: [TAB] billentyűvel válthatsz mezőt.'), 65, 190);
        ctx.fillText('> ' + (L.guideLine3 || '3. BEKÜLDÉS: Nyomj [ENTER]-t vagy kattints a Küldés gombra.'), 65, 232);
        ctx.fillText('> ' + (L.guideLine4 || '4. KAMERA: Bal egérgomb forgat, görgő nagyít.'), 65, 274);
        ctx.fillText('> ' + (L.guideLine5 || '5. INFÓ GOMB: A 3D gomb megnyomásával bármikor visszahívható.'), 65, 316);

        drawActionButton(ctx, 45, 360, w - 90, 52, L.guideCloseBtn || '✖ VISSZA A TERMINÁLHOZ [ENTER]', false);
    }

    // 5. Alsó Rendszer Státuszsor
    ctx.fillStyle = isStatusError ? 'rgba(50, 10, 10, 0.95)' : 'rgba(0, 20, 30, 0.9)';
    ctx.fillRect(45, h - 75, w - 90, 42);
    ctx.strokeStyle = isStatusError ? '#ff4444' : 'rgba(0, 255, 204, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, h - 75, w - 90, 42);

    ctx.fillStyle = isStatusError ? '#ff6666' : '#00ffcc';
    ctx.font = 'bold 18px "Share Tech Mono", monospace';
    ctx.fillText('> ' + terminalStatusText, 60, h - 48);

    if (screenTexture) screenTexture.needsUpdate = true;
}

function drawTerminalTab(context, x, y, w, h, text, isActive) {
    context.fillStyle = isActive ? 'rgba(0, 255, 204, 0.3)' : 'rgba(0, 255, 204, 0.05)';
    context.fillRect(x, y, w, h);
    context.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.3)';
    context.lineWidth = isActive ? 2 : 1;
    context.strokeRect(x, y, w, h);

    context.fillStyle = isActive ? '#ffffff' : '#88c0b0';
    context.font = 'bold 12px "Share Tech Mono", monospace';
    context.textAlign = 'center';
    context.fillText(text, x + w / 2, y + 21);
    context.textAlign = 'left';
}

function drawField(context, x, y, label, value, isActive, cursor, boxHeight = 44) {
    context.fillStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.6)';
    context.font = '16px "Share Tech Mono", monospace';
    context.fillText(label, x, y);

    context.fillStyle = isActive ? 'rgba(0, 50, 60, 0.85)' : 'rgba(0, 30, 40, 0.5)';
    context.fillRect(x, y + 6, 934, boxHeight);
    context.strokeStyle = isActive ? '#00ffcc' : 'rgba(0, 255, 204, 0.25)';
    context.lineWidth = isActive ? 2.5 : 1;
    context.strokeRect(x, y + 6, 934, boxHeight);

    context.fillStyle = '#ffffff';
    context.font = 'bold 22px "Share Tech Mono", monospace';
    const displayText = (value || '') + (isActive ? cursor : '');
    context.fillText(displayText, x + 14, y + 6 + (boxHeight * 0.68));
}

function drawActionButton(context, x, y, w, h, text, isDanger = false) {
    context.fillStyle = isDanger ? '#661111' : '#004d40';
    context.fillRect(x, y, w, h);
    context.strokeStyle = isDanger ? '#ff4444' : '#00ffcc';
    context.lineWidth = 2;
    context.strokeRect(x, y, w, h);

    context.fillStyle = '#ffffff';
    context.font = 'bold 20px "Share Tech Mono", monospace';
    context.textAlign = 'center';
    context.fillText(text, x + w / 2, y + h / 2 + 7);
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
    } catch(e) {
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
    [[-1,-1], [1,-1], [-1,1], [1,1]].forEach(([sx, sy]) => {
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
    } catch(e) {
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
    } catch(e) {
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
                terminalStatusText = "CAMERA FOCUSED // SCREEN RETICLE LOCKED";
                isStatusError = false;
                updateScreenDisplay();
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
                    terminalStatusText = "SWITCHED TO FIELD " + (activeFieldIndex + 1);
                    isStatusError = false;
                    focusVirtualInput();
                    updateScreenDisplay();
                } else {
                    blurVirtualInput();
                    executeCurrentMode();
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                const maxFields = (currentMode === 'DEREGISTER') ? 3 : 2;
                activeFieldIndex = (activeFieldIndex + 1) % maxFields;
                terminalStatusText = "SWITCHED TO FIELD " + (activeFieldIndex + 1);
                isStatusError = false;
                focusVirtualInput();
                updateScreenDisplay();
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
                try { renderer.domElement.focus(); } catch(e) {}
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

export function syncModalInputsFrom3D() {
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

    // Felső tabok kattintása
    if (pxY >= 20 && pxY <= 75) {
        blurVirtualInput();
        if (pxX >= 620 && pxX < 745) {
            switchMode('LOGIN');
            return;
        } else if (pxX >= 745 && pxX < 875) {
            switchMode('REGISTER');
            return;
        } else if (pxX >= 875) {
            switchMode('DEREGISTER');
            return;
        }
    }

    // Info mód bezáró gomb
    if (currentMode === 'INFO') {
        if (pxY >= 355 && pxY <= 425 && pxX >= 45 && pxX <= 979) {
            blurVirtualInput();
            switchMode(previousMode || 'LOGIN');
            return;
        }
    }

    // Mezők és Szem-ikon kiválasztása
    if (currentMode === 'LOGIN') {
        if (pxY >= 230 && pxY <= 330 && pxX >= 860 && pxX <= 990) {
            togglePasswordVisibility();
            return;
        }

        if (pxY >= 100 && pxY <= 230) {
            activeFieldIndex = 0;
            terminalStatusText = "FIELD 1 SELECTED // TYPE ON KEYBOARD";
            isStatusError = false;
            focusVirtualInput(clickX, clickY);
        } else if (pxY > 230 && pxY <= 340) {
            activeFieldIndex = 1;
            terminalStatusText = "FIELD 2 SELECTED // TYPE ON KEYBOARD";
            isStatusError = false;
            focusVirtualInput(clickX, clickY);
        } else if (pxY >= 355 && pxY <= 440) {
            blurVirtualInput();
            executeCurrentMode();
        } else {
            focusVirtualInput(clickX, clickY);
        }
    } else if (currentMode === 'REGISTER') {
        if (pxY >= 100 && pxY <= 230) {
            activeFieldIndex = 0;
            terminalStatusText = "FIELD 1 SELECTED // TYPE ON KEYBOARD";
            isStatusError = false;
            focusVirtualInput(clickX, clickY);
        } else if (pxY > 230 && pxY <= 340) {
            activeFieldIndex = 1;
            terminalStatusText = "FIELD 2 SELECTED // TYPE ON KEYBOARD";
            isStatusError = false;
            focusVirtualInput(clickX, clickY);
        } else if (pxY >= 355 && pxY <= 440) {
            blurVirtualInput();
            executeCurrentMode();
        } else {
            focusVirtualInput(clickX, clickY);
        }
    } else if (currentMode === 'DEREGISTER') {
        if (pxY >= 100 && pxY <= 190) {
            activeFieldIndex = 0;
            focusVirtualInput(clickX, clickY);
        } else if (pxY > 190 && pxY <= 270) {
            activeFieldIndex = 1;
            focusVirtualInput(clickX, clickY);
        } else if (pxY > 270 && pxY <= 350) {
            activeFieldIndex = 2;
            focusVirtualInput(clickX, clickY);
        } else if (pxY >= 355 && pxY <= 440) {
            blurVirtualInput();
            executeCurrentMode();
        } else {
            focusVirtualInput(clickX, clickY);
        }
    }

    updateScreenDisplay();
}

export function blurVirtualInput() {
    if (!virtualInput) return;
    try {
        virtualInput.blur();
    } catch(e) {}
    cursorVisible = false;
    updateScreenDisplay();
    if (renderer && renderer.domElement) {
        try {
            renderer.domElement.focus();
        } catch(e) {}
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
        } catch(e) {
            try { virtualInput.focus(); } catch(err) {}
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
        terminalStatusText = "SWITCHED TO FIELD " + (activeFieldIndex + 1);
        isStatusError = false;
        focusVirtualInput();
        updateScreenDisplay();
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
        terminalStatusText = "EDITING // " + targetFieldKey.toUpperCase();
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
export function switchMode(mode) {
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
        terminalStatusText = "LOGIN MODE // READY FOR CREDENTIALS";
    } else if (mode === 'REGISTER') {
        const b = document.getElementById('modal-tab-register');
        if (b) b.classList.add('active');
        const f = document.getElementById('modal-form-register');
        if (f) f.style.display = 'block';
        terminalStatusText = "REGISTRATION // ENTER PIRATE DOSSIER";
    } else if (mode === 'DEREGISTER') {
        const b = document.getElementById('modal-tab-deregister');
        if (b) b.classList.add('active');
        const f = document.getElementById('modal-form-deregister');
        if (f) f.style.display = 'block';
        terminalStatusText = "DISCHARGE // CONFIRM REMOVAL";
    } else if (mode === 'INFO') {
        terminalStatusText = "INFO MODE // USER MANUAL DISPLAYED";
    }

    syncModalInputsFrom3D();
    updateScreenDisplay();
}

export function toggle3DInfoMode() {
    if (currentMode === 'INFO') {
        switchMode(previousMode || 'LOGIN');
    } else {
        previousMode = currentMode;
        switchMode('INFO');
    }
}

export function executeCurrentMode() {
    if (currentMode === 'LOGIN') executeLogin();
    else if (currentMode === 'REGISTER') executeRegister();
    else if (currentMode === 'DEREGISTER') executeDeregister();
}

// --- NYELVVÁLTÁS KEZELŐ (web_fordito.js szinkron) ---
export function handleLangSwitch(lang) {
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
export function focusOnScreen() {
    if (!controls) return;
    camera.position.set(0, 0.25, 2.2);
    controls.target.set(0, 0.15, 0);
    controls.update();
}

export function resetCamera() {
    if (!controls) return;
    camera.position.set(0, 0.35, 2.6);
    controls.target.set(0, 0.15, 0);
    controls.update();
}

// --- INFÓ MODAL KEZELŐ ---
export function toggleInfoModal() {
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

export function onModalBackdropClick(e) {
    if (e.target.id === 'info-modal') {
        toggleInfoModal();
    }
}

// --- BACKEND MŰVELETEK ---
export function setTerminalStatus(text, isError = false) {
    terminalStatusText = text;
    isStatusError = isError;
    updateScreenDisplay();
}

export function executeLogin() {
    const u = formValues.LOGIN.username.trim();
    const p = formValues.LOGIN.password.trim();

    if (!u || !p) {
        setTerminalStatus("HIBA: Add meg a kalózneved és a jelszót!", true);
        return;
    }

    setTerminalStatus("HITELESÍTÉS FOLYAMATBAN... KÉRJÜK VÁRJ...");

    fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'performLogin', data: [{ name: u, jelszo: p }] })
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.success) {
            const user = data.user || {};
            const startPage = user.startPage || (user.tutorialCompleted ? 'kikoto_oldal' : 'tutorial_oldal');
            const isTutorial = (startPage.indexOf('tutorial') !== -1);
            const statusMsg = isTutorial 
                ? "SIKERES BELÉPÉS // JOGOSULTSÁG: ÚJONC // IRÁNY A TUTORIAL TRÉNING..." 
                : "SIKERES BELÉPÉS // JOGOSULTSÁG ÉRVÉNYESÍTVE // IRÁNY A KIKÖTŐ...";

            setTerminalStatus(statusMsg);

            try {
                localStorage.setItem('ebookPiratesToken', data.token);
                localStorage.setItem('ebook_pirates_username', user.name || u);
                if (user.email) localStorage.setItem('ebook_pirates_user_email', user.email);
                sessionStorage.setItem('ebook_is_logged_in', 'true');
                sessionStorage.setItem('ebookPiratesLoginName', user.name || u);
                sessionStorage.setItem('ebookPiratesLoginPass', p);
            } catch(e) {}

            try {
                const targetHtml = (startPage.indexOf('.html') === -1) ? (startPage + '.html') : startPage;
                fetch(targetHtml).catch(() => {});
            } catch(e) {}

            // ⚡ MEMÓRIABELI BELÉPTETÉS HARD RELOAD NÉLKÜL!
            setTimeout(() => {
                const auth3d = document.getElementById('auth-3d-container');
                if (auth3d) auth3d.style.display = 'none';

                if (typeof window.initializeApp === 'function') {
                    window.initializeApp(user);
                } else if (typeof initializeApp === 'function') {
                    initializeApp(user);
                }
            }, 300);
        } else {
            const msg = (data && data.message) ? data.message : "Érvénytelen kalóznév vagy jelszó!";
            setTerminalStatus("ELUTASÍTVA // " + msg.toUpperCase(), true);
        }
    })
    .catch(err => {
        setTerminalStatus("HÁLÓZATI HIBA: " + err.message, true);
    });
}

export function executeRegister() {
    const em = formValues.REGISTER.email.trim();
    const un = formValues.REGISTER.username.trim();

    if (!em || !un) {
        setTerminalStatus("HIBA: E-mail és Kalóznév megadása kötelező!", true);
        return;
    }

    setTerminalStatus("REGISZTRÁCIÓ KÜLDÉSE A KÖNYVTÁRNÓL...");

    fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'submitRegistrationRequest', data: [{ email: em, name: un }] })
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.success) {
            setTerminalStatus("SIKERES REGISZTRÁCIÓ! ÜDV A BANDÁBAN!");
        } else {
            setTerminalStatus("HIBA: " + (data.message || "Sikertelen regisztráció!"), true);
        }
    })
    .catch(err => {
        setTerminalStatus("HÁLÓZATI HIBA: " + err.message, true);
    });
}

export function executeDeregister() {
    const un = formValues.DEREGISTER.username.trim();
    const em = formValues.DEREGISTER.email.trim();
    const rz = formValues.DEREGISTER.reason.trim();

    if (!un || !em || !rz) {
        setTerminalStatus("HIBA: Minden mező kitöltése kötelező!", true);
        return;
    }

    setTerminalStatus("LELÉPTETÉSI KÉRELEM FELDOLGOZÁSA...");

    fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'submitDeletionRequest', data: [{ name: un, email: em, reason: rz }] })
    })
    .then(res => res.json())
    .then(data => {
        if (data && data.success) {
            setTerminalStatus("KÉRELEM RÖGZÍTVE. VISSZAVÁRUNK, KALÓZ!");
        } else {
            setTerminalStatus("HIBA: " + (data.message || "Sikertelen leléptetés!"), true);
        }
    })
    .catch(err => {
        setTerminalStatus("HÁLÓZATI HIBA: " + err.message, true);
    });
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

    if (cosmosSphere) {
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

    if (controls) controls.update();
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

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initThree);
} else {
    initThree();
}
