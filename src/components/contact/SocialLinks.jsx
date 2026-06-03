export default function SocialLinks({ links }) {
  return (
    <div className="rounded-3xl border border-border bg-surface/85 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-text-muted">
        Follow Us
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-text-primary">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-4 py-2 transition hover:border-primarySoft hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
