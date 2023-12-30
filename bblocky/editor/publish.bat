set BB_DEST_DIR=C:\soft\htdocs\forkHub.github.io\bblok

7z a bblok ./web/*
xcopy bblok.7z "G:\My Drive"
xcopy .\web\* %BB_DEST_DIR% /i /s /y

pause
pause