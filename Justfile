build:
    npm run build

deploy: build
    rsync -avz --delete build/ root@192.168.0.91:/root/inkstand/build
    rsync -avz bpi/ root@192.168.0.91:/root/inkstand
