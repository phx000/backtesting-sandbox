class Trade:
    def __init__(self, shares, account, take_profit=None, stop_loss=None):
        self.shares = shares
        self.account = account
        self.take_profit = take_profit
        self.stop_loss = stop_loss
        self.take_profit_price = None
        self.stop_loss_price = None
        self.is_open = False

    def open(self, ohlc):
        self.take_profit_price = None if self.take_profit is None else ohlc["Close"] * (1 + self.take_profit)
        self.stop_loss_price = None if self.stop_loss is None else ohlc["Close"] * (1 - self.stop_loss)

        if self.shares > 0:
            self._buy(ohlc)
        elif self.shares < 0:
            self._sell(ohlc)

        self.is_open = True

    def close(self, ohlc):
        if self.shares > 0:
            self._buy(ohlc)
        elif self.shares < 0:
            self._sell(ohlc)

        self.is_open = False

    def check(self, ohlc):
        if ohlc["Close"] >= self.take_profit_price:
            self.close(ohlc)
            return

        if ohlc["Close"] <= self.stop_loss_price:
            self.close(ohlc)

    def _buy(self, ohlc):
        if self.account.balance <= 0:
            return

        shares = min(self.account.balance, self.shares * ohlc["Close"]) / ohlc["Close"]
        self.account.shares += shares
        self.account.balance -= shares * ohlc["Close"]

    def _sell(self, ohlc):
        if abs(self.shares) > self.account.shares:
            return

        self.account.shares += self.shares
        self.account.balance -= self.shares * ohlc["Close"]
