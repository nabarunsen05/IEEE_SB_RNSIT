"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured, getSupabaseConfigStatus } from "../lib/supabase";

const AdminContext = createContext();

// Initial default events
const initialEvents = [
  {
    id: "event-1",
    title: "AI & Machine Learning Workshop",
    description:
      "A hands-on workshop introducing students to artificial intelligence, neural architectures and practical computer vision models.",
    date: "15",
    month: "OCT",
    year: "2026",
    time: "10:00 AM",
    venue: "RNSIT Main Auditorium",
    category: "WORKSHOP",
    photos: [
      "/assets/domains/artificial-intelligence.webp",
      "/assets/domains/robotics-iot.webp",
    ],
  },
  {
    id: "event-2",
    title: "IEEE RNSIT Innovation Hackathon",
    description:
      "Build innovative software and hardware prototypes to solve real-world problems and pitch to seasoned industry judges.",
    date: "22",
    month: "OCT",
    year: "2026",
    time: "9:00 AM",
    venue: "RNSIT Incubation Center",
    category: "HACKATHON",
  },
  {
    id: "event-3",
    title: "Research & Emerging Tech Talk",
    description:
      "Learn from active IEEE researchers and tech leaders about quantum computing, next-gen communication and publishing papers.",
    date: "29",
    month: "OCT",
    year: "2026",
    time: "2:00 PM",
    venue: "RNSIT CSE Seminar Hall",
    category: "TECH TALK",
  },
];

// Initial default executive committee members
const initialExecom = [
  {
    id: "execom-1",
    name: "Suhan Ganesh",
    role: "Student Chair",
    description:
      "Leads the IEEE Student Branch and coordinates strategic growth, campus initiatives and chapter activities.",
    image: "/assets/team/suhan-ganesh.jpeg",
    email: "suhan@ieee.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "execom-2",
    name: "Poorvika Nagraj",
    role: "Student Vice Chair",
    description:
      "Oversees technical societies, industry partnerships and core branch operations.",
    image: "/assets/team/poorvika-nagraj.png",
    email: "poorvika@ieee.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "execom-3",
    name: "Nikhil Nayak",
    role: "Webmaster",
    description:
      "Architects digital platforms, manages the branch web ecosystem and online resources.",
    image: "/assets/team/nikhil-nayak.png",
    email: "nikhil@ieee.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "execom-4",
    name: "Bhadrinath G R",
    role: "Treasurer",
    description:
      "Directs budget allocations, financial audits and sponsorship logistics for all major events.",
    image: "/assets/team/bhadrinath-g-r.jpeg",
    email: "bhadrinath@ieee.org",
    linkedin: "https://linkedin.com",
  },
  {
    id: "execom-5",
    name: "Prathika P",
    role: "Secretary",
    description:
      "Coordinates executive proceedings, official IEEE communication and regulatory documentation.",
    email: "prathika@ieee.org",
    linkedin: "https://linkedin.com",
  },
];

// Initial default technical domains
const initialDomains = [
  {
    id: "domain-1",
    title: "Artificial Intelligence",
    shortTitle: "AI / ML",
    description:
      "Explore machine learning, deep neural nets, generative models and autonomous intelligent systems.",
    iconName: "BrainCircuit",
    number: "01",
  },
  {
    id: "domain-2",
    title: "Web & App Development",
    shortTitle: "Development",
    description:
      "Architect responsive modern web apps, microservices, mobile experiences and scalable cloud backends.",
    iconName: "Code2",
    number: "02",
  },
  {
    id: "domain-3",
    title: "Robotics & IoT",
    shortTitle: "Robotics",
    description:
      "Design smart microcontrollers, automation solutions, sensor telemetry and embedded robotic hardware.",
    iconName: "Cpu",
    number: "03",
  },
  {
    id: "domain-4",
    title: "Cybersecurity & Networks",
    shortTitle: "Security",
    description:
      "Learn penetration testing, cryptosystems, secure coding and digital infrastructure defense.",
    iconName: "ShieldCheck",
    number: "04",
  },
  {
    id: "domain-5",
    title: "Cloud Computing & DevOps",
    shortTitle: "Cloud",
    description:
      "Master distributed cloud platforms, containerization pipelines, Kubernetes and CI/CD automation.",
    iconName: "Cloud",
    number: "05",
  },
  {
    id: "domain-6",
    title: "Research & Innovation",
    shortTitle: "Research",
    description:
      "Turn novel concepts into IEEE conference papers, verified prototypes and high-impact patents.",
    iconName: "FlaskConical",
    number: "06",
  },
];

// Initial sample registrations
const initialRegistrations = [
  {
    id: "reg-1",
    name: "Varun Kulkarni",
    email: "varun.k@rnsit.ac.in",
    branch: "Computer Science",
    year: "2nd Year",
    domain: "Artificial Intelligence & Data Science",
    phone: "+91 98765 43210",
    status: "pending",
    created_at: new Date().toISOString(),
  },
];

