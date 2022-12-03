@echo off

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

echo doodle:
echo =======
cd doodle
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

echo collision:
echo ==========
cd collision
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

echo knob:
echo =====
cd knob
cd
call publis.bat
cd ..
echo. 

echo copy gambar
xcopy assets\*.* %FORKHUB%\blitz_edu\pg\gbr /q /y

pause