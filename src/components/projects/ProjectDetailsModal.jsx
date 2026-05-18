import Button from "../ui/Button";
import SanitizedHtml from "../ui/SanitizedHtml";
import { formatProjectDate, getStatusClasses } from "../../utils/projectHelpers";

export default function ProjectDetailsModal({ project, isOpen, onClose }) {
  if (!project || !isOpen) return null;

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/projects/${project.slug}`
      : "";

  const shareText = `Check out this project: ${project.title}`;

  const shareLinks = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(project.title)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-slate-500 hover:text-red-500"
        >
          Close
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="relative h-64 bg-slate-100 md:h-auto md:w-2/5">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                No Image Available
              </div>
            )}

            <div className="absolute left-4 top-4">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide shadow-sm ${getStatusClasses(project.status)}`}
              >
                {project.status}
              </span>
            </div>
          </div>

          <div className="flex-1 p-6 sm:p-8">
            <div className="mb-6">
              <div className="mb-2 text-sm font-medium text-emerald-600">
                {project.sector?.name || "General Sector"}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {project.title}
              </h2>
            </div>

            <div className="mb-8 grid gap-4 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                {formatProjectDate(project.start_date)}
                {project.end_date
                  ? ` - ${formatProjectDate(project.end_date)}`
                  : " - Ongoing"}
              </div>
              <div>{project.location}</div>
            </div>

            <div className="mb-8 max-w-none">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                About this Project
              </h3>
              {project.description ? (
                <SanitizedHtml
                  html={project.description}
                  className="whitespace-pre-wrap leading-relaxed text-slate-600"
                />
              ) : (
                <p className="leading-relaxed text-slate-600">
                  No description available.
                </p>
              )}
            </div>

            {project.progress_percent !== undefined && (
              <div className="mb-8">
                <div className="mb-2 flex justify-between text-sm font-medium">
                  <span>Progress</span>
                  <span>{project.progress_percent}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${project.progress_percent}%` }}
                  />
                </div>
              </div>
            )}

            <div className="border-t border-slate-100 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">
                  Share Project
                </span>
                <div className="flex gap-2">
                  {shareLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-500 hover:text-slate-900"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
