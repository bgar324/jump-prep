from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

trades = [
    {"symbol": "AAPL", "side": "BUY", "price": 150, "quantity": 10},
    {"symbol": "AAPL", "side": "SELL", "price": 152, "quantity": 5},
    {"symbol": "TSLA", "side": "BUY", "price": 240, "quantity": 7},
    {"symbol": "TSLA", "side": "SELL", "price": 239, "quantity": 4},
    {"symbol": "GOOG", "side": "BUY", "price": 2800, "quantity": 2}
]

def validate(trade):
  valid_trades = []
  for t in trades:
    try:
      symbol = t["symbol"]
      side = t["side"]
      price = float(t["price"])
      quantity = int(t["quantity"])
      valid_trades.append(t)
    except KeyError as e:
      print(f"Missing field as {e} in trade {t['id']}.")
    except (TypeError, ValueError):
      print(f"Invalid price format for trade  {t['id']}.")
  return valid_trades

@app.route("/api/trades", methods=["GET"])
def get_trades():
  symbol = request.args.get("symbol", default=None, type=str)
  valid_trades = validate(trades)
  if symbol:
    filtered = [
      t for t in valid_trades if t["symbol"] == symbol
    ]
    return jsonify(filtered), 200
  return jsonify(valid_trades)

if name == "__main__":
  app.run(debug=True)