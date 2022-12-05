@echo on

echo buat template:
echo ==============
del template_be_js\*.* /q
del template_be_js\css\*.* /s /q
del template_be_js\gbr\*.* /s /q
del template_be_js\js\*.* /s /q

xcopy template_be_ts\web\*.* template_be_js\ /s /q /i

pause