import { useNavigate } from "react-router";
import Icon from "../ui/Icon";
import { NAV_ITEMS, HELP_ITEMS } from "../../Data/DashboardData";


function Sidebar({ active, setActive }) {
  const navigate = useNavigate();
  return (
    <aside className="w-[224px] min-h-[1140px] flex-shrink-0 flex flex-col px-3 pt-14 pb-6 gap-10 bg-[#F3F4FF] border-r border-[#D1D1D1]">
      
      {/* Logo */}
      <div className="w-[188px] h-[43px] flex items-center font-bold px-3 mb-10">
        <img
          src="/src/assets/images/WaitlistLogo.png"
          alt="Medicpadi Logo"
          className="h-full object-contain"
        />
      </div>

      {/* Main Nav */}
      <div className="w-[189px] min-h-[368px] flex flex-col gap-4 p-[16px_8px] border border-[#D1D1D1]">
        <p className="font-normal text-[20px] leading-[24px] tracking-[0px] text-center text-[#3D3D3D]">
        Main Menu
      </p>
      <nav className="flex flex-col w-[173px] h-[288px] gap-[22px]">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActive(item.id);
              if (item.id === "dashboard") navigate("/dashboard/docdashboard");
              if (item.id === "patient") navigate("/dashboard/patients");
              if (item.id === "profile") navigate("/dashboard/profile");
              if (item.id === "appointments") navigate("/dashboard/appointments");
              if (item.id === "reports") navigate("/dashboard/reports");
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-md font-medium transition-all ${
              active === item.id
                ? "bg-[#150D5E] text-white shadow-md"
                : "text-[#150D5E] hover:bg-[#150D5E] hover:text-white"
            }`}
          >
            <Icon name={item.icon} className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>
      </div>

      {/* Help Section */}
        <div className="w-[173px] min-h-[306px] flex flex-col gap-6 p-[16px_8px] border border-[#D1D1D1] mt-auto">
        <p className="w-[157px] h-[24px] font-normal text-[20px] leading-[24px] tracking-[0px] text-center text-[#3D3D3D]">
          Help Center
        </p>
        <div className="flex flex-col w-[173px] h-[288px] gap-[22px]">
          {HELP_ITEMS.map((item) => (
            <button
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-md text-[#150D5E] hover:bg-[#150D5E] hover:text-white transition-all"
            >
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </button>
          ))}

          {/* Log Out */}
          <button className="flex items-center gap-3 text-md text-[#BE122D] hover:opacity-90 transition-all mt-2">
            <Icon name="logout" className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;