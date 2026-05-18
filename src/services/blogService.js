const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const blogService = {
  getAllPosts(page = 1, limit = 9) {
    return apiRequest(`/blog?page=${page}&limit=${limit}`);
  },
  getFeaturedPosts(limit = 3) {
    return apiRequest(`/blog/featured?limit=${limit}`);
  },
  getPostBySlug(slug) {
    return apiRequest(`/blog/${slug}`);
  },
};

export default blogService;
