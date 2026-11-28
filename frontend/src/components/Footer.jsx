"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

// Standard Inline SVG Icons for Instagram and LinkedIn (Lucide removed them in newer builds)
function InstagramIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 isolate overflow-hidden border-t border-slate-200 bg-[#071A2B] text-slate-300">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#00629B]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-80 w-80 rounded-full bg-[#29A9E0]/10 blur-3xl" />

      {/* Main Footer Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-8 sm:pt-14 sm:pb-10 lg:px-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">

          {/* =========================================
              COLUMN 1: BRANDING & SOCIAL MEDIA
          ========================================== */}
          <div className="space-y-3 sm:space-y-5">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.01]">
              <img
                src="/assets/ieee-bangalore-section.png"
                alt="IEEE Bangalore Section - RNSIT SB"
                className="h-9 sm:h-12 w-auto filter drop-shadow-[0_2px_10px_rgba(41,169,224,0.3)]"
              />
            </Link>

            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                IEEE Student Branch
              </h3>
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#29A9E0]">
                RNS Institute of Technology
              </p>
            </div>

            <p className="max-w-sm text-xs sm:text-sm leading-5 sm:leading-6 text-slate-400 line-clamp-2 sm:line-clamp-none">
              Fostering technical innovation, engineering excellence, and academic collaboration. Connecting passionate students with IEEE&apos;s global network of 420,000+ professionals.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 sm:mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ieee_rnsit_sb/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="IEEE RNSIT SB Instagram"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-amber-500/20 hover:via-pink-500/20 hover:to-purple-500/20 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-[1.02]"
                  title="Follow IEEE RNSIT SB on Instagram"
                >
                  <InstagramIcon size={16} className="transition-transform group-hover:scale-[1.04]" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ieee-rnsit-sb/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="IEEE RNSIT SB LinkedIn"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-[#29A9E0]/50 hover:bg-[#00629B]/30 hover:text-[#29A9E0] hover:shadow-[0_0_20px_rgba(41,169,224,0.35)] hover:scale-[1.02]"
                  title="Connect with IEEE RNSIT SB on LinkedIn"
                >
                  <LinkedinIcon size={16} className="transition-transform group-hover:scale-[1.04]" />
                </a>

                {/* Official Email */}
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeestudentbranchrnsit@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Email IEEE SB RNSIT"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#00629B]/30 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(41,169,224,0.35)] hover:scale-[1.02]"
                  title="Compose email to ieeestudentbranchrnsit@gmail.com"
                >
                  <Mail size={16} className="transition-transform group-hover:scale-[1.04]" />
                </a>

                {/* College Website */}
                <a
                  href="https://www.rnsit.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="RNSIT College Website"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white hover:scale-[1.02]"
                  title="RNSIT Official Portal"
                >
                  <ExternalLink size={15} className="transition-transform group-hover:scale-[1.04]" />
                </a>
              </div>
            </div>
          </div>


          {/* =========================================
              COLUMNS 2 & 3: EXPLORE & SOCIETIES (Sub-grid on mobile, standalone on desktop)
          ========================================== */}
          <div className="grid grid-cols-2 gap-4 sm:contents">
            {/* COLUMN 2: EXPLORE PART (QUICK LINKS) */}
            <div className="space-y-2.5 sm:space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5 sm:gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                Explore
              </h4>

              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                    <span>About SB</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/events"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                    <span>Events</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                  >
                    <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                    <span>ExeCom</span>
                  </Link>
                </li>
              </ul>
            </div>


            {/* COLUMN 3: IEEE SOCIETIES */}
            <div className="space-y-2.5 sm:space-y-4">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5 sm:gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                Societies
              </h4>

              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <li>
                  <Link
                    href="/societies"
                    className="group flex items-center justify-between rounded-lg py-1 transition hover:text-[#29A9E0]"
                  >
                    <span>All Societies</span>
                    <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100 hidden sm:inline" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>


          {/* =========================================
              COLUMN 4: CONTACT & CAMPUS LOCATION
          ========================================== */}
          <div className="space-y-2.5 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5 sm:gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
              Contact & Campus
            </h4>

            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-400">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2">
                <a
                  href="tel:+919606592647"
                  className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#29A9E0] transition-all hover:bg-[#00629B]/30 hover:border-cyan-400/50 hover:text-cyan-300"
                  title="Call SB Chair"
                  aria-label="Call SB Chair"
                >
                  <Phone size={12} />
                </a>
                <div>
                  <p className="font-semibold text-slate-300 text-[11px] sm:text-xs">SB Chair</p>
                  <p>
                    <a href="tel:+919606592647" className="hover:text-[#29A9E0] transition-colors text-cyan-300">
                      +91 96065 92647
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <Mail size={12} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300 text-[11px] sm:text-xs">Email</p>
                  <p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeestudentbranchrnsit@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#29A9E0] transition-colors break-all"
                    >
                      ieeestudentbranchrnsit@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <MapPin size={12} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300 text-[11px] sm:text-xs">Campus Location</p>
                  <p className="mt-0.5 leading-snug sm:leading-relaxed text-slate-400">
                    RNSIT Campus, RR Nagar, Bengaluru - 560098<span className="hidden sm:inline">, Karnataka, India</span>
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-2">
                <div className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <Clock size={12} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300 text-[11px] sm:text-xs">SB Lab Hours</p>
                  <p className="mt-0.5 text-slate-400">Mon – Sat: 9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================
            BOTTOM COPYRIGHT BAR
        ========================================== */}
        <div className="mt-6 pt-4 sm:mt-10 sm:pt-6 flex flex-col items-center justify-between gap-2 sm:gap-4 border-t border-white/10 text-[11px] sm:text-xs text-slate-500 sm:flex-row text-center sm:text-left">
          <p className="flex items-center gap-1.5">
            <span>© 2026 IEEE Student Branch, RNSIT. Advancing Technology for Humanity.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="text-slate-400">
              Built by IEEE SB RNSIT Tech Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
