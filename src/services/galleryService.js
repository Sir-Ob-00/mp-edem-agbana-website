const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const galleryService = {
  getGalleries() {
    return apiRequest("/gallery");
  },
  getGallery(idOrSlug) {
    return apiRequest(`/gallery/${idOrSlug}`);
  },
};

export default galleryService;
