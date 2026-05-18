export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_URL || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatEventDate(dateString, options) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", options || {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatEventTime(start, end) {
  if (!start) return "";
  return end ? `${start} - ${end}` : start;
}
