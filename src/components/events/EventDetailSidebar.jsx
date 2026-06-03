import Button from "../ui/button";
import { formatEventDate, formatEventTime } from "../../utils/eventHelpers";

export default function EventDetailSidebar({ event, isPast }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-background p-6">
        <h3 className="font-semibold text-text-primary">Event Details</h3>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-sm font-medium text-text-primary">Date</p>
            <p className="text-text-secondary">
              {formatEventDate(event.event_date, {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">Time</p>
            <p className="text-text-secondary">
              {formatEventTime(event.start_time, event.end_time)}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-text-primary">Location</p>
            <p className="text-text-secondary">{event.location}</p>
          </div>

          {event.max_attendees && (
            <div>
              <p className="text-sm font-medium text-text-primary">Capacity</p>
              <p className="text-text-secondary">{event.max_attendees} People</p>
            </div>
          )}
        </div>

        {!isPast && event.registration_required && (
          <Button className="mt-6 w-full">Register Now</Button>
        )}

        {isPast && (
          <Button disabled className="mt-6 w-full bg-border text-text-muted hover:bg-border">
            Event Concluded
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-primarySoft/30 bg-primarySoft/10 p-6">
        <p className="font-semibold text-sm text-primary">Community Focus</p>
        <p className="mt-1 text-xs text-primary/80">
          This event aligns with our commitment to transparent and inclusive governance.
        </p>
      </div>
    </div>
  );
}
