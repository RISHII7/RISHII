import { useState, type FormEvent } from "react";
import { site } from "../../data/site";
import { MarqueeTitle, SectionEyebrow, SectionFrame } from "../ui/SectionShell";
import { ScrambleText } from "../ui/ScrambleText";

const channels = [
  { label: "EMAIL", value: site.email, href: `mailto:${site.email}` },
  {
    label: "LINKEDIN",
    value: site.linkedin.replace("https://www.", ""),
    href: site.linkedin,
  },
  { label: "GITHUB", value: site.github.replace("https://", ""), href: site.github },
];

/** Contact row: mono label, giant value, accent arrow. */
function ChannelRow({ label, value, href }: { label: string; value: string; href: string }) {
  const [hoverKey, setHoverKey] = useState(0);
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group/ch block border-b border-dashed border-muted/25 py-8"
    >
      <p className="hud-label text-muted/75">{label}</p>
      <p className="mt-3 flex items-baseline justify-between gap-6">
        <span 
          className="break-all text-[clamp(1.6rem,5.2vw,4.75rem)] font-black lowercase leading-none text-muted transition-colors [transition-duration:var(--dur-hover)] group-hover/ch:text-accent"
          onMouseEnter={() => setHoverKey(k => k + 1)}
          onMouseLeave={() => setHoverKey(k => k + 1)}
        >
          {hoverKey > 0 ? (
            <ScrambleText key={hoverKey} text={value} duration={2000} mode="decode" />
          ) : (
            value
          )}
        </span>
        <span
          aria-hidden="true"
          className="shrink-0 text-[clamp(1.2rem,2.4vw,2rem)] text-accent transition-transform [transition-duration:var(--dur-hover)] [transition-timing-function:var(--ease-soft)] group-hover/ch:-translate-y-1 group-hover/ch:translate-x-1"
        >
          ↗
        </span>
      </p>
    </a>
  );
}

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact — ${form.name || "hello"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full border-b border-dashed border-muted/40 bg-transparent pb-3 pt-2 text-field font-light text-muted outline-none transition-colors focus:border-accent";

  return (
    <SectionFrame id="contact" labelledBy="contact-title">
      <SectionEyebrow number="05" label="AVAILABLE FOR WORK" />
      <MarqueeTitle id="contact-title" outline="LET'S" solid="TALK" />

      <div className="mt-[clamp(1.5rem,3vw,3rem)]">
        {channels.map((c) => (
          <ChannelRow key={c.label} {...c} />
        ))}
      </div>

      <form
        onSubmit={submit}
        className="mt-[clamp(2.5rem,5vw,4rem)] rounded-[var(--radius-card)] border border-muted/20 p-6 md:p-10"
      >
        <p className="hud-label text-accent">SEND A MESSAGE</p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <label className="block">
            <span className="hud-label text-muted/75">NAME</span>
            <input
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
          </label>
          <label className="block">
            <span className="hud-label text-muted/75">EMAIL</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
          </label>
        </div>

        <label className="mt-8 block">
          <span className="hud-label text-muted/75">MESSAGE</span>
          <textarea
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={`${field} resize-none`}
          />
        </label>

        <button
          type="submit"
          className="clip-chamfer hud-label mt-10 inline-block cursor-pointer bg-accent px-6 py-3 text-ink transition-opacity hover:opacity-85"
        >
          SEND ↗
        </button>
        <p className="hud-label mt-4 text-muted/60">
          OPENS YOUR MAIL CLIENT — OR WRITE DIRECT TO {site.email.toUpperCase()}
        </p>
      </form>
    </SectionFrame>
  );
}
