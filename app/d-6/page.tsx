"use client";
import { useEffect, useState } from "react";

interface Order {
  id: string;
  type: string;
  symbol: string;
  price: number;
  quantity: number;
}

function generateRandomOrder(): Order {
  const symbols = ["BTC", "ETH", "SOL", "ADA", "DOGE"];
  const types: Array<"buy" | "sell"> = ["buy", "sell"];

  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomPrice = Math.floor(Math.random() * 500) + 1;
  const randomQuantity = Math.floor(Math.random() * 20) + 1;

  return {
    id: crypto.randomUUID(),
    type: randomType,
    symbol: randomSymbol,
    price: randomPrice,
    quantity: randomQuantity,
  };
}

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastUpdatedId, setLastUpdatedId] = useState("");
  const generateInitialOrders = () => {
    const orders = Array.from({ length: 10 }, generateRandomOrder);
    setOrders(orders);
  };

  const handleAddOrder = () => {
    setOrders((prev) => [...prev, generateRandomOrder()]);
  };

  const handleRemoveOrder = (id: string) => {
    setOrders(orders.filter((x) => x.id !== id));
  };

  useEffect(() => {
    generateInitialOrders();

    const interval = setInterval(() => {
      setOrders((prev) => {
        if (prev.length === 0) return prev;

        // work on a shallow copy
        const updated = [...prev];

        // 1) modify ONE random order (price or quantity)
        const idx = Math.floor(Math.random() * updated.length);
        const curr = updated[idx];
        setLastUpdatedId(curr.id);
        const multiplier = Math.random() * 0.15 + 1; // [1, 1.15)
        const modifyPrice = Math.random() < 0.5;

        const changed: Order = modifyPrice
          ? { ...curr, price: curr.price * multiplier }
          : { ...curr, quantity: curr.quantity * multiplier };

        updated[idx] = changed;

        // 2) maybe remove ONE
        // ~10% chance to remove, but NEVER if it would drop to zero (optional)
        if (Math.random() < 0.1 && updated.length > 1) {
          const removeIdx = Math.floor(Math.random() * updated.length);
          updated.splice(removeIdx, 1);
        }

        // 3) maybe add ONE (~15% chance)
        if (Math.random() < 0.15) {
          updated.push(generateRandomOrder()); // use your helper; no extra setState
        }

        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col mx-auto items-center justify-center min-h-screen">
      <table>
        <thead>
          <tr>
            <th>type </th>
            <th>symbol</th>
            <th>price </th>
            <th>quantity </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className = {`rounded-4xl ${o.id === lastUpdatedId ? 'bg-yellow-100' : 'bg-white'}`}>
              <td>{o.type}</td>
              <td>{o.symbol}</td>
              <td>{o.price}</td>
              <td>{o.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
