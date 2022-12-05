@echo off

echo build lib:
echo ==========
cd lib
call build.bat
cd ..
echo.

echo minim:
echo ======
call minim.bat
echo.

echo copy demo:
echo ==========
cd ..\blitz_demo
call copy.bat 
cd ..\blitz
echo.

echo copy demo2:
echo ===========
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