import { Clock, MapPin, MessageCircle, Phone, Share2 } from "lucide-react";
import ContactInfoCard from "../components/contact/ContactInfoCard";
import ContactForm from "../components/contact/ContactForm";
import SocialLinks from "../components/contact/SocialLinks";
import VisitCard from "../components/contact/VisitCard";

const contactHighlights = [
  {
    title: "Office Address",
    items: [
      "MP's Office, Sefwi Wiawso Municipal Assembly",
      "P.O Box 25, Sefwi Wiawso",
      "Western North Region, Ghana",
      "Ghana Post GPS: WG-0002-7111",
    ],
    icon: MapPin,
  },
  {
    title: "Phone Numbers",
    items: ["Contact Information: (+233) 548 531 963"],
    icon: Phone,
  },
  {
    title: "Office Hours",
    items: [
      "Monday - Friday: 8:00 AM - 5:00 PM",
      "Weekends: Closed (Emergencies only)",
    ],
    icon: Clock,
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EAdgQAa6S/?mibextid=wwXIfr",
  },
  {
    label: "Twitter",
    href: "https://x.com/bentehkofi?s=21&t=_6-Z7x7LnaWkBxfsBO1rTQ",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/kofi_benteh_afful?igsh=MTA1ZnJ2djBxazk3cg%3D%3D&utm_source=qr",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@kofi_benteh_afful?_r=1&_t=ZS-93e3fn5CHXs",
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-emerald-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/30 blur-[160px]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Contact Us
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            We&apos;re here to listen to your concerns and suggestions
          </h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            Reach out using any of the channels below or send us a quick
            message.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8 rounded-3xl border border-white/70 bg-white/90 p-8 shadow-sm">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                Contact Information
              </p>
              <h2 className="text-3xl font-semibold text-slate-900">
                Reach out directly through these channels
              </h2>
              <p className="text-base text-slate-600">
                Our constituency team responds within one business day.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {contactHighlights.map((highlight) => (
                <ContactInfoCard
                  key={highlight.title}
                  title={highlight.title}
                  items={highlight.items}
                  icon={highlight.icon}
                />
              ))}
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <Share2 className="h-5 w-5 text-sky-500" />
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                  Follow Us
                </p>
              </div>
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ContactForm />

            <div>
              <div className="mb-4 flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-emerald-300" />
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
                  Office Visit
                </p>
              </div>
              <VisitCard />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
