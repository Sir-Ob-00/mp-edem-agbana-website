import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../components/ui/Button";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryGrid from "../components/gallery/GalleryGrid";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import galleryService from "../services/galleryService";

export default function GalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    const slug = searchParams.get("slug");
    if (slug && galleries.length > 0) {
      const gallery = galleries.find((g) => g.slug === slug);
      if (gallery) setSelectedItem(gallery);
    }
  }, [galleries, searchParams]);

  async function fetchGalleries() {
    try {
      setLoading(true);
      const response = await galleryService.getGalleries();
      if (response.success && response.data.galleries) {
        setGalleries(response.data.galleries);
      } else {
        setError(response.message || "Failed to load galleries");
      }
    } catch {
      setError("An unexpected error occurred while loading our moments.");
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return galleries;
    return galleries.filter((item) => item.category === activeCategory);
  }, [galleries, activeCategory]);

  const openLightbox = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30">
      <GalleryHero />

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
          <p>Bringing our moments to life...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
          <p className="max-w-md text-slate-600">{error}</p>
          <Button
            onClick={fetchGalleries}
            variant="outline"
            className="mt-6 border-emerald-500 text-emerald-600 hover:bg-emerald-50"
          >
            Reload Gallery
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          <GalleryFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            total={filteredItems.length}
          />
          <GalleryGrid items={filteredItems} onOpen={openLightbox} />
        </>
      )}

      <GalleryLightbox
        selectedItem={selectedItem}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        onClose={closeLightbox}
      />
    </div>
  );
}
