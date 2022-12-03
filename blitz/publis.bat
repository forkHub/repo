echo off

echo build lib:
echo ==========
cd lib
call build.bat
echo off
cd ..

echo minim:
echo ======
call minim.bat
echo off

echo copy demo:
echo ==========
cd ..\blitz_demo
call copy.bat 
echo off
cd ..\blitz

echo copy pg:
echo ========
cd playground
call copy.bat 
echo off
cd ..

pause
pause