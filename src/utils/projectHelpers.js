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
      return "bg-successBg text-success";
    case "completed":
      return "bg-primary/10 text-primary";
    case "planning":
      return "bg-warningBg text-warning";
    default:
      return "bg-background text-text-muted";
  }
}
