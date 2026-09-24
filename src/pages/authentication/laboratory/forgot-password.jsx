import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router";
import { requestPasswordReset, resetPassword } from "../../../api/auth.api";
import doctor from "../../../assets/doctor.png";

export default function LaboratoryForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [step, setStep] = useState("select");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const isValidEmail =
    email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Countdown timer
  useEffect(() => {
    if (step !== "recovery" || timer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  // Send OTP
  const handleSendOtp = async () => {
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await requestPasswordReset(email.trim());

      setStep("recovery");
      setTimer(60);
    } catch (err) {
      setError(
        err.message ||
        "We could not find an account with this email address."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "");

    const updatedOtp = [...otp];
    updatedOtp[index] = numericValue.slice(-1);

    setOtp(updatedOtp);
    setError("");

    // Move to next input
    if (numericValue && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Handle OTP backspace
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);

      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0 || isResending) {
      return;
    }

    setIsResending(true);
    setError("");

    try {
      await requestPasswordReset(email.trim());

      // Clear the old OTP
      setOtp(["", "", "", "", "", ""]);

      // Restart timer
      setTimer(60);

      // Focus first OTP input
      setTimeout(() => {
        const firstInput = document.getElementById("otp-0");

        if (firstInput) {
          firstInput.focus();
        }
      }, 0);
    } catch (err) {
      setError(err.message || "Failed to resend OTP.");
    } finally {
      setIsResending(false);
    }
  };

  // Reset password
  const handleResetPassword = async () => {
    setError("");

    const enteredOtp = otp.join("");

    // Validate OTP
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit recovery code.");
      return;
    }

    // Validate password
    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (!confirmPassword) {
      setError("Please confirm your new password.");
      return;
    }

    // Check passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await resetPassword({
        email: email.trim(),
        otp: enteredOtp,
        newPassword,
      });

      // Password successfully reset.
      // Navigate to the sign-in page.
      navigate("/laboratory-signin");
    } catch (err) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  // Format timer
  const formatTimer = (seconds) => {
    return `${seconds} sec${seconds === 1 ? "" : "s"}`;
  };

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex bg-white font-sans overflow-hidden">
        {/* Left side */}
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative items-center justify-center">
          <img src={doctor} alt="Doctor" className="object-contain" />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 flex justify-center p-6 sm:p-12 relative">
          <div className="w-full max-w-[490px] bg-white rounded-2xl p-8 sm:p-12 border border-[#B0B0B0] z-10 relative shadow-sm">
            {/* Heading */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium leading-8 text-[#121212] mb-2">
                {step === "select"
                  ? "Forgot Password"
                  : "Enter recovery code"}
              </h1>

              <p className="text-[#888888] text-xs leading-4">
                {step === "select"
                  ? "Please select option to receive the reset password link"
                  : `Enter the recovery code we just sent to ${email}`}
              </p>
            </div>

            {/* EMAIL STEP */}
            {step === "select" ? (
              <form
                className="space-y-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendOtp();
                }}
              >
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
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
                  type="submit"
                  disabled={!isValidEmail || isLoading}
                  className={`w-full text-white leading-6 py-3.5 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] flex justify-center items-center ${isValidEmail && !isLoading
                    ? "bg-[#150D5E] hover:bg-[#150D5E]/90"
                    : "bg-[#150D5E]/60 cursor-not-allowed"
                    }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
            ) : (
              /* RECOVERY STEP */
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleResetPassword();
                }}
              >
                {/* OTP */}
                <div>
                  <label className="block text-sm font-medium text-[#121212] mb-3">
                    Recovery Code
                  </label>

                  <div className="flex justify-center gap-2 sm:gap-3">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        inputMode="numeric"
                        value={value}
                        onChange={(e) =>
                          handleOtpChange(index, e.target.value)
                        }
                        onKeyDown={(e) =>
                          handleOtpKeyDown(index, e)
                        }
                        className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl bg-[#F8F8FF] border border-[#E7E7E7] rounded-lg focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors"
                      />
                    ))}
                  </div>
                </div>

                {/* Timer / Resend */}
                <div className="flex items-center justify-between text-xs px-2">
                  <span className="text-[#888888]">
                    {formatTimer(timer)}
                  </span>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || isResending}
                    className={`font-medium transition-colors ${timer === 0 && !isResending
                      ? "text-[#150D5E] hover:underline cursor-pointer"
                      : "text-[#BDBDBD] cursor-not-allowed"
                      }`}
                  >
                    {isResending ? "Sending..." : "Resend OTP"}
                  </button>
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    New Password
                  </label>

                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter your new password"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E7E7E7] focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors bg-[#F8F8FF] text-[#121212] placeholder:text-[#888888]"
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#121212]"
                  >
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Confirm your new password"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#E7E7E7] focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors bg-[#F8F8FF] text-[#121212] placeholder:text-[#888888]"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                {/* Continue */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] mt-2 flex justify-center items-center ${isLoading
                    ? "bg-[#150D5E]/60 cursor-not-allowed"
                    : "bg-[#150D5E] hover:bg-[#150D5E]/90"
                    }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
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


