import { useState, useEffect } from "react";
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
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/mediclogo2.svg";
import avatar from "../../assets/image.svg";
import { logoutUser, retrieveProfile } from "../../api/auth.api";

export default function DashboardLayout({
  children,
  role,
  profileName,
  profileSubtitle,
  avatarSrc,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const [labProfileData, setLabProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("labProfile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [pharmProfileData, setPharmProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("pharmacyProfile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem("labProfile");
        if (saved) setLabProfileData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };

    loadProfile();

    const token = localStorage.getItem("token");
    if (token) {
      retrieveProfile()
        .then((data) => {
          if (data) {
            setLabProfileData((prev) => ({
              ...prev,
              companyName: data.companyName || data.name || prev?.companyName,
              avatarSrc: data.profilePicture?.url || prev?.avatarSrc,
            }));
          }
        })
        .catch(() => {});
    }

    window.addEventListener("profileUpdate", loadProfile);
    return () => window.removeEventListener("profileUpdate", loadProfile);
  }, []);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem("pharmacyProfile");
        if (saved) setPharmProfileData(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    };

    loadProfile();

    const token = localStorage.getItem("token");
    if (token) {
      retrieveProfile()
        .then((data) => {
          if (data) {
            setPharmProfileData((prev) => ({
              ...prev,
              companyName: data.companyName || data.name || prev?.companyName,
              avatarSrc: data.profilePicture?.url || prev?.avatarSrc,
            }));
          }
        })
        .catch(() => {});
    }

    window.addEventListener("profileUpdate", loadProfile);
    return () => window.removeEventListener("profileUpdate", loadProfile);
  }, []);

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
            {
              name: "Department",
              icon: Building,
              path: `${prefix}/department`,
            },
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
        ? pharmProfileData?.companyName ||
          pharmProfileData?.name ||
          "Alpha Pharmacy"
        : labProfileData?.companyName ||
          labProfileData?.name ||
          "Olivex Laboratory Center");
  const displaySubtitle =
    profileSubtitle ||
    (activeRole === "doctor"
      ? "Doctor"
      : activeRole === "pharmacy"
        ? "Pharmacist"
        : "View profile");

  const displayAvatar =
    avatarSrc ||
    (activeRole === "pharmacy"
      ? pharmProfileData?.avatarSrc
      : labProfileData?.avatarSrc) ||
    null;

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden text-[#1a1a4b]">
      {/* Mobile Overlay Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 lg:w-60 h-full bg-[#f8f9fc] flex flex-col border-r border-[#eef0f6] flex-shrink-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 lg:p-8 flex items-center justify-between">
          <img
            src={logo}
            alt="Medic Padi"
            className="h-8 lg:h-9 object-contain"
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-2 pb-10 custom-scrollbar">
          <div className="mb-8">
            <nav className="flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === prefix}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#150D5E] text-white shadow-sm"
                        : "text-[#150D5E] hover:bg-[#150D5E]/10"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3.5 opacity-90 shrink-0" />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-gray-500 font-medium mb-3 text-xs uppercase tracking-wider px-4">
              Help Center
            </h3>
            <nav className="flex flex-col gap-1.5">
              {helpItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#1a1a4b] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-100 hover:text-[#1a1a4b]"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3.5 opacity-90 shrink-0" />
                  <span className="font-medium text-[15px]">{item.name}</span>
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-2 text-left w-full cursor-pointer"
              >
                <LogOut className="w-5 h-5 mr-3.5 opacity-90 shrink-0" />
                <span className="font-medium text-[15px]">Log Out</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* Header Topbar */}
        <header className="h-16 sm:h-20 lg:h-24 flex items-center justify-between px-4 sm:px-6 lg:px-10 border-b border-[#eef0f6] flex-shrink-0 bg-white gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-[480px]">
            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#150D5E] hover:bg-[#f8f9fc] transition-colors shrink-0"
              aria-label="Open Navigation Sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
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
                className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 bg-[#f8f9fc] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-xs sm:text-[15px]"
              />
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
              <Bell className="w-5 h-5 sm:w-[22px] sm:h-[22px] fill-current" />
            </button>

            <div
              onClick={() => navigate(`${prefix}/profile`)}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer pl-2 border-l border-gray-100 hover:opacity-85 transition-opacity"
              title="View profile"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#f0f2f8] border border-[#eef0f6] overflow-hidden shrink-0 flex items-center justify-center text-[#9a9db0]">
                {displayAvatar ? (
                  <img
                    src={displayAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                )}
              </div>
              <div className="hidden sm:flex flex-col">
                <h4 className="text-[#3d3d3d] leading-tight font-medium text-sm sm:text-base lg:text-lg truncate max-w-[150px] lg:max-w-[220px]">
                  {displayName}
                </h4>
                <p className="text-xs text-[#464646] mt-0.5 hover:text-[#150d5e] transition-colors truncate">
                  {displaySubtitle}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
