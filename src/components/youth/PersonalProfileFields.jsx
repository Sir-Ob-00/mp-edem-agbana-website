export default function PersonalProfileFields({ register, errors }) {
  const fields = [
    { id: "name", name: "name", label: "Full name", type: "text", placeholder: "Ama Yaa Mensah" },
    { id: "phone_number", name: "phone_number", label: "Phone number", type: "tel", placeholder: "0540001234" },
    { id: "date_of_birth", name: "date_of_birth", label: "Date of birth", type: "date", placeholder: "" },
    { id: "national_id", name: "national_id", label: "National ID", type: "text", placeholder: "GHA-000000000-0" },
    { id: "home_town", name: "home_town", label: "Home town", type: "text", placeholder: "Sefwi Wiawso" },
    { id: "residential_community", name: "residential_community", label: "Residential community", type: "text", placeholder: "New Akwaboa" },
  ];

  return (
    <section className="space-y-6 rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        Personal profile
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.id} className="text-sm font-medium text-slate-700">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
              {...register(field.name)}
              onInput={
                field.name === "phone_number"
                  ? (e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+]/g, "");
                    }
                  : undefined
              }
            />
            {errors[field.name] && (
              <p className="text-xs text-rose-600">{errors[field.name]?.message}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
