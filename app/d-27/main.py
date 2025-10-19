keys = [
    "auth-us-AB12CD34",
    "data-eu-Z9X8Y7W6",
    "cache-ap-1234ABCD",
    "auth-eu-1234567",     # invalid (too short)
    "login-us-ABCDEFGH",   # invalid (wrong service)
    "data-uk-12345678"     # invalid (wrong region)
]

def check_validity(service, region, code) -> bool:
  if service == "auth" or service == "data" or service == "cache":
    if region == "us" or region == "eu" or region == "ap":
      if code.isalnum() and len(code) == 8:
        return True
  return False

def validate_keys(keys : list[str]) -> dict:
  valid = {
    "valid" : 0,
    "invalid" : 0,
    "invalid_keys" : []
  }
  for k in keys:
    parts = k.split('-')
    service = parts[0]
    region = parts[1]
    code = parts[2]

    if check_validity(service, region, code):
      valid["valid"] += 1
    else:
      valid["invalid"] += 1
      valid["invalid_keys"].append(k)
  return valid

result = validate_keys(keys)
print(result)