"use client";

import { useState, useEffect } from "react";

interface Stock {
  id: number;
  symbol: string;
  price: number;
  prevPrice: number;
}

export default function App() {
  const [input, setInput] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let interval = setInterval(() => {
      setStocks((prevStocks) => {
        const n = prevStocks.length;
        if (n === 0) return prevStocks; // Handle empty array case
        const randomIndex = Math.floor(Math.random() * n);
        const prevStock = prevStocks[randomIndex];

        // Calculate new price
        const prevPrice = prevStock.price;
        const multiplier = (Math.random() * 0.1 - 0.05) + 1;
        const newPrice = prevPrice * multiplier;
        const clamped = Math.max(0.1, newPrice);
        const newNewPrice = Math.round(clamped * 100) / 100;

        // Create updated stock object
        const updatedStock = {
          ...prevStock,
          price: newNewPrice,
          prevPrice: prevPrice,
        };

        // Return new array with updated stock
        return prevStocks.map((stock, index) =>
          index === randomIndex ? updatedStock : stock
        );
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAdd = () => {
    if (!input.trim()) return;
    const seed = Math.floor(Math.random() * (300 - 50 + 1)) + 50;
    const upperSymbol = input.trim().toUpperCase();
    setStocks([
      ...stocks,
      { id: Date.now(), symbol: upperSymbol, price: seed, prevPrice: seed },
    ]);
    setInput("");
  };

  const handleRemove = (id: number) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  const filtered = stocks.filter((s) => {
    return s.symbol.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search stocks..."
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />

        <div className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add stock symbol..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="text-gray-500 text-center py-8">
            {query ? `No stocks match "${query}"` : "No stocks yet"}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((stock) => (
              <div key={stock.id} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-md">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-900">{stock.symbol}</span>
                  <span className="text-gray-700">${stock.price.toFixed(2)}</span>
                </div>
                {stock.prevPrice > stock.price ? <h1>down</h1> : <h1>up</h1>}
                <button
                  onClick={() => handleRemove(stock.id)}
                  className="px-3 py-1 text-sm text-gray-600 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
