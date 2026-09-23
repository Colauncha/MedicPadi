import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Upload, ChevronDown, ChevronUp, Loader2, User } from "lucide-react";
import { retrieveProfile, updateProfile, createProfile, uploadProfilePicture } from "../../../api/auth.api";

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
    const userEmail = localStorage.getItem("userEmail") || "";
    const userPhone = localStorage.getItem("userPhone") || "";

    // Load local storage first for speed and consistency
    const saved = localStorage.getItem("labProfile");
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
            companyAddress: data.companyAddress || data.address || prev.companyAddress,
            location: data.location || prev.location,
            email: data.email || prev.email || userEmail,
            phoneNumber: data.phoneNumber || data.phone || prev.phoneNumber || userPhone,
            yearsOfService: data.yearsOfService || data.experience || prev.yearsOfService,
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
        finalUrl = res.url || res.imageUrl || res.profilePicture?.url || res.data?.url || objectUrl;
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
        await updateProfile(updatedProfile).catch(() => createProfile(updatedProfile));
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
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
          {/* Profile Overview Card */}
          <div className="border border-[#e7e7e7] rounded-xl p-6 bg-white flex flex-col sm:flex-row items-center sm:justify-between gap-6">
            <div className="flex flex-col items-center shrink-0">
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover bg-gray-100 border border-[#e7e7e7] mb-3"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#f0f2f8] border border-[#e7e7e7] mb-3 flex items-center justify-center text-[#9a9db0]">
                  <User className="w-12 h-12 stroke-[1.5]" />
                </div>
              )}
              <h2 className="text-[#3d3d3d] text-lg font-medium">
                {form.companyName || "Olivex Lab"}
              </h2>
            </div>

            <div className="flex bg-[#f7f7fb] rounded-xl divide-x divide-[#e7e7e7] border border-[#e7e7e7] w-full py-4 text-center">
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Location
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm truncate max-w-[100px]">
                  {form.location || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Experience
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  {form.yearsOfService || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Awards
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  {form.awards || "N/A"}
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Phone Num
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm truncate max-w-[110px]">
                  {form.phoneNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Picture Upload Area */}
          <div
            className="border border-[#e7e7e7] border-dashed rounded-xl flex flex-col items-center justify-center p-6 relative bg-white cursor-pointer"
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
            <div className="flex flex-col items-center w-full z-10 bg-white/80 backdrop-blur-sm p-4 py-5 rounded-xl">
              <Upload className="w-5 h-5 text-[#888888] mb-2" />
              <p className="text-[13px] text-[#888888] mb-0.5">
                {preview ? "Change profile picture" : "Upload your profile picture"}
              </p>
              <p className="text-[11px] text-[#a0a0a0] mb-5">
                or click to browse
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveInformation(e);
                }}
                disabled={loading}
                className="bg-[#150d5e] text-white py-2.5 px-6 rounded-lg text-[13px] w-full font-medium hover:bg-[#1a1a4b]/90 transition-colors flex items-center justify-center disabled:opacity-60"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information Form */}
          <div className="border border-[#e7e7e7] rounded-xl p-6 lg:p-8 bg-white">
            <h3 className="text-[#464646] font-medium mb-6">
              Company Information
            </h3>

            <form onSubmit={handleSaveInformation} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Olivex Center"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Company Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="E.g Ikeja, Lagos"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  value={form.companyAddress}
                  onChange={handleChange}
                  placeholder="No 12, Siju street, Ikeja, Lagos"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="info@olivexlab.com"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  placeholder="09012345678"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-[#888888]">Experience</label>
                  <input
                    type="text"
                    name="yearsOfService"
                    value={form.yearsOfService}
                    onChange={handleChange}
                    placeholder="12 Years"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-[#888888]">Awards</label>
                  <input
                    type="text"
                    name="awards"
                    value={form.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5 mt-2">
                <label className="text-[13px] text-[#3d3d3d] font-medium">
                  About Laboratory
                </label>
                <p className="text-[11px] text-[#888888] mb-2">
                  Write a brief information about your laboratory
                </p>
                <textarea
                  name="aboutCompany"
                  value={form.aboutCompany}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter a description..."
                  className="bg-white border border-[#e7e7e7] focus:border-[#d0d0d0] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none resize-none transition-colors w-full"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#150d5e] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors flex items-center justify-center disabled:opacity-60 mt-2"
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
          <div className="border border-[#e7e7e7] rounded-xl bg-white flex flex-col overflow-hidden h-full">
            <div className="p-6 pb-4 border-b border-[#e7e7e7]">
              <h3 className="text-[#3d3d3d] font-medium text-center">
                My Available Appointment
              </h3>
            </div>

            <div className="flex flex-1 p-6 gap-6 flex-col sm:flex-row">
              {/* Accordion List */}
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

              {/* Right empty container */}
              <div className="flex-[0.8] border border-[#e7e7e7] rounded-xl bg-[#fdfdfe] min-h-[300px] hidden sm:block"></div>
            </div>

            <div className="p-6 pt-0 mt-auto">
              <button className="w-full bg-[#150d5e] text-white py-3 rounded-lg font-medium text-[15px] hover:bg-[#1a1a4b]/90 transition-colors">
                Save Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

