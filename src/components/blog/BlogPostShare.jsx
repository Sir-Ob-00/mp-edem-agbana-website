import { useState } from "react";
import { Share2, Send, Copy, Camera, MessageCircle } from "lucide-react";

export default function BlogPostShare({ title, image = null, modal = false, compact = false }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const share = (shareUrl) => window.open(shareUrl, "_blank", "width=600,height=400");

  const shareItems = [
    {
      key: "facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      bg: "#1877F2",
      Icon: Share2,
    },
    {
      key: "whatsapp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title || ""} ${url}`)}`,
      bg: "#25D366",
      Icon: Send,
    },
    {
      key: "x",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`,
      bg: "#1DA1F2",
      Icon: MessageCircle,
    },
    {
      key: "instagram",
      href: `https://www.instagram.com/`,
      bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
      Icon: Camera,
    },
  ];

  if (!modal && !compact) {
    // inline small bar (left text + right buttons) — keep clickable and accessible
    return (
      <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
        <p className="text-sm text-slate-500">Share this article</p>
        <div className="flex gap-3">
          {shareItems.map((s) => (
            <button
              key={s.key}
              onClick={() => share(s.href)}
              aria-label={`Share on ${s.key}`}
              className="h-10 w-10 flex items-center justify-center rounded-full text-white shadow hover:scale-105 transition-transform"
              style={{ background: s.bg }}
            >
              <s.Icon className="h-4 w-4" />
            </button>
          ))}
          <button
            onClick={copyLink}
            className="ml-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      </div>
    );
  }

  // modal / compact layout used in floating popup
  return (
    <div className={modal ? "w-full" : "w-full"}>
      <div className="mb-3">
        {image && (
          <img src={image} alt={title || ""} className="w-full rounded-2xl object-cover mb-3 h-40" />
        )}
        {title && <h4 className="text-sm font-semibold text-slate-900 line-clamp-2">{title}</h4>}
      </div>

      <div className="flex items-center justify-between gap-3 my-3">
        <div className="flex gap-3">
          {shareItems.map((s) => (
            <button
              key={s.key}
              onClick={() => share(s.href)}
              aria-label={`Share on ${s.key}`}
              className="h-11 w-11 flex items-center justify-center rounded-full text-white shadow hover:scale-105 transition-transform"
              style={{ background: s.bg }}
            >
              <s.Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={copyLink}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-white font-semibold hover:bg-amber-600 transition"
        >
          <Copy className="h-4 w-4" />
          <span>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
