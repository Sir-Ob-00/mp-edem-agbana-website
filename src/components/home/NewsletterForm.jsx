function NewsletterForm() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-background p-10 shadow-sm">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">
              Stay Updated
            </p>
            <h2 className="text-3xl font-semibold text-text-primary">
              Join our newsletter
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Receive curated updates on constituency developments, policy
              briefs, and volunteer actions.
            </p>
            <p className="mt-2 text-xs text-text-muted/70">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
          <form className="space-y-4">
            <label
              className="text-sm font-medium text-text-secondary"
              htmlFor="newsletter-email"
            >
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder=""
              className="w-full rounded-2xl border border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="button"
              className="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primaryLight"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsletterForm;
