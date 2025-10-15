from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid

app = Flask(__name__)
CORS(app)

COINS = []

@app.route("/coins", methods=["GET"])
def getCoins():
    return jsonify(COINS), 200

@app.route("/coins", methods=["POST"])
def addCoin():
    data = request.get_json()
    name = data.get("name", "").strip()
    symbol = data.get("symbol", "").strip()
    price = float(data.get("price", 0))

    if not name:
        return jsonify({"error": "text required."}), 400
    
    new_coin = {
        "id": str(uuid.uuid4()),
        "name": name,
        "symbol": symbol,
        "price": price
    }

    COINS.append(new_coin)
    return jsonify(new_coin), 201

@app.route("/coins/<string:id>", methods=["DELETE"])
def removeCoin(id):
    global COINS
    COINS = [c for c in COINS if c["id"] != id]
    return jsonify({"message": f"Coin {id} deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
