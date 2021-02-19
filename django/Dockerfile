FROM python:3.6.10-buster

RUN apt-get update && apt-get install nginx vim -y --no-install-recommends
COPY nginx.default /etc/nginx/sites-available/default
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /opt/app
RUN mkdir /skin

RUN mkdir -p /opt/app/pip_cache
RUN mkdir -p /opt/app/news_django
# COPY requirements.txt start-server.sh /opt/app/
COPY .pip_cache /opt/app/pip_cache/
COPY . /opt/app/news_django/
COPY ./skin /skin
WORKDIR /opt/app/news_django
RUN pip install -r requirements.txt --cache-dir /opt/app/pip_cache
RUN chown -R www-data:www-data /opt/app/news_django

EXPOSE 8020
STOPSIGNAL SIGTERM
CMD ["/opt/app/news_django/start-server.sh"]
