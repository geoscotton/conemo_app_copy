#! /bin/bash

clear

echo "building distribution directory"

grunt build

wait

curl 'https://conemo.northwestern.edu/api/lessons.json' -o "app/scripts/lessons.json"
cat app/scripts/lessons.json | python -m json.tool > app/scripts/lessons-pretty.json
curl 'https://conemo.northwestern.edu/api/dialogues.json' -o "app/scripts/dialogues.json"
cat app/scripts/dialogues.json | python -m json.tool > app/scripts/dialogues-pretty.json

if [ $? != 0 ]
then
        echo "lesson load unsuccessful..."
else
        echo "lesson load successful"
fi

mkdir -p www/scripts
mkdir -p www/styles
cp app/scripts/lessons.json www/scripts/
cp app/scripts/dialogues.json www/scripts/
cp app/scripts/cbits.js www/scripts/
cp app/styles/bootstrap.min.css www/styles/
cp config.xml www/


echo 'Completed building distribution folder'
