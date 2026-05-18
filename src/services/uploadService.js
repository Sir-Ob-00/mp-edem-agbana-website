const API_BASE = import.meta.env.VITE_API_URL || "";

async function uploadFile(file, folder = "ideas", kind = "document") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);
  formData.append("kind", kind);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Upload failed");
  return data;
}

const uploadService = { uploadFile };

export default uploadService;
