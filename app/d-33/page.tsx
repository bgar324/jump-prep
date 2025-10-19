"use client";

import { useState, useEffect } from "react";

interface Trades {
  symbol: string;
  side: string;
  price: number;
  quantity: number;
}

const initialTrades = [
  { symbol: "AAPL", side: "BUY", price: 150, quantity: 10 },
  { symbol: "AAPL", side: "SELL", price: 152, quantity: 5 },
  { symbol: "TSLA", side: "BUY", price: 240, quantity: 7 },
];

export default function App() {
  useEffect(() => {
    setTrades(initialTrades);
  }, []);

  const [trades, setTrades] = useState<Trades[]>([]);

  const grouped = trades.reduce((previousValue, currentValue) => {
    if (!previousValue[currentValue.symbol]) {
      previousValue[currentValue.symbol] = {
        latestTradePrice: currentValue.price,
        totalQuantity: currentValue.quantity,
      };
    } else {
      (previousValue[currentValue.symbol].latestTradePrice =
        currentValue.price),
        (previousValue[currentValue.symbol].totalQuantity +=
          currentValue.quantity);
    }
    return previousValue;
  }, {} as Record<string, { latestTradePrice: number; totalQuantity: number }>);

  const entries = Object.entries(grouped);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Latest Trade Price</th>
              <th>Total Quantity</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([symbol, data]) => (
              <tr key={symbol}>
                <td>
                  {symbol}
                </td>
                <td>{data.latestTradePrice}</td>
                <td>{data.totalQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
