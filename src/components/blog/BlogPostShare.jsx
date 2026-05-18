import { useState } from "react";
import Button from "../ui/Button";

export default function BlogPostShare({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const share = (shareUrl) => window.open(shareUrl, "_blank", "width=600,height=400");

  return (
    <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
      <p className="text-sm text-slate-500">Share this article</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => share(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)}>
          Facebook
        </Button>
        <Button variant="outline" onClick={() => share(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || "")}`)}>
          X
        </Button>
        <Button variant="outline" onClick={copyLink}>
          {copied ? "Copied" : "Copy link"}
        </Button>
      </div>
    </div>
  );
}
