"use client";
import { useEffect, useState } from "react";

interface Trade {
  symbol: string;
  side: string;
  price: number;
  quantity: number;
}

export default function App() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/trades")
      .then((res) => res.json())
      .then((trade) => setTrades(trade))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const symbols = [...new Set(trades.map((t) => t.symbol))];
  const filtered = trades.filter((t) =>
    t.symbol.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <select
          name="symbol-filter"
          id="symbol-filter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded-md"
        >
          <option>All Symbols</option>
          {symbols.map((sym) => (
            <option key={sym}>{sym}</option>
          ))}
        </select>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Side</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  Loading trades...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-red-600">
                  Error: {error}
                </td>
              </tr>
            ) : query === "All Symbols" ? (
              trades.map((row, index) => (
                <tr key={index}>
                  <td>{row.symbol}</td>
                  <td>{row.side}</td>
                  <td>{row.price}</td>
                  <td>{row.quantity}</td>
                </tr>
              ))
            ) : (
              filtered.map((row, index) => (
                <tr key={index}>
                  <td>{row.symbol}</td>
                  <td>{row.side}</td>
                  <td>{row.price}</td>
                  <td>{row.quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
