"use client";

import { useState } from "react";

interface Trade {
  id : number,
  symbol : string,
  side : string,
  price : number,
  quantity : number,
  timestamp : string
}

const mockTrades = [
  {
    id: 1,
    symbol: "AAPL",
    side: "BUY",
    price: 150.25,
    quantity: 100,
    timestamp: "2024-10-16T09:30:00Z",
  },
  {
    id: 2,
    symbol: "TSLA",
    side: "SELL",
    price: 242.5,
    quantity: 50,
    timestamp: "2024-10-16T09:31:15Z",
  },
  {
    id: 3,
    symbol: "AAPL",
    side: "SELL",
    price: 151.0,
    quantity: 75,
    timestamp: "2024-10-16T09:32:30Z",
  },
  {
    id: 4,
    symbol: "MSFT",
    side: "BUY",
    price: 380.75,
    quantity: 200,
    timestamp: "2024-10-16T09:33:45Z",
  },
  {
    id: 5,
    symbol: "TSLA",
    side: "BUY",
    price: 241.0,
    quantity: 100,
    timestamp: "2024-10-16T09:35:00Z",
  },
  {
    id: 6,
    symbol: "MSFT",
    side: "SELL",
    price: 381.25,
    quantity: 150,
    timestamp: "2024-10-16T09:36:20Z",
  },
];

const symbolSet = [...new Set(mockTrades.map((t) => t.symbol))];

export default function App() {
  const [query, setQuery] = useState("");

  let filteredTrades;

  if (query) {
    filteredTrades = mockTrades.filter((t) => t.symbol === query);
  } else {
    filteredTrades = mockTrades;
  }

  let totalTrades = filteredTrades.length;
  let totalSum = filteredTrades.reduce((sum, trade) => sum + trade.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Trade Dashboard
          </h1>
          <p className="text-slate-600">
            Filter and view your trading activity
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <label
              htmlFor="symbol"
              className="text-sm font-medium text-slate-700 whitespace-nowrap"
            >
              Filter by Symbol:
            </label>
            <div className="relative flex-1 w-full sm:w-auto">
              <select
                id="symbol"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="">All Symbols</option>
                {symbolSet.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Symbol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Side
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTrades.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-slate-50 transition-all duration-200 group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 group-hover:text-slate-700">
                      #{t.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 transition-colors">
                        {t.symbol}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          t.side === "BUY"
                            ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                            : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
                        }`}
                      >
                        {t.side}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                      ${t.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 font-medium">
                      {t.quantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(t.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTrades.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-1">
                No trades found
              </h3>
              <p className="text-slate-500">
                Try selecting a different symbol from the filter above.
              </p>
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm font-medium text-blue-800 uppercase tracking-wide">
                  Total Trades
                </span>
              </div>
              <p className="text-3xl font-bold text-blue-900">
                {totalTrades.toLocaleString()}
              </p>
            </div>

            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="flex items-center justify-center mb-2">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
                <span className="text-sm font-medium text-green-800 uppercase tracking-wide">
                  Total Volume
                </span>
              </div>
              <p className="text-3xl font-bold text-green-900">
                {totalSum.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
