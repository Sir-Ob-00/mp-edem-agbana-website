const API_BASE =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_PUBLIC_API_BASE_URL ||
  "";

const API_TOKEN = import.meta.env.VITE_PUBLIC_API_TOKEN || "";

async function submitYouthRegistration(payload) {
  const res = await fetch(`${API_BASE}/youth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "We could not save your details.");
  }

  return data;
}

const youthService = { submitYouthRegistration };

export default youthService;
