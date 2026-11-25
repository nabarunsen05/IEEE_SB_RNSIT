"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Layers,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { societies, departmentsInfo } from "../data/societiesData";

export default function Societies() {
  const [searchQuery, setSearchQuery] = useState("");

  // Group societies into department-specific blocks.
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

  // Filter department blocks based on search query.
  const filteredDepartments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return departmentGroups;

    return departmentGroups
      .map((dept) => {
        const matchingSocieties = dept.societies.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.advisor.toLowerCase().includes(q) ||
            s.department.toLowerCase().includes(q) ||
            dept.name.toLowerCase().includes(q) ||
            dept.shortName.toLowerCase().includes(q)
        );

        const matchesDepartment =
          dept.name.toLowerCase().includes(q) ||
          dept.shortName.toLowerCase().includes(q) ||
          dept.code.toLowerCase().includes(q);

        return {
          ...dept,
          societies: matchesDepartment ? dept.societies : matchingSocieties,
          matchCount: matchingSocieties.length,
        };
      })
      .filter((dept) => dept.societies.length > 0);
  }, [departmentGroups, searchQuery]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-4 pb-24 pt-32 sm:px-6 sm:pt-36 lg:px-12">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -right-32 top-10 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.35)_0%,rgba(2,132,199,0.20)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-40 bottom-10 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.28)_0%,rgba(249,115,22,0.18)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header and hero description */}
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl">
            IEEE Societies at{" "}
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              RNSIT
            </span>
          </h1>

          <p className="mt-4 text-base leading-7 text-[#526477] sm:text-lg sm:leading-8">
            Select any department block below to open its dedicated page and view all active
            society chapters, specialized domains, and faculty advisors for that department.
          </p>
        </div>

        {/* Search controls */}
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

            <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#00629B]">
              <span className="rounded-xl border border-slate-200/90 bg-slate-50 px-3.5 py-2">
                {filteredDepartments.length} Departments {searchQuery ? "Matched" : "Available"}
              </span>
            </div>
          </div>
        </div>

        {/* Department blocks */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Societies by Department
            </h2>
            <span className="text-xs text-slate-400">
              Click any block to view its societies
            </span>
          </div>

          {filteredDepartments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-12 text-center">
              <BookOpen size={40} className="mx-auto text-slate-400" />
              <h3 className="mt-4 text-lg font-bold text-[#10243A]">
                No departments or societies found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                No results matched your search &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-5 rounded-full bg-[#00629B] px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004F7D]"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDepartments.map((dept) => (
                <Link
                  key={dept.code}
                  href={`/societies/${dept.code.toLowerCase()}`}
                  className="group relative flex flex-col justify-between rounded-3xl border border-[#DCE5EC] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00629B]/40 hover:shadow-xl hover:shadow-[#00629B]/10"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00629B] to-[#0284C7] font-bold text-white shadow-sm shadow-[#00629B]/30 transition-transform duration-300 group-hover:scale-105">
                        <span className="text-base font-extrabold tracking-wide">
                          {dept.code}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3 py-1 text-xs font-semibold text-[#00629B]">
                        <Layers size={13} />
                        <span>
                          {dept.societies.length}{" "}
                          {dept.societies.length === 1 ? "Chapter" : "Chapters"}
                        </span>
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
                      {dept.name}
                    </h3>

                    <p className="mt-2.5 text-xs leading-relaxed text-[#526477]">
                      {dept.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5 text-xs font-semibold text-[#00629B]">
                    <span>View {dept.code} Societies</span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-[#00629B] transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-[#00629B] group-hover:text-white">
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
