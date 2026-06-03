export default function SkillsFocusFields({ register, errors }) {
  return (
    <section className="space-y-6 rounded-2xl border border-border bg-surface/80 p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
          Skills & Placement
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">Key skills</label>
          <input
            value={value}
            {...register("skills")}
            placeholder="e.g., digital literacy, agribusiness"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">Areas you want to grow</label>
          <input
            {...register("interests")}
            placeholder="e.g., leadership, coding, public speaking"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">Preferred work location</label>
          <input
            {...register("preferred_work_location")}
            placeholder="e.g., Sefwi Wiawso, Accra"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>
      </section>
  );
}
