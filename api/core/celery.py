from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

app = Celery("core", broker=os.environ.get("CELERY_BROKER_URL"))

app.autodiscover_tasks()
