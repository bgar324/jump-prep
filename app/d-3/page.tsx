// Build a live stock price dashboard that displays and updates multiple stocks.

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

// 4. Use TypeScript for all data structures
// 5. Use proper React hooks (useState, useEffect)

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
        const randomIndex = Math.floor(Math.random() * prevStocks.length);
        const oldStock = prevStocks[randomIndex];
        const multiplier = Math.random() * 0.1 - 0.05 + 1;
        const rawNewPrice = oldStock.price * multiplier; // new price

        const clamped = Math.max(0.01, rawNewPrice);
        const newPrice = Math.round(clamped * 100) / 100;

        const change = ((rawNewPrice - oldStock.price) / oldStock.price) * 100;

        const updatedStock = {
          ...oldStock,
          previousPrice: oldStock.price,
          price: newPrice,
          change,
        };

        const newStocks = prevStocks.map((stock, index) =>
          index === randomIndex ? updatedStock : stock
        );
        return newStocks;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filtered = stocks.filter((s) =>
    s.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Stock Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time stock prices with live updates
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by symbol..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          /> 
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Symbol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No stocks found matching "{query}"
                  </td>
                </tr>
              ) : (
                filtered.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-gray-50">
                    {/* Symbol */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-medium">
                        {stock.symbol}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-900 font-semibold">
                        ${stock.price}
                      </span>
                    </td>

                    {/* Change */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`font-medium ${
                          stock.change > 0
                            ? "text-green-600"
                            : stock.change < 0
                            ? "text-red-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stock.change > 0 ? "+" : ""}
                        {stock.change.toFixed(2)}%
                      </span>
                    </td>

                    {/* Trend Indicator */}
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

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          Updates every 3 seconds
        </div>
      </div>
    </div>
  );
}
