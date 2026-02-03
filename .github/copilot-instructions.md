# Copilot / AI Agent Instructions for eBookPirates_kalozsziget ✅

Short, actionable notes for an AI coding agent to be productive immediately in this repo.

## Big-picture / architecture 🔧
- This is a Google Apps Script web application (server-side GS + client HTML/JS). The server uses Google Apps Script APIs: `SpreadsheetApp`, `DriveApp`, `PropertiesService`, and `HtmlService`.
- Key backend entry points live in `parancsnoki_hid.js` (authentication, router, business logic). Frontend is `index.html` + per-page HTML files (`*_oldal.html`) and UI helpers (e.g., `web_fordito.js` for translations).
- Data is stored in Google Sheets — many hardcoded sheet IDs and sheet names are defined as constants near the top of `parancsnoki_hid.js`. These are authoritative: changing the spreadsheet layout requires code updates.

## Where to look for common patterns 📁
- Server router & access control: `parancsnoki_hid.js` → function `apiRouter(token, functionName, params)`.
  - Public functions: `publicFunctions` array (no token required).
  - All callable functions are exposed via `allowedFunctions` mapping — add new backend functions here to make them callable from the frontend.
- Authentication: `performLogin(formData)`, `generateIndexedToken(rowNumber)`, `getUserByToken(token)` in `parancsnoki_hid.js`.
  - Token format: base64 of `"rowNumber|random"`. The frontend stores it in `localStorage` as `ebookPiratesToken`.
- Frontend → backend bridge: use `callBackend(funcName, params, onSuccess, onFailure)` in `index.html` which calls `google.script.run.apiRouter(token, funcName, params)`.
  - Important: For private functions the backend injects `userEmail` server-side; client should *not* send the email. Example: call `callBackend('getPageDataAndContent', [pageName], ...)` and server receives `(userEmail, pageName)`.
- i18n: translations live in `web_fordito.js`. HTML uses `data-lang` attributes and `t(key)` for programmatic strings.

## Data model & spreadsheet conventions ⚠️
- `regisztralolap` and `kalozadatok` sheets have fixed column indices used throughout (e.g., B=email, C=nick, D=status, J=token, K=tokenDate). Search `performLogin` and `getUserByToken` for explicit expectations before modifying sheets.
- Many constants with Google Sheet / Drive IDs are defined at the top of `parancsnoki_hid.js`. Confirm permissions and correctness before running anything that reads/writes those resources.

## Integrations & secrets 🔐
- API keys are stored in Apps Script script properties. Example key: `GEMINI_API_KEY` (used by `test_gemini.gs.js` and portions of `parancsnoki_hid.js`).
  - To validate keys, call `listAvailableModels()` or run relevant functions from the Apps Script editor and check logs.
- Because the app uses Google services (Sheets/Drive/Docs), run/deploy under a Google account that has access to the resources referenced by the constants.

## Developer workflows & testing ✍️
- Quick manual tests:
  - Use the Apps Script editor to run server-side functions (e.g., `listAvailableModels`, `getPageDataAndContent` with test params) and check execution logs.
  - Use the web app UI: login with test credentials via the `login()` flow which stores `ebookPiratesToken` in `localStorage`.
- When adding backend functions:
  1. Implement the function in `parancsnoki_hid.js` (or split files as needed).
  2. Add it to `allowedFunctions` mapping so it can be invoked by `apiRouter`.
  3. If the function should be callable without auth, add it to `publicFunctions` array.
- When changing spreadsheet column layout, update all server-side code that reads those indices (search for hardcoded numeric indices across `parancsnoki_hid.js`).

## Patterns & conventions unique to this project ✅
- All frontend → server calls go through `callBackend` and `apiRouter` (single consistent RPC pattern).
- Client never sends the user email; server injects it when authorizing private calls. Do not break this convention.
- UI is HTML templates served by `HtmlService.createTemplateFromFile(...)`; some pages are templates and rely on server-side template variables (example: `masolatok_oldal` is rendered as a template in `getPageDataAndContent`).
- Localization keys are short tokens: prefer adding translations in `web_fordito.js`, not hardcoded strings in templates.

