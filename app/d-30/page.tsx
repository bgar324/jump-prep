"use client";
import { useState, useEffect } from "react";

const user = [
  { id: 1, name: "Alice Johnson", role: "Engineer" },
  { id: 2, name: "Bob Smith", role: "Designer" },
  { id: 3, name: "Charlie Brown", role: "Engineer" },
  { id: 4, name: "Diana White", role: "Manager" },
];

interface User {
  id: number;
  name: string;
  role: string;
}

export function useDebounce(value: string, delay = 300) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounce(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounce;
}

export default function App() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const debouncedSearch = useDebounce(input, 400);

  useEffect(() => {
    setUsers(user);
  }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <input
          value={input}
          placeholder="Filter"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id}>
                <th>{t.name}</th>
                <th>{t.role}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
