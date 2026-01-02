import React, { useMemo } from "react";
import { Routes, Route, useLocation, Navigate, useParams } from "react-router-dom";
import GenericNavTabs from "widgets/NavTabs/GenericNavTabs";
import Styles from "./EmployeeNavtabs.module.css";

// Content Components
import EmployeModule from "../EmployeeModule/EmployeeModule";
import FamilyInfo from "../../../containers/FamilyAddressInfoMainContainer/FAmilyAddressInfoContainer";
import EmployeeQualificationDetailsContainer from "../../../containers/EmployeeQualificationDetails/EmployeeQualificationDetailsContainer";
import EmployeeDocumentsContainer from "../../../components/EmployeeOverViewScreens/EmpDocuments/EmpDocuments";
import BankDetailsContainer from "../../../containers/BankDetailsContainer/BankDetailsConatiner";
import AgreementsDetails from "../../../containers/AgreementsConatiner/AgreementsDetailsContainer";
import SalaryDetailsContainer from "containers/SalaryDetailsContainer/SalaryDetailsContainer";

const EmployeeNavtabs = () => {
  const location = useLocation();
  const { employeeId } = useParams(); 

  // 🛠️ CRITICAL FIX: Construct Absolute Path
  // Instead of splitting the potentially broken URL, we build a clean one.
  const basePath = useMemo(() => {
    if (!employeeId) return "";

    // Check which module we are in (Admin vs Standard Profile)
    const segment = location.pathname.includes("admin-overview") 
      ? "admin-overview" 
      : "profile-overview";

    // Return the clean, absolute root path for this employee
    return `/scopes/employee/${segment}/${employeeId}`;
  }, [employeeId, location.pathname]);

  // 2. Tabs Config - Uses the clean 'basePath'
  const tabs = useMemo(() => [
    { id: 1, label: "Basic Info", path: `${basePath}/basic-info` },
    { id: 2, label: "Family & Address Info", path: `${basePath}/family-info` },
    { id: 3, label: "Qualification Details", path: `${basePath}/qualificationDetails` },
    { id: 4, label: "Documents", path: `${basePath}/documents` },
    { id: 5, label: "Bank Details", path: `${basePath}/bank-details` },
    { id: 6, label: "Agreements", path: `${basePath}/agreements` },
    { id: 7, label: "Salary Info", path: `${basePath}/salary-info` },
  ], [basePath]);

  return (
    <div className={Styles.container}>
      {/* Ensure GenericNavTabs uses 'navigate(tab.path)' 
         or <Link to={tab.path}> internally 
      */}
      <GenericNavTabs tabs={tabs} />

      <div className={Styles.tabContent}>
        <Routes>
          {/* Redirect root to basic-info */}
          <Route path="/" element={<Navigate to="basic-info" replace />} />
          
          <Route path="basic-info" element={<EmployeModule />} />
          <Route path="family-info" element={<FamilyInfo />} />
          <Route path="qualificationDetails/*" element={<EmployeeQualificationDetailsContainer />} />
          <Route path="documents/*" element={<EmployeeDocumentsContainer />} />
          <Route path="agreements" element={<AgreementsDetails />} />
          <Route path="bank-details" element={<BankDetailsContainer/>} />
          <Route path="salary-info" element={<SalaryDetailsContainer/>} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeNavtabs;