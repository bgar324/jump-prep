trades = [
    {"symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 10},
    {"symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 5},
    {"symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 7},
]

def group_trades(trades: list[dict], side : str) -> dict: 
  filtered_trades = []
  for t in trades:
    if t["side"] == side.upper():
      filtered_trades.append(t)

  summary = {}
  for t in filtered_trades:
    if t["symbol"] not in summary:
      summary[t["symbol"]] = {
        "latest_price" : t["price"],
        "total_qty" : t["quantity"]
      }
    else:
      summary[t["symbol"]]["latest_price"] = t["price"]
      summary[t["symbol"]]["total_qty"] += t["quantity"]
  return summary

result = group_trades(trades, "sell")

result2 = group_trades(trades, "buy")
print(result)

print(result2)