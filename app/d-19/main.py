trades = [
    {"id": 1, "symbol": "AAPL", "side": "BUY", "price": 20, "quantity": 50},
    {"id": 2, "symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 20},
    {"id": 3, "symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 150},
    {"id": 4, "symbol": "MSFT", "side": "BUY", "price": 380, "quantity": 80},
    {"id": 5, "symbol": "TSLA", "side": "SELL", "price": 245, "quantity": 120},
]

trade_prices = [t["price"] for t in trades]
large_trades = [t["price"] for t in trades if t["price"] > 100]
unduped_trades = {t["symbol"] for t in trades}
trade_lookup = {t["id"] : (t["symbol"], t["price"]) for t in trades}
total_values = (t["price"] * t["quantity"] for t in trades)

print ("Problem 1")
print(trade_prices)

print ("Problem 2")
print(large_trades)

print ("Problem 3")
print(unduped_trades)

print ("Problem 4")
print(trade_lookup)

print("Problem 5")
for t in total_values:
  print(t)