import React, { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom"; 
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "./WorkingInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import WorkinginfoUpdate from "../CoDoUpdatePopup/WorkingInfoUpdate";
import { useWorkingInfo } from "api/do/getpapis/useWorkingInfo"; // Or useEmployeeProfileView if preferred

const WorkingInfoContainer = ({ activeId: propId }) => {
  const { employeeId } = useParams();
  const activeId = propId || employeeId; 

  const [showEdit, setShowEdit] = useState(false);
  const saveRef = useRef(null);

  // 2. Fetch Data (View Mode)
  const { data, isLoading } = useWorkingInfo(activeId);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  const workingInfo = useMemo(() => {
    const safeData = data || {};
    return [
      { label: "Campus", value: safeData.campusName || "N/A" },
      { label: "Campus Code", value: safeData.campusCode || "N/A" },
      { label: "Campus Type", value: safeData.campusType || "N/A" },
      { label: "Location", value: safeData.location || "N/A" },
      { label: "Building", value: safeData.buildingName || "N/A" },
      { label: "Manager", value: safeData.managerName || "N/A" },
      { label: "Working Mode", value: safeData.workingModeType || "N/A" },
      { label: "Joining As", value: safeData.joiningAsType || "N/A" },
      { label: "Replacement Employee", value: safeData.replacementEmployeeName || "N/A" },
      { label: "Mode Of Hiring", value: safeData.modeOfHiringType || "N/A" },
      { label: "Hired By", value: safeData.hiredByName || "N/A" },
      { label: "Joining Date", value: formatDate(safeData.joiningDate) },
    ];
  }, [data]);

  if (isLoading) return <div className={styles.loading}>Loading Working Info...</div>;

  return (
    <div className={styles.working_Info_Container}>
      <div className={styles.widgetWrapper}>
        <BankInfoWidget
          title="Working Information"
          data={workingInfo}
          onEdit={() => setShowEdit(true)}
        />
      </div>
      
      <EditPopup
        isOpen={showEdit}
        title="Edit Working Information"
        onClose={() => setShowEdit(false)}
        onSave={() => {
          if (saveRef.current) saveRef.current(); // Trigger Form Submit
        }}
      >
        <WorkinginfoUpdate 
            activeId={activeId} 
            onSaveRef={saveRef}
            onSuccess={() => setShowEdit(false)}
        />
      </EditPopup>
    </div>
  );
};

export default WorkingInfoContainer;