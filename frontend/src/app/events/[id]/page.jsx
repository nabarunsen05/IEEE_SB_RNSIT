"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CalendarDays, Camera, CheckCircle2,
  ChevronLeft, ChevronRight, Clock, Layers, MapPin, X,
} from "lucide-react";
import { useAdmin } from "../../../context/AdminContext";
import { supabase } from "../../../lib/supabase";
import EventRegistrationForm from "../../../components/events/EventRegistrationForm";
import Pop, { PopGroup, PopItem } from "../../../components/Pop";

function getChildren(events, parentId) {
  if (!Array.isArray(events) || !parentId) return [];
  return events.filter((event) => event.parent_event_id === parentId);
}

function getDateRangeLabel(date = "") {
  const parts = String(date).match(/\d+/g) || [];
  if (parts.length >= 2) return `${parts[0]}–${parts[1]}`;
  return parts[0] || String(date);
}

function EventGallery({ event, onOpen }) {
  const photos = Array.isArray(event.photos) ? event.photos : [];
  if (!photos.length) return null;
  return (
    <section className="mt-10">
      <Pop className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00629B]">Memories</p>
          <h2 className="mt-1 text-2xl font-extrabold text-[#10243A]">Event Gallery</h2>
        </div>
        <span className="rounded-full bg-[#E6F4FB] px-3 py-1.5 text-xs font-semibold text-[#00629B]">
          {photos.length} photo{photos.length === 1 ? "" : "s"}
        </span>
      </Pop>
      <PopGroup className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, index) => (
          <PopItem key={`${photo}-${index}`}>
          <motion.button
            whileHover={{ y: -4, boxShadow: "0 14px 28px rgba(16,36,58,0.14)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            type="button"
            onClick={() => onOpen(event, index)}
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 text-left cursor-pointer"
          >
            <img
              src={photo}
              alt={`${event.title} gallery image ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-[#10243A]/0 text-white transition group-hover:bg-[#10243A]/25">
              <Camera className="opacity-0 drop-shadow transition group-hover:opacity-100" size={24} />
            </span>
          </motion.button>
          </PopItem>
        ))}
      </PopGroup>
    </section>
  );
}

function NestedEvent({ event, events, depth = 0, onOpenGallery }) {
  const children = getChildren(events, event.id);
  const isCompleted = event.status === "completed";
  return (
    <details className={`group overflow-hidden rounded-2xl border border-[#DCE5EC] bg-white shadow-sm transition hover:border-[#B8DCEC] ${depth ? "ml-3 sm:ml-6" : ""}`}>
      <summary className="flex cursor-pointer list-none items-center gap-4 px-4 py-4 marker:hidden sm:px-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E6F4FB] text-[#00629B]"><Layers size={18} /></span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#B8DCEC] bg-[#E6F4FB] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#00629B]">{event.category || "Event"}</span>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isCompleted ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>{isCompleted ? "Completed" : "Upcoming"}</span>
          </span>
          <span className="mt-1 block truncate text-base font-bold text-[#10243A]">{event.title}</span>
          {!isCompleted && (
            <span className="mt-1 block truncate text-xs text-[#647588]">
              {[getDateRangeLabel(event.date), event.month, event.year].filter(Boolean).join(" ")}
              {event.time ? ` · ${event.time}` : ""}
              {event.venue ? ` · ${event.venue}` : ""}
            </span>
          )}
        </span>
        <ChevronRight size={18} className="shrink-0 text-[#647588] transition-transform group-open:rotate-90" />
      </summary>

      <div className="border-t border-[#E8EEF3] bg-[#F8FBFD] px-4 py-5 sm:px-5">
        {event.description && <p className="whitespace-pre-line text-sm leading-7 text-[#526477]">{event.description}</p>}
        {!isCompleted && (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#647588]">
            {(event.date || event.month || event.year) && <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2"><CalendarDays size={14} className="text-[#00629B]" />{getDateRangeLabel(event.date)} {event.month} {event.year}</span>}
            {event.time && <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2"><Clock size={14} className="text-[#00629B]" />{event.time}</span>}
            {event.venue && <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2"><MapPin size={14} className="text-[#00629B]" />{event.venue}</span>}
          </div>
        )}
        {isCompleted && event.recap && (
          <div className="mt-4 rounded-xl border border-[#DCE5EC] bg-white p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#00629B]">Event recap</p>
            <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#526477]">{event.recap}</p>
          </div>
        )}
        <EventGallery event={event} onOpen={onOpenGallery} />
        {!isCompleted && event.registration_enabled && (
          <Link href={`/events/${encodeURIComponent(event.id)}`} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#10243A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00629B]">Register for this event <ArrowRight size={16} /></Link>
        )}
        {!isCompleted && !event.registration_enabled && event.registration_url && (
          <a href={event.registration_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#10243A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00629B]">Register for this event <ArrowRight size={16} /></a>
        )}
        {children.length > 0 && (
          <section className="mt-6">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#00629B]"><Layers size={14} /> Related activities</div>
            <div className="space-y-3">{children.map((child) => <NestedEvent key={child.id} event={child} events={events} depth={depth + 1} onOpenGallery={onOpenGallery} />)}</div>
          </section>
        )}
      </div>
    </details>
  );
}

export default function EventDetailsPage() {
  const {
    events = [],
    isLoading,
  } = useAdmin();
  const params = useParams();
  const rawId = params?.id;
  const eventId = rawId ? decodeURIComponent(String(rawId)) : "";
  const eventFromContext = events.find((item) => String(item.id) === eventId);

  const [directEvent, setDirectEvent] = useState(null);
  const [directChildren, setDirectChildren] = useState([]);
  const [directLoading, setDirectLoading] = useState(false);
  const [directFetched, setDirectFetched] = useState(false);
  const [galleryEvent, setGalleryEvent] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  useEffect(() => {
    if (!eventId || eventFromContext) return;
    let isMounted = true;
    setDirectLoading(true);
    const fetchDirect = async () => {
      try {
        if (supabase) {
          const { data, error } = await supabase.from("events").select("*").eq("id", eventId).maybeSingle();
          if (isMounted && data && !error) setDirectEvent(data);
          const { data: childrenData } = await supabase.from("events").select("*").eq("parent_event_id", eventId);
          if (isMounted && childrenData) setDirectChildren(childrenData);
        }
      } catch (err) {
        console.error("Direct event fetch failed:", err);
      } finally {
        if (isMounted) {
          setDirectLoading(false);
          setDirectFetched(true);
        }
      }
    };
    fetchDirect();
    return () => { isMounted = false; };
  }, [eventId, eventFromContext]);

  const event = eventFromContext || directEvent;
  const allEvents = events.length > 0 ? events : (event ? [event, ...directChildren] : []);

  const openGallery = (target, index = 0) => {
    if (!target?.photos?.length) return;
    setGalleryEvent(target);
    setPhotoIndex(index);
  };
  const closeGallery = () => {
    setGalleryEvent(null);
    setPhotoIndex(0);
  };
  const previousPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setPhotoIndex((index) => index === 0 ? galleryEvent.photos.length - 1 : index - 1);
  };
  const nextPhoto = () => {
    if (!galleryEvent?.photos?.length) return;
    setPhotoIndex((index) => (index + 1) % galleryEvent.photos.length);
  };

  useEffect(() => {
    if (!galleryEvent) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeGallery();
      if (e.key === "ArrowLeft") previousPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryEvent]);

  // Lock both document and body scrolling while either modal is open.
  useEffect(() => {
    if (!isRegistrationOpen && !galleryEvent) return;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    const onKeyDown = (event) => {
      if (event.key === "Escape" && isRegistrationOpen) setIsRegistrationOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isRegistrationOpen, galleryEvent]);

  const isStillLoading = !event && (isLoading || directLoading || (!directFetched && !eventFromContext));
  if (isStillLoading) {
    return <main className="min-h-screen bg-[#F5F9FC] px-5 pb-20 pt-28"><div className="mx-auto max-w-3xl rounded-3xl border border-[#DCE5EC] bg-white p-12 text-center text-sm text-[#647588] shadow-sm"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#00629B] border-t-transparent" /><p className="mt-4 font-medium text-[#10243A]">Loading event details...</p></div></main>;
  }

  if (!event) {
    return (
      <main className="min-h-screen bg-[#F5F9FC] px-5 pb-20 pt-28">
        <div className="mx-auto max-w-3xl rounded-3xl border border-[#DCE5EC] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E6F4FB] text-[#00629B]"><CalendarDays size={32} /></div>
          <h1 className="mt-4 text-2xl font-bold text-[#10243A]">Event Not Found</h1>
          <p className="mt-2 text-sm text-[#647588]">The requested event ID could not be found or may have been removed.</p>
          <div className="mt-6"><Link href="/events" className="inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004F7D]"><ArrowLeft size={16} /> Back to Events</Link></div>
        </div>
      </main>
    );
  }

  const children = getChildren(allEvents, event.id);
  const isCompleted = event.status === "completed";
  const cover = event.cover_image_url || event.image_url || event.photos?.[0];

  return (
    <main className="min-h-screen bg-[#F5F9FC] pb-20 pt-24 sm:pt-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: "inline-flex" }}>
        <Link
          href="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#526477] transition hover:text-[#00629B]"
        >
          <ArrowLeft size={17} /> Back to all events
        </Link>
        </motion.div>
        <article className="overflow-hidden rounded-[28px] border border-[#DCE5EC] bg-white shadow-[0_18px_55px_rgba(16,36,58,0.09)]">
          {cover ? (
            <div className="relative h-64 bg-[#10243A] sm:h-[390px]">
              <img src={cover} alt={`${event.title} cover`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/85 via-[#071827]/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white sm:p-9">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">{event.category || "Event"}</span>
                  <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${isCompleted ? "bg-slate-200/90 text-slate-700" : "bg-emerald-300/90 text-emerald-900"}`}>{isCompleted ? "Completed" : "Upcoming"}</span>
                </div>
                <Pop delay={0}>
                <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{event.title}</h1>
                </Pop>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#10243A] via-[#00629B] to-[#0284C7] p-7 text-white sm:p-10">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">{event.category || "Event"}</span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">{isCompleted ? "Completed" : "Upcoming"}</span>
              </div>
              <Pop delay={0}>
              <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{event.title}</h1>
              </Pop>
            </div>
          )}

          <div className="p-6 sm:p-9">
            {!isCompleted && (
              <PopGroup className="grid gap-3 sm:grid-cols-3">
                <PopItem>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,98,155,0.08)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-2xl bg-[#F4F8FB] p-4"
                >
                  <CalendarDays size={18} className="text-[#00629B]" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8190A0]">Date</p>
                  <p className="mt-1 text-sm font-semibold text-[#10243A]">
                    {getDateRangeLabel(event.date)} {event.month} {event.year}
                  </p>
                </motion.div>
                </PopItem>
                <PopItem>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,98,155,0.08)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-2xl bg-[#F4F8FB] p-4"
                >
                  <Clock size={18} className="text-[#00629B]" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8190A0]">Time</p>
                  <p className="mt-1 text-sm font-semibold text-[#10243A]">{event.time || "To be announced"}</p>
                </motion.div>
                </PopItem>
                <PopItem>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,98,155,0.08)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-2xl bg-[#F4F8FB] p-4"
                >
                  <MapPin size={18} className="text-[#00629B]" />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#8190A0]">Venue</p>
                  <p className="mt-1 text-sm font-semibold text-[#10243A]">{event.venue || "To be announced"}</p>
                </motion.div>
                </PopItem>
              </PopGroup>
            )}

            {event.description && (
              <Pop>
              <section className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00629B]">About the event</p>
                <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-[#526477]">{event.description}</p>
              </section>
              </Pop>
            )}

            {isCompleted && event.recap && (
              <Pop>
              <section className="mt-8 rounded-2xl border border-[#DCE5EC] bg-[#F8FBFD] p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#00629B]">
                  <CheckCircle2 size={16} /> Event recap
                </div>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#526477]">{event.recap}</p>
              </section>
              </Pop>
            )}

            {!isCompleted && event.registration_enabled && (
              <Pop>
              <section className="mt-9 flex flex-col gap-3 rounded-2xl border border-[#B8DCEC] bg-[#F3FAFE] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00629B]">Registration</p>
                  <h2 className="mt-1 text-lg font-extrabold text-[#10243A]">Be part of {event.title}</h2>
                  <p className="mt-1 text-sm text-[#647588]">{event.registration_type === "team" ? `Team size: ${event.min_team_size}–${event.max_team_size}, including the team leader.` : "Individual registration is available."}</p>
                </div>
                <button type="button" onClick={() => setIsRegistrationOpen(true)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00629B] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#004F7D]">Register for Event <ArrowRight size={17} /></button>
              </section>
              </Pop>
            )}

            {!isCompleted && !event.registration_enabled && event.registration_url && (
              <Pop>
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href={event.registration_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00629B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004F7D]"
              >
                Register for Event <ArrowRight size={17} />
              </motion.a>
              </Pop>
            )}

            <EventGallery event={event} onOpen={openGallery} />
            {children.length > 0 && (
              <section className="mt-12">
                <Pop className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00629B]">Event structure</p>
                  <h2 className="mt-1 text-2xl font-extrabold text-[#10243A]">Activities & Competitions</h2>
                  <p className="mt-2 text-sm leading-6 text-[#647588]">
                    Explore the activities and competitions conducted as part of this event.
                  </p>
                </Pop>
                <PopGroup className="space-y-4">
                  {children.map((child) => (
                    <PopItem key={child.id}>
                      <NestedEvent key={child.id} event={child} events={allEvents} onOpenGallery={openGallery} />
                    </PopItem>
                  ))}
                </PopGroup>
              </section>
            )}
          </div>
        </article>
      </div>

      {isRegistrationOpen && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[2147483000] flex items-center justify-center overflow-hidden bg-[#10243A]/75 p-2 backdrop-blur-md sm:p-5"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setIsRegistrationOpen(false); }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-modal-title"
            className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#DCE5EC] bg-white shadow-2xl sm:max-h-[calc(100dvh-2.5rem)]"
          >
            <header className="z-10 flex shrink-0 items-center justify-between gap-4 border-b border-[#E8EEF3] bg-white px-4 py-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#00629B]">Event registration</p>
                <h2 id="registration-modal-title" className="mt-1 truncate text-base font-extrabold text-[#10243A] sm:text-lg">Register for {event.title}</h2>
              </div>
              <button type="button" onClick={() => setIsRegistrationOpen(false)} aria-label="Close registration" className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"><X size={20} /></button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5" style={{ WebkitOverflowScrolling: "touch" }}>
              <EventRegistrationForm event={event} />
            </div>
          </section>
        </div>,
        document.body
      )}

      {galleryEvent?.photos?.length > 0 && (
        <div className="fixed inset-0 z-[2147482000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={closeGallery}>
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] text-white" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="min-w-0"><p className="text-xs text-slate-400">Photo {photoIndex + 1} of {galleryEvent.photos.length}</p><h2 className="truncate font-semibold">{galleryEvent.title}</h2></div><button type="button" onClick={closeGallery} aria-label="Close gallery" className="rounded-full p-2 text-slate-300 hover:bg-white/10"><X size={20} /></button></div>
            <div className="relative flex min-h-[280px] flex-1 items-center justify-center bg-black/40 p-4"><img src={galleryEvent.photos[photoIndex]} alt={`${galleryEvent.title} photo ${photoIndex + 1}`} className="max-h-[65vh] max-w-full rounded-lg object-contain" />
              {galleryEvent.photos.length > 1 && <><button type="button" onClick={previousPhoto} aria-label="Previous photo" className="absolute left-3 rounded-full bg-black/60 p-3 hover:bg-white/20"><ChevronLeft size={22} /></button><button type="button" onClick={nextPhoto} aria-label="Next photo" className="absolute right-3 rounded-full bg-black/60 p-3 hover:bg-white/20"><ChevronRight size={22} /></button></>}
            </div>
            {galleryEvent.photos.length > 1 && <div className="flex gap-2 overflow-x-auto border-t border-white/10 p-3">{galleryEvent.photos.map((photo, index) => <button key={`${photo}-${index}`} type="button" onClick={() => setPhotoIndex(index)} className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${photoIndex === index ? "border-sky-400" : "border-transparent opacity-60"}`}><img src={photo} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" /></button>)}</div>}
          </div>
        </div>
      )}
    </main>
  );
}
