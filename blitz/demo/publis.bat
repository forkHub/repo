@echo off

echo collision:
echo ==========
cd collision
cd
call publis.bat
cd ..
echo. 

echo doodle:
echo =======
cd doodle
cd
call publis.bat
cd ..
echo. 

echo drag02:
echo ======
cd drag02
cd
call publis.bat
cd ..
echo. 

echo expl:
echo =====
cd expl
cd
call publis.bat
cd ..
echo. 

echo knob:
echo =====
cd knob
cd
call publis.bat
cd ..
echo. 

echo knob02:
echo =======
cd knob02
cd
call publis.bat
cd ..
echo. 

echo orbit:
echo ======
cd orbit
cd
call publis.bat
cd ..
echo. 

echo orbit_mbb:
echo ==========
cd orbit_mbb
cd
call publis.bat
cd ..
echo. 

echo orbit_oval:
echo ===========
cd orbit_oval
cd
call publis.bat
cd ..
echo. 

echo snow:
echo =====
cd snow
cd
call publis.bat
cd ..
echo. 

echo tile:
echo =====
cd tile
cd
call publis.bat
cd ..
echo. 







echo copy gambar:
echo ============
xcopy assets\*.* ..\web\pg\gbr /q /y

pause
