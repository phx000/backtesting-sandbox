from common.backtests.serializers import BacktestSerializer
from engine.core.celery import app


@app.task(name="backtest")
def backtest(data):
    serializer = BacktestSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()


# todo install flower