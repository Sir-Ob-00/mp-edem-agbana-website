import { useEffect, useMemo, useState } from "react";
import eventsService from "../../services/eventsService";
import EventsHero from "../../components/events/EventsHero";
import EventFilters from "../../components/events/EventFilters";
import EventCard from "../../components/events/EventCard";
import Button from "../../components/ui/button";

const heroStats = [
  { label: "Constituency stops", value: "48", detail: "Since January 2025" },
  { label: "Policy forums", value: "12", detail: "Energy, youth, and health" },
  { label: "Community partners", value: "36", detail: "Traditional, civic, and faith groups" },
  { label: "Volunteer hours", value: "2,400+", detail: "Logged by local teams" },
];

const eventFilters = [
  "All",
  "Community",
  "Parliament",
  "Infrastructure",
  "Education",
  "Politics",
];

const timelineUpdates = [
  {
    id: "timeline-1",
    date: "08 Feb 2025",
    title: "Logistics prep",
    detail: "Advance team surveyed venues and secured interpreters for mixed-language engagements.",
  },
  {
    id: "timeline-2",
    date: "20 Feb 2025",
    title: "Media briefing",
    detail: "Shared progress scorecards with regional press to support transparent reporting.",
  },
  {
    id: "timeline-3",
    date: "05 Mar 2025",
    title: "Volunteer onboarding",
    detail: "Trained 75 new constituency volunteers on data collection for field visits.",
  },
];

export default function EventsListPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await eventsService.getAllEvents(1, 20);
        setEvents(response?.data?.events || []);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (activeFilter === "All") return events;
    return events.filter(
      (event) =>
        event.name?.toLowerCase().includes(activeFilter.toLowerCase()) ||
        event.title?.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [activeFilter, events]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 via-white to-emerald-50 text-slate-900">
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-16">
        <EventsHero
          title="Tracking every field visit, forum, and policy stop"
          description="Follow the engagements across the constituency and Parliament."
          stats={heroStats}
        />

        <section className="rounded-3xl border border-white/70 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                Filter feed
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Browse events by focus area
              </h2>
            </div>
            <EventFilters
              filters={eventFilters}
              activeFilter={activeFilter}
              onSelect={setActiveFilter}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span>{filteredEvents.length} records shown</span>
            <span className="text-slate-300">•</span>
            <span>
              {loading
                ? "Loading events..."
                : events.length === 0
                ? "No events available"
                : "Data synced from live API"}
            </span>
          </div>
        </section>

        {loading ? (
          <div className="py-20 text-center">Loading...</div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-slate-700">No events found</h3>
            <p className="mt-2 text-slate-500">
              Try selecting a different filter or check back later.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/70 bg-white p-8 shadow-sm">
            <h3 className="text-xl font-semibold">Field timeline</h3>
            <p className="mt-2 text-sm text-slate-500">
              We are documenting every logistical note so you can replay how an engagement was prepared.
            </p>

            <div className="mt-6 space-y-6 border-l border-slate-200 pl-6">
              {timelineUpdates.map((update) => (
                <div key={update.id} className="relative">
                  <span className="absolute -left-8.5 top-2 h-3 w-3 rounded-full border-2 border-emerald-500 bg-white" />
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {update.date}
                  </p>
                  <p className="text-base font-semibold text-slate-900">{update.title}</p>
                  <p className="text-sm text-slate-600">{update.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
              Stay updated
            </p>
            <h3 className="mt-4 text-3xl font-semibold">
              Subscribe for event notifications
            </h3>
            <p className="mt-3 text-base text-white/80">
              Get notified about upcoming events, community gatherings, and policy forums.
            </p>
            <Button variant="outline" className="mt-8 border-white/40 px-6 py-3 text-white hover:bg-white/10">
              Download event calendar
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
