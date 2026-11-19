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
  ChevronRight,
  Users,
  CreditCard,
  FlaskConical,
  Building,
  Menu,
  X,
} from "lucide-react";
import logo from "../../assets/mediclogo2.svg";
// import avatar from "../../assets/image.svg";
import { logoutUser, retrieveProfile } from "../../api/auth.api";
import { globalSearch } from "../../api/search.api";


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
  const [doctorProfileData, setDoctorProfileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false); 
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
  const query = searchQuery.trim();

  setSelectedDoctor(null);

  if (query.length < 2) {
    setSearchResults({});
    setSearchError("");
    setShowSearchResults(false);
    setIsSearching(false);
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setIsSearching(true);
      setSearchError("");
      setShowSearchResults(true);

      const data = await globalSearch(query);

      setSearchResults(data);
      setShowSearchResults(true);
    } catch (error) {
      setSearchError(error.message || "Unable to search.");
      setSearchResults({});
      setShowSearchResults(true);
    } finally {
      setIsSearching(false);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [searchQuery]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const [labProfileData, setLabProfileData] = useState(() => {
    try {
      const userId = localStorage.getItem("userId");
      const saved = localStorage.getItem(`labProfile_${userId}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [pharmProfileData, setPharmProfileData] = useState(() => {
    try {
      const userId = localStorage.getItem("userId");
      const saved = localStorage.getItem(`pharmacyProfile_${userId}`);
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
          // { name: "Customers", icon: Users, path: `${prefix}/customers` },
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
            // { name: "Reports", icon: FileText, path: `${prefix}/reports` },
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

         useEffect(() => {
  if (activeRole !== "doctor") return;

  const token = localStorage.getItem("token");
  if (!token) return;

  const loadDoctorProfile = async () => {
    try {
      const data = await retrieveProfile();

      if (data) {
        setDoctorProfileData(data);
      }
    } catch (error) {
      console.error("Failed to load doctor profile:", error.message);
    }
  };

  loadDoctorProfile();
}, [activeRole]);

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

  
const doctorFirstName =
  doctorProfileData?.profile?.firstName ||
  doctorProfileData?.firstName ||
  "";

const doctorLastName =
  doctorProfileData?.profile?.lastName ||
  doctorProfileData?.lastName ||
  "";

const doctorName = [doctorFirstName, doctorLastName]
  .filter(Boolean)
  .join(" ");

const displayName =
  profileName ||
  (activeRole === "doctor"
    ? doctorName
      ? `Dr. ${doctorName}`
      : "Doctor"
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
  (activeRole === "doctor"
    ? doctorProfileData?.profile?.profilePicture?.url ||
      doctorProfileData?.profilePicture?.url
    : activeRole === "pharmacy"
      ? pharmProfileData?.avatarSrc
      : labProfileData?.avatarSrc) ||
  null;

  const hasSearchMatches = Object.values(searchResults).some((result) => {
  const items = Array.isArray(result)
    ? result
    : result?.data || [];

  return items.length > 0;
});

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

  {/* Search Area */}
  <div className="flex items-center gap-2 flex-1 max-w-[480px] min-w-0">

    {/* Mobile Sidebar Toggle */}
    <button
      type="button"
      onClick={() => setIsSidebarOpen(true)}
      className="lg:hidden p-2 rounded-xl text-[#150D5E] hover:bg-[#f8f9fc] transition-colors shrink-0"
      aria-label="Open Navigation Sidebar"
    >
      <Menu className="w-6 h-6" />
    </button>

    {/* Global Search */}
    <div className="relative w-full min-w-0">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          if (searchQuery.trim().length >= 2) {
            setShowSearchResults(true);
          }
        }}
        placeholder={
          activeRole === "pharmacy"
            ? "Search products"
            : activeRole === "laboratory"
              ? location.pathname.endsWith("/department")
                ? "Search department"
                : "Search test"
              : "Search doctors, pharmacies, labs..."
        }
        className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 bg-[#f8f9fc] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-xs sm:text-[15px]"
      />

      {/* Search Results Dropdown */}
      {showSearchResults && searchQuery.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-[100] max-h-[480px] overflow-y-auto">

          {isSearching && (
            <p className="p-4 text-sm text-gray-500">
              Searching...
            </p>
          )}

          {!isSearching && searchError && (
            <p className="p-4 text-sm text-red-500">
              {searchError}
            </p>
          )}

          {!isSearching && !searchError && !hasSearchMatches && (
            <p className="p-4 text-sm text-gray-500">
              No matching results found. Try another keyword.
            </p>
          )}

          {/* Search Results by Category */}
          {!isSearching &&
            !searchError &&
            hasSearchMatches &&
            Object.entries(searchResults).map(([type, result]) => {
              const items = Array.isArray(result)
                ? result
                : result?.data || [];

              if (items.length === 0) return null;

              const heading = {
                doctors: "Doctors",
                pharmacies: "Pharmacies",
                laboratories: "Laboratories",
                drugs: "Drugs",
                labTests: "Lab Tests",
              }[type] || type;

              return (
                <div key={type} className="p-3 border-b border-gray-100 last:border-b-0">

                  <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                    {heading}
                  </h4>

                  {items.map((item, index) => {
                    const isDoctor = type === "doctors";

                    const doctorName = [
                      item.firstName,
                      item.middleName,
                      item.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ") ||
                      item.fullName ||
                      item.name ||
                      "Doctor";

                    const resultName = isDoctor
                      ? doctorName
                      : item.name || item.title || item.drugName || "Unnamed result";

                    return (
                      <button
                        type="button"
                        key={item.id || item._id || index}
                        disabled={!isDoctor}
                        onClick={() => {
                          if (isDoctor) {
                            setSelectedDoctor(item);
                          }
                        }}
                        className={`w-full flex items-center gap-3 text-left px-3 py-3 rounded-lg transition-colors ${
                          isDoctor
                            ? "hover:bg-gray-50 cursor-pointer"
                            : "cursor-default"
                        }`}
                      >
                        {item.profilePicture?.url ? (
                          <img
                            src={item.profilePicture.url}
                            alt={resultName}
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#f0f2f8] flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-[#150D5E]" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-[#150D5E] truncate">
                            {resultName}
                          </p>

                          {isDoctor && (
                            <p className="text-xs text-gray-500 mt-1">
                              {item.specialty ||
                                item.specialization ||
                                item.designation ||
                                "Doctor"}
                            </p>
                          )}

                          {!isDoctor && item.address && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {item.address}
                            </p>
                          )}
                        </div>

                        {isDoctor && (
                          <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })}

          {/* Selected Doctor Details */}
          {selectedDoctor && (
            <div className="border-t border-gray-100 p-4 bg-[#f8f9fc]">

              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-sm text-[#150D5E]">
                  Doctor Details
                </h4>

                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="p-1.5 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  aria-label="Close doctor details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Doctor Profile */}
              <div className="flex items-center gap-3 mb-4">
                {selectedDoctor.profilePicture?.url ? (
                  <img
                    src={selectedDoctor.profilePicture.url}
                    alt="Doctor"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    <User className="w-7 h-7 text-[#150D5E]" />
                  </div>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-sm text-[#150D5E]">
                    {[
                      selectedDoctor.firstName,
                      selectedDoctor.middleName,
                      selectedDoctor.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ") ||
                      selectedDoctor.fullName ||
                      selectedDoctor.name ||
                      "Doctor"}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {selectedDoctor.specialty ||
                      selectedDoctor.specialization ||
                      selectedDoctor.designation ||
                      "Medical Doctor"}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                {(selectedDoctor.email || selectedDoctor.emailAddress) && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Email</p>
                    <p className="text-gray-700 break-words">
                      {selectedDoctor.email || selectedDoctor.emailAddress}
                    </p>
                  </div>
                )}

                {(selectedDoctor.phoneNumber || selectedDoctor.phone) && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Phone</p>
                    <p className="text-gray-700">
                      {selectedDoctor.phoneNumber || selectedDoctor.phone}
                    </p>
                  </div>
                )}

                {(selectedDoctor.hospitalName || selectedDoctor.clinicName) && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Workplace</p>
                    <p className="text-gray-700">
                      {selectedDoctor.hospitalName || selectedDoctor.clinicName}
                    </p>
                  </div>
                )}

                {selectedDoctor.yearsOfExperience != null && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Experience</p>
                    <p className="text-gray-700">
                      {selectedDoctor.yearsOfExperience} years
                    </p>
                  </div>
                )}

                {selectedDoctor.registrationNumber && (
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Registration Number
                    </p>
                    <p className="text-gray-700">
                      {selectedDoctor.registrationNumber}
                    </p>
                  </div>
                )}

              </div>

              {selectedDoctor.about && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-400 mb-1">
                    About
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {selectedDoctor.about}
                  </p>
                </div>
              )}

            </div>
          )}
        </div>
      )}
    </div>
  </div>

  {/* User Profile & Actions */}
  <div className="flex items-center gap-2 sm:gap-4 shrink-0">

    <button
      type="button"
      onClick={() => navigate(`${prefix}/notifications`)}
      className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
      aria-label="View notifications"
    >
      <Bell className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
    </button>

    <button
      type="button"
      onClick={() => navigate(`${prefix}/profile`)}
      className="flex items-center gap-2 sm:gap-3 pl-2 border-l border-gray-100 hover:opacity-85 transition-opacity text-left"
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

        <p className="text-xs text-[#464646] mt-0.5 truncate">
          {displaySubtitle}
        </p>
      </div>
    </button>

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
