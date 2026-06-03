import { useEffect, useState } from "react";
import announcementsService from "../../services/announcementsService";
import { Link } from "react-router-dom";
import SanitizedHtml from "../ui/SanitizedHtml";
import { Calendar, ArrowRight } from "lucide-react";

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await announcementsService.getPublicAnnouncements({
          limit: 4,
        });
        if (response.success) {
          setAnnouncements(response.data.announcements);
        }
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading || announcements.length === 0) {
    return null;
  }

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-warningBg text-warning";
      case "high":
        return "bg-warningBg text-warning";
      default:
        return "bg-infoBg text-info";
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-2">
              Latest Announcements
            </h2>
            <div className="h-1 w-20 bg-primary rounded"></div>
          </div>
          <Link
            to="/announcement"
            className="hidden md:flex items-center text-primary font-medium hover:text-primaryLight transition-colors"
          >
            View All Announcements <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-border flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getPriorityClass(
                    announcement.priority
                  )}`}
                >
                  {announcement.priority}
                </span>
                <div className="flex items-center text-text-muted text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  {announcement.published_at
                    ? new Date(announcement.published_at).toLocaleDateString()
                    : "Recent"}
                </div>
              </div>

              <h3 className="font-bold text-text-primary mb-3 line-clamp-2">
                {announcement.title}
              </h3>

              <SanitizedHtml
                html={announcement.content}
                className="text-text-secondary text-sm mb-4 grow line-clamp-3"
              />

              <Link
                to={
                  announcement.slug
                    ? `/announcement/${announcement.slug}`
                    : "/announcement"
                }
                className="text-primary hover:text-primaryLight text-sm font-medium flex items-center mt-auto"
              >
                Read More <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/announcement"
            className="inline-flex items-center text-primary font-medium hover:text-primaryLight transition-colors"
          >
            View All Announcements <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}