import IdeaCard from "./IdeaCard";

export default function IdeasGrid({ ideas, onVoteUpdate }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onVoteUpdate={onVoteUpdate} />
      ))}
    </div>
  );
}
