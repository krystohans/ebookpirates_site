window.onerror = function (message, source, lineno, colno, error) {
  const errDiv = document.createElement('div');
  errDiv.style.position = 'absolute'; errDiv.style.top = '10px'; errDiv.style.left = '10px';
  errDiv.style.zIndex = '999999'; errDiv.style.background = 'red'; errDiv.style.color = 'white';
  errDiv.style.padding = '20px'; errDiv.style.fontSize = '20px';
  errDiv.innerHTML = `<h1>JS ERROR</h1><p>${message}</p><p>Line: ${lineno}:${colno}</p><p>${error ? error.stack : ''}</p>`;
  document.body.appendChild(errDiv);
};

import * as THREE from 'three';
window.THREE = THREE;
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Water } from 'three/addons/objects/Water.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const GCS_ASSET_BASE = 'https://storage.googleapis.com/kalozsziget-assets/tutorial/';
window.getAssetUrl = function (path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const clean = path.replace(/^\.?\//, '');
  return GCS_ASSET_BASE + clean;
};

window.zozoWelcomeTexts = [];
window.gameMonologues = {};
window.gamePopups = {};
window.eogMonologues = {};

async function loadDialogues() {
  try {
    const res = await fetch('dialogues.json?t=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      window.zozoWelcomeTexts = data.welcomeTexts || [];
      window.gameMonologues = data.gameMonologues || {};
      window.gamePopups = data.popups || {};
      window.eogMonologues = data.eogMonologues || {};
    }
  } catch (e) {
    console.error('Hiba a dialogues.json betöltésekor:', e);
  }
}
loadDialogues();

window.getLoggedInUserData = function () {
  const token = localStorage.getItem('ebookPiratesToken') || sessionStorage.getItem('ebookPiratesToken');

  // Ha NINCS aktív token -> szigorúan NEM belépett!
  if (!token || token.trim() === '') {
    try {
      localStorage.removeItem('ebook_pirates_username');
      localStorage.removeItem('ebook_pirates_user_email');
      sessionStorage.removeItem('ebookPiratesLoginName');
      sessionStorage.removeItem('ebook_is_logged_in');
    } catch (e) { }
    return { isLoggedIn: false, name: '', email: '' };
  }

  // Ha VAN érvényes token:
  let userName = localStorage.getItem('ebook_pirates_username') || sessionStorage.getItem('ebookPiratesLoginName');
  let userEmail = localStorage.getItem('ebook_pirates_user_email') || '';

  // Ha iframe-ben fut, a szülő ablakból is megerősíthetjük
  if (!userName && window.parent && window.parent !== window) {
    try {
      if (window.parent.currentUserEmail) userEmail = window.parent.currentUserEmail;
      const pTitle = window.parent.document.querySelector('.header-title');
      if (pTitle && pTitle.innerText && pTitle.innerText !== 'Anonymous' && pTitle.innerText !== 'Anonymus') {
        userName = pTitle.innerText.trim();
      }
    } catch (e) { }
  }

  if (!userName && userEmail) {
    userName = userEmail.split('@')[0];
  }

  return {
    isLoggedIn: true,
    name: userName || 'Kalóz',
    email: userEmail || ''
  };
};

window.checkStartupAuth = function () {
  const user = window.getLoggedInUserData();
  if (!user.isLoggedIn) {
    console.warn("🔒 Nem regisztrált látogató: Tutorial indítás letiltva.");
    const guestOverlay = document.getElementById('guest-auth-required-overlay');
    if (guestOverlay) {
      guestOverlay.style.display = 'flex';

      const btnLogin = document.getElementById('btn-guest-login');
      if (btnLogin) {
        btnLogin.onclick = function () {
          window.location.href = 'LoginMenu.html';
        };
      }
      const btnReg = document.getElementById('btn-guest-register');
      if (btnReg) {
        btnReg.onclick = function () {
          window.open('https://krystohans.github.io/ebookpirates_site/GitHubSite/regisztracio/', '_blank');
        };
      }
      const btnExit = document.getElementById('btn-guest-exit');
      if (btnExit) {
        btnExit.onclick = function () {
          window.location.href = 'https://krystohans.github.io/ebookpirates_site/';
        };
      }
    }
    window.isCutscenePlaying = true; // Játékvezérlés zárolása
  }
};

async function loadTopBarModule() {
  try {
    const res = await fetch('topbar.html?t=' + Date.now());
    if (res.ok) {
      const html = await res.text();
      const container = document.getElementById('topbar-container');
      if (container) {
        container.innerHTML = html;
        setupTopBarEvents();

        // Kalóznév azonnali kiírása a belépési tokenből!
        const user = window.getLoggedInUserData();
        const tbPlayerName = document.getElementById('tb-player-name');
        if (tbPlayerName) {
          tbPlayerName.innerText = user.isLoggedIn ? user.name : 'Anonymus';
        }
      }
    }
  } catch (e) {
    console.error('Hiba a TopBar betöltésekor:', e);
  }
}

// Induláskori jogosultság ellenőrzés
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.checkStartupAuth);
} else {
  window.checkStartupAuth();
}

function setupTopBarEvents() {
  const btnInfo = document.getElementById('btn-tb-info');
  const infoOverlay = document.getElementById('info-scroll-overlay');
  const btnCloseInfo = document.getElementById('btn-close-info-scroll');

  if (btnInfo && infoOverlay) {
    btnInfo.addEventListener('click', () => { infoOverlay.style.display = 'flex'; });
  }
  if (btnCloseInfo && infoOverlay) {
    btnCloseInfo.addEventListener('click', () => { infoOverlay.style.display = 'none'; });
  }

  const btnSettings = document.getElementById('btn-tb-settings');
  const dropdownSettings = document.getElementById('settings-dropdown');
  if (btnSettings && dropdownSettings) {
    btnSettings.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = dropdownSettings.style.display === 'flex';
      dropdownSettings.style.display = isVisible ? 'none' : 'flex';
    });
    document.addEventListener('click', (e) => {
      if (!dropdownSettings.contains(e.target) && e.target !== btnSettings) {
        dropdownSettings.style.display = 'none';
      }
    });
  }

  const btnLanguage = document.getElementById('btn-tb-language');
  const langOverlay = document.getElementById('language-map-overlay');
  const btnCloseLangMap = document.getElementById('btn-close-language-map');

  if (btnLanguage && langOverlay) {
    btnLanguage.addEventListener('click', () => {
      langOverlay.style.display = 'flex';
      if (dropdownSettings) dropdownSettings.style.display = 'none';
    });
  }
  if (btnCloseLangMap && langOverlay) {
    btnCloseLangMap.addEventListener('click', () => {
      langOverlay.style.display = 'none';
    });
  }

  document.querySelectorAll('.lang-item-btn, .lang-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      window.currentLanguage = selectedLang;
      console.log('🌐 Kiválasztott nyelv:', selectedLang);
      if (dropdownSettings) dropdownSettings.style.display = 'none';
      const langOverlay = document.getElementById('language-map-overlay');
      if (langOverlay) langOverlay.style.display = 'none';
    });
  });

  const btnFullscreen = document.getElementById('btn-tb-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        localStorage.setItem('ebook_pirates_fullscreen', 'true');
        document.documentElement.requestFullscreen().catch(err => console.log(err));
      } else {
        localStorage.setItem('ebook_pirates_fullscreen', 'false');
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(err => console.log(err));
        }
      }
    });
  }

  const btnMusic = document.getElementById('btn-tb-music');
  const btnSound = document.getElementById('btn-tb-sound');

  if (btnMusic) {
    // Kezdeti ikon beállítása a localStorage-ből betöltött állapot alapján
    btnMusic.src = window.isMusicMuted ? window.getAssetUrl('assets/images/music_mute-r.png') : window.getAssetUrl('assets/images/music-r.png');
    btnMusic.addEventListener('click', () => {
      window.isMusicMuted = !window.isMusicMuted;
      if (window.bgMusicAudio) {
        window.bgMusicAudio.muted = window.isMusicMuted;
      }
      btnMusic.src = window.isMusicMuted ? window.getAssetUrl('assets/images/music_mute-r.png') : window.getAssetUrl('assets/images/music-r.png');
    });
  }

  if (btnSound) {
    // Kezdeti ikon beállítása a localStorage-ből betöltött állapot alapján
    btnSound.src = window.isSoundMuted ? window.getAssetUrl('assets/images/sound_mute-r.png') : window.getAssetUrl('assets/images/sound-r.png');
    btnSound.addEventListener('click', () => {
      window.isSoundMuted = !window.isSoundMuted;
      if (window.ambSoundAudio) {
        window.ambSoundAudio.muted = window.isSoundMuted;
      }
      btnSound.src = window.isSoundMuted ? window.getAssetUrl('assets/images/sound_mute-r.png') : window.getAssetUrl('assets/images/sound-r.png');
    });
  }

  const tooltipEl = document.getElementById('topbar-custom-tooltip');
  const tooltipTextEl = document.getElementById('topbar-custom-tooltip-text');

  if (tooltipEl && tooltipTextEl) {
    const tooltipTargets = document.querySelectorAll('#topbar [title], #topbar [data-custom-tooltip], #settings-dropdown [title], #settings-dropdown [data-custom-tooltip]');
    tooltipTargets.forEach(el => {
      let text = el.getAttribute('title') || el.getAttribute('data-custom-tooltip');
      if (!text) return;
      el.setAttribute('data-custom-tooltip', text);
      el.removeAttribute('title');

      el.addEventListener('mouseenter', (e) => {
        const currentText = el.getAttribute('data-custom-tooltip') || el.getAttribute('title');
        tooltipTextEl.innerText = currentText;
        tooltipEl.style.display = 'flex';
        positionTooltip(e);
      });
      el.addEventListener('mousemove', positionTooltip);
      el.addEventListener('mouseleave', () => {
        tooltipEl.style.display = 'none';
      });
    });

    function positionTooltip(e) {
      const rect = e.target.getBoundingClientRect();
      const ttWidth = tooltipEl.offsetWidth || 100;
      const ttHeight = tooltipEl.offsetHeight || 30;

      const isInsideDropdown = e.target.closest('#settings-dropdown') !== null;

      if (isInsideDropdown) {
        const leftPos = rect.left - ttWidth - 12;
        const topPos = rect.top + (rect.height / 2) - (ttHeight / 2);
        tooltipEl.style.left = `${leftPos}px`;
        tooltipEl.style.top = `${topPos}px`;
      } else {
        const leftPos = rect.left + (rect.width / 2) - (ttWidth / 2);
        const topPos = rect.bottom + 12;
        tooltipEl.style.left = `${leftPos}px`;
        tooltipEl.style.top = `${topPos}px`;
      }
    }
  }
}

// Hangerő szorzók betöltése a localStorage-ből (SettingsMenu)
window.musicVolMult = 1.0;
window.soundVolMult = 1.0;
const storedMusic = localStorage.getItem('ebook_pirates_music_vol');
const storedSound = localStorage.getItem('ebook_pirates_sound_vol');
if (storedMusic !== null) window.musicVolMult = parseInt(storedMusic) / 100.0;
if (storedSound !== null) window.soundVolMult = parseInt(storedSound) / 100.0;

// Ha a csúszka 0-ra volt húzva, alapból némítsunk mindent
window.isMusicMuted = window.musicVolMult === 0;
window.isSoundMuted = window.soundVolMult === 0;

window.bgMusicAudio = new Audio(window.getAssetUrl('assets/sounds/Tutorial_music.mp3'));
window.bgMusicAudio.loop = true;
window.bgMusicAudio.volume = 0.5 * window.musicVolMult;
window.bgMusicAudio.muted = window.isMusicMuted;

window.ambSoundAudio = new Audio(window.getAssetUrl('assets/sounds/waves-and-seagulls.wav'));
window.ambSoundAudio.loop = true;
window.ambSoundAudio.volume = 0.6 * window.soundVolMult;
window.ambSoundAudio.muted = window.isSoundMuted;

window.pickupSoundAudio = new Audio(window.getAssetUrl('assets/sounds/membrane_pickup.mp3'));
window.pickupSoundAudio.volume = 0.6 * window.soundVolMult;

window.windStartAudio = new Audio(window.getAssetUrl('assets/sounds/wind_start.mp3'));
window.windStartAudio.volume = window.soundVolMult;
window.crashRockAudio = new Audio(window.getAssetUrl('assets/sounds/crash_rock.mp3'));
window.crashRockAudio.volume = window.soundVolMult;
window.airshipAscentAudio = new Audio(window.getAssetUrl('assets/sounds/airship_ascent.mp3'));
window.airshipAscentAudio.volume = window.soundVolMult;
window.airshipAttackAudio = new Audio(window.getAssetUrl('assets/sounds/airship_attack.mp3'));
window.airshipAttackAudio.volume = window.soundVolMult;
window.homepointTouchAudio = new Audio(window.getAssetUrl('assets/sounds/homepoint_touch.mp3'));
window.homepointTouchAudio.volume = window.soundVolMult;
window.beachTouchAudio = new Audio(window.getAssetUrl('assets/sounds/beach_touch.mp3'));
window.beachTouchAudio.volume = window.soundVolMult;
window.outOfRangeAudio = new Audio(window.getAssetUrl('assets/sounds/out_of_range.mp3'));
window.outOfRangeAudio.volume = window.soundVolMult;
window.fanfareAudio = new Audio(window.getAssetUrl('assets/sounds/fanfare.mp3'));
window.fanfareAudio.volume = window.soundVolMult;

window.playSoundEffect = function (audioObj) {
  if (window.isSoundMuted || !audioObj) return;
  audioObj.currentTime = 0;
  audioObj.play().catch(e => console.log('Audio play blocked:', e));
};

window.playPickupSound = function () {
  if (window.isSoundMuted || !window.pickupSoundAudio) return;
  window.pickupSoundAudio.currentTime = 0;
  window.pickupSoundAudio.play().catch(e => console.log('Audio play blocked:', e));
};

function tryStartAllAudio() {
  if (!window.isMusicMuted && window.bgMusicAudio && window.bgMusicAudio.paused) {
    window.bgMusicAudio.play().catch(e => console.log('Music autoplay pending user click:', e));
  }
  if (!window.isSoundMuted && window.ambSoundAudio && window.ambSoundAudio.paused) {
    window.ambSoundAudio.play().catch(e => console.log('Ambience autoplay pending user click:', e));
  }
}

window.addEventListener('load', tryStartAllAudio);
window.addEventListener('click', tryStartAllAudio);

window.isWindActive = false;
window.currentWindAngle = 0;
window.currentWindBaseForce = 0.5;

window.changeWindForNextMembrane = function () {
  window.currentWindAngle = Math.random() * Math.PI * 2;
  window.currentWindBaseForce = 0.5 + Math.random() * 0.7;
  console.log('💨 Új szélirány kisorsolva a következő hártyáig:', Math.round(window.currentWindAngle * 180 / Math.PI) + '°', 'Erő:', window.currentWindBaseForce.toFixed(2));
};

loadTopBarModule();

const wrap = document.getElementById('game-wrapper');
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.localClippingEnabled = false;
renderer.setPixelRatio(1);
renderer.shadowMap.enabled = false;

function resize() {
  const w = wrap.clientWidth, h = wrap.clientHeight;
  renderer.setSize(w, h);
  cam.aspect = w / h; cam.updateProjectionMatrix();
}
addEventListener('resize', resize);

const scene = new THREE.Scene();
window.scene = scene;
scene.background = new THREE.Color(0x7ec8e8);
scene.fog = new THREE.FogExp2(0x7ec8e8, 0.0025);

const cam = new THREE.PerspectiveCamera(55, wrap.clientWidth / wrap.clientHeight, 0.5, 400);
window.cam = cam;
let orbH = 0.0, orbV = 15.0, orbDist = 26.00;
const ORB_MIN_V = 5.0, ORB_MAX_V = 90.0, ORB_MIN_D = 26.00, ORB_MAX_D = 26.00;

window.tempOrbit = new OrbitControls(cam, renderer.domElement);
window.tempOrbit.target.set(0, 0, 0);

window.getOrbH = () => orbH;
window.getOrbV = () => orbV;
window.getOrbDist = () => orbDist;
window.setOrb = (h, v, d) => { orbH = THREE.MathUtils.clamp(h, -45.0, 45.0); orbV = v; orbDist = d; };
const ORB_SENS_H = 0.25, ORB_SENS_V = 0.2;
const LOOK_OFFSET_Y = 2.5;

scene.add(new THREE.AmbientLight(0x8ab4d0, 0.55));
const sun = new THREE.DirectionalLight(0xfff4d6, 1.3);
sun.position.set(2200, 150, 1350);
sun.castShadow = false;
scene.add(sun);

const mountainLight = new THREE.DirectionalLight(0xffeedd, 0.6);
mountainLight.position.set(-900, 1500, 600);
scene.add(mountainLight);

window.cinematicLight = new THREE.DirectionalLight(0xffeedd, 0.6);
window.cinematicLight.visible = false;
scene.add(window.cinematicLight);
scene.add(new THREE.HemisphereLight(0x87ceeb, 0x305030, 0.35));

window.gameTimeProgress = 0.0;
const dockLanternLights = [];
const shantyLights = [];

