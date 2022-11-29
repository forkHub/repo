set baca_js=..\..\..\..\..\cemcem\blitz\bacajs\target\baca.js
set file_js=drag.js

cd .\web\js
node %baca_js% %file_js% %file_js%

cd ..
cd ..

xcopy web %publish_dir% /s /i /y
xcopy .\web\js\%file_js% ..\..\..\forkHub.github.io\blitz_edu\pg\data\%file_js% /y

pause
