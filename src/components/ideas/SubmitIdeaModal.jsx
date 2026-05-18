import { useState } from "react";
import Button from "../ui/Button";
import ideasService from "../../services/ideasService";
import uploadService from "../../services/uploadService";

export default function SubmitIdeaModal({ onSuccess, trigger }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    submitter_name: "",
    submitter_email: "",
    submitter_contact: "",
    location: "",
    documents: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !formData.submitter_name ||
      !formData.submitter_email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      let documentUrl = "";
      if (file) {
        const uploadResponse = await uploadService.uploadFile(file, "ideas", "document");
        documentUrl = uploadResponse?.data?.url || "";
      }

      const payload = {
        ...formData,
        documents: documentUrl ? [documentUrl] : [],
      };

      const response = await ideasService.submitIdea(payload);

      if (response.success) {
        alert("Your idea has been submitted successfully.");
        setOpen(false);
        setFile(null);
        setFormData({
          title: "",
          description: "",
          category: "",
          submitter_name: "",
          submitter_email: "",
          submitter_contact: "",
          location: "",
          documents: [],
        });
        if (onSuccess) onSuccess();
      } else {
        alert(response.message || "Submission failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit idea");
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return trigger ? (
      <div onClick={() => setOpen(true)}>{trigger}</div>
    ) : (
      <Button
        onClick={() => setOpen(true)}
        className="bg-amber-500 text-white hover:bg-amber-600"
      >
        Submit Your Idea
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Submit a Community Idea</h2>
          <p className="text-sm text-gray-500">
            Share your suggestions for improving the constituency.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Project Details
            </h3>

            <div>
              <label className="mb-2 block text-sm font-medium">Idea Title *</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Solar Street Lights for Main Road"
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="environment">Environment</option>
                  <option value="community">Community Development</option>
                  <option value="youth">Youth & Sports</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Expected Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Sefwi Wiawso Central"
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Describe your idea in detail..."
                className="w-full rounded-md border px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Attachment</label>
              <input type="file" onChange={handleFileChange} className="w-full" />
              {file && <p className="mt-2 text-sm text-gray-500">{file.name}</p>}
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              Your Contact Info
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Your Name *</label>
                <input
                  name="submitter_name"
                  value={formData.submitter_name}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email Address *</label>
                <input
                  name="submitter_email"
                  type="email"
                  value={formData.submitter_email}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium">Phone Number</label>
                <input
                  name="submitter_contact"
                  value={formData.submitter_contact}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
