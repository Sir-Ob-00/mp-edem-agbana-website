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
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-gray-200" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 w-full animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <section className="relative bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-slate-900/70" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-amber-400">
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
            <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
              <h3 className="text-lg font-semibold text-red-700">
                Unable to load announcements
              </h3>
              <p className="mb-4 text-red-600">{error}</p>
              <Button
                onClick={fetchAnnouncements}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                Try Again
              </Button>
            </div>
          ) : announcements.length === 0 ? (
            <div className="rounded-lg border bg-white py-12 text-center shadow-sm">
              <h3 className="text-xl font-medium text-gray-900">No announcements yet</h3>
              <p className="text-gray-500">Check back later for updates.</p>
            </div>
          ) : (
            <AnnouncementList announcements={announcements} />
          )}
        </div>
      </div>
    </div>
  );
}
