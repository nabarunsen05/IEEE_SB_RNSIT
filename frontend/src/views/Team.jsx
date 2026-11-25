"use client";

import { ExternalLink, Mail, UserRound } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

function SectionHeading({ children }) {
  return (
    <div className="mb-9 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00629B]/25 to-[#10243A]/15" />
      <h3 className="text-center text-xs font-bold tracking-[0.2em] text-[#00629B]">
        {children}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#00629B]/25 to-[#10243A]/15" />
    </div>
  );
}

/**
 * Large photo-first profile card.
 * The image fills the card; name and role sit over a bottom gradient.
 */
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
        "group relative isolate overflow-hidden rounded-[26px] border border-white/70 bg-[#DCEAF2]",
        "shadow-[0_8px_24px_rgba(16,36,58,0.10)] transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(0,98,155,0.20)]",
        "aspect-[4/5] w-full",
      ].join(" ")}
    >
      {image ? (
        <img
          src={image}
          alt={name || "Team member"}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#B9DCEC] via-[#DCEEF6] to-[#8CBFD9]">
          <UserRound
            className="text-[#00629B]/65"
            size={isSac ? 58 : 72}
            strokeWidth={1.1}
          />
        </div>
      )}

      {/* Always-on lower gradient keeps text readable over bright photos. */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#071B32] via-[#071B32]/15 to-transparent opacity-95" />
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h4
          className={[
            "break-words font-bold leading-tight text-white drop-shadow",
            isSac ? "text-base sm:text-lg" : "text-lg sm:text-xl",
          ].join(" ")}
        >
          {name}
        </h4>
        {role && (
          <p
            className={[
              "mt-2 font-semibold text-sky-100",
              "text-xs sm:text-sm",
            ].join(" ")}
          >
            {role}
          </p>
        )}

        {(linkedin || email) && !isSac && (
          <div className="mt-3 flex gap-2">
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
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

  const counsellor = branchCounsellor;

  return (
    <section
      id="team"
      className="relative min-h-screen overflow-hidden bg-transparent pb-24 pt-28 sm:pt-32"
    >
      <div className="pointer-events-none absolute -left-40 top-40 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.25)_0%,rgba(2,132,199,0.14)_40%,transparent_70%)] blur-[75px]" />
      <div className="pointer-events-none absolute -right-40 bottom-40 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.18)_0%,rgba(249,115,22,0.1)_40%,transparent_70%)] blur-[75px]" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <header className="mx-auto max-w-none text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-4xl lg:whitespace-nowrap lg:text-[clamp(2.5rem,3.8vw,3.25rem)]">
            Meet the people behind
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              {" "}IEEE RNSIT SB.
            </span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#526477]">
            A dynamic council of student leaders, engineers, and visionaries
            dedicated to cultivating innovation, technical excellence and
            collaborative community growth.
          </p>
        </header>

        {/* Branch Counsellor */}
        <section className="mt-16">
          <SectionHeading>BRANCH COUNSELLOR</SectionHeading>
          {counsellor ? (
            <div className="flex justify-center">
              <div className="w-full max-w-[260px]">
                <PhotoProfileCard
                  name={counsellor.name}
                  role="Branch Counsellor"
                  image={counsellor.image}
                  size="office"
                />
              </div>
            </div>
          ) : null}
        </section>

        {/* Office Bearers */}
        <section className="mt-20">
          <SectionHeading>OFFICE BEARERS</SectionHeading>
          {executiveCommittee.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {executiveCommittee.map((member) => (
                <PhotoProfileCard
                  key={member.id || member.role || member.name}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  linkedin={member.linkedin}
                  email={member.email}
                  size="office"
                />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-[#DCE5EC] bg-white/80 p-8 text-center text-sm text-slate-500">
              Office Bearers will be announced soon.
            </p>
          )}
        </section>

        {/* SAC: each committee is a heading followed by photo-first member cards */}
        <section className="mt-20">
          <SectionHeading>STUDENT ACTIVITIES COMMITTEE (SAC)</SectionHeading>
          <div className="space-y-12">
            {studentCommittees.map((committee) => (
              <section
                key={committee.id || committee.name}
                className="border-b border-[#DCE5EC]/90 pb-10 last:border-b-0"
              >
                <h4 className="mb-6 text-xl font-bold tracking-wide text-[#10243A]">
                  {committee.name}
                </h4>

                {(committee.members || []).length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {committee.members.map((member) => (
                      <PhotoProfileCard
                        key={member.id || member.name}
                        name={member.name}
                        image={member.image}
                        size="sac"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">
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