window.updateEnvironmentLighting = function () {
  const p = Math.min(Math.max(window.gameTimeProgress, 0.0), 1.0);
  const angle = p * Math.PI;
  const sunX = Math.cos(angle) * 1800;
  const sunY = Math.sin(angle) * 1200 - 100;
  const sunZ = Math.sin(angle * 2) * 400 + (1 - p * 2) * 1200;

  sun.position.set(sunX, Math.max(sunY, -200), sunZ);

  let sunColor, skyColor, fogColor, intensity;

  if (p < 0.35) {
    const t = p / 0.35;
    sunColor = new THREE.Color(0xffe8b5).lerp(new THREE.Color(0xffffff), t);
    skyColor = new THREE.Color(0x7ec8e8).lerp(new THREE.Color(0x5cb8e4), t);
    fogColor = skyColor.clone();
    intensity = THREE.MathUtils.lerp(1.2, 1.5, t);
  } else if (p < 0.85) {
    const t = (p - 0.35) / 0.50;
    sunColor = new THREE.Color(0xffffff).lerp(new THREE.Color(0xff5500), t);
    skyColor = new THREE.Color(0x5cb8e4).lerp(new THREE.Color(0xe2583e), t);
    fogColor = new THREE.Color(0x5cb8e4).lerp(new THREE.Color(0xd35400), t);
    intensity = THREE.MathUtils.lerp(1.5, 0.8, t);
  } else {
    const t = (p - 0.85) / 0.15;
    sunColor = new THREE.Color(0xff5500).lerp(new THREE.Color(0x112244), t);
    skyColor = new THREE.Color(0xe2583e).lerp(new THREE.Color(0x050a12), t);
    fogColor = new THREE.Color(0xd35400).lerp(new THREE.Color(0x050a12), t);
    intensity = THREE.MathUtils.lerp(0.8, 0.1, t);
  }

  sun.color.copy(sunColor);
  sun.intensity = intensity;
  scene.background.copy(skyColor);
  scene.fog.color.copy(fogColor);

  const isNight = p >= 0.83;
  if (window.eogState === 'CINEMATIC' || window.eogState === 'VIDEO') {
    dockLanternLights.forEach(light => { light.intensity = 180.0; });
    if (window.lantern1Light) window.lantern1Light.intensity = 180.0;
    if (window.lantern2Light) window.lantern2Light.intensity = 180.0;

    if (window.smallLantern1Light) window.smallLantern1Light.intensity = 140.0;
    if (window.smallLantern2Light) window.smallLantern2Light.intensity = 140.0;
    if (window.mainRockLanternLight) {
      window.mainRockLanternLight.intensity = 3500.0;
      window.mainRockLanternLight.distance = 900.0;
      window.mainRockLanternLight.decay = 2.0;
    }

    shantyLights.forEach(light => {
      if (light.userData && (light.userData.name === 'sm_bld_shanty_preset_08' || light.userData.name === 'sm_bld_shanty_preset_24')) {
        light.intensity = 350.0;
        light.distance = 80.0;
      }
    });
  } else {
    dockLanternLights.forEach(light => { light.intensity = isNight ? 140.0 : 0.0; });
    shantyLights.forEach(light => {
      const base = light.userData && light.userData.baseIntensity !== undefined ? light.userData.baseIntensity : 90.0;
      light.intensity = isNight ? base : 0.0;
    });
    if (window.mainRockLanternLight) {
      // Sziklán lévő lámpás mint jelzőfény: NAPPAL IS FOLYAMATOSAN ÉG!
      window.mainRockLanternLight.intensity = isNight ? 6000.0 : 3500.0;
      window.mainRockLanternLight.distance = isNight ? 900.0 : 550.0;
      window.mainRockLanternLight.color.setHex(0xffaa22); // Meleg arany-sárga irányjelző fény
      window.mainRockLanternLight.decay = 2.0;
    }
  }
};
window.updateEnvironmentLighting();

let skyDome;
{
  const g = new THREE.SphereGeometry(950, 32, 16);
  const cols = [];
  const p = g.getAttribute('position');
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) / 950 + 1) * 0.5;
    cols.push(
      THREE.MathUtils.lerp(0.92, 0.35, t),
      THREE.MathUtils.lerp(0.78, 0.58, t),
      THREE.MathUtils.lerp(0.55, 0.88, t));
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  skyDome = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true }));
  scene.add(skyDome);
}

const waterGeo = new THREE.PlaneGeometry(2400, 2400);
const water = new Water(
  waterGeo,
  {
    textureWidth: 256,
    textureHeight: 256,
    waterNormals: new THREE.TextureLoader().load(window.getAssetUrl('models/waternormals.jpg'), function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }),
    sunDirection: sun.position.clone().normalize(),
    sunColor: 0xffffff,
    waterColor: 0x1476a6,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);
water.rotation.x = -Math.PI / 2;
scene.add(water);

{
  const m = new THREE.Mesh(new THREE.PlaneGeometry(2400, 2400), new THREE.MeshLambertMaterial({ color: 0x0e2a1e }));
  m.rotation.x = -Math.PI / 2; m.position.y = -18; scene.add(m);
}

const boat = new THREE.Group();
boat.position.set(5, 0, -94);
boat.rotation.y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180);
scene.add(boat);
window.boat = boat;
window.homeRotY = boat.rotation.y;

const laserGroup = new THREE.Group();
laserGroup.position.set(0, 0.1, 1.5);
laserGroup.visible = window.location.search.includes('debug=1');
boat.add(laserGroup);

const whiskers = [
  { id: 'FORWARD', angle: 0, dist: 5.5 },
  { id: 'FRONT_LEFT', angle: Math.PI / 4, dist: 4.2 },
  { id: 'FRONT_RIGHT', angle: -Math.PI / 4, dist: 4.2 },
  { id: 'SIDE_LEFT', angle: Math.PI / 2, dist: 1.0 },
  { id: 'SIDE_RIGHT', angle: -Math.PI / 2, dist: 1.0 },
  { id: 'BACK_LEFT', angle: 3 * Math.PI / 4, dist: 2.2 },
  { id: 'BACK_RIGHT', angle: -3 * Math.PI / 4, dist: 2.2 },
  { id: 'BACKWARD', angle: Math.PI, dist: 2.5 }
];

const laserLines = [];
const _laserUpAxis = new THREE.Vector3(0, 1, 0);

whiskers.forEach((w) => {
  const dir = new THREE.Vector3(0, 0, -1).applyAxisAngle(_laserUpAxis, w.angle);
  const endP = dir.clone().multiplyScalar(w.dist);
  const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), endP]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00ffcc, linewidth: 3, transparent: true, opacity: 0.85
  });
  const lineMesh = new THREE.Line(lineGeo, lineMat);
  laserGroup.add(lineMesh);
  laserLines.push({ mesh: lineMesh, mat: lineMat, w: w });
});

const TRACK_OFFSET_Y = 1.5;
let fullTrack = null;
const borderMeshes = [];

new GLTFLoader().load(window.getAssetUrl('models/FullTrack_Small.glb'), function (gltf) {
  fullTrack = gltf.scene;
  window.fullTrack = fullTrack;

  fullTrack.scale.set(1, 1, -1);
  fullTrack.position.y = TRACK_OFFSET_Y;

  scene.add(fullTrack);
  fullTrack.updateMatrixWorld(true);

  let homePos = new THREE.Vector3(5, 0, -94);
  window.homePos = homePos;
  let foundZeppelin = null;
  const dockCenter = new THREE.Vector3(255, -3, -225);

  fullTrack.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = false; child.receiveShadow = false;
      child.frustumCulled = true; child.visible = true;
      if (child.material) {
        child.material.transparent = false;
        child.material.alphaTest = 0.5;
        child.material.side = THREE.DoubleSide;

        const isBlack = child.material.color && child.material.color.r < 0.1 && child.material.color.g < 0.1 && child.material.color.b < 0.1;
        if (isBlack || (child.name && child.name.toLowerCase().includes("airship"))) {
          child.material.color.setHex(0xd4af37);
          if (isBlack) child.visible = false;
        }
      }
    }

    const name = child.name ? child.name.toLowerCase() : "";
    const wPos = new THREE.Vector3();
    child.getWorldPosition(wPos);

    if (Math.abs(wPos.x - (-3)) < 15 && Math.abs(wPos.z - (-94)) < 15) {
      if (name.includes('tree') || name.includes('palm') || name.includes('plant') || name.includes('foliage') || name.includes('bush')) {
        child.visible = false;
      }
    }

    if (Math.abs(wPos.x - 14.5) < 6.0 && Math.abs(wPos.z - (-75.3)) < 6.0) {
      child.position.x += 11.5;
      child.position.z += 15.3;
      child.updateMatrix();
    }

    if (name.startsWith("sm_bld_") || name.includes("dock") || name.includes("house") || name.includes("shanty") || name.includes("pier") || name.includes("molo") || name.includes("preset")) {
      child.scale.multiplyScalar(1.8);
      if (child.position.x > 200 && child.position.z < -100) {
        child.position.sub(dockCenter).multiplyScalar(1.8).add(dockCenter);
      }
      child.updateMatrix();

      if (name.includes("shanty") || name.includes("house") || name.startsWith("sm_bld_")) {
        const shantyLightConfig = [
          { name: "sm_bld_shanty_preset_08", posX: 16.58, posY: 7.60, posZ: -127.19, distance: 35, intensity: 90 },
          { name: "sm_bld_shanty_preset_24", posX: -576.45, posY: 5.71, posZ: 1319.10, distance: 35, intensity: 90 }
        ];

        const cfg = shantyLightConfig.find(c => c.name === name);
        if (cfg) {
          const houseLight = new THREE.PointLight(0xff9933, 0, cfg.distance);
          houseLight.position.set(cfg.posX, cfg.posY, cfg.posZ);
          houseLight.userData = { originalPos: houseLight.position.clone(), name: name, baseIntensity: cfg.intensity };
          scene.add(houseLight);
          shantyLights.push(houseLight);
          if (!window.shantyLights) window.shantyLights = shantyLights;
        }
      }
    }

    if (!foundZeppelin && name.includes("airship")) {
      foundZeppelin = child;
    }

    let isWall = false;
    let isRock = false;
    let isBeach = false;
    let curr = child;
    while (curr) {
      const cName = (curr.name || "").toLowerCase();
      if (cName.includes("invisibewall") || cName.includes("border") || cName.includes("limit")) {
        isWall = true;
      }
      if (cName.includes("rock") || cName.includes("stone") || cName.includes("cliff") || cName.includes("reef")) {
        isRock = true;
      }
      if (cName.includes("beach") || cName.includes("part") || cName.includes("sand") || cName.includes("shore") || cName.includes("coast") || cName.includes("island") || cName.includes("terrain") || cName.includes("ground") || cName.includes("land") || cName.includes("hill") || cName.includes("dune") || cName.includes("grass") || cName.includes("dirt") || cName.includes("mud") || cName.includes("path")) {
        isBeach = true;
      }
      curr = curr.parent;
    }

    if (child.isMesh) {
      child.userData = child.userData || {};
      const ownName = (child.name || "").toLowerCase();
      const ownIsDock = ownName.includes("dock") || ownName.includes("pier") || ownName.includes("molo") || ownName.includes("móló") || ownName.includes("homepoint") || ownName.includes("shanty") || ownName.startsWith("sm_bld_");
      const ownIsBeach = ownName.includes("beach") || ownName.includes("part") || ownName.includes("sand") || ownName.includes("shore") || ownName.includes("coast") || ownName.includes("island") || ownName.includes("terrain") || ownName.includes("ground") || ownName.includes("land") || ownName.includes("hill") || ownName.includes("dune") || ownName.includes("grass") || ownName.includes("dirt") || ownName.includes("mud") || ownName.includes("path");
      const ownIsRock = ownName.includes("rock") || ownName.includes("stone") || ownName.includes("cliff") || ownName.includes("reef");

      if (ownIsDock) {
        // Móló / Dokk / Kikötő épületek: MINDIG homepoint (Bázis), nem part és nem szikla!
        child.userData.obstacleType = 'homepoint';
        borderMeshes.push(child);
      } else if (ownIsBeach) {
        // Ha a mesh saját neve part, homok, partvonal: MINDIG beach (partrafutás)
        child.userData.obstacleType = 'beach';
        borderMeshes.push(child);
      } else if (ownIsRock) {
        // Ha a mesh saját neve szikla, kő, zátony: MINDIG rock (zátonyra futás, crash)
        child.userData.obstacleType = 'rock';
        borderMeshes.push(child);
      } else if (isBeach) {
        child.userData.obstacleType = 'beach';
        borderMeshes.push(child);
      } else if (isRock) {
        child.userData.obstacleType = 'rock';
        borderMeshes.push(child);
      } else if (isWall) {
        child.visible = false;
        child.userData.obstacleType = 'out_of_range';
        borderMeshes.push(child);
      } else {
        child.userData.obstacleType = 'beach';
        borderMeshes.push(child);
      }
    }
  });

  // Véglegesített és felhasználói egyedi part/szikla felülbírálások automatikus érvényesítése
  const PERMANENT_TERRAIN_OVERRIDES = {
    "SM_Env_Beach_107_(3)_2": "beach",
    "Beach_107": "beach",
    "SM_Env_Beach_107": "beach"
  };

  try {
    const localOverrides = JSON.parse(localStorage.getItem('ebp_custom_terrain_overrides') || '{}');
    const allOverrides = Object.assign({}, PERMANENT_TERRAIN_OVERRIDES, localOverrides);
    if (Object.keys(allOverrides).length > 0) {
      fullTrack.traverse((child) => {
        if (child.isMesh) {
          for (const key in allOverrides) {
            if (child.name === key || (key.length > 5 && child.name.includes(key))) {
              child.userData = child.userData || {};
              child.userData.obstacleType = allOverrides[key];
              if (!borderMeshes.includes(child)) borderMeshes.push(child);
              break;
            }
          }
        }
      });
    }
  } catch (e) {
    console.warn("Egyedi felülbírálások betöltési figyelmeztetés:", e);
  }

  // Keresünk két sziklát a lámpás környékén (18.5, 9.7, -60.0)
  let targetRock = null;
  let minDist = Infinity;
  let secondRock = null;
  let secondMinDist = Infinity;

  fullTrack.traverse((child) => {
    if (child.isMesh && (child.name.toLowerCase().includes('rock') || child.name.toLowerCase().includes('stone') || child.name.toLowerCase().includes('cliff'))) {
      const wp = new THREE.Vector3();
      child.getWorldPosition(wp);
      const dist = wp.distanceTo(new THREE.Vector3(18.5, 9.7, -60.0));

      if (dist < minDist && dist < 30.0) {
        secondMinDist = minDist;
        secondRock = targetRock;

        minDist = dist;
        targetRock = child;
      } else if (dist < secondMinDist && dist < 30.0) {
        secondMinDist = dist;
        secondRock = child;
      }
    }
  });
  window.mainTargetRock = targetRock;
  window.secondTargetRock = secondRock;

  if (window.secondTargetRock) {
    window.secondTargetRockOrigWorldPos = new THREE.Vector3();
    window.secondTargetRock.getWorldPosition(window.secondTargetRockOrigWorldPos);
  }

  if (window.applyFinalRockOffsets) {
    window.applyFinalRockOffsets();
  }

  // Pálya széli piros falak építése (20m magas)
  const wallMat = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });

  const buildSegment = (x1, z1, x2, z2) => {
    const p1 = new THREE.Vector2(x1, z1);
    const p2 = new THREE.Vector2(x2, z2);
    const dist = p1.distanceTo(p2);
    const wallGeo = new THREE.BoxGeometry(1.0, 20.0, dist);
    const wallMesh = new THREE.Mesh(wallGeo, wallMat);

    const centerX = (p1.x + p2.x) / 2;
    const centerZ = (p1.y + p2.y) / 2;
    wallMesh.position.set(centerX, 10.0, centerZ);

    const angle = Math.atan2(p2.x - p1.x, p2.y - p1.y);
    wallMesh.rotation.y = angle;

    wallMesh.userData = { obstacleType: 'out_of_range' };
    wallMesh.visible = false;
    scene.add(wallMesh);
    borderMeshes.push(wallMesh);
  };

  buildSegment(-180.6, 1356.4, -482.0, 1290.0);
  buildSegment(-482.0, 1290.0, -707.8, 1199.1);

  // --- 7 DB MÓLÓ ÉS SHANTY COLLIDER BOX (LÁTHATATLAN HOMEPOINT) ---
  const collidersData = [
    { id: 0, name: 'Collider 1', posX: -17.0, posY: 2.0, posZ: -120.0, sizeX: 19.5, sizeY: 4.0, sizeZ: 9.0, rotY: -42 },
    { id: 1, name: 'Collider 2', posX: 18.5, posY: 2.0, posZ: -131.0, sizeX: 25.5, sizeY: 4.0, sizeZ: 13.5, rotY: 48 },
    { id: 2, name: 'Collider 3', posX: -6.5, posY: 2.0, posZ: -122.0, sizeX: 7.5, sizeY: 4.0, sizeZ: 14.5, rotY: 35 },
    { id: 3, name: 'Collider 4', posX: -2.5, posY: 2.0, posZ: -120.0, sizeX: 9.5, sizeY: 4.0, sizeZ: 20.5, rotY: 125 },
    { id: 4, name: 'Collider 5', posX: 9.5, posY: 2.0, posZ: -98.5, sizeX: 7.5, sizeY: 4.0, sizeZ: 10.0, rotY: 45 },
    { id: 5, name: 'Collider 6', posX: -0.5, posY: 2.0, posZ: -106.0, sizeX: 16.0, sizeY: 4.0, sizeZ: 3.3, rotY: -44 },
    { id: 6, name: 'Collider 7', posX: 9.0, posY: 2.0, posZ: -118.5, sizeX: 5.5, sizeY: 4.0, sizeZ: 13.5, rotY: 118 }
  ];

  window.mangroveColliders = [];

  collidersData.forEach(data => {
    const geo = new THREE.BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.0,
      side: THREE.DoubleSide,
      wireframe: false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(data.posX, data.posY, data.posZ);
    mesh.rotation.y = data.rotY * (Math.PI / 180);
    mesh.userData = { obstacleType: 'homepoint', id: data.id, config: data };
    mesh.visible = false;

    scene.add(mesh);
    borderMeshes.push(mesh);
    window.mangroveColliders.push(mesh);
  });

  if (foundZeppelin && homePos) {
    scene.add(foundZeppelin);
    foundZeppelin.position.set(-461, -3, 1350);
    const initDir = new THREE.Vector3().subVectors(homePos, foundZeppelin.position).normalize();
    foundZeppelin.rotation.set(0, Math.atan2(initDir.x, initDir.z) - Math.PI, 0);
    foundZeppelin.scale.set(1, 1, 1);
    foundZeppelin.visible = true;

    foundZeppelin.traverse(c => {
      c.visible = true;
      const searchName = (c.name || '').toLowerCase();
      if (searchName.includes('ladder') || searchName.includes('letra') || searchName.includes('létra') || searchName.includes('stair') || searchName.includes('rope')) {
        if (!window.foundZeppelinLadder) window.foundZeppelinLadder = c;
      }
      if (c.isMesh) {
        let newColor = 0x7a4325;
        let newMetal = 0.05;
        let newRough = 0.85;

        if (searchName.includes('balloon') || searchName.includes('envelope') || searchName.includes('sphere') || searchName.includes('ballon') || searchName.includes('rez') || searchName.includes('réz')) {
          newColor = 0xffe0b2;
          newMetal = 0.5;
          newRough = 0.4;
        } else if (searchName.includes('hood')) {
          newColor = 0xc89d6e;
          newMetal = 0.1;
          newRough = 0.9;
        } else if (searchName.includes('rope') || searchName.includes('string') || searchName.includes('line') || searchName.includes('kötél') || searchName.includes('kotel') || searchName.includes('cable')) {
          newColor = 0xeaeaea;
          newMetal = 0.0;
          newRough = 0.9;
        } else if (searchName.includes('captain') || searchName.includes('mast')) {
          newColor = 0x5c2e16;
          newMetal = 0.05;
          newRough = 0.85;
        } else if (searchName.includes('canvas') || searchName.includes('sail') || searchName.includes('cloth') || searchName.includes('fabric') || searchName.includes('ponyva') || searchName.includes('vászon') || searchName.includes('wing')) {
          newColor = 0xe8d5a7;
          newMetal = 0.0;
          newRough = 0.9;
        }

        c.material = new THREE.MeshStandardMaterial({
          color: newColor,
          metalness: newMetal,
          roughness: newRough,
          side: THREE.DoubleSide
        });
      }
    });

    window.foundZeppelin = foundZeppelin;
  }

  const isLoadMode = window.location.search.includes('load=1');

  if (homePos) {
    const savedDataRaw = localStorage.getItem('saved_boat_transform');
    if (isLoadMode && savedDataRaw) {
      try {
        const sd = JSON.parse(savedDataRaw);
        const bx = (typeof sd.x === 'number') ? sd.x : ((typeof sd.posX === 'number') ? sd.posX : homePos.x);
        const by = (typeof sd.y === 'number') ? sd.y : ((typeof sd.posY === 'number') ? sd.posY : homePos.y);
        const bz = (typeof sd.z === 'number') ? sd.z : ((typeof sd.posZ === 'number') ? sd.posZ : homePos.z);
        boat.position.set(bx, by, bz);
        if (typeof sd.rotY === 'number') boat.rotation.y = sd.rotY;
        if (sd.orbH !== undefined && !isNaN(sd.orbH)) orbH = THREE.MathUtils.clamp(sd.orbH, -45.0, 45.0);
        if (sd.orbV !== undefined && !isNaN(sd.orbV)) orbV = sd.orbV;
        if (sd.orbDist !== undefined && !isNaN(sd.orbDist)) orbDist = sd.orbDist;
      } catch (e) {
        applyDefaultBoatPos(homePos);
      }
    } else {
      // Új Játék esetén mindig pontosan a móló melletti kezdőpozícióból indul
      applyDefaultBoatPos(homePos);
    }
  }

  setTimeout(() => {
    renderer.render(scene, cam);
    const overlay = document.getElementById('zozo-welcome-overlay');

    if (overlay) {
      if (isLoadMode) {
        overlay.style.display = 'none';
        window.isCutscenePlaying = false;
      } else {
        overlay.style.display = 'flex';
        window.isCutscenePlaying = true;
        window.selectZozoTextStep(0);
      }
    }
  }, 400);

  function applyDefaultBoatPos(hPos) {
    boat.position.set(5, 0, -94);
    boat.rotation.y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180);
  }
});

