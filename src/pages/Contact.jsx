import { useState } from "react";
import Reveal from "../components/Reveal.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <div className="mx-auto grid max-w-5xl gap-16 px-5 py-20 md:grid-cols-2 md:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-muted">Contact</p>
        <h1 className="mt-4 font-display text-5xl font-bold">Kotha bolun</h1>
        <p className="mt-6 text-muted">Question, feedback ba partnership er jonno message pathaan.</p>
        <div className="mt-10 space-y-2 text-sm">
          <p>Email: hello@urbannest.example</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {["Name", "Email"].map((f) => (
            <label key={f} className="block text-sm">
              <span className="mb-2 block font-medium">{f}</span>
              <input
                required
                type={f === "Email" ? "email" : "text"}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition-colors focus:border-ink"
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="mb-2 block font-medium">Message</span>
            <textarea
              required
              rows={5}
              className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 outline-none transition-colors focus:border-ink"
            />
          </label>
          <button className="rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-cream transition-transform hover:scale-[1.03]">
            Pathan
          </button>
          {sent && <p className="text-sm text-accent">Dhonnobad! Amra shighrei reply korbo.</p>}
        </form>
      </Reveal>
    </div>
  );
}
