"use client";
import { useState, useEffect } from "react";

interface Trades {
  symbol: string;
  price: number;
  quantity: number;
  side: string;
}

const initialTrades = [
  { symbol: "AAPL", price: 182.34, quantity: 50, side: "BUY" },
  { symbol: "TSLA", price: 244.1, quantity: 12, side: "SELL" },
  { symbol: "AAPL", price: 182.9, quantity: 25, side: "SELL" },
  { symbol: "MSFT", price: 380.0, quantity: 5, side: "BUY" },
];

export default function App() {
  const [trades, setTrades] = useState<Trades[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setTrades(initialTrades);
  }, []);

  const grouped = trades.reduce((acc, trade) => {
    if (!acc[trade.symbol]) {
      acc[trade.symbol] = {
        latestPrice: trade.price,
        totalQty: trade.quantity,
      };
    } else {
      acc[trade.symbol].latestPrice = trade.price;
      acc[trade.symbol].totalQty += trade.quantity;
    }
    return acc;
  }, {} as Record<string, {latestPrice : number, totalQty : number}>);

  const entries = Object.entries(grouped);
  
const filtered = entries.filter(([symbol]) =>
  symbol.toLowerCase().includes(input.toLowerCase())
);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Filter"
        />
        <table>
          <thead>
            <tr>
              <th>Symbol Name</th>
              <th>Latest Price</th>
              <th>Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(([symbol, data]) => (
              <tr key={symbol}>
                <td>{symbol}</td>
                <td>{data.latestPrice}</td>
                <td>{data.totalQty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

// create an interface
// render the table via usestate a useffect
// show unique symbols
// table
// column header
// symbol name, latest trade price, quantity sold
// input field

// set doesnt allow duplicates
// lates price, total quantity running sum
