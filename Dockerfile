FROM node:10-alpine

LABEL maintainer "lawler61@163.com"

COPY . /app

WORKDIR /app

RUN yarn \
  && yarn dll \
  && yarn build \
  && yarn global add http-server \
  && yarn cache clean \
  && rm -rf node_modules

CMD ["yarn","server"]

EXPOSE 8080
