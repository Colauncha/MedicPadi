import { useState } from "react";
import { Download } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const appointmentsData = [
  {
    id: 1,
    date: "01 July, 2025",
    time: "09:00 AM",
    type: "Consultation",
    doctor: "Dr. Ajayi",
    status: "Accepted",
    patient: {
      name: "Sarah John",
      image: null,
      bookedFor: "Consultation",
      date: "Monday, 18 Nov",
      timeRange: "4pm - 4:30pm",
      summary:
        "Patient has been experiencing intense headaches for a few weeks, accompanied by nausea and light sensitivity. Ibuprofen provides temporary relief but triggers are unclear. Patient has scheduled a virtual appointment for further discussion.",
      reports: [
        "Sugar Level Test Report.pdf",
        "Sugar Level Test Report.pdf",
        "Sugar Level Test Report.pdf",
        "Sugar Level Test Report.pdf",
      ],
    },
  },
  { id: 2, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
  { id: 3, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
  { id: 4, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
  { id: 5, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
  { id: 6, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
  { id: 7, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Pending",  patient: null },
];

const StatusBadge = ({ status }) => {
  const colors = {
    Accepted: "text-green-600",
    Pending: "text-yellow-500",
    Rejected: "text-red-500",
  };
  return (
    <span className={`text-xs font-medium ${colors[status] || "text-gray-500"}`}>
      {status}
    </span>
  );
};

const AppointmentDetails = ({ appointment }) => {
  if (!appointment || !appointment.patient) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
        <p>Select an appointment to view details</p>
      </div>
    );
  }

  const { patient } = appointment;

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex justify-end">
        <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
          Confirmed
        </span>
      </div>

      <div className="bg-[#F3F4FF] rounded-xl p-4 flex gap-3 items-start">
        <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          {patient.image ? (
            <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-sm text-gray-800">{patient.name}</p>
          <p className="text-xs text-gray-500">Booked for {patient.bookedFor}</p>
          <div className="flex gap-4 mt-1">
            <div>
              <p className="text-[10px] text-gray-400">Date</p>
              <p className="text-xs font-medium text-gray-700">{patient.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Time</p>
              <p className="text-xs font-medium text-gray-700">{patient.timeRange}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="w-fit text-xs text-[#4A4AFF] border border-[#4A4AFF] rounded-lg px-4 py-1.5 hover:bg-[#F3F4FF] transition-colors">
        View Profile
      </button>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Appointment Summary</p>
        <p className="text-xs text-gray-500 leading-relaxed">{patient.summary}</p>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-800 mb-2">Uploaded Report</p>
        <div className="flex flex-col gap-2">
          {patient.reports.map((report, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#F3F4FF] rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded font-semibold">
                  PDF
                </span>
                <span className="text-xs text-gray-600 truncate max-w-[140px]">{report}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedId, setSelectedId] = useState(1);

  const selectedAppointment = appointmentsData.find((a) => a.id === selectedId);

  return (
    <DashboardLayout> {/* ✅ FIXED: wrapped in layout */}
      <div className="p-6 h-full">
        <p className="text-xs text-gray-400 mb-4">Appointment</p>

        <div className="flex gap-4 h-[calc(100vh-160px)]">
          {/* Left: Appointment List */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "upcoming"
                    ? "text-[#4A4AFF] border-b-2 border-[#4A4AFF]"
                    : "text-gray-400"
                }`}
              >
                Upcoming Appointment
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`flex-1 py-3 text-sm font-medium transition-colors ${
                  activeTab === "past"
                    ? "text-[#4A4AFF] border-b-2 border-[#4A4AFF]"
                    : "text-gray-400"
                }`}
              >
                Past Appointment
              </button>
            </div>

            <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 px-4 py-2 bg-gray-50 text-[11px] text-gray-400 font-medium">
              <span>Date</span>
              <span>Type</span>
              <span>Doctor</span>
              <span>Status</span>
              <span className="w-16" />
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {appointmentsData.map((appt) => (
                <div
                  key={appt.id}
                  className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 items-center px-4 py-3 cursor-pointer transition-colors ${
                    selectedId === appt.id ? "bg-[#F3F4FF]" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedId(appt.id)}
                >
                  <div>
                    <p className="text-xs font-medium text-gray-700">{appt.date}</p>
                    <p className="text-[11px] text-gray-400">{appt.time}</p>
                  </div>
                  <span className="text-xs text-[#4A4AFF] font-medium">{appt.type}</span>
                  <span className="text-xs text-gray-600">{appt.doctor}</span>
                  <StatusBadge status={appt.status} />
                  <button
                    className="text-xs bg-[#4A4AFF] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a3aee] transition-colors w-14"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedId(appt.id);
                    }}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Appointment Details */}
          <div className="w-72 bg-white rounded-2xl shadow-sm p-4 flex flex-col">
            <p className="text-sm font-semibold text-gray-800 mb-4">Appointment Details</p>
            <AppointmentDetails appointment={selectedAppointment} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentPage;