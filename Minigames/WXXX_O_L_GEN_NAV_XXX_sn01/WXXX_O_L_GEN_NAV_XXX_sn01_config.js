/**
 * WXXX_O_L_GEN_NAV_XXX_sn01 - KÖDHASÍTÓ (Konfigurációs és Paraméter Fájl)
 * Krystohans Architektúra - Steampunk Vezérlőpult & Zöld Let-por Rendszer
 */

window.SonarConfig = {
  // Pult Zónák (operating desk.jpg koordinátái százalékban)
  DESK_ZONES: {
    SCREEN: {
      left: '3.2%',
      top: '4.8%',
      width: '46.8%',
      height: '90.2%'
    },
    GAUGE_SONAR: {
      left: '55.5%',
      top: '6.5%',
      width: '18.5%',
      height: '24.0%'
    },
    GAUGE_HULL: {
      left: '76.0%',
      top: '6.5%',
      width: '18.5%',
      height: '24.0%'
    },
    OSCILLOSCOPE: {
      left: '55.5%',
      top: '32.0%',
      width: '39.0%',
      height: '23.0%'
    },
    ABACUS: {
      left: '55.5%',
      top: '57.0%',
      width: '39.0%',
      height: '26.0%'
    },
    CONTROLS: {
      left: '55.5%',
      top: '84.5%',
      width: '39.0%',
      height: '11.0%'
    }
  },

  // CRT Képernyő & Let-por Beállítások
  CRT: {
    PHOSPHOR_COLOR: '#39ff14',       // Zöld Let-por alapszín
    PHOSPHOR_GLOW: 'rgba(57, 255, 20, 0.45)',
    PHOSPHOR_DIM: '#1b6b0c',
    ORANGE_AN: '#ff7700',            // Automata Navigáció neon-narancs
    MAGENTA_REPLAN: '#ff00aa',       // Sérüléskori neon-ciklámen újratervezés
    TEXT_MORPH_SECONDS: 30,          // Szöveg átrendeződési idő másodpercben
    PARTICLE_DENSITY: 2.2,           // Szemcseméret és felbontás
    CRT_FLICKER: true
  },

  // Véletlenszerű Hajónapló Időjárási Indokok
  WEATHER_REASONS: [
    "Rossz látási viszonyok /köd/ miatt a szonár használata vált szükségessé.",
    "Tengeri permet. Az előrehaladáshoz a szonár használata vált szükségessé.",
    "Vízfelszíni tükröződés miatt a szonár használata vált szükségessé.",
    "Éjszakai sötétség. Az előrehaladáshoz a szonár használata vált szükségessé.",
    "Viharos időjárás és hullámzás miatt a szonár használata vált szükségessé.",
    "Atmoszférikus refrakció miatt a szonár használata vált szükségessé."
  ],

  // Játékgazdaság & Jutalom Képletek
  ECONOMY: {
    NP_PER_SKILL_PERCENT: 100,       // 100 NP = 0.1% Navigációs Skill
    BASE_NP_WIN: 1,                  // Alap győzelmi pont
    MAX_SHORTEST_PATH_BONUS_NP: 3,   // Legrövidebb út bónusza
    MIN_HP_FOR_TOWING: 2             // Ha HP < 2 (vagyis 1 vagy 0) -> Azonnali vontatás!
  },

  // Pálya Méretek és Szonár Készlet
  GRID: {
    COLS: 10,
    ROWS: 10,
    INITIAL_SONARS: 6,
    MAX_HULL_HP: 3
  },

  DIFFICULTIES: {
    EASY: { name: 'Könnyű', minStreak: 0, cols: 10, rows: 10, basePings: 6, navPoints: 2, rocks: { small: 4, medium: 2, large: 1, wreck: 0 } },
    MEDIUM: { name: 'Közepes', minStreak: 3, cols: 10, rows: 10, basePings: 5, navPoints: 3, rocks: { small: 5, medium: 3, large: 2, wreck: 1 } },
    HARD: { name: 'Nehéz', minStreak: 6, cols: 10, rows: 10, basePings: 4, navPoints: 5, rocks: { small: 6, medium: 4, large: 3, wreck: 1 } }
  },

  // Szikla Kategóriák
  ROCK_TYPES: {
    SMALL: { id: 1, name: '1 egység', length: 1, rodIndex: 0 },
    MEDIUM: { id: 2, name: '2 egység', length: 2, rodIndex: 1 },
    LARGE: { id: 3, name: '3 egység', length: 3, rodIndex: 2 },
    WRECK: { id: 4, name: '4 egység', length: 4, rodIndex: 3 }
  }
};
