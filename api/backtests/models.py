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
    period = models.CharField(
        choices={key: value["name"] for key, value in schema["backtest"]["period"]["choices"].items()})
    strategies = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
