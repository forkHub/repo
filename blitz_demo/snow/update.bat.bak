echo on
set bdir=..\..\libjsprod\

xcopy %bdir%*.js web\js\ /i /y
xcopy %bdir%*.d.ts dts /i /y

call tsc -p .\tsconfig.json

pause