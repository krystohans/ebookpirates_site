import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Water } from 'three/addons/objects/Water.js';

// ============================================================================
// 1. GLOBÁLIS VÁLTOZÓK ÉS KONFIGURÁCIÓ (Unity_Tutorial_ThreeJS alapján)
// ============================================================================
const ASSET_BASE = './';

let scene, camera, renderer, water;
let playerBoat, fullTrack, enemyZeppelin, zeppelinLadder, hartyaTemplate;
let borderMeshes = [];
let activeMembranes = [];
let mangroveColliders = [];
let dockLanternLights = [];
let shantyLights = [];

let mainRockLantern, mainRockLanternLight, mainTargetRock, secondTargetRock;
let sunLight, skyDome;

// Játékállapot
let gameStarted = false;
let isGameOver = false;
let isQuizActive = false;
let isCutscenePlaying = false;
let carriedMembranes = 0;
let storedMembranes = 0;
let totalSpawnedCount = 0;
let hasSeenMonologs = [];
let currentWelcomeStep = 0;
let activeInGameMonologIndex = null;
let boatName = "Kalóz Ladik";

// Kezdőpont (MÓLÓ MELLETT - Unity_Tutorial_ThreeJS)
const HOME_POS = new THREE.Vector3(5, 0, -94);
const HOME_ROT_Y = Math.PI + (Math.PI / 4) - (3 * Math.PI / 180); // ~222 fok

// Fizika és Mozgás
const SPEED = 28.0;
const TURN = 45.0; // fok/sec
let boatRotY = HOME_ROT_Y;

// Kamera & Orbit (Unity_Tutorial_ThreeJS beállítások)
let orbH = 0.0;
let orbV = 15.0;
let orbDist = 26.0;
const ORB_MIN_V = 5.0, ORB_MAX_V = 90.0;
const ORB_SENS_H = 0.25, ORB_SENS_V = 0.2;
const LOOK_OFFSET_Y = 2.5;

let isAndroid = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
let mobileMode = 'boat'; // 'boat' vagy 'camera'

// Billentyűk
const keys = {
  w: false, a: false, s: false, d: false,
  arrowup: false, arrowdown: false, arrowleft: false, arrowright: false,
  space: false
};

// Léghajó (Zeppelin) állapot
let airshipState = 'SLEEP'; // 'SLEEP', 'ASCENT', 'PATROL', 'CHASE', 'DESCEND', 'RETREAT'
let airshipAscentDone = false;
const AIRSHIP_SPAWN_POS = new THREE.Vector3(-461, 35, 1350);

// Dialógusok és Kvízkérdések
let dialoguesData = { welcomeTexts: [], gameMonologues: {}, popups: {}, eogMonologues: {} };
let quizQuestions = [];

let clock = new THREE.Clock();

// ============================================================================
// 2. BETÖLTÉS ÉS PRELOADER
// ============================================================================
function updatePreloader(percent, text) {
  const bar = document.getElementById('preloader-bar');
  const txt = document.getElementById('preloader-text');
  if (bar) bar.style.width = percent + '%';
  if (txt) txt.innerText = text + ' (' + Math.round(percent) + '%)';
}

function hidePreloader() {
  const overlay = document.getElementById('preloader-overlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; }, 600);
  }
}

async function loadDataFiles() {
  try {
    const dRes = await fetch('dialogues.json');
    if (dRes.ok) dialoguesData = await dRes.json();
  } catch (e) {
    console.warn('dialogues.json betöltési figyelmeztetés:', e);
  }

  try {
    const qRes = await fetch('quiz_questions.json');
    if (qRes.ok) quizQuestions = await qRes.json();
  } catch (e) {
    console.warn('quiz_questions.json betöltési figyelmeztetés:', e);
  }
}

