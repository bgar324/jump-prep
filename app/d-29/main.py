requests = [
    {"team": "Alpha", "start": 9, "end": 11},
    {"team": "Beta", "start": 10, "end": 12},
    {"team": "Gamma", "start": 13, "end": 15},
    {"team": "Delta", "start": 11, "end": 13},
]

# a booking request is invalid if: the start time is greater than any object's start time or the end time is less
# it also needs to iterate only up to the current object.
# i need a function that does this.

def check_overlap(new_meeting, confirmed) -> bool:
  for c in confirmed:
    if new_meeting["start"] < c["end"] and new_meeting["end"]> c["start"]:
      return True
    return False

def schedule_meetings(requests: list[dict]) -> dict:
  process = {
    "confirmed" : [],
    "rejected" : []
  }

  for r in requests:
    if check_overlap(r, process["confirmed"]):
      process["rejected"].append(r["team"])
    else:
      process["confirmed"].append(r)

  teams = []
  for c in process["confirmed"]:
    teams.append(c["team"])
    process["confirmed"] = teams
  return process

result = schedule_meetings(requests)
print(result)