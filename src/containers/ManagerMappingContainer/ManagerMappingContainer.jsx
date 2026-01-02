// containers/EmployeeOnBoarding-container/EmployeeOnBoardingContainer.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate, Outlet } from "react-router-dom";

import EmployeeManagement from "../../components/EmployeeManagement/EmployeeManagement";
import MappingLandingPage from "../../components/EmployeeLandingPage/EmployeeLanding";

import EmployeeSearchResults from "../../components/ManagerMapping/EmployeeSearchResults";
import EmployeeModuleHeader from "../../components/ManagerMapping/ManagerMappingHeaderContainer";
import MappingMode from "../../components/ManagerMapping/MappingMode";

import styles from "./ManagerMappingContainer.module.css";
import topleftarrow from 'assets/managermappingsearch/topleftarrow.svg';

// ⭐ Layout showing header + back button
const EmployeeLayout = ({ searchTerm, onSearchChange, selectedEmployees, setSelectedEmployees }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  // Header titles
  let title = "Employee Module";
  let subtitle = "Access and manage comprehensive student details seamlessly.";

  if (pathname === "/scopes/employee/employeeManager/manage") {
    title = "Employee Management";
    subtitle = "Search here to Map/Re-Map or Un-Map employees from location, campus etc.";
  } else if (pathname === "/scopes/employee/employeeManager/search-results") {
    title = "Employee Management";
    subtitle = "Access and manage comprehensive student details seamlessly.";
  }

  const showBackButton =
    pathname === "/scopes/employee/employeeManager/manage" ||
    pathname === "/scopes/employee/employeeManager/search-results";

  return (
    <div className={`${styles.layout} ${showBackButton ? styles.withBackButton : ""}`}>
      
      {showBackButton && (
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <img src={topleftarrow} alt="Back Arrow" className={styles.backArrowImg} />
        </button>
      )}

      <EmployeeModuleHeader
        title={title}
        subtitle={subtitle}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />

      <Outlet context={{ selectedEmployees, setSelectedEmployees }} />
    </div>
  );
};

const ManagerMappingContainer = () => {
  const [sharedSearchTerm, setSharedSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  return (
    <Routes>
      {/* PAGES WITH HEADER */}
      <Route
        path="/"
        element={
          <EmployeeLayout
            searchTerm={sharedSearchTerm}
            onSearchChange={setSharedSearchTerm}
            selectedEmployees={selectedEmployees}
            setSelectedEmployees={setSelectedEmployees}
          />
        }
      >
        <Route index element={<MappingLandingPage />} />

        <Route path="manage" element={<EmployeeManagement />} />

        <Route
          path="search-results"
          element={
            <EmployeeSearchResults
              selectedEmployees={selectedEmployees}
              setSelectedEmployees={setSelectedEmployees}
            />
          }
        />
      </Route>

      {/* FULL PAGE — NO HEADER */}
      <Route
        path="mapping-mode"
        element={<MappingMode selectedEmployees={selectedEmployees} />}
      />
    </Routes>
  );
};

export default ManagerMappingContainer;
