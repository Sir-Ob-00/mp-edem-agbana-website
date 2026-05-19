import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/common/Layout";

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
        {/* Home without layout since it has its own navbar/footer */}
        <Route path="/" element={<Home />} />

        {/* All other routes wrapped with Layout */}
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/gallery"
          element={
            <Layout>
              <GalleryPage />
            </Layout>
          }
        />
        <Route
          path="/ideas"
          element={
            <Layout>
              <IdeasPage />
            </Layout>
          }
        />
        <Route
          path="/projects"
          element={
            <Layout>
              <ProjectsPage />
            </Layout>
          }
        />
        <Route
          path="/youth"
          element={
            <Layout>
              <YouthPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />

        {/* Blog routes */}
        <Route
          path="/blog"
          element={
            <Layout>
              <BlogListPage />
            </Layout>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Layout>
              <BlogPostPage />
            </Layout>
          }
        />

        {/* Event routes */}
        <Route
          path="/events"
          element={
            <Layout>
              <EventListPage />
            </Layout>
          }
        />
        <Route
          path="/events/:slug"
          element={
            <Layout>
              <EventDetailPage />
            </Layout>
          }
        />

        {/* Announcement routes */}
        <Route
          path="/announcement"
          element={
            <Layout>
              <AnnouncementPage />
            </Layout>
          }
        />
        <Route
          path="/announcement/:slug"
          element={
            <Layout>
              <AnnouncementDetailPage />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}