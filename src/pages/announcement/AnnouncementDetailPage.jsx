import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/ui/button";
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
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-surface">
        <div className="px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold text-text-primary">
            Announcement Not Found
          </h1>
          <p className="mb-8 text-text-secondary">
            {error || "The announcement you're looking for doesn't exist."}
          </p>
          <Link to="/announcement">
            <Button variant="primary">
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
        <div className="relative h-80 bg-dark lg:h-105">
          <img
            src={getImageUrl(announcement.image_url)}
            alt={announcement.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/50 to-transparent" />
        </div>
      )}

      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <article
          className={`rounded-2xl bg-surface p-6 shadow-xl md:p-10 ${
            announcement.image_url ? "-mt-24 relative" : ""
          }`}
        >
          <Link
            to="/announcement"
            className="mb-6 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
          >
            Back to all announcements
          </Link>

          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold uppercase tracking-wider text-primary">
              {announcement.category}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                announcement.priority === "urgent"
                  ? "bg-warningBg text-warning"
                  : announcement.priority === "high"
                  ? "bg-warningBg text-warning"
                  : announcement.priority === "medium"
                  ? "bg-infoBg text-info"
                  : "bg-border text-text-muted"
              }`}
            >
              {announcement.priority}
            </span>

            {announcement.published_at && (
              <span className="ml-auto text-sm text-text-muted">
                {formatAnnouncementDate(announcement.published_at)}
              </span>
            )}
          </div>

          <h1 className="mb-6 text-3xl font-bold leading-tight text-text-primary md:text-4xl">
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
