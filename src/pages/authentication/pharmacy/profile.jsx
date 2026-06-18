import { useState } from "react";
import { useNavigate } from "react-router";
import { Upload } from "lucide-react";
import pharmacy from "../../../assets/pharmacy.png";
import logo from "../../../assets/mediclogo.svg";

export default function PharmacyProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    location: "",
    yearsOfService: "",
    awards: "",
    aboutCompany: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/pharmdashboard");
    console.log("Profile Data:", formData);
  };

  return (
    <div className="p-8 bg-[#E6E2F2]">
      <div className="flex bg-white font-sans overflow-hidden rounded-2xl">
        <div className="hidden lg:flex flex-col w-1/2 p-12 relative items-center justify-center">
          <div className="absolute top-12 left-12">
            <img
              src={logo}
              alt="MedicPadi Logo"
              className="h-10 object-contain"
            />
          </div>
          <img src={pharmacy} alt="pharmacy" className="object-contain" />
        </div>

        <div className="w-full lg:w-1/2 flex justify-center p-6 sm:p-12 relative">
          <div className="w-full max-w-[550px] bg-white rounded-2xl p-8 sm:p-10 border border-[#B0B0B0] z-10 relative shadow-sm">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-medium leading-8 text-[#121212] mb-2">
                Company Information
              </h1>
              <p className="text-[#888888] text-xs leading-4">
                Please input the company information below
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-[#E7E7E7] rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-5 h-5 text-[#888888] mb-2" />
                <p className="text-xs text-[#888888] mb-1">
                  Upload your company image
                </p>
                <p className="text-[10px] text-[#A0A0A0]">or click to browse</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Olivex laboratory center"
                  className="w-full px-4 py-3.5 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#888888] mb-1.5">
                  Company Address
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  placeholder="No 12, Siju street, off Adetona street, Ikeja, Lagos State"
                  className="w-full px-4 py-3.5 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Ikeja, Lagos"
                    className="w-full px-4 py-3.5 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-1.5">
                    Years of Service
                  </label>
                  <input
                    type="text"
                    name="yearsOfService"
                    value={formData.yearsOfService}
                    onChange={handleChange}
                    placeholder="12 Years"
                    className="w-full px-4 py-3.5 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#888888] mb-1.5">
                    Awards
                  </label>
                  <input
                    type="text"
                    name="awards"
                    value={formData.awards}
                    onChange={handleChange}
                    placeholder="8"
                    className="w-full px-4 py-3.5 rounded-xl border border-transparent bg-[#FAFAFA] focus:outline-none focus:border-[#150D5E] focus:bg-white focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#121212] mb-0.5">
                  About Company
                </label>
                <p className="text-[10px] text-[#888888] mb-2">
                  Write a detail information about your laboratory
                </p>
                <textarea
                  name="aboutCompany"
                  value={formData.aboutCompany}
                  onChange={handleChange}
                  placeholder="Enter a description..."
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-xl border border-[#E7E7E7] focus:outline-none focus:border-[#150D5E] focus:ring-1 focus:ring-[#150D5E] transition-colors text-sm text-[#121212] placeholder:text-[#D1D1D1] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#150D5E] text-white leading-6 py-3.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#150D5E] mt-4"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
