const categories = [
  "All",
  "Events",
  "Programs",
  "Community",
  "Infrastructure",
  "General",
];

export default function GalleryFilters({
  activeCategory,
  setActiveCategory,
  total,
}) {
  return (
    <section className="sticky top-0 z-10 border-b border-border bg-surface/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-background text-text-secondary hover:bg-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mt-4 text-center text-sm text-text-muted">
          {total} {total === 1 ? "album" : "albums"} • Click to view photos
        </p>
      </div>
    </section>
  );
}
