import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Users,
  Activity,
  CalendarDays,
  Loader2,
  Sparkles,
  Plus,
  Send,
} from "lucide-react";
import { labStats } from "../../../api/orders.api";

export default function LabDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLabStats();
  }, []);

  const fetchLabStats = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await labStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch lab stats:", err);
      setError(err.message || "Failed to fetch lab stats");
    } finally {
      setLoading(false);
    }
  };

  const totalPatientsCount =
    stats?.totalPatients ??
    stats?.data?.totalPatients ??
    stats?.patientsCount ??
    0;

  const totalTreatmentCount =
    stats?.totalTreatment ??
    stats?.data?.totalTreatment ??
    0;

  const appointmentsCount =
    stats?.appointmentsScheduled ??
    stats?.data?.appointmentsScheduled ??
    0;

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-medium text-[#3d3d3d]">
          Patient Statistic
        </h1>
        {loading && (
          <div className="flex items-center text-sm text-[#150d5e]">
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Loading stats...
          </div>
        )}
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-200 flex justify-between items-center">
          <span>{error}</span>
          <button
            onClick={fetchLabStats}
            className="text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-[#331eb9] text-base font-medium">Total Patients</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Users className="w-4 h-4 fill-[#331eb9]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#150d5e]">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#150d5e]" />
            ) : (
              totalPatientsCount
            )}
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-[#331eb9] text-base font-medium">Total Treatment</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity className="w-4 h-4 fill-[#331eb9]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#150d5e]">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#150d5e]" />
            ) : (
              totalTreatmentCount
            )}
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px] flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-[#331eb9] text-base font-medium">Appointments Scheduled</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <CalendarDays className="w-4 h-4 fill-[#331eb9]" />
            </div>
          </div>
          <div className="text-3xl font-bold text-[#150d5e]">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-[#150d5e]" />
            ) : (
              appointmentsCount
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          {/* Today Appointment */}
          <div className="border border-[#e7e7e7] p-6 bg-white rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#464646] font-medium">Today Appointment</h3>
            </div>

            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <CalendarDays className="w-10 h-10 mb-2 opacity-40" />
              <p className="text-sm">No appointments scheduled for today</p>
            </div>
          </div>

          {/* Appointment Request */}
          <div className="border border-[#e7e7e7] p-6 bg-white rounded-2xl">
            <h3 className="text-[#464646] font-medium mb-6">Appointment Request</h3>

            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Users className="w-10 h-10 mb-2 opacity-40" />
              <p className="text-sm">No appointment requests</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Tests List */}
          <div className="border border-[#eef0f6] rounded-2xl p-6 bg-white">
            <div className="flex border-b border-[#eef0f6] mb-6 gap-8">
              {["All", "Completed Test", "Pending Test"].map((tab) => {
                const tabKey = tab.toLowerCase().split(" ")[0];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tabKey)}
                    className={`pb-4 text-[14px] font-medium relative ${
                      activeTab === tabKey
                        ? "text-[#1a1a4b]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tabKey && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a4b]" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Activity className="w-10 h-10 mb-2 opacity-40" />
              <p className="text-sm">No test records found</p>
            </div>
          </div>

          {/* AI Padi Chat Card */}
          <div className="border border-[#e7e7e7] p-4 bg-white rounded-2xl flex flex-col overflow-hidden h-[370px]">
            <div className="py-4 border-b border-[#eef0f6] flex items-center justify-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[#1a1a4b]">AI Padi</span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-medium text-[#1a1a4b] text-base mb-1">
                Ask AI Padi
              </h4>
              <p className="text-xs text-gray-500 max-w-xs">
                Get instant insights or assistance with lab reports and patient data.
              </p>
            </div>

            <div className="p-4 border-t border-[#eef0f6] bg-white">
              <div className="flex items-center gap-3 p-1 rounded-full border border-gray-200 bg-white">
                <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-gray-500 hover:text-[#1a1a4b] bg-[#f8f9fc] rounded-full transition-colors ml-0.5">
                  <Plus className="w-[22px] h-[22px]" />
                </button>
                <input
                  type="text"
                  placeholder="Type your question"
                  className="flex-1 bg-transparent border-none focus:outline-none text-[14px] px-2"
                />
                <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[#1a1a4b] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors mr-0.5">
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

