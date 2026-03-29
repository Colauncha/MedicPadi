import Icon from "../ui/Icon";
import Avatar from "../ui/Avatar";

function Topbar() {
  return (
    <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-4">
      {/* Search */}
      <div className="flex items-center gap-2 bg-[#F8F9FE] rounded-xl px-3 py-2 max-w-sm flex-1">
        <Icon name="search" className="w-4 h-4 text-gray-400" />
        <input
          className="bg-transparent text-sm text-gray-600 placeholder-gray-400 outline-none flex-1"
          placeholder="Search patient"
        />
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-4">
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-full bg-[#F3F4FF] flex items-center justify-center text-[#150D5E] hover:bg-[#e8e9ff] transition-colors">
          <Icon name="bell" className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Doctor profile */}
        <div className="flex items-center gap-2.5">
          <Avatar name="D" size="w-9 h-9" bg="bg-[#2D1FA3]" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Dr. Ajayi Micheal</p>
            <p className="text-[10px] text-[#150D5E] font-medium cursor-pointer hover:underline">
              View profile
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;