SONAR_01 – BACKEND ÉS FŐJÁTÉK BEKÖTÉSI TEENDŐK (README)
======================================================
Dátum: 2026-11-15

1. AMI MÁR MEGVAN A BACKENDBEN (C:\eBookPirates_kalozsziget másolata03 (NPC motor)\parancsnoki_hid.js):
---------------------------------------------------------------------------------------------------
- Létezik a doPost(e) végpont (20044. sor körül).
- Megvan a hajó tartósságának olvasása/mentése (getBoatDurability / saveBoatDurability,
  SHIP_SPREADSHEET_ID: '1jTEVoRChgEb_HCD0VLIAxOruwXPsTObULNabW7uf4Z0', 'Élettartam' oszlop).
- Megvan a 'kalozadatok' tábla kezelése (D oszlop: Kredit, E oszlop: Hártya).

2. AMI MÉG HIÁNYZIK (BEKÖTENDŐ):
--------------------------------
- Még nincs külön Sonar_01 mentési végpont (pl. action: 'saveSonarRewards') a parancsnoki_hid.js
  doPost(e) függvényében, ami tartósan elmenti a Google Sheetbe:
  * a megmaradt hajó-életerőt (Szerkezet / HP -> saveBoatDurability / 'Élettartam'),
  * a megszerzett Navi pontot (és az ebből számolt Navigációs képzettség % növekedést:
    100 Navi pont = +0.1% képzettség),
  * a bal szélen felszedett extra jutalmat:
    - Láda (CHEST): +2..5 Kredit
    - Hordó (BARREL): +3..10 Hártya
    - Palack (BOTTLE): +1 Élelem vagy +1 Rum

3. JELENLEGI FRONTEND VISELKEDÉS (Minigames/Sonar_01):
------------------------------------------------------
- A Sonar_01 jelenleg helyben tárolja és küldi el a játék eredményét:
  * localStorage kulcsok:
    - 'ebook_pirates_ship_hp' / 'ebook_pirates_ship_max_hp'
    - 'ebook_pirates_nav_skill' (0..100%)
    - 'ebook_pirates_sonar_played' ('1' az első játék után)
    - 'ebook_pirates_sonar_rewards' (navPoints, streak, credits, membranes, food, rum)
  * window.parent.postMessage(...) üzenetek:
    - Győzelemkor (status: 'WIN'): átadja a navPoints, extraReward, hp, maxHp, streak adatokat.
    - Kritikus sérüléskor (HP < 2 -> status: 'EXIT_TO_PORT', targetPage: 'hajomuhely_oldal'):
      Holzkopf üzenet + terkeputazas01.mp4 videó után visszairányít a hajóműhelybe.
- A főjáték app.js scriptjében kell még fogadni ezeket a postMessage eseményeket, bezárni a
  Sonar_01 ablakot/iframe-et a 'TOVÁBB' gombra kattintáskor, és meghívni a Backend doPost
  végpontot.

4. FONTOS SZABÁLYOK A BACKEND MÓDOSÍTÁSÁHOZ:
---------------------------------------------
- A Backend mappában (eBookPirates_kalozsziget) TILOS git parancsot vagy clasp deploy-t futtatni;
  a kódmódosítás után a deploymentet a projektgazda végzi manuálisan.

