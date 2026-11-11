"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Cpu,
  Globe,
  Code2,
  ShieldCheck,
  Cloud,
  FlaskConical,
  Zap,
  CheckCircle2,
  Layers,
  Briefcase,
  UserCheck,
  Code,
  Terminal,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { getDomainDetail } from "../data/domainsDetailData";

const DOMAIN_ICONS = {
  BrainCircuit,
  Cpu,
  Globe,
  Code2,
  ShieldCheck,
  Cloud,
  FlaskConical,
  Terminal,
  Zap,
  Layers,
};

export default function DomainDetail({ slug }) {
  const { domains } = useAdmin();
  const domain = getDomainDetail(slug, domains);

  if (!domain) {
    return (
      <div className="min-h-screen bg-[#071A2B] pt-32 pb-24 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">
          <Layers size={48} className="mx-auto text-cyan-300" />
          <h2 className="mt-4 text-2xl font-bold text-white">Domain Not Found</h2>
          <p className="mt-2 text-sm text-slate-300">
            The technical track you are looking for does not exist or has been updated.
          </p>
          <Link
            href="/domains"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00629B] to-[#0077B8] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00629B]/30 hover:scale-105 transition"
          >
            <ArrowLeft size={16} />
            <span>Back to Domains</span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = DOMAIN_ICONS[domain.iconName] || BrainCircuit;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28 text-slate-100">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00629B]/20 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#29A9E0]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-[#00629B]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* ========================================================
            HERO SECTION (Modeled after BMSCE IEEE Chapter Header)
        ========================================================= */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0A2744] via-[#071F36] to-[#071A2B] p-8 sm:p-12 lg:p-16 backdrop-blur-2xl shadow-2xl">
          {/* Subtle geometric background glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#29A9E0]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#00629B]/20 blur-3xl" />

          {/* Top Back Link */}
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>All technical domains</span>
          </Link>

          {/* Chapter Logo Box & Abbreviation Pill */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="flex h-14 w-28 items-center justify-center rounded-2xl bg-white/10 p-2 border border-white/20 backdrop-blur-md shadow-md text-[#29A9E0]">
              <Icon size={32} strokeWidth={1.75} />
            </span>
            <span className="rounded-full border border-[#29A9E0]/40 bg-[#00629B]/30 px-3.5 py-1 text-xs font-bold tracking-wider text-[#29A9E0] backdrop-blur-md uppercase">
              {domain.abbreviation || "IEEE Track"}
            </span>
            {domain.number && (
              <span className="text-xs font-bold font-mono tracking-widest text-slate-400">
                TRACK {domain.number}
              </span>
            )}
          </div>

          {/* Display Title */}
          <h1 className="mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
            RNSIT IEEE {domain.shortTitle || domain.title}
          </h1>

          {/* Lead Tagline */}
          <p className="mt-5 max-w-3xl text-lg sm:text-xl font-normal leading-relaxed text-slate-200">
            {domain.tagline}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#071A2B] shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-cyan-500/20 active:translate-y-0"
            >
              <span>Join {domain.abbreviation || "Domain"} at IEEE</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="#about-section"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.08] hover:border-white/30"
            >
              <span>Explore Chapter Details</span>
            </a>
          </div>
        </section>


        {/* ========================================================
            SECTION 1: ABOUT US (2-Column Editorial BMSCE Layout)
        ========================================================= */}
        <section id="about-section" className="border-b border-white/10 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#29A9E0]">
                Chapter Foundation
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                About Us
              </h2>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-slate-300">
                {domain.aboutUs}
              </p>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 2: CORE INITIATIVES & ACTIVITIES
        ========================================================= */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#29A9E0]">
                Activities & Impact
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Core Initiatives & Activities
              </h2>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-slate-300">
                {domain.whatWeDo}
              </p>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 3: CURRICULUM & CORE FOCUS TRACKS
        ========================================================= */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#29A9E0]">
                Specializations
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Curriculum Modules
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                The 4 core engineering modules students master throughout the academic year.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {domain.focusAreas &&
                  domain.focusAreas.map((area, idx) => (
                    <div
                      key={area.title}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition hover:border-[#29A9E0]/40 hover:bg-white/[0.05]"
                    >
                      <span className="font-mono text-xs font-bold text-[#29A9E0]">
                        MODULE 0{idx + 1}
                      </span>
                      <h4 className="mt-2 text-base font-bold text-white">
                        {area.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        {area.description}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 4: TECH STACK, TOOLS & CAREER PATHS
        ========================================================= */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#29A9E0]">
                Professional Outcomes
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Tools & Careers
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Industry-standard tech stack and career opportunities unlocked through this track.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />

              {/* Lead Coordinator Block */}
              <div className="mt-8 rounded-2xl border border-[#29A9E0]/20 bg-[#00629B]/10 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#29A9E0] flex items-center gap-1.5">
                  <UserCheck size={14} />
                  <span>Track Leadership</span>
                </span>
                <p className="mt-2 text-sm font-bold text-white">
                  {domain.leadName || "Executive Council"}
                </p>
                <p className="text-xs text-slate-400">
                  {domain.leadRole || "IEEE SB RNSIT"}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Tech Stack Pills */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#29A9E0] flex items-center gap-2">
                  <Code size={15} />
                  <span>Technologies & Software Mastered</span>
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {domain.technologies &&
                    domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-[#29A9E0]/40 hover:text-cyan-300"
                      >
                        <CheckCircle2 size={12} className="text-[#29A9E0]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                </div>
              </div>

              {/* Career Paths */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#29A9E0] flex items-center gap-2">
                  <Briefcase size={15} />
                  <span>Industry Roles & Career Pathways</span>
                </h4>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {domain.careerPaths &&
                    domain.careerPaths.map((career) => (
                      <div
                        key={career}
                        className="flex items-center gap-2 rounded-xl bg-white/[0.02] p-2.5 border border-white/5 text-xs text-slate-200 font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                        <span>{career}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 5: JOIN US CALL TO ACTION
        ========================================================= */}
        <section className="pt-16 sm:pt-20">
          <Link
            href="/join"
            className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-r from-[#004A75] via-[#00629B] to-[#0A2236] p-8 text-white shadow-2xl transition-all duration-300 hover:border-[#29A9E0]/50 hover:shadow-[0_20px_50px_rgba(0,98,155,0.4)] sm:flex-row sm:items-center sm:p-12"
          >
            {/* Subtle glowing blob on hover */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
                Become a Member
              </p>
              <h3 className="mt-2 text-3xl font-extrabold sm:text-5xl tracking-tight text-white transition-colors group-hover:text-cyan-200">
                Join IEEE SB RNSIT Today
              </h3>
              <p className="mt-2 text-sm text-slate-300 max-w-xl">
                Ready to specialize in {domain.shortTitle || domain.title}? Register your membership to participate in hands-on workshops, access peer mentorship, and build breakthrough projects.
              </p>
            </div>

            <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#071A2B] shadow-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-[-45deg]">
              <ArrowRight size={24} />
            </span>
          </Link>
        </section>

      </div>
    </div>
  );
}
