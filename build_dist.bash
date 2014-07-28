#! /bin/bash

clear

echo "building distribution directory"

grunt build

wait

curl 'https://conemo.northwestern.edu/api/lessons.json' -o "app/scripts/lessons.json"
curl 'https://conemo.northwestern.edu/api/dialogues.json' -o "app/scripts/dialogues.json"

if [ $? != 0 ]
then
        echo "lesson load unsuccessful..."
else
        echo "lesson load successful"
fi


cp app/scripts/lessons.json www/scripts
cp app/scripts/dialogues.json www/scripts
cp app/scripts/cbits.js www/scripts
cp app/styles/bootstrap.min.css www/styles
cp config.xml www/


echo 'Completed building distribution folder'
