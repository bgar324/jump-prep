"use client";

import { useState, useEffect, useMemo } from "react";

interface Album {
  userId: number;
  id: number;
  title: string;
}

export default function App() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((albums) => setAlbums(albums))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredAndSorted = useMemo(() => {
    let result = albums.filter((album) =>
      album.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sortOrder == "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder == "dec") {
      result.sort((a,b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [albums, query, sortOrder]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-7xl px-6 flex flex-col">
        <input
          value={query}
          type="text"
          placeholder="Filter your music!"
          onChange={(e) => setQuery(e.target.value)}
        />
        <label htmlFor="order">Choose Order</label>
        <select
          name="order"
          id="order"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Sort Ascending</option>
          <option value="dec">Sort Descending</option>
        </select>
        {loading ? (
          <h1>Loading...</h1>
        ) : albums.length === 0 ? (
          <h1>Error is : {error}</h1>
        ) : (
          filteredAndSorted.map((t) => (
            <div key={t.id} className="flex flex-row gap-4">
              <h1>{t.userId}</h1>
              <h1> - </h1>
              <h1>{t.title}</h1>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
