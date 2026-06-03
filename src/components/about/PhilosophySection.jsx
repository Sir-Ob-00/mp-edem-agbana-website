import { motion } from "framer-motion";
import { HeartHandshake, Quote } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="relative overflow-hidden bg-dark py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/10 blur-[140px]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primarySoft/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <Quote className="mx-auto h-10 w-10 text-accent/60" />
          <h2 className="mt-6 text-4xl font-bold text-white lg:text-5xl">
            &ldquo;Inspiring Possibilities&rdquo;
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
            Guided by the philosophy of &ldquo;Inspiring Possibilities,&rdquo;
            Hon. Edem Agbana continually seeks to motivate and empower others to
            realize their full potential. His career is a testament to his
            unwavering commitment to people-centered leadership, youth
            empowerment, and national development.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <HeartHandshake className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              People-Centered Leadership
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
