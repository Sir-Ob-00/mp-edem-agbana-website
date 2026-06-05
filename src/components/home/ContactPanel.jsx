import { useState } from "react";
import { contactDetails } from "../data/data";
import { Mail, Phone } from "lucide-react";

function ContactPanel() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = () => {
    // TODO: wire up to your contact/message service
    console.log("Contact form submitted:", fields);
  };

  return (
    <section className="bg-linear-to-b from-background to-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Reach Out
            </p>
            <h2 className="text-3xl font-semibold text-text-primary">
              Get in touch
            </h2>
            <p className="mt-4 text-text-secondary">
              Share your thoughts, invite us to community forums, or request
              constituency services. We respond within 24 hours on business
              days.
            </p>
<div className="mt-6 space-y-3 text-sm text-text-muted">
              <div className="flex items-start">
                <Mail className="inline-block mr-2 mt-1" />
                <div>
                  {contactDetails.address.map((line, i) => (
                    <p key={i} className="leading-tight">{i > 0 && <br />}{line}</p>
                  ))}
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="inline-block mr-2 mt-1" />
                <div>
                  {contactDetails.phone.map((p, i) => (
                    <p key={i} className="leading-tight">{i > 0 && <br />}{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl bg-surface p-8 shadow-lg space-y-4">
            <div>
              <label
                className="text-sm font-medium text-text-secondary"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={fields.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-text-secondary"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder=""
                value={fields.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-text-secondary"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="How can we help?"
                value={fields.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primaryLight"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPanel;