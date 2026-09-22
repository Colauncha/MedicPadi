// import { useState } from "react";
// import { Download } from "lucide-react";
// import DashboardLayout from "../../../components/layout/DashboardLayout";

// const appointmentsData = [
//   {
//     id: 1,
//     date: "01 July, 2025",
//     time: "09:00 AM",
//     type: "Consultation",
//     doctor: "Dr. Ajayi",
//     status: "Accepted",
//     patient: {
//       name: "Sarah John",
//       image: null,
//       bookedFor: "Consultation",
//       date: "Monday, 18 Nov",
//       timeRange: "4pm - 4:30pm",
//       summary:
//         "Patient has been experiencing intense headaches for a few weeks, accompanied by nausea and light sensitivity. Ibuprofen provides temporary relief but triggers are unclear. Patient has scheduled a virtual appointment for further discussion.",
//       reports: [
//         "Sugar Level Test Report.pdf",
//         "Sugar Level Test Report.pdf",
//         "Sugar Level Test Report.pdf",
//         "Sugar Level Test Report.pdf",
//       ],
//     },
//   },
//   { id: 2, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
//   { id: 3, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
//   { id: 4, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
//   { id: 5, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
//   { id: 6, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Accepted", patient: null },
//   { id: 7, date: "01 July, 2025", time: "09:00 AM", type: "Consultation", doctor: "Dr. Ajayi", status: "Pending",  patient: null },
// ];

// const StatusBadge = ({ status }) => {
//   const colors = {
//     Accepted: "text-green-600",
//     Pending: "text-yellow-500",
//     Rejected: "text-red-500",
//   };
//   return (
//     <span className={`text-xs font-medium ${colors[status] || "text-gray-500"}`}>
//       {status}
//     </span>
//   );
// };

// const AppointmentDetails = ({ appointment }) => {
//   if (!appointment || !appointment.patient) {
//     return (
//       <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
//         <p>Select an appointment to view details</p>
//       </div>
//     );
//   }

//   const { patient } = appointment;

//   return (
//     <div className="flex flex-col gap-4 h-full overflow-y-auto">
//       <div className="flex justify-end">
//         <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
//           Confirmed
//         </span>
//       </div>

//       <div className="bg-[#F3F4FF] rounded-xl p-4 flex gap-3 items-start">
//         <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
//           {patient.image ? (
//             <img src={patient.image} alt={patient.name} className="w-full h-full object-cover" />
//           ) : (
//             <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200" />
//           )}
//         </div>

//         <div className="flex flex-col gap-1">
//           <p className="font-semibold text-sm text-gray-800">{patient.name}</p>
//           <p className="text-xs text-gray-500">Booked for {patient.bookedFor}</p>
//           <div className="flex gap-4 mt-1">
//             <div>
//               <p className="text-[10px] text-gray-400">Date</p>
//               <p className="text-xs font-medium text-gray-700">{patient.date}</p>
//             </div>
//             <div>
//               <p className="text-[10px] text-gray-400">Time</p>
//               <p className="text-xs font-medium text-gray-700">{patient.timeRange}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <button className="w-fit text-xs text-[#4A4AFF] border border-[#4A4AFF] rounded-lg px-4 py-1.5 hover:bg-[#F3F4FF] transition-colors">
//         View Profile
//       </button>

//       <div>
//         <p className="text-sm font-semibold text-gray-800 mb-2">Appointment Summary</p>
//         <p className="text-xs text-gray-500 leading-relaxed">{patient.summary}</p>
//       </div>

//       <div>
//         <p className="text-sm font-semibold text-gray-800 mb-2">Uploaded Report</p>
//         <div className="flex flex-col gap-2">
//           {patient.reports.map((report, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between bg-[#F3F4FF] rounded-lg px-3 py-2"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-[10px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded font-semibold">
//                   PDF
//                 </span>
//                 <span className="text-xs text-gray-600 truncate max-w-[140px]">{report}</span>
//               </div>
//               <button className="text-gray-400 hover:text-gray-600">
//                 <Download size={14} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const AppointmentPage = () => {
//   const [activeTab, setActiveTab] = useState("upcoming");
//   const [selectedId, setSelectedId] = useState(1);

//   const selectedAppointment = appointmentsData.find((a) => a.id === selectedId);

