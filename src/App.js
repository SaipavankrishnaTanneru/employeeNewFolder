import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// --- 🔒 Security Files ---
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./useAuth";

// --- 🧩 Layout Components ---
import Header from "../src/components/HeaderComponents/Header";
import SideBarContainer from "../src/containers/SideBar-container/SideBarContainer";

// --- 🟦 Employee Onboarding Pages & Containers ---

import NewEmployeeOnboarding from "../src/containers/EmployeeFormsConatiner/EmployeeFormsContainer";
import EmployeeModuleContainer from "../src/containers/EmployeeModuleConatiner/EmployeeModuleConatianer";
import EmployeeOnBoardingContainer from "../src/containers/EmployeeOnBoarding-container/EmployeeOnBoardingContainer";
import EmployeeOverviewHRContainer from "../src/containers/EmployeeOverviewContainer/EmployeeModuleConatianer";
import EmployeeLanding from "../src/components/EmployeeLandingPage/EmployeeLanding";


// 🆕 IMPORT THE SKILL TEST FORM PAGE
import OnboardNewEmployeePage from "../src/components/EmployeeOnBoardingForms/OnboardNewEmployeePage/OnboardNewEmployeePage";

// --- 📦 Placeholder / Sample Pages ---
const Dashboard = () => <div>Dashboard</div>;
const Students = () => <div>Students</div>;
const Application = () => <div>Application</div>;
const Fleet = () => <div>Fleet</div>;
const Warehouse = () => <div>Warehouse</div>;
const Sms = () => <div>SMS</div>;
const QuestionBank = () => <div>Question Bank</div>;
const AssetsManagement = () => <div>Assets Management</div>;
const PaymentsService = () => <div>Payment Services</div>;
const Cctv = () => <div>CCTV</div>;
const Hrms = () => <div>HRMS</div>;
const Masters = () => <div>Masters</div>;

// --- 🧭 Auth Pages ---
const LoginPage = () => <div>Login Page</div>;
const AccessDeniedPage = () => <div>Access Denied</div>;

const queryClient = new QueryClient();

function AppWrapper() {
  const { user } = useAuth();

  return (
    <div className="whole_container">
      {user && <Header />}
      {user && (
        <aside>
          <SideBarContainer />
        </aside>
      )}

      <main className="main_body">
        <Routes>
          
          {/* --- 🟢 Public Routes --- */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* --- 🔒 Protected Routes (Standard Modules) --- */}
          <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["DO", "CO", "HR"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/application" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Application /></ProtectedRoute>} />
          <Route path="/scopes/students" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Students /></ProtectedRoute>} />
          <Route path="/fleet" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Fleet /></ProtectedRoute>} />
          <Route path="/warehouse" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Warehouse /></ProtectedRoute>} />
          <Route path="/sms" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Sms /></ProtectedRoute>} />
          <Route path="/question-bank" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><QuestionBank /></ProtectedRoute>} />
          <Route path="/assets-management" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><AssetsManagement /></ProtectedRoute>} />
          <Route path="/payments-service" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><PaymentsService /></ProtectedRoute>} />
          <Route path="/cctv" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Cctv /></ProtectedRoute>} />
          <Route path="/hrms" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Hrms /></ProtectedRoute>} />
          <Route path="/masters" element={<ProtectedRoute allowedRoles={["DO", "CO"]}><Masters /></ProtectedRoute>} />
{/* ============================================================ */}
          {/* 🟦 EMPLOYEE MODULE - ROLE BASED ROUTES                        */}
          {/* ============================================================ */}

          {/* 1. LANDING PAGE */}
          <Route path="/scopes/employee" element={<ProtectedRoute allowedRoles={["DO", "CO", "HR", "ADMIN"]}><EmployeeLanding /></ProtectedRoute>} />

          {/* 2. SKILL TEST FORM (TEACH) - Role Based Paths */}
          <Route path="/scopes/employee/do-employee-onboarding/skilltest" element={<ProtectedRoute allowedRoles={["DO"]}><OnboardNewEmployeePage /></ProtectedRoute>} />
          <Route path="/scopes/employee/hr-employee-onboarding/skilltest" element={<ProtectedRoute allowedRoles={["HR"]}><OnboardNewEmployeePage /></ProtectedRoute>} />
          <Route path="/scopes/employee/co-employee-onboarding/skilltest" element={<ProtectedRoute allowedRoles={["CO"]}><OnboardNewEmployeePage /></ProtectedRoute>} />
          <Route path="/scopes/employee/admin-employee-onboarding/skilltest" element={<ProtectedRoute allowedRoles={["ADMIN"]}><OnboardNewEmployeePage /></ProtectedRoute>} />

          {/* 3. NEW EMPLOYEE ONBOARDING FORM (NON-TEACH/SKIP) - Role Based Paths */}
          <Route path="/scopes/employee/do-new-employee-onboarding/*" element={<ProtectedRoute allowedRoles={["DO"]}><NewEmployeeOnboarding /></ProtectedRoute>} />
          <Route path="/scopes/employee/hr-new-employee-onboarding/*" element={<ProtectedRoute allowedRoles={["HR"]}><NewEmployeeOnboarding /></ProtectedRoute>} />
          <Route path="/scopes/employee/co-new-employee-onboarding/*" element={<ProtectedRoute allowedRoles={["CO"]}><NewEmployeeOnboarding /></ProtectedRoute>} />
          <Route path="/scopes/employee/admin-new-employee-onboarding/*" element={<ProtectedRoute allowedRoles={["ADMIN"]}><NewEmployeeOnboarding /></ProtectedRoute>} />

          {/* 4. ONBOARDING STATUS / REVIEW TABLES */}
          <Route path="/scopes/employee/do-review/*" element={<ProtectedRoute allowedRoles={["DO"]}><EmployeeModuleContainer role="DO" /></ProtectedRoute>} />
          <Route path="/scopes/employee/co-review/*" element={<ProtectedRoute allowedRoles={["CO"]}><EmployeeModuleContainer role="CO" /></ProtectedRoute>} />
          <Route path="/scopes/employee/hr-review/*" element={<ProtectedRoute allowedRoles={["HR"]}><EmployeeModuleContainer role="HR" /></ProtectedRoute>} />
          <Route path="/scopes/employee/admin-review/*" element={<ProtectedRoute allowedRoles={["ADMIN"]}><EmployeeModuleContainer role="ADMIN" /></ProtectedRoute>} />

        {/* 6. EMPLOYEE OVERVIEW (Search Result) - ✅ UPDATED ROUTES */}
          {/* Use 'profile-overview' for DO, HR, CO */}
          <Route 
            path="/scopes/employee/profile-overview/:employeeId/*" 
            element={
              <ProtectedRoute allowedRoles={["DO", "HR", "CO"]}>
                <EmployeeOverviewHRContainer />
              </ProtectedRoute>
            } 
          />
          
          {/* Keep 'admin-overview' separate for ADMIN */}
          <Route 
            path="/scopes/employee/admin-overview/:employeeId/*" 
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <EmployeeOverviewHRContainer />
              </ProtectedRoute>
            } 
          />

          {/* 7. GENERIC CATCH-ALL */}
          <Route path="/scopes/employee/*" element={<ProtectedRoute allowedRoles={["DO", "CO", "HR", "ADMIN"]}><EmployeeOnBoardingContainer role="DO" /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  );
}

export default App;