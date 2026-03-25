import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../../../api/auth.api";
import google from "../../../assets/google.svg";
import pharmacy from "../../../assets/pharmacy.png";
import apple from "../../../assets/apple.svg";

export default function PharmacySignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    terms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const navigate = useNavigate();

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
    if (!formData.terms) {
      setError("Please agree to the Terms and Privacy Policy.");
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

      // navigate("/doctor-dashboard");
    } catch (err) {
      console.error("Login failed", err);
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex min-h-screen bg-white font-sans">
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative overflow-hidden items-center justify-center">
          <img src={pharmacy} alt="Pharmacy" className="object-contain" />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[490px] bg-white rounded-2xl p-8 sm:p-12 border border-[#B0B0B0]">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium leading-8 text-[#121212] mb-2">
                Welcome Back
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                Log in today and enjoy seamless operations
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  Password
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
                    placeholder="Type in your password"
                    className="w-full text-[#B0B0B0] leading-6 pl-11 pr-12 py-3.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#D1D1D1] hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-[#989898] leading-4 mt-1.5">
                  This is a hint to help the user
                </p>
              </div>

              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-indigo-900 focus:ring-indigo-900"
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm leading-5 text-[#454545]"
                >
                  I agree with{" "}
                  <a href="#" className="text-[#331EB9] hover:underline">
                    Terms, Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-[#150D5E] text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A1A5A] disabled:opacity-70 disabled:cursor-not-allowed"
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

              <div className="flex justify-end">
                <Link to="/pharmacy-forgot-password">
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
                Don't have an existing account?{" "}
                <Link to="/pharmacy-signup">
                  <span className="text-[#150D5E] leading-5 hover:underline">
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
