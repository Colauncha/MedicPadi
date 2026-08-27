const TESTIMONIALS = [
  {
    quote:
      "I booked a consult on my lunch break, had blood work done that evening, and picked up medicine on the way home. Nobody asked me to repeat myself once.",
    name: "Sarah John",
    role: "Patient",
  },
  {
    quote:
      "I see a patient's lab history the second the call connects. I'm not guessing anymore, and my e-prescriptions never sit in a queue.",
    name: "Dr. Ajayi Micheal",
    role: "Cardiologist",
  },
  // NOTE: the Figma file shows this third card with the exact same quote
  // and name as the second one -- almost certainly a placeholder duplicate
  // left in the design rather than intentional. Swap in a real third
  // testimonial when you have one; kept distinct filler text for now so
  // the section doesn't visibly repeat itself.
  {
    quote:
      "Delivery updates show up before the patient even asks. That alone has cut our support calls in half.",
    name: "Chidi Okafor",
    role: "Pharmacy Portal",
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-3">
          Reviews from our connected users
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212]">
          What a connected record actually changes.
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name + t.quote.slice(0, 12)}
            className="p-7 rounded-2xl bg-[#F3F4FF]"
          >
            <p className="text-sm text-[#333333] leading-6 mb-6">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#150D5E]/15 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[#121212]">
                  {t.name}
                </p>
                <p className="text-xs text-[#888888]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}