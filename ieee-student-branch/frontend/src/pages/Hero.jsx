import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-[#071A2B] pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-[#00629B]/20 blur-3xl" />

      {/* Main Hero Container */}
      <div className="relative mx-auto grid w-full max-w-7xl min-h-[calc(100vh-96px)] items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:px-12">

        {/* =========================
            LEFT SIDE — HERO CONTENT
        ========================== */}
        <div className="relative z-10">

          {/* Small Label */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00629B]/40 bg-[#00629B]/10 px-4 py-2 text-sm text-blue-300">
            <Sparkles size={16} />
            <span>IEEE Student Branch</span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Innovate.
            <br />

            <span className="text-[#29A9E0]">
              Connect.
            </span>

            <br />

            Create.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            A community of students passionate about technology,
            research, innovation and creating solutions for the future.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            {/* Explore Events */}
            <a
              href="#events"
              className="group flex items-center gap-2 rounded-full bg-[#00629B] px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-[#0077B8] hover:shadow-lg hover:shadow-[#00629B]/30"
            >
              Explore Events

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {/* Discover IEEE */}
            <a
              href="#about"
              className="rounded-full border border-slate-700 px-6 py-3.5 font-semibold text-white transition duration-300 hover:border-slate-500 hover:bg-white/5"
            >
              Discover IEEE
            </a>

          </div>
        </div>


        {/* =========================
            RIGHT SIDE — VISUAL
        ========================== */}
        <div className="relative hidden h-[500px] lg:block">

          <div className="relative mx-auto h-full w-full max-w-lg">

            {/* Large outer circle */}
            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00629B]/30" />

            {/* Medium circle */}
            <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00629B]/20" />

            {/* Small circle */}
            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00629B]/20" />


            {/* Center Circle */}
            <div className="absolute left-1/2 top-1/2 flex h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#00629B] to-[#063A5B] shadow-2xl shadow-[#00629B]/30">

              <div className="text-center">

                {/* IEEE */}
                <div className="text-5xl font-black tracking-tight text-white">
                  IEEE
                </div>

                {/* College */}
                <div className="mt-2 text-sm font-medium tracking-[0.35em] text-blue-200">
                  RNSIT
                </div>

              </div>

            </div>


            {/* =========================
                DECORATIVE ELEMENTS
            ========================== */}

            {/* Top Right Dot */}
            <div className="absolute right-8 top-16 h-5 w-5 rounded-full bg-[#29A9E0] shadow-lg shadow-[#29A9E0]/50" />

            {/* Bottom Left Dot */}
            <div className="absolute bottom-20 left-8 h-4 w-4 rounded-full bg-white/70" />

            {/* Small Blue Dot */}
            <div className="absolute bottom-32 right-16 h-3 w-3 rounded-full bg-[#00629B]" />

            {/* Small Ring */}
            <div className="absolute left-14 top-28 h-6 w-6 rounded-full border border-[#29A9E0]/50" />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;