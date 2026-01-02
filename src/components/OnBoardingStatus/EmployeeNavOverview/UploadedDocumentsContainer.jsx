import React, { useState } from "react";
import styles from "./UploadedDocumentsContainer.module.css";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";
import editIcon from "assets/icons/editIcon.svg";

// Import the reusable EditPopup widget
import EditPopup from "widgets/Popup/EditPopup";

// Import your UploadDocumentsForm (the full upload UI with cards)
import DocumentsUpdate from "../CoDoUpdatePopup/DocumentsUpdate";

/* ---------------- ICONS ---------------- */
const IconFilePdf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
    <path d="M4.25 19.25H12.666C13.5943 19.25 14.4845 18.8813 15.1409 18.2249C15.7973 17.5685 16.166 16.6783 16.166 15.75V10.22C16.1663 9.29186 15.798 8.40159 15.142 7.745L9.173 1.775C8.84797 1.45 8.46211 1.19221 8.03745 1.01634C7.61278 0.840469 7.15764 0.749967 6.698 0.75H4.25C3.32174 0.75 2.4315 1.11875 1.77513 1.77513C1.11875 2.4315 0.75 3.32174 0.75 4.25V15.75C0.75 16.6783 1.11875 17.5685 1.77513 18.2249C2.4315 18.8813 3.32174 19.25 4.25 19.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M6.89479 5.14095C6.65579 5.21895 6.50279 5.37695 6.45879 5.55195C6.36879 5.90395 6.45879 6.28195 6.71179 6.75495C6.83779 6.98895 6.99179 7.22595 7.16179 7.47995L7.25379 7.61695L7.39879 7.83195L7.41779 7.76395L7.50379 7.45795C7.60246 7.12262 7.67913 6.78262 7.73379 6.43795C7.82279 5.79595 7.72279 5.41995 7.42479 5.17795C7.34479 5.11295 7.14679 5.05895 6.89479 5.14095ZM6.94979 9.29295L6.67979 8.93095L6.64779 8.88295C6.53279 8.69295 6.40479 8.50295 6.26579 8.29795L6.16579 8.14895C5.98179 7.88143 5.81092 7.6051 5.65379 7.32095C5.34379 6.74295 5.09579 6.03495 5.29579 5.25395C5.46579 4.58995 5.99379 4.17295 6.52279 3.99995C7.03979 3.83195 7.69679 3.85295 8.18279 4.24695C8.97479 4.89095 9.03079 5.81995 8.92179 6.60395C8.86107 7.00067 8.77387 7.39288 8.66079 7.77795L8.56479 8.11795C8.49013 8.37262 8.42079 8.62895 8.35679 8.88695L8.28979 9.08095L9.68179 10.945C10.3318 10.867 11.0458 10.82 11.7118 10.868C12.4808 10.922 13.3068 11.11 13.8698 11.644C14.0509 11.8319 14.182 12.0623 14.251 12.3141C14.32 12.5658 14.3248 12.8309 14.2648 13.085C14.1478 13.565 13.8108 13.965 13.3458 14.208C12.3608 14.723 11.4438 14.313 10.7628 13.792C10.2298 13.385 9.71779 12.817 9.28679 12.339L9.18279 12.225C8.81279 12.282 8.46279 12.346 8.17879 12.4C7.87379 12.457 7.49479 12.528 7.08279 12.62L6.93179 13.063C6.84846 13.255 6.76913 13.4483 6.69379 13.643L6.57179 13.946C6.44868 14.2579 6.30606 14.5619 6.14479 14.856C5.81479 15.434 5.28779 16.048 4.40379 16.097C3.21979 16.163 2.41779 15.112 2.64779 13.989L2.65379 13.962C2.85379 13.171 3.54779 12.652 4.21879 12.309C4.81579 12.003 5.51279 11.777 6.15979 11.608L6.94979 9.29295ZM7.81979 10.458L7.53279 11.301L7.95379 11.221L7.95779 11.22L8.33779 11.15L7.81979 10.458ZM10.6598 12.062C10.9338 12.352 11.2068 12.622 11.4908 12.839C12.0408 13.259 12.4308 13.332 12.7898 13.144C12.9898 13.039 13.0738 12.903 13.0988 12.802C13.1109 12.7478 13.11 12.6915 13.0961 12.6378C13.0822 12.5841 13.0557 12.5344 13.0188 12.493C12.7618 12.265 12.2968 12.113 11.6268 12.065C11.3048 12.0445 10.9819 12.0435 10.6598 12.062ZM5.65479 13.009C5.33679 13.118 5.03479 13.239 4.76479 13.377C4.17779 13.677 3.89479 13.981 3.82079 14.244C3.74279 14.659 4.01279 14.917 4.33679 14.899C4.60679 14.884 4.84279 14.715 5.10279 14.26C5.23879 14.012 5.35813 13.7563 5.46079 13.493L5.56779 13.227L5.65479 13.009Z" fill="black"/>
  </svg>
);

