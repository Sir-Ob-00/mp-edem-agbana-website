import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import GalleryPage from "../pages/GalleryPage";
import IdeasPage from "../pages/IdeasPage";
import ProjectsPage from "../pages/ProjectsPage";
import YouthPage from "../pages/YouthPage";
import ContactPage from "../pages/ContactPage";

import BlogListPage from "../pages/blog/BlogListPage";
import BlogPostPage from "../pages/blog/BlogPostPage";

import EventListPage from "../pages/events/EventListPage";
import EventDetailPage from "../pages/events/EventDetailPage";

import AnnouncementPage from "../pages/announcement/AnnouncementPage";
import AnnouncementDetailPage from "../pages/announcement/AnnouncementDetailPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Core pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/ideas" element={<IdeasPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/youth" element={<YouthPage />} />
        <Route path="/contact" element={<ContactPage />} />


        {/* Blog routes */}
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Event routes */}
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/:slug" element={<EventDetailPage />} />

        {/* Announcement module */}
        <Route path="/announcement" element={<AnnouncementPage />} />
        <Route path="/announcement/:slug" element={<AnnouncementDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}