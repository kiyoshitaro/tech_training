#!/usr/bin/env bash
# start-server.sh
if [ -n "$DJANGO_SUPERUSER_USERNAME" ] && [ -n "$DJANGO_SUPERUSER_PASSWORD" ] ; then
    (cd news_django:; python manage.py createsuperuser --no-input)
fi
(
    # cd news_django; 
gunicorn news_django.wsgi:application --user www-data --bind 0.0.0.0:8010 --workers 3) &
nginx -g "daemon off;"