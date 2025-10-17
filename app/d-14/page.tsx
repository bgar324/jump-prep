"use client";

import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
  };
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [err, setError] = useState("");
  const [input, setInput] = useState("");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => setError(err));
  }, []);

  const filtered = users.filter((s) => s.name.toLowerCase().includes(input))

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <input
          type="text"
          placeholder="filter by name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {filtered.length === 0 ? (
          <h1>{err || 'no names match' + input}</h1>
        ) : (
          filtered.map((t) => (
            <div className="flex flex-col" key={t.id}>
              <h1>Name: {t.name}</h1>
              <h1>Username: {t.username}</h1>
              <h1>Email: {t.email}</h1>
              <h1>Address: {t.address.street}</h1>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
