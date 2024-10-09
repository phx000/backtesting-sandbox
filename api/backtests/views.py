from rest_framework.viewsets import ModelViewSet
from .models import Backtest
from .serializers import BacktestSerializer
from .tasks import add


class BacktestViewSet(ModelViewSet):
    serializer_class = BacktestSerializer
    queryset = Backtest.objects.all()

    def perform_create(self, serializer):
        backtest = serializer.save()
        add.delay(1, 6)

        # app.send_task("backtest", args=[serializer.data])
