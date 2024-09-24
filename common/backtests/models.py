from django.db import models


class Backtest(models.Model):
    ticker = models.CharField(max_length=20)
    strategies = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
