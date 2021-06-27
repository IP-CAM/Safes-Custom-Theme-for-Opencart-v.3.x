#!/bin/bash

set -ex

if [ ! -f ./config.php ] || [ ! -f ./admin/config.php ]; then
  cd /tmp
  wget "https://github.com/opencart/opencart/releases/download/$OPENCART_VERSION/opencart-$OPENCART_VERSION.zip"
  unzip opencart-$OPENCART_VERSION.zip "upload/*"
  cp -r upload/* /var/www/html
  rm -rf opencart-* upload

  cd /var/www/html/install
  php cli_install.php install \
    --username $USERNAME \
    --email foo@bar.baz \
    --password $PASSWORD \
    --http_server http://localhost:$OPENCART_PORT/ \
    --db_driver mysqli \
    --db_hostname mariadb \
    --db_username root \
    --db_password "" \
    --db_database opencart \
    --db_port $DB_PORT \
    --db_prefix oc_;

    cd /var/www/html;
    rm -rf install;
    rm config-dist.php admin/config-dist.php;
fi

exec "$@"
