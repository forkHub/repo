echo on

echo java script:
echo ============

del java_script\*.* /s /q
xcopy web\*.* java_script /s /q 
copy .\index.html .\java_script /y 

echo type script:
echo ============

del type_script\*.* /s /q
xcopy .\dts\*.* .\type_script\dts /s /i /q 
xcopy .\src\*.* .\type_script\src /s /i /q 
xcopy .\web\*.* .\type_script\web /s /i /q
copy .\index.html .\java_script /y 
copy .\tsconfig.json .\type_script\ /y 

pause
pause