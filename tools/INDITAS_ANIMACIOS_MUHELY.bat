@echo off
chcp 65001 >nul
title eBookPirates - 3D Animacios es LET.kryst Rendezo Muhely

set "SERVER_BAT=C:\eBookPirates_Architecture\INDITAS_EBOOKPIRATES_SZERVER.bat"
set "STUDIO_URL=http://127.0.0.1:5500/tools/animation_director_studio.html"

echo [EBP-ANIM] Port 5500 ellenorzese...
powershell -NoProfile -Command "try { $c = New-Object System.Net.Sockets.TcpClient; $ar = $c.BeginConnect('127.0.0.1', 5500, $null, $null); $ok = $ar.AsyncWaitHandle.WaitOne(400, $false); if ($ok -and $c.Connected) { $c.Close(); exit 0 } else { $c.Close(); exit 1 } } catch { exit 1 }"
if %errorlevel% equ 0 goto :server_ready

echo [INFO] A helyi szerver nem fut, inditas folyamatban...
if not exist "%SERVER_BAT%" goto :missing_server
call "%SERVER_BAT%"
timeout /t 2 /nobreak >nul
goto :open_studio

:missing_server
echo [HIBA] Hianyzik a szerverindito: %SERVER_BAT%
pause
exit /b 1

:server_ready
echo [OK] A helyi szerver mar fut a 127.0.0.1:5500 cimen.

:open_studio
echo [OK] 3D Animacios Muhely megnyitasa: %STUDIO_URL%
start "" "%STUDIO_URL%"
exit /b 0
