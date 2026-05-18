import { cleanupHtml, getImageUrl } from "../../utils/blogHelpers";

export default function GalleryCard({ item, onOpen }) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
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
          <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold text-slate-900 group-hover:text-emerald-600">
          {item.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-slate-600">
          {cleanupHtml(item.description || "")}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500">
          <span>{item.date}</span>
          <span>{item.location}</span>
        </div>
      </div>
    </div>
  );
}
