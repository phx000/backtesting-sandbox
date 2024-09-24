def get_operator_function(operator):
    if operator == "cross_over":
        return lambda a, b: (a > b) & (a.shift(1) < b.shift(1))
