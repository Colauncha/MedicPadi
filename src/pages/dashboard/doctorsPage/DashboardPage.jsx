import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";

import {
  Users,
  Activity,
  ArrowUpRight,
  Edit3,
  Copy,
  ArrowDown,
  Plus,
  Send,
  Sparkles,
} from "lucide-react";

import sarah from "../../../assets/sarah.svg";
import doctor from "../../../assets/image.svg";

import {
  getDoctorStats,
  listAppointmentsByStatuses,
} from "../../../api/appointments.api";
import { getProfileById } from "../../../api/profile.api";

export default function DocDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");

  // Dashboard statistics
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  // Today's appointments
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [patientProfiles, setPatientProfiles] = useState({});

  // Fetch doctor statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError("");

        const data = await getDoctorStats();

        console.log("DOCTOR STATS:", data);

        setStats(data);
      } catch (error) {
        console.error("DOCTOR STATS ERROR:", error);
        setStatsError(
          error.message || "Failed to load dashboard stats"
        );
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  // Fetch today's appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoadingAppointments(true);

        const data = await listAppointmentsByStatuses([
          "pending",
          "scheduled",
          "confirmed",
        ]);

        console.log("ALL APPOINTMENTS:", data);

        const profiles = {};

for (const appointment of data) {
  try {
    const patientProfile = await getProfileById(
      appointment.patient_id,
      "patient"
    );

    profiles[appointment.patient_id] = patientProfile.profile;
  } catch (error) {
    console.error(
      `Failed to load patient ${appointment.patient_id}:`,
      error
    );
  }
}

setPatientProfiles(profiles);

        const today = new Date();

const todayAppointments = data.filter((appointment) => {
  const appointmentDate = new Date(appointment.appointment_time);

  return (
    appointmentDate.getFullYear() === today.getFullYear() &&
    appointmentDate.getMonth() === today.getMonth() &&
    appointmentDate.getDate() === today.getDate()
  );
});

console.log("TODAY APPOINTMENTS:", todayAppointments);

setTodayAppointments(todayAppointments);
      } catch (error) {
        console.error("DOCTOR APPOINTMENTS ERROR:", error);
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <DashboardLayout>
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#3d3d3d]">
          Patient Statistic
        </h1>
      </div>

      {/* ================= STATISTICS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Patients */}
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">
              Total Patients
            </h3>

            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Users
                className="w-4 h-4"
                fill="#331eb9"
              />
            </div>
          </div>

          <div className="text-2xl font-bold text-[#150d5e]">
            {loadingStats
              ? "..."
              : stats?.totalPatients ?? 0}

            <div className="flex items-center text-sm text-[#150d5e] mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />

              <span className="font-semibold text-sm mr-1">
                {stats?.weeklyChanges?.totalPatients
                  ?.percentChange ?? 0}
                %
              </span>

              <span className="text-sm">
                from last week
              </span>
            </div>
          </div>
        </div>

        {/* Total Appointments */}
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">
              Total Appointments
            </h3>

            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity
                className="w-4 h-4"
                fill="#331eb9"
              />
            </div>
          </div>

          <div className="text-2xl font-bold text-[#150d5e]">
            {loadingStats
              ? "..."
              : stats?.totalAppointments ?? 0}

            <div className="flex items-center text-sm text-[#150d5e] mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />

              <span className="font-semibold text-sm mr-1">
                {stats?.weeklyChanges?.totalAppointments
                  ?.percentChange ?? 0}
                %
              </span>

              <span className="text-sm">
                from last week
              </span>
            </div>
          </div>
        </div>

        {/* Scheduled Appointments */}
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">
              Appointments Scheduled
            </h3>

            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity
                className="w-4 h-4"
                fill="#331eb9"
              />
            </div>
          </div>

          <div className="text-2xl font-bold text-[#150d5e]">
            {loadingStats
              ? "..."
              : stats?.scheduledAppointments ?? 0}

            <div className="flex items-center text-sm text-[#150d5e] mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1" />

              <span className="font-semibold text-sm mr-1">
                {stats?.weeklyChanges
                  ?.scheduledAppointments
                  ?.percentChange ?? 0}
                %
              </span>

              <span className="text-sm">
                from last week
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TODAY APPOINTMENTS ================= */}
      <div className="rounded-2xl bg-white p-6 shadow-sm mb-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#263238]">
            Today Appointment
          </h2>

          <button
            onClick={() =>
              navigate("/docdashboard/appointments")
            }
            className="text-sm font-medium text-[#150D5E]"
          >
            View all
          </button>
        </div>

        {loadingAppointments ? (
          <div className="flex min-h-[180px] items-center justify-center">
            <p className="text-sm text-gray-500">
              Loading appointments...
            </p>
          </div>
        ) : todayAppointments.length === 0 ? (
          <div className="flex min-h-[180px] items-center justify-center">
            <p className="text-sm text-gray-500">
              No appointments scheduled for today.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {todayAppointments.map((appointment) => {
              const appointmentDate = new Date(
                appointment.appointment_time
              );

              const time =
                appointmentDate.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

              const date =
                appointmentDate.toLocaleDateString([], {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });

              return (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  {/* Patient */}
                  {/* Patient */}
<div className="flex items-center gap-3">
  <img
    src={
      patientProfiles[appointment.patient_id]?.profilePicture?.url ||
      sarah
    }
    alt="Patient"
    className="h-10 w-10 rounded-full object-cover"
  />

  <div>
    <h3 className="font-medium text-[#263238]">
      {patientProfiles[appointment.patient_id]
        ? `${patientProfiles[appointment.patient_id].firstName} ${patientProfiles[appointment.patient_id].lastName}`
        : "Patient"}
    </h3>

    <p className="text-sm text-gray-500 capitalize">
      {patientProfiles[appointment.patient_id]?.gender || "Gender unavailable"}
    </p>
  </div>
</div>

                  {/* Date and time */}
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#263238]">
                      {time}
                    </p>

                    <p className="text-xs text-gray-500">
                      {date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= RIGHT SIDE CONTENT ================= */}
      <div className="flex flex-col gap-8">
        {/* Tests */}
        <div className="border border-[#eef0f6] rounded-2xl p-6 bg-white">
          <div className="flex border-b border-[#eef0f6] mb-6 gap-8">
            {[
              "All",
              "Completed Test",
              "Pending Test",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(
                    tab.toLowerCase().split(" ")[0]
                  )
                }
                className={`pb-4 text-[14px] font-medium relative ${
                  activeTab ===
                  tab.toLowerCase().split(" ")[0]
                    ? "text-[#1a1a4b]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab}

                {activeTab ===
                  tab.toLowerCase().split(" ")[0] && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a4b]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl p-5 border border-[#eef0f6]"
              >
                <h4 className="text-[#454545] text-sm mb-1">
                  Full Blood Count Test (FBC)
                </h4>

                <div className="flex justify-between flex-wrap gap-2 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#464646] mb-0.5">
                      Sarah John
                    </span>

                    <span className="text-sm text-[#36833f] font-medium">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-end">
                    <span className="text-xs text-[#888888]">
                      Oct 12, 2025 11AM
                    </span>
                  </div>
                </div>

                <button className="bg-[#150d5e] text-[#fcfcfc] flex py-2.5 px-12 mx-auto rounded-xl text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors mt-2">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= AI PADI ================= */}
        <div className="border border-[#e7e7e7] p-4 bg-white flex flex-col overflow-hidden h-[370px]">
          <div className="py-4 border-b border-[#eef0f6] flex items-center justify-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <span className="font-medium text-[#1a1a4b]">
              AI Padi
            </span>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doctor}
                    alt="You"
                    className="w-[30px] h-[30px] rounded-full object-cover"
                  />

                  <span className="font-medium text-[#1a1a4b] text-[14px]">
                    You
                  </span>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <Edit3 className="w-[18px] h-[18px]" />
                </button>
              </div>

              <p className="text-[13px] text-gray-500 pl-[42px]">
                How can brain cause problems if not manage
                properly?
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                    <Sparkles className="w-[15px] h-[15px]" />
                  </div>

                  <span className="font-medium text-[#1a1a4b] text-[14px]">
                    AI Padi
                  </span>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <Copy className="w-[18px] h-[18px]" />
                </button>
              </div>

              <p className="text-[13px] text-gray-500 pl-[42px] leading-relaxed">
                Brain problems can manifest in various ways,
                and symptoms may include headaches, memory
                issues, changes in mood or behavior,
                difficulty concentrating, or physical
                coordination problems...
              </p>

              <div className="flex justify-center mt-6">
                <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
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
    </DashboardLayout>
  );
}