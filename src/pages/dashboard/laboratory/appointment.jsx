import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Calendar, Clock, FileText, Download, Loader2, AlertCircle, CalendarX } from "lucide-react";
import { testRequisitions } from "../../../api/orders.api";

// Format ISO date string to readable form
function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateLong(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short" });
}

function formatTime(timeStr) {
  if (!timeStr) return "—";
  const d = new Date(timeStr);
  if (!isNaN(d)) return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true });
  return timeStr;
}

function getInitials(name) {
  if (!name) return "?";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function LabAppointment() {
  const [activeTab, setActiveTab] = useState("Upcoming Appointment");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await testRequisitions();
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
          ? data.data
          : Array.isArray(data?.requisitions)
          ? data.requisitions
          : [];
        setAppointments(list);
        if (list.length > 0) setSelected(list[0]);
      } catch (err) {
        setError(err.message || "Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((apt) => {
    const status = (apt.status || "").toLowerCase();
    if (activeTab === "Past Appointment") {
      return status === "completed" || status === "past" || status === "cancelled";
    }
    return status !== "completed" && status !== "past" && status !== "cancelled";
  });

  const statusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "confirmed" || s === "accepted") return "border border-[#2e883e] text-[#2e883e] bg-white";
    if (s === "pending") return "border border-[#b58f00] text-[#b58f00] bg-white";
    if (s === "cancelled" || s === "rejected") return "border border-[#c0392b] text-[#c0392b] bg-white";
    if (s === "completed") return "border border-[#888888] text-[#888888] bg-white";
    return "border border-[#888888] text-[#888888] bg-white";
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-[1300px] mx-auto">
        {/* Left Column: Appointments List */}
        <div className="flex-[1.8] flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-[#e7e7e7] mb-8">
            {["Upcoming Appointment", "Past Appointment"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3.5 px-6 sm:px-12 text-[15px] sm:text-[16px] font-medium transition-colors relative ${
                  activeTab === tab ? "text-[#150d5e]" : "text-[#888888] hover:text-[#464646]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#150d5e]" />
                )}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#888888]">
              <Loader2 className="w-8 h-8 animate-spin text-[#150d5e]" />
              <span className="text-sm">Loading appointments…</span>
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
          {!loading && !error && filteredAppointments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-[#888888]">
              <CalendarX className="w-10 h-10 text-[#c0c0d0]" />
              <span className="text-sm">No {activeTab.toLowerCase()}s found.</span>
            </div>
          )}

          {/* List */}
          {!loading && !error && filteredAppointments.length > 0 && (
            <div className="flex flex-col gap-5">
              {filteredAppointments.map((apt, idx) => (
                <div
                  key={apt._id || apt.id || idx}
                  onClick={() => setSelected(apt)}
                  className={`bg-[#fcfdfd] border rounded-xl p-5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4 lg:gap-2 shadow-[0_1px_3px_rgba(0,0,0,0.02)] cursor-pointer transition-all ${
                    selected === apt
                      ? "border-[#150d5e] ring-1 ring-[#150d5e]/20"
                      : "border-[#f0f2f5] hover:border-[#c8caee]"
                  }`}
                >
                  <div className="flex flex-col w-[120px] shrink-0">
                    <span className="font-semibold text-[#454545] text-[14px] leading-tight mb-1">
                      {formatDate(apt.date || apt.scheduledDate || apt.createdAt)}
                    </span>
                    <span className="text-[#888888] text-[13px]">
                      {formatTime(apt.time || apt.scheduledTime || apt.date || apt.createdAt)}
                    </span>
                  </div>

                  <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                  <div className="flex flex-col w-[80px] shrink-0">
                    <span className="text-[#888888] text-[13px] mb-1">Type</span>
                    <span className="text-[#331eb9] font-medium text-[14px]">
                      {apt.testType || apt.type || "Test"}
                    </span>
                  </div>

                  <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                  <div className="flex flex-col w-[110px] shrink-0">
                    <span className="text-[#888888] text-[13px] mb-1">Test</span>
                    <span className="text-[#331eb9] font-medium text-[14px] truncate">
                      {apt.testName || apt.test || apt.name || "—"}
                    </span>
                  </div>

                  <div className="hidden lg:block h-10 w-px bg-[#e7e7e7]" />

                  <div className="flex flex-col w-[90px] shrink-0">
                    <span className="text-[#888888] text-[13px] mb-1">Status</span>
                    <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-md w-fit ${statusStyle(apt.status)}`}>
                      {apt.status || "—"}
                    </span>
                  </div>

                  <div className="w-full lg:w-auto mt-2 lg:mt-0 flex justify-end">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelected(apt); }}
                      className="bg-[#150d5e] text-white py-2.5 px-8 rounded-lg text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors w-full lg:w-auto"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Appointment Details */}
        <div className="flex-1 flex flex-col shrink-0 min-w-[320px]">
          <h3 className="text-[#454545] font-medium text-[15px] mb-8 mt-2">
            Appointment Details
          </h3>

          {!selected ? (
            <div className="border border-[#e7e7e7] rounded-xl bg-white p-10 flex flex-col items-center justify-center text-[#c0c0d0] gap-3">
              <CalendarX className="w-10 h-10" />
              <span className="text-sm text-[#888888]">Select an appointment to view details</span>
            </div>
          ) : (
            <>
              {/* Details Card */}
              <div className="border border-[#e7e7e7] rounded-xl overflow-hidden bg-white mb-8 pb-6">
                <div className="bg-[#ececff] p-6 lg:p-8 flex items-center relative overflow-hidden h-[160px]">
                  <div className="absolute top-4 -left-4 w-8 h-8 rounded-full bg-[#150d5e]" />
                  <div className="absolute top-4 -left-[14px] w-6 h-6 rounded-full bg-white" />
                  <div className="absolute bottom-8 -right-4 w-8 h-8 rounded-full bg-[#150d5e]" />

                  {/* Avatar */}
                  <div className="shrink-0 mr-6 z-10 relative">
                    {selected.patientProfilePicture || selected.patientImage ? (
                      <img
                        src={selected.patientProfilePicture || selected.patientImage}
                        alt={selected.patientName || "Patient"}
                        className="w-24 h-24 rounded-full object-cover border-[3px] border-white shadow-sm bg-gray-100"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-[3px] border-white shadow-sm bg-[#150d5e] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">
                          {getInitials(selected.patientName || selected.patient)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col z-10 w-full relative">
                    <div className="flex justify-between items-start w-full">
                      <div className="flex flex-col">
                        <h4 className="text-[#150d5e] text-xl font-bold mt-1">
                          {selected.patientName || selected.patient || "Unknown Patient"}
                        </h4>
                        <p className="text-[#454545] text-[12px] font-medium mt-1 mb-4">
                          {`Booked for ${selected.testName || selected.test || selected.name || "test"}`}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-md text-[11px] font-semibold mt-1 ${statusStyle(selected.status)}`}>
                        {selected.status || "—"}
                      </span>
                    </div>

                    <div className="flex items-center gap-8 mt-1">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-[#888888]" />
                        <div className="flex flex-col leading-tight gap-0.5">
                          <span className="text-[#454545] text-[11px] font-semibold">Date</span>
                          <span className="text-[#888888] text-[10px]">
                            {formatDateLong(selected.date || selected.scheduledDate || selected.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-[#888888]" />
                        <div className="flex flex-col leading-tight gap-0.5">
                          <span className="text-[#454545] text-[11px] font-semibold">Time</span>
                          <span className="text-[#888888] text-[10px]">
                            {formatTime(selected.time || selected.scheduledTime || selected.date || selected.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 px-6">
                  <button className="flex-[0.45] border border-[#150d5e] text-[#150d5e] py-2.5 rounded-lg text-[13px] font-semibold hover:bg-[#f8f9fc] transition-colors">
                    View Profile
                  </button>
                  <button
                    className={`flex-1 py-2.5 rounded-lg text-[13px] font-semibold border transition-colors ${
                      (selected.status || "").toLowerCase() === "pending"
                        ? "bg-[#150d5e] text-white hover:bg-[#1a1a4b]/90 border-transparent"
                        : "bg-[#f3f4ff] text-[#b0b0cc] cursor-not-allowed border-transparent"
                    }`}
                    disabled={(selected.status || "").toLowerCase() !== "pending"}
                  >
                    Accept
                  </button>
                </div>
              </div>

              {/* Appointment Summary */}
              {(selected.notes || selected.summary || selected.description) && (
                <div className="mb-8">
                  <h4 className="text-[#454545] font-semibold text-[14px] mb-3">Appointment Summary</h4>
                  <p className="text-[#888888] text-[13px] leading-[1.6]">
                    {selected.notes || selected.summary || selected.description}
                  </p>
                </div>
              )}

              {/* Uploaded Reports */}
              {Array.isArray(selected.reports) && selected.reports.length > 0 && (
                <div className="flex flex-col">
                  <h4 className="text-[#454545] font-semibold text-[14px] mb-4">Uploaded Report</h4>
                  <div className="flex flex-col gap-3">
                    {selected.reports.map((report, idx) => (
                      <a
                        key={idx}
                        href={report.url || report.fileUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-[#e7e7e7] rounded-lg p-3.5 flex items-center justify-between bg-white hover:bg-[#fcfdfd] transition-colors cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-[18px] h-[18px] text-[#888888]" strokeWidth={2.5} />
                          <span className="text-[#888888] text-[13px] font-medium">
                            {report.name || report.fileName || `Report ${idx + 1}`}
                          </span>
                        </div>
                        <Download className="w-[18px] h-[18px] text-[#150d5e]" strokeWidth={2.5} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* No details fallback */}
              {!selected.notes && !selected.summary && !selected.description &&
                (!Array.isArray(selected.reports) || selected.reports.length === 0) && (
                <div className="text-[#c0c0d0] text-sm text-center py-6 border border-dashed border-[#e7e7e7] rounded-xl">
                  No additional details available for this appointment.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

