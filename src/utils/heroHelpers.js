// heroHelpers.js

import DOMPurify from "dompurify";

// Remove HTML tags and decode entities
export function cleanupHtml(html) {
  if (!html) return "";

  // Browser environment
  if (typeof window !== "undefined") {
    const doc = new DOMParser().parseFromString(
      html,
      "text/html"
    );

    const text = doc.body.textContent || "";

    return text.replace(/<[^>]*>/g, "");
  }

  // SSR fallback
  const decodeEntities = (str) => {
    return str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  };

  const decoded = decodeEntities(html);

  return decoded.replace(/<[^>]*>/g, "");
}

// Decode HTML entities
function decodeEntities(str) {
  if (!str) return "";

  return str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// Sanitize HTML safely
export function sanitizeHtml(html) {
  if (!html) return "";

  try {
    const decoded = decodeEntities(html);

    return DOMPurify.sanitize(decoded, {
      USE_PROFILES: { html: true },
    });
  } catch (err) {
    return cleanupHtml(html);
  }
}