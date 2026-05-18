import { Link } from "react-router-dom";
import SanitizedHtml from "../ui/SanitizedHtml";
import { formatEventDate, formatEventTime, getImageUrl } from "../../utils/eventHelpers";

export default function EventCard({ event }) {
  return (
    <article className="rounded-3xl border border-white/70 bg-white p-6 shadow-sm hover:shadow-xl transition">
      <Link to={`/events/${event.slug}`}>
        <div className="h-48 overflow-hidden rounded-2xl bg-slate-100">
          {event.image ? (
            <img
              src={getImageUrl(event.image)}
              alt={event.name || event.title || "Event"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No image
            </div>
          )}
        </div>
      </Link>

      <div className="mt-5 flex items-center justify-between gap-2">
        <span className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold uppercase text-emerald-600">
          {event.status === "upcoming" ? "Upcoming" : event.status || "Event"}
        </span>
        <p className="text-sm font-semibold text-slate-400">
          {formatEventDate(event.event_date)}
        </p>
      </div>

      <h3 className="mt-4 line-clamp-2 text-2xl font-semibold text-slate-900">
        {event.name || event.title}
      </h3>

      <SanitizedHtml
        html={event.description || ""}
        className="mt-2 line-clamp-3 text-sm text-slate-600"
      />

      <div className="mt-4 grid gap-2 text-sm text-slate-500">
        {event.start_time && <p>{formatEventTime(event.start_time, event.end_time)}</p>}
        {event.location && <p>{event.location}</p>}
        {event.max_attendees && <p>Up to {event.max_attendees} attendees</p>}
      </div>

      {event.registration_required && (
        <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-700">
          <p className="font-semibold text-amber-800">Registration Required</p>
          <p>Sign up in advance to attend this event.</p>
        </div>
      )}
    </article>
  );
}
