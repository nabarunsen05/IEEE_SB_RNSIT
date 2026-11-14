"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Search,
  Filter,
  X,
  Layers,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

// Helper to assign a tasteful color mix to event headers based on category
function getEventHeaderGradient(category = "") {
  const cat = category.toUpperCase();
  if (cat.includes("HACKATHON") || cat.includes("CODE")) {
    return "from-[#0C4A6E] via-[#00629B] to-[#0D9488]";
  }
  if (cat.includes("TALK") || cat.includes("SEMINAR")) {
    return "from-[#1E293B] via-[#00629B] to-[#C2410C]";
  }
  if (cat.includes("COMPETITION") || cat.includes("FEST")) {
    return "from-[#431407] via-[#00629B] to-[#7C3AED]";
  }
  return "from-[#00629B] via-[#0284C7] to-[#10243A]";
}

function Events() {
  const { events } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories dynamically from current events
  const categories = useMemo(() => {
    const unique = new Set(events.map((e) => e.category).filter(Boolean));
    return ["ALL", ...Array.from(unique)];
  }, [events]);

  // Filter events based on selected category and search input
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        event.category?.toUpperCase() === selectedCategory.toUpperCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.venue?.toLowerCase().includes(query) ||
        event.category?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, searchQuery]);

  // Handler for "View all events" button: resets filters and scrolls smoothly to grid
  const handleViewAll = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    const grid = document.getElementById("events-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="events"
      className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations with delicate color mixes */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.22)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
              <Sparkles size={14} className="text-[#29A9E0]" />
              <span>RNSIT Campus Events & Activities</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
              Learn. Connect.
              <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent"> Experience at RNSIT.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#526477]">
              Explore hands-on technical workshops, inter-collegiate hackathons, distinguished expert lectures, and
              annual flagship symposiums organized by the IEEE Student Branch at R.N.S. Institute of Technology, Bengaluru.
            </p>
          </div>

          {/* Functional View All Button */}
          <button
            type="button"
            onClick={handleViewAll}
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#DCE5EC] bg-white px-6 py-3 font-semibold text-[#10243A] shadow-xs transition-all duration-300 hover:border-[#00629B]/35 hover:bg-gradient-to-r hover:from-white hover:to-[#E6F4FB] hover:text-[#00629B]"
          >
            <span>View all events ({events.length})</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

        </div>


        {/* =========================================
            INTERACTIVE FILTER & SEARCH BAR
        ========================================== */}
        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

          {/* Category Filter Pills with soft color combinations */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#647588] sm:inline-flex">
              <Filter size={14} className="text-[#00629B]" />
              <span>Filter:</span>
            </span>

            {categories.map((cat) => {
              const count =
                cat === "ALL"
                  ? events.length
                  : events.filter((e) => e.category?.toUpperCase() === cat.toUpperCase()).length;

              const isSelected = selectedCategory.toUpperCase() === cat.toUpperCase();

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] text-white shadow-md shadow-[#00629B]/20"
                      : "border border-slate-200/80 bg-slate-50/80 text-[#526477] hover:border-blue-200 hover:bg-sky-50/60 hover:text-[#10243A]"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                    isSelected ? "bg-white/20 text-white" : "bg-[#E6F4FB] text-[#00629B]"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647588]" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-[#DCE5EC] bg-white pl-9 pr-8 py-2 text-xs text-[#10243A] placeholder-[#8190A0] focus:border-[#00629B] focus:outline-none focus:ring-2 focus:ring-[#00629B]/10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#647588] hover:text-[#10243A]"
              >
                <X size={14} />
              </button>
            )}
          </div>

        </div>


        {/* =========================
            GLASS EVENT CARDS GRID
        ========================== */}
        <div id="events-grid">
          {filteredEvents.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-[#DCE5EC] bg-white p-12 text-center shadow-sm">
              <Layers className="mx-auto text-[#00629B]" size={44} />
              <h3 className="mt-4 text-xl font-bold text-[#10243A]">No Matching Events Found</h3>
              <p className="mt-2 text-sm text-[#526477]">
                {searchQuery || selectedCategory !== "ALL"
                  ? "No events match the selected filter or search keyword."
                  : "Check back soon for new workshops, technical competitions, and hackathons."}
              </p>
              {(searchQuery || selectedCategory !== "ALL") && (
                <button
                  type="button"
                  onClick={handleViewAll}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00629B] to-[#0074B5] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:scale-105 transition"
                >
                  <span>Reset Filters & View All</span>
                </button>
              )}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="group relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_8px_24px_rgba(16,36,58,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/35 hover:shadow-[0_20px_40px_rgba(0,98,155,0.14)]"
                >

                  {/* Event Visual Header with category-matched subtle gradient */}
                  <div className={`relative h-48 overflow-hidden bg-gradient-to-br ${getEventHeaderGradient(event.category)} p-6`}>

                    {/* Decorative rotating background circles */}
                    <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/20 animate-float-slow" />
                    <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full border border-white/15 animate-float-reverse" />

                    {/* Category Pill */}
                    <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md shadow-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                      <span>{event.category}</span>
                    </div>

                    {/* Date Display */}
                    <div className="absolute bottom-5 left-6 z-10 flex items-center gap-3">
                      <div className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/95 text-[#10243A] shadow-md backdrop-blur-md transition-colors group-hover:border-white">
                        <span className="text-xl font-bold leading-none text-[#10243A]">
                          {event.date}
                        </span>
                        <span className="mt-1 text-[11px] font-bold tracking-wide text-[#00629B]">
                          {event.month}
                        </span>
                      </div>

                      <div className="text-xs font-semibold tracking-wider text-white drop-shadow-sm">
                        YEAR {event.year}
                      </div>
                    </div>

                  </div>


                  {/* Event Content */}
                  <div className="p-6">

                    <h3 className="text-xl font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
                      {event.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#526477]">
                      {event.description}
                    </p>


                    {/* Event details with subtle colored icons */}
                    <div className="mt-5 space-y-2.5 border-t border-[#DCE5EC] pt-5">

                      <div className="flex items-center gap-3 text-sm text-[#526477]">
                        <CalendarDays
                          size={16}
                          className="text-[#00629B] shrink-0"
                        />
                        <span>{event.date} {event.month} {event.year}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-[#526477]">
                        <Clock
                          size={16}
                          className="text-[#29A9E0] shrink-0"
                        />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center gap-3 text-sm text-[#526477]">
                        <MapPin
                          size={16}
                          className="text-[#F26522] shrink-0"
                        />
                        <span>{event.venue}</span>
                      </div>

                    </div>


                    {/* Register button with gradient */}
                    <Link
                      href="/join"
                      className="group/btn mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10243A] via-[#1A3856] to-[#10243A] px-5 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:from-[#00629B] hover:via-[#0074B5] hover:to-[#0086CE] hover:shadow-md hover:shadow-[#00629B]/25 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <span>Register for Event</span>
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-200 group-hover/btn:translate-x-1"
                      />
                    </Link>

                  </div>

                </article>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Events;
