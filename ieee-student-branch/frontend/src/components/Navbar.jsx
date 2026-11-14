"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";

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

  // Close the mobile menu after route navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-xs backdrop-blur-xl">
      {/* Top subtle multi-color accent hairline */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00629B]/40 via-[#29A9E0]/35 to-[#F26522]/30" />

      <nav className="mx-auto flex h-[80px] max-w-7xl items-center justify-between gap-4 px-6 py-0 lg:px-8">

        {/* Integrated IEEE and RNSIT Logos */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3 lg:gap-4 transition-transform duration-300 hover:scale-[1.01]"
        >
          {/* Black IEEE RNSIT Student Branch Logo */}
          <img
            src="/assets/ieee-rnsit-sb-logo-black.png"
            alt="IEEE RNSIT Student Branch"
            className="h-auto w-[170px] sm:w-[205px] lg:w-[230px] object-contain"
          />

          {/* Vertical Divider */}
          <div className="hidden h-10 w-px bg-slate-300 sm:block" />

          {/* RNSIT College Logo */}
          <img
            src="/assets/rnsit-logo.png"
            alt="RNS Institute of Technology"
            className="h-10 w-auto max-w-[95px] sm:h-11 sm:max-w-[125px] lg:h-12 lg:max-w-[140px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-4 md:flex lg:gap-5">
          <div className="flex items-center gap-1 rounded-full border border-slate-200/90 bg-slate-50/90 p-1.5 shadow-2xs">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 lg:px-4 ${
                    active
                      ? "border border-[#B9E2F5] bg-gradient-to-r from-[#E6F4FB] to-sky-50 text-[#00629B] shadow-2xs"
                      : "text-slate-700 hover:bg-white hover:text-[#00629B]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Radiant IEEE Accent Join Us Button */}
          <Link
            href="/join"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#00629B]/25 transition-all duration-200 hover:scale-105 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-md active:scale-95"
          >
            <Sparkles size={15} className="text-cyan-200" />
            <span>Join Us</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-[60] inline-flex min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-lg p-2 text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00629B] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div id="mobile-navigation" className="absolute left-0 right-0 top-full z-[55] max-h-[calc(100dvh-82px)] overflow-y-auto border-t border-slate-200 bg-white px-6 py-5 shadow-xl md:hidden">
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

            {/* Mobile Join Us Button */}
            <Link
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-5 py-3 font-semibold text-white shadow-md transition hover:from-[#004F7D] hover:to-[#0074B5]"
            >
              <Sparkles size={16} className="text-cyan-200" />
              <span>Join Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
