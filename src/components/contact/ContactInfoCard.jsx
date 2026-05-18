export default function ContactInfoCard({ title, items, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
