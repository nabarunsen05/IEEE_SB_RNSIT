import {
  ArrowRight,
  Users,
  CalendarDays,
  Lightbulb,
  Trophy,
  Sparkles,
  Compass,
} from "lucide-react";

const statistics = [
  {
    value: "250+",
    label: "Active Members",
    icon: Users,
  },
  {
    value: "30+",
    label: "Events & Workshops",
    icon: CalendarDays,
  },
  {
    value: "15+",
    label: "Hands-on Bootcamps",
    icon: Lightbulb,
  },
  {
    value: "10+",
    label: "Student Innovations",
    icon: Trophy,
  },
];

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing ambient orbs */}
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            ABOUT CONTENT
        ========================== */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
              <Sparkles size={14} />
              <span>About IEEE Student Branch</span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Building the next generation of
              <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent"> technology leaders.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Our IEEE Student Branch at RNSIT provides students with opportunities
              to learn, collaborate, research and engineer impactful solutions that
              address real-world technological challenges.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              Through industry-aligned technical workshops, flagship hackathons, research publications,
              and peer-to-peer mentoring, we foster an ecosystem where inquisitive minds turn ideas into tangible reality.
            </p>

            <a
              href="/events"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/20 px-6 py-3 font-semibold text-[#29A9E0] backdrop-blur-md transition-all duration-300 hover:border-[#29A9E0]/60 hover:bg-[#00629B] hover:text-white hover:shadow-[0_0_20px_rgba(41,169,224,0.3)]"
            >
              <span>Explore our activities</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Right — Frosted Glass Mission Panel */}
          <div className="relative">
            <div className="glass-panel relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0A2236]/90 to-[#071A2B]/90 p-8 shadow-2xl backdrop-blur-2xl sm:p-10">
              {/* Subtle glass glare line */}
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#29A9E0]/40 to-transparent" />

              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#29A9E0]">
                  <Compass size={16} />
                  <span>Our Mission</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                  Learn. Build. Lead.
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  We empower student engineers with forward-looking technical skills, fostering an ethos of open collaboration, scientific curiosity, and societal responsibility.
                </p>
              </div>

              {/* Mission Sub-Cards */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div className="glass-card rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#29A9E0]/40 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(41,169,224,0.15)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00629B]/25 text-[#29A9E0]">
                    <Lightbulb size={22} />
                  </div>

                  <h4 className="mt-4 font-semibold text-white">
                    Innovation & Research
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Encourage members to prototype visionary ideas and publish groundbreaking work.
                  </p>
                </div>

                <div className="glass-card rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-[#29A9E0]/40 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(41,169,224,0.15)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00629B]/25 text-[#29A9E0]">
                    <Users size={22} />
                  </div>

                  <h4 className="mt-4 font-semibold text-white">
                    Vibrant Community
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Bridge students with alumni networks, senior researchers and industry stalwarts worldwide.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>


        {/* =========================
            GLASS STATISTICS CARDS
        ========================== */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="glass-card-interactive group rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-center backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#29A9E0]/40 hover:shadow-[0_20px_40px_-15px_rgba(0,98,155,0.35),0_0_25px_rgba(41,169,224,0.18)] sm:p-7"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-all duration-300 group-hover:scale-110 group-hover:border-[#29A9E0]/50 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,169,224,0.4)]">
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-cyan-300">
                  {stat.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default About;
