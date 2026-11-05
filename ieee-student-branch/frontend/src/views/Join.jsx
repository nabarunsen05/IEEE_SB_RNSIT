"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, Globe, Award, BookOpen, Send, Phone, Database } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

function Join() {
  const { addRegistration, domains, isUsingSupabase } = useAdmin();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "1st Year",
    domain: "Artificial Intelligence",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await addRegistration(formData);
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#071A2B] px-6 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-12">
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
            <Sparkles size={14} />
            <span>Membership 2026-27</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join the IEEE
            <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent"> Student Branch</span>
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Step into the world&apos;s largest technical professional organization. Gain access to IEEE Xplore,
            distinguished lecture series, flagship student hackathons, and global peer networks.
          </p>

          {isUsingSupabase && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-emerald-400">
              <Database size={13} />
              <span>Realtime Cloud Database Active</span>
            </div>
          )}
        </div>


        {/* =========================
            CONTENT GRID
        ========================== */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* Left Column — Perks in Glass Cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#29A9E0]" />
              Why Join IEEE RNSIT?
            </h2>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00629B]/30 text-[#29A9E0]">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Global IEEE Professional Network</h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    Connect directly with over 420,000+ members worldwide, access IEEE Sections, and collaborate across international chapters.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00629B]/30 text-[#29A9E0]">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Research & Publication Grants</h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    Gain exclusive access to IEEE Xplore Digital Library papers, discounts on conference registrations, and guidance for writing research papers.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00629B]/30 text-[#29A9E0]">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Leadership & Executive Experience</h3>
                  <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">
                    Lead teams in flagship tech fests, organize international events, and build verifiable credentials for higher studies and careers.
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column — Membership Registration Glass Form */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10">
            {submitted ? (
              <div className="py-12 text-center animate-pulse-glow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#00629B]/30 text-[#29A9E0] border border-[#29A9E0]/40 shadow-[0_0_30px_rgba(41,169,224,0.3)]">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">Application Received!</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{formData.name || "Student"}</strong>. Your membership registration has been stored. Our executive council will reach out to you via <strong className="text-cyan-300">{formData.email || "your email"}</strong> with next steps.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      branch: "",
                      year: "1st Year",
                      domain: "Artificial Intelligence",
                      phone: "",
                    });
                  }}
                  className="mt-8 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-[#29A9E0]/50"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white">Membership Application</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Fill in your details below to register as a student member.
                  </p>
                </div>

                <div>
                  <label htmlFor="join-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Full Name *
                  </label>
                  <input
                    id="join-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm placeholder-slate-500"
                  />
                </div>

                <div>
                  <label htmlFor="join-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    College / Personal Email *
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    required
                    placeholder="student@rnsit.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm placeholder-slate-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="join-branch" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Department / Branch *
                    </label>
                    <input
                      id="join-branch"
                      type="text"
                      required
                      placeholder="e.g. CSE, ECE, ISE, AI"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm placeholder-slate-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="join-year" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Academic Year
                    </label>
                    <select
                      id="join-year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm text-white [&>option]:bg-[#071A2B] [&>option]:text-white"
                    >
                      <option>1st Year</option>
                      <option>2nd Year</option>
                      <option>3rd Year</option>
                      <option>4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="join-domain" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Domain of Interest
                    </label>
                    <select
                      id="join-domain"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm text-white [&>option]:bg-[#071A2B] [&>option]:text-white"
                    >
                      {domains.length > 0 ? (
                        domains.map((dom) => (
                          <option key={dom.id || dom.title} value={dom.title}>
                            {dom.title}
                          </option>
                        ))
                      ) : (
                        <>
                          <option>Artificial Intelligence & Data Science</option>
                          <option>Web & Mobile App Development</option>
                          <option>Robotics, IoT & Embedded Systems</option>
                          <option>Cybersecurity & Ethical Hacking</option>
                          <option>Cloud Computing & DevOps</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="join-phone" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Phone Number (Optional)
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                        <Phone size={15} />
                      </div>
                      <input
                        id="join-phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-sm placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#00629B]/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(41,169,224,0.45)] active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Registering...</span>
                    </span>
                  ) : (
                    <>
                      <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                      <span>Submit Membership Request</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 pt-2">
                  Have questions? Connect directly with us at <span className="text-[#29A9E0]">ieee@rnsit.ac.in</span>
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}

export default Join;
