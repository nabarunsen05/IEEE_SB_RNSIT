"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Sparkles, Shield } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Projects", href: "/projects" },
  { name: "Domains", href: "/domains" },
  { name: "Team", href: "/team" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAdmin();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.08] bg-[#071A2B]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.35)] transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo with subtle glow on hover */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/assets/ieee-bangalore-section.png"
            alt="IEEE Bangalore Section"
            className="h-10 w-auto filter drop-shadow-[0_2px_10px_rgba(41,169,224,0.25)] transition-all duration-300 group-hover:drop-shadow-[0_4px_16px_rgba(41,169,224,0.45)]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 lg:gap-7 md:flex">
          <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#00629B]/30 text-[#29A9E0] shadow-[0_0_15px_rgba(41,169,224,0.2)] border border-[#29A9E0]/30"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Admin Link in Pill */}
            <Link
              href={isAuthenticated ? "/admin" : "/login"}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                isActive("/admin") || isActive("/login")
                  ? "bg-[#29A9E0]/25 text-[#29A9E0] border border-[#29A9E0]/40 shadow-[0_0_15px_rgba(41,169,224,0.25)]"
                  : isAuthenticated
                  ? "text-cyan-300 hover:bg-white/[0.05]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
              title={isAuthenticated ? "Admin Dashboard" : "Admin Login"}
            >
              <Shield size={13} className={isAuthenticated ? "text-[#29A9E0]" : "text-slate-400"} />
              <span>{isAuthenticated ? "Dashboard" : "Admin"}</span>
            </Link>
          </div>

          {/* Join Us Glass Button */}
          <Link
            href="/join"
            className={`group relative flex items-center gap-1.5 overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 ${
              isActive("/join")
                ? "bg-gradient-to-r from-[#0077B8] to-[#00629B] shadow-[0_0_20px_rgba(41,169,224,0.4)] border border-[#29A9E0]/50"
                : "bg-gradient-to-r from-[#00629B] to-[#0077B8] hover:shadow-[0_0_20px_rgba(41,169,224,0.35)] hover:scale-105 active:scale-95"
            }`}
          >
            <Sparkles size={14} className="text-cyan-300 transition-transform duration-300 group-hover:rotate-12" />
            <span>Join Us</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#071A2B]/95 px-6 py-5 backdrop-blur-2xl md:hidden shadow-2xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "border border-[#29A9E0]/30 bg-[#00629B]/25 text-[#29A9E0]"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Admin Link */}
            <Link
              href={isAuthenticated ? "/admin" : "/login"}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive("/admin") || isActive("/login")
                  ? "border border-[#29A9E0]/30 bg-[#00629B]/25 text-[#29A9E0]"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Shield size={16} className="text-[#29A9E0]" />
              <span>{isAuthenticated ? "Admin Dashboard" : "Admin Login"}</span>
            </Link>

            {/* Mobile Join Us */}
            <Link
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 text-center font-semibold text-white shadow-lg shadow-[#00629B]/30 transition hover:shadow-cyan-500/20"
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

export default Navbar;
