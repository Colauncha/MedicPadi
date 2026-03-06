import React from "react";
import logo from "../assets/images/Medicpadi_logo.png";

const SplashScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#150D5E] via-[#F3F4FF] to-[#150D5E]">

      <div className="flex flex-col items-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Medicpadi Logo"
          className="w-32 h-32 object-contain mb-4"
        />

        {/* App Name
        <h1 className="mt-3 text-sm font-semibold tracking-[0.2em] text-gray-800">
          MEDICPADI
        </h1> */}

      </div>

    </div>
  );
};

export default SplashScreen;