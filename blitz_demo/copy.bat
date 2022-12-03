@echo off

echo snow:
echo =====
copy ..\blitz\output\*.d.ts .\snow\dts
copy ..\blitz\output\*.min.js .\snow\web\js
echo.

echo drag_inline:
echo ============
copy ..\blitz\output\*.d.ts .\drag_inline\dts
copy ..\blitz\output\*.min.js .\drag_inline\web\js
echo.

echo tile:
echo =====
copy ..\blitz\output\*.d.ts .\tile\dts
copy ..\blitz\output\*.min.js .\tile\web\js
echo.

echo doodle:
echo =====
copy ..\blitz\output\*.d.ts .\doodle\dts
copy ..\blitz\output\*.min.js .\doodle\web\js
echo.

echo expl:
echo =====
copy ..\blitz\output\*.d.ts .\expl\dts
copy ..\blitz\output\*.min.js .\expl\web\js
echo.

echo collision:
echo ==========
copy ..\blitz\output\*.d.ts .\collision\dts
copy ..\blitz\output\*.min.js .\collision\web\js
echo.

echo drag2:
echo ======
copy ..\blitz\output\*.d.ts .\drag02\dts
copy ..\blitz\output\*.min.js .\drag02\web\js
echo.

echo orbit:
echo ======
copy ..\blitz\output\*.d.ts .\orbit\dts
copy ..\blitz\output\*.min.js .\orbit\web\js
echo.

echo orbit_mbb:
echo ==========
copy ..\blitz\output\*.d.ts .\orbit_mbb\dts
copy ..\blitz\output\*.min.js .\orbit_mbb\web\js
echo.

echo knob:
echo =====
copy ..\blitz\output\*.d.ts .\knob\dts
copy ..\blitz\output\*.min.js .\knob\web\js
echo.

pause