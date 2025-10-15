from flask import Flask, jsonify, request
from flask_cors import CORS
import random
import uuid

app = Flask(__name__)
CORS(app) #allows frontend to call backend

TRADES = [] #mock storage

SYMBOLS = ["AAPL", "TSLA", "GOOG", "MSFT", "NVDA"]
SIDES = ["BUY", "SELL"]

def generate_trade():
    return {
        "id" : str(uuid.uuid4()),
        "symbol" : random.choice(SYMBOLS),
        "side" : random.choice(SIDES),
        "price" : round(random.uniform(100,500),2),
        "quantity" : random.randint(1,100)
    }

@app.route("/trades", methods = ["GET"])
def get_trades():
    symbol = request.args.get("symbol", "").upper().strip()
    if symbol and symbol != "ALL":
        filtered = []
        for t in TRADES:
            if t["symbol"] == symbol:
                filtered.append(t)
        return jsonify(filtered)
    return jsonify(TRADES)

@app.route("/trades", methods = ["POST"])
def create_trade():
    trade = generate_trade()
    TRADES.append(trade)
    return jsonify(trade) , 201

@app.route("/trades", methods = ["DELETE"])
def clear_trades():
    TRADES.clear()
    return jsonify({"message": "All trades cleared"}), 200

@app.route("/symbols", methods = ["GET"])
def get_symbols():
    return jsonify(sorted(SYMBOLS))

if __name__ == "__main__":
    app.run(debug=True, port=5000)
