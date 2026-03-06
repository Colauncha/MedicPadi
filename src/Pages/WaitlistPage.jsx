// import React, { useState } from "react";
// import waitlistLogo from "../assets/images/WaitlistLogo.png";
// import waitlistDoc from "../assets/images/WaitlistDoc.png";

// const WaitlistPage = () => {
//   const [role, setRole] = useState("");

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* MAIN CONTAINER */}
//       <div className="max-w-6xl mx-auto">

//         {/* HERO SECTION */}
//         <div className="text-center px-6 pt-16 flex flex-col items-center">

//           {/* Logo */}
//           <img
//             src={waitlistLogo}
//             alt="logo"
//             className="mx-auto w-40 md:w-56 mb-6"
//           />

//           {/* Heading */}
//           <h1 className="text-xl md:text-4xl font-medium text-gray-800 max-w-3xl">
//             The all-in-one healthcare platform connecting doctors, patients,
//             pharmacies and laboratories
//           </h1>

//           {/* Subtext */}
//           <p className="mt-4 text-gray-500 max-w-xl">
//             Join the waitlist and be among the first to experience seamless
//             healthcare coordination
//           </p>

//           {/* Doctor Image */}
//           <img
//             src={waitlistDoc}
//             alt="Doctor"
//             className="mx-auto mt-10 w-40 md:w-64"
//           />
//         </div>

//         {/* WHY CHOOSE SECTION */}
//         <div className="mt-20 px-6 md:px-16">
//           <h2 className="text-2xl font-semibold text-center mb-10">
//             Why Choose Medicpadi?
//           </h2>

//           <div className="flex flex-col md:flex-row justify-center gap-10 text-gray-600 max-w-4xl mx-auto">

//              {/* LEFT SIDE */}
//             <div className="flex flex-col gap-4">
//               <p>✔ Seamless communication between healthcare stakeholders</p>
//               <p>✔ Digital health records accessible anytime</p>
//               <p>✔ Secure and compliant platform</p>
//             </div>

//               {/* RIGHT SIDE */} 
//               <div className="flex flex-col gap-4">
//                 <p>✔ Real-time prescription & lab tracking</p>
//                 <p>✔ Integrated appointment scheduling</p>
//                  <p>✔ Reduced paperwork and administrative burden</p>
//                </div> 

//               </div>  

//           {/* <div className="grid md:grid-cols-2 gap-6 text-gray-600 max-w-4xl mx-auto">
//             <p>✔ Seamless communication between healthcare stakeholders</p>
//             <p>✔ Digital health records accessible anytime, anywhere</p>
//             <p>✔ Secure and compliant healthcare platform</p>
//             <p>✔ Real-time prescription and lab tracking</p>
//             <p>✔ Integrated appointment scheduling</p>
//             <p>✔ Reduced paperwork and administrative burden</p>
//           </div> */}

//         </div>

//         {/* WAITLIST SECTION */}
//         <div className="mt-20 px-6 md:px-16 pb-20">

//           <h2 className="text-2xl font-semibold text-center">
//             Join the Waitlist
//           </h2>

//           <p className="text-center text-gray-500 mb-10">
//             Be the first to know when we launch
//           </p>

//           <div className="bg-white rounded-xl shadow-md p-8">

//             <div className="flex flex-col md:flex-row gap-10">

//               {/* LEFT SIDE FORM */}
//               <div className="w-full md:w-1/2 flex flex-col gap-4">

//                 <input
//                   type="text"
//                   placeholder="Name"
//                   className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <input
//                   type="email"
//                   placeholder="Email Address"
//                   className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <input
//                   type="text"
//                   placeholder="Address (Optional)"
//                   className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
//                 />

//                 <select className="w-full border rounded-lg p-3 outline-none">
//                   <option>Select your current state</option>
//                   <option>Lagos</option>
//                   <option>Abuja</option>
//                   <option>Enugu</option>
//                 </select>

//               </div>

//               {/* RIGHT SIDE ROLE */}
//               <div className="w-full md:w-1/2">

//                 <p className="mb-4 font-medium">I am a ...</p>

//                 <div className="grid grid-cols-2 gap-4">

//                   {["Doctor", "Pharmacist", "Laboratory", "Patient"].map((item) => (
//                     <div
//                       key={item}
//                       onClick={() => setRole(item)}
//                       className={`cursor-pointer border rounded-xl p-6 text-center transition
//                       ${role === item
//                           ? "border-indigo-600 bg-indigo-50"
//                           : "hover:border-indigo-400"
//                         }`}
//                     >
//                       {item}
//                     </div>
//                   ))}

