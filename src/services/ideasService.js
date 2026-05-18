const API_BASE = import.meta.env.VITE_API_URL || "";

async function apiRequest(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

const ideasService = {
  getPublicIdeas(page = 1, limit = 50) {
    return apiRequest(`/ideas/public?page=${page}&limit=${limit}`);
  },

  submitIdea(payload) {
    return apiRequest("/ideas", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  voteIdea(id, voteType = "up") {
    return apiRequest(`/ideas/${id}/vote`, {
      method: "POST",
      body: JSON.stringify({ type: voteType }),
    });
  },
};

export default ideasService;
