import { Video, FileText, TestTube, Truck, ShieldCheck, MessageCircle } from "lucide-react";

const FEATURES = [
  {
    icon: Video,
    title: "Video & audio consults",
    body: "Talk to a licensed doctor face to face, or by call if your connection's slow.",
  },
  {
    icon: FileText,
    title: "E-prescriptions",
    body: "Prescriptions route straight to a pharmacy — no photo of handwriting required.",
  },
  {
    icon: TestTube,
    title: "Lab test booking",
    body: "Order the test your doctor recommends and get results back inside the app.",
  },
  {
    icon: Truck,
    title: "Delivery tracking",
    body: "Watch your medicine move from pharmacy shelf to your door in real time.",
  },
  {
    icon: ShieldCheck,
    title: "Health record vault",
    body: "Every consult, result, and prescription, stored in one place you control.",
  },
  {
    icon: MessageCircle,
    title: "Symptom triage chat",
    body: "Describe what's wrong first, and get routed to the right kind of doctor.",
  },
];

export default function FeatureGrid() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-3">
          Inside The Patient App
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
          Everything a visit needs, none of the waiting room.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-[#ECECEC] hover:border-[#150D5E]/30 hover:shadow-sm transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[#F8F8FF] flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#150D5E]" />
              </div>
              <h3 className="text-base font-semibold text-[#121212] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#454545] leading-6">{feature.body}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}