//                 </div>

//                 <button className="mt-8 w-full bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 transition">
//                   Join Waitlist
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default WaitlistPage;



import React, { useState } from "react";
import waitlistLogo from "../assets/images/WaitlistLogo.png";
import waitlistDoc from "../assets/images/WaitlistDoc.png";

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT – Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const ROLES = ["Doctor", "Pharmacist", "Laboratory", "Patient"];

const FEATURES_LEFT = [
  "Seamless communication between all healthcare stakeholders",
  "Secure and health insurance profitability and accountability (HIPAA) complaint platform",
  "Integrated appointment scheduling",
];

const FEATURES_RIGHT = [
  "Digital health records accessible anytime, anywhere",
  "Real-time prescription and lab order tracking",
  "Reduce paper work and administrative burden",
];

const WaitlistPage = () => {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", state: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!role) e.role = "Please select your role";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-12 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">You're on the list!</h2>
          <p className="text-gray-500 leading-relaxed">
            Thanks for joining the Medicpadi waitlist. We'll notify you as soon as we launch.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", address: "", state: "" }); setRole(""); }}
            className="mt-8 text-sm text-indigo-600 underline font-medium"
          >
            ← Back to form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* HERO SECTION */}
        <div className="text-center px-6 pt-16 flex flex-col items-center">

          {/* Logo */}
          <img
            src={waitlistLogo}
            alt="logo"
            className="mx-auto w-40 md:w-56 mb-6"
          />

          {/* Heading */}
          <h1 className="text-xl md:text-4xl font-medium text-gray-800 max-w-3xl">
            The all-in-one healthcare platform connecting doctors, patients,
            pharmacies and laboratories
          </h1>

          {/* Subtext */}
          <p className="mt-4 text-gray-500 max-w-xl">
            Join the waitlist and be among the first to experience seamless
            healthcare coordination
          </p>

          {/* Doctor Image */}
          <img
            src={waitlistDoc}
            alt="Doctor"
            className="mx-auto mt-10 w-40 md:w-64"
          />
        </div>

        {/* WHY CHOOSE SECTION */}
        <div className="mt-20 px-6 md:px-16">
          <h2 className="text-2xl font-semibold text-center mb-10">
            Why Choose Medicpadi?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-gray-600 max-w-4xl mx-auto">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-4">
              {FEATURES_LEFT.map((f) => (
                <p key={f} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">✔</span>
                  {f}
                </p>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-4">
              {FEATURES_RIGHT.map((f) => (
                <p key={f} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold mt-0.5">✔</span>
                  {f}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* WAITLIST SECTION */}
        <div className="mt-20 px-6 md:px-16 pb-20">

          <h2 className="text-2xl font-semibold text-center">
            Join the Waitlist
          </h2>

          <p className="text-center text-gray-500 mb-10">
            Be the first to know when we launch
          </p>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex flex-col md:flex-row gap-10">

              {/* LEFT SIDE FORM */}
              <div className="w-full md:w-1/2 flex flex-col gap-4">

                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={update("name")}
                    className={`w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${errors.name ? "border-red-400" : ""}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={update("email")}
                    className={`w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? "border-red-400" : ""}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={update("phone")}
                    className={`w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? "border-red-400" : ""}`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <input
                  type="text"
                  placeholder="Address (Optional)"
                  value={form.address}
                  onChange={update("address")}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <select
                  value={form.state}
                  onChange={update("state")}
                  className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  style={{ color: form.state ? "#1f2937" : "#9ca3af" }}
                >
                  <option value="">Select your current state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>

              </div>

              {/* RIGHT SIDE ROLE */}
              <div className="w-full md:w-1/2">

                <p className="mb-4 font-medium">I am a ...</p>

                <div className="grid grid-cols-2 gap-4">
                  {ROLES.map((item) => (
                    <div
                      key={item}
                      onClick={() => setRole(item)}
                      className={`cursor-pointer border rounded-xl p-6 text-center transition
                        ${role === item
                          ? "border-indigo-600 bg-indigo-50"
                          : "hover:border-indigo-400"
                        }`}
                    >
                      <p className="text-sm font-medium text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>

                {errors.role && <p className="text-red-400 text-xs mt-2">{errors.role}</p>}

                <button
                  onClick={handleSubmit}
                  className="mt-8 w-full bg-indigo-700 text-white py-3 rounded-lg hover:bg-indigo-800 transition font-medium"
                >
                  Join Waitlist
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WaitlistPage;