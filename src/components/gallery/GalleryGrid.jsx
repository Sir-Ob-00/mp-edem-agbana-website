import GalleryCard from "./GalleryCard";

export default function GalleryGrid({ items, onOpen }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <GalleryCard key={item.id} item={item} onOpen={onOpen} />
        ))}
      </div>
    </main>
  );
}
