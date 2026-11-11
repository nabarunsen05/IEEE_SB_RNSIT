import { ArrowRight, Sparkles, Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#071A2B] pt-24"
    >
      {/* =========================================
          ATMOSPHERIC ANIMATIONS & 3D CYBER GRID
      ========================================== */}
      <div className="hero-atmosphere">
        <div className="hero-glow-blob hero-glow-blob--blue" />
        <div className="hero-glow-blob hero-glow-blob--cyan" />
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
        <div className="hero-grid" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-h-[calc(100vh-96px)] items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">

        {/* =========================
            LEFT SIDE — HERO CONTENT
        ========================== */}
        <div className="relative z-10">
          {/* Main Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Innovate.
            <br />
            <span className="bg-gradient-to-r from-[#29A9E0] via-cyan-200 to-[#29A9E0] bg-clip-text text-transparent">
              Connect.
            </span>
            <br />
            Create.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            A vibrant community of students passionate about technology,
            cutting-edge research, hands-on engineering and building solutions for a better tomorrow.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">

            {/* Explore Events */}
            <Link
              href="/events"
              className="group relative flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#00629B] to-[#0077B8] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#29A9E0]/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Events</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            {/* Discover IEEE */}
            <Link
              href="/about"
              className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-7 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-cyan-400/40 hover:bg-white/[0.1] hover:shadow-[0_0_20px_rgba(41,169,224,0.2)]"
            >
              <span>Discover IEEE</span>
              <ChevronRight
                size={16}
                className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>

          </div>

          {/* Micro Glass Badges */}
          <div className="mt-12 flex flex-wrap gap-3 pt-4 border-t border-white/[0.08]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
              <Zap size={14} className="text-[#29A9E0]" />
              <span>Technical Workshops</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
              <Award size={14} className="text-[#29A9E0]" />
              <span>Project Mentorship</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-sm">
              <Sparkles size={14} className="text-[#29A9E0]" />
              <span>Global Community</span>
            </div>
          </div>
        </div>


        {/* =========================
            RIGHT SIDE — GLASS SHOWCASE
        ========================== */}
        <div className="relative hidden lg:block">
          {/* Ambient Glow behind card */}
          <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#00629B]/30 to-[#29A9E0]/25 blur-3xl" />

          <div className="relative flex h-[520px] items-center justify-center">

            {/* Floating Glass Pill - Top Left */}
            <div className="glass-card absolute -left-6 top-8 z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0A2236]/80 px-4 py-3 shadow-xl backdrop-blur-xl animate-float-slow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00629B]/25 text-[#29A9E0]">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Student Community</p>
                <p className="text-sm font-bold text-white">250+ Members</p>
              </div>
            </div>

            {/* Central Glass Showcase Box */}
            <div className="glass-card-interactive relative z-10 w-full max-w-lg rounded-3xl border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-2xl backdrop-blur-2xl">
              <div className="relative flex items-center justify-center rounded-2xl bg-[#071A2B]/70 p-6 border border-white/10 shadow-inner">
                <img
                  src="/assets/rnsit-sb-logo-white.png"
                  alt="IEEE RNSIT Student Branch"
                  className="h-auto w-full max-h-72 object-contain drop-shadow-[0_10px_25px_rgba(0,98,155,0.4)]"
                />
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[#29A9E0]" />
                  RNSIT Student Branch
                </span>
                <span className="rounded-full bg-[#00629B]/25 border border-[#29A9E0]/30 px-3 py-1 text-cyan-300 font-semibold">
                  Bangalore Section
                </span>
              </div>
            </div>

            {/* Floating Glass Pill - Bottom Right */}
            <div className="glass-card absolute -right-4 bottom-10 z-20 flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0A2236]/80 px-4 py-3 shadow-xl backdrop-blur-xl animate-float-reverse">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29A9E0]/20 text-[#29A9E0]">
                <Award size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Annual Activities</p>
                <p className="text-sm font-bold text-white">30+ Events & Talks</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
