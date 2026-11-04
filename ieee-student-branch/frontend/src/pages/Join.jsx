import { useState } from "react";
import { Sparkles, CheckCircle2, Globe, Award, BookOpen, Send } from "lucide-react";

function Join() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "1st Year",
    domain: "Artificial Intelligence",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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

            <div className="glass-card-interactive group rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#29A9E0]/40 hover:bg-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-colors group-hover:bg-[#00629B] group-hover:text-white">
                  <Globe size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E0] transition-colors">
                    Global Recognition & Network
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">
                    Connect with over 400,000+ technology leaders and researchers across 160 countries in Region 10 and worldwide.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card-interactive group rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#29A9E0]/40 hover:bg-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-colors group-hover:bg-[#00629B] group-hover:text-white">
                  <BookOpen size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E0] transition-colors">
                    Research & Technical Societies
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">
                    Direct access to specialized chapters including Computer Society, Robotics & Automation, and WIE with conference subsidies.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card-interactive group rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#29A9E0]/40 hover:bg-white/[0.06]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-colors group-hover:bg-[#00629B] group-hover:text-white">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#29A9E0] transition-colors">
                    Leadership & Hackathons
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">
                    Lead teams in flagship tech fests, organize international events, and build verifiable credentials for higher studies and careers.
                  </p>
                </div>
              </div>
            </div>
          </div>


          {/* Right Column — Frosted Glass Registration Form */}
          <div className="glass-panel relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0A2236]/90 to-[#071A2B]/90 p-8 backdrop-blur-2xl shadow-2xl sm:p-10">
            {/* Subtle top glare */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#29A9E0]/50 to-transparent" />

            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-[#00629B]/20 text-[#29A9E0] shadow-[0_0_30px_rgba(41,169,224,0.3)] animate-pulse-glow">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-white">Application Received!</h3>
                <p className="mt-3 text-slate-300 leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{formData.name || "Student"}</strong>. Our executive council will reach out to you via <strong className="text-cyan-300">{formData.email || "your email"}</strong> with next steps and orientation details.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:border-[#29A9E0]/50"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white">Membership Application</h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Fill in your details below to begin your IEEE registration.
                  </p>
                </div>

                <div>
                  <label htmlFor="join-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Full Name
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
                    College / Personal Email
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
                      Department / Branch
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

                <div>
                  <label htmlFor="join-domain" className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Primary Domain of Interest
                  </label>
                  <select
                    id="join-domain"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="glass-input mt-2 w-full rounded-xl px-4 py-3 text-sm text-white [&>option]:bg-[#071A2B] [&>option]:text-white"
                  >
                    <option>Artificial Intelligence & Data Science</option>
                    <option>Web & Mobile App Development</option>
                    <option>Robotics, IoT & Embedded Systems</option>
                    <option>Cybersecurity & Ethical Hacking</option>
                    <option>Cloud Computing & DevOps</option>
                    <option>Research & Paper Publications</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-6 py-3.5 font-semibold text-white shadow-lg shadow-[#00629B]/40 transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(41,169,224,0.45)] active:scale-[0.99]"
                >
                  <Send size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  <span>Submit Membership Request</span>
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
