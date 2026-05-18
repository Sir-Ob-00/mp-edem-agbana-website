import { Link } from "react-router-dom";
import SanitizedHtml from "../ui/SanitizedHtml";
import {
  formatAnnouncementDate,
  getImageUrl,
  getPriorityClasses,
} from "../../utils/announcementHelpers";

export default function AnnouncementCard({ announcement }) {
  const borderColor =
    announcement.priority === "urgent"
      ? "#ef4444"
      : announcement.priority === "high"
      ? "#f97316"
      : announcement.priority === "medium"
      ? "#3b82f6"
      : "#6b7280";

  return (
    <article
      className="overflow-hidden rounded-lg border-l-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex flex-col md:flex-row">
        {announcement.image_url && (
          <div className="h-48 w-full shrink-0 bg-gray-100 md:h-auto md:w-64">
            <img
              src={getImageUrl(announcement.image_url)}
              alt={announcement.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border px-3 py-1 text-xs font-medium text-gray-700">
              {announcement.category}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClasses(
                announcement.priority
              )}`}
            >
              {announcement.priority.toUpperCase()}
            </span>

            {announcement.published_at && (
              <span className="ml-auto text-sm text-gray-500">
                {formatAnnouncementDate(announcement.published_at)}
              </span>
            )}
          </div>

          <h3 className="mb-2 text-xl text-gray-900 md:text-2xl">
            {announcement.title}
          </h3>

          <div className="mb-4 line-clamp-3 max-w-none text-gray-600">
            <SanitizedHtml html={announcement.content} />
          </div>

          <div className="flex justify-end">
            <Link
              to={`/announcements/${announcement.slug}`}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Read more
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
