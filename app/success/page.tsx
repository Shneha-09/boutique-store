import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#f1f3f6] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md w-full">

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Order Placed!
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Your order has been placed successfully.
        </p>

        <Link href="/">
          <button className="bg-green-400 px-8 py-4 rounded-xl font-bold hover:bg-green-300 transition">
            Continue Shopping
          </button>
        </Link>

      </div>
    </main>
  );
}