// ============================================================================
// 3. THREE.JS JELENET ÉS MEGVILÁGÍTÁS (Unity_Tutorial_ThreeJS)
// ============================================================================
async function initEngine() {
  updatePreloader(10, 'Jelenet és fények inicializálása...');

  const canvas = document.getElementById('c');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = false;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x7ec8e8);
  scene.fog = new THREE.FogExp2(0x7ec8e8, 0.0025);

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.5, 600);

  // Fények
  scene.add(new THREE.AmbientLight(0x8ab4d0, 0.65));
  sunLight = new THREE.DirectionalLight(0xfff4d6, 1.4);
  sunLight.position.set(2200, 150, 1350);
  scene.add(sunLight);

  const mountainLight = new THREE.DirectionalLight(0xffeedd, 0.7);
  mountainLight.position.set(-900, 1500, 600);
  scene.add(mountainLight);

  scene.add(new THREE.HemisphereLight(0x87ceeb, 0x305030, 0.45));

  // SkyDome
  const sg = new THREE.SphereGeometry(950, 32, 16);
  const cols = [];
  const sp = sg.getAttribute('position');
  for (let i = 0; i < sp.count; i++) {
    const t = (sp.getY(i) / 950 + 1) * 0.5;
    cols.push(
      THREE.MathUtils.lerp(0.92, 0.35, t),
      THREE.MathUtils.lerp(0.78, 0.58, t),
      THREE.MathUtils.lerp(0.55, 0.88, t)
    );
  }
  sg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  skyDome = new THREE.Mesh(sg, new THREE.MeshBasicMaterial({ side: THREE.BackSide, vertexColors: true }));
  scene.add(skyDome);

  // Vízfelszín
  updatePreloader(25, 'Vízfelszín generálása...');
  const waterGeometry = new THREE.PlaneGeometry(2400, 2400);
  const textureLoader = new THREE.TextureLoader();
  const waterNormals = textureLoader.load(ASSET_BASE + 'models/waternormals.jpg', function (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  });

  water = new Water(waterGeometry, {
    textureWidth: 256,
    textureHeight: 256,
    waterNormals: waterNormals,
    sunDirection: sunLight.position.clone().normalize(),
    sunColor: 0xffffff,
    waterColor: 0x1476a6,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  });
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0;
  scene.add(water);

  // Tengerfenék
  const seabed = new THREE.Mesh(
    new THREE.PlaneGeometry(2400, 2400),
    new THREE.MeshLambertMaterial({ color: 0x0e2a1e })
  );
  seabed.rotation.x = -Math.PI / 2;
  seabed.position.y = -18;
  scene.add(seabed);

  // 3D Modellek Betöltése
  await load3DModels();
}

// ============================================================================
// 4. 3D MODELLEK ÉS PÁLYA BETÖLTÉSE (Unity_Tutorial_ThreeJS)
// ============================================================================
async function load3DModels() {
  const loader = new GLTFLoader();

  const loadGLTF = (url, progressWeight, startP, name) => {
    return new Promise((resolve) => {
      loader.load(url, (gltf) => {
        resolve(gltf.scene);
      }, (xhr) => {
        if (xhr.total > 0) {
          const p = startP + (xhr.loaded / xhr.total) * progressWeight;
          updatePreloader(p, name + ' betöltése...');
        }
      }, (err) => {
        console.error('Hiba modell betöltésekor:', url, err);
        resolve(new THREE.Group());
      });
    });
  };

  // 1. Pálya modell (FullTrack_Small.glb)
  updatePreloader(35, 'Öböl és sziget betöltése...');
  fullTrack = await loadGLTF(ASSET_BASE + 'models/FullTrack_Small.glb', 25, 35, 'Kalózöböl');
  fullTrack.scale.set(1, 1, -1);
  fullTrack.position.y = 1.5;
  scene.add(fullTrack);
  fullTrack.updateMatrixWorld(true);

  // Móló és házak méretezése (1.8x)
  const dockCenter = new THREE.Vector3(255, -3, -225);
  let foundZeppelin = null;

  fullTrack.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = false;
      child.receiveShadow = false;
      child.frustumCulled = true;

      const name = (child.name || '').toLowerCase();
      const wPos = new THREE.Vector3();
      child.getWorldPosition(wPos);

      // Kezdőpont közeli fák elrejtése
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
      }

      if (!foundZeppelin && name.includes("airship")) {
        foundZeppelin = child;
      }

      // Akadályok gyűjtése
      let isRock = name.includes("rock") || name.includes("stone") || name.includes("cliff");
      let isBeach = name.includes("beach") || name.includes("part");
      let isBorder = name.includes("border");

      if (isBorder) {
        child.visible = false;
        borderMeshes.push(child);
      } else if (isRock || isBeach) {
        child.userData = { obstacleType: isBeach ? 'beach' : 'rock' };
        borderMeshes.push(child);
      }
    }
  });

  // Sziklák és Sziklalámpás eltolásai
  setupLanternsAndRockOffsets();

  // 7 db Móló & Shanty BoxCollider építése
  setupMangroveColliders();

  // Pálya széli határoló falak
  setupBoundaryWalls();

  // 2. Csónak (boat.glb) - PONTOS SKÁLÁZÁS: 30x (Unity_Tutorial_ThreeJS)
  updatePreloader(65, 'Játékos csónakjának építése...');
  playerBoat = new THREE.Group();
  playerBoat.position.copy(HOME_POS);
  playerBoat.rotation.y = HOME_ROT_Y;
  boatRotY = HOME_ROT_Y;
  scene.add(playerBoat);

  const boatGLTF = await loadGLTF(ASSET_BASE + 'models/boat.glb', 15, 65, 'Csónak modell');
  boatGLTF.scale.set(30, 30, 30);
  boatGLTF.rotation.y = Math.PI;
  boatGLTF.updateMatrixWorld(true);

  // Bounding box szerinti pontos középre helyezés
  const bBox = new THREE.Box3().setFromObject(boatGLTF);
  const bSize = bBox.getSize(new THREE.Vector3());
  const bCenter = bBox.getCenter(new THREE.Vector3());

  boatGLTF.position.x = -bCenter.x;
  boatGLTF.position.z = -bCenter.z;
  boatGLTF.position.y = -bBox.min.y - (bSize.y * 0.02);

  playerBoat.add(boatGLTF);
  boatGLTF.updateMatrixWorld(true);

  // 3. Hártya modell (hartya.glb) - DERENGŐ ÁTTETSZŐ ARANY MATERIÁLLAL
  updatePreloader(82, 'Hártyák és kincsek felkészítése...');
  const hScene = await loadGLTF(ASSET_BASE + 'models/hartya.glb', 8, 82, 'Hártya');
  hartyaTemplate = hScene;
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

  // 4. Léghajó (FantasyShip_v2.glb vagy pálya Zeppelin)
  updatePreloader(90, 'Léghajó felkészítése...');
  if (foundZeppelin) {
    enemyZeppelin = foundZeppelin;
    scene.add(enemyZeppelin);
    enemyZeppelin.position.copy(AIRSHIP_SPAWN_POS);
    enemyZeppelin.lookAt(HOME_POS.x, 35, HOME_POS.z);
    enemyZeppelin.scale.set(1, 1, 1);
  } else {
    enemyZeppelin = await loadGLTF(ASSET_BASE + 'models/FantasyShip_v2.glb', 8, 90, 'Léghajó');
    enemyZeppelin.position.copy(AIRSHIP_SPAWN_POS);
    enemyZeppelin.lookAt(HOME_POS.x, 35, HOME_POS.z);
    enemyZeppelin.scale.set(3.2, 3.2, 3.2);
    scene.add(enemyZeppelin);
  }

  // 5. 0. ponti hártya a nyílt vízen (0, 0, 0)
  spawnZeroPointMembrane();

  updatePreloader(100, 'Kész! Vitorlát fel!');
  setTimeout(() => {
    hidePreloader();
    checkSavedStateOrStart();
  }, 400);
}

