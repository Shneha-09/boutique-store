"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#f1f3f6] p-4 sm:p-8">
      <Link href="/">
        <button className="mb-6 bg-green-400 px-5 py-2 rounded-lg font-bold hover:bg-green-300 transition">
          Back
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart ({totalQuantity})
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md p-4 flex gap-4"
              >
                <div className="relative w-28 h-28">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>

                  <p className="text-gray-500">{item.category}</p>

                  <p className="text-green-600 font-bold">₹{item.price}</p>

                  {item.sizes && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.sizes.map((size: string, index: number) => (
                        <Link
                          key={index}
                          href={`/checkout?product=${item._id}&size=${size}`}
                        >
                          <button className="border px-3 py-1 rounded-full text-sm bg-gray-100 hover:bg-green-400 transition">
                            {size}
                          </button>
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="bg-gray-200 w-9 h-9 rounded-lg font-bold text-xl"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="bg-green-400 w-9 h-9 rounded-lg font-bold text-xl hover:bg-green-300 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 font-bold mt-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{totalQuantity}</span>
            </div>

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-green-600">₹{totalPrice}</span>
            </div>

            <Link href="/checkout">
              <button className="w-full bg-green-400 py-4 rounded-xl font-bold text-lg hover:bg-green-300 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}