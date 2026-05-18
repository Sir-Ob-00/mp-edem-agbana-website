import Input from "../ui/Input";

const categories = ["All", "News", "Education", "Infrastructure", "Community", "Health", "Youth"];

export default function BlogFilters({
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  total,
}) {
  return (
    <section className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:w-80">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">{total} articles found</p>
      </div>
    </section>
  );
}
