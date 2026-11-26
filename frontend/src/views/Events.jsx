"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, CalendarDays, Clock, MapPin, Search, Filter, X,
  Layers, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

function getEventHeaderGradient(category = "") {
  const cat = category.toUpperCase();
  if (cat.includes("HACKATHON") || cat.includes("CODE")) return "from-[#0C4A6E] via-[#00629B] to-[#0D9488]";
  if (cat.includes("TALK") || cat.includes("SEMINAR")) return "from-[#1E293B] via-[#00629B] to-[#C2410C]";
  if (cat.includes("COMPETITION") || cat.includes("FEST") || cat.includes("CONFERENCE")) return "from-[#431407] via-[#00629B] to-[#7C3AED]";
  if (cat.includes("GROUP")) return "from-[#10243A] via-[#00629B] to-[#0284C7]";
  return "from-[#00629B] via-[#0284C7] to-[#10243A]";
}

function getChildren(events, parentId) {
  return events.filter((event) => event.parent_event_id === parentId);
}

function getDateRangeLabel(date = "") {
  const parts = String(date).match(/\d+/g) || [];
  if (parts.length >= 2) return `${parts[0]}–${parts[1]}`;
  return parts[0] || String(date);
}

// Event status is controlled by admins. Completed events remain in the archive.
function isPastEvent(event) {
  return event.status === "completed";
}

// Converts the event's stored day/month/year fields into a sortable timestamp.
// Date ranges use their final day so the event is ordered by when it concluded.
function getEventTimestamp(event) {
  const year = Number(event.year) || 0;
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames.indexOf(String(event.month || "").toUpperCase());
  const dayParts = String(event.date || "").match(/\d+/g) || [];
  const day = Number(dayParts[dayParts.length - 1] || 1);
  if (!year || month < 0) return 0;
  return new Date(year, month, day).getTime();
}

function getSearchableTreeText(events, event, visited = new Set()) {
  if (!event || visited.has(event.id)) return "";
  visited.add(event.id);
  return [
    event.title,
    event.description,
    event.venue,
    event.category,
    ...getChildren(events, event.id).map((child) => getSearchableTreeText(events, child, visited)),
  ].filter(Boolean).join(" ").toLowerCase();
}

