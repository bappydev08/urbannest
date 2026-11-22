import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const instant = false;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let product;

  try {
    product = await prisma.product.findFirst({
      where: { slug, active: true },
    });
  } catch (error) {
    console.error("Failed to load product:", error);
  }

  if (!product) notFound();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm text-gray-500">{product.category}</p>
      <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 max-w-2xl text-gray-700">{product.description}</p>
      <p className="mt-6 text-2xl font-bold">৳{product.price.toLocaleString("en-BD")}</p>
    </main>
  );
}
