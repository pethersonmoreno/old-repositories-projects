#!/usr/bin/bash

rsync --delete -av src/ ~/WIN_SHARE_VAGRANT
echo "Waiting update on files in src directory"
inotifywait -q -m -r -e modify,delete,create src | while read DIRECTORY EVENT FILE; do
    rsync --delete -av src/ ~/WIN_SHARE_VAGRANT
    echo "Waiting update on files in src directory"
done