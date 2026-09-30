import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Workshop",
    description:
      "A hands-on workshop introducing students to artificial intelligence, machine learning and real-world applications.",
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
      "Build innovative solutions to real-world problems and compete with talented student teams.",
    date: "22",
    month: "OCT",
    year: "2026",
    time: "9:00 AM",
    venue: "Innovation Lab",
    category: "HACKATHON",
  },
  {
    id: 3,
    title: "Research & Technology Talk",
    description:
      "Learn from researchers and industry professionals about emerging technologies and research opportunities.",
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
      className="relative overflow-hidden bg-slate-50 py-24 sm:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#00629B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-[#00629B]/10 px-4 py-2 text-sm font-semibold text-[#00629B]">
              EVENTS & ACTIVITIES
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Learn. Connect.
              <span className="text-[#00629B]"> Experience.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Explore workshops, hackathons, technical sessions and
              other activities organized by our IEEE Student Branch.
            </p>
          </div>

          <a
            href="#events"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-[#00629B] transition hover:text-[#0077B8]"
          >
            View all events

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>

        </div>


        {/* =========================
            EVENT CARDS
        ========================== */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Event Visual */}
              <div className="relative h-52 overflow-hidden bg-[#071A2B]">

                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00629B] via-[#07486A] to-[#071A2B]" />

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/10" />

                <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/10" />

                {/* Category */}
                <div className="absolute left-5 top-5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md">
                  {event.category}
                </div>

                {/* Date */}
                <div className="absolute bottom-5 left-5 flex items-center gap-4">

                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white text-slate-900 shadow-lg">

                    <span className="text-2xl font-bold leading-none">
                      {event.date}
                    </span>

                    <span className="mt-1 text-xs font-bold text-[#00629B]">
                      {event.month}
                    </span>

                  </div>

                  <div className="text-sm text-white/70">
                    {event.year}
                  </div>

                </div>

              </div>


              {/* Event Content */}
              <div className="p-6">

                <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-[#00629B]">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {event.description}
                </p>


                {/* Event details */}
                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <CalendarDays
                      size={17}
                      className="text-[#00629B]"
                    />

                    {event.date} {event.month} {event.year}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <Clock
                      size={17}
                      className="text-[#00629B]"
                    />

                    {event.time}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <MapPin
                      size={17}
                      className="text-[#00629B]"
                    />

                    {event.venue}
                  </div>

                </div>


                {/* Register button */}
                <button
                  type="button"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00629B] px-5 py-3 font-semibold text-white transition hover:bg-[#0077B8]"
                >
                  Register Now

                  <ArrowRight size={17} />
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