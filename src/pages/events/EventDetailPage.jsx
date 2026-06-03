import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import eventsService from "../../services/eventsService";
import SanitizedHtml from "../../components/ui/SanitizedHtml";
import Button from "../../components/ui/button";
import EventDetailSidebar from "../../components/events/EventDetailSidebar";
import { getImageUrl } from "../../utils/eventHelpers";

export default function EventDetailPage() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoading(true);
        const response = await eventsService.getEventBySlug(slug);
        if (response?.success && response?.data?.event) {
          setEvent(response.data.event);
        } else {
          setError("Event not found");
        }
      } catch {
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-white py-20 text-center">Loading...</div>;

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold text-text-primary">Event Not Found</h1>
        <p className="mb-8 text-text-secondary">{error}</p>
        <Link to="/events">
          <Button>Back to Events</Button>
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.event_date);
  const isPast = event.status === "past" || new Date() > eventDate;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-100 bg-dark lg:h-125">
        {event.image ? (
          <img
            src={getImageUrl(event.image)}
            alt={event.name || event.title || "Event image"}
            className="h-full w-full object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-darkSoft" />
        )}
      </div>

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-32 relative mb-12 grid gap-12 rounded-2xl bg-surface p-8 shadow-xl lg:grid-cols-[2fr_1fr] lg:p-12">
          <div className="space-y-8">
            <Link to="/events" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
              Back to all events
            </Link>

            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                    isPast ? "bg-background text-text-muted" : "bg-successBg text-success"
                  }`}
                >
                  {isPast ? "Past Event" : "Upcoming Event"}
                </span>

                {event.registration_required && (
                  <span className="rounded-full bg-warningBg px-3 py-1 text-xs font-semibold uppercase text-warning">
                    Registration Required
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold leading-tight text-text-primary lg:text-4xl">
                {event.name || event.title}
              </h1>
            </div>

            <SanitizedHtml
              html={event.description || ""}
              className="text-lg leading-relaxed text-text-secondary"
            />

            <div className="flex items-center justify-between border-t border-border pt-8">
              <p className="text-sm text-text-muted">Share this event</p>
              <Button variant="outline">Share</Button>
            </div>
          </div>

          <EventDetailSidebar event={event} isPast={isPast} />
        </div>
      </main>
    </div>
  );
}
