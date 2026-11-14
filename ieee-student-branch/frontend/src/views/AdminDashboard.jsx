"use client";

import { useState, useRef } from "react";
import Link from "next/link";
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
  Sparkles,
  CheckCircle,
  RotateCcw,
  UserCheck,
  UserRound,
  Mail,
  Shield,
  Layers,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  FlaskConical,
  ShieldCheck,
  Globe,
  Zap,
  Database,
  Terminal,
  Bot,
  Radio,
  Server,
  Workflow,
  RefreshCw,
  UserPlus,
  Phone,
  Camera,
  Upload,
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
];

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const DOMAIN_ICON_OPTIONS = [
  { value: "BrainCircuit", label: "AI / Machine Learning (Brain)" },
  { value: "Code2", label: "Web / Software Dev (Code)" },
  { value: "Cpu", label: "Robotics / IoT / Embedded (CPU)" },
  { value: "ShieldCheck", label: "Cybersecurity (Shield)" },
  { value: "Cloud", label: "Cloud & DevOps (Cloud)" },
  { value: "FlaskConical", label: "Research & Innovation (Flask)" },
  { value: "Globe", label: "Web3 / Internet (Globe)" },
  { value: "Zap", label: "Electrical / Energy (Lightning)" },
  { value: "Database", label: "Data Science & DB (Database)" },
  { value: "Terminal", label: "Systems & CLI (Terminal)" },
  { value: "Bot", label: "Automation & AI Bots (Bot)" },
  { value: "Radio", label: "Telecom & Signal (Radio)" },
  { value: "Server", label: "Backend & Systems (Server)" },
  { value: "Workflow", label: "Workflows & Automation (Workflow)" },
];

const DOMAIN_ICONS_MAP = {
  BrainCircuit,
  Code2,
  Cpu,
  ShieldCheck,
  Cloud,
  FlaskConical,
  Globe,
  Zap,
  Database,
  Terminal,
  Bot,
  Layers,
  Radio,
  Server,
  Workflow,
  Sparkles,
};

