#! /bin/bash

clear

echo "building distribution directory"

grunt build

wait

curl 'https://conemo.northwestern.edu/lesson_api/lessons.json' -o "app/scripts/lessons.json"

if [ $? != 0 ]
then
        echo "lesson load unsuccessful..."
else
        echo "lesson load successful"
fi

cp app/scripts/lessons.json www/scripts
cp app/scripts/cbits.js www/scripts
cp app/styles/bootstrap.min.css www/styles
cp config.xml www/


echo 'Completed building distribution folder'
