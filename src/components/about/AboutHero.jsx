import { motion } from "framer-motion";
import portraitImg from "../../assets/other/edem_agbana_ghana-q81vpybzbic1avr426xybcvcal9j69x2o0ep7dqruo.jpg";
import eventImg from "../../assets/other/POSTER-85-scaled-q829j0djckqg02i98jwgprvmyodhlirm1mm3l2wswm.jpg";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={eventImg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-r from-dark/95 via-dark/80 to-dark/60" />
        <div className="absolute inset-0 bg-linear-to-t from-dark/60 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_0.9fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-accent"
            >
              About Me
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
            >
              Hon. <span className="text-accent">Edem Agbana</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-xl text-lg leading-relaxed text-white/70"
            >
              Member of Parliament &mdash; Ketu North Constituency
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/60"
            >
              Management Consultant, Entrepreneur, Sports Administrator, and
              Politician with over a decade of experience in youth development,
              volunteerism, and leadership.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <img
                src={portraitImg}
                alt="Hon. Edem Agbana"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
