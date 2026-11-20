@echo off
title Business Process - seminar
cd /d "%~dp0"
set "NODE=%LOCALAPPDATA%\Programs\node-v22.11.0-win-x64\node.exe"
if not exist "%NODE%" set "NODE=node"
if not exist "out\index.html" (
  echo The site has not been built yet. Run:  npm run build
  pause
  exit /b 1
)
start "" "http://localhost:3000/"
"%NODE%" serve.mjs 3000
