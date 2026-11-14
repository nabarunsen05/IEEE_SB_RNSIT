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

const DOMAIN_IMAGES = [
  { match: ["artificial intelligence", "machine learning", "ai & ml"], src: "/assets/domains/artificial-intelligence.webp", alt: "AI brain and microchip illustration" },
  { match: ["web", "app development", "mobile development"], src: "/assets/domains/web-app-development.webp", alt: "Web and mobile development illustration" },
  { match: ["robotics", "iot", "embedded"], src: "/assets/domains/robotics-iot.webp", alt: "Robotics and Internet of Things illustration" },
  { match: ["cybersecurity", "security", "networks"], src: "/assets/domains/cybersecurity.webp", alt: "Cybersecurity illustration" },
  { match: ["cloud", "devops"], src: "/assets/domains/cloud-devops.webp", alt: "Cloud computing and DevOps illustration" },
  { match: ["research", "publication", "innovation"], src: "/assets/domains/research-innovation.webp", alt: "Research and innovation illustration" },
];

function getDomainImage(domain) {
  const searchable = [domain?.title, domain?.shortTitle, domain?.slug, domain?.abbreviation]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return DOMAIN_IMAGES.find((item) =>
    item.match.some((keyword) => searchable.includes(keyword))
  );
}


export default function DomainDetail({ slug }) {
  const { domains } = useAdmin();
  const domain = getDomainDetail(slug, domains);

  if (!domain) {
    return (
      <div className="min-h-screen bg-[#F4F7FA] pt-32 pb-24 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-[#DCE5EC] bg-white p-10 backdrop-blur-xl">
          <Layers size={48} className="mx-auto text-[#00629B]" />
          <h2 className="mt-4 text-2xl font-bold text-[#10243A]">Domain Not Found</h2>
          <p className="mt-2 text-sm text-[#526477]">
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
    <div className="relative min-h-screen overflow-hidden bg-[#F4F7FA] pt-28 pb-24 sm:pt-32 sm:pb-28 text-[#526477]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute left-1/3 bottom-10 h-80 w-80 rounded-full bg-[#00629B]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* ========================================================
            HERO SECTION (Modeled after BMSCE IEEE Chapter Header)
        ========================================================= */}
        <section className="relative overflow-hidden rounded-[32px] border border-[#DCE5EC] bg-white p-8 shadow-[0_16px_45px_rgba(16,36,58,0.08)] sm:p-12 lg:p-16">
          {/* Subtle geometric background glow */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 z-0 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-24 -bottom-24 z-0 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl" />

          <div className="relative z-10">
          {/* Top Back Link */}
          <Link
            href="/domains"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#526477] transition-colors hover:text-[#10243A]"
          >
            <ArrowLeft size={16} />
            <span>All technical domains</span>
          </Link>

          {/* Domain illustration & Abbreviation Pill */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#DCE5EC] bg-[#071B3D] shadow-md sm:h-24 sm:w-24">
              {getDomainImage(domain) ? (
                <img
                  src={getDomainImage(domain).src}
                  alt={getDomainImage(domain).alt}
                  className="h-full w-full scale-110 object-cover object-center"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[#29A9E0]">
                  <Icon size={38} strokeWidth={1.75} />
                </div>
              )}
            </div>
            <span className="rounded-full border border-[#00629B]/20 bg-[#E6F4FB] px-3.5 py-1 text-xs font-bold tracking-wider text-[#00629B] backdrop-blur-md uppercase">
              {domain.abbreviation || "IEEE Track"}
            </span>
            {domain.number && (
              <span className="text-xs font-bold font-mono tracking-widest text-[#647588]">
                TRACK {domain.number}
              </span>
            )}
          </div>

          {/* Display Title */}
          <h1 className="mt-6 max-w-4xl text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl leading-[1.1]">
            RNSIT IEEE {domain.shortTitle || domain.title}
          </h1>

          {/* Lead Tagline */}
          <p className="mt-5 max-w-3xl text-lg sm:text-xl font-normal leading-relaxed text-[#526477]">
            {domain.tagline}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/join"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#00629B] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00629B]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#004F7D] hover:shadow-xl active:translate-y-0"
            >
              <span>Join {domain.abbreviation || "Domain"} at IEEE</span>
              <ArrowRight size={16} />
            </Link>

            <a
              href="#about-section"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DCE5EC] bg-white px-6 py-3.5 text-sm font-semibold text-[#10243A] transition hover:bg-[#E6F4FB] hover:border-[#00629B]/30"
            >
              <span>Explore Chapter Details</span>
            </a>
          </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 1: ABOUT US (2-Column Editorial BMSCE Layout)
        ========================================================= */}
        <section id="about-section" className="border-b border-[#DCE5EC] py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00629B]">
                Chapter Foundation
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
                About Us
              </h2>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[#526477]">
                {domain.aboutUs}
              </p>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 2: CORE INITIATIVES & ACTIVITIES
        ========================================================= */}
        <section className="border-b border-[#DCE5EC] py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00629B]">
                Activities & Impact
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
                Core Initiatives & Activities
              </h2>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />
            </div>

            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-[#526477]">
                {domain.whatWeDo}
              </p>
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 3: CURRICULUM & CORE FOCUS TRACKS
        ========================================================= */}
        <section className="border-b border-[#DCE5EC] py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00629B]">
                Specializations
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
                Curriculum Modules
              </h2>
              <p className="mt-3 text-sm text-[#647588]">
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
                      className="rounded-2xl border border-[#DCE5EC] bg-white p-6 shadow-sm transition hover:border-[#00629B]/20 hover:bg-[#F4F7FA]"
                    >
                      <span className="font-mono text-xs font-bold text-[#00629B]">
                        MODULE 0{idx + 1}
                      </span>
                      <h4 className="mt-2 text-base font-bold text-[#10243A]">
                        {area.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-[#526477]">
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
        <section className="border-b border-[#DCE5EC] py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#00629B]">
                Professional Outcomes
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
                Tools & Careers
              </h2>
              <p className="mt-3 text-sm text-[#647588]">
                Industry-standard tech stack and career opportunities unlocked through this track.
              </p>
              <div className="mt-4 h-1 w-12 rounded-full bg-[#29A9E0]" />

              {/* Lead Coordinator Block */}
              <div className="mt-8 rounded-2xl border border-[#00629B]/15 bg-[#E6F4FB] p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00629B] flex items-center gap-1.5">
                  <UserCheck size={14} />
                  <span>Track Leadership</span>
                </span>
                <p className="mt-2 text-sm font-bold text-[#10243A]">
                  {domain.leadName || "Executive Council"}
                </p>
                <p className="text-xs text-[#647588]">
                  {domain.leadRole || "IEEE SB RNSIT"}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {/* Tech Stack Pills */}
              <div className="rounded-2xl border border-[#DCE5EC] bg-white p-6 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00629B] flex items-center gap-2">
                  <Code size={15} />
                  <span>Technologies & Software Mastered</span>
                </h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {domain.technologies &&
                    domain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE5EC] bg-[#F4F7FA] px-3.5 py-1.5 text-xs font-medium text-[#526477] transition hover:border-[#00629B]/20 hover:text-[#00629B]"
                      >
                        <CheckCircle2 size={12} className="text-[#00629B]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                </div>
              </div>

              {/* Career Paths */}
              <div className="rounded-2xl border border-[#DCE5EC] bg-white p-6 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#00629B] flex items-center gap-2">
                  <Briefcase size={15} />
                  <span>Industry Roles & Career Pathways</span>
                </h4>
                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {domain.careerPaths &&
                    domain.careerPaths.map((career) => (
                      <div
                        key={career}
                        className="flex items-center gap-2 rounded-xl bg-[#F4F7FA] p-2.5 border border-[#DCE5EC] text-xs text-[#526477] font-medium"
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
            className="group relative flex flex-col justify-between gap-6 overflow-hidden rounded-[32px] border border-[#00629B]/20 bg-[#10243A] p-8 text-white shadow-[0_16px_40px_rgba(16,36,58,0.16)] transition-all duration-300 hover:border-[#29A9E0]/50 hover:shadow-[0_20px_50px_rgba(0,98,155,0.25)] sm:flex-row sm:items-center sm:p-12"
          >
            {/* Subtle glowing blob on hover */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl transition-opacity group-hover:opacity-100" />

            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ED8F5]">
                Become a Member
              </p>
              <h3 className="mt-2 text-3xl font-extrabold sm:text-5xl tracking-tight text-white transition-colors group-hover:text-[#8ED8F5]">
                Join IEEE SB RNSIT Today
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">
                Ready to specialize in {domain.shortTitle || domain.title}? Register your membership to participate in hands-on workshops, access peer mentorship, and build breakthrough projects.
              </p>
            </div>

            <span className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[#10243A] shadow-xl transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-[-45deg]">
              <ArrowRight size={24} />
            </span>
          </Link>
        </section>

      </div>
    </div>
  );
}
