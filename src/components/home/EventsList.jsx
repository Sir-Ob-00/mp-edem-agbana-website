import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import eventsService from "../../services/eventsService";
import { Loader2, Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const first = await eventsService.getAllEvents(1, 50);

        if (!first.success) {
          setEvents([]);
          return;
        }

        const pages = first.data.events || [];

        const pagination = first.data.pagination;

        if (pagination?.total_pages && pagination.total_pages > 1) {
          for (let p = 2; p <= pagination.total_pages; p++) {
            try {
              const resp = await eventsService.getAllEvents(p, 50);
              if (resp.success && resp.data.events) {
                pages.push(...resp.data.events);
              }
            } catch (err) {
              console.error("Error fetching events page", p, err);
            }
          }
        }

        setEvents(pages);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  function formatTime(time) {
    if (!time) return "";
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch {
      return time;
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">
              Calendar
            </p>
            <h2 className="text-3xl font-semibold text-slate-900">
              Upcoming Events
            </h2>
            <div className="mt-2 h-1 w-20 bg-red-500" />
          </div>

          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-red-500 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-500">
            Calendar
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Upcoming Events
          </h2>
          <div className="mt-2 h-1 w-20 bg-red-500" />
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <p>No upcoming events scheduled at the moment.</p>
            <p className="text-sm mt-2">
              Check back soon for new announcements!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => {
              const eventDate = new Date(event.event_date);
              const day = format(eventDate, "dd");
              const monthYear = format(eventDate, "MMM yyyy");

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex w-16 flex-col items-center rounded-xl bg-red-600 py-3 text-white">
                    <span className="text-2xl font-bold">{day}</span>
                    <span className="text-xs uppercase tracking-wide">
                      {monthYear}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900">
                      {event.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                      {event.start_time && (
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          {formatTime(event.start_time)}
                        </span>
                      )}

                      {event.location && (
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to="/events"
                    className="hidden sm:flex items-center gap-1 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Details
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-base font-semibold text-slate-700 hover:text-red-600 transition-colors"
          >
            View all events
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default EventsList;