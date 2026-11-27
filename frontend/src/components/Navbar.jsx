
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Societies", href: "/societies" },
  { name: "Team", href: "/team" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      {/* Top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00629B]/40 via-[#29A9E0]/35 to-[#F26522]/30" />

      <nav className="mx-auto flex h-[76px] lg:h-[88px] max-w-7xl items-center justify-between gap-3 px-3 sm:px-5 lg:px-8">

        {/* IEEE + RNSIT Branding */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex min-w-0 shrink items-center gap-2 sm:gap-3 lg:gap-4"
        >
          {/* IEEE RNSIT Student Branch */}
          <img
            src="/assets/ieee-rnsit-sb-logo-black.png"
            alt="IEEE RNSIT Student Branch"
            className="h-auto w-[135px] sm:w-[155px] lg:w-[185px] xl:w-[210px] object-contain"
          />

          {/* Vertical Divider */}
          <div className="h-7 sm:h-8 lg:h-9 w-px shrink-0 bg-slate-300" />

          {/* RNSIT College Branding */}
          <img
            src="/assets/rnsit-logo.png"
            alt="RNS Institute of Technology"
            className="h-auto w-[95px] sm:w-[110px] lg:w-[130px] xl:w-[145px] object-contain transition-transform duration-200"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 xl:flex">
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-all ${
                    active
                      ? "border border-[#B9E2F5] bg-[#E6F4FB] text-[#00629B] shadow-sm"
                      : "text-slate-700 hover:bg-white hover:text-[#00629B]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Join IEEE */}
          <Link
            href="/join"
            className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:scale-105 hover:from-[#004F7D] hover:to-[#0074B5] active:scale-95"
          >
            Join IEEE
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg p-2 text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00629B] xl:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-menu-enter absolute left-0 right-0 top-full z-[55] max-h-[calc(100dvh-78px)] overflow-y-auto border-t border-slate-200 bg-white px-6 py-5 shadow-xl xl:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active
                      ? "border border-[#B9E2F5] bg-[#E6F4FB] text-[#00629B]"
                      : "text-slate-700 hover:bg-slate-100 hover:text-[#00629B]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Join IEEE */}
            <Link
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-5 py-3 font-semibold text-white shadow-md transition hover:from-[#004F7D] hover:to-[#0074B5]"
            >
              Join IEEE
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
