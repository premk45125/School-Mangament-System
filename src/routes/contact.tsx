import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | BR Gyan Deep Sr Sec School" },
      {
        name: "description",
        content:
          "Get in touch with BR Gyan Deep Sr Sec School, Surjanwas, Mahendragarh. Phone, email, office hours and enquiry form.",
      },
      {
        property: "og:title",
        content: "Contact Us | BR Gyan Deep Sr Sec School",
      },
      {
        property: "og:description",
        content:
          "Contact BR Gyan Deep Sr Sec School — phone, email and office hours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const CONTACT_CARDS = [
  {
    icon: "📍",
    title: "Address",
    lines: [
      "BR Gyan Deep Sr Sec School",
      "Surjanwas, Mahendragarh",
      "Haryana — 123031",
      "Near 152D Underpass",
    ],
  },
  {
    icon: "📞",
    title: "Phone & Email",
    lines: [
      "01235-40378",
      "8708469667",
      "brgyandeep@gmail.com",
      "Admissions: premkumaryadavchikna@gmail.com",
    ],
  },
  {
    icon: "🕐",
    title: "Office Hours",
    lines: [
      "Mon – Sat: 9:00 AM – 5:00 PM",
      "Sunday: 10:00 AM – 2:00 PM",
    ],
  },
] as const;

const DEPARTMENTS = [
  "Admissions",
  "Academics",
  "Transport",
  "Fees & Accounts",
  "Other",
] as const;

const DIRECT_CONTACTS = [
  { label: "Chairman's Office", contact: "Rupram Yadav" },
  { label: "Principal's Office", contact: "Rambir Yadav" },
  { label: "Admissions / Management", contact: "Prem Kumar — 9518XXXXXXX" },
  { label: "Transport Incharge", contact: "Mahipal Yadav" },
  { label: "Accounts", contact: "Sandeep Yadav" },
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Admissions",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const set =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
          Contact Us
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Reach the school office, or send an enquiry and we will get back to
          you within one working day.
        </p>

        {/* Contact info cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <p className="text-2xl">{card.icon}</p>
              <h2 className="mt-2 font-display text-sm font-bold text-foreground">
                {card.title}
              </h2>
              <div className="mt-3 space-y-0.5 text-xs leading-relaxed text-muted-foreground">
                {card.lines.map((line) => {
                  /* Make phone/email lines tappable */
                  if (line.match(/^[\d\-]+$/) || line.match(/^\d{5}/)) {
                    return (
                      <p key={line}>
                        <a
                          href={`tel:${line.replace(/\D/g, "")}`}
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          {line}
                        </a>
                      </p>
                    );
                  }
                  if (line.includes("@")) {
                    const email = line.includes(": ")
                      ? line.split(": ")[1]
                      : line;
                    const prefix = line.includes(": ")
                      ? line.split(": ")[0] + ": "
                      : "";
                    return (
                      <p key={line}>
                        {prefix}
                        <a
                          href={`mailto:${email}`}
                          className="text-primary underline-offset-2 hover:underline"
                        >
                          {email}
                        </a>
                      </p>
                    );
                  }
                  return <p key={line}>{line}</p>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Admissions highlight strip */}
        <div className="mt-8 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-5">
          <p className="text-sm font-bold text-primary">
            🎉 Admissions Open for the Current Session!
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            For admission enquiries, contact{" "}
            <span className="font-semibold text-foreground">Prem Kumar</span>{" "}
            (Management Head Admin) at{" "}
            <a
              href="tel:9518XXXXXXX"
              className="font-semibold text-primary hover:underline"
            >
              9518XXXXXXX
            </a>{" "}
            or email{" "}
            <a
              href="mailto:premkumaryadavchikna@gmail.com"
              className="font-semibold text-primary hover:underline"
            >
              premkumaryadavchikna@gmail.com
            </a>
          </p>
        </div>

        {/* Enquiry form + quick contacts */}
        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-bold text-foreground">
                Send an Enquiry
              </h2>
              {sent ? (
                <div className="mt-6 rounded-xl border border-accent/50 bg-secondary px-4 py-6 text-center">
                  <p className="text-sm font-semibold text-foreground">
                    Thank you, {form.name || "friend"}!
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your enquiry has been recorded. Our {form.department} team
                    will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        department: "Admissions",
                        message: "",
                      });
                    }}
                    className="mt-4 rounded-full border border-border px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form
                  className="mt-6 space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-semibold text-foreground">
                        Name
                      </span>
                      <input
                        required
                        value={form.name}
                        onChange={set("name")}
                        placeholder="Your full name"
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-foreground">
                        Email
                      </span>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        placeholder="you@example.com"
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                      />
                    </label>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-semibold text-foreground">
                        Phone
                      </span>
                      <input
                        value={form.phone}
                        onChange={set("phone")}
                        placeholder="+91 ..."
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-foreground">
                        Department
                      </span>
                      <select
                        value={form.department}
                        onChange={set("department")}
                        className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                      >
                        {DEPARTMENTS.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-semibold text-foreground">
                      Message
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={set("message")}
                      placeholder="How can we help?"
                      className="mt-1 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary/50"
                    />
                  </label>
                  <button
                    type="submit"
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 hover:shadow-md"
                  >
                    Submit Enquiry
                  </button>
                  <p className="text-[11px] text-muted-foreground">
                    Sample enquiry form — submissions are not sent anywhere yet.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Quick contacts */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-secondary/40 p-6">
              <h2 className="font-display text-lg font-bold text-foreground">
                Direct Contacts
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Reach any department directly.
              </p>
              <div className="mt-4 space-y-2.5">
                {DIRECT_CONTACTS.map(({ label, contact }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <p className="text-xs font-semibold text-foreground">
                      {label}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {contact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative h-64 w-full bg-secondary/50">
                <iframe
                  title="BR Gyan Deep Sr Sec School Location"
                  src="https://maps.google.com/maps?q=28.2541873,76.2034083&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-3">
                <p className="text-xs text-muted-foreground truncate">
                  Surjanwas, Mahendragarh, Haryana – 123031
                </p>
                <a
                  href="https://maps.app.goo.gl/P3zE7ADTqqJXutq8A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
