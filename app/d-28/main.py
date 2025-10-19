requests = [
    {"name": "Alice", "seat": "A1"},
    {"name": "Bob", "seat": "A1"},
    {"name": "Cathy", "seat": "B3"},
    {"name": "David", "seat": "C4"},
    {"name": "Eli", "seat": "B3"},
]

def allocate_seats(requests: list[dict]) -> dict:
  # what we can do is create a temp list of the seats
  # if we encounter a name whos seat exists in that list
  # then we just put that name in the waitlist
  allocated = {
    "confirmed" : [],
    "waitlisted" : [],
    #temp
    "seats_taken" : []
  }
  for s in requests:
    if s["seat"] not in allocated["seats_taken"]:
      allocated["seats_taken"].append(s["seat"])
      allocated["confirmed"].append(s["name"])
    else:
      allocated["waitlisted"].append(s["name"])
      
  del allocated["seats_taken"]
  return allocated


result = allocate_seats(requests)
print(result)