// ============================================================================
// 5. SZIKLÁK, LÁMPÁSOK ÉS COLLIDEREK (Unity_Tutorial_ThreeJS)
// ============================================================================
function setupLanternsAndRockOffsets() {
  // Sziklalámpás
  mainRockLanternLight = new THREE.PointLight(0xffaa22, 3500.0, 550.0, 2.0);
  mainRockLanternLight.position.set(-10, 11.9, -83.5);
  scene.add(mainRockLanternLight);

  // Móló kislámpások
  const sl1 = new THREE.PointLight(0xffaa33, 140, 100);
  sl1.position.set(14.5, 2.3, -97.4);
  scene.add(sl1);
  dockLanternLights.push(sl1);

  const sl2 = new THREE.PointLight(0xffaa33, 140, 100);
  sl2.position.set(8.4, 2.2, -103.9);
  scene.add(sl2);
  dockLanternLights.push(sl2);

  // Shanty házak fényei
  const sh1 = new THREE.PointLight(0xff9933, 90, 35);
  sh1.position.set(16.58, 7.60, -127.19);
  scene.add(sh1);
  shantyLights.push(sh1);

  const sh2 = new THREE.PointLight(0xff9933, 90, 35);
  sh2.position.set(-576.45, 5.71, 1319.10);
  scene.add(sh2);
  shantyLights.push(sh2);
}

function setupMangroveColliders() {
  const collidersData = [
    { id: 0, posX: -17.0, posY: 2.0, posZ: -120.0, sizeX: 19.5, sizeY: 4.0, sizeZ: 9.0, rotY: -42 },
    { id: 1, posX: 18.5, posY: 2.0, posZ: -131.0, sizeX: 25.5, sizeY: 4.0, sizeZ: 13.5, rotY: 48 },
    { id: 2, posX: -6.5, posY: 2.0, posZ: -122.0, sizeX: 7.5, sizeY: 4.0, sizeZ: 14.5, rotY: 35 },
    { id: 3, posX: -2.5, posY: 2.0, posZ: -120.0, sizeX: 9.5, sizeY: 4.0, sizeZ: 20.5, rotY: 125 },
    { id: 4, posX: 9.5, posY: 2.0, posZ: -98.5, sizeX: 7.5, sizeY: 4.0, sizeZ: 10.0, rotY: 45 },
    { id: 5, posX: -0.5, posY: 2.0, posZ: -106.0, sizeX: 16.0, sizeY: 4.0, sizeZ: 3.3, rotY: -44 },
    { id: 6, posX: 9.0, posY: 2.0, posZ: -118.5, sizeX: 5.5, sizeY: 4.0, sizeZ: 13.5, rotY: 118 }
  ];

  collidersData.forEach(data => {
    const geo = new THREE.BoxGeometry(data.sizeX, data.sizeY, data.sizeZ);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(data.posX, data.posY, data.posZ);
    mesh.rotation.y = data.rotY * (Math.PI / 180);
    mesh.userData = { obstacleType: 'homepoint', id: data.id, config: data };
    mesh.visible = false;

    scene.add(mesh);
    borderMeshes.push(mesh);
    mangroveColliders.push(mesh);
  });
}

