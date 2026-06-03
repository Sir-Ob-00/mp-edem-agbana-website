import { motion } from "framer-motion";
import {
  GraduationCap,
  Lightbulb,
  ScrollText,
  Trophy,
  Users,
} from "lucide-react";

const items = [
  { label: "Education Committee", desc: "Parliament of Ghana", icon: GraduationCap },
  { label: "Public Accounts Committee", desc: "Parliament of Ghana", icon: ScrollText },
  { label: "Board Member", desc: "Electricity Company of Ghana (ECG)", icon: Lightbulb },
  { label: "President", desc: "Nukunu Sports Academy", icon: Trophy },
];

export default function CommitteesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-accent" />
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
                Parliamentary Work
              </p>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-text-primary lg:text-4xl">
              Committees &amp; Governance
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-secondary">
              In Parliament, Hon. Agbana is a member of the Education Committee
              and the Public Accounts Committee, contributing to education
              reform and strengthening accountability and transparency in
              public financial management.
            </p>
            <p className="mt-3 text-base leading-relaxed text-text-secondary">
              Beyond Parliament, he is a Board Member of the Electricity Company
              of Ghana (ECG), contributing to strategic decision-making in the
              energy sector.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    {item.label}
                  </h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
