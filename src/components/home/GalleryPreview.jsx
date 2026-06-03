import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Images, Calendar, Loader2 } from "lucide-react";
import galleryService from "../../services/galleryService";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function GalleryPreview() {
  const [galleries, setGalleries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await galleryService.getGalleries();
        if (response.success) {
          const sorted = response.data.galleries
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 4);
          setGalleries(sorted);
        } else {
          setError("Failed to load gallery items.");
        }
      } catch (err) {
        console.error("Error fetching gallery preview:", err);
        setError("Could not load gallery preview.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-background py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-text-muted">Loading moments...</p>
        </div>
      </section>
    );
  }

  if (error || galleries.length === 0) return null;

  const featured = galleries[0];
  const others = galleries.slice(1, 4);

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">
            Photo Gallery
          </p>
          <h2 className="text-3xl font-semibold text-text-primary">
            Recent Moments
          </h2>
          <div className="mt-2 h-1 w-20 bg-primary" />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Featured — spans 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl bg-surface shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/gallery?slug=${featured.slug}`}>
                <div className="relative min-h-[360px] sm:min-h-[400px] lg:min-h-[500px] bg-background">
                  {featured.cover_image ? (
                    <img
                      src={featured.cover_image}
                      alt={featured.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-text-muted">
                      <Images className="h-10 w-10 opacity-50" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Category badge — top-left */}
                  <span className="absolute top-4 left-4 bg-white/90 text-primary px-3 py-1 rounded-full text-xs font-semibold shadow">
                    {featured.category}
                  </span>

                  {/* Image count badge — top-right */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow">
                    <Images className="h-3.5 w-3.5" />
                    {featured.images ? featured.images.length + 1 : 1}
                  </div>

                  {/* Title + date overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 lg:p-6">
                    <h3 className="text-white font-bold text-xl lg:text-2xl line-clamp-2 leading-tight">
                      {featured.title}
                    </h3>
                    <span className="flex items-center gap-1.5 text-white/70 text-xs mt-2">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(featured.date)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Supporting cards — stacked right */}
          <div className="flex flex-col gap-5">
            {others.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-surface shadow-md hover:shadow-lg transition-all duration-300 flex-1"
              >
                <Link to={`/gallery?slug=${item.slug}`}>
                  <div className="relative h-36 sm:h-44 lg:h-full min-h-[140px] bg-background">
                    {item.cover_image ? (
                      <img
                        src={item.cover_image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-text-muted">
                        <Images className="h-6 w-6 opacity-50" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category badge — top-left */}
                    <span className="absolute top-3 left-3 bg-white/90 text-primary px-2.5 py-0.5 rounded-full text-xs font-semibold shadow">
                      {item.category}
                    </span>

                    {/* Image count badge — top-right */}
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 shadow">
                      <Images className="h-3 w-3" />
                      {item.images ? item.images.length + 1 : 1}
                    </div>

                    {/* Title overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-3">
                      <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1 leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-base font-semibold text-text-primary hover:text-primary transition-colors"
          >
            View full gallery
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GalleryPreview;