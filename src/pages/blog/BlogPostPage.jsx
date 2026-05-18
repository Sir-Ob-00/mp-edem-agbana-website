import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogService from "../../services/blogService";
import { cleanupHtml, formatDate, getImageUrl } from "../../utils/blogHelpers";
import SanitizedHtml from "../../components/ui/SanitizedHtml";
import Button from "../../components/ui/Button";
import RelatedPosts from "../../components/blog/RelatedPosts";
import BlogPostShare from "../../components/blog/BlogPostShare";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPost() {
      try { 
        setLoading(true);
        const response = await blogService.getPostBySlug(slug);
        if (response?.success && response?.data?.post) {
          setPost(response.data.post);
        } else {
          setError("Article not found");
        }
      } catch {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-white py-20 text-center">Loading...</div>;
  if (error || !post) {
    return (
      <div className="min-h-screen bg-white py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">Article Not Found</h1>
        <p className="mb-8 text-slate-600">{error}</p>
        <Link to="/blog">
          <Button>Back to Articles</Button>
        </Link>
      </div>
    );
  }

  const tags = Array.isArray(post.tags)
    ? post.tags
    : typeof post.tags === "string"
    ? post.tags.startsWith("[")
      ? JSON.parse(post.tags)
      : post.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-white">
      {post.image && (
        <div className="h-[400px] bg-slate-900 lg:h-[500px]">
          <img src={getImageUrl(post.image)} alt={post.title} className="h-full w-full object-cover opacity-80" />
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className={`rounded-2xl bg-white p-8 shadow-xl lg:p-12 ${post.image ? "-mt-32 relative" : "mt-8"}`}>
          <Link to="/blog" className="mb-8 inline-flex text-sm text-slate-500 hover:text-amber-600">
            Back to all articles
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            {post.category && (
              <span className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold uppercase text-amber-600">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span className="text-sm text-slate-500">{formatDate(post.published_at)}</span>
            )}
          </div>

          <h1 className="mb-6 text-3xl font-bold text-slate-900 lg:text-4xl">{post.title}</h1>

          {post.author && (
            <div className="mb-8 border-b border-slate-100 pb-8">
              <p className="font-semibold text-slate-900">{post.author}</p>
              <p className="text-sm text-slate-500">Author</p>
            </div>
          )}

          {post.excerpt && (
            <p className="mb-8 text-lg font-medium leading-relaxed text-slate-600">
              {cleanupHtml(post.excerpt)}
            </p>
          )}

          {post.content ? (
            <SanitizedHtml
              html={post.content}
              className="prose prose-slate max-w-none prose-lg"
            />
          ) : (
            <p className="text-slate-600">{cleanupHtml(post.excerpt || "")}</p>
          )}

          {!!tags.length && (
            <div className="mt-12 border-t border-slate-100 pt-8">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <BlogPostShare title={post.title} />
        </article>

        <RelatedPosts currentId={post.id} category={post.category} />

        <div className="my-16 text-center">
          <Link to="/blog">
            <Button variant="outline">View more articles</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
