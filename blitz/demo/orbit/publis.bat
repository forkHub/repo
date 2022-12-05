set file_js=Orbit.js
set folder=orbit

call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

xcopy web %FORKHUB%\blitz_edu\demo\%folder% /s /i /y

copy .\web\js\%file_js% %FORKHUB%\pg\data\%file_js% /y
xcopy .\web\gbr %FORKHUB%\blitz_edu\pg\gbr /s /i /y

pause
pause