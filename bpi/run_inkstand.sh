#!/bin/bash -ex

cd "$(dirname "$0")"

find /tmp/snap-private-tmp/snap.chromium/tmp -name 'puppeteer_dev_chrome_profile-*' -type d -exec rm -rf "{}" \; || true

pushd build/
python3 -m http.server 8000 2>/dev/null &
trap "kill %1" EXIT
popd

sleep 1

pushd screenshot/
rm -rf inkstand.png
node index.js http://127.0.0.1:8000/ inkstand.png
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
    sleep 3
    if /root/showimg $SHOWIMG_ARGS --vcom 2150 --rotate 90 screenshot/inkstand.png; then
        exit 0
    fi
    usbreset 048d:8951
done

exit 1
