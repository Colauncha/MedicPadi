import LabLayout from "../../../components/layout/LabLayout";
import {
  Users,
  Activity,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import sarah from "../../../assets/sarah.svg";

export default function LabPatient() {
  const patientCards = Array(15).fill(0); // 5 cols x 3 rows grid

  return (
    <LabLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#3d3d3d]">
          Patient Statistic
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Patients</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Users className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">230</div>
          <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold text-sm mr-1">15%</span>
            <span className="text-sm">from last week</span>
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Treatment</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">230</div>
          <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold text-sm mr-1">15%</span>
            <span className="text-sm">from last week</span>
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Appointments Scheduled</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <CalendarDays className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">230</div>
          <div className="flex items-center text-sm text-[#150d5e]">
            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
            <span className="font-semibold text-sm mr-1">25%</span>
            <span className="text-sm">Attended Appointments</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {patientCards.map((_, index) => (
          <div key={index} className="rounded-xl flex flex-col bg-[#f7f7fb]">
            <div className="p-4 flex gap-3">
              {index === 1 || index === 6 || index === 11 ? (
                <div className="p-6 rounded-full bg-[#e6e2ff] text-[#331eb9] flex items-center justify-center font-medium text-[16px] shrink-0">
                  SJ
                </div>
              ) : (
                <img
                  src={sarah}
                  alt="Sarah"
                  className="rounded-full object-cover shrink-0 bg-gray-100"
                />
              )}
              <div className="flex flex-col">
                <p className="font-medium text-[#3d3d3d] text-sm leading-tight mt-0.5">
                  Sarah John
                </p>
                <p className="text-xs text-[#888888] mt-0.5">Consultation</p>
                <div className="flex gap-1.5 mt-1.5">
                  <button className="text-[#331eb9] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                  <button className="text-[#e5334b] flex items-center justify-center">
                    <XCircle className="w-6 h-6" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 px-4 border-y bg-[#f7f7fb]">
              <span className="font-medium text-[#3d3d3d]">11:00 AM</span>
              <span className="text-xs text-[#888888]">22/22/2025</span>
            </div>

            <div className="py-2.5 text-center bg-[#f7f7fb]">
              <button className="text-sm text-[#331eb9] underline">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
    </LabLayout>
  );
}
