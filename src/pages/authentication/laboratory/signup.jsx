import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { createUser, getUserIdFromToken } from "../../../api/auth.api";
import google from "../../../assets/google.svg";
import doctor from "../../../assets/doctor.png";
import apple from "../../../assets/apple.svg";

export default function LaboratorySignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "lab",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePassword = (password, confirmPassword) => {
    let passwordError = "";
    let confirmError = "";

    if (password && password.length < 8) {
      passwordError = "Password must be at least 8 characters long";
    }

    if (confirmPassword && password !== confirmPassword) {
      confirmError = "Passwords do not match";
    }

    setErrors({
      password: passwordError,
      confirmPassword: confirmError,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "password" || name === "confirmPassword") {
        validatePassword(
          name === "password" ? value : newData.password,
          name === "confirmPassword" ? value : newData.confirmPassword,
        );
      }

      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");

      const result = await createUser(formData);

      console.log("SIGNUP RESPONSE:", result);

      // Get access token
      const userId = result?.user_id;

      if (!userId) {
        throw new Error("User ID could not be extracted from the token.");
      }

      // Save user ID
      localStorage.setItem("userId", userId);

      // Save email
      if (formData.email) {
        localStorage.setItem("userEmail", formData.email);
      }

      // Save phone
      if (formData.phoneNumber) {
        localStorage.setItem("userPhone", formData.phoneNumber);
      }

      navigate("/laboratory-signin");
    } catch (err) {
      console.error("Signup error:", err);

      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-8 bg-[#E6E2F2] flex items-center justify-center">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden font-sans min-h-[520px]">
        <div className="hidden lg:flex flex-col w-1/2 p-8 sm:p-12 relative overflow-hidden items-center justify-center bg-[#fcfcfd]">
          <img src={doctor} alt="Doctor" className="object-contain max-h-[480px]" />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-10">
          <div className="w-full max-w-[460px] bg-white rounded-2xl p-6 sm:p-10 border border-[#B0B0B0] shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-medium leading-8 text-[#121212] mb-1.5">
                Create Account
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                To create account, provide details and set password
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs sm:text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs sm:text-sm leading-5 text-[#989898] mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#D1D1D1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe34@gmail.com"
                    className="w-full text-sm text-[#3d3d3d] leading-6 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm leading-5 text-[#989898] mb-1 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#D1D1D1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+234 9012345678"
                    className="w-full text-sm text-[#3d3d3d] leading-6 pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm leading-5 text-[#989898] mb-1 font-medium">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#D1D1D1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Choose a password"
                    className={`w-full text-sm text-[#3d3d3d] leading-6 pl-10 pr-12 py-3 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500 leading-4 mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs sm:text-sm leading-5 text-[#989898] mb-1 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-[#D1D1D1]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={`w-full text-sm text-[#3d3d3d] leading-6 pl-10 pr-12 py-3 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 leading-4 mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center bg-[#150D5E] text-white font-medium text-sm leading-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A5A] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                disabled={
                  !!errors.password || !!errors.confirmPassword || isLoading
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Signing up...
                  </>
                ) : (
                  "Sign up"
                )}
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="flex-shrink-0 px-3 text-xs text-[#888888]">
                  Or continue with
                </span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2.5 justify-center py-3 border border-[#150D5E] rounded-lg transition-colors hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  <img src={google} alt="google" className="w-5 h-5" />
                  <span className="text-[#150D5E]">Google</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-2.5 justify-center py-3 border border-[#150D5E] rounded-lg transition-colors hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  <img src={apple} alt="apple" className="w-5 h-5" />
                  <span className="text-[#150D5E]">Apple</span>
                </button>
              </div>

              <p className="text-center text-xs sm:text-sm leading-5 text-[#454545] pt-4">
                Have an existing account?{" "}
                <Link to="/laboratory-signin">
                  <span className="text-[#150D5E] font-medium hover:underline">
                    Log in
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

