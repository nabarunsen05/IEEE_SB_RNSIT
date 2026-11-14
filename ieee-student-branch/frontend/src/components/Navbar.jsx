
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <nav className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-4 px-6 py-0 lg:px-8">

        {/* Option C: Integrated IEEE and RNSIT Logos */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-3 lg:gap-4"
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
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1.5">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 lg:px-4 ${
                    active
                      ? "border border-[#B9E2F5] bg-[#E6F4FB] text-[#00629B] shadow-sm"
                      : "text-slate-700 hover:bg-slate-100 hover:text-[#00629B]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Orange Join Us Button */}
          <Link
            href="/join"
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#10243A] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#1A3856] active:scale-95"
          >
            <Sparkles size={15} />
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
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#10243A] px-5 py-3 font-semibold text-white shadow-md transition hover:bg-[#1A3856]"
            >
              <Sparkles size={16} />
              <span>Join Us</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
