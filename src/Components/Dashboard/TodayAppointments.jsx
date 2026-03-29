import Avatar from "../ui/Avatar";
import { APPOINTMENTS } from "../../Data/DashboardData";

function AppointmentRow({ name, gender, time }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <Avatar name={name} size="w-9 h-9" bg="bg-[#2D1FA3]" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400">{gender} · {time}</p>
      </div>
      <button className="px-3 py-1.5 bg-[#150D5E] text-white text-xs font-medium rounded-lg hover:bg-[#1e1480] transition-colors flex-shrink-0">
        View Details
      </button>
    </div>
  );
}

function TodayAppointments() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-800">Today Appointment</h2>
        <button className="text-xs text-[#150D5E] font-semibold hover:underline">View All</button>
      </div>
      {APPOINTMENTS.map((appt, i) => (
        <AppointmentRow key={i} {...appt} />
      ))}
    </div>
  );
}

export default TodayAppointments;