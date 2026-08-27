import { Link } from "react-router";
import StatsBar from "./StatsBar";

const STATS = [
  { value: "500+", label: "Doctor's Online" },
  { value: "40", label: "Partner Labs" },
  { value: "50", label: "Pharmacies" },
  { value: "4.2", label: "App Rating" },
];

export default function Hero() {
  return (
    <section className="mx-auto px-6 lg:px-10 pt-16 pb-20 bg-[#F7F7FB]">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-4">
            Telemedicine, connected end to end
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-[#121212] mb-6">
            Healthcare that meets you where you are
          </h1>
          <p className="text-[#454545] text-base leading-7 max-w-md mb-8">
            Medicpadi links patients, doctors, labs, and pharmacies on one
            continuous record — book a consult, get diagnosed, run a test,
            and fill a prescription, without the thread ever breaking.
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#how-it-works"
              className="inline-flex items-center px-6 py-3.5 rounded-lg border border-[#D1D1D1] text-sm font-medium text-[#121212] hover:border-[#150D5E] transition-colors"
            >
              See how it works
            </a>
            <Link
              to="/doctor-signup"
              className="inline-flex items-center px-6 py-3.5 rounded-lg bg-[#121212] text-sm font-medium text-white hover:bg-[#150D5E] transition-colors"
            >
              Get the app
            </Link>
          </div>

          <StatsBar stats={STATS} />
        </div>

        {/* CSS-crafted device mockup -- no source image available for the
            tablet/phone illustration from the Figma file. */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute w-[340px] h-[340px] rounded-full bg-[#150D5E] -z-10 right-6 top-8" />

          <div className="w-[300px] sm:w-[360px] bg-white rounded-2xl shadow-xl border border-[#ECECEC] p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-[#150D5E]" />
              <div className="h-2 w-20 rounded-full bg-[#ECECEC]" />
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-2.5 w-full rounded-full bg-[#F0F0F0]" />
              <div className="h-2.5 w-4/5 rounded-full bg-[#F0F0F0]" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 rounded-lg bg-[#F8F8FF]" />
              ))}
            </div>
          </div>

          <div className="hidden sm:block absolute -bottom-6 -right-2 w-[150px] bg-white rounded-2xl shadow-xl border border-[#ECECEC] p-3">
            <div className="w-full h-20 rounded-xl bg-[#150D5E]/10 mb-2" />
            <div className="h-2 w-3/4 rounded-full bg-[#ECECEC] mb-1.5" />
            <div className="h-2 w-1/2 rounded-full bg-[#ECECEC]" />
          </div>
        </div>
      </div>
    </section>
  );
}