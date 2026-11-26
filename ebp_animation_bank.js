/**
 * ============================================================================
 * eBookPirates - Kozponti 3D Animacios, Mimika es AI-Koreografia Motor
 * ============================================================================
 * Kompatibilis: Three.js 0.160.0 (Kikoto 3D, Belso Szobak, Demojatek, LET.kryst Studio)
 * Forrasok:     assets/models/animations/ebp_master_animations.glb | packs/*.glb
 *               ebp_animations_manifest.json | ebp_mimics_library.json | ebp_ai_director_schema.json
 * ============================================================================
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const GCS_ANIM_BASE_URL = 'https://storage.googleapis.com/kalozsziget-assets/assets/models/animations/';

const LIMB_TPOSE_DIRS = {
    leftshoulder: ['leftarm', new THREE.Vector3(1, 0, 0)],
    leftarm: ['leftforearm', new THREE.Vector3(1, 0, 0)],
    leftforearm: ['lefthand', new THREE.Vector3(1, 0, 0)],
    lefthand: ['lefthandmiddle1', new THREE.Vector3(1, 0, 0)],
    rightshoulder: ['rightarm', new THREE.Vector3(-1, 0, 0)],
    rightarm: ['rightforearm', new THREE.Vector3(-1, 0, 0)],
    rightforearm: ['righthand', new THREE.Vector3(-1, 0, 0)],
    righthand: ['righthandmiddle1', new THREE.Vector3(-1, 0, 0)],
    leftupleg: ['leftleg', new THREE.Vector3(0, -1, 0)],
    leftleg: ['leftfoot', new THREE.Vector3(0, -1, 0)],
    rightupleg: ['rightleg', new THREE.Vector3(0, -1, 0)],
    rightleg: ['rightfoot', new THREE.Vector3(0, -1, 0)]
};

const ISOLATED_FEET_BONES = new Set([
    'leftfoot', 'lefttoebase', 'lefttoeend',
    'rightfoot', 'righttoebase', 'righttoeend'
]);

const _vDirCur = new THREE.Vector3();
const _qAlign = new THREE.Quaternion();

// === [#HEX:F.0C.00.00] START | name: computeLimbTPoseWorldMap | lines: 31 ===
// @calls: none | @calledBy: [#HEX:F.0C.1F.00], [#HEX:F.0C.27.00]
function computeLimbTPoseWorldMap(topoKeys, parentMap, restLocalMap, restWorldMap, getChildOffsetFn) {
    const tposeWorld = new Map();
    for (const key of topoKeys) {
        if (ISOLATED_FEET_BONES.has(key) && restWorldMap && restWorldMap.has(key)) {
            tposeWorld.set(key, restWorldMap.get(key).clone().normalize());
            continue;
        }
        const lr = restLocalMap.get(key) || new THREE.Quaternion();
        const pKey = parentMap.get(key);
        const curW = (pKey && tposeWorld.has(pKey))
            ? tposeWorld.get(pKey).clone().multiply(lr).normalize()
            : (restWorldMap && restWorldMap.has(key) ? restWorldMap.get(key).clone().normalize() : lr.clone().normalize());

        const rule = LIMB_TPOSE_DIRS[key];
        if (rule) {
            const childKey = rule[0];
            const targetDir = rule[1];
            const offsetVec = getChildOffsetFn(childKey);
            if (offsetVec && offsetVec.lengthSq() > 1e-8) {
                _vDirCur.copy(offsetVec).normalize().applyQuaternion(curW);
            } else {
                // Ujj-nelkuli modellekhez (pl. Jatekmester_animalt.glb) a csont sajat +Y tengelyet hasznaljuk
                _vDirCur.set(0, 1, 0).applyQuaternion(curW);
            }
            _qAlign.setFromUnitVectors(_vDirCur, targetDir);
            curW.premultiply(_qAlign).normalize();
        }
        tposeWorld.set(key, curW);
    }
    return tposeWorld;
}
// === [#HEX:F.0C.00.00] END ===

const UPPER_BODY_BONES = new Set([
    'spine', 'spine1', 'spine2', 'neck', 'head', 'headtopend', 'headfront',
    'leftshoulder', 'leftarm', 'leftforearm', 'lefthand',
    'lefthandthumb1', 'lefthandthumb2', 'lefthandthumb3', 'lefthandthumb4',
    'lefthandindex1', 'lefthandindex2', 'lefthandindex3', 'lefthandindex4',
    'lefthandmiddle1', 'lefthandmiddle2', 'lefthandmiddle3', 'lefthandmiddle4',
    'lefthandring1', 'lefthandring2', 'lefthandring3', 'lefthandring4',
    'lefthandpinky1', 'lefthandpinky2', 'lefthandpinky3', 'lefthandpinky4',
    'rightshoulder', 'rightarm', 'rightforearm', 'righthand',
    'righthandthumb1', 'righthandthumb2', 'righthandthumb3', 'righthandthumb4',
    'righthandindex1', 'righthandindex2', 'righthandindex3', 'righthandindex4',
    'righthandmiddle1', 'righthandmiddle2', 'righthandmiddle3', 'righthandmiddle4',
    'righthandring1', 'righthandring2', 'righthandring3', 'righthandring4',
    'righthandpinky1', 'righthandpinky2', 'righthandpinky3', 'righthandpinky4'
]);

const LOWER_BODY_BONES = new Set([
    'hips', 'spine',
    'leftupleg', 'leftleg', 'leftfoot', 'lefttoebase', 'lefttoeend',
    'rightupleg', 'rightleg', 'rightfoot', 'righttoebase', 'righttoeend'
]);

const LEFT_ARM_BONES = new Set([
    'leftshoulder', 'leftarm', 'leftforearm', 'lefthand',
    'lefthandthumb1', 'lefthandthumb2', 'lefthandthumb3', 'lefthandthumb4',
    'lefthandindex1', 'lefthandindex2', 'lefthandindex3', 'lefthandindex4',
    'lefthandmiddle1', 'lefthandmiddle2', 'lefthandmiddle3', 'lefthandmiddle4',
    'lefthandring1', 'lefthandring2', 'lefthandring3', 'lefthandring4',
    'lefthandpinky1', 'lefthandpinky2', 'lefthandpinky3', 'lefthandpinky4'
]);

const RIGHT_ARM_BONES = new Set([
    'rightshoulder', 'rightarm', 'rightforearm', 'righthand',
    'righthandthumb1', 'righthandthumb2', 'righthandthumb3', 'righthandthumb4',
    'righthandindex1', 'righthandindex2', 'righthandindex3', 'righthandindex4',
    'righthandmiddle1', 'righthandmiddle2', 'righthandmiddle3', 'righthandmiddle4',
    'righthandring1', 'righthandring2', 'righthandring3', 'righthandring4',
    'righthandpinky1', 'righthandpinky2', 'righthandpinky3', 'righthandpinky4'
]);

const ARMS_BONES = new Set([...LEFT_ARM_BONES, ...RIGHT_ARM_BONES]);

const HEAD_TORSO_BONES = new Set([
    'spine', 'spine1', 'spine2', 'neck', 'head', 'headtopend', 'headfront'
]);

export const BODY_ZONE_BONES = {
    full: null,
    lower: LOWER_BODY_BONES,
    upper: UPPER_BODY_BONES,
    arms: ARMS_BONES,
    right_arm: RIGHT_ARM_BONES,
    left_arm: LEFT_ARM_BONES,
    head_torso: HEAD_TORSO_BONES
};

export const BODY_ZONE_LABELS_HU = {
    full: 'Teljes test',
    lower: 'Alsótest & Testtartás (guggolás/láb)',
    upper: 'Teljes felsőtest (törzs + karok)',
    arms: 'Mindkét kar & kéztartás',
    right_arm: 'Csak jobb kar & kéz',
    left_arm: 'Csak bal kar & kéz',
    head_torso: 'Törzs, nyak & fej'
};

const BONE_SYNONYMS = {
    pelvis: 'hips',
    root_hips: 'hips',
    spine_01: 'spine',
    spine_02: 'spine1',
    spine_03: 'spine2',
    clavicle_l: 'leftshoulder',
    upperarm_l: 'leftarm',
    leftupperarm: 'leftarm',
    lowerarm_l: 'leftforearm',
    leftlowerarm: 'leftforearm',
    hand_l: 'lefthand',
    clavicle_r: 'rightshoulder',
    upperarm_r: 'rightarm',
    rightupperarm: 'rightarm',
    lowerarm_r: 'rightforearm',
    rightlowerarm: 'rightforearm',
    hand_r: 'righthand',
    thigh_l: 'leftupleg',
    leftthigh: 'leftupleg',
    calf_l: 'leftleg',
    shin_l: 'leftleg',
    leftshin: 'leftleg',
    foot_l: 'leftfoot',
    ball_l: 'lefttoebase',
    thigh_r: 'rightupleg',
    rightthigh: 'rightupleg',
    calf_r: 'rightleg',
    shin_r: 'rightleg',
    rightshin: 'rightleg',
    foot_r: 'rightfoot',
    ball_r: 'righttoebase'
};

const FACE_MASK_LANDMARKS = [
    { id: 'browL', labelHu: 'Bal szemöldök', color: 0xffd700, pair: 'browR' },
    { id: 'browR', labelHu: 'Jobb szemöldök', color: 0xffd700, pair: 'browL' },
    { id: 'eyeL', labelHu: 'Bal szem', color: 0x38bdf8, pair: 'eyeR' },
    { id: 'eyeR', labelHu: 'Jobb szem', color: 0x38bdf8, pair: 'eyeL' },
    { id: 'mouthL', labelHu: 'Bal szájzug', color: 0xfb7185, pair: 'mouthR' },
    { id: 'mouthR', labelHu: 'Jobb szájzug', color: 0xfb7185, pair: 'mouthL' },
    { id: 'mouthCenter', labelHu: 'Száj közép / Áll', color: 0x34d399, pair: null }
];

const FACE_MASK_MORPH_NAMES = [
    'eyeBlinkLeft',
    'eyeBlinkRight',
    'eyeWideLeft',
    'eyeWideRight',
    'eyeSquintLeft',
    'eyeSquintRight',
    'browDownLeft',
    'browDownRight',
    'browInnerUp',
    'browOuterUpLeft',
    'browOuterUpRight',
    'jawOpen',
    'mouthFunnel',
    'mouthSmileLeft',
    'mouthSmileRight',
    'mouthFrownLeft',
    'mouthFrownRight',
    'cheekSquintLeft',
    'cheekSquintRight',
    'mouthStretchLeft',
    'mouthStretchRight'
];

const LEGACY_MIMIC_ALIASES = {
    idle_blink: 'smile_to_laugh'
};

// === [#HEX:F.0C.01.00] START | name: clampNum | lines: 3 ===
// @calls: none | @calledBy: [#HEX:F.0C.02.00], [#HEX:F.0C.17.00], [#HEX:F.0C.2A.00], [#HEX:F.0C.2B.00], [#HEX:F.0C.2D.00]
function clampNum(v, lo, hi) {
    return v < lo ? lo : (v > hi ? hi : v);
}
// === [#HEX:F.0C.01.00] END ===

// === [#HEX:F.0C.02.00] START | name: smoothstepNum | lines: 5 ===
// @calls: [#HEX:F.0C.01.00] | @calledBy: [#HEX:F.0C.2D.00], [#HEX:F.0C.2E.00]
function smoothstepNum(edge0, edge1, x) {
    if (Math.abs(edge1 - edge0) < 1e-7) return x >= edge1 ? 1 : 0;
    const t = clampNum((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
}
// === [#HEX:F.0C.02.00] END ===

// === [#HEX:F.0C.03.00] START | name: raisedCosFalloff | lines: 5 ===
// @calls: none | @calledBy: [#HEX:F.0C.2D.00], [#HEX:F.0C.2E.00]
function raisedCosFalloff(dist, radius) {
    if (dist >= radius || radius <= 1e-6) return 0;
    const u = 0.5 * (1 + Math.cos((Math.PI * dist) / radius));
    return u * Math.sqrt(u);
}
// === [#HEX:F.0C.03.00] END ===

/**
 * Egysegesiti a karaktermodell-kulcsot utvonalbol vagy fajlnevbol (pl. zozo_animalt.glb).
 */
