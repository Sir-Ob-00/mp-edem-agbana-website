const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const projectsService = {
  getPublicProjects(params = {}) {
    const query = new URLSearchParams();
    if (params.status) query.append("status", params.status);
    if (params.sector) query.append("sector", String(params.sector));
    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));

    return apiRequest(`/projects?${query.toString()}`);
  },

  getFeaturedProjects(limit = 6) {
    return apiRequest(`/projects/featured?limit=${limit}`);
  },

  getProjectBySlug(slug) {
    return apiRequest(`/projects/${slug}`);
  },
};

export default projectsService;
