import math

trades = [
    {"symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 10},
    {"symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 5},
    {"symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 7},
]

symbol = "AAPL"
total = 0
filtered = []
grouped = {}

sorted_trades = sorted(trades, key=lambda t: t["price"], reverse=True)

for t in trades:
  side = t["side"]
  grouped.setdefault(side, []).append(t)
  if t["symbol"] == symbol:
    filtered.append(t)
  
print("Problem 1")
print(filtered)

print ("Problem 2")  
print(total)

print("Problem 3")
print(math.floor(total / len(trades)))

print("Problem 4")
print(grouped)

print("Problem 5")
print(sorted_trades)