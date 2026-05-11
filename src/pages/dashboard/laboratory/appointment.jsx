import { useState } from "react";
import LabLayout from "../../../components/layout/LabLayout";
import { Calendar, Clock, FileText, Download } from "lucide-react";
import sarah from "../../../assets/sarah.svg";

export default function LabAppointment() {
  const [activeTab, setActiveTab] = useState("Upcoming Appointment");

  const appointments = [
    { type: "Test", name: "FBC", status: "Accepted" },
    { type: "Test", name: "FBC", status: "Accepted" },
    { type: "Scan", name: "MRI", status: "Accepted" },
    { type: "Test", name: "FBC", status: "Accepted" },
    { type: "Scan", name: "MRI", status: "Accepted" },
    { type: "Test", name: "FBC", status: "Accepted" },
    { type: "Doctor", name: "FBC", status: "" },
  ];

  return (
    <LabLayout>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1300px] mx-auto">
        {/* Left Column: Appointments List */}
        <div className="flex-[1.8] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-[#e7e7e7] mb-8">
            {["Upcoming Appointment", "Past Appointment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-6 sm:px-12 text-[15px] sm:text-[16px] font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-[#150d5e]"
                    : "text-[#888888] hover:text-[#464646]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#150d5e]" />
                )}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="flex flex-col gap-5">
            {appointments.map((apt, idx) => (
              <div
                key={idx}
                className="bg-[#fcfdfd] border border-[#f0f2f5] rounded-xl p-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
              >
                <div className="flex flex-col w-[120px] shrink-0">
                  <span className="font-semibold text-[#454545] text-[14px] leading-tight mb-1">
                    01 July, 2025
                  </span>
                  <span className="text-[#888888] text-[13px]">09:00 AM</span>
                </div>

                <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                <div className="flex flex-col w-[80px] shrink-0">
                  <span className="text-[#888888] text-[13px] mb-1">Type</span>
                  <span className="text-[#331eb9] font-medium text-[14px]">
                    {apt.type}
                  </span>
                </div>

                <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                <div className="flex flex-col w-[80px] shrink-0">
                  <span className="text-[#888888] text-[13px] mb-1">Name</span>
                  <span className="text-[#331eb9] font-medium text-[14px]">
                    {apt.name}
                  </span>
                </div>

                <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                <div className="flex flex-col w-[80px] shrink-0">
                  <span className="text-[#888888] text-[13px] mb-1">Status</span>
                  <span className="text-[#331eb9] font-medium text-[14px]">
                    {apt.status}
                  </span>
                </div>

                <div className="w-full lg:w-auto mt-2 lg:mt-0 flex justify-end">
                  <button className="bg-[#150d5e] text-white py-2.5 px-8 rounded-lg text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors w-full lg:w-auto">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Appointment Details */}
        <div className="flex-1 flex flex-col shrink-0 min-w-[320px]">
          <h3 className="text-[#454545] font-medium text-[15px] mb-8 mt-2">
            Appointment Details
          </h3>

          {/* Details Card */}
          <div className="border border-[#e7e7e7] rounded-xl overflow-hidden bg-white mb-8 pb-6">
            <div className="bg-[#ececff] p-6 lg:p-8 flex items-center relative overflow-hidden h-[160px]">
              {/* Decorative shapes resembling ticket */}
              <div className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-[#150d5e]" />
              <div className="absolute top-4 -left-[14px] w-6 h-6 rounded-full bg-white" />
              <div className="absolute bottom-8 -right-4 w-8 h-8 rounded-full bg-[#150d5e]" />
               
              {/* Left Image Section */}
              <div className="shrink-0 mr-6 z-10 relative">
                <img
                  src={sarah}
                  alt="Sarah"
                  className="w-24 h-24 rounded-full object-cover border-[3px] border-white shadow-sm bg-gray-100"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col z-10 w-full relative">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col">
                    <h4 className="text-[#150d5e] text-xl font-bold mt-1">
                      Sarah John
                    </h4>
                    <p className="text-[#454545] text-[12px] font-medium mt-1 mb-4">
                      Booked for consultation
                    </p>
                  </div>
                  <span className="border border-[#2e883e] text-[#2e883e] bg-white px-3 py-1 rounded-md text-[11px] font-semibold mt-1">
                    Confirmed
                  </span>
                </div>

                <div className="flex items-center gap-8 mt-1">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-[#888888]" />
                    <div className="flex flex-col leading-tight gap-0.5">
                      <span className="text-[#454545] text-[11px] font-semibold">
                        Date
                      </span>
                      <span className="text-[#888888] text-[10px]">
                        Monday, 18 Nov
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#888888]" />
                    <div className="flex flex-col leading-tight gap-0.5">
                      <span className="text-[#454545] text-[11px] font-semibold">
                        Time
                      </span>
                      <span className="text-[#888888] text-[10px]">
                        4pm - 4:30pm
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6 px-6">
              <button className="flex-[0.45] border border-[#150d5e] text-[#150d5e] py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#f8f9fc] transition-colors">
                View Profile
              </button>
              <button className="flex-1 bg-[#f3f4ff] text-[#b0b0cc] py-2.5 rounded-lg text-[13px] font-semibold cursor-not-allowed border border-transparent">
                Accept
              </button>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="mb-8">
            <h4 className="text-[#454545] font-semibold text-[14px] mb-3">
              Appointment Summary
            </h4>
            <p className="text-[#888888] text-[13px] leading-[1.6]">
              Patient has been experiencing intense headaches for a few weeks,
              accompanied by nausea and light sensitivity. Ibuprofen provides
              temporary relief but triggers are unclear. Patient has scheduled a
              virtual appointment for further discussion.
            </p>
          </div>

          {/* Uploaded Report */}
          <div className="flex flex-col">
            <h4 className="text-[#454545] font-semibold text-[14px] mb-4">
              Uploaded Report
            </h4>
            <div className="flex flex-col gap-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="border border-[#e7e7e7] rounded-lg p-3.5 flex items-center justify-between bg-white hover:bg-[#fcfdfd] transition-colors cursor-pointer shadow-sm shadow-[#00000004]"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-[18px] h-[18px] text-[#888888]" strokeWidth={2.5} />
                    <span className="text-[#888888] text-[13px] font-medium">
                      Sugar Level Test Report.pdf
                    </span>
                  </div>
                  <Download className="w-[18px] h-[18px] text-[#150d5e]" strokeWidth={2.5} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LabLayout>
  );
}
