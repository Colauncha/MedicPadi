import { useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const patients = [
  { id: "PT001", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 60, gender: "Male",   lastAppointment: "15-03-2026" },
  { id: "PT002", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 10, gender: "Female", lastAppointment: "15-03-2026" },
  { id: "PT003", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 40, gender: "Male",   lastAppointment: "15-03-2026" },
  { id: "PT004", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 20, gender: "Female", lastAppointment: "15-03-2026" },
  { id: "PT005", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 30, gender: "Female", lastAppointment: "15-03-2026" },
  { id: "PT006", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 16, gender: "Female", lastAppointment: "15-03-2026" },
  { id: "PT007", name: "Sarah John", email: "sarahjohn22@gmail.com", phone: "09012345678", age: 8,  gender: "Male",   lastAppointment: "15-03-2026" },
];

const ITEMS_PER_PAGE = 7;

function PatientList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 10;

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleViewDetails = (patient) => {
    // ✅ FIXED: route now uses the correct /docdashboard prefix
    navigate(`/docdashboard/patient/${patient.id}`, { state: { patient } });
  };

  return (
    <DashboardLayout> {/* ✅ FIXED: was missing layout wrapper */}
      <div className="flex flex-col gap-5 p-6">
        <h1 className="text-lg font-bold text-gray-800">Patient Lists</h1>

        {/* Stats Cards */}
        <div className="flex gap-4">
          <div className="bg-[#150D5E] text-white rounded-xl p-4 flex items-center gap-3 flex-1 max-w-[220px]">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-white/70">Total Patients</p>
              <p className="text-2xl font-bold">1,000</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center gap-3 flex-1 max-w-[220px] border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#150D5E]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">New Patients</p>
              <p className="text-2xl font-bold text-gray-800">200</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 flex items-center gap-3 flex-1 max-w-[220px] border border-gray-100 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center">
              <svg className="w-4 h-4 text-[#150D5E]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">Returning Patients</p>
              <p className="text-2xl font-bold text-gray-800">68%</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-64">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="search patient"
                className="text-sm text-gray-400 outline-none w-full bg-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-[#150D5E] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#1a1275] transition-colors font-medium">
                <span className="text-base leading-none">+</span>
                Add New Patient
              </button>
              <button className="flex items-center gap-2 border border-gray-200 text-gray-500 text-sm px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Patient ID", "Patient Name", "Email", "Phone Num", "Age", "Gender", "Last Appointment", "Action"].map((col) => (
                    <th key={col} className="text-left text-xs font-semibold text-gray-500 py-2 px-3 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3 text-gray-700 text-xs">{patient.id}</td>
                    <td className="py-3 px-3 text-gray-800 text-xs font-medium">{patient.name}</td>
                    <td className="py-3 px-3 text-gray-500 text-xs truncate max-w-[140px]">{patient.email}</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">{patient.phone}</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">{patient.age}</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">{patient.gender}</td>
                    <td className="py-3 px-3 text-gray-600 text-xs">{patient.lastAppointment}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleViewDetails(patient)}
                        className="text-[#150D5E] text-xs font-semibold hover:underline transition-all"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-400">
              Showing 7 – {Math.min(currentPage * ITEMS_PER_PAGE, 79)} out of 79
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 text-xs"
              >
                ‹
              </button>
              {[1, 2, 3, 4, "...", 10].map((page, i) => (
                <button
                  key={i}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`w-7 h-7 flex items-center justify-center rounded-md text-xs font-medium transition-colors ${
                    currentPage === page
                      ? "bg-[#150D5E] text-white"
                      : "border border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 text-gray-400 hover:bg-gray-100 text-xs"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatientList;