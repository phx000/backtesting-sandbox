from django.db import models
from django.core.validators import MinLengthValidator
from . import schema


class Backtest(models.Model):
    ticker = models.CharField(
        max_length=schema["backtest"]["ticker"]["max_len"],
        validators=[
            MinLengthValidator(schema["backtest"]["ticker"]["min_len"]),
        ]
    )
    period = models.IntegerField(choices=schema["backtest"]["period"]["choices"])
    strategies = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
