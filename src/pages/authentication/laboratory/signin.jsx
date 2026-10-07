import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../../api/auth.api";
import google from "../../../assets/google.svg";
import doctor from "../../../assets/doctor.png";
import apple from "../../../assets/apple.svg";

export default function LaboratorySignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("Login successful", response);

      // Save email
      localStorage.setItem("userEmail", formData.email);

      // Save token
      localStorage.setItem("token", response?.token.access_token);

      // Get the user ID belonging to THIS account
      const userId = response?.user_id || localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID was not found.");
      }

      // Always update the active user's ID
      localStorage.setItem("userId", userId);

      // IMPORTANT:
      // Each user's profile gets its own localStorage key
      const profileKey = `labProfile_${userId}`;

      const profile = localStorage.getItem(profileKey);

      if (profile) {
        navigate("/labdashboard");
      } else {
        navigate("/laboratory-profile");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-8 bg-[#E6E2F2] flex items-center justify-center">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden font-sans min-h-[520px]">
        <div className="hidden lg:flex flex-col w-1/2 p-8 sm:p-12 relative overflow-hidden items-center justify-center bg-[#fcfcfd]">
          <img
            src={doctor}
            alt="Doctor"
            className="object-contain max-h-[480px]"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-10">
          <div className="w-full max-w-[460px] bg-white rounded-2xl p-6 sm:p-10 border border-[#B0B0B0] shadow-sm">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-xl sm:text-2xl font-medium leading-8 text-[#121212] mb-1.5">
                Welcome Back
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                Log in today and enjoy seamless operations
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs sm:text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
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
                  Password
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
                    placeholder="Type in your password"
                    className="w-full text-sm text-[#3d3d3d] leading-6 pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <Link to="/laboratory-forgot-password">
                  <span className="text-[#150D5E] leading-4 hover:underline text-xs font-medium">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-[#150D5E] text-white font-medium text-sm leading-6 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A5A] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
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
                Don't have an account?{" "}
                <Link to="/laboratory-signup">
                  <span className="text-[#150D5E] font-medium hover:underline">
                    Sign up
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
