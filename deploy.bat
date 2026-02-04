@echo off
setlocal enabledelayedexpansion
cd /d "c:\Users\Krystohans\GoogleProjektek\eBookPirates_kalozsziget"

echo Starting Git commit and Clasp deployment...

git add -A >nul 2>&1
git commit -m "Fix: Remove duplicate MAIN_SPREADSHEET_ID and duplicate functions from index.html" >nul 2>&1

echo Git commit completed.

echo Deploying to Apps Script with Clasp...
clasp push --force

echo Done!
pause