// === [#HEX:F.0C.04.00] START | name: normalizeModelKey | lines: 5 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00], [#HEX:F.0C.38.00], [#HEX:F.0C.3E.00], [#HEX:F.0C.3F.00], [#HEX:F.0C.5F.00]
export function normalizeModelKey(pathOrName) {
    if (!pathOrName) return '';
    const clean = String(pathOrName).split(/[?#]/)[0].split(/[\\/]/).pop() || '';
    return clean.trim().toLowerCase();
}
// === [#HEX:F.0C.04.00] END ===

export { FACE_MASK_LANDMARKS, FACE_MASK_MORPH_NAMES };

/**
 * Ekezet-eltavolito szovegnormalizalo magyar/angol keresoszo-egyezteteshez.
 */
// === [#HEX:F.0C.05.00] START | name: stripAccents | lines: 10 ===
// @calls: none | @calledBy: [#HEX:F.0C.23.00], [#HEX:F.0C.4F.00], [#HEX:F.0C.50.00]
function stripAccents(str) {
    return String(str || '')
        .toLowerCase()
        .replace(/[á]/g, 'a')
        .replace(/[é]/g, 'e')
        .replace(/[í]/g, 'i')
        .replace(/[óöő]/g, 'o')
        .replace(/[úüű]/g, 'u')
        .trim();
}
// === [#HEX:F.0C.05.00] END ===

/**
 * Egysegesiti a csontneveket (mixamorig:Hips, mixamorigHips, mixamorig_Hips -> hips).
 */
// === [#HEX:F.0C.06.00] START | name: normalizeBoneKey | lines: 11 ===
// @calls: none | @calledBy: [#HEX:F.0C.1F.00], [#HEX:F.0C.27.00], [#HEX:F.0C.2A.00]
export function normalizeBoneKey(name) {
    if (!name) return '';
    let s = String(name).trim().toLowerCase();
    s = s.replace(/^mixamorig[:_.\s-]*/i, '');
    s = s.replace(/[:.\s-]+/g, '_');
    s = s.replace(/^_+|_+$/g, '');
    if (BONE_SYNONYMS[s]) return BONE_SYNONYMS[s];
    const compact = s.replace(/_/g, '');
    if (BONE_SYNONYMS[compact]) return BONE_SYNONYMS[compact];
    return compact;
}
// === [#HEX:F.0C.06.00] END ===

/**
 * Biztonsagos csont- es Object3D-kulcs kinyeres Three.js animacios track nevekbol.
 */
// === [#HEX:F.0C.07.00] START | name: parseTrackNodeAndProp | lines: 15 ===
// @calls: none | @calledBy: none
function parseTrackNodeAndProp(trackName) {
    const parsed = THREE.PropertyBinding.parseTrackName(trackName);
    if (parsed && parsed.nodeName && parsed.propertyName) {
        return {
            nodeName: parsed.nodeName,
            propertyName: parsed.propertyName
        };
    }
    const lastDot = trackName.lastIndexOf('.');
    if (lastDot === -1) return { nodeName: trackName, propertyName: '' };
    return {
        nodeName: trackName.slice(0, lastDot),
        propertyName: trackName.slice(lastDot + 1)
    };
}
// === [#HEX:F.0C.07.00] END ===

/**
 * Gyors SLERP mintavetelezo THREE.QuaternionKeyframeTrack-bol.
 */
// === [#HEX:F.0C.08.00] START | name: sampleQuatTrackInto | lines: 33 ===
// @calls: none | @calledBy: [#HEX:F.0C.4A.00], [#HEX:F.0C.4B.00]
function sampleQuatTrackInto(times, values, t, outQuat) {
    const n = times.length;
    if (n === 0) {
        outQuat.set(0, 0, 0, 1);
        return outQuat;
    }
    if (n === 1 || t <= times[0]) {
        outQuat.set(values[0], values[1], values[2], values[3]).normalize();
        return outQuat;
    }
    if (t >= times[n - 1]) {
        const i = (n - 1) * 4;
        outQuat.set(values[i], values[i + 1], values[i + 2], values[i + 3]).normalize();
        return outQuat;
    }

    let lo = 0;
    let hi = n - 1;
    while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        if (times[mid] <= t) lo = mid;
        else hi = mid;
    }
    const dt = times[hi] - times[lo];
    const u = dt > 1e-6 ? (t - times[lo]) / dt : 0;
    const i0 = lo * 4;
    const i1 = hi * 4;

    _qSampleA.set(values[i0], values[i0 + 1], values[i0 + 2], values[i0 + 3]);
    _qSampleB.set(values[i1], values[i1 + 1], values[i1 + 2], values[i1 + 3]);
    outQuat.slerpQuaternions(_qSampleA, _qSampleB, u).normalize();
    return outQuat;
}
// === [#HEX:F.0C.08.00] END ===

/**
 * Gyors LERP mintavetelezo THREE.VectorKeyframeTrack-bol.
 */
// === [#HEX:F.0C.09.00] START | name: sampleVec3TrackInto | lines: 34 ===
// @calls: none | @calledBy: [#HEX:F.0C.4A.00], [#HEX:F.0C.4B.00]
function sampleVec3TrackInto(times, values, t, outVec) {
    const n = times.length;
    if (n === 0) {
        outVec.set(0, 0, 0);
        return outVec;
    }
    if (n === 1 || t <= times[0]) {
        outVec.set(values[0], values[1], values[2]);
        return outVec;
    }
    if (t >= times[n - 1]) {
        const i = (n - 1) * 3;
        outVec.set(values[i], values[i + 1], values[i + 2]);
        return outVec;
    }

    let lo = 0;
    let hi = n - 1;
    while (lo + 1 < hi) {
        const mid = (lo + hi) >> 1;
        if (times[mid] <= t) lo = mid;
        else hi = mid;
    }
    const dt = times[hi] - times[lo];
    const u = dt > 1e-6 ? (t - times[lo]) / dt : 0;
    const i0 = lo * 3;
    const i1 = hi * 3;
    outVec.set(
        values[i0] + (values[i1] - values[i0]) * u,
        values[i0 + 1] + (values[i1 + 1] - values[i0 + 1]) * u,
        values[i0 + 2] + (values[i1 + 2] - values[i0 + 2]) * u
    );
    return outVec;
}
// === [#HEX:F.0C.09.00] END ===

const _qSampleA = new THREE.Quaternion();
const _qSampleB = new THREE.Quaternion();
const _qTmpParentW = new THREE.Quaternion();
const _qTmpLocal = new THREE.Quaternion();
const _qTmpWorld = new THREE.Quaternion();
const _qTmpDelta = new THREE.Quaternion();
const _qTmpInv = new THREE.Quaternion();
const _vTmpPos = new THREE.Vector3();
const _eulerTmp = new THREE.Euler(0, 0, 0, 'YXZ');
const _qBoneDelta = new THREE.Quaternion();
const _qSliceOut = new THREE.Quaternion();
const _vSliceOut = new THREE.Vector3();

/**
 * Egy animacios track pontos idoszeletelese [startSec..endSec] kozott (vagy kimerevitese egyetlen idopillanatra).
 */
// === [#HEX:F.0C.4A.00] START | name: sliceTrackWindow | lines: 75 ===
// @calls: [#HEX:F.0C.08.00], [#HEX:F.0C.09.00], [#HEX:F.0C.4B.00], [#HEX:F.0C.53.00] | @calledBy: none
export function sliceTrackWindow(track, startSec = 0, endSec = null, freeze = false) {
    const times = track.times;
    const vals = track.values;
    const itemSize = track.getValueSize ? track.getValueSize() : (vals.length / Math.max(1, times.length));
    const trackMax = times && times.length > 0 ? times[times.length - 1] : 0.1;
    const s0 = Math.max(0, Math.min(trackMax, Number(startSec) || 0));
    const rawEnd = (endSec === null || endSec === undefined || !Number.isFinite(Number(endSec))) ? trackMax : Number(endSec);
    const s1 = Math.max(s0, Math.min(trackMax, rawEnd));
    const span = s1 - s0;

    const Ctor = track.constructor;
    if (freeze || span < 0.025) {
        const outTimes = new Float32Array([0, 0.1]);
        const outVals = new Float32Array(itemSize * 2);
        if (itemSize === 4) {
            sampleQuatTrackInto(times, vals, s0, _qSliceOut);
            outVals.set([_qSliceOut.x, _qSliceOut.y, _qSliceOut.z, _qSliceOut.w], 0);
            outVals.set([_qSliceOut.x, _qSliceOut.y, _qSliceOut.z, _qSliceOut.w], 4);
        } else if (itemSize === 3) {
            sampleVec3TrackInto(times, vals, s0, _vSliceOut);
            outVals.set([_vSliceOut.x, _vSliceOut.y, _vSliceOut.z], 0);
            outVals.set([_vSliceOut.x, _vSliceOut.y, _vSliceOut.z], 3);
        } else {
            for (let k = 0; k < itemSize; k++) {
                outVals[k] = vals[k] || 0;
                outVals[itemSize + k] = vals[k] || 0;
            }
        }
        return new Ctor(track.name, outTimes, outVals);
    }

    const pickedTimes = [0];
    const pickedValues = [];

// === [#HEX:F.0C.4B.00] START | name: pushSampleAt | lines: 18 ===
// @calls: [#HEX:F.0C.08.00], [#HEX:F.0C.09.00] | @calledBy: [#HEX:F.0C.4A.00]
    const pushSampleAt = (tSample) => {
        if (itemSize === 4) {
            sampleQuatTrackInto(times, vals, tSample, _qSliceOut);
            if (pickedValues.length >= 4) {
                const off = pickedValues.length - 4;
                const dot = pickedValues[off] * _qSliceOut.x + pickedValues[off + 1] * _qSliceOut.y + pickedValues[off + 2] * _qSliceOut.z + pickedValues[off + 3] * _qSliceOut.w;
                if (dot < 0) _qSliceOut.set(-_qSliceOut.x, -_qSliceOut.y, -_qSliceOut.z, -_qSliceOut.w);
            }
            pickedValues.push(_qSliceOut.x, _qSliceOut.y, _qSliceOut.z, _qSliceOut.w);
        } else if (itemSize === 3) {
            sampleVec3TrackInto(times, vals, tSample, _vSliceOut);
            pickedValues.push(_vSliceOut.x, _vSliceOut.y, _vSliceOut.z);
        } else {
            const idx = Math.max(0, Math.min(times.length - 1, times.findIndex((tv) => tv >= tSample)));
            const base = idx * itemSize;
            for (let k = 0; k < itemSize; k++) pickedValues.push(vals[base + k] || 0);
        }
    };
// === [#HEX:F.0C.4B.00] END ===

    pushSampleAt(s0);
    for (let i = 0; i < times.length; i++) {
        const tv = times[i];
        if (tv > s0 + 1e-4 && tv < s1 - 1e-4) {
            pickedTimes.push(tv - s0);
            const base = i * itemSize;
            if (itemSize === 4) {
                _qSliceOut.set(vals[base], vals[base + 1], vals[base + 2], vals[base + 3]).normalize();
                const off = pickedValues.length - 4;
                const dot = pickedValues[off] * _qSliceOut.x + pickedValues[off + 1] * _qSliceOut.y + pickedValues[off + 2] * _qSliceOut.z + pickedValues[off + 3] * _qSliceOut.w;
                if (dot < 0) _qSliceOut.set(-_qSliceOut.x, -_qSliceOut.y, -_qSliceOut.z, -_qSliceOut.w);
                pickedValues.push(_qSliceOut.x, _qSliceOut.y, _qSliceOut.z, _qSliceOut.w);
            } else {
                for (let k = 0; k < itemSize; k++) pickedValues.push(vals[base + k]);
            }
        }
    }
    pickedTimes.push(span);
    pushSampleAt(s1);

    return new Ctor(track.name, new Float32Array(pickedTimes), new Float32Array(pickedValues));
}
// === [#HEX:F.0C.4A.00] END ===

/**
 * Retargetelt teljes klipbol testzona-szurt es idoszeletelt kompozit retegklipet epit.
 */
// === [#HEX:F.0C.4C.00] START | name: buildCompositeLayerClip | lines: 1 ===
// @calls: none | @calledBy: none
export function buildCompositeLayerClip(retargetedFullClip, options = {}) {
// === [#HEX:F.0C.4C.00] END ===
    const bodyZone = options.bodyZone || 'full';
    const allowedSet = BODY_ZONE_BONES[bodyZone] || null;
    const excludeSet = options.excludeBoneKeys || null;
    const freeze = Boolean(options.freeze);
    const startSec = Number(options.startSec) || 0;
    const endSec = (options.endSec !== undefined && options.endSec !== null) ? Number(options.endSec) : retargetedFullClip.duration;
    const layerTag = options.layerTag || 'layer';

    const outTracks = [];
    for (const tr of retargetedFullClip.tracks) {
        const { nodeName, propertyName } = parseTrackNodeAndProp(tr.name);
        const bKey = normalizeBoneKey(nodeName);
        if (excludeSet && excludeSet.has(bKey)) continue;

        if (propertyName === 'position' && bKey === 'hips') {
            if (bodyZone !== 'full' && bodyZone !== 'lower') continue;
            outTracks.push(sliceTrackWindow(tr, startSec, endSec, freeze));
        } else if (propertyName === 'quaternion') {
            if (allowedSet && !allowedSet.has(bKey)) continue;
            outTracks.push(sliceTrackWindow(tr, startSec, endSec, freeze));
        }
    }

    const dur = freeze ? 0.1 : Math.max(0.033, (endSec - startSec));
    return new THREE.AnimationClip(`__comp_${layerTag}_${retargetedFullClip.name}_${bodyZone}`, dur, outTracks);
}

// === [#HEX:F.0C.0A.00] START | name: detectDefaultAnimBaseUrl | lines: 7 ===
// @calls: none | @calledBy: none
function detectDefaultAnimBaseUrl() {
    try {
        return new URL('assets/models/animations/', import.meta.url).href;
    } catch (_e) {
        return 'assets/models/animations/';
    }
}
// === [#HEX:F.0C.0A.00] END ===

/**
 * ============================================================================
 * EBPActorController - Egy 3D karakter animacios, mimikai es koreografia vezerloje
 * ============================================================================
 */
export class EBPActorController {
// === [#HEX:F.0C.0B.00] START | name: constructor | lines: 1 ===
// @calls: none | @calledBy: none
    constructor(bank, targetRoot, rigInfo, options = {}) {
// === [#HEX:F.0C.0B.00] END ===
        this.bank = bank;
        this.targetRoot = targetRoot;
        this.rigInfo = rigInfo;
        this.mixer = new THREE.AnimationMixer(targetRoot);

        this.mainAction = null;
        this.mainClipName = null;
        this.mainTargetWeight = 1.0;
        this.mainCurrentWeight = 0.0;
        this.mainFadeTime = 0.3;
        this.prevMainActions = [];

        this.upperAction = null;
        this.upperClipName = null;
        this.upperTargetWeight = 0.0;
        this.upperCurrentWeight = 0.0;
        this.upperFadeTime = 0.25;
        this.prevUpperActions = [];

        this.compositeActions = [];
        this.prevCompositeActions = [];
        this.activeCompositeRecipe = null;

        this.paused = false;
        this.speed = typeof options.speed === 'number' ? options.speed : 1.0;
        this.lockRootXZ = Boolean(options.lockRootXZ);
        this.enableBoneFallback = options.enableBoneFallback !== false;

        this.activeMimicId = 'neutral';
        this.mimicWeight = 1.0;
        this.isSpeaking = false;
        this.audioAmplitude = 0.65;
        this.autoBlink = true;
        this._blinkTimer = 0;
        this._nextBlinkAt = 2.8;
        this._blinkAmount = 0;
        this._morphCurrent = {};
        this._speechTime = 0;
        this._mimicTime = 0;
        this._lastActiveWeights = {};
        this._lastSequencePhase = null;
        this._lastBoneFallback = new Map();

        this._choreography = null;
        this._choreoElapsed = 0;
        this._choreoStepIdx = -1;
        this._choreoCallbacks = {};
    }

    /**
     * Kivalasztott teljes-testes animacio elinditasa sima attunessel.
     */
// === [#HEX:F.07.18.00] START | name: play | lines: 1 ===
// @calls: none | @calledBy: [#HEX:B.12.33.00], [#HEX:B.12.37.00], [#HEX:B.15.21.00], [#HEX:B.15.25.00], [#HEX:D.01.110.00]
    async play(clipOrAlias, options = {}) {
// === [#HEX:F.07.18.00] END ===
        const fadeIn = typeof options.fadeIn === 'number' ? options.fadeIn : 0.3;
        const loop = options.loop !== false;
        const speed = typeof options.speed === 'number' ? options.speed : this.speed;
        const weight = typeof options.weight === 'number' ? options.weight : 1.0;
        const lockRootXZ = typeof options.lockRootXZ === 'boolean' ? options.lockRootXZ : this.lockRootXZ;

        this.speed = speed;
        this.lockRootXZ = lockRootXZ;
        this.stopCompositeMotion(fadeIn);

        const srcClip = await this.bank.ensureClipLoaded(clipOrAlias);
        const retargeted = this.bank.retargetClipForModel(srcClip, this.rigInfo, {
            lockRootXZ,
            upperBodyOnly: false
        });

        const nextAction = this.mixer.clipAction(retargeted);
        nextAction.reset();
        nextAction.enabled = true;
        nextAction.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
        nextAction.clampWhenFinished = !loop;
        nextAction.setEffectiveTimeScale(speed);
        nextAction.setEffectiveWeight(fadeIn > 0 ? 0.0001 : weight);
        nextAction.play();

        if (this.mainAction && this.mainAction !== nextAction) {
            this.prevMainActions.push({
                action: this.mainAction,
                fadeOut: Math.max(0.05, fadeIn),
                weight: this.mainCurrentWeight
            });
        }

        this.mainAction = nextAction;
        this.mainClipName = srcClip.name;
        this.mainTargetWeight = weight;
        this.mainCurrentWeight = fadeIn > 0 ? 0.0001 : weight;
        this.mainFadeTime = Math.max(0.05, fadeIn);
        return srcClip.name;
    }

    /**
     * Felsotestes reteg animacio (pl. jaras kozbeni integetes vagy beszedgesztus).
     */
// === [#HEX:F.07.19.00] START | name: playUpperBody | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.07.1C.00]
    async playUpperBody(clipOrAlias, options = {}) {
// === [#HEX:F.07.19.00] END ===
        const fadeIn = typeof options.fadeIn === 'number' ? options.fadeIn : 0.25;
        const loop = options.loop !== false;
        const speed = typeof options.speed === 'number' ? options.speed : this.speed;
        const weight = typeof options.weight === 'number' ? options.weight : 0.9;

        const srcClip = await this.bank.ensureClipLoaded(clipOrAlias);
        const retargeted = this.bank.retargetClipForModel(srcClip, this.rigInfo, {
            lockRootXZ: true,
            upperBodyOnly: true
        });

        const nextAction = this.mixer.clipAction(retargeted);
        nextAction.reset();
        nextAction.enabled = true;
        nextAction.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
        nextAction.clampWhenFinished = !loop;
        nextAction.setEffectiveTimeScale(speed);
        // Felsotest prioritas a teljes-testes alapmozgas felett
        const biasedTarget = Math.max(0.01, weight) * 3.5;
        nextAction.setEffectiveWeight(fadeIn > 0 ? 0.0001 : biasedTarget);
        nextAction.play();

        if (this.upperAction && this.upperAction !== nextAction) {
            this.prevUpperActions.push({
                action: this.upperAction,
                fadeOut: Math.max(0.05, fadeIn),
                weight: this.upperCurrentWeight
            });
        }

        this.upperAction = nextAction;
        this.upperClipName = srcClip.name;
        this.upperTargetWeight = biasedTarget;
        this.upperCurrentWeight = fadeIn > 0 ? 0.0001 : biasedTarget;
        this.upperFadeTime = Math.max(0.05, fadeIn);
        return srcClip.name;
    }

// === [#HEX:F.0C.0C.00] START | name: stopUpperBody | lines: 12 ===
// @calls: [#HEX:F.04.70.00] | @calledBy: none
    stopUpperBody(fadeOut = 0.25) {
        if (!this.upperAction) return;
        this.prevUpperActions.push({
            action: this.upperAction,
            fadeOut: Math.max(0.05, fadeOut),
            weight: this.upperCurrentWeight
        });
        this.upperAction = null;
        this.upperClipName = null;
        this.upperTargetWeight = 0;
        this.upperCurrentWeight = 0;
    }
// === [#HEX:F.0C.0C.00] END ===

    /**
     * Tobb kulonallo mozgasklip idoszeletelt es testzona-maszkolt osszegyurasa egyetlen karaktermunkaba.
     */
// === [#HEX:F.07.1D.00] START | name: playCompositeMotion | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00], [#HEX:F.07.1E.00]
    async playCompositeMotion(recipe, options = {}) {
// === [#HEX:F.07.1D.00] END ===
        if (!recipe || !Array.isArray(recipe.layers) || recipe.layers.length === 0) {
            throw new Error('Ervenytelen kompozit mozgasrecept: ures layers tomb.');
        }

        const fadeIn = typeof options.fadeIn === 'number' ? options.fadeIn : 0.25;
        const lockRootXZ = recipe.lockRootXZ !== false;
        this.lockRootXZ = lockRootXZ;

        if (this.mainAction) {
            this.prevMainActions.push({
                action: this.mainAction,
                fadeOut: Math.max(0.05, fadeIn),
                weight: this.mainCurrentWeight
            });
            this.mainAction = null;
            this.mainClipName = null;
            this.mainTargetWeight = 0;
            this.mainCurrentWeight = 0;
        }
        this.stopUpperBody(fadeIn);
        this.stopCompositeMotion(fadeIn);

        const layers = recipe.layers;
        const builtEntries = [];
        const playedClips = [];

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (!layer || !layer.clip) continue;
            const zone = layer.bodyZone || 'full';

            // A magasabb prioritasu felso/kar retegek csontjait kivonjuk az alatta levo retegbol a tiszta felulirasert
            const excludeBoneKeys = new Set();
            for (let j = i + 1; j < layers.length; j++) {
                const hiZone = layers[j] && layers[j].bodyZone;
                const hiSet = hiZone ? BODY_ZONE_BONES[hiZone] : null;
                if (hiSet) {
                    hiSet.forEach((bk) => excludeBoneKeys.add(bk));
                }
            }

            const srcClip = await this.bank.ensureClipLoaded(layer.clip);
            const fullRetargeted = this.bank.retargetClipForModel(srcClip, this.rigInfo, {
                lockRootXZ,
                upperBodyOnly: false
            });
            const mode = layer.mode || 'pingpong';
            const slicedClip = buildCompositeLayerClip(fullRetargeted, {
                bodyZone: zone,
                excludeBoneKeys: excludeBoneKeys.size > 0 ? excludeBoneKeys : null,
                startSec: typeof layer.startSec === 'number' ? layer.startSec : 0,
                endSec: typeof layer.endSec === 'number' ? layer.endSec : fullRetargeted.duration,
                freeze: mode === 'freeze',
                layerTag: `L${i}_${Date.now() % 100000}`
            });

            const action = this.mixer.clipAction(slicedClip);
            action.reset();
            action.enabled = true;
            if (mode === 'pingpong') {
                action.setLoop(THREE.LoopPingPong, Infinity);
            } else if (mode === 'once') {
                action.setLoop(THREE.LoopOnce, 1);
                action.clampWhenFinished = true;
            } else {
                action.setLoop(THREE.LoopRepeat, Infinity);
            }
            const layerSpeed = mode === 'freeze' ? 0 : (typeof layer.speed === 'number' ? layer.speed : 1.0);
            const targetW = typeof layer.weight === 'number' ? layer.weight : 1.0;
            action.setEffectiveTimeScale(layerSpeed * (this.speed || 1.0));
            action.setEffectiveWeight(fadeIn > 0 ? 0.0001 : targetW);
            action.play();

            builtEntries.push({
                action,
                clip: slicedClip,
                targetWeight: targetW,
                currentWeight: fadeIn > 0 ? 0.0001 : targetW,
                fadeTime: Math.max(0.05, fadeIn)
            });
            playedClips.push(`${srcClip.name}[${zone}]`);
        }

        this.compositeActions = builtEntries;
        this.activeCompositeRecipe = JSON.parse(JSON.stringify(recipe));
        this.mainClipName = playedClips.join(' + ');

        if (recipe.mimic) {
            this.setMimic(recipe.mimic, { weight: typeof recipe.mimicWeight === 'number' ? recipe.mimicWeight : 1.0 });
        }
        return { layerCount: builtEntries.length, clips: playedClips };
    }

// === [#HEX:F.0C.4D.00] START | name: stopCompositeMotion | lines: 22 ===
// @calls: [#HEX:F.04.14.00], [#HEX:F.04.70.00] | @calledBy: [#HEX:F.0C.1B.00], [#HEX:F.0C.60.00]
    stopCompositeMotion(fadeOut = 0.2) {
        if (!this.compositeActions || this.compositeActions.length === 0) {
            this.activeCompositeRecipe = null;
            return;
        }
        const fo = Math.max(0.05, fadeOut);
        for (const item of this.compositeActions) {
            if (fadeOut <= 0.01) {
                item.action.stop();
                this.mixer.uncacheClip(item.clip);
            } else {
                this.prevCompositeActions.push({
                    action: item.action,
                    clip: item.clip,
                    fadeOut: fo,
                    weight: item.currentWeight
                });
            }
        }
        this.compositeActions = [];
        this.activeCompositeRecipe = null;
    }
// === [#HEX:F.0C.4D.00] END ===

// === [#HEX:F.0C.4E.00] START | name: getActiveCompositeInfo | lines: 3 ===
// @calls: none | @calledBy: none
    getActiveCompositeInfo() {
        return this.activeCompositeRecipe;
    }
// === [#HEX:F.0C.4E.00] END ===

// === [#HEX:F.0C.0D.00] START | name: setMimic | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.02.30.00], [#HEX:F.02.33.00], [#HEX:F.04.266.00], [#HEX:F.0C.13.00], [#HEX:F.0C.3F.00]
    setMimic(mimicId, options = {}) {
// === [#HEX:F.0C.0D.00] END ===
        const presets = (this.bank.mimics && this.bank.mimics.presets) || {};
        const canonicalId = LEGACY_MIMIC_ALIASES[mimicId] || mimicId;
        const resolved = presets[canonicalId] ? canonicalId : 'neutral';
        if (resolved !== this.activeMimicId || options.restart === true) {
            this._mimicTime = 0;
        }
        this.activeMimicId = resolved;
        if (typeof options.weight === 'number') {
            this.mimicWeight = Math.max(0, Math.min(1, options.weight));
        }
        if (typeof options.speak === 'boolean') {
            this.isSpeaking = options.speak;
        }
        return resolved;
    }

// === [#HEX:F.0C.0E.00] START | name: setSpeaking | lines: 6 ===
// @calls: none | @calledBy: none
    setSpeaking(isSpeaking, audioAmplitude = 0.65) {
        this.isSpeaking = Boolean(isSpeaking);
        if (typeof audioAmplitude === 'number') {
            this.audioAmplitude = Math.max(0, Math.min(1.5, audioAmplitude));
        }
    }
// === [#HEX:F.0C.0E.00] END ===

// === [#HEX:F.0C.0F.00] START | name: setAutoBlink | lines: 3 ===
// @calls: none | @calledBy: [#HEX:F.04.266.00], [#HEX:F.0C.3F.00]
    setAutoBlink(enabled) {
        this.autoBlink = Boolean(enabled);
    }
// === [#HEX:F.0C.0F.00] END ===

// === [#HEX:F.0C.10.00] START | name: setPaused | lines: 3 ===
// @calls: none | @calledBy: none
    setPaused(paused) {
        this.paused = Boolean(paused);
    }
// === [#HEX:F.0C.10.00] END ===

// === [#HEX:F.0C.11.00] START | name: setSpeed | lines: 5 ===
// @calls: none | @calledBy: none
    setSpeed(speed) {
        this.speed = Math.max(0.1, Math.min(3.0, Number(speed) || 1.0));
        if (this.mainAction) this.mainAction.setEffectiveTimeScale(this.speed);
        if (this.upperAction) this.upperAction.setEffectiveTimeScale(this.speed);
    }
// === [#HEX:F.0C.11.00] END ===

    /**
     * Kozvetlenul vegrehajt egy Kryst3DScenePrompt objektumot a LET.kryst Studiobol.
     */
// === [#HEX:F.02.30.00] START | name: applyKrystScenePrompt | lines: 23 ===
// @calls: [#HEX:F.07.18.00], [#HEX:F.0C.0D.00] | @calledBy: none
    async applyKrystScenePrompt(scenePrompt3D) {
        if (!scenePrompt3D || typeof scenePrompt3D !== 'object') {
            throw new Error('Ervenytelen Kryst3DScenePrompt objektum.');
        }
        const clipTarget = scenePrompt3D.motion || 'talking_gesture';
        const resolvedClip = await this.play(clipTarget, {
            fadeIn: 0.35,
            loop: true,
            speed: this.speed,
            lockRootXZ: this.lockRootXZ
        });
        const mimicId = this.setMimic(scenePrompt3D.mimic || 'speaking_viseme', {
            weight: 1.0,
            speak: scenePrompt3D.mimic === 'speaking_viseme' || Boolean(scenePrompt3D.rawPromptText)
        });
        return {
            resolvedClip,
            mimicId,
            camera: scenePrompt3D.camera || null,
            vrImmersion: scenePrompt3D.vrImmersion || null,
            atmosphere: scenePrompt3D.atmosphere || null
        };
    }
// === [#HEX:F.02.30.00] END ===

    /**
     * Elindit egy tobb lepeses AI koreografiat (EBPChoreographyScript vagy Kryst3DScenePrompt).
     */
// === [#HEX:F.07.1A.00] START | name: playChoreography | lines: 1 ===
// @calls: none | @calledBy: none
    async playChoreography(scriptJson, callbacks = {}) {
// === [#HEX:F.07.1A.00] END ===
        const validation = this.bank.validateChoreography(scriptJson);
        if (!validation.valid || !validation.normalizedScript) {
            throw new Error('Koreografia validacios hiba: ' + validation.errors.join('; '));
        }
        const script = validation.normalizedScript;

        // Elotoltjuk az osszes szukseges klipet a szakadozasmentes lejatszashoz
        const uniqueClips = [...new Set(script.timeline.map((s) => s.clip))];
        await Promise.all(uniqueClips.map((c) => this.bank.ensureClipLoaded(c)));

        this._choreography = script;
        this._choreoElapsed = 0;
        this._choreoStepIdx = -1;
        this._choreoCallbacks = callbacks || {};
        this.paused = false;

        // Azonnali 0. lepes ha atSec === 0
        await this._advanceChoreographyStep(0);
        return validation;
    }

// === [#HEX:F.0C.12.00] START | name: stopChoreography | lines: 5 ===
// @calls: none | @calledBy: [#HEX:F.0C.14.00], [#HEX:F.0C.1B.00]
    stopChoreography() {
        this._choreography = null;
        this._choreoElapsed = 0;
        this._choreoStepIdx = -1;
    }
// === [#HEX:F.0C.12.00] END ===

// === [#HEX:F.0C.13.00] START | name: _advanceChoreographyStep | lines: 29 ===
// @calls: [#HEX:F.02.32.00], [#HEX:F.07.18.00], [#HEX:F.0C.0D.00], [#HEX:F.0C.46.00] | @calledBy: [#HEX:F.0C.14.00]
    async _advanceChoreographyStep(targetIdx) {
        if (!this._choreography) return;
        const timeline = this._choreography.timeline;
        if (targetIdx < 0 || targetIdx >= timeline.length || targetIdx === this._choreoStepIdx) {
            return;
        }
        this._choreoStepIdx = targetIdx;
        const step = timeline[targetIdx];

        await this.play(step.clip || step.fallbackMotion || 'Idle_8', {
            fadeIn: typeof step.fadeInSec === 'number' ? step.fadeInSec : 0.3,
            loop: step.loop !== false,
            speed: typeof step.speed === 'number' ? step.speed : 1.0,
            weight: typeof step.weight === 'number' ? step.weight : 1.0,
            lockRootXZ: this.lockRootXZ
        });

        this.setMimic(step.mimic || 'neutral', {
            weight: typeof step.expressionWeight === 'number' ? step.expressionWeight : 1.0,
            speak: Boolean(step.speak)
        });

        if (step.camera && typeof this._choreoCallbacks.onCameraDirective === 'function') {
            this._choreoCallbacks.onCameraDirective(step.camera, step, targetIdx);
        }
        if (typeof this._choreoCallbacks.onStepChange === 'function') {
            this._choreoCallbacks.onStepChange(step, targetIdx, timeline.length);
        }
    }
// === [#HEX:F.0C.13.00] END ===

    /**
     * Frame-enkenti frissites (30 FPS / clampelt delta mellett is sima).
     */
// === [#HEX:F.0C.14.00] START | name: update | lines: 38 ===
// @calls: [#HEX:F.0C.12.00], [#HEX:F.0C.13.00], [#HEX:F.0C.15.00], [#HEX:F.0C.16.00], [#HEX:F.0C.17.00] | @calledBy: [#HEX:A.05.1B.00], [#HEX:A.05.25.01], [#HEX:B.05.05.00], [#HEX:B.07.2D.00], [#HEX:F.02.0C.00]
    update(deltaSec) {
        // Eloszor levesszuk az elozo frame boneFallback deltajat, igy paused/LoopOnce eseten sem kumulalodik!
        this._revertBoneFallback();

        const dt = Math.min(Math.max(Number(deltaSec) || 0, 0), 0.066);
        if (!this.paused) {
            this._updateFadeWeights(dt);
            this.mixer.update(dt);
            this._speechTime += dt;
            this._mimicTime += dt;

            if (this._choreography) {
                this._choreoElapsed += dt;
                const tl = this._choreography.timeline;
                let nextIdx = this._choreoStepIdx;
                for (let i = tl.length - 1; i >= 0; i--) {
                    if (this._choreoElapsed >= (tl[i].atSec || 0)) {
                        nextIdx = i;
                        break;
                    }
                }
                if (nextIdx !== this._choreoStepIdx) {
                    this._advanceChoreographyStep(nextIdx).catch((err) => {
                        console.warn('[EBPActorController] Koreografia lepes hiba:', err);
                    });
                }
                const last = tl[tl.length - 1];
                const totalDur = (last.atSec || 0) + (last.durationSec || 4.0);
                if (this._choreoElapsed >= totalDur) {
                    const cb = this._choreoCallbacks.onFinish;
                    this.stopChoreography();
                    if (typeof cb === 'function') cb();
                }
            }
        }

        this._updateMimicAndFallback(dt);
    }
// === [#HEX:F.0C.14.00] END ===

// === [#HEX:F.0C.15.00] START | name: _updateFadeWeights | lines: 58 ===
// @calls: [#HEX:F.04.14.00], [#HEX:F.04.70.00] | @calledBy: [#HEX:F.0C.14.00]
    _updateFadeWeights(dt) {
        if (this.mainAction && this.mainCurrentWeight < this.mainTargetWeight) {
            this.mainCurrentWeight = Math.min(
                this.mainTargetWeight,
                this.mainCurrentWeight + (dt / this.mainFadeTime) * this.mainTargetWeight
            );
            this.mainAction.setEffectiveWeight(this.mainCurrentWeight);
        }
        for (let i = this.prevMainActions.length - 1; i >= 0; i--) {
            const item = this.prevMainActions[i];
            item.weight -= (dt / item.fadeOut);
            if (item.weight <= 0.001) {
                item.action.stop();
                this.prevMainActions.splice(i, 1);
            } else {
                item.action.setEffectiveWeight(item.weight);
            }
        }

        if (this.upperAction && this.upperCurrentWeight < this.upperTargetWeight) {
            this.upperCurrentWeight = Math.min(
                this.upperTargetWeight,
                this.upperCurrentWeight + (dt / this.upperFadeTime) * this.upperTargetWeight
            );
            this.upperAction.setEffectiveWeight(this.upperCurrentWeight);
        }
        for (let i = this.prevUpperActions.length - 1; i >= 0; i--) {
            const item = this.prevUpperActions[i];
            item.weight -= (dt / item.fadeOut) * 3.5;
            if (item.weight <= 0.001) {
                item.action.stop();
                this.prevUpperActions.splice(i, 1);
            } else {
                item.action.setEffectiveWeight(item.weight);
            }
        }

        for (const item of this.compositeActions) {
            if (item.currentWeight < item.targetWeight) {
                item.currentWeight = Math.min(
                    item.targetWeight,
                    item.currentWeight + (dt / item.fadeTime) * item.targetWeight
                );
                item.action.setEffectiveWeight(item.currentWeight);
            }
        }
        for (let i = this.prevCompositeActions.length - 1; i >= 0; i--) {
            const item = this.prevCompositeActions[i];
            item.weight -= (dt / item.fadeOut);
            if (item.weight <= 0.001) {
                item.action.stop();
                if (item.clip) this.mixer.uncacheClip(item.clip);
                this.prevCompositeActions.splice(i, 1);
            } else {
                item.action.setEffectiveWeight(item.weight);
            }
        }
    }
// === [#HEX:F.0C.15.00] END ===

// === [#HEX:F.0C.16.00] START | name: _revertBoneFallback | lines: 11 ===
// @calls: [#HEX:F.04.1F.00] | @calledBy: [#HEX:F.0C.14.00], [#HEX:F.0C.1B.00]
    _revertBoneFallback() {
        if (this._lastBoneFallback.size === 0) return;
        for (const [boneKey, prevDelta] of this._lastBoneFallback.entries()) {
            const bone = this.rigInfo.bonesByKey.get(boneKey);
            if (bone) {
                _qTmpInv.copy(prevDelta).invert();
                bone.quaternion.multiply(_qTmpInv).normalize();
            }
        }
        this._lastBoneFallback.clear();
    }
// === [#HEX:F.0C.16.00] END ===

// === [#HEX:F.0C.17.00] START | name: _updateMimicAndFallback | lines: 220 ===
// @calls: [#HEX:F.0C.01.00], [#HEX:F.0C.18.00] | @calledBy: [#HEX:F.0C.14.00]
    _updateMimicAndFallback(dt) {
        const mimics = this.bank.mimics;
        const presets = (mimics && mimics.presets) || {};
        const preset = presets[this.activeMimicId] || presets.neutral || null;
        if (!preset) return;

        // 1. Pislogas utemezes
        if (this.autoBlink && !this.paused) {
            this._blinkTimer += dt;
            const blinkDur = (mimics.autoBlinkDefaults && mimics.autoBlinkDefaults.blinkDurationSec) || 0.14;
            if (this._blinkTimer >= this._nextBlinkAt) {
                const phase = (this._blinkTimer - this._nextBlinkAt) / blinkDur;
                if (phase >= 1.0) {
                    this._blinkAmount = 0;
                    this._blinkTimer = 0;
                    const minI = (mimics.autoBlinkDefaults && mimics.autoBlinkDefaults.intervalMinSec) || 2.4;
                    const maxI = (mimics.autoBlinkDefaults && mimics.autoBlinkDefaults.intervalMaxSec) || 5.8;
                    this._nextBlinkAt = minI + Math.random() * (maxI - minI);
                } else {
                    this._blinkAmount = Math.sin(phase * Math.PI);
                }
            }
        } else {
            this._blinkAmount = 0;
        }

        const isConversational = Boolean(preset.conversationalTalk || this.activeMimicId === 'speaking_viseme');
        const speakActive = this.isSpeaking || isConversational;
        const mw = this.mimicWeight;

        // 2. ARKit morphTargetInfluences frissites (ha van blendshape a modellen)
        const targetWeights = {};
        let seqBoneFallback = null;
        let seqLaughPulse = 0;
        const seq = preset.expressionSequence;

        if (seq && Array.isArray(seq.stages) && seq.stages.length > 0) {
            const stages = seq.stages;
            const dur = Math.max(0.1, Number(seq.durationSec) || stages[stages.length - 1].atSec || 1.0);
            const seqTime = (seq.loop !== false) ? (this._mimicTime % dur) : Math.min(this._mimicTime, dur);

            let s0 = stages[0];
            let s1 = stages[stages.length - 1];
            for (let i = 0; i < stages.length - 1; i++) {
                if (seqTime >= stages[i].atSec && seqTime <= stages[i + 1].atSec) {
                    s0 = stages[i];
                    s1 = stages[i + 1];
                    break;
                }
            }
            if (seqTime >= stages[stages.length - 1].atSec) {
                s0 = stages[stages.length - 1];
                s1 = stages[stages.length - 1];
            }

            const span = Math.max(1e-5, (s1.atSec || 0) - (s0.atSec || 0));
            const rawU = (s0 === s1) ? 0 : clampNum((seqTime - (s0.atSec || 0)) / span, 0, 1);
            const u = rawU * rawU * (3 - 2 * rawU);

            const w0 = s0.arkitWeights || {};
            const w1 = s1.arkitWeights || {};
            const allKeys = new Set([...Object.keys(w0), ...Object.keys(w1)]);
            for (const k of allKeys) {
                const v0 = Number(w0[k]) || 0;
                const v1 = Number(w1[k]) || 0;
                const val = (v0 + (v1 - v0) * u) * mw;
                if (val > 1e-4) targetWeights[k] = val;
            }

            const lp0 = Number(s0.laughPulse) || 0;
            const lp1 = Number(s1.laughPulse) || 0;
            seqLaughPulse = lp0 + (lp1 - lp0) * u;
            if (seqLaughPulse > 0.01) {
                const chuckle = 0.5 + 0.5 * Math.sin(this._mimicTime * 4.2 * Math.PI * 2) * (0.75 + 0.25 * Math.cos(this._mimicTime * 1.7 * Math.PI * 2));
                const pulseScale = seqLaughPulse * chuckle * mw;
                targetWeights.jawOpen = clampNum((targetWeights.jawOpen || 0) + 0.22 * pulseScale, 0, 1);
                targetWeights.cheekSquintLeft = clampNum((targetWeights.cheekSquintLeft || 0) + 0.12 * pulseScale, 0, 1);
                targetWeights.cheekSquintRight = clampNum((targetWeights.cheekSquintRight || 0) + 0.12 * pulseScale, 0, 1);
                targetWeights.mouthSmileLeft = clampNum((targetWeights.mouthSmileLeft || 0) + 0.08 * pulseScale, 0, 1);
                targetWeights.mouthSmileRight = clampNum((targetWeights.mouthSmileRight || 0) + 0.08 * pulseScale, 0, 1);
                targetWeights.eyeSquintLeft = clampNum((targetWeights.eyeSquintLeft || 0) + 0.10 * pulseScale, 0, 0.72);
                targetWeights.eyeSquintRight = clampNum((targetWeights.eyeSquintRight || 0) + 0.10 * pulseScale, 0, 0.72);
            }

            const fb0 = s0.boneFallback || {};
            const fb1 = s1.boneFallback || {};
            seqBoneFallback = {};
            for (const bk of ['headPitchDeg', 'headYawDeg', 'headRollDeg', 'neckPitchDeg', 'spine2PitchDeg']) {
                const b0 = Number(fb0[bk]) || 0;
                const b1 = Number(fb1[bk]) || 0;
                seqBoneFallback[bk] = b0 + (b1 - b0) * u;
            }

            this._lastSequencePhase = {
                phaseHu: (u >= 0.5 && s1.phaseHu) ? s1.phaseHu : (s0.phaseHu || ''),
                timeSec: Number(seqTime.toFixed(2)),
                durationSec: Number(dur.toFixed(2))
            };
        } else {
            const arkit = preset.arkitWeights || {};
            for (const k in arkit) {
                targetWeights[k] = arkit[k] * mw;
            }
            this._lastSequencePhase = null;
        }

        if (this.autoBlink && this._blinkAmount > 0.001) {
            targetWeights.eyeBlinkLeft = Math.max(targetWeights.eyeBlinkLeft || 0, this._blinkAmount);
            targetWeights.eyeBlinkRight = Math.max(targetWeights.eyeBlinkRight || 0, this._blinkAmount);
        }

        if (speakActive) {
            const t = this._speechTime;
            const vp = (preset.visemePulse && preset.visemePulse.jawMax > 0.01)
                ? preset.visemePulse
                : { jawMin: 0.06, jawMax: 0.78, funnelMax: 0.65, stretchMax: 0.72, hz: 3.4 };
            const amp = this.isSpeaking ? this.audioAmplitude : 0.85;

            // Termeszetes tagmondat-burok legzetveteli szunetekkel
            const phraseRaw = 0.58 + 0.34 * Math.sin(t * 1.15) + 0.22 * Math.cos(t * 0.47 + 1.1);
            const phraseGate = clampNum((phraseRaw - 0.14) / 0.86, 0.08, 1.0);

            // Tobbszolamu szotagnyitas (0..1) es valtozo szajszelesseg (-1..+1)
            const jawWave = clampNum(
                0.46 + 0.32 * Math.sin(t * 2.35 * Math.PI * 2) + 0.26 * Math.sin(t * 3.85 * Math.PI * 2 + 0.9) + 0.18 * Math.cos(t * 5.4 * Math.PI * 2 + 2.1),
                0,
                1
            );
            const widthWave = 0.58 * Math.sin(t * 1.35 * Math.PI * 2 + 0.4) + 0.42 * Math.cos(t * 2.15 * Math.PI * 2 + 1.7);

            const jawVal = clampNum((vp.jawMin + (vp.jawMax - vp.jawMin) * jawWave) * phraseGate * amp * mw, 0, 1);
            targetWeights.jawOpen = isConversational ? jawVal : Math.min(1, Math.max(targetWeights.jawOpen || 0, jawVal));

            if (widthWave >= 0) {
                const stretchVal = clampNum(widthWave * (0.35 + 0.65 * jawWave) * (vp.stretchMax || 0.72) * phraseGate * amp * mw, 0, 1);
                targetWeights.mouthStretchLeft = Math.max(targetWeights.mouthStretchLeft || 0, stretchVal);
                targetWeights.mouthStretchRight = Math.max(targetWeights.mouthStretchRight || 0, stretchVal);
                targetWeights.mouthFunnel = Math.max(targetWeights.mouthFunnel || 0, 0.08 * phraseGate * mw);
            } else {
                const funnelVal = clampNum((-widthWave) * (0.42 + 0.58 * jawWave) * (vp.funnelMax || 0.65) * phraseGate * amp * mw, 0, 1);
                targetWeights.mouthFunnel = Math.max(targetWeights.mouthFunnel || 0, funnelVal);
            }
        }

        if (isConversational) {
            const t = this._speechTime;
            const emphWave = 0.55 * Math.sin(t * 0.42 * Math.PI * 2) + 0.45 * Math.cos(t * 0.68 * Math.PI * 2 + 0.7);
            const moodWave = 0.60 * Math.sin(t * 0.24 * Math.PI * 2 + 0.3) + 0.40 * Math.cos(t * 0.15 * Math.PI * 2 + 1.4);
            const asym = 0.18 * Math.sin(t * 0.51 * Math.PI * 2);

            if (emphWave > 0) {
                targetWeights.browInnerUp = Math.max(targetWeights.browInnerUp || 0, clampNum(emphWave * 0.58 * mw, 0, 1));
                targetWeights.browOuterUpLeft = Math.max(targetWeights.browOuterUpLeft || 0, clampNum(emphWave * (0.55 + asym), 0, 1) * mw);
                targetWeights.browOuterUpRight = Math.max(targetWeights.browOuterUpRight || 0, clampNum(emphWave * (0.55 - asym), 0, 1) * mw);
            } else if (emphWave < -0.1) {
                const frownBrow = clampNum((-emphWave - 0.1) * 0.48 * mw, 0, 1);
                targetWeights.browDownLeft = Math.max(targetWeights.browDownLeft || 0, frownBrow);
                targetWeights.browDownRight = Math.max(targetWeights.browDownRight || 0, frownBrow);
            }

            if (moodWave >= 0) {
                targetWeights.mouthSmileLeft = clampNum((0.14 + 0.38 * moodWave + asym * 0.12) * mw, 0, 1);
                targetWeights.mouthSmileRight = clampNum((0.14 + 0.38 * moodWave - asym * 0.12) * mw, 0, 1);
                targetWeights.cheekSquintLeft = Math.max(targetWeights.cheekSquintLeft || 0, clampNum(0.32 * moodWave * mw, 0, 1));
                targetWeights.cheekSquintRight = Math.max(targetWeights.cheekSquintRight || 0, clampNum(0.32 * moodWave * mw, 0, 1));
                targetWeights.eyeSquintLeft = Math.max(targetWeights.eyeSquintLeft || 0, clampNum(0.22 * moodWave * mw, 0, 1));
                targetWeights.eyeSquintRight = Math.max(targetWeights.eyeSquintRight || 0, clampNum(0.22 * moodWave * mw, 0, 1));
            } else {
                targetWeights.mouthSmileLeft = clampNum(0.08 * mw, 0, 1);
                targetWeights.mouthSmileRight = clampNum(0.08 * mw, 0, 1);
                if (moodWave < -0.15) {
                    const fVal = clampNum((-moodWave - 0.15) * 0.30 * mw, 0, 1);
                    targetWeights.mouthFrownLeft = Math.max(targetWeights.mouthFrownLeft || 0, fVal);
                    targetWeights.mouthFrownRight = Math.max(targetWeights.mouthFrownRight || 0, fVal);
                }
            }
        }

        this._lastActiveWeights = targetWeights;
        const lerpAlpha = Math.min(1, dt * 18.0 || 0.35);
        for (const mEntry of this.rigInfo.morphMeshes) {
            const dict = mEntry.dictionary;
            const infl = mEntry.influences;
            for (const bName in dict) {
                const idx = dict[bName];
                const goal = targetWeights[bName] || 0;
                const cur = infl[idx] || 0;
                infl[idx] = cur + (goal - cur) * lerpAlpha;
            }
        }

        // 3. Csont-fallback mimika Mixamo morphTarget nelkuli karakterekhez
        if (this.enableBoneFallback && this.rigInfo.morphTargetCount === 0) {
            const rawFb = preset.boneFallback || {};
            const fb = seqBoneFallback ? { ...rawFb, ...seqBoneFallback } : rawFb;
            const deg2rad = Math.PI / 180;
            const hz = fb.pulseHz || 1.8;
            const speakAmp = this.isSpeaking ? this.audioAmplitude : 0.75;
            const speakBoost = speakActive ? (1.0 + 0.85 * speakAmp) : 1.0;
            const yawWave = Math.sin(this._speechTime * hz * Math.PI * 2) * (fb.headYawAmpDeg || 1.2) * speakBoost;
            const pitchNod = speakActive ? Math.sin(this._speechTime * (hz * 2.1) * Math.PI * 2) * 2.2 * speakAmp : 0;
            const laughBob = seqLaughPulse > 0.01
                ? -Math.abs(Math.sin(this._mimicTime * 4.2 * Math.PI)) * 3.5 * seqLaughPulse
                : 0;

// === [#HEX:F.0C.18.00] START | name: applyAdditiveEuler | lines: 9 ===
// @calls: none | @calledBy: [#HEX:F.0C.17.00]
            const applyAdditiveEuler = (boneKey, rxDeg, ryDeg, rzDeg) => {
                const bone = this.rigInfo.bonesByKey.get(boneKey);
                if (!bone) return;
                if (Math.abs(rxDeg) < 0.01 && Math.abs(ryDeg) < 0.01 && Math.abs(rzDeg) < 0.01) return;
                _eulerTmp.set(rxDeg * deg2rad * mw, ryDeg * deg2rad * mw, rzDeg * deg2rad * mw, 'YXZ');
                _qBoneDelta.setFromEuler(_eulerTmp);
                bone.quaternion.multiply(_qBoneDelta).normalize();
                this._lastBoneFallback.set(boneKey, _qBoneDelta.clone());
            };
// === [#HEX:F.0C.18.00] END ===

            applyAdditiveEuler('head', (fb.headPitchDeg || 0) + pitchNod + laughBob, (fb.headYawDeg || 0) + yawWave, fb.headRollDeg || 0);
            applyAdditiveEuler('neck', fb.neckPitchDeg || 0, yawWave * 0.35, 0);
            applyAdditiveEuler('spine2', (fb.spine2PitchDeg || 0) + laughBob * 0.45, 0, 0);
        }
    }
// === [#HEX:F.0C.17.00] END ===

// === [#HEX:F.0C.19.00] START | name: getActiveMimicInfo | lines: 14 ===
// @calls: none | @calledBy: [#HEX:F.0C.48.00]
    getActiveMimicInfo() {
        const presets = (this.bank.mimics && this.bank.mimics.presets) || {};
        const preset = presets[this.activeMimicId] || presets.neutral || null;
        return {
            id: this.activeMimicId,
            weight: this.mimicWeight,
            isSpeaking: this.isSpeaking,
            conversationalTalk: Boolean((preset && preset.conversationalTalk) || this.activeMimicId === 'speaking_viseme'),
            usingBoneFallback: this.rigInfo.morphTargetCount === 0,
            liveWeights: this._lastActiveWeights,
            sequencePhase: this._lastSequencePhase,
            preset
        };
    }
// === [#HEX:F.0C.19.00] END ===

// === [#HEX:F.0C.1A.00] START | name: getDiagnostics | lines: 19 ===
// @calls: none | @calledBy: [#HEX:F.07.1B.00], [#HEX:F.07.1C.00], [#HEX:F.07.1E.00], [#HEX:F.0C.38.00], [#HEX:F.0C.39.00]
    getDiagnostics() {
        return {
            matchedBones: this.rigInfo.matchedBones,
            totalCanonicalBones: this.rigInfo.totalCanonicalBones,
            targetBoneCount: this.rigInfo.targetBoneCount,
            hipY: Number(this.rigInfo.hipY.toFixed(4)),
            hipRatio: Number(this.rigInfo.hipRatio.toFixed(4)),
            leftArmDropDeg: this.rigInfo.leftArmDropDeg,
            poseCompensation: this.rigInfo.poseCompensation,
            morphTargetCount: this.rigInfo.morphTargetCount,
            morphTargetNames: this.rigInfo.morphTargetNames,
            faceMaskBound: Boolean(this.rigInfo.faceMaskBound),
            isRigged: this.rigInfo.isRigged,
            activeClip: this.mainClipName,
            upperClip: this.upperClipName,
            activeMimic: this.activeMimicId,
            choreographyActive: Boolean(this._choreography)
        };
    }
// === [#HEX:F.0C.1A.00] END ===

// === [#HEX:F.0C.1B.00] START | name: dispose | lines: 7 ===
// @calls: [#HEX:F.0C.12.00], [#HEX:F.0C.16.00], [#HEX:F.0C.4D.00] | @calledBy: [#HEX:F.02.33.00], [#HEX:F.02.34.00], [#HEX:F.04.1C4.00], [#HEX:F.04.1CF.00], [#HEX:F.0C.2D.00]
    dispose() {
        this._revertBoneFallback();
        this.stopChoreography();
        this.stopCompositeMotion(0);
        this.mixer.stopAllAction();
        this.mixer.uncacheRoot(this.targetRoot);
    }
// === [#HEX:F.0C.1B.00] END ===
}

