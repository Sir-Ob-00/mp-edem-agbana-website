import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import SanitizedHtml from "../../components/ui/SanitizedHtml";
import announcementsService from "../../services/announcementsService";
import {
  formatAnnouncementDate,
  getImageUrl,
} from "../../utils/announcementHelpers";

export default function AnnouncementDetailPage() {
  const { slug } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnnouncement() {
      if (!slug) return;

      try {
        setLoading(true);
        const response = await announcementsService.getAnnouncementBySlug(slug);
        if (response.success && response.data.announcement) {
          setAnnouncement(response.data.announcement);
        } else {
          setError("Announcement not found");
        }
      } catch {
        setError("Failed to load announcement");
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncement();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        Loading...
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900">
            Announcement Not Found
          </h1>
          <p className="mb-8 text-slate-600">
            {error || "The announcement you're looking for doesn't exist."}
          </p>
          <Link to="/announcements">
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Back to Announcements
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {announcement.image_url && (
        <div className="relative h-[320px] bg-slate-900 lg:h-[420px]">
          <img
            src={getImageUrl(announcement.image_url)}
            alt={announcement.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>
      )}

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <article
          className={`rounded-2xl bg-white p-6 shadow-xl md:p-10 ${
            announcement.image_url ? "-mt-24 relative" : ""
          }`}
        >
          <Link
            to="/announcements"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-600"
          >
            Back to all announcements
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              {announcement.category}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                announcement.priority === "urgent"
                  ? "bg-red-100 text-red-700"
                  : announcement.priority === "high"
                  ? "bg-orange-100 text-orange-700"
                  : announcement.priority === "medium"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {announcement.priority}
            </span>

            {announcement.published_at && (
              <span className="ml-auto text-sm text-slate-500">
                {formatAnnouncementDate(announcement.published_at)}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {announcement.title}
          </h1>

          <SanitizedHtml
            html={announcement.content}
            className="prose prose-slate max-w-none prose-lg"
          />
        </article>
      </main>
    </div>
  );
}
