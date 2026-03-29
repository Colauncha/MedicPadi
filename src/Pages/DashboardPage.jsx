import Sidebar from "../Components/Dashboard/Sidebar";
import Topbar from "../Components/Dashboard/Topbar";
import StatCards from "../Components/Dashboard/StatCards";
import TodayAppointments from "../Components/Dashboard/TodayAppointments";
import NextPatient from "../Components/Dashboard/NextPatient";
import AppointmentRequests from "../Components/Dashboard/AppointmentRequests";
import AiPadiChat from "../Components/Dashboard/AiPadiChat";

function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FE]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-xl font-bold text-[#150D5E] mb-5">Patient Statistic</h1>

          {/* Stat Cards */}
          <StatCards />

          {/* Today's Appointments + Next Patient */}
          <div className="flex gap-4 mb-4">
            <TodayAppointments />
            <NextPatient />
          </div>

          {/* Appointment Requests + AI Chat */}
          <div className="flex gap-4">
            <AppointmentRequests />
            <AiPadiChat />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;