//   return (
//     <DashboardLayout> {/* ✅ FIXED: wrapped in layout */}
//       <div className="p-6 h-full">
//         <p className="text-xs text-gray-400 mb-4">Appointment</p>

//         <div className="flex gap-4 h-[calc(100vh-160px)]">
//           {/* Left: Appointment List */}
//           <div className="flex-1 bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col">
//             <div className="flex border-b border-gray-100">
//               <button
//                 onClick={() => setActiveTab("upcoming")}
//                 className={`flex-1 py-3 text-sm font-medium transition-colors ${
//                   activeTab === "upcoming"
//                     ? "text-[#4A4AFF] border-b-2 border-[#4A4AFF]"
//                     : "text-gray-400"
//                 }`}
//               >
//                 Upcoming Appointment
//               </button>
//               <button
//                 onClick={() => setActiveTab("past")}
//                 className={`flex-1 py-3 text-sm font-medium transition-colors ${
//                   activeTab === "past"
//                     ? "text-[#4A4AFF] border-b-2 border-[#4A4AFF]"
//                     : "text-gray-400"
//                 }`}
//               >
//                 Past Appointment
//               </button>
//             </div>

//             <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 px-4 py-2 bg-gray-50 text-[11px] text-gray-400 font-medium">
//               <span>Date</span>
//               <span>Type</span>
//               <span>Doctor</span>
//               <span>Status</span>
//               <span className="w-16" />
//             </div>

//             <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
//               {appointmentsData.map((appt) => (
//                 <div
//                   key={appt.id}
//                   className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 items-center px-4 py-3 cursor-pointer transition-colors ${
//                     selectedId === appt.id ? "bg-[#F3F4FF]" : "hover:bg-gray-50"
//                   }`}
//                   onClick={() => setSelectedId(appt.id)}
//                 >
//                   <div>
//                     <p className="text-xs font-medium text-gray-700">{appt.date}</p>
//                     <p className="text-[11px] text-gray-400">{appt.time}</p>
//                   </div>
//                   <span className="text-xs text-[#4A4AFF] font-medium">{appt.type}</span>
//                   <span className="text-xs text-gray-600">{appt.doctor}</span>
//                   <StatusBadge status={appt.status} />
//                   <button
//                     className="text-xs bg-[#4A4AFF] text-white px-3 py-1.5 rounded-lg hover:bg-[#3a3aee] transition-colors w-14"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setSelectedId(appt.id);
//                     }}
//                   >
//                     View
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Appointment Details */}
//           <div className="w-72 bg-white rounded-2xl shadow-sm p-4 flex flex-col">
//             <p className="text-sm font-semibold text-gray-800 mb-4">Appointment Details</p>
//             <AppointmentDetails appointment={selectedAppointment} />
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// };

// export default AppointmentPage;


import { useState, useEffect, useCallback } from "react";
import { Download } from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  listAppointments,
  acceptAppointment,
  completeAppointment,
  cancelAppointment,
} from "../../../api/appointments.api";

const UPCOMING_STATUSES = ["pending", "scheduled", "confirmed"];
const PAST_STATUSES = ["completed", "cancelled"];

const STATUS_COLORS = {
  pending: "text-yellow-500",
  scheduled: "text-blue-500",
  confirmed: "text-green-600",
  completed: "text-gray-500",
  cancelled: "text-red-500",
};

const StatusBadge = ({ status }) => (
  <span className={`text-xs font-medium capitalize ${STATUS_COLORS[status] || "text-gray-500"}`}>
    {status}
  </span>
);

function formatDateTime(iso) {
  if (!iso) return { date: "—", time: "" };
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString(undefined, { day: "2-digit", month: "long", year: "numeric" }),
    time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
  };
}