/**
 * ============================================================================
 * EBPAnimationBank - Kozponti Animacio-Konyvtar es Retargeting Motor
 * ============================================================================
 */
export class EBPAnimationBank {
// === [#HEX:F.0C.1C.00] START | name: constructor | lines: 1 ===
// @calls: none | @calledBy: none
    constructor(options = {}) {
// === [#HEX:F.0C.1C.00] END ===
        this.baseUrl = options.baseUrl || detectDefaultAnimBaseUrl();
        if (!this.baseUrl.endsWith('/')) this.baseUrl += '/';
        this.fallbackBaseUrl = options.fallbackBaseUrl || GCS_ANIM_BASE_URL;
        this.mode = options.mode === 'master' ? 'master' : 'packs';

        this.loader = new GLTFLoader();
        this.manifest = null;
        this.mimics = null;
        this.aiSchema = null;
        this.faceMasks = {};

        this.canonRestLocal = new Map();
        this.canonRestWorld = new Map();
        this.canonTPoseWorld = new Map();
        this.canonParentMap = new Map();
        this.canonTopoOrder = [];
        this.canonHipsRest = new THREE.Vector3(0, 0.9058, 0);
        this.canonHipY = 0.9058;

        this.rawClipsMap = new Map();
        this.loadedPacks = new Set();
        this.masterLoaded = false;
        this.morphTargetNames = [];
        this._initPromise = null;
        this._packPromises = new Map();
        this._masterPromise = null;
    }

// === [#HEX:F.06.71.00] START | name: _fetchJsonWithFallback | lines: 17 ===
// @calls: none | @calledBy: none
    async _fetchJsonWithFallback(relFile) {
        const urls = [this.baseUrl + relFile];
        if (this.fallbackBaseUrl && this.fallbackBaseUrl !== this.baseUrl) {
            urls.push(this.fallbackBaseUrl + relFile);
        }
        let lastErr = null;
        for (const u of urls) {
            try {
                const res = await fetch(u, { cache: 'default' });
                if (res.ok) return await res.json();
                lastErr = new Error(`HTTP ${res.status} (${u})`);
            } catch (e) {
                lastErr = e;
            }
        }
        throw lastErr || new Error('Nem sikerult betolteni: ' + relFile);
    }
// === [#HEX:F.06.71.00] END ===

// === [#HEX:F.0C.1D.00] START | name: _loadGlbWithFallback | lines: 15 ===
// @calls: none | @calledBy: [#HEX:F.0C.20.00], [#HEX:F.0C.21.00], [#HEX:F.0C.22.00]
    async _loadGlbWithFallback(relFile) {
        const urls = [this.baseUrl + relFile];
        if (this.fallbackBaseUrl && this.fallbackBaseUrl !== this.baseUrl) {
            urls.push(this.fallbackBaseUrl + relFile);
        }
        let lastErr = null;
        for (const u of urls) {
            try {
                return await this.loader.loadAsync(u);
            } catch (e) {
                lastErr = e;
            }
        }
        throw lastErr || new Error('Nem sikerult betolteni a GLB-t: ' + relFile);
    }
// === [#HEX:F.0C.1D.00] END ===

