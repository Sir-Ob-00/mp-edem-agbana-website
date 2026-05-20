import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// If using Vite/CRA, place logo in /public and reference like this:
const Logo = "./assets/images/logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Announcements", href: "/announcement" },
  { label: "Youth", href: "/youth" },
  { label: "Ideas", href: "/ideas" },
  { label: "Media Center", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (href) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-red-700 text-white sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="w-10 h-10 object-contain"
          />

          <div className="font-semibold text-sm sm:text-lg leading-tight">
            Hon. Kofi Benteh Afful
            <span className="block text-white/70 text-xs">
              Office of the MP · Sefwi Wiawso
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`rounded px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-amber-400 text-red-900 font-bold"
                    : "hover:bg-red-600 text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile button */}
        <button
          type="button"
          aria-label="Toggle navigation"
          className="md:hidden rounded-lg border border-white/30 p-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-red-600 bg-red-700 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber-400 text-red-900 font-bold"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}