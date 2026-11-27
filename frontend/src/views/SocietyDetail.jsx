"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
  Target,
  BookOpen,
  Users,
  BrainCircuit,
  MonitorSmartphone,
  Binary,
  Bot,
  ShieldCheck,
  Satellite,
  Aperture,
  Radar,
  HeartHandshake,
  Stethoscope,
  Activity,
  CircuitBoard,
  Car,
  Zap,
  Rocket,
  Briefcase,
  Factory,
  Scale,
  Navigation,
  Building2,
} from "lucide-react";
import { departmentsInfo, societies } from "../data/societiesData";
import Pop, { PopGroup, PopItem } from "../components/Pop";
import TiltCard from "../components/TiltCard";

// Map icon string names to actual Lucide components
const iconMap = {
  BrainCircuit,
  MonitorSmartphone,
  Binary,
  Bot,
  ShieldCheck,
  GraduationCap,
  Satellite,
  Aperture,
  Radar,
  HeartHandshake,
  Stethoscope,
  Activity,
  CircuitBoard,
  Car,
  Zap,
  Rocket,
  Briefcase,
  Factory,
  Scale,
  Navigation,
};

export default function SocietyDetail({ deptCode, societySlug }) {
  const normalizedDept = (deptCode || "").toUpperCase();
  const department = departmentsInfo[normalizedDept];

  const society = societies.find(
    (s) =>
      s.department === normalizedDept &&
      s.slug === societySlug
  );

  if (!department || !society) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-[#10243A]">Society Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The requested society could not be found.
        </p>
        <Link
          href="/societies"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#00629B] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#004F7D] transition"
        >
          <ArrowLeft size={16} />
          <span>Back to All Departments</span>
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[society.icon] || Building2;

  // Get sibling societies in same department (excluding current)
  const siblingsSocieties = societies.filter(
    (s) => s.department === normalizedDept && s.slug !== society.slug
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(2,132,199,0.20)_40%,transparent_70%)] blur-[75px]" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,rgba(249,115,22,0.18)_40%,transparent_70%)] blur-[75px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* =========================================
            BREADCRUMB & BACK BUTTON
        ========================================== */}
        <Pop className="mb-8 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex" }}>
          <Link
            href={`/societies/${normalizedDept.toLowerCase()}`}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm transition-all hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to {department.code} Societies</span>
          </Link>
          </motion.div>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <Link href="/societies" className="hover:text-[#00629B] transition-colors">
              Societies
            </Link>
            <ChevronRight size={13} />
            <Link
              href={`/societies/${normalizedDept.toLowerCase()}`}
              className="hover:text-[#00629B] transition-colors"
            >
              {department.code}
            </Link>
            <ChevronRight size={13} />
            <span className="font-semibold text-[#00629B]">{society.slug.toUpperCase()}</span>
          </div>
        </Pop>

        {/* =========================================
            SOCIETY HERO BANNER
        ========================================== */}
        <Pop className="overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_12px_40px_rgba(16,36,58,0.07)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#F26522]" />

          <div className="bg-gradient-to-r from-slate-50/90 via-white to-sky-50/50 p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-5">
                {/* Society Icon */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
                    society.logo
                      ? "border border-slate-200 bg-white p-2"
                      : "bg-gradient-to-br from-[#00629B] to-[#0284C7] text-white shadow-md shadow-[#00629B]/30"
                  }`}
                >
                  {society.logo ? (
                    <Image
                      src={society.logo}
                      alt={`${society.name} logo`}
                      width={500}
                      height={213}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <IconComponent size={28} />
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      {department.code}
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-3xl lg:text-4xl">
                    {society.name}
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526477] sm:text-base">
                    {department.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Pop>

        {/* =========================================
            ABOUT SECTION
        ========================================== */}
        <PopGroup className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* About Card — takes 2 columns */}
          <PopItem className="lg:col-span-2">
          <div className="h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B]">
                <BookOpen size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#10243A]">About</h2>
            </div>
            <p className="text-sm leading-relaxed text-[#526477] sm:text-base">
              {society.about}
            </p>
          </div>
          </PopItem>

          {/* Faculty Advisor Card */}
          <PopItem>
          <div className="h-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B]">
                <GraduationCap size={20} />
              </div>
              <h2 className="text-lg font-bold text-[#10243A]">Faculty Advisor</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00629B] to-[#0284C7] text-white font-bold text-lg shadow-md">
                {society.advisor
                  .split(" ")
                  .filter((w) => w !== "Dr." && w !== "Ms." && w !== "Mr.")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-base font-semibold text-[#10243A]">{society.advisor}</p>
                <p className="text-xs text-slate-500 mt-0.5">{department.shortName}</p>
              </div>
            </div>
          </div>
          </PopItem>
        </PopGroup>

        {/* =========================================
            FOCUS AREAS
        ========================================== */}
        {society.focusAreas && society.focusAreas.length > 0 && (
          <Pop className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F26522]">
                <Target size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#10243A]">Focus Areas</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {society.focusAreas.map((area, areaIdx) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#10243A] transition-colors hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B] animate-card-enter cursor-default"
                  style={{ "--card-index": areaIdx + 3 }}
                >
                  {area}
                </span>
              ))}
            </div>
          </Pop>
        )}

        {/* =========================================
            OTHER SOCIETIES IN DEPARTMENT
        ========================================== */}
        {siblingsSocieties.length > 0 && (
          <div className="mt-10">
            <Pop className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B]">
                <Users size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#10243A]">
                Other Societies in {department.code}
              </h2>
            </Pop>
            <PopGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblingsSocieties.map((s) => {
                const SiblingIcon = iconMap[s.icon] || Building2;
                return (
                  <PopItem key={s.slug}>
                  <TiltCard className="h-full rounded-2xl">
                  <Link
                    href={`/societies/${normalizedDept.toLowerCase()}/${s.slug}`}
                    className="block h-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-[border-color] duration-300 group-hover:border-[#00629B]/40"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="society-icon-wrap flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200/70 bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B]">
                        {s.logo ? (
                          <Image
                            src={s.logo}
                            alt={`${s.name} logo`}
                            width={500}
                            height={213}
                            className="h-6 w-8 object-contain"
                          />
                        ) : (
                          <SiblingIcon size={16} />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-[#10243A] transition-colors group-hover:text-[#00629B]">
                        {s.name}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      <span className="font-semibold">Advisor:</span> {s.advisor}
                    </p>
                  </Link>
                  </TiltCard>
                  </PopItem>
                );
              })}
            </PopGroup>
          </div>
        )}

        {/* =========================================
            BACK NAV
        ========================================== */}
        <Pop className="mt-14 flex items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex" }}>
          <Link
            href={`/societies/${normalizedDept.toLowerCase()}`}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to {department.code} Societies</span>
          </Link>
          </motion.div>
        </Pop>
      </div>
    </section>
  );
}
