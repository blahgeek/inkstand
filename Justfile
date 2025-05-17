build:
    npm run build

deploy:
    rsync -avz --delete client/ root@192.168.0.91:/root/inkstand
    rsync -avz client/inkstand.service client/inkstand.timer root@192.168.0.91:/etc/systemd/system/
    ssh root@192.168.0.91 'systemctl daemon-reload && systemctl enable --now inkstand.timer'
