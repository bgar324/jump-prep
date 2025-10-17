"use client";

import { useState, useEffect } from "react";

interface Stock {
  id: number;
  symbol: string;
  price: number;
  prevPrice: number;
  isPinned: Boolean;
  rate: number;
}

const initialStocks = [
  {
    id: 1,
    symbol: "AAPL",
    price: 150.25,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
  {
    id: 2,
    symbol: "TSLA",
    price: 242.5,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
  {
    id: 3,
    symbol: "MSFT",
    price: 380.75,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
  {
    id: 4,
    symbol: "GOOGL",
    price: 140.2,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
  {
    id: 5,
    symbol: "AMZN",
    price: 178.35,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
  {
    id: 6,
    symbol: "NVDA",
    price: 495.5,
    prevPrice: 0,
    isPinned: false,
    rate: 0,
  },
];

export default function App() {
  const [stock, setStocks] = useState<Stock[]>(initialStocks);

  useEffect(() => {
    let interval = setInterval(() => {
      setStocks((prevStocks) => {
        // im unsure how to select '2-3 stocks', but i know how to randomly select one. we can go with that for now.
        let idx = Math.floor(Math.random() * prevStocks.length);

        const changePercent =
          (Math.random() * (0.03 - 0.005) + 0.005) *
          (Math.random() < 0.5 ? -1 : 1);

        let prev = prevStocks[idx].price;
        // now we have to apply logic.
        // ran multiplier between 1.005 and 1.03
        let multiplier = 1 + changePercent;
        let newPrice = Math.round(prev * multiplier * 100) / 100;
        // well hold on. this will always increment.
        let determineRate = newPrice - prev;
        let newStock = {
          ...prevStocks[idx],
          price: newPrice,
          prevPrice: prev,
          rate: determineRate,
        };
        return prevStocks.map((stock, index) =>
          index === idx ? newStock : stock
        );
      });
    }, 20); // 2 seconds.
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <div className="flex flex-row gap-12">
          {stock.map((t) => (
            <button
              className={`border p-4 rounded-lg flex flex-col cursor-pointer ${
                t.rate > 0
                  ? "text-green-500 bg-green-50"
                  : t.rate < 0
                  ? "text-red-500 bg-red-50"
                  : "text-gray-500 bg-gray-50"
              }`}
              key={t.id}
            >
              {" "}
              {t.symbol}
              <p>{t.price}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

// Problem Statement: Real-Time Price Ticker
// You're building a live price display that traders use to monitor stocks.
// Requirements:
// Build a React + TypeScript component that:

// Displays a grid of stock cards (not a table) showing:

// Symbol
// Current price
// Price change from previous update (as $ amount and %)
// Visual indicator: green if price went up, red if down, gray if unchanged

// Simulates real-time price updates:

// Every 2 seconds, randomly select 2-3 stocks and update their prices
// Price changes should be realistic: ±0.5% to ±3% of current price
// When a price updates, briefly highlight the card (flash animation)

// Add interactivity:

// Clicking a stock card should "pin" it (toggle a pinned state)
// Pinned stocks should appear at the top of the grid with a pin icon
// Pinned stocks should have a different background color

// for the live change, we have to pas
