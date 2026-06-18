import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

const mockReports = [
  { id: 1, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 2, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 3, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 4, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 5, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 6, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 7, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 8, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
  { id: 9, name: "Sarah John", type: "Consultation Report", date: "March 24, 2025" },
];

const tabs = ["Medical Reports", "Lab Reports", "Prescription"];

function AvatarPlaceholder({ name }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
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

  const inputClass = "w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-[#150D5E]";
  const labelClass = "text-xs font-medium text-gray-700 mb-1 block";

  return (
    <div className="w-[260px] flex-shrink-0 border-l border-gray-100 p-5 flex flex-col gap-4 overflow-y-auto">
      <p className="text-xs font-medium text-[#1A1A2E] text-center">
        Kindly upload patient report below
      </p>

      {/* Drop Zone */}
      <label
        htmlFor="report-file-input"
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files[0];
          if (file) setFileName(file.name);
        }}
        className={`border-2 border-dashed rounded-lg min-h-[110px] flex flex-col items-center justify-center gap-2 cursor-pointer p-4 transition-colors ${
          dragOver ? "border-[#BE122D] bg-red-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <input
          id="report-file-input"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => { const f = e.target.files[0]; if (f) setFileName(f.name); }}
        />
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#BE122D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 16.7C21.2 15.9 22 14.5 22 13C22 10.8 20.2 9 18 9C17.5 9 17 9.1 16.6 9.3C15.8 7.3 13.9 6 11.8 6C8.9 6 6.5 8.1 6.5 10.8C6.5 11 6.5 11.2 6.6 11.4C5.1 12 4 13.4 4 15C4 17.2 5.8 19 8 19H19C19.4 19 19.7 18.9 20 18.7" stroke="#BE122D" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <span className="text-[11px] text-gray-400 text-center leading-relaxed">
          {fileName
            ? <span className="text-[#BE122D] font-medium">{fileName}</span>
            : <>Upload your file<br /><span className="text-[#BE122D]">or click to browse</span></>}
        </span>
      </label>

      <div className="flex flex-col gap-3">
        <div>
          <label className={labelClass}>Report Name</label>
          <input type="text" placeholder="E.g Sugar level test" value={reportName} onChange={(e) => setReportName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Date of Report</label>
          <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Doctor Name</label>
          <input type="text" placeholder="E.g John Doe" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className={inputClass} />
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
          <p className="text-xs font-semibold text-[#1A1A2E] truncate">{report.name}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{report.type}</p>
          <p className="text-[10px] text-gray-300 mt-0.5">{report.date}</p>
        </div>
      </div>
      <button className="bg-[#150D5E] text-white text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-[#BE122D] transition-colors flex-shrink-0">
        View Report
      </button>
    </div>
  );
}

function ReportPage() {
  const [activeTab, setActiveTab] = useState("Medical Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockReports.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    // ✅ FIXED: replaced broken inline layout (with undefined <Topbar />) with DashboardLayout
    <DashboardLayout>
      <div className="p-5 h-full flex flex-col">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">

          {/* Search bar */}
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-3">
            <div className="relative w-full max-w-xs">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                placeholder="search report"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-xs text-gray-700 bg-gray-50 focus:outline-none focus:border-[#150D5E]"
              />
            </div>
          </div>

          {/* Content: list + upload */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left: tabs + list */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 px-5">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
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
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2 text-gray-300">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <p className="text-xs">No reports found</p>
                  </div>
                ) : (
                  filtered.map((report) => <ReportRow key={report.id} report={report} />)
                )}
              </div>
            </div>

            {/* Right: Upload Panel */}
            <UploadPanel />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ReportPage;