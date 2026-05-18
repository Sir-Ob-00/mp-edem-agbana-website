export default function WorkHistoryFields({
  register,
  errors,
  employmentStatus,
  experienceFields,
}) {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Work history & preferences
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Employment status</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            {...register("employment_status")}
          >
            <option value="unemployed">Unemployed</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-employed</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Availability</label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            {...register("availability_status")}
          >
            <option value="available">Immediately available</option>
            <option value="remote-only">Remote only</option>
            <option value="not-available">Not available</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          {employmentStatus === "unemployed" ? "Most recent role" : "Current role / venture"}
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          placeholder="Eg. Apprentice welder, Front desk associate"
          {...register("current_employment")}
        />
      </div>

      <div className="grid gap-3">
        {experienceFields.map((field, index) => (
          <div key={field} className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Experience {index + 1}
            </label>
            <textarea
              rows="2"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              placeholder="Share projects, apprenticeships or informal work"
              {...register(field)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Additional notes</label>
        <textarea
          rows="3"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          placeholder="Describe volunteer work, leadership roles or anything unique"
          {...register("employment_notes")}
        />
      </div>
    </section>
  );
}
