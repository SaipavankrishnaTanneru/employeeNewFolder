import React, { useState } from "react";
import EditPopup from "widgets/Popup/EditPopup";
import SalaryInfoUpdate from "../CoDoUpdatePopup/SalaryInfoUpdate";
import BankInfoWidget from "widgets/InfoCard/BankInfoWidget";
import styles from "./SalaryInfo.module.css";

const SalaryInfoReadOnly = () => {

  const [showEdit, setShowEdit] = useState(false);

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

  const salaryInfoRead = [
    { label: "Monthly CTC", value: "90,000" },
    { label: "CTC in Words", value: "Ninety Thousand Rupees Only" },
    { label: "Yearly CTC", value: "9 LPA" },
    { label: "Structure", value: "Name" },
    { label: "Grade", value: "A" },
    { label: "Company Address Line 1", value: "Hyderabad" },
    { label: "Company Address Line 2", value: "Telangana" },
    { label: "Nature Of Duties", value: "Duty 1" },
  ];

  const pfInfoRead = [
    { label: "PF Number", value: "UAN 28e67826752" },
    { label: "ESI Number", value: "8765467890765" },
    { label: "PF Join Date", value: "17-05-2017" },
    { label: "UAN Number", value: "UAN b7265265" },
  ];

  return (
    <div className={styles.salary_Info_Container}>
      <div className={styles.widgetWrapper}>
        <BankInfoWidget
  title="Salary Info"
  data={salaryInfoRead}
  onEdit={() => setShowEdit(true)}
/>
<EditPopup
  isOpen={showEdit}
  title="Edit Salary Information"
  onClose={() => setShowEdit(false)}
  onSave={() => {
    console.log("Save Salary Info");
    setShowEdit(false);
  }}
>
  <SalaryInfoUpdate />
</EditPopup>


        <div className={styles.pfWidgetWrapper}>
          <BankInfoWidget
            title="PF Info"
            data={pfInfoRead}
          />

          {/* Chips */}
          <div className={styles.pfChips}>
  <span className={styles.pfChip}>
    <PfIcon />
    Included in PF Scheme
  </span>

  <span className={styles.esiChip}>
    <EsiIcon />
    Included in ESI Scheme
  </span>
</div>

        </div>
      </div>
    </div>
  );
};

export default SalaryInfoReadOnly;