const gltfLoader = new GLTFLoader();

gltfLoader.load(window.getAssetUrl('models/pirates_assets/SM_Prop_Lantern_01.glb'), (gltf) => {
  const smallLantern1 = gltf.scene.clone();
  smallLantern1.position.set(14.5, 1.8, -97.4);
  smallLantern1.rotation.y = -16 * (Math.PI / 180);
  smallLantern1.scale.set(200, 200, 200);
  scene.add(smallLantern1);
  const smallLantern1Light = new THREE.PointLight(0xffaa33, 0, 100);
  smallLantern1Light.position.copy(smallLantern1.position);
  smallLantern1Light.position.y += 0.5;
  scene.add(smallLantern1Light);
  dockLanternLights.push(smallLantern1Light);
  window.smallLantern1Light = smallLantern1Light;

  const smallLantern2 = gltf.scene.clone();
  smallLantern2.position.set(8.4, 1.7, -103.9);
  smallLantern2.rotation.y = 0;
  smallLantern2.scale.set(200, 200, 200);
  scene.add(smallLantern2);
  const smallLantern2Light = new THREE.PointLight(0xffaa33, 0, 100);
  smallLantern2Light.position.copy(smallLantern2.position);
  smallLantern2Light.position.y += 0.5;
  scene.add(smallLantern2Light);
  dockLanternLights.push(smallLantern2Light);
  window.smallLantern2Light = smallLantern2Light;

  const mainRockLantern = gltf.scene.clone();
  mainRockLantern.position.set(18.5, 9.7, -60.0);
  mainRockLantern.scale.set(400, 400, 400);
  if (window.fullTrack) {
    window.fullTrack.add(mainRockLantern);
  } else {
    scene.add(mainRockLantern);
  }

  const mainRockLanternLight = new THREE.PointLight(0xffaa33, 3500.0, 500.0, 2.0);
  mainRockLanternLight.position.set(18.5, 11.9, -60.0);
  scene.add(mainRockLanternLight);
  window.mainRockLanternLight = mainRockLanternLight;
  window.mainRockLantern = mainRockLantern;

  window.moveRockAndLantern = function (newX, newZ) {
    const dx = newX - 18.5;
    const dz = newZ - (-60.0);

    if (window.mainRockLantern) {
      window.mainRockLantern.position.x = 18.5 + dx;
      window.mainRockLantern.position.z = -60.0 + dz;
    }
    if (window.mainRockLanternLight) {
      window.mainRockLanternLight.position.x = 18.5 + dx;
      window.mainRockLanternLight.position.z = -60.0 + dz;
    }

    if (window.mainTargetRock) {
      if (!window.mainTargetRock.userData.origWorldPos) {
        window.mainTargetRock.userData.origWorldPos = new THREE.Vector3();
        window.mainTargetRock.getWorldPosition(window.mainTargetRock.userData.origWorldPos);
      }
      const desiredWorldPos = window.mainTargetRock.userData.origWorldPos.clone();
      desiredWorldPos.x += dx;
      desiredWorldPos.z += dz;

      const parent = window.mainTargetRock.parent;
      if (parent) {
        window.mainTargetRock.position.copy(parent.worldToLocal(desiredWorldPos));
      }
    }
  };

  window.moveSecondRock = function (newX, newZ) {
    if (window.secondTargetRock && window.secondTargetRockOrigWorldPos) {
      const desiredWorldPos = window.secondTargetRockOrigWorldPos.clone();
      desiredWorldPos.x = newX;
      desiredWorldPos.z = newZ;

      const parent = window.secondTargetRock.parent;
      if (parent) {
        window.secondTargetRock.position.copy(parent.worldToLocal(desiredWorldPos));
      }
    }
  };

  window.applyFinalRockOffsets = function () {
    if (window.moveRockAndLantern && window.mainTargetRock && window.mainRockLantern) {
      window.moveRockAndLantern(-10, -83.5);
    }
    if (window.moveSecondRock && window.secondTargetRock) {
      window.moveSecondRock(-12.5, -76.7);
    }
  };

  window.applyFinalRockOffsets();
});

gltfLoader.load(window.getAssetUrl('models/pirates_assets/SM_Prop_Lantern_Attachment_01.glb'), (gltf) => {
  const lantern1 = gltf.scene.clone();
  lantern1.position.set(-15.7, 8.3, -119.2);
  lantern1.rotation.y = 53 * (Math.PI / 180);
  lantern1.scale.set(100, 100, 100);
  scene.add(lantern1);
  const lantern1Light = new THREE.PointLight(0xffaa33, 0, 100);
  lantern1Light.position.copy(lantern1.position);
  lantern1Light.position.y += 0.5;
  scene.add(lantern1Light);
  dockLanternLights.push(lantern1Light);
  window.lantern1Light = lantern1Light;

  const lantern2 = gltf.scene.clone();
  lantern2.position.set(14, 8.5, -125.5);
  lantern2.rotation.y = -Math.PI / 4;
  lantern2.scale.set(100, 100, 100);
  scene.add(lantern2);
  const lantern2Light = new THREE.PointLight(0xffaa33, 0, 100);
  lantern2Light.position.copy(lantern2.position);
  lantern2Light.position.y += 0.5;
  scene.add(lantern2Light);
  dockLanternLights.push(lantern2Light);
  window.lantern2Light = lantern2Light;
});

window.sailRig = null;

gltfLoader.load(window.getAssetUrl('models/boat.glb'), (gltf) => {
  const model = gltf.scene;
  model.scale.set(30, 30, 30);
  model.rotation.y = Math.PI;
  model.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  model.position.x = -center.x;
  model.position.z = -center.z;
  model.position.y = -box.min.y - (size.y * 0.02);

  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false; child.receiveShadow = false;
    }
  });

  boat.add(model);
  model.updateMatrixWorld(true);

  const targetIds = ['node_id6', 'node_id8', 'node_id10'];
  const sailParts = [];

  model.traverse((child) => {
    if (targetIds.includes(child.name)) {
      sailParts.push(child);
    }
  });

  if (sailParts.length > 0) {
    const sailRig = new THREE.Group();
    sailRig.name = 'SailRigGroup';

    const pivotPart = sailParts.find(p => p.name === 'node_id6') || sailParts[0];
    const pivotWorldPos = new THREE.Vector3();
    pivotPart.getWorldPosition(pivotWorldPos);

    model.worldToLocal(pivotWorldPos);
    sailRig.position.copy(pivotWorldPos);
    model.add(sailRig);

    sailParts.forEach((part) => {
      sailRig.attach(part);
    });

    window.sailRig = sailRig;
  }
});

const keys = {};
addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'KeyC' && e.ctrlKey && e.shiftKey) {
    window.recordingModeActive = !window.recordingModeActive;
    if (window.recordingModeActive) {
      window.recordingAngle = 0;
      document.querySelectorAll('body > *, #game-wrapper > *').forEach(el => {
        if (el.tagName !== 'CANVAS' && el.id !== 'game-wrapper' && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
          el.dataset.oldDisplay = el.style.display;
          el.style.display = 'none';
        }
      });
      removeEventListener('resize', resize);
      if (typeof renderer !== 'undefined') renderer.setSize(1280, 720, false);
      if (typeof cam !== 'undefined') { cam.aspect = 1280 / 720; cam.updateProjectionMatrix(); }
      const c = document.getElementById('c');
      if (c) {
        c.style.position = 'fixed'; c.style.top = '50%'; c.style.left = '50%';
        c.style.transform = 'translate(-50%, -50%)'; c.style.width = '1280px'; c.style.height = '720px';
        c.style.zIndex = '999999'; c.style.border = '2px solid black';
      }

      if (window.cinematicLight) {
        window.cinematicLight.color.setHex(0xffffff);
        window.cinematicLight.intensity = 0.8;
        window.cinematicLight.visible = true;
      }
      window.savedGameTimeProgress = window.gameTimeProgress;
      window.gameTimeProgress = 0.50;
      if (typeof window.updateEnvironmentLighting === 'function') window.updateEnvironmentLighting();

      if (typeof cam !== 'undefined' && typeof scene !== 'undefined') {
        cam.far = 400;
        cam.updateProjectionMatrix();
        window.savedOriginalFog = scene.fog;
        window.savedOriginalBg = scene.background;

        const mistColor = 0x8ab4d0;
        scene.background = new THREE.Color(mistColor);
        scene.fog = new THREE.FogExp2(mistColor, 0.003);
      }

      window.recordingStartTime = performance.now();

    } else {
      document.querySelectorAll('body > *, #game-wrapper > *').forEach(el => {
        if (el.tagName !== 'CANVAS' && el.id !== 'game-wrapper' && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
          el.style.display = el.dataset.oldDisplay || '';
        }
      });
      if (window.cinematicLight) window.cinematicLight.visible = false;
      if (window.savedGameTimeProgress !== undefined) {
        window.gameTimeProgress = window.savedGameTimeProgress;
        if (typeof window.updateEnvironmentLighting === 'function') window.updateEnvironmentLighting();
      }

      if (typeof cam !== 'undefined' && typeof scene !== 'undefined') {
        cam.far = 400;
        cam.updateProjectionMatrix();
        if (window.savedOriginalFog) scene.fog = window.savedOriginalFog;
        if (window.savedOriginalBg) scene.background = window.savedOriginalBg;
      }

      addEventListener('resize', resize);
      const c = document.getElementById('c');
      if (c) {
        c.style.position = ''; c.style.top = ''; c.style.left = '';
        c.style.transform = ''; c.style.width = '100%'; c.style.height = '100%';
        c.style.zIndex = ''; c.style.border = '';
      }
      if (typeof resize === 'function') resize();
    }
  }
});
addEventListener('keyup', e => { keys[e.code] = false; });

let mDown = false, mx = 0, my = 0;
canvas.addEventListener('mousedown', e => { mDown = true; mx = e.clientX; my = e.clientY; canvas.style.cursor = 'grabbing'; });
addEventListener('mouseup', () => { mDown = false; canvas.style.cursor = 'grab'; });
addEventListener('mousemove', e => {
  if (!mDown) return;
  orbH = THREE.MathUtils.clamp(orbH + (e.clientX - mx) * ORB_SENS_H, -45.0, 45.0);
  orbV = THREE.MathUtils.clamp(orbV + (e.clientY - my) * ORB_SENS_V, ORB_MIN_V, ORB_MAX_V);
  mx = e.clientX; my = e.clientY;
});
canvas.addEventListener('wheel', e => {
  e.preventDefault();
  const zoomDelta = e.deltaY * 0.025;
  orbDist = THREE.MathUtils.clamp(orbDist + zoomDelta, 10.0, 75.0);
}, { passive: false });
canvas.style.cursor = 'grab';

window.activeMembranes = [];
window.carriedMembranes = 0;
window.storedMembranes = 0;
window.totalSpawnedCount = 0;
window.totalPickedUp = 0;

window.isCutscenePlaying = false;
window.airshipAscentStarted = false;
window.airshipAscentDone = false;
window.airshipCutsceneStage = 'IDLE';
window.airshipChaseCooldown = 0;

window.eogState = 'NONE';
window.eogTriggerA = false;
window.eogTriggerB = false;
window.chestModel = null;
window.chestLidModel = null;
window.eogPierArrived = false;
window.eogChestAtPier = null;
window.eogLidAngle = 0;

const EoG_POINT_A = { x: -100, z: 550 };
const EoG_POINT_B = { x: -427, z: 1191 };
const EoG_POINT_C = { x: -384, z: 1233 };
const EoG_CHEST_TRIGGER_DIST = 10;

let hartyaTemplate = null;
window.membranePool = [];
const MEMBRANE_POOL_SIZE = 25;

function createMembraneMesh(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  if (hartyaTemplate) {
    const hartyaModel = hartyaTemplate.clone(true);
    hartyaModel.position.set(0, 0.5, 0);
    group.add(hartyaModel);
  } else {
    const coreGeo = new THREE.SphereGeometry(0.7, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffc800, transparent: true, opacity: 0.40, depthWrite: false });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.5;
    group.add(coreMesh);
  }

  const candleLight = new THREE.PointLight(0xffaa33, 3.5, 20);
  candleLight.position.set(0, 0.8, 0);
  group.add(candleLight);

  group.userData = {
    isMembrane: true,
    collected: true,
    inUse: false,
    baseY: y,
    light: candleLight
  };

  return group;
}

window.initMembranePool = function () {
  if (window.membranePool && window.membranePool.length >= MEMBRANE_POOL_SIZE) return;
  window.membranePool = window.membranePool || [];

  while (window.membranePool.length < MEMBRANE_POOL_SIZE) {
    const m = createMembraneMesh(0, -999, 0);
    m.visible = false;
    if (m.userData.light) m.userData.light.intensity = 0;
    scene.add(m);
    window.membranePool.push(m);
  }
};

function getPooledMembrane() {
  window.initMembranePool();
  for (let i = 0; i < window.membranePool.length; i++) {
    const m = window.membranePool[i];
    if (!m.userData.inUse) {
      return m;
    }
  }
  const newM = createMembraneMesh(0, -999, 0);
  newM.visible = false;
  scene.add(newM);
  window.membranePool.push(newM);
  return newM;
}

new GLTFLoader().load(window.getAssetUrl('models/hartya.glb'), function (gltf) {
  hartyaTemplate = gltf.scene;
  hartyaTemplate.scale.set(1.5, 1.5, 1.5);
  hartyaTemplate.traverse(c => {
    if (c.isMesh) {
      c.material = new THREE.MeshBasicMaterial({
        color: 0xffcc22,
        transparent: true,
        opacity: 0.40,
        depthWrite: false,
        side: THREE.DoubleSide
      });
    }
  });

  window.initMembranePool();

  if (typeof window.spawnZeroPointMembrane === 'function') {
    window.spawnZeroPointMembrane();
  }
});

