import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroSlidesService from "../../services/heroSlidesService";
import { sanitizeHtml, cleanupHtml } from "../../utils/heroHelpers";
import SanitizedHtml from "../ui/SanitizedHtml";

const SLIDE_DURATION = 6000;

const stripOuterParagraph = (html) => {
  if (!html) return "";
  return html.replace(/^<p\b[^>]*>\s*([\s\S]*?)\s*<\/p>$/i, "$1");
};

function TypewriterText({ text, delay = 0 }) {
  const chars = text.split("");
  return (
    <motion.h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight min-h-[1.2em]">
      {chars.length > 0 ? (
        chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + i * 0.02, duration: 0.08, ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))
      ) : (
        <span className="opacity-0">placeholder</span>
      )}
    </motion.h1>
  );
}

function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await heroSlidesService.getActiveSlides();
        const slidesData = response?.data?.slides || response?.data || response?.slides || response || [];
        setSlides(Array.isArray(slidesData) ? slidesData : []);
      } catch (error) {
        console.error("Failed to load hero slides:", error);
        setError(error.message);
        setSlides([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goTo = useCallback((index) => setActiveIndex(index), []);
  const next = useCallback(() => goTo((activeIndex + 1) % slides.length), [activeIndex, slides.length, goTo]);
  const prev = useCallback(() => goTo((activeIndex - 1 + slides.length) % slides.length), [activeIndex, slides.length, goTo]);

  if (loading) {
    return (
      <section className="relative bg-background">
        <div className="h-130 flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="text-text-muted">Loading slides...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-background">
        <div className="h-130 flex flex-col items-center justify-center gap-2">
          <p className="text-warning">Failed to load slides</p>
          <p className="text-sm text-text-muted">{error}</p>
        </div>
      </section>
    );
  }

  if (!slides.length) {
    return null;
  }

  return (
    <section className="relative bg-dark overflow-hidden -mt-16 lg:-mt-20" aria-label="Hero slideshow" aria-roledescription="carousel" role="region">
      <div className="flex flex-col md:flex-row min-h-[600px] lg:min-h-[700px]">
        {/* LEFT PANEL — Content */}
        <div className="relative w-full md:w-1/2 bg-gradient-to-br from-primary via-primaryLight to-primarySoft px-8 sm:px-12 lg:px-16 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 flex flex-col justify-center overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 font-medium">
              Guided Service · Community First
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <TypewriterText
                  text={cleanupHtml(slides[activeIndex].title || "")}
                  delay={0.15}
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-4 text-lg sm:text-xl text-white/80 max-w-lg"
                >
                  <SanitizedHtml
                    tag="span"
                    className="text-white/80"
                    html={stripOuterParagraph(
                      sanitizeHtml(slides[activeIndex].subtitle || "")
                    )}
                  />
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-3 text-base sm:text-lg text-white/70 max-w-xl"
                >
                  <SanitizedHtml
                    tag="span"
                    className="text-white/70"
                    html={stripOuterParagraph(
                      sanitizeHtml(slides[activeIndex].description || "")
                    )}
                  />
                </motion.p>

                <motion.div
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                  className="mt-8"
                >
                  <a
                    href={slides[activeIndex].cta_link || slides[activeIndex].ctaLink || '#'}
                    className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-dark shadow-lg shadow-accent/30 transition-all hover:brightness-110 hover:shadow-accent/40"
                  >
                    {slides[activeIndex].cta_text || slides[activeIndex].ctaLabel || 'Learn More'}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex gap-2.5 mt-12 w-full max-w-md" role="tablist" aria-label="Slide progress">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goTo(index)}
                  className="group flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden cursor-pointer transition-all hover:bg-white/30"
                >
                  {index === activeIndex ? (
                    <motion.div
                      key={`bar-${activeIndex}`}
                      className="h-full rounded-full bg-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    />
                  ) : (
                    <div
                      className="h-full rounded-full bg-accent/60 transition-all duration-500"
                      style={{ width: index < activeIndex ? "100%" : "0%" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                aria-label="Previous slide"
                onClick={prev}
                className="rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition-all hover:bg-white/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={next}
                className="rounded-full bg-white/15 p-2.5 text-white backdrop-blur transition-all hover:bg-white/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL — Image card */}
        <div className="relative w-full md:w-1/2 bg-dark overflow-hidden min-h-[300px] md:min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {slides[activeIndex].image_url || slides[activeIndex].image ? (
                <img
                  src={slides[activeIndex].image_url || slides[activeIndex].image}
                  alt={cleanupHtml(slides[activeIndex].title || "")}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primarySoft to-primary flex items-center justify-center">
                  <svg className="w-16 h-16 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                  </svg>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;