function setupBoundaryWalls() {
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
}

// ============================================================================
// 6. HÁRTYÁK (MEMBRANES) LOGIKA
// ============================================================================
function createMembraneMesh(x, y, z) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  if (hartyaTemplate) {
    const hartyaModel = hartyaTemplate.clone(true);
    hartyaModel.position.set(0, 0.5, 0);
    group.add(hartyaModel);
  } else {
    const coreGeo = new THREE.SphereGeometry(0.85, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffc800, transparent: true, opacity: 0.45, depthWrite: false });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.5;
    group.add(coreMesh);
  }

  const candleLight = new THREE.PointLight(0xffaa33, 3.5, 20);
  candleLight.position.set(0, 0.8, 0);
  group.add(candleLight);

  group.userData = { isMembrane: true, collected: false, baseY: y };
  return group;
}

function spawnZeroPointMembrane() {
  activeMembranes.forEach(m => scene.remove(m));
  activeMembranes = [];

  // 0. hártya a nyílt vízen (0, 0, 0)
  const firstM = createMembraneMesh(0, 0.1, 0);
  scene.add(firstM);
  activeMembranes.push(firstM);
  totalSpawnedCount = 1;
}

function spawnHartyaWave(count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 45 + Math.random() * 75;
    const hx = HOME_POS.x + Math.cos(angle) * radius;
    const hz = HOME_POS.z + Math.sin(angle) * radius;

    const m = createMembraneMesh(hx, 0.1, hz);
    scene.add(m);
    activeMembranes.push(m);
    totalSpawnedCount++;
  }
}

// ============================================================================
// 7. FIZIKA ÉS IRÁNYVEKTOROS ÜTKÖZÉSVIZSGÁLAT (Demójáték Engine)
// ============================================================================
function updatePhysics(dt) {
  if (!playerBoat || isQuizActive || !gameStarted) return;

  const prevPos = playerBoat.position.clone();

  let mv = 0; // Előre / Hátra
  let tr = 0; // Kormányzás

  if (keys.w || keys.arrowup) mv += 1.0;
  if (keys.s || keys.arrowdown) mv -= 0.6;
  if (keys.a || keys.arrowleft) tr += 1.0;
  if (keys.d || keys.arrowright) tr -= 1.0;

  if (Math.abs(mv) > 0.01 && dt > 0) {
    const dir = mv < 0 ? -1 : 1;
    boatRotY -= tr * dir * (TURN * Math.PI / 180) * dt;
    playerBoat.rotation.y = boatRotY;

    let spd = SPEED;
    if (mv < 0) spd *= 0.5;

    const fwd = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), boatRotY);
    const step = fwd.clone().multiplyScalar(mv * spd * dt);
    playerBoat.position.add(step);
  } else if (Math.abs(tr) > 0.01 && dt > 0) {
    boatRotY -= tr * (TURN * Math.PI / 180) * dt;
    playerBoat.rotation.y = boatRotY;
  }

  // Ringás
  const time = performance.now() * 0.002;
  playerBoat.rotation.z = Math.sin(time * 2.0) * 0.025;
  playerBoat.position.y = Math.sin(time * 1.5) * 0.06;

  // Irányvektoros (Dot-Product) és BoxCollider Ütközésvizsgálat
  checkBoatCollisions(prevPos, mv);

  // Hártyák és Móló ellenőrzése
  checkMembranesPickup();
  checkDockArrival();

  // Léghajó AI
  updateAirship(dt);

  // Kamera követése
  updateCamera();
}

function checkBoatCollisions(prevPos, mv) {
  const boatPos = playerBoat.position;
  let collisionBlocked = false;

  // 1. Móló & Mangrove Colliderek vizsgálata
  for (let box of mangroveColliders) {
    const cfg = box.userData.config;
    const halfX = cfg.sizeX / 2 + 1.8;
    const halfZ = cfg.sizeZ / 2 + 1.8;

    const dx = boatPos.x - box.position.x;
    const dz = boatPos.z - box.position.z;
    const angle = -box.rotation.y;

    const localX = Math.cos(angle) * dx - Math.sin(angle) * dz;
    const localZ = Math.sin(angle) * dx + Math.cos(angle) * dz;

    if (Math.abs(localX) < halfX && Math.abs(localZ) < halfZ) {
      playerBoat.position.copy(prevPos);
      collisionBlocked = true;
      break;
    }
  }

  // 2. Sziklák és Partok (Dot-Product közeledés vizsgálat)
  if (!collisionBlocked && Math.abs(mv) > 0.01) {
    for (let obs of borderMeshes) {
      if (obs.userData && obs.userData.obstacleType === 'rock') {
        const wp = new THREE.Vector3();
        obs.getWorldPosition(wp);
        const dist2D = Math.hypot(boatPos.x - wp.x, boatPos.z - wp.z);

        if (dist2D < 12.0) {
          const moveDir = new THREE.Vector3().subVectors(boatPos, prevPos).normalize();
          const toObs = new THREE.Vector3(wp.x - prevPos.x, 0, wp.z - prevPos.z).normalize();
          const dot = moveDir.dot(toObs);

          if (dot > 0) {
            playerBoat.position.copy(prevPos);
            showPopupToast("A partra nem kéne felfutni!");
            break;
          }
        }
      }
    }
  }
}

