import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabaseClient";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDoctors from "./pages/admin/Doctors";
import AdminPatients from "./pages/admin/Patients";
import AdminAppointments from "./pages/admin/Appointments";
import AdminStaff from "./pages/admin/Staff";
import AdminSettings from "./pages/admin/Settings";
import DoctorDashboard from "./pages/doctor/Dashboard";
import DoctorAppointments from "./pages/doctor/Appointments";
import DoctorPrescriptions from "./pages/doctor/Prescriptions";
import DoctorSettings from "./pages/doctor/Settings";
import PatientDashboard from "./pages/patient/Dashboard";
import BookAppointment from "./pages/patient/BookAppointment";
import MyAppointments from "./pages/patient/MyAppointments";
import Bills from "./pages/patient/Bills";
import DashboardLayout from "./layouts/DashboardLayout";
import Services from "./pages/services/Services";
import ServiceDetails from "./pages/services/ServiceDetails";
import Pharmacy from "./pages/services/Pharmacy";
import AccidentTrauma from "./pages/services/AccidentTrauma";
import AmbulanceServices from "./pages/services/AmbulanceServices";
import Radiology from "./pages/services/Radiology";
import ClinicalLaboratory from "./pages/services/ClinicalLaboratory";
import InsuranceEmpanelment from "./pages/services/InsuranceEmpanelment";
import GeneralMedicine from "./pages/services/GeneralMedicine";
import Cardiology from "./pages/services/Cardiology";
import Orthopedics from "./pages/services/Orthopedics";
import Pediatrics from "./pages/services/Pediatrics";
import Gynecology from "./pages/services/Gynecology";
import Neurology from "./pages/services/Neurology";
import LaboratoryServices from "./pages/services/LaboratoryServices";
import EmergencyServices from "./pages/services/EmergencyServices";
import DoctorProfile from "./pages/services/DoctorProfile";
import PhotoGallery from "./pages/PhotoGallery";
import SpecialityPage from "./pages/specialities/SpecialityPage";
import VisionMission from "./pages/quicklinks/VisionMission";
import Blog from "./pages/quicklinks/Blog";
import VideoGallery from "./pages/quicklinks/VideoGallery";
import Career from "./pages/quicklinks/Career";
import AboutUs from "./pages/quicklinks/AboutUs";
import StaffLayout from "./pages/staff/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffDutySchedule from "./pages/staff/StaffDutySchedule";
import StaffPatients from "./pages/staff/StaffPatients";
import StaffDoctorAssignment from "./pages/staff/StaffDoctorAssignment";
import StaffReports from "./pages/staff/StaffReports";
import StaffMessages from "./pages/staff/StaffMessages";
import StaffProfile from "./pages/staff/StaffProfile";
import GeminiChatIcon from "./components/GeminiChatIcon";
import GeminiChatPanel from "./components/GeminiChatPanel";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";
import ScrollToTop from "./components/ScrollToTop";
import DarkModeToggle from "./components/DarkModeToggle";
import "./App.css";

const RequireRole = ({ role, children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const verifyRole = async () => {
      const { data: authData } = await supabase.auth.getUser();
      const user = authData?.user;

      if (!user) {
        if (isMounted) setAuthorized(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id, role, name, email")
        .eq("id", user.id)
        .single();

      if (error || !profile || profile.role !== role) {
        if (isMounted) setAuthorized(false);
        return;
      }

      localStorage.setItem("hmsRole", profile.role);
      localStorage.setItem("hmsProfile", JSON.stringify(profile));
      if (isMounted) setAuthorized(true);
    };

    verifyRole();
    return () => {
      isMounted = false;
    };
  }, [role]);

  if (authorized === null) {
    return null;
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:serviceName" element={<ServiceDetails />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/accident-trauma-emergency" element={<AccidentTrauma />} />
        <Route path="/services/ambulance-services" element={<AmbulanceServices />} />
        <Route path="/services/radiology" element={<Radiology />} />
        <Route path="/services/clinical-laboratory" element={<ClinicalLaboratory />} />
        <Route path="/services/insurance-empanelment" element={<InsuranceEmpanelment />} />
        <Route path="/services/general-medicine" element={<GeneralMedicine />} />
        <Route path="/services/cardiology" element={<Cardiology />} />
        <Route path="/services/orthopedics" element={<Orthopedics />} />
        <Route path="/services/pediatrics" element={<Pediatrics />} />
        <Route path="/services/gynecology" element={<Gynecology />} />
        <Route path="/services/neurology" element={<Neurology />} />
        <Route path="/services/laboratory-services" element={<LaboratoryServices />} />
        <Route path="/services/emergency-services" element={<EmergencyServices />} />
        <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
        <Route path="/photo-gallery" element={<PhotoGallery />} />
        <Route path="/speciality/:slug" element={<SpecialityPage />} />
        <Route path="/vision-mission" element={<VisionMission />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/video-gallery" element={<VideoGallery />} />
        <Route path="/career" element={<Career />} />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" />
            </RequireRole>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="staff" element={<AdminStaff />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route
          path="/doctor"
          element={
            <RequireRole role="doctor">
              <DashboardLayout role="doctor" />
            </RequireRole>
          }
        >
          <Route index element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="prescriptions" element={<DoctorPrescriptions />} />
          <Route path="settings" element={<DoctorSettings />} />
        </Route>

        <Route
          path="/patient"
          element={
            <RequireRole role="patient">
              <DashboardLayout role="patient" />
            </RequireRole>
          }
        >
          <Route index element={<PatientDashboard />} />
          <Route path="book" element={<BookAppointment />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="bills" element={<Bills />} />
        </Route>

        <Route
          path="/staff"
          element={
            <RequireRole role="staff">
              <StaffLayout />
            </RequireRole>
          }
        >
          <Route index element={<StaffDashboard />} />
          <Route path="duty-schedule" element={<StaffDutySchedule />} />
          <Route path="patients" element={<StaffPatients />} />
          <Route path="doctor-assignment" element={<StaffDoctorAssignment />} />
          <Route path="reports" element={<StaffReports />} />
          <Route path="messages" element={<StaffMessages />} />
          <Route path="profile" element={<StaffProfile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Footer */}
      <Footer onContactOpen={() => setContactOpen(true)} />

      {/* Contact Modal (shared across all pages via footer) */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Gemini AI Chat Assistant */}
      <GeminiChatIcon onClick={() => setChatOpen(true)} />
      <GeminiChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Dark Mode Toggle – bottom left */}
      <DarkModeToggle />
    </BrowserRouter>
  );
}

export default App;
