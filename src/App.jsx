import { Route, Routes } from "react-router";
import "./App.css";

// Landing page components
import Home from "./pages/HomePage/Home.jsx";

// Doctor authentication pages
import DoctorSignup from "./pages/authentication/doctors/signup";
import DoctorSignin from "./pages/authentication/doctors/signin";
import DoctorForgotPassword from "./pages/authentication/doctors/forgot-password";
import DoctorProfile from "./pages/authentication/doctors/profile";

// Laboratory authentication pages
import LaboratorySignup from "./pages/authentication/laboratory/signup";
import LaboratorySignin from "./pages/authentication/laboratory/signin";
import LaboratoryForgotPassword from "./pages/authentication/laboratory/forgot-password";
import LaboratoryProfile from "./pages/authentication/laboratory/profile";

// Pharmacy authentication pages
import PharmacySignup from "./pages/authentication/pharmacy/signup";
import PharmacySignin from "./pages/authentication/pharmacy/signin";
import PharmacyForgotPassword from "./pages/authentication/pharmacy/forgot-password";
import PharmacyProfile from "./pages/authentication/pharmacy/profile";

// Laboratory dashboard pages
import LabDashboard from "./pages/dashboard/laboratory/dashboard";
import LabPatient from "./pages/dashboard/laboratory/patient";
import LabPlaceholder from "./pages/dashboard/laboratory/placeholder";
import LabProfile from "./pages/dashboard/laboratory/profile";
import LabAppointment from "./pages/dashboard/laboratory/appointment";
import LabReport from "./pages/dashboard/laboratory/report";

// Pharmacy dashboard pages
import PharmDashboard from "./pages/dashboard/pharmacy/dashboard";
import PharmProduct from "./pages/dashboard/pharmacy/product";
import PharmOrder from "./pages/dashboard/pharmacy/order";
import PharmCustomer from "./pages/dashboard/pharmacy/customers";
import PharmPayment from "./pages/dashboard/pharmacy/payments";

import WaitlistPage from "./Pages/WaitlistPage";
import DashboardPage from "./pages/dashboard/doctorsPage/DashboardPage";
import PatientList from "./pages/dashboard/doctorsPage/PatientList";
import PatientDetails from "./pages/dashboard/doctorsPage/PatientDetails";
import Profile from "./pages/dashboard/doctorsPage/Profile";
import AppointmentPage from "./pages/dashboard/doctorsPage/AppointmentPage";
import ReportPage from "./pages/dashboard/doctorsPage/ReportPage";




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
      <Route path="/doctor-profile" element={<DoctorProfile />} />

      <Route path="/laboratory-signup" element={<LaboratorySignup />} />
      <Route path="/laboratory-signin" element={<LaboratorySignin />} />
      <Route
        path="/laboratory-forgot-password"
        element={<LaboratoryForgotPassword />}
      />
      <Route path="/laboratory-profile" element={<LaboratoryProfile />} />

      <Route path="/pharmacy-signup" element={<PharmacySignup />} />
      <Route path="/pharmacy-signin" element={<PharmacySignin />} />
      <Route
        path="/pharmacy-forgot-password"
        element={<PharmacyForgotPassword />}
      />
      <Route path="/pharmacy-profile" element={<PharmacyProfile />} />

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

      <Route path="/pharmdashboard" element={<PharmDashboard />} />
      <Route path="/pharmdashboard/product" element={<PharmProduct />} />
      <Route path="/pharmdashboard/order" element={<PharmOrder />} />
      <Route path="/pharmdashboard/customers" element={<PharmCustomer />} />
      <Route path="/pharmdashboard/payments" element={<PharmPayment />} />


      <Route path="/waitlist" element={<WaitlistPage />} />
      <Route path="/docdashboard" element={<DashboardPage />} />
      <Route path="/docdashboard/patient" element={<PatientList />} />
      <Route path="/docdashboard/patient/:id" element={<PatientDetails />} />
      <Route path="/docdashboard/profile" element={<Profile />} />
      <Route path="/docdashboard/appointments" element={<AppointmentPage />} />
      <Route path="/docdashboard/reports" element={<ReportPage />} />

      
     
    </Routes>
  );
}

export default App;
