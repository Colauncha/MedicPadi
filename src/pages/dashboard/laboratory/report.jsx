import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Users, Activity, CalendarDays, ArrowUpRight, Upload } from "lucide-react";
import sarah from "../../../assets/sarah.svg";

export default function LabReport() {
  const patientCards = Array(6).fill(0); // For the scrollable list on the left

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-[1300px] mx-auto min-h-0">
        
        {/* Page Title */}
        <div className="mb-1 sm:mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#3d3d3d]">
            Patient Statistic
          </h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#f3f4ff] rounded-2xl p-5 sm:p-6 relative min-h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h3 className="text-[#331eb9] text-sm sm:text-base">Total Patients</h3>
              <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b] shrink-0">
                <Users className="w-4 h-4" color="#331eb9" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#150d5e] mb-2 sm:mb-4">230</div>
            <div className="flex items-center text-xs sm:text-sm text-[#150d5e]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
              <span className="font-semibold mr-1">15%</span>
              <span>from last week</span>
            </div>
          </div>

          <div className="bg-[#f3f4ff] rounded-2xl p-5 sm:p-6 relative min-h-[120px] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h3 className="text-[#331eb9] text-sm sm:text-base">Total Treatment</h3>
              <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b] shrink-0">
                <Activity className="w-4 h-4" color="#331eb9" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#150d5e] mb-2 sm:mb-4">230</div>
            <div className="flex items-center text-xs sm:text-sm text-[#150d5e]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
              <span className="font-semibold mr-1">15%</span>
              <span>rise from last week</span>
            </div>
          </div>

          <div className="bg-[#f3f4ff] rounded-2xl p-5 sm:p-6 relative min-h-[120px] flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <h3 className="text-[#331eb9] text-sm sm:text-base">Appointments Scheduled</h3>
              <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b] shrink-0">
                <CalendarDays className="w-4 h-4" color="#331eb9" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#150d5e] mb-2 sm:mb-4">230</div>
            <div className="flex items-center text-xs sm:text-sm text-[#150d5e]">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
              <span className="font-semibold mr-1">25%</span>
              <span>Attended Appointments</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-6 mt-2 sm:mt-4">
          
          {/* Left Column: Patients List */}
          <div className="flex-[1.2] border border-[#e7e7e7] rounded-2xl bg-[#fdfdfe] p-4 sm:p-6 lg:p-8 flex flex-col min-h-0 relative">
            <h3 className="text-base sm:text-[17px] font-medium text-[#464646] mb-4 sm:mb-6">Patients</h3>
            
            <div className="flex flex-col flex-1 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar max-h-[500px] lg:max-h-none">
              {patientCards.map((_, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:py-5 gap-3 ${index !== 5 ? 'border-b border-[#e7e7e7]' : ''}`}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <img 
                      src={sarah} 
                      alt="Sarah John" 
                      className="w-11 h-11 sm:w-[52px] sm:h-[52px] rounded-full object-cover shrink-0 bg-gray-100" 
                    />
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-[#3d3d3d] text-xs sm:text-[14px]">
                        Sarah John
                      </h4>
                      <p className="text-[11px] sm:text-[12px] text-[#888888] mt-0.5">Female</p>
                      <p className="text-[10px] sm:text-[11px] text-[#888888] mt-0.5">
                        60 years old
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="w-full sm:w-auto bg-[#150d5e] text-[#fcfcfd] py-2 sm:py-2.5 px-5 sm:px-6 rounded-md text-xs sm:text-[13px] font-medium hover:bg-[#1a1a4b]/90 transition-colors shadow-xs cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Upload Form */}
          <div className="flex-1 border border-[#e7e7e7] rounded-2xl bg-white p-4 sm:p-6 lg:p-8 flex flex-col">
            <h3 className="text-base sm:text-[17px] font-medium text-[#464646] mb-6 sm:mb-8 text-center pt-1 sm:pt-2">
              Kindly upload patient test report below
            </h3>
            
            <div
              className="border border-[#e7e7e7] border-dashed rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 relative bg-[#fdfdfe] mb-6 sm:mb-8"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5), linear-gradient(45deg, #f5f5f5 25%, transparent 25%, transparent 75%, #f5f5f5 75%, #f5f5f5)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 10px 10px",
              }}
            >
              <div className="flex flex-col items-center w-full z-10 bg-white/80 backdrop-blur-sm p-4 py-5 sm:py-6 rounded-xl cursor-pointer hover:bg-white/90 transition-all text-center">
                <Upload className="w-5 h-5 text-[#888888] mb-2" />
                <p className="text-xs text-[#888888] mb-0.5 font-medium">
                  Upload your test report document
                </p>
                <p className="text-[10px] text-[#a0a0a0]">
                  or click to browse
                </p>
              </div>
            </div>

            <form className="flex flex-col gap-5 sm:gap-6 flex-1 justify-between">
              <div className="flex flex-col gap-4 sm:gap-5">
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-xs sm:text-[13px] text-[#a0a0a0] font-medium">Test Name</label>
                  <input
                    type="text"
                    placeholder="E.g Sugar level test"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-xl px-4 py-3 text-xs sm:text-[14px] text-[#3d3d3d] outline-none transition-colors w-full placeholder:text-[#c4c4c4]"
                  />
                </div>
                
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-xs sm:text-[13px] text-[#a0a0a0] font-medium">Date of Report</label>
                  <input
                    type="text"
                    placeholder="01/01/2025"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-xl px-4 py-3 text-xs sm:text-[14px] text-[#3d3d3d] outline-none transition-colors w-full placeholder:text-[#c4c4c4]"
                  />
                </div>

                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <label className="text-xs sm:text-[13px] text-[#a0a0a0] font-medium">Scientist Name</label>
                  <input
                    type="text"
                    placeholder="E.g John Doe"
                    className="bg-[#f7f7fb] border border-transparent focus:border-[#e7e7e7] rounded-xl px-4 py-3 text-xs sm:text-[14px] text-[#3d3d3d] outline-none transition-colors w-full placeholder:text-[#c4c4c4]"
                  />
                </div>
              </div>

              <div className="mt-6 sm:mt-8">
                <button
                  type="button"
                  className="w-full bg-[#150d5e] text-[#fcfcfd] py-3.5 rounded-xl text-xs sm:text-[15px] font-medium hover:bg-[#1a1a4b]/90 transition-colors shadow-sm cursor-pointer"
                >
                  Upload Report
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

