import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(72),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 400 });
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });
  } catch {
    return NextResponse.json(
      { error: "Database unavailable. Configure DATABASE_URL and start PostgreSQL." },
      { status: 503 }
    );
  }

  if (
    !user ||
    user.role !== "ADMIN" ||
    !(await bcrypt.compare(parsed.data.password, user.passwordHash))
  ) {
    return NextResponse.json({ error: "Invalid admin credentials." }, { status: 401 });
  }

  await createSession({ id: user.id, role: "ADMIN" });
  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
