import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Healthcare Diagnostics",
    description:
      "Deep learning neural networks for early clinical anomaly detection, automated medical imaging analysis and patient triaging.",
    category: "ARTIFICIAL INTELLIGENCE",
    icon: BrainCircuit,
    technologies: ["Python", "PyTorch", "Computer Vision", "FastAPI"],
  },
  {
    id: 2,
    title: "Smart Campus IoT Ecosystem",
    description:
      "A distributed sensor grid for energy monitoring, occupancy tracking, and autonomous classroom environmental controls.",
    category: "IOT & EMBEDDED SYSTEMS",
    icon: Cpu,
    technologies: ["ESP32", "MQTT", "Node.js", "InfluxDB"],
  },
  {
    id: 3,
    title: "Academic Analytics Platform",
    description:
      "High-throughput student portal providing predictive grading insights, portfolio validation and event accreditation.",
    category: "DATA & CLOUD SOFTWARE",
    icon: Database,
    technologies: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: 4,
    title: "Cloud Native Microservices Lab",
    description:
      "Experimental containerized architectures focused on zero-downtime deployments, API gateways, and autoscaling workloads.",
    category: "CLOUD INFRASTRUCTURE",
    icon: Cloud,
    technologies: ["Docker", "Kubernetes", "Go", "Redis"],
  },
  {
    id: 5,
    title: "Cyber Defense & SecOps Suite",
    description:
      "Zero-trust auditing suite and penetration testing sandbox designed to demonstrate vulnerabilities and enforce web security.",
    category: "CYBERSECURITY",
    icon: ShieldCheck,
    technologies: ["Wireshark", "Burp Suite", "Python", "Cryptography"],
  },
  {
    id: 6,
    title: "Student Open Source Hub",
    description:
      "Collaborative framework connecting students with real-world open source repositories, code reviews and production workflows.",
    category: "OPEN SOURCE SOFTWARE",
    icon: Code2,
    technologies: ["Git", "GitHub Actions", "Full Stack", "Linux"],
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute left-[-120px] bottom-20 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Student Innovations</span>
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Ideas that become
              <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent"> real-world solutions.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Discover cutting-edge student projects across artificial intelligence,
              embedded IoT, cloud infrastructure, and cybersecurity built by IEEE RNSIT members.
            </p>
          </div>

          <a
            href="#projects"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/20 px-6 py-3 font-semibold text-[#29A9E0] backdrop-blur-md transition-all duration-300 hover:border-[#29A9E0]/60 hover:bg-[#00629B] hover:text-white hover:shadow-[0_0_20px_rgba(41,169,224,0.3)]"
          >
            <span>Explore all projects</span>
            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

        </div>


        {/* =========================
            GLASS PROJECT GRID
        ========================== */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                key={project.id}
                className="glass-card-interactive group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#29A9E0]/40 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6),0_0_30px_rgba(41,169,224,0.18)]"
              >

                {/* Animated top accent gradient line */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#00629B] via-[#29A9E0] to-cyan-300 transition-all duration-500 group-hover:w-full" />

                {/* Icon & Arrow Header */}
                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#00629B]/20 text-[#29A9E0] transition-all duration-300 group-hover:scale-105 group-hover:border-[#29A9E0]/50 group-hover:bg-[#00629B] group-hover:text-white group-hover:shadow-[0_0_20px_rgba(41,169,224,0.4)]">
                    <Icon size={26} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 group-hover:border-[#29A9E0]/40 group-hover:bg-[#00629B] group-hover:text-white">
                    <ArrowUpRight size={16} />
                  </div>

                </div>


                {/* Category */}
                <p className="mt-6 text-xs font-bold tracking-[0.16em] text-[#29A9E0]">
                  {project.category}
                </p>


                {/* Title */}
                <h3 className="mt-2.5 text-2xl font-bold leading-tight text-white transition-colors duration-200 group-hover:text-[#29A9E0]">
                  {project.title}
                </h3>


                {/* Description */}
                <p className="mt-3.5 min-h-[84px] text-sm leading-7 text-slate-300">
                  {project.description}
                </p>


                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">

                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors group-hover:border-[#29A9E0]/30 group-hover:text-cyan-200"
                    >
                      {technology}
                    </span>
                  ))}

                </div>

              </article>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Projects;
