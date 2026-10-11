import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import { listTransactions } from "../../../api/transactions.api";

// Helper to normalize transaction data across potential API property name variations
const normalizeTransaction = (txn, index) => {
  if (!txn) return null;

  // Transaction ID
  const rawId =
    txn.id ||
    txn._id ||
    txn.transaction_id ||
    txn.transactionId ||
    txn.reference ||
    `TXN${String(index + 1).padStart(3, "0")}`;

  const id = String(rawId);
  const shortId = id.length > 10 ? `${id.slice(0, 8)}...` : id;

  // Reference Ref
  const ref =
    txn.reference ||
    txn.ref ||
    txn.tx_ref ||
    txn.transaction_reference ||
    txn.payment_reference ||
    id;

  // Amount
  const rawAmount =
    txn.amount ??
    txn.total ??
    txn.total_amount ??
    txn.amount_paid ??
    txn.price ??
    0;
  let formattedAmount = "₦0";
  let numericAmount = 0;
  if (
    typeof rawAmount === "string" &&
    (rawAmount.includes("₦") || rawAmount.includes("$"))
  ) {
    formattedAmount = rawAmount;
    numericAmount = Number(rawAmount.replace(/[^0-9.-]+/g, "")) || 0;
  } else {
    numericAmount = Number(rawAmount) || 0;
    formattedAmount = `₦${numericAmount.toLocaleString("en-NG")}`;
  }

  // Date & Time
  const rawDate =
    txn.payment_date ||
    txn.paymentDate ||
    txn.created_at ||
    txn.createdAt ||
    txn.date ||
    txn.date_created ||
    txn.timestamp;
  let date = "N/A";
  let time = "N/A";
  if (rawDate) {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      date = `${day}-${month}-${year}`;
      time = d.toLocaleTimeString("en-GB");
    } else {
      date = String(rawDate);
    }
  }
  if (txn.time) {
    time = txn.time;
  }

  // Status
  const rawStatus = String(
    txn.status || txn.payment_status || txn.paymentStatus || "Pending",
  ).toLowerCase();
  let status = "Pending";
  if (
    ["paid", "success", "successful", "completed", "complete"].includes(
      rawStatus,
    )
  ) {
    status = "Paid";
  } else if (
    ["failed", "fail", "declined", "cancelled", "canceled", "error"].includes(
      rawStatus,
    )
  ) {
    status = "Failed";
  } else {
    status = "Pending";
  }

  // Payment Method
  const rawMethod = String(
    txn.method ||
      txn.payment_method ||
      txn.paymentMethod ||
      txn.channel ||
      txn.payment_channel ||
      "Credit card",
  );
  let method = rawMethod;
  const lowerMethod = rawMethod.toLowerCase();
  if (lowerMethod.includes("card") || lowerMethod === "card") {
    method = "Credit card";
  } else if (lowerMethod.includes("transfer") || lowerMethod.includes("bank")) {
    method = "Bank transfer";
  } else if (lowerMethod.includes("cash")) {
    method = "Cash";
  }

  return {
    raw: txn,
    id,
    shortId,
    ref: String(ref),
    amount: formattedAmount,
    numericAmount,
    date,
    time,
    status,
    method,
  };
};

