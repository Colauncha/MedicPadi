import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  Receipt,
  Download,
} from "lucide-react";

export default function PaymentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const stats = [
    {
      title: "Completed Payments",
      value: "1,000",
      icon: CheckCircle2,
      color: "text-white",
      bg: "bg-white/10",
      isDark: true,
    },
    {
      title: "Pending Payments",
      value: "200",
      icon: Clock,
      color: "text-[#E0930B]",
      bg: "bg-[#FFF3D6]",
      isDark: false,
    },
    {
      title: "Failed Payment",
      value: "68%",
      icon: XCircle,
      color: "text-[#D13B45]",
      bg: "bg-[#FCEAEB]",
      isDark: false,
    },
  ];

  const [transactions, setTransactions] = useState([
    {
      id: "TXN001",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Paid",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99485",
      time: "14:23:11",
    },
    {
      id: "TXN002",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Pending",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99486",
      time: "14:24:00",
    },
    {
      id: "TXN003",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Failed",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99487",
      time: "14:25:34",
    },
    {
      id: "TXN004",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Paid",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99488",
      time: "14:27:12",
    },
    {
      id: "TXN005",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Pending",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99489",
      time: "14:28:44",
    },
    {
      id: "TXN006",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Failed",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99490",
      time: "14:30:02",
    },
    {
      id: "TXN007",
      customer: "Sarah John",
      date: "15-03-2026",
      amount: "₦8,000",
      status: "Paid",
      method: "Credit card",
      orderId: "ORD001",
      ref: "PAY-REF-99491",
      time: "14:31:55",
    },
  ]);

  // Handle filtering & searching
  const filteredTxns = transactions.filter((txn) => {
    const matchesSearch =
      txn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || txn.status === statusFilter;

    const matchesMethod =
      methodFilter === "All" || txn.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">Payment List</h1>
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
                    stat.isDark ? "bg-white/10 text-white" : stat.bg + " " + stat.color
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

        {/* Total Payments Table Card */}
        <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#150D5E]">Total Payments</h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="search name"
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
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</p>
                    {["All", "Paid", "Pending", "Failed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                          statusFilter === status ? "bg-[#EEECF9] text-[#150D5E] font-bold" : "text-gray-700"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 my-2"></div>
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Method</p>
                    {["All", "Credit card", "Bank transfer", "Cash"].map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          setMethodFilter(method);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                          methodFilter === method ? "bg-[#EEECF9] text-[#150D5E] font-bold" : "text-gray-700"
                        }`}
                      >
                        {method}
                      </button>
                    ))}
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
                  <th className="py-3.5 px-6 rounded-l-xl">Transaction ID</th>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Payment Date</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Payment Method</th>
                  <th className="py-3.5 px-6">Order ID</th>
                  <th className="py-3.5 px-6 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTxns.length > 0 ? (
                  filteredTxns.map((txn, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                    >
                      <td className="py-4 px-6 font-semibold">{txn.id}</td>
                      <td className="py-4 px-6 font-semibold text-gray-800">{txn.customer}</td>
                      <td className="py-4 px-6 text-gray-500">{txn.date}</td>
                      <td className="py-4 px-6 font-bold text-[#150D5E]">{txn.amount}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            txn.status === "Paid"
                              ? "bg-[#E5F7EB] text-[#2F9E58]"
                              : txn.status === "Pending"
                              ? "bg-[#FFF3D6] text-[#E0930B]"
                              : "bg-[#FCEAEB] text-[#D13B45]"
                          }`}
                        >
                          {txn.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500 font-medium">{txn.method}</td>
                      <td className="py-4 px-6 text-gray-600 font-semibold">{txn.orderId}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedTxn(txn)}
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
                      No payments found matching the criteria.
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

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#150D5E] text-white px-6 py-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#FFF3D6]" />
                <h3 className="text-lg font-bold">Transaction Receipt</h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 text-[#1a1a4b]">
              
              {/* Receipt Visual Top */}
              <div className="text-center py-4 border-b border-dashed border-gray-200">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Amount Paid</p>
                <h2 className="text-4xl font-extrabold text-[#150D5E] mt-1">{selectedTxn.amount}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold inline-block mt-3 ${
                    selectedTxn.status === "Paid"
                      ? "bg-[#E5F7EB] text-[#2F9E58]"
                      : selectedTxn.status === "Pending"
                      ? "bg-[#FFF3D6] text-[#E0930B]"
                      : "bg-[#FCEAEB] text-[#D13B45]"
                  }`}
                >
                  {selectedTxn.status}
                </span>
              </div>

              {/* Receipt Details */}
              <div className="flex flex-col gap-3.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Transaction ID</span>
                  <span className="font-bold text-gray-800">{selectedTxn.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Reference Ref</span>
                  <span className="font-semibold text-gray-600">{selectedTxn.ref}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Customer</span>
                  <span className="font-semibold text-gray-800">{selectedTxn.customer}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Associated Order ID</span>
                  <span className="font-bold text-[#150D5E]">{selectedTxn.orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Date & Time</span>
                  <span className="font-semibold text-gray-600">
                    {selectedTxn.date} at {selectedTxn.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">Channel / Method</span>
                  <span className="font-semibold text-gray-700">{selectedTxn.method}</span>
                </div>
              </div>

              {/* Download / Print and Close Action */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="flex-1 px-4 h-11 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-600 text-sm transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="flex-1 px-4 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all text-center"
                >
                  Close Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
