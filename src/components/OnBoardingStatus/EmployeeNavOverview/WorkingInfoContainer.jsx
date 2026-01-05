import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import styles from "./WorkingInfoContainer.module.css";
import EditPopup from "widgets/Popup/EditPopup";
import WorkinginfoUpdate from "../CoDoUpdatePopup/WorkingInfoUpdate";
// Import the new hook
import { useWorkingInfo } from "../../../api/do/getpapis/useWorkingInfo";

const WorkingInfoContainer = () => {
  const [showEdit, setShowEdit] = useState(false);

  // 1. Get ID from URL
  const params = useParams();
  const activeId = params.tempId || params.id || params.employeeId;

  // 2. Fetch Data
  const { data, isLoading, isError } = useWorkingInfo(activeId);

  // 3. Helper to format Date (YYYY-MM-DD -> DD-MM-YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-GB").replace(/\//g, "-");
  };

  // 4. Map API Data to Widget Format
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
  if (isError) return <div className={styles.error}>Failed to load data</div>;

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
          console.log("Save Working Info");
          setShowEdit(false);
        }}
      >
        <WorkinginfoUpdate data={data} /> {/* Pass data to update form if needed */}
      </EditPopup>
    </div>
  );
};

export default WorkingInfoContainer;