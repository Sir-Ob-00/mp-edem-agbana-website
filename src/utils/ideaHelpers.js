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
      return "bg-green-500 text-white";
    case "approved":
      return "bg-blue-500 text-white";
    case "under_review":
      return "bg-yellow-500 text-white";
    case "pending":
      return "bg-slate-500 text-white";
    case "rejected":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
