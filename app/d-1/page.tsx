// Build a stock watchlist component where users can:
// - Add a stock symbol to their watchlist (input + button)
// - See a list of all added symbols
// - Remove symbols from the list (delete button)
// - Show a message if the list is empty
// Use TypeScript for all props and state.

"use client";

import { useState } from "react";

interface Stock {
  id: number;
  text: string;
}

export default function App() {
  const [input, setInput] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setStocks([...stocks, { id: Date.now(), text: input }]);
    setInput("");
  };

  const handleDelete = (id: number) => {
    setStocks(stocks.filter((stock) => stock.id !== id));
  };

  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen">
      <div className="flex flex-row gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="stock"
        />
        <button onClick={handleAdd}>add</button>
      </div>
      {stocks.length > 0 ? (
        stocks.map((stock) => <div key={stock.id}>{stock.text} <button onClick={() => handleDelete(stock.id)}>✗</button></div>)
      ) : (
        <h1>no stocks have been added yet.</h1>
      )}
    </div>
  );
}
