import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Upload, Loader2 } from "lucide-react";
import { createProfile, uploadProfilePicture } from "../../../api/auth.api";
import doctor from "../../../assets/doctor.png";
import logo from "../../../assets/mediclogo.svg";

export default function LaboratoryProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    location: "",
    yearsOfService: "",
    awards: "",
    aboutCompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const res = await uploadProfilePicture(file);
      if (res) {
        const uploadedUrl =
          res.url ||
          res.imageUrl ||
          res.profilePicture?.url ||
          res.data?.url ||
          objectUrl;
        setPreview(uploadedUrl);
      }
    } catch (err) {
      console.warn("API image upload warning:", err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userEmail = localStorage.getItem("userEmail") || "";
      const userPhone = localStorage.getItem("userPhone") || "";
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId) {
        throw new Error("User ID not found. Please sign in again.");
      }

      if (!token) {
        throw new Error(
          "Authentication token not found. Please sign in again.",
        );
      }

      const profilePayload = {
        ...formData,
        user_id: userId,
        email: userEmail,
        phoneNumber: userPhone,
        name: formData.companyName,
        avatarSrc: preview || "",
      };

      console.log("PROFILE PAYLOAD:", profilePayload);

      // Create/update profile on the backend
      const response = await createProfile(profilePayload);

      console.log("PROFILE CREATED:", response);

      // Save locally only after the API request succeeds
      localStorage.setItem(
        `labProfile_${userId}`,
        JSON.stringify(profilePayload),
      );

      // Tell other components (header/dashboard) that the profile changed
      window.dispatchEvent(new Event("profileUpdate"));

      // Go to dashboard
      navigate("/labdashboard");
    } catch (err) {
      console.error("Profile creation failed:", err);

      setError(err?.message || "Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-3 sm:p-6 lg:p-8 bg-[#E6E2F2] flex items-center justify-center">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden font-sans min-h-[520px]">
        <div className="hidden lg:flex flex-col w-1/2 p-8 sm:p-12 relative overflow-hidden items-center justify-center bg-[#fcfcfd]">
          <div className="absolute top-8 left-8">
            <img
              src={logo}
              alt="MedicPadi Logo"
              className="h-9 object-contain"
            />
          </div>
          <img
            src={doctor}
            alt="Doctor"
            className="object-contain max-h-[460px]"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-10">
          <div className="w-full max-w-[500px] bg-white rounded-2xl p-6 sm:p-8 border border-[#B0B0B0] shadow-sm my-auto">
            <div className="text-center mb-6">
              <h1 className="text-xl sm:text-2xl font-medium leading-8 text-[#121212] mb-1">
                Laboratory Information
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                Please input the laboratory information below
              </p>
            </div>

            {error && (
              <div className="mb-4 text-xs sm:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div
                onClick={handleImageClick}
                className="border-2 border-dashed border-[#E7E7E7] rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Company Logo Preview"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-2"
                  />
                ) : (
                  <Upload className="w-5 h-5 text-[#888888] mb-1.5" />
                )}
                <p className="text-xs text-[#888888] mb-0.5 font-medium">
                  {preview
                    ? "Change company image"
                    : "Upload your company image"}
                </p>
                <p className="text-[10px] text-[#A0A0A0]">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Olivex laboratory center"
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  placeholder="No 12, Siju street, off Adetona street, Ikeja, Lagos State"
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Ikeja, Lagos"
                  className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-1">
                    Years of Service
                  </label>
                  <input
                    type="text"
                    name="yearsOfService"
                    value={formData.yearsOfService}
                    onChange={handleChange}
                    placeholder="12 Years"
                    className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-1">
                    Awards
                  </label>
                  <input
                    type="text"
                    name="awards"
                    value={formData.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="w-full px-4 py-3 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#121212] mb-0.5">
                  About Company
                </label>
                <p className="text-[10px] text-[#888888] mb-1">
                  Write a detail information about your laboratory
                </p>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleChange}
                  placeholder="Enter a description..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-[#E7E7E7] focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center bg-[#150D5E] text-white font-medium text-sm py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] mt-3 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
