import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Upload, ChevronDown, ChevronUp, Loader2, User } from "lucide-react";
import {
  retrieveProfile,
  updateProfile,
  createProfile,
  uploadProfilePicture,
} from "../../../api/auth.api";

export default function LabProfile() {
  const fileInputRef = useRef(null);
  const [openDay, setOpenDay] = useState("Monday");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    companyAddress: "",
    location: "",
    email: "",
    phoneNumber: "",
    yearsOfService: "",
    awards: "",
    aboutCompany: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userEmail = localStorage.getItem("userEmail") || "";
    const userPhone = localStorage.getItem("userPhone") || "";

    // Load local storage first for speed and consistency
    const saved = localStorage.getItem(`labProfile_${userId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setForm((prev) => ({
          ...prev,
          companyName: parsed.companyName || parsed.name || "",
          companyAddress: parsed.companyAddress || parsed.address || "",
          location: parsed.location || "",
          email: parsed.email || userEmail || "",
          phoneNumber: parsed.phoneNumber || parsed.phone || userPhone || "",
          yearsOfService: parsed.yearsOfService || parsed.experience || "",
          awards: parsed.awards || "",
          aboutCompany: parsed.aboutCompany || parsed.about || "",
        }));
        if (parsed.avatarSrc) setPreview(parsed.avatarSrc);
      } catch (e) {
        console.error("Error reading saved lab profile", e);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        ...(userEmail && { email: userEmail }),
        ...(userPhone && { phoneNumber: userPhone }),
      }));
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    retrieveProfile()
      .then((data) => {
        if (data) {
          setForm((prev) => ({
            companyName: data.companyName || data.name || prev.companyName,
            companyAddress:
              data.companyAddress || data.address || prev.companyAddress,
            location: data.location || prev.location,
            email: data.email || prev.email || userEmail,
            phoneNumber:
              data.phoneNumber || data.phone || prev.phoneNumber || userPhone,
            yearsOfService:
              data.yearsOfService || data.experience || prev.yearsOfService,
            awards: data.awards || prev.awards,
            aboutCompany: data.aboutCompany || data.about || prev.aboutCompany,
          }));
          if (data.profilePicture?.url) setPreview(data.profilePicture.url);
        }
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setLoading(true);

    let finalUrl = objectUrl;

    try {
      const res = await uploadProfilePicture(file);
      if (res) {
        finalUrl =
          res.url ||
          res.imageUrl ||
          res.profilePicture?.url ||
          res.data?.url ||
          objectUrl;
        setPreview(finalUrl);
      }
      setSuccess("Profile picture uploaded!");
    } catch (err) {
      console.warn("API image upload warning:", err.message);
    } finally {
      // Persist in local storage & update layout header
      const saved = localStorage.getItem("labProfile");
      const existing = saved ? JSON.parse(saved) : {};
      const updated = { ...existing, ...form, avatarSrc: finalUrl };
      localStorage.setItem("labProfile", JSON.stringify(updated));
      window.dispatchEvent(new Event("profileUpdate"));
      setLoading(false);
    }
  };

  const handleSaveInformation = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const userEmail = localStorage.getItem("userEmail") || "";
    const userPhone = localStorage.getItem("userPhone") || "";
    const effectivePhone = form.phoneNumber || userPhone;
    const effectiveEmail = form.email || userEmail;

    if (effectivePhone) localStorage.setItem("userPhone", effectivePhone);
    if (effectiveEmail) localStorage.setItem("userEmail", effectiveEmail);

    const updatedProfile = {
      ...form,
      email: effectiveEmail,
      phoneNumber: effectivePhone,
      name: form.companyName,
      avatarSrc: preview,
    };

    localStorage.setItem("labProfile", JSON.stringify(updatedProfile));
    window.dispatchEvent(new Event("profileUpdate"));

    try {
      const token = localStorage.getItem("token");
      if (token) {
        await updateProfile(updatedProfile).catch(() =>
          createProfile(updatedProfile),
        );
      }
      setSuccess("Profile information saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save profile information.");
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "6 PM",
    "7 PM",
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 w-full max-w-[1240px] mx-auto">
        {error && (
          <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-50 text-green-700 text-sm rounded-xl border border-green-200">
            {success}
          </div>
        )}

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-4 sm:gap-6">
          {/* Profile Overview Card */}
          <div className="border border-[#e7e7e7] rounded-xl p-4 sm:p-6 bg-white flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col items-center shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover bg-gray-100 border border-[#e7e7e7] mb-2 sm:mb-3"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f0f2f8] border border-[#e7e7e7] mb-2 sm:mb-3 flex items-center justify-center text-[#9a9db0]">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
                </div>
              )}
              <h2 className="text-[#3d3d3d] text-base sm:text-lg font-medium text-center">
                {form.companyName || "Olivex Lab"}
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 bg-[#f7f7fb] rounded-xl border border-[#e7e7e7] w-full p-3 sm:p-4 text-center">
              <div className="flex flex-col items-center p-1 sm:p-2 border-r sm:border-r border-b sm:border-b-0 border-[#e7e7e7]">
                <span className="text-[#888888] text-xs mb-1">Location</span>
                <span className="text-[#331eb9] font-semibold text-xs sm:text-sm truncate w-full">
                  {form.location || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center p-1 sm:p-2 border-b sm:border-b-0 sm:border-r border-[#e7e7e7]">
                <span className="text-[#888888] text-xs mb-1">Experience</span>
                <span className="text-[#331eb9] font-semibold text-xs sm:text-sm truncate w-full">
                  {form.yearsOfService || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center p-1 sm:p-2 border-r sm:border-r-0 lg:border-r border-[#e7e7e7]">
                <span className="text-[#888888] text-xs mb-1">Awards</span>
                <span className="text-[#331eb9] font-semibold text-xs sm:text-sm truncate w-full">
                  {form.awards || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center p-1 sm:p-2">
                <span className="text-[#888888] text-xs mb-1">Phone Num</span>
                <span className="text-[#331eb9] font-semibold text-xs sm:text-sm truncate w-full">
                  {form.phoneNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Picture Upload Area */}
          <div
            className="border border-[#e7e7e7] border-dashed rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 relative bg-white cursor-pointer hover:bg-gray-50/50 transition-colors"
            onClick={handleImageClick}
            style={{
              backgroundImage:
                "linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5), linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="flex flex-col items-center w-full z-10 bg-white/80 backdrop-blur-sm p-3 sm:p-4 py-4 sm:py-5 rounded-xl text-center">
              <Upload className="w-5 h-5 text-[#888888] mb-1.5" />
              <p className="text-xs sm:text-[13px] text-[#888888] mb-0.5 font-medium">
                {preview
                  ? "Change profile picture"
                  : "Upload your profile picture"}
              </p>
              <p className="text-[10px] text-[#a0a0a0] mb-4">
                or click to browse
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveInformation(e);
                }}
                disabled={loading}
                className="bg-[#150d5e] text-white py-2.5 px-4 sm:px-6 rounded-lg text-xs sm:text-[13px] w-full font-medium hover:bg-[#1a1a4b]/90 transition-colors flex items-center justify-center disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  "Save Information"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Company Information Form */}
          <div className="border border-[#e7e7e7] rounded-xl p-4 sm:p-6 lg:p-8 bg-white">
            <h3 className="text-[#464646] font-medium text-sm sm:text-base mb-4 sm:mb-6">
              Company Information
            </h3>

            <form
              onSubmit={handleSaveInformation}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                  Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Olivex Center"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                  Company Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="E.g Ikeja, Lagos"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  placeholder="No 12, Siju street, Ikeja, Lagos"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="info@olivexlab.com"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1 sm:gap-1.5">
                <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="09012345678"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="yearsOfService"
                    value={form.yearsOfService}
                    onChange={handleChange}
                    placeholder="12 Years"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-xs sm:text-[13px] text-[#888888] font-medium">
                    Awards
                  </label>
                  <input
                    type="text"
                    name="awards"
                    value={form.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5 mt-1 sm:mt-2">
                <label className="text-xs sm:text-[13px] text-[#3d3d3d] font-medium">
                  About Laboratory
                </label>
                <p className="text-[10px] text-[#888888] mb-1.5">
                  Write a brief information about your laboratory
                </p>
                <textarea
                  name="aboutCompany"
                  value={form.aboutCompany}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter a description..."
                  className="bg-white border border-[#e7e7e7] focus:border-[#d0d0d0] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#3d3d3d] outline-none resize-none transition-colors w-full"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#150d5e] text-white py-3 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors flex items-center justify-center disabled:opacity-60 mt-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </form>
          </div>

          {/* Available Appointment */}
          {/* <div className="border border-[#e7e7e7] rounded-xl bg-white flex flex-col overflow-hidden h-full">
            <div className="p-6 pb-4 border-b border-[#e7e7e7]">
              <h3 className="text-[#3d3d3d] font-medium text-center">
                My Available Appointment
              </h3>
            </div>

            <div className="flex flex-1 p-6 gap-6 flex-col sm:flex-row">
              {/* Accordion List 
              <div className="flex-1 flex flex-col gap-3">
                {days.map((day) => (
                  <div
                    key={day}
                    className="border border-[#f0f0f0] rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenDay(openDay === day ? "" : day)}
                      className={`w-full px-4 py-3 flex justify-between items-center text-sm transition-colors ${
                        openDay === day
                          ? "text-[#acacac] bg-white border-b border-[#f0f0f0]"
                          : "text-[#acacac] bg-white hover:bg-gray-50"
                      }`}
                    >
                      {day}
                      {openDay === day ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    {openDay === day && (
                      <div className="p-4 bg-white">
                        <p className="text-[11px] text-[#a0a0a0] mb-3">
                          Select your available time to see your patient
                        </p>
                        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 gap-2 mb-4">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              className="bg-[#f7f7fb] text-[#3d3d3d] text-[11px] font-medium py-2 rounded-md hover:bg-[#e6e2ff] hover:text-[#331eb9] transition-colors"
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <button className="w-full bg-[#150d5e] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors">
                          Done
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right empty container 
              <div className="flex-[0.8] border border-[#e7e7e7] rounded-xl bg-[#fdfdfe] min-h-[300px] hidden sm:block"></div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button className="w-full bg-[#150d5e] text-white py-3 rounded-lg font-medium text-[15px] hover:bg-[#1a1a4b]/90 transition-colors">
                Save Appointment
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
}
