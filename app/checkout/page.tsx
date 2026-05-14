"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const searchParams = useSearchParams();

  const selectedProductId = searchParams.get("product");
  const selectedSize = searchParams.get("size");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const checkoutItems = selectedProductId
    ? cartItems.filter((item) => item._id === selectedProductId)
    : cartItems;

  const totalPrice = checkoutItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = () => {
    localStorage.removeItem("cart");
    window.location.href = "/success";
  };

  return (
    <main className="min-h-screen bg-[#f1f3f6] p-4 sm:p-8">
      <Link href="/cart">
        <button className="mb-6 bg-green-400 px-5 py-2 rounded-lg font-bold">
          Back to Cart
        </button>
      </Link>

      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6">Delivery Details</h2>

          <div className="space-y-4">
            <input className="w-full border p-3 rounded-lg" placeholder="Full Name" />
            <input className="w-full border p-3 rounded-lg" placeholder="Phone Number" />
            <input className="w-full border p-3 rounded-lg" placeholder="Address" />
            <input className="w-full border p-3 rounded-lg" placeholder="City" />
            <input className="w-full border p-3 rounded-lg" placeholder="Pincode" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {checkoutItems.map((item) => (
            <div key={item._id} className="mb-4">
              <div className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>

              {selectedSize && item._id === selectedProductId && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected Size: <span className="font-bold">{selectedSize}</span>
                </p>
              )}
            </div>
          ))}

          <div className="border-t pt-4 mt-4 flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-green-600">₹{totalPrice}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 bg-green-400 py-4 rounded-xl font-bold hover:bg-green-300 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}