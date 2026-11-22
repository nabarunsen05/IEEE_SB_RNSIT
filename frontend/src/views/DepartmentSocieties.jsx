"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  GraduationCap,
  Layers,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { departmentsInfo, societies } from "../data/societiesData";

export default function DepartmentSocieties({ deptCode }) {
  const normalizedCode = (deptCode || "").toUpperCase();
  const department = departmentsInfo[normalizedCode];

  // Get all societies for this specific department
  const deptSocieties = societies.filter((s) => s.department === normalizedCode);

  // Other departments for quick cross-navigation
  const allDeptCodes = Object.keys(departmentsInfo);
  const otherDepartments = allDeptCodes
    .filter((code) => code !== normalizedCode)
    .map((code) => ({
      ...departmentsInfo[code],
      count: societies.filter((s) => s.department === code).length,
    }));

  if (!department) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-2xl font-bold text-[#10243A]">Department Not Found</h1>
        <p className="mt-2 text-sm text-slate-500">
          The requested department &ldquo;{deptCode}&rdquo; could not be found.
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(2,132,199,0.20)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,rgba(249,115,22,0.18)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================================
            BREADCRUMB & BACK BUTTON
        ========================================== */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/societies"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-700 shadow-2xs backdrop-blur-sm transition-all hover:border-[#00629B]/40 hover:bg-[#E6F4FB] hover:text-[#00629B]"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to All Departments</span>
          </Link>

          <div className="hidden items-center gap-2 text-xs font-medium text-slate-400 sm:flex">
            <Link href="/societies" className="hover:text-[#00629B] transition-colors">
              Societies
            </Link>
            <ChevronRight size={13} />
            <span className="font-semibold text-[#00629B]">{department.code}</span>
          </div>
        </div>

        {/* =========================================
            DEPARTMENT HEADER BANNER
        ========================================== */}
        <div className="overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_12px_40px_rgba(16,36,58,0.07)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#F26522]" />

          <div className="bg-gradient-to-r from-slate-50/90 via-white to-sky-50/50 p-6 sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                {/* Department Code Badge */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00629B] to-[#0284C7] font-bold text-white shadow-md shadow-[#00629B]/30">
                  <span className="text-xl font-extrabold tracking-wide">{department.code}</span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-[#00629B]">
                      <Sparkles size={12} className="text-[#29A9E0]" />
                      <span>Academic Department</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                      <Layers size={13} className="text-[#00629B]" />
                      <span>
                        {deptSocieties.length} {deptSocieties.length === 1 ? "Chapter" : "Chapters"}
                      </span>
                    </span>
                  </div>

                  <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-3xl lg:text-4xl">
                    {department.name}
                  </h1>

                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#526477] sm:text-base">
                    {department.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            SOCIETY CHAPTERS LIST
        ========================================== */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#10243A]">
                Active IEEE Chapters in {department.code}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Specialized student chapters guided by departmental faculty mentors
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {deptSocieties.length} Total
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {deptSocieties.map((society, idx) => (
              <article
                key={society.name}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/40 hover:shadow-lg hover:shadow-[#00629B]/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200/70 bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B] transition-transform duration-300 group-hover:scale-105">
                      <Building2 size={20} className="text-[#00629B]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
                    {society.name}
                  </h3>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-[#00629B]">
                      <GraduationCap size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Faculty Advisor
                      </span>
                      <span className="block truncate text-sm font-semibold text-[#10243A]">
                        {society.advisor}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* =========================================
            EXPLORE OTHER DEPARTMENTS
        ========================================== */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-white/70 p-6 backdrop-blur-xs sm:p-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#10243A]">
                Explore Other Academic Departments
              </h3>
              <p className="mt-0.5 text-xs text-slate-500">
                Click any department to view its specialized IEEE societies
              </p>
            </div>
            <Link
              href="/societies"
              className="text-xs font-semibold text-[#00629B] hover:underline"
            >
              View All ({societies.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {otherDepartments.map((dept) => (
              <Link
                key={dept.code}
                href={`/societies/${dept.code.toLowerCase()}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-3.5 transition-all hover:-translate-y-0.5 hover:border-[#00629B]/40 hover:bg-sky-50/40 hover:shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-extrabold text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white transition-colors">
                    {dept.code}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {dept.count} {dept.count === 1 ? "ch." : "chs."}
                  </span>
                </div>
                <span className="mt-2 text-xs font-semibold leading-tight text-[#10243A] group-hover:text-[#00629B] transition-colors truncate">
                  {dept.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
