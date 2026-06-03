export default function GalleryHero() {
  return (
    <section className="relative bg-linear-to-br from-dark via-darkSoft to-dark text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-linear-to-r from-dark via-dark/90 to-dark/70" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-accent">
          Photo Gallery
        </p>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
          Our Moments
        </h1>
        <p className="max-w-2xl text-lg text-white/80">
          Browse through photos from our events, programs, and community
          development initiatives across Sefwi Wiawso Constituency.
        </p>
      </div>
    </section>
  );
}
