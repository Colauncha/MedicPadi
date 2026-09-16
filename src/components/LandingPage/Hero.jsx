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
    <section className="bg-[#F7F7FB]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-16 pb-20">
        
        <div className="flex flex-col lg:grid lg:grid-cols-[738fr_592fr] lg:gap-8 items-center lg:items-start">
          <div className="order-2 lg:order-1 lg:pt-10">
            <p className="text-md font-medium tracking-wide text-[#150D5E]/70 mb-4">
              Telemedicine, connected end to end
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.1] tracking-tight text-[#121212] mb-6">
              Healthcare that meets<br/> you where you are
            </h1>
            <p className="text-[#454545] text-base leading-7 mb-8">
              Medicpadi links patients, doctors, labs, and pharmacies on one <br/> continuous record — book 
              a consult, get diagnosed, run a test, and<br/> fill a prescription, without the thread 
              ever breaking.
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

          <div className="order-2 lg:order-1 w-full max-w-[420px] lg:max-w-none mx-auto lg:mx-0 relative aspect-[592/560] overflow-visible">
            <img
              src="/images/ellipse_28.png"
              alt=""
              aria-hidden="true"
              className="absolute left-[0] top-[0] w-[90.8%] h-[89.7%] object-contain z-0"
            />

            <img
            src="/images/iPad-Pro.png"
            alt="Medicpadi dashboard on tablet"
            className="relative left-[-56%] top-[-8%] w-[98.9%] h-[90.9%] object-contain z-10"
            // className="absolute left-[-30%] top-[0%] w-[90%] h-[90.9%] sm:w-[520px] object-contain z-10"
            // className="absolute left-[-50%] top-[0%] w-[98%] h-[90.9%] sm:w-[520px] object-contain z-20 -rotate-31"
          />

            {/* <img
              src="/images/iPad-Pro.png"
              alt="Medicpadi dashboard on tablet"
              className="absolute left-[-69.9%] top-[3.6%] w-[134.8%] h-[92.9%] object-contain z-10 rotate-[31deg]"
            /> */}
            

            <img
              src="/images/iPhone-13.png"
              alt="Medicpadi appointment view on phone"
              className="absolute left-0 top-[-10%] w-full h-full object-contain z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}