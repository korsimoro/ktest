#!/bin/bash
cd /usr/src/app/TiddlyWiki5
exec node ./tiddlywiki.js ./wiki --listen
