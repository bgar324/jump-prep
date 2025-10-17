"use client";

import { useState, useEffect, useMemo} from "react";

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function useDebounce<T>(value : T, delay = 300) : T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced;
}

export default function App() {
  const [post, setPosts] = useState<Posts[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 400)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((t) => setPosts(t))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return post.filter((u) => (
       u.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    ))
  }, [post, debouncedSearch])

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts by title..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full max-w-md mx-auto block px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
        </div>
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3 text-lg text-gray-600">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              Loading posts...
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg">
              {error || `No posts match "${input}"`}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((t) => (
              <div key={t.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 border border-gray-100">
                <div className="mb-4">
                  <div className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit mb-3">
                    User {t.userId}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                    {t.title}
                  </div>
                </div>
                <div className="text-gray-600 leading-relaxed">
                  {t.body}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
