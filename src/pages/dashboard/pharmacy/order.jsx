import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  ShoppingCart,
  CheckCircle2,
  Clock,
  XCircle,
  MoreVertical,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
} from "lucide-react";

export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  const stats = [
    {
      title: "Total Orders",
      value: "1,000",
      icon: ShoppingCart,
      color: "text-[#150D5E]",
      bg: "bg-[#E5E2F9]",
    },
    {
      title: "Completed Orders",
      value: "200",
      icon: CheckCircle2,
      color: "text-[#2F9E58]",
      bg: "bg-[#E5F7EB]",
    },
    {
      title: "Pending Orders",
      value: "200",
      icon: Clock,
      color: "text-[#E0930B]",
      bg: "bg-[#FFF3D6]",
    },
    {
      title: "Canceled Orders",
      value: "68",
      icon: XCircle,
      color: "text-[#D13B45]",
      bg: "bg-[#FCEAEB]",
    },
  ];

  const [orders, setOrders] = useState([
    {
      id: "856733",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 1500 },
        { name: "Ibuprofen", dosage: "400mg", qty: 2, unitPrice: 1000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "Completed",
      paymentStatus: "Paid",
      total: "₦8,000",
    },
    {
      id: "856734",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 2000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "In progress",
      paymentStatus: "Pending",
      total: "₦8,000",
    },
    {
      id: "856735",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 2000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "Canceled",
      paymentStatus: "Failed",
      total: "₦8,000",
    },
    {
      id: "856736",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 1500 },
        { name: "Ibuprofen", dosage: "400mg", qty: 2, unitPrice: 1000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "Completed",
      paymentStatus: "Paid",
      total: "₦8,000",
    },
    {
      id: "856737",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 2000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "In progress",
      paymentStatus: "Pending",
      total: "₦8,000",
    },
    {
      id: "856738",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 2000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "Canceled",
      paymentStatus: "Failed",
      total: "₦8,000",
    },
    {
      id: "856739",
      products: [
        { name: "Paracetamol", dosage: "500mg", qty: 4, unitPrice: 1500 },
        { name: "Ibuprofen", dosage: "400mg", qty: 2, unitPrice: 1000 },
      ],
      customer: "Sarah John",
      date: "15-03-2026",
      status: "Completed",
      paymentStatus: "Paid",
      total: "₦8,000",
    },
  ]);

  // Handle Search and Filter logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm) ||
      order.products.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    const matchesPayment =
      paymentFilter === "All" || order.paymentStatus === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">Order List</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#F4F3F8] rounded-2xl p-5 flex items-center justify-between border border-[#eef0f6]"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold">{stat.title}</p>
                  <h3 className="text-[#150D5E] text-2xl font-bold mt-0.5">{stat.value}</h3>
                </div>
              </div>
              <button className="text-gray-400 hover:text-[#150D5E] p-1.5 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Total Order Table Section */}
        <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#150D5E]">Total Order</h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="search order"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm"
                />
              </div>

              {/* Filters dropdown button */}
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
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Order Status</p>
                    {["All", "Completed", "In progress", "Canceled"].map((status) => (
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
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Status</p>
                    {["All", "Paid", "Pending", "Failed"].map((pay) => (
                      <button
                        key={pay}
                        onClick={() => {
                          setPaymentFilter(pay);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                          paymentFilter === pay ? "bg-[#EEECF9] text-[#150D5E] font-bold" : "text-gray-700"
                        }`}
                      >
                        {pay}
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
                  <th className="py-3.5 px-6 rounded-l-xl">Order ID</th>
                  <th className="py-3.5 px-6">Product Name</th>
                  <th className="py-3.5 px-6">Customer Name</th>
                  <th className="py-3.5 px-6">Order Date</th>
                  <th className="py-3.5 px-6">Order Status</th>
                  <th className="py-3.5 px-6">Total Amount</th>
                  <th className="py-3.5 px-6">Payment Status</th>
                  <th className="py-3.5 px-6 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                    >
                      <td className="py-4 px-6 font-semibold">{order.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1 py-1">
                          {order.products.map((p, pIdx) => (
                            <div key={pIdx} className="font-medium text-gray-800 text-[14px]">
                              {p.name} <span className="text-gray-400 text-xs">({p.dosage})</span>
                              <span className="text-[#6F6BD6] text-xs font-bold ml-1.5">({p.qty})</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-700">{order.customer}</td>
                      <td className="py-4 px-6 text-gray-500">{order.date}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            order.status === "Completed"
                              ? "bg-[#E5F7EB] text-[#2F9E58]"
                              : order.status === "In progress"
                              ? "bg-[#FFF3D6] text-[#E0930B]"
                              : "bg-[#FCEAEB] text-[#D13B45]"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#150D5E]">{order.total}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                            order.paymentStatus === "Paid"
                              ? "bg-[#E5F7EB] text-[#2F9E58]"
                              : order.paymentStatus === "Pending"
                              ? "bg-[#FFF3D6] text-[#E0930B]"
                              : "bg-[#FCEAEB] text-[#D13B45]"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
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
                      No orders found matching the criteria.
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

      {/* Invoice / Order Details Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-[#150D5E] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FFF3D6]" />
                <h3 className="text-lg font-bold">Order Details & Invoice</h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 text-[#1a1a4b]">
              {/* Order Info Summary */}
              <div className="grid grid-cols-2 gap-4 border-b border-gray-100 pb-4 text-sm">
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs">Order ID</p>
                  <p className="font-bold text-[#150D5E] text-base mt-0.5">#{selectedOrderDetails.id}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs">Order Date</p>
                  <p className="font-semibold mt-0.5">{selectedOrderDetails.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs">Customer</p>
                  <p className="font-semibold mt-0.5 text-gray-800">{selectedOrderDetails.customer}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs">Order Status</p>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold inline-block mt-0.5 ${
                      selectedOrderDetails.status === "Completed"
                        ? "bg-[#E5F7EB] text-[#2F9E58]"
                        : selectedOrderDetails.status === "In progress"
                        ? "bg-[#FFF3D6] text-[#E0930B]"
                        : "bg-[#FCEAEB] text-[#D13B45]"
                    }`}
                  >
                    {selectedOrderDetails.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <p className="text-gray-400 font-bold uppercase text-xs mb-3">Items Purchased</p>
                <div className="flex flex-col gap-3">
                  {selectedOrderDetails.products.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#F8F9FC] p-3.5 rounded-xl border border-[#EEF0F6]">
                      <div>
                        <p className="font-bold text-gray-800 text-[15px]">{item.name}</p>
                        <p className="text-xs text-gray-400 font-semibold">Dosage: {item.dosage}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#150D5E]">₦{(item.qty * item.unitPrice).toLocaleString()}</p>
                        <p className="text-xs text-gray-400 font-semibold">
                          ₦{item.unitPrice.toLocaleString()} × {item.qty} units
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="bg-[#EEECF9] rounded-2xl p-4 flex flex-col gap-2 text-sm border border-[#E5E2F9]">
                <div className="flex justify-between font-semibold text-gray-600">
                  <span>Subtotal</span>
                  <span>₦8,000</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-600">
                  <span>Discount</span>
                  <span className="text-[#2F9E58]">-₦0.00</span>
                </div>
                <div className="border-t border-[#D5D1F2] my-1.5"></div>
                <div className="flex justify-between font-bold text-[#150D5E] text-base">
                  <span>Total Paid</span>
                  <span>{selectedOrderDetails.total}</span>
                </div>
              </div>

              {/* Payment Info */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs">Payment Method</p>
                  <p className="font-bold text-gray-700 mt-0.5">Card Payment</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold uppercase text-xs text-right">Payment Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block mt-0.5 ${
                      selectedOrderDetails.paymentStatus === "Paid"
                        ? "bg-[#E5F7EB] text-[#2F9E58]"
                        : selectedOrderDetails.paymentStatus === "Pending"
                        ? "bg-[#FFF3D6] text-[#E0930B]"
                        : "bg-[#FCEAEB] text-[#D13B45]"
                    }`}
                  >
                    {selectedOrderDetails.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="px-6 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                >
                  Close Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
