import AnnouncementCard from "./AnnouncementCard";

export default function AnnouncementList({ announcements }) {
  return (
    <div className="space-y-6">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
