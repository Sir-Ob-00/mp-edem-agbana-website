import { motion } from "framer-motion";

export default function StatsRibbon({ stats }) {
  return (
    <section className="relative z-10 -mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primaryLight to-primarySoft shadow-xl lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center bg-white/10 px-6 py-10 text-center backdrop-blur-sm"
            >
              <span className="text-4xl font-bold text-white lg:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 text-sm font-medium tracking-wide text-white/75">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
