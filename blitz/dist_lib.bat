@echo off

REM echo build lib:
REM echo ==========
REM cd lib
REM call build.bat
REM cd ..
REM echo.
REM echo.

echo minim:
echo ======
call minim.bat
echo.

echo copy demo:
echo ==========
cd demo
cd
call copy.bat
cd ..
echo.

echo copy pg:
echo ========
cd playground
call copy.bat 
cd ..
echo.

echo template:
echo =========
copy output\blitz.min.js template_be_ts\web\js\
copy output\blitz.d.ts template_be_ts\dts\

pause