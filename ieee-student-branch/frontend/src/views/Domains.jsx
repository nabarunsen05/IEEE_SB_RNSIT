"use client";

import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Globe,
  Zap,
  Database,
  Terminal,
  Bot,
  Layers,
  Flame,
  Radio,
  Server,
  Workflow,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export const DOMAIN_ICONS = {
  BrainCircuit,
  Code2,
  Cpu,
  ShieldCheck,
  Cloud,
  FlaskConical,
  Globe,
  Zap,
  Database,
  Terminal,
  Bot,
  Layers,
  Flame,
  Radio,
  Server,
  Workflow,
  Sparkles,
};

function Domains() {
  const { domains } = useAdmin();

  return (
    <section
      id="domains"
      className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Decorative glowing ambient elements */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            HEADER
        ========================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Technical Domains ({domains.length})</span>
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Explore technology.
              <br />
              <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent">
                Build your expertise.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-slate-300 lg:justify-self-end">
            Our technical societies provide structured tracks, hands-on masterclasses and
            dedicated peer mentors to help you build production-ready skills beyond college curricula.
          </p>

        </div>


        {/* =========================
            GLASS DOMAIN GRID
        ========================== */}
        {domains.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.035] p-12 text-center backdrop-blur-xl">
            <Layers className="mx-auto text-cyan-300" size={48} />
            <h3 className="mt-4 text-xl font-bold text-white">No Domains Configured</h3>
            <p className="mt-2 text-sm text-slate-300">
              The administrator has not added any active technical tracks yet.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const Icon = DOMAIN_ICONS[domain.iconName] || BrainCircuit;

              return (
                <article
                  key={domain.id || domain.number}
                  className="glass-card-interactive group relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0A2236]/80 to-[#071A2B]/85 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#29A9E0]/40 hover:bg-[#0C2B47]/90 hover:shadow-[0_20px_40px_-15px_rgba(0,98,155,0.35),0_0_25px_rgba(41,169,224,0.15)]"
                >

                  {/* Number & Arrow Header */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs font-bold tracking-widest text-[#29A9E0]/70">
                      {domain.number}
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:border-[#29A9E0]/40 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(41,169,224,0.3)]">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>


                  {/* Icon with glowing backdrop */}
                  <div className="mt-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-all duration-300 group-hover:scale-110 group-hover:border-[#29A9E0]/50 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,169,224,0.4)]">
                    <Icon size={28} />
                  </div>


                  {/* Text */}
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#29A9E0]">
                    {domain.shortTitle}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-white transition-colors group-hover:text-[#29A9E0]">
                    {domain.title}
                  </h3>

                  <p className="mt-3.5 text-sm leading-7 text-slate-300">
                    {domain.description}
                  </p>


                  {/* Bottom animated accent line */}
                  <div className="mt-8 h-0.5 w-12 bg-[#00629B] transition-all duration-300 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#00629B] group-hover:to-[#29A9E0]" />

                </article>
              );
            })}
          </div>
        )}


        {/* =========================
            BOTTOM MESSAGE
        ========================== */}
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">

          <p className="text-sm text-slate-400">
            Learn with peers. Build real projects. Shape future technologies.
          </p>

          <a
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#29A9E0] transition hover:text-cyan-200"
          >
            <span>Explore student projects</span>
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

        </div>

      </div>
    </section>
  );
}

export default Domains;
