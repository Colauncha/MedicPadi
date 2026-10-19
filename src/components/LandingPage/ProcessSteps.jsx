const STEPS = [
  {
    number: "01",
    title: "Book",
    body: "Pick a doctor and a time, or get matched to the next one available.",
  },
  {
    number: "02",
    title: "Consult",
    body: "Join by video or audio. The doctor reviews your history before you connect.",
  },
  {
    number: "03",
    title: "Prescribe & test",
    body: "An e-prescription goes to a pharmacy; a lab order goes out if one's needed.",
  },
  {
    number: "04",
    title: "Fulfil",
    body: "Medicine arrives, results upload, and your record updates automatically.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="how-it-works" className="bg-[#F7F7FB]">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-medium tracking-wide uppercase text-[#150D5E]/70 mb-3">
            The path from symptom to cure
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#121212] mb-4">
            Four steps. One continuous line of care.
          </h2>
          <p className="text-[#454545] leading-7">
            Every consult on Medicpaddi follows the same sequence — so
            nothing gets lost between the doctor's diagnosis and the
            medicine in your hand.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="flex items-center mb-5">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold ${
                    i === 0
                      ? "bg-[#150D5E] text-white"
                      : "border border-[#D1D1D1] text-[#454545] bg-white"
                  }`}
                >
                  {step.number}
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block flex-1 h-px bg-[#D1D1D1] ml-4" />
                )}
              </div>
              <h3 className="text-base font-semibold text-[#121212] mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-[#454545] leading-6">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}