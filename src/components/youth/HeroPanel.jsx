export default function HeroPanel({ stats, tracks }) {
  return (
    <section className="flex flex-col justify-center gap-8 rounded-3xl bg-surface/90 p-8 shadow-xl">
      <span className="w-max rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
        Youth Futures 2026
      </span>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl lg:text-5xl">
          Register once, unlock curated training and work pathways across the
          constituency.
        </h1>
        <p className="max-w-2xl text-lg text-text-secondary">
          Share your background and the skills you want to grow. Our impact desk
          matches you with fellowships, apprenticeships, internships, and gigs.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
          >
            <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-text-muted">
          Priority tracks
        </p>
        <div className="flex flex-wrap gap-2">
          {tracks.map((track) => (
            <span
              key={track}
              className="rounded-full bg-primarySoft/20 px-3 py-1 text-xs font-medium text-primary"
            >
              {track}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
