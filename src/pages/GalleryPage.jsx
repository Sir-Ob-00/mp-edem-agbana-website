import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Images } from "lucide-react";
import Button from "../components/ui/button";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryFilters from "../components/gallery/GalleryFilters";
import GalleryLightbox from "../components/gallery/GalleryLightbox";
import galleryService from "../services/galleryService";
import { cleanupHtml, getImageUrl } from "../utils/blogHelpers";

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
    <div className="min-h-screen bg-background">
      <GalleryHero />

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-text-muted">
          <p>Bringing our moments to life...</p>
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
          <p className="max-w-md text-text-secondary">{error}</p>
          <Button
            onClick={fetchGalleries}
            variant="outline"
            className="mt-6 border-primary text-primary hover:bg-primary/10"
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
          <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => {
                const mod = index % 4;
                const isLarge = mod === 0 || mod === 3;

                return (
                  <div
                    key={item.id}
                    onClick={() => openLightbox(item)}
                    className={`group cursor-pointer overflow-hidden rounded-2xl bg-surface shadow-sm transition-all duration-300 hover:shadow-xl ${
                      isLarge ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden bg-background ${
                        isLarge
                          ? "h-64 sm:h-72 lg:h-[460px]"
                          : "h-48 sm:h-52 lg:h-56"
                      }`}
                    >
                      {item.cover_image ? (
                        <img
                          src={getImageUrl(item.cover_image)}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-text-muted">
                          No image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
                        {item.category}
                      </span>

                      <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
                        <Images className="h-3.5 w-3.5" />
                        {item.images?.length || 1}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                        <h3 className="line-clamp-2 text-lg font-bold text-white leading-tight lg:text-xl">
                          {item.title}
                        </h3>
                        <span className="mt-1.5 block text-xs text-white/70">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
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