// ============================================================================
// 8. KAMERA KÖVETÉS & EGÉR/ÉRINTÉS ORBIT (Unity_Tutorial_ThreeJS)
// ============================================================================
function updateCamera() {
  if (!playerBoat) return;

  // Android lerp befordulás a csónak mögé (kormányzás módban)
  if (isAndroid && mobileMode === 'boat') {
    orbH = 0.0;
  }

  const radH = (playerBoat.rotation.y + (orbH * Math.PI / 180));
  const radV = (orbV * Math.PI / 180);

  const cx = playerBoat.position.x + Math.sin(radH) * Math.cos(radV) * orbDist;
  const cy = playerBoat.position.y + Math.sin(radV) * orbDist + LOOK_OFFSET_Y;
  const cz = playerBoat.position.z + Math.cos(radH) * Math.cos(radV) * orbDist;

  camera.position.set(cx, cy, cz);
  camera.lookAt(playerBoat.position.x, playerBoat.position.y + LOOK_OFFSET_Y, playerBoat.position.z);
}

// Egér és érintéses Orbit kameravezérlés
function setupCameraControls() {
  const canvas = document.getElementById('c');
  let mDown = false, mx = 0, my = 0;

  canvas.addEventListener('mousedown', e => {
    mDown = true;
    mx = e.clientX;
    my = e.clientY;
    canvas.style.cursor = 'grabbing';
  });

  window.addEventListener('mouseup', () => {
    mDown = false;
    canvas.style.cursor = 'grab';
  });

  window.addEventListener('mousemove', e => {
    if (!mDown || !gameStarted) return;
    orbH = THREE.MathUtils.clamp(orbH + (e.clientX - mx) * ORB_SENS_H, -45.0, 45.0);
    orbV = THREE.MathUtils.clamp(orbV + (e.clientY - my) * ORB_SENS_V, ORB_MIN_V, ORB_MAX_V);
    mx = e.clientX;
    my = e.clientY;
  });
}

// ============================================================================
// 9. HÁRTYAGYŰJTÉS ÉS MÓLÓ LEADÁS
// ============================================================================
function checkMembranesPickup() {
  for (let i = activeMembranes.length - 1; i >= 0; i--) {
    const m = activeMembranes[i];
    const dist = playerBoat.position.distanceTo(m.position);
    if (dist < 4.5) {
      scene.remove(m);
      activeMembranes.splice(i, 1);
      carriedMembranes++;
      updateTopBar();

      if (carriedMembranes === 1 && storedMembranes === 0) {
        showInGameMonolog(2);
        showPopupToast("Hártya begyűjtve! Vidd vissza a bázisra!");
      } else {
        showPopupToast("Ezt felszedtük!");
      }

      saveTutorialState();
    }
  }
}

function checkDockArrival() {
  const dist = playerBoat.position.distanceTo(HOME_POS);
  if (dist < 14.0 && carriedMembranes > 0) {
    storedMembranes += carriedMembranes;
    carriedMembranes = 0;
    updateTopBar();
    showPopupToast("Kipakoltam, mehetünk tovább!");

    if (storedMembranes === 1) {
      showInGameMonolog(3);
      spawnHartyaWave(5);
    } else if (storedMembranes >= 5 && airshipState === 'SLEEP') {
      airshipState = 'ASCENT';
      showInGameMonolog(9);
      spawnHartyaWave(8);
    } else if (storedMembranes >= 10) {
      triggerEndOfGame();
    }

    saveTutorialState(true);
  }
}

function updateTopBar() {
  const cEl = document.getElementById('tb-carried-count');
  const sEl = document.getElementById('tb-stored-count');
  if (cEl) cEl.innerText = carriedMembranes;
  if (sEl) sEl.innerText = storedMembranes;
}

