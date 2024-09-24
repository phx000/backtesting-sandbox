from rest_framework.routers import DefaultRouter
from .views import BacktestViewSet

router = DefaultRouter()
router.register("backtests", BacktestViewSet, basename="backtest")

urlpatterns = router.urls
