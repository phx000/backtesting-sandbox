from account import Account
from ticker import Ticker
from strategy import Strategy
from trade import Trade


class Backtest:
    def __init__(self, serializer):
        self.account = Account()
        self.trades = []
        self._deserialize(serializer)

    def run(self):
        for strategy in self.strategies:
            strategy.vectorize(self.ticker.ohlc)

        for index in self.ticker.ohlc.index:
            for trade in self.trades:
                if trade.is_open():
                    trade.check(self.ticker.ohlc[index])

            for strategy in self.strategies:
                if strategy.vector[index] != 0:
                    trade = Trade(strategy.vector[index],
                                  self.account,
                                  take_profit=strategy.position.take_profit,
                                  stop_loss=strategy.position.stop_loss)
                    trade.open(self.ticker.ohlc[index])
                    self.trades.append(trade)

    def _deserialize(self, serializer):
        self.ticker = Ticker(serializer["ticker"])
        self.strategies = [Strategy(strategy) for strategy in serializer["strategies"]]
