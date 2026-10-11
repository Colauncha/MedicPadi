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
  Loader2,
  Edit2,
  Trash2,
  FolderPlus,
} from "lucide-react";
import {
  listPharmacyDrugs,
  listDrugCategories,
  createDrugCategory,
  updateDrugCategory,
  deleteDrugCategory,
} from "../../../api/services.api";
import AddProduct from "./addProduct";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  // Category management state
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: "",
    description: "",
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [activeCategoryMenu, setActiveCategoryMenu] = useState(null);

  // Delete category confirmation modal state
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, statusFilter, itemsPerPage]);

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
        const arrayProp = Object.values(res).find((val) => Array.isArray(val));
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

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      const res = await listDrugCategories();
      let list = [];
      if (Array.isArray(res)) {
        list = res;
      } else if (res && Array.isArray(res.data)) {
        list = res.data;
      } else if (res && Array.isArray(res.categories)) {
        list = res.categories;
      } else if (res && typeof res === "object") {
        const arrayProp = Object.values(res).find((val) => Array.isArray(val));
        if (arrayProp) {
          list = arrayProp;
        }
      }
      setCategories(list);
    } catch (err) {
      console.error("Failed to load drug categories:", err);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Close category 3-dots dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveCategoryMenu(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Category CRUD Handlers
  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setCategoryFormData({ name: "", description: "" });
    setCategoryError("");
    setShowCategoryModal(true);
  };

  const handleOpenEditCategory = (cat) => {
    setEditingCategory(cat);
    setCategoryFormData({
      name: cat.name || "",
      description: cat.description || "",
    });
    setCategoryError("");
    setShowCategoryModal(true);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryFormData.name.trim()) {
      setCategoryError("Please enter a category name.");
      return;
    }

    try {
      setIsSavingCategory(true);
      setCategoryError("");

      const payload = {
        name: categoryFormData.name.trim(),
        description: categoryFormData.description.trim(),
      };

      if (editingCategory) {
        await updateDrugCategory(editingCategory.id || editingCategory._id, payload);
      } else {
        await createDrugCategory(payload);
      }

      setShowCategoryModal(false);
      setEditingCategory(null);
      setCategoryFormData({ name: "", description: "" });
      await fetchCategories();
    } catch (err) {
      console.error("Failed to save category:", err);
      setCategoryError(err.message || "Failed to save category.");
    } finally {
      setIsSavingCategory(false);
    }
  };

  const handleDeleteCategory = (cat) => {
    setCategoryToDelete(cat);
    setDeleteError("");
  };

  const handleConfirmDeleteCategory = async () => {
    if (!categoryToDelete) return;
    const catId = categoryToDelete.id || categoryToDelete._id;
    if (!catId) return;

    try {
      setIsDeletingCategory(true);
      setDeleteError("");

      await deleteDrugCategory(catId);
      if (
        selectedCategory.toLowerCase() ===
        (categoryToDelete.name || "").toLowerCase()
      ) {
        setSelectedCategory("All");
      }
      setCategoryToDelete(null);
      await fetchCategories();
    } catch (err) {
      console.error("Failed to delete category:", err);
      setDeleteError(
        err.message || "Failed to delete category. Please try again."
      );
    } finally {
      setIsDeletingCategory(false);
    }
  };

  // Calculated Stats
  const totalProductsCount = products.length;
  const lowStockCount = products.filter(
    (p) =>
      p.status?.toLowerCase() === "low stock" ||
      (p.quantity !== undefined && p.quantity > 0 && p.quantity <= 15)
  ).length;
  const outOfStockCount = products.filter(
    (p) => p.status?.toLowerCase() === "out of stock" || p.quantity === 0
  ).length;

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "₦0";
    if (typeof price === "string" && price.startsWith("₦")) return price;
    return `₦${Number(price).toLocaleString()}`;
  };

  // Filter products by selected category, search term, and status filter
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      (product.category || "").toLowerCase() === selectedCategory.toLowerCase();

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
      Number(String(productData.price).replace(/[^0-9]/g, "")) || 1500;
    const formattedPrice = `₦${numericPrice.toLocaleString()}`;

    const productToAdd = {
      id: randomId,
      name: productData.name || productData.medicine,
      dosage: productData.dosage || "500mg",
      category: productData.category || "Uncategorized",
      quantity: 100,
      expiryDate: "31-12-2026",
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
          categories={categories}
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

            {/* Drug Categories Section (Option 2) */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#150D5E]">
                    Drug Categories
                  </h2>
                  <p className="text-xs text-gray-400">
                    Filter products by category or manage your drug classifications
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddCategory}
                  className="self-start sm:self-auto bg-[#EEECF9] hover:bg-[#E2DEFA] text-[#150D5E] border border-[#150D5E]/20 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4 text-[#150D5E]" />
                  <span>Add Category</span>
                </button>
              </div>

              {/* Category Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* "All Products" Card */}
                <div
                  onClick={() => setSelectedCategory("All")}
                  className={`rounded-2xl p-5 border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                    selectedCategory === "All"
                      ? "bg-[#EEECF9] border-[#6F6BD6] shadow-sm scale-[1.01]"
                      : "bg-[#F8F9FC] border-[#eef0f6] hover:bg-[#EEECF9]/40"
                  }`}
                >
                  <div>
                    <span className="text-[#6F6BD6] text-xs font-bold uppercase tracking-wider">
                      All Products
                    </span>
                    <h4 className="text-[#150D5E] text-2xl font-bold my-1">
                      {isLoading ? "..." : totalProductsCount}
                    </h4>
                    <p className="text-gray-400 text-xs">All inventory drugs</p>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Package className="w-6 h-6 text-[#6F6BD6]" />
                  </div>
                </div>

                {/* Dynamic Category Cards */}
                {isLoadingCategories ? (
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={`cat-skeleton-${idx}`}
                      className="bg-[#F8F9FC] border border-[#eef0f6] rounded-2xl p-5 flex items-center justify-between animate-pulse"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-6 bg-gray-200 rounded w-12"></div>
                        <div className="h-2.5 bg-gray-200 rounded w-28"></div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    </div>
                  ))
                ) : categories.length > 0 ? (
                  categories.map((cat) => {
                    const count = products.filter(
                      (p) =>
                        (p.category || "").toLowerCase() ===
                        (cat.name || "").toLowerCase()
                    ).length;
                    const isSelected =
                      selectedCategory.toLowerCase() ===
                      (cat.name || "").toLowerCase();
                    const catId = cat.id || cat._id;
                    const isMenuOpen = activeCategoryMenu === catId;

                    return (
                      <div
                        key={catId || cat.name}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`rounded-2xl p-5 border cursor-pointer transition-all duration-200 flex items-center justify-between relative ${
                          isSelected
                            ? "bg-[#EEECF9] border-[#6F6BD6] shadow-sm scale-[1.01]"
                            : "bg-[#F8F9FC] border-[#eef0f6] hover:bg-[#EEECF9]/40"
                        }`}
                      >
                        <div className="flex-1 pr-2 min-w-0">
                          <span className="text-[#6F6BD6] text-xs font-bold uppercase tracking-wider block truncate">
                            {cat.name}
                          </span>
                          <h4 className="text-[#150D5E] text-2xl font-bold my-1">
                            {isLoading ? "..." : count}
                          </h4>
                          <p
                            className="text-gray-400 text-xs truncate"
                            title={cat.description || "No description"}
                          >
                            {cat.description || "No description"}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm">
                            <Package className="w-5 h-5 text-[#6F6BD6]" />
                          </div>

                          {/* 3-dots Menu */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveCategoryMenu(isMenuOpen ? null : catId);
                              }}
                              className="p-1 rounded-lg text-gray-400 hover:text-[#150D5E] hover:bg-white transition-colors cursor-pointer"
                              title="Category options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {isMenuOpen && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-30 py-1 text-sm animate-in fade-in zoom-in-95 duration-150"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveCategoryMenu(null);
                                    handleOpenEditCategory(cat);
                                  }}
                                  className="w-full px-3 py-1.5 text-left text-gray-700 hover:bg-[#EEECF9] hover:text-[#150D5E] flex items-center gap-2 text-xs font-semibold cursor-pointer"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveCategoryMenu(null);
                                    handleDeleteCategory(cat);
                                  }}
                                  className="w-full px-3 py-1.5 text-left text-red-600 hover:bg-red-50 flex items-center gap-2 text-xs font-semibold cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div
                    onClick={handleOpenAddCategory}
                    className="col-span-full sm:col-span-2 lg:col-span-3 border-2 border-dashed border-gray-200 rounded-2xl p-5 flex items-center justify-center gap-3 text-gray-400 hover:border-[#6F6BD6] hover:text-[#6F6BD6] transition-all cursor-pointer bg-white"
                  >
                    <FolderPlus className="w-5 h-5" />
                    <span className="text-sm font-semibold">
                      No categories yet. Click to add your first category
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Products Table Card */}
            <div className="bg-white border border-[#eef0f6] rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#150D5E]">
                    {selectedCategory === "All" ? "All Products" : selectedCategory}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Showing{" "}
                    <span className="font-semibold text-gray-700">
                      {filteredProducts.length}
                    </span>{" "}
                    drug{filteredProducts.length === 1 ? "" : "s"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative w-full sm:w-[240px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search product"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-10 pl-9 pr-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm"
                    />
                  </div>

                  {/* Add New Products Button */}
                  <button
                    onClick={() => setShowAddProductPage(true)}
                    className="bg-[#150D5E] hover:bg-[#201584] text-white px-5 h-10 rounded-xl font-semibold flex items-center gap-2 text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Product</span>
                  </button>

                  {/* Filters Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                      className="border border-[#eef0f6] hover:bg-gray-50 text-gray-600 px-5 h-10 rounded-xl font-semibold flex items-center gap-2 text-sm transition-all cursor-pointer"
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
                              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#EEECF9] hover:text-[#150D5E] transition-colors cursor-pointer ${
                                statusFilter === status
                                  ? "bg-[#EEECF9] text-[#150D5E] font-bold"
                                  : "text-gray-700"
                              }`}
                            >
                              {status}
                            </button>
                          )
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
                            <Loader2 className="w-5 h-5 animate-spin text-[#150D5E]" />
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
                            key={prod.id || i}
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
                              <button className="text-[#6F6BD6] hover:underline font-semibold text-sm cursor-pointer">
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
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="bg-[#f8f9fc] border border-[#eef0f6] rounded-lg px-2.5 py-1 text-gray-700 outline-none focus:ring-1 focus:ring-[#150D5E] cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>of {totalItems}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
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
                        onClick={() => setCurrentPage(page)}
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
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage >= totalPages}
                    className="w-8 h-8 rounded-lg border border-[#eef0f6] flex items-center justify-center text-gray-400 hover:bg-[#EEECF9] hover:text-[#150D5E] disabled:opacity-50 disabled:hover:bg-transparent transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Add / Edit Category Modal (Carrying Name & Description) */}
          {showCategoryModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="bg-[#150D5E] text-white px-6 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      {editingCategory ? "Edit Drug Category" : "Add Drug Category"}
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5">
                      {editingCategory
                        ? "Update category details"
                        : "Enter the category name and description"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCategoryModal(false);
                      setCategoryError("");
                    }}
                    className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Form */}
                <form
                  onSubmit={handleSaveCategory}
                  className="p-6 flex flex-col gap-4"
                >
                  {categoryError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium">
                      {categoryError}
                    </div>
                  )}

                  {/* Field 1: Category Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7C7A9E] mb-1.5">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Antibiotics, Analgesics, Vitamins"
                      value={categoryFormData.name}
                      onChange={(e) =>
                        setCategoryFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full h-11 px-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 text-sm font-medium text-gray-800"
                    />
                  </div>

                  {/* Field 2: Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7C7A9E] mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Enter a brief description of what drugs fall into this category..."
                      value={categoryFormData.description}
                      onChange={(e) =>
                        setCategoryFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="w-full p-4 bg-[#f8f9fc] border border-[#eef0f6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#150D5E]/20 text-sm font-medium text-gray-800 resize-none"
                    />
                  </div>

                  {/* Modal Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCategoryModal(false);
                        setCategoryError("");
                      }}
                      className="flex-1 h-11 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-600 text-sm transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingCategory || !categoryFormData.name.trim()}
                      className="flex-1 h-11 bg-[#150D5E] hover:bg-[#201584] text-white rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSavingCategory ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : editingCategory ? (
                        "Update Category"
                      ) : (
                        "Save Category"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Custom Delete Confirmation Modal */}
          {categoryToDelete && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200 p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-[#150D5E]">
                  Delete Category?
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-800">
                    "{categoryToDelete.name}"
                  </span>
                  ? This action cannot be undone.
                </p>

                {deleteError && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-medium text-center">
                    {deleteError}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-6">
                  <button
                    type="button"
                    disabled={isDeletingCategory}
                    onClick={() => {
                      setCategoryToDelete(null);
                      setDeleteError("");
                    }}
                    className="flex-1 h-11 border border-gray-200 hover:bg-gray-50 rounded-xl font-semibold text-gray-600 text-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={isDeletingCategory}
                    onClick={handleConfirmDeleteCategory}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isDeletingCategory ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
