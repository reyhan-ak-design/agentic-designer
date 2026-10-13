@echo off
rem Agentic Designer office (Windows). Drag your design workspace folder onto this file,
rem or double-click and type the path. Needs Node 18+.
set "WS=%~1"
if "%WS%"=="" set /p WS=Path workspace (mis. D:\design-workspace): 
node "%~dp0bin\office.mjs" start --project "%WS%" --open
pause
