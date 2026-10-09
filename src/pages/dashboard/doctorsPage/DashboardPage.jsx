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
  X,
} from "lucide-react";

import sarah from "../../../assets/sarah.svg";
import doctor from "../../../assets/image.svg";

import { listAppointmentsByStatuses } from "../../../api/appointments.api";
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

  // Lab tests
  const [testRequisitions, setTestRequisitions] = useState([]);
  const [loadingTests, setLoadingTests] = useState(true);
  const [selectedTest, setSelectedTest] = useState(null);

  // AI Padi
const [aiQuestion, setAiQuestion] = useState("");
const [aiResponse, setAiResponse] = useState("");
const [loadingAi, setLoadingAi] = useState(false);

  // ================================
  // FETCH DOCTOR STATISTICS
  // ===============================
useEffect(() => {
  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      setStatsError("");

      const appointments = await listAppointmentsByStatuses([
        "pending",
        "scheduled",
        "confirmed",
        "completed",
        "cancelled",
      ]);

      console.log("ALL APPOINTMENTS FOR STATS:", appointments);

      // Get unique patient IDs
      const uniquePatientIds = [
        ...new Set(
          appointments
            .map((appointment) => appointment.patient_id)
            .filter(Boolean)
        ),
      ];

      // Calculate statistics from appointment data
      const totalPatients = uniquePatientIds.length;

      const totalAppointments = appointments.length;

      const scheduledAppointments = appointments.filter(
        (appointment) =>
          appointment.status === "scheduled" ||
          appointment.status === "confirmed"
      ).length;

      const calculatedStats = {
        totalPatients,
        totalAppointments,
        scheduledAppointments,
        weeklyChanges: {
          totalPatients: {
            percentChange: 0,
          },
          totalAppointments: {
            percentChange: 0,
          },
          scheduledAppointments: {
            percentChange: 0,
          },
        },
      };

      console.log("CALCULATED DOCTOR STATS:", calculatedStats);

      setStats(calculatedStats);
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

  // ================================
  // FETCH TODAY'S APPOINTMENTS
  // ================================
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

        // Fetch patient profiles
        await Promise.all(
          data.map(async (appointment) => {
            try {
              const patientProfile = await getProfileById(
                appointment.patient_id,
                "patient"
              );

              profiles[appointment.patient_id] =
                patientProfile?.profile || patientProfile;
            } catch (error) {
              console.error(
                `Failed to load patient ${appointment.patient_id}:`,
                error
              );
            }
          })
        );

        setPatientProfiles(profiles);

        const today = new Date();

        const todayAppointments = data.filter((appointment) => {
          const appointmentDate = new Date(
            appointment.appointment_time
          );

          return (
            appointmentDate.getFullYear() ===
              today.getFullYear() &&
            appointmentDate.getMonth() ===
              today.getMonth() &&
            appointmentDate.getDate() ===
              today.getDate()
          );
        });

        console.log(
          "TODAY APPOINTMENTS:",
          todayAppointments
        );

        setTodayAppointments(todayAppointments);
      } catch (error) {
        console.error(
          "DOCTOR APPOINTMENTS ERROR:",
          error
        );
      } finally {
        setLoadingAppointments(false);
      }
    };

    fetchAppointments();
  }, []);

  // ================================
  // FETCH TEST REQUISITIONS
  // ================================
  useEffect(() => {
    const fetchTestRequisitions = async () => {
      try {
        setLoadingTests(true);

        const token = localStorage.getItem("token");

        const response = await fetch(
          "/api/orders/test-requisitions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch lab requisitions"
          );
        }

        const data = await response.json();

        // Fetch all requisition details at the same time
        const requisitions = await Promise.all(
          (data?.data || []).map(async (requisition) => {
            try {
              const detailsResponse = await fetch(
                `/api/orders/test-requisitions/${requisition.id}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!detailsResponse.ok) {
                return null;
              }

              const details =
                await detailsResponse.json();

              return {
                requisition,
                details,
              };
            } catch (error) {
              console.error(
                "Failed to load requisition:",
                requisition.id,
                error
              );

              return null;
            }
          })
        );

        const allItems = [];

        for (const result of requisitions) {
          if (!result) continue;

          const { requisition, details } = result;

          if (!Array.isArray(details?.items)) {
            continue;
          }

          details.items.forEach((item) => {
            allItems.push({
              ...item,

              name:
                item.lab_test_id ===
                "d5df7ff8-1f00-4479-83a1-342da1cf9750"
                  ? "Malaria"
                  : item.lab_test_id ===
                    "9f7c7826-1016-498d-881f-8fca73fb45ce"
                  ? "Full Blood Count"
                  : item.name || "Laboratory Test",

              patient_id: requisition.patient_id,

              requisitionStatus: details.status,

              paymentStatus: details.payment_status,

              date: details.createdAt,
            });
          });
        }

        console.log(
          "DASHBOARD LAB TESTS:",
          allItems
        );

        // Get patient profiles for lab tests
        const labPatientIds = [
          ...new Set(
            allItems
              .map((item) => item.patient_id)
              .filter(Boolean)
          ),
        ];

        const labProfiles = {};

        await Promise.all(
          labPatientIds.map(async (patientId) => {
            try {
              const patientProfile =
                await getProfileById(
                  patientId,
                  "patient"
                );

              labProfiles[patientId] =
                patientProfile?.profile ||
                patientProfile;
            } catch (error) {
              console.error(
                `Failed to load lab patient ${patientId}:`,
                error
              );
            }
          })
        );

        // Add lab patient profiles to existing profiles
        setPatientProfiles((previousProfiles) => ({
          ...previousProfiles,
          ...labProfiles,
        }));

        setTestRequisitions(allItems);
      } catch (error) {
        console.error(
          "TEST REQUISITIONS ERROR:",
          error
        );

        setTestRequisitions([]);
      } finally {
        setLoadingTests(false);
      }
    };

    fetchTestRequisitions();
  }, []);

  const askAiPadi = async () => {
  const question = aiQuestion.trim();

  if (!question || loadingAi) return;

  try {
    setLoadingAi(true);

    const token = localStorage.getItem("token");

    console.log("AI PADI TOKEN EXISTS:", !!token);
    console.log("AI PADI TOKEN:", token);

    const response = await fetch("/api/ai/chat", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: question,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error("AI PADI BACKEND ERROR:", errorData);

      throw new Error(
        errorData?.message || `AI Padi request failed (${response.status})`
        );
    }

    const data = await response.json();

    console.log("AI PADI RESPONSE:", data);

    setAiResponse(
      data?.response ||
        data?.message ||
        data?.data?.response ||
        "AI Padi did not return a response."
    );

    setAiQuestion("");
  } catch (error) {
    console.error("AI PADI ERROR:", error);

    setAiResponse(
      "Sorry, I couldn't process your question right now. Please try again."
    );
  } finally {
    setLoadingAi(false);
  }
};

  // ================================
  // FILTER TESTS
  // ================================
  const filteredTests =
    activeTab === "all"
      ? testRequisitions
      : testRequisitions.filter(
          (test) =>
            test.requisitionStatus?.toLowerCase() ===
            activeTab
        );

  return (
    <DashboardLayout>
      {/* ================= PAGE HEADING ================= */}
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

              const patient =
                patientProfiles[appointment.patient_id];

              const patientName = patient
                ? `${patient.firstName || ""} ${
                    patient.lastName || ""
                  }`.trim()
                : "Patient";

              return (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                >
                  {/* Patient */}
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        patient?.profilePicture?.url ||
                        sarah
                      }
                      alt="Patient"
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-medium text-[#263238]">
                        {patientName}
                      </h3>

                      <p className="text-sm text-gray-500 capitalize">
                        {patient?.gender ||
                          "Gender unavailable"}
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
        {/* ================= TESTS ================= */}
        <div className="border border-[#eef0f6] rounded-2xl p-6 bg-white">
          {/* Tabs */}
          <div className="flex border-b border-[#eef0f6] mb-6 gap-8">
            {[
              "All",
              "Completed Test",
              "Pending Test",
            ].map((tab) => {
              const tabValue =
                tab.toLowerCase().split(" ")[0];

              return (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tabValue)
                  }
                  className={`pb-4 text-[14px] font-medium relative ${
                    activeTab === tabValue
                      ? "text-[#1a1a4b]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab}

                  {activeTab === tabValue && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a1a4b]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Test Cards */}
          <div className="flex flex-col gap-4">
            {loadingTests ? (
              <div className="flex min-h-[150px] items-center justify-center">
                <p className="text-sm text-gray-500">
                  Loading tests...
                </p>
              </div>
            ) : filteredTests.length === 0 ? (
              <div className="flex min-h-[150px] items-center justify-center">
                <p className="text-sm text-gray-500">
                  No tests available.
                </p>
              </div>
            ) : (
              filteredTests.map((test) => {
                const patient =
                  patientProfiles[test.patient_id];

                const patientName = patient
                  ? `${patient.firstName || ""} ${
                      patient.lastName || ""
                    }`.trim()
                  : "Patient";

                return (
                  <div
                    key={test.id}
                    className="bg-white rounded-xl p-5 border border-[#eef0f6]"
                  >
                    <h4 className="text-[#454545] text-sm mb-1">
                      {test.name || "Laboratory Test"}
                    </h4>

                    <div className="flex justify-between flex-wrap gap-2 mb-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#464646] mb-0.5">
                          {patientName}
                        </span>

                        <span className="text-sm text-[#36833f] font-medium capitalize">
                          {test.requisitionStatus ||
                            "Pending"}
                        </span>
                      </div>

                      <div className="flex items-end">
                        <span className="text-xs text-[#888888]">
                          {test.date
                            ? new Date(
                                test.date
                              ).toLocaleDateString([], {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Date unavailable"}
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setSelectedTest(test)}
                      className="bg-[#150d5e] text-[#fcfcfc] flex py-2.5 px-12 mx-auto rounded-xl text-sm font-medium hover:bg-[#1a1a4b]/90 transition-colors mt-2"
                    >
                      View Details
                    </button>
                  </div>
                );
              })
            )}
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

              {aiQuestion && (
                <p className="text-[13px] text-gray-500 pl-[42px]">
                   {aiQuestion}
                </p>
           )}
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
                {loadingAi
                  ? "AI Padi is thinking..."
                  : aiResponse ||
                    "Ask AI Padi a medical question and I'll help you understand it."}
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
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    askAiPadi();
                  }
                }}
                placeholder="Type your question"
                className="flex-1 bg-transparent border-none focus:outline-none text-[14px] px-2"
              />

              <button
                onClick={askAiPadi}
                disabled={loadingAi || !aiQuestion.trim()}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center text-[#1a1a4b] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors mr-0.5"
              >
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= LAB TEST DETAILS MODAL ================= */}
{selectedTest && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1a1a4b]">
            Test Details
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Laboratory test information
          </p>
        </div>

        <button
          onClick={() => setSelectedTest(null)}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Modal Content */}
      <div className="space-y-5 px-6 py-6">

        {/* Test Name */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Test Name
          </p>
          <p className="font-medium text-[#263238]">
            {selectedTest.name || "Laboratory Test"}
          </p>
        </div>

        {/* Patient */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Patient
          </p>
          <p className="font-medium text-[#263238]">
            {patientProfiles[selectedTest.patient_id]
              ? `${patientProfiles[selectedTest.patient_id].firstName || ""} ${
                  patientProfiles[selectedTest.patient_id].lastName || ""
                }`.trim()
              : "Patient"}
          </p>
        </div>

        {/* Test Status */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Test Status
          </p>
          <p className="font-medium capitalize text-[#36833f]">
            {selectedTest.requisitionStatus || "Pending"}
          </p>
        </div>

        {/* Payment Status */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Payment Status
          </p>
          <p className="font-medium capitalize text-[#263238]">
            {selectedTest.paymentStatus || "Unavailable"}
          </p>
        </div>

        {/* Date */}
        <div>
          <p className="text-xs text-gray-500 mb-1">
            Date Requested
          </p>
          <p className="font-medium text-[#263238]">
            {selectedTest.date
              ? new Date(selectedTest.date).toLocaleDateString([], {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Date unavailable"}
          </p>
        </div>

        {/* Result */}
        <div className="rounded-xl bg-[#f8f9fc] p-4">
          <p className="text-xs text-gray-500 mb-2">
            Test Result
          </p>

          {selectedTest.result ||
          selectedTest.result_value ||
          selectedTest.value ||
          selectedTest.interpretation ? (
            <div className="space-y-2 text-sm text-[#263238]">
              {selectedTest.result && (
                <p>
                  <span className="font-medium">Result:</span>{" "}
                  {selectedTest.result}
                </p>
              )}

              {selectedTest.result_value && (
                <p>
                  <span className="font-medium">Value:</span>{" "}
                  {selectedTest.result_value}
                </p>
              )}

              {selectedTest.value && (
                <p>
                  <span className="font-medium">Value:</span>{" "}
                  {selectedTest.value}
                </p>
              )}

              {selectedTest.interpretation && (
                <p>
                  <span className="font-medium">Interpretation:</span>{" "}
                  {selectedTest.interpretation}
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No test result has been provided for this laboratory test.
            </p>
          )}
        </div>
      </div>

      {/* Modal Footer */}
      <div className="border-t border-gray-100 px-6 py-4">
        <button
          onClick={() => setSelectedTest(null)}
          className="w-full rounded-xl bg-[#150d5e] py-2.5 text-sm font-medium text-white hover:bg-[#1a1a4b]"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </DashboardLayout>
  );
}