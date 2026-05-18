export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_URL || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatAnnouncementDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getPriorityClasses(priority) {
  switch (priority) {
    case "urgent":
      return "bg-red-500 text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-blue-500 text-white";
    case "low":
      return "bg-gray-500 text-white";
    default:
      return "bg-blue-500 text-white";
  }
}
