"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setMessage(data?.error || "Could not create account.");
      return;
    }

    router.push("/account");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Create account</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input name="name" required minLength={2} placeholder="Name" className="w-full rounded-xl border px-4 py-3" />
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
        <input name="password" type="password" required minLength={8} placeholder="Password" className="w-full rounded-xl border px-4 py-3" />
        <button type="submit" className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white">Create account</button>
      </form>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
    </main>
  );
}
