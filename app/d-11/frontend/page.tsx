"use client";
import { useState, useEffect } from "react";

const API = "http://localhost:5001";

interface Coin {
  id: string; // <-- UUID is a string, not number
  name: string;
  symbol: string;
  price: number;
}

export default function App() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [err, setErr] = useState<string>("");
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [query, setQuery] = useState("");
  const [price, setPrice] = useState<number | "">("");

  // Load all coins
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/coins`);
        if (!res.ok) throw new Error(`GET /coins failed: ${res.status}`);
        const data: Coin[] = await res.json();
        setCoins(data);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to fetch coins");
      }
    })();
  }, []);

  // Add a coin
  async function handleAdd() {
    setErr("");
    try {
      // simple validation
      const trimmedName = name.trim();
      const trimmedSymbol = symbol.trim().toUpperCase();
      const numericPrice = typeof price === "string" ? Number(price) : price;

      if (!trimmedName || !trimmedSymbol || isNaN(numericPrice)) {
        setErr("Please provide name, symbol, and a valid price.");
        return;
      }

      const res = await fetch(`${API}/coins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          symbol: trimmedSymbol,
          price: numericPrice,
        }),
      });
      if (!res.ok) throw new Error(`POST /coins failed: ${res.status}`);
      const newCoin: Coin = await res.json();
      setCoins((prev) => [...prev, newCoin]);

      // clear form
      setName("");
      setSymbol("");
      setPrice("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to add coin");
    }
  }

  // Delete a coin
  async function handleDelete(id: string) {
    setErr("");
    try {
      const res = await fetch(`${API}/coins/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`DELETE /coins/${id} failed: ${res.status}`);
      // optimistic update
      setCoins((prev) => prev.filter((c) => c.id !== id));
    } catch (e: any) {
      setErr(e?.message ?? "Failed to delete coin");
    }
  }

  const filtered = coins.filter((c) => c.name.toLowerCase().includes(query));

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 p-6 rounded w-full max-w-2xl">
        <h1 className="text-xl font-semibold">Add a coin</h1>

        {err && (
          <div className="text-red-600 text-sm border border-red-200 rounded p-2">
            {err}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Bitcoin" // name
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="text"
            placeholder="BTC" // symbol
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="$123"
            value={price}
            onChange={(e) => {
              const v = e.target.value;
              setPrice(v === "" ? "" : Number(v));
            }}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleAdd}
            className="rounded px-3 py-1 border"
            disabled={
              !name.trim() ||
              !symbol.trim() ||
              price === "" ||
              isNaN(Number(price))
            }
          >
            submit
          </button>
        </div>
        <div className="flex flex-row justify-between">
          <h2 className="text-lg font-medium mt-4">Coins</h2>
          <input
            type="text"
            placeholder="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>

        {coins.length > 0 ? (
          <ul className="space-y-2">
            {filtered.map((c) => (
              <li
                key={c.id}
                className="flex items-center gap-4 border rounded px-3 py-2"
              >
                <span className="w-40">{c.name}</span>
                <span className="w-24 font-mono">{c.symbol}</span>
                <span className="w-24">${c.price}</span>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="ml-auto text-red-600"
                  aria-label={`Delete ${c.name}`}
                >
                  ✖
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>empty list.</p>
        )}
      </div>
    </main>
  );
}
