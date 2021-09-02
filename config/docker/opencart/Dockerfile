ARG php_version=7.4

FROM php:${php_version}-fpm

ARG php_version

RUN set -ex; \
  apt update; \
  apt install -y libmcrypt-dev libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev libzip-dev zip curl wget; \
  docker-php-ext-install mysqli pdo_mysql zip; \
  docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype; \
  docker-php-ext-install gd; \
  pecl install mcrypt-1.0.4; \
  docker-php-ext-enable mcrypt;

RUN cd /tmp \
  && curl -o ioncube.tar.gz http://downloads3.ioncube.com/loader_downloads/ioncube_loaders_lin_x86-64.tar.gz \
  && tar -xvvzf ioncube.tar.gz \
  && mkdir -p /usr/local/ioncube \
  && mv "ioncube/ioncube_loader_lin_${php_version}.so" /usr/local/ioncube/ \
  && rm -rf ioncube.tar.gz ioncube \
  && echo "zend_extension = /usr/local/ioncube/ioncube_loader_lin_${php_version}.so" > /usr/local/etc/php/conf.d/00-ioncube.ini

WORKDIR /var/www/html

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["sh", "/docker-entrypoint.sh"]

EXPOSE 9000
CMD ["php-fpm"]
