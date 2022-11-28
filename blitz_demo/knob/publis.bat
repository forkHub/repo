set baca_js=D:\xampp3\htdocs\cemcem\blitz\bacajs\target\baca
set file_js=drag.js
set folder_js=drag02
set publish_dir=D:\xampp3\htdocs\forkHub.github.io\blitz_edu\demo\%folder_js%

cd .\web\js
node %baca_js% %file_js% %file_js%

cd ..
cd ..

xcopy web %publish_dir% /s /i /y
xcopy .\web\js\%file_js% D:\xampp3\htdocs\forkHub.github.io\blitz_edu\pg\data\%file_js% /y

pause
