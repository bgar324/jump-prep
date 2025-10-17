"use client";
import { useState } from "react";
import ChildA from "./components/ChildA";
import ChildB from "./components/ChildB";

export default function App() {
  const [value, setValue] = useState("");
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <ChildA value={value} setValue={setValue} />
        <ChildB value={value} />
      </div>
    </main>
  );
}
