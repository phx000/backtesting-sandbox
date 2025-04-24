# Unifnished project
This project aimed to be a graphical no-code way for non-technical users to easily craft backtesting strategies on any financial instrument and run them using the interactive dashboard.

This is how it was intended to look:
![Dashboard](/images/dashboard.png)
![Strategies](/images/strategy.png)

The serialized representation that the server gets from the configuration in the above images is:
```json
{
  "ticker": "aapl",
  "period": "daily",
  "strategies": [
    {
      "type": "buy",
      "units": "100",
      "conditions": [
        {
          "operator": "cross_over",
          "fields": [
            {
              "type": "indicator",
              "value": {
                "type": "sma",
                "params": {
                  "window": 14
                }
              }
            },
            {
              "type": "data",
              "value": "price"
            }
          ]
        },
        {
          "operator": "cross_over",
          "fields": [
            {
              "type": "data",
              "value": "volume"
            },
            {
              "type": "constant",
              "value": "100000"
            }
          ]
        }
      ]
    }
  ]
}
```

Then this object would be translated into a mostly-vectorized set of steps. Used the ta package for indicator logic.