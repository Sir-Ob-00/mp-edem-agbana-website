import { useEffect, useMemo, useState } from "react";
import blogService from "../../services/blogService";
import BlogCard from "../../components/blog/BlogCard";
import BlogFilters from "../../components/blog/BlogFilters";
import BlogPagination from "../../components/blog/BlogPagination";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

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

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-amber-50/30">
      <section className="bg-slate-900 py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">Media Center</p>
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
          <div className="py-20 text-center">Loading...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-slate-700">No articles found</h3>
            <p className="mt-2 text-slate-500">Try a different search or category.</p>
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>

      <section className="bg-slate-900 py-16 text-white">
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
