import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

const orderSchema = z.object({
  customerName: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^[0-9+() -]{8,20}$/),
  address: z.string().trim().min(8).max(500),
  items: z.array(z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().min(1).max(50),
  })).min(1).max(100),
});

export async function POST(request: Request) {
  const parsed = orderSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order details." }, { status: 400 });
  }

  const uniqueIds = new Set(parsed.data.items.map((item) => item.productId));
  if (uniqueIds.size !== parsed.data.items.length) {
    return NextResponse.json({ error: "Duplicate products are not allowed." }, { status: 400 });
  }

  try {
    const user = await getSessionUser();
    const idempotencyKey = request.headers.get("Idempotency-Key")?.slice(0, 80);

    if (idempotencyKey) {
      const existing = await prisma.order.findUnique({
        where: { orderNumber: idempotencyKey },
        include: { items: true },
      });
      if (existing) return NextResponse.json({ order: existing });
    }

    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: [...uniqueIds] }, active: true },
      });

      if (products.length !== uniqueIds.size) {
        throw new Error("One or more products are unavailable.");
      }

      let subtotal = 0;
      const lines = parsed.data.items.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) throw new Error("Product not found.");
        if (product.stock < item.quantity) {
          throw new Error(`${product.name} does not have enough stock.`);
        }

        subtotal += product.price * item.quantity;
        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        };
      });

      for (const item of parsed.data.items) {
        const result = await tx.product.updateMany({
          where: {
            id: item.productId,
            stock: { gte: item.quantity },
            active: true,
          },
          data: { stock: { decrement: item.quantity } },
        });

        if (result.count !== 1) {
          throw new Error("Stock changed. Please refresh your cart.");
        }
      }

      const deliveryCharge = Number(process.env.DELIVERY_CHARGE || 100);
      const freeMinimum = Number(process.env.FREE_DELIVERY_MINIMUM || 3000);
      const shipping = subtotal >= freeMinimum ? 0 : deliveryCharge;

      return tx.order.create({
        data: {
          orderNumber: idempotencyKey || `NX-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
          customerName: parsed.data.customerName,
          phone: parsed.data.phone,
          address: parsed.data.address,
          subtotal,
          shipping,
          total: subtotal + shipping,
          userId: user?.id,
          items: { create: lines },
        },
        include: { items: true },
      });
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not place order.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  if (user.role === "ADMIN") {
    const orders = await prisma.order.findMany({
      include: { items: true, user: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ orders });
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}
