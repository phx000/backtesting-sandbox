FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential libpq-dev && \
    pip install psycopg2 && \
    apt-get purge -y --auto-remove build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY ./api/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .