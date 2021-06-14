#!/bin/bash

OPENCART_VERSION="3.0.3.7"

set -ex

cd /tmp
wget "https://github.com/opencart/opencart/releases/download/$OPENCART_VERSION/opencart-$OPENCART_VERSION.zip"
unzip opencart-$OPENCART_VERSION.zip "upload/*"
cp -r upload/* /var/www/html
rm -rf opencart-* upload

cd /var/www/html
mv config-dist.php config.php
mv ./admin/config-dist.php ./admin/config.php
