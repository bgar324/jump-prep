"use client";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:5001";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/tasks`)
      .then((res) => res.json())
      .then((data: Task[]) => setTasks(data))
      .catch((err) => console.error(err));
  }, []);

  async function addTask(text: string) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask: Task = await res.json();
    setTasks((prev) => [...prev, newTask]);
    setQuery("")
  }

  async function deleteTask(id : number) {
    const res = await fetch( `${API_BASE}/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks((prev) => prev.filter((t) => t.id !== id))
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6">
        <input
          placeholder="add a task"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button disabled={!query.trim()} onClick={() => addTask(query)}>
          add
        </button>
      </div>
      {tasks.length > 0 ? (
        tasks.map((e) => (
          <ul key={e.id}>
            <li>{e.text}</li>
            <button onClick = {() => deleteTask(e.id)}>✖</button>
          </ul>
        ))
      ) : (
        <h1>empty list.</h1>
      )}
    </main>
  );
}
