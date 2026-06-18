import Icon from "../ui/Icon";
import Avatar from "../ui/Avatar";

function Topbar() {
  return (
    <header className="bg-white w-[1216px] h-[64px] flex items-center justify-between px-6 py-3 pr-[80px] pb-[16px] pt-[20px] pl-[48px] border-b border-[#E7E7E7] top-[56px] left-[224px]">
      
      <div className="w-[446px] h-[48px] flex items-center gap-1 bg-[#F6F6F6] rounded-xl px-3">
        <Icon name="search" className="w-4 h-4 text-[#D1D1D1]" />
        <input
          className="bg-transparent text-sm text-[#B0B0B0] placeholder-gray-400 outline-none flex-1"
          placeholder="Search patient"
        />
      </div>

      {/* Right side */}
      <div className="w-[259px] h-[42px] flex items-center gap-[40px]">
        {/* Notification bell */}
        <button className="relative w-9 h-9 rounded-full bg-[#F3F4FF] flex items-center justify-center text-[#150D5E] hover:bg-[#e8e9ff] transition-colors">
          <Icon name="bell" className="w-[24px] h-[24px]" />
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