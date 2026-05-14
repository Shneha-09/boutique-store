import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f1f3f6] p-8">
        <h1 className="text-3xl font-bold mb-4">Product not found</h1>

        <Link href="/">
          <button className="bg-yellow-400 px-5 py-3 rounded-lg font-bold">
            Back to Home
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f1f3f6] p-4 sm:p-8">
      <Link href="/">
        <button className="mb-6 bg-green-400 px-5 py-2 rounded-lg font-bold">
          Back
        </button>
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

          <p className="text-gray-500 mt-3 text-lg">{product.category}</p>

          <p className="text-green-600 text-4xl font-bold mt-6">
            ₹{product.price}
          </p>

          <p className="text-gray-700 mt-6 leading-8 text-lg">
            {product.description}
          </p>

          {product.sizes && (
            <div className="flex flex-wrap gap-3 mt-8">
              {product.sizes.map((size: string, index: number) => (
                <Link
                  key={index}
                  href={`/checkout?product=${product._id}&size=${size}`}
                >
                  <button className="border px-5 py-2 rounded-full bg-gray-100 hover:bg-yellow-400 transition">
                    {size}
                  </button>
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-10">
            <AddToCartButton product={product} />

            <Link href={`/checkout?product=${product._id}`}>
              <button className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}