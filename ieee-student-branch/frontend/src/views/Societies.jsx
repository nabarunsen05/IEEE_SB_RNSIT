import { Building2, GraduationCap, Sparkles } from "lucide-react";
import { societies } from "../data/societiesData";

export default function Societies() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 pb-24 pt-32 sm:px-8 sm:pt-36 lg:px-12">
      {/* Delicate background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.24)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
            <Sparkles size={14} className="text-[#29A9E0]" />
            <span>{societies.length} Active Society Chapters</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
            IEEE Societies at{" "}
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              RNSIT
            </span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#526477]">
            Explore the specialized technical society chapters at R.N.S. Institute of Technology,
            their associated academic departments, and the esteemed faculty advisors guiding student research.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_12px_35px_rgba(16,36,58,0.08)]">
          {/* Top subtle multi-color accent hairline */}
          <div className="h-1 w-full bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]" />

          <div className="hidden grid-cols-[72px_minmax(0,1.7fr)_140px_minmax(0,1fr)] gap-6 bg-gradient-to-r from-[#10243A] via-[#163554] to-[#10243A] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white md:grid">
            <span>Sl. No.</span>
            <span>IEEE Society Chapter</span>
            <span>Department</span>
            <span>Faculty Advisor</span>
          </div>

          <div className="divide-y divide-[#DCE5EC]">
            {societies.map((society, index) => (
              <article
                key={society.name}
                className="grid gap-3 px-6 py-5 transition-all hover:bg-gradient-to-r hover:from-sky-50/60 hover:via-white hover:to-transparent md:grid-cols-[72px_minmax(0,1.7fr)_140px_minmax(0,1fr)] md:items-center md:gap-6"
              >
                <span className="font-mono text-sm font-bold text-[#00629B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-sky-100 text-[#00629B] border border-blue-200/50">
                    <Building2 size={16} className="text-[#00629B]" />
                  </div>
                  <h2 className="font-semibold leading-6 text-[#10243A]">{society.name}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#526477]">
                  <GraduationCap size={16} className="text-[#00629B]" />
                  <span className="font-medium text-[#10243A]">{society.department}</span>
                </div>
                <p className="text-sm text-[#526477] md:border-l md:border-[#DCE5EC] md:pl-6">
                  <span className="mr-2 font-semibold text-[#10243A] md:hidden">Advisor:</span>
                  <span className="font-medium text-[#10243A]">{society.advisor}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
