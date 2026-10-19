export default function StatsBar({ stats, variant = "light" }) {
  const isDark = variant === "dark";

  return (
    <div
      className={
        isDark
          ? "bg-[#150D5E] rounded-2xl px-6 sm:px-10 py-8 grid grid-cols-2 sm:grid-cols-4 gap-8"
          : "grid grid-cols-2 sm:grid-cols-4 gap-8"
      }
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p
            className={
              isDark
                ? "text-2xl sm:text-3xl font-semibold text-white"
                : "text-2xl sm:text-3xl font-semibold text-[#121212]"
            }
          >
            {stat.value}
          </p>
          <p
            className={
              isDark
                ? "text-xs sm:text-sm text-[#C9C4EE] mt-1"
                : "text-xs sm:text-sm text-[#888888] mt-1"
            }
          >
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}