#!/bin/bash
OPTS="--trim=true --ignoreEmpty=true"
csvtojson ./input/event.csv $OPTS | python -m json.tool > input/event.json
csvtojson ./input/groups.csv $OPTS | python -m json.tool > input/groups.json
csvtojson ./input/organizations.csv $OPTS | python -m json.tool > input/organizations.json
csvtojson ./input/product.csv $OPTS | python -m json.tool > input/product.json
csvtojson ./input/pubs.csv $OPTS | python -m json.tool > input/pubs.json
