import { ArrowRight, Sparkles, Award, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[#F4F7FA] pt-24">
      <div className="hero-atmosphere" aria-hidden="true">
        <div className="hero-glow-blob hero-glow-blob--blue" />
        <div className="hero-glow-blob hero-glow-blob--cyan" />
        <div className="hero-orb hero-orb--primary" />
        <div className="hero-orb hero-orb--secondary" />
        <div className="hero-grid" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-96px)] w-full max-w-7xl items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div className="relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#00629B]">
            <Sparkles size={14} /> IEEE Student Branch · RNSIT
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-[#10243A] sm:text-6xl lg:text-7xl">
            Innovate.<br />
            <span className="text-[#00629B]">Connect.</span><br />
            Create.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#526477] sm:text-lg sm:leading-8">
            A vibrant community of students passionate about technology,
            cutting-edge research, hands-on engineering and building solutions
            for a better tomorrow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/events" className="group inline-flex items-center gap-2.5 rounded-full bg-[#00629B] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#00629B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004F7D] hover:shadow-xl active:translate-y-0">
              <span>Explore Events</span>
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link href="/about" className="group inline-flex items-center gap-2 rounded-full border border-[#10243A]/15 bg-white px-7 py-3.5 font-semibold text-[#10243A] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#00629B]/35 hover:bg-[#E6F4FB]">
              <span>Discover IEEE</span>
              <ChevronRight size={16} className="text-[#00629B] transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 border-t border-[#10243A]/10 pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00629B]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#526477] shadow-sm">
              <Zap size={14} className="text-[#00629B]" /><span>Technical Workshops</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00629B]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#526477] shadow-sm">
              <Award size={14} className="text-[#00629B]" /><span>Project Mentorship</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00629B]/10 bg-white px-3.5 py-2 text-xs font-medium text-[#526477] shadow-sm">
              <Sparkles size={14} className="text-[#00629B]" /><span>Global Community</span>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-tr from-[#00629B]/10 to-[#29A9E0]/10 blur-3xl" />
          <div className="relative flex h-[520px] items-center justify-center">
            <div className="glass-card absolute -left-6 top-8 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 animate-float-slow">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4FB] text-[#00629B]"><Zap size={20} /></div>
              <div><p className="text-xs text-[#526477]">Student Community</p><p className="text-sm font-bold text-[#10243A]">250+ Members</p></div>
            </div>

            <div className="glass-card-interactive relative z-10 w-full max-w-lg rounded-3xl p-8">
              <div className="flex min-h-[250px] items-center justify-center rounded-2xl border border-[#DCE5EC] bg-[#F4F7FA] p-6">
                <img src="/assets/ieee-rnsit-sb-logo-black.png" alt="IEEE RNSIT Student Branch" className="h-auto max-h-56 w-full object-contain" />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCE5EC] pt-4 text-xs">
                <span className="flex items-center gap-2 font-medium text-[#526477]"><span className="h-2 w-2 rounded-full bg-[#00629B]" />RNSIT Student Branch</span>
                <span className="rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-3 py-1 font-semibold text-[#00629B]">Bangalore Section</span>
              </div>
            </div>

            <div className="glass-card absolute -right-4 bottom-10 z-20 flex items-center gap-3 rounded-2xl px-4 py-3 animate-float-reverse">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F4FB] text-[#00629B]"><Award size={20} /></div>
              <div><p className="text-xs text-[#526477]">Annual Activities</p><p className="text-sm font-bold text-[#10243A]">30+ Events & Talks</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
