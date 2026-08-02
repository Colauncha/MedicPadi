import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { listLabDepartments } from '../../../api/services.api';

export default function LabDepartment() {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeDepts, setActiveDepts] = useState({});

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await listLabDepartments();

                let list = [];
                if (Array.isArray(response)) {
                    list = response;
                } else if (response && Array.isArray(response.data)) {
                    list = response.data;
                } else if (response && typeof response === "object") {
                    const arrayProp = Object.values(response).find(val => Array.isArray(val));
                    if (arrayProp) list = arrayProp;
                }

                setDepartments(list);

                // Initialize active state for departments
                const initialActiveState = {};
                list.forEach((dept, index) => {
                    const id = dept.id || index + 1;
                    initialActiveState[id] = dept.is_active !== undefined ? dept.is_active : true;
                });
                setActiveDepts(initialActiveState);
            } catch (err) {
                console.error("Failed to fetch lab departments:", err);
                setError(err.message || "Failed to load departments");
            } finally {
                setIsLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const toggleDept = (id) => {
        setActiveDepts(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const getDeptName = (dept) => dept.name || dept.department_name || dept.departmentName || "Department";
    const getDeptCode = (dept) => dept.code || dept.department_code || dept.short_code || "LAB";
    const getTestsOffered = (dept) => dept.testsOffered ?? dept.tests_offered ?? dept.tests_count ?? (Array.isArray(dept.tests) ? dept.tests.length : 0);
    const getStaffAssigned = (dept) => dept.staffAssigned ?? dept.staff_assigned ?? dept.staff_count ?? (Array.isArray(dept.staff) ? dept.staff.length : 0);
    const getTAT = (dept) => dept.tat || dept.turnaround_time || dept.turnaround_target || "24h-48h";
    const getTodayCount = (dept) => dept.todayCount ?? dept.today_count ?? dept.today_tests ?? 0;
    const getTotalCount = (dept) => dept.totalCount ?? dept.total_count ?? dept.capacity ?? dept.daily_capacity ?? 20;

    const filteredDepartments = departments.filter((dept) => {
        const name = getDeptName(dept).toLowerCase();
        const code = getDeptCode(dept).toLowerCase();
        const search = searchTerm.toLowerCase();
        return !searchTerm || name.includes(search) || code.includes(search);
    });

    return (
        <DashboardLayout>
            <div className="w-full max-w-[1300px] mx-auto pb-10">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-bold text-[#150d5e]">Departments</h1>
                        <div className="relative w-full sm:w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="search department, code"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full h-11 pl-11 pr-4 bg-[#f8f9fc] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a1a4b]/10 text-sm placeholder:text-[#c4c4c4]"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/labdashboard/department/add")}
                            className="bg-[#0f0b4d] text-white flex items-center gap-2 px-6 h-11 rounded-xl text-[14px] font-medium hover:bg-[#1a1a4b]/90 transition-colors shadow-sm cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Department
                        </button>
                        <button className="bg-white border border-gray-200 text-gray-500 hover:text-gray-700 flex items-center gap-2 px-6 h-11 rounded-xl text-[14px] font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Loading / Error States */}
                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-3 text-gray-400 font-medium">
                        <div className="w-8 h-8 border-3 border-[#0f0b4d] border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading departments...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6 text-center font-medium">
                        {error}
                    </div>
                ) : departments.length === 0 ? (
                    <div className="bg-white border border-[#eef0f6] rounded-3xl p-12 text-center text-gray-400 font-medium">
                        No departments found.
                    </div>
                ) : (
                    /* Departments Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDepartments.map((dept, index) => {
                            const deptId = dept.id || index + 1;
                            const isActive = activeDepts[deptId] !== undefined ? activeDepts[deptId] : true;
                            const todayCount = getTodayCount(dept);
                            const totalCount = getTotalCount(dept);
                            const progressPercent = totalCount > 0 ? Math.min((todayCount / totalCount) * 100, 100) : 0;

                            return (
                                <div
                                    key={deptId}
                                    className="bg-[#fcfcfd] border border-[#eef0f6] rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                >

                                    {/* Top Section: Name, Code & Toggle */}
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-base font-semibold text-[#1a1a4b]">{getDeptName(dept)}</h3>
                                                <span className="text-[11px] font-bold text-[#331eb9] tracking-wider block mt-0.5">
                                                    {getDeptCode(dept)}
                                                </span>
                                            </div>
                                            {/* Switch Toggle */}
                                            <div
                                                onClick={() => toggleDept(deptId)}
                                                className={`w-9 h-5 rounded-full p-0.5 cursor-pointer flex items-center transition-colors duration-200 ${isActive ? "bg-[#0f0b4d]" : "bg-gray-200"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${isActive ? "translate-x-4" : "translate-x-0"
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Main Metrics Row */}
                                        <div className="grid grid-cols-3 gap-2 mt-6 mb-6">
                                            <div>
                                                <span className="text-lg font-bold text-[#1a1a4b] block leading-none">
                                                    {getTestsOffered(dept)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium block mt-1">
                                                    tests offered
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-lg font-bold text-[#1a1a4b] block leading-none">
                                                    {getStaffAssigned(dept)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium block mt-1">
                                                    staff assigned
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-lg font-bold text-[#1a1a4b] block leading-none whitespace-nowrap">
                                                    {getTAT(dept)}
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-medium block mt-1">
                                                    turnaround time
                                                </span>
                                            </div>
                                        </div>

                                        {/* Today's Test Progress Row */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5 font-medium">
                                                <span>Today's test</span>
                                                <span>{todayCount}/{totalCount}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#0f0b4d] rounded-full transition-all duration-300"
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Bottom Row */}
                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <button className="w-full bg-white border border-[#0f0b4d] text-[#0f0b4d] text-xs font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-center cursor-pointer">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => navigate("/labdashboard/test")}
                                            className="w-full bg-[#0f0b4d] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#150f61] transition-colors text-center cursor-pointer"
                                        >
                                            View Test
                                        </button>
                                    </div>

                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
}
