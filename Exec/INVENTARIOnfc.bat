@echo off

set DIR=C:\Users\carlos.carvalho\Desktop\arquivosDiversos\programacao\InventarioNFC\Backend\api

REM entra na pasta
cd /d "%DIR%"

REM verifica se já existe Node rodando na porta (evita duplicar)
netstat -ano | findstr :3000 >nul
if %errorlevel%==0 (
    echo Servidor ja esta rodando
) else (
    start "" /b node server.js
)

REM espera o servidor subir
timeout /t 2 >nul

REM abre navegador
start "" http://localhost:3000

exit