const AppointmentDetails = ({ appointment, onAccept, onComplete, onCancel, actionLoading }) => {
  if (!appointment) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
        <p>Select an appointment to view details</p>
      </div>
    );
  }

  const { date, time } = formatDateTime(appointment.appointment_time);

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      <div className="flex justify-end">
        <StatusBadge status={appointment.status} />
      </div>

      <div className="bg-[#F3F4FF] rounded-xl p-4 flex gap-3 items-start">
        <div className="w-14 h-14 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-200 to-blue-200" />
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-semibold text-sm text-gray-800">
            {appointment.patient?.name || `Patient ${appointment.patient_id?.slice(0, 8) || ""}`}
          </p>
          <p className="text-xs text-gray-500">{appointment.description || "Consultation"}</p>
          <div className="flex gap-4 mt-1">
            <div>
              <p className="text-[10px] text-gray-400">Date</p>
              <p className="text-xs font-medium text-gray-700">{date}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400">Time</p>
              <p className="text-xs font-medium text-gray-700">{time}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] text-gray-400">Session cost</p>
          <p className="text-xs font-medium text-gray-700">
            {appointment.sessionCost != null ? `₦${appointment.sessionCost}` : "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Session length</p>
          <p className="text-xs font-medium text-gray-700">
            {appointment.sessionLen ? `${appointment.sessionLen} mins` : "—"}
          </p>
        </div>
      </div>

      {appointment.join_link && (
        <a
          href={appointment.join_link}
          target="_blank"
          rel="noreferrer"
          className="w-fit text-xs text-[#4A4AFF] border border-[#4A4AFF] rounded-lg px-4 py-1.5 hover:bg-[#F3F4FF] transition-colors"
        >
          Join Call
        </a>
      )}

      <div className="flex gap-2 mt-auto pt-2">
        {appointment.status === "pending" && (
          <button
            onClick={() => onAccept(appointment.id)}
            disabled={actionLoading}
            className="flex-1 text-xs bg-[#4A4AFF] text-white px-3 py-2 rounded-lg hover:bg-[#3a3aee] transition-colors disabled:opacity-60"
          >
            Accept
          </button>
        )}
        {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
          <button
            onClick={() => onComplete(appointment.id)}
            disabled={actionLoading}
            className="flex-1 text-xs bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
          >
            Mark Complete
          </button>
        )}
        {UPCOMING_STATUSES.includes(appointment.status) && (
          <button
            onClick={() => onCancel(appointment.id)}
            disabled={actionLoading}
            className="flex-1 text-xs border border-red-300 text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

const AppointmentPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await listAppointments();
      const list = Array.isArray(result) ? result : result?.data || [];
      setAppointments(list);
      if (list.length && selectedId === null) setSelectedId(list[0].id);
    } catch (err) {
      setError(err.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = appointments.filter((a) =>
    activeTab === "upcoming"
      ? UPCOMING_STATUSES.includes(a.status)
      : PAST_STATUSES.includes(a.status),
  );

  const selectedAppointment = appointments.find((a) => a.id === selectedId);

  const runAction = async (action, id) => {
    setActionLoading(true);
    setError("");
    try {
      await action(id);
      await fetchAppointments();
    } catch (err) {
      setError(err.message || "Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 h-full">
        <p className="text-xs text-gray-400 mb-4">Appointment</p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <div className="flex gap-4 h-[calc(100vh-160px)]">
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
              <span>Description</span>
              <span>Patient</span>
              <span>Status</span>
              <span className="w-16" />
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {loading && (
                <p className="text-sm text-gray-400 text-center py-8">Loading appointments...</p>
              )}
              {!loading && filtered.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No appointments here yet.</p>
              )}
              {!loading &&
                filtered.map((appt) => {
                  const { date, time } = formatDateTime(appt.appointment_time);
                  return (
                    <div
                      key={appt.id}
                      className={`grid grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-2 items-center px-4 py-3 cursor-pointer transition-colors ${
                        selectedId === appt.id ? "bg-[#F3F4FF]" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedId(appt.id)}
                    >
                      <div>
                        <p className="text-xs font-medium text-gray-700">{date}</p>
                        <p className="text-[11px] text-gray-400">{time}</p>
                      </div>
                      <span className="text-xs text-[#4A4AFF] font-medium truncate">
                        {appt.description || "Consultation"}
                      </span>
                      <span className="text-xs text-gray-600">
                        {appt.patient?.name || "Patient"}
                      </span>
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
                  );
                })}
            </div>
          </div>

          <div className="w-72 bg-white rounded-2xl shadow-sm p-4 flex flex-col">
            <p className="text-sm font-semibold text-gray-800 mb-4">Appointment Details</p>
            <AppointmentDetails
              appointment={selectedAppointment}
              onAccept={(id) => runAction(acceptAppointment, id)}
              onComplete={(id) => runAction(completeAppointment, id)}
              onCancel={(id) => runAction(cancelAppointment, id)}
              actionLoading={actionLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentPage;