import { cleanupHtml, formatProjectDate, getStatusClasses } from "../../utils/projectHelpers";

export default function ProjectCard({ project, onSelect }) {
  return (
    <article
      onClick={() => onSelect(project)}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>{project.sector?.name || "General"}</span>
          <span className={`rounded-full px-2 py-0.5 ${getStatusClasses(project.status)}`}>
            {project.status}
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-semibold text-slate-900 transition-colors group-hover:text-red-700">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-sm text-slate-500">
          {cleanupHtml(project.description || "")}
        </p>

        <hr className="border-slate-100" />

        <div className="grid grid-cols-2 gap-2 text-sm text-slate-500">
          <p>
            <span className="block text-xs font-bold uppercase text-slate-400">
              Location
            </span>
            <span
              className="block truncate font-medium text-slate-700"
              title={project.location}
            >
              {project.location}
            </span>
          </p>

          <p className="text-right">
            <span className="block text-xs font-bold uppercase text-slate-400">
              Timeline
            </span>
            <span className="font-medium text-slate-700">
              {project.end_date ? formatProjectDate(project.end_date) : "Ongoing"}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
