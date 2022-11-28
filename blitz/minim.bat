echo off
rem build
rem =====

@REM cd lib
@REM call build.bat
@REM cd ..

cd output
node ..\minim\target\minim blitz.js blitz.min.js
cd ..


pause