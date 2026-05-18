export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_URL || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cleanupHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
