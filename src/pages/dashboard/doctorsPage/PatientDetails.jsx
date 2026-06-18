import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";

function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("upcoming");

  const patient = location.state?.patient || {
    id: id || "PT001",
    name: "Sarah John",
    email: "sarahjohn22@gmail.com",
    phone: "09012345678",
    age: "50yrs",
    weight: "70kg",
    height: "175cm",
    sex: "Female",
    allergies: "Penicillin",
    gender: "Female",
    bloodGroup: "B+",
    emergencyName: "Sarah John",
    emergencyEmail: "sarahjohn@gmail.com",
    emergencyPhone: "09012345678",
    relationship: "Husband",
    appointmentsPast: 5,
    appointmentsUpcoming: 1,
  };

  const medicalRecords = [
    { doctor: "Dr. Ajayi", specialty: "Cardiologist", date: "March 24, 2025" },
    { doctor: "Dr. Ajayi", specialty: "Cardiologist", date: "March 24, 2025" },
    { doctor: "Dr. Ajayi", specialty: "Cardiologist", date: "March 24, 2025" },
  ];

  const labResults = [
    { name: "General Blood Analysis" },
    { name: "Sugar Level Test" },
    { name: "Blood Pressure" },
  ];

  const appointments = [
    { date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted" },
    { date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted" },
  ];

  return (
    <DashboardLayout> {/* ✅ FIXED: was missing layout wrapper */}
      <div className="flex flex-col gap-5 p-6 bg-gray-50 min-h-screen">

        {/* Breadcrumb */}
        <p className="text-xs text-gray-400">
          <span className="cursor-pointer hover:underline" onClick={() => navigate(-1)}>Patient</span>
          <span className="mx-1">›</span>
          <span className="text-gray-600 font-medium">{patient.name}</span>
        </p>

        {/* Top Section */}
        <div className="flex gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-6 flex-1">
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-[#F3F4FF] overflow-hidden flex items-center justify-center border-2 border-[#150D5E]">
                <span className="text-[#150D5E] text-3xl font-bold">{patient.name.charAt(0)}</span>
              </div>
              <p className="text-sm font-bold text-gray-800">{patient.name}</p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: "Age",      value: patient.age      || "50yrs"    },
                { label: "Weight",   value: patient.weight   || "70kg"     },
                { label: "Height",   value: patient.height   || "175cm"    },
                { label: "Sex",      value: patient.sex      || patient.gender || "Female" },
                { label: "Allergies",value: patient.allergies|| "Penicillin"},
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center bg-[#F3F4FF] rounded-lg px-4 py-2 min-w-[60px]">
                  <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-xs font-bold text-[#150D5E]">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 w-[200px] flex-shrink-0">
            <p className="text-xs font-semibold text-gray-500 text-center">Appointments</p>
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-800">{patient.appointmentsPast || 5}</p>
                <p className="text-[10px] text-gray-400">Past</p>
              </div>
              <div className="w-px bg-gray-100" />
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-800">{patient.appointmentsUpcoming || 1}</p>
                <p className="text-[10px] text-gray-400">Upcoming</p>
              </div>
            </div>
            <button className="w-full bg-[#150D5E] text-white text-xs py-2 rounded-lg font-medium hover:bg-[#1a1275] transition-colors">
              Send Message
            </button>
          </div>
        </div>

        {/* Middle Section — 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          {/* Personal Info + Emergency */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-gray-800">Personal Information</h3>
            {[
              { label: "Name",         value: patient.name },
              { label: "Email Address",value: patient.email },
              { label: "Phone Number", value: patient.phone },
              { label: "Gender",       value: patient.gender    || "Female" },
              { label: "Blood Group",  value: patient.bloodGroup|| "B+"     },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-[10px] text-gray-400 font-medium">{field.label}</p>
                <p className="text-xs font-semibold text-gray-800">{field.value}</p>
              </div>
            ))}

            <h3 className="text-sm font-bold text-gray-800 mt-3">Emergency Details</h3>
            {[
              { label: "Name",         value: patient.emergencyName  || "Sarah John"          },
              { label: "Email Address",value: patient.emergencyEmail || "sarahjohn@gmail.com" },
              { label: "Phone Number", value: patient.emergencyPhone || "09012345678"         },
              { label: "Relationship", value: patient.relationship   || "Husband"             },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-[10px] text-gray-400 font-medium">{field.label}</p>
                <p className="text-xs font-semibold text-gray-800">{field.value}</p>
              </div>
            ))}
          </div>

          {/* Medical Records */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-gray-800">Medical Records</h3>
            {medicalRecords.map((record, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#150D5E] text-xs font-bold">D</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800">{record.doctor}</p>
                  <p className="text-[10px] text-gray-400">{record.specialty}</p>
                  <p className="text-[10px] text-gray-400">{record.date}</p>
                </div>
                <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium hover:bg-[#1a1275] transition-colors flex-shrink-0">
                  View Report
                </button>
              </div>
            ))}
          </div>

          {/* Lab Results */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
            <h3 className="text-sm font-bold text-gray-800">Lab Results</h3>
            {labResults.map((result, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-[#150D5E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-gray-800 flex-1">{result.name}</p>
                <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium hover:bg-[#1a1275] transition-colors flex-shrink-0">
                  View Report
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom — Tabs + Appointment Rows */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
          <div className="flex gap-6 border-b border-gray-100 pb-3">
            {[
              { key: "upcoming", label: "Upcoming Appointment" },
              { key: "past",     label: "Past Appointment"     },
              { key: "records",  label: "Medical Records"      },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-xs font-semibold pb-1 transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "text-[#150D5E] border-[#150D5E]"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(activeTab === "upcoming" || activeTab === "past") && (
            <div className="flex flex-col gap-3">
              {appointments.map((appt, idx) => (
                <div key={idx} className="flex items-center gap-6 p-3 rounded-lg border border-gray-100">
                  <div className="flex flex-col min-w-[100px]">
                    <p className="text-xs font-semibold text-gray-800">{appt.date}</p>
                    <p className="text-[10px] text-gray-400">{appt.time}</p>
                  </div>
                  <div className="flex flex-col min-w-[80px]">
                    <p className="text-[10px] text-gray-400">Type</p>
                    <p className="text-xs font-semibold text-gray-800">{appt.type}</p>
                  </div>
                  <div className="flex flex-col min-w-[80px]">
                    <p className="text-[10px] text-gray-400">Doctor</p>
                    <p className="text-xs font-semibold text-[#150D5E]">{appt.doctor}</p>
                  </div>
                  <div className="flex flex-col min-w-[80px]">
                    <p className="text-[10px] text-gray-400">Status</p>
                    <p className="text-xs font-semibold text-green-600">{appt.status}</p>
                  </div>
                  <div className="ml-auto">
                    <button className="bg-[#150D5E] text-white text-xs px-5 py-2 rounded-lg font-medium hover:bg-[#1a1275] transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "records" && (
            <div className="flex flex-col gap-3">
              {medicalRecords.map((record, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#150D5E] text-xs font-bold">D</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-800">{record.doctor}</p>
                    <p className="text-[10px] text-gray-400">{record.specialty} · {record.date}</p>
                  </div>
                  <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium hover:bg-[#1a1275] transition-colors">
                    View Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatientDetails;