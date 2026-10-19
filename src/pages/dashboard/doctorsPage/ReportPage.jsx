import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { getProfileById } from "../../../api/profile.api";

const tabs = ["Medical Reports", "Lab Reports", "Prescription"];

function AvatarPlaceholder({ name }) {
  const safeName = name || "Patient";

  const initials = safeName
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#BE122D] to-[#8b0d20] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
      {initials}
    </div>
  );
}

function UploadPanel() {
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [reportName, setReportName] = useState("");
  const [reportDate, setReportDate] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-[#150D5E]";

  const labelClass =
    "text-xs font-medium text-gray-700 mb-1 block";

  return (
    <div className="w-[260px] flex-shrink-0 border-l border-gray-100 p-5 flex flex-col gap-4 overflow-y-auto">
      <p className="text-xs font-medium text-[#1A1A2E] text-center">
        Kindly upload patient report below
      </p>

      {/* Drop Zone */}
      <label
        htmlFor="report-file-input"
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);

          const file = e.dataTransfer.files[0];

          if (file) {
            setFileName(file.name);
          }
        }}
        className={`border-2 border-dashed rounded-lg min-h-[110px] flex flex-col items-center justify-center gap-2 cursor-pointer p-4 transition-colors ${
          dragOver
            ? "border-[#BE122D] bg-red-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input
          id="report-file-input"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files[0];

            if (file) {
              setFileName(file.name);
            }
          }}
        />

        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 16V8M12 8L9 11M12 8L15 11"
            stroke="#BE122D"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M20 16.7C21.2 15.9 22 14.5 22 13C22 10.8 20.2 9 18 9C17.5 9 17 9.1 16.6 9.3C15.8 7.3 13.9 6 11.8 6C8.9 6 6.5 8.1 6.5 10.8C6.5 11 6.5 11.2 6.6 11.4C5.1 12 4 13.4 4 15C4 17.2 5.8 19 8 19H19C19.4 19 19.7 18.9 20 18.7"
            stroke="#BE122D"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        <span className="text-[11px] text-gray-400 text-center leading-relaxed">
          {fileName ? (
            <span className="text-[#BE122D] font-medium">
              {fileName}
            </span>
          ) : (
            <>
              Upload your file
              <br />
              <span className="text-[#BE122D]">
                or click to browse
              </span>
            </>
          )}
        </span>
      </label>

      <div className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>
            Report Name
          </label>

          <input
            type="text"
            placeholder="E.g Sugar level test"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Date of Report
          </label>

          <input
            type="date"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            Doctor Name
          </label>

          <input
            type="text"
            placeholder="E.g John Doe"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button className="w-full bg-[#150D5E] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1a1275] transition-colors">
        Upload
      </button>
    </div>
  );
}

function ReportRow({ report }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <AvatarPlaceholder name={report.name} />

        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#1A1A2E] truncate">
            {report.name}
          </p>

          <p className="text-[11px] text-gray-400 mt-0.5">
            {report.type}
          </p>

          <p className="text-[10px] text-gray-300 mt-0.5">
            {report.date}
          </p>
        </div>
      </div>

      <button className="bg-[#150D5E] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#BE122D] transition-colors flex-shrink-0">
        View Report
      </button>
    </div>
  );
}


function LabReportRow({ report, onView }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-4">
      <div className="min-w-0">
        <h3 className="font-medium text-gray-900">
          {report.testName || "Lab Test"}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Patient: {report.patientName || "Unknown Patient"}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Date:{" "}
          {report.date
            ? new Date(report.date).toLocaleDateString()
            : "Date unavailable"}
        </p>
      </div>

      <button
        type="button"
        onClick={onView}
        className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        View Report
      </button>
    </div>
  );
}


function ReportPage() {
  const [activeTab, setActiveTab] = useState("Medical Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const [medicalReports, setMedicalReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const [reportError, setReportError] = useState("");

  const [labReports, setLabReports] = useState([]);
  const [loadingLabReports, setLoadingLabReports] = useState(false);
  const [labReportError, setLabReportError] = useState("");

  const [prescriptions, setPrescriptions] = useState([]);
  const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
  const [prescriptionError, setPrescriptionError] = useState("");
  const [selectedLabReport, setSelectedLabReport] = useState(null);

  // ==========================================
  // FETCH MEDICAL REPORTS
  // ==========================================
  useEffect(() => {
    const fetchMedicalReports = async () => {
      try {
        setLoadingReports(true);
        setReportError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setReportError("You are not logged in.");
          return;
        }

        const response = await fetch(
          "/api/ehr/records",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        console.log(
          "REPORT PAGE - EHR RESPONSE:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to load medical reports"
          );
        }

        let records = [];

        if (Array.isArray(data)) {
          records = data;
        } else if (Array.isArray(data?.data)) {
          records = data.data;
        } else if (Array.isArray(data?.records)) {
          records = data.records;
        } else if (Array.isArray(data?.items)) {
          records = data.items;
        } else if (Array.isArray(data?.results)) {
          records = data.results;
        }

        console.log(
          "REPORT PAGE - MEDICAL RECORDS:",
          records
        );

        const patientIds = [
          ...new Set(
            records
              .map((record) => record.patient_id)
              .filter(Boolean)
          ),
        ];

        const patientMap = {};

        await Promise.all(
          patientIds.map(async (patientId) => {
            try {
              const profileResponse =
                await getProfileById(
                  patientId,
                  "patient"
                );

              const patient =
                profileResponse?.profile ||
                profileResponse;

              patientMap[patientId] = patient;
            } catch (error) {
              console.error(
                `Failed to fetch patient ${patientId}:`,
                error
              );
            }
          })
        );

        const formattedReports = records.map(
          (record) => {
            const patient =
              patientMap[record.patient_id];

            const patientName = patient
              ? `${patient.firstName || ""} ${
                  patient.lastName || ""
                }`.trim()
              : "Patient";

            let reportType =
              "Medical Report";

            switch (record.source_type) {
              case "appointment":
                reportType = "Consultation Report";
                break;

              case "lab_result":
                reportType = "Lab Report";
                break;

              case "prescription":
                reportType = "Prescription";
                break;

              case "upload":
                reportType = "Medical Report";
                break;

              default:
                reportType = "Medical Report";
            }

            const reportDate =
              record.createdAt ||
              record.created_at ||
              record.updatedAt ||
              record.updated_at;

            return {
              id: record.id,
              name: patientName,
              type: reportType,
              date: reportDate
                ? new Date(
                    reportDate
                  ).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : "Date unavailable",
              originalRecord: record,
            };
          }
        );

        setMedicalReports(formattedReports);
      } catch (error) {
        console.error(
          "Medical Reports Error:",
          error
        );

        setReportError(
          error.message ||
            "Failed to load medical reports."
        );

        setMedicalReports([]);
      } finally {
        setLoadingReports(false);
      }
    };

    fetchMedicalReports();
  }, []);

  // ==========================================
  // FETCH LAB REPORTS
  // ==========================================
  useEffect(() => {
    const fetchLabReports = async () => {
      try {
        setLoadingLabReports(true);
        setLabReportError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setLabReportError("You are not logged in.");
          return;
        }

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
          const errorData = await response.json();

          throw new Error(
            errorData?.message ||
              "Failed to fetch lab requisitions"
          );
        }

        const data = await response.json();

        console.log(
          "REPORT PAGE - LAB REQUISITIONS:",
          data
        );

        const requisitions = Array.isArray(
          data?.data
        )
          ? data.data
          : Array.isArray(data)
          ? data
          : [];

        const requisitionDetails =
          await Promise.all(
            requisitions.map(
              async (requisition) => {
                try {
                  const detailsResponse =
                    await fetch(
                      `/api/orders/test-requisitions/${requisition.id}`,
                      {
                        method: "GET",
                        headers: {
                          Authorization: `Bearer ${token}`,
                          "Content-Type":
                            "application/json",
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
                    `Failed to load lab requisition ${requisition.id}:`,
                    error
                  );

                  return null;
                }
              }
            )
          );

        const allLabReports = [];

        for (const result of requisitionDetails) {
          if (!result) continue;

          const {
            requisition,
            details,
          } = result;

          if (
            !Array.isArray(
              details?.items
            )
          ) {
            continue;
          }

          details.items.forEach((item) => {
            let testName =
              item.name ||
              "Laboratory Test";

            if (
              item.lab_test_id ===
              "d5df7ff8-1f00-4479-83a1-342da1cf9750"
            ) {
              testName = "Malaria";
            }

            if (
              item.lab_test_id ===
              "9f7c7826-1016-498d-881f-8fca73fb45ce"
            ) {
              testName = "Full Blood Count";
            }

            allLabReports.push({
              id:
                item.id ||
                `${requisition.id}-${item.lab_test_id}`,
              patientId:
                requisition.patient_id,
              testName,
              status:
                details.status ||
                "Unknown",
              paymentStatus:
                details.payment_status ||
                "Unknown",
              date:
                details.createdAt ||
                requisition.createdAt ||
                null,
              originalItem: item,
              requisition,
              details,
            });
          });
        }

        console.log(
          "REPORT PAGE - LAB REPORTS:",
          allLabReports
        );

        // Get unique patient IDs
        const patientIds = [
          ...new Set(
            allLabReports
              .map(
                (report) => report.patientId
              )
              .filter(Boolean)
          ),
        ];

        const patientMap = {};

        await Promise.all(
          patientIds.map(async (patientId) => {
            try {
              const profileResponse =
                await getProfileById(
                  patientId,
                  "patient"
                );

              const patient =
                profileResponse?.profile ||
                profileResponse;

              patientMap[patientId] =
                patient;
            } catch (error) {
              console.error(
                `Failed to fetch patient ${patientId}:`,
                error
              );
            }
          })
        );

        const formattedLabReports =
          allLabReports.map(
            (report) => {
              const patient =
                patientMap[
                  report.patientId
                ];

              const patientName = patient
                ? `${patient.firstName || ""} ${
                    patient.lastName || ""
                  }`.trim()
                : "Patient";

              return {
                ...report,
                name:
                  patientName || "Patient",
                date: report.date
                  ? new Date(
                      report.date
                    ).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Date unavailable",
              };
            }
          );

        setLabReports(
          formattedLabReports
        );
      } catch (error) {
        console.error(
          "Lab Reports Error:",
          error
        );

        setLabReportError(
          error.message ||
            "Failed to load lab reports."
        );

        setLabReports([]);
      } finally {
        setLoadingLabReports(false);
      }
    };

    fetchLabReports();
  }, []);

  // ==========================================
// FETCH PRESCRIPTIONS
// ==========================================
useEffect(() => {
  const fetchPrescriptions = async () => {
    try {
      setLoadingPrescriptions(true);
      setPrescriptionError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setPrescriptionError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "/api/orders/prescriptions",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("REPORT PAGE - PRESCRIPTIONS RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to load prescriptions."
        );
      }

      let records = [];

      if (Array.isArray(data)) {
        records = data;
      } else if (Array.isArray(data?.data)) {
        records = data.data;
      } else if (Array.isArray(data?.prescriptions)) {
        records = data.prescriptions;
      } else if (Array.isArray(data?.items)) {
        records = data.items;
      }

      const patientIds = [
        ...new Set(
          records
            .map((record) => record.patient_id)
            .filter(Boolean)
        ),
      ];

      const patientMap = {};

      await Promise.all(
        patientIds.map(async (patientId) => {
          try {
            const profileResponse = await getProfileById(
              patientId,
              "patient"
            );

            patientMap[patientId] =
              profileResponse?.profile || profileResponse;
          } catch (error) {
            console.error(
              `Failed to fetch patient ${patientId}:`,
              error
            );
          }
        })
      );

      const formattedPrescriptions = records.map((record) => {
        const patient = patientMap[record.patient_id];

        const patientName = patient
          ? `${patient.firstName || ""} ${
              patient.lastName || ""
            }`.trim()
          : "Patient";

        const date =
          record.createdAt ||
          record.created_at ||
          record.updatedAt ||
          record.updated_at;

        return {
          id: record.id,
          name: patientName || "Patient",
          type: "Prescription",
          date: date
            ? new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date unavailable",
          medications: Array.isArray(record.items)
            ? record.items
            : [],
          notes: record.notes || "",
          originalRecord: record,
        };
      });

      console.log(
        "REPORT PAGE - FORMATTED PRESCRIPTIONS:",
        formattedPrescriptions
      );

      setPrescriptions(formattedPrescriptions);
    } catch (error) {
      console.error("Prescription Error:", error);

      setPrescriptionError(
        error.message || "Failed to load prescriptions."
      );

      setPrescriptions([]);
    } finally {
      setLoadingPrescriptions(false);
    }
  };

  fetchPrescriptions();
}, []);

  // ==========================================
  // FILTER MEDICAL REPORTS
  // ==========================================
  const filteredReports =
    medicalReports.filter((report) => {
      const query =
        searchQuery.toLowerCase();

      return (
        report.name
          .toLowerCase()
          .includes(query) ||
        report.type
          .toLowerCase()
          .includes(query)
      );
    });

  // ==========================================
  // FILTER LAB REPORTS
  // ==========================================
  const filteredLabReports =
    labReports.filter((report) => {
      const query =
        searchQuery.toLowerCase();

      return (
        report.name
          .toLowerCase()
          .includes(query) ||
        report.testName
          .toLowerCase()
          .includes(query) ||
        report.status
          .toLowerCase()
          .includes(query)
      );
    });

    // ==========================================
// FILTER PRESCRIPTIONS
// ==========================================
const filteredPrescriptions = prescriptions.filter((prescription) => {
  const query = searchQuery.toLowerCase();

  const medicationNames = prescription.medications
    .map((item) => item.medication_name || "")
    .join(" ");

  return (
    prescription.name.toLowerCase().includes(query) ||
    medicationNames.toLowerCase().includes(query) ||
    prescription.notes.toLowerCase().includes(query)
  );
});

  return (
    <DashboardLayout>
      <div className="p-5 h-full flex flex-col">

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">

          {/* Search bar */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="relative w-full max-w-xs">

              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="text"
                placeholder="search report"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-[#150D5E]"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">

            {/* Left */}
            <div className="flex-1 flex flex-col overflow-hidden">

              {/* Tabs */}
              <div className="flex border-b border-gray-100 px-5">

                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() =>
                      setActiveTab(tab)
                    }
                    className={`py-3 px-4 text-xs font-medium border-b-2 transition-colors -mb-px ${
                      activeTab === tab
                        ? "border-[#BE122D] text-[#BE122D]"
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}

              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto">

                {/* Medical Reports */}
                {activeTab === "Medical Reports" && (
                  <>
                    {loadingReports ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-xs text-gray-400">
                          Loading medical reports...
                        </p>
                      </div>
                    ) : reportError ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2">
                        <p className="text-xs text-red-500">
                          {reportError}
                        </p>
                      </div>
                    ) : filteredReports.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300">

                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>

                        <p className="text-xs">
                          No medical reports found
                        </p>

                      </div>
                    ) : (
                      filteredReports.map(
                        (report) => (
                          <ReportRow
                            key={report.id}
                            report={report}
                          />
                        )
                      )
                    )}
                  </>
                )}

                {/* Lab Reports */}
                {activeTab === "Lab Reports" && (
                  <>
                    {loadingLabReports ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-xs text-gray-400">
                          Loading lab reports...
                        </p>
                      </div>
                    ) : labReportError ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2">
                        <p className="text-xs text-red-500">
                          {labReportError}
                        </p>
                      </div>
                    ) : filteredLabReports.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300">

                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>

                        <p className="text-xs">
                          No lab reports found
                        </p>

                      </div>
                    ) : (
                      filteredLabReports.map(
                        (report) => (
                          <LabReportRow
                          key={report.id}
                          report={report}
                          onView={() => setSelectedLabReport(report)}
                          />
                        )
                      )
                    )}
                  </>
                )}

                {/* Prescription */}
{activeTab === "Prescription" && (
  <>
    {loadingPrescriptions ? (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-gray-400">
          Loading prescriptions...
        </p>
      </div>
    ) : prescriptionError ? (
      <div className="flex items-center justify-center h-full">
        <p className="text-xs text-red-500">
          {prescriptionError}
        </p>
      </div>
    ) : filteredPrescriptions.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300">
        <p className="text-xs">
          No prescriptions found
        </p>
      </div>
    ) : (
      filteredPrescriptions.map((prescription) => (
        <div
          key={prescription.id}
          className="flex items-center justify-between px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors gap-3"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AvatarPlaceholder name={prescription.name} />

            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#1A1A2E] truncate">
                {prescription.name}
              </p>

              <p className="text-[11px] text-gray-400 mt-0.5">
                {prescription.medications.length > 0
                  ? prescription.medications
                      .map((item) => item.medication_name || "Medication")
                      .join(", ")
                  : "No medication items listed"}
              </p>

              <p className="text-[10px] text-gray-300 mt-0.5">
                {prescription.date}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              console.log(
                "SELECTED PRESCRIPTION:",
                prescription.originalRecord
              );
            }}
            className="bg-[#150D5E] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#BE122D] transition-colors flex-shrink-0"
          >
            View Report
          </button>
        </div>
      ))
    )}
  </>
)}

              </div>
            </div>

            {/* Right: Upload Panel */}
            <UploadPanel />

          </div>
        </div>
      </div>

