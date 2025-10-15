// Mock Data Structure:
// {
//   symbol: string,      // e.g., "AAPL"
//   price: number,       // e.g., 150.25
//   change: number       // e.g., 2.5 (percentage change, can be negative)
// }

// Required Features:
// 1. Display a table/list of 5 stocks showing:
//    - Stock symbol
//    - Current price (formatted as currency)
//    - Percentage change
//    - Color indicator (green for positive, red for negative)

// 2. Live updates:
//    - Every 3 seconds, randomly select one stock
//    - Update its price by ±5% (random)
//    - Recalculate the percentage change

// 3. Search/Filter:
//    - Add a search input
//    - Filter the displayed stocks by symbol (case-insensitive)
//    - Show "No stocks found" if search returns no results

"use client";

import { useState, useEffect } from "react";

interface Stock {
  symbol: string;
  price: number;
  previousPrice: number;
  change: number;
}

const initialStocks: Stock[] = [
  { symbol: "AAPL", price: 1500, previousPrice: 1500, change: 0 },
  { symbol: "GOOG", price: 2800, previousPrice: 2800, change: 0 },
  { symbol: "AMZN", price: 3400, previousPrice: 3400, change: 0 },
  { symbol: "TSLA", price: 700, previousPrice: 700, change: 0 },
  { symbol: "MSFT", price: 300, previousPrice: 300, change: 0 },
];

export default function App() {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let interval = setInterval(() => {
      setStocks((prevStocks) => {
        const i = Math.floor(Math.random() * prevStocks.length);
        const oldStock = prevStocks[i];
        const multiplier = Math.random() * 0.1 - 0.05 + 1;
        const rawNewPrice = oldStock.price * multiplier;

        const clamped = Math.max(0.1, rawNewPrice);
        const newPrice = Math.round(clamped * 100) / 100;

        const change = ((rawNewPrice - oldStock.price) / oldStock.price) * 100;

        const newStock = {
          ...oldStock,
          previousPrice: oldStock.price,
          price: newPrice,
          change,
        };

        const updatedStocks = prevStocks.map((stock, index) =>
          index === i ? newStock : stock
        );
        return updatedStocks;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filtered = stocks.filter((s) =>
    s.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen">
      <input
        value={query}
        type="text"
        placeholder="search"
        onChange={(e) => setQuery(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Change</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                No stocks found matching "{query}"
              </td>
            </tr>
          ) : (
            filtered.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>${stock.price}</td>
                <td>
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      stock.change > 0
                        ? "bg-green-100 text-green-800"
                        : stock.change < 0
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {stock.change > 0 ? "↗" : stock.change < 0 ? "↘" : "→"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
