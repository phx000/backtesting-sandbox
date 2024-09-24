import os
import sys

sys.path.append("..")

from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "engine.core.settings")

app = Celery("core", broker=os.environ.get("CELERY_BROKER_URL"))
app.conf.update(imports=["engine.tasks"])