export function AdminProvider({ children }) {
  const isUsingSupabase = isSupabaseConfigured();
  const configStatus = getSupabaseConfigStatus();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminUsersLoading, setAdminUsersLoading] = useState(false);
  const [adminUsersError, setAdminUsersError] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Data States
  const [events, setEvents] = useState(initialEvents);
  const [executiveCommittee, setExecutiveCommittee] = useState(initialExecom);
  const [branchCounsellor, setBranchCounsellor] = useState(null);
  const [studentCommittees, setStudentCommittees] = useState([]);
  const [domains, setDomains] = useState(initialDomains);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data from Supabase
  const fetchDataFromSupabase = useCallback(async () => {
    if (!supabase) {
      return { success: false, message: "Database not connected." };
    }
    setIsLoading(true);

    try {
      const errors = [];

      // 1. Events and their gallery metadata
      const [{ data: eventsData, error: eventsError }, { data: photoRows, error: photosError }] =
        await Promise.all([
          supabase.from("events").select("*").order("created_at", { ascending: false }),
          supabase.from("event_photos").select("*").order("display_order", { ascending: true }),
        ]);

      if (eventsError) {
        errors.push(`Events: ${eventsError.message}`);
      } else if (eventsData) {
        const photosByEvent = new Map();
        (photoRows || []).forEach((photo) => {
          const list = photosByEvent.get(photo.event_id) || [];
          list.push(photo);
          photosByEvent.set(photo.event_id, list);
        });
        setEvents(eventsData.map((event) => ({
          ...event,
          status: event.status || "upcoming",
          photos: (photosByEvent.get(event.id) || []).map((photo) => photo.public_url).filter(Boolean),
          photoRecords: photosByEvent.get(event.id) || [],
          cover_image_url: event.cover_image_url || event.image_url || null,
        })));
      }
      if (photosError) errors.push(`Event photos: ${photosError.message}`);

      // 2. Executive Committee
      const { data: execomData, error: execomError } = await supabase
        .from("executive_committee")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: true });

      if (execomError) {
        errors.push(`Executive Committee: ${execomError.message}`);
      } else if (execomData) {
        setExecutiveCommittee(execomData);
      }

      // 2A. Branch Counsellor, SAC committees and members (public-readable tables)
      const [counsellorResult, committeesResult, membersResult] = await Promise.all([
        supabase.from("branch_counsellor").select("*").eq("id", 1).maybeSingle(),
        supabase.from("student_committees").select("*").order("display_order", { ascending: true }),
        supabase.from("student_committee_members").select("*").order("created_at", { ascending: true }),
      ]);

      if (counsellorResult.error) errors.push(`Branch Counsellor: ${counsellorResult.error.message}`);
      else if (counsellorResult.data) setBranchCounsellor(counsellorResult.data);

      if (committeesResult.error) errors.push(`SAC Committees: ${committeesResult.error.message}`);
      else if (committeesResult.data) {
        const membersByCommittee = new Map();
        (membersResult.data || []).forEach((member) => {
          const list = membersByCommittee.get(member.committee_id) || [];
          list.push(member);
          membersByCommittee.set(member.committee_id, list);
        });
        setStudentCommittees(committeesResult.data.map((committee) => ({
          ...committee,
          members: membersByCommittee.get(committee.id) || [],
        })));
      }
      if (membersResult.error) errors.push(`SAC Members: ${membersResult.error.message}`);

      // 3. Domains
      const { data: domainsData, error: domainsError } = await supabase
        .from("domains")
        .select("*")
        .order("number", { ascending: true });

      if (domainsError) {
        errors.push(`Domains: ${domainsError.message}`);
      } else if (domainsData) {
        setDomains(
          domainsData.map((d) => ({
            ...d,
            shortTitle: d.short_title || d.shortTitle,
            iconName: d.icon_name || d.iconName,
          }))
        );
      }

      // 4. Registrations
      const { data: regsData, error: regsError } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (regsError) {
        // Exclude expected RLS permission errors for roles not permitted to read registrations (e.g. editor)
        const isPermissionError =
          regsError.code === "42501" ||
          regsError.message?.toLowerCase().includes("permission") ||
          regsError.message?.toLowerCase().includes("policy");

        if (isPermissionError) {
          setRegistrations([]);
        } else {
          errors.push(`Registrations: ${regsError.message}`);
        }
      } else if (regsData) {
        setRegistrations(regsData);
      }

      if (errors.length > 0) {
        return { success: false, message: errors.join(", ") };
      }

      return { success: true };
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local state:", err);
      return { success: false, message: err.message || "Failed to synchronize data." };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch administrator allowlist through the protected API
  const fetchAdminUsers = useCallback(async () => {
    if (!supabase) {
      const message = "Database not connected.";
      setAdminUsersError(message);
      return { success: false, message };
    }

    setAdminUsersLoading(true);
    setAdminUsersError(null);

    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error || result.message || "Failed to load administrators."
        );
      }

      if (!Array.isArray(result.data)) {
        throw new Error("Invalid administrator list received from server.");
      }

      setAdminUsers(result.data);
      return { success: true, data: result.data };
    } catch (err) {
      console.error("Could not fetch admin users:", err);

      setAdminUsersError(err.message || "Failed to load administrators.");

      return {
        success: false,
        message: err.message || "Failed to load administrators.",
      };
    } finally {
      setAdminUsersLoading(false);
    }
  }, []);

  // Initialize Supabase Auth and verify administrator authorization
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const verifyAdminSession = async (session) => {
      if (!mounted) return;

      if (!session?.user || !supabase) {
        setIsAuthenticated(false);
        setAuthUser(null);
        setAdminProfile(null);
        setAdminUsers([]);
        setAdminUsersError(null);
        setRegistrations([]);
        setIsLoading(false);
        return;
      }

      try {
        const { data: isAdmin, error } = await supabase.rpc("is_admin");

        if (!mounted) return;

        if (error || isAdmin !== true) {
          setIsAuthenticated(false);
          setAuthUser(session.user);
          setAdminProfile(null);
          setAdminUsers([]);
          setAdminUsersError(null);
          setRegistrations([]);
          setIsLoading(false);
          return;
        }

        setAuthUser(session.user);

        // Verify the administrator profile
        const { data: profileData, error: profileError } = await supabase
          .rpc("get_current_admin_profile")
          .maybeSingle();

        if (
          profileError ||
          !profileData ||
          profileData.user_id !== session.user.id ||
          profileData.is_active !== true
        ) {
          setIsAuthenticated(false);
          setAdminProfile(null);
          setAdminUsers([]);
          setAdminUsersError(null);
          setRegistrations([]);
          return;
        }

        // Authenticate only after profile verification succeeds
        setAdminProfile(profileData);
        setIsAuthenticated(true);

        // Only Super Admins may load the administrator allowlist.
        if (profileData.role === "super_admin") {
          await fetchAdminUsers();
        } else {
          setAdminUsers([]);
          setAdminUsersError(null);
        }

      } catch (error) {
        console.error("Admin authorization check failed:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setAuthUser(null);
          setAdminProfile(null);
          setAdminUsers([]);
          setAdminUsersError(null);
          setRegistrations([]);
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    const loadInitialData = async () => {
      if (supabase) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          await verifyAdminSession(data?.session ?? null);
          await fetchDataFromSupabase();
        } catch (error) {
          console.error("Supabase initialization failed:", error);
          if (mounted) {
            setIsAuthenticated(false);
            setAuthUser(null);
            setIsLoading(false);
          }
        }
      } else {
        // Fallback to local cached content
        try {
          const savedEvents = localStorage.getItem("ieee_events_data");
          if (savedEvents) setEvents(JSON.parse(savedEvents));

          const savedExecom = localStorage.getItem("ieee_execom_data");
          if (savedExecom) setExecutiveCommittee(JSON.parse(savedExecom));

          const savedDomains = localStorage.getItem("ieee_domains_data");
          if (savedDomains) setDomains(JSON.parse(savedDomains));

          localStorage.removeItem("ieee_regs_data");
        } catch (error) {
          console.error("Local content initialization error:", error);
        } finally {
          if (mounted) setIsLoading(false);
        }
      }

      if (mounted) setIsInitialized(true);
    };

    loadInitialData();

    let subscription;
    if (supabase) {
      const authListener = supabase.auth.onAuthStateChange((_event, session) => {
        window.setTimeout(() => {
          verifyAdminSession(session);
        }, 0);
      });
      subscription = authListener.data?.subscription;
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchDataFromSupabase, fetchAdminUsers]);

  // Sync content cache (student registrations are excluded from browser storage for privacy)
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("ieee_events_data", JSON.stringify(events));
      localStorage.setItem("ieee_execom_data", JSON.stringify(executiveCommittee));
      localStorage.setItem("ieee_domains_data", JSON.stringify(domains));
      localStorage.removeItem("ieee_regs_data");
    }
  }, [events, executiveCommittee, domains, isInitialized]);

  // Google OAuth Sign-In
  const signInWithGoogle = async (redirectTo = "/admin") => {
    if (!supabase || !isSupabaseConfigured()) {
      return {
        success: false,
        message: configStatus.error || "Supabase is not configured. Check the frontend .env.local values and restart the development server.",
      };
    }

    try {
      const targetUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`;
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: targetUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, url: data?.url };
    } catch (err) {
      console.error("Google sign in failed:", err);
      return {
        success: false,
        message: "Failed to connect to Google OAuth service. Please check your network.",
      };
    }
  };

  // Sign out and clear session
  const logout = async () => {
    if (isLoggingOut) {
      return { success: false, message: "Logout already in progress" };
    }
    setIsLoggingOut(true);
    try {
      if (supabase) {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error("Supabase sign-out error:", error);
          throw error;
        }
      }
      return { success: true };
    } catch (err) {
      console.error("Logout exception:", err);
      throw err;
    } finally {
      setIsAuthenticated(false);
      setAuthUser(null);
      setAdminProfile(null);
      setAdminUsers([]);
      setAdminUsersLoading(false);
      setAdminUsersError(null);
      setRegistrations([]);
      setIsLoading(false);
      setIsLoggingOut(false);
    }
  };

  // =========================================
  // ADMINISTRATOR ALLOWLIST MANAGEMENT (Super Admin)
  // =========================================
  const addAdminUser = async ({ email, role = "admin" }) => {
    if (!supabase) {
      return { success: false, message: "Database not connected." };
    }

    const cleanEmail = email?.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, message: "Email is required." };
    }

    if (adminProfile?.role !== "super_admin" || adminProfile?.is_active !== true) {
      return { success: false, message: "Only an active Super Admin can add administrators." };
    }

    if (!["super_admin", "admin", "editor"].includes(role)) {
      return {
        success: false,
        message: "Invalid administrator role."
      };
    }

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_email: cleanEmail,
          p_role: role,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          success: false,
          code: result.code || null,
          message:
            result.error ||
            result.message ||
            "Failed to add administrator.",
          status: response.status,
        };
      }

      // Refresh the allowlist after successful provisioning.
      const refreshResult = await fetchAdminUsers();

      return {
        success: true,
        data: result.data,
        refreshWarning: refreshResult.success
          ? null
          : refreshResult.message,
      };
    } catch (err) {
      console.error("Error adding administrator:", err);

      return {
        success: false,
        message: err.message || "Failed to add administrator.",
      };
    }
  };

  const updateAdminUser = async (userId, updates) => {
    if (!supabase) return { success: false, message: "Database not connected." };
    try {
      const { error } = await supabase
        .from("admin_users")
        .update(updates)
        .eq("user_id", userId);

      if (error) throw error;
      setAdminUsers((prev) =>
        prev.map((u) => (u.user_id === userId ? { ...u, ...updates } : u))
      );
      return { success: true };
    } catch (err) {
      console.error("Error updating admin user:", err);
      return { success: false, message: err.message || "Failed to update administrator." };
    }
  };

  const removeAdminUser = async (userId) => {
    if (!supabase) return { success: false, message: "Database not connected." };
    try {
      const { error } = await supabase
        .from("admin_users")
        .delete()
        .eq("user_id", userId);

      if (error) throw error;
      setAdminUsers((prev) => prev.filter((u) => u.user_id !== userId));
      return { success: true };
    } catch (err) {
      console.error("Error removing admin user:", err);
      return { success: false, message: err.message || "Failed to remove administrator." };
    }
  };

  // =========================================
  // EVENTS
  // =========================================
  const addEvent = async (newEvent) => {
    const eventItem = {
      ...newEvent,
      id: `event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      status: "upcoming",
      recap: null,
      cover_image_url: null,
      parent_event_id: newEvent.parent_event_id || null,
    };

    if (supabase) {
      const { error } = await supabase.from("events").insert([eventItem]);
      if (error) {
        console.error("Supabase insert event error:", error);
        return { success: false, message: error.message || "Could not save the event." };
      }
    }
    setEvents((prev) => [eventItem, ...prev]);
    return { success: true, data: eventItem };
  };

  const updateEvent = async (eventId, updates) => {
    const allowed = {
      title: updates.title,
      description: updates.description,
      date: updates.date,
      month: updates.month,
      year: updates.year,
      time: updates.time,
      venue: updates.venue,
      category: updates.category,
      registration_url: updates.registration_url || null,
      parent_event_id: updates.parent_event_id || null,
      status: updates.status,
      recap: updates.recap,
    };
    Object.keys(allowed).forEach((key) => allowed[key] === undefined && delete allowed[key]);

    if (supabase) {
      const { error } = await supabase.from("events").update(allowed).eq("id", eventId);
      if (error) return { success: false, message: error.message };
    }
    setEvents((prev) => prev.map((event) => event.id === eventId ? { ...event, ...allowed } : event));
    return { success: true };
  };

  const setEventStatus = async (eventId, status) => {
    if (!["upcoming", "completed"].includes(status)) {
      return { success: false, message: "Invalid event status." };
    }
    return updateEvent(eventId, { status });
  };

  const updateEventRecap = async (eventId, recap) => updateEvent(eventId, { recap });

  const uploadEventPhotos = async (eventId, files) => {
    if (!supabase) return { success: false, message: "Supabase is not configured." };
    const selectedFiles = Array.from(files || []);
    if (!selectedFiles.length) return { success: false, message: "Choose at least one image." };

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 10 * 1024 * 1024;
    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        return { success: false, message: `${file.name}: use JPG, PNG, or WEBP.` };
      }
      if (file.size > maxSize) {
        return { success: false, message: `${file.name}: maximum file size is 10 MB.` };
      }
    }

    const uploadedPaths = [];
    const insertedRows = [];
    try {
      const { data: currentRows, error: listError } = await supabase
        .from("event_photos").select("id, storage_path, public_url, is_cover, display_order")
        .eq("event_id", eventId).order("display_order", { ascending: true });
      if (listError) throw listError;

      for (const [index, file] of selectedFiles.entries()) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-80);
        const path = `${eventId}/${Date.now()}-${index}-${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage.from("event-photos").upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
          contentType: file.type,
        });
        if (uploadError) throw uploadError;
        uploadedPaths.push(path);

        const { data: urlData } = supabase.storage.from("event-photos").getPublicUrl(path);
        insertedRows.push({
          event_id: eventId,
          storage_path: path,
          public_url: urlData.publicUrl,
          file_name: safeName,
          is_cover: !currentRows?.length && index === 0,
          display_order: (currentRows?.length || 0) + index,
        });
      }

      const { data: savedRows, error: insertError } = await supabase
        .from("event_photos").insert(insertedRows).select("*");
      if (insertError) throw insertError;

      const { data: allRows, error: reloadError } = await supabase
        .from("event_photos").select("*").eq("event_id", eventId).order("display_order", { ascending: true });
      if (reloadError) throw reloadError;
      const cover = allRows.find((row) => row.is_cover) || allRows[0];
      if (cover) {
        const { error: coverError } = await supabase.from("events")
          .update({ cover_image_url: cover.public_url }).eq("id", eventId);
        if (coverError) throw coverError;
      }
      setEvents((prev) => prev.map((event) => event.id === eventId ? {
        ...event,
        photos: allRows.map((row) => row.public_url),
        photoRecords: allRows,
        cover_image_url: cover?.public_url || null,
      } : event));
      return { success: true, data: savedRows };
    } catch (error) {
      // Roll back metadata and uploaded objects if a later step fails.
      if (uploadedPaths.length) {
        await supabase.from("event_photos").delete().in("storage_path", uploadedPaths);
        await supabase.storage.from("event-photos").remove(uploadedPaths);
      }
      console.error("Event photo upload failed:", error);
      return { success: false, message: error.message || "Photo upload failed." };
    }
  };

  const removeEventPhoto = async (eventId, photoId) => {
    if (!supabase) return { success: false, message: "Supabase is not configured." };
    const { data: photo, error: readError } = await supabase
      .from("event_photos").select("*").eq("id", photoId).eq("event_id", eventId).single();
    if (readError) return { success: false, message: readError.message };

    const { error: storageError } = await supabase.storage.from("event-photos").remove([photo.storage_path]);
    if (storageError) return { success: false, message: storageError.message };

    const { error: deleteError } = await supabase.from("event_photos").delete().eq("id", photoId);
    if (deleteError) return { success: false, message: deleteError.message };

    const { data: remaining, error: remainingError } = await supabase
      .from("event_photos").select("*").eq("event_id", eventId).order("display_order", { ascending: true });
    if (remainingError) return { success: false, message: remainingError.message };
    const cover = remaining.find((row) => row.is_cover) || remaining[0] || null;
    if (cover && !cover.is_cover) {
      const { error: coverError } = await supabase.from("event_photos").update({ is_cover: true }).eq("id", cover.id);
      if (coverError) return { success: false, message: coverError.message };
    }
    const { error: eventError } = await supabase.from("events")
      .update({ cover_image_url: cover?.public_url || null }).eq("id", eventId);
    if (eventError) return { success: false, message: eventError.message };

    setEvents((prev) => prev.map((event) => event.id === eventId ? {
      ...event,
      photos: remaining.map((row) => row.public_url),
      photoRecords: remaining.map((row) => row.id === cover?.id ? { ...row, is_cover: true } : row),
      cover_image_url: cover?.public_url || null,
    } : event));
    return { success: true };
  };

  const setEventCoverPhoto = async (eventId, photoId) => {
    if (!supabase) return { success: false, message: "Supabase is not configured." };
    const { data: photo, error: photoError } = await supabase
      .from("event_photos").select("public_url").eq("id", photoId).eq("event_id", eventId).single();
    if (photoError) return { success: false, message: photoError.message };

    // Clear the previous cover first; the partial unique index allows only one.
    const { error: clearError } = await supabase.from("event_photos")
      .update({ is_cover: false }).eq("event_id", eventId).eq("is_cover", true);
    if (clearError) return { success: false, message: clearError.message };

    const { error: setError } = await supabase.from("event_photos")
      .update({ is_cover: true }).eq("id", photoId).eq("event_id", eventId);
    if (setError) return { success: false, message: setError.message };

    const { error: eventError } = await supabase.from("events")
      .update({ cover_image_url: photo.public_url }).eq("id", eventId);
    if (eventError) return { success: false, message: eventError.message };

    setEvents((prev) => prev.map((event) => event.id === eventId ? {
      ...event,
      cover_image_url: photo.public_url,
      photoRecords: (event.photoRecords || []).map((row) => ({ ...row, is_cover: row.id === photoId })),
    } : event));
    return { success: true };
  };

  const reorderEventPhotos = async (eventId, orderedPhotoIds) => {
    if (!supabase) return { success: false, message: "Supabase is not configured." };
    if (!Array.isArray(orderedPhotoIds) || !orderedPhotoIds.length) {
      return { success: false, message: "No photo order was provided." };
    }

    const updates = await Promise.all(
      orderedPhotoIds.map((photoId, display_order) =>
        supabase.from("event_photos")
          .update({ display_order })
          .eq("id", photoId)
          .eq("event_id", eventId)
      )
    );
    const failed = updates.find((result) => result.error);
    if (failed?.error) return { success: false, message: failed.error.message };

    const { data: rows, error } = await supabase.from("event_photos")
      .select("*")
      .eq("event_id", eventId)
      .order("display_order", { ascending: true });
    if (error) return { success: false, message: error.message };

    setEvents((prev) => prev.map((event) => event.id === eventId ? {
      ...event,
      photoRecords: rows || [],
      photos: (rows || []).map((row) => row.public_url).filter(Boolean),
    } : event));
    return { success: true };
  };

  const removeEvent = async (id) => {
    if (supabase) {
      try {
        const { data: descendants, error: descendantsError } = await supabase
          .from("events").select("id, parent_event_id");
        if (descendantsError) throw descendantsError;
        const ids = new Set([id]);
        let changed = true;
        while (changed) {
          changed = false;
          (descendants || []).forEach((event) => {
            if (event.parent_event_id && ids.has(event.parent_event_id) && !ids.has(event.id)) {
              ids.add(event.id);
              changed = true;
            }
          });
        }
        const { data: photoRows, error: photoError } = await supabase
          .from("event_photos").select("storage_path").in("event_id", [...ids]);
        if (photoError) throw photoError;
        const paths = (photoRows || []).map((row) => row.storage_path).filter(Boolean);
        if (paths.length) {
          const { error: storageError } = await supabase.storage.from("event-photos").remove(paths);
          if (storageError) throw storageError;
        }
        const { error: deleteError } = await supabase.from("events").delete().eq("id", id);
        if (deleteError) throw deleteError;
        setEvents((prev) => prev.filter((event) => !ids.has(event.id)));
        return { success: true };
      } catch (err) {
        console.error("Supabase delete event error:", err);
        await fetchDataFromSupabase();
        return { success: false, message: err.message || "Could not delete event." };
      }
    }

    setEvents((prev) => {
      const ids = new Set([id]);
      let changed = true;
      while (changed) {
        changed = false;
        prev.forEach((event) => {
          if (event.parent_event_id && ids.has(event.parent_event_id) && !ids.has(event.id)) {
            ids.add(event.id); changed = true;
          }
        });
      }
      return prev.filter((event) => !ids.has(event.id));
    });
    return { success: true };
  };

  // =========================================
  // EXECUTIVE COMMITTEE
  // =========================================
  const requireSuperAdmin = () =>
    adminProfile?.role === "super_admin" && adminProfile?.is_active === true;

  const addExecomMember = async (newMember) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage Office Bearers." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const memberItem = {
      name: String(newMember.name || "").trim(),
      role: String(newMember.role || "").trim(),
      // Keep the legacy database column populated for schemas where it is NOT NULL.
      // Bio/description is no longer collected or displayed.
      description: "",
      email: newMember.email || null,
      linkedin: newMember.linkedin || null,
      image: newMember.image || null,
      display_order: executiveCommittee.length
        ? Math.max(...executiveCommittee.map((member) => Number(member.display_order) || 0)) + 1
        : 0,
      id: `execom-${Date.now()}`,
    };
    if (!memberItem.name || !memberItem.role) {
      return { success: false, message: "Name and role are required." };
    }
    const { data, error } = await supabase.from("executive_committee").insert([memberItem]).select().single();
    if (error) return { success: false, message: error.message };
    setExecutiveCommittee((prev) => [...prev, data]);
    return { success: true, data };
  };

  const updateExecomMember = async (id, updates) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage Office Bearers." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const payload = {
      name: String(updates.name || "").trim(),
      role: String(updates.role || "").trim(),
      // Retain compatibility with the existing database column without exposing a bio field.
      description: "",
      email: updates.email || null,
      linkedin: updates.linkedin || null,
      image: updates.image || null,
    };
    if (!payload.name || !payload.role) return { success: false, message: "Name and role are required." };
    const { data, error } = await supabase.from("executive_committee").update(payload).eq("id", id).select().single();
    if (error) return { success: false, message: error.message };
    setExecutiveCommittee((prev) => prev.map((member) => member.id === id ? data : member));
    return { success: true, data };
  };

  const removeExecomMember = async (id) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage Office Bearers." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const { error } = await supabase.from("executive_committee").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
    setExecutiveCommittee((prev) => prev.filter((member) => member.id !== id));
    return { success: true };
  };

  const reorderExecomMembers = async (orderedIds) => {
    if (!requireSuperAdmin()) {
      return { success: false, message: "Only an active Super Admin can reorder Office Bearers." };
    }
    if (!supabase) return { success: false, message: "Database not connected." };

    const currentIds = executiveCommittee.map((member) => String(member.id));
    const nextIds = (orderedIds || []).map(String);
    if (
      nextIds.length !== currentIds.length ||
      new Set(nextIds).size !== currentIds.length ||
      currentIds.some((id) => !nextIds.includes(id))
    ) {
      return { success: false, message: "The Office Bearer order is invalid. Refresh and try again." };
    }

    const updates = await Promise.all(
      nextIds.map((id, display_order) =>
        supabase
          .from("executive_committee")
          .update({ display_order })
          .eq("id", id)
      )
    );
    const failed = updates.find((result) => result.error);
    if (failed?.error) {
      await fetchDataFromSupabase();
      return { success: false, message: failed.error.message };
    }

    const memberById = new Map(executiveCommittee.map((member) => [String(member.id), member]));
    setExecutiveCommittee(nextIds.map((id, display_order) => ({
      ...memberById.get(id),
      display_order,
    })));
    return { success: true };
  };

  // =========================================
  // SUPER-ADMIN-ONLY TEAM MANAGEMENT
  // =========================================
  const updateBranchCounsellor = async (updates) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage Team details." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const payload = {
      id: 1,
      name: String(updates.name || "").trim(),
      role: "Branch Counsellor",
      image: updates.image || null,
      email: updates.email || null,
      linkedin: updates.linkedin || null,
      updated_at: new Date().toISOString(),
    };
    if (!payload.name) return { success: false, message: "Branch Counsellor name is required." };
    const { data, error } = await supabase.from("branch_counsellor").upsert(payload, { onConflict: "id" }).select().single();
    if (error) return { success: false, message: error.message };
    setBranchCounsellor(data);
    return { success: true, data };
  };

  const addStudentCommittee = async ({ name }) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC committees." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const cleanName = String(name || "").trim();
    if (!cleanName) return { success: false, message: "Committee name is required." };
    const { data, error } = await supabase.from("student_committees").insert({ name: cleanName, display_order: studentCommittees.length + 1 }).select().single();
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => [...prev, { ...data, members: [] }]);
    return { success: true, data };
  };

  const updateStudentCommittee = async (id, updates) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC committees." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const cleanName = String(updates.name || "").trim();
    if (!cleanName) return { success: false, message: "Committee name is required." };
    const { data, error } = await supabase.from("student_committees").update({ name: cleanName }).eq("id", id).select().single();
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => prev.map((item) => item.id === id ? { ...item, ...data } : item));
    return { success: true, data };
  };

  const removeStudentCommittee = async (id) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC committees." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const { error } = await supabase.from("student_committees").delete().eq("id", id);
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => prev.filter((item) => item.id !== id));
    return { success: true };
  };

  const addStudentCommitteeMember = async (committeeId, member) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC members." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const name = String(member.name || "").trim();
    if (!name) return { success: false, message: "Member name is required." };
    const { data, error } = await supabase.from("student_committee_members").insert({ committee_id: committeeId, name, image: member.image || null }).select().single();
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => prev.map((committee) => committee.id === committeeId ? { ...committee, members: [...(committee.members || []), data] } : committee));
    return { success: true, data };
  };

  const updateStudentCommitteeMember = async (committeeId, memberId, updates) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC members." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const name = String(updates.name || "").trim();
    if (!name) return { success: false, message: "Member name is required." };
    const { data, error } = await supabase.from("student_committee_members").update({ name, image: updates.image || null }).eq("id", memberId).eq("committee_id", committeeId).select().single();
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => prev.map((committee) => committee.id === committeeId ? { ...committee, members: committee.members.map((member) => member.id === memberId ? data : member) } : committee));
    return { success: true, data };
  };

  const removeStudentCommitteeMember = async (committeeId, memberId) => {
    if (!requireSuperAdmin()) return { success: false, message: "Only an active Super Admin can manage SAC members." };
    if (!supabase) return { success: false, message: "Database not connected." };
    const { error } = await supabase.from("student_committee_members").delete().eq("id", memberId).eq("committee_id", committeeId);
    if (error) return { success: false, message: error.message };
    setStudentCommittees((prev) => prev.map((committee) => committee.id === committeeId ? { ...committee, members: committee.members.filter((member) => member.id !== memberId) } : committee));
    return { success: true };
  };

  // =========================================
  // TECHNICAL DOMAINS
  // =========================================
  const addDomain = async (newDomain) => {
    const nextNumber = String(domains.length + 1).padStart(2, "0");
    const domainItem = {
      ...newDomain,
      id: "domain-" + Date.now(),
      number: nextNumber,
      iconName: newDomain.iconName || "BrainCircuit",
    };

    setDomains((prev) => [...prev, domainItem]);

    if (supabase) {
      try {
        await supabase.from("domains").insert([
          {
            id: domainItem.id,
            title: domainItem.title,
            short_title: domainItem.shortTitle,
            description: domainItem.description,
            icon_name: domainItem.iconName,
            number: domainItem.number,
          },
        ]);
      } catch (err) {
        console.error("Supabase insert domain error:", err);
      }
    }

    return domainItem;
  };

  const removeDomain = async (id) => {
    setDomains((prev) => {
      const filtered = prev.filter((d) => d.id !== id);
      return filtered.map((d, index) => ({
        ...d,
        number: String(index + 1).padStart(2, "0"),
      }));
    });

    if (supabase) {
      try {
        await supabase.from("domains").delete().eq("id", id);
      } catch (err) {
        console.error("Supabase delete domain error:", err);
      }
    }
  };

  // =========================================
  // STUDENT REGISTRATIONS
  // =========================================
  const addRegistration = async (regData) => {
    const newReg = {
      ...regData,
      id: "reg-" + Date.now(),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      try {
        const { error } = await supabase.from("registrations").insert([
          {
            name: regData.name,
            email: regData.email,
            branch: regData.branch,
            year: regData.year,
            domain: regData.domain,
            phone: regData.phone || null,
            status: "pending",
          },
        ]);

        if (error) throw error;
      } catch (err) {
        console.error("Supabase registration error:", err);
        return { success: false, message: "Registration could not be saved." };
      }
    }

    setRegistrations((prev) => [newReg, ...prev]);
    return { success: true, data: newReg };
  };

  const removeRegistration = async (id) => {
    setRegistrations((prev) => prev.filter((reg) => reg.id !== id));

    if (supabase) {
      try {
        await supabase.from("registrations").delete().eq("id", id);
      } catch (err) {
        console.error("Supabase delete registration error:", err);
      }
    }
  };

  // Reset data to defaults
  const resetToDefaults = () => {
    setEvents(initialEvents);
    setExecutiveCommittee(initialExecom);
    setDomains(initialDomains);
    setRegistrations(initialRegistrations);
    if (typeof window !== "undefined") {
      localStorage.setItem("ieee_events_data", JSON.stringify(initialEvents));
      localStorage.setItem("ieee_execom_data", JSON.stringify(initialExecom));
      localStorage.setItem("ieee_domains_data", JSON.stringify(initialDomains));
      localStorage.removeItem("ieee_regs_data");
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isUsingSupabase,
        configError: configStatus.error,
        isAuthenticated,
        authUser,
        adminProfile,
        adminUsers,
        adminUsersLoading,
        adminUsersError,
        signInWithGoogle,
        logout,
        isLoading,
        isLoggingOut,
        // Allowlist Management
        fetchAdminUsers,
        addAdminUser,
        updateAdminUser,
        removeAdminUser,
        // Events
        events,
        addEvent,
        removeEvent,
        updateEvent,
        setEventStatus,
        updateEventRecap,
        uploadEventPhotos,
        removeEventPhoto,
        setEventCoverPhoto,
        reorderEventPhotos,
        // ExeCom
        executiveCommittee,
        addExecomMember,
        updateExecomMember,
        removeExecomMember,
        reorderExecomMembers,
        branchCounsellor,
        updateBranchCounsellor,
        studentCommittees,
        addStudentCommittee,
        updateStudentCommittee,
        removeStudentCommittee,
        addStudentCommitteeMember,
        updateStudentCommitteeMember,
        removeStudentCommitteeMember,
        // Domains
        domains,
        addDomain,
        removeDomain,
        // Registrations
        registrations,
        addRegistration,
        removeRegistration,
        // Utilities
        refreshData: fetchDataFromSupabase,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
