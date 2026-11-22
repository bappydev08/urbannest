import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Shop</h1>
      <p className="mt-3 text-gray-600">Browse the latest products in the NEXORA store.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white">
        Browse products
      </Link>
    </main>
  );
}
