@echo off

REM Diretório do starter
set FRONTEND_DIR=%cd%

REM Diretório do backend
set BACKEND_DIR=%FRONTEND_DIR%\backend

REM Verifica se a pasta node_modules existe no diretório do starter
if not exist "%FRONTEND_DIR%\node_modules" (
    echo Instalando dependências do Front-End...
    npm install
) else (
    echo Dependências Front-End já instaladas.
)

REM Executa npm start no diretório do starter
echo Iniciando o Front-End...
start "" cmd /c "npm start"

REM Verifica se a pasta node_modules existe no diretório backend
if not exist "%BACKEND_DIR%\node_modules" (
    echo Instalando dependências Back-End...
    cd /d "%BACKEND_DIR%"
    npm install
    cd /d "%FRONTEND_DIR%"
) else (
    echo Dependências Back-End já instaladas.
)

REM Executa node server.js no diretório backend
echo Iniciando o Back-End...
cd /d "%BACKEND_DIR%"
start "" cmd /c "node server.js"
