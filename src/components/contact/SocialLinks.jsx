export default function SocialLinks({ links }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white/85 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">
        Follow Us
      </p>

      <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-slate-900">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-slate-200 px-4 py-2 transition hover:border-emerald-200 hover:text-emerald-600"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
