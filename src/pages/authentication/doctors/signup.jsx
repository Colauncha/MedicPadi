import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { createUser, sendVerificationMail } from "../../../api/auth.api";
import google from "../../../assets/google.svg";
import doctor from "../../../assets/doctor.png";
import apple from "../../../assets/apple.svg";

export default function DoctorSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "consultant",
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
      console.log("User created:", result);
      const token = result?.access_token || result?.accessToken || result?.token;
      if (token) {
        localStorage.setItem("token", token);
      } else {
        console.warn(
          "No token found in signup response — check the actual field name and update this line.",
        );
      }
 
      try {
        await sendVerificationMail(formData.email);
      } catch (verifyErr) {
        console.warn("Could not send verification email:", verifyErr.message);
      }

      navigate("/doctor-profile");
    } catch (err) {
      console.error(err.message);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex min-h-screen bg-white font-sans">
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden items-center justify-center">
          <img src={doctor} alt="doctor" />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[490px] bg-white rounded-2xl p-8 sm:p-12 border border-[#B0B0B0]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium leading-8 text-[#121212] mb-2">
                Create Account
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                To create account, provide details and set password
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm leading-5 text-[#989898] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                    className="w-full text-[#B0B0B0] leading-6 pl-11 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-xs text-[#989898] leading-4 mt-1.5">
                  This is a hint to help the user
                </p>
              </div>

              <div>
                <label className="block text-sm leading-5 text-[#989898] mb-1.5 font-medium">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                    className="w-full text-[#B0B0B0] leading-6 pl-11 pr-4 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <p className="text-xs text-[#989898] leading-4 mt-1.5">
                  This is a hint to help the user
                </p>
              </div>

              <div>
                <label className="block text-sm leading-5 text-[#989898] mb-1.5 font-medium">
                  Create Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                    className={`w-full text-[#B0B0B0] leading-6 pl-11 pr-12 py-3.5 border ${
                      errors.password ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password ? (
                  <p className="text-xs text-red-500 leading-4 mt-1.5">
                    {errors.password}
                  </p>
                ) : (
                  <p className="text-xs text-[#989898] leading-4 mt-1.5">
                    Must be 8 characters or more
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm leading-5 text-[#989898] mb-1.5 font-medium">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
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
                    className={`w-full text-[#B0B0B0] leading-6 pl-11 pr-12 py-3.5 border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword ? (
                  <p className="text-xs text-red-500 leading-4 mt-1.5">
                    {errors.confirmPassword}
                  </p>
                ) : (
                  <p className="text-xs text-[#989898] leading-4 mt-1.5">
                    Please repeat your password
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center bg-[#150D5E] text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A5A] disabled:opacity-70 disabled:cursor-not-allowed"
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

              <div className="flex justify-end">
                <Link to="/doctor-forgot-password">
                  <span className="text-[#150D5E] leading-4 hover:underline text-xs">
                    Forgot Password
                  </span>
                </Link>
              </div>

              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-[#888888] border"></div>
                <span className="flex-shrink-0 px-4 text-xs text-[#888888]">
                  Or continue with
                </span>
                <div className="flex-grow h-px bg-[#888888] border"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center gap-3 justify-center py-4 border border-[#150D5E] rounded-lg transition-colors"
                >
                  <img src={google} alt="google" className="w-5 h-5" />
                  <span className="leading-6 text-[#150D5E]">Google</span>
                </button>

                <button
                  type="button"
                  className="flex items-center gap-3 justify-center py-4 border border-[#150D5E] rounded-lg transition-colors"
                >
                  <img src={apple} alt="apple" className="w-5 h-5" />
                  <span className="leading-6 text-[#150D5E]">Apple</span>
                </button>
              </div>

              <p className="text-center text-sm leading-5 text-[#454545] mt-8">
                Have an existing account?{" "}
                <Link to="/doctor-signin">
                  <span className="text-[#150D5E] leading-5 hover:underline">
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
