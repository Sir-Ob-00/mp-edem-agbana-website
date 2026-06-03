import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import blogService from "../../services/blogService";
import { Loader2 } from "lucide-react";
import { getImageUrl, cleanupHtml } from "../../utils/blogHelpers";

function ArticlesGrid() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let response = await blogService.getFeaturedPosts(3);

        if (
          response.success &&
          response.data.posts &&
          response.data.posts.length > 0
        ) {
          setPosts(response.data.posts.slice(0, 3));
        } else {
          response = await blogService.getAllPosts(1, 3);
          if (
            response.success &&
            response.data.posts &&
            response.data.posts.length > 0
          ) {
            setPosts(response.data.posts);
          } else {
            setPosts([]);
          }
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              News & Blog
            </p>
            <h2 className="text-3xl font-semibold text-text-primary">
              Featured Articles
            </h2>
          </div>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-accent animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const featured = posts[0];
  const others = posts.slice(1, 3);

  if (!featured) {
    return null;
  }

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-accent">
            News & Blog
          </p>
          <h2 className="text-3xl font-semibold text-text-primary">
            Featured Articles
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Featured Article — spans 2 cols */}
          <div className="lg:col-span-2">
            <Link
              to={`/blog/${featured.slug}`}
              aria-label={`Read ${featured.title}`}
              className="group block rounded-2xl overflow-hidden"
            >
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
                className="overflow-hidden rounded-2xl bg-surface shadow transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden bg-background">
                  {featured.image ? (
                    <img
                      src={getImageUrl(featured.image)}
                      alt={featured.title || "Blog post"}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-text-muted">
                      <span>No image</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4 p-6 lg:p-8">
                  <div className="flex items-center gap-2">
                    {featured.category && (
                      <span className="text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded">
                        {featured.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary line-clamp-2 lg:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-3 lg:text-base">
                    {cleanupHtml(featured.excerpt || "")}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read article
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </motion.article>
            </Link>
          </div>

          {/* Supporting Articles — stacked vertically */}
          <div className="flex flex-col gap-6">
            {others.map((post, index) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                aria-label={`Read ${post.title}`}
                className="group block rounded-2xl overflow-hidden"
              >
                <motion.article
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="overflow-hidden rounded-2xl bg-surface shadow transition-shadow duration-300 hover:shadow-lg"
                >
                  <div className="relative h-48 overflow-hidden bg-background">
                    {post.image ? (
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title || "Blog post"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-text-muted">
                        <span>No image</span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 p-5">
                    <div className="flex items-center gap-2">
                      {post.category && (
                        <span className="text-xs font-medium uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {post.category}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Read
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-base font-semibold text-text-primary hover:text-primary transition-colors"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ArticlesGrid;