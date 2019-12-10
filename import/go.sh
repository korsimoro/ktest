#!/bin/bash
if tsc; then
	rm -rf output/*
	rm -rf input/tiddly/nodes
	rm -rf input/tiddly/maps
	./bin/tload
	git status
fi
