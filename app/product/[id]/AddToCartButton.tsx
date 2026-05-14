"use client";

import { useState } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const [message, setMessage] = useState("");

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existing = cart.find((item: any) => item._id === product._id);

    const updatedCart = existing
      ? cart.map((item: any) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setMessage("Product added to cart");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div>
      <button
        onClick={addToCart}
        className="bg-green-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-300 transition"
      >
        Add to Cart
      </button>

      {message && (
        <p className="text-green-600 font-semibold mt-3">
          {message}
        </p>
      )}
    </div>
  );
}