// ============================================================================
// 10. LÉGHAJÓ (AIRSHIP) AI ÉS KVÍZ
// ============================================================================
function updateAirship(dt) {
  if (!enemyZeppelin || airshipState === 'SLEEP') return;

  const bPos = playerBoat.position;

  if (airshipState === 'ASCENT') {
    if (enemyZeppelin.position.y < 40.0) {
      enemyZeppelin.position.y += 10.0 * dt;
    } else {
      airshipState = 'PATROL';
    }
  } else if (airshipState === 'PATROL') {
    enemyZeppelin.position.x += 8.0 * dt;
    enemyZeppelin.lookAt(bPos.x, 40.0, bPos.z);
    if (carriedMembranes > 0 && playerBoat.position.distanceTo(HOME_POS) > 40) {
      airshipState = 'CHASE';
    }
  } else if (airshipState === 'CHASE') {
    const dir = new THREE.Vector3(bPos.x - enemyZeppelin.position.x, 0, bPos.z - enemyZeppelin.position.z);
    const dist = dir.length();
    dir.normalize();

    enemyZeppelin.position.add(dir.multiplyScalar(16.0 * dt));
    enemyZeppelin.lookAt(bPos.x, enemyZeppelin.position.y, bPos.z);

    if (dist < 18.0) {
      airshipState = 'DESCEND';
    }
  } else if (airshipState === 'DESCEND') {
    enemyZeppelin.position.x = bPos.x;
    enemyZeppelin.position.z = bPos.z;
    if (enemyZeppelin.position.y > 22.0) {
      enemyZeppelin.position.y -= 8.0 * dt;
    } else {
      airshipState = 'QUIZ';
      triggerAirshipQuiz();
    }
  } else if (airshipState === 'RETREAT') {
    const retreatDir = new THREE.Vector3(enemyZeppelin.position.x - bPos.x, 0, enemyZeppelin.position.z - bPos.z).normalize();
    enemyZeppelin.position.add(retreatDir.multiplyScalar(25.0 * dt));
    enemyZeppelin.position.y = Math.min(45.0, enemyZeppelin.position.y + 5.0 * dt);

    if (enemyZeppelin.position.distanceTo(bPos) > 250) {
      airshipState = 'PATROL';
    }
  }
}

function triggerAirshipQuiz() {
  isQuizActive = true;

  const overlay = document.getElementById('quiz-overlay');
  const qText = document.getElementById('quiz-question-text');
  const ansContainer = document.getElementById('quiz-answers-container');

  if (!overlay || !qText || !ansContainer) return;

  const q = quizQuestions.find(item => item.category === 'TUTORZEP') || quizQuestions[0] || {
    question: "Mivel hajtják a kalózok a ladikot?",
    answers: ["Vitorlával és evezővel", "Gőzturbinával", "Atomerővel", "Varázslattal"],
    correctIndex: 0
  };

  qText.innerHTML = q.question;
  ansContainer.innerHTML = '';

  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-ans-btn';
    btn.innerText = String.fromCharCode(65 + idx) + ') ' + ans;
    btn.onclick = () => {
      overlay.style.display = 'none';
      isQuizActive = false;

      if (idx === (q.correctIndex || 0)) {
        showPopupToast("Megvédted a hártyáidat!");
      } else {
        carriedMembranes = 0;
        updateTopBar();
        showPopupToast("A légi kalózok elvitték a hártyáidat!");
      }

      airshipState = 'RETREAT';
      saveTutorialState(true);
    };
    ansContainer.appendChild(btn);
  });

  overlay.style.display = 'flex';
}

// ============================================================================
// 11. ZOZÓ DIALÓGUSOK ÉS SZÖVEGDOBOZOK (Space / Kattintás / Vissza-nyíl)
// ============================================================================
function showWelcomeStep(step) {
  currentWelcomeStep = step;
  const overlay = document.getElementById('zozo-welcome-overlay');
  const txt = document.getElementById('zozo-dialogue-text');
  const backBtn = document.getElementById('welcome-back-btn');

  if (!overlay || !txt) return;

  document.body.className = `welcome-mode step-${step}`;

  const texts = dialoguesData.welcomeTexts || [
    "Na, te vagy az új jövevény? Egy Szárazföldi Patkány?",
    "Olvasnivalót akarsz a Könyvtárba? Hát, barátom, itt nem a kész könyvek lebegnek ám a vízben!",
    "Ide figyelj, Patkány! Ha betűt akarsz látni, azért meg kell dolgozni.",
    "Megmutatom, miből élünk mi, parti népek. Szállj be! Nincs rád egy egész napom!"
  ];

  txt.innerText = texts[step] || texts[0];
  if (backBtn) backBtn.style.display = step > 0 ? 'flex' : 'none';
  overlay.style.display = 'flex';
}

function nextWelcomeStep() {
  const texts = dialoguesData.welcomeTexts || [0, 1, 2, 3];
  if (currentWelcomeStep < texts.length - 1) {
    showWelcomeStep(currentWelcomeStep + 1);
  } else {
    const overlay = document.getElementById('zozo-welcome-overlay');
    if (overlay) overlay.style.display = 'none';
    document.body.className = '';
    gameStarted = true;
    showInGameMonolog(1);
  }
}

function prevWelcomeStep() {
  if (currentWelcomeStep > 0) {
    showWelcomeStep(currentWelcomeStep - 1);
  }
}

function showInGameMonolog(index) {
  activeInGameMonologIndex = index;
  if (!hasSeenMonologs.includes(index)) hasSeenMonologs.push(index);

  const container = document.getElementById('zozo-ingame-monolog-container');
  const txt = document.getElementById('ingame-dialogue-text');
  const backBtn = document.getElementById('monolog-back-btn');

  if (!container || !txt) return;

  const monologText = (dialoguesData.gameMonologues && dialoguesData.gameMonologues[String(index)]) || "Figyelj a vizekre, kalóz!";
  txt.innerText = monologText;
  if (backBtn) backBtn.style.display = hasSeenMonologs.length > 1 ? 'flex' : 'none';
  container.style.display = 'flex';

  saveTutorialState();
}

