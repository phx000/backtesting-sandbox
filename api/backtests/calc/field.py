import pandas as pd
from indicators import get_indicator_function


class Field:
    def __init__(self, serializer):
        self.vectorize_function = None
        self.vector = None
        self._deserialize(serializer)

    def vectorize(self, ohlc):
        self.vector = self.vectorize_function(ohlc)
        return self.vector

    def _deserialize(self, serializer):
        if serializer["type"] == "simple":

            if isinstance(serializer["value"], (int, float)):
                self.vectorize_function = lambda ohlc: pd.Series([serializer["value"]] * len(ohlc), index=ohlc.index)

            elif serializer["value"] == "close":
                self.vectorize_function = lambda ohlc: ohlc["Close"]

        elif serializer["type"] == "indicator":
            self.vectorize_function = get_indicator_function(serializer["value"])
