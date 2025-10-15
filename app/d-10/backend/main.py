from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

TASKS = []

@app.route("/tasks", methods = ["GET"])
def handleGetAllTasks():
    return jsonify(TASKS), 200

@app.route("/tasks", methods=["POST"])
def handleAddTask():
    data = request.get_json()
    text = data.get("text", "").strip()  # ✅ variable renamed

    if not text:  # ✅ now refers to the right variable
        return jsonify({"error": "Task text required"}), 400

    new_task = {
        "id": len(TASKS) + 1,
        "text": text,  # ✅ matches key
        "completed": False,
    }

    TASKS.append(new_task)
    return jsonify(new_task), 201

@app.route("/tasks/<int:id>", methods = ["DELETE"])
def handleDeleteTask(id):
    global TASKS
    existing = None
    for t in TASKS:
        if t["id"] == id:
            existing = t
            break
    
    if existing is None:
        return jsonify({"error": f"Task {id} not found"}), 404
    
    new_tasks = []
    for t in TASKS:
        if t["id"] != id:
            new_tasks.append(t)
    TASKS = new_tasks

    return jsonify({"message": f"Task {id} deleted"}), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)