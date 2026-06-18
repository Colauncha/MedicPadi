import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "9 AM", "10 AM", "11 AM", "12 PM",
  "1 PM", "2 PM", "3 PM", "4 PM",
  "6 PM", "7 PM",
];

function Profile() {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    phoneNumber: "",
    department: "",
    placeOfWork: "",
    experience: "",
    awards: "",
    email: "",
    about: "",
  });

  const [expandedDay, setExpandedDay] = useState("Monday");
  const [selectedSlots, setSelectedSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
    <DashboardLayout> {/* ✅ FIXED: was using DocLayout alias that was never defined in JSX */}
      <div className="p-6 min-h-screen bg-[#F3F4FF]">
        {/* Doctor Header Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-[#E8EAF6] overflow-hidden flex items-center justify-center border-2 border-[#3B4FA8]">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#3B4FA8">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Dr. Ajayi M.</p>
          </div>

          <div className="flex flex-wrap gap-8 flex-1">
            {[
              { label: "Gender", value: "Male" },
              { label: "Experience", value: "12 Years" },
              { label: "Department", value: "Orthopedic", colored: true },
              { label: "Phone Num", value: "09012345678" },
            ].map(({ label, value, colored }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-gray-400">{label}</span>
                <span className={`text-sm font-medium ${colored ? "text-[#3B4FA8]" : "text-gray-700"}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-end gap-3 ml-auto">
            <div className="flex flex-col items-center text-xs text-gray-400 gap-1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 16V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" strokeLinecap="round" />
              </svg>
              <span>Upload your profile picture</span>
              <span>or click to browse</span>
            </div>
            <button className="bg-[#2E3A8C] text-white text-sm px-6 py-2 rounded-lg hover:bg-[#243074] transition">
              Save information
            </button>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6">
            <h2 className="text-base font-semibold text-[#1a1a2e] mb-5">Personal Information</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Sarah John"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Gender</label>
                  <input
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    placeholder="E.g Male"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Phone Number</label>
                  <input
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="09012345678"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Department</label>
                <input
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="E.g Cardiology"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Place of Work</label>
                <input
                  name="placeOfWork"
                  value={form.placeOfWork}
                  onChange={handleChange}
                  placeholder="Lagos State University Teaching Hospital"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Experience</label>
                  <input
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="12 Years"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1 block">Awards</label>
                  <input
                    name="awards"
                    value={form.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">Email address</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="doctor@medicpadi.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-[#3B4FA8]"
                />
              </div>

              <div>
                <label className="text-xs text-gray-400 mb-1 block">About Yourself</label>
                <p className="text-[11px] text-gray-400 mb-1">Write a brief information about your profile</p>
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

          {/* My Available Appointment */}
          <div className="bg-white rounded-2xl p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-[#1a1a2e]">My Available Appointment</h2>

            <div className="flex flex-col gap-3">
              {DAYS.map((day) => (
                <div key={day} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleDay(day)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition"
                  >
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      className={`transition-transform ${expandedDay === day ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {expandedDay === day && (
                    <div className="px-4 pb-4 bg-white">
                      <p className="text-xs text-gray-400 mb-3">
                        Select your available time to see your patient.
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {TIME_SLOTS.map((slot) => {
                          const isSelected = selectedSlots[day].includes(slot);
                          return (
                            <button
                              key={slot}
                              onClick={() => toggleSlot(day, slot)}
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
                      <button className="mt-4 w-full bg-[#2E3A8C] text-white text-sm py-2 rounded-lg hover:bg-[#243074] transition">
                        Done
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-auto w-full bg-[#2E3A8C] text-white text-sm py-3 rounded-xl hover:bg-[#243074] transition font-medium">
              Save Appointment
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;