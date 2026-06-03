export default function EducationReadinessFields({ register, errors }) {
  const fields = [
    ["shs_qualification", "Highest SHS qualification", "WASSCE, TVET, etc"],
    ["certificate_qualification", "Certificate", "Optional"],
    ["diploma_qualification", "Diploma", "Optional"],
    ["first_degree", "First degree", "Optional"],
    ["postgraduate_qualification", "Postgraduate", "Optional"],
    ["professional_qualification", "Professional cert.", "Eg. ACCA, CA, NVTI"],
  ];

  return (
    <section className="space-y-6 rounded-2xl border border-border bg-surface/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        Education & Readiness
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, placeholder]) => (
          <div key={name} className="space-y-2">
            <label className="text-sm font-medium text-text-primary">{label}</label>
            <input
              type="text"
              {...register(name)}
              placeholder={placeholder}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
            />
            {errors[name] && <p className="text-xs text-warning">{errors[name]?.message}</p>}
          </div>
        ))}
      </div>

        <div className="rounded-2xl border border-border bg-background p-4">
          <label className="flex items-center gap-2 text-sm text-text-primary">
            <input type="checkbox" {...register("jhs_completed")} />
            I completed Junior High School (JHS)
          </label>
        </div>

        <div>
          <label className="text-sm font-medium text-text-primary">
            Salary expectation (GH&cent;)
          </label>
          <input
            type="number"
            {...register("salary_expectation")}
            placeholder="e.g., 2000"
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text-primary"
          />
          {errors.salary_expectation && (
            <p className="text-xs text-warning">{errors.salary_expectation?.message}</p>
          )}
        </div>
    </section>
  );
}
