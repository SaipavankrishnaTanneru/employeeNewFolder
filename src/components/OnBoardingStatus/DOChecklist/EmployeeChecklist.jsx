import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./EmployeeChecklist.module.css";
import FooterWidget from 'widgets/ChecklistFooterWidget/Checklistfooter';
import RejectModalWidget from 'widgets/RejectModalWidget/RejectModalWidget';
import DocumentSection from "./DocumentSection";
import PrejoiningSection from "./PrejoiningSection";
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
import rightarrow from 'assets/EmployeeOnBoarding/rightarrow';
import rejecticon from 'assets/EmployeeOnBoarding/rejecticon.svg';
import Approve from 'assets/EmployeeOnBoarding/Approve';

// API Hooks
import { 
  postBackToCampus, 
  postCOUpdateChecklist, 
  postCOReject,
  postForwardToCO 
} from "api/onBoardingForms/postApi/useChecklistQueries"; 

const EmployeeChecklist = ({ role, onBack }) => {
  const { employeeId } = useParams();
  const tempId = employeeId; 
  
  // Salary Data passed from DO Salary Screen
  const location = useLocation();
  const salaryData = location.state?.salaryData || {};

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);

  const isCO = role?.toUpperCase() === "CO";
  
  // Labels logic from your original code
  const forwardLabel = isCO ? "Confirm" : "Forward to Central Office";
  const forwardWidth = isCO ? "143px" : "240px";
  const forwardIcon = isCO ? Approve : rightarrow;

  const toggleChecklistId = (id) => {
    setCheckedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleForwardClick = async () => {
    const idsString = checkedIds.join(","); 

    if (isCO) {
      // CO Logic
      if (!noticePeriod || noticePeriod === "Select Notice Period") {
        alert("Please select a Notice Period");
        return;
      }
      const payload = { tempPayrollId: tempId, checkListIds: idsString, noticePeriod: noticePeriod };
      try { 
        await postCOUpdateChecklist(payload); 
        alert("Checklist Updated Successfully!"); 
      } catch (e) { console.error(e); }

    } else {
      // DO Logic: Combine Salary Data + Checklist
      const payload = {
        ...salaryData,
        tempPayrollId: tempId,
        checkListIds: idsString,
        updatedBy: 0
      };
      try { 
        await postForwardToCO(payload); 
        alert("Forwarded to Central Office Successfully!"); 
      } catch (e) { console.error(e); }
    }
  };

  const handleRejectSubmit = async (reason) => {
    if (isCO) {
      try { 
        await postCOReject({ tempPayrollId: tempId, remarks: reason }); 
        alert("Sent back to DO!"); 
        setShowRejectModal(false); 
      } catch (e) { console.error(e); }
    } else {
      try { 
        await postBackToCampus({ 
            tempPayrollId: tempId, 
            remarks: reason,
            checkListIds: checkedIds.join(",") 
        }); 
        alert("Sent back to Campus!"); 
        setShowRejectModal(false); 
      } catch (e) { console.error(e); }
    }
  };

  const rejectTitle = isCO ? "Back To DO?" : "Back To Campus";
  const rejectSubtitle = isCO ? "Enter reason to send back to DO" : "Enter reason to send back to campus";
  const rejectPlaceholder = "Enter Remarks";
  const rejectSubmitLabel = isCO ? "Back to DO" : "Back to Campus";

  return (
    <div className={styles.container}>
      <div>
        {/* DocumentSection must be the one from Turn 15 that accepts checkedIds */}
        <DocumentSection checkedIds={checkedIds} onToggle={toggleChecklistId} />
        
        <PrejoiningSection
          role={role}
          noticePeriod={noticePeriod}
          setNoticePeriod={setNoticePeriod}
          checkedIds={checkedIds}
          onToggle={toggleChecklistId}
        />

        <FooterWidget
          backLabel="Back"
          forwardLabel={forwardLabel}
          rejectLabel="Reject"
          backIcon={leftarrow}
          forwardIcon={forwardIcon}
          rejectIcon={rejecticon}
          backWidth="110px"
          forwardWidth={forwardWidth}
          onBack={onBack}
          onForward={handleForwardClick}
          onReject={() => setShowRejectModal(true)}
        />

        <RejectModalWidget
          open={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title={rejectTitle}
          subtitle={rejectSubtitle}
          label="Enter Remarks"
          placeholder={rejectPlaceholder}
          cancelLabel="Cancel"
          submitLabel={rejectSubmitLabel}
          onSubmit={handleRejectSubmit}
        />
      </div>
    </div>
  );
};

export default EmployeeChecklist;