copy c:\tsmodule\blitz.d.ts .\src\dts\
copy c:\tsmodule\bblok.d.ts .\src\dts\
copy c:\tsmodule\js.d.ts .\src\dts\

@REM call uglifyjs \tsmodule\be.js \tsmodule\be.min.js
@REM copy \tsmodule\be.min.js .\web\js\be.min.js

copy c:\tsmodule\blitz.js .\web\js\
copy c:\tsmodule\bblok.js .\web\js\
copy c:\tsmodule\js.js .\web\js\
pause
pause