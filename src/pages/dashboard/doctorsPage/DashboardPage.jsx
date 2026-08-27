import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Users,
  Activity,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Edit3,
  Copy,
  ArrowDown,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";
import sarah from "../../../assets/sarah.svg";
import doctor from "../../../assets/image.svg";

export default function DocDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#3d3d3d]">
          Patient Statistic
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Patients</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Users className="w-4 h-4" fill="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">
            230
            <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold text-sm mr-1">15%</span>
            <span className="text-sm">from last week</span>
          </div>
            </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Treatment</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity className="w-4 h-4" fill="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">
            230
          <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1 rounded-full bg-#D5D9FF" />
            <span className="font-semibold text-sm mr-1">15%</span>
            <span className="text-sm">rise from last week</span>
          </div>
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Appointments Scheduled</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <CalendarDays className="w-4 h-4" fill="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">
            230
          <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold text-sm mr-1">25%</span>
            <span className="text-sm">Attended Appointments</span>
          </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <div className="border border-[#e7e7e7] p-6 bg-white">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[#464646]">Today Appointment</h3>
              <button className="text-[#464646]">View All</button>
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between pb-4 border-b border-[#eef0f6] last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={sarah}
                      alt="Sarah"
                      className="w-[46px] h-[46px] rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h4 className="font-medium text-[#3d3d3d] leading-tight text-sm">
                        Sarah John
                      </h4>
                      <p className="text-xs text-[#888888] mt-0.5">Female</p>
                      <p className="text-[10px] text-[#454545] mt-0.5">02:00 PM</p>
                    </div>
                  </div>
                  <button className="bg-[#150d5e] text-white px-6 py-2.5 rounded-md font-medium hover:bg-[#1a1a4b]/90 transition-colors">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#e7e7e7] p-6 bg-white">
            <h3 className="text-[#464646] mb-6">Appointment Request</h3>

            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between pb-4 border-b border-[#eef0f6] last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={sarah}
                      alt="Sarah"
                      className="w-[46px] h-[46px] rounded-full object-cover bg-gray-100"
                    />
                    <div>
                      <h4 className="font-medium text-[#3d3d3d] leading-tight text-sm">
                        Sarah John
                      </h4>
                      <p className="text-xs text-[#888888] mt-0.5">Consultation</p>
                      <p className="text-[10px] text-[#888888] mt-0.5">26 February, 10:00 AM</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex gap-2.5">
                      <button className="text-[#331eb9] rounded-full w-7 h-7 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button className="text-[#e5334b] rounded-full w-7 h-7 flex items-center justify-center">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="text-[10px] text-[#331eb9] underline">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="border border-[#eef0f6] rounded-2xl p-6 bg-white">
            <div className="flex border-b border-[#eef0f6] mb-6 gap-8">
              {["All", "Completed Test", "Pending Test"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().split(" ")[0])}
                  className={`pb-4 text-[14px] font-medium relative ${
                    activeTab === tab.toLowerCase().split(" ")[0]
                      ? "text-[#1a1a4b]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase().split(" ")[0] && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a4b]" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-xl p-5 border border-[#eef0f6]">
                  <h4 className="text-[#454545] text-sm mb-1">Full Blood Count Test (FBC)</h4>
                  <div className="flex justify-between flex-wrap gap-2 mb-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#464646] mb-0.5">Sarah John</span>
                      <span className="text-sm text-[#36833f] font-medium">Completed</span>
                    </div>
                    <div className="flex items-end">
                      <span className="text-xs text-[#888888]">Oct 12, 2025 11AM</span>
                    </div>
                  </div>
                  <button className="bg-[#150d5e] text-[#fcfcfc] flex py-2.5 px-12 mx-auto rounded-xl text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors mt-2">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#e7e7e7] p-4 bg-white flex flex-col overflow-hidden h-[370px]">
            <div className="py-4 border-b border-[#eef0f6] flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[#1a1a4b]">AI Padi</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img src={doctor} alt="You" className="w-[30px] h-[30px] rounded-full object-cover" />
                    <span className="font-medium text-[#1a1a4b] text-[14px]">You</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit3 className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <p className="text-[13px] text-gray-500 pl-[42px]">
                  How can brain cause problems if not manage properly?
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-[15px] h-[15px]" />
                    </div>
                    <span className="font-medium text-[#1a1a4b] text-[14px]">AI Padi</span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <p className="text-[13px] text-gray-500 pl-[42px] leading-relaxed">
                  Brain problems can manifest in various ways, and symptoms may include headaches,
                  memory issues, changes in mood or behavior, difficulty concentrating, or physical
                  coordination problems...
                </p>
                <div className="flex justify-center mt-6">
                  <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#eef0f6] bg-white">
              <div className="flex items-center gap-3 p-1 rounded-full border border-gray-200 bg-white">
                <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-gray-500 hover:text-[#1a1a4b] bg-[#f8f9fc] rounded-full transition-colors ml-0.5">
                  <Plus className="w-[22px] h-[22px]" />
                </button>
                <input
                  type="text"
                  placeholder="Type your question"
                  className="flex-1 bg-transparent border-none focus:outline-none text-[14px] px-2"
                />
                <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[#1a1a4b] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors mr-0.5">
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}