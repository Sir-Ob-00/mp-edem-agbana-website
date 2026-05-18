import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import DOMPurify from "dompurify";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("data:")) return path;

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  let apiOrigin = "";
  try {
    apiOrigin = new URL(apiUrl).origin;
  } catch {
    return path;
  }

  if (path.startsWith("http")) {
    if (path.includes("/uploads/")) {
      const relativePath = path.substring(path.indexOf("/uploads/"));
      return `${apiOrigin}${relativePath}`;
    }
    return path;
  }

  return `${apiOrigin}/${path.replace(/^\/+/, "")}`;
}

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

export function cleanupHtml(html) {
  if (!html) return "";
  const decoded = decodeEntities(html);
  return decoded.replace(/<[^>]*>/g, "");
}

export function sanitizeHtml(html) {
  if (!html) return "";

  try {
    const decoded = decodeEntities(html);
    return DOMPurify.sanitize(decoded, { USE_PROFILES: { html: true } });
  } catch {
    return cleanupHtml(html);
  }
}