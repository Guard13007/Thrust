#!/bin/bash
if which jsdoc; then
	jsdoc ./js -d ./docs -r -c ./docs/conf.json;
else
	./node_modules/.bin/jsdoc ./js -d ./docs -r -c ./docs/conf.json;
fi
echo "If errored, 'npm install jsdoc'"
