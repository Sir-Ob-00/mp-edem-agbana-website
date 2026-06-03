import { cleanupHtml, formatProjectDate, getStatusClasses } from "../../utils/projectHelpers";

export default function ProjectCard({ project, onSelect }) {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(52,98,49,0.15)]"
    >
      <div className="relative h-56 overflow-hidden bg-background">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-muted">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-text-muted">
          <span>{project.sector?.name || "General"}</span>
          <span className={`rounded-full px-2 py-0.5 ${getStatusClasses(project.status)}`}>
            {project.status}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold text-text-primary transition-colors group-hover:text-primary">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-sm text-text-muted">
          {cleanupHtml(project.description || "")}
        </p>

        <hr className="border-border" />

        <div className="grid grid-cols-2 gap-2 text-sm text-text-muted">
          <p>
            <span className="block text-xs font-bold uppercase text-text-muted/70">
              Location
            </span>
            <span
              className="block truncate font-medium text-text-primary"
              title={project.location}
            >
              {project.location}
            </span>
          </p>

          <p className="text-right">
            <span className="block text-xs font-bold uppercase text-text-muted/70">
              Timeline
            </span>
            <span className="font-medium text-text-primary">
              {project.end_date ? formatProjectDate(project.end_date) : "Ongoing"}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
