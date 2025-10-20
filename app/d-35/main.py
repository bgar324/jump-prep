initialTrades = [
  {"symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 10},
  {"symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 5},
  {"symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 7},
  {"symbol": "AAPL", "side": "BUY", "price": 151, "quantity": 2}
]

def summary(trades: list[dict]) -> dict:
  summary = {}

  for t in trades:
    symbol = t["symbol"]
    if symbol not in summary:
      summary[symbol] = {
        "latestPrice": 0,
        "totalQty": 0,
        "avgBuyPrice": 0,
        "count": 0
      }

    # always update latest price + total qty
    summary[symbol]["latestPrice"] = t["price"]
    summary[symbol]["totalQty"] += t["quantity"]

    # accumulate for buys only
    if t["side"] == "BUY":
      summary[symbol]["avgBuyPrice"] += t["price"] * t["quantity"]
      summary[symbol]["count"] += t["quantity"]

  # compute weighted average
  for symbol, data in summary.items():
    if data["count"] > 0:
      data["avgBuyPrice"] = data["avgBuyPrice"] / data["count"]
    else:
      data["avgBuyPrice"] = 0
    del data["count"]

  return summary

result = summary(initialTrades)
print(result)
