"use client";
import { useEffect, useState } from "react";

interface Trade {
  id: string;
  symbol: string;
  side: string;
  price: number;
  quantity: number;
}

const API_BASE = "http://127.0.0.1:5000";

export default function TradeTable() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [symbols, setSymbols] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("ALL");
  const [loading, setLoading] = useState(false);

  // fetch symbols on mount
  useEffect(() => {
    fetch(`${API_BASE}/symbols`)
      .then((res) => res.json())
      .then((data) => setSymbols(["ALL", ...data]));
  }, []);

  // fetch trades whenever selected symbol changes
  useEffect(() => {
    setLoading(true);
    const url =
      selected === "ALL"
        ? `${API_BASE}/trades`
        : `${API_BASE}/trades?symbol=${selected}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setTrades(data))
      .finally(() => setLoading(false));
  }, [selected]);

  const addTrade = async () => {
    await fetch(`${API_BASE}/trades`, { method: "POST" });
    // refetch after adding
    const data = await fetch(`${API_BASE}/trades`).then((r) => r.json());
    setTrades(data);
  };

  const clearTrades = async () => {
    await fetch(`${API_BASE}/trades`, { method: "DELETE" });
    setTrades([]);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Trade Table</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          Filter by Symbol:{" "}
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </label>
        <button onClick={addTrade} style={{ marginLeft: 8 }}>
          + Add Trade
        </button>
        <button onClick={clearTrades} style={{ marginLeft: 8 }}>
          🗑 Clear All
        </button>
      </div>

      {loading ? (
        <p>Loading trades...</p>
      ) : trades.length === 0 ? (
        <p>No trades yet.</p>
      ) : (
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Side</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id}>
                <td>{t.symbol}</td>
                <td>{t.side}</td>
                <td>${t.price.toFixed(2)}</td>
                <td>{t.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
