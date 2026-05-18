import { useEffect } from "react";
import Button from "../ui/Button";
import { cleanupHtml, getImageUrl } from "../../utils/blogHelpers";

export default function GalleryLightbox({
  selectedItem,
  currentImageIndex,
  setCurrentImageIndex,
  onClose,
}) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (!selectedItem) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === selectedItem.images.length - 1 ? 0 : prev + 1
        );
      }
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? selectedItem.images.length - 1 : prev - 1
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, setCurrentImageIndex, onClose]);

  if (!selectedItem) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  const currentImage = selectedItem.images[currentImageIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-50 p-2 text-white/80 hover:text-white"
      >
        Close
      </button>

      <div
        className="relative mx-4 w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 text-center">
          <h2 className="mb-2 text-2xl font-bold text-white">
            {selectedItem.title}
          </h2>
          <p className="text-sm text-white/70">
            {selectedItem.date} • {selectedItem.location}
          </p>
          <p className="mt-1 text-xs text-white/50">
            {currentImageIndex + 1} of {selectedItem.images.length} photos
          </p>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-black">
          <div className="relative flex h-[60vh] items-center justify-center">
            <img
              src={getImageUrl(currentImage.url)}
              alt={currentImage.caption}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-center text-sm text-white">
              {cleanupHtml(currentImage.caption || "")}
            </p>
          </div>

          {selectedItem.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
              >
                Prev
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
              >
                Next
              </button>
            </>
          )}
        </div>

        {selectedItem.images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto py-2">
            {selectedItem.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  currentImageIndex === index
                    ? "border-emerald-500 opacity-100"
                    : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  src={getImageUrl(img.url)}
                  alt={img.caption}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-white/30 text-white hover:bg-white/10"
          >
            Close Gallery
          </Button>
        </div>
      </div>
    </div>
  );
}