export default function PaymentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [methodFilter, setMethodFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // API Data state - no mock data
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    count: 0,
    limit: 10,
    page: 1,
    total_pages: 1,
  });
  const [links, setLinks] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async (pageToFetch, limitToFetch) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await listTransactions(pageToFetch, limitToFetch);

      const rawList = Array.isArray(res)
        ? res
        : Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.transactions)
            ? res.transactions
            : [];

      const normalizedList = rawList
        .map((item, index) => normalizeTransaction(item, index))
        .filter(Boolean);

      setTransactions(normalizedList);

      if (res?.meta) {
        setMeta(res.meta);
        if (res.meta.page && res.meta.page !== pageToFetch) {
          setCurrentPage(res.meta.page);
        }
      } else {
        setMeta({
          total: rawList.length,
          count: rawList.length,
          limit: limitToFetch,
          page: pageToFetch,
          total_pages: Math.ceil(rawList.length / limitToFetch) || 1,
        });
      }

      if (res?.links) {
        setLinks(res.links);
      }
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setError(err.message || "Failed to load transactions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage, limit);
  }, [currentPage, limit]);

  // Dynamic stats calculated from real transactions
  const completedCount = transactions.filter((t) => t.status === "Paid").length;
  const pendingCount = transactions.filter(
    (t) => t.status === "Pending",
  ).length;
  const failedCount = transactions.filter((t) => t.status === "Failed").length;

  const stats = [
    {
      title: "Completed Payments",
      value: isLoading ? "..." : completedCount.toLocaleString(),
      icon: CheckCircle2,
      color: "text-white",
      bg: "bg-white/10",
      isDark: true,
    },
    {
      title: "Pending Payments",
      value: isLoading ? "..." : pendingCount.toLocaleString(),
      icon: Clock,
      color: "text-[#E0930B]",
      bg: "bg-[#FFF3D6]",
      isDark: false,
    },
    {
      title: "Failed Payment",
      value: isLoading ? "..." : failedCount.toLocaleString(),
      icon: XCircle,
      color: "text-[#D13B45]",
      bg: "bg-[#FCEAEB]",
      isDark: false,
    },
  ];

  // Handle client-side search and filtering
  const filteredTxns = transactions.filter((txn) => {
    const query = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !query ||
      txn.id.toLowerCase().includes(query) ||
      txn.shortId.toLowerCase().includes(query) ||
      txn.ref.toLowerCase().includes(query) ||
      txn.amount.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" ||
      txn.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesMethod =
      methodFilter === "All" ||
      txn.method.toLowerCase() === methodFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesMethod;
  });

  // Accurate table control calculations based on API metadata
  const totalRecords = meta?.total ?? transactions.length;
  const totalPages =
    meta?.total_pages || Math.max(1, Math.ceil(totalRecords / (limit || 10)));

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">
            Payment List
          </h1>
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
                    stat.isDark
                      ? "bg-white/10 text-white"
                      : stat.bg + " " + stat.color
                  }`}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      stat.isDark ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-0.5">{stat.value}</h3>
                </div>
              </div>
              <button
                className={`p-1.5 rounded-lg ${
                  stat.isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-400 hover:text-[#150D5E]"
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
            <h2 className="text-2xl font-bold text-[#150D5E]">
              Total Payments
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-[260px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search transaction ID or ref"
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
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Status
                    </p>
                    {["All", "Paid", "Pending", "Failed"].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowFilterDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                          statusFilter === status
                            ? "bg-[#EEECF9] text-[#150D5E] font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <div className="border-t border-gray-100 my-2"></div>
                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Payment Method
                    </p>
                    {["All", "Credit card", "Bank transfer", "Cash"].map(
                      (method) => (
                        <button
                          key={method}
                          onClick={() => {
                            setMethodFilter(method);
                            setShowFilterDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                            methodFilter === method
                              ? "bg-[#EEECF9] text-[#150D5E] font-bold"
                              : "text-gray-700"
                          }`}
                        >
                          {method}
                        </button>
                      ),
                    )}
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
                  <th className="py-3.5 px-6">Payment Date</th>
                  <th className="py-3.5 px-6">Amount</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Payment Method</th>
                  <th className="py-3.5 px-6 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-12 text-center text-[#7C7A9E]"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#150D5E]" />
                        <span className="text-sm font-medium">
                          Loading payments...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 text-center text-red-500 font-medium"
                    >
                      {error}
                    </td>
                  </tr>
                ) : filteredTxns.length > 0 ? (
                  filteredTxns.map((txn, i) => (
                    <tr
                      key={txn.id || i}
                      className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                    >
                      <td className="py-4 px-6 text-gray-500">{txn.date}</td>
                      <td className="py-4 px-6 font-bold text-[#150D5E]">
                        {txn.amount}
                      </td>
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
                      <td className="py-4 px-6 text-gray-500 font-medium">
                        {txn.method}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedTxn(txn)}
                          className="text-[#6F6BD6] hover:underline font-semibold text-sm cursor-pointer"
                        >
                          View details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-8 text-center text-gray-400 font-medium"
                    >
                      No payments found matching the criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Corrected Pagination & Table Control */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-[#EEF0F6]">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
              <span>Showing</span>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-[#f8f9fc] border border-[#eef0f6] rounded-lg px-2.5 py-1 text-gray-700 outline-none focus:ring-1 focus:ring-[#150D5E] cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>of {totalRecords}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
                className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {getPageNumbers().map((page, idx) => {
                if (page === "...") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="text-gray-400 px-1 font-bold text-sm select-none"
                    >
                      ...
                    </span>
                  );
                }
                const isActive = page === currentPage;
                return (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#150D5E] text-white"
                        : "border border-[#eef0f6] text-gray-600 hover:bg-[#EEECF9] hover:text-[#150D5E]"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
                className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
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
                className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 text-[#1a1a4b]">
              {/* Receipt Visual Top */}
              <div className="text-center py-4 border-b border-dashed border-gray-200">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  Amount Paid
                </p>
                <h2 className="text-4xl font-extrabold text-[#150D5E] mt-1">
                  {selectedTxn.amount}
                </h2>
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
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400 font-semibold shrink-0">
                    Transaction ID
                  </span>
                  <span
                    className="font-bold text-gray-800 break-all text-right font-mono text-xs sm:text-sm"
                    title={selectedTxn.id}
                  >
                    {selectedTxn.id}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-gray-400 font-semibold shrink-0">
                    Reference Ref
                  </span>
                  <span
                    className="font-semibold text-gray-600 break-all text-right font-mono text-xs sm:text-sm"
                    title={selectedTxn.ref}
                  >
                    {selectedTxn.ref}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">
                    Date & Time
                  </span>
                  <span className="font-semibold text-gray-600">
                    {selectedTxn.date}{" "}
                    {selectedTxn.time && selectedTxn.time !== "N/A"
                      ? `at ${selectedTxn.time}`
                      : ""}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-semibold">
                    Channel / Method
                  </span>
                  <span className="font-semibold text-gray-700">
                    {selectedTxn.method}
                  </span>
                </div>
              </div>

              {/* Download / Print and Close Action */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 px-4 h-11 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-600 text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download / Print</span>
                </button>
                <button
                  onClick={() => setSelectedTxn(null)}
                  className="flex-1 px-4 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all text-center cursor-pointer"
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
