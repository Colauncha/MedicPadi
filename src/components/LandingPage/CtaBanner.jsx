import iosImg from "../../assets/ios.png";
import androidImg from "../../assets/google.png";
import ctaImg from "../../assets/ctaimg.png";

export default function CtaBanner() {
  return (
    <section className="w-full max-w-[1240px] mx-auto px-5 sm:px-6 lg:px-10 pb-20">
      <div className="relative overflow-hidden rounded-2xl bg-[#17105E] px-6 py-6 sm:px-10 sm:py-8 lg:px-12 lg:py-9 grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-0">

        <div className="relative z-10 w-full max-w-[440px]">
          <h2 className="text-2xl sm:text-3xl font-semibold leading-tight text-white mb-3 max-w-[400px]">
            Your first consult can start in minutes
          </h2>

          <p className="text-xs sm:text-sm text-white/70 leading-5 max-w-[380px] mb-7">
            Download Medicpadi and get matched with a doctor today.
            No waiting room, no photocopied prescriptions.
          </p>

          <div className="flex flex-wrap items-center gap-3">
        
            <a
              href="#"
              aria-label="Download Medicpadi on the App Store"
              className="flex items-center gap-2.5 bg-[#F7F6FF] rounded-md px-3 py-2 sm:px-4 min-h-[42px] w-fit min-w-[158px] hover:bg-white transition-colors"
            >
              <img
                src={iosImg}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
              />

              <span className="text-[#17105E] text-xs leading-tight font-medium">
                Download on iOS
                <span className="block text-[10px] text-gray-500 font-normal mt-0.5">
                  App Store
                </span>
              </span>
            </a>

        
            <a
              href="#"
              aria-label="Download Medicpadi on Google Play"
              className="flex items-center gap-2.5 bg-[#F7F6FF] rounded-md px-3 py-2 sm:px-4 min-h-[42px] w-fit min-w-[158px] hover:bg-white transition-colors"
            >
              <img
                src={androidImg}
                alt=""
                className="w-4 h-4 object-contain shrink-0"
              />

              <span className="text-[#17105E] text-xs leading-tight font-medium">
                Download on Android
                <span className="block text-[10px] text-gray-500 font-normal mt-0.5">
                  Google Play
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="w-full flex items-center justify-center lg:justify-end">
          <img
            src={ctaImg}
            alt="Medicpadi mobile app displayed on smartphones"
            className="block w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[480px] h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
}