"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      setMessage(data?.error || "Could not sign in.");
      return;
    }

    router.push("/account");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border px-4 py-3" />
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-xl border px-4 py-3" />
        <button type="submit" className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white">Sign in</button>
      </form>
      {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
    </main>
  );
}
