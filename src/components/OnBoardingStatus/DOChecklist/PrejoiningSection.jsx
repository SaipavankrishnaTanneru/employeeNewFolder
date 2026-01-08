import React from "react";
import styles from "./PrejoiningSection.module.css";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";
import Dropdown from 'widgets/Dropdown/Dropdown';

const PrejoiningSection = ({ role, noticePeriod, setNoticePeriod, checkedIds, onToggle }) => {
  
  // Mapping UI to API IDs
  const prejoinItems = [
    { id: 10, displayId: 1, title: "Hiring Approval Form" },
    { id: 11, displayId: 2, title: "Background Verification Form" },
    { id: 12, displayId: 3, title: "Biodata Form" },
    { id: 13, displayId: 4, title: "Last Drawn Payslip/ Salary Certificate/ 3 Months bank Statement" },
  ];

  const noticePeriodOptions = [
    "Select Notice Period", "15 Days", "30 Days", "45 Days", "60 Days",
  ];

  const isChecked = (id) => checkedIds.includes(id);

  return (
    <div className={styles.prejoinSection}>
      <div className={styles.prejoinHeader}>
        <div className={styles.prejoinTitle}>Prejoining Documents</div>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <div className={styles.prejoinList}>
        {prejoinItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.prejoinItem} ${isChecked(item.id) ? styles.itemChecked : ""}`}
            onClick={() => onToggle(item.id)}
          >
            <div className={styles.prejoinText}>
              {item.displayId}. {item.title}
            </div>
            <div className={styles.statusIcon}>
              <div
                className={isChecked(item.id) ? styles.checked : styles.unchecked}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <p className={styles.declarationText}>
        I here by declare that, i have duly verified all the documents provided nby the employee, 
        I am liable to collect the offer acceptance from the employee and I agree that at all times
        during the term of this agreement. i will take all reasonable steps necessary to hold all 
        proprietorial information nin trust and confidence and shall not disclose any proprietary 
        information to any third party or use any proprietary information in any manner or for any
        purpose other than the permitted use or as expressly set forth in this agreement. The receiving 
        party may use such proprietary information only to the extent required to accomplish the permitted 
        use
      </p>

      {/* Conditional Dropdown for CO Role - Exact structure as your original */}
      {role === "CO" && (
        <div className={styles.noticePeriodContainer}>
          <Dropdown
            dropdownname="Notice Period"
            name="noticePeriod"
            results={noticePeriodOptions}
            value={noticePeriod}
            onChange={(e) => setNoticePeriod(e.target.value)}
            dropdownsearch={false}
          />
        </div>
      )}
    </div>
  );
};

export default PrejoiningSection;