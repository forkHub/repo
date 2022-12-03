@echo off

echo demo
echo ====
cd demo
call publis.bat
cd ..
echo. 

echo pg
echo ==
cd playground
cd
call publis.bat
cd ..
echo. 

echo blitz_demo
echo ==========
cd ..\blitz_demo
call publis.bat
cd ..\blitz

pause