export default function AdminDashboard() {
  const {
    logout,
    events,
    addEvent,
    removeEvent,
    executiveCommittee,
    addExecomMember,
    removeExecomMember,
    domains,
    addDomain,
    removeDomain,
    registrations,
    removeRegistration,
    refreshData,
    resetToDefaults,
    isUsingSupabase,
    isLoading,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState("events"); // "events" | "execom" | "domains" | "registrations"
  const [notification, setNotification] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  });

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

  // Domain Form State
  const [domainForm, setDomainForm] = useState({
    title: "",
    shortTitle: "",
    iconName: "BrainCircuit",
    description: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // Handle Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshData();
    setIsRefreshing(false);
    showNotification("Synchronized with database.");
  };

  // Handle Event Submit
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (!eventForm.title.trim() || !eventForm.description.trim()) {
      showNotification("Please fill in event title and description.", "error");
      return;
    }

    await addEvent(eventForm);
    showNotification(`Event "${eventForm.title}" successfully saved!`);
    
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
    });
  };

  // Handle Member Submit
  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.role.trim() || !memberForm.description.trim()) {
      showNotification("Please fill in member name, role, and description.", "error");
      return;
    }

    await addExecomMember(memberForm);
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

  // Handle Domain Submit
  const handleDomainSubmit = async (e) => {
    e.preventDefault();
    if (!domainForm.title.trim() || !domainForm.description.trim()) {
      showNotification("Please fill in domain title and description.", "error");
      return;
    }

    const shortTitle = domainForm.shortTitle.trim() || domainForm.title.trim().slice(0, 15);
    await addDomain({
      ...domainForm,
      shortTitle,
    });
    showNotification(`Technical domain "${domainForm.title}" successfully saved!`);

    // Reset form
    setDomainForm({
      title: "",
      shortTitle: "",
      iconName: "BrainCircuit",
      description: "",
    });
  };

  // Handle Event Delete
  const handleDeleteEvent = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the event "${title}"?`)) {
      await removeEvent(id);
      showNotification(`Event "${title}" has been deleted.`);
    }
  };

  // Handle ExeCom Member Delete
  const handleDeleteMember = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from Executive Committee?`)) {
      await removeExecomMember(id);
      showNotification(`${name} has been removed from Executive Committee.`);
    }
  };

  // Handle Domain Delete
  const handleDeleteDomain = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove domain "${title}"?`)) {
      await removeDomain(id);
      showNotification(`Domain "${title}" has been removed.`);
    }
  };

  // Handle Registration Delete
  const handleDeleteRegistration = async (id, name) => {
    if (window.confirm(`Dismiss application for ${name}?`)) {
      await removeRegistration(id);
      showNotification(`Application for ${name} removed.`);
    }
  };

  // Handle Reset
  const handleReset = () => {
    if (window.confirm("Reset all events, committee members, and domains to initial default values?")) {
      resetToDefaults();
      showNotification("Data reset to default values.");
    }
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
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#B8DCEC] bg-[#E6F4FB] px-3 py-1 text-xs font-semibold text-[#00629B]">
                  <Shield size={13} />
                  <span>Admin Session Active</span>
                </span>

                {isUsingSupabase ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <Database size={13} className="text-emerald-600" />
                    <span>Supabase Connected</span>
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                    title="Add your Supabase credentials in .env.local to activate cloud database"
                  >
                    <Database size={13} className="text-amber-600" />
                    <span>Local Cache (Add .env.local)</span>
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-3xl font-extrabold text-[#10243A] sm:text-4xl">
                IEEE SB Management{" "}
                <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="mt-1.5 text-sm text-slate-600">
                Manage upcoming branch events, executive leadership, domains, and student registrations.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-[#F1F5F9] hover:text-[#00629B] disabled:opacity-50"
                title="Sync and refresh data"
              >
                <RefreshCw size={13} className={isRefreshing || isLoading ? "animate-spin" : ""} />
                <span>Sync</span>
              </button>

              <Link
                href="/events"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
              >
                <span>Live Events</span>
                <ExternalLink size={13} />
              </Link>

              <Link
                href="/team"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
              >
                <span>Live Team</span>
                <ExternalLink size={13} />
              </Link>

              <Link
                href="/domains"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition hover:bg-[#F1F5F9] hover:text-[#00629B]"
              >
                <span>Live Domains</span>
                <ExternalLink size={13} />
              </Link>

              <button
                onClick={handleReset}
                title="Reset to default initial data"
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition hover:bg-[#F1F5F9] hover:text-amber-700"
              >
                <RotateCcw size={13} />
                <span>Reset Demo</span>
              </button>

              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <LogOut size={13} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-[#DCE6EF] pt-6 sm:grid-cols-4">
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

            <div className="flex items-center gap-4 rounded-2xl border border-[#E6EDF3] bg-[#F8FAFC] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-sky-200 bg-sky-50 text-sky-700">
                <Layers size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Domains</p>
                <p className="text-2xl font-bold text-[#10243A]">{domains.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-[#E6EDF3] bg-[#F8FAFC] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700">
                <UserPlus size={24} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-500">Registrations</p>
                <p className="text-2xl font-bold text-[#10243A]">{registrations.length}</p>
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

          <button
            onClick={() => setActiveTab("execom")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "execom"
                ? "border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B] shadow-[0_0_20px_rgba(41,169,224,0.25)]"
                : "text-slate-500 hover:bg-white hover:text-[#10243A]"
            }`}
          >
            <UserCheck size={18} />
            <span>Manage Committee ({executiveCommittee.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("domains")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "domains"
                ? "border border-[#A8D8EF] bg-[#E6F4FB] text-[#00629B] shadow-[0_0_20px_rgba(41,169,224,0.25)]"
                : "text-slate-500 hover:bg-white hover:text-[#10243A]"
            }`}
          >
            <Layers size={18} />
            <span>Manage Domains ({domains.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              activeTab === "registrations"
                ? "border border-emerald-400/40 bg-emerald-50 text-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                : "text-slate-500 hover:bg-white hover:text-[#10243A]"
            }`}
          >
            <UserPlus size={18} />
            <span>Student Registrations ({registrations.length})</span>
          </button>
        </div>

        {/* =========================================
            TAB 1: UPCOMING EVENTS
        ========================================== */}
        {activeTab === "events" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left: Add Event Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl border border-[#DCE6EF] bg-white p-6 shadow-[0_10px_30px_rgba(16,36,58,0.05)]">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00629B]">
                  <Plus size={18} />
                  <span>Add Upcoming Event</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  New events immediately reflect on the public Events page and sync to the database.
                </p>

                <form onSubmit={handleEventSubmit} className="mt-6 space-y-4">
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
                        min="2024"
                        max="2035"
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
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Provide brief details about the workshop or hackathon..."
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, description: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
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

            {/* Right: Existing Events List */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#10243A]">
                  Active Upcoming Events ({events.length})
                </h3>
                <span className="text-xs text-slate-500">
                  Visible live to all students
                </span>
              </div>

              {events.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#DCE6EF] p-12 text-center">
                  <CalendarDays className="mx-auto text-slate-500" size={40} />
                  <p className="mt-3 text-sm text-slate-500">No events currently scheduled.</p>
                  <p className="text-xs text-slate-500">Use the form on the left to add your first upcoming event.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="group relative rounded-2xl border border-[#DCE6EF] bg-white p-5 backdrop-blur-xl transition hover:border-[#A8D8EF] hover:bg-white"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex gap-4">
                          {/* Date Block */}
                          <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-[#B8DCEC] bg-[#E6F4FB] text-[#10243A]">
                            <span className="text-lg font-bold leading-none">
                              {event.date}
                            </span>
                            <span className="mt-1 text-[10px] font-bold tracking-wider text-[#00629B]">
                              {event.month}
                            </span>
                          </div>

                          {/* Event Info */}
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-block rounded-full bg-[#E6F4FB] px-2.5 py-0.5 text-[10px] font-bold text-[#00629B] border border-[#B8DCEC]">
                                {event.category}
                              </span>
                              <span className="text-xs text-slate-500">
                                {event.year}
                              </span>
                            </div>

                            <h4 className="mt-1.5 text-base font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors">
                              {event.title}
                            </h4>

                            <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                              {event.description}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1.5">
                                <Clock size={13} className="text-[#00629B]" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <MapPin size={13} className="text-[#00629B]" />
                                {event.venue}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="shrink-0 self-end sm:self-start">
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(event.id, event.title)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-100 hover:text-[#10243A]"
                            title="Delete this event"
                          >
                            <Trash2 size={13} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 2: EXECUTIVE COMMITTEE MEMBERS
        ========================================== */}
        {activeTab === "execom" && (
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

        {/* =========================================
            TAB 3: TECHNICAL DOMAINS
        ========================================== */}
        {activeTab === "domains" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            {/* Left: Add Domain Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 rounded-3xl border border-[#DCE6EF] bg-white p-6 shadow-[0_10px_30px_rgba(16,36,58,0.05)]">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#00629B]">
                  <Plus size={18} />
                  <span>Add Technical Domain</span>
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  New domains immediately reflect on the public Domains track page and sync to the database.
                </p>

                <form onSubmit={handleDomainSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Domain Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Artificial Intelligence & Data Science"
                      value={domainForm.title}
                      onChange={(e) =>
                        setDomainForm({ ...domainForm, title: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Short Tag / Badge
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AI / ML"
                        value={domainForm.shortTitle}
                        onChange={(e) =>
                          setDomainForm({ ...domainForm, shortTitle: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                        Domain Icon
                      </label>
                      <select
                        value={domainForm.iconName}
                        onChange={(e) =>
                          setDomainForm({ ...domainForm, iconName: e.target.value })
                        }
                        className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3 py-2.5 text-sm text-[#10243A] focus:border-[#29A9E0] focus:outline-none"
                      >
                        {DOMAIN_ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe what students learn and build in this technical domain..."
                      value={domainForm.description}
                      onChange={(e) =>
                        setDomainForm({ ...domainForm, description: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 focus:border-[#29A9E0] focus:outline-none focus:ring-1 focus:ring-[#29A9E0]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-4 py-3 font-semibold text-white shadow-lg shadow-[#00629B]/30 transition hover:shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Plus size={18} />
                    <span>Add Technical Domain</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Existing Domains List */}
            <div className="lg:col-span-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#10243A]">
                  Active Domains ({domains.length})
                </h3>
                <span className="text-xs text-slate-500">
                  Visible live on Domains page
                </span>
              </div>

              {domains.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#DCE6EF] p-12 text-center">
                  <Layers className="mx-auto text-slate-500" size={40} />
                  <p className="mt-3 text-sm text-slate-500">No domains added yet.</p>
                  <p className="text-xs text-slate-500">Create a technical track using the form on the left.</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {domains.map((dom) => {
                    const IconComponent = DOMAIN_ICONS_MAP[dom.iconName] || BrainCircuit;

                    return (
                      <div
                        key={dom.id || dom.number}
                        className="group relative flex flex-col justify-between rounded-2xl border border-[#DCE6EF] bg-white p-5 backdrop-blur-xl transition hover:border-[#A8D8EF] hover:bg-white"
                      >
                        <div>
                          {/* Domain Header */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#B8DCEC] bg-[#E6F4FB] text-[#00629B]">
                                <IconComponent size={22} />
                              </div>
                              <div>
                                <span className="font-mono text-[10px] font-bold text-[#00629B]/70">
                                  TRACK {dom.number}
                                </span>
                                <h4 className="font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors leading-tight">
                                  {dom.title}
                                </h4>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleDeleteDomain(dom.id, dom.title)}
                              className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 hover:text-[#10243A]"
                              title="Remove Domain"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="mt-2.5">
                            <span className="inline-block rounded-full bg-[#E6F4FB] px-2.5 py-0.5 text-[10px] font-bold text-[#00629B] border border-[#B8DCEC]">
                              {dom.shortTitle}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-3 text-xs leading-5 text-slate-600">
                            {dom.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* =========================================
            TAB 4: STUDENT REGISTRATIONS
        ========================================== */}
        {activeTab === "registrations" && (
          <div className="mt-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#10243A]">
                  Student Membership Applications ({registrations.length})
                </h3>
                <p className="text-xs text-slate-600">
                  New member applications submitted from the Join page.
                </p>
              </div>

              <span className="text-xs text-emerald-600 flex items-center gap-1.5">
                <Database size={13} />
                <span>{isUsingSupabase ? "Saved in Supabase Cloud DB" : "Saved in Local Storage Cache"}</span>
              </span>
            </div>

            {registrations.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#DCE6EF] p-16 text-center">
                <UserPlus className="mx-auto text-slate-500" size={48} />
                <h4 className="mt-4 text-lg font-bold text-[#10243A]">No Membership Applications Yet</h4>
                <p className="mt-1 text-sm text-slate-500">
                  When students fill out the form on the Join page, their details will appear here.
                </p>
                <Link
                  href="/join"
                  target="_blank"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:shadow-cyan-500/20"
                >
                  <span>Open Join Page</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {registrations.map((reg) => (
                  <div
                    key={reg.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-[#DCE6EF] bg-white p-5 backdrop-blur-xl transition hover:border-[#A8D8EF] hover:bg-white"
                  >
                    <div>
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700">
                            <UserRound size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors">
                              {reg.name}
                            </h4>
                            <span className="inline-block rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase">
                              {reg.status || "Pending"}
                            </span>
                          </div>
                        </div>

                        {/* Dismiss Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteRegistration(reg.id, reg.name)}
                          className="rounded-lg border border-rose-200 bg-rose-50 p-2 text-rose-700 transition hover:bg-rose-100 hover:text-[#10243A]"
                          title="Dismiss / Delete Application"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Details */}
                      <div className="mt-4 space-y-2 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">Academic:</span>
                          <span className="font-semibold text-[#10243A]">{reg.branch}</span>
                          <span className="text-slate-500">•</span>
                          <span>{reg.year}</span>
                        </div>

                        <div className="flex items-start gap-2">
                          <span className="text-slate-500 shrink-0">Domain:</span>
                          <span className="font-medium text-[#00629B]">{reg.domain}</span>
                        </div>

                        {reg.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={12} className="text-[#00629B]" />
                            <a href={`tel:${reg.phone}`} className="text-slate-700 hover:underline">
                              {reg.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer Contact */}
                    <div className="mt-5 flex items-center justify-between border-t border-[#DCE6EF] pt-3 text-xs">
                      <a
                        href={`mailto:${reg.email}?subject=IEEE%20SB%20RNSIT%20Membership%20Application`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00629B] hover:underline"
                      >
                        <Mail size={13} />
                        <span className="truncate max-w-[170px]">{reg.email}</span>
                      </a>

                      <span className="text-[10px] text-slate-500">
                        {reg.created_at ? new Date(reg.created_at).toLocaleDateString() : "Recent"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}