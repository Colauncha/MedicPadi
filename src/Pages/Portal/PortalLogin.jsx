
import { ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router";

import doctorImg from "../../assets/images/Doctor.png";
import pharmacistImg from "../../assets/images/Pharmacist.png";
import laboratoryImg from "../../assets/images/Laboratory.png";

const portals = [
  {
    name: "Doctor",
    description:
      "Manage appointments, consult patients and provide quality healthcare.",
    image: doctorImg,
    signup: "/doctor-signup",
    login: "/doctor-signin",
  },
  {
    name: "Pharmacist",
    description:
      "Manage prescriptions, medicines, orders and pharmacy services.",
    image: pharmacistImg,
    signup: "/pharmacy-signup",
    login: "/pharmacy-signin",
  },
  {
    name: "Laboratory",
    description:
      "Manage test requests, laboratory reports and diagnostic services.",
    image: laboratoryImg,
    signup: "/laboratory-signup",
    login: "/laboratory-signin",
  },
];

export default function PortalLogin() {
  return (
    <div className="min-h-screen bg-[#F7F7FB] flex flex-col">
      <main className="flex-1 flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-6xl">

          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-[#5548A8] mb-3">
              Welcome to MedicPadi
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-[#150D5E] mb-4">
              Choose Your Portal
            </h1>

            <p className="text-gray-500 max-w-xl mx-auto leading-7">
              Select your professional category to access your
              dedicated healthcare workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {portals.map((portal) => (
              <div
                key={portal.name}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-52 bg-[#F0EEFA] flex items-center justify-center p-5">
                  <img
                    src={portal.image}
                    alt={portal.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#150D5E] mb-2">
                    {portal.name} Portal
                  </h2>

                  <p className="text-sm text-gray-500 leading-6 min-h-[72px]">
                    {portal.description}
                  </p>

                  <div className="flex flex-col gap-3 mt-6">
                    <Link
                      to={portal.signup}
                      className="flex items-center justify-center gap-2 bg-[#150D5E] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#2C1BC4] transition"
                    >
                      <UserPlus size={17} />
                      Create Account
                      <ArrowRight size={16} />
                    </Link>

                    <Link
                      to={portal.login}
                      className="flex items-center justify-center gap-2 border border-[#150D5E] text-[#150D5E] py-3 rounded-lg text-sm font-semibold hover:bg-[#F0EEFA] transition"
                    >
                      <LogIn size={17} />
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-400 mt-10">
            Secure healthcare management, all in one place.
          </p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-sm font-medium text-[#5548A8] hover:underline"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
