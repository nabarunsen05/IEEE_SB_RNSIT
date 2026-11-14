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
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    borderHover: "group-hover:border-blue-400/50",
    accentHover: "from-blue-500 to-cyan-400",
    textHover: "group-hover:text-[#00629B]",
  },
  {
    value: "30+",
    label: "Events & Workshops",
    icon: CalendarDays,
    gradient: "from-indigo-600 to-violet-500",
    shadow: "shadow-indigo-500/20",
    borderHover: "group-hover:border-indigo-400/50",
    accentHover: "from-indigo-500 to-violet-400",
    textHover: "group-hover:text-indigo-600",
  },
  {
    value: "15+",
    label: "Hands-on Bootcamps",
    icon: Lightbulb,
    gradient: "from-[#F26522] to-amber-500",
    shadow: "shadow-orange-500/20",
    borderHover: "group-hover:border-amber-400/50",
    accentHover: "from-[#F26522] to-amber-400",
    textHover: "group-hover:text-[#F26522]",
  },
  {
    value: "10+",
    label: "Student Innovations",
    icon: Trophy,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    borderHover: "group-hover:border-emerald-400/50",
    accentHover: "from-emerald-500 to-teal-400",
    textHover: "group-hover:text-emerald-600",
  },
];

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-transparent pb-24 pt-28 sm:pb-28 sm:pt-32"
    >
      {/* Soft multi-color background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.38)_0%,rgba(2,132,199,0.24)_40%,transparent_70%)] blur-[75px] animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.32)_0%,rgba(249,115,22,0.2)_40%,transparent_70%)] blur-[75px] animate-pulse-glow"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* About content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: introduction */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/20 bg-gradient-to-r from-[#E6F4FB] via-white to-[#FFF4EC] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B] shadow-xs">
              <Sparkles size={14} className="text-[#29A9E0]" />
              <span>About IEEE Student Branch</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F26522]" />
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
              Building the next generation of{" "}
              <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
                technology leaders.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#526477]">
              Our IEEE Student Branch at RNSIT provides students with opportunities
              to learn, collaborate, research and engineer impactful solutions that
              address real-world technological challenges.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-[#647588]">
              Through industry-aligned technical workshops, flagship hackathons,
              research publications, and peer-to-peer mentoring, we foster an
              ecosystem where inquisitive minds turn ideas into tangible reality.
            </p>

            <a
              href="/events"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-6 py-3 font-semibold text-white shadow-md shadow-[#00629B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg hover:shadow-[#00629B]/30"
            >
              <span>Explore our activities</span>
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Right: mission panel */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-8 shadow-[0_16px_45px_rgba(16,36,58,0.08)] sm:p-10">
              {/* Top multi-color gradient line */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]"
              />

              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00629B]">
                  <Compass size={16} className="text-[#29A9E0]" />
                  <span>Our Mission</span>
                </div>

                <h3 className="mt-3 text-2xl font-bold text-[#10243A] sm:text-3xl">
                  Learn. Build. Lead.
                </h3>

                <p className="mt-4 leading-7 text-[#526477]">
                  We empower student engineers with forward-looking technical
                  skills, fostering an ethos of open collaboration, scientific
                  curiosity, and societal responsibility.
                </p>
              </div>

              {/* Mission sub-cards with delicate pastel color mixes */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/[0.08]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25">
                    <Lightbulb size={22} />
                  </div>

                  <h4 className="mt-4 font-semibold text-[#10243A]">
                    Innovation & Research
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#526477]">
                    Encourage members to prototype visionary ideas and publish
                    groundbreaking work.
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/[0.08]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/25">
                    <Users size={22} />
                  </div>

                  <h4 className="mt-4 font-semibold text-[#10243A]">
                    Vibrant Community
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-[#526477]">
                    Bridge students with alumni networks, senior researchers
                    and industry stalwarts worldwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics with varied color accents */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-6 text-center shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(16,36,58,0.1)] sm:p-7 ${stat.borderHover}`}
              >
                {/* Top hairline on hover */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stat.accentHover}`}
                />

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-all duration-300 group-hover:scale-110 ${stat.gradient} ${stat.shadow}`}
                >
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-[#10243A] sm:text-4xl">
                  {stat.value}
                </p>

                <p className={`mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#647588] transition-colors ${stat.textHover}`}>
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
