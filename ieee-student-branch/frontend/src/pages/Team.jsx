import {
  ArrowRight,
  ExternalLink,
  Mail,
  UserRound,
} from "lucide-react";

const leadership = [
  {
    name: "Your Name",
    role: "Chairperson",
    description:
      "Leads the IEEE Student Branch and coordinates its overall activities and initiatives.",
  },
  {
    name: "Your Name",
    role: "Vice Chair",
    description:
      "Supports branch leadership and helps coordinate technical and student activities.",
  },
  {
    name: "Your Name",
    role: "Secretary",
    description:
      "Manages documentation, communication, meetings and official branch activities.",
  },
  {
    name: "Your Name",
    role: "Treasurer",
    description:
      "Handles financial records, budgeting and financial coordination for branch activities.",
  },
];

const technicalTeam = [
  {
    name: "Your Name",
    role: "Technical Head",
  },
  {
    name: "Your Name",
    role: "Web & Development Head",
  },
  {
    name: "Your Name",
    role: "Events Head",
  },
  {
    name: "Your Name",
    role: "Design & Media Head",
  },
  {
    name: "Your Name",
    role: "PR & Outreach Head",
  },
  {
    name: "Your Name",
    role: "Membership Head",
  },
];

function ProfilePlaceholder() {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#00629B] to-[#063A5B] text-white shadow-lg">
      <UserRound size={38} strokeWidth={1.5} />
    </div>
  );
}

function Team() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#00629B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center rounded-full bg-[#00629B]/10 px-4 py-2 text-sm font-semibold text-[#00629B]">
            OUR TEAM
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Meet the people behind
            <span className="text-[#00629B]"> IEEE SB.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            A team of passionate students working together to build
            a stronger technical community through innovation,
            collaboration and learning.
          </p>

        </div>


        {/* =========================
            LEADERSHIP
        ========================== */}
        <div className="mt-16">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <h3 className="text-sm font-bold tracking-[0.2em] text-slate-500">
              EXECUTIVE COMMITTEE
            </h3>

            <div className="h-px flex-1 bg-slate-200" />
          </div>


          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {leadership.map((member) => (
              <article
                key={member.role}
                className="group rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#00629B]/30 hover:shadow-xl"
              >

                {/* Profile */}
                <div className="flex justify-center">
                  <ProfilePlaceholder />
                </div>

                {/* Role */}
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-[#00629B]">
                  {member.role}
                </p>

                {/* Name */}
                <h4 className="mt-2 text-xl font-bold text-slate-900">
                  {member.name}
                </h4>

                {/* Description */}
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {member.description}
                </p>

                {/* Social */}
                <div className="mt-5 flex justify-center gap-2">

                  <button
                    type="button"
                    aria-label={`${member.name} LinkedIn`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#00629B] hover:bg-[#00629B] hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </button>

                  <button
                    type="button"
                    aria-label={`${member.name} email`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-[#00629B] hover:bg-[#00629B] hover:text-white"
                  >
                    <Mail size={16} />
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>


        {/* =========================
            TECHNICAL & OPERATIONS TEAM
        ========================== */}
        <div className="mt-20">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <h3 className="text-sm font-bold tracking-[0.2em] text-slate-500">
              TECHNICAL & OPERATIONS
            </h3>

            <div className="h-px flex-1 bg-slate-200" />
          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {technicalTeam.map((member) => (
              <article
                key={member.role}
                className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[#00629B]/30 hover:shadow-lg"
              >

                {/* Small Profile */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#00629B]/10 text-[#00629B] transition group-hover:bg-[#00629B] group-hover:text-white">
                  <UserRound size={26} />
                </div>

                <div className="min-w-0">

                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#00629B]">
                    {member.role}
                  </p>

                  <h4 className="mt-1 text-lg font-bold text-slate-900">
                    {member.name}
                  </h4>

                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-[#00629B]"
                  >
                    View profile
                    <ArrowRight size={14} />
                  </button>

                </div>

              </article>
            ))}

          </div>

        </div>


        {/* =========================
            JOIN TEAM CTA
        ========================== */}
        <div className="mt-20 overflow-hidden rounded-3xl bg-[#071A2B]">

          <div className="relative px-6 py-12 text-center sm:px-10 sm:py-16">

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#29A9E0]">
                BE PART OF THE COMMUNITY
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Want to contribute?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-400">
                Join our community, work with like-minded students,
                participate in technical activities and help create
                meaningful experiences for the next generation.
              </p>

              <a
                href="#join"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#00629B] px-6 py-3.5 font-semibold text-white transition hover:bg-[#0077B8]"
              >
                Join IEEE Student Branch
                <ArrowRight size={18} />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Team;