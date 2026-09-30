import {
  ArrowUpRight,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  ShieldCheck,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Healthcare",
    description:
      "Exploring machine learning solutions for healthcare applications, medical imaging and intelligent decision support.",
    category: "ARTIFICIAL INTELLIGENCE",
    icon: BrainCircuit,
    technologies: ["Python", "Machine Learning", "Deep Learning"],
  },
  {
    id: 2,
    title: "Smart Campus",
    description:
      "Technology-driven solutions designed to improve campus experiences through automation, data and connected systems.",
    category: "IOT & AUTOMATION",
    icon: Cpu,
    technologies: ["IoT", "Sensors", "Automation"],
  },
  {
    id: 3,
    title: "Student Data Platform",
    description:
      "A modern platform for organizing student information, analytics and useful academic insights.",
    category: "DATA & SOFTWARE",
    icon: Database,
    technologies: ["React", "FastAPI", "Database"],
  },
  {
    id: 4,
    title: "Cloud Innovation",
    description:
      "Experimenting with scalable cloud-based applications and infrastructure for modern software systems.",
    category: "CLOUD COMPUTING",
    icon: Cloud,
    technologies: ["Cloud", "Docker", "APIs"],
  },
  {
    id: 5,
    title: "Cybersecurity Awareness",
    description:
      "Student-focused initiatives exploring cybersecurity, secure applications and responsible digital practices.",
    category: "CYBERSECURITY",
    icon: ShieldCheck,
    technologies: ["Security", "Web", "Networking"],
  },
  {
    id: 6,
    title: "Open Source Projects",
    description:
      "Collaborative student projects that encourage practical development, teamwork and contributions to the open-source community.",
    category: "SOFTWARE DEVELOPMENT",
    icon: Code2,
    technologies: ["Git", "GitHub", "Open Source"],
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute right-[-120px] top-20 h-96 w-96 rounded-full bg-[#00629B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-[#00629B]/10 px-4 py-2 text-sm font-semibold text-[#00629B]">
              STUDENT PROJECTS
            </div>

            <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Ideas that become
              <span className="text-[#00629B]"> real-world solutions.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Discover projects developed by students across artificial
              intelligence, software development, IoT, cybersecurity and
              emerging technologies.
            </p>
          </div>

          <a
            href="#projects"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-[#00629B] transition hover:text-[#0077B8]"
          >
            Explore projects

            <ArrowUpRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

        </div>


        {/* =========================
            PROJECT GRID
        ========================== */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <article
                key={project.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-[#00629B]/30 hover:shadow-xl"
              >

                {/* Top accent */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-[#00629B] transition-all duration-300 group-hover:w-full" />

                {/* Icon */}
                <div className="flex items-start justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00629B]/10 text-[#00629B] transition duration-300 group-hover:bg-[#00629B] group-hover:text-white">
                    <Icon size={27} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition group-hover:border-[#00629B]/30 group-hover:text-[#00629B]">
                    <ArrowUpRight size={17} />
                  </div>

                </div>


                {/* Category */}
                <p className="mt-7 text-xs font-bold tracking-[0.16em] text-[#00629B]">
                  {project.category}
                </p>


                {/* Title */}
                <h3 className="mt-3 text-2xl font-bold leading-tight text-slate-900 transition group-hover:text-[#00629B]">
                  {project.title}
                </h3>


                {/* Description */}
                <p className="mt-4 min-h-[96px] text-sm leading-7 text-slate-500">
                  {project.description}
                </p>


                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-slate-100 pt-5">

                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600"
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