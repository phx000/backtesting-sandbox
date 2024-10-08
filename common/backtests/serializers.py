from rest_framework import serializers
from rest_framework.serializers import ValidationError
from .models import Backtest
from . import schema


class IndicatorSerializer(serializers.Serializer):
    type = serializers.ChoiceField(
        choices=list(schema["indicator"]["type"]["choices"].keys()),
    )
    value = serializers.JSONField()

    def validate(self, data):
        params = schema["indicator"]["type"]["choices"][data["type"]]["params"]

        param_errors = {}

        for param_name, param_value in data["value"]["params"].items():
            if param_name not in params:
                param_errors[param_name] = ["This param cannot be used for for this indicator."]
                continue

            param = params[param_name]

            if param["type"] == "float":
                field = serializers.FloatField(
                    min_value=param["min"],
                    max_value=param["max"]
                )
            elif param["type"] == "int":
                field = serializers.IntegerField(
                    min_value=param["min"],
                    max_value=param["max"]
                )
            elif param["type"] == "str":
                field = serializers.CharField(
                    min_length=param["min_len"],
                    max_length=param["max_len"]
                )
            else:
                raise ValueError()

            try:
                field.run_validation(param_value)
            except ValidationError as e:
                param_errors[param_name] = e.detail

        if param_errors:
            raise ValidationError({"params": param_errors})

        return data


class FieldSerializer(serializers.Serializer):
    type = serializers.ChoiceField(
        choices=list(schema["field"]["type"]["choices"].keys())
    )
    value = serializers.JSONField()

    def validate(self, data):
        try:
            if data["type"] == "constant":
                field = serializers.FloatField(
                    min_value=schema["field"]["type"]["choices"]["constant"]["min"],
                    max_value=schema["field"]["type"]["choices"]["constant"]["max"]
                )
                field.run_validation(data["value"])

            elif data["type"] == "data":
                field = serializers.ChoiceField(
                    choices=list(schema["field"]["type"]["choices"]["data"]["choices"].keys())
                )
                field.run_validation(data["value"])

            elif data["type"] == "indicator":
                serializer = IndicatorSerializer(data=data["value"])
                serializer.is_valid(raise_exception=True)

        except ValidationError as e:
            raise ValidationError({
                "value": e.detail
            })

        return data


class ConditionSerializer(serializers.Serializer):
    operator = serializers.ChoiceField(
        choices=list(schema["condition"]["operator"]["choices"].keys())
    )
    fields = serializers.ListSerializer(
        child=FieldSerializer(),
        min_length=schema["condition"]["fields"]["min_len"],
        max_length=schema["condition"]["fields"]["max_len"]
    )


class StrategySerializer(serializers.Serializer):
    type = serializers.ChoiceField(
        choices=list(schema["strategy"]["type"]["choices"].keys())
    )
    units = serializers.FloatField(
        min_value=schema["strategy"]["units"]["min"],
        max_value=schema["strategy"]["units"]["max"]
    )
    conditions = serializers.ListSerializer(
        child=ConditionSerializer(),
        min_length=schema["strategy"]["conditions"]["min_len"],
        max_length=schema["strategy"]["conditions"]["max_len"]
    )


class BacktestSerializer(serializers.ModelSerializer):
    strategies = serializers.ListSerializer(
        child=StrategySerializer(),
        min_length=schema["backtest"]["strategies"]["min_len"],
        max_length=schema["backtest"]["strategies"]["max_len"]
    )

    class Meta:
        model = Backtest
        fields = ["ticker", "period", "strategies", "created_at"]
