FROM node:10-alpine

LABEL maintainer "lawler61@163.com"

COPY . /app

WORKDIR /app

RUN yarn \
  && yarn dll \
  && yarn build \
  && yarn cache clean \
  && cp -r dist /build \
  && rm -rf /app
