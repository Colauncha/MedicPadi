
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, ChevronDown } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { createLabTests } from "../../../api/services.api";


export default function AddTest() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    price: "",
    department: "hematology",
    available: true,
    description: "",
    tat: 0,
  });


  const handleClose = () => {
    navigate("/labdashboard/test");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLabTests(formData);
      navigate("/labdashboard/test");
    } catch (err) {
      console.error("Failed to create test:", err);
    }
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "available"
          ? value === "Available" || value === "true"
          : value,
    }));
  };


  return (
    <DashboardLayout>
      <div className="min-h-0 flex items-center justify-center py-4 px-4 sm:px-6">
        <div className="relative w-full max-w-[640px] bg-white rounded-3xl border border-gray-150 shadow-sm p-6 sm:p-10">

          <button
            onClick={handleClose}
            className="absolute right-6 top-6 sm:right-8 sm:top-8 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="text-center mb-8 pt-2">
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">New Test</h1>
            <p className="text-[#888888] text-[14px] mt-1.5">
              Create a new test by putting in details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Test Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Test Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Malaria Test"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />
            </div>

            {/* Short Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Short Name</label>
              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                placeholder="MT"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />
            </div>

            {/* Price Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2000"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />
            </div>

            {/* Department Name Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Department Name</label>
              <div className="relative">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                >
                  <option value="hematology">Hematology</option>
                  <option value="biochemistry">Biochemistry</option>
                  <option value="microbiology">Microbiology</option>
                  <option value="serology">Serology</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Status</label>
              <div className="relative">
                <select
                  name="available"
                  value={formData.available ? "Available" : "Unavailable"}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Additional Information Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Additional Information</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write out additional information regarding this test"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 h-28 resize-none placeholder:text-gray-300"
              />
              <span className="text-[11px] text-gray-400 mt-0.5">This is a hint to help the user</span>
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
