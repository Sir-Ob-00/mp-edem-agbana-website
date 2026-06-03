import { useEffect, useState } from "react";
import Button from "../../components/ui/button";
import AnnouncementList from "../../components/announcements/AnnouncementList";
import announcementsService from "../../services/announcementsService";

export default function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      setLoading(true);
      const response = await announcementsService.getPublicAnnouncements();
      if (response.success) {
        setAnnouncements(response.data.announcements || []);
      } else {
        setError(response.message || "Failed to load announcements");
      }
    } catch {
      setError("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto space-y-6 px-4 py-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-border" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 w-full animate-pulse rounded-lg bg-border" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative bg-linear-to-br from-dark via-darkSoft to-dark text-white">
        <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/90 to-dark/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-accent">
            Community Updates
          </p>
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Latest Announcements
          </h1>
          <p className="max-w-2xl text-lg text-white/80">
            Stay informed about important updates, news, and events in our community.
          </p>
        </div>
      </section>

      <div className="py-12">
        <div className="container mx-auto max-w-5xl px-4">
          {error ? (
            <div className="rounded-lg border border-warningBg bg-warningBg p-6 text-center">
              <h3 className="text-lg font-semibold text-warning">
                Unable to load announcements
              </h3>
              <p className="mb-4 text-warning">{error}</p>
              <Button
                onClick={fetchAnnouncements}
                variant="outline"
                className="border-warning text-warning hover:bg-warningBg"
              >
                Try Again
              </Button>
            </div>
          ) : announcements.length === 0 ? (
            <div className="rounded-lg border bg-surface py-12 text-center shadow-sm">
              <h3 className="text-xl font-medium text-text-primary">No announcements yet</h3>
              <p className="text-text-muted">Check back later for updates.</p>
            </div>
          ) : (
            <AnnouncementList announcements={announcements} />
          )}
        </div>
      </div>
    </div>
  );
}
