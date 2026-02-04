# Copilot / AI Agent utasítások eBookPirates_kalozsziget-hez ✅

Rövid, cselekvőképes jegyzetek, hogy egy AI-ügynök azonnal hasznos legyen a repóban.

## Rövid áttekintés 🔧
- Google Apps Script (GAS) webalkalmazás: szerver-oldali `.gs`/`.js` fájlok (fő: `parancsnoki_hid.js`) + kliens HTML/JS (példák: `index.html`, `*_oldal.html`, `js/*`).
- Adattárolás: Google Sheets (a fontos Sheet ID-k és munkalapnevek a `parancsnoki_hid.js` tetején vannak konstansként) és Drive mappák a médiáknak.
- Fő minta: kliens RPC → `callBackend(funcName, params, onSuccess, onFailure)` → szerver `apiRouter(token, functionName, params)`.

## Hogyan kommunikálj (példák) 💡
- Kliensből backend hívás:
  - callBackend('getPageDataAndContent', ['konyvtar'], onSuccess, onError)
  - Token: a böngészőben `localStorage` kulcs `ebookPiratesToken`. A szerver PRIVÁT hívásoknál automatikusan beleteszi a `userEmail`-t — a kliens NE küldje az emailt.
- Új backend függvény kiadása:
  1. Implementáld a függvényt a `parancsnoki_hid.js`-ben (vagy más .gs fájlban).
  2. Add hozzá az `allowedFunctions` listához, hogy az `apiRouter` hívni tudja.
  3. Ha a függvény publikus (nem igényel hitelesítést), add a `publicFunctions` tömbhöz.

## Projekt-specifikus konvenciók ⚠️
- Munkalap- és oszlopfeltételezések erősek (pl.: `regisztralolap`: B=email, C=nick, D=status, J=token, K=tokenDate; `kalozadatok` tartalmazza a krediteket). Minden sheet-séma módosítás előtt keress rá a kódban a hardkodolt oszlopszámokra.
- Szerver-oldali sablonok: például `masolatok_oldal` szerveroldalon renderelődik és változókat kap (pl. `MAP_COPY_COST`). Használj `HtmlService.createTemplateFromFile(...)`-t, ha változókat kell injektálni.
- Modalok és UI-konvenciók:
  - Gyakori modal ID-k: `monk-pin-modal`, `author-dashboard-modal`, `system-message-modal`.
  - Gyakori callback-ek: `finalizeMonkUpload()`, `closeMonkPinModal()`.
- Azonosító rövidítéseknél mindig `substring(0,6)` használata elvárt — ne változtasd meg a rövidített hosszot anélkül, hogy az minden érintett kódrészletben ne lenne frissítve.

## Backtick / HTML string szabály 🔧
- Korábbi hiba: a template literal (backtick, `) alapú nagy HTML-összefűzések instabilitást okoztak bizonyos kliens folyamatokban. **Ajánlás:** dinamikus HTML vagy modal tartalom készítésénél részesítsd előnyben a hagyományos string konkatenációt (`'<div>'+x+'</div>'`) ahol a régi környezet érzékeny volt. (A repo-ban előfordulnak template literalok is, de legyél óvatos a sablonokba és innerHTML-be épített nagy stringeknél.)

## Integrációk & titkok 🔐
- Script Properties tárolják az API-kulcsokat (pl. `GEMINI_API_KEY`). Ellenőrizheted a `test_gemini.gs.js`-ben a `listAvailableModels()`-szal, hogy működnek-e a kulcsok.
- Külső hívások `UrlFetchApp`-bal mennek: figyelj a kvótákra, időkorlátokra és nagy payloadokra.

## Fejlesztői munkafolyamatok 🛠️
- Gyors tesztelés: futtass szerveroldali függvényeket az Apps Script szerkesztőből és nézd meg a `Logger.log` kimenetet az Executions/Logs-ban.
- UI tesztelés: böngészős felület használata; a normál belépés a `performLogin(formData)`-t hívja és token mentődik `localStorage`-ba.
- Deploy: a repo CLASP-szal is dolgozhat (.clasp* fájlok). Ellenőrizd, hogy a deployozó Google-fióknak legyen hozzáférése az összes hivatkozott Sheet/Drive erőforráshoz.

## Gyors keresőkifejezések az ügynöknek 🕵️‍♂️
- `allowedFunctions` → backend API-felület (`parancsnoki_hid.js`).
- `callBackend(` vagy `.apiRouter(` → frontend hívások (`index.html`, `*_oldal.html`).
- `regisztralolap`, `kalozadatok`, `MAP_COPY_COST`, `substring(0, 6)` → kritikus feltételezések helyei.

## Biztonság & ellenőrzések ⚠️
- Mielőtt külső API-kat meghívó funkciót futtatsz, ellenőrizd a Script Properties-ben az API-kulcsok meglétét.
- A tesztekhez/deployhoz használt Google-fióknak szerkesztési joga legyen a hivatkozott Sheets/Folders-hoz.

---
Ha szeretnéd, kiegészítem gyakorlati példákkal (pl. hogyan adj hozzá új backend API-t és a kliens hívását, `copyMap` tesztterv, vagy biztonságos munkalapséma-változtatás lépései). Mondd meg, melyik részt bővítsem és finomítom. ✨
