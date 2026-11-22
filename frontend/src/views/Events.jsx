"use client";

import { useState, useMemo, useEffect } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Filter,
  X,
  Layers,
  ChevronDown,
  ChevronUp,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

function getEventHeaderGradient(category = "") {
  const cat = category.toUpperCase();
  if (cat.includes("HACKATHON") || cat.includes("CODE")) {
    return "from-[#0C4A6E] via-[#00629B] to-[#0D9488]";
  }
  if (cat.includes("TALK") || cat.includes("SEMINAR")) {
    return "from-[#1E293B] via-[#00629B] to-[#C2410C]";
  }
  if (cat.includes("COMPETITION") || cat.includes("FEST") || cat.includes("CONFERENCE")) {
    return "from-[#431407] via-[#00629B] to-[#7C3AED]";
  }
  if (cat.includes("GROUP")) {
    return "from-[#10243A] via-[#00629B] to-[#0284C7]";
  }
  return "from-[#00629B] via-[#0284C7] to-[#10243A]";
}

function getChildren(events, parentId) {
  return events.filter((event) => event.parent_event_id === parentId);
}

// Keep date ranges such as "08-09" on one line inside the date tile.
function getDateRangeLabel(date = "") {
  const parts = String(date).match(/\d+/g) || [];
  if (parts.length >= 2) return `${parts[0]}–${parts[1]}`;
  return parts[0] || String(date);
}

// Supports a single day ("17") or a range ("08-09" / "08–09").
// An event is past only after the final day has ended in the event's local date.
function isPastEvent(event) {
  const monthNumbers = {
    JAN: 0, FEB: 1, MAR: 2, APR: 3, MAY: 4, JUN: 5,
    JUL: 6, AUG: 7, SEP: 8, OCT: 9, NOV: 10, DEC: 11,
  };
  const monthIndex = monthNumbers[String(event.month || "").toUpperCase().slice(0, 3)];
  const year = Number(event.year);
  const days = String(event.date || "").match(/\d+/g);
  if (monthIndex === undefined || !year || !days?.length) return false;
  const finalDay = Number(days[days.length - 1]);
  const endOfEvent = new Date(year, monthIndex, finalDay, 23, 59, 59, 999);
  return endOfEvent < new Date();
}

