FROM php:8-fpm

RUN apt update && \
    apt install -y libmcrypt-dev libfreetype6-dev libjpeg62-turbo-dev \
    libpng-dev libwebp-dev libzip-dev zip curl

RUN docker-php-ext-install mysqli pdo_mysql && \
    docker-php-ext-install zip && \
    docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype && \
    docker-php-ext-install gd

RUN pecl install mcrypt-1.0.4 && \
    docker-php-ext-enable mcrypt

WORKDIR /var/www/html

CMD ["php-fpm"]

EXPOSE 9000
