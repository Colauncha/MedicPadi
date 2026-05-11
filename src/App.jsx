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
import LabPatient from "./pages/dashboard/laboratory/patient";
import Home from "./pages/home/home";
import LabPlaceholder from "./pages/dashboard/laboratory/placeholder";
import LabProfile from "./pages/dashboard/laboratory/profile";
import LabAppointment from "./pages/dashboard/laboratory/appointment";
import LabReport from "./pages/dashboard/laboratory/report";
import LaboratoryProfile from "./pages/authentication/laboratory/profile";
import DoctorProfile from "./pages/authentication/doctors/profile";

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
      <Route path="/labdashboard/patient" element={<LabPatient />} />
      <Route path="/labdashboard/profile" element={<LabProfile />} />
      <Route path="/labdashboard/appointments" element={<LabAppointment />} />
      <Route path="/labdashboard/reports" element={<LabReport />} />
      <Route
        path="/labdashboard/policy"
        element={<LabPlaceholder title="Policy" />}
      />
      <Route
        path="/labdashboard/help"
        element={<LabPlaceholder title="Help Center" />}
      />
      <Route
        path="/labdashboard/settings"
        element={<LabPlaceholder title="Settings" />}
      />
      <Route path="/laboratory-profile" element={<LaboratoryProfile />} />
      <Route path="/doctor-profile" element={<DoctorProfile />} />
    </Routes>
  );
}

export default App;
