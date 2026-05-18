const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const eventsService = {
  getAllEvents(page = 1, limit = 20) {
    return apiRequest(`/events?page=${page}&limit=${limit}`);
  },
  getUpcomingEvents(limit = 5) {
    return apiRequest(`/events/upcoming?limit=${limit}`);
  },
  getEventBySlug(slug) {
    return apiRequest(`/events/${slug}`);
  },
};

export default eventsService;
