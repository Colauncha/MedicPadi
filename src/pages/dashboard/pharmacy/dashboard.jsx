import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  Search,
  ArrowUpRight,
  Package,
} from "lucide-react";

export default function PharmDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      title: "Total Products",
      value: "1,000",
      change: "15% from last week",
      icon: Package,
    },
    {
      title: "Total Customers",
      value: "5,000",
      change: "15% from last week",
      icon: Users,
    },
    {
      title: "Total Orders",
      value: "200",
      change: "15% from last week",
      icon: ShoppingCart,
    },
  ];

  const chartData = [
    { month: "Jan", height: "h-[65%]", bg: "bg-[#EEECF9]" },
    { month: "Feb", height: "h-[45%]", bg: "bg-[#FFF3D6]" },
    { month: "Mar", height: "h-[90%]", bg: "bg-[#E5F7EB]" },
    { month: "Apr", height: "h-[65%]", bg: "bg-[#EEECF9]" },
    { month: "May", height: "h-[85%]", bg: "bg-[#FFF3D6]" },
    { month: "June", height: "h-[80%]", bg: "bg-[#E5F7EB]" },
    { month: "July", height: "h-[45%]", bg: "bg-[#EEECF9]" },
    { month: "Aug", height: "h-[80%]", bg: "bg-[#FFF3D6]" },
    { month: "Sep", height: "h-[80%]", bg: "bg-[#E5F7EB]" },
    { month: "Oct", height: "h-[75%]", bg: "bg-[#EEECF9]" },
    { month: "Nov", height: "h-[35%]", bg: "bg-[#FFF3D6]" },
    { month: "Dec", height: "h-[80%]", bg: "bg-[#E5F7EB]" },
  ];

  const orders = [
    {
      id: "856733",
      name: "Atarvastatin",
      category: "Antibiotics",
      status: "Delivered",
      price: "₦8,000",
    },
    {
      id: "856734",
      name: "Ibuprofen",
      category: "Antibiotics",
      status: "Pending",
      price: "₦8,000",
    },
    {
      id: "856735",
      name: "Atarvastatin",
      category: "Antibiotics",
      status: "Canceled",
      price: "₦8,000",
    },
    {
      id: "856736",
      name: "Paracetamol",
      category: "Analgesics",
      status: "Delivered",
      price: "₦1,200",
    },
    {
      id: "856737",
      name: "Amoxicillin",
      category: "Antibiotics",
      status: "Delivered",
      price: "₦4,500",
    },
  ];

  const filteredOrders = orders.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.includes(searchTerm) ||
    order.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">Order Dashboard</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#EEECF9] rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition-all duration-300"
            >
              <div>
                <p className="text-[#7C7A9E] text-[15px] font-medium mb-1">{stat.title}</p>
                <h3 className="text-[#150D5E] text-3xl font-bold mb-2">{stat.value}</h3>
                <div className="flex items-center text-[#6F6BD6] text-xs font-semibold gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full bg-[#E5E2F9] flex items-center justify-center text-[#150D5E]">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Selling Medicine Chart */}
        <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
          <h2 className="text-lg font-bold text-[#150D5E] mb-6">Top Selling Medicine</h2>
          
          <div className="flex items-stretch h-[280px]">
            {/* Y-Axis Labels */}
            <div className="flex flex-col justify-between text-right text-xs text-[#7C7A9E] font-medium pr-4 select-none">
              <span>&gt; 50</span>
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>

            {/* Bars Container */}
            <div className="flex-1 flex justify-between items-end border-l border-b border-[#EEF0F6] pb-2 pl-4 pr-2">
              {chartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 h-full max-w-[54px] justify-end group">
                  {/* Bar Capsule */}
                  <div className={`w-full ${data.height} ${data.bg} rounded-full transition-all duration-500 hover:brightness-95 cursor-pointer relative overflow-hidden flex flex-col justify-between py-4`}>
                    
                    {/* Vertical rotated text inside the bar */}
                    <div className="flex flex-col items-center justify-center flex-1 select-none pointer-events-none">
                      <div className="flex flex-col items-center gap-0.5 [writing-mode:vertical-lr] rotate-180 text-[#150D5E] whitespace-nowrap">
                        <span className="font-bold text-[11px] leading-none uppercase tracking-wider">Ibuprofen</span>
                        <span className="text-[9px] opacity-75 font-medium leading-none">Antibiotics</span>
                      </div>
                    </div>

                    {/* Capsule / Pills icon in a white circle at the bottom */}
                    <div className="w-8 h-8 rounded-full bg-white mx-auto flex items-center justify-center shadow-sm shrink-0 mt-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-[#6F6BD6]" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="8" width="14" height="8" rx="4" transform="rotate(-45 12 12)" />
                        <line x1="8" y1="12" x2="16" y2="12" transform="rotate(-45 12 12)" />
                      </svg>
                    </div>

                  </div>
                  {/* Month Label */}
                  <span className="text-xs font-semibold text-[#7C7A9E] mt-3">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Latest Orders & Promo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Latest Orders Table */}
          <div className="lg:col-span-2 bg-white border border-[#eef0f6] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-[#150D5E]">Latest Orders</h2>
                <div className="relative w-full sm:w-[240px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="search products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-9 pr-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#EEECF9] text-[#7C7A9E] text-xs font-semibold uppercase tracking-wider rounded-lg">
                      <th className="py-3.5 px-4 rounded-l-xl">Order ID</th>
                      <th className="py-3.5 px-4">Medicine Name</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 rounded-r-xl">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order, i) => (
                        <tr
                          key={i}
                          className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                        >
                          <td className="py-4 px-4 font-semibold">{order.id}</td>
                          <td className="py-4 px-4 font-medium text-gray-800">{order.name}</td>
                          <td className="py-4 px-4 text-gray-500">{order.category}</td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                                order.status === "Delivered"
                                  ? "bg-[#E5F7EB] text-[#2F9E58]"
                                  : order.status === "Pending"
                                  ? "bg-[#FFF3D6] text-[#E0930B]"
                                  : "bg-[#FCEAEB] text-[#D13B45]"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold text-[#150D5E]">{order.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-500 font-medium">
                          No orders match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Promo Card/Banner */}
          <div className="bg-gradient-to-br from-[#150D5E] via-[#241A8C] to-[#3B2FB3] text-white p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group min-h-[300px]">
            {/* Background design elements */}
            <div className="absolute right-0 top-0 -mr-6 -mt-6 w-32 h-32 bg-white/5 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full pointer-events-none"></div>

            <div className="relative flex justify-between items-start gap-4">
              <div className="flex flex-col gap-1.5 z-10">
                <h3 className="text-3xl font-extrabold tracking-tight">Get</h3>
                <h3 className="text-4xl font-extrabold text-[#FFF3D6] tracking-tight">20% off</h3>
                <p className="text-sm font-medium opacity-90 mt-1 max-w-[130px]">on children medicine</p>
                <span className="inline-block bg-[#E5E2F9]/20 text-xs px-2.5 py-1 rounded-md mt-2 font-semibold text-white w-max">
                  4 - 8 Jun
                </span>
              </div>

              {/* Medicine Illustrations in SVG (clean vector art mockup matching screenshot) */}
              <div className="z-10 shrink-0 transform hover:scale-105 transition-transform duration-300">
                <svg viewBox="0 0 120 120" className="w-28 h-28 filter drop-shadow-xl">
                  {/* Medicine box in background */}
                  <rect x="15" y="25" width="52" height="75" rx="6" fill="#D13B45" />
                  <rect x="20" y="35" width="42" height="18" fill="#FCEAEB" rx="3" />
                  <line x1="26" y1="44" x2="56" y2="44" stroke="#D13B45" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="41" cy="74" r="10" fill="white" />
                  <path d="M41 68v12M35 74h12" stroke="#D13B45" strokeWidth="2.5" strokeLinecap="round" />
                  <rect x="20" y="58" width="42" height="4" fill="white" opacity="0.3" rx="1" />
                  <rect x="20" y="88" width="25" height="3" fill="white" opacity="0.4" rx="1" />

                  {/* Syrup bottle in foreground */}
                  <rect x="62" y="42" width="38" height="60" rx="8" fill="#F24E59" stroke="#FFF" strokeWidth="2.5" />
                  {/* cap */}
                  <rect x="73" y="33" width="16" height="9" rx="3" fill="#D13B45" />
                  <rect x="75" y="30" width="12" height="3" rx="1" fill="#D13B45" />
                  {/* label */}
                  <rect x="67" y="58" width="28" height="28" fill="white" rx="3" />
                  <line x1="72" y1="72" x2="90" y2="72" stroke="#D13B45" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="81" cy="72" r="3.5" fill="#D13B45" />
                  <rect x="70" y="89" width="22" height="2.5" fill="#EEECF9" rx="0.5" />
                </svg>
              </div>
            </div>

            <button className="w-full py-3.5 bg-[#0B053F] border border-white/10 text-white rounded-xl font-bold hover:bg-opacity-90 transition-all text-center text-sm shadow-md mt-6 z-10">
              View Discount Details
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
