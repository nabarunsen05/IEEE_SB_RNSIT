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

function ProfilePlaceholder() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[#00629B]/15 bg-gradient-to-br from-[#00629B] via-[#0877AE] to-[#10243A] text-white shadow-lg transition-all duration-300 group-hover:border-[#29A9E0]/70 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(0,98,155,0.22)]">
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
      className="relative min-h-screen overflow-hidden bg-[#F4F7FA] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#00629B]/[0.07] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-96 w-96 rounded-full bg-[#29A9E0]/[0.06] blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
            <Sparkles size={14} />
            <span>Executive Leadership</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
            Meet the people behind
            <span className="text-[#00629B]"> IEEE SB.</span>
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#526477]">
            A dynamic council of student leaders, engineers, and visionaries dedicated to cultivating
            innovation, technical excellence and collaborative community growth.
          </p>

        </div>


        {/* =========================
            EXECUTIVE COMMITTEE
        ========================== */}
        <div className="mt-16">

          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#10243A]/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00629B]">
              EXECUTIVE COMMITTEE ({executiveCommittee.length})
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#10243A]/15" />
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
                  className="group rounded-3xl border border-[#DCE5EC] bg-white p-6 text-center shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/30 hover:shadow-[0_20px_40px_rgba(16,36,58,0.12)]"
                >

                  {/* Profile */}
                  <div className="flex justify-center">
                    <MemberAvatar image={member.image} name={member.name} />
                  </div>

                  {/* Name */}
                  <h4 className="mt-6 text-lg font-bold text-white transition-colors duration-200 group-hover:text-[#00629B]">
                    {member.name}
                  </h4>

                  {/* Role */}
                  <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#00629B]">
                    {member.role}
                  </p>

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
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#10243A]/15" />

            <h3 className="text-xs font-bold tracking-[0.2em] text-[#00629B]">
              OPERATIONS & CHAPTER HEADS
            </h3>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#10243A]/15" />
          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            {operationsTeam.map((member) => (
              <article
                key={member.role}
                className="group flex items-center gap-4 rounded-2xl border border-[#DCE5EC] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/30 hover:shadow-[0_12px_28px_rgba(16,36,58,0.09)]"
              >

                {/* Small Profile */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#00629B]/20 text-[#00629B] transition-all duration-300 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(41,169,224,0.3)]">
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
        <div className="relative mt-20 overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-8 text-center shadow-[0_12px_32px_rgba(16,36,58,0.07)] sm:p-14">

          {/* Decorative floating rings */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border border-[#00629B]/10 animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full border border-[#00629B]/10 animate-float-reverse" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00629B]/30 to-transparent" />

          <div className="relative z-10 mx-auto max-w-2xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#00629B] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Be Part of the Community</span>
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
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#00629B] px-8 py-3.5 font-semibold text-white shadow-md shadow-[#00629B]/20 transition-all duration-300 hover:scale-105 hover:bg-[#004F7D] hover:shadow-lg active:scale-95"
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
