from functools import reduce

trades = [
    {"id": 1, "symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 50},
    {"id": 2, "symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 20},
    {"id": 3, "symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 150},
    {"id": 4, "symbol": "MSFT", "side": "BUY", "price": 380, "quantity": 80},
    {"id": 5, "symbol": "TSLA", "side": "SELL", "price": 245, "quantity": 120},
    {"id": 6, "symbol": "NVDA", "side": "BUY", "price": 900, "quantity": 15},
]

prices = list(map(lambda t: t["price"], trades))
filtered_prices = list(filter(lambda t : t["price"] * t["quantity"] > 10000 , trades))
total_value = reduce(lambda sum, t : sum + (t["price"] * t["quantity"]), trades, 0)
sorted_trades = sorted(trades, key = lambda t : (t["symbol"], t["price"]))

print("Problem 1")
print(prices)

print("Problem 2")
print(filtered_prices)

print("Problem 3")
print(total_value)

print("Problem 4")
print(sorted_trades)