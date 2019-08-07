FROM node:8.10.0

RUN npm i -g yarn \
  && chmod +x /usr/local/lib/node_modules/yarn/bin/yarn.js \
  && apt-get update \
  && apt-get install -y nginx

# 将当前目录拷贝到工作目录
COPY . /app/

# 指定目录
WORKDIR /app

EXPOSE 80

# 将dist目录下的文件移动到var/www/html 目录下
# 删除/app目录
RUN yarn \
  && yarn dll \
  && yarn build \
  && cp -r dist/ /var/www/html/ \
  && rm -rf /app

ADD nginx.conf /etc/nginx/

# 以前台的方式启动 nginx
CMD ["nginx", "-g", "daemon off;"]
