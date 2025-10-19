logs = [
    {"user": "alice", "action": "login", "timestamp": "2025-10-18T09:00:00"},
    {"user": "bob", "action": "login", "timestamp": "2025-10-18T09:15:00"},
    {"user": "alice", "action": "logout", "timestamp": "2025-10-18T10:00:00"},
    {"user": "alice", "action": "login", "timestamp": "2025-10-18T11:00:00"},
    {"user": "bob", "action": "logout", "timestamp": "2025-10-18T11:30:00"},
    {"user": "alice", "action": "logout", "timestamp": "2025-10-18T12:00:00"},
]

def summarize_activity(logs: list[dict]) -> dict:
  summary = {}
  for t in logs:
    user = t["user"]
    if user not in summary: 
      summary[user] = {
        "login_count" : 0,
        "first_activity" : t["timestamp"],
        "last_activity" : ""
      }
    if t["action"] == "login":
      summary[user]["login_count"] += 1
    summary[user]["last_activity"] = t["timestamp"]
  return summary

result = summarize_activity(logs)
print(result)