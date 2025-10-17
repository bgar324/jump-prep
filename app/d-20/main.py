trades = [
    {"id": 1, "symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 50},
    {"id": 2, "symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 20},
    {"id": 3, "symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 150},
    {"id": 4, "symbol": "MSFT", "side": "BUY", "price": 380, "quantity": 80},
    {"id": 5, "symbol": "TSLA", "side": "SELL", "price": 245, "quantity": 120},
    {"id": 6, "symbol": "AAPL", "side": "BUY", "price": 151, "quantity": 70},
]

trades_part1 = {
    1: {"symbol": "AAPL", "price": 150},
    3: {"symbol": "TSLA", "price": 240},
}

trades_part2 = {
    2: {"symbol": "MSFT", "price": 380},
    4: {"symbol": "TSLA", "price": 245},
}


freq_table = {}
inverted_freq_table = {}
for t in trades:
  symbol = t["symbol"]
  price = t["price"]
  freq_table[symbol] = freq_table.get(symbol, 0) + 1
  inverted_freq_table.setdefault(price, []).append(t["id"])

trades_all = trades_part1.copy()
trades_all.update(trades_part2) 

items = list(trades_all.items())

def sort_key(item):
  return item[1]["symbol"]

sorted_items = sorted(items, key=sort_key)

for pair in sorted_items:
  trade_id = pair[0]
  data = pair[1]
  print(trade_id, data)

print("Problem 1")
print(freq_table)

print("Problem 2")
print(inverted_freq_table)

print("Problem 3")
print(trades_all)

print(items)