function getDescendantCount(events, eventId, visited = new Set()) {
  if (visited.has(eventId)) return 0;
  visited.add(eventId);
  const children = getChildren(events, eventId);
  return children.reduce(
    (total, child) => total + 1 + getDescendantCount(events, child.id, visited),
    0
  );
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
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function EventTreeNode({ event, events, depth = 0, onOpenGallery }) {
  const children = getChildren(events, event.id);
  const isGroup = children.length > 0;
  const isStructuralGroup = event.category?.toUpperCase() === "EVENT GROUP";
  const isPast = isPastEvent(event);
  const hasPhotos = Array.isArray(event.photos) && event.photos.length > 0;

  return (
    <div className={`${depth === 0 ? "" : "border-l-2 border-[#B8DCEC] pl-4 sm:pl-5"} ${depth > 0 ? "mt-4" : ""}`}>
      <article className={`rounded-2xl border p-5 ${isStructuralGroup ? "border-[#B8DCEC] bg-[#F0F8FC]" : "border-[#DCE5EC] bg-white"}`}>
        {event.image_url && (
          <img src={event.image_url} alt={`${event.title} event photo`} loading="lazy" className="mb-4 max-h-72 w-full rounded-xl border border-[#DCE5EC] object-cover" />
        )}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#B8DCEC] bg-[#E6F4FB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00629B]">
                {isStructuralGroup ? "EVENT CATEGORY" : event.category || "EVENT"}
              </span>
              {event.date && event.month && event.year && (
                <span className="text-xs text-slate-500">{getDateRangeLabel(event.date)} {event.month} {event.year}</span>
              )}
            </div>
            <h4 className="mt-2 text-lg font-bold text-[#10243A]">{event.title}</h4>
            {event.description && (
              <p className="mt-2 text-sm leading-6 text-[#526477]">{event.description}</p>
            )}
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              {event.time && <span className="inline-flex items-center gap-1.5"><Clock size={13} className="text-[#00629B]" />{event.time}</span>}
              {event.venue && <span className="inline-flex items-center gap-1.5"><MapPin size={13} className="text-[#00629B]" />{event.venue}</span>}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {hasPhotos && (
              <button
                type="button"
                onClick={() => onOpenGallery && onOpenGallery(event)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00629B] to-[#0284C7] px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                <Camera size={14} /> Photos ({event.photos.length})
              </button>
            )}
            {isGroup ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#E6F4FB] px-3 py-1.5 text-xs font-semibold text-[#00629B]">
                <Layers size={13} /> {getDescendantCount(events, event.id)} nested item{getDescendantCount(events, event.id) === 1 ? "" : "s"}
              </span>
            ) : !isPast && event.registration_url ? (
              <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#10243A] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#00629B]">
                Register <ArrowRight size={14} />
              </a>
            ) : isPast && !hasPhotos ? (
              <span className="inline-flex shrink-0 items-center rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">Event completed</span>
            ) : null}
          </div>
        </div>
        {children.length > 0 && (
          <div className="mt-5 space-y-4">
            {isStructuralGroup && (
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#00629B]">Departments and competitions</p>
            )}
            {children.map((child) => (
              <EventTreeNode key={child.id} event={child} events={events} depth={depth + 1} onOpenGallery={onOpenGallery} />
            ))}
          </div>
        )}
      </article>
    </div>
  );
}

function Events() {
  const { events } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [galleryEvent, setGalleryEvent] = useState(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const handleOpenGallery = (event, initialIndex = 0) => {
    if (!event?.photos?.length) return;
    setGalleryEvent(event);
    setCurrentPhotoIdx(initialIndex);
  };

  const handleCloseGallery = () => {
    setGalleryEvent(null);
    setCurrentPhotoIdx(0);
  };

  const handlePrevPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setCurrentPhotoIdx((prev) => (prev > 0 ? prev - 1 : galleryEvent.photos.length - 1));
  };

  const handleNextPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setCurrentPhotoIdx((prev) => (prev < galleryEvent.photos.length - 1 ? prev + 1 : 0));
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

  // Only top-level records are shown as public event cards. Existing PARADOX
  // children and new multi-level LUMINUS groups share the same hierarchy.
  const mainEvents = useMemo(
    () => events.filter((event) => !event.parent_event_id),
    [events]
  );

  const categories = useMemo(() => {
    const unique = new Set(mainEvents.map((event) => event.category).filter(Boolean));
    return ["ALL", ...Array.from(unique)];
  }, [mainEvents]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return mainEvents.filter((event) => {
      const matchesCategory =
        selectedCategory === "ALL" ||
        event.category?.toUpperCase() === selectedCategory.toUpperCase();
      const searchableText = getSearchableTreeText(events, event);
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [mainEvents, events, selectedCategory, searchQuery]);

  const selectedEvent = mainEvents.find((event) => event.id === selectedEventId);
  const selectedChildren = selectedEvent ? getChildren(events, selectedEvent.id) : [];

  const handleViewAll = () => {
    setSelectedCategory("ALL");
    setSearchQuery("");
    setSelectedEventId(null);
    document.getElementById("events-grid")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleExplore = (event) => {
    const hasChildren = getChildren(events, event.id).length > 0;
    if (!hasChildren) {
      if (event.registration_url) window.open(event.registration_url, "_blank", "noopener,noreferrer");
      else window.alert("Registration link is not available yet.");
      return;
    }
    setSelectedEventId((current) => current === event.id ? null : event.id);
    if (selectedEventId !== event.id) {
      window.setTimeout(() => document.getElementById("event-details")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    }
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
                const nestedCount = getDescendantCount(events, event.id);
                const isExpanded = selectedEventId === event.id;
                const isPast = isPastEvent(event);
                return (
                  <article key={event.id} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_8px_24px_rgba(16,36,58,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/35 hover:shadow-[0_20px_40px_rgba(0,98,155,0.14)]">
                    <div className={`relative h-40 shrink-0 overflow-hidden bg-gradient-to-br ${getEventHeaderGradient(event.category)} p-5`}>
                      {event.image_url && <img src={event.image_url} alt={`${event.title} event photo`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />}
                      {event.image_url && <div className="absolute inset-0 bg-slate-950/35" />}
                      <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/20 animate-float-slow" />
                      <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full border border-white/15 animate-float-reverse" />
                      <div className="relative z-10 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/20 px-3.5 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md shadow-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                          <span>{event.category}</span>
                        </div>
                        {event.photos?.length > 0 && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenGallery(event); }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm transition hover:bg-black/60"
                            title="View Photos"
                          >
                            <Camera size={13} className="text-[#29A9E0]" />
                            <span>{event.photos.length} Photo{event.photos.length === 1 ? "" : "s"}</span>
                          </button>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-5 z-10 flex items-center gap-3">
                        <div className="flex h-14 min-w-[4.25rem] flex-col items-center justify-center rounded-2xl border border-white/40 bg-white/95 px-2 text-[#10243A] shadow-md backdrop-blur-md">
                          <span className="whitespace-nowrap text-[17px] font-extrabold leading-none tracking-tight">{getDateRangeLabel(event.date)}</span>
                          <span className="mt-1 text-[10px] font-bold tracking-wide text-[#00629B]">{event.month}</span>
                        </div>
                        <div className="text-xs font-semibold tracking-wider text-white drop-shadow-sm">YEAR {event.year}</div>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold leading-snug text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">{event.title}</h3>
                      <p className="mt-2 line-clamp-4 text-[13px] leading-5 text-[#526477]">{event.description}</p>
                      {nestedCount > 0 && <p className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#E6F4FB] px-3 py-1 text-[11px] font-semibold text-[#00629B]"><Layers size={13} /> {nestedCount} nested event/group{nestedCount === 1 ? "" : "s"}</p>}
                      <div className="mt-auto space-y-2 border-t border-[#DCE5EC] pt-4">
                        <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><CalendarDays size={16} className="shrink-0 text-[#00629B]" /><span>{getDateRangeLabel(event.date)} {event.month} {event.year}</span></div>
                        <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><Clock size={16} className="shrink-0 text-[#29A9E0]" /><span>{event.time}</span></div>
                        <div className="flex items-center gap-2.5 text-[13px] text-[#526477]"><MapPin size={16} className="shrink-0 text-[#F26522]" /><span>{event.venue}</span></div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2">
                        {event.photos?.length > 0 && (
                          <button
                            type="button"
                            onClick={() => handleOpenGallery(event)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0284C7] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:brightness-110"
                          >
                            <Camera size={16} />
                            <span>View Event Photos ({event.photos.length})</span>
                          </button>
                        )}

                        {nestedCount > 0 ? (
                          <button type="button" onClick={() => handleExplore(event)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10243A] via-[#1A3856] to-[#10243A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#00629B] hover:via-[#0074B5] hover:to-[#0086CE]">
                            {isExpanded ? "Hide Event Details" : "Explore Event"}
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        ) : !isPast && event.registration_url ? (
                          <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10243A] via-[#1A3856] to-[#10243A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-[#00629B] hover:via-[#0074B5] hover:to-[#0086CE]">
                            Register for Event <ArrowRight size={16} />
                          </a>
                        ) : isPast && (!event.photos || event.photos.length === 0) ? (
                          <p className="py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Event completed</p>
                        ) : isPast && event.photos?.length > 0 ? (
                          <p className="text-center text-[11px] font-medium uppercase tracking-wider text-slate-400">Event completed</p>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {selectedEvent && selectedChildren.length > 0 && (
          <section id="event-details" className="mt-12 scroll-mt-28 rounded-3xl border border-[#DCE5EC] bg-white p-6 shadow-[0_12px_36px_rgba(16,36,58,0.07)] sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00629B]">Event overview and activities</p>
                <h3 className="mt-2 text-2xl font-extrabold text-[#10243A]">{selectedEvent.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-[#526477]">Explore the flagship event, event groups, departments and competitions conducted as part of this event.</p>
              </div>
              <button type="button" onClick={() => setSelectedEventId(null)} className="inline-flex items-center gap-2 self-start rounded-lg border border-[#DCE5EC] px-3 py-2 text-xs font-semibold text-[#526477] hover:bg-slate-50"><X size={14} /> Close</button>
            </div>
            <div className="mt-6 space-y-5">
              {selectedChildren.map((child) => (
                <EventTreeNode
                  key={child.id}
                  event={child}
                  events={events}
                  depth={0}
                  onOpenGallery={handleOpenGallery}
                />
              ))}
            </div>
          </section>
        )}

        {/* Event Photos Lightbox Modal */}
        {galleryEvent && Array.isArray(galleryEvent.photos) && galleryEvent.photos.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={handleCloseGallery}
          >
            <div
              className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#0F172A] border border-white/10 shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#00629B]/50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#38BDF8]">
                      {galleryEvent.category || "Event"}
                    </span>
                    <span className="text-xs text-slate-400">
                      Photo {currentPhotoIdx + 1} of {galleryEvent.photos.length}
                    </span>
                  </div>
                  <h3 className="mt-1 truncate text-base font-bold text-white sm:text-lg">
                    {galleryEvent.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCloseGallery}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close photo gallery"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Image View */}
              <div className="relative flex flex-1 items-center justify-center bg-black/60 p-4 min-h-[280px] max-h-[60vh] overflow-hidden select-none">
                <img
                  src={galleryEvent.photos[currentPhotoIdx]}
                  alt={`${galleryEvent.title} photo ${currentPhotoIdx + 1}`}
                  className="max-h-[56vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />

                {galleryEvent.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-110"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/20 hover:scale-110"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {galleryEvent.photos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto border-t border-white/10 p-3 bg-[#0a0f1d]/90">
                  {galleryEvent.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentPhotoIdx(idx)}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                        currentPhotoIdx === idx
                          ? "border-[#38BDF8] opacity-100 ring-2 ring-[#38BDF8]/40 scale-105"
                          : "border-transparent opacity-50 hover:opacity-85"
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
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
