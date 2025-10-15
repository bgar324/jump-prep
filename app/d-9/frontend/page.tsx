"use client";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5001";

type Counter = { value: number };

export default function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/count`)
    .then((res) => res.json())
    .then((data : Counter) => setCount(data.value))
    .catch((err) => console.error("Failed to fetch count: ", err))
  }, [])

  async function handleIncrement() {
    setLoading(true)
    try {
        const res = await fetch (`${API_BASE}/count/increment`, {
            method : "POST",
        });
        const data : Counter = await res.json();
        setCount(data.value);
    } catch (err){
        console.log("Increment failed: ", err)
    } finally {
        setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col gap-6">
        <h1>Counter</h1>
        <p>Current value : {count ?? "Loading..."}</p>
        <button onClick = {handleIncrement} disabled = {loading}>
            {loading ? "Incrementing" : "Increment"}
        </button>
      </div>
    </main>
  );
}
