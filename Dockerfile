FROM node:12-slim AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY webpack.config.js ./
COPY src src
RUN yarn install && yarn build
RUN apt update && \
    apt install -y git-all && \
    ./node_modules/.bin/pm2 install pm2-intercom && \
    ./node_modules/.bin/pm2 install pm2-logrotate

FROM node:12-slim
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --only=production
COPY --from=builder /usr/src/app/dist/ dist/
COPY --from=builder /root/.pm2/ /root/.pm2
EXPOSE 3000
ENTRYPOINT ["./node_modules/.bin/pm2", "--attach", "--merge-logs", "start", "./dist/index.js", "-i", "5", "-s"]