{selectedLabReport && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    onClick={() => setSelectedLabReport(null)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lab-report-title"
      className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2
            id="lab-report-title"
            className="text-xl font-semibold text-gray-900"
          >
            Lab Report Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Information available for this lab test
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSelectedLabReport(null)}
          aria-label="Close report details"
          className="rounded-lg px-3 py-1 text-2xl text-gray-500 hover:bg-gray-100"
        >
          &times;
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Patient</p>
          <p className="font-medium text-gray-900">
            {selectedLabReport.patientName || "Unknown Patient"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Test Name</p>
          <p className="font-medium text-gray-900">
            {selectedLabReport.testName || "Lab Test"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Request Status</p>
          <p className="font-medium capitalize text-gray-900">
            {selectedLabReport.status || "Unavailable"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Payment Status</p>
          <p className="font-medium capitalize text-gray-900">
            {(selectedLabReport.paymentStatus || "Unavailable").replace(
              /_/g,
              " "
            )}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date Requested</p>
          <p className="font-medium text-gray-900">
            {selectedLabReport.date
              ? new Date(selectedLabReport.date).toLocaleString()
              : "Date unavailable"}
          </p>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
          This information describes the lab test request. Actual laboratory
          results are not displayed unless result data is provided by the API.
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSelectedLabReport(null)}
        className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
)}
</DashboardLayout>
  );
}

export default ReportPage;