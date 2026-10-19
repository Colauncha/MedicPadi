function Avatar({ name = "S", size = "w-10 h-10", bg = "bg-[#2D1FA3]" }) {
  return (
    <div
      className={`${size} ${bg} rounded-full flex items-center justify-center
                  text-white font-semibold text-sm flex-shrink-0`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

export default Avatar;