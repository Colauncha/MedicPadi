import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { createLabDepartments } from "../../../api/services.api";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleClose = () => {
    navigate("/labdashboard/department");
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

    try {

      await createLabDepartments(formData);
      navigate("/labdashboard/department");
    } catch (err) {
      console.error("Failed to create department:", err);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Test name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name in errors) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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
              Create a new department by putting the details below
            </p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Department Name Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Department Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Hematology"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />

              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name}
                </span>
              )}
            </div>


            {/* Additional Requirements Textarea */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Additional Information
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write out additional information regarding this department"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 h-28 resize-none placeholder:text-gray-300"
              />

              <span className="text-[11px] text-gray-400 mt-0.5">
                This is a hint to help the user
              </span>

              {errors.description && (
                <span className="text-xs text-red-500">
                  {errors.description}
                </span>
              )}
            </div>

            {/* 
            {/* Turnaround Target Input 
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">Turnaround Target</label>
              <input
                type="text"
                placeholder="e.g 24h-48h"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-400/60"
              />
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#0f0b4d] text-white text-[15px] font-semibold py-4 rounded-xl hover:bg-[#150f61] transition-all duration-200 mt-4 cursor-pointer shadow-sm text-center"
            >
              Create Department
            </button>

          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}