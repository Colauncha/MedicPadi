import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "react-router";

const TABS = ["Patients", "Doctor", "Lab", "Pharmacy"];

// Only the Patients panel copy came from the Figma screens. The other three
// reuse the matching Portal-card copy from further down the page, since the
// mockup didn't show unique content for those tabs -- swap in real copy
// here if you have it.
const PANELS = {
  Patients: {
    heading: "Care that fits in your pocket",
    body: "Book a doctor, join a call, and get treated. The Medicpaddi app keeps every consult, prescription, and result in one place.",
    checklist: [
      "Book a video or audio consult in under two minutes",
      "Get e-prescriptions sent straight to a pharmacy near you",
      "Order lab tests and get results without a second appointment",
      "Keep your full health history in one secure record",
    ],
    cta: { label: "Download App", to: "/patient-signup" },
  },
  Doctor: {
    heading: "Consult, prescribe, and get paid",
    body: "A full clinic queue, video consults with built-in e-prescribing, and control over your own hours and rates.",
    checklist: null,
    cta: { label: "Open doctor portal", to: "/doctor-signup" },
  },
  Lab: {
    heading: "Orders in, results out",
    body: "Receive test orders from doctors directly, manage pickup logistics, and upload results into the patient record.",
    checklist: null,
    cta: { label: "Open lab portal", to: "/laboratory-signup" },
  },
  Pharmacy: {
    heading: "Fulfil with confidence",
    body: "Real-time e-prescriptions, instant stock confirmation, and delivery scheduling in one dashboard.",
    checklist: null,
    cta: { label: "Open pharmacy portal", to: "/pharmacy-signup" },
  },
};

export default function RoleTabs() {
  const [active, setActive] = useState("Patients");
  const panel = PANELS[active];

  return (
    <section className="mx-auto px-6 lg:px-10 py-20 bg-[#F1EFF8]">
      <div className="text-center max-w-2xl mx-auto mb-12 bg-[#F1EFF8">
        <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-3">
          One Record, Four Roles
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212] mb-4">
          Built for the patient. Wired for the people treating them
        </h2>
        <p className="text-[#454545] leading-7">
          Patients get an app made for booking and following care. Doctors,
          labs, and pharmacies get a web portal built for volume — every
          action updates the same record in real time.
        </p>
      </div>

      <div className="flex justify-start gap-2 mb-12">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active === tab
                ? "bg-[#150D5E] text-white"
                : "text-[#454545] hover:bg-[#F8F8FF]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#121212] mb-4">
            {panel.heading}
          </h3>
          <p className="text-[#454545] leading-7 mb-6 max-w-md">
            {panel.body}
          </p>

          {panel.checklist && (
            <ul className="space-y-3 mb-8">
              {panel.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 mt-0.5 text-[#150D5E] shrink-0" />
                  <span className="text-sm text-[#454545]">{item}</span>
                </li>
              ))}
            </ul>
          )}

          <Link
            to={panel.cta.to}
            className="inline-flex items-center px-6 py-3.5 rounded-lg bg-[#150D5E] text-sm font-medium text-white hover:bg-[#1A1170] transition-colors"
          >
            {panel.cta.label}
          </Link>
        </div>

        {/* CSS-crafted doctor profile card -- no source image available */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-sm bg-[#E9EAFE] rounded-2xl shadow-lg border border-[#ECECEC] p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-[#150D5E]/10" />
              <div>
                <p className="text-sm font-medium text-[#121212]">
                  Dr. Ajayi Micheal
                </p>
                <p className="text-xs text-[#888888]">Cardiology</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-[#ECECEC]">
              <div className="bg-[#F3F4FF]">
                <p className="text-lg font-semibold text-[#121212]">2k+</p>
                <p className="text-[10px] text-[#888888] mt-0.5">Patients</p>
              </div>
              <div className="bg-[#F3F4FF]">
                <p className="text-lg font-semibold text-[#121212]">
                  7 Years+
                </p>
                <p className="text-[10px] text-[#888888] mt-0.5">
                  Experience
                </p>
              </div>
              <div className="bg-[#F3F4FF]">
                <p className="text-lg font-semibold text-[#121212]">8</p>
                <p className="text-[10px] text-[#888888] mt-0.5">Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}