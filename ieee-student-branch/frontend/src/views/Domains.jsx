"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BrainCircuit,
  Cpu,
  Globe,
  Radio,
  Layers,
  Terminal,
  ShieldAlert,
  Code,
  Database,
  Cloud,
  Smartphone,
  Eye,
  Bot,
  Activity,
  Server,
  Workflow,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Code2,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const DOMAIN_IMAGES = [
  { match: ["artificial intelligence", "machine learning", "ai & ml"], src: "/assets/domains/artificial-intelligence.webp", alt: "Circuit brain and AI chip" },
  { match: ["web", "app development", "mobile development"], src: "/assets/domains/web-app-development.webp", alt: "Laptop and smartphone with code" },
  { match: ["robotics", "iot", "embedded"], src: "/assets/domains/robotics-iot.webp", alt: "Robot and connected IoT devices" },
  { match: ["cybersecurity", "security", "networks"], src: "/assets/domains/cybersecurity.webp", alt: "Cybersecurity shield and padlock" },
  { match: ["cloud", "devops"], src: "/assets/domains/cloud-devops.webp", alt: "Cloud servers and DevOps infinity loop" },
  { match: ["research", "publication", "innovation"], src: "/assets/domains/research-innovation.webp", alt: "Microscope and research analytics" },
];

function getDomainImage(domain) {
  const searchable = [domain.title, domain.shortTitle, domain.slug]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return DOMAIN_IMAGES.find((item) =>
    item.match.some((keyword) => searchable.includes(keyword))
  );
}

const DOMAIN_ICONS = {
  BrainCircuit,
  Cpu,
  Globe,
  Radio,
  Terminal,
  ShieldAlert,
  Code,
  Database,
  Cloud,
  Smartphone,
  Eye,
  Bot,
  Activity,
  Server,
  Workflow,
  Sparkles,
  FlaskConical,
  Code2,
  ShieldCheck,
};

function getDomainSlug(domain) {
  if (domain.slug) return domain.slug;
  if (domain.id) return domain.id;
  return (domain.title || "domain").toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Domains() {
  const { domains } = useAdmin();

  return (
    <section
      id="domains"
      className="relative min-h-screen overflow-hidden bg-[#F4F7FA] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Decorative glowing ambient elements */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            HEADER
        ========================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Technical Domains ({domains.length})</span>
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
              Explore technology.
              <br />
              <span className="bg-gradient-to-r from-[#00629B] to-[#29A9E0] bg-clip-text text-transparent">
                Build your expertise.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-8 text-[#526477] lg:justify-self-end">
            Our technical societies provide structured tracks, hands-on masterclasses and
            dedicated peer mentors to help you build production-ready skills. Click any domain below to view complete roadmaps, workshops, and focus areas.
          </p>

        </div>


        {/* =========================
            GLASS DOMAIN GRID
        ========================== */}
        {domains.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-[#DCE5EC] bg-white p-12 text-center shadow-sm">
            <Layers className="mx-auto text-[#00629B]" size={48} />
            <h3 className="mt-4 text-xl font-bold text-[#10243A]">No Domains Configured</h3>
            <p className="mt-2 text-sm text-[#526477]">
              The administrator has not added any active technical tracks yet.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const Icon = DOMAIN_ICONS[domain.iconName] || BrainCircuit;
              const slug = getDomainSlug(domain);

              return (
                <Link
                  key={domain.id || domain.number}
                  href={`/domains/${slug}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#DCE5EC] bg-white p-8 shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/30 hover:shadow-[0_20px_40px_rgba(16,36,58,0.12)]"
                >

                  <div>
                    {/* Number & Arrow Header */}
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-xs font-bold tracking-widest text-[#00629B]/70">
                        {domain.number || "00"}
                      </span>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE5EC] bg-[#F4F7FA] text-[#647588] transition-all duration-300 group-hover:scale-110 group-hover:border-[#00629B]/30 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(41,169,224,0.3)]">
                        <ArrowUpRight size={18} />
                      </div>
                    </div>


                    {/* Domain-specific illustrated image */}
                    <div className="mt-7 h-28 w-28 overflow-hidden rounded-2xl border border-[#DCE5EC] bg-[#071B3D] shadow-[0_8px_22px_rgba(16,36,58,0.14)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.04] group-hover:shadow-[0_14px_28px_rgba(0,98,155,0.22)] sm:h-32 sm:w-32">
                      {getDomainImage(domain) ? (
                        <img
                          src={getDomainImage(domain).src}
                          alt={getDomainImage(domain).alt}
                          loading="lazy"
                          className="h-full w-full scale-110 object-cover object-center transition-transform duration-500 group-hover:scale-[1.16]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#29A9E0]">
                          <Icon size={42} strokeWidth={1.8} />
                        </div>
                      )}
                    </div>


                    {/* Text */}
                    <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#00629B]">
                      {domain.shortTitle}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-[#10243A] transition-colors group-hover:text-[#00629B]">
                      {domain.title}
                    </h3>

                    <p className="mt-3.5 text-sm leading-7 text-[#526477] line-clamp-3">
                      {domain.description}
                    </p>
                  </div>


                  {/* Action Link at Bottom */}
                  <div className="mt-8 pt-4 border-t border-[#DCE5EC] flex items-center justify-between text-xs font-semibold text-[#00629B] transition-colors group-hover:text-[#10243A]">
                    <span className="flex items-center gap-1.5">
                      <span>Explore Domain Details</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="text-[#647588] font-mono text-[11px] group-hover:text-[#004F7D]">
                      View Track →
                    </span>
                  </div>

                  {/* Bottom animated accent line */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-[#00629B] group-hover:via-[#29A9E0] group-hover:to-[#29A9E0]" />

                </Link>
              );
            })}
          </div>
        )}


        {/* =========================
            BOTTOM MESSAGE
        ========================== */}
        <div className="mt-14 flex flex-col justify-between gap-5 border-t border-[#DCE5EC] pt-8 sm:flex-row sm:items-center">

          <p className="text-sm text-[#647588]">
            Learn with peers. Build real projects. Shape future technologies.
          </p>

          <Link
            href="/events"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#00629B] transition hover:text-[#004F7D]"
          >
            <span>Explore upcoming events</span>
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Domains;
