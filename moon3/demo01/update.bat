@echo off
echo off
set blitz_lib=C:\soft\htdocs\be\output

echo.
echo update blitz
copy %blitz_lib%\*.d.ts .\dts 
if ERRORLEVEL 1 GOTO error
copy %blitz_lib%\*.js .\web\js
if ERRORLEVEL 1 GOTO error

echo.
echo update path find
copy ..\output\*.d.ts .\dts
if ERRORLEVEL 1 GOTO error
copy ..\output\*.js .\web\js
if ERRORLEVEL 1 GOTO error
echo.
goto end

:error
echo error

:end
pause
