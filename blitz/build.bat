echo off
rem build
rem =====

cd lib
call build.bat
cd ..

cd output
node ..\minim\target\minim blitz.js blitz.min.js
cd ..


pause