function closeInGameMonolog() {
  const container = document.getElementById('zozo-ingame-monolog-container');
  if (container) container.style.display = 'none';
}

function showPopupToast(text) {
  const toast = document.getElementById('ingame-popup-toast');
  const txt = document.getElementById('popup-toast-text');
  if (!toast || !txt) return;

  txt.innerText = text;
  toast.style.display = 'flex';
  setTimeout(() => { toast.style.display = 'none'; }, 4000);
}

function setupDialogueEvents() {
  const welcomeBox = document.getElementById('zozo-dialogue-box');
  const welcomeBack = document.getElementById('welcome-back-btn');
  const inGameBox = document.getElementById('zozo-ingame-monolog-container');
  const monologBack = document.getElementById('monolog-back-btn');

  if (welcomeBox) {
    welcomeBox.addEventListener('click', (e) => {
      if (e.target !== welcomeBack) nextWelcomeStep();
    });
  }
  if (welcomeBack) {
    welcomeBack.addEventListener('click', (e) => {
      e.stopPropagation();
      prevWelcomeStep();
    });
  }

  if (inGameBox) {
    inGameBox.addEventListener('click', (e) => {
      if (e.target !== monologBack) closeInGameMonolog();
    });
  }
  if (monologBack) {
    monologBack.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hasSeenMonologs.length > 1) {
        const prevIdx = hasSeenMonologs[hasSeenMonologs.length - 2];
        showInGameMonolog(prevIdx);
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === ' ') {
      const welcomeOverlay = document.getElementById('zozo-welcome-overlay');
      const inGameOverlay = document.getElementById('zozo-ingame-monolog-container');

      if (welcomeOverlay && welcomeOverlay.style.display === 'flex') {
        e.preventDefault();
        nextWelcomeStep();
      } else if (inGameOverlay && inGameOverlay.style.display === 'flex') {
        e.preventDefault();
        closeInGameMonolog();
      }
    }
  });
}

// ============================================================================
// 12. ÁLLAPOTMENTÉS ÉS VISSZATÖLTÉS
// ============================================================================
function saveTutorialState(syncBackend = false) {
  const state = {
    storedMembranes,
    carriedMembranes,
    hasSeenMonologs,
    currentWelcomeStep,
    boatPos: playerBoat ? { x: playerBoat.position.x, y: playerBoat.position.y, z: playerBoat.position.z } : { x: 5, y: 0, z: -94 },
    boatRotY,
    orbH,
    orbV,
    airshipState,
    timestamp: Date.now()
  };

  try {
    localStorage.setItem('ebp_tutorial_save', JSON.stringify(state));
  } catch (e) {}

  if (syncBackend && window.parent && window.parent !== window) {
    window.parent.postMessage({
      type: 'EBOOK_PIRATES_TUTORIAL',
      action: 'saveTutorialState',
      data: state
    }, '*');
  }
}

function checkSavedStateOrStart() {
  const urlParams = new URLSearchParams(window.location.search);
  const isLoad = urlParams.get('load') === '1';

  if (isLoad) {
    try {
      const raw = localStorage.getItem('ebp_tutorial_save');
      if (raw) {
        const state = JSON.parse(raw);
        storedMembranes = state.storedMembranes || 0;
        carriedMembranes = state.carriedMembranes || 0;
        hasSeenMonologs = state.hasSeenMonologs || [];

        if (state.boatPos && playerBoat) {
          playerBoat.position.set(state.boatPos.x, state.boatPos.y, state.boatPos.z);
          boatRotY = state.boatRotY || HOME_ROT_Y;
          playerBoat.rotation.y = boatRotY;
        }

        updateTopBar();
        gameStarted = true;
        showPopupToast("Játékállás sikeresen betöltve!");
        return;
      }
    } catch (e) {}
  }

  showWelcomeStep(0);
}

// ============================================================================
// 13. END OF GAME (EOG) CEREMÓNIA
// ============================================================================
function triggerEndOfGame() {
  isGameOver = true;

  const namingOverlay = document.getElementById('eog-boat-naming-overlay');
  const nameInput = document.getElementById('eog-boat-name-input');
  const submitBtn = document.getElementById('eog-btn-naming-submit');

  if (namingOverlay) namingOverlay.style.display = 'flex';

  if (submitBtn) {
    submitBtn.onclick = () => {
      boatName = (nameInput && nameInput.value.trim()) || "Gyöngyhalász";
      if (namingOverlay) namingOverlay.style.display = 'none';

      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          type: 'EBOOK_PIRATES_TUTORIAL',
          action: 'tutorial_completed',
          score: 10,
          passed: true,
          boatName: boatName
        }, '*');
      }

      showPopupToast("Gratulálunk! Sikeresen elvégezted a Kalózvizsgát!");
    };
  }
}

