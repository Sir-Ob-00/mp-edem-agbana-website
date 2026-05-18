export default function SkillsFocusFields({ register, errors }) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Skills & focus
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Key skills</label>
        <textarea
          rows="3"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          placeholder="Product design, cocoa aggregation, solar install, etc"
          {...register("skills")}
        />
        {errors.skills && <p className="text-xs text-rose-600">{errors.skills?.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Areas you want to grow</label>
        <textarea
          rows="3"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          placeholder="Leadership training, software internships, small business finance..."
          {...register("interests")}
        />
        {errors.interests && (
          <p className="text-xs text-rose-600">{errors.interests?.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Preferred work location</label>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          placeholder="Eg. Sefwi Wiawso, Accra, Remote"
          {...register("preferred_work_location")}
        />
      </div>
    </section>
  );
}
