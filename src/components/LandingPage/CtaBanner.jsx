import { Apple, PlayCircle } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="max-w-[1240px] mx-auto px-6 lg:px-10 pb-20">
      <div className="rounded-2xl bg-[#0E0A38] px-8 sm:px-14 py-14 grid lg:grid-cols-2 gap-10 items-center overflow-hidden">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4 max-w-sm">
            Your first consult can start in minutes
          </h2>
          <p className="text-sm text-white/60 leading-6 max-w-sm mb-8">
            Download Medicpadi and get matched with a doctor today. No
            waiting room, no photocopied prescriptions.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-sm font-medium text-[#121212]"
            >
              <Apple className="w-4 h-4" />
              <span>
                Download on iOS
                <span className="block text-[10px] text-[#888888] font-normal">
                  App Store
                </span>
              </span>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-sm font-medium text-[#121212]"
            >
              <PlayCircle className="w-4 h-4" />
              <span>
                Download on Android
                <span className="block text-[10px] text-[#888888] font-normal">
                  Google Store
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* CSS-crafted phone mockup -- no source image available */}
        <div className="hidden lg:flex justify-end">
          <div className="w-[160px] bg-white/95 rounded-[24px] p-3 shadow-2xl -rotate-6">
            <div className="w-full h-6 rounded-full bg-[#150D5E]/10 mb-3" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-9 rounded-lg bg-[#F8F8FF]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}