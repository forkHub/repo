set file_js=Expl.js
set folder=expl

call tsc -p .\tsconfig.json

cd .\web\js
node %BACA_JS% %file_js% %file_js%

cd ..
cd ..

xcopy web %FORKHUB%\blitz_edu\demo\%folder% /s /i /y
copy .\web\js\%file_js% %FORKHUB%\pg\data\%file_js% /y

pause
pause