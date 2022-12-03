@echo off

echo orbit_oval:
echo ===========
copy ..\output\*.d.ts .\orbit_oval\dts
copy ..\output\*.min.js .\orbit_oval\web\js
echo.

echo test_text:
echo ==========
copy ..\output\*.d.ts .\test_text\dts
copy ..\output\*.min.js .\test_text\web\js
echo.

pause