import { NavLink, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Contact,
  User,
  CalendarDays,
  FileText,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import logo from "../../assets/mediclogo2.svg";
import avatar from "../../assets/image.svg";
import { logoutUser } from "../../api/auth.api";

const MENU_ITEMS = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/labdashboard" },
  { name: "Patient", icon: Contact, path: "/labdashboard/patient" },
  { name: "My Profile", icon: User, path: "/labdashboard/profile" },
  {
    name: "Appointments",
    icon: CalendarDays,
    path: "/labdashboard/appointments",
  },
  { name: "Reports", icon: FileText, path: "/labdashboard/reports" },
];

const HELP_ITEMS = [
  { name: "Policy", icon: Shield, path: "/labdashboard/policy" },
  { name: "Help Center", icon: HelpCircle, path: "/labdashboard/help" },
  { name: "Settings", icon: Settings, path: "/labdashboard/settings" },
];

export default function LabLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/laboratory-signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-[#1a1a4b]">
      <aside className="w-58 h-full bg-[#f8f9fc] flex flex-col border-r border-[#eef0f6] flex-shrink-0">
        <div className="p-8 flex items-center">
          <img src={logo} alt="Medic Padi" className="" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 pb-10 custom-scrollbar">
          <div className="mb-8">
            <h3 className="text-[#3D3D3D] mb-8 text-center text-xl px-4">
              Main Menu
            </h3>
            <nav className="flex flex-col gap-2">
              {MENU_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/labdashboard"}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#150D5E] text-white shadow-sm"
                        : "text-[#150D5E]"
                    }`
                  }
                >
                  <item.icon className="w-[22px] h-[22px] mr-4 opacity-90" />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-4 text-sm px-4">
              Help Center
            </h3>
            <nav className="flex flex-col gap-2">
              {HELP_ITEMS.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#1a1a4b] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#1a1a4b]"
                    }`
                  }
                >
                  <item.icon className="w-[22px] h-[22px] mr-4 opacity-90" />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2 text-left w-full"
              >
                <LogOut className="w-[22px] h-[22px] mr-4 opacity-90" />
                <span className="font-medium text-[15px]">Log Out</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        <header className="h-28 flex items-center justify-between px-10 border-b border-[#eef0f6] flex-shrink-0 bg-white">
          <div className="relative w-[480px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="search patient"
              className="w-full h-[52px] pl-12 pr-4 bg-[#f8f9fc] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-[15px]"
            />
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
              <Bell className="w-[22px] h-[22px] fill-current" />
            </button>

            <div className="flex items-center space-x-3 cursor-pointer pl-2 border-l border-gray-100">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#3d3d3d] leading-tight text-xl">
                  Olivex Laboratory Center
                </h4>
                <p className="text-xs text-[#464646] mt-0.5">View profile</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
