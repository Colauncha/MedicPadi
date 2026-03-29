import Icon from "../ui/Icon";
import { NAV_ITEMS, HELP_ITEMS } from "../../Data/DashboardData";

function Sidebar({ active, setActive }) {
  return (
    <aside
      style={{ width: "224px", minHeight: "1140px", paddingTop: "56px", gap: "40px" }}
      className="flex-shrink-0 flex flex-col px-3 pb-6 bg-[#F3F4FF] border-r border-[#D1D1D1]"
    >
      {/* Logo */}
      <div 
        style={{ width: "188px", height: "43px" }}
        className="flex items-center gap-2 px-3 mb-10"
      >
        <img
          src="/src/assets/images/Medicpadi_logo.png"
          alt="Medicpadi Logo"
          className="h-full object-contain"
        />
        <span className="font-bold text-[#150D5E] text-base tracking-tight">MEDICPADI</span>
      </div>

      {/* Main Nav */}
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
        Main Menu
      </p>
      <nav className="flex flex-col gap-1 mb-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active === item.id
                ? "bg-[#150D5E] text-white shadow-md"
                : "text-gray-500 hover:bg-[#150D5E] hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Help Section */}
      <div className="mt-6">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
          Help Center
        </p>
        <div className="flex flex-col gap-1">
          {HELP_ITEMS.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-[#150D5E] hover:text-white transition-all"
            >
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </button>
          ))}
          {/* Log Out */}
    <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-[#BE122D] hover:opacity-90 transition-all mt-2">
      <Icon name="logout" className="w-4 h-4" />
      Log Out
    </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;