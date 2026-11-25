"use client";

import AdminManagement from "../components/admin/AdminManagement";
import TeamManagement from "../components/admin/TeamManagement";
import { useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Users,
  Calendar,
  LogOut,
  ExternalLink,
  CheckCircle,
  UserCheck,
  UserRound,
  Mail,
  ShieldCheck,
  Camera,
  Upload,
  Search,
  X,
  ChevronDown,
  Pencil,
  Images,
  MoreHorizontal,
  GripVertical,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

const CATEGORIES = [
  "WORKSHOP",
  "HACKATHON",
  "TECH TALK",
  "WEBINAR",
  "BOOTCAMP",
  "CONFERENCE",
  "COMPETITION",
  "MEETUP",
  "EVENT GROUP",
];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];






export default function AdminDashboard() {
  const {
    logout,
    adminProfile,
    isAuthenticated,
    events,
    addEvent,
    updateEvent,
    setEventStatus,
    updateEventRecap,
    uploadEventPhotos,
    removeEventPhoto,
    setEventCoverPhoto,
    reorderEventPhotos,
    removeEvent,
    executiveCommittee,
    addExecomMember,
    removeExecomMember,
    isLoading,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("events"); // "events" | "team" | "administrators"
  const [notification, setNotification] = useState(null);
  const [isLoggingOutLocal, setIsLoggingOutLocal] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [photoManagerEventId, setPhotoManagerEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editEventForm, setEditEventForm] = useState(null);
  const [isSavingEvent, setIsSavingEvent] = useState(false);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const [openEventMenuId, setOpenEventMenuId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [draggedPhotoId, setDraggedPhotoId] = useState(null);
  const [isPhotoDropActive, setIsPhotoDropActive] = useState(false);
  const photoInputRef = useRef(null);
  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("ALL");
  const [eventSort, setEventSort] = useState("DATE_DESC");
  const [eventPage, setEventPage] = useState(1);
  const EVENTS_PER_PAGE = 10;

  // Keep the page behind dialogs from scrolling. Each dialog owns one scroll area.
  useEffect(() => {
    const modalOpen = isEventModalOpen || Boolean(editingEvent) || Boolean(photoManagerEventId);
    if (!modalOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isEventModalOpen, editingEvent, photoManagerEventId]);

  const handleLogout = async () => {
    if (isLoggingOutLocal) return;
    setIsLoggingOutLocal(true);
    try {
      await logout();
      window.location.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      showNotification("Failed to log out. Please try again.", "error");
      setIsLoggingOutLocal(false);
    }
  };

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: "",
    category: "WORKSHOP",
    date: new Date().getDate().toString(),
    month: MONTHS[new Date().getMonth()],
    year: new Date().getFullYear().toString(),
    time: "10:00 AM",
    venue: "RNSIT Campus",
    description: "",
    registration_url: "",
    parent_event_id: "",
  });

  // Any existing event can be a parent, enabling multi-level structures such as
  // LUMINUS -> Department-wise Events -> CSE -> individual competitions.
  const getEventPathLabel = (event) => {
    const parts = [event.title];
    let parentId = event.parent_event_id;
    const visited = new Set([event.id]);
    while (parentId && !visited.has(parentId)) {
      visited.add(parentId);
      const parent = events.find((item) => item.id === parentId);
      if (!parent) break;
      parts.unshift(parent.title);
      parentId = parent.parent_event_id;
    }
    return parts.join(" / ");
  };

  const rootEvents = events.filter((event) => !event.parent_event_id);

  const eventMatchesSearch = (event, query) => {
    const ownMatch = [event.title, event.category, event.description, event.year]
      .some((value) => String(value || "").toLowerCase().includes(query));
    const childMatch = events
      .filter((item) => item.parent_event_id === event.id)
      .some((child) => eventMatchesSearch(child, query));
    return ownMatch || childMatch;
  };

  const filteredRootEvents = rootEvents.filter((event) => {
    const query = eventSearch.trim().toLowerCase();
    const matchesSearch = !query || eventMatchesSearch(event, query);
    const matchesCategory = eventCategoryFilter === "ALL" || event.category === eventCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  const sortedRootEvents = [...filteredRootEvents].sort((a, b) => {
    if (eventSort === "TITLE_ASC") return String(a.title || "").localeCompare(String(b.title || ""));
    const dateValue = (event) => (Number(event.year) || 0) * 10000 + (MONTHS.indexOf(event.month) + 1) * 100 + (Number(event.date) || 0);
    return dateValue(b) - dateValue(a);
  });

  const totalEventPages = Math.max(1, Math.ceil(sortedRootEvents.length / EVENTS_PER_PAGE));
  const paginatedRootEvents = sortedRootEvents.slice(
    (eventPage - 1) * EVENTS_PER_PAGE,
    eventPage * EVENTS_PER_PAGE
  );

  // ExeCom Form State
  const [memberForm, setMemberForm] = useState({
    name: "",
    role: "Student Chair",
    description: "",
    email: "",
    linkedin: "",
    image: "",
  });

  const fileInputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showNotification("Please select a valid image file (PNG, JPG, WEBP).", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Resize to max 400x400 to keep base64 payload ultra lightweight (~25-35KB)
        const maxDim = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.85);

        setMemberForm((prev) => ({
          ...prev,
          image: compressedBase64,
        }));
        showNotification("Profile photo attached!");
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setMemberForm((prev) => ({ ...prev, image: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Handle Event Submit
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventForm.title.trim()) {
      showNotification("Please enter an event title.", "error");
      return;
    }

    const selectedParent = eventForm.parent_event_id;
    const result = await addEvent({
      ...eventForm,
      parent_event_id: selectedParent || null,
    });
    if (result?.success === false) {
      showNotification(result.message || "Could not save the event.", "error");
      return;
    }
    showNotification(
      selectedParent
        ? `"${eventForm.title}" added under its selected parent!`
        : `Event "${eventForm.title}" successfully saved!`
    );
    
    // Reset form
    setEventForm({
      title: "",
      category: "WORKSHOP",
      date: new Date().getDate().toString(),
      month: MONTHS[new Date().getMonth()],
      year: new Date().getFullYear().toString(),
      time: "10:00 AM",
      venue: "RNSIT Campus",
      description: "",
      registration_url: "",
      parent_event_id: "",
    });
    setIsEventModalOpen(false);
    setEventSearch("");
    setEventCategoryFilter("ALL");
    setEventPage(1);
  };

  const photoManagerEvent = events.find((event) => event.id === photoManagerEventId) || null;

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEditEventForm({
      title: event.title || "",
      category: event.category || "WORKSHOP",
      date: event.date || "",
      month: String(event.month || MONTHS[new Date().getMonth()]).toUpperCase(),
      year: event.year || String(new Date().getFullYear()),
      time: event.time || "",
      venue: event.venue || "",
      description: event.description || "",
      registration_url: event.registration_url || "",
      parent_event_id: event.parent_event_id || "",
      status: event.status || "upcoming",
      recap: event.recap || "",
    });
  };

  const handleSaveEditedEvent = async (e) => {
    e.preventDefault();
    if (!editingEvent || !editEventForm) return;
    if (!editEventForm.title.trim()) {
      showNotification("Event title cannot be empty.", "error");
      return;
    }
    if (!editEventForm.date.trim() || !editEventForm.month || !String(editEventForm.year).trim()) {
      showNotification("Please provide the event date.", "error");
      return;
    }
    if (editEventForm.parent_event_id === editingEvent.id) {
      showNotification("An event cannot be its own parent.", "error");
      return;
    }
    setIsSavingEvent(true);
    const result = await updateEvent(editingEvent.id, {
      ...editEventForm,
      title: editEventForm.title.trim(),
      description: editEventForm.description.trim(),
      date: editEventForm.date.trim(),
      month: editEventForm.month.toUpperCase(),
      year: String(editEventForm.year).trim(),
      time: editEventForm.time.trim(),
      venue: editEventForm.venue.trim(),
      registration_url: editEventForm.registration_url.trim(),
      parent_event_id: editEventForm.parent_event_id || null,
      recap: editEventForm.recap.trim(),
    });
    setIsSavingEvent(false);
    if (!result?.success) {
      showNotification(result?.message || "Could not update event.", "error");
      return;
    }
    setEditingEvent(null);
    setEditEventForm(null);
    showNotification("Event details updated successfully.");
  };

  const handleToggleEventStatus = (event) => {
    const nextStatus = event.status === "completed" ? "upcoming" : "completed";
    setOpenEventMenuId(null);
    setConfirmation({
      type: "status",
      event,
      nextStatus,
      title: nextStatus === "completed" ? "Mark event as completed?" : "Reopen this event?",
      message: nextStatus === "completed"
        ? `“${event.title}” will move to Completed. You can still edit its details and gallery.`
        : `“${event.title}” will move back to Upcoming.`,
      confirmLabel: nextStatus === "completed" ? "Mark completed" : "Reopen event",
      tone: "primary",
    });
  };


  const handleEventPhotoUpload = async (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles?.length) await uploadPhotoFiles(selectedFiles);
    event.target.value = "";
  };

  const uploadPhotoFiles = async (files) => {
    if (!files?.length || !photoManagerEventId) return;
    setIsUploadingPhotos(true);
    const result = await uploadEventPhotos(photoManagerEventId, files);
    setIsUploadingPhotos(false);
    if (!result?.success) {
      showNotification(result?.message || "Photo upload failed.", "error");
      return;
    }
    showNotification(`${files.length} photo${files.length === 1 ? "" : "s"} uploaded successfully.`);
  };

  const handleDeleteEventPhoto = (photo) => {
    setConfirmation({
      type: "photo",
      photo,
      title: "Delete this photo?",
      message: "This image will be permanently removed from the event gallery.",
      confirmLabel: "Delete photo",
      tone: "danger",
    });
  };

  const handleReorderEventPhotos = async (sourceId, targetId) => {
    if (!sourceId || !targetId || sourceId === targetId || !photoManagerEvent) return;
    const current = [...(photoManagerEvent.photoRecords || [])];
    const from = current.findIndex((photo) => String(photo.id) === String(sourceId));
    const to = current.findIndex((photo) => String(photo.id) === String(targetId));
    if (from < 0 || to < 0) return;
    const [moved] = current.splice(from, 1);
    current.splice(to, 0, moved);
    const result = await reorderEventPhotos(photoManagerEventId, current.map((photo) => photo.id));
    if (!result?.success) {
      showNotification(result?.message || "Could not reorder photos.", "error");
      return;
    }
    showNotification("Gallery order updated.");
  };

  const runConfirmation = async () => {
    if (!confirmation) return;
    const action = confirmation;
    setConfirmation(null);
    if (action.type === "status") {
      const result = await setEventStatus(action.event.id, action.nextStatus);
      if (!result?.success) {
        showNotification(result?.message || "Could not update event status.", "error");
        return;
      }
      showNotification(`Event marked as ${action.nextStatus}.`);
    } else if (action.type === "delete") {
      const result = await removeEvent(action.id);
      if (result?.success === false) {
        showNotification(result.message || `Could not delete “${action.eventTitle}”.`, "error");
        return;
      }
      showNotification(`“${action.eventTitle}” has been deleted.`);
    } else if (action.type === "photo") {
      const result = await removeEventPhoto(photoManagerEventId, action.photo.id);
      if (!result?.success) {
        showNotification(result?.message || "Could not delete photo.", "error");
        return;
      }
      showNotification("Photo deleted.");
    }
  };

  const handleSetCoverPhoto = async (photo) => {
    const result = await setEventCoverPhoto(photoManagerEventId, photo.id);
    if (!result?.success) {
      showNotification(result?.message || "Could not set cover photo.", "error");
      return;
    }
    showNotification("Cover photo updated.");
  };

  // Handle Member Submit
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.role.trim() || !memberForm.description.trim()) {
      showNotification("Please fill in member name, role, and description.", "error");
      return;
    }

    const result = await addExecomMember(memberForm);
    if (!result?.success) {
      showNotification(result?.message || "Could not save the Office Bearer.", "error");
      return;
    }
    showNotification(`Executive member "${memberForm.name}" successfully saved!`);

    // Reset form
    setMemberForm({
      name: "",
      role: "Student Chair",
      description: "",
      email: "",
      linkedin: "",
      image: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle Event Delete
  const handleDeleteEvent = (id, title) => {
    setOpenEventMenuId(null);
    setConfirmation({
      type: "delete",
      id,
      title: "Delete event?",
      eventTitle: title,
      message: `“${title}” will be permanently deleted. This action cannot be undone.`,
      confirmLabel: "Delete event",
      tone: "danger",
    });
  };

  // Handle ExeCom Member Delete
  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from Executive Committee?`)) {
      const result = await removeExecomMember(id);
      if (!result?.success) {
        showNotification(result?.message || "Could not remove the Office Bearer.", "error");
        return;
      }
      showNotification(`${name} has been removed from Executive Committee.`);
    }
  };


  if (!isAuthenticated && !isLoading) {
    return null;
  }

  // Compact event rows with collapsed nested items to keep long lists manageable.
  const renderEventNode = (event, depth = 0) => {
    const children = events.filter((item) => item.parent_event_id === event.id);
    const query = eventSearch.trim().toLowerCase();
    const visibleChildren = query
      ? children.filter((child) => eventMatchesSearch(child, query))
      : children;

    return (
      <div key={event.id} className={`relative rounded-xl border bg-white transition hover:border-[#A8D8EF] ${openEventMenuId === event.id ? "z-40" : "z-0"} ${depth === 0 ? "border-[#DCE6EF] shadow-sm" : "border-slate-200"}`}>
        <div className="flex items-center gap-3 px-3 py-3 sm:px-4">
          <div className="flex h-14 w-16 min-w-16 shrink-0 flex-col items-center justify-center rounded-lg border border-[#B8DCEC] bg-[#E6F4FB] text-[#10243A]">
            <span className="whitespace-nowrap text-sm font-bold leading-tight">
              {event.date}
            </span>
            <span className="mt-0.5 text-[10px] font-bold tracking-wider text-[#00629B]">
              {event.month}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#E6F4FB] px-2 py-0.5 text-[9px] font-bold tracking-wide text-[#00629B]">{event.category}</span>
              <span className="text-[11px] text-slate-400">{event.year}</span>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${event.status === "completed" ? "bg-slate-100 text-slate-600" : "bg-emerald-50 text-emerald-700"}`}>{event.status || "upcoming"}</span>
              {children.length > 0 && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">{children.length} nested</span>}
            </div>
            <h4 className="mt-1 truncate text-sm font-semibold text-[#10243A]">{event.title}</h4>
            <p className="mt-0.5 truncate text-[11px] text-slate-500">{event.time || "Time not set"} · {event.venue || "Venue not set"}</p>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => handleEditEvent(event)}
              title="Edit event details"
              aria-label={`Edit ${event.title}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#D6E2EA] bg-white text-[#526477] transition hover:border-[#8CCDEB] hover:bg-[#F0F8FC] hover:text-[#00629B] focus:outline-none focus:ring-2 focus:ring-[#0096CC]/30"
            >
              <Pencil size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPhotoManagerEventId(event.id)}
              title={`Manage event photos (${event.photos?.length || 0})`}
              aria-label={`Manage photos for ${event.title}`}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#B8DCEC] bg-[#F0F8FC] text-[#00629B] transition hover:bg-[#E0F1FA] focus:outline-none focus:ring-2 focus:ring-[#0096CC]/30"
            >
              <Images size={17} />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpenEventMenuId((current) => current === event.id ? null : event.id)}
                title="More event actions"
                aria-label={`More actions for ${event.title}`}
                aria-haspopup="menu"
                aria-expanded={openEventMenuId === event.id}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-[#0096CC]/30 ${openEventMenuId === event.id ? "border-[#8CCDEB] bg-[#E6F4FB] text-[#00629B]" : "border-[#D6E2EA] bg-white text-[#526477] hover:bg-slate-50"}`}
              >
                <MoreHorizontal size={19} />
              </button>
              {openEventMenuId === event.id && (
                <>
                  <button type="button" aria-label="Close event actions" className="fixed inset-0 z-20 cursor-default" onClick={() => setOpenEventMenuId(null)} />
                  <div role="menu" className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-[#DCE6EF] bg-white p-1.5 shadow-xl shadow-[#10243A]/15">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleToggleEventStatus(event)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#10243A] transition hover:bg-[#F0F8FC]"
                    >
                      {event.status === "completed" ? <RotateCcw size={16} className="text-[#00629B]" /> : <CheckCircle2 size={16} className="text-emerald-600" />}
                      {event.status === "completed" ? "Reopen event" : "Mark as completed"}
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() => handleDeleteEvent(event.id, event.title)}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 size={16} /> Delete event
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {children.length > 0 && (
          <details className="group border-t border-[#EEF2F6]" open={Boolean(query)}>
            <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-2 text-[11px] font-medium text-[#00629B] hover:bg-[#F8FAFC]">
              <ChevronDown size={13} className="transition group-open:rotate-180" />
              {query ? `${visibleChildren.length} matching nested item(s)` : `Show ${children.length} nested item(s)`}
            </summary>
            <div className="space-y-2 bg-[#FAFCFE] p-3 sm:pl-6">
              {visibleChildren.map((child) => renderEventNode(child, depth + 1))}
            </div>
          </details>
        )}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#F3F7FA] pt-24 pb-20 text-[#10243A] sm:pt-28">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-[#EAF5FB] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-32 h-96 w-96 rounded-full bg-[#F0F8FC] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Floating Notification */}
        {notification && (
          <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 shadow-2xl backdrop-blur-md transition-all ${
              notification.type === "error"
                ? "border border-rose-200 bg-rose-50 text-rose-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <CheckCircle size={18} className="shrink-0" />
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        )}

        {/* =========================================
            ADMIN TOP BAR
        ========================================== */}
        <div className="rounded-3xl border border-[#DCE6EF] bg-white p-6 shadow-[0_12px_40px_rgba(16,36,58,0.06)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-[#10243A] sm:text-4xl">
                IEEE SB Management{" "}
                <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="mt-1.5 text-sm text-slate-600">
                Manage events, committees, and administrators.
              </p>
            </div>

            {/* Logout */}
            <div className="flex shrink-0 items-center">
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOutLocal}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
              >
                <LogOut size={13} className={isLoggingOutLocal ? "animate-spin" : ""} />
                <span>{isLoggingOutLocal ? "Logging out..." : "Logout"}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#DCE6EF] pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-[#E6EDF3] bg-[#F8FAFC] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#B8DCEC] bg-[#E6F4FB] text-[#00629B]">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Events</p>
                <p className="text-2xl font-bold text-[#10243A]">{events.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-[#E6EDF3] bg-[#F8FAFC] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#B8DCEC] bg-[#E6F4FB] text-[#00629B]">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">ExeCom</p>
                <p className="text-2xl font-bold text-[#10243A]">{executiveCommittee.length}</p>
              </div>
            </div>




          </div>
        </div>

        {/* =========================================
            TABS NAVIGATION
        ========================================== */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-b border-[#DCE6EF] pb-4">
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "events"
                ? "border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B] shadow-[0_0_20px_rgba(41,169,224,0.25)]"
                : "text-slate-500 hover:bg-white hover:text-[#10243A]"
            }`}
          >
            <CalendarDays size={18} />
            <span>Manage Events ({events.length})</span>
          </button>

          {adminProfile?.role === "super_admin" && adminProfile?.is_active === true && (
            <button
              onClick={() => setActiveTab("team")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                activeTab === "team"
                  ? "border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B] shadow-[0_0_20px_rgba(41,169,224,0.25)]"
                  : "text-slate-500 hover:bg-white hover:text-[#10243A]"
              }`}
            >
              <Users size={18} />
              <span>Manage Team</span>
            </button>
          )}

          {adminProfile?.role === "super_admin" &&
            adminProfile?.is_active === true && (
              <button
                onClick={() => setActiveTab("administrators")}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  activeTab === "administrators"
                    ? "border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B]"
                    : "text-slate-500 hover:bg-white hover:text-[#10243A]"
                }`}
              >
                <ShieldCheck size={18} />
                <span>Manage Administrators</span>
              </button>
            )}
        </div>

        {/* =========================================
            TAB 1: UPCOMING EVENTS
        ========================================== */}
        {activeTab === "events" && (
          <section className="mt-8 space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#10243A]">Manage Events</h2>
                <p className="mt-1 text-sm text-slate-500">Search, filter and manage your event hierarchy.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00629B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004F7D]"
              >
                <Plus size={17} /> Create Event
              </button>
            </div>

            <div className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative min-w-0 flex-1">
                  <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={eventSearch}
                    onChange={(e) => { setEventSearch(e.target.value); setEventPage(1); }}
                    placeholder="Search event or nested competition..."
                    className="w-full rounded-xl border border-[#DCE6EF] bg-[#F8FAFC] py-2.5 pl-10 pr-4 text-sm text-[#10243A] outline-none transition focus:border-[#29A9E0] focus:ring-2 focus:ring-[#29A9E0]/15"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <select
                    value={eventCategoryFilter}
                    onChange={(e) => { setEventCategoryFilter(e.target.value); setEventPage(1); }}
                    className="rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#29A9E0]"
                    aria-label="Filter events by category"
                  >
                    <option value="ALL">All categories</option>
                    {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                  <select
                    value={eventSort}
                    onChange={(e) => { setEventSort(e.target.value); setEventPage(1); }}
                    className="rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#29A9E0]"
                    aria-label="Sort events"
                  >
                    <option value="DATE_DESC">Date: newest first</option>
                    <option value="TITLE_ASC">Title: A to Z</option>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <span>Showing {filteredRootEvents.length === 0 ? 0 : (eventPage - 1) * EVENTS_PER_PAGE + 1}–{Math.min(eventPage * EVENTS_PER_PAGE, filteredRootEvents.length)} of {filteredRootEvents.length} main events · {events.length} total including nested events</span>
                {(eventSearch || eventCategoryFilter !== "ALL") && (
                  <button type="button" onClick={() => { setEventSearch(""); setEventCategoryFilter("ALL"); setEventSort("DATE_DESC"); setEventPage(1); }} className="font-semibold text-[#00629B] hover:underline">Clear filters</button>
                )}
              </div>
            </div>

            {paginatedRootEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#DCE6EF] bg-white px-6 py-14 text-center">
                <CalendarDays className="mx-auto text-slate-400" size={36} />
                <p className="mt-3 text-sm font-semibold text-[#10243A]">No matching events</p>
                <p className="mt-1 text-xs text-slate-500">Try another search or create a new event.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedRootEvents.map((event) => renderEventNode(event))}
              </div>
            )}

            {totalEventPages > 1 && (
              <div className="flex items-center justify-between rounded-xl border border-[#DCE6EF] bg-white px-4 py-3">
                <span className="text-xs text-slate-500">Page {eventPage} of {totalEventPages}</span>
                <div className="flex gap-2">
                  <button type="button" disabled={eventPage === 1} onClick={() => setEventPage((page) => page - 1)} className="rounded-lg border border-[#DCE6EF] px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Previous</button>
                  <button type="button" disabled={eventPage === totalEventPages} onClick={() => setEventPage((page) => page + 1)} className="rounded-lg border border-[#DCE6EF] px-3 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40">Next</button>
                </div>
              </div>
            )}

            {isEventModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden bg-slate-950/45 px-3 pb-3 pt-[120px] backdrop-blur-sm sm:px-5 sm:pt-[122px]">
                <div className="flex max-h-[calc(100dvh-132px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white shadow-2xl sm:max-h-[calc(100dvh-138px)]">
                  <div className="flex shrink-0 items-start justify-between border-b border-[#E6EDF3] px-5 py-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#10243A]">Create Event</h3>
                      <p className="mt-1 text-xs text-slate-500">Add a main event or place it under an existing event.</p>
                    </div>
                    <button type="button" onClick={() => setIsEventModalOpen(false)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800" aria-label="Close create event form"><X size={19} /></button>
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto p-5">
                <form onSubmit={handleEventSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Next-Gen Web3 & AI Summit"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                      Add Under Parent Event / Group (Optional)
                    </label>
                    <select
                      value={eventForm.parent_event_id}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, parent_event_id: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm text-[#10243A] focus:border-[#29A9E0] focus:outline-none"
                    >
                      <option value="">Create as a standalone / main event</option>
                      {events.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {getEventPathLabel(parent)}
                        </option>
                      ))}
                    </select>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Select any existing event or group to create a nested item. Leave empty to create a standalone / main event. Choose EVENT GROUP for containers such as Department-wise Events.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Category
                      </label>
                      <select
                        value={eventForm.category}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, category: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm text-[#10243A] focus:border-[#29A9E0] focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Time
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 10:00 AM"
                        value={eventForm.time}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, time: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                      />
                    </div>
                  </div>

                  {/* Date fields: Day, Month, Year */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Day
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="31"
                        required
                        value={eventForm.date}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, date: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm text-[#10243A] text-center focus:border-[#29A9E0] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Month
                      </label>
                      <select
                        value={eventForm.month}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, month: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-2 py-2.5 text-sm text-[#10243A] text-center focus:border-[#29A9E0] focus:outline-none"
                      >
                        {MONTHS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Year
                      </label>
                      <input
                        type="number"
                        min="2000"
                        max="2100"
                        required
                        value={eventForm.year}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, year: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm text-[#10243A] text-center focus:border-[#29A9E0] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Auditorium 2 / Online"
                      value={eventForm.venue}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, venue: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Short Description (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Provide brief details about the workshop or hackathon..."
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, description: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>
                   
<div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
    Google Form Registration Link
  </label>

  <input
    type="url"
    placeholder="https://forms.gle/your-event-form"
    value={eventForm.registration_url}
    onChange={(e) =>
      setEventForm({
        ...eventForm,
        registration_url: e.target.value,
      })
    }
    className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
  />

  <p className="mt-1.5 text-[11px] text-slate-500">
    Paste the Google Form link created specifically for this event.
    Leave empty if registration is not open yet.
  </p>
</div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-4 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Plus size={18} />
                    <span>Publish Event</span>
                  </button>
                </form>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================
            TAB 2: EXECUTIVE COMMITTEE MEMBERS
        ========================================== */}
        {activeTab === "committee" && adminProfile?.role === "super_admin" && adminProfile?.is_active === true && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left: Add ExeCom Member Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl border border-[#DCE6EF] bg-white p-6 shadow-[0_10px_30px_rgba(16,36,58,0.05)]">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00629B]">
                  <Plus size={18} />
                  <span>Add ExeCom Member</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Add student leaders and chairs to the official Executive Committee list.
                </p>

                <form onSubmit={handleMemberSubmit} className="mt-6 space-y-4">
                  {/* Profile Picture Uploader */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                      Profile Picture (Optional)
                    </label>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={handleImageFileChange}
                    />

                    {memberForm.image ? (
                      <div className="flex items-center gap-4 rounded-2xl border border-[#B8DCEC] bg-[#F0F8FC] p-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#29A9E0] shadow-md shadow-[#29A9E0]/20">
                          <img
                            src={memberForm.image}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
                            <CheckCircle size={13} /> Photo attached
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">Optimized for website display</p>
                          <div className="mt-2 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-xs font-semibold text-[#00629B] hover:underline"
                            >
                              Change
                            </button>
                            <span className="text-slate-600">•</span>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="text-xs font-semibold text-rose-400 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-dashed border-[#DCE6EF] bg-[#F8FAFC] p-3.5 transition hover:border-[#8CCDEB] hover:bg-[#F0F8FC]"
                      >
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#DCE6EF] bg-white text-slate-500 transition group-hover:border-[#A8D8EF] group-hover:text-[#00629B]">
                          <Camera size={22} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors">
                            <Upload size={13} />
                            <span>Click to upload profile photo</span>
                          </div>
                          <p className="mt-0.5 text-[11px] text-slate-500">
                            JPG, PNG, or WEBP (auto-compressed)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suhan Ganesh"
                      value={memberForm.name}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Role / Position *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Student Chair, Vice Chair, Secretary"
                      value={memberForm.role}
                      onChange={(e) =>
                        setMemberForm({ ...memberForm, role: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Bio / Responsibilities Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Leads the student branch and coordinates campus initiatives..."
                      value={memberForm.description}
                      onChange={(e) =>
                        setMemberForm({
                          ...memberForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="member@ieee.org"
                        value={memberForm.email}
                        onChange={(e) =>
                          setMemberForm({ ...memberForm, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        LinkedIn (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/..."
                        value={memberForm.linkedin}
                        onChange={(e) =>
                          setMemberForm({
                            ...memberForm,
                            linkedin: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-4 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Plus size={18} />
                    <span>Add to Executive Committee</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Existing ExeCom List */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#10243A]">
                  Current Executive Committee Members ({executiveCommittee.length})
                </h3>
                <span className="text-xs text-slate-500">
                  Visible live on the Team page
                </span>
              </div>

              {executiveCommittee.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#DCE6EF] p-12 text-center">
                  <Users className="mx-auto text-slate-500" size={40} />
                  <p className="mt-3 text-sm text-slate-500">No committee members found.</p>
                  <p className="text-xs text-slate-500">Add a new leader using the form on the left or reset to default.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {executiveCommittee.map((member) => (
                    <div
                      key={member.id}
                      className="group relative flex flex-col justify-between rounded-2xl border border-[#DCE6EF] bg-white p-5 backdrop-blur-xl transition hover:border-[#A8D8EF] hover:bg-white"
                    >
                      <div>
                        {/* Member Header */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {member.image ? (
                              <img
                                src={member.image}
                                alt={member.name}
                                className="h-11 w-11 shrink-0 rounded-full object-cover border border-[#A8D8EF] shadow-sm"
                              />
                            ) : (
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#DCE6EF] bg-gradient-to-br from-[#00629B] to-[#00629B] text-[#00629B]">
                                <UserRound size={20} />
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors">
                                {member.name}
                              </h4>
                              <p className="text-[11px] font-bold uppercase tracking-wider text-[#00629B]">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteMember(member.id, member.name)}
                            className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 hover:text-[#10243A]"
                            title="Remove from Committee"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {/* Bio */}
                        <p className="mt-3 text-xs leading-5 text-slate-600">
                          {member.description}
                        </p>
                      </div>

                      {/* Footer Info */}
                      {(member.email || member.linkedin) && (
                        <div className="mt-4 flex items-center gap-2 border-t border-[#DCE6EF] pt-3 text-[11px] text-slate-500">
                          {member.email && (
                            <span className="flex items-center gap-1 truncate">
                              <Mail size={12} className="text-[#00629B]" />
                              <span className="truncate">{member.email}</span>
                            </span>
                          )}
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-auto inline-flex items-center gap-1 text-[#00629B] hover:underline"
                            >
                              <ExternalLink size={12} />
                              <span>Profile</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {editingEvent && editEventForm && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden bg-slate-950/45 px-3 pb-3 pt-[120px] backdrop-blur-sm sm:px-5 sm:pt-[122px]" onClick={() => { if (!isSavingEvent) { setEditingEvent(null); setEditEventForm(null); } }}>
            <section className="flex max-h-[calc(100dvh-132px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white shadow-2xl sm:max-h-[calc(100dvh-138px)]" onClick={(e) => e.stopPropagation()}>
              <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#E6EDF3] bg-white px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-lg font-bold text-[#10243A]">Edit Event</h3>
                  <p className="mt-1 text-xs text-slate-500">Update event details, registration and post-event content.</p>
                </div>
                <button type="button" onClick={() => { setEditingEvent(null); setEditEventForm(null); }} disabled={isSavingEvent} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50" aria-label="Close edit event"><X size={19}/></button>
              </header>
              <form onSubmit={handleSaveEditedEvent} className="min-h-0 overflow-y-auto">
                <div className="space-y-3.5 bg-white p-5">
                  <section>
                    <div className="mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-[#00A0D6]"/><h4 className="text-sm font-bold text-[#10243A]">Basic information</h4></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="sm:col-span-2"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Event title *</span><input required value={editEventForm.title} onChange={(e)=>setEditEventForm({...editEventForm,title:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none transition focus:border-[#0096CC] focus:ring-4 focus:ring-[#0096CC]/10" placeholder="Enter event title"/></label>
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Category</span><select value={editEventForm.category} onChange={(e)=>setEditEventForm({...editEventForm,category:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#0096CC]">{CATEGORIES.map((cat)=><option key={cat} value={cat}>{cat}</option>)}</select></label>
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Event status</span><select value={editEventForm.status} onChange={(e)=>setEditEventForm({...editEventForm,status:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select></label>
                      <label className="sm:col-span-2"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Parent event / group</span><select value={editEventForm.parent_event_id} onChange={(e)=>setEditEventForm({...editEventForm,parent_event_id:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"><option value="">Standalone / main event</option>{events.filter((item)=>item.id!==editingEvent.id).map((parent)=><option key={parent.id} value={parent.id}>{getEventPathLabel(parent)}</option>)}</select></label>
                    </div>
                  </section>
                  <section>
                    <div className="mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-[#00A0D6]"/><h4 className="text-sm font-bold text-[#10243A]">Date, time & venue</h4></div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Date *</span><input required value={editEventForm.date} onChange={(e)=>setEditEventForm({...editEventForm,date:e.target.value})} placeholder="08-09" className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3 py-3 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Month *</span><select value={editEventForm.month} onChange={(e)=>setEditEventForm({...editEventForm,month:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-2 py-3 text-sm text-[#10243A] outline-none focus:border-[#0096CC]">{MONTHS.map((m)=><option key={m}>{m}</option>)}</select></label>
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Year *</span><input required type="number" min="2000" max="2100" value={editEventForm.year} onChange={(e)=>setEditEventForm({...editEventForm,year:e.target.value})} className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3 py-3 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                      <label><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Time</span><input value={editEventForm.time} onChange={(e)=>setEditEventForm({...editEventForm,time:e.target.value})} placeholder="10:00 AM" className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3 py-3 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                      <label className="col-span-2 sm:col-span-4"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Venue</span><input value={editEventForm.venue} onChange={(e)=>setEditEventForm({...editEventForm,venue:e.target.value})} placeholder="RNSIT Campus" className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                    </div>
                  </section>
                  <section>
                    <div className="mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-[#00A0D6]"/><h4 className="text-sm font-bold text-[#10243A]">Description & registration</h4></div>
                    <div className="space-y-4">
                      <label className="block"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Event description</span><textarea rows={4} value={editEventForm.description} onChange={(e)=>setEditEventForm({...editEventForm,description:e.target.value})} placeholder="Describe the event, its purpose and what participants can expect..." className="w-full resize-y rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm leading-6 text-[#10243A] outline-none focus:border-[#0096CC] focus:ring-4 focus:ring-[#0096CC]/10"/></label>
                      <label className="block"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Registration URL</span><input type="url" value={editEventForm.registration_url} onChange={(e)=>setEditEventForm({...editEventForm,registration_url:e.target.value})} placeholder="https://forms.gle/..." className="w-full rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                    </div>
                  </section>
                  <section>
                    <div className="mb-3 flex items-center gap-2"><span className="h-6 w-1 rounded-full bg-[#00A0D6]"/><h4 className="text-sm font-bold text-[#10243A]">Post-event recap & photos</h4></div>
                    <label className="block"><span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-slate-600">Event recap (optional)</span><textarea rows={4} value={editEventForm.recap} onChange={(e)=>setEditEventForm({...editEventForm,recap:e.target.value})} placeholder="Share highlights, outcomes, speakers and key moments..." className="w-full resize-y rounded-xl border border-[#D6E2EA] bg-white px-3.5 py-2.5 text-sm leading-6 text-[#10243A] outline-none focus:border-[#0096CC]"/></label>
                    <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#CDE5F1] bg-[#EFF8FC] p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div><p className="text-sm font-bold text-[#10243A]">Event photo gallery</p><p className="mt-1 text-xs text-slate-600">{editingEvent.photos?.length || 0} photos currently available. Upload, remove or choose the cover image.</p></div>
                      <button type="button" onClick={()=>setPhotoManagerEventId(editingEvent.id)} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00629B] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#10243A]"><Camera size={15}/> Manage photos</button>
                    </div>
                  </section>
                </div>
                <footer className="sticky bottom-0 flex shrink-0 flex-col-reverse gap-2 border-t border-[#DCE6EF] bg-white/95 px-4 py-3 backdrop-blur sm:flex-row sm:justify-end sm:px-5">
                  <button type="button" disabled={isSavingEvent} onClick={()=>{setEditingEvent(null);setEditEventForm(null);}} className="rounded-xl border border-[#D6E2EA] px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">Cancel</button>
                  <button type="submit" disabled={isSavingEvent} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#008CCB] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#00629B]/20 transition hover:brightness-105 disabled:cursor-wait disabled:opacity-60">{isSavingEvent ? "Saving changes..." : "Save event changes"}</button>
                </footer>
              </form>
            </section>
          </div>
        )}

        {photoManagerEvent && (
          <div className="fixed inset-0 z-[110] flex items-start justify-center overflow-hidden bg-slate-950/60 px-3 pb-3 pt-[120px] backdrop-blur-sm sm:px-6 sm:pt-[122px]" onClick={() => setPhotoManagerEventId(null)}>
            <section className="flex max-h-[calc(100dvh-132px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white shadow-2xl sm:max-h-[calc(100dvh-138px)]" onClick={(e) => e.stopPropagation()}>
              <header className="flex items-start justify-between gap-4 border-b border-[#DCE6EF] px-5 py-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#00629B]">Event gallery</p>
                  <h3 className="mt-1 text-lg font-bold text-[#10243A]">{photoManagerEvent.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">JPG, PNG, or WEBP · Maximum 10 MB per image</p>
                </div>
                <button type="button" onClick={() => setPhotoManagerEventId(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close gallery manager"><X size={18} /></button>
              </header>
              <div
                className="overflow-y-auto p-5"
                onDragOver={(e) => { e.preventDefault(); setIsPhotoDropActive(true); }}
                onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setIsPhotoDropActive(false); }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsPhotoDropActive(false);
                  if (e.dataTransfer.files?.length) uploadPhotoFiles(e.dataTransfer.files);
                }}
              >
                <input ref={photoInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleEventPhotoUpload} />
                <button
                  type="button"
                  disabled={isUploadingPhotos}
                  onClick={() => photoInputRef.current?.click()}
                  className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-sm font-semibold transition disabled:opacity-50 ${isPhotoDropActive ? "border-[#00629B] bg-[#E6F4FB]" : "border-[#8CCDEB] bg-[#F4FAFD] hover:bg-[#EAF6FC]"}`}
                >
                  <Upload size={22} />
                  <span>{isUploadingPhotos ? "Uploading photos..." : "Drop images here or browse files"}</span>
                  <span className="text-xs font-normal text-slate-500">JPG, PNG or WEBP · Up to 10 MB each · Multiple images supported</span>
                </button>
                {photoManagerEvent.photoRecords?.length ? (
                  <>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[#10243A]">Gallery photos</p>
                      <p className="text-xs text-slate-500">Drag cards to change their order</p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {photoManagerEvent.photoRecords.map((photo) => (
                        <article
                          key={photo.id}
                          draggable
                          onDragStart={() => setDraggedPhotoId(String(photo.id))}
                          onDragEnd={() => setDraggedPhotoId(null)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            handleReorderEventPhotos(draggedPhotoId, String(photo.id));
                            setDraggedPhotoId(null);
                          }}
                          className={`group relative overflow-hidden rounded-xl border bg-white transition ${draggedPhotoId === String(photo.id) ? "border-[#00629B] opacity-50" : "border-[#DCE6EF] hover:border-[#8CCDEB]"}`}
                        >
                          <div className="relative">
                            <img src={photo.public_url} alt={photo.file_name || "Event photo"} className="h-36 w-full object-cover" />
                            <span className="absolute left-2 top-2 rounded-full bg-slate-950/65 p-1.5 text-white"><GripVertical size={14} /></span>
                            <button type="button" onClick={() => handleDeleteEventPhoto(photo)} title="Delete photo" aria-label={`Delete ${photo.file_name || "photo"}`} className="absolute right-2 top-2 rounded-full bg-white/95 p-1.5 text-rose-600 shadow transition hover:scale-105 hover:bg-rose-50">
                              <X size={15} />
                            </button>
                          </div>
                          <div className="space-y-2 p-2.5">
                            {photo.is_cover ? (
                              <span className="inline-flex rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">Cover photo</span>
                            ) : (
                              <button type="button" onClick={() => handleSetCoverPhoto(photo)} className="text-[11px] font-semibold text-[#00629B] hover:underline">Set as cover</button>
                            )}
                            <p className="truncate text-[11px] text-slate-500">{photo.file_name}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="py-10 text-center text-sm text-slate-500">No photos have been added to this event yet.</p>
                )}
              </div>
              <footer className="flex justify-end border-t border-[#DCE6EF] px-5 py-3">
                <button type="button" onClick={() => setPhotoManagerEventId(null)} className="rounded-lg bg-[#10243A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#00629B]">Done</button>
              </footer>
            </section>
          </div>
        )}

        {confirmation && (
          <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#10243A]/55 px-4 py-6 backdrop-blur-sm" onClick={() => setConfirmation(null)}>
            <section role="alertdialog" aria-modal="true" aria-labelledby="event-confirm-title" aria-describedby="event-confirm-description" className="w-full max-w-md overflow-hidden rounded-2xl border border-[#DCE6EF] bg-white shadow-[0_24px_80px_rgba(16,36,58,0.28)]" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${confirmation.tone === "danger" ? "bg-rose-50 text-rose-600" : "bg-[#E6F4FB] text-[#00629B]"}`}>
                  {confirmation.tone === "danger" ? <Trash2 size={20} /> : <CheckCircle2 size={21} />}
                </div>
                <h3 id="event-confirm-title" className="mt-4 text-lg font-bold text-[#10243A]">{confirmation.title}</h3>
                <p id="event-confirm-description" className="mt-2 text-sm leading-6 text-[#526477]">{confirmation.message}</p>
              </div>
              <footer className="flex justify-end gap-2 border-t border-[#E8EEF3] bg-[#F8FAFC] px-6 py-4">
                <button type="button" onClick={() => setConfirmation(null)} className="rounded-xl border border-[#D6E2EA] bg-white px-4 py-2.5 text-sm font-semibold text-[#526477] transition hover:bg-slate-50">Cancel</button>
                <button type="button" onClick={runConfirmation} className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition ${confirmation.tone === "danger" ? "bg-rose-600 hover:bg-rose-700" : "bg-[#00629B] hover:bg-[#004F7D]"}`}>{confirmation.confirmLabel}</button>
              </footer>
            </section>
          </div>
        )}

        {activeTab === "team" && adminProfile?.role === "super_admin" && adminProfile?.is_active === true && (
          <TeamManagement />
        )}

        {activeTab === "administrators" &&
              adminProfile?.role === "super_admin" &&
              adminProfile?.is_active === true && (
                <AdminManagement />
              )}
          </div>
        </div>
    );
}
