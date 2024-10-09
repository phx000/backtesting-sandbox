import pandas as pd


class Ticker:
    def __init__(self, ticker):
        self.ticker = ticker
        self._get_ohlc()

    def _get_ohlc(self):
        df = pd.read_csv(r"/api/backtests/calc/aapl.csv", index_col=0, parse_dates=True)
        self.ohlc = df
