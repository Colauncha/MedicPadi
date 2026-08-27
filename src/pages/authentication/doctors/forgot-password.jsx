import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { requestPasswordReset, resetPassword } from "../../../api/auth.api";
import doctor from "../../../assets/doctor.png";

export default function DoctorForgotPassword() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [step, setStep] = useState("select");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    setOtp((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value.length === 1 && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!selectedOption || !email) return;

    try {
      setIsLoading(true);
      setError("");
      await requestPasswordReset(email);
      setStep("recovery");
    } catch (err) {
      setError(err.message || "Could not send the reset code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setError("");
      setResendMessage("");
      await requestPasswordReset(email);
      setResendMessage("A new code has been sent.");
    } catch (err) {
      setError(err.message || "Could not resend the code.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const code = otp.join("");
 
    if (code.length !== 4) {
      setError("Please enter the full 4-digit code.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      await resetPassword({ email, otp: code, newPassword });
      navigate("/doctor-signin");
    } catch (err) {
      setError(err.message || "Could not reset your password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            {step === "select" ? (
              <form className="space-y-6" onSubmit={handleRequestReset}>
                <div>
                  <label className="block text-sm leading-5 text-[#989898] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe34@gmail.com"
                    required
                    className="w-full text-[#121212] leading-6 px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
 
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
                        A code will be sent to your email
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
                  type="submit"
                  disabled={!selectedOption || !email || isLoading}
                  className={`w-full flex items-center justify-center text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] ${
                    selectedOption && email
                      ? "bg-[#150D5E]"
                      : "bg-[#150D5E]/60 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Sending...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={handleResetPassword}>
                <div className="flex justify-center gap-2 sm:gap-3 mb-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl bg-[#F8F8FF] border border-[#E7E7E7] rounded-lg focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors"
                    />
                  ))}
                </div>


               <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-[#888888]">{resendMessage}</span>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[#150D5E] hover:underline font-medium"
                  >
                    Resend OTP
                  </button>
                </div>
 
                <div>
                  <label className="block text-sm leading-5 text-[#989898] mb-1.5">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Choose a new password"
                    required
                    className="w-full text-[#121212] leading-6 px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
 
                <div>
                  <label className="block text-sm leading-5 text-[#989898] mb-1.5">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    required
                    className="w-full text-[#121212] leading-6 px-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center bg-[#150D5E] text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Resetting...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
 