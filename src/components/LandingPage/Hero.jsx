import { Link } from "react-router";
import StatsBar from "./StatsBar";
import heroImg from "../../assets/hero1.png";

const STATS = [
  { value: "500+", label: "Doctor's Online" },
  { value: "40", label: "Partner Labs" },
  { value: "50", label: "Pharmacies" },
  { value: "4.2", label: "App Rating" },
];

export default function Hero() {
  return (
    <section className="bg-[#F7F7FB]">
      <div className="max-w-[1440px] mx-auto px-16 lg:px-18 pt-2 pb-20">
        
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

<div className="order-2 lg:order-1 w-full max-w-[600px] lg:max-w-none mx-auto lg:mx-0 relative aspect-[592/560] overflow-visible lg:scale-[1.3] lg:origin-center">
  <img
    src={heroImg}
    alt="Medicpadi hero"
    className="relative w-full h-full object-contain z-10"
  />
</div>
        </div>
      </div>
    </section>
  );
}