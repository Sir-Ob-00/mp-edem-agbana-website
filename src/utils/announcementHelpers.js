/**
 * Announcement Utilities
 * Helper functions for working with announcements
 */

/**
 * Get image URL with fallback and API base URL support
 * @param {string} path - Image path from API
 * @returns {string} Complete image URL
 */
export function getImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = import.meta.env.VITE_API_URL || "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Format announcement date to readable format
 * @param {string} dateString - ISO 8601 date string
 * @returns {string} Formatted date (e.g., "Jan 15, 2024")
 */
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

/**
 * Format date and time together
 * @param {string} dateString - ISO 8601 date string
 * @returns {string} Formatted date and time (e.g., "Jan 15, 2024 at 2:30 PM")
 */
export function formatAnnouncementDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Get CSS classes for priority badge
 * Tailwind classes for visual priority indication
 * @param {string} priority - Priority level (low, medium, high, urgent)
 * @returns {string} Tailwind CSS classes
 */
export function getPriorityClasses(priority) {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-700";
    case "high":
      return "bg-orange-100 text-orange-700";
    case "medium":
      return "bg-blue-100 text-blue-700";
    case "low":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
}

/**
 * Get icon/emoji for priority level
 * @param {string} priority - Priority level
 * @returns {string} Emoji representation
 */
export function getPriorityIcon(priority) {
  switch (priority) {
    case "urgent":
      return "🚨";
    case "high":
      return "⚠️";
    case "medium":
      return "ℹ️";
    case "low":
      return "💡";
    default:
      return "ℹ️";
  }
}

/**
 * Get hex color for priority level
 * @param {string} priority - Priority level
 * @returns {string} Hex color code
 */
export function getPriorityColor(priority) {
  switch (priority) {
    case "urgent":
      return "#ef4444"; // red-500
    case "high":
      return "#f97316"; // orange-500
    case "medium":
      return "#3b82f6"; // blue-500
    case "low":
      return "#6b7280"; // gray-500
    default:
      return "#6b7280";
  }
}

/**
 * Get CSS classes for status badge
 * @param {string} status - Status (draft, published, archived)
 * @returns {string} Tailwind CSS classes
 */
export function getStatusClasses(status) {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-700";
    case "draft":
      return "bg-yellow-100 text-yellow-700";
    case "archived":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

/**
 * Check if announcement is expired
 * @param {string} expiryDate - ISO 8601 expiry date
 * @returns {boolean} True if announcement has expired
 */
export function isAnnouncementExpired(expiryDate) {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

/**
 * Check if announcement is scheduled for future publication
 * @param {string} publishDate - ISO 8601 publish date
 * @returns {boolean} True if publish date has passed or no date set
 */
export function shouldPublish(publishDate) {
  if (!publishDate) return true;
  return new Date(publishDate) <= new Date();
}

/**
 * Extract plain text summary from HTML content
 * @param {string} html - HTML content
 * @param {number} length - Maximum length (default: 150 characters)
 * @returns {string} Plain text excerpt
 */
export function extractSummary(html, length = 150) {
  if (!html) return "";
  
  // Remove HTML tags
  const plainText = html.replace(/<[^>]*>/g, "");
  
  // Decode common HTML entities
  const decoded = plainText
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  
  // Trim and truncate
  const trimmed = decoded.trim();
  return trimmed.length > length ? trimmed.substring(0, length) + "..." : trimmed;
}

/**
 * Format category name for display
 * @param {string} category - Category slug
 * @returns {string} Formatted category name
 */
export function formatCategory(category) {
  if (!category) return "";
  return category
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Get available categories
 * @returns {Object[]} Array of category objects with value and label
 */
export function getAvailableCategories() {
  return [
    { value: "general", label: "General" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "employment", label: "Employment" },
    { value: "events", label: "Events" },
    { value: "emergency", label: "Emergency" },
  ];
}

/**
 * Get available priority levels
 * @returns {Object[]} Array of priority objects with value and label
 */
export function getPriorityLevels() {
  return [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "urgent", label: "Urgent" },
  ];
}

/**
 * Get available announcement statuses
 * @returns {Object[]} Array of status objects with value and label
 */
export function getAnnouncementStatuses() {
  return [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];
}

/**
 * Sort announcements by date (newest first by default)
 * @param {Object[]} announcements - Array of announcements
 * @param {string} dateField - Field to sort by (default: 'published_at')
 * @param {boolean} ascending - Sort ascending (default: false = descending/newest first)
 * @returns {Object[]} Sorted announcements
 */
export function sortAnnouncementsByDate(
  announcements,
  dateField = "published_at",
  ascending = false,
) {
  return [...announcements].sort((a, b) => {
    const dateA = new Date(a[dateField] || a.created_at);
    const dateB = new Date(b[dateField] || b.created_at);
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

/**
 * Filter announcements by priority
 * @param {Object[]} announcements - Array of announcements
 * @param {string} priority - Priority to filter by
 * @returns {Object[]} Filtered announcements
 */
export function filterByPriority(announcements, priority) {
  return announcements.filter((a) => a.priority === priority);
}

/**
 * Filter announcements by category
 * @param {Object[]} announcements - Array of announcements
 * @param {string} category - Category to filter by
 * @returns {Object[]} Filtered announcements
 */
export function filterByCategory(announcements, category) {
  return announcements.filter((a) => a.category === category);
}

/**
 * Filter announcements by status
 * @param {Object[]} announcements - Array of announcements
 * @param {string} status - Status to filter by
 * @returns {Object[]} Filtered announcements
 */
export function filterByStatus(announcements, status) {
  return announcements.filter((a) => a.status === status);
}

/**
 * Get only urgent announcements
 * @param {Object[]} announcements - Array of announcements
 * @returns {Object[]} Only urgent priority announcements
 */
export function getUrgentAnnouncements(announcements) {
  return filterByPriority(announcements, "urgent");
}

/**
 * Get only published announcements
 * @param {Object[]} announcements - Array of announcements
 * @returns {Object[]} Only published announcements
 */
export function getPublishedAnnouncements(announcements) {
  return filterByStatus(announcements, "published");
}
