import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getProfileById } from "../../../api/profile.api";
import { listAppointmentsByStatuses } from "../../../api/appointments.api";

function PatientDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState("upcoming");

  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState(null);

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  const [medicalRecords, setMedicalRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);

  const [labResults] = useState([
    { name: "General Blood Analysis" },
    { name: "Sugar Level Test" },
    { name: "Blood Pressure" },
  ]);

  // =========================
  // FETCH PATIENT PROFILE
  // =========================
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await getProfileById(id, "patient");

        const profile = response?.profile || response;

        setPatientData(profile);
      } catch (error) {
        console.error("Failed to load patient:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPatient();
    }
  }, [id]);

  // =========================
  // FETCH PATIENT APPOINTMENTS
  // =========================
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await listAppointmentsByStatuses([
          "pending",
          "scheduled",
          "confirmed",
          "completed",
        ]);

        const patientAppointments = data.filter(
          (appointment) => appointment.patient_id === id
        );

        console.log(
          "PATIENT APPOINTMENTS COUNT:",
          patientAppointments.length
        );

        console.log(
          "PATIENT APPOINTMENTS DATA:",
          patientAppointments
        );

        setAppointments(patientAppointments);
      } catch (error) {
        console.error(
          "Failed to load patient appointments:",
          error
        );
      } finally {
        setLoadingAppointments(false);
      }
    };

    if (id) {
      fetchAppointments();
    }
  }, [id]);

  // =========================
  // FETCH MEDICAL RECORDS
  // =========================
  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await fetch(
          `/api/ehr/records?patient_id=${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log(
          "PATIENT MEDICAL RECORDS:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to load medical records"
          );
        }

        const records = Array.isArray(data)
          ? data
          : data?.data || data?.records || [];

        setMedicalRecords(records);
      } catch (error) {
        console.error(
          "Medical Records Error:",
          error
        );
      } finally {
        setLoadingRecords(false);
      }
    };

    if (id) {
      fetchMedicalRecords();
    }
  }, [id]);


  useEffect(() => {
  const fetchLabTests = async () => {
    try {
      const response = await fetch("/api/services/lab/tests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("FIRST LAB TEST:", data?.data?.[0]);
    } catch (error) {
      console.error("Lab Tests Error:", error);
    }
  };

  fetchLabTests();
}, []);

  // =========================
  // FORMAT PATIENT DATA
  // =========================
  const patient = patientData
    ? {
        ...patientData,

        name: `${patientData.firstName || ""} ${
          patientData.lastName || ""
        }`.trim(),

        phone: patientData.phoneNumber,

        sex: patientData.gender,

        weight: patientData.weight
          ? `${patientData.weight}kg`
          : "N/A",

        height: patientData.height
          ? `${patientData.height}cm`
          : "N/A",

        allergies: Array.isArray(
          patientData.allergies
        )
          ? patientData.allergies.join(", ")
          : patientData.allergies || "None",

        emergencyName:
          patientData.nextOfKin?.name,

        emergencyPhone:
          patientData.nextOfKin?.phone,

        emergencyEmail:
          patientData.nextOfKin?.email,

        relationship:
          patientData.nextOfKin?.relationship,
      }
    : location.state?.patient;

  // =========================
  // LOADING PATIENT
  // =========================
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">
            Loading patient...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-gray-500">
            Patient not found.
          </p>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-[#150D5E] text-white px-5 py-2 rounded-lg text-sm"
          >
            Go Back
          </button>
        </div>
      </DashboardLayout>
    );
  }

  // =========================
  // APPOINTMENT COUNTS
  // =========================
  const now = new Date();

  const pastAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointment_time) < now
  );

  const upcomingAppointments = appointments.filter(
    (appt) =>
      new Date(appt.appointment_time) >= now
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-5 p-6 bg-gray-50 min-h-screen">

        {/* =========================
            BREADCRUMB
        ========================= */}
        <p className="text-xs text-gray-400">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate(-1)}
          >
            Patient
          </span>

          <span className="mx-1">
            ›
          </span>

          <span className="text-gray-600 font-medium">
            {patient.name}
          </span>
        </p>

        {/* =========================
            TOP SECTION
        ========================= */}
        <div className="flex gap-4">

          {/* PATIENT SUMMARY */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center gap-6 flex-1">

            <div className="flex flex-col items-center gap-2 flex-shrink-0">

              <div className="w-20 h-20 rounded-full bg-[#F3F4FF] overflow-hidden flex items-center justify-center border-2 border-[#150D5E]">
                <span className="text-[#150D5E] text-3xl font-bold">
                  {patient?.name?.charAt(0) || "P"}
                </span>
              </div>

              <p className="text-sm font-bold text-gray-800">
                {patient.name}
              </p>

            </div>

            <div className="flex items-center gap-3 flex-wrap">

              {[
                {
                  label: "Age",
                  value: patient.age || "N/A",
                },
                {
                  label: "Weight",
                  value: patient.weight || "N/A",
                },
                {
                  label: "Height",
                  value: patient.height || "N/A",
                },
                {
                  label: "Sex",
                  value:
                    patient.sex ||
                    patient.gender ||
                    "N/A",
                },
                {
                  label: "Allergies",
                  value:
                    patient.allergies ||
                    "None",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center bg-[#F3F4FF] rounded-lg px-4 py-2 min-w-[60px]"
                >
                  <p className="text-[10px] text-gray-400 font-medium">
                    {stat.label}
                  </p>

                  <p className="text-xs font-bold text-[#150D5E]">
                    {stat.value}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* APPOINTMENT SUMMARY */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 w-[200px] flex-shrink-0">

            <p className="text-xs font-semibold text-gray-500 text-center">
              Appointments
            </p>

            <div className="flex justify-around">

              {/* PAST */}
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-800">
                  {pastAppointments.length}
                </p>

                <p className="text-[10px] text-gray-400">
                  Past
                </p>
              </div>

              <div className="w-px bg-gray-100" />

              {/* UPCOMING */}
              <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-gray-800">
                  {upcomingAppointments.length}
                </p>

                <p className="text-[10px] text-gray-400">
                  Upcoming
                </p>
              </div>

            </div>

            <button className="w-full bg-[#150D5E] text-white text-xs py-2 rounded-lg font-medium hover:bg-[#1a1275] transition-colors">
              Send Message
            </button>

          </div>
        </div>

        {/* =========================
            MIDDLE SECTION
        ========================= */}
        <div className="grid grid-cols-3 gap-4">

          {/* PERSONAL INFORMATION */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">

            <h3 className="text-sm font-bold text-gray-800">
              Personal Information
            </h3>

            {[
              {
                label: "Name",
                value: patient.name,
              },
              {
                label: "Email Address",
                value:
                  patient.email || "N/A",
              },
              {
                label: "Phone Number",
                value:
                  patient.phone || "N/A",
              },
              {
                label: "Gender",
                value:
                  patient.gender || "N/A",
              },
              {
                label: "Blood Group",
                value:
                  patient.bloodGroup || "N/A",
              },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-[10px] text-gray-400 font-medium">
                  {field.label}
                </p>

                <p className="text-xs font-semibold text-gray-800">
                  {field.value}
                </p>
              </div>
            ))}

            <h3 className="text-sm font-bold text-gray-800 mt-3">
              Emergency Details
            </h3>

            {[
              {
                label: "Name",
                value:
                  patient.emergencyName ||
                  "N/A",
              },
              {
                label: "Email Address",
                value:
                  patient.emergencyEmail ||
                  "N/A",
              },
              {
                label: "Phone Number",
                value:
                  patient.emergencyPhone ||
                  "N/A",
              },
              {
                label: "Relationship",
                value:
                  patient.relationship ||
                  "N/A",
              },
            ].map((field) => (
              <div key={field.label}>
                <p className="text-[10px] text-gray-400 font-medium">
                  {field.label}
                </p>

                <p className="text-xs font-semibold text-gray-800">
                  {field.value}
                </p>
              </div>
            ))}

          </div>

          {/* =========================
              MEDICAL RECORDS
          ========================= */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">

            <h3 className="text-sm font-bold text-gray-800">
              Medical Records
            </h3>

            {loadingRecords ? (
              <p className="text-xs text-gray-400 py-4">
                Loading medical records...
              </p>
            ) : medicalRecords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8">

                <p className="text-sm text-gray-500">
                  No medical records available.
                </p>

                <p className="text-[10px] text-gray-400 mt-1">
                  Medical records will appear here when available.
                </p>

              </div>
            ) : (
              medicalRecords.map(
                (record, idx) => (
                  <div
                    key={
                      record.id || idx
                    }
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                  >

                    <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#150D5E] text-xs font-bold">
                        D
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-xs font-semibold text-gray-800">
                        {record.title ||
                          record.type ||
                          "Medical Record"}
                      </p>

                      <p className="text-[10px] text-gray-400">
                        {record.createdAt
                          ? new Date(
                              record.createdAt
                            ).toLocaleDateString(
                              "en-GB"
                            )
                          : "N/A"}
                      </p>

                    </div>

                    <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium">
                      View Report
                    </button>

                  </div>
                )
              )
            )}

          </div>

          {/* =========================
              LAB RESULTS
          ========================= */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">

            <h3 className="text-sm font-bold text-gray-800">
              Lab Results
            </h3>

            {labResults.map(
              (result, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                >

                  <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center flex-shrink-0">

                    <svg
                      className="w-4 h-4 text-[#150D5E]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>

                  </div>

                  <p className="text-xs font-semibold text-gray-800 flex-1">
                    {result.name}
                  </p>

                  <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium hover:bg-[#1a1275] transition-colors flex-shrink-0">
                    View Report
                  </button>

                </div>
              )
            )}

          </div>
        </div>

        {/* =========================
            BOTTOM SECTION
        ========================= */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">

          {/* TABS */}
          <div className="flex gap-6 border-b border-gray-100 pb-3">

            {[
              {
                key: "upcoming",
                label: "Upcoming Appointment",
              },
              {
                key: "past",
                label: "Past Appointment",
              },
              {
                key: "records",
                label: "Medical Records",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`text-xs font-semibold pb-1 transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "text-[#150D5E] border-[#150D5E]"
                    : "text-gray-400 border-transparent hover:text-gray-600"
                }`}
              >
                {tab.label}
              </button>
            ))}

          </div>

          {/* =========================
              APPOINTMENTS
          ========================= */}
          {(activeTab === "upcoming" ||
            activeTab === "past") && (
            <div className="flex flex-col gap-3">

              {loadingAppointments ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Loading appointments...
                </p>
              ) : (
                (() => {
                  const filteredAppointments =
                    activeTab === "upcoming"
                      ? upcomingAppointments
                      : pastAppointments;

                  if (
                    filteredAppointments.length ===
                    0
                  ) {
                    return (
                      <p className="text-sm text-gray-400 text-center py-6">
                        No{" "}
                        {activeTab}{" "}
                        appointments.
                      </p>
                    );
                  }

                  return filteredAppointments.map(
                    (appt) => {
                      const appointmentDate =
                        new Date(
                          appt.appointment_time
                        );

                      return (
                        <div
                          key={appt.id}
                          className="flex items-center gap-6 p-3 rounded-lg border border-gray-100"
                        >

                          <div className="flex flex-col min-w-[100px]">

                            <p className="text-xs font-semibold text-gray-800">
                              {appointmentDate.toLocaleDateString(
                                "en-GB"
                              )}
                            </p>

                            <p className="text-[10px] text-gray-400">
                              {appointmentDate.toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>

                          </div>

                          <div className="flex flex-col min-w-[80px]">

                            <p className="text-[10px] text-gray-400">
                              Type
                            </p>

                            <p className="text-xs font-semibold text-gray-800">
                              Consultation
                            </p>

                          </div>

                          <div className="flex flex-col min-w-[80px]">

                            <p className="text-[10px] text-gray-400">
                              Status
                            </p>

                            <p className="text-xs font-semibold text-green-600 capitalize">
                              {appt.status ||
                                "N/A"}
                            </p>

                          </div>

                          <div className="ml-auto">

                            <button className="bg-[#150D5E] text-white text-xs px-5 py-2 rounded-lg font-medium hover:bg-[#1a1275] transition-colors">
                              View
                            </button>

                          </div>

                        </div>
                      );
                    }
                  );
                })()
              )}

            </div>
          )}

          {/* =========================
              MEDICAL RECORDS TAB
          ========================= */}
          {activeTab === "records" && (
            <div className="flex flex-col gap-3">

              {loadingRecords ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Loading medical records...
                </p>
              ) : medicalRecords.length ===
                0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  No medical records available.
                </p>
              ) : (
                medicalRecords.map(
                  (record, idx) => (
                    <div
                      key={
                        record.id || idx
                      }
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-100"
                    >

                      <div className="w-8 h-8 rounded-full bg-[#F3F4FF] flex items-center justify-center">
                        <span className="text-[#150D5E] text-xs font-bold">
                          D
                        </span>
                      </div>

                      <div className="flex-1">

                        <p className="text-xs font-semibold text-gray-800">
                          {record.title ||
                            record.type ||
                            "Medical Record"}
                        </p>

                        <p className="text-[10px] text-gray-400">
                          {record.createdAt
                            ? new Date(
                                record.createdAt
                              ).toLocaleDateString(
                                "en-GB"
                              )
                            : "N/A"}
                        </p>

                      </div>

                      <button className="bg-[#150D5E] text-white text-[10px] px-3 py-1.5 rounded-lg font-medium">
                        View Report
                      </button>

                    </div>
                  )
                )
              )}

            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default PatientDetails;