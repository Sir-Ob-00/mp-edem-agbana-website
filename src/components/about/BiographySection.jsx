import { motion } from "framer-motion";
import { ScrollText } from "lucide-react";
import communityImg from "../../assets/other/edem_agbana_with_people-q8298q12070b2dsps6q2d9cd7ksmuzq9hshu5jr832.jpg";

export default function BiographySection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <ScrollText className="h-5 w-5 text-accent" />
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-text-muted">
              Biography
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-text-primary lg:text-4xl">
            A Life of Service &amp; Leadership
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary">
            <p>
              Eric Edem Agbana is a Management Consultant, Entrepreneur, Sports
              Administrator, and Politician with over a decade of experience in
              youth development, volunteerism, and leadership. He is an
              entrepreneur with active business interests across multiple
              sectors, driven by a strong commitment to value creation, job
              generation, and sustainable development.
            </p>
            <p>
              He is a Fellow of the African Young Leaders Fellowship at the
              European University Institute. He holds three Master&rsquo;s
              degrees: Development Finance and Economic Policy Management from
              the University of Ghana, and Peace, Security, and Intelligence
              Management from the University of Professional Studies, Accra. He
              is currently a PhD Candidate in Finance.
            </p>
            <p>
              Hon. Agbana serves as the Member of Parliament for the Ketu North
              Constituency in the Volta Region of Ghana, where he is actively
              engaged in national policymaking and constituency development.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
            <img
              src={communityImg}
              alt="Edem Agbana with community"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-accent px-6 py-4 shadow-lg lg:block">
            <p className="text-sm font-bold text-dark">
              &ldquo;Inspiring Possibilities&rdquo;
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
