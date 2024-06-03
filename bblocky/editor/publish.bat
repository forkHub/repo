set BB_DEST_DIR=D:\xampp3\htdocs\io\bblok

7z a bblok ./web/*
xcopy bblok.7z "G:\My Drive"
xcopy .\web\* %BB_DEST_DIR% /i /s /y

pause
pause