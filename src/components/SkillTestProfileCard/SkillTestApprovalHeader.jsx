import React from "react";
import styles from "./SkillTestApprovalHeader.module.css";
import backArrowIcon from 'assets/onboarding_status_table/leftarrow.svg';

const SkillTestApprovalHeader = ({ onBack }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <button
          className={styles.backButton}
          onClick={onBack} // This triggers the navigation passed from the Layout
          aria-label="Go back"
        >
          <img src={backArrowIcon} alt="Back Arrow" className={styles.backIcon} />
        </button>

        <h2 className={styles.title}>Professional Skill Test Approval</h2>
      </div>
    </div>
  );
};

export default SkillTestApprovalHeader;