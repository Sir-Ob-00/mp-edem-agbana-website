export default function ContactInfoCard({ title, items, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primarySoft hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
      </div>

      <ul className="mt-3 space-y-2 text-sm text-text-secondary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
