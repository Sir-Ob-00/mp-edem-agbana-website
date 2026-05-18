import { Link } from "react-router-dom";
import { cleanupHtml, formatDate, getImageUrl } from "../../utils/blogHelpers";

export default function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-lg transition">
      <Link to={`/blog/${post.slug}`}>
        <div className="h-48 overflow-hidden bg-slate-100">
          {post.image ? (
            <img
              src={getImageUrl(post.image)}
              alt={post.title || "Article"}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          {post.category && (
            <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold uppercase text-amber-600">
              {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="text-xs text-slate-400">
              {formatDate(post.published_at)}
            </span>
          )}
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="mb-2 line-clamp-2 text-xl font-bold text-slate-900 group-hover:text-amber-600">
            {post.title}
          </h2>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm text-slate-600">
          {cleanupHtml(post.excerpt || "")}
        </p>

        <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-red-600">
          Read article
        </Link>
      </div>
    </article>
  );
}
