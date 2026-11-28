"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import Parallax from "../components/Parallax";
import Pop, { PopGroup, PopItem } from "../components/Pop";

function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-transparent pt-24">
      {/* Ambient multi-color atmosphere on clean light canvas */}
      <div className="hero-atmosphere" aria-hidden="true">
        <Parallax speed={0.3} className="pointer-events-none absolute inset-0">
          <div className="hero-glow-blob hero-glow-blob--blue" />
          <div className="hero-glow-blob hero-glow-blob--cyan" />
          <div className="hero-glow-blob hero-glow-blob--warm" />
          <div className="hero-orb hero-orb--primary" />
          <div className="hero-orb hero-orb--secondary" />
        </Parallax>
        <div className="hero-grid" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-10 px-6 py-12 sm:px-8 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-12">
        {/* Left Column: Heading, intro & actions */}
        <div className="relative z-10">
          <Pop delay={0}>
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-[#10243A] sm:text-6xl lg:text-7xl">
              Innovate.<br />
              <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">Connect.</span><br />
              Create.
            </h1>
          </Pop>

          <Pop delay={0.08}>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#526477] sm:mt-6 sm:text-lg sm:leading-8">
              A vibrant community of students passionate about technology,
              cutting-edge research, hands-on engineering and building solutions
              for a better tomorrow.
            </p>
          </Pop>

          {/* Action Buttons */}
          <Pop delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} style={{ display: "inline-flex" }}>
                <Link
                  href="/events"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base font-semibold text-white shadow-md shadow-[#00629B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg hover:shadow-[#00629B]/35 active:translate-y-0"
                >
                  <span>Explore Events</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} style={{ display: "inline-flex" }}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#DCE5EC] bg-white/95 px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base font-semibold text-[#10243A] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00629B]/35 hover:bg-gradient-to-r hover:from-white hover:to-[#E6F4FB] hover:text-[#00629B]"
                >
                  <span>Discover IEEE</span>
                  <ChevronRight size={16} className="text-[#00629B] transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </div>
          </Pop>

          {/* Feature Badges */}
          <PopGroup className="mt-10 sm:mt-12 flex flex-wrap gap-2.5 sm:gap-3 border-t border-[#10243A]/10 pt-5 sm:pt-6">
            <PopItem>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/70 bg-gradient-to-r from-blue-50/80 to-cyan-50/50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-blue-900 shadow-xs">
                <Zap size={13} className="text-[#00629B] sm:w-3.5 sm:h-3.5" />
                <span>Technical Workshops</span>
              </div>
            </PopItem>
            <PopItem>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-orange-50/50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-amber-950 shadow-xs">
                <Award size={13} className="text-[#F26522] sm:w-3.5 sm:h-3.5" />
                <span>Project Mentorship</span>
              </div>
            </PopItem>
            <PopItem>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-200/70 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 px-3 py-1.5 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-semibold text-emerald-950 shadow-xs">
                <Globe size={13} className="text-emerald-600 sm:w-3.5 sm:h-3.5" />
                <span>Global Community</span>
              </div>
            </PopItem>
          </PopGroup>
        </div>

        {/* Showcase — visible on both Mobile and Desktop */}
        <Pop delay={0.2} className="relative mt-4 sm:mt-8 lg:mt-0">
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[#00629B]/20 via-[#29A9E0]/20 to-[#F26522]/15 blur-3xl"
          />

          <div className="relative flex h-[340px] sm:h-[440px] lg:h-[520px] items-center justify-center">
            {/* Floating Card 1 (Levitating) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass-card absolute -left-2 sm:-left-6 top-4 sm:top-8 z-20 flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-blue-100 bg-white/90 px-3 py-2 sm:px-4 sm:py-3 shadow-[0_12px_28px_rgba(16,36,58,0.08)] backdrop-blur-md"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25">
                <Zap size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-[#526477]">Student Community</p>
                <p className="text-xs sm:text-sm font-bold text-[#10243A]">1000+ Members</p>
              </div>
            </motion.div>

            {/* Central Showcase Card */}
            <div className="glass-card-interactive relative z-10 w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(16,36,58,0.1)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]" />

              <div className="img-zoom-wrap flex min-h-[190px] sm:min-h-[250px] lg:min-h-[290px] items-center justify-center rounded-xl sm:rounded-2xl border border-[#DCE5EC] bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] p-4 sm:p-6 shadow-inner">
                <img
                  src="/assets/ieee-rnsit-sb-logo-featured.png"
                  alt="IEEE RNSIT Student Branch"
                  className="img-zoom h-auto max-h-44 sm:max-h-56 lg:max-h-64 w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,98,155,0.08)]"
                />
              </div>
            </div>

            {/* Floating Card 2 (Levitating) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="glass-card absolute -right-2 sm:-right-4 bottom-4 sm:bottom-10 z-20 flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-orange-100 bg-white/90 px-3 py-2 sm:px-4 sm:py-3 shadow-[0_12px_28px_rgba(16,36,58,0.08)] backdrop-blur-md"
            >
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/25">
                <Award size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div>
                <p className="text-[10px] sm:text-xs font-medium text-[#526477]">Annual Activities</p>
                <p className="text-xs sm:text-sm font-bold text-[#10243A]">30+ Events &amp; Talks</p>
              </div>
            </motion.div>
          </div>
        </Pop>
      </div>
    </section>
  );
}

export default Hero;
