from ta.trend import SMAIndicator


def get_indicator_function(data):
    if data["name"] == "sma":
        return lambda ohlc: SMAIndicator(ohlc["Close"], window=data["parameters"]["window"]).sma_indicator()
