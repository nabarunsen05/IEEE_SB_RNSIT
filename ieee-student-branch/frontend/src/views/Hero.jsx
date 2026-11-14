import { ArrowRight, Sparkles, Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-transparent pt-24">
      {/* Ambient multi-color atmosphere on clean light canvas */}
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow-blob hero-glow-blob--blue" />
        <div className="hero-glow-blob hero-glow-blob--cyan" />
        <div className="hero-glow-blob hero-glow-blob--warm" />
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
        <div className="hero-grid" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div className="relative z-10">
          {/* Subtle dual-tint pill badge */}
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#00629B] shadow-xs">
            <Sparkles size={14} className="text-[#29A9E0]" />
            <span>IEEE Student Branch · RNSIT</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-[#10243A] sm:text-6xl lg:text-7xl">
            Innovate.<br />
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">Connect.</span><br />
            Create.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#526477] sm:text-lg sm:leading-8">
            A vibrant community of students passionate about technology,
            cutting-edge research, hands-on engineering and building solutions
            for a better tomorrow.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-7 py-3.5 font-semibold text-white shadow-md shadow-[#00629B]/25 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg hover:shadow-[#00629B]/35 active:translate-y-0"
            >
              <span>Explore Events</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-[#DCE5EC] bg-white/95 px-7 py-3.5 font-semibold text-[#10243A] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00629B]/35 hover:bg-gradient-to-r hover:from-white hover:to-[#E6F4FB] hover:text-[#00629B]"
            >
              <span>Discover IEEE</span>
              <ChevronRight size={16} className="text-[#00629B] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Feature Badges with light pastel color mixes */}
          <div className="mt-12 flex flex-wrap gap-3 border-t border-[#10243A]/10 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-gradient-to-r from-blue-50/80 to-cyan-50/50 px-3.5 py-2 text-xs font-semibold text-blue-900 shadow-xs">
              <Zap size={14} className="text-[#00629B]" />
              <span>Technical Workshops</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-gradient-to-r from-amber-50/80 to-orange-50/50 px-3.5 py-2 text-xs font-semibold text-amber-950 shadow-xs">
              <Award size={14} className="text-[#F26522]" />
              <span>Project Mentorship</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 px-3.5 py-2 text-xs font-semibold text-emerald-950 shadow-xs">
              <Sparkles size={14} className="text-emerald-600" />
              <span>Global Community</span>
            </div>
          </div>
        </div>

        {/* Right Showcase with tasteful color accents */}
        <div className="relative hidden lg:block">
          {/* Multi-color ambient background blur */}
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-gradient-to-tr from-[#00629B]/15 via-[#29A9E0]/15 to-[#F26522]/10 blur-3xl" />

          <div className="relative flex h-[520px] items-center justify-center">
            {/* Floating Card 1: Student Community */}
            <div className="glass-card absolute -left-6 top-8 z-20 flex items-center gap-3 rounded-2xl border border-blue-100 px-4 py-3 shadow-[0_12px_28px_rgba(16,36,58,0.08)] animate-float-slow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#526477]">Student Community</p>
                <p className="text-sm font-bold text-[#10243A]">250+ Members</p>
              </div>
            </div>

            {/* Central Showcase Card */}
            <div className="glass-card-interactive relative z-10 w-full max-w-lg rounded-3xl p-8 shadow-[0_20px_50px_rgba(16,36,58,0.1)]">
              {/* Top subtle multi-color accent hairline */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]" />

              <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-[#DCE5EC] bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] p-6 shadow-inner">
                <img
                  src="/assets/ieee-rnsit-sb-logo-black.png"
                  alt="IEEE RNSIT Student Branch"
                  className="h-auto max-h-56 w-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,98,155,0.08)]"
                />
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE5EC] pt-4 text-xs">
                <span className="flex items-center gap-2 font-medium text-[#526477]">
                  <span className="h-2 w-2 rounded-full bg-[#00629B]" />
                  RNSIT Student Branch
                </span>
                <span className="rounded-full border border-blue-200/80 bg-gradient-to-r from-[#E6F4FB] to-sky-50 px-3 py-1 font-semibold text-[#00629B] shadow-2xs">
                  Bangalore Section
                </span>
              </div>
            </div>

            {/* Floating Card 2: Annual Activities */}
            <div className="glass-card absolute -right-4 bottom-10 z-20 flex items-center gap-3 rounded-2xl border border-orange-100 px-4 py-3 shadow-[0_12px_28px_rgba(16,36,58,0.08)] animate-float-reverse">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/25">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-[#526477]">Annual Activities</p>
                <p className="text-sm font-bold text-[#10243A]">30+ Events & Talks</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
