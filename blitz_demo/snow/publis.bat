set baca_js=D:\xampp3\htdocs\cemcem\blitz\bacajs\target\baca
set file_js=salju.js
set folder_js=snow
set publish_dir=D:\xampp3\htdocs\forkHub.github.io\blitz_edu\demo\%folder_js%

cd .\web\js
node %baca_js% %file_js% %file_js%

cd ..
cd ..

xcopy web %publish_dir% /s /i /y

pause

