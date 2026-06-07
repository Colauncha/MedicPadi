import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Upload, ChevronDown, ChevronUp } from "lucide-react";
import doctor from "../../../assets/image.svg";

export default function LabProfile() {
  const [openDay, setOpenDay] = useState("Monday");

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
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_1fr] gap-6">
          {/* Profile Overview Card */}
          <div className="border border-[#e7e7e7] rounded-xl p-6 bg-white flex flex-col sm:flex-row items-center sm:justify-between gap-6">
            <div className="flex flex-col items-center shrink-0">
              <img
                src={doctor}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover bg-gray-100 border border-[#e7e7e7] mb-3"
              />
              <h2 className="text-[#3d3d3d] text-lg font-medium">Olivex Lab</h2>
            </div>

            <div className="flex bg-[#f7f7fb] rounded-xl divide-x divide-[#e7e7e7] border border-[#e7e7e7] w-full py-4 text-center">
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Gender
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  Male
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Experience
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  12 Years
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Department
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  Orthopedic
                </span>
              </div>
              <div className="flex flex-col items-center flex-1 px-2 sm:px-4">
                <span className="text-[#888888] text-xs sm:text-sm mb-1">
                  Phone Num
                </span>
                <span className="text-[#331eb9] font-medium text-xs sm:text-sm">
                  09012345678
                </span>
              </div>
            </div>
          </div>

          {/* Picture Upload Area */}
          <div
            className="border border-[#e7e7e7] border-dashed rounded-xl flex flex-col items-center justify-center p-6 relative bg-white"
            style={{
              backgroundImage:
                "linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5), linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5)",
              backgroundSize: "20px 20px",
              backgroundPosition: "0 0, 10px 10px",
            }}
          >
            <div className="flex flex-col items-center w-full z-10 bg-white/80 backdrop-blur-sm p-4 py-5 rounded-xl">
              <Upload className="w-5 h-5 text-[#888888] mb-2" />
              <p className="text-[13px] text-[#888888] mb-0.5">
                Upload your profile picture
              </p>
              <p className="text-[11px] text-[#a0a0a0] mb-5">
                or click to browse
              </p>
              <button className="bg-[#150d5e] text-white py-2.5 px-6 rounded-lg text-[13px] w-full font-medium hover:bg-[#1a1a4b]/90 transition-colors">
                Save Information
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

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">Name</label>
                <input
                  type="text"
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
                  placeholder="E.g Cardiology"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Sarah John"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#888888]">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Sarah John"
                  className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-[#888888]">Experience</label>
                  <input
                    type="text"
                    placeholder="12 Years"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none transition-colors w-full"
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1">
                  <label className="text-[13px] text-[#888888]">Awards</label>
                  <input
                    type="text"
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
                  rows="4"
                  placeholder="Enter a description..."
                  className="bg-white border border-[#e7e7e7] focus:border-[#d0d0d0] rounded-lg px-4 py-3 text-sm text-[#3d3d3d] outline-none resize-none transition-colors w-full"
                ></textarea>
              </div>
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
