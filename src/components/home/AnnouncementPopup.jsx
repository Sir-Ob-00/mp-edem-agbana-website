import { useEffect, useState } from "react";
import announcementsService from "../../services/announcementsService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import Button from "../ui/button";
import SanitizedHtml from "../ui/SanitizedHtml";
import { Bell } from "lucide-react";

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    const checkAnnouncements = async () => {
      try {
        const response = await announcementsService.getPublicAnnouncements();
        if (response.success && response.data.announcements) {
          const urgentAnnouncement = response.data.announcements.find(
            (ann) => ann.priority === "urgent"
          );

          if (urgentAnnouncement) {
            const seenKey = `seen_announcement_${urgentAnnouncement.id}`;
            if (!sessionStorage.getItem(seenKey)) {
              setAnnouncement(urgentAnnouncement);
              setTimeout(() => setOpen(true), 2000);
            }
          }
        }
      } catch (error) {
        console.error("Failed to check announcements", error);
      }
    };

    checkAnnouncements();
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (announcement) {
      sessionStorage.setItem(`seen_announcement_${announcement.id}`, "true");
    }
  };

  if (!announcement) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <div className="mx-auto bg-red-100 p-3 rounded-full w-fit">
            <Bell className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl text-red-700">
            {announcement.title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          <SanitizedHtml
            html={announcement.content}
            className="text-center text-gray-600"
          />
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="default"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            onClick={handleClose}
          >
            Acknowledge & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}