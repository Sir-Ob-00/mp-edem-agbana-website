export default function WorkHistoryFields({
  register,
  errors,
  employmentStatus,
  experienceFields,
}) {
  return (
    <section className="space-y-6 rounded-2xl border border-border bg-surface/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Work history & preferences
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">Employment status</label>
          <select
            {...register("employment_status")}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          >
            <option value="">Select...</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self-employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">Availability</label>
          <select
            {...register("availability_status")}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          >
            <option value="">Select...</option>
            <option value="immediate">Immediate</option>
            <option value="within_2_weeks">Within 2 weeks</option>
            <option value="within_a_month">Within a month</option>
            <option value="not_available">Not available</option>
          </select>
        </div>

      </div>

      <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            {`Name of employer / institution`}
          </label>
          <input
            type="text"
            {...register("current_employment")}
            placeholder="e.g., Sefwi Wiawso Municipal Assembly"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">
            {`Role / job title`}
          </label>
          <input
            type="text"
            {...register("current_role")}
            placeholder="e.g., Community development officer"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">
            {`Years of experience`}
          </label>
          <input
            type="number"
            {...register("years_of_experience")}
            placeholder="e.g., 3"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">Additional notes</label>
          <textarea
            {...register("employment_notes")}
            rows={3}
            placeholder="e.g., Willing to relocate, open to part-time"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
      </div>

      <div className="grid gap-3">
        {experienceFields.map((field, index) => (
          <div key={field} className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Experience {index + 1}
            </label>
            <textarea
              rows="2"
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
              placeholder="Share projects, apprenticeships or informal work"
              {...register(field)}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-text-primary">Additional notes</label>
        <textarea
          rows="3"
          className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          placeholder="Describe volunteer work, leadership roles or anything unique"
          {...register("employment_notes")}
        />
      </div>
    </section>
  );
}
