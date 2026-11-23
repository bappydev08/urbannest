import { useState } from "react";
import Reveal from "../components/Reveal.jsx";

const fieldClass = "w-full rounded-md border border-line bg-cream px-4 py-3.5 outline-none transition-colors focus:border-mauve";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-20 px-5 py-24 md:grid-cols-2 md:px-8">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mauve">Contact</p>
        <h1 className="mt-4 font-display text-6xl font-semibold text-plum">Let's talk skin.</h1>
        <p className="mt-6 leading-relaxed text-muted">Question, feedback ba partnership er jonno message pathan. Amra 24 ghonta er moddhe reply kori.</p>
        <div className="mt-10 space-y-2 text-sm">
          <p>hello@urbannest.example</p>
          <p>Dhaka, Bangladesh</p>
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <form onSubmit={submit} className="space-y-5">
          <input required placeholder="Name" className={fieldClass} />
          <input required type="email" placeholder="Email" className={fieldClass} />
          <textarea required rows={5} placeholder="Message" className={fieldClass} />
          <button className="rounded-md bg-mauve px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-plum">
            Send message
          </button>
          {sent && <p className="text-sm text-rose">Dhonnobad! Amra shighrei reply korbo.</p>}
        </form>
      </Reveal>
    </div>
  );
}
