trades = [
    {"id": 1, "symbol": "AAPL", "price": "150.5", "quantity": 50},
    {"id": 2, "symbol": "TSLA", "price": "bad_data", "quantity": 20},  # invalid price
    {"id": 3, "symbol": "MSFT", "quantity": 80},                       # missing price
    {"id": 4, "symbol": "NVDA", "price": "900.0", "quantity": None},   # invalid quantity
]

for t in trades:
  try:
    price = float(t["price"])
    quantity = t["quantity"]
    total = price * quantity
    print(f"Trade {t['id']} total value: {total}")
  except KeyError as e:
    print(f"Missing field {e} in trade {t['id']}")
  except ValueError:
    print(f"Invalid price format in trade {t['id']}")
  except TypeError:
    print(f"Invalid quantity type in trade {t['id']}")
  finally:
    print("Done processing trade\n")
