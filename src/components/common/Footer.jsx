import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold">Our Contact</h3>
          <div className="mt-4 space-y-2 text-sm text-slate-400">
            <p>Sefwi Wiawso Municipal Assembly</p>
            <p>P.O Box 25</p>
            <p>Western North Region · Ghana</p>
            <p>
              Tel: <span className="text-white">(+233) 242 560 140</span>
            </p>
            <p>
              Tel: <span className="text-white">054 853 1963</span>
            </p>
          </div>
        </div>

        {/* Working Hours */}
        <div>
          <h3 className="text-xl font-semibold">Working Hours</h3>
          <p className="mt-4 text-sm text-slate-400">
            Monday - Friday
            <br />
            <span className="text-white">08:00 AM - 05:00 PM</span>
          </p>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xl font-semibold">Location</h3>
          <p className="mt-4 text-sm text-slate-400">
            Sefwi Wiawso, Western North Region
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold">Useful Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-amber-300">
            <li>
              <a
                href="https://lgs.gov.gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Local Government Service
              </a>
            </li>
            <li>
              <a
                href="https://www.ghanadistricts.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Ghana Districts
              </a>
            </li>
            <li>
              <a
                href="https://www.ghana.gov.gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Government Portal
              </a>
            </li>
            <li>
              <a
                href="https://parliament.gh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Parliament of Ghana
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-slate-500">
        <p>
          &copy; {currentYear} Office of the MP, Sefwi Wiawso Constituency —
          Hon. Kofi Benteh Afful. All rights reserved.
        </p>
        <p className="mt-2 text-amber-300">
          Designed by Nolex-Prime IT & Training Services
        </p>
      </div>
    </footer>
  );
}