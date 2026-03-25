import { Route, Routes } from "react-router";
import "./App.css";
import DoctorSignup from "./pages/authentication/doctors/signup";
import DoctorSignin from "./pages/authentication/doctors/signin";
import DoctorForgotPassword from "./pages/authentication/doctors/forgot-password";
import LaboratorySignup from "./pages/authentication/laboratory/signup";
import LaboratorySignin from "./pages/authentication/laboratory/signin";
import LaboratoryForgotPassword from "./pages/authentication/laboratory/forgot-password";
import PharmacySignup from "./pages/authentication/pharmacy/signup";
import PharmacySignin from "./pages/authentication/pharmacy/signin";
import PharmacyForgotPassword from "./pages/authentication/pharmacy/forgot-password";
import LabDashboard from "./pages/dashboard/laboratory/dashboard";
import Home from "./pages/home/home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctor-signup" element={<DoctorSignup />} />
      <Route path="/doctor-signin" element={<DoctorSignin />} />
      <Route
        path="/doctor-forgot-password"
        element={<DoctorForgotPassword />}
      />
      <Route path="/laboratory-signup" element={<LaboratorySignup />} />
      <Route path="/laboratory-signin" element={<LaboratorySignin />} />
      <Route
        path="/laboratory-forgot-password"
        element={<LaboratoryForgotPassword />}
      />
      <Route path="/pharmacy-signup" element={<PharmacySignup />} />
      <Route path="/pharmacy-signin" element={<PharmacySignin />} />
      <Route
        path="/pharmacy-forgot-password"
        element={<PharmacyForgotPassword />}
      />
      <Route path="/labdashboard" element={<LabDashboard />} />
    </Routes>
  );
}

export default App;
