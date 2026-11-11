"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Heart,
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
    <footer className="relative z-10 border-t border-white/10 bg-[#071A2B] text-slate-300 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-[#00629B]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 h-80 w-80 rounded-full bg-[#29A9E0]/10 blur-3xl" />

      {/* Main Footer Container */}
      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-12 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* =========================================
              COLUMN 1: BRANDING & SOCIAL MEDIA
          ========================================== */}
          <div className="space-y-5">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
              <img
                src="/assets/ieee-bangalore-section.png"
                alt="IEEE Bangalore Section - RNSIT SB"
                className="h-12 w-auto filter drop-shadow-[0_2px_10px_rgba(41,169,224,0.3)]"
              />
            </Link>

            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                IEEE Student Branch
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#29A9E0]">
                RNS Institute of Technology
              </p>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Fostering technical innovation, engineering excellence, and academic collaboration. Connecting passionate students with IEEE&apos;s global network of 420,000+ professionals.
            </p>

            {/* Social Media Links */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ieee_rnsit/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="IEEE RNSIT Instagram"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:border-pink-500/50 hover:bg-gradient-to-tr hover:from-amber-500/20 hover:via-pink-500/20 hover:to-purple-500/20 hover:text-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105"
                  title="Follow on Instagram"
                >
                  <InstagramIcon size={18} className="transition-transform group-hover:scale-110" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/ieee-rnsit/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="IEEE RNSIT LinkedIn"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:border-[#29A9E0]/50 hover:bg-[#00629B]/30 hover:text-[#29A9E0] hover:shadow-[0_0_20px_rgba(41,169,224,0.35)] hover:scale-105"
                  title="Connect on LinkedIn"
                >
                  <LinkedinIcon size={18} className="transition-transform group-hover:scale-110" />
                </a>

                {/* Official Email */}
                <a
                  href="mailto:ieee@rnsit.ac.in"
                  aria-label="Email IEEE SB RNSIT"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#00629B]/30 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(41,169,224,0.35)] hover:scale-105"
                  title="Email Us directly"
                >
                  <Mail size={18} className="transition-transform group-hover:scale-110" />
                </a>

                {/* College Website */}
                <a
                  href="https://www.rnsit.ac.in/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="RNSIT College Website"
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white hover:scale-105"
                  title="RNSIT Official Portal"
                >
                  <ExternalLink size={17} className="transition-transform group-hover:scale-110" />
                </a>
              </div>
            </div>
          </div>


          {/* =========================================
              COLUMN 2: EXPLORE PART (QUICK LINKS)
          ========================================== */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
              Explore Portal
            </h4>

            <ul className="space-y-2.5 text-xs">
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
                  <span>About IEEE SB</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                  <span>Upcoming Events & Workshops</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/domains"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                  <span>Technical Domains</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#29A9E0]"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-600 transition-colors group-hover:bg-[#29A9E0]" />
                  <span>Executive Committee (ExeCom)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/join"
                  className="group inline-flex items-center gap-1.5 font-semibold text-cyan-300 transition-colors hover:text-white"
                >
                  <Sparkles size={12} className="text-[#29A9E0]" />
                  <span>Join Student Branch 2026</span>
                </Link>
              </li>
            </ul>
          </div>


          {/* =========================================
              COLUMN 3: TECHNICAL TRACKS & DOMAINS
          ========================================== */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
              Technical Domains
            </h4>

            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/domains/artificial-intelligence"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Artificial Intelligence & ML</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/web-app-development"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Web & Mobile Development</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/robotics-iot"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Robotics & Embedded IoT</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/cybersecurity-networks"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Cybersecurity & Networks</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/cloud-computing-devops"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Cloud Computing & DevOps</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
              <li>
                <Link
                  href="/domains/research-innovation"
                  className="group flex items-center justify-between rounded-lg p-1.5 transition hover:bg-white/[0.04] hover:text-[#29A9E0]"
                >
                  <span>Research & Publications</span>
                  <ArrowRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>


          {/* =========================================
              COLUMN 4: CONTACT & CAMPUS LOCATION
          ========================================== */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
              Contact & Campus
            </h4>

            <div className="space-y-3.5 text-xs text-slate-400">
              {/* Phone Numbers */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <Phone size={13} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300">Contact Numbers</p>
                  <p className="mt-0.5">
                    <a href="tel:+918028611880" className="hover:text-[#29A9E0] transition-colors">
                      +91 80 2861 1880
                    </a>{" "}
                    /{" "}
                    <a href="tel:+918028611881" className="hover:text-[#29A9E0] transition-colors">
                      1881
                    </a>
                  </p>
                  <p className="mt-0.5">
                    <a href="tel:+919845012345" className="hover:text-[#29A9E0] transition-colors text-cyan-300">
                      +91 98450 12345 (SB Chair)
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <Mail size={13} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300">Official Email</p>
                  <p className="mt-0.5">
                    <a href="mailto:ieee@rnsit.ac.in" className="hover:text-[#29A9E0] transition-colors">
                      ieee@rnsit.ac.in
                    </a>
                  </p>
                  <p className="mt-0.5">
                    <a href="mailto:ieee_admin@rnsit.ac.in" className="hover:text-[#29A9E0] transition-colors text-slate-400">
                      ieee_admin@rnsit.ac.in
                    </a>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <MapPin size={13} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300">Campus Location</p>
                  <p className="mt-0.5 leading-relaxed text-slate-400">
                    RNS Institute of Technology, Channasandra, Dr. Vishnuvardhan Road, RR Nagar Post, Bengaluru - 560098, Karnataka, India
                  </p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#29A9E0]">
                  <Clock size={13} />
                </div>
                <div>
                  <p className="font-semibold text-slate-300">SB Lab Hours</p>
                  <p className="mt-0.5 text-slate-400">Monday – Saturday: 9:00 AM – 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* =========================================
            BOTTOM COPYRIGHT BAR
        ========================================== */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© 2026 IEEE Student Branch, RNSIT. Advancing Technology for Humanity.</span>
          </p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Built with <Heart size={12} className="text-rose-500 fill-rose-500" /> by IEEE SB RNSIT Tech Team
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
