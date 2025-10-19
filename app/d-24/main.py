trades = [
    {"symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 10},
    {"symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 5},
    {"symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 7},
    {"symbol": "AAPL", "side": "BUY", "price": 149, "quantity": 3},
    {"symbol": "TSLA", "side": "SELL", "price": 241, "quantity": 2},
]

def summarize_trades(trades : list[dict]) -> dict:
  summary = {}
  for t in trades:
    symbol = t["symbol"]
    if symbol not in summary:
      summary[symbol] = {
        "buy_qty" : 0,
        "sell_qty" : 0,
        "sell_total" : 0,
        "buy_total" : 0,
      }
    if t["side"] == "BUY":
      summary[symbol]["buy_qty"] += t["quantity"]
      summary[symbol]["buy_total"] += t["quantity"] * t["price"]
    elif t["side"] == "SELL":
      summary[symbol]["sell_qty"] += t["quantity"]
      summary[symbol]["sell_total"] += t["quantity"] * t["price"]
  
  for symbol, vals in summary.items():
    vals["avg_buy_price"] = (
      round(vals["buy_total"] / vals["buy_qty"], 2)
      if vals["buy_qty"] else 0
    )
    vals["avg_sell_price"] = (
      round(vals["sell_total"] / vals["sell_qty"], 2)
      if vals["sell_qty"] else 0
    )
    del vals["buy_total"], vals["sell_total"]

  return summary

result = summarize_trades(trades)
print(result)