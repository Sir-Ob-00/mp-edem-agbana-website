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
    <div className="rounded-3xl border border-white/70 bg-white/95 p-8 shadow-lg">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
          Send Us a Message
        </p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Fill out the form and we&apos;ll respond soon
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(+233)"
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Let us know how we can help"
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Share more context here..."
            className="w-full rounded-md border border-slate-200 px-3 py-2 outline-none focus:border-emerald-400"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full rounded-full bg-emerald-500 px-6 py-3 text-base font-semibold text-white hover:bg-emerald-400"
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}
