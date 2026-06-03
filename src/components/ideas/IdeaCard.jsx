import { useState } from "react";
import { cleanupHtml, formatIdeaDate, getStatusClasses } from "../../utils/ideaHelpers";
import ideasService from "../../services/ideasService";

export default function IdeaCard({ idea, onVoteUpdate }) {
  const [voting, setVoting] = useState(false);

  async function handleVote(type) {
    try {
      setVoting(true);
      const response = await ideasService.voteIdea(idea.id, type);
      if (response.success && response.data.idea) {
        onVoteUpdate(idea.id, {
          votes: response.data.idea.votes,
          downvotes: response.data.idea.downvotes,
        });
      }
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setVoting(false);
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition hover:shadow-lg">
      <div
        className={`h-2 w-full ${
          idea.status === "implemented" ? "bg-success" : "bg-primary"
        }`}
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-background px-3 py-1 text-xs font-medium text-text-secondary">
            {idea.category}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusClasses(
              idea.status
            )}`}
          >
            {idea.status.replace("_", " ")}
          </span>
        </div>

        <h3 className="mb-3 text-xl font-semibold text-text-primary transition-colors group-hover:text-primary">
          {idea.title}
        </h3>

        <p className="mb-4 flex-1 text-sm text-text-secondary line-clamp-4">
          {cleanupHtml(idea.description || "")}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-text-muted">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleVote("up")}
                disabled={voting}
                className="flex items-center gap-1 hover:text-primary disabled:opacity-50"
              >
                <span>👍</span>
                <span className="font-medium">{idea.votes || 0}</span>
              </button>

              <button
                onClick={() => handleVote("down")}
                disabled={voting}
                className="flex items-center gap-1 hover:text-warning disabled:opacity-50"
              >
                <span>👎</span>
                <span className="font-medium">{idea.downvotes || 0}</span>
              </button>
            </div>

            <span>{formatIdeaDate(idea.created_at)}</span>
          </div>

          {idea.status === "implemented" && (
            <div>
              <div className="mb-1 flex justify-between text-xs font-medium text-success">
                <span>Implemented</span>
                <span>100%</span>
              </div>
              <div className="h-1.5 rounded-full bg-successBg">
                <div className="h-1.5 w-full rounded-full bg-success" />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
