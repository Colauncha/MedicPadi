import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import StatsBar from "./StatsBar";

const PORTALS = [
  {
    label: "Doctor Portal",
    heading: "Consult, prescribe, and get paid",
    body: "A full clinic queue, video consults with built-in e-prescribing, and control over your own hours and rates.",
    cta: "Open doctor portal",
    to: "/doctor-signup",
  },
  {
    label: "Lab Portal",
    heading: "Orders in, results out",
    body: "Receive test orders from doctors directly, manage pickup logistics, and upload results into the patient record.",
    cta: "Open lab portal",
    to: "/laboratory-signup",
  },
  {
    label: "Pharmacy Portal",
    heading: "Fulfil with confidence",
    body: "Real-time e-prescriptions, instant stock confirmation, and delivery scheduling in one dashboard.",
    cta: "Open pharmacy portal",
    to: "/pharmacy-signup",
  },
];

const STATS = [
  { value: "500+", label: "Doctors across 12 specialties" },
  { value: "40", label: "Partner diagnostic labs" },
  { value: "50", label: "Fulfilling pharmacies" },
  { value: "18 min", label: "Average time to first consult" },
];

export default function PortalCards() {
  return (
    <section className="bg-[#F7F7FB]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-3">
            For The People Delivering Care
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212] mb-4">
            Three portals, purpose-built for the work.
          </h2>
          <p className="text-[#454545] leading-7">
            No app download, no retraining because Medicpaddi's professional
            tools run in a browser your team already knows.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {PORTALS.map((portal) => (
            <div
              key={portal.label}
              className="flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-[#1A1170] to-[#0E0A38] text-white min-h-[280px]"
            >
              <div>
                <p className="text-xs text-white/50 mb-6">{portal.label}</p>
                <h3 className="text-xl font-semibold mb-3">
                  {portal.heading}
                </h3>
                <p className="text-sm text-white/70 leading-6">
                  {portal.body}
                </p>
              </div>

              <Link
                to={portal.to}
                className="inline-flex items-center gap-2 text-sm font-medium mt-8 pt-4 border-t border-white/15 hover:text-white/80 transition-colors"
              >
                {portal.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <StatsBar stats={STATS} variant="dark" />
      </div>
    </section>
  );
}