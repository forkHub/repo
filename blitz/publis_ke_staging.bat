@echo off

echo dist lib
echo ========
call dist_lib.bat

echo publish demo
echo ============
cd demo
call publis.bat
cd ..
echo. 

echo publish pg
echo ==========
cd playground
cd
call publis.bat
cd ..
echo. 

pause