// --- HÁRTYA SANITIZER ÉS BERAGADÁS-MEGSZÜNTETŐ RUTIN ---
window.sanitizeAndAutoRecoverMembranes = function() {
  if (typeof scene === 'undefined' || !scene) return;

  window.activeMembranes = window.activeMembranes || [];

  // 1. Érintéses beragadási ellenőrző (Touch Watchdog):
  if (typeof boat !== 'undefined' && boat && boat.position && window.activeMembranes.length > 0) {
    const bx = boat.position.x;
    const bz = boat.position.z;
    const _wPos = new THREE.Vector3();

    for (let i = window.activeMembranes.length - 1; i >= 0; i--) {
      const m = window.activeMembranes[i];
      if (!m) continue;
      m.getWorldPosition(_wPos);
      const distSq = (_wPos.x - bx) * (_wPos.x - bx) + (_wPos.z - bz) * (_wPos.z - bz);

      if (distSq < 16.0) {
        m.userData.touchStuckTime = (m.userData.touchStuckTime || 0) + 1;
        if (m.userData.touchStuckTime > 2) {
          console.warn("Beragadt/felvehetetlen hártya észlelve -> Vissza a poolba és újragenerálás!");
          m.userData.collected = true;
          m.userData.inUse = false;
          m.visible = false;
          if (m.userData.light) m.userData.light.intensity = 0;
          m.position.set(0, -999, 0);
          window.activeMembranes.splice(i, 1);

          if (typeof window.spawnHartyaWave === 'function' && window.storedMembranes < 30) {
            window.spawnHartyaWave(1, 'boat');
          }
        }
      } else {
        m.userData.touchStuckTime = 0;
      }
    }
  }
};

window.spawnZeroPointMembrane = function () {
  window.initMembranePool();

  if (window.activeMembranes) {
    window.activeMembranes.forEach(m => {
      m.visible = false;
      if (m.userData.light) m.userData.light.intensity = 0;
      m.userData.inUse = false;
      m.userData.collected = true;
      m.position.set(0, -999, 0);
    });
  }
  window.activeMembranes = [];

  const firstMembrane = getPooledMembrane();
  firstMembrane.position.set(0, 0.1, 0);
  firstMembrane.userData.baseY = 0.1;
  firstMembrane.userData.collected = false;
  firstMembrane.userData.inUse = true;
  firstMembrane.visible = true;
  if (firstMembrane.userData.light) firstMembrane.userData.light.intensity = 3.5;

  window.activeMembranes.push(firstMembrane);
  window.totalSpawnedCount = 1;
};

const WATER_BAY_POINTS = [
  { x: -15, z: 25 }, { x: 35, z: 45 }, { x: -45, z: 85 }, { x: 20, z: 110 },
  { x: -75, z: 140 }, { x: 10, z: 180 }, { x: -60, z: 220 }, { x: -110, z: 260 },
  { x: -30, z: 300 }, { x: -140, z: 340 }, { x: -80, z: 380 }, { x: -160, z: 420 },
  { x: -100, z: 460 }, { x: -190, z: 500 }, { x: -120, z: 540 }, { x: -220, z: 580 },
  { x: -150, z: 620 }, { x: -250, z: 660 }, { x: -170, z: 700 }, { x: -280, z: 740 },
  { x: -200, z: 780 }, { x: -310, z: 820 }, { x: -230, z: 860 }, { x: -330, z: 900 },
  { x: -260, z: 940 }, { x: -360, z: 980 }, { x: -280, z: 1020 }, { x: -380, z: 1060 },
  { x: -310, z: 1100 }, { x: -350, z: 1140 }, { x: 45, z: 70 }, { x: -25, z: 160 },
  { x: 5, z: 240 }, { x: -90, z: 190 }, { x: -50, z: 350 }, { x: -130, z: 290 },
  { x: -170, z: 480 }, { x: -210, z: 410 }, { x: -240, z: 610 }, { x: -180, z: 670 }
];

// --- HÁRTYA SPAWN LOGIKA (FOLYAMATOS, ZÉRÓ-KÉSLELTETÉSŰ POOL KEZELÉS) ---
window.spawnHartyaWave = function (count, originType) {
  window.initMembranePool();

  let spawned = 0;
  const availableIndices = [];
  for (let i = 0; i < WATER_BAY_POINTS.length; i++) availableIndices.push(i);

  // Véletlenszerű keverés a változatos pontokért
  for (let i = availableIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableIndices[i], availableIndices[j]] = [availableIndices[j], availableIndices[i]];
  }

  for (let i = 0; i < availableIndices.length && spawned < count; i++) {
    const pt = WATER_BAY_POINTS[availableIndices[i]];
    const jitterX = (Math.random() - 0.5) * 10.0;
    const jitterZ = (Math.random() - 0.5) * 10.0;
    const hx = pt.x + jitterX;
    const hz = pt.z + jitterZ;

    const mMesh = getPooledMembrane();
    mMesh.position.set(hx, 0.1, hz);
    mMesh.userData.baseY = 0.1;
    mMesh.userData.collected = false;
    mMesh.userData.inUse = true;
    mMesh.visible = true;
    if (mMesh.userData.light) mMesh.userData.light.intensity = 3.5;

    window.activeMembranes.push(mMesh);
    window.totalSpawnedCount++;
    spawned++;
  }
};

function createFoamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128; canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);

  const grad = ctx.createLinearGradient(64, 10, 64, 118);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.75)');
  grad.addColorStop(0.35, 'rgba(215, 242, 255, 0.45)');
  grad.addColorStop(0.75, 'rgba(175, 225, 255, 0.15)');
  grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(64, 10); ctx.lineTo(118, 118); ctx.lineTo(10, 118); ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

const boatWakes = [];
const foamTex = createFoamTexture();
const wakeGeo = new THREE.PlaneGeometry(2.1, 2.1);
const wakeMatBase = new THREE.MeshBasicMaterial({
  map: foamTex, color: 0xffffff, transparent: true, opacity: 0.72, depthWrite: false
});

const WAKE_POOL_SIZE = 400;
const wakeMaterialPool = [];
for (let i = 0; i < WAKE_POOL_SIZE; i++) {
  wakeMaterialPool.push(wakeMatBase.clone());
}
let wakeMatIndex = 0;
function getPooledWakeMaterial() {
  const mat = wakeMaterialPool[wakeMatIndex];
  wakeMatIndex = (wakeMatIndex + 1) % WAKE_POOL_SIZE;
  mat.opacity = 0.72;
  return mat;
}

const _prevPos = new THREE.Vector3();
const _fwd = new THREE.Vector3();
const _step = new THREE.Vector3();
const _center = new THREE.Vector3();
const _rayDir = new THREE.Vector3();
const _upAxis = new THREE.Vector3(0, 1, 0);
const _sharedRaycaster = new THREE.Raycaster();

window.monologState = {
  currentBlockQueue: [],
  currentBlockIndex: 0,
  hasSeen: {},
  airshipCaughtPlayer: false
};

let lastMonologAdvanceTime = 0;

window.closeZozoWelcome = function () {
  const overlay = document.getElementById('zozo-welcome-overlay');
  if (overlay) overlay.style.display = 'none';

  document.body.className = document.body.className.replace(/\bwelcome-mode\b|\bstep-\d+\b/g, '').trim();

  if (typeof window.spawnZeroPointMembrane === 'function') {
    window.spawnZeroPointMembrane();
  }

  setTimeout(() => {
    if (!window.monologState.hasSeen[1]) {
      window.showInGameMonolog([1, 'controls']);
    }
  }, 150);
};

window.showInGameMonolog = function (startIndex, endIndex, onComplete) {
  if (typeof window.dismissActivePopup === 'function') window.dismissActivePopup();

  window.monologState.onComplete = (typeof endIndex === 'function' ? endIndex : onComplete) || null;
  window.monologState.currentBlockQueue = [];

  if (Array.isArray(startIndex)) {
    window.monologState.currentBlockQueue = startIndex;
  } else if (typeof startIndex === 'string') {
    window.monologState.currentBlockQueue.push(startIndex);
  } else {
    for (let i = startIndex; i <= endIndex; i++) {
      window.monologState.currentBlockQueue.push(i);
    }
  }

  window.monologState.currentBlockIndex = 0;
  window.renderCurrentMonolog();
};

window.renderCurrentMonolog = function () {
  const container = document.getElementById('zozo-ingame-monolog-container');
  if (!container) return;

  if (window.monologState.currentBlockIndex < window.monologState.currentBlockQueue.length) {
    const monologIdx = window.monologState.currentBlockQueue[window.monologState.currentBlockIndex];
    const textVal = window.gameMonologues[String(monologIdx)] || window.gameMonologues[monologIdx] || "";

    window.monologState.hasSeen[monologIdx] = true;

    const nameplate = container.querySelector('.zozo-nameplate-std');
    if (monologIdx === 'controls' || monologIdx === 'wind') {
      container.classList.add('controls-popup-mode');
      if (nameplate) nameplate.style.display = 'none';
    } else {
      container.classList.remove('controls-popup-mode');
      if (nameplate) nameplate.style.display = 'block';
    }

    const textEl = document.getElementById('ingame-dialogue-text');
    if (textEl) textEl.innerText = textVal;

    const backBtn = document.getElementById('monolog-back-btn');
    if (backBtn) {
      if (window.monologState.currentBlockIndex > 0) {
        backBtn.style.display = 'block';
      } else {
        backBtn.style.display = 'none';
      }
    }

    container.style.display = 'flex';
    window.isCutscenePlaying = true;
  } else {
    window.closeInGameMonolog();
  }
};

window.previousInGameMonolog = function (e) {
  if (e && e.stopPropagation) e.stopPropagation();

  const now = Date.now();
  if (now - lastMonologAdvanceTime < 200) return;
  lastMonologAdvanceTime = now;

  if (window.monologState.currentBlockQueue.length > 0 &&
    window.monologState.currentBlockIndex > 0) {
    window.monologState.currentBlockIndex--;
    window.renderCurrentMonolog();
  }
};

window.advanceInGameMonolog = function (e) {
  if (e && e.stopPropagation) e.stopPropagation();

  const now = Date.now();
  if (now - lastMonologAdvanceTime < 200) return;
  lastMonologAdvanceTime = now;

  if (window.monologState.currentBlockQueue.length > 0 &&
    window.monologState.currentBlockIndex < window.monologState.currentBlockQueue.length - 1) {
    window.monologState.currentBlockIndex++;
    window.renderCurrentMonolog();
  } else {
    window.closeInGameMonolog();
  }
};

window.closeInGameMonolog = function () {
  const container = document.getElementById('zozo-ingame-monolog-container');
  if (container) container.style.display = 'none';
  window.isCutscenePlaying = false;

  if (window.monologState.onComplete) {
    const cb = window.monologState.onComplete;
    window.monologState.onComplete = null;
    setTimeout(() => {
      cb();
      if (window.pendingAirshipAscent) {
        window.pendingAirshipAscent = false;
        window.airshipAscentStarted = true;
        window.playSoundEffect(window.airshipAscentAudio);
        window.airshipAscentDone = false;
        window.isCutscenePlaying = true;
        window.airshipTimer = 0;
        window.airshipCutsceneStage = 'ASCEND';
        window.airshipChaseCooldown = 0;
      }
    }, 50);
  } else if (window.pendingAirshipAscent) {
    setTimeout(() => {
      window.pendingAirshipAscent = false;
      window.airshipAscentStarted = true;
      window.playSoundEffect(window.airshipAscentAudio);
      window.airshipAscentDone = false;
      window.isCutscenePlaying = true;
      window.airshipTimer = 0;
      window.airshipCutsceneStage = 'ASCEND';
      window.airshipChaseCooldown = 0;
    }, 50);
  }
};

window._dockDropoffLocked = false;

window.triggerDropoffMonologs = function (prevStored, newStored) {
  if (window._dockDropoffLocked) return;
  window._dockDropoffLocked = true;

  if (newStored >= 30) {
    const eogText = (window.gamePopups && window.gamePopups.eog_empty_water) || "Gyanúsan üres a víz, gyere, nézzünk szét az öböl bejáratánál!";
    window.showPopUp(eogText, function () {
      window._dockDropoffLocked = false;
      window._waitingForPierLeave = true;
    });
  } else if (newStored >= 1 && !window.monologState.hasSeen[5]) {
    // 1. Első leadás: közvetlenül a Zozó 5-6 nagymonológ ablak nyílik meg azonnal és tisztán
    window.showInGameMonolog(5, 6, function () {
      window._dockDropoffLocked = false;
      window._waitingForPierLeave = true;
    });
  } else if (newStored >= 3 && !window.monologState.hasSeen[11]) {
    window.showInGameMonolog(11, 14, function () {
      window._dockDropoffLocked = false;
      window._waitingForPierLeave = true;
    });
  } else {
    // Nincs új narratív monológ: egyetlen tiszta, nem-blokkoló toast jelenik meg
    window.showPopUp((window.gamePopups && window.gamePopups.homepoint) || "Kipakoltam, mehetünk!", function () {
      window._dockDropoffLocked = false;
      if (newStored >= 1) window._waitingForPierLeave = true;
    });
  }
};

window.zozoTextStep = 0;
let lastStepTime = 0;

window.selectZozoTextStep = function (stepVal) {
  const idx = parseInt(stepVal, 10);
  if (!isNaN(idx) && idx >= 0 && idx < window.zozoWelcomeTexts.length) {
    window.zozoTextStep = idx;
    document.body.className = `welcome-mode step-${idx}`;

    const dialogText = document.getElementById('zozo-dialogue-text');
    if (dialogText) {
      dialogText.innerText = window.zozoWelcomeTexts[idx];
    }

    const backBtn = document.getElementById('welcome-back-btn');
    if (backBtn) {
      backBtn.style.display = idx > 0 ? 'block' : 'none';
    }

    const spaceHint = document.getElementById('welcome-space-hint');
    if (spaceHint) {
      spaceHint.style.display = idx === 0 ? 'block' : 'none';
    }
  }
};

window.previousZozoWelcome = function (event) {
  if (event && event.stopPropagation) event.stopPropagation();

  const now = Date.now();
  if (now - lastStepTime < 250) return;
  lastStepTime = now;

  if (window.zozoTextStep > 0) {
    window.selectZozoTextStep(window.zozoTextStep - 1);
  }
};

window.advanceZozoWelcome = function (event) {
  if (event && event.stopPropagation) event.stopPropagation();

  const now = Date.now();
  if (now - lastStepTime < 250) return;
  lastStepTime = now;

  const overlay = document.getElementById('zozo-welcome-overlay');
  if (!overlay || overlay.style.display === 'none') return;

  window.zozoTextStep++;

  if (window.zozoTextStep < window.zozoWelcomeTexts.length) {
    window.selectZozoTextStep(window.zozoTextStep);
  } else {
    window.closeZozoWelcome();
  }
};

window.isTimedPopupActive = false;

window.showPopUp = function (msg, onCompleteCb) {
  const mc = document.getElementById('zozo-ingame-monolog-container');
  if (mc && mc.style.display !== 'none') {
    if (onCompleteCb) onCompleteCb();
    return;
  }

  const p = document.getElementById('ingame-popup-toast');
  const txt = document.getElementById('popup-toast-text');
  if (p) {
    if (txt) txt.innerText = msg; else p.innerText = msg;
    p.classList.remove('controls-popup-mode');
    p.style.display = 'flex';
    p.style.pointerEvents = 'auto';

    // NEM fagyasztjuk le a játékmenetet (isCutscenePlaying = false), a csónak tovább halad!
    window.isTimedPopupActive = true;
    window.timedPopupCallback = onCompleteCb || null;

    setTimeout(() => {
      if (!window.isTimedPopupActive) return;
      p.style.display = 'none';
      window.isTimedPopupActive = false;

      const cb = window.timedPopupCallback;
      window.timedPopupCallback = null;
      if (cb) cb();
    }, 1200);
  } else if (onCompleteCb) {
    onCompleteCb();
  }
};

window.showClickControlledPopUp = function (msg, onCloseCb) {
  const mc = document.getElementById('zozo-ingame-monolog-container');
  if (mc && mc.style.display !== 'none') {
    if (onCloseCb) onCloseCb();
    return;
  }

  const p = document.getElementById('ingame-popup-toast');
  const txt = document.getElementById('popup-toast-text');
  if (p) {
    if (txt) txt.innerText = msg; else p.innerText = msg;
    if (msg && msg.includes('W,A,S,D')) {
      p.classList.add('controls-popup-mode');
    } else {
      p.classList.remove('controls-popup-mode');
    }
    p.style.display = 'flex';
    p.style.pointerEvents = 'auto';
    window.activePopupCallback = onCloseCb || null;
    window.isTimedPopupActive = false;

    // Automatikus eltűnés 1.2 mp után, ha nem kattintanak rá
    setTimeout(() => {
      if (p.style.display !== 'none') {
        window.dismissActivePopup();
      }
    }, 1200);
  } else if (onCloseCb) {
    onCloseCb();
  }
};

window.dismissActivePopup = function (e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const p = document.getElementById('ingame-popup-toast');
  if (p && p.style.display !== 'none') {
    p.style.display = 'none';
    p.style.pointerEvents = 'none';

    if (window.isTimedPopupActive) {
      window.isTimedPopupActive = false;
      if (window.timedPopupCallback) {
        const cb = window.timedPopupCallback;
        window.timedPopupCallback = null;
        setTimeout(() => { cb(); }, 10);
      }
    } else if (window.activePopupCallback) {
      const cb = window.activePopupCallback;
      window.activePopupCallback = null;
      setTimeout(() => { cb(); }, 10);
    }
  }
};

addEventListener('keydown', (e) => {
  if (e.code !== 'Space') return;

  const welcomeOverlay = document.getElementById('zozo-welcome-overlay');
  const ingameContainer = document.getElementById('zozo-ingame-monolog-container');
  const popupToast = document.getElementById('ingame-popup-toast');

  if (welcomeOverlay && welcomeOverlay.style.display !== 'none') {
    e.preventDefault();
    window.advanceZozoWelcome(e);
  } else if (ingameContainer && ingameContainer.style.display !== 'none') {
    e.preventDefault();
    window.advanceInGameMonolog(e);
  } else if (popupToast && popupToast.style.display !== 'none') {
    e.preventDefault();
    window.dismissActivePopup(e);
  }
});

