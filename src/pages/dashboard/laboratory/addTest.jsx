import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { X, ChevronDown } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  createLabTests,
  listLabDepartments,
} from "../../../api/services.api";

export default function AddTest() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    price: "",
    department_id: "",
    available: true,
    description: "",
    TAT: 0,
    hasImage: false,
  });

  // Fetch departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await listLabDepartments();

        let list = [];

        if (Array.isArray(response)) {
          list = response;
        } else if (response && Array.isArray(response.data)) {
          list = response.data;
        } else if (response && typeof response === "object") {
          const arrayProp = Object.values(response).find((val) =>
            Array.isArray(val)
          );

          if (arrayProp) {
            list = arrayProp;
          }
        }

        setDepartments(list);

        // Automatically select the first department
        if (list.length > 0) {
          setFormData((prev) => ({
            ...prev,
            department_id: list[0].id,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch lab departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleClose = () => {
    navigate("/labdashboard/test");
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Test name is required";
    }

    if (!formData.shortName.trim()) {
      newErrors.shortName = "Short name is required";
    }

    if (
      formData.price === "" ||
      formData.price === null ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.department_id) {
      newErrors.department_id = "Please select a department";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Additional information is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validateForm()) {
      return;
    }

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      await createLabTests(payload);
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

    // Remove the error for this field when the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDropdownChange = (e) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      department_id: value,
    }));

    if (errors.department_id) {
      setErrors((prev) => ({
        ...prev,
        department_id: "",
      }));
    }
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
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
              New Test
            </h1>

            <p className="text-[#888888] text-[14px] mt-1.5">
              Create a new test by putting in details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Test Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Test Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Malaria Test"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />

              {errors.name && (
                <span className="text-xs text-red-500">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Short Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Short Name
              </label>

              <input
                type="text"
                name="shortName"
                value={formData.shortName}
                onChange={handleChange}
                placeholder="MT"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />

              {errors.shortName && (
                <span className="text-xs text-red-500">
                  {errors.shortName}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="2000"
                min="1"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 placeholder:text-gray-300"
              />

              {errors.price && (
                <span className="text-xs text-red-500">
                  {errors.price}
                </span>
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Department Name
              </label>

              <div className="relative">
                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleDropdownChange}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[14px] text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#0f0b4d]/10 appearance-none cursor-pointer"
                >
                  {departments.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {errors.department_id && (
                <span className="text-xs text-red-500">
                  {errors.department_id}
                </span>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Status
              </label>

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

            {/* Additional Information */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-[13px] font-medium text-gray-400">
                Additional Information
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write out additional information regarding this test"
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

            {/* Submit */}
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