    /**
     * Betolti a 3 JSON adatbazist es felepiti a kanonikus csontvaz rest-pose terkepet.
     */
// === [#HEX:F.0C.1E.00] START | name: init | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.0C.20.00], [#HEX:F.0C.21.00], [#HEX:F.0C.26.00], [#HEX:F.0C.54.00]
    async init(options = {}) {
// === [#HEX:F.0C.1E.00] END ===
        if (options.mode) this.mode = options.mode === 'master' ? 'master' : 'packs';
        if (options.baseUrl) {
            this.baseUrl = options.baseUrl.endsWith('/') ? options.baseUrl : options.baseUrl + '/';
        }
        if (this.manifest && this.mimics && this.aiSchema) return this;
        if (this._initPromise) return this._initPromise;

        this._initPromise = (async () => {
            const [manifest, mimics, aiSchema, faceMasksDoc] = await Promise.all([
                this._fetchJsonWithFallback('ebp_animations_manifest.json'),
                this._fetchJsonWithFallback('ebp_mimics_library.json'),
                this._fetchJsonWithFallback('ebp_ai_director_schema.json'),
                this._fetchJsonWithFallback('ebp_face_masks.json?v=20261126f').catch(() => ({ masks: {} }))
            ]);
            this.manifest = manifest;
            this.mimics = mimics;
            this.aiSchema = aiSchema;
            this.faceMasks = (faceMasksDoc && faceMasksDoc.masks && typeof faceMasksDoc.masks === 'object')
                ? faceMasksDoc.masks
                : {};
            this._buildCanonicalRestMaps();
            return this;
        })();

        return this._initPromise;
    }

// === [#HEX:F.0C.1F.00] START | name: _buildCanonicalRestMaps | lines: 50 ===
// @calls: [#HEX:F.04.1F.00], [#HEX:F.0C.00.00], [#HEX:F.0C.06.00] | @calledBy: none
    _buildCanonicalRestMaps() {
        this.canonRestLocal.clear();
        this.canonRestWorld.clear();
        this.canonTPoseWorld.clear();
        this.canonParentMap.clear();
        this.canonTopoOrder = [];

        const skel = (this.manifest && this.manifest.canonicalSkeleton) || {};
        const bones = skel.bones || [];
        const rawToKey = new Map();
        const canonTrans = new Map();

        for (const b of bones) {
            const key = normalizeBoneKey(b.name);
            rawToKey.set(b.name, key);
            const r = b.rotation || [0, 0, 0, 1];
            const t = b.translation || [0, 0, 0];
            this.canonRestLocal.set(key, new THREE.Quaternion(r[0], r[1], r[2], r[3]).normalize());
            canonTrans.set(key, new THREE.Vector3(t[0], t[1], t[2]));
            if (b.parent) {
                this.canonParentMap.set(key, rawToKey.get(b.parent) || normalizeBoneKey(b.parent));
            } else {
                this.canonParentMap.set(key, null);
            }
            this.canonTopoOrder.push(key);
        }

        for (const key of this.canonTopoOrder) {
            const lr = this.canonRestLocal.get(key) || new THREE.Quaternion();
            const pKey = this.canonParentMap.get(key);
            if (pKey && this.canonRestWorld.has(pKey)) {
                const pw = this.canonRestWorld.get(pKey);
                this.canonRestWorld.set(key, pw.clone().multiply(lr).normalize());
            } else {
                this.canonRestWorld.set(key, lr.clone().normalize());
            }
        }

        this.canonTPoseWorld = computeLimbTPoseWorldMap(
            this.canonTopoOrder,
            this.canonParentMap,
            this.canonRestLocal,
            this.canonRestWorld,
            (ck) => canonTrans.get(ck) || null
        );

        const ht = skel.hipsRestTranslation || [0, 0.9058, 0];
        this.canonHipsRest.set(ht[0], ht[1], ht[2]);
        this.canonHipY = skel.hipsHeightMeters > 0.1 ? skel.hipsHeightMeters : 0.9058;
    }
// === [#HEX:F.0C.1F.00] END ===

// === [#HEX:F.01.1F.00] START | name: _registerGltfClips | lines: 16 ===
// @calls: none | @calledBy: [#HEX:F.0C.20.00], [#HEX:F.0C.21.00], [#HEX:F.0C.22.00]
    _registerGltfClips(gltf) {
        const anims = gltf.animations || [];
        for (const clip of anims) {
            this.rawClipsMap.set(clip.name, clip);
        }
        if (gltf.scene) {
            gltf.scene.traverse((obj) => {
                if (obj.isMesh && obj.morphTargetDictionary) {
                    const names = Object.keys(obj.morphTargetDictionary);
                    if (names.length > this.morphTargetNames.length) {
                        this.morphTargetNames = names;
                    }
                }
            });
        }
    }
// === [#HEX:F.01.1F.00] END ===

// === [#HEX:F.0C.20.00] START | name: loadMaster | lines: 18 ===
// @calls: [#HEX:F.01.1F.00], [#HEX:F.0C.1D.00], [#HEX:F.0C.1E.00] | @calledBy: [#HEX:F.0C.26.00]
    async loadMaster() {
        await this.init();
        if (this.masterLoaded) return this.rawClipsMap;
        if (this._masterPromise) return this._masterPromise;

        this._masterPromise = (async () => {
            const rel = (this.manifest && this.manifest.masterFile) || 'ebp_master_animations.glb';
            const gltf = await this._loadGlbWithFallback(rel);
            this._registerGltfClips(gltf);
            this.masterLoaded = true;
            if (this.manifest && this.manifest.packs) {
                Object.keys(this.manifest.packs).forEach((k) => this.loadedPacks.add(k));
            }
            return this.rawClipsMap;
        })();

        return this._masterPromise;
    }
// === [#HEX:F.0C.20.00] END ===

// === [#HEX:F.0C.21.00] START | name: loadPack | lines: 20 ===
// @calls: [#HEX:F.01.1F.00], [#HEX:F.0C.1D.00], [#HEX:F.0C.1E.00], [#HEX:F.0C.22.00] | @calledBy: [#HEX:F.0C.26.00]
    async loadPack(category) {
        await this.init();
        if (this.masterLoaded || this.loadedPacks.has(category)) return this.rawClipsMap;
        if (this._packPromises.has(category)) return this._packPromises.get(category);

        const packInfo = this.manifest && this.manifest.packs && this.manifest.packs[category];
        if (!packInfo) {
            throw new Error('Ismeretlen animacios kategoria csomag: ' + category);
        }

// === [#HEX:F.0C.22.00] START | name: prom | lines: 6 ===
// @calls: [#HEX:F.01.1F.00], [#HEX:F.0C.1D.00] | @calledBy: [#HEX:F.0C.21.00]
        const prom = (async () => {
            const gltf = await this._loadGlbWithFallback(packInfo.file);
            this._registerGltfClips(gltf);
            this.loadedPacks.add(category);
            return this.rawClipsMap;
        })();
// === [#HEX:F.0C.22.00] END ===

        this._packPromises.set(category, prom);
        return prom;
    }
// === [#HEX:F.0C.21.00] END ===

    /**
     * Felold egy klipnevet, Kryst3DMotionClip aliast, vagy magyar/angol keresoszot.
     */
// === [#HEX:F.0C.23.00] START | name: resolveClipName | lines: 55 ===
// @calls: [#HEX:F.0C.05.00] | @calledBy: [#HEX:F.0C.24.00], [#HEX:F.0C.26.00], [#HEX:F.0C.31.00]
    resolveClipName(queryOrAlias) {
        if (!this.manifest) return String(queryOrAlias || '');
        const raw = String(queryOrAlias || '').trim();
        if (!raw) return 'Idle_8';

        const clips = this.manifest.clips || [];
        // 1. Pontos / case-insensitive egyezes
        for (const c of clips) {
            if (c.name === raw) return c.name;
        }
        const rawLower = raw.toLowerCase();
        for (const c of clips) {
            if (c.name.toLowerCase() === rawLower) return c.name;
        }

        // 2. Kryst3DMotionClip alias tabla
        const motionAliases = (this.manifest.krystStudioAliases && this.manifest.krystStudioAliases.motion) || {};
        if (motionAliases[raw]) return motionAliases[raw];
        if (motionAliases[rawLower]) return motionAliases[rawLower];

        // 3. Ekezet-erzeketlen kulcsszavas pontozas
        const qNorm = stripAccents(raw);
        const tokens = qNorm.split(/[\s_,-]+/).filter(Boolean);
        let bestClip = null;
        let bestScore = 0;

        for (const c of clips) {
            let score = 0;
            const nNorm = stripAccents(c.name);
            const tNorm = stripAccents(c.titleHu || '');
            if (tNorm && tNorm === qNorm) score += 14;
            else if (tNorm && tNorm.includes(qNorm)) score += 9;
            if (nNorm.includes(qNorm)) score += 10;
            const hay = [
                nNorm,
                tNorm,
                stripAccents(c.category),
                stripAccents(c.mood),
                ...(c.tagsHu || []).map(stripAccents),
                ...(c.tagsEn || []).map(stripAccents)
            ];
            for (const tok of tokens) {
                for (const h of hay) {
                    if (h === tok) score += 5;
                    else if (h.includes(tok)) score += 2;
                }
            }
            if (score > bestScore) {
                bestScore = score;
                bestClip = c.name;
            }
        }

        return bestClip || (clips[0] ? clips[0].name : raw);
    }
// === [#HEX:F.0C.23.00] END ===

// === [#HEX:F.0C.24.00] START | name: getClipMeta | lines: 5 ===
// @calls: [#HEX:F.0C.23.00] | @calledBy: [#HEX:F.07.1B.00], [#HEX:F.0C.26.00], [#HEX:F.0C.40.00], [#HEX:F.0C.5A.00], [#HEX:F.0C.5C.00]
    getClipMeta(clipName) {
        if (!this.manifest) return null;
        const resolved = this.resolveClipName(clipName);
        return (this.manifest.clips || []).find((c) => c.name === resolved) || null;
    }
// === [#HEX:F.0C.24.00] END ===

// === [#HEX:F.0C.25.00] START | name: searchClips | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.0C.41.00]
    searchClips(query = '', category = 'all', options = {}) {
// === [#HEX:F.0C.25.00] END ===
        if (!this.manifest) return [];
        const q = stripAccents(query);
        const tokens = q.split(/[\s_,-]+/).filter(Boolean);
        const hideTurns = Boolean(options && options.hideTurns);
        const clips = this.manifest.clips || [];

        return clips.filter((c) => {
            if (hideTurns && Array.isArray(c.motionFlags) && (c.motionFlags.includes('full_turn') || c.motionFlags.includes('acrobatic'))) {
                return false;
            }
            if (category && category !== 'all' && category !== 'kryst_aliases' && c.category !== category) {
                return false;
            }
            if (category === 'kryst_aliases') {
                const aliasTargets = new Set(Object.values((this.manifest.krystStudioAliases && this.manifest.krystStudioAliases.motion) || {}));
                if (!aliasTargets.has(c.name)) return false;
            }
            if (tokens.length === 0) return true;
            const hay = [
                stripAccents(c.name),
                stripAccents(c.titleHu || ''),
                stripAccents(c.category),
                stripAccents(c.mood),
                ...(c.tagsHu || []).map(stripAccents),
                ...(c.tagsEn || []).map(stripAccents)
            ].join(' ');
            return tokens.every((t) => hay.includes(t));
        });
    }

// === [#HEX:F.0C.26.00] START | name: ensureClipLoaded | lines: 24 ===
// @calls: [#HEX:F.0C.1E.00], [#HEX:F.0C.20.00], [#HEX:F.0C.21.00], [#HEX:F.0C.23.00], [#HEX:F.0C.24.00] | @calledBy: none
    async ensureClipLoaded(clipOrAlias) {
        await this.init();
        const clipName = this.resolveClipName(clipOrAlias);
        if (this.rawClipsMap.has(clipName)) {
            return this.rawClipsMap.get(clipName);
        }

        if (this.mode === 'master') {
            await this.loadMaster();
        } else {
            const meta = this.getClipMeta(clipName);
            if (meta && meta.category) {
                await this.loadPack(meta.category);
            } else {
                await this.loadMaster();
            }
        }

        const loaded = this.rawClipsMap.get(clipName);
        if (!loaded) {
            throw new Error('A klip nem talalhato a betoltott animacios csomagban: ' + clipName);
        }
        return loaded;
    }
// === [#HEX:F.0C.26.00] END ===

    /**
     * Kinyeri es rogziti a celmodell érintetlen rest-pozat, csontfajlalasat es morphTarget-jeit.
     */
// === [#HEX:F.0C.27.00] START | name: inspectAndExtractRig | lines: 152 ===
// @calls: [#HEX:F.0C.00.00], [#HEX:F.0C.06.00], [#HEX:F.0C.28.00] | @calledBy: none
    inspectAndExtractRig(targetRoot) {
        targetRoot.updateMatrixWorld(true);

        // Ha mar rogzitettuk a rest pozat ezen a modellen, hasznaljuk azt (ne animation-kozben!)
        if (targetRoot.userData && targetRoot.userData._ebpRigInfo) {
            return targetRoot.userData._ebpRigInfo;
        }

        const bonesByKey = new Map();
        const keyByObjUuid = new Map();
        const morphMeshes = [];
        const morphNamesSet = new Set();
        let allBoneCount = 0;

        targetRoot.traverse((obj) => {
            if (obj.isMesh && obj.morphTargetDictionary && obj.morphTargetInfluences) {
                morphMeshes.push({
                    mesh: obj,
                    dictionary: obj.morphTargetDictionary,
                    influences: obj.morphTargetInfluences
                });
                Object.keys(obj.morphTargetDictionary).forEach((k) => morphNamesSet.add(k));
            }
            if (obj.isBone || obj.type === 'Bone' || /mixamorig|smartrigarmature/i.test(obj.name || '')) {
                if (obj.isBone || obj.type === 'Bone') allBoneCount += 1;
                if (obj.name) {
                    const safeName = THREE.PropertyBinding.sanitizeNodeName(obj.name);
                    if (obj.name !== safeName) obj.name = safeName;
                    const key = normalizeBoneKey(safeName);
                    if (key && !bonesByKey.has(key)) {
                        bonesByKey.set(key, obj);
                        keyByObjUuid.set(obj.uuid, key);
                    }
                }
            }
        });

        const restLocal = new Map();
        const restWorld = new Map();
        const parentKeyMap = new Map();
        const topoKeys = [];

        const rootWorldQuat = new THREE.Quaternion();
        targetRoot.getWorldQuaternion(rootWorldQuat);
        const rootWorldPos = new THREE.Vector3();
        targetRoot.getWorldPosition(rootWorldPos);

        // Topologiai sorrendben kiszamoljuk a celmodell vilag-rest kvaterniokat (targetRoot lokalishoz viszonyitva)
        const rootInvQuat = rootWorldQuat.clone().invert();
// === [#HEX:F.0C.28.00] START | name: visit | lines: 25 ===
// @calls: none | @calledBy: [#HEX:F.0C.27.00]
        const visit = (obj) => {
            const key = keyByObjUuid.get(obj.uuid);
            if (key) {
                restLocal.set(key, obj.quaternion.clone().normalize());
                const objWorldQ = new THREE.Quaternion();
                obj.getWorldQuaternion(objWorldQ);
                // targetRoot-relativ vilag-rotacio (ha targetRoot elforgatva all a szinpadon, megmarad)
                restWorld.set(key, rootInvQuat.clone().multiply(objWorldQ).normalize());

                let pObj = obj.parent;
                let pKey = null;
                while (pObj && pObj !== targetRoot) {
                    if (keyByObjUuid.has(pObj.uuid)) {
                        pKey = keyByObjUuid.get(pObj.uuid);
                        break;
                    }
                    pObj = pObj.parent;
                }
                parentKeyMap.set(key, pKey);
                topoKeys.push(key);
            }
            for (const ch of obj.children) {
                visit(ch);
            }
        };
// === [#HEX:F.0C.28.00] END ===
        visit(targetRoot);

        // Csipomagassag es parent scale kinyerese (Blender 0.01 Armature skálázás ellen is ved!)
        const hipsBone = bonesByKey.get('hips') || null;
        let hipY = this.canonHipY;
        const hipsRestPos = new THREE.Vector3(0, this.canonHipY, 0);
        const hipsParentScale = new THREE.Vector3(1, 1, 1);

        if (hipsBone) {
            hipsRestPos.copy(hipsBone.position);
            const hw = new THREE.Vector3();
            hipsBone.getWorldPosition(hw);
            const deltaY = hw.y - rootWorldPos.y;
            if (deltaY > 0.05) hipY = deltaY;
            if (hipsBone.parent) {
                hipsBone.parent.getWorldScale(hipsParentScale);
                if (hipsParentScale.x < 1e-5) hipsParentScale.x = 1;
                if (hipsParentScale.y < 1e-5) hipsParentScale.y = 1;
                if (hipsParentScale.z < 1e-5) hipsParentScale.z = 1;
            }
        }

        let matchedBones = 0;
        for (const cKey of this.canonTopoOrder) {
            if (cKey !== 'smartrigarmature' && bonesByKey.has(cKey)) {
                matchedBones += 1;
            }
        }

        const tposeWorld = computeLimbTPoseWorldMap(
            topoKeys,
            parentKeyMap,
            restLocal,
            restWorld,
            (ck) => {
                const chBone = bonesByKey.get(ck);
                return chBone ? chBone.position : null;
            }
        );

        // Bal felkar kiindulo dolesszoge (A-poz vs T-poz diagnosztika)
        let leftArmDropDeg = 0;
        const laW = restWorld.get('leftarm');
        const lfaBone = bonesByKey.get('leftforearm');
        if (laW && lfaBone && lfaBone.position.lengthSq() > 1e-8) {
            const d = lfaBone.position.clone().normalize().applyQuaternion(laW);
            leftArmDropDeg = Math.round(Math.atan2(-d.y, Math.abs(d.x) + 1e-6) * 1800 / Math.PI) / 10;
        }
        const poseCompensation = Math.abs(leftArmDropDeg) > 12 ? `${leftArmDropDeg}° A-póz kompenzálva` : 'T-póz (natív)';

        const rigInfo = {
            bonesByKey,
            restLocal,
            restWorld,
            tposeWorld,
            parentKeyMap,
            topoKeys,
            hipsBone,
            headBone: bonesByKey.get('head') || null,
            hipsRestPos,
            hipsParentScale,
            hipY,
            hipRatio: hipY / (this.canonHipY || 0.9058),
            leftArmDropDeg,
            poseCompensation,
            matchedBones,
            totalCanonicalBones: Math.max(1, this.canonTopoOrder.length - 1),
            targetBoneCount: allBoneCount || bonesByKey.size,
            morphMeshes,
            morphTargetNames: [...morphNamesSet],
            morphTargetCount: morphNamesSet.size,
            isRigged: matchedBones >= 10,
            clipCache: new Map()
        };

        targetRoot.userData = targetRoot.userData || {};
        targetRoot.userData._ebpRigInfo = rigInfo;
        return rigInfo;
    }
// === [#HEX:F.0C.27.00] END ===

    /**
     * Torzulasmentes vilag-delta retargeting barmely Mixamo / SmartRig karakterre.
     */
// === [#HEX:F.0C.29.00] START | name: retargetClipForModel | lines: 1 ===
// @calls: none | @calledBy: none
    retargetClipForModel(sourceClip, rigInfo, options = {}) {
// === [#HEX:F.0C.29.00] END ===
        const lockRootXZ = Boolean(options.lockRootXZ);
        const upperBodyOnly = Boolean(options.upperBodyOnly);
        const cacheKey = `${sourceClip.name}|${lockRootXZ ? 'lock' : 'free'}|${upperBodyOnly ? 'upper' : 'full'}`;

        if (rigInfo.clipCache.has(cacheKey)) {
            return rigInfo.clipCache.get(cacheKey);
        }

        const srcQuatTracks = new Map();
        let srcHipsPosTrack = null;
        const morphTracks = [];

        for (const tr of sourceClip.tracks) {
            const { nodeName, propertyName } = parseTrackNodeAndProp(tr.name);
            const bKey = normalizeBoneKey(nodeName);
            if (propertyName === 'quaternion') {
                srcQuatTracks.set(bKey, tr);
            } else if (propertyName === 'position' && bKey === 'hips') {
                srcHipsPosTrack = tr;
            } else if (propertyName.startsWith('morphTargetInfluences')) {
                morphTracks.push(tr);
            }
        }

        const duration = Math.max(0.033, sourceClip.duration || 0.033);
        let primaryTimes = null;
        const hipsSrcTrack = srcQuatTracks.get('hips');
        if (hipsSrcTrack && hipsSrcTrack.times && hipsSrcTrack.times.length >= 2) {
            primaryTimes = hipsSrcTrack.times;
        } else {
            for (const tr of srcQuatTracks.values()) {
                if (tr.times && tr.times.length >= 2 && (!primaryTimes || tr.times.length > primaryTimes.length)) {
                    primaryTimes = tr.times;
                }
            }
        }

        let times;
        if (primaryTimes && primaryTimes.length <= 7200) {
            times = new Float32Array(primaryTimes);
        } else {
            const fallbackCount = Math.max(2, Math.min(7200, Math.ceil(duration * 30) + 1));
            times = new Float32Array(fallbackCount);
            for (let i = 0; i < fallbackCount; i++) {
                times[i] = i === fallbackCount - 1 ? duration : (i / (fallbackCount - 1)) * duration;
            }
        }
        const frameCount = times.length;

        // Cel-csontok kivalasztasa (mind a kanonikus + cel modellben meglevo csontok)
        const targetKeys = [];
        for (const tKey of rigInfo.topoKeys) {
            if (tKey === 'smartrigarmature') continue;
            if (upperBodyOnly && !UPPER_BODY_BONES.has(tKey)) continue;
            if (srcQuatTracks.has(tKey)) {
                targetKeys.push(tKey);
            }
        }

        const quatBuffers = new Map();
        for (const k of targetKeys) {
            quatBuffers.set(k, new Float32Array(frameCount * 4));
        }
        const hipsPosBuffer = (!upperBodyOnly && srcHipsPosTrack && rigInfo.hipsBone)
            ? new Float32Array(frameCount * 3)
            : null;

        const canonAnimWorld = new Map();
        const canonDeltas = new Map();
        const tgtAnimWorld = new Map();

        for (let f = 0; f < frameCount; f++) {
            const t = times[f];

            // 1. Kanonikus vilag-rotaciok es vilag-delta szamitasa (vesztesegmentes kulcskockakon)
            for (const cKey of this.canonTopoOrder) {
                const tr = srcQuatTracks.get(cKey);
                if (tr) {
                    if (tr.times.length === frameCount && Math.abs(tr.times[f] - t) < 1e-5) {
                        const vi = f * 4;
                        _qTmpLocal.set(tr.values[vi], tr.values[vi + 1], tr.values[vi + 2], tr.values[vi + 3]).normalize();
                    } else {
                        sampleQuatTrackInto(tr.times, tr.values, t, _qTmpLocal);
                    }
                } else {
                    _qTmpLocal.copy(this.canonRestLocal.get(cKey) || _qTmpInv.identity());
                }

                const pKey = this.canonParentMap.get(cKey);
                if (pKey && canonAnimWorld.has(pKey)) {
                    _qTmpWorld.copy(canonAnimWorld.get(pKey)).multiply(_qTmpLocal).normalize();
                } else {
                    _qTmpWorld.copy(_qTmpLocal).normalize();
                }

                let cWorld = canonAnimWorld.get(cKey);
                if (!cWorld) {
                    cWorld = new THREE.Quaternion();
                    canonAnimWorld.set(cKey, cWorld);
                }
                cWorld.copy(_qTmpWorld);

                const cTPoseW = this.canonTPoseWorld.get(cKey) || this.canonRestWorld.get(cKey);
                if (cTPoseW) {
                    _qTmpInv.copy(cTPoseW).invert();
                    _qTmpDelta.copy(cWorld).multiply(_qTmpInv).normalize();
                    let dStore = canonDeltas.get(cKey);
                    if (!dStore) {
                        dStore = new THREE.Quaternion();
                        canonDeltas.set(cKey, dStore);
                    }
                    dStore.copy(_qTmpDelta);
                }
            }

            // 2. Celmodell vilag- es lokalis rotacioinak szamitasa topologiai sorrendben
            for (const tKey of rigInfo.topoKeys) {
                const tRestW = rigInfo.restWorld.get(tKey);
                const tTPoseW = (rigInfo.tposeWorld && rigInfo.tposeWorld.get(tKey)) || tRestW;
                const pKey = rigInfo.parentKeyMap.get(tKey);

                if (upperBodyOnly && !UPPER_BODY_BONES.has(tKey)) {
                    // Alsotest maradjon a celmodell rest-vilagaban (csipok nem mozdulnak)
                    let tw = tgtAnimWorld.get(tKey);
                    if (!tw) { tw = new THREE.Quaternion(); tgtAnimWorld.set(tKey, tw); }
                    if (pKey && tgtAnimWorld.has(pKey)) {
                        tw.copy(tgtAnimWorld.get(pKey)).multiply(rigInfo.restLocal.get(tKey)).normalize();
                    } else {
                        tw.copy(tRestW);
                    }
                    continue;
                }

                const delta = canonDeltas.get(tKey);
                let tw = tgtAnimWorld.get(tKey);
                if (!tw) { tw = new THREE.Quaternion(); tgtAnimWorld.set(tKey, tw); }

                if (delta) {
                    tw.copy(delta).multiply(tTPoseW).normalize();
                } else if (pKey && tgtAnimWorld.has(pKey)) {
                    tw.copy(tgtAnimWorld.get(pKey)).multiply(rigInfo.restLocal.get(tKey)).normalize();
                } else {
                    tw.copy(tRestW);
                }

                const buf = quatBuffers.get(tKey);
                if (buf) {
                    if (pKey && tgtAnimWorld.has(pKey)) {
                        _qTmpParentW.copy(tgtAnimWorld.get(pKey)).invert();
                        _qTmpLocal.copy(_qTmpParentW).multiply(tw).normalize();
                    } else {
                        const boneObj = rigInfo.bonesByKey.get(tKey);
                        if (boneObj && boneObj.parent) {
                            // targetRoot-relativ restParentWorld = restWorld * inv(restLocal)
                            _qTmpInv.copy(rigInfo.restLocal.get(tKey)).invert();
                            _qTmpParentW.copy(tRestW).multiply(_qTmpInv).invert();
                            _qTmpLocal.copy(_qTmpParentW).multiply(tw).normalize();
                        } else {
                            _qTmpLocal.copy(tw);
                        }
                    }

                    // Hemisphere folytonossag az elozo frame-hez kepest
                    const off = f * 4;
                    if (f > 0) {
                        const prevOff = (f - 1) * 4;
                        const dot = buf[prevOff] * _qTmpLocal.x + buf[prevOff + 1] * _qTmpLocal.y + buf[prevOff + 2] * _qTmpLocal.z + buf[prevOff + 3] * _qTmpLocal.w;
                        if (dot < 0) {
                            _qTmpLocal.x = -_qTmpLocal.x;
                            _qTmpLocal.y = -_qTmpLocal.y;
                            _qTmpLocal.z = -_qTmpLocal.z;
                            _qTmpLocal.w = -_qTmpLocal.w;
                        }
                    }
                    buf[off] = _qTmpLocal.x;
                    buf[off + 1] = _qTmpLocal.y;
                    buf[off + 2] = _qTmpLocal.z;
                    buf[off + 3] = _qTmpLocal.w;
                }
            }

            // 3. Hips pozicio aranyositasa es lokalis skalahoz igazitasa
            if (hipsPosBuffer) {
                if (srcHipsPosTrack.times.length === frameCount && Math.abs(srcHipsPosTrack.times[f] - t) < 1e-5) {
                    const pi = f * 3;
                    _vTmpPos.set(srcHipsPosTrack.values[pi], srcHipsPosTrack.values[pi + 1], srcHipsPosTrack.values[pi + 2]);
                } else {
                    sampleVec3TrackInto(srcHipsPosTrack.times, srcHipsPosTrack.values, t, _vTmpPos);
                }
                const ratio = rigInfo.hipRatio;
                const ps = rigInfo.hipsParentScale;
                const dx = lockRootXZ ? 0 : ((_vTmpPos.x - this.canonHipsRest.x) * ratio) / ps.x;
                const dy = ((_vTmpPos.y - this.canonHipsRest.y) * ratio) / ps.y;
                const dz = lockRootXZ ? 0 : ((_vTmpPos.z - this.canonHipsRest.z) * ratio) / ps.z;
                const pOff = f * 3;
                hipsPosBuffer[pOff] = rigInfo.hipsRestPos.x + dx;
                hipsPosBuffer[pOff + 1] = rigInfo.hipsRestPos.y + dy;
                hipsPosBuffer[pOff + 2] = rigInfo.hipsRestPos.z + dz;
            }
        }

        const outTracks = [];
        if (hipsPosBuffer && rigInfo.hipsBone) {
            outTracks.push(new THREE.VectorKeyframeTrack(rigInfo.hipsBone.name + '.position', times, hipsPosBuffer));
        }
        for (const k of targetKeys) {
            const boneObj = rigInfo.bonesByKey.get(k);
            const buf = quatBuffers.get(k);
            if (boneObj && buf) {
                outTracks.push(new THREE.QuaternionKeyframeTrack(boneObj.name + '.quaternion', times, buf));
            }
        }

        // Morph tracks tovabbitasa (ha a forrasban es a celmodellben is leteznek)
        if (morphTracks.length > 0 && rigInfo.morphMeshes.length > 0 && this.morphTargetNames.length > 0) {
            for (const mTr of morphTracks) {
                for (const mEntry of rigInfo.morphMeshes) {
                    const mCount = mEntry.influences.length;
                    const srcN = this.morphTargetNames.length;
                    const srcFrames = Math.floor(mTr.values.length / srcN);
                    if (srcFrames < 1) continue;
                    const mapped = new Float32Array(srcFrames * mCount);
                    for (let si = 0; si < srcN; si++) {
                        const tgtIdx = mEntry.dictionary[this.morphTargetNames[si]];
                        if (typeof tgtIdx === 'number') {
                            for (let fi = 0; fi < srcFrames; fi++) {
                                mapped[fi * mCount + tgtIdx] = mTr.values[fi * srcN + si];
                            }
                        }
                    }
                    outTracks.push(new THREE.NumberKeyframeTrack(mEntry.mesh.name + '.morphTargetInfluences', mTr.times, mapped));
                }
            }
        }

        const retargetedClip = new THREE.AnimationClip(sourceClip.name + '__' + cacheKey, duration, outTracks);
        rigInfo.clipCache.set(cacheKey, retargetedClip);
        return retargetedClip;
    }

