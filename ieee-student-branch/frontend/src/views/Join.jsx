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
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-12">
      {/* Background glowing decorations with delicate color combinations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.24)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
            <Sparkles size={14} className="text-[#29A9E0]" />
            <span>Membership 2026-27</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl">
            Join the IEEE
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent"> Student Branch</span>
          </h1>

          <p className="mt-5 text-lg leading-8 text-[#526477]">
            Step into the world&apos;s largest technical professional organization. Gain access to IEEE Xplore,
            distinguished lecture series, flagship student hackathons, and global peer networks.
          </p>

          {isUsingSupabase && (
            <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
              <Database size={13} />
              <span>Realtime Cloud Database Active</span>
            </div>
          )}
        </div>


        {/* =========================
            CONTENT GRID
        ========================== */}
        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">

          {/* Left Column — Perks in Glass Cards with subtle color touches */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#10243A] mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00629B]" />
              Why Join IEEE RNSIT?
            </h2>

            <div className="group rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-[0_16px_32px_rgba(0,98,155,0.1)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25">
                  <Globe size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#10243A] transition-colors group-hover:text-[#00629B]">Global IEEE Professional Network</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#526477]">
                    Connect directly with over 420,000+ members worldwide, access IEEE Sections, and collaborate across international chapters.
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border border-indigo-100 bg-white p-6 shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-[0_16px_32px_rgba(79,70,229,0.1)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 text-white shadow-sm shadow-indigo-500/25">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#10243A] transition-colors group-hover:text-indigo-600">Research & Publication Grants</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#526477]">
                    Gain exclusive access to IEEE Xplore Digital Library papers, discounts on conference registrations, and guidance for writing research papers.
                  </p>
                </div>
              </div>
            </div>

            <div className="group rounded-2xl border border-orange-100 bg-white p-6 shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_16px_32px_rgba(242,101,34,0.1)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/25">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#10243A] transition-colors group-hover:text-[#F26522]">Leadership & Executive Experience</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#526477]">
                    Lead teams in flagship tech fests, organize international events, and build verifiable credentials for higher studies and careers.
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column — Membership Registration Glass Form */}
          <div className="relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-8 shadow-[0_16px_45px_rgba(16,36,58,0.08)] sm:p-10">
            {/* Top delicate multi-color hairline */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]" />

            {submitted ? (
              <div className="py-12 text-center animate-pulse-glow">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-sky-100 text-[#00629B] border border-blue-200 shadow-md shadow-blue-500/10">
                  <CheckCircle2 size={40} className="text-[#00629B]" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-[#10243A]">Application Received!</h3>
                <p className="mt-3 text-[#526477] leading-relaxed">
                  Thank you, <strong className="text-[#00629B]">{formData.name || "Student"}</strong>. Your membership registration has been stored. Our executive council will reach out to you via <strong className="text-[#00629B]">{formData.email || "your email"}</strong> with next steps.
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
                  className="mt-8 rounded-full border border-[#DCE5EC] bg-white px-6 py-2.5 text-sm font-semibold text-[#10243A] shadow-xs transition hover:border-[#00629B]/35 hover:bg-gradient-to-r hover:from-white hover:to-[#E6F4FB] hover:text-[#00629B]"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-[#10243A]">Membership Application</h3>
                  <p className="mt-1 text-sm text-[#526477]">
                    Fill in your details below to register as a student member.
                  </p>
                </div>

                <div>
                  <label htmlFor="join-name" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                    Full Name *
                  </label>
                  <input
                    id="join-name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[#D5E0E8] bg-white px-4 py-3 text-sm text-[#10243A] placeholder-[#8291A0] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10"
                  />
                </div>

                <div>
                  <label htmlFor="join-email" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                    College / Personal Email *
                  </label>
                  <input
                    id="join-email"
                    type="email"
                    required
                    placeholder="student@rnsit.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[#D5E0E8] bg-white px-4 py-3 text-sm text-[#10243A] placeholder-[#8291A0] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="join-branch" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                      Department / Branch *
                    </label>
                    <input
                      id="join-branch"
                      type="text"
                      required
                      placeholder="e.g. CSE, ECE, ISE, AI"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#D5E0E8] bg-white px-4 py-3 text-sm text-[#10243A] placeholder-[#8291A0] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10"
                    />
                  </div>

                  <div>
                    <label htmlFor="join-year" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                      Academic Year
                    </label>
                    <select
                      id="join-year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#D5E0E8] bg-white px-4 py-3 text-sm text-[#10243A] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10 [&>option]:bg-white [&>option]:text-[#10243A]"
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
                    <label htmlFor="join-domain" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                      Domain of Interest
                    </label>
                    <select
                      id="join-domain"
                      value={formData.domain}
                      onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                      className="mt-2 w-full rounded-xl border border-[#D5E0E8] bg-white px-4 py-3 text-sm text-[#10243A] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10 [&>option]:bg-white [&>option]:text-[#10243A]"
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
                    <label htmlFor="join-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#526477]">
                      Phone Number (Optional)
                    </label>
                    <div className="relative mt-2">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#647588]">
                        <Phone size={15} />
                      </div>
                      <input
                        id="join-phone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-[#D5E0E8] bg-white py-3 pl-10 pr-4 text-sm text-[#10243A] placeholder-[#8291A0] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-6 py-3.5 font-semibold text-white shadow-md shadow-[#00629B]/25 transition-all duration-300 hover:scale-[1.01] hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg hover:shadow-[#00629B]/35 active:scale-[0.99] disabled:opacity-60"
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

                <p className="text-center text-xs text-[#647588] pt-2">
                  Have questions? Connect directly with us at <span className="font-semibold text-[#00629B]">ieee@rnsit.ac.in</span>
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

export default Join;
