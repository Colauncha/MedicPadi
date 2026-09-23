import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  listAppointmentsByStatuses,
  acceptAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointmentSignature,
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

const AppointmentDetails = ({
  appointment,
  onAccept,
  onComplete,
  onCancel,
  onJoin,
  actionLoading,
  joinLoading,
}) => {
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

      {(appointment.status === "scheduled" || appointment.status === "confirmed") && (
        <button
          onClick={() => onJoin(appointment.id)}
          disabled={joinLoading}
          className="w-fit text-xs text-[#4A4AFF] border border-[#4A4AFF] rounded-lg px-4 py-1.5 hover:bg-[#F3F4FF] transition-colors disabled:opacity-60"
        >
          {joinLoading ? "Getting signature..." : "Join Call"}
        </button>
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
  const [joinLoading, setJoinLoading] = useState(false);

  const fetchForTab = useCallback(async (tab) => {
    setLoading(true);
    setError("");
    try {
      const statuses = tab === "upcoming" ? UPCOMING_STATUSES : PAST_STATUSES;
      const list = await listAppointmentsByStatuses(statuses);
      setAppointments(list);
      setSelectedId(list.length ? list[0].id : null);
    } catch (err) {
      setError(err.message || "Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchForTab(activeTab);
  }, [activeTab, fetchForTab]);

  const selectedAppointment = appointments.find((a) => a.id === selectedId);

  const runAction = async (action, id) => {
    setActionLoading(true);
    setError("");
    try {
      await action(id);
      await fetchForTab(activeTab);
    } catch (err) {
      setError(err.message || "Action failed.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleJoin = async (id) => {
    setJoinLoading(true);
    setError("");
    try {
      const signature = await getAppointmentSignature(id);
      console.log("Zoom signature response:", signature);
    } catch (err) {
      setError(err.message || "Could not get meeting signature.");
    } finally {
      setJoinLoading(false);
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
              {!loading && appointments.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-8">No appointments here yet.</p>
              )}
              {!loading &&
                appointments.map((appt) => {
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
              onJoin={handleJoin}
              actionLoading={actionLoading}
              joinLoading={joinLoading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AppointmentPage;