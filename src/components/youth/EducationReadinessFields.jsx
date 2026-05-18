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
    <section className="space-y-6 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Education & readiness
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map(([name, label, placeholder]) => (
          <div key={name} className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{label}</label>
            <input
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              placeholder={placeholder}
              {...register(name)}
            />
            {errors[name] && <p className="text-xs text-rose-600">{errors[name]?.message}</p>}
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" {...register("jhs_completed")} />
          Completed JHS
        </label>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Salary expectation (GHS)
          </label>
          <input
            type="number"
            min="0"
            step="50"
            placeholder="Optional"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
            {...register("salary_expectation")}
          />
          {errors.salary_expectation && (
            <p className="text-xs text-rose-600">{errors.salary_expectation?.message}</p>
          )}
        </div>
      </div>
    </section>
  );
}
