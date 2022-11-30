set baca_js=..\..\..\..\..\cemcem\blitz\bacajs\target\baca.js
set file_js=drag.js
set publish_dir=..\..\..\forkHub.github.io\blitz_edu

cd .\web\js
node %baca_js% %file_js% %file_js%

cd ..
cd ..

xcopy web %publish_dir%\demo\drag02 /s /i /y
xcopy .\web\js\%file_js% %publish_dir%\pg\data\%file_js% /y

pause
