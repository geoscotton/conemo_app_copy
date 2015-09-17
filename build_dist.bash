#! /bin/bash

clear

echo "building distribution directory"

grunt build

wait

curl 'https://conemo.northwestern.edu/api/lessons.json' -o "app/scripts/lessons.json"
./scripts/fix_empty_options.js
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

./node_modules/.bin/cordova plugin remove org.apache.cordova.file-transfer
./node_modules/.bin/cordova plugin remove org.apache.cordova.file
./node_modules/.bin/cordova plugin remove org.apache.cordova.network-information

./node_modules/.bin/cordova plugin add org.apache.cordova.file@1.2.0
./node_modules/.bin/cordova plugin add org.apache.cordova.file-transfer@0.4.5
./node_modules/.bin/cordova plugin add org.apache.cordova.network-information@0.2.10
