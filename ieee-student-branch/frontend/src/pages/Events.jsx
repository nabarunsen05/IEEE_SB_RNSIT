import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    description:
      "A hands-on workshop introducing students to artificial intelligence, neural architectures and practical computer vision models.",
    date: "15",
    month: "OCT",
    year: "2026",
    time: "10:00 AM",
    venue: "RNSIT Campus",
    category: "WORKSHOP",
  },
  {
    id: 2,
    title: "IEEE Innovation Hackathon",
    description:
      "Build innovative software and hardware prototypes to solve real-world problems and pitch to seasoned industry judges.",
    date: "22",
    month: "OCT",
    year: "2026",
    time: "9:00 AM",
    venue: "Innovation Lab",
    category: "HACKATHON",
  },
  {
    id: 3,
    title: "Research & Emerging Tech Talk",
    description:
      "Learn from active IEEE researchers and tech leaders about quantum computing, next-gen communication and publishing papers.",
    date: "29",
    month: "OCT",
    year: "2026",
    time: "2:00 PM",
    venue: "Seminar Hall",
    category: "TECH TALK",
  },
];

function Events() {
  return (
    <section
      id="events"
      className="relative min-h-screen overflow-hidden bg-[#071A2B] pt-28 pb-24 sm:pt-32 sm:pb-28"
    >
      {/* Background glowing decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00629B]/15 blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#29A9E0] backdrop-blur-md">
              <Sparkles size={14} />
              <span>Events & Activities</span>
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Learn. Connect.
              <span className="bg-gradient-to-r from-[#29A9E0] to-cyan-300 bg-clip-text text-transparent"> Experience.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Explore hands-on workshops, prestigious hackathons, expert technical sessions and
              annual flagship events organized by our IEEE Student Branch.
            </p>
          </div>

          <a
            href="#events"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#29A9E0]/30 bg-[#00629B]/20 px-6 py-3 font-semibold text-[#29A9E0] backdrop-blur-md transition-all duration-300 hover:border-[#29A9E0]/60 hover:bg-[#00629B] hover:text-white hover:shadow-[0_0_20px_rgba(41,169,224,0.3)]"
          >
            <span>View all events</span>
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>


        {/* =========================
            GLASS EVENT CARDS
        ========================== */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          {events.map((event) => (
            <article
              key={event.id}
              className="glass-card-interactive group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#29A9E0]/40 hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6),0_0_30px_rgba(41,169,224,0.18)]"
            >

              {/* Event Visual Header */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#00629B]/80 via-[#0A2E4E]/90 to-[#071A2B] p-6">

                {/* Decorative rotating background circles */}
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full border border-white/15 animate-float-slow" />
                <div className="absolute -bottom-16 -left-8 h-44 w-44 rounded-full border border-white/10 animate-float-reverse" />

                {/* Category Pill */}
                <div className="relative z-10 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-white backdrop-blur-md shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#29A9E0]" />
                  <span>{event.category}</span>
                </div>

                {/* Date Display */}
                <div className="absolute bottom-5 left-6 z-10 flex items-center gap-3">
                  <div className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl border border-white/20 bg-[#071A2B]/85 text-white backdrop-blur-md shadow-lg group-hover:border-[#29A9E0]/60 transition-colors">
                    <span className="text-xl font-bold leading-none text-white">
                      {event.date}
                    </span>
                    <span className="mt-1 text-[11px] font-bold tracking-wide text-[#29A9E0]">
                      {event.month}
                    </span>
                  </div>

                  <div className="text-xs font-medium tracking-wider text-slate-300">
                    YEAR {event.year}
                  </div>
                </div>

              </div>


              {/* Event Content */}
              <div className="p-6">

                <h3 className="text-xl font-bold leading-snug text-white transition-colors duration-200 group-hover:text-[#29A9E0]">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {event.description}
                </p>


                {/* Event details */}
                <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5">

                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <CalendarDays
                      size={16}
                      className="text-[#29A9E0] shrink-0"
                    />
                    <span>{event.date} {event.month} {event.year}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Clock
                      size={16}
                      className="text-[#29A9E0] shrink-0"
                    />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin
                      size={16}
                      className="text-[#29A9E0] shrink-0"
                    />
                    <span>{event.venue}</span>
                  </div>

                </div>


                {/* Register button */}
                <button
                  type="button"
                  className="group/btn mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(41,169,224,0.4)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Register Now</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover/btn:translate-x-1"
                  />
                </button>

              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Events;
