#!/usr/bin/env bash

cat app/scripts/lessons.json | python -m json.tool > app/scripts/lessons-pretty.json
