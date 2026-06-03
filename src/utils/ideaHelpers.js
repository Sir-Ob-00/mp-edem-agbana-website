export function cleanupHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function formatIdeaDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getStatusClasses(status) {
  switch (status) {
    case "implemented":
      return "bg-success text-white";
    case "approved":
      return "bg-primary text-white";
    case "under_review":
      return "bg-warning text-white";
    case "pending":
      return "bg-text-muted text-white";
    case "rejected":
      return "bg-red-500 text-white";
    default:
      return "bg-text-muted text-white";
  }
}
