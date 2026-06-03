import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";

export default function EducationSection({ education }) {
  return (
    <section className="bg-gradient-to-b from-background to-surface py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <BookOpen className="h-5 w-5 text-accent" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              Academic Background
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-bold text-text-primary lg:text-4xl">
            Education &amp; Qualifications
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {education.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="inline-block rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                {item.degree}
              </span>
              <h3 className="mt-3 text-base font-bold text-text-primary">
                {item.field}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {item.institution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