## PROJEKT-SPECIFIKUS SZABÁLYOK ÉS FONTOS KONVENCIONÁK (MAGYAR) 🔒
- Projekt: ez egy nagy Google Apps Script alkalmazás (~1.9M karakter), CLASP-szal verziókezelve. Kisebb módosításoknál is figyelj a fájlméretre és a deploy lépésekre.
- KRITIKUS SZABÁLY — NEM HASZNÁLUNK BACKTICKET (`) HTML STRINGEKBEN: **Soha ne használj template literal-t (backtick `) kliens oldali JS-ben vagy HTML string építéséhez.** Az execution environment összeomolhat. Mindig hagyományos konkatenációt használj: 'html = "<div>" + label + "</div>";'.
- MODAL RENDSZER (központi elemek): az alábbi modal ID-k és callback-ek STANDARDIZÁLTAK, ezekre épül a UI-integráció:
  - ID-k: `monk-pin-modal`, `author-dashboard-modal`, `system-message-modal` (lásd `index.html`-ben)
  - Kliens függvények: `finalizeMonkUpload()`, `closeMonkPinModal()` — ezek a modalok megerősítő/cancel akcióit kezelik.
  - Ha a térkép-feltöltés / másolás folyamathoz modal nyitás szükséges, nyisd meg a modalt és add hozzá a callback-eket úgy, hogy a modal ne tartalmazzon template literalokat a létrehozott HTML-ben.
- NE TÖRÖLD: a 6-karakteres ID-trimming logika kritikus (például: `shortId = String(fullId).trim().substring(0, 6)` vagy `substring(0,6)`). Sok backend/keresés erre az azonosító hosszra támaszkodik—mindig tartsd meg.
- MAP INTEGRÁCIÓ: a fő térkép-műveletek backend függvényei: `getMapImageData`, `uploadMapImage`, `copyMap` (lásd `parancsnoki_hid.js` allowedFunctions). Integrálás lépései:
  1. Kliens oldal: válaszd ki a térképet, ellenőrizd a shortId-t (trim+substring(0,6)).
  2. Nyisd meg a `monk-pin-modal`-t, és töltsd be a modal tartalmát hagyományos string konkatenációval.
  3. A megerősítés hívja `finalizeMonkUpload()` vagy más megfelelő kliens függvényt, mely backend hívást indít (pl. `uploadMapImage`) a shortId-val.
  4. Sikeres művelet után zárd be a modalt `closeMonkPinModal()` és frissítsd a UI-t a `getPageDataAndContent` / `getMapImageData` hívással.
- Kódkonvenciók: a frontend kód ne használjon template-literalokat, és minden HTML-t string konkatenációval építs. Keress repo-ban `substring(0, 6)` vagy `shortId` kulcsszavakat, ha ID-logikát módosítanál.

## Useful searches for agents 🕵️‍♂️
- Find backend API surface: search `allowedFunctions` in `parancsnoki_hid.js`.
- Find frontend API usages: search `callBackend(` or `.apiRouter(` in `index.html` and other `*_oldal.html` files.
- Track sheet assumptions: search for sheet names like `regisztralolap`, `kalozadatok`, and spreadsheet ID constants at the top of `parancsnoki_hid.js`.

## Safety checks & deployment notes ⚠️
- Verify script properties (API keys) before running features that invoke external APIs.
- Confirm the Google account used to deploy has write access to the destination spreadsheets and Drive folders referenced by constants.

---
If any section looks incomplete or you want examples for specific functions (e.g., add a new API method, how to test `copyMap`, or how to add a Sheet column safely), tell me which area to expand and I will iterate. ✨
