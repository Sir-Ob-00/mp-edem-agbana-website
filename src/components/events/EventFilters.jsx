export default function EventFilters({ filters, activeFilter, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeFilter === filter
              ? "bg-emerald-600 text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