addEventListener('click', (e) => {
  // A KILÉPÉS GOMB & A KILÉPÉSI ABLAK GOMBJAI BÁRMIKOR (még a Welcome boxok alatt is) MŰKÖDNEK!
  if (e.target.closest('#btn-tb-menu')) {
    const newTotal = Math.max(0, (window.totalPickedUp || 0) - (window.carriedMembranes || 0));
    const saveState = {
      totalPickedUp: newTotal,
      storedMembranes: window.storedMembranes || 0,
      hasSeen: window.monologState ? window.monologState.hasSeen : {}
    };
    localStorage.setItem('ebook_pirates_game_state', JSON.stringify(saveState));
    document.cookie = "ebook_pirates_game_state=true; path=/; max-age=86400";

    if (window.boat) {
      const transform = {
        x: window.boat.position.x,
        y: window.boat.position.y,
        z: window.boat.position.z,
        rotY: window.boat.rotation.y,
        orbH: typeof window.getOrbH === 'function' ? window.getOrbH() : 0,
        orbV: typeof window.getOrbV === 'function' ? window.getOrbV() : 0,
        orbDist: typeof window.getOrbDist === 'function' ? window.getOrbDist() : 0
      };
      localStorage.setItem('saved_boat_transform', JSON.stringify(transform));
    }

    window.location.href = 'MainMenuTutorial.html';
    return;
  }

  if (e.target.closest('#btn-tb-exit')) {
    const exitOverlay = document.getElementById('exit-confirm-overlay');
    if (exitOverlay) {
      exitOverlay.style.display = 'flex';
      window.isCutscenePlaying = true;
    }
    return;
  }

  if (e.target.closest('#btn-exit-no')) {
    const exitOverlay = document.getElementById('exit-confirm-overlay');
    if (exitOverlay) {
      exitOverlay.style.display = 'none';
      window.isCutscenePlaying = false;
    }
    return;
  }

  if (e.target.closest('#btn-exit-yes')) {
    // ----------------------------------------------------
    // JÁTÉKMENTÉS (COOKIE/LOCALSTORAGE/BACKEND) A KILÉPÉSKOR
    // ----------------------------------------------------
    const newTotal = Math.max(0, (window.totalPickedUp || 0) - (window.carriedMembranes || 0));
    const saveState = {
      totalPickedUp: newTotal,
      storedMembranes: window.storedMembranes || 0,
      carriedMembranes: 0,
      hasSeen: window.monologState ? window.monologState.hasSeen : {},
      boatPos: window.boat ? { x: window.boat.position.x, y: window.boat.position.y, z: window.boat.position.z } : { x: 5, y: 0, z: -94 },
      boatRotY: window.boat ? window.boat.rotation.y : 3.874,
      orbH: typeof window.getOrbH === 'function' ? window.getOrbH() : (window.orbH || 0),
      orbV: typeof window.getOrbV === 'function' ? window.getOrbV() : (window.orbV || 15),
      orbDist: typeof window.getOrbDist === 'function' ? window.getOrbDist() : (window.orbDist || 26),
      airshipState: window.airshipState || 'SLEEP',
      timestamp: Date.now()
    };

    localStorage.setItem('ebp_tutorial_save', JSON.stringify(saveState));
    localStorage.setItem('ebook_pirates_game_state', JSON.stringify(saveState));
    document.cookie = "ebook_pirates_game_state=true; path=/; max-age=86400";

    if (window.boat) {
      const transform = {
        x: window.boat.position.x,
        y: window.boat.position.y,
        z: window.boat.position.z,
        rotY: window.boat.rotation.y,
        orbH: typeof window.getOrbH === 'function' ? window.getOrbH() : 0,
        orbV: typeof window.getOrbV === 'function' ? window.getOrbV() : 0,
        orbDist: typeof window.getOrbDist === 'function' ? window.getOrbDist() : 0
      };
      localStorage.setItem('saved_boat_transform', JSON.stringify(transform));
    }

    // PostMessage küldése a szülő weblap (app.js -> backend parancsnoki_hid.js) felé!
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'EBOOK_PIRATES_TUTORIAL',
        action: 'saveTutorialState',
        data: saveState
      }, '*');
    }

    window.location.href = 'MainMenuTutorial.html';
    return;
  }

  const welcomeOverlay = document.getElementById('zozo-welcome-overlay');
  const ingameContainer = document.getElementById('zozo-ingame-monolog-container');
  const popupToast = document.getElementById('ingame-popup-toast');

  if (welcomeOverlay && welcomeOverlay.style.display !== 'none' && welcomeOverlay.contains(e.target)) {
    if (!e.target.closest('#welcome-back-btn')) {
      window.advanceZozoWelcome(e);
    }
    return;
  }

  if (ingameContainer && ingameContainer.style.display !== 'none' && ingameContainer.contains(e.target)) {
    if (!e.target.closest('#monolog-back-btn')) {
      window.advanceInGameMonolog(e);
    }
    return;
  }

  if (popupToast && popupToast.style.display !== 'none' && popupToast.contains(e.target)) {
    window.dismissActivePopup(e);
    return;
  }
});

window.resetAirshipChase = function () {
  window.airshipChaseState = 'RETREAT';
  window.airshipChaseCooldown = 45.0;
  window.monologState.airshipCaughtPlayer = false;
  if (window.foundZeppelin) {
    window.airshipTargetRotY = window.foundZeppelin.rotation.y;
  }
};

const clock = new THREE.Clock();
resize();

