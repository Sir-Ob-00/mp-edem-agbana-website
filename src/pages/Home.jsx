import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import AnnouncementPopup from "../components/home/AnnouncementPopup";
import HeroCarousel from "../components/home/HeroCarousel";
import AnnouncementSection from "../components/home/AnnouncementSection";
import ArticlesGrid from "../components/home/ArticlesGrid";
import ProjectsShowcase from "../components/home/ProjectsShowcase";
import GalleryPreview from "../components/home/GalleryPreview";
import EventsList from "../components/home/EventsList";
import MapPreview from "../components/home/MapPreview";
import ReportCTA from "../components/home/ReportCTA";
import VisionMission from "../components/home/VisionMission";
import FAQAccordion from "../components/home/FAQAccordion";
import NewsletterForm from "../components/home/NewsletterForm";
import ContactPanel from "../components/home/ContactPanel";

export default function Home() {
  return (
    <div>
      <Navbar />

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

      <Footer />
    </div>
  );
}
