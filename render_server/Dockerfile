# a simple nodejs server dockerfile
# 1. add current directory
# 2. install deps using npm
# 3. the exec command is "node index.js"
# 4. server port is 3000

FROM node:22

 # to sasitfy all dependencies for chromium (although builtin by puppeteer)
RUN apt-get update && apt-get install -y chromium && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
