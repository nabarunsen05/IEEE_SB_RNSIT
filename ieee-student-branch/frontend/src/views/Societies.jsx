import { Building2, GraduationCap, Users } from "lucide-react";
import { societies } from "../data/societiesData";

export default function Societies() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F4F7FA] px-6 pb-24 pt-32 sm:px-8 sm:pt-36 lg:px-12">
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#E6F4FB] blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[#29A9E0]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00629B]/15 bg-[#E6F4FB] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00629B]">
            <Users size={14} />
            <span>{societies.length} active chapters</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#10243A] sm:text-5xl">
            IEEE Societies at RNSIT
          </h1>
          <p className="mt-5 text-lg leading-8 text-[#526477]">
            Explore the IEEE society chapters at RNS Institute of Technology,
            their departments, and the faculty advisors who guide them.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-3xl border border-[#DCE5EC] bg-white shadow-[0_12px_35px_rgba(16,36,58,0.08)]">
          <div className="hidden grid-cols-[72px_minmax(0,1.7fr)_140px_minmax(0,1fr)] gap-6 bg-[#10243A] px-6 py-4 text-xs font-bold uppercase tracking-wider text-white md:grid">
            <span>Sl. No.</span>
            <span>IEEE Society Chapter</span>
            <span>Department</span>
            <span>Faculty Advisor</span>
          </div>

          <div className="divide-y divide-[#DCE5EC]">
            {societies.map((society, index) => (
              <article
                key={society.name}
                className="grid gap-3 px-6 py-5 transition-colors hover:bg-[#F4F7FA] md:grid-cols-[72px_minmax(0,1.7fr)_140px_minmax(0,1fr)] md:items-center md:gap-6"
              >
                <span className="font-mono text-sm font-bold text-[#00629B]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-start gap-3">
                  <Building2 className="mt-0.5 shrink-0 text-[#29A9E0]" size={18} />
                  <h2 className="font-semibold leading-6 text-[#10243A]">{society.name}</h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#526477]">
                  <GraduationCap size={16} className="text-[#00629B]" />
                  <span>{society.department}</span>
                </div>
                <p className="text-sm text-[#526477] md:border-l md:border-[#DCE5EC] md:pl-6">
                  <span className="mr-2 font-semibold text-[#10243A] md:hidden">Advisor:</span>
                  {society.advisor}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
