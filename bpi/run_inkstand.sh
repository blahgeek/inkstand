#!/bin/bash -ex

cd "$(dirname "$0")"

find /tmp/snap-private-tmp/snap.chromium/tmp -name 'puppeteer_dev_chrome_profile-*' -type d -exec rm -rf "{}" \; || true

timeout 3 python3 ./get_bme280.py > build/_environment.json

pushd build/
python3 -m http.server 8000 2>/dev/null &
trap "kill %1" EXIT
popd

sleep 1

pushd screenshot/
rm -rf inkstand.png
timeout 60 node index.js http://127.0.0.1:8000/ inkstand.png 2> /dev/null
popd

SHOWIMG_ARGS="--mode gl16"
if [ $(date +%M) -eq 0 ]; then
    SHOWIMG_ARGS="--mode gc16"
fi

# check if system uptime is within 3 minutes
if [ $(awk '{print int($1)}' /proc/uptime) -lt 180 ]; then
    SHOWIMG_ARGS="$SHOWIMG_ARGS --reset"
fi

for i in {1..5}; do
    if /root/showimg $SHOWIMG_ARGS --vcom 2.15 --rotate 90 screenshot/inkstand.png; then
        exit 0
    fi
    usbreset 048d:8951
    sleep 3
done

exit 1
