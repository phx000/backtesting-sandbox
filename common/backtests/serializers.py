from rest_framework import serializers
from .models import Backtest


class FieldSerializer(serializers.Serializer):
    # todo create a better division of info types and their corresponding serializers
    TYPE_CHOICES = ("constant", "data", "indicator")
    type = serializers.ChoiceField(choices=TYPE_CHOICES)
    value = serializers.FloatField()


class ConditionSerializer(serializers.Serializer):
    OPERATOR_CHOICES = ("crosses_over", "crosses_below")
    field_1 = FieldSerializer()
    operator = serializers.ChoiceField(choices=OPERATOR_CHOICES)
    field_2 = FieldSerializer()


class ConditionListSerializer(serializers.Serializer):
    OPERATOR_CHOICES = ("and", "or")
    operator = serializers.ChoiceField(choices=OPERATOR_CHOICES)
    conditions = ConditionSerializer(many=True)


class StrategySerializer(serializers.Serializer):
    ACTION_CHOICES = ("sell", "buy")
    condition_lists = ConditionListSerializer(many=True)
    action = serializers.ChoiceField(choices=ACTION_CHOICES)
    units = serializers.FloatField()


class BacktestSerializer(serializers.ModelSerializer):
    strategies = StrategySerializer(many=True)

    class Meta:
        model = Backtest
        fields = ["ticker", "trades", "created_at"]
