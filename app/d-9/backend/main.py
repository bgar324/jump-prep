from flask import Flask
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

counter = {"value" : 0}

@app.route("/hello", methods= ["GET"])
def hello():
    return "hi", 200

@app.route("/status", methods = ["GET"])
def status():
    return jsonify({"ok" : True, "service" : "counter"}), 200

@app.route("/count", methods = ["GET"])
def get_count():
    return jsonify(counter), 200

@app.route("/count/increment", methods = ["POST"])
def increment_count():
    counter["value"] += 1
    return jsonify(counter), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)