function frame() {
  requestAnimationFrame(frame);

  // A videó lejátszása alatt leállítjuk a teljes 3D renderelést és fizikai számításokat,
  // így a GPU és CPU 100%-ban a hardveres videó dekódolásra tud koncentrálni, megszüntetve a laggot!
  if (window.eogState === 'VIDEO') {
    return;
  }

  const rawDt = clock.getDelta();

  const dt = window.isCutscenePlaying ? 0 : Math.min(rawDt, 0.05);
  const cutsceneDt = Math.min(rawDt, 0.05);
  const t = clock.getElapsedTime();
  const coordDiv = document.getElementById('tb-coords') || document.getElementById('debug-coords');
  if (coordDiv && boat && boat.position && typeof boat.position.x === 'number') {
    coordDiv.innerText = `X: ${boat.position.x.toFixed(1)}, Z: ${boat.position.z.toFixed(1)}`;
  }

  const tbCarried = document.getElementById('tb-carried-count');
  if (tbCarried) tbCarried.innerText = window.carriedMembranes || 0;
  const tbStored = document.getElementById('tb-stored-count');
  if (tbStored) tbStored.innerText = window.storedMembranes || 0;

  const welcomeOverlayActive = document.getElementById('zozo-welcome-overlay') &&
    document.getElementById('zozo-welcome-overlay').style.display !== 'none';

  // Időszakos sanitizer és beragadt hártya ellenőrzés másodpercenként
  window._lastSanitizeTime = window._lastSanitizeTime || 0;
  if (t - window._lastSanitizeTime > 1.0) {
    window._lastSanitizeTime = t;
    if (typeof window.sanitizeAndAutoRecoverMembranes === 'function') {
      window.sanitizeAndAutoRecoverMembranes();
    }
  }

  if (window.activeMembranes && window.activeMembranes.length > 0 && !welcomeOverlayActive) {
    const bx = boat.position.x;
    const bz = boat.position.z;
    const _mWorldPos = new THREE.Vector3();

    for (let i = window.activeMembranes.length - 1; i >= 0; i--) {
      try {
        const m = window.activeMembranes[i];
        if (!m || m.userData.collected) continue;

        if (dt > 0) {
          m.position.y = m.userData.baseY + Math.sin(t * 2.2 + i) * 0.12;
          if (m.userData.light) {
            m.userData.light.intensity = 3.0 + Math.sin(t * 4.5 + i * 1.5) * 0.8;
          }
        }

        m.getWorldPosition(_mWorldPos);
        const dx = _mWorldPos.x - bx;
        const dz = _mWorldPos.z - bz;
        const distSq = dx * dx + dz * dz;

        if (window.totalPickedUp === 0 && distSq < 1225.0 && !window.monologState.hasSeen[2] && !window.isCutscenePlaying) {
          window.showInGameMonolog(2, 2);
        }

        // A csónak fizikai kiterjedéséhez illeszkedő pontos felvételi hatósugár (r = 3.0m, distSq < 9.0)
        if (distSq < 9.0 && !window.isCutscenePlaying) {
          // 1. LEGELŐSZÖR A HÁRTYA AZONNAL VISSZAÁLL A POOLBA!
          m.userData.collected = true;
          m.userData.inUse = false;
          m.visible = false;
          if (m.userData.light) m.userData.light.intensity = 0;
          m.position.set(0, -999, 0);
          const mIdx = window.activeMembranes.indexOf(m);
          if (mIdx > -1) window.activeMembranes.splice(mIdx, 1);

          // 2. AZONNALI HANGEFFEKT A FELVÉTELI ÉRINTÉS PILLANATÁBAN
          if (typeof window.playPickupSound === 'function') window.playPickupSound();

          const executeMembranePickup = (showDefaultPopup = true) => {
            window.carriedMembranes++;
            window.totalPickedUp++;

            if (window.totalPickedUp === 1) {
              if (!window.monologState.hasSeen[3]) {
                window.showInGameMonolog(3, 4);
              }
            } 
            else if (window.totalPickedUp === 2) {
              window.isWindActive = true;
              window.playSoundEffect(window.windStartAudio);
              if (typeof window.changeWindForNextMembrane === 'function') window.changeWindForNextMembrane();
              if (!window.monologState.hasSeen[7]) {
                window.showInGameMonolog(7, 8);
              }
            } 
            else if (window.totalPickedUp === 3) {
              if (typeof window.changeWindForNextMembrane === 'function') window.changeWindForNextMembrane();
              // Garantáljuk, hogy mindenképp elindul a cutscene, ne ragadjon be "pending" állapotba!
              window.pendingAirshipAscent = false;
              window.airshipAscentStarted = true;
              if (typeof window.playSoundEffect === 'function') window.playSoundEffect(window.airshipAscentAudio);
              window.airshipAscentDone = false;
              window.isCutscenePlaying = true;
              window.airshipTimer = 0;
              window.airshipCutsceneStage = 'ASCEND';
              window.airshipChaseCooldown = 0;
            }
            else if (window.totalPickedUp === 4) {
              if (typeof window.changeWindForNextMembrane === 'function') window.changeWindForNextMembrane();
              if (!window.monologState.hasSeen[11]) {
                window.showInGameMonolog([11, 12, 13, 14, 15, 16, 17]);
              } else if (!window.monologState.hasSeen[15]) {
                window.showInGameMonolog(15, 17);
              } else if (showDefaultPopup) {
                window.showClickControlledPopUp((window.gamePopups && window.gamePopups.membrane_good) || "Ezt felszedtük");
              }
            }
            else if (window.totalPickedUp === 5) {
              if (!window.monologState.hasSeen[18]) {
                window.showInGameMonolog(18, 21);
              }
            }
            else if (window.totalPickedUp === 6) {
              if (!window.monologState.hasSeen[22]) {
                window.showInGameMonolog(22, 23);
              }
            }
            else if (window.totalPickedUp === 7) {
              if (!window.monologState.hasSeen[24]) {
                window.showInGameMonolog(24, 27);
              }
            }
            else if (window.totalPickedUp === 8) {
              if (!window.monologState.hasSeen[28]) {
                window.showInGameMonolog(28, 31);
              }
            }
            else if (window.totalPickedUp === 9) {
              if (!window.monologState.hasSeen[32]) {
                window.showInGameMonolog(32, 32);
              }
            }
            else if (window.totalPickedUp === 10) {
              if (!window.monologState.hasSeen[33]) {
                window.showInGameMonolog(33, 34);
              }
            }
            else {
              if (showDefaultPopup) {
                window.showPopUp((window.gamePopups && window.gamePopups.membrane_good) || "Ezt felszedtük");
              }
            }



            window.gameTimeProgress = Math.min(window.totalPickedUp / 30.0, 0.90);
            if (typeof window.updateEnvironmentLighting === 'function') window.updateEnvironmentLighting();
          };

          const executeMembraneMiss = () => {
            m.userData.collected = true;
            m.userData.inUse = false;
            m.visible = false;
            if (m.userData.light) m.userData.light.intensity = 0;
            m.position.set(0, -999, 0);
            const mIdx = window.activeMembranes.indexOf(m);
            if (mIdx > -1) window.activeMembranes.splice(mIdx, 1);
            m.userData.isBeingPickedUp = false;

            window.showPopUp((window.gamePopups && window.gamePopups.membrane_bad) || "Ez a hártya most elúszott!");
          };

          if (window.totalPickedUp >= 8 && window.quizManager) {
            window.quizManager.openQuiz('TUTOR_GameInfo', (isCorrect) => {
              if (isCorrect) {
                executeMembranePickup(false);
              } else {
                executeMembraneMiss();
              }
            });
          } else {
            executeMembranePickup(false);
          }
        }
      } catch (err) {
        console.error("Hártya hiba:", err);
      }
    }
  }

  if (window.airshipChaseCooldown > 0) {
    window.airshipChaseCooldown -= cutsceneDt;
    if (window.airshipChaseCooldown <= 0) window.airshipChaseCooldown = 0;
  }

  if (window.airshipAscentStarted && !window.airshipAscentDone && window.foundZeppelin) {
    window.airshipTimer = (window.airshipTimer || 0) + cutsceneDt;
    const zep = window.foundZeppelin;

    if (zep.position.y < 40.0) {
      zep.position.y += cutsceneDt * 25.0;
    } else {
      zep.position.y = 40.0;
    }

    const bayTarget = new THREE.Vector3(-300, 40, 600);
    const dir = new THREE.Vector3().subVectors(bayTarget, zep.position).normalize();
    const targetRotY = Math.atan2(dir.x, dir.z) - Math.PI;
    zep.rotation.y += (targetRotY - zep.rotation.y) * cutsceneDt * 2.0;
    zep.position.add(dir.multiplyScalar(cutsceneDt * 80.0));

    if (window.airshipTimer > 2.2) {
      window.airshipAscentDone = true;
      window.airshipChaseState = 'CHASE';
      window.airshipChaseCooldown = 0;

      if (!window.monologState.hasSeen[9]) {
        window.showInGameMonolog(9, 9, function () {
          window.isCutscenePlaying = false;
        });
      } else {
        window.isCutscenePlaying = false;
      }
    }
  }

  if (window._waitingForPierLeave && window.homePos) {
    const dxP = boat.position.x - window.homePos.x;
    const dzP = boat.position.z - window.homePos.z;
    if (dxP * dxP + dzP * dzP > 2500.0) {
      window._waitingForPierLeave = false;

      const startWind = () => {
        window.isWindActive = true;
        window.playSoundEffect(window.windStartAudio);
        if (typeof window.changeWindForNextMembrane === 'function') window.changeWindForNextMembrane();
      };

      if (!window.monologState.hasSeen['wind_toast_shown']) {
        window.monologState.hasSeen['wind_toast_shown'] = true;
        window.showInGameMonolog(['wind'], null, startWind);
      } else {
        startWind();
      }
    }
  }

  // --- AUTOMATIKUS MÓLÓ LEADÁSI ZÓNA (18 méteres körzet, azonnali kényelmes leadás) ---
  if (window.carriedMembranes > 0 && !window.isCutscenePlaying && !window._dropoffInProgress && window.homePos) {
    const distHome = Math.hypot(boat.position.x - window.homePos.x, boat.position.z - window.homePos.z);
    if (distHome < 18.0) {
      window._dropoffInProgress = true;
      window._justDelivered = true;
      let previousStored = window.storedMembranes;
      window.storedMembranes += window.carriedMembranes;
      window.carriedMembranes = 0;
      window.firstMembraneDelivered = true;
      if (typeof window.playSoundEffect === 'function') window.playSoundEffect(window.homepointTouchAudio);

      // Tiszta állapotgép: a triggerDropoffMonologs indítja el a szükséges monológ ablakot vagy toastot
      window.triggerDropoffMonologs(previousStored, window.storedMembranes);

      // --- 30. HÁRTYA: EoG (END OF GAME) KINCSESLÁDA ÉS VÉGJÁTÉK AKTIVÁLÁSA ---
      if (window.storedMembranes >= 30 && window.eogState === 'NONE') {
        window.eogState = 'EMPTIED';
        if (window.activeMembranes) {
          window.activeMembranes.forEach(m => {
            m.visible = false;
            if (m.userData.light) m.userData.light.intensity = 0;
            m.userData.inUse = false;
            m.userData.collected = true;
            m.position.set(0, -999, 0);
          });
          window.activeMembranes = [];
        }
        if (!window.chestModel && typeof spawnEogTreasureChest === 'function') {
          spawnEogTreasureChest(scene, EoG_POINT_C);
        }
      }

      setTimeout(() => {
        window._dropoffInProgress = false;
      }, 1200);

      setTimeout(() => {
        window._justDelivered = false;
      }, 5000);
    }
  }

  // --- LÉGHAJÓ ÜLDÖZÉSI LOGIKA (100 MÉTERES VÉDELMI ZÓNÁVAL) ---
  if (window.airshipAscentDone && window.foundZeppelin && !window.eogTriggerChest && window.eogState !== 'CHEST_FOUND' && window.eogState !== 'CINEMATIC' && window.eogState !== 'CREDITS') {
    const zep = window.foundZeppelin;

    let distBoatToHome = 999.0;
    let distZepToHome = 999.0;
    if (window.homePos) {
      distBoatToHome = Math.hypot(boat.position.x - window.homePos.x, boat.position.z - window.homePos.z);
      distZepToHome = Math.hypot(zep.position.x - window.homePos.x, zep.position.z - window.homePos.z);
    }

    const isInProtectedZone = distBoatToHome < 100.0 || distZepToHome < 100.0;

    // Öböl bejárati 15-20 másodperces járőrútvonal (hogy a védett zóna határán soha ne laggoljon a levegőben)
    const AIRSHIP_BAY_WAYPOINTS = [
      new THREE.Vector3(-300, 40, 600), // 1. Nyugati öböl bejárat
      new THREE.Vector3(-100, 42, 850), // 2. Nyílt tengeri kanyar
      new THREE.Vector3(250, 40, 650),  // 3. Keleti öböl bejárat
      new THREE.Vector3(50, 38, 400)    // 4. Belső öbölátjáró
    ];

    if (isInProtectedZone) {
      if (window.airshipChaseState !== 'RETREAT') {
        window.airshipChaseState = 'RETREAT';
        window.airshipChaseCooldown = 18.0; // 18 mp-es folyamatos útvonal-bejárás
        window.airshipPatrolIdx = 0;
      }
    }

    if (window.airshipChaseState === 'RETREAT') {
      window.airshipPatrolIdx = window.airshipPatrolIdx || 0;
      let targetPt = AIRSHIP_BAY_WAYPOINTS[window.airshipPatrolIdx];
      const distToPt = zep.position.distanceTo(targetPt);

      // Ha megközelítette az aktuális pontot (35m-re), átvált a következő útvonalpontra
      if (distToPt < 35.0) {
        window.airshipPatrolIdx = (window.airshipPatrolIdx + 1) % AIRSHIP_BAY_WAYPOINTS.length;
        targetPt = AIRSHIP_BAY_WAYPOINTS[window.airshipPatrolIdx];
      }

      const retreatDir = new THREE.Vector3().subVectors(targetPt, zep.position).normalize();
      const targetRetreatRotY = Math.atan2(retreatDir.x, retreatDir.z) - Math.PI;
      zep.rotation.y += (targetRetreatRotY - zep.rotation.y) * cutsceneDt * 2.0;
      zep.position.add(retreatDir.multiplyScalar(cutsceneDt * 75.0));

      if (!isInProtectedZone && window.airshipChaseCooldown <= 0) {
        window.airshipChaseState = 'CHASE';
      }
    } else {
      if (window.airshipChaseState === 'CHASE' && !window.isCutscenePlaying) {
        const targetPos = boat.position.clone();
        targetPos.y = 40;

        const dir = new THREE.Vector3().subVectors(targetPos, zep.position);
        const distToBoat = dir.length();
        dir.normalize();

        const targetRotY = Math.atan2(dir.x, dir.z) - Math.PI;
        zep.rotation.y += (targetRotY - zep.rotation.y) * cutsceneDt * 2.0;

        if (distToBoat > 15) {
          zep.position.add(dir.clone().multiplyScalar(cutsceneDt * 70.0));
        }

        if (distToBoat < 45.0 && !window.monologState.airshipCaughtPlayer) {
          window.monologState.airshipCaughtPlayer = true;

          const isFirstCatch = !window.monologState.hasSeen[10];
          window.monologState.hasSeen[10] = true;

          window.playSoundEffect(window.airshipAttackAudio);
          window.isCutscenePlaying = true;
          setTimeout(() => {
            window.showPopUp((window.gamePopups && window.gamePopups.airship_catch) || "UTOLÉRTEK! Kérdezni fognak. Ha jól válaszolsz, megússzuk, \nde ha hibázol, elveszik a hártyáinkat.", () => {
              if (isFirstCatch) {
                window.airshipAbductionActive = true;
                window.airshipAbductionProgress = 0;
                window.airshipOriginalY = zep.position.y;

                if (window.foundZeppelinLadder) {
                  window.airshipLadderMesh = window.foundZeppelinLadder;
                } else if (!window.airshipLadderMesh) {
                  const ladderGroup = new THREE.Group();
                  const ropeMat = new THREE.MeshStandardMaterial({ color: 0x3d2516, roughness: 0.9 });
                  const stepMat = new THREE.MeshStandardMaterial({ color: 0x6b4c2a, roughness: 0.7 });

                  const r1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 18, 6), ropeMat);
                  r1.position.set(-0.8, -9, 0);
                  const r2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 18, 6), ropeMat);
                  r2.position.set(0.8, -9, 0);
                  ladderGroup.add(r1); ladderGroup.add(r2);

                  for (let s = 0; s < 12; s++) {
                    const step = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.2), stepMat);
                    step.position.set(0, -1.5 * s - 0.5, 0);
                    ladderGroup.add(step);
                  }
                  zep.add(ladderGroup);
                  window.airshipLadderMesh = ladderGroup;
                }

                if (window.airshipLadderMesh) {
                  window.airshipLadderMesh.visible = true;
                  window.airshipLadderMesh.scale.set(1, 0.01, 1);
                }
              } else {
                if (window.quizManager) {
                  window.quizManager.openQuiz('TUTORZEP', function (isCorrect) {
                    window.resetAirshipChase();
                  });
                } else {
                  window.resetAirshipChase();
                }
              }
            });
          }, 1500);
        }
      }
    }
  }

  if (window.airshipAbductionActive && window.foundZeppelin && boat) {
    const zep = window.foundZeppelin;
    window.airshipAbductionProgress += cutsceneDt * 0.48;
    const p = Math.min(window.airshipAbductionProgress, 1.0);

    const p_zep = Math.min(p / 0.6, 1.0);
    const p_ladder = Math.max(0, (p - 0.6) / 0.4);

    zep.position.x = THREE.MathUtils.lerp(zep.position.x, boat.position.x, cutsceneDt * 3.0);
    zep.position.z = THREE.MathUtils.lerp(zep.position.z, boat.position.z, cutsceneDt * 3.0);
    zep.position.y = THREE.MathUtils.lerp(window.airshipOriginalY || 40.0, 22.0, p_zep);

    if (window.airshipLadderMesh) {
      window.airshipLadderMesh.visible = true;
      const scaleY = THREE.MathUtils.lerp(0.01, 1.15, p_ladder);
      window.airshipLadderMesh.scale.set(1, scaleY, 1);
    }

    if (p >= 1.0) {
      window.airshipAbductionActive = false;
      if (window.quizManager) {
        window.quizManager.openQuiz('TUTORZEP', function (isCorrect) {
          if (window.airshipLadderMesh) window.airshipLadderMesh.visible = false;
          window.resetAirshipChase();
        });
      }
    }
  }

  if (window.eogState === 'EMPTIED' && !window.eogTriggerA) {
    const dxA = boat.position.x - EoG_POINT_A.x;
    const dzA = boat.position.z - EoG_POINT_A.z;
    if (dxA * dxA + dzA * dzA < 10000) {
      window.eogTriggerA = true;
      window.eogState = 'POINT_A_SHOWN';
      if (!window.chestModel) spawnEogTreasureChest(scene, EoG_POINT_C);
      showZozoEogMonolog(
        window.eogMonologues.pointA || 'Te, Patkány! Gyanúsan üres a víz...',
        function () {
          window.isCutscenePlaying = false;
          window.eogState = 'POINT_A_SHOWN';
        }
      );
    }
  }

  if ((window.eogState === 'POINT_A_SHOWN' || window.eogState === 'EMPTIED' || window.eogState === 'CHEST_VISIBLE') && !window.eogTriggerB) {
    const dxB = boat.position.x - EoG_POINT_B.x;
    const dzB = boat.position.z - EoG_POINT_B.z;
    if (dxB * dxB + dzB * dzB < 3600) {
      window.eogTriggerB = true;
      function showBMonolog() {
        showZozoEogMonolog(
          window.eogMonologues.pointB || 'Mi az ott a parton?',
          function () {
            window.isCutscenePlaying = false;
            window.eogState = 'POINT_B_SHOWN';
          }
        );
      }
      if (!window.eogTriggerA) {
        window.eogTriggerA = true;
        window.eogState = 'POINT_A_SHOWN';
        if (!window.chestModel) spawnEogTreasureChest(scene, EoG_POINT_C);
        showZozoEogMonolog(
          window.eogMonologues.pointA || 'Te, Patkány! Gyanúsan üres a víz...',
          function () { showBMonolog(); }
        );
      } else {
        showBMonolog();
      }
    }
  }

  if (!window.eogTriggerChest && window.chestModel && window.chestModel !== 'LOADING') {
    const distToChest = Math.hypot(boat.position.x - window.chestModel.position.x, boat.position.z - window.chestModel.position.z);
    if (distToChest < EoG_CHEST_TRIGGER_DIST) {
      window.eogTriggerChest = true;
      window.eogState = 'CHEST_FOUND';
      window.isWindActive = false; // Szél leállítása az EoG felületekhez
      window.chestModel.visible = false;
      if (window.chestGlowDisc) window.chestGlowDisc.visible = false;
      try { playEogFanfare(); } catch (e) { }
      showZozoEogMonolog(
        window.eogMonologues.chestFound || 'Most én viszem vissza a csónakot...',
        function () {
          startEogCinematic(scene, boat);
        }
      );
    }
  }

  if (window.eogState === 'CINEMATIC' && window.eogCinematicPath && cutsceneDt > 0) {
    if (window.isEogPathEditorActive) {
      window.eogCinematicStartTime += (rawDt * 1000);
    }
    const elapsed = (performance.now() - window.eogCinematicStartTime) / 1000;
    const DURATION = 35.0; // 35 másodpercre felgyorsított animáció
    const t = Math.min(elapsed / DURATION, 1.0);

    const pos = window.eogCinematicPath.getPoint(t);
    boat.position.copy(pos);
    boat.position.y = 0;

    const tangent = window.eogCinematicPath.getTangent(t);
    const targetAngle = Math.atan2(-tangent.x, -tangent.z);
    boat.rotation.y = targetAngle;
    window.setOrb(0, 15.0, 26.00);

    if (t >= 1.0 && !window.eogPierArrived) {
      window.eogPierArrived = true;
      if (typeof showChestAtPier === 'function') showChestAtPier(scene);
    }
  }

  if (water && water.material.uniforms['time']) {
    water.material.uniforms['time'].value += cutsceneDt;
  }

  const SPEED = 120, TURN = 75;
  let targetMv = 0, tr = 0;
  if (!window.isCutscenePlaying) {
    if (keys.KeyW || keys.ArrowUp) targetMv = 1;
    if (keys.KeyS || keys.ArrowDown) targetMv = -1;
    if (keys.KeyA || keys.ArrowLeft) tr = -1;
    if (keys.KeyD || keys.ArrowRight) tr = 1;
  }

  window.currentMv = window.currentMv || 0;
  if (dt > 0) {
    if (window._rockRespawnLock) {
      window.currentMv = 0;
      targetMv = 0;
    }

    if (targetMv > 0) {
      if (window.currentMv < 0.35) window.currentMv = 0.35;
      window.currentMv = Math.min(1, window.currentMv + dt * 1.5);
    } else if (targetMv < 0) {
      if (window.currentMv > -0.35) window.currentMv = -0.35;
      window.currentMv = Math.max(-1, window.currentMv - dt * 1.5);
    } else {
      if (window.currentMv > 0) window.currentMv = Math.max(0, window.currentMv - dt * 8.0);
      else if (window.currentMv < 0) window.currentMv = Math.min(0, window.currentMv + dt * 8.0);
    }
  }
  let mv = window.currentMv;

  _prevPos.copy(boat.position);
  const prevRot = boat.rotation.y;

  let windForceX = 0, windForceZ = 0;
  if (window.isWindActive && !window.isCutscenePlaying) {
    let pierDist = 999.0;
    if (window.homePos) {
      const dxP = boat.position.x - window.homePos.x;
      const dzP = boat.position.z - window.homePos.z;
      pierDist = Math.sqrt(dxP * dxP + dzP * dzP);
    }

    let effectiveWindForce = 0.5;
    if (pierDist <= 60.0) {
      effectiveWindForce = 0; // A móló közvetlen 60 méteres körzetében nincs szélsodrás!
    } else if (pierDist <= 120.0) {
      effectiveWindForce = (0.05 + Math.random() * 0.10) * 0.3; // Szél ereje jelentősen csillapítva a móló körül
    } else if (pierDist <= 500.0) {
      effectiveWindForce = 0.1 + Math.random() * 0.9;
    } else if (pierDist <= 700.0) {
      effectiveWindForce = 0.6 + Math.random() * 0.6;
    } else {
      effectiveWindForce = 0.1 + Math.random() * 1.1;
    }

    let wX = Math.sin(window.currentWindAngle);
    let wZ = Math.cos(window.currentWindAngle);

    // Móló 120m-es körzetében a móló felé irányuló szélvektor teljesen nulla:
    if (pierDist <= 60.0) {
      wX = 0;
      wZ = 0;
    } else if (pierDist <= 120.0 && window.homePos) {
      const toPierX = window.homePos.x - boat.position.x;
      const toPierZ = window.homePos.z - boat.position.z;
      const toPierLen = Math.hypot(toPierX, toPierZ);
      if (toPierLen > 0.1) {
        const dirX = toPierX / toPierLen;
        const dirZ = toPierZ / toPierLen;
        const dot = wX * dirX + wZ * dirZ;
        if (dot > 0) {
          // Levonjuk a móló felé mutató komponenst
          wX -= dot * dirX;
          wZ -= dot * dirZ;
        }
      }
    }

    _fwd.set(0, 0, -1).applyQuaternion(boat.quaternion);

    const windAlignment = _fwd.x * wX + _fwd.z * wZ;

    windForceX = wX * effectiveWindForce * 18.0;
    windForceZ = wZ * effectiveWindForce * 18.0;

    if (mv > 0) {
      mv *= (1.0 + windAlignment * effectiveWindForce * 0.45);
    }
  }

  if (window.sailRig) {
    let targetSailAngle = 0;

    if (window.isWindActive) {
      let relativeWind = (window.currentWindAngle - boat.rotation.y) % (Math.PI * 2);

      while (relativeWind < -Math.PI) relativeWind += Math.PI * 2;
      while (relativeWind > Math.PI) relativeWind -= Math.PI * 2;

      const MAX_SAIL_ANGLE = 70 * (Math.PI / 180);
      targetSailAngle = THREE.MathUtils.clamp(-relativeWind * 0.5, -MAX_SAIL_ANGLE, MAX_SAIL_ANGLE);
    }

    window.sailRig.rotation.y = THREE.MathUtils.lerp(
      window.sailRig.rotation.y,
      targetSailAngle,
      cutsceneDt * 3.5
    );
  }

  if (Math.abs(mv) > 0.01 && dt > 0) {
    const dir = mv < 0 ? -1 : 1;
    boat.rotation.y -= tr * dir * (TURN * Math.PI / 180) * dt;
    let spd = SPEED;
    if (mv < 0) spd *= 0.5;
    _fwd.set(0, 0, -1).applyQuaternion(boat.quaternion);
    _step.copy(_fwd).multiplyScalar(mv * spd * dt);
    boat.position.add(_step);
  } else if (Math.abs(tr) > 0.01 && dt > 0) {
    boat.rotation.y -= tr * (TURN * Math.PI / 180) * dt;
  }

  // --- VÍZFELSZÍNI RINGÁS ÉS DŐLÉS ---
  const waveTime = t * 2.4;
  boat.position.y = Math.sin(waveTime) * 0.08 + Math.cos(waveTime * 0.6) * 0.03;
  boat.rotation.z = Math.sin(waveTime * 0.75) * 0.035 + (tr * -0.04);
  boat.rotation.x = Math.cos(waveTime * 0.9) * 0.02 + (mv * 0.02);

  if (window.isWindActive && !window.isCutscenePlaying && dt > 0) {
    boat.position.x += windForceX * dt;
    boat.position.z += windForceZ * dt;
  }

  let collisionDetected = false;
  let hitHeight = 0;
  let hitType = null;

  // 1. Raycast whiskers - Tiszta 360 fokos ütközésvizsgálat
  const isMoving = Math.abs(mv) > 0.01 || Math.abs(tr) > 0.01;
  const isDrifting = window.isWindActive && !window.isCutscenePlaying && (Math.abs(windForceX) > 0.01 || Math.abs(windForceZ) > 0.01);

  if ((isMoving || isDrifting) && borderMeshes.length > 0 && window.eogState !== 'CINEMATIC') {
    _center.set(boat.position.x, 0.3, boat.position.z);

    laserLines.forEach((lItem) => {
      const id = lItem.w.id;
      let shouldCheck = false;

      if (mv > 0.01) {
        if (id === 'FORWARD' || id === 'FRONT_LEFT' || id === 'FRONT_RIGHT') shouldCheck = true;
      } else if (mv < -0.01) {
        if (id === 'BACKWARD' || id === 'BACK_LEFT' || id === 'BACK_RIGHT') shouldCheck = true;
      } else if (Math.abs(tr) > 0.01) {
        if (id === 'SIDE_LEFT' || id === 'SIDE_RIGHT' || id === 'FRONT_LEFT' || id === 'FRONT_RIGHT') shouldCheck = true;
      } else if (isDrifting) {
        shouldCheck = true;
      }

      if (!shouldCheck) {
        lItem.mat.color.setHex(0x00ffcc);
        return;
      }

      _rayDir.set(0, 0, -1);
      _rayDir.applyAxisAngle(_upAxis, lItem.w.angle);
      _rayDir.applyQuaternion(boat.quaternion).normalize();

      const maxDetectDist = lItem.w.dist + (mv > 0.01 ? mv * 1.5 : 0);

      _sharedRaycaster.set(_center, _rayDir);
      const intersects = _sharedRaycaster.intersectObjects(borderMeshes, false);

      if (intersects.length > 0 && intersects[0].distance < maxDetectDist) {
        collisionDetected = true;
        lItem.mat.color.setHex(0xff2200);
        const hitObj = intersects[0].object;
        let detected = (hitObj.userData && hitObj.userData.obstacleType) || 'beach';
        const hitName = (hitObj.name || '').toLowerCase();
        if (hitName.includes('dock') || hitName.includes('pier') || hitName.includes('molo') || hitName.includes('móló') || hitName.includes('homepoint') || hitName.includes('shanty') || hitName.startsWith('sm_bld_')) {
          detected = 'homepoint';
        } else if (hitName.includes('rock') || hitName.includes('stone') || hitName.includes('cliff') || hitName.includes('reef')) {
          detected = 'rock';
        } else if (hitName.includes('beach') || hitName.includes('sand') || hitName.includes('shore') || hitName.includes('part') || hitName.includes('terrain')) {
          detected = 'beach';
        }

        // Ha a móló közvetlen 22 méteres körzetében vagyunk és nem sziklát találtunk, az mindig a Bázis/Móló (homepoint)
        if (window.homePos && Math.hypot(boat.position.x - window.homePos.x, boat.position.z - window.homePos.z) < 22.0) {
          if (detected !== 'rock') {
            detected = 'homepoint';
          }
        }

        hitType = detected;
      } else {
        lItem.mat.color.setHex(0x00ffcc);
      }
    });
  }

  if (!hitType) hitType = 'beach';

  window._lastHitType = window._lastHitType || null;

  if (collisionDetected) {
    // --- AZONNALI NULLA VEKTOR ÉS MEGÁLLÁS ---
    window.currentMv = 0;
    mv = 0;
    windForceX = 0;
    windForceZ = 0;
    boat.position.copy(_prevPos);

    if (hitType !== window._lastHitType) {
      window._lastHitType = hitType;
      if (hitType === 'rock') window.playSoundEffect(window.crashRockAudio);
      else if (hitType === 'beach') window.playSoundEffect(window.beachTouchAudio);
      else if (hitType === 'homepoint') window.playSoundEffect(window.homepointTouchAudio);
      else if (hitType === 'out_of_range') window.playSoundEffect(window.outOfRangeAudio);
    }

    if (hitType === 'beach') {
      if (!window._beachPopupCooldown) {
        window._beachPopupCooldown = true;
        window.showPopUp((window.gamePopups && window.gamePopups.beach) || "A partra nem kéne felfutni");
        setTimeout(() => {
          window._beachPopupCooldown = false;
        }, 2000);
      }
    }
    else if (hitType === 'out_of_range') {
      if (!window._rangePopupCooldown) {
        window._rangePopupCooldown = true;
        setTimeout(() => {
          window.showPopUp(window.gamePopups.out_of_range || "Ezzel a ronccsal nem mehetünk ki a nyílt tengerre.", () => {
            window._rangePopupCooldown = false;
          });
        }, 800);
      }
    }
    else if (hitType === 'homepoint') {
      if (!window._homeEmptyEntered) {
        window._homeEmptyEntered = true;
        if (!window._justDelivered) {
          if (window.storedMembranes >= 30) {
            const eogText = (window.gamePopups && window.gamePopups.eog_empty_water) || "Gyanúsan üres a víz, gyere, nézzünk szét az öböl bejáratánál!";
            setTimeout(() => {
              window.showPopUp(eogText, () => { });
            }, 400);
          } else if (window.carriedMembranes === 0) {
            setTimeout(() => {
              if (!window._justDelivered && window.carriedMembranes === 0) {
                window.showPopUp((window.gamePopups && window.gamePopups.empty_boat) || "Üres csónakkal tértél vissza", () => { });
              }
            }, 400);
          }
        }
      }
    }
    else if (hitType === 'rock') {
      // Szikla (rock): Crash esemény - AZONNALI 0 VEKTOR, TÖRÉS ÉS 0.5 MP-ES KIKÖTŐI ÚJRAINDÍTÁS
      if (!window._rockCrashCooldown) {
        window._rockCrashCooldown = true;
        window._rockRespawnLock = true;

        if (typeof window.playSoundEffect === 'function') window.playSoundEffect(window.crashRockAudio);

        // Piros crash overlay azonnali felvillantása
        const crashOverlay = document.getElementById('crash-overlay');
        if (crashOverlay) {
          crashOverlay.style.display = 'flex';
          setTimeout(() => { crashOverlay.style.display = 'none'; }, 1000);
        }

        // Hártyák levonása és csónak azonnali visszatérése a mólóhoz
        if (window.totalPickedUp !== undefined && window.carriedMembranes > 0) {
          window.totalPickedUp = Math.max(0, window.totalPickedUp - window.carriedMembranes);
        }
        window.carriedMembranes = 0;
        boat.position.set(5, 0, -94);
        boat.rotation.y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180);

        if (window.storedMembranes === 0 && window.activeMembranes && window.activeMembranes.length === 0) {
          if (typeof window.spawnZeroPointMembrane === 'function') {
            window.spawnZeroPointMembrane();
          }
        }

        // "Vigyázz, összetörted a csónakot!" figyelmeztetés kiírása
        window.showPopUp((window.gamePopups && window.gamePopups.crash) || "Vigyázz, összetörted a csónakot!", () => {
          window._rockCrashCooldown = false;
        });

        // Fél másodperces (500ms) indítási késleltetés a kikötőben
        setTimeout(() => {
          window._rockRespawnLock = false;
          window._rockCrashCooldown = false;
        }, 500);
      }
    }
  } else {
    window._lastHitType = null;

    if (window._homeEmptyEntered === true && boat && boat.position && window.homePos) {
      const dxH = boat.position.x - window.homePos.x;
      const dzH = boat.position.z - window.homePos.z;
      if (dxH * dxH + dzH * dzH > 900.0) { // 30 méternél messzebb távolodva old fel a móló elhagyásakor
        window._homeEmptyEntered = false;
      }
    }
  }

  // DINAMIKUS HÁRTYA UTÁNTÖLTÉS - Csak az 1. hártya sikeres mólós leadása UTÁN indulhat el!
  if (typeof window.spawnHartyaWave === 'function' && window.activeMembranes && window.firstMembraneDelivered === true && window.eogState === 'NONE') {
    if (window.activeMembranes.length < 10 && window.totalSpawnedCount < 60) {
      // Csak 5 másodpercenként próbáljon utántölteni
      if (!window._lastDynamicSpawnTime || performance.now() - window._lastDynamicSpawnTime > 5000) {
        window._lastDynamicSpawnTime = performance.now();
        const spawnAmount = Math.min(10 - window.activeMembranes.length, 60 - window.totalSpawnedCount);
        if (spawnAmount > 0) {
          window.spawnHartyaWave(spawnAmount, 'boat');
        }
      }
    }
  }

  if (Math.abs(mv) > 0.01 && dt > 0) {
    const wakeMatC = getPooledWakeMaterial();
    const wakeC = new THREE.Mesh(wakeGeo, wakeMatC);
    wakeC.rotation.x = -Math.PI / 2;
    wakeC.rotation.z = boat.rotation.y;
    const offsetC = new THREE.Vector3(0, 0, 3.0).applyQuaternion(boat.quaternion);
    wakeC.position.copy(boat.position).add(offsetC);
    wakeC.position.y = 0.15;
    wakeC.userData.vel = new THREE.Vector3(0, 0, 0.35).applyQuaternion(boat.quaternion);
    scene.add(wakeC);
    boatWakes.push(wakeC);

    const wakeMatL = getPooledWakeMaterial();
    const wakeL = new THREE.Mesh(wakeGeo, wakeMatL);
    wakeL.rotation.x = -Math.PI / 2;
    wakeL.rotation.z = boat.rotation.y;
    const offsetL = new THREE.Vector3(-0.35, 0, 3.2).applyQuaternion(boat.quaternion);
    wakeL.position.copy(boat.position).add(offsetL);
    wakeL.position.y = 0.15;
    wakeL.userData.vel = new THREE.Vector3(-0.18, 0, 0.38).applyQuaternion(boat.quaternion);
    scene.add(wakeL);
    boatWakes.push(wakeL);

    const wakeMatR = getPooledWakeMaterial();
    const wakeR = new THREE.Mesh(wakeGeo, wakeMatR);
    wakeR.rotation.x = -Math.PI / 2;
    wakeR.rotation.z = boat.rotation.y;
    const offsetR = new THREE.Vector3(0.35, 0, 3.2).applyQuaternion(boat.quaternion);
    wakeR.position.copy(boat.position).add(offsetR);
    wakeR.position.y = 0.15;
    wakeR.userData.vel = new THREE.Vector3(0.18, 0, 0.38).applyQuaternion(boat.quaternion);
    scene.add(wakeR);
    boatWakes.push(wakeR);
  }

  const timeScale = cutsceneDt * 60;
  for (let i = boatWakes.length - 1; i >= 0; i--) {
    let w = boatWakes[i];
    if (w.userData.vel) {
      w.position.addScaledVector(w.userData.vel, cutsceneDt);
    }
    w.scale.x += 0.009 * timeScale;
    w.scale.y += 0.009 * timeScale;
    w.material.opacity -= 0.008 * timeScale;

    if (w.material.opacity <= 0) {
      scene.remove(w);
      boatWakes.splice(i, 1);
    }
  }

  if (window.tempOrbitEnabled && window.tempOrbit) {
    window.tempOrbit.update();
  } else {
    if (window.recordingModeActive && window.foundZeppelin) {
      const elapsedSec = (performance.now() - window.recordingStartTime) / 1000.0;
      window.recordingAngle = (elapsedSec / 45.0) * (Math.PI * 2);

      cam.position.set(
        window.foundZeppelin.position.x + 70 * Math.sin(window.recordingAngle),
        window.foundZeppelin.position.y + 55,
        window.foundZeppelin.position.z + 70 * Math.cos(window.recordingAngle)
      );
      cam.lookAt(new THREE.Vector3(window.foundZeppelin.position.x, window.foundZeppelin.position.y + 15, window.foundZeppelin.position.z));
      if (window.cinematicLight) {
        window.cinematicLight.position.copy(cam.position);
        window.cinematicLight.lookAt(window.foundZeppelin.position);
      }
    }
    else if (window.isEogPathEditorActive) {
      // OrbitControls handles it
    }
    else if (window.eogState === 'CINEMATIC' && window.homePos) {
      const bX = (boat && boat.position) ? boat.position.x : 5.0;
      const bY = (boat && boat.position) ? boat.position.y : 0.0;
      const bZ = (boat && boat.position) ? boat.position.z : -94.0;
      const bRotY = (boat && boat.rotation) ? boat.rotation.y : 0;
      const totalH = bRotY + (orbH * Math.PI / 180);
      const vR = orbV * Math.PI / 180;
      cam.position.set(
        bX + orbDist * Math.sin(totalH) * Math.cos(vR),
        bY + orbDist * Math.sin(vR) + LOOK_OFFSET_Y,
        bZ + orbDist * Math.cos(totalH) * Math.cos(vR)
      );
      cam.lookAt(new THREE.Vector3(bX, bY + LOOK_OFFSET_Y, bZ));
    }
    else if (window.airshipAbductionActive && window.foundZeppelin) {
      const bX = (boat && boat.position) ? boat.position.x : 5.0;
      const bZ = (boat && boat.position) ? boat.position.z : -94.0;
      cam.position.set(bX - 35, 18, bZ + 35);
      cam.lookAt(new THREE.Vector3(bX, 15, bZ));
    }
    else if (window.airshipAscentStarted && !window.airshipAscentDone && window.foundZeppelin && window.foundZeppelin.position) {
      cam.position.set(-374, 25, 1347);
      cam.lookAt(window.foundZeppelin.position);
    }
    else {
      const bX = (boat && boat.position) ? boat.position.x : 5.0;
      const bY = (boat && boat.position) ? boat.position.y : 0.0;
      const bZ = (boat && boat.position) ? boat.position.z : -94.0;
      const bRotY = (boat && boat.rotation) ? boat.rotation.y : 0;
      const totalH = bRotY + (orbH * Math.PI / 180);
      const vR = orbV * Math.PI / 180;
      cam.position.set(
        bX + orbDist * Math.sin(totalH) * Math.cos(vR),
        bY + orbDist * Math.sin(vR) + LOOK_OFFSET_Y,
        bZ + orbDist * Math.cos(totalH) * Math.cos(vR)
      );
      cam.lookAt(new THREE.Vector3(bX, bY + LOOK_OFFSET_Y, bZ));
    }
  }

  water.position.x = cam.position.x;
  water.position.z = cam.position.z;
  if (skyDome) {
    skyDome.position.x = cam.position.x;
    skyDome.position.z = cam.position.z;
  }

  renderer.render(scene, cam);
}
frame();

