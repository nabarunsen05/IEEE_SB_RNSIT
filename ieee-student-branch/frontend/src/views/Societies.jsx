"use client";

import { useState, useMemo } from "react";
import {
  Building2,
  GraduationCap,
  Sparkles,
  Search,
  Filter,
  X,
  Layers,
  BookOpen,
} from "lucide-react";
import { societies, departmentsInfo } from "../data/societiesData";

export default function Societies() {
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Group societies into department-specific blocks
  const departmentGroups = useMemo(() => {
    // Preserve department order as defined in departmentsInfo
    const deptCodes = Object.keys(departmentsInfo);

    return deptCodes
      .map((code) => {
        const info = departmentsInfo[code];
        const deptSocieties = societies.filter((s) => s.department === code);
        return {
          ...info,
          societies: deptSocieties,
        };
      })
      .filter((dept) => dept.societies.length > 0);
  }, []);

  // Filter department blocks based on department pill selection and search query
  const filteredDepartments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return departmentGroups
      .filter((dept) => {
        if (selectedDept !== "ALL" && dept.code !== selectedDept) {
          return false;
        }
        return true;
      })
      .map((dept) => {
        if (!q) return dept;

        // Filter societies within this department by search query
        const matchingSocieties = dept.societies.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.advisor.toLowerCase().includes(q) ||
            s.department.toLowerCase().includes(q) ||
            dept.name.toLowerCase().includes(q) ||
            dept.shortName.toLowerCase().includes(q)
        );

        return {
          ...dept,
          societies: matchingSocieties,
        };
      })
      .filter((dept) => dept.societies.length > 0);
  }, [departmentGroups, selectedDept, searchQuery]);

  const totalVisibleSocieties = useMemo(() => {
    return filteredDepartments.reduce((acc, d) => acc + d.societies.length, 0);
  }, [filteredDepartments]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(2,132,199,0.20)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,rgba(249,115,22,0.18)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================================
            HEADER & HERO DESCRIPTION
        ========================================== */}
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
            <Sparkles size={14} className="text-[#29A9E0]" />
            <span>
              {societies.length} Chapters Across {departmentGroups.length} Departments
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl">
            IEEE Societies at{" "}
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              RNSIT
            </span>
          </h1>

          <p className="mt-5 text-base leading-7 text-[#526477] sm:text-lg sm:leading-8">
            Explore our specialized technical society chapters organized into department-specific
            academic blocks, led by dedicated faculty advisors and student leaders driving hands-on
            research and engineering excellence.
          </p>
        </div>

        {/* =========================================
            SEARCH & DEPARTMENT FILTER CONTROLS
        ========================================== */}
        <div className="mt-10 rounded-2xl border border-[#DCE5EC] bg-white/90 p-4 shadow-sm backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by society name, faculty advisor, or department..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-10 text-sm text-[#10243A] placeholder-slate-400 transition focus:border-[#00629B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00629B]/20"
                aria-label="Search societies"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Quick Summary Pill */}
            <div className="flex shrink-0 items-center gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-sky-50 px-3 py-1.5 font-semibold text-[#00629B] border border-sky-100">
                {totalVisibleSocieties} of {societies.length} Societies
              </span>
            </div>
          </div>

          {/* Department Filter Pills */}
          <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
            <Filter size={14} className="shrink-0 text-slate-400" />
            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Department:
            </span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedDept("ALL")}
                aria-pressed={selectedDept === "ALL"}
                className={`rounded-full px-3 py-1 font-semibold transition ${
                  selectedDept === "ALL"
                    ? "bg-[#00629B] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                All ({societies.length})
              </button>

              {departmentGroups.map((dept) => {
                const isSelected = selectedDept === dept.code;
                return (
                  <button
                    key={dept.code}
                    type="button"
                    onClick={() => setSelectedDept(dept.code)}
                    aria-pressed={isSelected}
                    className={`rounded-full px-3 py-1 font-semibold transition ${
                      isSelected
                        ? "bg-[#00629B] text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {dept.code} ({dept.societies.length})
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================
            DEPARTMENT-SPECIFIC BLOCKS
        ========================================== */}
        <div className="mt-12 space-y-12">
          {filteredDepartments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center">
              <BookOpen size={40} className="mx-auto text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-[#10243A]">No societies found</h3>
              <p className="mt-2 text-sm text-slate-500">
                We couldn't find any society matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("ALL");
                }}
                className="mt-5 rounded-full bg-[#00629B] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#004F7D] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredDepartments.map((dept) => (
              <section
                key={dept.code}
                id={dept.code.toLowerCase()}
                aria-labelledby={`dept-heading-${dept.code}`}
                className="overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_8px_30px_rgba(16,36,58,0.06)] transition-all hover:shadow-[0_12px_36px_rgba(16,36,58,0.09)]"
              >
                {/* Department Header Hairline */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#F26522]" />

                {/* Department Block Banner */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-sky-50/40 p-6 sm:px-8 sm:py-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-4">
                      {/* Department Code Badge */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00629B] to-[#0284C7] font-bold text-white shadow-sm shadow-[#00629B]/30">
                        <span className="text-sm font-extrabold tracking-wide">{dept.code}</span>
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h2
                            id={`dept-heading-${dept.code}`}
                            className="text-xl font-bold text-[#10243A] sm:text-2xl"
                          >
                            {dept.name}
                          </h2>
                          <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-xs font-semibold text-[#00629B]">
                            <Layers size={12} />
                            <span>
                              {dept.societies.length}{" "}
                              {dept.societies.length === 1 ? "Chapter" : "Chapters"}
                            </span>
                          </span>
                        </div>
                        <p className="mt-1 text-xs leading-5 text-[#526477] sm:text-sm">
                          {dept.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Society Cards Grid within Department Block */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {dept.societies.map((society, idx) => (
                      <article
                        key={society.name}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#00629B]/35 hover:bg-white hover:shadow-md hover:shadow-[#00629B]/10"
                      >
                        {/* Top: Icon & Society Title */}
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-200/60 bg-gradient-to-br from-[#E6F4FB] to-sky-100 text-[#00629B] transition-transform duration-200 group-hover:scale-105">
                              <Building2 size={18} className="text-[#00629B]" />
                            </div>
                            <span className="font-mono text-xs font-semibold text-slate-400">
                              #{String(idx + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h3 className="mt-4 text-base font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
                            {society.name}
                          </h3>
                        </div>

                        {/* Bottom: Faculty Advisor Info */}
                        <div className="mt-5 border-t border-slate-100 pt-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#00629B] border border-slate-200">
                              <GraduationCap size={15} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                Faculty Advisor
                              </span>
                              <span className="block truncate text-xs font-semibold text-[#10243A]">
                                {society.advisor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
