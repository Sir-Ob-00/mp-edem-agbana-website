const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const announcementsService = {
  getPublicAnnouncements(params = {}) {
    const query = new URLSearchParams();
    if (params.priority) query.append("priority", params.priority);
    if (params.category) query.append("category", params.category);
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));

    return apiRequest(`/announcements/public?${query.toString()}`);
  },

  getAnnouncementBySlug(slug) {
    return apiRequest(`/announcements/${slug}`);
  },
};

export default announcementsService;
