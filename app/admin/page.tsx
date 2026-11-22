import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export const instant = false;

export default async function AdminPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/account");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Admin</h1>
      <p className="mt-3 text-gray-600">Administration access is verified.</p>
    </main>
  );
}
