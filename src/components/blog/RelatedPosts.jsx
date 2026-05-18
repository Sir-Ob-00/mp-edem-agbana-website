import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blogService";
import { cleanupHtml, getImageUrl } from "../../utils/blogHelpers";

export default function RelatedPosts({ currentId, category, limit = 3 }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchRelated() {
      try {
        const resp = await blogService.getAllPosts(1, 6);
        const all = resp?.data?.posts || [];
        let related = all.filter((p) => p.id !== currentId && p.category === category);

        if (related.length < limit) {
          const others = all.filter((p) => p.id !== currentId && !related.find((r) => r.id === p.id));
          related = [...related, ...others].slice(0, limit);
        } else {
          related = related.slice(0, limit);
        }

        if (mounted) setPosts(related);
      } catch {
        if (mounted) setPosts([]);
      }
    }

    fetchRelated();
    return () => {
      mounted = false;
    };
  }, [currentId, category, limit]);

  if (!posts.length) return null;

  return (
    <section className="mt-16">
      <h3 className="mb-6 text-xl font-semibold text-slate-900">Related articles</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="h-28 bg-slate-100">
              {post.image ? (
                <img src={getImageUrl(post.image)} alt={post.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400">No image</div>
              )}
            </div>
            <div className="p-3">
              <h4 className="line-clamp-2 text-sm font-semibold text-slate-900">{post.title}</h4>
              <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                {cleanupHtml(post.excerpt || "")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