// ============================================================================
// 14. IRÁNYÍTÁS BEÁLLÍTÁSA
// ============================================================================
function setupControls() {
  window.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w') keys.w = true;
    if (k === 's') keys.s = true;
    if (k === 'a') keys.a = true;
    if (k === 'd') keys.d = true;
    if (e.code === 'ArrowUp') keys.arrowup = true;
    if (e.code === 'ArrowDown') keys.arrowdown = true;
    if (e.code === 'ArrowLeft') keys.arrowleft = true;
    if (e.code === 'ArrowRight') keys.arrowright = true;
  });

  window.addEventListener('keyup', (e) => {
    const k = e.key.toLowerCase();
    if (k === 'w') keys.w = false;
    if (k === 's') keys.s = false;
    if (k === 'a') keys.a = false;
    if (k === 'd') keys.d = false;
    if (e.code === 'ArrowUp') keys.arrowup = false;
    if (e.code === 'ArrowDown') keys.arrowdown = false;
    if (e.code === 'ArrowLeft') keys.arrowleft = false;
    if (e.code === 'ArrowRight') keys.arrowright = false;
  });

  // Mobil érintésvezérlés (Joystick)
  if (isAndroid) {
    const mobileOverlay = document.getElementById('mobile-overlay');
    const joystickZone = document.getElementById('joystick-zone');
    const joystickKnob = document.getElementById('joystick-knob');
    const modeBtn = document.getElementById('mobile-mode-btn');

    if (mobileOverlay) mobileOverlay.style.display = 'block';

    if (modeBtn) {
      modeBtn.onclick = () => {
        mobileMode = (mobileMode === 'boat') ? 'camera' : 'boat';
        modeBtn.innerHTML = (mobileMode === 'boat') ? '📷' : '☸️';
      };
    }

    if (joystickZone && joystickKnob) {
      let touchId = null;
      const zoneRect = () => joystickZone.getBoundingClientRect();

      joystickZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        touchId = e.changedTouches[0].identifier;
      });

      window.addEventListener('touchmove', (e) => {
        if (touchId === null) return;
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === touchId) {
            const rect = zoneRect();
            let dx = t.clientX - (rect.left + rect.width / 2);
            let dy = t.clientY - (rect.top + rect.height / 2);
            const maxR = rect.width / 2;
            const dist = Math.hypot(dx, dy);

            if (dist > maxR) {
              dx = (dx / dist) * maxR;
              dy = (dy / dist) * maxR;
            }

            joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
            keys.w = dy < -15;
            keys.s = dy > 15;
            keys.a = dx < -15;
            keys.d = dx > 15;
          }
        }
      }, { passive: false });

      const endTouch = () => {
        touchId = null;
        joystickKnob.style.transform = 'translate(-50%, -50%)';
        keys.w = keys.s = keys.a = keys.d = false;
      };

      window.addEventListener('touchend', endTouch);
      window.addEventListener('touchcancel', endTouch);
    }
  }

  // TopBar gombok
  const infoBtn = document.getElementById('btn-tb-info');
  const infoOverlay = document.getElementById('info-scroll-overlay');
  if (infoBtn && infoOverlay) {
    infoBtn.onclick = () => { infoOverlay.style.display = 'flex'; };
  }

  const exitBtn = document.getElementById('btn-tb-exit');
  const exitOverlay = document.getElementById('exit-confirm-overlay');
  const exitSaveBtn = document.getElementById('btn-exit-save');
  const exitCancelBtn = document.getElementById('btn-exit-cancel');

  if (exitBtn && exitOverlay) exitBtn.onclick = () => { exitOverlay.style.display = 'flex'; };
  if (exitCancelBtn && exitOverlay) exitCancelBtn.onclick = () => { exitOverlay.style.display = 'none'; };
  if (exitSaveBtn) {
    exitSaveBtn.onclick = () => {
      saveTutorialState(true);
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'EBOOK_PIRATES_TUTORIAL', action: 'exit_tutorial' }, '*');
      }
    };
  }
}

// ============================================================================
// 15. RENDER LOOP ÉS INDÍTÁS
// ============================================================================
function animate() {
  requestAnimationFrame(animate);

  const dt = clock.getDelta();

  if (water) {
    water.material.uniforms['time'].value += dt * 0.5;
  }

  // Hártyák finom lebegése
  const t = performance.now() * 0.003;
  activeMembranes.forEach(m => {
    m.position.y = m.userData.baseY + Math.sin(t) * 0.2;
    m.rotation.y += 0.02;
  });

  updatePhysics(dt);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  if (!camera || !renderer) return;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Indítás
window.addEventListener('DOMContentLoaded', async () => {
  await loadDataFiles();
  await initEngine();
  setupDialogueEvents();
  setupCameraControls();
  setupControls();
  animate();
});
