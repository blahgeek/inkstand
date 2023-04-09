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

SHOWIMG_ARGS="--vcom 2150 --rotate 90"
if [ $(date +%M) -eq 0 ]; then
    SHOWIMG_ARGS="$SHOWIMG_ARGS --reset"
fi

for i in {1..5}; do
    sleep 3
    if /root/showimg $SHOWIMG_ARGS screenshot/inkstand.png; then
        exit 0
    fi
    usbreset 048d:8951
done

exit 1
