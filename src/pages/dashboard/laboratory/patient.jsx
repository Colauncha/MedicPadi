import { useState, useEffect } from "react";
import { patientsTestRequisitions } from "../../../api/orders.api";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Users,
  Activity,
  CalendarDays,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  UserX,
} from "lucide-react";

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function LabPatient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);

        const labId = localStorage.getItem("userId");
        
        if (!labId) {
          setError("Lab ID not found. Please sign in again.");
          return;
        }

        const data = await patientsTestRequisitions(labId);

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.patients)
              ? data.patients
              : Array.isArray(data?.requisitions)
                ? data.requisitions
                : [];

        setPatients(list);
      } catch (err) {
        setError(err.message || "Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-[#3d3d3d]">
          Patient Statistic
        </h1>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Patients</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Users className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">
            {loading ? "—" : patients.length}
          </div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Total Treatment</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <Activity className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">—</div>
        </div>

        <div className="bg-[#f3f4ff] rounded-2xl p-6 relative h-[132px]">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-[#331eb9] text-base">Appointments Scheduled</h3>
            <div className="w-8 h-8 rounded-full bg-[#eef0f6] flex items-center justify-center text-[#1a1a4b]">
              <CalendarDays className="w-4 h-4" color="#331eb9" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#150d5e] mb-4">—</div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#150d5e]" />
          <span className="text-sm text-[#888888]">Loading patients…</span>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#c0392b]">
          <AlertCircle className="w-8 h-8" />
          <span className="text-sm text-center">{error}</span>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && patients.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#888888]">
          <UserX className="w-10 h-10 text-[#c0c0d0]" />
          <span className="text-sm">No patients found.</span>
        </div>
      )}

      {/* Patient grid */}
      {!loading && !error && patients.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {patients.map((patient, index) => {
            const name = patient.patientName || patient.name || patient.fullName || "Unknown";
            const testName = patient.testName || patient.test || patient.type || "Test";
            const time = patient.time || patient.scheduledTime || "";
            const date = patient.date || patient.scheduledDate || patient.createdAt || "";
            const pic = patient.patientProfilePicture || patient.patientImage || patient.profilePicture;
            const formattedDate = date
              ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
              : "—";
            const formattedTime = time
              ? time
              : date
              ? new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true })
              : "—";

            return (
              <div key={patient._id || patient.id || index} className="rounded-xl flex flex-col bg-[#f7f7fb]">
                <div className="p-4 flex gap-3">
                  {pic ? (
                    <img
                      src={pic}
                      alt={name}
                      className="w-12 h-12 rounded-full object-cover shrink-0 bg-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#e6e2ff] text-[#331eb9] flex items-center justify-center font-medium text-[14px] shrink-0">
                      {getInitials(name)}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="font-medium text-[#3d3d3d] text-sm leading-tight mt-0.5">
                      {name}
                    </p>
                    <p className="text-xs text-[#888888] mt-0.5">{testName}</p>
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
                  <span className="font-medium text-[#3d3d3d]">{formattedTime}</span>
                  <span className="text-xs text-[#888888]">{formattedDate}</span>
                </div>

                <div className="py-2.5 text-center bg-[#f7f7fb]">
                  <button className="text-sm text-[#331eb9] underline">
                    View details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}


