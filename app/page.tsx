"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const total = cart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    setCartCount(total);
  }, []);

  const addToCart = (product: any) => {
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

    const total = updatedCart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    );

    setCartCount(total);

    setMessage("Product added to cart");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const filteredProducts = products.filter(
    (product: any) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#f1f3f6]">

      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#131921] text-white px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 z-50 shadow-md">

        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Boutique Store
        </h1>

        <input
          type="text"
          placeholder="Search Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[40%] p-3 rounded-lg text-black outline-none"
        />

        <Link href="/cart">
          <button className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-300 transition flex items-center justify-center gap-3">
            Cart

            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold min-w-[24px] h-6 px-2 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </Link>

      </div>

      {/* Message */}
      {message && (
        <div className="fixed top-40 md:top-24 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-bold">
          {message}
        </div>
      )}

      {/* Products */}
      <div className="pt-56 md:pt-32 p-4 sm:p-6 md:p-8">

        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center md:text-left">
          Trending Products
        </h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-xl font-bold text-gray-500">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product: any) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <Link href={`/product/${product._id}`}>
                  <div className="relative w-full h-72 sm:h-80 cursor-pointer">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <Link href={`/product/${product._id}`}>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 hover:text-green-600 cursor-pointer">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-gray-500 mt-1">{product.category}</p>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-green-600 text-2xl font-bold mt-4">
                    ₹{product.price}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {product.sizes && (
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size: string, index: number) => (
                          <span
                            key={index}
                            className="border px-3 py-1 rounded-full text-sm bg-gray-100"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-green-500 w-12 h-12 rounded-xl text-2xl font-bold hover:bg-green-300 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}