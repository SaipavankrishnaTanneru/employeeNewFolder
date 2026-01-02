import React, { useState } from "react";
import EditPopup from "widgets/Popup/EditPopup";
// We are still using the same shared CSS module
import styles from "../EmployeeNavOverview/QualificationInfoContainer.module.css"; 
import BankInfoWidget from 'widgets/InfoCard/BankInfoWidget';
import DocumentsWidget from "widgets/InfoCard/DocumentsWidget";
import QualificationUpdate from "../CoDoUpdatePopup/QualificationUpdate";

// --- New Certificate Icons ---

// This is a generic file/document icon (to replace the Adobe logo)
const IconFile = () => (
 <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.89479 5.14095C6.65579 5.21895 6.50279 5.37695 6.45879 5.55195C6.36879 5.90395 6.45879 6.28195 6.71179 6.75495C6.83779 6.98895 6.99179 7.22595 7.16179 7.47995L7.25379 7.61695L7.39879 7.83195L7.41779 7.76395L7.50379 7.45795C7.60246 7.12262 7.67913 6.78262 7.73379 6.43795C7.82279 5.79595 7.72279 5.41995 7.42479 5.17795C7.34479 5.11295 7.14679 5.05895 6.89479 5.14095ZM6.94979 9.29295L6.67979 8.93095L6.64779 8.88295C6.53279 8.69295 6.40479 8.50295 6.26579 8.29795L6.16579 8.14895C5.98179 7.88143 5.81092 7.6051 5.65379 7.32095C5.34379 6.74295 5.09579 6.03495 5.29579 5.25395C5.46579 4.58995 5.99379 4.17295 6.52279 3.99995C7.03979 3.83195 7.69679 3.85295 8.18279 4.24695C8.97479 4.89095 9.03079 5.81995 8.92179 6.60395C8.86107 7.00067 8.77387 7.39288 8.66079 7.77795L8.56479 8.11795C8.49013 8.37262 8.42079 8.62895 8.35679 8.88695L8.28979 9.08095L9.68179 10.945C10.3318 10.867 11.0458 10.82 11.7118 10.868C12.4808 10.922 13.3068 11.11 13.8698 11.644C14.0509 11.8319 14.182 12.0623 14.251 12.3141C14.32 12.5658 14.3248 12.8309 14.2648 13.085C14.1478 13.565 13.8108 13.965 13.3458 14.208C12.3608 14.723 11.4438 14.313 10.7628 13.792C10.2298 13.385 9.71779 12.817 9.28679 12.339L9.18279 12.225C8.81279 12.282 8.46279 12.346 8.17879 12.4C7.87379 12.457 7.49479 12.528 7.08279 12.62L6.93179 13.063C6.84846 13.255 6.76913 13.4483 6.69379 13.643L6.57179 13.946C6.44868 14.2579 6.30606 14.5619 6.14479 14.856C5.81479 15.434 5.28779 16.048 4.40379 16.097C3.21979 16.163 2.41779 15.112 2.64779 13.989L2.65379 13.962C2.85379 13.171 3.54779 12.652 4.21879 12.309C4.81579 12.003 5.51279 11.777 6.15979 11.608L6.94979 9.29295ZM7.81979 10.458L7.53279 11.301L7.95379 11.221L7.95779 11.22L8.33779 11.15L7.81979 10.458ZM10.6598 12.062C10.9338 12.352 11.2068 12.622 11.4908 12.839C12.0408 13.259 12.4308 13.332 12.7898 13.144C12.9898 13.039 13.0738 12.903 13.0988 12.802C13.1109 12.7478 13.11 12.6915 13.0961 12.6378C13.0822 12.5841 13.0557 12.5344 13.0188 12.493C12.7618 12.265 12.2968 12.113 11.6268 12.065C11.3048 12.0445 10.9819 12.0435 10.6598 12.062ZM5.65479 13.009C5.33679 13.118 5.03479 13.239 4.76479 13.377C4.17779 13.677 3.89479 13.981 3.82079 14.244C3.74279 14.659 4.01279 14.917 4.33679 14.899C4.60679 14.884 4.84279 14.715 5.10279 14.26C5.23879 14.012 5.35813 13.7563 5.46079 13.493L5.56779 13.227L5.65479 13.009Z" fill="black"/>
</svg>

);

// This is the download icon (arrow pointing down)
const IconDownload = () => (
 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="14" height="14" rx="7" fill="#E6E6E6"/>
<path d="M4.00098 8.89543V9.64526C4.00098 9.84413 4.07998 10.0349 4.2206 10.1755C4.36122 10.3161 4.55194 10.3951 4.75081 10.3951H9.24984C9.44871 10.3951 9.63943 10.3161 9.78005 10.1755C9.92067 10.0349 9.99967 9.84413 9.99967 9.64526V8.89543M5.12573 6.64591L7.00033 8.52051M7.00033 8.52051L8.87492 6.64591M7.00033 8.52051V4.02148" stroke="black" stroke-width="0.749837" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


);


// --- New Certificate Actions Component ---
// This component will group the icons and apply the styles
const CertificateActions = () => {
  return (
    <div className={styles.certificate_actions}>
      <button className={styles.icon_button} title="View Certificate">
        <IconFile />
      </button>
      <button 
        className={`${styles.icon_button} ${styles.download_icon}`} 
        title="Download Certificate"
      >
        <IconDownload />
      </button>
    </div>
  );
};


const QualificationInfoContainer = () => {
  // Data from the user's image
  const qualificationData = [
    { label: "Qualification", value: "B.Tech" },
    { label: "Degree", value: "B.Tech" },
    { label: "Specialisation", value: "Bachelors of Technology" },
    { label: "University", value: "JNTU" },
    { label: "Institute", value: "Malla Reddy Engineering College" },
    { label: "Passed Out Year", value: "2024" },
  ];

  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className={styles.qualification_Info_Container}>
      <div className={styles.qualification_accordians}>
        <BankInfoWidget
  title="Qualification Details"
  data={qualificationData}
  onEdit={() => setShowEdit(true)}
/>

<EditPopup
  isOpen={showEdit}
  title="Edit Qualification Details"
  onClose={() => setShowEdit(false)}
  onSave={() => {
    console.log("SAVE QUALIFICATIONS");
    setShowEdit(false);
  }}
>
  <QualificationUpdate/>
</EditPopup>


           <DocumentsWidget
        title="Certificates Submitted"
        documents={[
          {
            label: "10th Class Certificate",
            verified: true,
            onView: () => console.log("View Offer Letter"),
          },
          {
            label: "Intermediate Certificate",
            verified: true,
            onView: () => console.log("View Experience Letter"),
          },
          {
            label: "Degree Certificate",
            verified: true,
            onView: () => console.log("View Relieving Letter"),
          },
          {
            label: "Experience Certificate",
            verified: true,
            onView: () => console.log("View Form 16"),
          },
        ]}
      />
      </div>
    </div>
  );
};

export default QualificationInfoContainer;