function Events() {
  const { events = [] } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [galleryEvent, setGalleryEvent] = useState(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const router = useRouter();

  const mainEvents = useMemo(
    () => events.filter((event) => !event.parent_event_id),
    [events]
  );

  const sortedMainEvents = useMemo(
    () => [...mainEvents].sort((a, b) => getEventTimestamp(b) - getEventTimestamp(a)),
    [mainEvents]
  );

  const categories = useMemo(() => {
    const unique = new Set(sortedMainEvents.map((event) => event.category).filter(Boolean));
    return ["ALL", ...Array.from(unique)];
  }, [sortedMainEvents]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return sortedMainEvents.filter((event) => {
      const matchesCategory = selectedCategory === "ALL" ||
        event.category?.toUpperCase() === selectedCategory.toUpperCase();
      const searchableText = getSearchableTreeText(events, event);
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [sortedMainEvents, events, selectedCategory, searchQuery]);

  const handleOpenGallery = (event, index = 0) => {
    if (!event?.photos?.length) return;
    setGalleryEvent(event);
    setCurrentPhotoIdx(index);
  };
  const handleCloseGallery = () => {
    setGalleryEvent(null);
    setCurrentPhotoIdx(0);
  };
  const handlePrevPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setCurrentPhotoIdx((prev) => prev > 0 ? prev - 1 : galleryEvent.photos.length - 1);
  };
  const handleNextPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setCurrentPhotoIdx((prev) => prev < galleryEvent.photos.length - 1 ? prev + 1 : 0);
  };

  useEffect(() => {
    if (!galleryEvent) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleCloseGallery();
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryEvent]);

  const handleViewAll = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    document.getElementById("events-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExplore = (event) => {
    if (event?.id) router.push(`/events/${encodeURIComponent(event.id)}`);
  };

  return (
    <section id="events" className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-24 sm:pt-32 sm:pb-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.22)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
              Learn. Connect.
              <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent"> Experience at RNSIT.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#526477]">
              Explore hands-on technical workshops, inter-collegiate hackathons, distinguished expert lectures, and annual flagship symposiums organized by the IEEE Student Branch at R.N.S. Institute of Technology, Bengaluru.
            </p>
          </div>
          <button type="button" onClick={handleViewAll} className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#DCE5EC] bg-white px-6 py-3 font-semibold text-[#10243A] shadow-xs transition-all duration-300 hover:border-[#00629B]/35 hover:bg-gradient-to-r hover:from-white hover:to-[#E6F4FB] hover:text-[#00629B]">
            <span>View all events ({mainEvents.length})</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#647588] sm:inline-flex"><Filter size={14} className="text-[#00629B]" /> Filter:</span>
            {categories.map((cat) => {
              const count = cat === "ALL" ? mainEvents.length : mainEvents.filter((event) => event.category?.toUpperCase() === cat.toUpperCase()).length;
              const isSelected = selectedCategory.toUpperCase() === cat.toUpperCase();
              return (
                <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${isSelected ? "bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] text-white shadow-md shadow-[#00629B]/20" : "border border-slate-200/80 bg-slate-50/80 text-[#526477] hover:border-blue-200 hover:bg-sky-50/60 hover:text-[#10243A]"}`}>
                  <span>{cat}</span>
                  <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${isSelected ? "bg-white/20 text-white" : "bg-[#E6F4FB] text-[#00629B]"}`}>{count}</span>
                </button>
              );
            })}
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#647588]" />
            <input type="text" placeholder="Search events..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-[#DCE5EC] bg-white py-2 pl-9 pr-8 text-xs text-[#10243A] placeholder-[#8190A0] focus:border-[#00629B] focus:outline-none focus:ring-2 focus:ring-[#00629B]/10" />
            {searchQuery && <button type="button" onClick={() => setSearchQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#647588] hover:text-[#10243A]" aria-label="Clear search"><X size={14} /></button>}
          </div>
        </div>

        <div id="events-grid">
          {filteredEvents.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-[#DCE5EC] bg-white p-12 text-center shadow-sm">
              <Layers className="mx-auto text-[#00629B]" size={44} />
              <h3 className="mt-4 text-xl font-bold text-[#10243A]">No Matching Events Found</h3>
              <p className="mt-2 text-sm text-[#526477]">{searchQuery || selectedCategory !== "ALL" ? "No events match the selected filter or search keyword." : "Check back soon for new workshops, technical competitions, and hackathons."}</p>
              {(searchQuery || selectedCategory !== "ALL") && <button type="button" onClick={handleViewAll} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00629B] to-[#0074B5] px-5 py-2.5 text-xs font-semibold text-white shadow-md transition hover:scale-105">Reset Filters & View All</button>}
            </div>
          ) : (
            <div className="mt-8 grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => {
                const isPast = isPastEvent(event);
                const coverImage = event.cover_image_url || event.image_url;
                return (
                  <article key={event.id} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_8px_24px_rgba(16,36,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/35 hover:shadow-[0_20px_40px_rgba(0,98,155,0.14)]">
                    <div className={`relative h-40 shrink-0 overflow-hidden bg-gradient-to-br ${getEventHeaderGradient(event.category)} p-5`}>
                      {coverImage && <img src={coverImage} alt={`${event.title} event photo`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                      {coverImage && <div className="absolute inset-0 bg-slate-950/35" />}
                      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/20 animate-float-slow" />
                      <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full border border-white/15 animate-float-reverse" />
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                          <span>{event.category}</span>
                        </div>
                        <span className={`rounded-full border border-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md ${isPast ? "bg-slate-900/45" : "bg-emerald-700/45"}`}>
                          {isPast ? "Completed" : "Upcoming"}
                        </span>
                      </div>
                      {!isPast && (
                        <div className="absolute bottom-4 left-5 z-10 flex items-center gap-3">
                          <div className="flex h-14 min-w-[4.25rem] flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/95 px-2 text-[#10243A] shadow-md backdrop-blur-md">
                            <span className="whitespace-nowrap text-[17px] font-extrabold leading-none tracking-tight">{getDateRangeLabel(event.date)}</span>
                            <span className="mt-1 text-[10px] font-bold tracking-wide text-[#00629B]">{event.month}</span>
                          </div>
                          <div className="text-xs font-semibold tracking-wider text-white drop-shadow-sm">YEAR {event.year}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">{event.title}</h3>
                      {event.description && <p className="mt-2 line-clamp-4 text-[13px] leading-5 text-[#526477]">{event.description}</p>}

                      <div className="mt-auto space-y-2 border-t border-[#DCE5EC] pt-4">
                        {!isPast && (
                          <>
                            <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><CalendarDays size={16} className="shrink-0 text-[#00629B]" /><span>{getDateRangeLabel(event.date)} {event.month} {event.year}</span></div>
                            {event.time && <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><Clock size={16} className="shrink-0 text-[#29A9E0]" /><span>{event.time}</span></div>}
                            {event.venue && <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><MapPin size={16} className="shrink-0 text-[#F26522]" /><span>{event.venue}</span></div>}
                          </>
                        )}
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        <button type="button" onClick={() => handleExplore(event)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10243A] via-[#1A3856] to-[#10243A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#00629B] hover:via-[#0074B5] hover:to-[#0086CE]">
                          View Event Details <ArrowRight size={16} />
                        </button>
                        {!isPast && event.registration_url && (
                          <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#B8DCEC] bg-[#E6F4FB] px-4 py-2.5 text-sm font-semibold text-[#00629B] transition hover:bg-[#D6EFFB]">
                            Register for Event <ArrowRight size={16} />
                          </a>
                        )}
                        {isPast && <p className="text-center text-[11px] font-medium uppercase tracking-wider text-slate-400">Event completed</p>}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {galleryEvent?.photos?.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6" onClick={handleCloseGallery}>
            <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A] text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#00629B]/50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">{galleryEvent.category || "Event"}</span>
                    <span className="text-xs text-slate-400">Photo {currentPhotoIdx + 1} of {galleryEvent.photos.length}</span>
                  </div>
                  <h3 className="mt-1 truncate text-base font-bold sm:text-lg">{galleryEvent.title}</h3>
                </div>
                <button type="button" onClick={handleCloseGallery} className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Close photo gallery"><X size={20} /></button>
              </div>
              <div className="relative flex min-h-[280px] max-h-[60vh] flex-1 select-none items-center justify-center overflow-hidden bg-black/60 p-4">
                <img src={galleryEvent.photos[currentPhotoIdx]} alt={`${galleryEvent.title} photo ${currentPhotoIdx + 1}`} className="max-h-[56vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" />
                {galleryEvent.photos.length > 1 && (
                  <>
                    <button type="button" onClick={handlePrevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/20" aria-label="Previous photo"><ChevronLeft size={24} /></button>
                    <button type="button" onClick={handleNextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/20" aria-label="Next photo"><ChevronRight size={24} /></button>
                  </>
                )}
              </div>
              {galleryEvent.photos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto border-t border-white/10 bg-[#0a0f1d]/90 p-3">
                  {galleryEvent.photos.map((photo, idx) => (
                    <button key={idx} type="button" onClick={() => setCurrentPhotoIdx(idx)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${currentPhotoIdx === idx ? "border-[#38BDF8] opacity-100 ring-2 ring-[#38BDF8]/40" : "border-transparent opacity-50 hover:opacity-85"}`}>
                      <img src={photo} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Events;
