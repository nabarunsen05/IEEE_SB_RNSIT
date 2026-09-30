import {
  ArrowRight,
  Users,
  CalendarDays,
  Lightbulb,
  Trophy,
} from "lucide-react";

const statistics = [
  {
    value: "250+",
    label: "Members",
    icon: Users,
  },
  {
    value: "30+",
    label: "Events",
    icon: CalendarDays,
  },
  {
    value: "15+",
    label: "Workshops",
    icon: Lightbulb,
  },
  {
    value: "10+",
    label: "Projects",
    icon: Trophy,
  },
];

function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#00629B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            ABOUT CONTENT
        ========================== */}
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-[#00629B]/10 px-4 py-2 text-sm font-semibold text-[#00629B]">
              ABOUT IEEE STUDENT BRANCH
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Building the next generation of
              <span className="text-[#00629B]"> technology leaders.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Our IEEE Student Branch provides students with opportunities
              to learn, collaborate, research and build solutions that
              address real-world challenges.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-slate-500">
              Through technical workshops, competitions, research activities,
              industry interactions and student-led initiatives, we create
              an environment where students can turn ideas into impact.
            </p>

            <a
              href="#events"
              className="group mt-8 inline-flex items-center gap-2 font-semibold text-[#00629B] transition hover:text-[#0077B8]"
            >
              Explore our activities

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-3xl bg-[#071A2B] p-8 shadow-2xl shadow-slate-900/10 sm:p-10">

              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#29A9E0]">
                  Our Mission
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Learn. Build. Lead.
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  We aim to connect students with technology, innovation,
                  research and professional opportunities while building
                  a strong student community.
                </p>
              </div>

              {/* Mission points */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Lightbulb className="text-[#29A9E0]" size={24} />

                  <h4 className="mt-4 font-semibold text-white">
                    Innovation
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Encourage students to explore ideas and create
                    meaningful solutions.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Users className="text-[#29A9E0]" size={24} />

                  <h4 className="mt-4 font-semibold text-white">
                    Community
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Build connections between students, mentors and
                    industry professionals.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>


        {/* =========================
            STATISTICS
        ========================== */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">

          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#00629B]/30 hover:shadow-lg"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#00629B]/10 text-[#00629B] transition group-hover:bg-[#00629B] group-hover:text-white">
                  <Icon size={23} />
                </div>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-medium text-slate-500">
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