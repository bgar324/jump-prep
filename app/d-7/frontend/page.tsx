"use client";
import { useState, useMemo } from "react";

interface Trade {
  id: number;
  symbol: string;
  side: string;
  price: number;
  quantity: number;
  timestamp: string;
}

const mockTrades = [
  {
    id: 1,
    symbol: "AAPL",
    side: "BUY",
    price: 150.25,
    quantity: 100,
    timestamp: "2024-10-14T10:30:00Z",
  },
  {
    id: 2,
    symbol: "TSLA",
    side: "SELL",
    price: 242.5,
    quantity: 50,
    timestamp: "2024-10-14T10:31:00Z",
  },
  {
    id: 3,
    symbol: "AAPL",
    side: "SELL",
    price: 151.0,
    quantity: 100,
    timestamp: "2024-10-14T10:32:00Z",
  },
  // ... a few more
];

type SymbolFilter = "ALL" | string;

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState<SymbolFilter>("ALL");

  const symbols = useMemo(
    () => Array.from(new Set(mockTrades.map((t) => t.symbol))).sort(),
    []
  );

  const filteredTrades = useMemo(() => {
    if (selectedSymbol === "ALL") return mockTrades;
    return mockTrades.filter((t) => t.symbol === selectedSymbol);
  }, [selectedSymbol]);

  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen gap-4 p-4">
      <div className="w-full max-w-4xl">
        <label htmlFor="symbol-filter" className="mr-2 font-medium">
          Filter by symbol:
        </label>
        <select
          id="symbol-filter"
          className="border rounded px-2 py-1"
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
        >
          <option value="ALL">All Symbols</option>
          {symbols.map((sym) => (
            <option key={sym} value={sym}>
              {sym}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>symbol</th>
            <th>side</th>
            <th>price</th>
            <th>quantity</th>
            <th>timestamp</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrades.map((t) => (
            <tr key={t.id} className="border-b hover:bg-black/5">
              <td className="py-2 pr-4">{t.id}</td>
              <td className="py-2 pr-4">{t.symbol}</td>
              <td className={`py-2 pr-4 font-semibold`}>{t.side}</td>
              <td className="py-2 pr-4">{t.price}</td>
              <td className="py-2 pr-4">{t.quantity}</td>
              <td className="py-2 pr-4">{t.timestamp}</td>
            </tr>
          ))}
          {filteredTrades.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-sm opacity-70">
                No trades for {selectedSymbol}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
