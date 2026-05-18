export default function EventsHero({ title, description, stats = [] }) {
  return (
    <section className="rounded-3xl bg-slate-900 px-6 py-12 text-white shadow-xl sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300">
        Events & Engagements
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-white/80">{description}</p>

      {!!stats.length && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold">{stat.label}</p>
              <p className="mt-1 text-xs text-white/70">{stat.detail}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
