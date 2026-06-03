import { useState } from "react";
import Button from "../ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        [name]: value.replace(/[^0-9+]/g, ""),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form submitted:", formData);

    alert("Message submitted. Connect this form to your API or email service.");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-surface p-8 shadow-lg">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-text-muted">
          Send Us a Message
        </p>
        <h2 className="text-2xl font-semibold text-text-primary">
          Fill out the form and we&apos;ll respond soon
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-primary">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-md border border-border px-3 py-2 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-primary">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full rounded-md border border-border px-3 py-2 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-primary">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(+233)"
            className="w-full rounded-md border border-border px-3 py-2 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-primary">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Let us know how we can help"
            className="w-full rounded-md border border-border px-3 py-2 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-text-primary">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Share more context here..."
            className="w-full rounded-md border border-border px-3 py-2 text-text-primary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
