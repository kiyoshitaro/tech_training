FROM python:3.6.5-slim

WORKDIR /app

RUN pip --no-cache-dir install numpy pandas seaborn sklearn jupyter
VOLUME /app

EXPOSE 2222

CMD ["jupyter", "notebook", "--ip='*'", "--port=2222", "--no-browser", "--allow-root"]
