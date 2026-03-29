import Avatar from "../ui/Avatar";
import { NEXT_PATIENT } from "../../Data/DashboardData";

const VITALS = [
  { label: "Age",    key: "age"    },
  { label: "Weight", key: "weight" },
  { label: "Height", key: "height" },
  { label: "Sex",    key: "sex"    },
];

function NextPatient() {
  const patient = NEXT_PATIENT;

  return (
    <div className="w-64 bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex-shrink-0">
      <h2 className="text-sm font-bold text-gray-800 mb-4">Next Patient details</h2>

      {/* Patient Info */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar name={patient.name} size="w-12 h-12" bg="bg-[#2D1FA3]" />
        <div>
          <p className="text-sm font-bold text-gray-800">{patient.name}</p>
          <p className="text-xs text-gray-400">{patient.gender}</p>
          <p className="text-xs text-[#150D5E] font-medium">{patient.condition}</p>
        </div>
      </div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {VITALS.map(({ label, key }) => (
          <div key={key} className="bg-[#F3F4FF] rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
            <p className="text-xs font-bold text-[#150D5E]">{patient[key]}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 py-2 bg-[#150D5E] text-white text-xs font-semibold rounded-xl hover:bg-[#1e1480] transition-colors">
          View Profile
        </button>
        <button className="flex-1 py-2 border border-[#150D5E] text-[#150D5E] text-xs font-semibold rounded-xl hover:bg-[#F3F4FF] transition-colors">
          Chat
        </button>
      </div>
    </div>
  );
}

export default NextPatient;