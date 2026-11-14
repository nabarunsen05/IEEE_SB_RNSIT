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
  { value: "250+", label: "Active Members", icon: Users },
  { value: "30+", label: "Events & Workshops", icon: CalendarDays },
  { value: "15+", label: "Hands-on Bootcamps", icon: Lightbulb },
  { value: "10+", label: "Student Innovations", icon: Trophy },
];

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#F4F7FA] pb-24 pt-28 sm:pb-28 sm:pt-32"
    >
      {/* Soft IEEE-blue background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[#00629B]/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-20 h-96 w-96 rounded-full bg-[#29A9E0]/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* About content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: introduction */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
              <Sparkles size={14} />
              <span>About IEEE Student Branch</span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
              Building the next generation of{" "}
              <span className="text-[#00629B]">technology leaders.</span>
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
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-[#00629B] px-6 py-3 font-semibold text-white shadow-md shadow-[#00629B]/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#004F7D] hover:shadow-lg"
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
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-transparent via-[#00629B]/35 to-transparent"
              />

              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#00629B]">
                  <Compass size={16} />
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

              {/* Mission sub-cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#DCE5EC] bg-[#F4F7FA] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/25 hover:shadow-lg hover:shadow-[#10243A]/[0.06]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F4FB] text-[#00629B]">
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

                <div className="rounded-2xl border border-[#DCE5EC] bg-[#F4F7FA] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00629B]/25 hover:shadow-lg hover:shadow-[#10243A]/[0.06]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E6F4FB] text-[#00629B]">
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

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-3xl border border-[#DCE5EC] bg-white p-6 text-center shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00629B]/25 hover:shadow-[0_16px_32px_rgba(16,36,58,0.09)] sm:p-7"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6F4FB] text-[#00629B] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00629B] group-hover:text-white">
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-[#10243A] sm:text-4xl">
                  {stat.value}
                </p>

                <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-[#647588] transition-colors group-hover:text-[#00629B]">
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
