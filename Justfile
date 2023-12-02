build:
    npm run build

deploy:
    rsync -avz --delete build/ root@192.168.0.91:/root/inkstand/build
    rsync -avz bpi/screenshot/ root@192.168.0.91:/root/inkstand/screenshot
    rsync -avz bpi/get_bme280.py root@192.168.0.91:/root/inkstand/get_bme280.py
    rsync -avz bpi/run_inkstand.sh root@192.168.0.91:/root/inkstand/run_inkstand.sh
    rsync -avz bpi/inkstand.service bpi/inkstand.timer bpi/inkstand-browser.service root@192.168.0.91:/etc/systemd/system/
    ssh root@192.168.0.91 'systemctl daemon-reload && systemctl enable --now inkstand-browser.service && systemctl enable --now inkstand.timer'
