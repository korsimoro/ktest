#!/bin/bash
if tsc; then
	rm -rf output/*
	rm -rf input/tiddly/*
	./bin/convert
fi
