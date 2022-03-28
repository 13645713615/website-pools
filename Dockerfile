FROM nginx:1.21.6-alpine
LABEL maintainer="jxcloud docker"

 # ...dist........................... /usr/share/nginx/html/ ..................
COPY dist/  /usr/share/nginx/html/

COPY entrypoint.sh /docker-entrypoint.d/1-createDefault.sh
RUN chmod 755 /docker-entrypoint.d/1-createDefault.sh

#..........................................
RUN mkdir -p /opt/nginx/conf.d
COPY default.conf /opt/nginx/conf.d/default.conf
# RUN cp /etc/nginx/conf.d/default.conf  /opt/nginx/conf.d/default.conf

RUN mkdir -p /var/www
RUN mkdir -p /var/cert
#............
VOLUME /var/www /var/cert