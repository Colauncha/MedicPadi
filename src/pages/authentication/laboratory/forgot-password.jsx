import { useState } from "react";
import { Mail } from "lucide-react";
import { requestPasswordReset } from "../../../api/auth.api";
import doctor from "../../../assets/doctor.png";

export default function LaboratoryForgotPassword() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("select");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail =
    email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex bg-white font-sans overflow-hidden">
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative items-center justify-center">
          <img src={doctor} alt="Doctor" className="object-contain" />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center p-6 sm:p-12 relative">
          <div className="w-full max-w-[490px] bg-white rounded-2xl p-8 sm:p-12 border border-[#B0B0B0] z-10 relative shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium leading-8 text-[#121212] mb-2">
                {step === "select" ? "Forgot Password" : "Enter recovery code"}
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                {step === "select"
                  ? "Please select option to receive the reset password link"
                  : `Enter the recovery code we just sent to ${email}`}
              </p>
            </div>

            {step === "select" ? (
              <form className="space-y-8">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-[#888888]" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#E7E7E7] focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors bg-[#F8F8FF] text-[#121212] placeholder:text-[#888888]"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="button"
                  onClick={async () => {
                    if (isValidEmail) {
                      setIsLoading(true);
                      setError("");
                      try {
                        await requestPasswordReset(email);
                        setStep("recovery");
                      } catch (err) {
                        setError(err.message || "Failed to request password reset.");
                      } finally {
                        setIsLoading(false);
                      }
                    }
                  }}
                  disabled={!isValidEmail || isLoading}
                  className={`w-full text-white leading-6 py-3.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] flex justify-center items-center ${
                    isValidEmail && !isLoading
                      ? "bg-[#150D5E] hover:bg-[#150D5E]/90"
                      : "bg-[#150D5E]/60 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            ) : (
              <form className="space-y-8">
                <div className="flex justify-center gap-2 sm:gap-3 mb-4">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength="1"
                      onChange={(e) => {
                        if (e.target.value.length === 1 && index < 5) {
                          const nextInput = document.getElementById(
                            `otp-${index + 1}`,
                          );
                          if (nextInput) nextInput.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !e.target.value &&
                          index > 0
                        ) {
                          const prevInput = document.getElementById(
                            `otp-${index - 1}`,
                          );
                          if (prevInput) prevInput.focus();
                        }
                      }}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl bg-[#F8F8FF] border border-[#E7E7E7] rounded-lg focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-[#888888]">24 secs</span>
                  <button
                    type="button"
                    className="text-[#150D5E] hover:underline font-medium"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="button"
                  className="w-full bg-[#150D5E] text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] mt-4"
                >
                  Continue
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
