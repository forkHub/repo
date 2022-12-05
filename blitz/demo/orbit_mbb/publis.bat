set file_js=orbit_mbb.js
set folder=orbit_mbb

call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

xcopy web %FORKHUB%\blitz_edu\demo\%folder% /s /i /y

copy .\web\js\%file_js% %FORKHUB%\blitz_edu\pg\data\%file_js% /y
xcopy .\web\gbr %FORKHUB%\blitz_edu\pg\gbr /s /i /y

pause
pause