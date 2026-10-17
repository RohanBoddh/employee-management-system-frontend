import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Employees from "./Pages/Employees";
import AddEmployee from "./Pages/AddEmployee";
import EditEmployees from "./Pages/EditEmployees";
import HRAttendanceDashboard from "./Pages/HRAttendanceDashboard";
import PresentEmployees from "./Pages/PresentEmployees";
import AbsentEmployees from "./Pages/AbsentEmployees";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import EmailSent from "./Pages/EmailSent";
import ResetPassword from "./Pages/ResetPassword";

import PrivateRoute from "./Routers/PrivateRoute";
import HelpCenter from "./Pages/HelpCenter";
import Reports from "./Pages/Reports";
import HREmployees from "./Pages/HREmployees";


function App() {
  const location = useLocation();
  const showFooter =
    location.pathname === "/" || location.pathname === "/Home";

  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-sent" element={<EmailSent />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/reports" element={<Reports />} />

        {/* 🔒 COMMON PROTECTED ROUTES */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🧑‍💼 HR ONLY ROUTES */}
        <Route
          path="/employees"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route
          path="/Employees"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <Employees />
            </PrivateRoute>
          }
        />

        <Route
          path="/AddEmployee"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <AddEmployee />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-employee/:id"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <EditEmployees />
            </PrivateRoute>
          }
        />

        <Route
          path="/hr-attendance-dashboard"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <HRAttendanceDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ HR HEADCOUNT DETAILS */}
        <Route
          path="/hr/headcount"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <HREmployees />
            </PrivateRoute>
          }
        />
        <Route
          path="/hr/employees"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <HREmployees />
            </PrivateRoute>
          }
        />

        {/* ✅ HR PRESENT / ABSENT EMPLOYEES */}
        <Route
          path="/hr/present"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <PresentEmployees />
            </PrivateRoute>
          }
        />

        <Route
          path="/hr/absent"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <AbsentEmployees />
            </PrivateRoute>
          }
        />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

export default App;
