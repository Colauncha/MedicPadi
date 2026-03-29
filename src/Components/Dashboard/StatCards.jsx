import Icon from "../ui/Icon";
import { STAT_CARDS } from "../../Data/DashboardData";

function StatCard({ label, value, sub, icon, accent }) {
  return (
    <div className="bg-white rounded-2xl p-5 flex-1 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon name={icon} className="w-4 h-4 text-white" />
        </div>
      </div>
      <p className="text-3xl font-bold text-[#150D5E] mb-2">{value}</p>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-0.5 text-emerald-500 bg-emerald-50 rounded-full px-2 py-0.5">
          <Icon name="trendUp" className="w-3 h-3" />
          <span className="text-[10px] font-bold">{sub}</span>
        </div>
      </div>
    </div>
  );
}

function StatCards() {
  return (
    <div className="flex gap-4 mb-6">
      {STAT_CARDS.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
}

export default StatCards;