import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import EditPopup from "widgets/Popup/EditPopup";
import SalaryInfoUpdate from "../CoDoUpdatePopup/SalaryInfoUpdate";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import styles from "./SalaryInfo.module.css";

// Import API Hook
import { useSalaryDetails } from "api/onBoardingForms/postApi/useSalaryQueries";

const SalaryInfoReadOnly = ({ activeId }) => {
  const { employeeId } = useParams();
  const tempId = activeId || employeeId;

  const [showEdit, setShowEdit] = useState(false);

  // 1. Fetch Data
  const { data: savedData, isLoading } = useSalaryDetails(tempId);

  // 2. Map Data
  const { salaryInfo, pfInfo, isPfEligible, isEsiEligible } = useMemo(() => {
    if (!savedData) return { salaryInfo: [], pfInfo: [], isPfEligible: false, isEsiEligible: false };

    const salary = [
      { label: "Monthly CTC", value: savedData.monthlyTakeHome ? String(savedData.monthlyTakeHome) : "N/A" },
      { label: "CTC in Words", value: savedData.ctcWords || "N/A" },
      { label: "Yearly CTC", value: savedData.yearlyCtc ? String(savedData.yearlyCtc) : "N/A" },
      { label: "Structure", value: savedData.empStructureName || savedData.empStructureId || "N/A" }, 
      { label: "Grade", value: savedData.gradeName || savedData.gradeId || "N/A" },
      { label: "Cost Center", value: savedData.costCenterName || savedData.costCenterId || "N/A" },
      { label: "Company Name", value: savedData.orgName || savedData.orgId || "N/A" },
    ];

    const pf = [
      { label: "PF Number", value: savedData.pfNo || "N/A" },
      { label: "ESI Number", value: savedData.esiNo || "N/A" },
      { label: "PF Join Date", value: savedData.pfJoinDate ? new Date(savedData.pfJoinDate).toLocaleDateString() : "N/A" },
      { label: "UAN Number", value: savedData.uanNo || "N/A" },
    ];

    return {
        salaryInfo: salary,
        pfInfo: pf,
        isPfEligible: !!savedData.isPfEligible,
        isEsiEligible: !!savedData.isEsiEligible
    };
  }, [savedData]);

  const PfIcon = () => (
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.68262 1.45996C9.11832 0.973296 9.88071 0.973274 10.3164 1.45996L11.0352 2.26367C11.4052 2.67691 11.9432 2.89973 12.4971 2.86914L13.5732 2.80957C14.2253 2.77352 14.7643 3.31185 14.7285 3.96387L14.6689 5.04102C14.6384 5.59492 14.8611 6.13291 15.2744 6.50293L16.0781 7.22168C16.5646 7.65739 16.5647 8.41981 16.0781 8.85547L15.2744 9.57422C14.8611 9.94429 14.6383 10.4822 14.6689 11.0361L14.7285 12.1123C14.7646 12.7645 14.2255 13.3036 13.5732 13.2676L12.4971 13.208C11.9431 13.1774 11.4052 13.4002 11.0352 13.8135L10.3164 14.6172C9.88074 15.1038 9.11833 15.1037 8.68262 14.6172L7.96387 13.8135C7.59385 13.4001 7.05586 13.1775 6.50195 13.208L5.4248 13.2676C4.77278 13.3033 4.23446 12.7644 4.27051 12.1123L4.33008 11.0361C4.36067 10.4823 4.13784 9.94428 3.72461 9.57422L2.9209 8.85547C2.43421 8.41977 2.43423 7.65739 2.9209 7.22168L3.72461 6.50293C4.13786 6.13291 4.3606 5.59487 4.33008 5.04102L4.27051 3.96387C4.23474 3.312 4.77293 2.7738 5.4248 2.80957L6.50195 2.86914C7.0558 2.89966 7.59385 2.67692 7.96387 2.26367L8.68262 1.45996Z" fill="#C38227" stroke="#C38227" stroke-width="0.730769"/>
      <path d="M6.77505 8.77064L8.12746 9.96713C8.27721 10.0996 8.50563 10.0871 8.64005 9.93911L11.6922 6.57833" stroke="white" stroke-width="1.09615" stroke-linecap="round"/>
    </svg>
  );

  const EsiIcon = () => (
    <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.68262 1.45996C9.11832 0.973296 9.88071 0.973274 10.3164 1.45996L11.0352 2.26367C11.4052 2.67691 11.9432 2.89973 12.4971 2.86914L13.5732 2.80957C14.2253 2.77352 14.7643 3.31185 14.7285 3.96387L14.6689 5.04102C14.6384 5.59492 14.8611 6.13291 15.2744 6.50293L16.0781 7.22168C16.5646 7.65739 16.5647 8.41981 16.0781 8.85547L15.2744 9.57422C14.8611 9.94429 14.6383 10.4822 14.6689 11.0361L14.7285 12.1123C14.7646 12.7645 14.2255 13.3036 13.5732 13.2676L12.4971 13.208C11.9431 13.1774 11.4052 13.4002 11.0352 13.8135L10.3164 14.6172C9.88074 15.1038 9.11833 15.1037 8.68262 14.6172L7.96387 13.8135C7.59385 13.4001 7.05586 13.1775 6.50195 13.208L5.4248 13.2676C4.77278 13.3033 4.23446 12.7644 4.27051 12.1123L4.33008 11.0361C4.36067 10.4823 4.13784 9.94428 3.72461 9.57422L2.9209 8.85547C2.43421 8.41977 2.43423 7.65739 2.9209 7.22168L3.72461 6.50293C4.13786 6.13291 4.3606 5.59487 4.33008 5.04102L4.27051 3.96387C4.23474 3.312 4.77293 2.7738 5.4248 2.80957L6.50195 2.86914C7.0558 2.89966 7.59385 2.67692 7.96387 2.26367L8.68262 1.45996Z" fill="#273CC3" stroke="#273CC3" stroke-width="0.730769"/>
      <path d="M6.77505 8.77064L8.12746 9.96713C8.27721 10.0996 8.50563 10.0871 8.64005 9.93911L11.6922 6.57833" stroke="white" stroke-width="1.09615" stroke-linecap="round"/>
    </svg>
  );

  if (isLoading) return <div>Loading Salary Info...</div>;

  return (
    <div className={styles.salary_Info_Container}>
      <div className={styles.widgetWrapper}>
        <BankInfoWidget
          title="Salary Info"
          data={salaryInfo}
          onEdit={() => setShowEdit(true)}
        />
        <EditPopup
          isOpen={showEdit}
          title="Edit Salary Information"
          onClose={() => setShowEdit(false)}
          onSave={() => setShowEdit(false)}
        >
          <SalaryInfoUpdate tempId={tempId} onSuccess={() => setShowEdit(false)} />
        </EditPopup>

        <div className={styles.pfWidgetWrapper}>
          <BankInfoWidget
            title="PF Info"
            data={pfInfo}
          />

          <div className={styles.pfChips}>
            {isPfEligible && (
              <span className={styles.pfChip}>
                <PfIcon />
                Included in PF Scheme
              </span>
            )}

            {isEsiEligible && (
              <span className={styles.esiChip}>
                <EsiIcon />
                Included in ESI Scheme
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfoReadOnly;