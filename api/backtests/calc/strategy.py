import pandas as pd
from condition import Condition


class Strategy:
    def __init__(self, serializer):
        self.vector = None
        self._deserialize(serializer)

    def vectorize(self, ohlc):
        condition_vectors = []
        for condition in self.conditions:
            condition_vectors.append(condition.vectorize(ohlc))

        conditions_df = pd.concat(condition_vectors, axis=1)
        self.vector = conditions_df.all(axis=1) * self.position.size
        return self.vector

    def _deserialize(self, serializer):
        self.position = Position(serializer["position"])
        self.conditions = [Condition(condition) for condition in serializer["conditions"]]


class Position:
    def __init__(self, serializer):
        self.size = serializer["size"]
        self.take_profit = serializer.get("take_profit", None)
        self.stop_loss = serializer.get("stop_loss", None)
