"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  // Data States
  const [events, setEvents] = useState(initialEvents);
  const [executiveCommittee, setExecutiveCommittee] = useState(initialExecom);
  const [domains, setDomains] = useState(initialDomains);
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all data from Supabase
  const fetchDataFromSupabase = useCallback(async () => {
    if (!supabase) return;
    setIsLoading(true);

    try {
      // 1. Events
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (!eventsError && eventsData && eventsData.length > 0) {
        setEvents(eventsData);
      }

      // 2. Executive Committee
      const { data: execomData, error: execomError } = await supabase
        .from("executive_committee")
        .select("*")
        .order("created_at", { ascending: true });

      if (!execomError && execomData && execomData.length > 0) {
        setExecutiveCommittee(execomData);
      }

      // 3. Domains
      const { data: domainsData, error: domainsError } = await supabase
        .from("domains")
        .select("*")
        .order("number", { ascending: true });

      if (!domainsError && domainsData && domainsData.length > 0) {
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

      if (!regsError && regsData) {
        setRegistrations(regsData);
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local state:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize Supabase Auth and verify that the signed-in user is an
  // explicitly approved administrator. Browser storage is never treated as proof
  // of authentication.
  useEffect(() => {
    if (typeof window === "undefined") return;

    let mounted = true;

    const verifyAdminSession = async (session) => {
      if (!mounted) return;

      if (!session?.user || !supabase) {
        setIsAuthenticated(false);
        setAuthUser(null);
        return;
      }

      try {
       const { data, error } = await supabase.rpc("is_admin");

        if (!mounted) return;

        if (error || data !== true) {
  setIsAuthenticated(false);
  setAuthUser(null);
  await supabase.auth.signOut();
  return;
}
        setIsAuthenticated(true);
        setAuthUser(session.user);
      } catch (error) {
        console.error("Admin authorization check failed:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setAuthUser(null);
        }
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
          }
        }
      } else {
        // Load cached public content only. No local auth fallback is allowed.
        try {
          const savedEvents = localStorage.getItem("ieee_events_data");
          if (savedEvents) setEvents(JSON.parse(savedEvents));

          const savedExecom = localStorage.getItem("ieee_execom_data");
          if (savedExecom) {
            const parsed = JSON.parse(savedExecom);
            setExecutiveCommittee(
              parsed.map((member) =>
                member.name === "prathika P" ? { ...member, name: "Prathika P" } : member
              )
            );
          }

          const savedDomains = localStorage.getItem("ieee_domains_data");
          if (savedDomains) setDomains(JSON.parse(savedDomains));

          const savedRegs = localStorage.getItem("ieee_regs_data");
          if (savedRegs) setRegistrations(JSON.parse(savedRegs));
        } catch (error) {
          console.error("Local content initialization error:", error);
        }
      }

      if (mounted) setIsInitialized(true);
    };

    loadInitialData();

    let subscription;
    if (supabase) {
      const authListener = supabase.auth.onAuthStateChange((_event, session) => {
        // Defer the database authorization check so it does not run inside the
        // Supabase auth event callback.
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
  }, [fetchDataFromSupabase]);

  // Keep a local cache of content; it is not an authentication mechanism.
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("ieee_events_data", JSON.stringify(events));
      localStorage.setItem("ieee_execom_data", JSON.stringify(executiveCommittee));
      localStorage.setItem("ieee_domains_data", JSON.stringify(domains));
      localStorage.setItem("ieee_regs_data", JSON.stringify(registrations));
    }
  }, [events, executiveCommittee, domains, registrations, isInitialized]);

  // Sign in through Supabase Auth, then require an active admin_users allow-list row.
  const login = async (userIdOrEmail, password) => {
    const email = String(userIdOrEmail || "").trim().toLowerCase();
    const cleanPass = String(password || "");

    if (!email || !cleanPass) {
      return { success: false, message: "Enter your admin email and password." };
    }

    if (!supabase || !isSupabaseConfigured()) {
      return {
        success: false,
        message: "Supabase is not configured. Check the frontend .env.local values and restart the development server.",
      };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: cleanPass,
      });

      if (error || !data?.user || !data?.session) {
        return {
          success: false,
          message: error?.message || "Sign-in failed. Check your email and password.",
        };
      }

    const { data: isAdmin, error: adminError } =
  await supabase.rpc("is_admin");

     if (adminError || isAdmin !== true) {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setAuthUser(null);
        return {
          success: false,
          message: "This account is not authorized as an IEEE Student Branch administrator.",
        };
      }

      setIsAuthenticated(true);
      setAuthUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Admin sign-in failed:", error);
      return {
        success: false,
        message: "Unable to sign in right now. Check your Supabase connection and try again.",
      };
    }
  };

  // Sign out and clear the in-memory administrator state.
  const logout = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) console.error("Supabase sign-out error:", error);
    }
    setIsAuthenticated(false);
    setAuthUser(null);
  };

  // =========================================
  // EVENTS
  // =========================================
  const addEvent = async (newEvent) => {
    const eventItem = {
      ...newEvent,
      id: "event-" + Date.now(),
    };

    setEvents((prev) => [eventItem, ...prev]);

    if (supabase) {
      try {
        await supabase.from("events").insert([eventItem]);
      } catch (err) {
        console.error("Supabase insert event error:", err);
      }
    }

    return eventItem;
  };

  const removeEvent = async (id) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));

    if (supabase) {
      try {
        await supabase.from("events").delete().eq("id", id);
      } catch (err) {
        console.error("Supabase delete event error:", err);
      }
    }
  };

  // =========================================
  // EXECUTIVE COMMITTEE
  // =========================================
  const addExecomMember = async (newMember) => {
    const memberItem = {
      ...newMember,
      id: "execom-" + Date.now(),
    };

    setExecutiveCommittee((prev) => [...prev, memberItem]);

    if (supabase) {
      try {
        await supabase.from("executive_committee").insert([memberItem]);
      } catch (err) {
        console.error("Supabase insert execom error:", err);
      }
    }

    return memberItem;
  };

  const removeExecomMember = async (id) => {
    setExecutiveCommittee((prev) => prev.filter((member) => member.id !== id));

    if (supabase) {
      try {
        await supabase.from("executive_committee").delete().eq("id", id);
      } catch (err) {
        console.error("Supabase delete execom error:", err);
      }
    }
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
      localStorage.setItem("ieee_regs_data", JSON.stringify(initialRegistrations));
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isUsingSupabase,
        isAuthenticated,
        authUser,
        login,
        logout,
        isLoading,
        // Events
        events,
        addEvent,
        removeEvent,
        // ExeCom
        executiveCommittee,
        addExecomMember,
        removeExecomMember,
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
