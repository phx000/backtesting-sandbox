from backtest import Backtest

ser = {
    "ticker": "aapl",
    "strategies": [
        {
            "position": {
                "size": 10,
                "take_profit": 0.1
            },
            "conditions": [
                {
                    "operator": "cross_over",
                    "fields": [
                        {
                            "type": "simple",
                            "value": "close"
                        },
                        {
                            "type": "indicator",
                            "value": {
                                "type": "sma",
                                "parameters": {
                                    "window": 14
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

b = Backtest(ser)
b.run()
print(b.account.balance, len(b.trades))
