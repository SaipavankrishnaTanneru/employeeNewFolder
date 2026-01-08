import React from "react";
import { Routes, Route, useNavigate, useParams, Outlet, Navigate, useLocation } from "react-router-dom";

// --- 🧩 Components ---
import EmployeeOnboardingHeader from "../../components/EmployeeModuleHeaderComponent/EmployeeOnboardingHeader";
import OnBoardingEmployeeNav from "../../components/OnBoardingStatus/OnBoardingEmployeeNav/OnBoardingEmployeeNav";
import AddSalaryDetails from "../../components/OnBoardingStatus/EmployeeNavOverview/AddSalaryDetails";
import EmployeeChecklist from "../../components/OnBoardingStatus/DOChecklist/EmployeeChecklist";
import EmployeeProfileContainer from "../EmployeeProfileContainer/EmployeeProfileConytainer";
import OnBoardingStatusLayout from "../../components/OnBoardingStatus/EmployeeonBoardingTable/OnBoardingStatusLayout";
import SkillTestApprovalHeader from "../../components/SkillTestProfileCard/SkillTestApprovalHeader";
import SkillTestView from "../../components/SkillTestProfileCard/SkillTestView";

import Styles from "./EmployeeModuleConatiner.module.css";

// ============================================================================
// 1. DETAIL LAYOUT WRAPPER
// ============================================================================
const EmployeeDetailLayout = ({ role }) => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const location = useLocation();

  const isSkillTest = location.pathname.includes("skill-test");
  const isChecklist = location.pathname.includes("checklist");
  const isAddSalaryPage = location.pathname.endsWith("/salary"); 

  const isOnboarding = location.pathname.includes("onboarding") && !isAddSalaryPage && !isChecklist;

  const getStep = () => {
    if (isSkillTest) return 0;
    if (isOnboarding) return 1; 
    if (isAddSalaryPage) return 2;
    if (isChecklist) return role === "DO" ? 3 : 2;
    return 0;
  };

  const getSubHeading = () => {
    if (isSkillTest) return "Skill Test Approval";
    if (isAddSalaryPage) return "Add Salary Details"; 
    if (isChecklist) return "CheckList";
    return "Employee Preview"; 
  };

  const getBaseScopeUrl = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    if (role === "ADMIN") return "/scopes/employee/admin-review";
    return "/scopes/employee/do-review";
  };

  const handleBack = () => {
    const baseUrl = getBaseScopeUrl();
    if (isAddSalaryPage || isChecklist) {
      navigate(`${baseUrl}/${employeeId}/onboarding/working-info`);
    } else {
      navigate(`${baseUrl}/onboarding`);
    }
  };

  return (
    <div className={Styles.widthpp}>
      <div className={Styles.moduleWrapper}>
        {isSkillTest ? (
          <SkillTestApprovalHeader 
             onBack={() => navigate(`${getBaseScopeUrl()}/skillTest`)} 
          />
        ) : (
          <EmployeeOnboardingHeader
            step={getStep()}
            totalSteps={role === "DO" ? 3 : 2}
            subHeading={getSubHeading()}
            onBack={handleBack}
          />
        )}
        <div className={Styles.mainContainer}>
          {!isSkillTest && <EmployeeProfileContainer employeeId={employeeId} />}
          <div className={Styles.navSection}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. MAIN CONTAINER (Updated Routing Logic)
// ============================================================================
const EmployeeModuleContainer = ({ role }) => {
  const navigate = useNavigate();

  const getBasePath = () => {
    if (role === "HR") return "/scopes/employee/hr-review";
    if (role === "CO") return "/scopes/employee/co-review";
    if (role === "ADMIN") return "/scopes/employee/admin-review";
    return "/scopes/employee/do-review";
  };

  const handleEmployeeSelect = (employee) => {
    const empId = employee.tempPayroll || employee.id || employee._id;
    
    if (!empId) {
      console.error("Employee Temp ID missing:", employee);
      return;
    }

    const status = (employee.status || "").toLowerCase().trim();
    const basePath = getBasePath();
    const rolePrefix = role ? role.toLowerCase() : 'do';

    // 1. Skill Test Handling
    if (status.includes("skill test") || employee.skillTest === true) {
      navigate(`${basePath}/${empId}/skill-test`);
      return;
    }

    // 2. "Incomplete" -> Go to FORM WIZARD (Edit Mode)
    if (status === "incompleted" || status === "incomplete") {
        navigate(`/scopes/employee/${rolePrefix}-new-employee-onboarding/basic-info`, { 
            state: { 
                tempId: empId, 
                isEditMode: true 
            } 
        });
        return;
    }

    // 3. "Pending" -> Go to REVIEW SCREENS
    if (status.includes("pending") || status.includes("pending at do") || status.includes("pending at co")) {
        navigate(`${basePath}/${empId}/onboarding/working-info`);
        return;
    }

    // Default Fallback
    navigate(`${basePath}/${empId}/onboarding/working-info`);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="onboarding" replace />} />

      <Route 
        path="onboarding" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />
      <Route 
        path="skillTest" 
        element={<div className={Styles.widthpptable}><OnBoardingStatusLayout role={role} onEmployeeSelect={handleEmployeeSelect} /></div>} 
      />

      <Route path=":employeeId" element={<EmployeeDetailLayout role={role} />}>
        <Route index element={<Navigate to="onboarding/working-info" replace />} />

        {/* ⚠️ SPECIFIC ROUTES FIRST */}
        
        {/* 1. Salary (DO Only - Standalone Step) */}
        <Route 
          path="onboarding/salary" 
          // 🔴 UPDATED: Passing 'role' prop to WrapperSalary
          element={<WrapperSalary role={role} />} 
        />

        {/* 2. Checklist */}
        <Route 
          path="onboarding/checklist" 
          element={<EmployeeChecklist role={role} onBack={() => navigate(-1)}/>} 
        />

        {/* 3. Onboarding Flow */}
        <Route 
          path="onboarding/:stepId" 
          element={<WrapperOnboarding role={role} />} 
        />

        {/* 4. Skill Test View */}
        <Route 
           path="skill-test" 
           element={<SkillTestView />} 
        />
      </Route>
    </Routes>
  );
};

// ============================================================================
// 3. HELPER WRAPPERS
// ============================================================================

const WrapperOnboarding = ({ role }) => {
  const navigate = useNavigate();
  return (
    <OnBoardingEmployeeNav
      role={role}
      onFinish={() => role === 'DO' ? navigate("../onboarding/salary") : navigate("../onboarding/checklist")}
    />
  );
};

// 🔴 UPDATED: Accepts 'role' prop
const WrapperSalary = ({ role }) => {
  const navigate = useNavigate();
  return (
    <AddSalaryDetails
      role={role} // <-- Pass role to AddSalaryDetails
      onBack={() => navigate("../onboarding/account-info")} 
      
      // 🚀 Receive data from Salary Form (for DO) and pass to Checklist via state
      onSubmitComplete={(salaryData) => {
          console.log("Navigating to Checklist with data:", salaryData);
          // Only pass state if data exists (DO flow)
          navigate("../onboarding/checklist", { state: { salaryData } });
      }}    
    />
  );
};

export default EmployeeModuleContainer;