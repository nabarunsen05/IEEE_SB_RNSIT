"use client";

import {
  ArrowRight,
  ExternalLink,
  Mail,
  UserRound,
  Sparkles,
  Users,
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

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

const branchCounsellor = {
  name: "Dr. Nirmalkumar Benni",
  role: "Branch Counsellor",
  image: "/assets/team/nirmalkumar-benni.png",
};

function ProfilePlaceholder() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#00629B]/20 bg-gradient-to-br from-[#00629B] via-[#0877AE] to-[#10243A] text-white shadow-lg transition-all duration-300 group-hover:border-[#29A9E0]/70 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(0,98,155,0.22)]">
      <UserRound size={36} strokeWidth={1.5} className="text-[#BFEAFF]" />
      <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-[#29A9E0]" />
    </div>
  );
}

function MemberAvatar({ image, name }) {
  if (image) {
    return (
      <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#00629B]/25 p-1 shadow-md transition-all duration-300 group-hover:border-[#00629B] group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(0,98,155,0.18)]">
        <img
          src={image}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-[#29A9E0]" />
      </div>
    );
  }
  return <ProfilePlaceholder />;
}

function Team() {
  const { executiveCommittee } = useAdmin();

  return (
    <section
      id="team"
      className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations with gentle multi-color touch */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.24)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
            <Sparkles size={14} className="text-[#29A9E0]" />
            <span>Executive Leadership</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
            Meet the people behind
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent"> IEEE SB.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#526477]">
            A dynamic council of student leaders, engineers, and visionaries dedicated to cultivating
            innovation, technical excellence and collaborative community growth.
          </p>

        </div>

        {/* =========================
            BRANCH COUNSELLOR
        ========================== */}
        <div className="mt-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00629B]/20 to-[#10243A]/15" />
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00629B]">
              BRANCH COUNSELLOR
            </h3>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#00629B]/20 to-[#10243A]/15" />
          </div>

          <article className="group relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-8 text-center shadow-[0_8px_24px_rgba(16,36,58,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/35 hover:shadow-[0_20px_40px_rgba(0,98,155,0.14)]">
            {/* Top delicate multi-color hairline */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#F26522] to-[#29A9E0]" />

            <div className="flex justify-center">
              <MemberAvatar image={branchCounsellor.image} name={branchCounsellor.name} />
            </div>
            <h4 className="mt-6 text-xl font-bold text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
              {branchCounsellor.name}
            </h4>
            <div className="mt-2">
              <span className="inline-block rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-amber-950 shadow-2xs">
                {branchCounsellor.role}
              </span>
            </div>
          </article>
        </div>


        {/* =========================
            EXECUTIVE COMMITTEE
        ========================== */}
        <div className="mt-16">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00629B]/20 to-[#10243A]/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00629B]">
              EXECUTIVE COMMITTEE ({executiveCommittee.length})
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#00629B]/20 to-[#10243A]/15" />
          </div>

          {executiveCommittee.length === 0 ? (
            <div className="rounded-3xl border border-[#DCE5EC] bg-white p-12 text-center shadow-sm">
              <Users className="mx-auto text-[#00629B]" size={48} />
              <h3 className="mt-4 text-xl font-bold text-[#10243A]">No Executive Committee Members Listed</h3>
              <p className="mt-2 text-sm text-[#526477]">
                The administrator will update the new executive committee shortly.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">

              {executiveCommittee.map((member) => (
                <article
                  key={member.id || member.role}
                  className="group relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-6 text-center shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/35 hover:shadow-[0_20px_40px_rgba(0,98,155,0.12)]"
                >
                  {/* Subtle top accent on hover */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] to-[#29A9E0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Profile */}
                  <div className="flex justify-center">
                    <MemberAvatar
                      image={
                        member.image ||
                        member.name === "Bhadrinath G R"
                          ? "/assets/team/bhadrinath-g-r.jpeg"
                          : member.name === "Suhan Ganesh"
                            ? "/assets/team/suhan-ganesh.jpeg"
                            : member.name === "Nikhil Nayak"
                              ? "/assets/team/nikhil-nayak.png"
                              : member.name === "Poorvika Nagraj"
                                ? "/assets/team/poorvika-nagraj.png"
                            : undefined
                      }
                      name={member.name}
                    />
                  </div>

                  {/* Name */}
                  <h4 className="mt-6 text-lg font-bold text-[#10243A] transition-colors duration-200 group-hover:text-[#00629B]">
                    {member.name}
                  </h4>

                  {/* Role pill */}
                  <div className="mt-1.5">
                    <span className="inline-block rounded-full border border-blue-200/70 bg-gradient-to-r from-[#E6F4FB] to-sky-50 px-2.5 py-0.5 text-xs font-semibold text-[#00629B]">
                      {member.role}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-[#526477] min-h-[72px]">
                    {member.description}
                  </p>

                  {/* Social Buttons */}
                  <div className="mt-5 flex justify-center gap-2 border-t border-[#DCE5EC] pt-4">

                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE5EC] bg-[#F4F7FA] text-[#526477] transition-all duration-200 hover:border-[#00629B] hover:bg-[#00629B] hover:text-white hover:scale-105"
                      >
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-label={`${member.name} LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE5EC] bg-[#F4F7FA] text-[#526477] transition-all duration-200 hover:border-[#00629B] hover:bg-[#00629B] hover:text-white hover:scale-105"
                      >
                        <ExternalLink size={14} />
                      </button>
                    )}

                    {member.email ? (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`${member.name} email`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE5EC] bg-[#F4F7FA] text-[#526477] transition-all duration-200 hover:border-[#00629B] hover:bg-[#00629B] hover:text-white hover:scale-105"
                      >
                        <Mail size={14} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        aria-label={`${member.name} email`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE5EC] bg-[#F4F7FA] text-[#526477] transition-all duration-200 hover:border-[#00629B] hover:bg-[#00629B] hover:text-white hover:scale-105"
                      >
                        <Mail size={14} />
                      </button>
                    )}

                  </div>

                </article>
              ))}

            </div>
          )}

        </div>


        {/* =========================
            OPERATIONS TEAM
        ========================== */}
        <div className="mt-20">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00629B]/20 to-[#10243A]/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00629B]">
              OPERATIONS & CHAPTER HEADS
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#00629B]/20 to-[#10243A]/15" />
          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {operationsTeam.map((member) => (
              <article
                key={member.role}
                className="group flex items-center gap-4 rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/30 hover:shadow-[0_12px_28px_rgba(16,36,58,0.09)]"
              >

                {/* Small Profile with soft color */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-200/50 bg-gradient-to-br from-blue-50 to-sky-100 text-[#00629B] transition-all duration-300 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(0,98,155,0.25)]">
                  <UserRound size={22} />
                </div>

                <div className="min-w-0">

                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#00629B]">
                    {member.role}
                  </p>

                  <h4 className="mt-0.5 truncate text-sm font-bold text-[#10243A] group-hover:text-[#00629B] transition-colors">
                    {member.name}
                  </h4>

                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#647588]">
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
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-[#DCE5EC] bg-gradient-to-br from-white via-[#F0F7FC] to-[#FFF8F3] p-8 text-center shadow-[0_16px_36px_rgba(16,36,58,0.08)] sm:p-14">

          {/* Top hairline with IEEE color combination */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]" />

          {/* Decorative floating rings */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-blue-200/50 animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-orange-200/40 animate-float-reverse" />

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-2xs backdrop-blur-md">
              <Sparkles size={14} className="text-[#29A9E0]" />
              <span>Be Part of the Community</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
            </div>

            <h3 className="mt-4 text-3xl font-bold text-[#10243A] sm:text-4xl">
              Ready to create an impact?
            </h3>

            <p className="mt-4 leading-7 text-[#526477]">
              Join the IEEE RNSIT family to collaborate on breakthrough engineering projects,
              participate in global student conferences, and expand your professional network.
            </p>

            <a
              href="/join"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-8 py-3.5 font-semibold text-white shadow-md shadow-[#00629B]/25 transition-all duration-300 hover:scale-105 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg active:scale-95"
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
