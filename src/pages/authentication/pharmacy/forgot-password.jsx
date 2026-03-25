import React, { useState } from "react";
import { Mail } from "lucide-react";
import pharmacy from "../../../assets/pharmacy.png";

export default function PharmacyForgotPassword() {
  const [selectedOption, setSelectedOption] = useState("");
  const [step, setStep] = useState("select");

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex bg-white font-sans overflow-hidden">
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative items-center justify-center">
          <img src={pharmacy} alt="Pharmacy" className="object-contain" />
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
                  : "Enter the recovery code we just sent to sarahjohn@gmail.com"}
              </p>
            </div>

            {step === "select" ? (
              <form className="space-y-8">
                <div
                  className={`flex items-center justify-between p-4 border border-[#E7E7E7] rounded-xl cursor-pointer transition-colors ${
                    selectedOption === "email"
                      ? "border-[#150D5E] bg-[#F8F8FF]"
                      : "border-[#E5E5E5] hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    setSelectedOption(selectedOption === "email" ? "" : "email")
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#E6E2F2] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#331EB9]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-[#121212]">
                        Reset via email
                      </h3>
                      <p className="text-[10px] text-[#888888] mt-1">
                        Code will be sent to your email password
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      selectedOption === "email"
                        ? "border-[#150D5E] bg-[#150D5E]"
                        : "border-[#D1D1D1] bg-white"
                    }`}
                  >
                    {selectedOption === "email" && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (selectedOption) {
                      setStep("recovery");
                    }
                  }}
                  className={`w-full text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] ${
                    selectedOption
                      ? "bg-[#150D5E]"
                      : "bg-[#150D5E]/60 cursor-not-allowed"
                  }`}
                >
                  Continue
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
