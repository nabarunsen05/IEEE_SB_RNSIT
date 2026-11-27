"use client";

import { motion } from "framer-motion";
import {
  Globe,
  BookOpen,
  ExternalLink,
  Mail,
  Award,
  Layers,
  Zap,
} from "lucide-react";
import Pop, { PopGroup, PopItem } from "../components/Pop";

const IEEE_BENEFITS = [
  {
    icon: BookOpen,
    title: "IEEE Xplore Digital Library & Research",
    description:
      "Access over 5 million peer-reviewed technical documents, IEEE standards, transactions, and conference proceedings with substantial member discounts.",
    color: "from-blue-600 to-cyan-500",
    badge: "5M+ Documents",
  },
  {
    icon: Globe,
    title: "Global Professional Network",
    description:
      "Connect with 420,000+ technology leaders, researchers, and peers across 160+ countries, collaborate on IEEE Collabratec, and participate in IEEE Bangalore Section programs.",
    color: "from-sky-600 to-indigo-600",
    badge: "160+ Countries",
  },
  {
    icon: Mail,
    title: "Exclusive @ieee.org Email Alias",
    description:
      "Receive an official Google Workspace @ieee.org email alias, adding recognized professional credibility to your resumes, academic profiles, and published papers.",
    color: "from-emerald-600 to-teal-500",
    badge: "Google Workspace",
  },
  {
    icon: Award,
    title: "Competitions, Hackathons & Scholarships",
    description:
      "Compete exclusively in IEEEXtreme — the world-renowned 24-hour virtual competitive programming challenge — with eligibility for IEEE Foundation travel grants and student awards.",
    color: "from-[#F26522] to-amber-500",
    badge: "Global Competitions",
  },
  {
    icon: Layers,
    title: "39+ Specialized Technical Societies",
    description:
      "Join specialized societies like IEEE Computer Society, Robotics and Automation (RAS), Communications Society (ComSoc), and Women in Engineering (WIE) at subsidized student rates.",
    color: "from-cyan-600 to-blue-600",
    badge: "Specialized Chapters",
  },
  {
    icon: Zap,
    title: "Conferences & Educational Discounts",
    description:
      "Enjoy up to 80% discounts on registrations for IEEE international conferences, technical workshops, and IEEE Blended Learning certification programs.",
    color: "from-indigo-600 to-violet-600",
    badge: "Up to 80% Off",
  },
];

function Join() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-transparent px-6 pt-28 pb-20 sm:px-8 sm:pt-32 lg:px-12">
      {/* Background glowing decorations with delicate color combinations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.24)_40%,transparent_70%)] blur-[75px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* =========================
            HEADER
        ========================== */}
        <div className="mx-auto max-w-3xl text-center">
          <Pop delay={0}>
          <h1 className="text-4xl font-bold tracking-tight text-[#10243A] sm:text-5xl lg:text-6xl">
            Join the IEEE{" "}
            <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
              Global Community
            </span>
          </h1>
          </Pop>

          <Pop delay={0.1}>
          <p className="mt-5 text-lg leading-8 text-[#526477]">
            Step into the world&apos;s largest technical professional organization. Gain access to
            IEEE Xplore, distinguished lecture series, flagship student hackathons, international
            scholarships, and career networks.
          </p>
          </Pop>
        </div>

        {/* =========================
            OFFICIAL PORTALS ACTION CARD
        ========================== */}
        <Pop delay={0.15} className="mt-12 overflow-hidden rounded-3xl border border-[#00629B]/25 bg-gradient-to-br from-[#10243A] via-[#0B3A60] to-[#00629B] p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <span>Official Global IEEE Registration</span>
              </span>
              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Ready to Become an IEEE Member?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-blue-100 sm:text-base">
                Register directly on the official IEEE global portal to receive your unique{" "}
                <strong>IEEE Member Number</strong>, get your <strong>@ieee.org</strong> email
                address, and access worldwide member privileges.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <a
                href="https://www.ieee.org/membership/join/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#F26522] via-[#FF7A38] to-[#F26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition hover:brightness-110"
              >
                <span>Join IEEE (ieee.org)</span>
                <ExternalLink size={16} />
              </a>

              <a
                href="https://ieeebangalore.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-animate inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <span>IEEE Bangalore Section</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </Pop>

        {/* =========================
            BENEFITS GRID
        ========================== */}
        <div className="mt-16">
          <Pop className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00629B]">
              Member Privileges
            </span>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#10243A] sm:text-3xl">
              Benefits of IEEE Membership
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-[#526477]">
              From research papers to worldwide competitions and industry recognition, explore what
              IEEE membership offers you.
            </p>
          </Pop>

          <PopGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {IEEE_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <PopItem key={benefit.title}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 18px 36px rgba(0,98,155,0.11)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-[border-color] duration-300 hover:border-[#00629B]/40"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.color} text-white shadow-md transition-transform duration-300 group-hover:scale-[1.02]`}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        {benefit.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-[#10243A] transition-colors group-hover:text-[#00629B]">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#526477]">
                      {benefit.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-[#00629B]">
                      Official IEEE Benefit
                    </span>
                  </div>
                </motion.div>
                </PopItem>
              );
            })}
          </PopGroup>
        </div>

        {/* =========================
            QUESTIONS / CONTACT FOOTER
        ========================== */}
        <Pop className="mt-16 text-center">
          <p className="text-sm text-[#526477]">
            Have questions about joining or getting involved with IEEE SB RNSIT?{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeestudentbranchrnsit@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#00629B] hover:underline"
            >
              Email us at ieeestudentbranchrnsit@gmail.com
            </a>
          </p>
        </Pop>
      </div>
    </section>
  );
}

export default Join;
