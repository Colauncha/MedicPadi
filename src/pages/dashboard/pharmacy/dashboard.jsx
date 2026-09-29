import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Users,
  ShoppingCart,
  Search,
  ArrowUpRight,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { listDrugRequisitions, pharmacyStats } from "../../../api/orders.api";

export default function PharmDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [statsResponse, ordersResponse] = await Promise.all([
          pharmacyStats(),
          listDrugRequisitions(),
        ]);

        // Handle common API response structures
        const statsData = statsResponse?.data ?? statsResponse;
        setStats(statsData);

        const orderList = Array.isArray(ordersResponse)
          ? ordersResponse
          : Array.isArray(ordersResponse?.data)
            ? ordersResponse.data
            : Array.isArray(ordersResponse?.data?.orders)
              ? ordersResponse.data.orders
              : Array.isArray(ordersResponse?.orders)
                ? ordersResponse.orders
                : [];

        setOrders(orderList);
      } catch (err) {
        console.error("Dashboard data error:", err);
        setError(err.message || "Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
    },
    {
      title: "Total Customers",
      value: stats?.totalCustomers ?? 0,
      icon: Users,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
    },
  ];

  const filteredOrders = orders.filter((order) => {
    const name =
      order.medicineName ||
      order.productName ||
      order.name ||
      order.medicine?.name ||
      "";

    const id = order.orderId || order.id || order._id || "";
    const category = order.category || order.medicine?.category || "";

    const query = searchTerm.toLowerCase();

    return (
      String(name).toLowerCase().includes(query) ||
      String(id).toLowerCase().includes(query) ||
      String(category).toLowerCase().includes(query)
    );
  });

  const formatPrice = (price) => {
    if (price === undefined || price === null || price === "") {
      return "—";
    }

    const numericPrice = Number(price);

    return Number.isNaN(numericPrice)
      ? price
      : `₦${numericPrice.toLocaleString("en-NG")}`;
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 pb-10">
        {/* Dashboard Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#150D5E]">
            Order Dashboard
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {statCards.map((stat) => (
            <div
              key={stat.title}
              className="flex items-center justify-between rounded-2xl bg-[#EEECF9] p-6 transition-all duration-300 hover:shadow-md"
            >
              <div>
                <p className="mb-1 text-[15px] font-medium text-[#7C7A9E]">
                  {stat.title}
                </p>

                <h3 className="mb-2 text-3xl font-bold text-[#150D5E]">
                  {loading ? (
                    <span className="text-xl">—</span>
                  ) : (
                    Number(stat.value).toLocaleString("en-NG")
                  )}
                </h3>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#6F6BD6]">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>Current total</span>
                </div>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E5E2F9] text-[#150D5E]">
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Top Selling Medicine Chart */}
        <div className="rounded-2xl border border-[#eef0f6] bg-white p-6">
          <h2 className="mb-6 text-lg font-bold text-[#150D5E]">
            Top Selling Medicine
          </h2>

          {/* Empty chart container */}
          <div className="flex h-[280px] items-center justify-center rounded-xl border-b border-l border-[#EEF0F6]">
            {loading ? (
              <div className="flex flex-col items-center gap-3 text-[#7C7A9E]">
                <Loader2 className="h-7 w-7 animate-spin" />
                <span className="text-sm">Loading chart...</span>
              </div>
            ) : (
              <p className="text-sm text-[#7C7A9E]">No chart data available.</p>
            )}
          </div>
        </div>

        {/* Latest Orders Table */}
        <div className="rounded-2xl border border-[#eef0f6] bg-white p-6">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-[#150D5E]">Latest Orders</h2>

            <div className="relative w-full sm:w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-[#eef0f6] bg-[#f8f9fc] pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="rounded-lg bg-[#EEECF9] text-xs font-semibold uppercase tracking-wider text-[#7C7A9E]">
                  <th className="rounded-l-xl px-4 py-3.5">Order ID</th>
                  <th className="px-4 py-3.5">Medicine Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="rounded-r-xl px-4 py-3.5">Price</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading orders...
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => {
                    const name =
                      order.medicineName ||
                      order.productName ||
                      order.name ||
                      order.medicine?.name ||
                      "—";

                    const id = order.orderId || order.id || order._id || "—";

                    const category =
                      order.category || order.medicine?.category || "—";

                    const status = order.status || "—";

                    const price =
                      order.totalPrice ??
                      order.price ??
                      order.amount ??
                      order.total ??
                      null;

                    return (
                      <tr
                        key={order._id || order.id || index}
                        className="border-b border-[#EEF0F6] text-[15px] text-[#1a1a4b] transition-colors duration-150 hover:bg-[#F8F9FC]"
                      >
                        <td className="px-4 py-4 font-semibold">{id}</td>

                        <td className="px-4 py-4 font-medium text-gray-800">
                          {name}
                        </td>

                        <td className="px-4 py-4 text-gray-500">{category}</td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                              status.toLowerCase() === "delivered"
                                ? "bg-[#E5F7EB] text-[#2F9E58]"
                                : status.toLowerCase() === "pending"
                                  ? "bg-[#FFF3D6] text-[#E0930B]"
                                  : status.toLowerCase() === "canceled" ||
                                      status.toLowerCase() === "cancelled"
                                    ? "bg-[#FCEAEB] text-[#D13B45]"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-4 font-bold text-[#150D5E]">
                          {formatPrice(price)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center font-medium text-gray-500"
                    >
                      {searchTerm
                        ? "No orders match your search."
                        : "No orders available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