    /**
     * Kigyujti a Head csonthoz kotott SkinnedMesh adatokat es az elulso arc-vertexeket
     * a 3D Sablon Arc-Maszk becslesehez es GPU MorphTarget tapadasahoz.
     */
// === [#HEX:F.0C.2A.00] START | name: _collectHeadFaceData | lines: 77 ===
// @calls: [#HEX:F.0C.01.00], [#HEX:F.0C.06.00] | @calledBy: [#HEX:F.0C.2B.00], [#HEX:F.0C.2D.00]
    _collectHeadFaceData(rigInfo, targetRoot) {
        const meshes = [];
        const frontHeadPoints = [];
        let topYEst = 0.22;

        const topBone = rigInfo.bonesByKey.get('headtopend');
        if (topBone && topBone.position && topBone.position.y > 0.05) {
            topYEst = clampNum(topBone.position.y, 0.18, 0.25);
        }

        targetRoot.traverse((obj) => {
            if (!obj.isSkinnedMesh || !obj.skeleton || !obj.geometry) return;
            const bones = obj.skeleton.bones || [];
            let headJointIdx = -1;
            let headFrontJointIdx = -1;
            for (let i = 0; i < bones.length; i++) {
                const bk = normalizeBoneKey(bones[i] && bones[i].name);
                if (bk === 'head' && headJointIdx === -1) headJointIdx = i;
                else if (bk === 'headfront' && headFrontJointIdx === -1) headFrontJointIdx = i;
            }
            if (headJointIdx === -1) return;

            obj.skeleton.calculateInverses && (!obj.skeleton.boneInverses || !obj.skeleton.boneInverses[headJointIdx]) && obj.skeleton.calculateInverses();
            const boneInv = obj.skeleton.boneInverses[headJointIdx];
            if (!boneInv) return;

            if (!obj.userData) obj.userData = {};
            if (!obj.userData._ebpBaseGeo) {
                obj.userData._ebpBaseGeo = obj.geometry;
            }
            const baseGeo = obj.userData._ebpBaseGeo;
            const posAttr = baseGeo.attributes && baseGeo.attributes.position;
            const idxAttr = baseGeo.attributes && baseGeo.attributes.skinIndex;
            const wgtAttr = baseGeo.attributes && baseGeo.attributes.skinWeight;
            if (!posAttr || !idxAttr || !wgtAttr) return;

            // mesh -> bind Head-local matrix
            const matMeshToHead = boneInv.clone().multiply(obj.bindMatrix);
            // Head-local irany/elmozdulas -> mesh-local linearis matrix (0 eltolas, nem normalizal!)
            const matHeadToMeshLinear = matMeshToHead.clone().invert();
            matHeadToMeshLinear.elements[12] = 0;
            matHeadToMeshLinear.elements[13] = 0;
            matHeadToMeshLinear.elements[14] = 0;

            const vertCount = posAttr.count;
            const pTmp = new THREE.Vector3();
            for (let vi = 0; vi < vertCount; vi++) {
                let hw = 0;
                const j0 = Math.round(idxAttr.getX(vi));
                const j1 = Math.round(idxAttr.getY(vi));
                const j2 = Math.round(idxAttr.getZ(vi));
                const j3 = Math.round(idxAttr.getW(vi));
                if (j0 === headJointIdx || j0 === headFrontJointIdx) hw += wgtAttr.getX(vi);
                if (j1 === headJointIdx || j1 === headFrontJointIdx) hw += wgtAttr.getY(vi);
                if (j2 === headJointIdx || j2 === headFrontJointIdx) hw += wgtAttr.getZ(vi);
                if (j3 === headJointIdx || j3 === headFrontJointIdx) hw += wgtAttr.getW(vi);

                if (hw >= 0.35) {
                    pTmp.set(posAttr.getX(vi), posAttr.getY(vi), posAttr.getZ(vi)).applyMatrix4(matMeshToHead);
                    if (pTmp.z > 0.005) {
                        frontHeadPoints.push([pTmp.x, pTmp.y, pTmp.z]);
                    }
                }
            }

            meshes.push({
                mesh: obj,
                baseGeo,
                headJointIdx,
                headFrontJointIdx,
                matMeshToHead,
                matHeadToMeshLinear
            });
        });

        return { meshes, frontHeadPoints, topYEst };
    }
// === [#HEX:F.0C.2A.00] END ===

    /**
     * Kiszamitja az alapertelmezett 7 fogopontos sablon arc-maszkot (Head-lokalis terben).
     */
// === [#HEX:F.0C.2B.00] START | name: estimateDefaultFaceMask | lines: 49 ===
// @calls: [#HEX:F.0C.01.00], [#HEX:F.0C.2A.00], [#HEX:F.0C.2C.00] | @calledBy: [#HEX:F.0C.3F.00]
    estimateDefaultFaceMask(rigInfo, targetRoot) {
        const data = this._collectHeadFaceData(rigInfo, targetRoot);
        const H = data.topYEst || 0.22;
        const pts = data.frontHeadPoints;

// === [#HEX:F.0C.2C.00] START | name: snapZ | lines: 15 ===
// @calls: none | @calledBy: [#HEX:F.0C.2B.00]
        const snapZ = (tx, ty, fallbackZ) => {
            if (!pts || pts.length === 0) return fallbackZ;
            let bestDistSq = Infinity;
            let bestZ = fallbackZ;
            for (let i = 0; i < pts.length; i++) {
                const dx = pts[i][0] - tx;
                const dy = pts[i][1] - ty;
                const d2 = dx * dx + dy * dy;
                if (d2 < bestDistSq) {
                    bestDistSq = d2;
                    bestZ = pts[i][2];
                }
            }
            return Number((bestZ + 0.002).toFixed(5));
        };
// === [#HEX:F.0C.2C.00] END ===

        let defZ = 0.095;
        const hfBone = rigInfo.bonesByKey.get('headfront');
        if (hfBone && hfBone.position && hfBone.position.z > 0.03) {
            defZ = clampNum(hfBone.position.z, 0.06, 0.16);
        }

        const browX = 0.18 * H;
        const browY = 0.62 * H;
        const eyeX = 0.17 * H;
        const eyeY = 0.48 * H;
        const mouthX = 0.16 * H;
        const mouthY = 0.21 * H;
        const mcY = 0.19 * H;

        return {
            version: 1,
            maskScale: 1.0,
            points: {
                browL: [Number(browX.toFixed(5)), Number(browY.toFixed(5)), snapZ(browX, browY, defZ)],
                browR: [Number((-browX).toFixed(5)), Number(browY.toFixed(5)), snapZ(-browX, browY, defZ)],
                eyeL: [Number(eyeX.toFixed(5)), Number(eyeY.toFixed(5)), snapZ(eyeX, eyeY, defZ)],
                eyeR: [Number((-eyeX).toFixed(5)), Number(eyeY.toFixed(5)), snapZ(-eyeX, eyeY, defZ)],
                mouthL: [Number(mouthX.toFixed(5)), Number(mouthY.toFixed(5)), snapZ(mouthX, mouthY, defZ)],
                mouthR: [Number((-mouthX).toFixed(5)), Number(mouthY.toFixed(5)), snapZ(-mouthX, mouthY, defZ)],
                mouthCenter: [0, Number(mcY.toFixed(5)), snapZ(0, mcY, defZ)]
            }
        };
    }
// === [#HEX:F.0C.2B.00] END ===

    /**
     * Ratapasztja a 7 fogopontos 3D Sablon Arc-Maszkot a karakter SkinnedMesh halojara
     * (19 valodi GPU ARKit MorphTarget zonava forditva, barmilyen skinning-sulyrongalas nelkul).
     */
// === [#HEX:F.0C.2D.00] START | name: bindFaceMaskToModel | lines: 246 ===
// @calls: [#HEX:F.0C.01.00], [#HEX:F.0C.02.00], [#HEX:F.0C.03.00], [#HEX:F.0C.1B.00], [#HEX:F.0C.2A.00] | @calledBy: [#HEX:F.0C.3E.00]
    bindFaceMaskToModel(rigInfo, targetRoot, maskProfile) {
        if (!rigInfo || !targetRoot || !maskProfile || !maskProfile.points) {
            return { boundMeshes: 0, affectedVertices: 0, morphCount: 0 };
        }
        const pts = maskProfile.points;
        for (const lm of FACE_MASK_LANDMARKS) {
            if (!Array.isArray(pts[lm.id]) || pts[lm.id].length < 3) {
                throw new Error('Hianyzo arcmaszk fogopont: ' + lm.id);
            }
        }

        const data = this._collectHeadFaceData(rigInfo, targetRoot);
        if (data.meshes.length === 0) {
            return { boundMeshes: 0, affectedVertices: 0, morphCount: 0 };
        }

// === [#HEX:F.0C.2E.00] START | name: toVec | lines: 217 ===
// @calls: [#HEX:F.0C.01.00], [#HEX:F.0C.02.00], [#HEX:F.0C.03.00], [#HEX:F.0C.1B.00] | @calledBy: [#HEX:F.0C.2D.00]
        const toVec = (arr) => new THREE.Vector3(Number(arr[0]) || 0, Number(arr[1]) || 0, Number(arr[2]) || 0);
        const browL = toVec(pts.browL);
        const browR = toVec(pts.browR);
        const eyeL = toVec(pts.eyeL);
        const eyeR = toVec(pts.eyeR);
        const mouthL = toVec(pts.mouthL);
        const mouthR = toVec(pts.mouthR);
        const mouthCenter = toVec(pts.mouthCenter);

        const maskScale = clampNum(Number(maskProfile.maskScale) || 1.0, 0.5, 1.8);
        const interEye = Math.max(0.03, eyeL.distanceTo(eyeR));
        const mouthHalfW = Math.max(0.015, 0.5 * mouthL.distanceTo(mouthR));
        const eyeMidY = 0.5 * (eyeL.y + eyeR.y);
        const eyeToMouth = Math.max(0.03, eyeMidY - mouthCenter.y);

        const eyeRad = clampNum(interEye * 0.34, 0.016, 0.042) * maskScale;
        const browRad = clampNum(interEye * 0.42, 0.020, 0.052) * maskScale;
        const mouthRad = clampNum(mouthHalfW * 1.15, 0.022, 0.060) * maskScale;
        const jawRad = clampNum(Math.max(mouthHalfW * 1.35, eyeToMouth * 0.68), 0.028, 0.075) * maskScale;
        const zCutoff = Math.min(eyeL.z, eyeR.z, mouthCenter.z) - 0.065 * maskScale;

        const midBrow = browL.clone().add(browR).multiplyScalar(0.5);
        const innerBrowL = browL.clone().lerp(midBrow, 0.45);
        const innerBrowR = browR.clone().lerp(midBrow, 0.45);
        const jawCenter = new THREE.Vector3(mouthCenter.x, mouthCenter.y - 0.14 * jawRad, mouthCenter.z);
        const cheekL = eyeL.clone().multiplyScalar(0.55).addScaledVector(mouthL, 0.45);
        const cheekR = eyeR.clone().multiplyScalar(0.55).addScaledVector(mouthR, 0.45);

        const morphCount = FACE_MASK_MORPH_NAMES.length;
        const pHead = new THREE.Vector3();
        const dHead = new THREE.Vector3();
        const dMesh = new THREE.Vector3();

        const newMorphMeshes = [];
        let totalAffectedVerts = 0;

        for (const mInfo of data.meshes) {
            const { mesh, baseGeo, headJointIdx, headFrontJointIdx, matMeshToHead, matHeadToMeshLinear } = mInfo;
            const posAttr = baseGeo.attributes.position;
            const idxAttr = baseGeo.attributes.skinIndex;
            const wgtAttr = baseGeo.attributes.skinWeight;
            const vCount = posAttr.count;

            const arrays = FACE_MASK_MORPH_NAMES.map(() => new Float32Array(vCount * 3));
            const deltas = FACE_MASK_MORPH_NAMES.map(() => new THREE.Vector3());

            for (let vi = 0; vi < vCount; vi++) {
                let hw = 0;
                const j0 = Math.round(idxAttr.getX(vi));
                const j1 = Math.round(idxAttr.getY(vi));
                const j2 = Math.round(idxAttr.getZ(vi));
                const j3 = Math.round(idxAttr.getW(vi));
                if (j0 === headJointIdx || j0 === headFrontJointIdx) hw += wgtAttr.getX(vi);
                if (j1 === headJointIdx || j1 === headFrontJointIdx) hw += wgtAttr.getY(vi);
                if (j2 === headJointIdx || j2 === headFrontJointIdx) hw += wgtAttr.getZ(vi);
                if (j3 === headJointIdx || j3 === headFrontJointIdx) hw += wgtAttr.getW(vi);
                if (hw < 0.35) continue;

                pHead.set(posAttr.getX(vi), posAttr.getY(vi), posAttr.getZ(vi)).applyMatrix4(matMeshToHead);
                if (pHead.z <= zCutoff) continue;

                const hBlend = smoothstepNum(0.35, 0.75, hw);
                const zBlend = smoothstepNum(zCutoff, zCutoff + 0.025 * maskScale, pHead.z);
                const baseMask = hBlend * zBlend;
                if (baseMask <= 1e-4) continue;

                let vertMoved = false;
                for (let mi = 0; mi < morphCount; mi++) deltas[mi].set(0, 0, 0);

                // 1. Bal szem (eyeBlinkLeft, eyeWideLeft, eyeSquintLeft)
                const distEyeL = pHead.distanceTo(eyeL);
                if (distEyeL < eyeRad * 1.1) {
                    const dy = pHead.y - eyeL.y;
                    const uUpper = smoothstepNum(-0.20 * eyeRad, 0.08 * eyeRad, dy);
                    const uLower = 1.0 - uUpper;
                    const wEye = raisedCosFalloff(distEyeL, eyeRad) * baseMask;
                    if (wEye > 1e-4) {
                        deltas[0].addScaledVector(dHead.set(0, (-0.0115 * uUpper + 0.0035 * uLower) * maskScale, (0.002 * uUpper + 0.001 * uLower) * maskScale), wEye); // eyeBlinkLeft
                    }
                    const wEyeExt = raisedCosFalloff(distEyeL, eyeRad * 1.1) * baseMask;
                    if (wEyeExt > 1e-4) {
                        const wideGate = smoothstepNum(-0.10 * eyeRad, 0.20 * eyeRad, dy);
                        const squintGate = smoothstepNum(0.20 * eyeRad, -0.20 * eyeRad, dy);
                        deltas[2].addScaledVector(dHead.set(0, 0.0085 * maskScale, 0), wEyeExt * wideGate); // eyeWideLeft
                        deltas[4].addScaledVector(dHead.set(0, 0.0075 * maskScale, 0.002 * maskScale), wEyeExt * squintGate); // eyeSquintLeft
                    }
                }

                // 2. Jobb szem (eyeBlinkRight, eyeWideRight, eyeSquintRight)
                const distEyeR = pHead.distanceTo(eyeR);
                if (distEyeR < eyeRad * 1.1) {
                    const dy = pHead.y - eyeR.y;
                    const uUpper = smoothstepNum(-0.20 * eyeRad, 0.08 * eyeRad, dy);
                    const uLower = 1.0 - uUpper;
                    const wEye = raisedCosFalloff(distEyeR, eyeRad) * baseMask;
                    if (wEye > 1e-4) {
                        deltas[1].addScaledVector(dHead.set(0, (-0.0115 * uUpper + 0.0035 * uLower) * maskScale, (0.002 * uUpper + 0.001 * uLower) * maskScale), wEye); // eyeBlinkRight
                    }
                    const wEyeExt = raisedCosFalloff(distEyeR, eyeRad * 1.1) * baseMask;
                    if (wEyeExt > 1e-4) {
                        const wideGate = smoothstepNum(-0.10 * eyeRad, 0.20 * eyeRad, dy);
                        const squintGate = smoothstepNum(0.20 * eyeRad, -0.20 * eyeRad, dy);
                        deltas[3].addScaledVector(dHead.set(0, 0.0085 * maskScale, 0), wEyeExt * wideGate); // eyeWideRight
                        deltas[5].addScaledVector(dHead.set(0, 0.0075 * maskScale, 0.002 * maskScale), wEyeExt * squintGate); // eyeSquintRight
                    }
                }

                // 3. Szemoldok (browDownL/R, browInnerUp, browOuterUpL/R)
                const wBrowL = raisedCosFalloff(pHead.distanceTo(browL), browRad) * baseMask;
                if (wBrowL > 1e-4) {
                    deltas[6].addScaledVector(dHead.set(-0.004 * maskScale, -0.011 * maskScale, 0), wBrowL); // browDownLeft
                    deltas[9].addScaledVector(dHead.set(0, 0.0125 * maskScale, 0), wBrowL); // browOuterUpLeft
                }
                const wBrowR = raisedCosFalloff(pHead.distanceTo(browR), browRad) * baseMask;
                if (wBrowR > 1e-4) {
                    deltas[7].addScaledVector(dHead.set(0.004 * maskScale, -0.011 * maskScale, 0), wBrowR); // browDownRight
                    deltas[10].addScaledVector(dHead.set(0, 0.0125 * maskScale, 0), wBrowR); // browOuterUpRight
                }
                const wInnerL = raisedCosFalloff(pHead.distanceTo(innerBrowL), browRad * 0.95);
                const wInnerR = raisedCosFalloff(pHead.distanceTo(innerBrowR), browRad * 0.95);
                const wInner = Math.max(wInnerL, wInnerR) * baseMask;
                if (wInner > 1e-4) {
                    deltas[8].addScaledVector(dHead.set(0, 0.012 * maskScale, 0), wInner); // browInnerUp
                }

                // 4. Allkapocs / Beszed (jawOpen)
                const wJawBase = raisedCosFalloff(pHead.distanceTo(jawCenter), jawRad * 1.2) * baseMask;
                if (wJawBase > 1e-4) {
                    const jawGate = smoothstepNum(mouthCenter.y + 0.18 * jawRad, mouthCenter.y - 0.18 * jawRad, pHead.y);
                    const wJaw = wJawBase * jawGate;
                    if (wJaw > 1e-4) {
                        deltas[11].addScaledVector(dHead.set(0, -0.026 * maskScale, -0.006 * maskScale), wJaw); // jawOpen
                    }
                }

                // 5. Szaj (mouthFunnel, mouthSmileL/R, mouthFrownL/R, mouthStretchL/R)
                const wML = raisedCosFalloff(pHead.distanceTo(mouthL), mouthRad) * baseMask;
                if (wML > 1e-4) {
                    deltas[12].addScaledVector(dHead.set(-0.010 * maskScale, 0, 0.009 * maskScale), wML); // mouthFunnel
                    deltas[13].addScaledVector(dHead.set(0.006 * maskScale, 0.013 * maskScale, -0.004 * maskScale), wML); // mouthSmileLeft
                    deltas[15].addScaledVector(dHead.set(-0.002 * maskScale, -0.011 * maskScale, -0.002 * maskScale), wML); // mouthFrownLeft
                    deltas[19].addScaledVector(dHead.set(0.012 * maskScale, 0, -0.002 * maskScale), wML); // mouthStretchLeft
                }
                const wMR = raisedCosFalloff(pHead.distanceTo(mouthR), mouthRad) * baseMask;
                if (wMR > 1e-4) {
                    deltas[12].addScaledVector(dHead.set(0.010 * maskScale, 0, 0.009 * maskScale), wMR); // mouthFunnel
                    deltas[14].addScaledVector(dHead.set(-0.006 * maskScale, 0.013 * maskScale, -0.004 * maskScale), wMR); // mouthSmileRight
                    deltas[16].addScaledVector(dHead.set(0.002 * maskScale, -0.011 * maskScale, -0.002 * maskScale), wMR); // mouthFrownRight
                    deltas[20].addScaledVector(dHead.set(-0.012 * maskScale, 0, -0.002 * maskScale), wMR); // mouthStretchRight
                }
                const wMC = raisedCosFalloff(pHead.distanceTo(mouthCenter), mouthRad * 0.85) * baseMask;
                if (wMC > 1e-4) {
                    deltas[12].addScaledVector(dHead.set(0, 0, 0.005 * maskScale), wMC); // mouthFunnel center push
                }

                // 6. Orca (cheekSquintLeft, cheekSquintRight)
                const wCheekL = raisedCosFalloff(pHead.distanceTo(cheekL), eyeRad * 1.25) * baseMask;
                if (wCheekL > 1e-4) {
                    deltas[17].addScaledVector(dHead.set(0, 0.008 * maskScale, 0.004 * maskScale), wCheekL);
                }
                const wCheekR = raisedCosFalloff(pHead.distanceTo(cheekR), eyeRad * 1.25) * baseMask;
                if (wCheekR > 1e-4) {
                    deltas[18].addScaledVector(dHead.set(0, 0.008 * maskScale, 0.004 * maskScale), wCheekR);
                }

                // Atalakitas Head-local delta -> mesh-local delta
                const v3Off = vi * 3;
                for (let mi = 0; mi < morphCount; mi++) {
                    if (deltas[mi].lengthSq() > 1e-12) {
                        dMesh.copy(deltas[mi]).applyMatrix4(matHeadToMeshLinear);
                        arrays[mi][v3Off] = dMesh.x;
                        arrays[mi][v3Off + 1] = dMesh.y;
                        arrays[mi][v3Off + 2] = dMesh.z;
                        vertMoved = true;
                    }
                }
                if (vertMoved) totalAffectedVerts += 1;
            }

            // Friss BufferGeometry + WebGL shader ujragenralas
            const prevGeo = mesh.geometry;
            const newGeo = baseGeo.clone();
            const posTargets = [];
            for (let mi = 0; mi < morphCount; mi++) {
                const attr = new THREE.Float32BufferAttribute(arrays[mi], 3);
                attr.name = FACE_MASK_MORPH_NAMES[mi];
                posTargets.push(attr);
            }
            newGeo.morphTargetsRelative = true;
            newGeo.morphAttributes.position = posTargets;

            mesh.geometry = newGeo;
            if (prevGeo && prevGeo !== baseGeo && typeof prevGeo.dispose === 'function') {
                prevGeo.dispose();
            }

            if (typeof mesh.updateMorphTargets === 'function') {
                mesh.updateMorphTargets();
            }
            const dict = {};
            for (let mi = 0; mi < morphCount; mi++) {
                dict[FACE_MASK_MORPH_NAMES[mi]] = mi;
            }
            mesh.morphTargetDictionary = dict;
            mesh.morphTargetInfluences = new Array(morphCount).fill(0);

            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            for (const mat of mats) {
                if (mat) mat.needsUpdate = true;
            }

            newMorphMeshes.push({
                mesh,
                dictionary: mesh.morphTargetDictionary,
                influences: mesh.morphTargetInfluences
            });
        }
// === [#HEX:F.0C.2E.00] END ===

        rigInfo.morphMeshes = newMorphMeshes;
        rigInfo.morphTargetNames = [...FACE_MASK_MORPH_NAMES];
        rigInfo.morphTargetCount = FACE_MASK_MORPH_NAMES.length;
        rigInfo.faceMaskBound = newMorphMeshes.length > 0;
        rigInfo.faceMaskProfile = JSON.parse(JSON.stringify(maskProfile));

        return {
            boundMeshes: newMorphMeshes.length,
            affectedVertices: totalAffectedVerts,
            morphCount: rigInfo.morphTargetCount
        };
    }
// === [#HEX:F.0C.2D.00] END ===

