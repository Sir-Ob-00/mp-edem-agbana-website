import { Link } from "react-router-dom";
import { cleanupHtml, formatDate, getImageUrl } from "../../utils/blogHelpers";

export default function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(52,98,49,0.15)] transition-all">
      <Link to={`/blog/${post.slug}`}>
        <div className="h-48 overflow-hidden bg-background">
          {post.image ? (
            <img
              src={getImageUrl(post.image)}
              alt={post.title || "Article"}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-text-muted">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          {post.category && (
            <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold uppercase text-accent">
              {post.category}
            </span>
          )}
          {post.published_at && (
            <span className="text-xs text-text-muted">
              {formatDate(post.published_at)}
            </span>
          )}
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="mb-2 line-clamp-2 text-xl font-bold text-text-primary group-hover:text-primary">
            {post.title}
          </h2>
        </Link>

        <p className="mb-4 line-clamp-3 text-sm text-text-secondary">
          {cleanupHtml(post.excerpt || "")}
        </p>

        <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-primary">
          Read article
        </Link>
      </div>
    </article>
  );
}
