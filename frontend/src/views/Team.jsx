
"use client";

import { ExternalLink, Mail, UserRound } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useScrollReveal } from "../hooks/useScrollReveal";

function SectionHeading({ children }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00629B]/25 to-[#10243A]/15" />
      <h3 className="whitespace-nowrap text-center text-xs font-bold tracking-[0.2em] text-[#00629B]">
        {children}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#00629B]/25 to-[#10243A]/15" />
    </div>
  );
}

function PhotoProfileCard({
  name,
  role,
  image,
  linkedin,
  email,
  size = "office",
}) {
  const isSac = size === "sac";

  return (
    <article
      className={[
        "group relative isolate w-full overflow-hidden rounded-[24px]",
        "border border-white/80 bg-[#DCEAF2]",
        "shadow-[0_8px_24px_rgba(16,36,58,0.09)]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,98,155,0.18)]",
        isSac ? "aspect-[4/5]" : "aspect-[4/5]",
      ].join(" ")}
    >
      {image ? (
        <img
          src={image}
          alt={name || "Team member"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#B9DCEC] via-[#DCEEF6] to-[#8CBFD9]">
          <UserRound
            className="text-[#00629B]/60"
            size={isSac ? 48 : 68}
            strokeWidth={1.1}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#071B32] via-[#071B32]/15 to-transparent opacity-95" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h4
          className={[
            "break-words font-bold leading-tight text-white drop-shadow",
            isSac ? "text-sm sm:text-base" : "text-lg",
          ].join(" ")}
        >
          {name}
        </h4>

        {role && (
          <p className="mt-1.5 text-xs font-medium text-sky-100">
            {role}
          </p>
        )}

        {!isSac && (linkedin || email) && (
          <div className="mt-3 flex gap-2">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} LinkedIn`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-[#00629B]"
              >
                <ExternalLink size={14} />
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                aria-label={`${name} email`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition hover:bg-white hover:text-[#00629B]"
              >
                <Mail size={14} />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Team() {
  const {
    executiveCommittee = [],
    branchCounsellor,
    studentCommittees = [],
  } = useAdmin();
  const revealRef = useScrollReveal();

  return (
    <section
      id="team"
      ref={revealRef}
      className="relative min-h-screen overflow-hidden bg-transparent pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(2,132,199,0.14)_40%,transparent_70%)] blur-[75px]" />

      <div className="pointer-events-none absolute -right-40 bottom-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,rgba(249,115,22,0.1)_40%,transparent_70%)] blur-[75px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* Page heading */}
        <header className="reveal mx-auto max-w-none text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-4xl lg:whitespace-nowrap lg:text-[clamp(2.5rem,3.8vw,3.25rem)]">
            Meet the people behind
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              {" "}IEEE RNSIT SB.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[#526477] sm:text-lg">
            A dynamic council of student leaders, engineers, and visionaries
            dedicated to cultivating innovation, technical excellence and
            collaborative community growth.
          </p>
        </header>

        {/* Branch Counsellor */}
        {branchCounsellor && (
          <section className="reveal mt-16" style={{ "--reveal-delay": "80ms" }}>
            <SectionHeading>BRANCH COUNSELLOR</SectionHeading>

            <div className="flex justify-center">
              <div className="w-full max-w-[230px]">
                <PhotoProfileCard
                  name={branchCounsellor.name}
                  role="Branch Counsellor"
                  image={branchCounsellor.image}
                />
              </div>
            </div>
          </section>
        )}

        {/* Office Bearers */}
        <section className="reveal mt-20" style={{ "--reveal-delay": "100ms" }}>
          <SectionHeading>OFFICE BEARERS</SectionHeading>

          {executiveCommittee.length > 0 ? (
            <div
              className="
                -mx-6 flex flex-nowrap gap-4 overflow-x-auto
                px-6 pb-5
                snap-x snap-mandatory
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
                sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-6
                sm:overflow-visible sm:px-0 sm:pb-0
              "
            >
              {executiveCommittee.map((member) => (
                <div
                  key={member.id || member.role || member.name}
                  className="
                    w-[190px] shrink-0 snap-start
                    sm:w-[calc(50%-12px)]
                    md:w-[calc(33.333%-16px)]
                    xl:w-[calc(20%-20px)]
                    sm:shrink
                  "
                >
                  <PhotoProfileCard
                    name={member.name}
                    role={member.role}
                    image={member.image}
                    linkedin={member.linkedin}
                    email={member.email}
                    size="office"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-[#DCE5EC] bg-white/80 p-8 text-center text-sm text-slate-500">
              Office Bearers will be announced soon.
            </p>
          )}
        </section>

        {/* Student Activities Committee */}
        <section className="reveal mt-24" style={{ "--reveal-delay": "80ms" }}>
          <SectionHeading>
              STUDENT ACTIVITIES COMMITTEE (SAC)
            </SectionHeading>

            <div className="space-y-14">
              {studentCommittees.map((committee) => (
                <section
                  key={committee.id || committee.name}
                  className="border-b border-[#DCE5EC]/90 pb-12 last:border-b-0"
                >
                  {/* Committee heading */}
                  <div className="mb-7 text-center">
                    <h4 className="text-lg font-bold tracking-wide text-[#10243A] sm:text-xl">
                      {committee.name}
                    </h4>

                    <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-[#00629B]/70" />
                  </div>

                  {/* Committee members */}
                  {(committee.members || []).length > 0 ? (
                    <div
                      className="
                        -mx-6 flex flex-nowrap gap-4 overflow-x-auto
                        px-6 pb-5
                        snap-x snap-mandatory
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                        sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-5
                        sm:overflow-visible sm:px-0 sm:pb-0
                      "
                    >
                      {committee.members.map((member) => (
                        <div
                          key={member.id || member.name}
                          className="
                            w-[145px] shrink-0 snap-start
                            sm:w-[calc(33.333%-14px)]
                            md:w-[calc(25%-15px)]
                            lg:w-[calc(20%-16px)]
                            xl:w-[calc(16.666%-17px)]
                            sm:shrink
                          "
                        >
                          <PhotoProfileCard
                            name={member.name}
                            image={member.image}
                            size="sac"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-slate-400">
                      Members will be announced soon.
                    </p>
                  )}
        </section>
              ))}
            </div>
          </section>

      </div>
    </section>
  );
}
