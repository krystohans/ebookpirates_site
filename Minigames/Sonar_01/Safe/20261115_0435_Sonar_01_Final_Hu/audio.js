/**
 * SONAR_01 - Hangkezelő Motor (Audio Manager)
 * Valódi MP3/WAV effektek és mechanikus kattanások
 */

window.SonarAudio = (function() {
  let isMuted = false;
  let bgMusic = null;
  const audioCache = {};

  const SOUND_PATHS = {
    ping: 'assets/sounds/sonar_ping.mp3',
    rockCrash: 'assets/sounds/crash_rock.mp3',
    boatCrash: 'assets/sounds/boat_crash.mp3',
    victoryFanfare: 'assets/sounds/fanfare.mp3',
    victoryWhohoo: 'assets/sounds/victory_whohoo.mp3',
    ambientSea: 'assets/sounds/ambient_sea.wav'
  };

  function init() {
    // Preload sounds
    for (const [key, path] of Object.entries(SOUND_PATHS)) {
      try {
        const a = new Audio(path);
        a.preload = 'auto';
        audioCache[key] = a;
      } catch (e) {
        console.warn('Audio preload error:', key, e);
      }
    }
  }

  function play(name, volume = 1.0) {
    if (isMuted) return;
    const sound = audioCache[name];
    if (sound) {
      try {
        sound.currentTime = 0;
        sound.volume = Math.min(1.0, Math.max(0.0, volume));
        sound.play().catch(() => {});
      } catch (e) {}
    }
  }

  // Mechanikus Abakusz Kattanás (Kicsi / Közepes / Nagy golyóknak különböző hangmagassággal)
  function playAbacusClack(sizeTier = 1) {
    if (isMuted) return;
    try {
      const ctx = window.AudioContext || window.webkitAudioContext;
      if (!ctx) return;
      if (!window._abacusAudioCtx) {
        window._abacusAudioCtx = new ctx();
      }
      const actx = window._abacusAudioCtx;
      if (actx.state === 'suspended') actx.resume();

      const osc = actx.createOscillator();
      const gain = actx.createGain();

      // Mérettől függő frekvencia (kisebb = magasabb, nagyobb = mélyebb klokk)
      const baseFreq = sizeTier === 1 ? 950 : sizeTier === 2 ? 680 : sizeTier === 3 ? 420 : 280;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, actx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.35, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(actx.destination);
      osc.start();
      osc.stop(actx.currentTime + 0.05);
    } catch (e) {}
  }

  function playAmbient(loop = true) {
    if (isMuted) return;
    const amb = audioCache.ambientSea;
    if (amb) {
      amb.loop = loop;
      amb.volume = 0.25;
      amb.play().catch(() => {});
    }
  }

  function toggleMute() {
    isMuted = !isMuted;
    if (isMuted) {
      if (audioCache.ambientSea) audioCache.ambientSea.pause();
    } else {
      playAmbient();
    }
    return isMuted;
  }

  return {
    init,
    play,
    playAbacusClack,
    playAmbient,
    toggleMute,
    getMuted: () => isMuted
  };
})();

