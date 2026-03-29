import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import { REQUESTS } from "../../Data/DashboardData";

function RequestRow({ name, type, date }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <Avatar name={name} size="w-9 h-9" bg="bg-[#2D1FA3]" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 truncate">{name}</p>
        <p className="text-xs text-gray-400">{type}</p>
        <p className="text-[10px] text-gray-300">{date}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-500 hover:bg-emerald-100 flex items-center justify-center transition-colors">
          <Icon name="check" className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 rounded-full bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors">
          <Icon name="x" className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] text-[#150D5E] font-medium ml-1 cursor-pointer hover:underline">
          View details
        </span>
      </div>
    </div>
  );
}

function AppointmentRequests() {
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-gray-800">Appointment Request</h2>
        <button className="text-xs text-[#150D5E] font-semibold hover:underline">View All</button>
      </div>
      {REQUESTS.map((req, i) => (
        <RequestRow key={i} {...req} />
      ))}
    </div>
  );
}

export default AppointmentRequests;