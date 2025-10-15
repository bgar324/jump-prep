// Required fields:
// - Stock symbol (text input)
// - Quantity (number input)
// - Price per share (number input)
// - Order type: Buy or Sell (toggle/radio buttons)

// Calculated field:
// - Total cost (quantity × price) - should update automatically

// Submit button:
// - Should console.log the order details
// - Format: { symbol, quantity, price, orderType, total }

// Validation requirements:
// - All fields are required before submission
// - Quantity must be a positive integer (> 0)
// - Price must be a positive number (> 0)
// - Symbol must not be empty
// - Show error messages for invalid fields
// - Disable submit button if form is invalid

"use client";

import { useState } from "react";

interface OrderForm {
  stock: string;
  quantity: number;
  price: number;
  orderType: "buy" | "sell";
}

export default function App() {
  const [stock, setStock] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const total = (typeof quantity === 'number' && typeof price === 'number') ? quantity * price : 0;

  const stockError = stock.trim() === "" ? "Stock Symbol Required" : "";
  const quantityError =
    quantity === "" || quantity <= 0 || !Number.isInteger(quantity)
      ? "Quantity must be an integer"
      : "";
  const priceError = price === "" || price <= 0 ? "Price must be greater than 0" : "";

  const isValid = !stockError && !quantityError && !priceError;

  const handleSubmit = () => {
    if (!isValid) return;

    const order = {
      symbol: stock,
      quantity,
      price,
      orderType,
      total,
    };
    console.log(order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center mb-8">
          Stock Order
        </h1>

        <div className="space-y-6">
          {/* Stock Symbol */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Stock Symbol
            </label>
            <input
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="AAPL"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || "")}
              placeholder="quantity"
              className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
            />
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Price per Share
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                $
              </span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || "")}
                placeholder="price"
                className="w-full pl-8 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Order Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Order Type
            </label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={orderType == "buy"}
                  onChange={() => setOrderType("buy")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    orderType === "buy"
                      ? "bg-green-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Buy
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  checked={orderType == "sell"}
                  onChange={() => setOrderType("sell")}
                  className="w-4 h-4 text-red-600 focus:ring-red-500"
                />
                <span
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    orderType === "sell"
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Sell
                </span>
              </label>
            </div>
          </div>

          {/* Total Display */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">
              Total Value
            </div>
            <div className="text-2xl font-bold text-gray-800">
              ${total.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {quantity || 0} × ${price || 0}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full py-3 rounded-xl font-semibold transition-all ${
              isValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