const IconView = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect width="14" height="14" rx="7" fill="#E6E6E6" />
    <path
      d="M4 8.895V9.645C4 9.844 4.08 10.035 4.22 10.175C4.361 10.316 4.552 10.395 4.751 10.395H9.25C9.449 10.395 9.639 10.316 9.78 10.175C9.921 10.035 10 9.844 10 9.645V8.895M5.126 6.646L7 8.521M7 8.521L8.875 6.646M7 8.521V4.021"
      stroke="black"
      strokeWidth="0.75"
      strokeLinecap="round"
    />
  </svg>
);

const IconVerified = () => (
  <svg width="18" height="18" viewBox="0 0 26 22" fill="none">
    <path
      d="M11.883 1.998C12.479 1.332 13.521 1.332 14.117 1.998L15.102 3.097C15.608 3.662 16.344 3.968 17.103 3.926L18.575 3.845C19.468 3.795 20.205 4.532 20.155 5.425L20.074 6.897C20.032 7.656 20.338 8.392 20.903 8.898L22.002 9.883C22.668 10.479 22.668 11.521 22.002 12.117L20.903 13.102C20.338 13.608 20.032 14.344 20.074 15.103L20.155 16.575C20.205 17.468 19.468 18.205 18.575 18.155L17.103 18.074C16.344 18.032 15.608 18.338 15.102 18.903L14.117 20.002C13.521 20.668 12.479 20.668 11.883 20.002L10.898 18.903C10.392 18.338 9.656 18.032 8.897 18.074L7.425 18.155C6.532 18.205 5.795 17.468 5.845 16.575L5.926 15.103C5.968 14.344 5.662 13.608 5.097 13.102L3.998 12.117C3.332 11.521 3.332 10.479 3.998 9.883L5.097 8.898C5.662 8.392 5.968 7.656 5.926 6.897L5.845 5.425C5.795 4.532 6.532 3.795 7.425 3.845L8.897 3.926C9.656 3.968 10.392 3.662 10.898 3.097L11.883 1.998Z"
      fill="#3425FF"
    />
    <path
      d="M9.271 12L11.122 13.638C11.327 13.819 11.64 13.802 11.824 13.6L16 9"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

/* ---------------- ACTIONS ---------------- */
const DocumentActions = () => (
  <div className={styles.iconGroup}>
    <button className={styles.iconBtn}>
      <IconFilePdf />
    </button>
    <button className={styles.iconBtn}>
      <IconView />
    </button>
    <span className={styles.verified}>
      <IconVerified />
    </span>
  </div>
);

/* ---------------- MAIN ---------------- */
const documents = [
  "Personal Details Form",
  "Hiring Approval Form",
  "Background Verification Form",
  "PF Form",
  "Resume",
  "Previous Company Payslips",
  "Gratuity Form",
  "Passport",
  "Pancard",
  "Voter Identity Card",
  "Driving License",
  "Aadhar Card",
];

const UploadedDocuments = () => {
  const [showReUploadPopup, setShowReUploadPopup] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h4 className={styles.title}>Uploaded Documents</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />

        <button
          type="button"
          className={styles.editButton}
          onClick={() => setShowReUploadPopup(true)}
        >
          <img src={editIcon} alt="edit" />
          <span>Edit</span>
        </button>
      </div>

      <div className={styles.grid}>
        {documents.map((label) => (
          <div key={label} className={styles.item}>
            <span className={styles.label}>{label}</span>
            <DocumentActions />
          </div>
        ))}
      </div>

      {/* Re-Upload Documents Popup using EditPopup widget */}
      <EditPopup
        isOpen={showReUploadPopup}
        title="Re-Upload Documents"
        subtitle="Re-Upload The Documents"
        onClose={() => setShowReUploadPopup(false)}
        onSave={() => {
          console.log("Documents updated!");
          setShowReUploadPopup(false);
        }}
        saveButtonText="Update Documents"
        cancelButtonText="Cancel"
      >
        {/* Your full upload form goes inside the popup */}
        <div className={styles.popupContentWrapper}>
    <DocumentsUpdate />
  </div>
      </EditPopup>
    </div>
  );
};

export default UploadedDocuments;