echo off
cd ..\blitz
call build.bat


cd ..\blitz_demo

echo drag2
echo =====
copy ..\blitz\output\*.d.ts .\drag02\dts
copy ..\blitz\output\*.js .\drag02\web\js
pause

echo orbit
echo =====
copy ..\blitz\output\*.d.ts .\orbit\dts
copy ..\blitz\output\*.js .\orbit\web\js
pause

pause