set BB_DEST_DIR=D:\xampp3\htdocs\io\sbblok

rem 7z a bblok ./webrem/*
rem xcopy bblok.7z "G:\My Drive"

xcopy .\web\* %BB_DEST_DIR% /i /s /y

pause
pause