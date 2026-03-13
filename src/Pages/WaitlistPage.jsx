import React, { useState } from "react";
import waitlistLogo from "../assets/images/WaitlistLogo.png";
import waitlistDoc from "../assets/images/WaitlistDoc.png";
import doctorImg from "../assets/images/Doctor.png";
import pharmacistImg from "../assets/images/Pharmacist.png";
import laboratoryImg from "../assets/images/Laboratory.png";
import patientImg from "../assets/images/Patient.png";

/* ─── Static Data ─────────────────────────────────────────── */

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT – Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const ROLES = [
  { label: "Doctor",     image: doctorImg },
  { label: "Pharmacist", image: pharmacistImg },
  { label: "Laboratory", image: laboratoryImg },
  { label: "Patient",    image: patientImg },
];

const FEATURES_LEFT = [
  "Seamless communication between all healthcare stakeholders",
  "Secure and health insurance profitability and accountability (HIPAA) compliant platform",
  "Integrated appointment scheduling",
];

const FEATURES_RIGHT = [
  "Digital health records accessible anytime, anywhere",
  "Real-time prescription and lab order tracking",
  "Reduce paperwork and administrative burden",
];

/* ─── Input Field Component ───────────────────────────────── */

const InputField = ({ label, error, children }) => (
  <div className="w-full flex flex-col rounded-[8px] border border-gray-200 py-[8px] px-[16px]">
    <label className="font-roboto font-normal text-sm text-gray-500 mb-1">
      {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

/* ─── Main Component ──────────────────────────────────────── */

const WaitlistPage = () => {
  const [role, setRole]           = useState("");
  const [form, setForm]           = useState({ name: "", email: "", phone: "", address: "", state: "" });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!role)              e.role  = "Please select your role";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setApiError("");

    try {
      const response = await fetch("https://api.medicpadi.com/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:       form.email,
          password:    "waitlist123",      
          role:        role.toLowerCase(),  // "doctor" | "pharmacist" | "laboratory" | "patient"
          phoneNumber: form.phone,
          isVerified:  false,
          createdAt:   new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        setApiError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md w-full text-center">
          <h2 className="font-roboto font-medium text-2xl text-gray-800 mb-3">
            You're on the list!
          </h2>
          <p className="font-roboto font-normal text-gray-500 leading-relaxed">
            Thanks for joining the Medicpadi waitlist. We'll notify you as soon as we launch.
          </p>
        </div>
      </div>
    );
  }

  /* ── Main Page ── */
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── HERO SECTION ── */}
        <div className="pt-[80px] flex flex-col items-center text-center">

          {/* Logo */}
          <img
            src={waitlistLogo}
            alt="Medicpadi logo"
            className="w-[418px] h-[95px] object-contain mb-6 opacity-100"
          />

          {/* Heading */}
          <h1 className="font-roboto font-medium text-[40px] leading-[56px] tracking-normal text-center text-gray-800 max-w-3xl">
            The all-in-one healthcare platform connecting doctors, patients,
            pharmacies and laboratories
          </h1>

          {/* Subtext */}
          <p className="font-roboto font-normal text-[28px] leading-[40px] tracking-normal text-center mt-4 text-gray-500 max-w-2xl">
            Join the waitlist and be among the first to experience seamless
            healthcare coordination
          </p>

          {/* Banner Image */}
          <img
            src={waitlistDoc}
            alt="Healthcare professionals"
            className="mt-10 w-full max-w-[1152px] h-[432px] rounded-2xl object-cover opacity-100"
          />
        </div>

        {/* ── WHY CHOOSE SECTION ── */}
        <div
          className="max-w-[1152px] mx-auto mt-20 py-[40px] px-[24px] rounded-[8px]"
          style={{
            background: "#F7F7FB",
            boxShadow: "0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026",
          }}
        >
          <h2 className="font-roboto font-medium text-[40px] leading-[56px] tracking-normal text-center mb-10 text-gray-800">
            Why Choose Medicpadi?
          </h2>

          <div className="flex flex-col md:flex-row gap-[40px] text-gray-600 max-w-[1104px] mx-auto">

            {/* Left Features */}
            <div className="flex-1 flex flex-col gap-4">
              {FEATURES_LEFT.map((f) => (
                <p key={f} className="font-roboto font-normal text-base flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: "#150D5E" }}>✔</span>
                  {f}
                </p>
              ))}
            </div>

            {/* Right Features */}
            <div className="flex-1 flex flex-col gap-4">
              {FEATURES_RIGHT.map((f) => (
                <p key={f} className="font-roboto font-normal text-base flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: "#150D5E" }}>✔</span>
                  {f}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* ── WAITLIST SECTION ── */}
        <div
          className="max-w-[966px] mx-auto mt-20 mb-20 py-[40px] px-[32px] flex flex-col gap-[40px] rounded-[8px]"
          style={{
            background: "#F7F7FB",
            boxShadow: "0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026",
          }}
        >
          {/* Section Heading */}
          <h2 className="font-roboto font-medium text-[40px] leading-[56px] tracking-normal text-center text-gray-800">
            Join the Waitlist
          </h2>

          {/* Section Subtitle */}
          <p className="font-roboto font-normal text-[20px] leading-[24px] tracking-normal text-center text-gray-500 mx-auto opacity-100">
            Be the first to know when we launch
          </p>

          {/* Form + Roles Wrapper */}
          <div className="flex flex-col gap-[24px]">

            {/* ── FORM FIELDS ── */}
            <div className="flex flex-col gap-[40px]">

              <InputField label="Name" error={errors.name}>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={update("name")}
                  className="w-full h-[48px] rounded-[8px] py-[12px] px-[8px] outline-none"
                  style={{ background: "#F6F6F6" }}
                />
              </InputField>

              <InputField label="Email Address" error={errors.email}>
                <input
                  type="email"
                  placeholder="your email@example.com"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full h-[48px] rounded-[8px] py-[12px] px-[8px] outline-none"
                  style={{ background: "#F6F6F6" }}
                />
              </InputField>

              <InputField label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  placeholder="e.g 08012345678"
                  value={form.phone}
                  onChange={update("phone")}
                  className="w-full h-[48px] rounded-[8px] py-[12px] px-[8px] outline-none"
                  style={{ background: "#F6F6F6" }}
                />
              </InputField>

              <InputField label="Address (Optional)">
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={form.address}
                  onChange={update("address")}
                  className="w-full h-[48px] rounded-[8px] py-[12px] px-[8px] outline-none"
                  style={{ background: "#F6F6F6" }}
                />
              </InputField>

              <InputField label="State (Optional)">
                <select
                  value={form.state}
                  onChange={update("state")}
                  className="w-full h-[48px] rounded-[8px] py-[12px] px-[8px] outline-none"
                  style={{
                    background: "#F6F6F6",
                    color: form.state ? "#1f2937" : "#9ca3af",
                  }}
                >
                  <option value="">Select your current state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </InputField>

            </div>

            {/* ── ROLE SELECTION ── */}
            <div className="flex flex-col gap-[32px]">

              <p className="font-roboto font-medium text-base text-gray-700">
                I am a ...
              </p>

              <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
                {ROLES.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => setRole(item.label)}
                    className={`cursor-pointer border-2 rounded-xl overflow-hidden transition
                      ${role === item.label
                        ? "border-[#150D5E]"
                        : "border-transparent hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-[200px] object-cover"
                    />
                  </div>
                ))}
              </div>

              {errors.role && (
                <p className="text-red-400 text-xs">{errors.role}</p>
              )}

              {/* API Error Message */}
              {apiError && (
                <p className="text-red-400 text-sm text-center font-roboto">
                  {apiError}
                </p>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-[67px] rounded-[8px] p-[16px] text-white font-roboto font-medium text-base transition"
                style={{
                  background: "#150D5E",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Submitting..." : "Join Waitlist"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WaitlistPage;