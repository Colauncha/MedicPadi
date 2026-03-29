
// import React from "react";
// import SplashScreen from "./Components/splashScreen";
// import WaitlistPage from "./Pages/WaitlistPage";

// function App() {
//   return (
//     <>
//       <SplashScreen />
//       <WaitlistPage />
//     </>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import WaitlistPage from "./Pages/WaitlistPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />`
      <Route path="/waitlist" element={<WaitlistPage />} />
    </Routes>
  );
}

export default App;