FROM node:12-slim AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY src src
RUN yarn install && yarn build

FROM node:12-slim
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --only=production
COPY --from=builder /usr/src/app/dist/ dist/
EXPOSE 3000
ENTRYPOINT [ "node", "dist/index.js" ]
