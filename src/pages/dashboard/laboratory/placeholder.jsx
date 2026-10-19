import DashboardLayout from "../../../components/layout/DashboardLayout";

export default function LabPlaceholder({ title }) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[calc(100vh-200px)] border-2 border-dashed border-gray-200 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-400">{title} Page Coming Soon</h2>
      </div>
    </DashboardLayout>
  );
}
