#!/bin/bash -ex

cd "$(dirname "$0")"

pushd build/
python3 -m http.server 8000 &
trap "kill %1" EXIT
popd

sleep 1

pushd screenshot/
rm -rf inkstand.png
time node index.js http://127.0.0.1:8000/ inkstand.png
popd

for i in {1..5}; do
    sleep 3
    if /root/showimg --vcom 2150 --rotate 90 screenshot/inkstand.png; then
        exit 0
    fi
    usbreset 048d:8951
done

exit 1
