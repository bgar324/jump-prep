readings = [
    {"id": "A1", "temp": 72.5, "timestamp": "2025-10-18T09:00:00"},
    {"id": "B7", "temp": 80.2, "timestamp": "2025-10-18T09:01:00"},
    {"id": "A1", "temp": 74.0, "timestamp": "2025-10-18T09:10:00"},
    {"id": "B7", "temp": 90.0, "timestamp": "2025-10-18T09:12:00"},
    {"id": "A1", "temp": 76.8, "timestamp": "2025-10-18T09:20:00"},
    {"id": "B7", "temp": 88.5, "timestamp": "2025-10-18T09:30:00"},
]

def analyze_sensors(readings: list[dict], threshold: float) -> dict:
  '''
  because we need to return a list, we should initialize a summary list.
  then we need to iterate through the list, and what we should do is a couple things
  we will have **four** paramaters that will be returned, but i am going to use six initially, then delete those two once the function ends.
  average temp, max temp, alert, and last seen is what we will need.
  so what we can do is introduecd two temp parameters per object
  total_temp, and count.
  this is necessary for avg_temp because total temp / count is the average.
  '''
  summary = {}
  for a in readings:
    id = a["id"]
    if id not in summary:
      summary[id] = {
        "avg_temp" : 0.0,
        "max_temp" : 0.0,
        "alert" : False,
        "last_seen" : "",
        "total_temp" : 0.0,
        "count" : 0
      }
    # now we're going into what happens regardless.
    summary[id]["last_seen"] = a["timestamp"]
    summary[id]["max_temp"] = max(a["temp"], summary[id]["max_temp"])
    summary[id]["count"] += 1
    summary[id]["total_temp"] += a["temp"]
    summary[id]["avg_temp"] = summary[id]["total_temp"] / summary[id]["count"]

  for sensor_id, data in summary.items():
    if data["max_temp"] > threshold:
        data["alert"] = True
    else:
        data["alert"] = False
      # cleanup
    del data["count"], data["total_temp"]
      
  
  return summary

result = analyze_sensors(readings, 85.0)

print(result)