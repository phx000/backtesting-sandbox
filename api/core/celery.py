from celery import Celery
import os

app = Celery("core", broker=os.environ.get("CELERY_BROKER_URL"))
