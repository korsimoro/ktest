#!/bin/bash
if tsc; then
	rm -rf input/tiddly/maps/*
	rm -rf input/tiddly/nodes/*
	#./init.sh
	./bin/convert
	#./bin/pub-anal
	#./bin/lookup IEEE
fi
