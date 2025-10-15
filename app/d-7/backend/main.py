# from fastapi import FastApi, Query
# from fastapi.middleware.cors import CORSMiddleware
# from typing import List, Optional, Literal, TypedDict
# from datetime import datetime

# app = FastAPI(title = "Trades API", version = "1.0.0")

# app.add_middleware(
#     CORSMiddleware
#     allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# Side = Literal["BUY", "SELL"]

# class Trade(TypedDict):
#     id: int
#     symbol : str
#     side : Side
#     price : float
#     quantity : int
#     timestamp : str

# TRADES: List[Trade] = [
#     {
#         "id": 1,
#         "symbol": "AAPL",
#         "side": "BUY",
#         "price": 150.25,
#         "quantity": 100,
#         "timestamp": "2024-10-14T10:30:00Z",
#     },
#     {
#         "id": 2,
#         "symbol": "TSLA",
#         "side": "SELL",
#         "price": 242.5,
#         "quantity": 50,
#         "timestamp": "2024-10-14T10:31:00Z",
#     },
#     {
#         "id": 3,
#         "symbol": "AAPL",
#         "side": "SELL",
#         "price": 151.0,
#         "quantity": 100,
#         "timestamp": "2024-10-14T10:32:00Z",
#     },
#     # add a few more if you want
# ]

# @app.get("/trades")