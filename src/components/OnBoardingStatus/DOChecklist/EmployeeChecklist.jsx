import React, { useState } from "react";
import styles from "./EmployeeChecklist.module.css";
import FooterWidget from 'widgets/ChecklistFooterWidget/Checklistfooter';
import RejectModalWidget from 'widgets/RejectModalWidget/RejectModalWidget';
import DocumentSection from "./DocumentSection";
import PrejoiningSection from "./PrejoiningSection";
import leftarrow from 'assets/EmployeeOnBoarding/leftarrow';
import rightarrow from 'assets/EmployeeOnBoarding/rightarrow';
import rejecticon from 'assets/EmployeeOnBoarding/rejecticon.svg';
import Approve from 'assets/EmployeeOnBoarding/Approve';

const EmployeeChecklist = ({ role, onBack }) => {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [noticePeriod, setNoticePeriod] = useState("");

  const isCO = role?.toUpperCase() === "CO";
  const forwardLabel = isCO ? "Confirm" : "Forward to Central Office";
  const forwardWidth = isCO ? "143px" : "240px";
  const forwardIcon = isCO ? Approve : rightarrow;

  const handleForwardClick = () => {
    if (isCO) {
      console.log("CO Confirmed. Notice Period:", noticePeriod);
    } else { 
      console.log("DO Forwarded to Central Office");
    }
  };

  const rejectTitle = isCO ? "Back To DO?" : "Back To Campus";
  const rejectSubtitle = isCO
    ? "Enter the reason why to send back to DO"
    : "Enter the reason why to send back to campus";
  const rejectPlaceholder = isCO
    ? "Enter the reason to send back to DO"
    : "Enter the reason to send back to campus";
  const rejectSubmitLabel = isCO ? "Back to DO" : "Back to Campus";

  return (
    <div className={styles.container}>
      <div>
        <DocumentSection />
        <PrejoiningSection
          role={role}
          noticePeriod={noticePeriod}
          setNoticePeriod={setNoticePeriod}
        />

        {/* <FooterWidget
          backLabel="Back"
          forwardLabel={forwardLabel}
          rejectLabel="Reject"
          backIcon={leftarrow}
          forwardIcon={rightarrow}
          rejectIcon={rejecticon}
          onBack={onBack}
          onForward={handleForwardClick}
          onReject={() => setShowRejectModal(true)}
        /> */}

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
          onSubmit={(reason) => console.log("Reason:", reason)}
        />
      </div>
    </div>
  );
};

export default EmployeeChecklist;
