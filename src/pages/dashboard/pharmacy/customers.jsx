import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Users,
  UserPlus,
  UserCheck,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
} from "lucide-react";

export default function CustomerList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [spendFilter, setSpendFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const stats = [
    {
      title: "Total Customers",
      value: "1,000",
      icon: Users,
      isDark: true,
    },
    {
      title: "New Customers",
      value: "200",
      icon: UserPlus,
      isDark: false,
    },
    {
      title: "Returning Customers",
      value: "68%",
      icon: UserCheck,
      isDark: false,
    },
  ];

  const [customers, setCustomers] = useState([
    {
      id: "CUS001",
      name: "Sarah John",
      email: "sarahjohn22@gmail.com",
      phone: "09012345678",
      ordersPlaced: 10,
      totalSpend: "₦200,000",
      lastOrderDate: "15-03-2026",
      history: [
        { orderId: "856733", date: "15-03-2026", status: "Completed", amount: "₦8,000" },
        { orderId: "856621", date: "10-02-2026", status: "Completed", amount: "₦12,500" },
        { orderId: "856402", date: "05-01-2026", status: "Completed", amount: "₦22,000" },
      ]
    },
    {
      id: "CUS002",
      name: "Michael Smith",
      email: "michaelsmith@gmail.com",
      phone: "08098765432",
      ordersPlaced: 12,
      totalSpend: "₦310,000",
      lastOrderDate: "14-03-2026",
      history: [
        { orderId: "856722", date: "14-03-2026", status: "Completed", amount: "₦15,000" },
        { orderId: "856604", date: "08-02-2026", status: "Completed", amount: "₦8,000" },
      ]
    },
    {
      id: "CUS003",
      name: "Elizabeth Nwosu",
      email: "elizabeth.n@gmail.com",
      phone: "07011223344",
      ordersPlaced: 4,
      totalSpend: "₦45,000",
      lastOrderDate: "12-03-2026",
      history: [
        { orderId: "856690", date: "12-03-2026", status: "Completed", amount: "₦12,000" },
      ]
    },
    {
      id: "CUS004",
      name: "David Adeleke",
      email: "davido.a@gmail.com",
      phone: "09055667788",
      ordersPlaced: 18,
      totalSpend: "₦520,000",
      lastOrderDate: "11-03-2026",
      history: [
        { orderId: "856650", date: "11-03-2026", status: "Completed", amount: "₦40,000" },
      ]
    },
    {
      id: "CUS005",
      name: "Aisha Yusuf",
      email: "aisha.y@gmail.com",
      phone: "08122334455",
      ordersPlaced: 15,
      totalSpend: "₦280,000",
      lastOrderDate: "10-03-2026",
      history: [
        { orderId: "856610", date: "10-03-2026", status: "Completed", amount: "₦18,000" },
      ]
    },
    {
      id: "CUS006",
      name: "Tunde Bakare",
      email: "tunde.b@gmail.com",
      phone: "09044332211",
      ordersPlaced: 9,
      totalSpend: "₦140,000",
      lastOrderDate: "08-03-2026",
      history: [
        { orderId: "856550", date: "08-03-2026", status: "Completed", amount: "₦14,000" },
      ]
    },
    {
      id: "CUS007",
      name: "Grace Omolara",
      email: "grace.om@gmail.com",
      phone: "08077665544",
      ordersPlaced: 8,
      totalSpend: "₦200,000",
      lastOrderDate: "05-03-2026",
      history: [
        { orderId: "856410", date: "05-03-2026", status: "Completed", amount: "₦8,000" },
      ]
    },
  ]);

  // Handle filtering
  const filteredCustomers = customers.filter((cus) => {
    const matchesSearch =
      cus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cus.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cus.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cus.phone.includes(searchTerm);

    let matchesSpend = true;
    if (spendFilter === "High") {
      const spendNum = Number(cus.totalSpend.replace(/[^0-9]/g, ""));
      matchesSpend = spendNum >= 250000;
    } else if (spendFilter === "Low") {
      const spendNum = Number(cus.totalSpend.replace(/[^0-9]/g, ""));
      matchesSpend = spendNum < 250000;
    }

    return matchesSearch && matchesSpend;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">Customer Lists</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 flex items-center justify-between border relative ${
                stat.isDark
                  ? "bg-[#150D5E] text-white border-[#150D5E]"
                  : "bg-[#F4F3F8] text-[#150D5E] border-[#eef0f6]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    stat.isDark ? "bg-white/10 text-white" : "bg-[#E5E2F9] text-[#150D5E]"
                  }`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-xs font-semibold ${stat.isDark ? "text-gray-300" : "text-gray-500"}`}>
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-0.5">{stat.value}</h3>
                </div>
              </div>
              <button
                className={`p-1.5 rounded-lg ${
                  stat.isDark ? "text-gray-300 hover:text-white" : "text-gray-400 hover:text-[#150D5E]"
                }`}
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Total Customers Table Card */}
        <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#150D5E]">Total Customers</h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="search customer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm"
                />
              </div>

              {/* Filters Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="border border-[#eef0f6] hover:bg-gray-50 text-gray-600 px-5 h-10 rounded-xl font-semibold flex items-center gap-2 text-sm transition-all"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Spend Level</p>
                    {["All", "High (>= ₦250k)", "Low (< ₦250k)"].map((opt) => {
                      const value = opt.startsWith("All") ? "All" : opt.startsWith("High") ? "High" : "Low";
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            setSpendFilter(value);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                            spendFilter === value ? "bg-[#EEECF9] text-[#150D5E] font-bold" : "text-gray-700"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EEECF9] text-[#7C7A9E] text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-6 rounded-l-xl">Customer ID</th>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6">Phone Num</th>
                  <th className="py-3.5 px-6">Order Placed</th>
                  <th className="py-3.5 px-6">Total Spend</th>
                  <th className="py-3.5 px-6">Last Order Date</th>
                  <th className="py-3.5 px-6 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cus, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                    >
                      <td className="py-4 px-6 font-semibold">{cus.id}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">{cus.name}</td>
                      <td className="py-4 px-6">
                        <a
                          href={`mailto:${cus.email}`}
                          className="text-[#6F6BD6] hover:underline font-medium"
                        >
                          {cus.email}
                        </a>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-medium">{cus.phone}</td>
                      <td className="py-4 px-6 font-semibold text-center md:text-left">{cus.ordersPlaced}</td>
                      <td className="py-4 px-6 font-bold text-[#150D5E]">{cus.totalSpend}</td>
                      <td className="py-4 px-6 text-gray-500">{cus.lastOrderDate}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedCustomer(cus)}
                          className="text-[#6F6BD6] hover:underline font-semibold text-sm"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-8 text-center text-gray-400 font-medium">
                      No customers found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-[#EEF0F6]">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span>Showing</span>
              <select className="bg-[#f8f9fc] border border-[#eef0f6] rounded-lg px-2.5 py-1 text-gray-700 outline-none focus:ring-1 focus:ring-[#150D5E]">
                <option>7</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span>of 70</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-lg bg-[#150D5E] text-white flex items-center justify-center text-sm font-bold shadow-sm">
                3
              </button>
              <button className="w-8 h-8 rounded-lg border border-[#eef0f6] text-gray-600 hover:bg-gray-50 flex items-center justify-center text-sm font-semibold">
                4
              </button>
              <span className="text-gray-400 px-1 font-bold text-sm">...</span>
              <button className="w-8 h-8 rounded-lg border border-[#eef0f6] text-gray-600 hover:bg-gray-50 flex items-center justify-center text-sm font-semibold">
                10
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Customer Profile Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#150D5E] text-white px-6 py-6 flex items-center justify-between">
              <h3 className="text-lg font-bold">Customer Profile Details</h3>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 text-[#1a1a4b]">
              
              {/* Profile Card Summary */}
              <div className="flex items-center gap-5 bg-[#F4F3F8] p-5 rounded-2xl border border-[#EEF0F6]">
                <div className="w-16 h-16 rounded-full bg-[#150D5E] text-white font-bold flex items-center justify-center text-xl shrink-0">
                  {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#150D5E]">{selectedCustomer.name}</h4>
                  <p className="text-xs font-semibold text-gray-400 mt-0.5">ID: {selectedCustomer.id}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-600 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedCustomer.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedCustomer.phone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Statistics grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gray-100 bg-[#F8F9FC] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs font-semibold uppercase">Total Spend</p>
                  <p className="font-bold text-[#150D5E] text-lg mt-1">{selectedCustomer.totalSpend}</p>
                </div>
                <div className="border border-gray-100 bg-[#F8F9FC] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs font-semibold uppercase">Orders Placed</p>
                  <p className="font-bold text-[#150D5E] text-lg mt-1">{selectedCustomer.ordersPlaced}</p>
                </div>
                <div className="border border-gray-100 bg-[#F8F9FC] rounded-xl p-3 text-center">
                  <p className="text-gray-400 text-xs font-semibold uppercase">Last Order</p>
                  <p className="font-bold text-[#150D5E] text-lg mt-1">{selectedCustomer.lastOrderDate}</p>
                </div>
              </div>

              {/* History list */}
              <div>
                <p className="text-gray-400 font-bold uppercase text-xs mb-3 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order History</span>
                </p>
                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {selectedCustomer.history.map((hist, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm">
                      <div>
                        <p className="font-bold text-gray-700">Order #{hist.orderId}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {hist.date}
                        </p>
                      </div>
                      <div className="text-right flex items-center gap-3">
                        <span className="font-bold text-gray-800">{hist.amount}</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#E5F7EB] text-[#2F9E58]">
                          {hist.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-6 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
