"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ChevronRight,
  GraduationCap,
  Sparkles,
  Target,
  BookOpen,
  Users,
} from "lucide-react";
import { departmentsInfo, societies } from "../data/societiesData";

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

  // Get sibling societies in same department (excluding current)
  const siblingsSocieties = societies.filter(
    (s) => s.department === normalizedDept && s.slug !== society.slug
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(2,132,199,0.20)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,rgba(249,115,22,0.18)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-5xl">
        {/* =========================================
            BREADCRUMB & BACK BUTTON
        ========================================== */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href={`/societies/${normalizedDept.toLowerCase()}`}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm transition-all hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to {department.code} Societies</span>
          </Link>

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
        </div>

        {/* =========================================
            SOCIETY HERO BANNER
        ========================================== */}
        <div className="overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_12px_40px_rgba(16,36,58,0.07)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#F26522]" />

          <div className="bg-gradient-to-r from-slate-50/90 via-white to-sky-50/50 p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start gap-5">
                {/* Society Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00629B] to-[#0284C7] text-white shadow-md shadow-[#00629B]/30">
                  <Building2 size={28} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-[#00629B]">
                      <Sparkles size={12} className="text-[#29A9E0]" />
                      <span>IEEE Society</span>
                    </span>
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
        </div>

        {/* =========================================
            ABOUT SECTION
        ========================================== */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* About Card — takes 2 columns */}
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
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

          {/* Faculty Advisor Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
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
        </div>

        {/* =========================================
            FOCUS AREAS
        ========================================== */}
        {society.focusAreas && society.focusAreas.length > 0 && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 text-[#F26522]">
                <Target size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#10243A]">Focus Areas</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {society.focusAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#10243A] transition-colors hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            OTHER SOCIETIES IN DEPARTMENT
        ========================================== */}
        {siblingsSocieties.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B]">
                <Users size={20} />
              </div>
              <h2 className="text-xl font-bold text-[#10243A]">
                Other Societies in {department.code}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblingsSocieties.map((s) => (
                <Link
                  key={s.slug}
                  href={`/societies/${normalizedDept.toLowerCase()}/${s.slug}`}
                  className="group rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/40 hover:shadow-lg hover:shadow-[#00629B]/10"
                >
                  <h3 className="text-sm font-bold text-[#10243A] transition-colors group-hover:text-[#00629B]">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500">
                    <span className="font-semibold">Advisor:</span> {s.advisor}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            BACK NAV
        ========================================== */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <Link
            href={`/societies/${normalizedDept.toLowerCase()}`}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to {department.code} Societies</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
