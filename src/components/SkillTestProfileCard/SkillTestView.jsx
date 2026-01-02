import React from "react";
import { useNavigate } from "react-router-dom";

// --- Components ---
// Adjust these import paths if your folders are named differently
import SkillTestProfileContainer from "../../containers/SkillTestProfileContainer/SkillTestProfileContainer";
import FooterWidget from "widgets/ChecklistFooterWidget/Checklistfooter";

// --- Icons ---
import leftarrow from "assets/EmployeeOnBoarding/leftarrow.svg";
import Approve from "assets/EmployeeOnBoarding/Approve";
import rejecticon from "assets/EmployeeOnBoarding/rejecticon.svg";

const SkillTestView = () => {
  const navigate = useNavigate();

  // 🔴 ROUTING LOGIC: Go back to the 'skillTest' Table
  const handleBackToTable = () => {
     // URL is currently: .../scopes/employee/do-review/101/skill-test
     // We want: .../scopes/employee/do-review/skillTest
     navigate('../../skillTest');
  };

  const handleApprove = () => {
    console.log("Approved");
    handleBackToTable();
  };

  const handleReject = () => {
    console.log("Rejected");
    handleBackToTable();
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Scrollable Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <SkillTestProfileContainer />
      </div>

      {/* Fixed Footer */}
      <FooterWidget
        backLabel="Back"
        forwardLabel="Approve"
        rejectLabel="Reject"

        backIcon={leftarrow}
        forwardIcon={Approve}
        rejectIcon={rejecticon}

        backWidth="120px"
        forwardWidth="141px"

        onBack={handleBackToTable}
        onForward={handleApprove}
        onReject={handleReject}
      />
    </div> 
  );  
};

export default SkillTestView;