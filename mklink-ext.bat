@ECHO %0 %*
@pushd
@cd /D "%~dp0"
@cd

REM Replace with valid path to Ext

rd Apps\Pecunia\client\lib\ext
mklink /D Apps\Pecunia\client\lib\ext C:\Code\Lib\Ext\extjs-4.1.0-rc1

@pause
@popd