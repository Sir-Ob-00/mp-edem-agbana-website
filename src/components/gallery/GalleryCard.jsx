import { cleanupHtml, getImageUrl } from "../../utils/blogHelpers";

export default function GalleryCard({ item, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(52,98,49,0.15)]"
    >
      <div className="relative h-56 overflow-hidden bg-background">
        <img
          src={getImageUrl(item.cover_image)}
          alt={item.title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {item.images?.length || 0} photos
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-text-primary group-hover:text-primary">
          {item.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-text-secondary">
          {cleanupHtml(item.description || "")}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-text-muted">
          <span>{item.date}</span>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
}
