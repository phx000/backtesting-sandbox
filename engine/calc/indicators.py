from ta.trend import SMAIndicator


def get_indicator_function(data):
    if data["type"] == "sma":
        return lambda ohlc: SMAIndicator(ohlc["Close"], window=data["parameters"]["window"]).sma_indicator()
