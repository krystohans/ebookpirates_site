# 🗺️ SONAR_01 (Ködhasító) – Hivatalos Fájltérkép és Architektúra

**Elsődleges fejlesztési mappa:** `C:\eBookPirates_Frontend másolata03 (NPC motor)\Minigames\Sonar_01\`  
**Tükrözött (Mirror) mappa:** `C:\Krystahans_ebookpirates_site\Minigames\Sonar_01\`  
**Helyi teszt URL:** `http://127.0.0.1:8055/Minigames/Sonar_01/index.html`

---

## 1. 📄 HTML Belépési Pontok
| Fájl | Szerep / Leírás |
| :--- | :--- |
| [index.html](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/index.html) | A fő steampunk vezérlőpult (`operating_desk.jpg` rétegekkel, CRT kijelzővel, analóg műszerekkel és moduláris script-betöltéssel). |
| [gauge_preview.html](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/gauge_preview.html) | A Szonár és Szerkezet analóg órák számlap- és mutató-illesztésének előnézeti tesztoldala. |
| [sonar_01_k_dhas_t.html](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/sonar_01_k_dhas_t.html) | Az eredeti, egybefüggő Gemini Canvas prototípus (archív referencia). |

---

## 2. ⚙️ Moduláris JavaScript Motorok (Gyökérmappa)
| Fájl | Szerep / Leírás |
| :--- | :--- |
| [config.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/config.js) | Pályaméretek, szikla-definíciók (`1..4` méret), jutalmazási piramis (`REWARD_MAP`), színek és időzítési konstansok. |
| [gauges.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/gauges.js) | A Szonár (`#gauge-sonar-canvas`, `dial_sonar_face.png`) és Szerkezet (`#gauge-hull-canvas`) órák, valamint a 4-rudas réz abakusz kezelése. |
| [oscilloscope.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/oscilloscope.js) | A jobb alsó kerek radar/oszcilloszkóp (`#radar-scope-canvas`) hanghullám-animációja (1 csúcs = tiszta víz, 2 csúcs = szikla). |
| [let_particles.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/let_particles.js) | A bal oldali CRT képernyő foszforzöld Hajónapló szövege és a zöld Let-por 2D négyzethálóvá áramlása (`#crt-main-canvas`). |
| [gameplay.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/gameplay.js) | Garantált útvonal-generálás, szonár-pásztázás, hajómozgás, szikla-ütközés és ciklámen újratervezési logika. |
| [controls.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/controls.js) | Cella-kattintások, útvonal-kijelölés, `AN` / `Infó` billenőkapcsolók és `ÚTVONALTERVEZÉS` / `START` gombok eseménykezelése. |
| [hud.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/hud.js) | Felső sáv (TopBar) és az odometer számlálók (`Sorozat`, `Navi pont`) frissítése. |
| [audio.js](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/audio.js) | Hangeffektek (`sonar_ping`, `crash_rock`, `fanfare`, `ambient_sea`) és WebAudio szintetizátor. |

---

## 3. 🖼️ Aktív Képi Elemek (`assets/images/`)
| Fájl | Szerep / Pozíció a pulton (`2752×1536`) |
| :--- | :--- |
| [operating_desk.jpg](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/operating_desk.jpg) | A teljes 16:9-es steampunk vezérlőpult alapfotója (`2752×1536 px`). |
| [dial_sonar_face.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/dial_sonar_face.png) | A bal oldali („Szonár”) óra belső számlapja (`1..10` skála, `1–2` piros zóna, `cx=1810, cy=845, r=111 px`). |
| [needle_sonar.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/needle_sonar.png) | Az eredeti óráról tisztán leemelt, átlátszó hátterű mutató (`222×222 px`, forgásközéppont: `111, 111`). |
| [dial_hull_face.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/dial_hull_face.png) | Másodlagos számlap-tartalék a Szerkezet órához. |
| [odometer_reel.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/odometer_reel.png) | Mechanikus hengeres számláló a `Sorozat` (`66.8%, 34.0%`) és `Navi pont` (`83.8%, 34.0%`) ablakokban. |
| [switch_an_down.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/switch_an_down.png) | Az `AN` (Automata Navigáció) fém billenőkapcsoló lekapcsolt állása (`62.2%, 73.0%`). |
| [switch_info_down.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/switch_info_down.png) | Az `Infó` fém billenőkapcsoló lekapcsolt állása (`70.0%, 73.0%`). |
| [btn_route_plate.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/btn_route_plate.png) | Dombornyomott sárgaréz `ÚTVONALTERVEZÉS` gomb a négyzetháló felett. |
| [btn_start_plate.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/btn_start_plate.png) | Dombornyomott sárgaréz `START` gomb a négyzetháló felett. |
| [ship_topdown.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/ship_topdown.png) | Felülnézeti hajó sprite a 2D térképen. |
| [rock_small.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/rock_small.png), [rock_medium.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/rock_medium.png), [rock_large.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/rock_large.png) | Szikla sprite-ok (1, 2 és 3 mezős zátonyok). |
| [perk_buoy.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/perk_buoy.png), [perk_magnifier.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/perk_magnifier.png), [perk_undo.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/perk_undo.png), [padlock.png](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/padlock.png) | Segédeszköz ikonok (Bója, Nagyító, Visszavonás, Lakat). |

---

## 4. 🎨 Nyers Forrásképek (`assets/images/Draft/`)
- [Draft/mutatos_ora.jpg](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/Draft/mutatos_ora.jpg) – A Nano Banana által generált `1..10` skálás Szonár számlap (`2400×1792 px`).
- [Draft/operating desk.jpg](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/images/Draft/operating%20desk.jpg) – Az eredeti vezérlőpult master fotója.

---

## 5. 🔊 Hangeffektek (`assets/sounds/`)
- [ambient_sea.wav](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/ambient_sea.wav), [sonar_ping.mp3](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/sonar_ping.mp3), [crash_rock.mp3](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/crash_rock.mp3), [boat_crash.mp3](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/boat_crash.mp3), [fanfare.mp3](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/fanfare.mp3), [victory_whohoo.mp3](file:///C:/eBookPirates_Frontend%20m%C3%A1solata03%20(NPC%20motor)/Minigames/Sonar_01/assets/sounds/victory_whohoo.mp3)