window.showZozoEogMonolog = function (text, onCloseCallback) {
  const dialog = document.getElementById('eog-compact-dialog');
  const textEl = document.getElementById('eog-dialog-text');
  if (!dialog || !textEl) return;

  textEl.innerText = text;
  dialog.style.display = 'block';
  window.isCutscenePlaying = true;

  function closeEogDialog() {
    dialog.style.display = 'none';
    window.isCutscenePlaying = false;
    document.removeEventListener('keydown', onKey);
    dialog.removeEventListener('click', onClick);
    if (typeof onCloseCallback === 'function') onCloseCallback();
  }

  function onKey(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    closeEogDialog();
  }

  function onClick() { closeEogDialog(); }

  setTimeout(function () {
    document.addEventListener('keydown', onKey, { once: true });
    dialog.addEventListener('click', onClick, { once: true });
  }, 100);
};

function spawnEogTreasureChest(sceneRef, point) {
  window.chestModel = 'LOADING'; // Prevent multiple calls while loading
  const loader = new GLTFLoader();
  loader.load(window.getAssetUrl('models/pirates_assets/SM_Prop_Chest_Treasure_01.glb'), function (gltf) {
    window.chestModel = gltf.scene;
    window.chestModel.position.set(point.x, 0.75, point.z);
    window.chestModel.scale.set(250, 250, 250);
    sceneRef.add(window.chestModel);

    window.chestModel.traverse(function (child) {
      if (child.isMesh && child.material) {
        child.material.emissive = new THREE.Color(0x332200);
        child.material.roughness = 0.3;
        child.material.metalness = 0.8;
        child.material.needsUpdate = true;
      }
    });

    const discGeom = new THREE.CylinderGeometry(1, 1, 0.5, 32);
    const discMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.7 });
    const glowDisc = new THREE.Mesh(discGeom, discMat);
    glowDisc.position.set(point.x, 0.1, point.z);
    sceneRef.add(glowDisc);

    const chestLight = new THREE.PointLight(0xffaa33, 150.0, 800);
    chestLight.position.set(0, 0.5, 0);
    glowDisc.add(chestLight);
    window.chestGlowLight = chestLight;
    window.chestGlowDisc = glowDisc;
    window.eogState = 'CHEST_VISIBLE';
  }, undefined, function (err) {
    const fallback = new THREE.Mesh(
      new THREE.BoxGeometry(2, 1.5, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xc8a040, roughness: 0.4, metalness: 0.7 })
    );
    fallback.position.set(point.x, 0.75, point.z);
    sceneRef.add(fallback);
    window.chestModel = fallback;
    window.eogState = 'CHEST_VISIBLE';
  });
}

function startEogCinematic(sceneRef, boatRef) {
  window.eogState = 'CINEMATIC';
  window.isWindActive = false; // Szél teljes leállítása

  // Fények felkapcsolása a mólón és a faházakon
  dockLanternLights.forEach(light => { light.intensity = 180.0; });
  if (window.lantern1Light) window.lantern1Light.intensity = 180.0;
  if (window.lantern2Light) window.lantern2Light.intensity = 180.0;

  if (window.smallLantern1Light) window.smallLantern1Light.intensity = 140.0;
  if (window.smallLantern2Light) window.smallLantern2Light.intensity = 140.0;
  if (window.mainRockLanternLight) window.mainRockLanternLight.intensity = 3500.0;

  shantyLights.forEach(light => {
    if (light.userData && (light.userData.name === 'sm_bld_shanty_preset_08' || light.userData.name === 'sm_bld_shanty_preset_24')) {
      light.intensity = 350.0;
    }
  });

  // --- Shanty belső ablakfény (emissive glow) ---
  if (window.fullTrack) {
    window.fullTrack.traverse(function (child) {
      if (!child.isMesh) return;
      const cName = (child.name || '').toLowerCase();
      if (cName.includes('shanty') || cName.includes('house') || cName.startsWith('sm_bld_')) {
        if (child.material) {
          const mat = child.material.clone();
          mat.emissive = new THREE.Color(0xff9933);
          mat.emissiveIntensity = 0.525; // 1.5x-ösére növelve (0.35 -> 0.525)
          mat.needsUpdate = true;
          child.material = mat;
          child.userData.eogEmissiveApplied = true;
        }
      }
    });
  }

  window.eogPierArrived = false;
  window.eogLidAngle = 0;
  window.eogCinematicStartTime = performance.now();

  const startPos = boatRef.position.clone();

  // Pontos felhasználói útvonal koordináták
  window.eogCinematicWaypoints = [
    { x: -433.0, y: 0, z: 1207.3 },
    { x: -477.9, y: 0, z: 1075.3 },
    { x: -492.7, y: 0, z: 1038.3 },
    { x: -479.3, y: 0, z: 969.0 },
    { x: -440.6, y: 0, z: 750.6 },
    { x: -429.3, y: 0, z: 735.9 },
    { x: -373.7, y: 0, z: 618.8 },
    { x: -189.4, y: 0, z: 553.2 },
    { x: -106.7, y: 0, z: 391.3 },
    { x: -62.6, y: 0, z: 271.3 },
    { x: -37.5, y: 0, z: 120.4 },
    { x: -20.1, y: 0, z: 48.4 },
    { x: 14.4, y: 0, z: -79.4 },
    { x: 4.6, y: 0, z: -94.7 }
  ];

  const pts = [startPos];
  window.eogCinematicWaypoints.forEach(wp => {
    pts.push(new THREE.Vector3(wp.x, wp.y, wp.z));
  });

  window.eogCinematicPath = new THREE.CatmullRomCurve3(pts);
}

