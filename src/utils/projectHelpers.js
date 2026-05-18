export function cleanupHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

export function formatProjectDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function getStatusClasses(status = "") {
  switch (status.toLowerCase()) {
    case "ongoing":
      return "bg-emerald-100 text-emerald-700";
    case "completed":
      return "bg-blue-100 text-blue-700";
    case "planning":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
