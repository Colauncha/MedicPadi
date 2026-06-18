import Avatar from "../ui/Avatar";
import { APPOINTMENTS, NEXT_PATIENT } from "../../Data/DashboardData";

const VITALS = [
  { label: "Age",    key: "age"    },
  { label: "Weight", key: "weight" },
  { label: "Height", key: "height" },
  { label: "Sex",    key: "sex"    },
];

function AppointmentRow({ name, gender, time }) {
  return (
    <div className="flex items-center justify-between gap-40 py-3 border-b border-[#eef0f6] last:border-0">
      <div className="flex items-center gap-3">
        <Avatar name={name} size="w-[56px] h-[56px]" bg="bg-[#2D1FA3]" />
        <div className="grid justify-between">
          <p className="text-sm font-semibold text-[#3d3d3d]">{name}</p>
          <p className="text-xs text-[#888888]">{gender}</p>
          <p className="text-[10px] text-[#454545]">{time}</p>
        </div>
      </div>
      <button className="bg-[#150d5e] text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors">
        View Details
      </button>
    </div>
  );
}

function TodayAppointments() {
  return (
    <div className="flex-1 bg-white border border-[#e7e7e7] p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#464646] text-base">Today Appointment</h2>
        <button className="text-[#464646] text-sm">View All</button>
      </div>
      <div className="flex flex-col">
        {APPOINTMENTS.map((appt, i) => (
          <AppointmentRow key={i} {...appt} />
        ))}
      </div>
    </div>
  );
}

function NextPatient() {
  const patient = NEXT_PATIENT;

  return (
    <div className="w-[280px] bg-white border border-[#e7e7e7] p-6 flex-shrink-0">
      <h2 className="text-[#464646] text-base mb-6">Next Patient details</h2>

      {/* Patient Info */}
      <div className="flex items-center gap-3 mb-6">
        <Avatar name={patient.name} size="w-[46px] h-[46px]" bg="bg-[#2D1FA3]" />
        <div>
          <p className="text-sm font-semibold text-[#3d3d3d]">{patient.name}</p>
          <p className="text-xs text-[#888888]">{patient.gender}</p>
          <p className="text-xs text-[#888888]">{patient.condition}</p>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-4 gap-40 mb-6">
        {VITALS.map(({ label, key }) => (
          <div key={key} className="flex flex-col">
            <p className="text-[10px] text-[#888888] mb-1">{label}</p>
            <p className="text-sm font-semibold text-[#150d5e]">{patient[key]}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 py-2.5 bg-[#150d5e] text-white text-sm font-medium rounded-md hover:bg-[#1a1a4b]/90 transition-colors">
          View Profile
        </button>
        <button className="flex-1 py-2.5 border border-[#150d5e] text-[#150d5e] text-sm font-medium rounded-md hover:bg-[#f3f4ff] transition-colors">
          Chat
        </button>
      </div>
    </div>
  );
}

// Combined section — use this in your dashboard
export default function AppointmentsRow() {
  return (
    <div className="flex gap-6">
      <TodayAppointments />
      <NextPatient />
    </div>
  );
}