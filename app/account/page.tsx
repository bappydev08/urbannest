import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";

export const instant = false;

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold">Account</h1>
      <p className="mt-3 text-gray-600">Signed in as {user.name} ({user.email}).</p>
    </main>
  );
}
