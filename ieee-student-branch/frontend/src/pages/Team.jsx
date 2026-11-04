import {
  ArrowRight,
  ExternalLink,
  Mail,
  UserRound,
  Sparkles,
} from "lucide-react";

const executiveCommittee = [
  {
    name: "Suhan Ganesh",
    role: "Student Chair",
    description:
      "Leads the IEEE Student Branch and coordinates strategic growth, campus initiatives and chapter activities.",
  },
  {
    name: "Poorvika Nagraj",
    role: "Student Vice Chair",
    description:
      "Oversees technical societies, industry partnerships and core branch operations.",
  },
  {
    name: "Nikhil Nayak",
    role: "Webmaster",
    description:
      "Architects digital platforms, manages the branch web ecosystem and online resources.",
  },
  {
    name: "Bhadrinath G R",
    role: "Treasurer",
    description:
      "Directs budget allocations, financial audits and sponsorship logistics for all major events.",
  },
  {
    name: "prathika P",
    role: "Secretary",
    description:
      "Coordinates executive proceedings, official IEEE communication and regulatory documentation.",
  },
];

const operationsTeam = [
  {
    name: "Technical Lead",
    role: "Technical Division",
  },
  {
    name: "Coordination Lead",
    role: "Coordination & Professional",
  },
  {
    name: "Editorial Lead",
    role: "Content & Documentation",
  },
  {
    name: "Creative Lead",
    role: "Media, Editing & Design",
  },
  {
    name: "Activities Lead",
    role: "Event Management",
  },
];

function ProfilePlaceholder() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#00629B] via-[#0A2E4E] to-[#071A2B] text-white shadow-xl transition-all duration-300 group-hover:border-[#29A9E0]/60 group-hover:scale-105 group-hover:shadow-[0_0_25px_rgba(41,169,224,0.35)]">
      <UserRound size={36} strokeWidth={1.5} className="text-cyan-200" />
      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-[#071A2B] bg-[#29A9E0]" />
    </div>
  );
}

function Team() {
  return (
    <section
      id="team"
      className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
            <Sparkles size={14} />
            <span>Executive Leadership</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
            Meet the people behind
            <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent"> IEEE SB.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            A dynamic council of student leaders, engineers, and visionaries dedicated to cultivating
            innovation, technical excellence and collaborative community growth.
          </p>

        </div>


        {/* =========================
            EXECUTIVE COMMITTEE
        ========================== */}
        <div className="mt-16">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#29A9E0]">
              EXECUTIVE COMMITTEE
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

            {executiveCommittee.map((member) => (
              <article
                key={member.role}
                className="glass-card-interactive group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#29A9E0]/40 hover:shadow-[0_20px_45px_-15px_rgba(0,98,155,0.35),0_0_25px_rgba(41,169,224,0.18)]"
              >

                {/* Profile */}
                <div className="flex justify-center">
                  <ProfilePlaceholder />
                </div>

                {/* Name */}
                <h4 className="mt-6 text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#29A9E0]">
                  {member.name}
                </h4>

                {/* Role */}
                <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#29A9E0]">
                  {member.role}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-300 min-h-[72px]">
                  {member.description}
                </p>

                {/* Social Buttons */}
                <div className="mt-5 flex justify-center gap-2 border-t border-white/10 pt-4">

                  <button
                    type="button"
                    aria-label={`${member.name} LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-200 hover:border-[#29A9E0] hover:bg-[#00629B] hover:text-white hover:scale-105"
                  >
                    <ExternalLink size={14} />
                  </button>

                  <button
                    type="button"
                    aria-label={`${member.name} email`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-200 hover:border-[#29A9E0] hover:bg-[#00629B] hover:text-white hover:scale-105"
                  >
                    <Mail size={14} />
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>


        {/* =========================
            OPERATIONS TEAM
        ========================== */}
        <div className="mt-20">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#29A9E0]">
              OPERATIONS & CHAPTER HEADS
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {operationsTeam.map((member) => (
              <article
                key={member.role}
                className="glass-card group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#29A9E0]/40 hover:bg-white/[0.06] hover:shadow-[0_10px_25px_-5px_rgba(0,98,155,0.3)]"
              >

                {/* Small Profile */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-all duration-300 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(41,169,224,0.3)]">
                  <UserRound size={22} />
                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#29A9E0]">
                    {member.role}
                  </p>

                  <h4 className="mt-0.5 truncate text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {member.name}
                  </h4>

                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-slate-400">
                    Lead
                  </span>

                </div>

              </article>
            ))}

          </div>

        </div>


        {/* =========================
            JOIN TEAM GLASS CTA
        ========================== */}
        <div className="glass-panel relative mt-20 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-[#0A2236]/90 to-[#071A2B]/95 p-8 text-center backdrop-blur-2xl shadow-2xl sm:p-14">

          {/* Decorative floating rings */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10 animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-white/10 animate-float-reverse" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#29A9E0]/50 to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Be Part of the Community</span>
            </div>

            <h3 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to create an impact?
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Join the IEEE RNSIT family to collaborate on breakthrough engineering projects,
              participate in global student conferences, and expand your professional network.
            </p>

            <a
              href="/join"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] to-[#0077B8] px-8 py-3.5 font-semibold text-white shadow-lg shadow-[#00629B]/40 transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/30 active:scale-95"
            >
              <span>Join IEEE Student Branch</span>
              <ArrowRight size={18} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Team;
