#!/bin/bash
if tsc; then
	rm -rf output/*
	./bin/convert
fi
