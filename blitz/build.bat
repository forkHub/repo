cd blijs
call build.bat
cd ..

cd halib
call build.bat
cd..

cd lib
call build.bat
cd ..

copy .\output\blitz.d.ts .\blijs\src\blitz.d.ts
pause