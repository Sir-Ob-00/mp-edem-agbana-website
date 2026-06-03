import { motion } from "framer-motion";
import { Building2, Landmark } from "lucide-react";
import posterImg from "../../assets/other/POSTER-47-scaled.jpg";

export default function RolesSection({ roles }) {
  return (
    <section className="bg-gradient-to-b from-surface to-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <Landmark className="h-5 w-5 text-accent" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              Leadership &amp; Service
            </p>
          </div>
          <h2 className="mt-3 text-3xl font-bold text-text-primary lg:text-4xl">
            Current Roles &amp; Responsibilities
          </h2>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-3xl shadow-xl"
          >
            <img
              src={posterImg}
              alt="Hon. Edem Agbana"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <div className="flex flex-col gap-4">
            {roles.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group rounded-2xl border border-border bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-text-primary">
                      {role.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {role.org}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
