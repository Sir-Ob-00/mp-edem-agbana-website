import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Share2, X, MessageCircle, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";
import blogService from "../../services/blogService";
import { cleanupHtml, formatDate, getImageUrl } from "../../utils/blogHelpers";
import SanitizedHtml from "../../components/ui/SanitizedHtml";
import Button from "../../components/ui/button";
import RelatedPosts from "../../components/blog/RelatedPosts";
import BlogPostShare from "../../components/blog/BlogPostShare";

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [portalRoot] = useState(() => {
    if (typeof document === "undefined") return null;
    let existing = document.getElementById("share-root");
    if (!existing) {
      existing = document.createElement("div");
      existing.id = "share-root";
      document.body.appendChild(existing);
    }
    return existing;
  });

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
        <h1 className="mb-4 text-4xl font-bold text-text-primary">Article Not Found</h1>
        <p className="mb-8 text-text-secondary">{error}</p>
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
        <div className="h-100 bg-dark lg:h-125">
          <img src={getImageUrl(post.image)} alt={post.title} className="h-full w-full object-cover opacity-80" />
        </div>
      )}

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <article className={`rounded-2xl bg-surface p-8 shadow-xl lg:p-12 ${post.image ? "-mt-32 relative" : "mt-8"}`}>
          <Link to="/blog" className="mb-8 inline-flex text-sm text-text-muted hover:text-primary">
            Back to all articles
          </Link>

          <div className="mb-6 flex flex-wrap items-center gap-4">
            {post.category && (
              <span className="rounded-full bg-accent/20 px-3 py-1.5 text-sm font-semibold uppercase text-accent">
                {post.category}
              </span>
            )}
            {post.published_at && (
              <span className="text-sm text-text-muted">{formatDate(post.published_at)}</span>
            )}
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-text-primary lg:text-4xl">{post.title}</h1>
          </div>

          {post.author && (
            <div className="mb-8 border-b border-border pb-8">
              <p className="font-semibold text-text-primary">{post.author}</p>
              <p className="text-sm text-text-muted">Author</p>
            </div>
          )}

          {post.excerpt && (
            <p className="mb-8 text-lg font-medium leading-relaxed text-text-secondary">
              {cleanupHtml(post.excerpt)}
            </p>
          )}

          {post.content ? (
            <SanitizedHtml
              html={post.content}
              className="prose prose-slate max-w-none prose-lg"
            />
          ) : (
            <p className="text-text-secondary">{cleanupHtml(post.excerpt || "")}</p>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary">
              Share this article
              <ArrowRight className="h-4 w-4 text-text-muted" />
            </div>
            <button
              type="button"
              onClick={() => setShowShare(true)}
              className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-text-primary hover:bg-border"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>

          {!!tags.length && (
            <div className="mt-12 border-t border-border pt-8">
              <h3 className="mb-3 text-sm font-semibold text-text-primary">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="rounded-full bg-background px-3 py-1 text-sm text-text-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        <RelatedPosts currentId={post.id} category={post.category} />

        <div className="my-16 text-center">
          <Link to="/blog">
            <Button variant="outline">View more articles</Button>
          </Link>
        </div>
      </main>

      {portalRoot && createPortal(
        <>
          {showShare && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
              <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-4 shadow-2xl">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-text-primary">Share this article</p>
                  <button
                    type="button"
                    onClick={() => setShowShare(false)}
                    className="text-text-muted hover:text-text-primary"
                    aria-label="Close share panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <BlogPostShare title={post.title} image={post.image ? getImageUrl(post.image) : null} modal />
              </div>
            </div>
          )}

          <div className="fixed bottom-6 right-6 z-50">
            <a
              href="https://wa.me/?text=Hi%20I%20have%20an%20enquiry%20about%20this%20article"
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-dark/10 hover:bg-primaryLight focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Enquire on WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
        </>,
        portalRoot
      )}
    </div>
  );
}
