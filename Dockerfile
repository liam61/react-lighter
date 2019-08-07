FROM node:10-alpine

# 将当前目录拷贝到工作目录
COPY . /app/

# 指定目录
WORKDIR /app/

RUN apk add --update nginx \
  && yarn \
  && yarn dll \
  && yarn build \
  && cp -r dist/* /var/www/html/ \
  && rm -rf /app

ADD nginx.conf /etc/nginx/

EXPOSE 80

# 以前台的方式启动 nginx
CMD ["nginx", "-g", "daemon off;"]
