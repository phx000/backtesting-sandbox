from rest_framework.viewsets import ModelViewSet
from common.backtests.models import Backtest
from common.backtests.serializers import BacktestSerializer
from engine.core.celery import app


class BacktestViewSet(ModelViewSet):
    serializer_class = BacktestSerializer
    queryset = Backtest.objects.all()

    def perform_create(self, serializer):
        # backtest = serializer.save()
        app.send_task("backtest", args=[serializer.data])
