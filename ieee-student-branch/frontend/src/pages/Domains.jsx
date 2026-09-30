import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

const domains = [
  {
    title: "Artificial Intelligence",
    shortTitle: "AI / ML",
    description:
      "Explore machine learning, deep learning, generative AI and intelligent systems.",
    icon: BrainCircuit,
    number: "01",
  },
  {
    title: "Web & App Development",
    shortTitle: "Development",
    description:
      "Build modern web and mobile applications using current development technologies.",
    icon: Code2,
    number: "02",
  },
  {
    title: "Robotics & IoT",
    shortTitle: "Robotics",
    description:
      "Design connected systems, automation solutions, embedded applications and robots.",
    icon: Cpu,
    number: "03",
  },
  {
    title: "Cybersecurity",
    shortTitle: "Security",
    description:
      "Learn about secure systems, networks, ethical security practices and digital safety.",
    icon: ShieldCheck,
    number: "04",
  },
  {
    title: "Cloud Computing",
    shortTitle: "Cloud",
    description:
      "Explore cloud platforms, distributed systems, DevOps and scalable applications.",
    icon: Cloud,
    number: "05",
  },
  {
    title: "Research & Innovation",
    shortTitle: "Research",
    description:
      "Turn ideas into research, prototypes and practical solutions for real-world problems.",
    icon: FlaskConical,
    number: "06",
  },
];

function Domains() {
  return (
    <section
      id="domains"
      className="relative overflow-hidden bg-[#071A2B] py-24 sm:py-28"
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full border border-white/5" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full border border-white/5" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            HEADER
        ========================== */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">

          <div>

            <div className="mb-5 inline-flex items-center rounded-full bg-[#00629B]/20 px-4 py-2 text-sm font-semibold text-[#29A9E0]">
              TECHNICAL DOMAINS
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Explore technology.
              <br />
              <span className="text-[#29A9E0]">
                Build your expertise.
              </span>
            </h2>

          </div>

          <p className="max-w-xl text-lg leading-8 text-slate-400 lg:justify-self-end">
            Our technical community gives students opportunities to
            learn emerging technologies, work on practical projects
            and develop skills beyond the classroom.
          </p>

        </div>


        {/* =========================
            DOMAIN GRID
        ========================== */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">

          {domains.map((domain) => {
            const Icon = domain.icon;

            return (
              <article
                key={domain.number}
                className="group relative bg-[#0A2236] p-7 transition duration-300 hover:bg-[#0D2D46] sm:p-8"
              >

                {/* Number */}
                <div className="flex items-start justify-between">

                  <span className="text-sm font-semibold text-slate-500">
                    {domain.number}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-500 transition duration-300 group-hover:border-[#29A9E0]/40 group-hover:bg-[#00629B] group-hover:text-white">
                    <ArrowUpRight size={18} />
                  </div>

                </div>


                {/* Icon */}
                <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00629B]/20 text-[#29A9E0] transition duration-300 group-hover:bg-[#00629B] group-hover:text-white">
                  <Icon size={28} />
                </div>


                {/* Text */}
                <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-[#29A9E0]">
                  {domain.shortTitle}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {domain.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-400">
                  {domain.description}
                </p>


                {/* Bottom line */}
                <div className="mt-8 h-px w-10 bg-[#00629B] transition-all duration-300 group-hover:w-full" />

              </article>
            );
          })}

        </div>


        {/* =========================
            BOTTOM MESSAGE
        ========================== */}
        <div className="mt-10 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">

          <p className="text-sm text-slate-500">
            Learn from peers. Build projects. Explore the future.
          </p>

          <a
            href="#projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#29A9E0]"
          >
            Explore student projects

            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

        </div>

      </div>
    </section>
  );
}

export default Domains;