import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import {
    Search,
    Plus,
    SlidersHorizontal,
    Users,
    Network,
    ClipboardCheck,
    ArrowUpRight,
    ChevronDown,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { listLabTests } from '../../../api/services.api';

export default function LabTest() {
    const navigate = useNavigate();

    const [tests, setTests] = useState([]);
    const [meta, setMeta] = useState({ total: 0, count: 0, limit: 10, page: 1, total_pages: 1 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchTests = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await listLabTests();

                let list = [];
                let responseMeta = null;

                if (Array.isArray(response)) {
                    list = response;
                } else if (response && Array.isArray(response.data)) {
                    list = response.data;
                    responseMeta = response.meta;
                } else if (response && typeof response === "object") {
                    const arrayProp = Object.values(response).find(val => Array.isArray(val));
                    if (arrayProp) list = arrayProp;
                    if (response.meta) responseMeta = response.meta;
                }

                setTests(list);
                if (responseMeta) {
                    setMeta(responseMeta);
                } else {
                    setMeta(prev => ({ ...prev, total: list.length, count: list.length }));
                }
            } catch (err) {
                console.error("Failed to fetch lab tests:", err);
                setError(err.message || "Failed to load laboratory tests");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTests();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter, itemsPerPage]);

    // Helpers to extract properties cleanly regardless of API naming convention
    const getTestName = (test) => {
        return (
            test.name ||
            test.test_name ||
            test.testName ||
            test.test_id ||
            test.testId ||
            test.code ||
            (test.id ? `#${test.id}` : "N/A")
        );
    };


    const getStatus = (test) => {
        return test.status || "Pending";
    };

    const formatDate = (dateStr, timeStr) => {
        if (!dateStr && !timeStr) return "N/A";

        let formattedDate = "";
        let formattedTime = "";

        if (dateStr) {
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                }).replace(/\//g, "-");

                formattedTime = date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                });
            } else {
                formattedDate = dateStr;
            }
        }

        if (timeStr) {
            formattedTime = timeStr;
        }

        if (formattedDate && formattedTime && !formattedDate.includes(formattedTime)) {
            return `${formattedDate}, ${formattedTime}`;
        }

        return formattedDate || formattedTime || "N/A";
    };

    const getDate = (test) => {
        const d = test.date || test.date_received || test.received_date || test.created_at || test.createdAt;
        const t = test.time || test.time_received || test.received_time;
        return formatDate(d, t);
    };

    // Filter logic
    const filteredTests = tests.filter((test) => {
        const testName = String(getTestName(test)).toLowerCase();
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            !searchTerm ||
            testName.includes(search);

        const matchesStatus =
            statusFilter === "All" ||
            getStatus(test).toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const totalItems = filteredTests.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTests = filteredTests.slice(startIndex, endIndex);
    const showStart = totalItems === 0 ? 0 : startIndex + 1;
    const showEnd = Math.min(endIndex, totalItems);

    const totalCount = meta?.total !== undefined && meta.total > 0 ? meta.total : tests.length;
    const completedCount = tests.filter(
        (t) => getStatus(t).toLowerCase() === "completed"
    ).length;

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

    const handleToggleAvailability = (testIdentifier) => {
        setTests((prevTests) =>
            prevTests.map((t, idx) => {
                const identifier = t.id !== undefined ? t.id : idx;
                if (identifier === testIdentifier) {
                    return { ...t, available: !Boolean(t.available) };
                }
                return t;
            })
        );
    };

    return (
        <DashboardLayout>
            <div className="w-full max-w-[1300px] mx-auto pb-10">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold text-[#150d5e]">Tests</h1>
                        <div className="relative w-full sm:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="search patient, sample ID"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 bg-[#f8f9fc] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm placeholder:text-[#c4c4c4]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/labdashboard/test/add")}
                            className="bg-[#0f0b4d] text-white flex items-center gap-2 px-6 h-11 rounded-xl text-[14px] font-medium hover:bg-[#1a1a4b]/90 transition-colors shadow-sm cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Test
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                                className="bg-white border border-gray-200 text-gray-500 hover:text-gray-700 flex items-center gap-2 px-6 h-11 rounded-xl text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                                Filters
                            </button>

                            {showFilterDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2">
                                    <p className="px-4 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Status Filter
                                    </p>
                                    {["All", "Completed", "Flagged", "Processing", "Pending"].map(
                                        (status) => (
                                            <button
                                                key={status}
                                                onClick={() => {
                                                    setStatusFilter(status);
                                                    setShowFilterDropdown(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-[#f3f4ff] hover:text-[#331eb9] transition-colors ${statusFilter === status
                                                    ? "bg-[#f3f4ff] text-[#331eb9] font-bold"
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

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Card 1 */}
                    <div className="bg-[#f3f4ff] rounded-2xl p-6 relative">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[#331eb9] text-[15px] font-medium">Total Test</h3>
                            <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[#331eb9]">
                                <Users className="w-4 h-4" fill="#331eb9" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-[#150d5e] mb-3">
                            {isLoading ? "..." : totalCount}
                        </div>
                        <div className="flex items-center text-xs text-[#331eb9] font-medium">
                            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                            <span className="font-semibold mr-1">15%</span>
                            <span className="opacity-95">from last week</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#f3f4ff] rounded-2xl p-6 relative">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[#331eb9] text-[15px] font-medium">Total Department</h3>
                            <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[#331eb9]">
                                <Network className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-[#331eb9] font-medium">
                            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                            <span className="font-semibold mr-1">15%</span>
                            <span className="opacity-95">rise from last week</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#f3f4ff] rounded-2xl p-6 relative">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-[#331eb9] text-[15px] font-medium">Completed Test</h3>
                            <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[#331eb9]">
                                <ClipboardCheck className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-[#150d5e] mb-3">
                            {isLoading ? "..." : completedCount}
                        </div>
                        <div className="flex items-center text-xs text-[#331eb9] font-medium">
                            <ArrowUpRight className="w-3.5 h-3.5 mr-1" />
                            <span className="font-semibold mr-1">25%</span>
                            <span className="opacity-95">Attended appointments</span>
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border border-[#eef0f6] rounded-2xl overflow-hidden shadow-sm mb-6">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f4f6fd]/80 border-b border-[#eef0f6] text-gray-500 font-medium text-[14px]">
                                    <th className="py-4.5 px-8">Test Name</th>
                                    <th className="py-4.5 px-8">Short Name</th>
                                    <th className="py-4.5 px-8">TAT-(Hours)</th>
                                    <th className="py-4.5 px-8">Price</th>
                                    <th className="py-4.5 px-8">Available</th>
                                    <th className="py-4.5 px-8">Received</th>
                                    <th className="py-4.5 px-8">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eef0f6] text-[15px]">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400 font-medium">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-[#150d5e] border-t-transparent rounded-full animate-spin"></div>
                                                <span>Loading tests...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center text-red-500 font-medium">
                                            {error}
                                        </td>
                                    </tr>
                                ) : tests.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-400 font-medium text-[15px]">
                                            No lab tests found.
                                        </td>
                                    </tr>
                                ) : paginatedTests.length > 0 ? (
                                    paginatedTests.map((test, index) => {
                                        const isAvailable = Boolean(test.available);
                                        const testId = test.id !== undefined ? test.id : index;
                                        return (
                                            <tr key={testId} className="hover:bg-[#f8f9fc]/50 transition-colors">
                                                <td className="py-4 px-8 text-gray-700 font-medium">{getTestName(test)}</td>
                                                <td className="py-4 px-8 text-gray-700 font-medium">{test.shortName}</td>
                                                <td className="py-4 px-8 text-gray-600">{test.TAT}</td>
                                                <td className="py-4 px-8 text-gray-600">&#8358;{test.price}</td>
                                                <td className="py-4 px-8">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${isAvailable
                                                        ? "bg-[#e2f6e9] text-[#27ae60]"
                                                        : "bg-[#ffebee] text-[#e74c3c]"
                                                        }`}>
                                                        {isAvailable ? "True" : "False"}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-8 text-gray-500">{getDate(test)}</td>
                                                <td className="py-4 px-8">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleAvailability(testId)}
                                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none cursor-pointer ${isAvailable ? "bg-[#27ae60]" : "bg-gray-300"
                                                                }`}
                                                            title={isAvailable ? "Turn Off" : "Turn On"}
                                                        >
                                                            <span
                                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? "translate-x-6" : "translate-x-1"
                                                                    }`}
                                                            />
                                                        </button>
                                                        <span className={`text-xs font-semibold ${isAvailable ? "text-[#27ae60]" : "text-gray-400"}`}>
                                                            {isAvailable ? "On" : "Off"}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-8 text-center text-gray-400 font-medium">
                                            No tests found matching criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Section */}
                <div className="flex justify-between items-center text-sm text-gray-500 py-2 px-2">
                    {/* Dropdown at Bottom Left */}
                    <div className="flex items-center gap-2">
                        <span>Showing</span>
                        <span className="font-semibold text-gray-700">{showStart}-{showEnd}</span>
                        <span>out of {totalItems}</span>
                        <span className="ml-2 text-gray-400">| Limit:</span>
                        <div className="relative">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="appearance-none bg-[#f8f9fc] border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-gray-700 font-medium focus:outline-none cursor-pointer"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Pagination Numbers at Bottom Right */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {getPageNumbers().map((page, idx) => {
                            if (page === "...") {
                                return (
                                    <span key={idx} className="text-gray-400 px-1 font-medium select-none">
                                        ...
                                    </span>
                                );
                            }
                            const isActive = page === currentPage;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 rounded-lg font-medium flex items-center justify-center cursor-pointer transition-colors ${isActive
                                        ? "bg-[#0f0b4d] text-white"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}
