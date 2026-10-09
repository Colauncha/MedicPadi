import { useState, useEffect, useRef } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  retrieveProfile,
  updateProfile,
  uploadProfilePicture,
  updateBusinessHours,
} from "../../../api/auth.api";
import { getDoctorSpecialities } from "../../../api/profile.api";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TIME_SLOTS = [
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

function slotTo24h(slot) {
  const [time, period] = slot.split(" ");
  let hour = parseInt(time);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour;
}

function slotsToBusinessHours(slots) {
  if (!slots.length) return null;

  const hours = slots.map(slotTo24h).sort((a, b) => a - b);

  return {
    start: hours[0],
    end: hours[hours.length - 1],
  };
}

function normalizeSpecialities(raw) {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((item) => {
      if (typeof item === "string") {
        return {
          value: item,
          label: item,
        };
      }

      const value =
        item.id ??
        item.value ??
        item.name ??
        item.speciality ??
        String(item);

      const label =
        item.name ??
        item.label ??
        item.speciality ??
        String(item);

      return {
        value,
        label,
      };
    });
  }

  if (typeof raw === "object") {
    return Object.entries(raw).map(([value, label]) => ({
      value,
      label,
    }));
  }

  return [];
}

function Profile() {
  const fileInputRef = useRef(null);

  const [preview, setPreview] = useState(null);

  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);

  const [appointmentError, setAppointmentError] = useState("");
  const [appointmentSuccess, setAppointmentSuccess] = useState("");
  const [appointmentLoading, setAppointmentLoading] = useState(false);

  const [specialities, setSpecialities] = useState([]);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    phoneNumber: "",
    speciality: "",
    email: "",
    about: "",
    placeOfWork: "",
    yearsOfService: "",
    awards: "",
    costPerSession: "",
    sessionLength: "",
  });

  const [expandedDay, setExpandedDay] = useState("Monday");

  const [selectedSlots, setSelectedSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  // Fetch doctor specialities
  useEffect(() => {
    getDoctorSpecialities()
      .then((raw) => {
        console.log("Raw specialities response:", raw);
        setSpecialities(normalizeSpecialities(raw));
      })
      .catch((err) =>
        console.error("Error fetching specialities:", err.message)
      );
  }, []);

  // Fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    retrieveProfile()
      .then((data) => {
        console.log(
          "FULL PROFILE RESPONSE:",
          JSON.stringify(data, null, 2)
        );

        if (!data) return;

        const profile = data.profile || {};
        const account = data.rest || {};

        setForm({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          gender: profile.gender || "",
          phoneNumber: profile.phoneNumber || "",
          speciality: profile.speciality || "",
          email: account.email || "",
          about: profile.bio || "",
          placeOfWork: profile.placeOfWork || "",
          yearsOfService: profile.yearsOfService ?? "",
          awards: profile.awards ?? "",
          costPerSession: profile.costPerSession ?? "",
          sessionLength: profile.sessionLength ?? "",
        });

        const profilePictureUrl =
         data.profilePicture?.url ||
         profile.profilePicture?.url ||
         profile.profilePictureUrl ||
         "";

         if (profilePictureUrl) {
          setPreview(profilePictureUrl);
        }
        
      })
      .catch((err) => {
        console.error("Error retrieving profile:", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setProfileError("");
  setProfileSuccess("");

  // Show the selected image immediately
  const localPreview = URL.createObjectURL(file);
  setPreview(localPreview);

  try {
    const response = await uploadProfilePicture(file);

    console.log("PROFILE PICTURE UPLOAD RESPONSE:", response);

    // Use the permanent URL returned by the backend
    const uploadedUrl = response?.url;

    if (uploadedUrl) {
      setPreview(uploadedUrl);
      setProfileSuccess("Profile picture uploaded successfully!");
    } else {
      setProfileError(
        "Image uploaded, but no image URL was returned."
      );
    }
  } catch (err) {
    setProfileError(
      err.message || "Image upload failed."
    );
  }
};
  const handleSaveProfile = async () => {
    setProfileError("");
    setProfileSuccess("");
    setProfileLoading(true);

    if (!localStorage.getItem("token")) {
      setProfileError("You are not logged in.");
      setProfileLoading(false);
      return;
    }

    const profilePayload = {
      bio: form.about,
      placeOfWork: form.placeOfWork,
      yearsOfService: Number(form.yearsOfService) || 0,
      awards: Number(form.awards) || 0,
      costPerSession: Number(form.costPerSession) || 0,
      sessionLength: Number(form.sessionLength) || 0,
    };

    console.log("PROFILE PAYLOAD:", profilePayload);

    try {
      await updateProfile(profilePayload);

      setProfileSuccess("Profile saved successfully!");
    } catch (err) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSaveAppointment = async () => {
    setAppointmentError("");
    setAppointmentSuccess("");
    setAppointmentLoading(true);

    if (!localStorage.getItem("token")) {
      setAppointmentError("You are not logged in.");
      setAppointmentLoading(false);
      return;
    }

    const payload = {};

    DAYS.forEach((day) => {
      const hours = slotsToBusinessHours(selectedSlots[day]);

      if (hours) {
        payload[day.toLowerCase()] = hours;
      }
    });

    try {
      await updateBusinessHours(payload);

      setAppointmentSuccess("Appointment hours saved!");
    } catch (err) {
      setAppointmentError(
        err.message || "Failed to save appointment."
      );
    } finally {
      setAppointmentLoading(false);
    }
  };

  const toggleSlot = (day, slot) => {
    setSelectedSlots((prev) => {
      const current = prev[day];

      return {
        ...prev,
        [day]: current.includes(slot)
          ? current.filter((s) => s !== slot)
          : [...current, slot],
      };
    });
  };

  const toggleDay = (day) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-[#F3F4FF]">

        {/* ================= PROFILE HEADER ================= */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex flex-wrap items-center gap-6">

          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={handleImageClick}
              className="w-20 h-20 rounded-full bg-[#E8EAF6] overflow-hidden flex items-center justify-center border-2 border-[#3B4FA8] cursor-pointer hover:opacity-80 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="#3B4FA8"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="text-sm font-semibold text-[#1a1a2e]">
              {form.firstName
                ? `Dr. ${form.firstName} ${form.lastName}`
                : "Doctor"}
            </p>
          </div>

          {/* Profile Summary */}
          <div className="flex flex-wrap gap-8 flex-1">
            {[
              {
                label: "Gender",
                value: form.gender || "Not provided",
              },
              {
                label: "Experience",
                value: form.yearsOfService
                  ? `${form.yearsOfService} Years`
                  : "Not provided",
              },
              {
                label: "Phone Num",
                value: form.phoneNumber || "Not provided",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col gap-0.5"
              >
                <span className="text-xs text-gray-400">
                  {label}
                </span>

                <span className="text-sm font-medium text-gray-700">
                  {value}
                </span>
              </div>
            ))}

            {/* Speciality */}
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-gray-400">
                Speciality
              </span>

              <select
                name="speciality"
                value={form.speciality}
                onChange={handleChange}
                className="text-sm font-medium text-[#3B4FA8] bg-transparent border-none p-0 pr-1 focus:outline-none focus:ring-0 cursor-pointer"
              >
                <option value="" disabled>
                  Select speciality
                </option>

                {specialities.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload + Save */}
          <div className="flex flex-col items-end gap-3 ml-auto">

            <div
              onClick={handleImageClick}
              className="flex flex-col items-center text-xs text-gray-400 gap-1 cursor-pointer hover:text-[#3B4FA8] transition"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M12 16V4m0 0L8 8m4-4l4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M4 20h16"
                  strokeLinecap="round"
                />
              </svg>

              <span>Upload your profile picture</span>
              <span>or click to browse</span>
            </div>

            {profileError && (
              <p className="text-xs text-red-500">
                {profileError}
              </p>
            )}

            {profileSuccess && (
              <p className="text-xs text-green-500">
                {profileSuccess}
              </p>
            )}

            <button
              onClick={handleSaveProfile}
              disabled={profileLoading}
              className="bg-[#2E3A8C] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#243074] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {profileLoading
                ? "Saving..."
                : "Save information"}
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ================= PERSONAL INFORMATION ================= */}
          <div className="bg-white rounded-2xl p-6">

            <h2 className="text-base font-semibold text-[#1a1a2e] mb-5">
              Personal Information
            </h2>

            <div className="flex flex-col gap-4">

              {/* First + Last Name */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    First Name
                  </label>

                  <input
                    name="firstName"
                    value={form.firstName}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Last Name
                  </label>

                  <input
                    name="lastName"
                    value={form.lastName}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>

              </div>

              {/* Gender + Phone */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Gender
                  </label>

                  <input
                    name="gender"
                    value={form.gender}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Phone Number
                  </label>

                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    disabled
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                  />
                </div>

              </div>

              {/* Place of Work */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Place of Work
                </label>

                <input
                  name="placeOfWork"
                  value={form.placeOfWork}
                  onChange={handleChange}
                  placeholder="Lagos State University Teaching Hospital"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                />
              </div>

              {/* Experience + Awards */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Years of Service
                  </label>

                  <input
                    name="yearsOfService"
                    value={form.yearsOfService}
                    onChange={handleChange}
                    placeholder="12"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Awards
                  </label>

                  <input
                    name="awards"
                    value={form.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>

              </div>

              {/* Cost + Session Length */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Cost Per Session
                  </label>

                  <input
                    name="costPerSession"
                    value={form.costPerSession}
                    onChange={handleChange}
                    placeholder="e.g. 15000"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 mb-1 block">
                    Session Length (mins)
                  </label>

                  <input
                    name="sessionLength"
                    value={form.sessionLength}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>

              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  Email Address
                </label>

                <input
                  name="email"
                  value={form.email}
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>

              {/* About */}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">
                  About Yourself
                </label>

                <p className="text-[11px] text-gray-400 mb-1">
                  Write a brief information about your profile
                </p>

                <textarea
                  name="about"
                  value={form.about}
                  onChange={handleChange}
                  placeholder="Enter a description..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8] resize-none"
                />
              </div>

            </div>
          </div>

          {/* ================= AVAILABLE APPOINTMENTS ================= */}
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">

            <h2 className="text-base font-semibold text-[#1a1a2e]">
              My Available Appointment
            </h2>

            <div className="flex flex-col gap-3">

              {DAYS.map((day) => (
                <div
                  key={day}
                  className="border border-gray-100 rounded-xl overflow-hidden"
                >

                  {/* Day Header */}
                  <button
                    onClick={() => toggleDay(day)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {day}
                    </span>

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      className={`transition-transform ${
                        expandedDay === day ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Time Slots */}
                  {expandedDay === day && (
                    <div className="px-4 pb-4 bg-white">

                      <p className="text-xs text-gray-400 mb-3">
                        Select your available time to see your patient.
                      </p>

                      <div className="grid grid-cols-4 gap-2">

                        {TIME_SLOTS.map((slot) => {
                          const isSelected =
                            selectedSlots[day].includes(slot);

                          return (
                            <button
                              key={slot}
                              onClick={() =>
                                toggleSlot(day, slot)
                              }
                              className={`py-1.5 rounded-lg text-xs font-medium border transition ${
                                isSelected
                                  ? "bg-[#2E3A8C] text-white border-[#2E3A8C]"
                                  : "bg-white text-gray-600 border-gray-200 hover:border-[#3B4FA8]"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}

                      </div>

                      {/* Done */}
                      <button
                        onClick={() => toggleDay(null)}
                        className="mt-4 w-full bg-[#2E3A8C] text-white text-sm py-2 rounded-lg hover:bg-[#243074] transition"
                      >
                        Done
                      </button>

                    </div>
                  )}

                </div>
              ))}

            </div>

            {/* Appointment Messages */}
            {appointmentError && (
              <p className="text-xs text-red-500">
                {appointmentError}
              </p>
            )}

            {appointmentSuccess && (
              <p className="text-xs text-green-500">
                {appointmentSuccess}
              </p>
            )}

            {/* Save Appointment */}
            <button
              onClick={handleSaveAppointment}
              disabled={appointmentLoading}
              className="mt-auto w-full bg-[#2E3A8C] text-white text-sm py-3 rounded-xl hover:bg-[#243074] transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {appointmentLoading
                ? "Saving..."
                : "Save Appointment"}
            </button>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;