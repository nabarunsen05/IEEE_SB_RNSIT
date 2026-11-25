import Link from "next/link";
import {
  ArrowRight,
  Users,
  Trophy,
  GraduationCap,
  CalendarDays,
  Award,
  BookOpen,
  Network,
  Rocket,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";

const statistics = [
  {
    value: "1000+",
    label: "Active SB Members",
    subtext: "One of the largest in IEEE Bangalore Section",
    icon: Users,
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-500/20",
    borderHover: "group-hover:border-blue-400/50",
    accentHover: "from-blue-500 to-cyan-400",
    textHover: "group-hover:text-[#00629B]",
  },
  {
    value: "16+",
    label: "Years of Journey",
    subtext: "Established in 2010 with lasting legacy",
    icon: Clock,
    gradient: "from-indigo-600 to-violet-500",
    shadow: "shadow-indigo-500/20",
    borderHover: "group-hover:border-indigo-400/50",
    accentHover: "from-indigo-500 to-violet-400",
    textHover: "group-hover:text-indigo-600",
  },
  {
    value: "17+",
    label: "Active Societies & Chapters",
    subtext: "Diverse technical focus across disciplines",
    icon: Layers,
    gradient: "from-[#F26522] to-amber-500",
    shadow: "shadow-orange-500/20",
    borderHover: "group-hover:border-amber-400/50",
    accentHover: "from-[#F26522] to-amber-400",
    textHover: "group-hover:text-[#F26522]",
  },
  {
    value: "30+",
    label: "Events & Workshops",
    subtext: "Flagship symposiums, hackathons & talks",
    icon: CalendarDays,
    gradient: "from-emerald-600 to-teal-500",
    shadow: "shadow-emerald-500/20",
    borderHover: "group-hover:border-emerald-400/50",
    accentHover: "from-emerald-500 to-teal-400",
    textHover: "group-hover:text-emerald-600",
  },
];

const journeySteps = [
  {
    number: "01",
    title: "Learn",
    description:
      "Master emerging technologies through hands-on workshops, technical webinars, IEEE Xplore digital library access, symposiums, and mentor guidance.",
    icon: BookOpen,
    accent: "text-blue-600 bg-blue-50 border-blue-200",
    pill: "Knowledge & Skills",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Build lifelong professional bonds with faculty mentors, researchers, global industry leaders, and enthusiastic peer innovators across Karnataka and beyond.",
    icon: Network,
    accent: "text-cyan-600 bg-cyan-50 border-cyan-200",
    pill: "Global Community",
  },
  {
    number: "03",
    title: "Lead",
    description:
      "Take initiative through volunteering, organizing flagship technical events, hosting webinars, managing teams, and holding executive leadership positions.",
    icon: Rocket,
    accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    pill: "Initiative & Teamwork",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Transform early opportunities into impactful milestones through research publications, global conferences, international scholarships, and elite competitions.",
    icon: TrendingUp,
    accent: "text-amber-600 bg-amber-50 border-amber-200",
    pill: "Impact & Career",
  },
];

const hierarchyLevels = [
  {
    level: "Student Branch",
    tag: "Where your journey begins",
    highlight: "RNSIT Campus Hub",
    description:
      "Learn emerging technologies, collaborate closely with classmates, organize campus tech fests, and build foundational engineering skills.",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    level: "IEEE Bangalore Section",
    tag: "Statewide ecosystem",
    highlight: "Karnataka & Beyond",
    description:
      "Connect with student branches across Karnataka, engage directly with senior industry veterans, participate in section congresses, and gain regional recognition.",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  {
    level: "IEEE India Council",
    tag: "National collaboration",
    highlight: "All India Network",
    description:
      "Collaborate on nationwide initiatives, share best practices, develop leadership, and represent Karnataka on the national engineering stage.",
    badgeColor: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    level: "IEEE Region 10",
    tag: "Asia & Pacific Region",
    highlight: "International Reach",
    description:
      "Engage and empower member communities across the Asia-Pacific region, facilitate cross-border collaborative research, and attend flagship R10 conferences.",
    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    level: "IEEE Global",
    tag: "Advancing technology for humanity",
    highlight: "Worldwide Scale",
    description:
      "A global community of 450,000+ innovators across 190+ countries advancing world-class standards, technical journals, and technological breakthroughs.",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-300",
  },
];

const scholarships = [
  {
    title: "Charles LeGeyt Fortescue Fellowship",
    award: "US $24,000",
    eligibility: "Graduate study in Electrical Engineering at a recognized U.S. university.",
    note: "One of IEEE's most prestigious fellowships worldwide.",
  },
  {
    title: "IEEE Computer Society Richard E. Merwin Scholarship",
    award: "Up to US $2,000",
    eligibility: "Active leaders in IEEE Computer Society Student Branch Chapters.",
    note: "Recognizes student leaders with exceptional scholastic and chapter contributions.",
  },
  {
    title: "IEEE Standards Education Grants",
    award: "US $500 (Student) + $300 (Advisor)",
    eligibility: "Undergraduate design projects incorporating IEEE or industry standards.",
    note: "E.g., IEEE 802.11 (Wi-Fi), IEEE 11073 (Health Informatics), National Electric Safety Code.",
  },
  {
    title: "Computational Intelligence Society (CIS) Grants",
    award: "US $1,000 – $4,000",
    eligibility: "Student conference travel grants & summer research stipends.",
    note: "Empowers student authors presenting papers at premier IEEE CIS conferences.",
  },
  {
    title: "Photonics Society Graduate Fellowship",
    award: "US $5,000 (10 Fellowships annually)",
    eligibility: "Graduate students conducting breakthrough research in photonics & optics.",
    note: "Awarded across IEEE geographic regions worldwide.",
  },
  {
    title: "Life Members' Electrical History & Engineering Fellowships",
    award: "US $10,000 to $20,000",
    eligibility: "Post-graduate research and first-year master's students globally.",
    note: "Includes research stipends and academic tuition assistance.",
  },
];

const competitions = [
  {
    title: "IEEEXtreme 24-Hour Programming",
    type: "Global Virtual Hackathon",
    desc: "A legendary 24-hour worldwide competitive programming marathon where thousands of student teams compete concurrently against global peers.",
  },
  {
    title: "IEEE Computer Society Student Competition",
    type: "Real-World Solutions",
    desc: "Teams architect and implement innovative technology solutions addressing societal and humanitarian problems.",
  },
  {
    title: "Humanitarian Technology Challenge",
    type: "Community Impact",
    desc: "Focused on deploying low-cost, scalable engineering interventions to solve urgent community development challenges.",
  },
  {
    title: "International Future Energy Challenge (IFEC)",
    type: "Power & Clean Energy",
    desc: "International student competition focusing on high-efficiency, clean energy hardware and power electronics innovations.",
  },
  {
    title: "IEEE Student Branch Website & Contest",
    type: "Digital Leadership",
    desc: "Annual contest recognizing outstanding Student Branch web architecture, technical dissemination, and digital outreach.",
  },
];

function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden bg-transparent pb-24 pt-28 sm:pb-28 sm:pt-32"
    >
      {/* Background radial accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.32)_0%,rgba(2,132,199,0.18)_40%,transparent_70%)] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[40%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.25)_0%,rgba(249,115,22,0.14)_40%,transparent_70%)] blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 bottom-20 h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.18)_0%,rgba(147,51,234,0.1)_40%,transparent_70%)] blur-[80px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* SECTION 1: HERO / MAIN INTRODUCTION */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left Column */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#10243A] sm:text-5xl lg:text-5xl">
              More than just a membership:{" "}
              <span className="bg-gradient-to-r from-[#00629B] via-[#0284C7] to-[#29A9E0] bg-clip-text text-transparent">
                your gateway to endless possibilities.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#526477]">
              The <strong className="text-[#10243A] font-semibold">IEEE Student Branch at RNSIT</strong> was
              established in <strong>2010</strong>. Over a remarkable <strong>16-year journey</strong>, it has
              grown into one of the largest and most vibrant Student Branches in the{" "}
              <strong className="text-[#10243A]">IEEE Bangalore Section</strong>, with over{" "}
              <strong className="text-[#00629B]">1000+ active student members</strong>.
            </p>

            <p className="mt-4 max-w-xl leading-7 text-[#647588]">
              IEEE exists for one universal purpose:{" "}
              <em className="text-[#10243A] font-medium not-italic">
                &ldquo;Advancing Technology for the benefit of humanity.&rdquo;
              </em>{" "}
              At RNSIT, this mission is backed by steadfast institutional support, dedicated faculty
              advisors, a unique <strong>membership reimbursement initiative</strong>, and a thriving
              student volunteer community across <strong>17+ technical societies</strong>.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/societies"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-6 py-3 font-semibold text-white shadow-md shadow-[#00629B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-[#004F7D] hover:to-[#0074B5] hover:shadow-lg hover:shadow-[#00629B]/30"
              >
                <span>Explore 17+ Societies</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-[#10243A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50"
              >
                <span>Browse Events</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Mission Card */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-8 shadow-[0_16px_45px_rgba(16,36,58,0.08)] sm:p-10">
              {/* Multi-color top gradient border */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-[#F26522]"
              />

              <div className="mb-6">
                <h3 className="mt-3 text-2xl font-bold text-[#10243A] sm:text-3xl">
                  Advancing Technology for Humanity
                </h3>

                <p className="mt-3 leading-7 text-[#526477]">
                  IEEE is the world&apos;s largest technical professional organization with over{" "}
                  <strong className="text-[#10243A]">450,000+ members</strong> across more than{" "}
                  <strong className="text-[#10243A]">190+ countries</strong>. At RNSIT, our branch provides
                  unparalleled institutional backing to ensure every student excels.
                </p>
              </div>

              {/* Sub-cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-sky-50/40 to-blue-50/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/[0.08]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/25">
                    <ShieldCheck size={22} />
                  </div>
                  <h4 className="mt-4 font-semibold text-[#10243A]">
                    Reimbursement Initiative
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#526477]">
                    Institutional support providing student membership reimbursement to promote technical excellence.
                  </p>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-500/[0.08]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/25">
                    <Users size={22} />
                  </div>
                  <h4 className="mt-4 font-semibold text-[#10243A]">
                    Faculty & Peer Mentorship
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#526477]">
                    Dedicated faculty advisors and experienced student volunteers mentoring next-generation innovators.
                  </p>
                </div>
              </div>

              {/* Student membership inclusions */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-[#CFE3F2] bg-gradient-to-br from-[#F4FAFE] via-white to-[#FFF8F3] p-5 sm:p-6">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#00629B]">
                    Your student membership
                  </p>
                  <h4 className="mt-1 text-lg font-bold leading-snug text-[#10243A]">
                    A world of technical communities and opportunities
                  </h4>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="flex min-w-0 min-h-[124px] flex-col items-center justify-center gap-3 rounded-xl border border-blue-100 bg-white/95 p-4 text-center shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#00629B]">
                      <Layers size={21} />
                    </div>
                    <div className="w-full min-w-0">
                      <p className="text-2xl font-extrabold leading-none text-[#10243A]">152</p>
                      <p className="mt-2 break-words text-sm font-medium leading-snug text-[#526477]">Technical Communities</p>
                    </div>
                  </div>

                  <div className="flex min-w-0 min-h-[124px] flex-col items-center justify-center gap-3 rounded-xl border border-cyan-100 bg-white/95 p-4 text-center shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                      <Network size={21} />
                    </div>
                    <div className="w-full min-w-0">
                      <p className="text-2xl font-extrabold leading-none text-[#10243A]">7</p>
                      <p className="mt-2 break-words text-sm font-medium leading-snug text-[#526477]">IEEE Councils</p>
                    </div>
                  </div>

                  <div className="flex min-w-0 min-h-[124px] flex-col items-center justify-center gap-3 rounded-xl border border-orange-100 bg-white/95 p-4 text-center shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#D85A1A]">
                      <Users size={21} />
                    </div>
                    <div className="w-full min-w-0">
                      <p className="break-words text-base font-extrabold leading-tight text-[#10243A]">WIE & SIGHT</p>
                      <p className="mt-2 break-words text-sm font-medium leading-snug text-[#526477]">Affinity groups & initiatives</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: STATISTICS BANNER */}
        <div className="mt-16 grid grid-cols-2 gap-4 lg:mt-20 lg:grid-cols-4">
          {statistics.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`group relative overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-6 text-center shadow-[0_8px_24px_rgba(16,36,58,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_36px_rgba(16,36,58,0.1)] sm:p-7 ${stat.borderHover}`}
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${stat.accentHover}`}
                />

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm transition-all duration-300 group-hover:scale-110 ${stat.gradient} ${stat.shadow}`}
                >
                  <Icon size={24} />
                </div>

                <p className="mt-5 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
                  {stat.value}
                </p>

                <p
                  className={`mt-1.5 text-xs font-bold uppercase tracking-wider text-[#10243A] transition-colors ${stat.textHover}`}
                >
                  {stat.label}
                </p>

                <p className="mt-2 text-xs leading-5 text-[#647588]">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* SECTION 3: THE IEEE JOURNEY CYCLE */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
              <span>Continuous Growth Framework</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
              The IEEE Journey Cycle
            </h2>

            <p className="mt-4 text-lg italic text-[#526477]">
              &ldquo;A continuous journey of learning, connecting, leading, and growing together.&rdquo;
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#00629B]/40 hover:shadow-xl hover:shadow-[#00629B]/10"
                >
                  <div className="absolute right-6 top-6 text-3xl font-black text-slate-200 transition-colors group-hover:text-blue-100">
                    {step.number}
                  </div>

                  <div>
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${step.accent} shadow-sm`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="mt-5 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
                      {step.pill}
                    </div>

                    <h3 className="mt-2 text-2xl font-bold text-[#10243A]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#526477]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* SECTION 4: HIERARCHY / SCOPE (From Campus to the World) */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
              <span>Institutional Scope</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
              From Campus to the World
            </h2>

            <p className="mt-4 text-base leading-7 text-[#526477]">
              Your journey starts in your classroom at RNSIT and can take you directly to the global stage.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {hierarchyLevels.map((item, idx) => (
              <div
                key={item.level}
                className="group relative overflow-hidden rounded-2xl border border-[#DCE5EC] bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#00629B]/40 hover:shadow-md sm:p-7"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-[#00629B]">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-xl font-bold text-[#10243A]">
                          {item.level}
                        </h3>
                        <span
                          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${item.badgeColor}`}
                        >
                          {item.highlight}
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        {item.tag}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#526477]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inclusive Philosophy Box from Slide 6 */}
          <div className="mt-8 rounded-3xl border border-blue-200 bg-gradient-to-br from-white via-sky-50/50 to-blue-50/30 p-8 shadow-sm">
            <h4 className="text-xl font-bold text-[#10243A]">
              There is always a place for you in IEEE.
            </h4>
            <p className="mt-2 leading-7 text-[#526477]">
              Whether you are a programmer, a designer, a photographer, a content writer, a public speaker,
              a researcher, or simply someone passionate to learn—IEEE welcomes your unique voice. Our student
              branch offers roles tailored to every passion.
            </p>
          </div>
        </div>

        {/* SECTION 5: SCHOLARSHIPS, GRANTS & COMPETITIONS */}
        <div className="mt-24 sm:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
              <span>Global Opportunities</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#10243A] sm:text-4xl">
              Scholarships, Grants & Competitions
            </h2>

            <p className="mt-4 text-base leading-7 text-[#526477]">
              IEEE members gain privileged access to global funding, research stipends, travel grants, and
              world-renowned collegiate competitions.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Scholarships & Grants */}
            <div className="rounded-3xl border border-[#DCE5EC] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm shadow-blue-500/20">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#10243A]">
                    Fellowships & Scholarships
                  </h3>
                  <p className="text-xs text-[#647588]">
                    Funding technical education & research
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {scholarships.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-white"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-[#10243A]">
                        {s.title}
                      </h4>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                        {s.award}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs font-medium text-blue-600">
                      {s.eligibility}
                    </p>
                    <p className="mt-1 text-xs text-[#647588]">{s.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitions */}
            <div className="rounded-3xl border border-[#DCE5EC] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#F26522] to-amber-500 text-white shadow-sm shadow-orange-500/20">
                  <Trophy size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#10243A]">
                    Flagship Competitions
                  </h3>
                  <p className="text-xs text-[#647588]">
                    Showcase engineering acumen internationally
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {competitions.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 transition-all duration-200 hover:border-orange-200 hover:bg-white"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-semibold text-[#10243A]">
                        {c.title}
                      </h4>
                      <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
                        {c.type}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#526477]">
                      {c.desc}
                    </p>
                  </div>
                ))}

                {/* Additional Grants Note */}
                <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-[#526477]">
                  <strong className="text-[#10243A]">IEEE Foundation Grants:</strong> Includes Spoken
                  Language Processing Grants, Grainger PES Fund, Valentin Jordanov Radiation Instrumentation,
                  Raj Mittra Travel Grants, and Magnetics Society travel awards.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: IEEE WOMEN IN ENGINEERING (WIE) SPOTLIGHT */}
        <div className="mt-24 sm:mt-32">
          <div className="relative overflow-hidden rounded-3xl border border-purple-200 bg-gradient-to-br from-white via-purple-50/30 to-fuchsia-50/20 p-8 shadow-md sm:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-300/20 blur-3xl"
            />

            <div className="relative grid gap-8 lg:grid-cols-3 lg:items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-purple-300 bg-purple-100/80 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-800">
                  <span>Special Initiative</span>
                </div>

                <h3 className="mt-4 text-3xl font-extrabold text-[#10243A] sm:text-4xl">
                  IEEE Women in Engineering (WIE)
                </h3>

                <p className="mt-4 text-base leading-7 text-[#526477]">
                  IEEE WIE is one of the world&apos;s largest international communities dedicated to
                  promoting women in engineering, technology, and STEM. It empowers members through dedicated
                  scholarships, global mentorship, conference grants, and transformative leadership pathways.
                </p>

                <blockquote className="mt-4 border-l-4 border-purple-500 pl-4 text-sm font-semibold italic text-purple-900">
                  &ldquo;Learn. Lead. Inspire. | IEEE WIE empowers women to engineer a better tomorrow.&rdquo;
                </blockquote>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-purple-900">
                      <Award size={18} className="text-purple-600" />
                      <span>Quest Global CSR Scholarship</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#526477]">
                      Provides <strong className="text-purple-700 font-bold">₹50,000 financial assistance</strong>,
                      mentorship, IEEE learning resources, and placement support for eligible female engineering students.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-purple-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center gap-2 font-bold text-purple-900">
                      <GraduationCap size={18} className="text-purple-600" />
                      <span>Frances B. Hugle Scholarship</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-[#526477]">
                      International scholarships for female engineering students demonstrating outstanding academic
                      and leadership excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column perks list */}
              <div className="rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">
                <h4 className="font-bold text-[#10243A]">More Ways WIE Empowers You</h4>
                <ul className="mt-4 space-y-3 text-xs text-[#526477]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" />
                    <span><strong>Free WIE Membership</strong> during eligible student campaigns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" />
                    <span><strong>Global Mentoring</strong> with experienced global IEEE leaders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" />
                    <span><strong>WIE Family Cares Grant</strong> for conference travel assistance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-purple-600" />
                    <span><strong>International Exposure</strong> at WIE Leadership Summits worldwide</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 7: CLOSING PHILOSOPHY & INVITATION */}
        <div className="mt-24 sm:mt-32 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#DCE5EC] bg-white p-8 shadow-lg sm:p-12">
            <h3 className="text-2xl font-extrabold tracking-tight text-[#10243A] sm:text-3xl">
              &ldquo;The more you put into IEEE, the more you&apos;ll get out of it.&rdquo;
            </h3>

            <p className="mt-4 text-lg font-medium text-[#00629B]">
              Because sometimes... one &ldquo;yes&rdquo; is all it takes to completely change your journey.
            </p>

            <p className="mt-4 text-sm text-[#526477]">
              Join over 1000+ peers at RNSIT and step onto the global stage. Benefit from technical societies,
              travel grants, prestigious fellowships, and lifelong friendships.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ieeestudentbranchrnsit@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00629B] via-[#0074B5] to-[#0086CE] px-7 py-3.5 font-semibold text-white shadow-md shadow-[#00629B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span>Contact Student Branch</span>
                <ExternalLink size={16} />
              </a>

              <Link
                href="/societies"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 font-semibold text-[#10243A] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <span>View All Societies</span>
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
