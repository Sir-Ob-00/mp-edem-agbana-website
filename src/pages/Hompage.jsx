import PublicLayout from "./home/PublicLayout";
import AnnouncementPopup from "./home/AnnouncementPopup";
import HeroCarousel from "./home/HeroCarousel";
import AnnouncementSection from "./home/AnnouncementSection";
import ArticlesGrid from "./home/ArticlesGrid";
import ProjectsShowcase from "./home/ProjectsShowcase";
import GalleryPreview from "./home/GalleryPreview";
import EventsList from "./home/EventsList";
import MapPreview from "./home/MapPreview";
import ReportCTA from "./home/ReportCTA";
import VisionMission from "./home/VisionMission";
import FAQAccordion from "./home/FAQAccordion";
import NewsletterForm from "./home/NewsletterForm";
import ContactPanel from "./home/ContactPanel";


export default function HomePage() {
  return (
    <PublicLayout>
      <div className="bg-white text-slate-900">
        <main className="space-y-0">
          <AnnouncementPopup />
          <HeroCarousel />
          <AnnouncementSection />
          <ArticlesGrid />
          <ProjectsShowcase />
          <GalleryPreview />
          <EventsList />
          <MapPreview />
          <ReportCTA />
          <VisionMission />
          <FAQAccordion />
          <NewsletterForm />
          <ContactPanel />
        </main>
      </div>
    </PublicLayout>
  );
}