    /**
     * Visszaallitja a karakter eredeti blendshape-mentes geometriajat (arc-maszk levalasztasa).
     */
// === [#HEX:F.0C.2F.00] START | name: unbindFaceMask | lines: 23 ===
// @calls: [#HEX:F.0C.1B.00] | @calledBy: none
    unbindFaceMask(rigInfo, targetRoot) {
        if (!rigInfo || !targetRoot) return;
        targetRoot.traverse((obj) => {
            if (!obj.isSkinnedMesh || !obj.userData || !obj.userData._ebpBaseGeo) return;
            const baseGeo = obj.userData._ebpBaseGeo;
            if (obj.geometry !== baseGeo) {
                const oldGeo = obj.geometry;
                obj.geometry = baseGeo;
                if (oldGeo && typeof oldGeo.dispose === 'function') oldGeo.dispose();
            }
            obj.morphTargetDictionary = undefined;
            obj.morphTargetInfluences = undefined;
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const mat of mats) {
                if (mat) mat.needsUpdate = true;
            }
        });
        rigInfo.morphMeshes = [];
        rigInfo.morphTargetNames = [];
        rigInfo.morphTargetCount = 0;
        rigInfo.faceMaskBound = false;
        rigInfo.faceMaskProfile = null;
    }
// === [#HEX:F.0C.2F.00] END ===

    /**
     * Csatol egy cel 3D modellt (Scene/Group) es visszaad egy EBPActorController-t.
     */
// === [#HEX:F.0C.30.00] START | name: attachModel | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00], [#HEX:F.04.266.00], [#HEX:F.0C.3F.00]
    attachModel(targetRoot, options = {}) {
// === [#HEX:F.0C.30.00] END ===
        if (!targetRoot) throw new Error('attachModel: Hianyzo targetRoot 3D objektum.');
        if (!this.manifest) {
            throw new Error('EBPAnimationBank meg nincs inicializalva! Elobb hivd az await bank.init() metodust.');
        }
        const rigInfo = this.inspectAndExtractRig(targetRoot);
        if (rigInfo.morphTargetCount === 0 && options.autoFaceMask !== false) {
            const mKey = normalizeModelKey(options.modelKey || targetRoot.name || '');
            let localProfile = null;
            try {
                if (mKey && typeof localStorage !== 'undefined') {
                    const rawMasks = localStorage.getItem('ebp_face_masks_v1');
                    const parsedMasks = rawMasks ? JSON.parse(rawMasks) : null;
                    if (parsedMasks && parsedMasks[mKey]) localProfile = parsedMasks[mKey];
                }
            } catch (_e) {}
            const headBone = rigInfo.headBone || (rigInfo.bonesByKey && rigInfo.bonesByKey.get('head')) || null;
            targetRoot.updateMatrixWorld(true);
            const profile = options.faceMaskProfile
                || localProfile
                || (mKey && this.faceMasks && this.faceMasks[mKey])
                || (headBone ? this.estimateDefaultFaceMask(rigInfo, targetRoot) : null);
            if (profile) {
                this.bindFaceMaskToModel(rigInfo, targetRoot, profile);
            }
        }
        return new EBPActorController(this, targetRoot, rigInfo, options);
    }

    /**
     * Validálja az AI altal irt EBPChoreographyScript vagy Kryst3DScenePrompt JSON-t.
     */
// === [#HEX:F.0C.31.00] START | name: validateChoreography | lines: 85 ===
// @calls: [#HEX:F.0C.23.00] | @calledBy: [#HEX:F.0C.43.00]
    validateChoreography(inputObj) {
        const errors = [];
        const warnings = [];
        if (!inputObj || typeof inputObj !== 'object') {
            return { valid: false, errors: ['A JSON bemenet nem objektum.'], warnings, normalizedScript: null, inputKind: 'unknown' };
        }

        let normalized = null;
        let inputKind = 'EBPChoreographyScript';

        // Ha Kryst3DScenePrompt erkezett (motion/mimic mezokkel timeline nelkul), konvertaljuk
        if (!Array.isArray(inputObj.timeline) && (inputObj.motion || inputObj.promptId || inputObj.cueId)) {
            inputKind = 'Kryst3DScenePrompt';
            normalized = {
                schemaVersion: '1.0',
                title: inputObj.promptId || 'Kryst3DScenePrompt',
                actor: inputObj.actorModel || 'zozo_animalt',
                timeline: [{
                    atSec: 0,
                    durationSec: 6.0,
                    cueId: inputObj.cueId || '',
                    clip: inputObj.motion || 'talking_gesture',
                    mimic: inputObj.mimic || 'speaking_viseme',
                    loop: true,
                    speed: 1.0,
                    fadeInSec: 0.35,
                    weight: 1.0,
                    speak: inputObj.mimic === 'speaking_viseme' || Boolean(inputObj.rawPromptText),
                    dialogueText: inputObj.rawPromptText || '',
                    camera: inputObj.camera || null
                }]
            };
        } else {
            normalized = {
                schemaVersion: inputObj.schemaVersion || '1.0',
                title: inputObj.title || 'AI Koreografia',
                actor: inputObj.actor || 'zozo_animalt',
                timeline: Array.isArray(inputObj.timeline) ? inputObj.timeline.map((s) => ({ ...s })) : []
            };
        }

        if (normalized.timeline.length === 0) {
            errors.push('A timeline tomb ures.');
        }

        const clipSet = new Set((this.manifest && this.manifest.clips ? this.manifest.clips : []).map((c) => c.name));
        const motionAliases = (this.manifest && this.manifest.krystStudioAliases && this.manifest.krystStudioAliases.motion) || {};
        const mimicSet = new Set(Object.keys((this.mimics && this.mimics.presets) || {}));

        normalized.timeline.forEach((step, idx) => {
            if (typeof step.atSec !== 'number' || step.atSec < 0) {
                errors.push(`Lepes[${idx}]: ervenytelen atSec ertek.`);
            }
            const rawClip = step.clip || step.fallbackMotion;
            if (!rawClip) {
                errors.push(`Lepes[${idx}]: hianyzik a 'clip' mezo.`);
            } else if (!clipSet.has(rawClip) && !motionAliases[rawClip]) {
                const fuzzy = this.resolveClipName(rawClip);
                warnings.push(`Lepes[${idx}]: '${rawClip}' nem pontos klipnev -> feloldva erre: '${fuzzy}'.`);
                step.clip = fuzzy;
            } else if (motionAliases[rawClip]) {
                step.clip = motionAliases[rawClip];
            }

            if (step.mimic && LEGACY_MIMIC_ALIASES[step.mimic]) {
                const mappedMimic = LEGACY_MIMIC_ALIASES[step.mimic];
                warnings.push(`Lepes[${idx}]: elavult mimic '${step.mimic}' -> atiranyitva erre: '${mappedMimic}'.`);
                step.mimic = mappedMimic;
            }
            if (step.mimic && !mimicSet.has(step.mimic)) {
                warnings.push(`Lepes[${idx}]: ismeretlen mimic '${step.mimic}' -> 'neutral' lesz.`);
                step.mimic = 'neutral';
            }
        });

        normalized.timeline.sort((a, b) => (a.atSec || 0) - (b.atSec || 0));

        return {
            valid: errors.length === 0,
            errors,
            warnings,
            normalizedScript: normalized,
            inputKind
        };
    }
// === [#HEX:F.0C.31.00] END ===

    /**
     * AI System Prompt visszaadasa LET.kryst agenseknek (opcionalisan kategoriaszurovel).
     */
// === [#HEX:F.0C.32.00] START | name: getAiDirectorPrompt | lines: 29 ===
// @calls: none | @calledBy: none
    getAiDirectorPrompt(lang = 'hu', categories = null) {
        if (!this.aiSchema) return '';
        const isEn = String(lang || 'hu').toLowerCase() === 'en';
        if (!categories || !Array.isArray(categories) || categories.length === 0) {
            return isEn ? this.aiSchema.aiSystemPromptEn : this.aiSchema.aiSystemPromptHu;
        }
        const byCat = this.aiSchema.clipsByCategory || {};
        const lines = [];
        for (const cat of categories) {
            if (byCat[cat]) {
                lines.push(`- ${cat} (${byCat[cat].length}): ${byCat[cat].join(', ')}`);
            }
        }
        const mimics = Object.keys((this.mimics && this.mimics.presets) || {}).join(', ');
        if (isEn) {
            return (
                'You are the LET.kryst Studio 3D Scene Director & Choreography AI Agent.\n' +
                'Output ONLY valid JSON matching EBPChoreographyScript.\n' +
                'Available mimics: ' + mimics + '\n' +
                'Filtered clip catalog:\n' + lines.join('\n')
            );
        }
        return (
            'Te vagy a LET.kryst Studio 3D Jelenetrendezo & Koreografus AI agense.\n' +
            'KIMENETI FORMATUM: Kizarolag ervenyes JSON objektum (EBPChoreographyScript).\n' +
            'Valaszthato mimikak: ' + mimics + '\n' +
            'Szurt klipkatalogus:\n' + lines.join('\n')
        );
    }
// === [#HEX:F.0C.32.00] END ===

    /**
     * Masolhato Three.js kodreszlet generalasa a fejlesztoi muhelyhez.
     */
    /**
     * Magyar vagy angol promptbol kulonallo idoszeletelt es testzona-retegzett kompozit mozgasreceptet allit ossze.
     */
// === [#HEX:F.0C.4F.00] START | name: synthesizeCompositeFromPrompt | lines: 175 ===
// @calls: [#HEX:B.07.A1.00], [#HEX:F.0C.05.00], [#HEX:F.0C.50.00] | @calledBy: [#HEX:F.0C.5E.00]
    synthesizeCompositeFromPrompt(promptText) {
        if (!this.manifest || !Array.isArray(this.manifest.clips)) {
            throw new Error('A manifest meg nincs betoltve.');
        }
        const clips = this.manifest.clips;
        const norm = stripAccents(promptText || '');

        // 1. Cel aloldal detektalasa
        let subpageId = 'hajomuhely';
        if (/taverna|kocsma|pult|csapos|korso|sor/.test(norm)) subpageId = 'taverna';
        else if (/szentely|konyvszentely|templom|oltar|paideia/.test(norm)) subpageId = 'konyvszentely';
        else if (/hajojavito|hajomuhely|hajomester|acs|hegeszt|kovacs|szerelo|muhely/.test(norm)) subpageId = 'hajomuhely';
        else if (/piac|stand|kofa|arus/.test(norm)) subpageId = 'piac';
        else if (/bank|kincstar|trezor|arany/.test(norm)) subpageId = 'bank';
        else if (/masolo|terkepmasolo|scriptorium/.test(norm)) subpageId = 'masolatok';
        else if (/tekercs|irnok/.test(norm)) subpageId = 'tekercsmester';
        else if (/kolostor|felhokolostor|csarnok|udvar/.test(norm)) subpageId = 'felhokolostor';
        else if (/kikoto|molo|dokk|part|sziget/.test(norm)) subpageId = 'kikoto';

        // 2. Javasolt karaktermodell detektalasa
        let suggestedModelPath = '';
        if (/hegeszt|munkas|szerelo|vas/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_Ironbound_Artisan_20261123_animated_mixamo_All_animation.glb';
        } else if (/kovacs/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_The_Weathered_Blacksmith.glb';
        } else if (/mernok|gepesz|ingenier/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_Mechanic_ingenierin.glb';
        } else if (/sefszakacs|szakacs|chef|foz/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_Chef_20261123_animated_mixamo_All_animation.glb';
        } else if (/barba\s*negra|kapitany/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_BarbaNegra.glb';
        } else if (/zozo/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_Zozo.glb';
        } else if (/paideia/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_Paideia.glb';
        } else if (/szoke\s*rozmar/.test(norm)) {
            suggestedModelPath = 'assets/models/karakterek/Animalt_SzokeRozmar.glb';
        }

// === [#HEX:F.0C.50.00] START | name: scoreClips | lines: 18 ===
// @calls: [#HEX:F.0C.05.00] | @calledBy: [#HEX:F.0C.4F.00]
        const scoreClips = (keywords, preferCats = [], avoidSubstrings = []) => {
            const ranked = clips.map((c) => {
                const hay = stripAccents(`${c.name} ${c.titleHu || ''} ${c.category || ''}`);
                let score = 0;
                if (preferCats.includes(c.category)) score += 6;
                for (const [kw, w] of keywords) {
                    if (hay.includes(kw)) score += w;
                }
                for (const av of avoidSubstrings) {
                    if (hay.includes(av)) score -= 8;
                }
                if (Array.isArray(c.motionFlags) && c.motionFlags.includes('full_turn')) score -= 6;
                if (c.durationSec >= 1.2 && c.durationSec <= 12) score += 1;
                return { clip: c, score };
            });
            ranked.sort((a, b) => b.score - a.score);
            return ranked;
        };
// === [#HEX:F.0C.50.00] END ===

        // 3. Testtartas (Base / Lower) es keztartas (Hands / Arms) kinyerese
        const hasUpperAction = /keztartas|kez|kar|masz|hegeszt|kalapal|dolgoz|javit|fog|tart|integet|olvas|ir|celoz/.test(norm);
        const hasBasePosture = /testtartas|guggol|terdel|ul|all|harci|alapallas|felugrik|hajol/.test(norm);

        const baseKeywords = [];
        const baseCats = [];
        if (/harc|harci|csata|fegyver|kard|vedekez/.test(norm)) {
            baseCats.push('combat');
            baseKeywords.push(['harci', 6], ['combat', 6], ['stance', 5], ['alapallas', 5], ['guard', 4], ['block', 4], ['shield', 3]);
        }
        if (/guggol|alacsony/.test(norm)) {
            baseCats.push('combat', 'reactions_idle', 'sit_work');
            baseKeywords.push(['crouch', 14], ['guggol', 14], ['kneel', 7], ['terdel', 7], ['low', 5], ['bow', 3]);
        }
        if (/terdel/.test(norm)) {
            baseCats.push('sit_work', 'reactions_idle');
            baseKeywords.push(['kneel', 14], ['terdel', 14], ['crouch', 6], ['guggol', 6]);
        }
        if (/ul|szek|torokules/.test(norm)) {
            baseCats.push('sit_work');
            baseKeywords.push(['sit', 12], ['ul', 12], ['chair', 8]);
        }
        if (baseKeywords.length === 0) {
            baseCats.push('reactions_idle', 'sit_work', 'combat');
            baseKeywords.push(['idle', 6], ['alapallas', 6], ['stance', 5]);
        }

        const baseRanked = scoreClips(baseKeywords, baseCats, ['death', 'fall', 'backflip']);
        const baseBest = baseRanked[0].clip;
        const baseFreeze = /merev|kimerevit|mozdulatlan|statikus/.test(norm);
        const baseDur = Math.max(0.2, baseBest.durationSec || 2.0);
        const baseStart = /guggol|crouch|terdel|kneel/.test(stripAccents(baseBest.name + ' ' + (baseBest.titleHu || '')))
            ? +(baseDur * 0.22).toFixed(2) : 0;
        const baseEnd = Math.min(baseDur, +(Math.max(baseStart + 0.5, baseDur * 0.65)).toFixed(2));

        const layers = [{
            id: 'layer_base',
            label: 'Alap Testtartás (Lábak + Csípő + Törzs)',
            clip: baseBest.name,
            bodyZone: 'full',
            startSec: baseStart,
            endSec: baseEnd,
            mode: baseFreeze ? 'freeze' : 'pingpong',
            speed: baseFreeze ? 0 : 0.45,
            weight: 1.0
        }];

        const layerAlternatives = [baseRanked.slice(0, 14).map((x) => x.clip)];

        if (hasUpperAction || hasBasePosture) {
            const handKeywords = [];
            const handCats = [];
            let armZone = 'arms';
            if (/jobb\s*kez|jobb\s*kar/.test(norm)) armZone = 'right_arm';
            else if (/bal\s*kez|bal\s*kar/.test(norm)) armZone = 'left_arm';
            else if (/felso\s*test|torzs/.test(norm)) armZone = 'upper';

            if (/masz/.test(norm)) {
                handCats.push('climb_parkour');
                handKeywords.push(['climb', 12], ['masz', 12], ['hang', 9], ['fugg', 9], ['ledge', 8], ['wall', 6], ['ladder', 6], ['bar', 5]);
            }
            if (/hegeszt|javit|szerel|kalapal|dolgoz|szerszam/.test(norm)) {
                handCats.push('climb_parkour', 'sit_work', 'combat');
                handKeywords.push(['climb', 6], ['hang', 5], ['hold', 6], ['reach', 6], ['work', 6], ['pick', 5], ['torch', 8], ['axe', 4], ['slash', 4]);
            }
            if (/celoz|tart|fog/.test(norm)) {
                handCats.push('combat', 'social_talk');
                handKeywords.push(['aim', 8], ['hold', 7], ['celoz', 8], ['point', 6]);
            }
            if (/integet|beszel|magyaraz/.test(norm)) {
                handCats.push('social_talk');
                handKeywords.push(['talk', 9], ['beszel', 9], ['wave', 8], ['gesture', 8], ['agree', 6]);
            }
            if (handKeywords.length === 0) {
                handCats.push('climb_parkour', 'sit_work', 'social_talk');
                handKeywords.push(['climb', 6], ['hold', 6], ['gesture', 5]);
            }

            const handRanked = scoreClips(handKeywords, handCats, ['backflip', 'death']);
            const handBest = handRanked[0].clip;
            const hDur = Math.max(0.2, handBest.durationSec || 2.0);
            const hStart = +(hDur * 0.20).toFixed(2);
            const hEnd = Math.min(hDur, +(Math.max(hStart + 0.5, hDur * 0.65)).toFixed(2));
            const wantsLoop = /lupol|loop|ismetel|folyamatos|hegeszt|kalapal|dolgoz|csiszol/.test(norm);

            layers.push({
                id: 'layer_hands',
                label: 'Kéztartás / Felsőtest Akció',
                clip: handBest.name,
                bodyZone: armZone,
                startSec: hStart,
                endSec: hEnd,
                mode: wantsLoop ? 'pingpong' : 'loop',
                speed: 0.85,
                weight: 1.0
            });
            layerAlternatives.push(handRanked.slice(0, 14).map((x) => x.clip));
        }

        const recipe = {
            schema: 'EBPCompositeMotion@1.0',
            name: (promptText || 'Egyedi kompozit mozgás').slice(0, 64),
            prompt: promptText || '',
            lockRootXZ: true,
            mimic: /koncentral|dolgoz|hegeszt|komoly/.test(norm) ? 'worried_frown' : 'neutral',
            mimicWeight: 0.7,
            layers
        };

        return {
            recipe,
            subpageId,
            suggestedModelPath,
            layerAlternatives,
            explanationHu: `${layers.length} réteg összeállítva (${layers.map((l) => `${l.clip} [${l.bodyZone}: ${l.startSec}s–${l.endSec}s, ${l.mode}]`).join(' + ')}) → Cél: ${subpageId}`
        };
    }
