#!/bin/bash

if [ ! -f ./config.php ] || [ ! -f ./admin/config.php ]; then
  /setup.sh
fi

exec "$@"
