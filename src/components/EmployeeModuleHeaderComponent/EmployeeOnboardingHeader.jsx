import React from "react";
import ProgressHeader from 'widgets/ProgressHeader/ProgressHeader';
import styles from "./EmployeeOnboardingHeader.module.css";

const EmployeeOnboardingHeader = ({
  step,
  totalSteps,
  onBack,
  subHeading = "Employee Preview",
  mainTitle = "New Employee Onboarding", 
}) => {
  return (
    <div className={styles.headerContainer}>
      {/* --- Top Row --- */}
      <div className={styles.topRow}>
        {/* Left section: Back Button + Title */}
        <div className={styles.leftSection}>
          <button
            className={styles.backButton}
            onClick={onBack}
            aria-label="Go back"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.1291 20.1663L19.8458 25.8829C20.0791 26.1163 20.1911 26.3885 20.1818 26.6996C20.1725 27.0107 20.0508 27.2829 19.8166 27.5163C19.5833 27.7302 19.3111 27.8422 19 27.8523C18.6889 27.8624 18.4166 27.7504 18.1833 27.5163L10.4833 19.8163C10.3666 19.6996 10.2838 19.5732 10.2348 19.4371C10.1858 19.301 10.1621 19.1552 10.1636 18.9996C10.1652 18.8441 10.1897 18.6982 10.2371 18.5621C10.2846 18.426 10.367 18.2996 10.4845 18.1829L18.1845 10.4829C18.3984 10.2691 18.6659 10.1621 18.9871 10.1621C19.3084 10.1621 19.5853 10.2691 19.8178 10.4829C20.0511 10.7163 20.1678 10.9936 20.1678 11.3148C20.1678 11.636 20.0511 11.9129 19.8178 12.1454L14.1291 17.8329H27.1666C27.4972 17.8329 27.7745 17.9449 27.9985 18.1689C28.2225 18.3929 28.3341 18.6698 28.3333 18.9996C28.3325 19.3294 28.2205 19.6067 27.9973 19.8314C27.7741 20.0562 27.4972 20.1678 27.1666 20.1663H14.1291Z"
                fill="black"
              />
            </svg>
          </button>

          <h2 className={styles.title}>{mainTitle}</h2>
        </div>

        {/* Right section: Step progress */}
        <div className={styles.rightSection}>
          <ProgressHeader step={step} totalSteps={totalSteps} />
        </div>
      </div>

      {/* --- Centered Subheading --- */}
      <div className={styles.centerSubHeader}>
        <h3 className={styles.subHeading}>{subHeading}</h3>
      </div>
    </div>
  );
};

export default EmployeeOnboardingHeader;
