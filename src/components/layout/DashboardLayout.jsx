import { NavLink, useNavigate, useLocation } from "react-router";
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
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  FlaskConical,
  Building,
} from "lucide-react";
import logo from "../../assets/mediclogo2.svg";
import avatar from "../../assets/image.svg";
import { logoutUser } from "../../api/auth.api";

export default function DashboardLayout({
  children,
  role,
  profileName,
  profileSubtitle,
  avatarSrc,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeRole =
    role ||
    (location.pathname.startsWith("/docdashboard")
      ? "doctor"
      : location.pathname.startsWith("/pharmdashboard")
        ? "pharmacy"
        : "laboratory");

  const prefix =
    activeRole === "doctor"
      ? "/docdashboard"
      : activeRole === "pharmacy"
        ? "/pharmdashboard"
        : "/labdashboard";

  const menuItems =
    activeRole === "pharmacy"
      ? [
        { name: "Dashboard", icon: LayoutDashboard, path: prefix },
        { name: "Product", icon: Package, path: `${prefix}/product` },
        { name: "Order", icon: ShoppingCart, path: `${prefix}/order` },
        { name: "Customers", icon: Users, path: `${prefix}/customers` },
        { name: "Payments", icon: CreditCard, path: `${prefix}/payments` },
      ]
      : activeRole === "laboratory"
        ? [
          { name: "Dashboard", icon: LayoutDashboard, path: prefix },
          { name: "Patient", icon: Contact, path: `${prefix}/patient` },
          { name: "My Profile", icon: User, path: `${prefix}/profile` },
          { name: "Test", icon: FlaskConical, path: `${prefix}/test` },
          { name: "Department", icon: Building, path: `${prefix}/department` },
          {
            name: "Appointments",
            icon: CalendarDays,
            path: `${prefix}/appointments`,
          },
          { name: "Reports", icon: FileText, path: `${prefix}/reports` },
        ]
        : [
          { name: "Dashboard", icon: LayoutDashboard, path: prefix },
          { name: "Patient", icon: Contact, path: `${prefix}/patient` },
          { name: "My Profile", icon: User, path: `${prefix}/profile` },
          {
            name: "Appointments",
            icon: CalendarDays,
            path: `${prefix}/appointments`,
          },
          { name: "Reports", icon: FileText, path: `${prefix}/reports` },
        ];

  const helpItems = [
    { name: "Policy", icon: Shield, path: `${prefix}/policy` },
    { name: "Help Center", icon: HelpCircle, path: `${prefix}/help` },
    { name: "Settings", icon: Settings, path: `${prefix}/settings` },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate(
        activeRole === "doctor"
          ? "/doctor-signin"
          : activeRole === "pharmacy"
            ? "/pharmacy-signin"
            : "/laboratory-signin",
      );
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const displayName =
    profileName ||
    (activeRole === "doctor"
      ? "Dr. Sarah John"
      : activeRole === "pharmacy"
        ? "Alpha Pharmacy"
        : "Olivex Laboratory Center");
  const displaySubtitle =
    profileSubtitle ||
    (activeRole === "doctor"
      ? "Doctor"
      : activeRole === "pharmacy"
        ? "Pharmacist"
        : "View profile");
  const displayAvatar = avatarSrc || avatar;

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
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === prefix}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${isActive
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
              {helpItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${isActive
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
              placeholder={
                activeRole === "pharmacy"
                  ? "search products"
                  : activeRole === "laboratory"
                    ? location.pathname.endsWith("/department")
                      ? "search department"
                      : "search test"
                    : "search patient"
              }
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
                  src={displayAvatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#3d3d3d] leading-tight text-xl">
                  {displayName}
                </h4>
                <p className="text-xs text-[#464646] mt-0.5">
                  {displaySubtitle}
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
