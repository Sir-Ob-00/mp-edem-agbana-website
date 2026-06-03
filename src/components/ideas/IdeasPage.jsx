import { useEffect, useState } from "react";
import Button from "../ui/button";
import IdeasGrid from "./IdeasGrid";
import SubmitIdeaModal from "./SubmitIdeaModal";
import ideasService from "../../services/ideasService";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchIdeas();
  }, []);

  async function fetchIdeas() {
    try {
      setLoading(true);
      const response = await ideasService.getPublicIdeas();
      if (response.success) {
        setIdeas(response.data.ideas || []);
      } else {
        setError(response.message || "Failed to load ideas");
      }
    } catch {
      setError("Failed to load ideas");
    } finally {
      setLoading(false);
    }
  }

  function handleVoteUpdate(id, updates) {
    setIdeas((prev) =>
      prev.map((idea) => (idea.id === id ? { ...idea, ...updates } : idea))
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-linear-to-br from-dark via-darkSoft to-dark text-white">
        <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/90 to-dark/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-accent">
            Public Initiatives
          </p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Community Ideas
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Discover approved projects and initiatives suggested by constituents.
          </p>
        </div>
      </section>

      <div className="py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-8 flex justify-end">
            <SubmitIdeaModal onSuccess={fetchIdeas} />
          </div>

          {loading ? (
            <div className="space-y-6">
              <div className="mb-8 h-8 w-48 animate-pulse rounded bg-border" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-64 w-full animate-pulse rounded-lg bg-background" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="rounded-lg border border-warningBg bg-warningBg p-6 text-center">
              <h3 className="text-lg font-semibold text-warning">Unable to load ideas</h3>
              <p className="mb-4 text-warning">{error}</p>
              <Button
                onClick={fetchIdeas}
                variant="outline"
                className="border-warning text-warning hover:bg-warningBg"
              >
                Try Again
              </Button>
            </div>
          ) : ideas.length === 0 ? (
            <div className="rounded-lg border bg-surface py-12 text-center shadow-sm">
              <h3 className="text-xl font-medium text-text-primary">No ideas to show</h3>
              <p className="text-text-muted">
                There are no approved community ideas to display at the moment.
              </p>
              <div className="mt-6">
                <SubmitIdeaModal
                  onSuccess={fetchIdeas}
                  trigger={
                    <Button variant="accent">
                      Be the first to submit an idea
                    </Button>
                  }
                />
              </div>
            </div>
          ) : (
            <IdeasGrid ideas={ideas} onVoteUpdate={handleVoteUpdate} />
          )}
        </div>
      </div>
    </div>
  );
}