// === [#HEX:F.0C.4F.00] END ===

// === [#HEX:F.0C.33.00] START | name: generateCodeSnippet | lines: 1 ===
// @calls: none | @calledBy: [#HEX:F.0C.38.00]
    generateCodeSnippet(cfg = {}) {
// === [#HEX:F.0C.33.00] END ===
        const modelPath = cfg.modelPath || 'assets/models/karakterek/Zozo_animalt.glb';
        const clipName = cfg.clipName || 'Talk_Passionately';
        const upperClipName = cfg.upperClipName || '';
        const mimicId = cfg.mimicId || 'confident_smirk';
        const lockRootXZ = Boolean(cfg.lockRootXZ);
        const speed = typeof cfg.speed === 'number' ? cfg.speed : 1.0;
        const attachOpts = cfg.modelKey
            ? `{ lockRootXZ: ${lockRootXZ}, speed: ${speed}, modelKey: '${cfg.modelKey}' }`
            : `{ lockRootXZ: ${lockRootXZ}, speed: ${speed} }`;

        const lines = [
            "import * as THREE from 'three';",
            "import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';",
            "import { EBPAnimationBank } from './ebp_animation_bank.js';",
            "",
            "// 1. Kozponti animacios bank inicializalasa",
            "const animBank = new EBPAnimationBank({ mode: 'packs' });",
            "await animBank.init();",
            "",
            "// 2. Cel karaktermodell betoltese es csatolasa",
            "const loader = new GLTFLoader();",
            `const gltf = await loader.loadAsync('${modelPath}');`,
            "const actorModel = gltf.scene;",
            "scene.add(actorModel);",
            "",
            `const actor = animBank.attachModel(actorModel, ${attachOpts});`
        ];

        if (cfg.compositeRecipe && Array.isArray(cfg.compositeRecipe.layers) && cfg.compositeRecipe.layers.length > 0) {
            lines.push(`await actor.playCompositeMotion(${JSON.stringify(cfg.compositeRecipe, null, 2)});`);
        } else {
            lines.push(`await actor.play('${clipName}', { fadeIn: 0.3, loop: true, speed: ${speed}, lockRootXZ: ${lockRootXZ} });`);
            if (upperClipName) {
                lines.push(`await actor.playUpperBody('${upperClipName}', { fadeIn: 0.25, loop: true, weight: 0.9 });`);
            }
            lines.push(`actor.setMimic('${mimicId}', { weight: 1.0, speak: ${Boolean(cfg.speak)} });`);
        }

        lines.push("");
        lines.push("// 3. Render loop-ban (30 FPS / deltaSec):");
        lines.push("// actor.update(deltaSec);");
        return lines.join('\n');
    }
}

// ============================================================================
// EBPSubpageCharacterStore & Runtime - Studio karakterek elo aloldali futtatasa
// ============================================================================
export const EBP_SUBPAGE_CHARACTERS_STORAGE_KEY = 'ebp_subpage_characters_v1';
export const EBP_SUBPAGE_SYNC_CHANNEL = 'ebp_character_studio_sync';
const GCS_MODELS_BASE = 'https://storage.googleapis.com/kalozsziget-assets/';

export const SUBPAGE_CATALOG = [
    { id: 'hajomuhely', label: '🔨 Hajójavító Műhely', defaultPos: [0.6, 0.0, 1.8], defaultScale: 1.0 },
    { id: 'taverna', label: '🍺 Taverna', defaultPos: [0.0, 0.0, 1.5], defaultScale: 1.0 },
    { id: 'konyvszentely', label: '🏛️ Paideia Könyvszentély', defaultPos: [0.0, 0.0, 2.0], defaultScale: 1.0 },
    { id: 'piac', label: '⚖️ Piac', defaultPos: [0.0, 0.0, 1.5], defaultScale: 1.0 },
    { id: 'bank', label: '🏦 Bank', defaultPos: [0.0, 0.0, 1.5], defaultScale: 1.0 },
    { id: 'masolatok', label: '📜 Másolóműhely', defaultPos: [0.0, 0.0, 0.5], defaultScale: 1.0 },
    { id: 'tekercsmester', label: '🪶 Tekercsmester', defaultPos: [0.0, 0.0, 0.5], defaultScale: 1.0 },
    { id: 'felhokolostor', label: '☁️ Felhőkolostor', defaultPos: [0.0, 0.0, 18.0], defaultScale: 1.0 },
    { id: 'kikoto', label: '⚓ HEBOK Kikötő', defaultPos: [-20.0, 2.0, 0.0], defaultScale: 1.0 }
];

// === [#HEX:F.04.364.00] START | name: loadSubpageCharacters | lines: 9 ===
// @calls: none | @calledBy: [#HEX:F.04.365.00], [#HEX:F.04.366.00], [#HEX:F.04.367.00]
export function loadSubpageCharacters() {
    try {
        const raw = localStorage.getItem(EBP_SUBPAGE_CHARACTERS_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch (_e) {
        return [];
    }
}
// === [#HEX:F.04.364.00] END ===

// === [#HEX:F.04.365.00] START | name: getSubpageCharacters | lines: 3 ===
// @calls: [#HEX:F.04.364.00] | @calledBy: [#HEX:F.02.33.00], [#HEX:F.0C.5F.00], [#HEX:F.0C.60.00]
export function getSubpageCharacters(subpageId) {
    return loadSubpageCharacters().filter((c) => c && c.subpageId === subpageId && c.enabled !== false);
}
// === [#HEX:F.04.365.00] END ===

// === [#HEX:F.04.366.00] START | name: saveSubpageCharacter | lines: 17 ===
// @calls: [#HEX:F.04.364.00], [#HEX:F.04.368.00] | @calledBy: [#HEX:F.0C.60.00]
export function saveSubpageCharacter(actorCfg) {
    if (!actorCfg || !actorCfg.subpageId || !actorCfg.modelPath) return null;
    const list = loadSubpageCharacters();
    const id = actorCfg.id || (`actor_${Date.now()}_${Math.floor(Math.random() * 1000)}`);
    const nextCfg = {
        ...actorCfg,
        id,
        enabled: actorCfg.enabled !== false,
        updatedAt: new Date().toISOString()
    };
    const idx = list.findIndex((c) => c.id === id);
    if (idx >= 0) list[idx] = nextCfg;
    else list.push(nextCfg);
    localStorage.setItem(EBP_SUBPAGE_CHARACTERS_STORAGE_KEY, JSON.stringify(list));
    broadcastSubpageCharactersUpdate(nextCfg.subpageId);
    return nextCfg;
}
// === [#HEX:F.04.366.00] END ===

// === [#HEX:F.04.367.00] START | name: deleteSubpageCharacter | lines: 8 ===
// @calls: [#HEX:F.04.364.00], [#HEX:F.04.368.00] | @calledBy: [#HEX:F.0C.5F.00]
export function deleteSubpageCharacter(actorId) {
    const list = loadSubpageCharacters();
    const target = list.find((c) => c.id === actorId);
    const filtered = list.filter((c) => c.id !== actorId);
    localStorage.setItem(EBP_SUBPAGE_CHARACTERS_STORAGE_KEY, JSON.stringify(filtered));
    if (target) broadcastSubpageCharactersUpdate(target.subpageId);
    return filtered;
}
// === [#HEX:F.04.367.00] END ===

// === [#HEX:F.04.368.00] START | name: broadcastSubpageCharactersUpdate | lines: 9 ===
// @calls: none | @calledBy: [#HEX:F.04.366.00], [#HEX:F.04.367.00]
export function broadcastSubpageCharactersUpdate(subpageId = '*') {
    try {
        if (typeof BroadcastChannel !== 'undefined') {
            const ch = new BroadcastChannel(EBP_SUBPAGE_SYNC_CHANNEL);
            ch.postMessage({ type: 'subpage_characters_updated', subpageId, ts: Date.now() });
            ch.close();
        }
    } catch (_e) {}
}
// === [#HEX:F.04.368.00] END ===

// === [#HEX:F.0C.51.00] START | name: isLocalDevHost | lines: 5 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00], [#HEX:F.0C.53.00]
function isLocalDevHost() {
    if (typeof window === 'undefined' || !window.location) return false;
    const h = window.location.hostname;
    return h === 'localhost' || h === '127.0.0.1' || h.indexOf('192.168.') === 0 || window.location.protocol === 'file:';
}
// === [#HEX:F.0C.51.00] END ===

let _prodSubpageCharsCache = null;
let _prodSubpageCharsPromise = null;

// === [#HEX:F.04.369.00] START | name: fetchProductionSubpageCharacters | lines: 14 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00]
export async function fetchProductionSubpageCharacters(force = false) {
    if (!force && Array.isArray(_prodSubpageCharsCache)) return _prodSubpageCharsCache;
    if (force) _prodSubpageCharsPromise = null;
    if (!_prodSubpageCharsPromise) {
        _prodSubpageCharsPromise = fetch('./subpage_characters.json?v=20261126c', { cache: 'no-cache' })
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => {
                _prodSubpageCharsCache = Array.isArray(data) ? data : [];
                return _prodSubpageCharsCache;
            })
            .catch(() => []);
    }
    return _prodSubpageCharsPromise;
}
// === [#HEX:F.04.369.00] END ===

// === [#HEX:F.0C.52.00] START | name: normalizeCharacterModelRelPath | lines: 3 ===
// @calls: none | @calledBy: [#HEX:F.0C.57.00]
function normalizeCharacterModelRelPath(path) {
    return String(path || '').replace(/^(\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\/+/, '');
}
// === [#HEX:F.0C.52.00] END ===

export class EBPSubpageCharacterRuntime {
// === [#HEX:F.0C.53.00] START | name: constructor | lines: 14 ===
// @calls: [#HEX:F.0C.51.00], [#HEX:F.0C.55.00] | @calledBy: [#HEX:F.0C.4A.00]
    constructor() {
        this.bank = new EBPAnimationBank({
            mode: 'packs',
            baseUrl: isLocalDevHost() ? 'assets/models/animations/' : GCS_ANIM_BASE_URL
        });
        this.loader = new GLTFLoader();
        this.mounted = new Map(); // sceneId -> Map<actorId, { root, controller, updatedAt }>
        this.scenes = new Map();  // sceneId -> entry
        this._initPromise = null;
        this._timerId = null;
        this._lastTickMs = 0;

        this._setupLiveSyncListeners();
    }
// === [#HEX:F.0C.53.00] END ===

// === [#HEX:F.0C.54.00] START | name: ensureReady | lines: 6 ===
// @calls: [#HEX:F.0C.1E.00] | @calledBy: [#HEX:F.02.33.00]
    async ensureReady() {
        if (!this._initPromise) {
            this._initPromise = this.bank.init();
        }
        return this._initPromise;
    }
// === [#HEX:F.0C.54.00] END ===

// === [#HEX:F.0C.55.00] START | name: _setupLiveSyncListeners | lines: 24 ===
// @calls: [#HEX:F.02.33.00] | @calledBy: [#HEX:F.0C.53.00]
    _setupLiveSyncListeners() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                this._bc = new BroadcastChannel(EBP_SUBPAGE_SYNC_CHANNEL);
                this._bc.onmessage = (ev) => {
                    if (!ev || !ev.data || ev.data.type !== 'subpage_characters_updated') return;
                    const targetId = ev.data.subpageId;
                    this.scenes.forEach((entry, sId) => {
                        if (targetId === '*' || targetId === sId || (targetId === 'kikoto' && sId === 'kikoto_3d')) {
                            this.syncScene(entry);
                        }
                    });
                };
            } catch (_e) {}
        }
        window.addEventListener('storage', (ev) => {
            if (ev && ev.key === EBP_SUBPAGE_CHARACTERS_STORAGE_KEY) {
                this.scenes.forEach((entry) => this.syncScene(entry));
            }
        });
        document.addEventListener('visibilitychange', () => {
            this._lastTickMs = performance.now();
        });
    }
// === [#HEX:F.0C.55.00] END ===

// === [#HEX:F.0C.56.00] START | name: _ensureLoopRunning | lines: 21 ===
// @calls: [#HEX:F.0C.14.00] | @calledBy: [#HEX:F.02.33.00], [#HEX:F.02.34.00]
    _ensureLoopRunning() {
        let total = 0;
        this.mounted.forEach((m) => { total += m.size; });
        if (total > 0 && this._timerId === null) {
            this._lastTickMs = performance.now();
            this._timerId = window.setInterval(() => {
                if (document.hidden) return;
                const now = performance.now();
                const dt = Math.min(0.066, Math.max(0.001, (now - this._lastTickMs) / 1000));
                this._lastTickMs = now;
                this.mounted.forEach((actorMap) => {
                    actorMap.forEach((inst) => {
                        if (inst.controller) inst.controller.update(dt);
                    });
                });
            }, 33);
        } else if (total === 0 && this._timerId !== null) {
            clearInterval(this._timerId);
            this._timerId = null;
        }
    }
// === [#HEX:F.0C.56.00] END ===

// === [#HEX:F.0C.57.00] START | name: _loadGltfWithFallback | lines: 5 ===
// @calls: [#HEX:F.0C.52.00] | @calledBy: [#HEX:F.02.33.00]
    async _loadGltfWithFallback(relPath) {
        const clean = normalizeCharacterModelRelPath(relPath);
        if (/^https?:\/\//i.test(clean) || /^blob:/i.test(clean)) {
            return await this.loader.loadAsync(clean);
        }
// === [#HEX:F.0C.57.00] END ===
        if (!isLocalDevHost()) {
            return await this.loader.loadAsync(GCS_MODELS_BASE + clean);
        }
        try {
            return await this.loader.loadAsync(clean);
        } catch (_localErr) {
            return await this.loader.loadAsync(GCS_MODELS_BASE + clean);
        }
    }

// === [#HEX:F.02.33.00] START | name: syncScene | lines: 90 ===
// @calls: [#HEX:F.04.365.00], [#HEX:F.04.369.00], [#HEX:F.07.18.00], [#HEX:F.07.1D.00], [#HEX:F.0C.04.00] | @calledBy: [#HEX:F.01.20.00], [#HEX:F.01.22.00], [#HEX:F.0C.55.00]
    async syncScene(entry) {
        if (!entry || !entry.id || !entry.scene) return;
        this.scenes.set(entry.id, entry);
        const queryId = entry.id === 'kikoto_3d' ? 'kikoto' : entry.id;

        const mergedById = new Map();
        const prodAll = await fetchProductionSubpageCharacters();
        for (const c of prodAll) {
            if (c && c.subpageId === queryId && c.enabled !== false && c.id) {
                mergedById.set(c.id, c);
            }
        }
        if (isLocalDevHost()) {
            for (const c of getSubpageCharacters(queryId)) {
                if (!c || !c.id) continue;
                const prod = mergedById.get(c.id);
                const prodTs = prod && prod.updatedAt ? Date.parse(prod.updatedAt) : 0;
                const localTs = c.updatedAt ? Date.parse(c.updatedAt) : 0;
                if (!prod || localTs >= prodTs) {
                    mergedById.set(c.id, c);
                }
            }
        }
        const desiredList = Array.from(mergedById.values());
        if (desiredList.length === 0 && !this.mounted.has(entry.id)) return;

        await this.ensureReady();

        if (!this.mounted.has(entry.id)) {
            this.mounted.set(entry.id, new Map());
        }
        const actorMap = this.mounted.get(entry.id);
        const desiredIds = new Set(desiredList.map((c) => c.id));

        for (const [id, inst] of actorMap.entries()) {
            if (!desiredIds.has(id)) {
                if (inst.controller) inst.controller.dispose();
                if (inst.root && inst.root.parent) inst.root.parent.remove(inst.root);
                actorMap.delete(id);
            }
        }

        for (const cfg of desiredList) {
            const existing = actorMap.get(cfg.id);
            if (existing && existing.updatedAt === cfg.updatedAt) {
                this._applySpatialTransform(existing.root, cfg);
                continue;
            }
            if (existing) {
                if (existing.controller) existing.controller.dispose();
                if (existing.root && existing.root.parent) existing.root.parent.remove(existing.root);
                actorMap.delete(cfg.id);
            }
            try {
                const gltf = await this._loadGltfWithFallback(cfg.modelPath);
                if (!this.scenes.has(entry.id)) continue;
                const root = gltf.scene;
                root.name = `StudioActor_${cfg.name || cfg.id}`;
                root.userData = root.userData || {};
                root.userData.rootObject = root;
                root.userData.studioActorId = cfg.id;
                root.userData.studioActorSubpage = entry.id;
                root.traverse((c) => {
                    if (c.isMesh) {
                        c.castShadow = true;
                        c.receiveShadow = true;
                        c.userData = c.userData || {};
                        c.userData.rootObject = root;
                    }
                });
                this._applySpatialTransform(root, cfg);
                entry.scene.add(root);

                const mKey = normalizeModelKey(cfg.modelPath);
                const controller = this.bank.attachModel(root, {
                    modelKey: mKey,
                    lockRootXZ: cfg.recipe ? cfg.recipe.lockRootXZ !== false : true,
                    speed: typeof cfg.speed === 'number' ? cfg.speed : 1.0
                });

                if (cfg.recipe && Array.isArray(cfg.recipe.layers) && cfg.recipe.layers.length > 0) {
                    await controller.playCompositeMotion(cfg.recipe, { fadeIn: 0.25 });
                } else if (cfg.clip) {
                    await controller.play(cfg.clip, { loop: true, lockRootXZ: true });
                }
                if (cfg.mimic) {
                    controller.setMimic(cfg.mimic, { weight: typeof cfg.mimicWeight === 'number' ? cfg.mimicWeight : 0.8 });
                }

                actorMap.set(cfg.id, { root, controller, updatedAt: cfg.updatedAt });
            } catch (err) {
                console.warn('[EBPSubpageCharacterRuntime] Karakter betöltési hiba:', cfg.modelPath, err);
            }
        }
        this._ensureLoopRunning();
    }
// === [#HEX:F.02.33.00] END ===

// === [#HEX:F.0C.58.00] START | name: _applySpatialTransform | lines: 12 ===
// @calls: none | @calledBy: [#HEX:F.02.33.00]
    _applySpatialTransform(root, cfg) {
        const p = Array.isArray(cfg.position) ? cfg.position : [0, 0, 0];
        const r = Array.isArray(cfg.rotationDeg) ? cfg.rotationDeg : [0, 0, 0];
        const s = Array.isArray(cfg.scale) ? cfg.scale : [1, 1, 1];
        root.position.set(Number(p[0]) || 0, Number(p[1]) || 0, Number(p[2]) || 0);
        root.rotation.set(
            THREE.MathUtils.degToRad(Number(r[0]) || 0),
            THREE.MathUtils.degToRad(Number(r[1]) || 0),
            THREE.MathUtils.degToRad(Number(r[2]) || 0)
        );
        root.scale.set(Number(s[0]) || 1, Number(s[1]) || 1, Number(s[2]) || 1);
    }
// === [#HEX:F.0C.58.00] END ===

// === [#HEX:F.02.34.00] START | name: detachScene | lines: 12 ===
// @calls: [#HEX:F.0C.1B.00], [#HEX:F.0C.56.00] | @calledBy: [#HEX:F.01.21.00], [#HEX:F.01.23.00]
    detachScene(sceneId) {
        const actorMap = this.mounted.get(sceneId);
        if (actorMap) {
            actorMap.forEach((inst) => {
                if (inst.controller) inst.controller.dispose();
                if (inst.root && inst.root.parent) inst.root.parent.remove(inst.root);
            });
            this.mounted.delete(sceneId);
        }
        this.scenes.delete(sceneId);
        this._ensureLoopRunning();
    }
// === [#HEX:F.02.34.00] END ===
}

if (typeof window !== 'undefined') {
    window.EBPAnimationBank = EBPAnimationBank;
    window.EBPActorController = EBPActorController;
    window.EBPSubpageCharacterRuntime = EBPSubpageCharacterRuntime;
    window.EBPSubpageCharacterStore = {
        SUBPAGE_CATALOG,
        BODY_ZONE_LABELS_HU,
        fetchProductionSubpageCharacters,
        loadSubpageCharacters,
        getSubpageCharacters,
        saveSubpageCharacter,
        deleteSubpageCharacter,
        broadcastSubpageCharactersUpdate
    };
}
