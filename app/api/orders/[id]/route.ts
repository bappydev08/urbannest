import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Admin access required." }, { status: 403 });
  }

  const { id } = await context.params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order status." }, { status: 400 });
  }

  try {
    const order = await prisma.$transaction(async (tx) => {
      const current = await tx.order.findUnique({ where: { id }, include: { items: true } });
      if (!current) throw new Error("NOT_FOUND");

      if (current.status !== "CANCELLED" && parsed.data.status === "CANCELLED") {
        for (const item of current.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      return tx.order.update({
        where: { id },
        data: { status: parsed.data.status },
        include: { items: true },
      });
    });

    return NextResponse.json({ order });
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }
    return NextResponse.json({ error: "Could not update order." }, { status: 400 });
  }
}
