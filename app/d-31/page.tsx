"use client";
import { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  done: boolean;
}

const initialTasks = [
  { id: 1, name: "Prepare slides", done: false },
  { id: 2, name: "Email design team", done: true },
  { id: 3, name: "Deploy to staging", done: false },
];

export default function App() {
  useEffect(() => {
    setTasks(initialTasks);
  }, []);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [hideCompleted, setHideCompleted] = useState<boolean>(false);

  const handleCheck = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={hideCompleted}
              onChange={() => setHideCompleted(!hideCompleted)}
              className="mr-2"
            />
            Hide completed tasks
          </label>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Done?</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((t) => !hideCompleted || !t.done)
              .map((t) => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={t.done}
                    onChange={() => {
                      handleCheck(t.id);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        Count : {(() => {
          const visibleTasks = tasks.filter((t) => !hideCompleted || !t.done);
          const completedVisible = visibleTasks.filter((t) => t.done).length;
          return `${completedVisible} / ${visibleTasks.length}`;
        })()}
      </div>
    </main>
  );
}
