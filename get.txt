@echo off
chcp 65001
setlocal enabledelayedexpansion

color 0A

if "%1"=="admin" (
    cd /d "%~dp0"
) else (

    powershell -Command "Start-Process 'cmd.exe' -ArgumentList '/c \"\"%~f0\" admin\"' -Verb RunAs"
    exit /b
)

set "ZAPRET_DIR=C:\Zapret"
set "TEMP_DIR=%TEMP%\ZapretInstaller"
set "OLD_DIR=C:\zapret-discord-youtube-main"
set "ZAPRET_URL=https://codeload.github.com/Flowseal/zapret-discord-youtube/zip/refs/heads/main"
set "HOSTS_LIST_URL=https://raw.githubusercontent.com/GooDHous/HostsList/refs/heads/main/hosts.txt"

set "LOG_FILE=%TEMP_DIR%\zapret_install.log"

if not exist "%TEMP_DIR%" (
    mkdir "%TEMP_DIR%" >nul 2>&1
)

call :log "=== Начало установки Zapret ==="

call :check_admin
if errorlevel 1 (
    pause
    exit /b 1
)

taskkill /f /im winws.exe >nul 2>&1
if !errorlevel! equ 0 (
    echo [INFO] Процесс winws.exe остановлен
) else (
    echo [INFO] Процесс winws.exe не найден
)

echo [INFO] Остановка служб и процессов Zapret...
call :log "Остановка служб Zapret..."
sc stop zapret >nul
sc stop windivert >nul
timeout /t 3 /nobreak
sc delete zapret >nul
sc delete windivert >nul

echo.
echo [INFO] Проверка и удаление существующих установок...
call :clean_directory "%ZAPRET_DIR%"
call :clean_directory "%OLD_DIR%"

echo.

echo [INFO] Загрузка архива Zapret...
powershell -Command "Invoke-WebRequest -Uri '%ZAPRET_URL%' -OutFile '%TEMP_DIR%\Zapret.zip' -UseBasicParsing"
if exist "%TEMP_DIR%\Zapret.zip" (
    echo [SUCCESS] Архив Zapret загружен
) else (
    echo [ERROR] Не удалось загрузить архив Zapret
    goto :error
)

echo [INFO] Загрузка списка хостов...
powershell -Command "Invoke-WebRequest -Uri '%HOSTS_LIST_URL%' -OutFile '%TEMP_DIR%\list-general.txt' -UseBasicParsing"
if exist "%TEMP_DIR%\list-general.txt" (
    echo [SUCCESS] Список хостов загружен
) else (
    echo [WARNING] Не удалось загрузить список хостов, продолжим без него
)

for %%F in ("%TEMP_DIR%\Zapret.zip") do set "size=%%~zF"
if "!size!"=="0" (
    goto :error
)

echo.
echo [INFO] Распаковка архива...
powershell -Command "Expand-Archive -Path '%TEMP_DIR%\Zapret.zip' -DestinationPath 'C:\' -Force"
if !errorlevel! neq 0 (
    goto :error
)


if not exist "%OLD_DIR%" (
    echo [ERROR] После распаковки папка не найдена: %OLD_DIR%
    goto :error
)

if exist "%OLD_DIR%" (
    echo [INFO] Переименование папки...
    ren "%OLD_DIR%" "Zapret" >nul 2>&1
    if !errorlevel! neq 0 (
        echo [ERROR] Не удалось переименовать папку"
        goto :error
    )
)

if exist "%TEMP_DIR%\list-general.txt" (
    if not exist "%ZAPRET_DIR%\lists" (
        mkdir "%ZAPRET_DIR%\lists" >nul 2>&1
    )
    copy /Y "%TEMP_DIR%\list-general.txt" "%ZAPRET_DIR%\lists\" >nul
    if !errorlevel! equ 0 (
        echo [INFO] Файл списка хостов успешно скопирован
    )
)

echo.
echo [INFO] Запуск сервиса Zapret...
cd /d "%ZAPRET_DIR%"
if exist "service.bat" (
    call "service.bat"
    echo [SUCCESS] Сервис успешно запущен!
    
    :: Проверяем запустились ли службы
    timeout /t 5 /nobreak >nul
    for %%S in (zapret windivert) do (
        sc query "%%S" >nul 2>&1
        if !errorlevel! equ 0 (
            echo [INFO] Служба %%S запущена
        ) else (
            echo [WARNING] Служба %%S не запущена
        )
    )
) else (
    echo [ERROR] Файл service.bat не найден!
    goto :error
)

:: Очистка временных файлов
echo.
echo [INFO] Очистка временных файлов...
if exist "%TEMP_DIR%" (
    rd /s /q "%TEMP_DIR%" >nul 2>&1
)

echo.
echo ===============================================
echo [SUCCESS] Установка Zapret завершена успешно!
echo ===============================================
echo.
call :log "=== Установка завершена успешно ==="
timeout /t 5 >nul
exit /b 0

:error
echo.
echo ===============================================
echo [ERROR] В процессе установки произошла ошибка
if defined LOG_FILE echo Проверьте файл лога: %LOG_FILE%
echo ===============================================
call :log "=== Установка завершена с ошибками ==="
pause
exit /b 1

:check_admin
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Требуются права администратора
    exit /b 1
)
exit /b 0

:clean_directory
if exist "%~1" (
    echo [INFO] Удаление папки %~1...
    rmdir /s /q "%~1" >nul 2>&1
    if !errorlevel! equ 0 (
        echo [SUCCESS] Папка %~1 удалена
        call :log "Удалена папка: %~1"
    ) else (
        echo [ERROR] Не удалось удалить папку %~1
        call :log "Ошибка удаления папки: %~1"
        
        :: Попробуем через PowerShell
        echo [INFO] Попытка удаления через PowerShell...
        powershell -Command "Remove-Item '%~1' -Recurse -Force" >nul 2>&1
        if !errorlevel! equ 0 (
            echo [SUCCESS] Папка удалена через PowerShell
        )
    )
)
exit /b 0

:download_file
set "url=%~1"
set "output=%~2"
echo [INFO] Загрузка: %url%
curl -f -L -o "%output%" "%url%" >nul 2>&1
if !errorlevel! equ 0 (
    if exist "%output%" (
        for %%F in ("%output%") do if %%~zF gtr 0 (
            echo [SUCCESS] Файл загружен: %output%
            call :log "Загружен файл: %output%"
            exit /b 0
        )
    )
)
echo [ERROR] Ошибка загрузки: %url%
call :log "Ошибка загрузки: %url%"
exit /b 1

:log
if defined LOG_FILE (
    echo [%date% %time%] %~1 >> "%LOG_FILE%"
)
exit /b 0
