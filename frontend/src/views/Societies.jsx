"use client";

import { useState, useMemo, useRef } from "react";
import {
  Building2,
  GraduationCap,
  Search,
  X,
  Layers,
  BookOpen,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { societies, departmentsInfo } from "../data/societiesData";

export default function Societies() {
  // Start with ECE (most chapters) or null/ALL
  const [selectedDept, setSelectedDept] = useState("ECE");
  const [searchQuery, setSearchQuery] = useState("");
  const detailsRef = useRef(null);

  // Group societies into department-specific blocks
  const departmentGroups = useMemo(() => {
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

  // Handle department selection
  const handleSelectDepartment = (deptCode) => {
    setSelectedDept((prev) => (prev === deptCode ? "ALL" : deptCode));
    // Smooth scroll to the societies container if on mobile/small screen
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Filter department blocks based on search and selected department
  const filteredDepartments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return departmentGroups
      .filter((dept) => {
        if (q) return true; // If searching, search across all departments
        if (selectedDept === "ALL") return true;
        return dept.code === selectedDept;
      })
      .map((dept) => {
        if (!q) return dept;

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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-3.5 py-1.5 text-xs font-semibold text-[#00629B] shadow-2xs">
            <Sparkles size={13} className="text-[#29A9E0]" />
            <span>{societies.length} Chapters · {departmentGroups.length} Academic Departments</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl">
            IEEE Societies at{" "}
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              RNSIT
            </span>
          </h1>

          <p className="mt-4 text-base leading-7 text-[#526477] sm:text-lg sm:leading-8">
            Click on any department block below to explore its active IEEE society chapters,
            specialized research domains, and guiding faculty advisors.
          </p>
        </div>

        {/* =========================================
            SEARCH CONTROLS
        ========================================== */}
        <div className="mt-8 rounded-2xl border border-[#DCE5EC] bg-white/90 p-4 shadow-2xs backdrop-blur-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all societies or faculty advisors..."
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

            <div className="flex shrink-0 items-center gap-2">
              <span className="rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-2 text-xs font-semibold text-[#00629B]">
                {totalVisibleSocieties} {totalVisibleSocieties === 1 ? "Chapter" : "Chapters"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedDept("ALL");
                  setSearchQuery("");
                }}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  selectedDept === "ALL" && !searchQuery
                    ? "bg-[#00629B] text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                View All ({societies.length})
              </button>
            </div>
          </div>
        </div>

        {/* =========================================
            DEPARTMENT SMALL BLOCKS GRID
        ========================================== */}
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select an Academic Department
            </h2>
            <span className="text-xs text-slate-400">
              {departmentGroups.length} Departments Available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {departmentGroups.map((dept) => {
              const isSelected = selectedDept === dept.code && !searchQuery;

              return (
                <button
                  key={dept.code}
                  type="button"
                  onClick={() => handleSelectDepartment(dept.code)}
                  aria-expanded={isSelected}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 ${
                    isSelected
                      ? "border-[#00629B] bg-gradient-to-br from-[#F0F8FD] to-sky-50/70 shadow-md ring-2 ring-[#00629B]/25"
                      : "border-slate-200/90 bg-white hover:-translate-y-0.5 hover:border-[#00629B]/40 hover:bg-slate-50/50 hover:shadow-xs"
                  }`}
                >
                  {/* Top Bar: Code Badge & Chapter Count */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-extrabold tracking-wide transition-colors ${
                        isSelected
                          ? "bg-[#00629B] text-white shadow-2xs"
                          : "bg-slate-100 text-[#00629B] group-hover:bg-[#00629B] group-hover:text-white"
                      }`}
                    >
                      {dept.code}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100/90 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                      <Layers size={11} className="text-[#00629B]" />
                      <span>
                        {dept.societies.length} {dept.societies.length === 1 ? "Chapter" : "Chapters"}
                      </span>
                    </span>
                  </div>

                  {/* Middle: Short Department Name */}
                  <div className="mt-3">
                    <h3
                      className={`text-sm font-bold leading-snug transition-colors ${
                        isSelected ? "text-[#00629B]" : "text-[#10243A] group-hover:text-[#00629B]"
                      }`}
                    >
                      {dept.shortName}
                    </h3>
                  </div>

                  {/* Bottom: Action Cue */}
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-xs">
                    <span
                      className={`font-medium transition-colors ${
                        isSelected ? "font-semibold text-[#00629B]" : "text-slate-500 group-hover:text-[#00629B]"
                      }`}
                    >
                      {isSelected ? "Currently Viewing" : "Click to view"}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-200 ${
                        isSelected
                          ? "translate-x-0.5 text-[#00629B]"
                          : "text-slate-400 group-hover:translate-x-0.5 group-hover:text-[#00629B]"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================
            SOCIETIES DISPLAY SECTION FOR SELECTED DEPT
        ========================================== */}
        <div ref={detailsRef} className="mt-12 space-y-10">
          {filteredDepartments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center">
              <BookOpen size={40} className="mx-auto text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-[#10243A]">No societies found</h3>
              <p className="mt-2 text-sm text-slate-500">
                No society matched your search &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDept("ALL");
                }}
                className="mt-5 rounded-full bg-[#00629B] px-5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#004F7D] transition"
              >
                Reset Search
              </button>
            </div>
          ) : (
            filteredDepartments.map((dept) => (
              <section
                key={dept.code}
                id={`dept-${dept.code.toLowerCase()}`}
                aria-labelledby={`dept-heading-${dept.code}`}
                className="overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_8px_30px_rgba(16,36,58,0.06)]"
              >
                {/* Hairline IEEE Gradient Bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#F26522]" />

                {/* Department Header Banner */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/80 via-white to-sky-50/40 p-5 sm:p-7">
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

                    {selectedDept !== "ALL" && (
                      <button
                        type="button"
                        onClick={() => setSelectedDept("ALL")}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-[#00629B]"
                      >
                        <span>Show all</span>
                        <ArrowRight size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Society Cards Grid within this Department */}
                <div className="p-5 sm:p-7">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {dept.societies.map((society, idx) => (
                      <article
                        key={society.name}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-gradient-to-b from-white to-slate-50/40 p-5 shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-[#00629B]/35 hover:bg-white hover:shadow-md hover:shadow-[#00629B]/10"
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
