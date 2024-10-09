from operators import get_operator_function
from field import Field


class Condition:
    def __init__(self, serializer):
        self.operator = None
        self.vector = None
        self._deserialize(serializer)

    def vectorize(self, ohlc):
        field_vectors = []
        for field in self.fields:
            field_vectors.append(field.vectorize(ohlc))

        self.vector = self.operator(*field_vectors)
        return self.vector

    def _deserialize(self, serializer):
        self.operator = get_operator_function(serializer["operator"])
        self.fields = [Field(field) for field in serializer["fields"]]
