const PARTNERS = [
  "Wellcare Clinics",
  "TrustPharm",
  "MedLab Partners",
  "Nova Diagnostics",
  "Firstine Health",
];

export default function TrustedLogos() {
  return (
    <section className="">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10 py-10">
        <p className="text-start text-xs text-[#888888] mb-6">
          Trusted by clinics and pharmacy chains across the country
        </p>
        <div className="flex flex-wrap justify-start gap-x-10 gap-y-4">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="text-sm font-medium text-[#454545]/70"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}