import { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
  Package,
  AlertTriangle,
  XCircle,
  MoreVertical,
  Search,
  Plus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { listPharmacyDrugs } from "../../../api/services.api";
import AddProduct from "./addProduct";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("Antibiotics");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddProductPage, setShowAddProductPage] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, statusFilter, itemsPerPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await listPharmacyDrugs();
        let list = [];
        if (Array.isArray(res)) {
          list = res;
        } else if (res && Array.isArray(res.data)) {
          list = res.data;
        } else if (res && Array.isArray(res.drugs)) {
          list = res.drugs;
        } else if (res && typeof res === "object") {
          const arrayProp = Object.values(res).find((val) =>
            Array.isArray(val),
          );
          if (arrayProp) {
            list = arrayProp;
          }
        }
        setProducts(list);
      } catch (err) {
        console.error("Failed to load pharmacy drugs:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Form State for Add Product
  const [newProduct, setNewProduct] = useState({
    name: "",
    dosage: "500mg",
    category: "Antibiotics",
    quantity: 100,
    expiryDate: "2026-12-31",
    status: "In stock",
    price: "8000",
  });

  const getCategoryCount = (categoryName) => {
    return products.filter(
      (p) => p.category?.toLowerCase() === categoryName.toLowerCase(),
    ).length;
  };

  const categories = [
    {
      name: "Antibiotics",
      count: isLoading ? "..." : getCategoryCount("Antibiotics"),
      desc: "Antibiotics products",
    },
    {
      name: "Pain Reliver",
      count: isLoading ? "..." : getCategoryCount("Pain Reliver"),
      desc: "Pain reliever products",
    },
    {
      name: "Supplements",
      count: isLoading ? "..." : getCategoryCount("Supplements"),
      desc: "Supplement products",
    },
    {
      name: "Diabetes Care",
      count: isLoading ? "..." : getCategoryCount("Diabetes Care"),
      desc: "Diabetes products",
    },
  ];

  // Calculated Stats
  const totalProductsCount = products.length;
  const lowStockCount = products.filter(
    (p) =>
      p.status?.toLowerCase() === "low stock" ||
      (p.quantity !== undefined && p.quantity > 0 && p.quantity <= 15),
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.status?.toLowerCase() === "out of stock" || p.quantity === 0,
  ).length;

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "₦0";
    if (typeof price === "string" && price.startsWith("₦")) return price;
    return `₦${Number(price).toLocaleString()}`;
  };

  // Handle Add Product Submit
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name) return;

    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    const formattedPrice = `₦${Number(newProduct.price).toLocaleString()}`;
    const formattedDate = newProduct.expiryDate.split("-").reverse().join("-");

    const productToAdd = {
      id: randomId,
      name: newProduct.name,
      dosage: newProduct.dosage,
      category: newProduct.category,
      quantity: Number(newProduct.quantity),
      expiryDate: formattedDate,
      status: newProduct.status,
      price: formattedPrice,
    };

    setProducts((prev) => [productToAdd, ...prev]);
    setShowAddModal(false);
    // Reset form
    setNewProduct({
      name: "",
      dosage: "500mg",
      category: "Antibiotics",
      quantity: 100,
      expiryDate: "2026-12-31",
      status: "In stock",
      price: "8000",
    });
  };

  // Filter products by selected category, search term, and status filter
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !product.category ||
      !selectedCategory ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      (product.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.id || "").toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      (product.status || "").toLowerCase() === statusFilter.toLowerCase();

    return matchesCategory && matchesSearch && matchesStatus;
  });

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const showStart = totalItems === 0 ? 0 : startIndex + 1;
  const showEnd = Math.min(endIndex, totalItems);

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

      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
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

  const handleAddProductFromPage = (productData) => {
    const randomId = Math.floor(100000 + Math.random() * 900000).toString();
    const numericPrice =
      Number(productData.price.replace(/[^0-9]/g, "")) || 1500;
    const formattedPrice = `₦${numericPrice.toLocaleString()}`;

    const productToAdd = {
      id: randomId,
      name: productData.medicine,
      dosage: "500mg",
      category: productData.category,
      quantity: 100, // Default quantity
      expiryDate: "31-12-2026", // Default expiry
      status: "In stock",
      price: formattedPrice,
    };

    setProducts((prev) => [productToAdd, ...prev]);
    setShowAddProductPage(false);
  };

  return (
    <DashboardLayout>
      {showAddProductPage ? (
        <AddProduct
          onDone={() => setShowAddProductPage(false)}
          onAddProduct={handleAddProductFromPage}
        />
      ) : (
        <>
          <div className="flex flex-col gap-8 pb-10">
            {/* Header Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-semibold text-[#150D5E]">
                Product List
              </h1>
            </div>

            {/* Top Mini Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Total Products */}
              <div className="bg-[#F4F3F8] rounded-2xl p-5 flex items-center justify-between border border-[#eef0f6] relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E5E2F9] flex items-center justify-center text-[#150D5E]">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Total Products
                    </p>
                    <h3 className="text-[#150D5E] text-2xl font-bold mt-0.5">
                      {isLoading ? "..." : totalProductsCount.toLocaleString()}
                    </h3>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-[#150D5E] p-1.5 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Card 2: Low Stock */}
              <div className="bg-[#F4F3F8] rounded-2xl p-5 flex items-center justify-between border border-[#eef0f6] relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFF3D6] flex items-center justify-center text-[#E0930B]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Low stock items
                    </p>
                    <h3 className="text-[#150D5E] text-2xl font-bold mt-0.5">
                      {isLoading ? "..." : lowStockCount.toLocaleString()}
                    </h3>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-[#150D5E] p-1.5 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Card 3: Out of Stock */}
              <div className="bg-[#F4F3F8] rounded-2xl p-5 flex items-center justify-between border border-[#eef0f6] relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FCEAEB] flex items-center justify-center text-[#D13B45]">
                    <XCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold">
                      Out of stock
                    </p>
                    <h3 className="text-[#150D5E] text-2xl font-bold mt-0.5">
                      {isLoading ? "..." : outOfStockCount.toLocaleString()}
                    </h3>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-[#150D5E] p-1.5 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Category Cards Grid (4 in a row, repeating) */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`rounded-2xl p-5 border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      selectedCategory === cat.name
                        ? "bg-[#EEECF9] border-[#6F6BD6] shadow-sm scale-[1.02]"
                        : "bg-[#F8F9FC] border-[#eef0f6] hover:bg-[#EEECF9]/50"
                    }`}
                  >
                    <div>
                      <span className="text-[#6F6BD6] text-xs font-bold uppercase tracking-wider">
                        {cat.name}
                      </span>
                      <h4 className="text-[#150D5E] text-2xl font-bold my-1">
                        {cat.count}
                      </h4>
                      <p className="text-gray-400 text-xs">{cat.desc}</p>
                    </div>

                    {/* Pill bottle inline graphic */}
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm relative shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-[#6F6BD6]"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="7" y="8" width="10" height="13" rx="2" />
                        <rect x="9" y="3" width="6" height="5" rx="1" />
                        <line x1="7" y1="12" x2="17" y2="12" />
                        <circle cx="12" cy="16" r="1.5" fill="currentColor" />
                      </svg>

                      {/* Floating 3 dots icon */}
                      <div className="absolute -top-1.5 -right-1.5 text-gray-400">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dummy visual second row categories for aesthetics to match the wireframe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 opacity-95">
                {categories.map((cat, idx) => (
                  <div
                    key={idx + 4}
                    className="bg-[#F8F9FC] border border-[#eef0f6] rounded-2xl p-5 flex items-center justify-between opacity-80 cursor-not-allowed hover:bg-gray-50"
                  >
                    <div>
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                        {cat.name}
                      </span>
                      <h4 className="text-gray-400 text-2xl font-bold my-1">
                        {cat.count}
                      </h4>
                      <p className="text-gray-400 text-xs">{cat.desc}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm relative opacity-60">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6 text-gray-400"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="7" y="8" width="10" height="13" rx="2" />
                        <rect x="9" y="3" width="6" height="5" rx="1" />
                      </svg>
                      <div className="absolute -top-1.5 -right-1.5 text-gray-300">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dummy visual third row categories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4 opacity-40">
                {categories.map((cat, idx) => (
                  <div
                    key={idx + 8}
                    className="bg-[#F8F9FC] border border-[#eef0f6] rounded-2xl p-4 flex items-center justify-between"
                  >
                    <span className="text-gray-400 text-xs font-bold">
                      {cat.name}
                    </span>
                    <MoreVertical className="w-4 h-4 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Antibiotics List Table Card */}
            <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-[#150D5E]">
                  {selectedCategory}
                </h2>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="search product"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-10 pl-9 pr-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm"
                    />
                  </div>

                  {/* Add New Products Button */}
                  <button
                    onClick={() => setShowAddProductPage(true)}
                    className="bg-[#150D5E] hover:bg-[#201584] text-white px-5 h-10 rounded-xl font-semibold flex items-center gap-2 text-sm shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Products</span>
                  </button>

                  {/* Filters Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="border border-[#eef0f6] hover:bg-gray-50 text-gray-600 px-5 h-10 rounded-xl font-semibold flex items-center gap-2 text-sm transition-all"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Filters</span>
                    </button>

                    {showFilterDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                        <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                          Status
                        </p>
                        {["All", "In stock", "Low stock", "Out of stock"].map(
                          (status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setStatusFilter(status);
                                setShowFilterDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors ${
                                statusFilter === status
                                  ? "bg-[#EEECF9] text-[#150D5E] font-bold"
                                  : "text-gray-700"
                              }`}
                            >
                              {status}
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
                      <th className="py-3.5 px-6 rounded-l-xl">Product ID</th>
                      <th className="py-3.5 px-6">Product Name</th>
                      <th className="py-3.5 px-6">Quantity</th>
                      <th className="py-3.5 px-6">Expiry Date</th>
                      <th className="py-3.5 px-6">Status</th>
                      <th className="py-3.5 px-6">Unit Price</th>
                      <th className="py-3.5 px-6 rounded-r-xl">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-400 font-medium"
                        >
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-[#150D5E] border-t-transparent rounded-full animate-spin"></div>
                            <span>Loading products...</span>
                          </div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-8 text-center text-red-500 font-medium"
                        >
                          {error}
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-12 text-center text-gray-400 font-medium text-[15px]"
                        >
                          There are no products yet.
                        </td>
                      </tr>
                    ) : paginatedProducts.length > 0 ? (
                      paginatedProducts.map((prod, i) => {
                        const statusStr =
                          prod.status ||
                          (prod.quantity === 0
                            ? "Out of stock"
                            : prod.quantity <= 15
                              ? "Low stock"
                              : "In stock");
                        const isOutOfStock =
                          statusStr.toLowerCase() === "out of stock";
                        const isLowStock =
                          statusStr.toLowerCase() === "low stock";
                        return (
                          <tr
                            key={i}
                            className="border-b border-[#EEF0F6] hover:bg-[#F8F9FC] transition-colors duration-150 text-[15px] text-[#1a1a4b]"
                          >
                            <td className="py-4 px-6 font-semibold">
                              {prod.id}
                            </td>
                            <td className="py-4 px-6 font-medium text-gray-800">
                              {prod.name}{" "}
                              {prod.dosage && (
                                <span className="text-gray-400 text-xs font-normal">
                                  ({prod.dosage})
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-gray-600">
                              {prod.quantity} units
                            </td>
                            <td className="py-4 px-6 text-gray-500">
                              {prod.expiryDate}
                            </td>
                            <td className="py-4 px-6">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                                  statusStr.toLowerCase() === "in stock"
                                    ? "bg-[#E5F7EB] text-[#2F9E58]"
                                    : isLowStock
                                      ? "bg-[#FFF3D6] text-[#E0930B]"
                                      : "bg-[#FCEAEB] text-[#D13B45]"
                                }`}
                              >
                                {statusStr}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-bold text-[#150D5E]">
                              {formatPrice(prod.price)}
                            </td>
                            <td className="py-4 px-6">
                              <button className="text-[#6F6BD6] hover:underline font-semibold text-sm">
                                View details
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="py-8 text-center text-gray-400 font-medium"
                        >
                          No products found matching the criteria.
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
                  <span className="font-bold text-gray-700">
                    {showStart}-{showEnd}
                  </span>
                  <span>of</span>
                  <span className="font-bold text-gray-700">{totalItems}</span>
                  <span className="ml-2 text-gray-400">| Limit:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="bg-[#f8f9fc] border border-[#eef0f6] rounded-lg px-2 py-0.5 text-gray-700 outline-none focus:ring-1 focus:ring-[#150D5E]"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((page, idx) => {
                    if (page === "...") {
                      return (
                        <span
                          key={idx}
                          className="text-gray-400 px-1 font-bold text-sm select-none"
                        >
                          ...
                        </span>
                      );
                    }
                    const isActive = page === currentPage;
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shadow-sm transition-all ${
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-50 disabled:hover:bg-transparent transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Product Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="bg-[#150D5E] text-white px-6 py-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold">Add New Product</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <form
                  onSubmit={handleAddProduct}
                  className="p-6 flex flex-col gap-5"
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Medicine Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Paracetamol"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Dosage
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 500mg"
                        value={newProduct.dosage}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            dosage: e.target.value,
                          })
                        }
                        className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            category: e.target.value,
                          })
                        }
                        className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm bg-white"
                      >
                        <option>Antibiotics</option>
                        <option>Pain Reliver</option>
                        <option>Supplements</option>
                        <option>Diabetes Care</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Quantity (Units)
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={newProduct.quantity}
                        onChange={(e) => {
                          const qty = Number(e.target.value);
                          let status = "In stock";
                          if (qty === 0) status = "Out of stock";
                          else if (qty < 20) status = "Low stock";
                          setNewProduct({
                            ...newProduct,
                            quantity: qty,
                            status,
                          });
                        }}
                        className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Unit Price (₦)
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 8000"
                        value={newProduct.price}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            price: e.target.value,
                          })
                        }
                        className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="date"
                        required
                        value={newProduct.expiryDate}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            expiryDate: e.target.value,
                          })
                        }
                        className="w-full px-4 h-11 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 focus:border-[#150D5E] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Auto-Status
                      </label>
                      <div className="h-11 px-4 border border-gray-100 bg-gray-50 rounded-xl flex items-center text-sm font-semibold text-[#150D5E]">
                        {newProduct.status}
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer Buttons */}
                  <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-5 h-11 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                    >
                      Add Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
