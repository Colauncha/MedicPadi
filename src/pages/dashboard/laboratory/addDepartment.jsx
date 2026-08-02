
import { useNavigate } from "react-router";
import { X, ChevronDown } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

export default function AddDepartment() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/labdashboard/department");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the form data to the api.
    // For now, let's navigate back to departments list.
    navigate("/labdashboard/department");
  };

  return (
    <DashboardLayout>
      <div className="min-h-0 flex items-center justify-center py-4 px-4 sm:px-6">
        <div className="relative w-full max-w-[640px] bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-10">
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute right-6 top-6 sm:right-8 sm:top-8 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Form Title & Subtitle */}
          <div className="text-center mb-8 pt-2">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">New Department</h1>
            <p className="text-[#888888] text-[14px] mt-1.5">
              Create a new department by putting the test details below
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Department Name Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Department Name</label>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                  defaultValue="hematology"
                >
                  <option value="hematology">Hematology</option>
                  <option value="chemistry">Clinical Chemistry</option>
                  <option value="microbiology">Microbiology</option>
                  <option value="serology">Serology</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Test Name Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Test Name</label>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                  defaultValue="mri"
                >
                  <option value="mri">MRI Scan</option>
                  <option value="fbc">Full Blood Count (FBC)</option>
                  <option value="fbs">Fast Blood Sugar (FBS)</option>
                  <option value="urinalysis">Urinalysis</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Price Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Price</label>
              <div className="relative">
                <select 
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                  defaultValue="2000"
                >
                  <option value="2000">₦2,000</option>
                  <option value="5000">₦5,000</option>
                  <option value="10000">₦10,000</option>
                  <option value="15000">₦15,000</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Grid Row: Capacity & Staff */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-[13px] font-medium text-gray-400">Daily Test Capacity</label>
                <input 
                  type="text"
                  placeholder="20"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs sm:text-[13px] font-medium text-gray-400">Staff Assigned</label>
                <input 
                  type="text"
                  placeholder="5"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
                />
              </div>
            </div>

            {/* Additional Requirements Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Additional Requirements</label>
              <textarea 
                placeholder="Enter the requirements that your patients need when coming for test"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 h-28 resize-none placeholder:text-gray-300"
              />
              <span className="text-[11px] text-gray-400 mt-0.5">This is a hint to help the user</span>
            </div>

            {/* Turnaround Target Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Turnaround Target</label>
              <input 
                type="text"
                placeholder="e.g 24h-48h"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-400/60"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#0f0b4d] text-white text-[15px] font-semibold py-4 rounded-xl hover:bg-[#150f61] transition-all duration-200 mt-4 cursor-pointer shadow-sm text-center"
            >
              Create Test
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}