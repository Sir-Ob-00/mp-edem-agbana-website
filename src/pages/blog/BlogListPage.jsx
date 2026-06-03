import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import blogService from "../../services/blogService";
import BlogFilters from "../../components/blog/BlogFilters";
import BlogPagination from "../../components/blog/BlogPagination";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import { getImageUrl, cleanupHtml, formatDate } from "../../utils/blogHelpers";

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await blogService.getAllPosts(currentPage, postsPerPage);
        setPosts(response?.data?.posts || []);
        setTotalPages(response?.data?.pagination?.total_pages || 1);
      } catch {
        setPosts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, [currentPage]);

  const filteredPosts = useMemo(() => {
    let filtered = posts;
    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (post) => post.category?.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title?.toLowerCase().includes(q) ||
          post.excerpt?.toLowerCase().includes(q) ||
          post.category?.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [posts, activeCategory, searchQuery]);

  const featured = filteredPosts[0];
  const others = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-dark py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-accent">Media Center</p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">News & Articles</h1>
          <p className="max-w-2xl text-lg text-white/80">
            Stay informed about the latest developments, projects, and community initiatives.
          </p>
        </div>
      </section>

      <BlogFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        total={filteredPosts.length}
      />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {loading ? (
          <div className="py-20 text-center text-text-muted">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-text-primary">No articles found</h3>
            <p className="mt-2 text-text-muted">Try a different search or category.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Article */}
            {featured && (
              <Link
                to={`/blog/${featured.slug}`}
                aria-label={`Read ${featured.title}`}
                className="group block"
              >
                <article className="overflow-hidden rounded-2xl bg-surface shadow transition-shadow duration-300 hover:shadow-xl">
                  <div className="relative h-72 sm:h-80 lg:h-[420px] overflow-hidden bg-background">
                    {featured.image ? (
                      <img
                        src={getImageUrl(featured.image)}
                        alt={featured.title || "Featured article"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-muted">
                        No image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                      {featured.category && (
                        <span className="inline-block bg-white/90 text-primary text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                          {featured.category}
                        </span>
                      )}
                      <h2 className="text-2xl font-bold text-white lg:text-3xl leading-tight mb-2 line-clamp-2">
                        {featured.title}
                      </h2>
                      <p className="line-clamp-2 text-sm text-white/80 lg:text-base">
                        {cleanupHtml(featured.excerpt || "")}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                        Read full article
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            {/* Horizontal Article Rows */}
            {others.length > 0 && (
              <div className="space-y-6 border-t border-border pt-10">
                {others.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    aria-label={`Read ${post.title}`}
                    className="group block"
                  >
                    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow duration-300 hover:shadow-lg sm:flex-row">
                      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-background sm:h-auto sm:w-56 lg:w-72">
                        {post.image ? (
                          <img
                            src={getImageUrl(post.image)}
                            alt={post.title || "Blog post"}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-text-muted">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-center p-5 lg:p-6">
                        {post.category && (
                          <span className="mb-2 inline-block w-fit rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-accent">
                            {post.category}
                          </span>
                        )}
                        <h3 className="mb-1.5 text-lg font-bold text-text-primary line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="line-clamp-2 text-sm text-text-secondary">
                          {cleanupHtml(post.excerpt || "")}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Read more
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <section className="bg-dark py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Stay Updated</h2>
          <p className="mb-8 text-white/80">
            Subscribe to receive the latest news and updates.
          </p>
          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="border-white/20 bg-white/10 text-white placeholder:text-white/50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
