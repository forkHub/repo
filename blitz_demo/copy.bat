echo off

echo snow:
echo =====
copy ..\blitz\output\*.d.ts .\snow\dts
copy ..\blitz\output\*.js .\snow\web\js

echo tile:
echo =====
copy ..\blitz\output\*.d.ts .\tile\dts
copy ..\blitz\output\*.js .\tile\web\js

echo doodle:
echo =====
copy ..\blitz\output\*.d.ts .\doodle\dts
copy ..\blitz\output\*.js .\doodle\web\js

echo expl:
echo =====
copy ..\blitz\output\*.d.ts .\expl\dts
copy ..\blitz\output\*.js .\expl\web\js

echo collision:
echo ==========
copy ..\blitz\output\*.d.ts .\collision\dts
copy ..\blitz\output\*.js .\collision\web\js

echo drag2:
echo ======
copy ..\blitz\output\*.d.ts .\drag02\dts
copy ..\blitz\output\*.js .\drag02\web\js

echo orbit:
echo ======
copy ..\blitz\output\*.d.ts .\orbit\dts
copy ..\blitz\output\*.js .\orbit\web\js

echo orbit_mbb:
echo ==========
copy ..\blitz\output\*.d.ts .\orbit_mbb\dts
copy ..\blitz\output\*.js .\orbit_mbb\web\js

pause
pause