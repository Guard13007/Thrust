@ECHO OFF
IF EXIST node_modules/.bin/jsdoc (
	cmd /c ""%cd%/node_modules/.bin/jsdoc" js -d docs -r"
) ELSE (
	jsdoc js -d docs -r
)
