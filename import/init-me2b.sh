#!/bin/bash
OPTS="--trim=true --ignoreEmpty=true"
csvtojson ../input/me2b/event.csv $OPTS | python -m json.tool > ../input/me2b/event.json
csvtojson ../input/me2b/groups.csv $OPTS | python -m json.tool > ../input/me2b/groups.json
csvtojson ../input/me2b/organizations.csv $OPTS | python -m json.tool > ../input/me2b/organizations.json
csvtojson ../input/me2b/product.csv $OPTS | python -m json.tool > ../input/me2b/product.json
csvtojson ../input/me2b/pubs.csv $OPTS | python -m json.tool > ../input/me2b/pubs.json