function showChestAtPier(sceneRef) {
  if (!window.homePos) return;
  const loader = new GLTFLoader();
  loader.load(window.getAssetUrl('models/pirates_assets/SM_Prop_Chest_Treasure_01.glb'), function (gltf) {
    const pierChest = gltf.scene;
    pierChest.position.set(8, 1.5, -99);
    pierChest.scale.set(250, 250, 250);
    sceneRef.add(pierChest);
    window.eogChestAtPier = pierChest;
  });
  loader.load(window.getAssetUrl('models/pirates_assets/SM_Prop_Chest_Lid_01.glb'), function (gltf) {
    const lid = gltf.scene;
    lid.position.set(8, 1.5, -99);
    lid.scale.set(250, 250, 250);
    sceneRef.add(lid);
    window.chestLidModel = lid;
  });
  setTimeout(function () {
    if (typeof startEogFadeAndVideo === 'function') startEogFadeAndVideo();
  }, 2000);
}

function playEogFanfare() {
  window.playSoundEffect(window.fanfareAudio);
}

function startEogFadeAndVideo() {
  const fadeEl = document.getElementById('eog-fade-overlay');
  if (fadeEl) {
    fadeEl.style.opacity = '1';
    setTimeout(function () {
      startEogVideo();
    }, 1200);
  } else {
    startEogVideo();
  }
}

function startEogVideo() {
  window.eogState = 'VIDEO';
  const overlay = document.getElementById('eog-video-overlay');
  const video = document.getElementById('eog-video');
  if (overlay && video) {
    video.muted = true;
    video.currentTime = 0;
    video.playbackRate = 1.0;
    overlay.style.display = 'flex';
    var playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(function (e) {
        overlay.style.cursor = 'pointer';
        overlay.addEventListener('click', function onceClick() {
          video.play();
          overlay.removeEventListener('click', onceClick);
        }, { once: true });
      });
    }
    video.onended = function () {
      window.eogState = 'DONE';
      overlay.style.display = 'none';
      const fadeEl = document.getElementById('eog-fade-overlay');
      if (fadeEl) fadeEl.style.opacity = '0';

      // Visszatérés a 3D móló nézethez nyitott ládával + 2 mp várakozás
      if (window.eogChestAtPier) {
        window.eogChestAtPier.visible = true;
      }

      setTimeout(function () {
        window.startEogBoatNamingRoutine();
      }, 2000);
    };
  }
}

// ─── END RUTIN LOGIKA (NÉVADÁS, MEGERŐSÍTÉSEK, İRÓGÉP, MAINMENU) ───

window.eogBoatName = '';

window.startEogBoatNamingRoutine = function () {
  window.isWindActive = false; // Szél leállítása a névadó és az azt követő paneleknél
  const namingOverlay = document.getElementById('eog-boat-naming-overlay');
  const nameInput = document.getElementById('eog-boat-name-input');
  if (!namingOverlay || !nameInput) return;

  nameInput.value = '';
  namingOverlay.style.display = 'flex';

  const btnSubmit = document.getElementById('eog-btn-naming-submit');
  const btnCancel = document.getElementById('eog-btn-naming-cancel');

  btnSubmit.onclick = function () {
    const val = nameInput.value.trim();
    if (!val) {
      alert('Kérlek, adj meg egy nevet a csónaknak!');
      return;
    }
    window.eogBoatName = val;
    namingOverlay.style.display = 'none';
    window.showEogConfirm1();
  };

  btnCancel.onclick = function () {
    namingOverlay.style.display = 'none';
    window.showEogConfirm2();
  };
};

window.showEogConfirm1 = function () {
  const c1 = document.getElementById('eog-confirm-overlay-1');
  if (!c1) return;
  c1.style.display = 'flex';

  document.getElementById('eog-btn-confirm-yes').onclick = function () {
    c1.style.display = 'none';
    window.proceedEogAuthCheck();
  };

  document.getElementById('eog-btn-confirm-no').onclick = function () {
    c1.style.display = 'none';
    window.startEogBoatNamingRoutine();
  };
};

window.showEogConfirm2 = function () {
  const c2 = document.getElementById('eog-confirm-overlay-2');
  if (!c2) return;
  c2.style.display = 'flex';

  document.getElementById('eog-btn-noidea').onclick = function () {
    c2.style.display = 'none';
    const user = window.getLoggedInUserData();
    let baseUser = user.name || 'Kaloz';
    const generatedName = baseUser.substring(0, 4) + '_boat01';
    window.eogBoatName = generatedName;
    window.showEogSummaryPanel();
  };

  document.getElementById('eog-btn-yesidea').onclick = function () {
    c2.style.display = 'none';
    window.startEogBoatNamingRoutine();
  };
};

window.proceedEogAuthCheck = function () {
  window.showEogSummaryPanel();
};

// Írógép effektus BriskB betűtípussal - Gyorsított, dinamikus megjelenítés (max 2-2.5s)
// FIX: buffer string + textContent, mert innerText visszaolvasás elnyeli a szóközöket!
function typewriterEffect(element, text, speed, onComplete) {
  element.textContent = '';
  let i = 0;
  let buffer = '';
  let isDone = false;
  const animSpeed = typeof speed === 'number' ? speed : Math.min(14, Math.max(8, Math.floor(1800 / Math.max(text.length, 1))));

  function finishInstantly() {
    if (isDone) return;
    isDone = true;
    element.textContent = text;
    if (onComplete) onComplete();
  }

  // Kattintással azonnal befejezhető és átugorható az animáció
  if (element.parentElement) {
    element.parentElement.addEventListener('click', finishInstantly, { once: true });
  }

  function typeChar() {
    if (isDone) return;
    if (i < text.length) {
      buffer += text.charAt(i);
      element.textContent = buffer;
      i++;
      setTimeout(typeChar, animSpeed);
    } else {
      isDone = true;
      if (onComplete) onComplete();
    }
  }
  typeChar();
}

// Konfigurálható kincsek nevei (JSON/táblázatból tölthető)
window.eogTreasureConfig = window.eogTreasureConfig || {
  scrollName: 'Letter-tenger Tekercse'
};

window.showEogSummaryPanel = function () {
  const summaryOverlay = document.getElementById('eog-summary-overlay');
  const summaryTextEl = document.getElementById('eog-summary-text');
  const btnNext = document.getElementById('eog-btn-summary-next');
  if (!summaryOverlay || !summaryTextEl) return;

  // A gombot elrejtjük gépelés előtt
  if (btnNext) btnNext.style.visibility = 'hidden';

  summaryOverlay.style.display = 'flex';

  const bName = window.eogBoatName || 'Névtelen csónak';
  const mCount = window.storedMembranes || 30;

  const fullSummary =
    `Megszerzett kincsek:\n` +
    `${mCount} db hártya\n` +
    `1 db Hebok térkép\n` +
    `10 kalózkredit\n` +
    `1 db tekercs\n` +
    `1 db csónak, név: ${bName}`;

  typewriterEffect(summaryTextEl, fullSummary, 12, function () {
    if (btnNext) {
      btnNext.style.visibility = 'visible';
      btnNext.onclick = function (e) {
        e.stopPropagation();
        summaryOverlay.style.display = 'none';

        // --- AZONNALI ZÁRÓ FELDOLGOZÁS ÉS FELÍRÁS ---
        window.showEogFinalPanel();
      };
    }
  });
};

// --- VETERÁN KALÓZ ELLENŐRZÉS ÉS VISSZAJELZÉS ---
window.checkIfUserIsVeteran = function () {
  const saveRaw = localStorage.getItem('ebp_tutorial_save') || localStorage.getItem('ebook_pirates_game_state');
  if (saveRaw) {
    try {
      const s = JSON.parse(saveRaw);
      if (s && s.completed === true) return true;
    } catch (e) { }
  }
  const userProfRaw = localStorage.getItem('ebp_user_profile');
  if (userProfRaw) {
    try {
      const u = JSON.parse(userProfRaw);
      if (u && (u.Tutorial_oldal === 1 || u.Tutorial_oldal === 'ok' || u.csonak_nev || u.boatName)) return true;
    } catch (e) { }
  }
  return false;
};

window.showEogVeteranPanel = function () {
  const veteranOverlay = document.getElementById('eog-veteran-user-overlay');
  const veteranTextEl = document.getElementById('eog-veteran-text');
  const veteranMsg = "Te már tapasztalt tengeri zsivány vagy, ezeket a kincseket már megkaptad korábban! Menj vissza Hebokba!";

  if (veteranTextEl) {
    veteranTextEl.innerText = veteranMsg;
  }

  if (veteranOverlay) {
    veteranOverlay.style.display = 'flex';
    window.isCutscenePlaying = true;

    const btnContinue = document.getElementById('eog-btn-veteran-continue');
    if (btnContinue) {
      btnContinue.innerText = "OK (Vissza Hebokba)";
      btnContinue.onclick = function (e) {
        e.stopPropagation();
        veteranOverlay.style.display = 'none';
        window.isCutscenePlaying = false;
        if (window.parent && window.parent !== window) {
          window.parent.postMessage({
            type: 'EBOOK_PIRATES_TUTORIAL',
            action: 'navigate_to_page',
            page: 'kikoto_oldal'
          }, '*');
        } else {
          window.location.href = 'MainMenuTutorial.html';
        }
      };
    }

    const btnExit = document.getElementById('eog-btn-veteran-exit');
    if (btnExit) {
      btnExit.style.display = 'none';
    }
  } else {
    alert(veteranMsg);
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'EBOOK_PIRATES_TUTORIAL',
        action: 'navigate_to_page',
        page: 'kikoto_oldal'
      }, '*');
    } else {
      window.location.href = 'MainMenuTutorial.html';
    }
  }
};

window.showEogFinalPanel = function () {
  // Ha a játékos már korábban elvégezte a tutorialt -> Veterán panel felugrása
  if (window.checkIfUserIsVeteran && window.checkIfUserIsVeteran()) {
    window.showEogVeteranPanel();
    return;
  }

  // 1. Végleges mentés LocalStorage-ba
  const bName = window.eogBoatName || 'Gyöngyhalász';
  const finalHartya = (typeof window.storedMembranes === 'number' && window.storedMembranes > 0) ? window.storedMembranes : ((typeof window.totalPickedUp === 'number' && window.totalPickedUp > 0) ? window.totalPickedUp : 30);

  const finalSaveState = {
    completed: true,
    boatName: bName,
    storedMembranes: finalHartya,
    totalPickedUp: finalHartya,
    timestamp: Date.now()
  };
  localStorage.setItem('ebp_tutorial_save', JSON.stringify(finalSaveState));
  localStorage.setItem('ebook_pirates_game_state', JSON.stringify(finalSaveState));

  // 2. PostMessage küldése a szülő keret (app.js -> backend parancsnoki_hid.js) felé a táblázatos jóváíráshoz!
  if (window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'EBOOK_PIRATES_TUTORIAL',
      action: 'tutorial_completed',
      score: finalHartya,
      storedMembranes: finalHartya,
      totalPickedUp: finalHartya,
      passed: true,
      boatName: bName
    }, '*');
  }

  // 3. Azonnal megjelenítjük a 3-gombos visszajelző panelt ("Kincseid felírásra kerültek...")!
  window.showEogSuccessChoicePanel();
};

// --- KINCSEK SIKERES FELÍRÁSA VISSZAJELZŐ ÉS VÁLASZTÓ PANEL ---
window.showEogSuccessChoicePanel = function () {
  const choiceOverlay = document.getElementById('eog-success-choice-overlay');
  if (!choiceOverlay) return;

  choiceOverlay.style.display = 'flex';
  window.isCutscenePlaying = true;
};

// --- EoG Path Editor ---
window.showEogPathEditor = function (sceneRef, boatRef) {
  if (document.getElementById('eog-path-editor')) return;

  if (!window.eogCinematicWaypoints) {
    window.eogCinematicWaypoints = [
      { x: -433.0, y: 0, z: 1207.3 },
      { x: -477.9, y: 0, z: 1075.3 },
      { x: -492.7, y: 0, z: 1038.3 },
      { x: -479.3, y: 0, z: 969.0 },
      { x: -440.6, y: 0, z: 750.6 },
      { x: -429.3, y: 0, z: 735.9 },
      { x: -373.7, y: 0, z: 618.8 },
      { x: -189.4, y: 0, z: 553.2 },
      { x: -106.7, y: 0, z: 391.3 },
      { x: -62.6, y: 0, z: 271.3 },
      { x: -37.5, y: 0, z: 120.4 },
      { x: -20.1, y: 0, z: 48.4 },
      { x: 14.4, y: 0, z: -79.4 },
      { x: 4.6, y: 0, z: -94.7 }
    ];
  }

  const container = document.createElement('div');
  container.id = 'eog-path-editor';
  container.style.position = 'fixed';
  container.style.top = '50px';
  container.style.right = '10px';
  container.style.background = 'rgba(20,20,20,0.95)';
  container.style.color = '#fff';
  container.style.padding = '15px';
  container.style.zIndex = '999999';
  container.style.maxHeight = '90vh';
  container.style.overflowY = 'auto';
  container.style.fontFamily = 'monospace';
  container.style.border = '2px solid #0ff';
  container.style.borderRadius = '8px';

  let html = '<h3 style="margin-top:0; color:#0ff;">EoG Path Editor</h3>';
  window.eogCinematicWaypoints.forEach((wp, idx) => {
    html += `<div style="margin-bottom:10px;">
      <b style="color:#ff0;">Point ${idx + 1}</b><br/>
      X: <input type="range" id="eog_wp_${idx}_x" min="${wp.x - 400}" max="${wp.x + 400}" step="1" value="${wp.x}"> <span id="val_x_${idx}" style="color:#0f0">${wp.x}</span><br/>
      Z: <input type="range" id="eog_wp_${idx}_z" min="${wp.z - 400}" max="${wp.z + 400}" step="1" value="${wp.z}"> <span id="val_z_${idx}" style="color:#0f0">${wp.z}</span>
    </div><hr style="border-color:#444;"/>`;
  });
  html += '<button id="eog_copy_btn" style="padding:8px;background:#0a0;color:#fff;font-weight:bold;cursor:pointer;border:none;border-radius:4px;">Kód Vágólapra</button>';
  html += '<button id="eog_close_btn" style="padding:8px;background:#a00;color:#fff;font-weight:bold;cursor:pointer;border:none;border-radius:4px;margin-left:10px;">Bezárás</button>';

  container.innerHTML = html;
  document.body.appendChild(container);
  window.isEogPathEditorActive = true;
  window.tempOrbitEnabled = true;

  if (typeof cam !== 'undefined') {
    cam.far = 3000;
    cam.position.set(-200, 800, 300);
    if (window.tempOrbit) {
      window.tempOrbit.target.set(-200, 0, 300);
      window.tempOrbit.update();
    }
    cam.updateProjectionMatrix();
  }

  if (typeof scene !== 'undefined') {
    window.savedEditorFog = scene.fog;
    scene.fog = null;
  }

  const spheres = [];
  const sphereGeo = new THREE.SphereGeometry(15, 16, 16);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });

  window.eogCinematicWaypoints.forEach(wp => {
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(wp.x, 0.5, wp.z);
    sceneRef.add(mesh);
    spheres.push(mesh);
  });

  const lineMat = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 3 });
  let pathLine = null;

  function updatePath() {
    if (pathLine) sceneRef.remove(pathLine);

    const startPos = boatRef ? boatRef.position.clone() : new THREE.Vector3(-580, 0, 1340);
    const pts = [startPos];
    window.eogCinematicWaypoints.forEach(wp => {
      pts.push(new THREE.Vector3(wp.x, 0, wp.z));
    });

    const curve = new THREE.CatmullRomCurve3(pts);
    if (window.eogState === 'CINEMATIC') {
      window.eogCinematicPath = curve;
    }
    const points = curve.getPoints(100);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    pathLine = new THREE.Line(geometry, lineMat);
    pathLine.position.y = 0.5;
    sceneRef.add(pathLine);
  }

  updatePath();

  window.eogCinematicWaypoints.forEach((wp, idx) => {
    document.getElementById(`eog_wp_${idx}_x`).addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      wp.x = val;
      document.getElementById(`val_x_${idx}`).innerText = val;
      spheres[idx].position.x = val;
      updatePath();
    });
    document.getElementById(`eog_wp_${idx}_z`).addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      wp.z = val;
      document.getElementById(`val_z_${idx}`).innerText = val;
      spheres[idx].position.z = val;
      updatePath();
    });
  });

  document.getElementById('eog_copy_btn').addEventListener('click', () => {
    let str = '    window.eogCinematicWaypoints = [\n';
    window.eogCinematicWaypoints.forEach(w => {
      str += `      { x: ${w.x}, y: 0, z: ${w.z} },\n`;
    });
    str += '    ];';
    navigator.clipboard.writeText(str);
    alert('Koordináták kimásolva a vágólapra! Kérlek küldd el nekem őket!');
  });

  document.getElementById('eog_close_btn').onclick = () => {
    spheres.forEach(s => sceneRef.remove(s));
    if (pathLine) sceneRef.remove(pathLine);
    document.body.removeChild(container);
    window.isEogPathEditorActive = false;
    window.tempOrbitEnabled = false;
    if (typeof cam !== 'undefined') {
      cam.far = 400;
      cam.updateProjectionMatrix();
    }
    if (typeof scene !== 'undefined' && window.savedEditorFog !== undefined) {
      scene.fog = window.savedEditorFog;
    }
  };
};

const btn = document.createElement('button');
btn.innerText = '🗺️ EoG Path Editor';
btn.style.position = 'fixed';
btn.style.top = '10px';
btn.style.left = '10px';
btn.style.zIndex = '999999';
btn.style.padding = '8px 12px';
btn.style.background = 'rgba(0, 0, 0, 0.7)';
btn.style.color = '#fff';
btn.style.border = '1px solid #0ff';
btn.style.borderRadius = '5px';
btn.style.cursor = 'pointer';
btn.style.display = 'none'; // Elrejtve - ha kell, console-ból: document.querySelector('[data-eog-editor]').style.display='block'
btn.setAttribute('data-eog-editor', 'true');
btn.onclick = () => {
  if (typeof scene !== 'undefined' && typeof boat !== 'undefined') {
    window.showEogPathEditor(scene, boat);
  } else {
    alert('A játék még nem töltött be teljesen!');
  }
};
document.body.appendChild(btn);