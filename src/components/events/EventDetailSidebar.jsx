import Button from "../ui/button";
import { formatEventDate, formatEventTime } from "../../utils/eventHelpers";

export default function EventDetailSidebar({ event, isPast }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h3 className="font-semibold text-slate-900">Event Details</h3>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-900">Date</p>
            <p className="text-slate-600">
              {formatEventDate(event.event_date, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">Time</p>
            <p className="text-slate-600">
              {formatEventTime(event.start_time, event.end_time)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-900">Location</p>
            <p className="text-slate-600">{event.location}</p>
          </div>

          {event.max_attendees && (
            <div>
              <p className="text-sm font-medium text-slate-900">Capacity</p>
              <p className="text-slate-600">{event.max_attendees} People</p>
            </div>
          )}
        </div>

        {!isPast && event.registration_required && (
          <Button className="mt-6 w-full">Register Now</Button>
        )}

        {isPast && (
          <Button disabled className="mt-6 w-full bg-slate-200 text-slate-500 hover:bg-slate-200">
            Event Concluded
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
        <p className="font-semibold text-sm text-emerald-900">Community Focus</p>
        <p className="mt-1 text-xs text-emerald-800">
          This event aligns with our commitment to transparent and inclusive governance.
        </p>
      </div>
    </div>
  );
}
