// src/component/EmployeeChecklist/PrejoiningSection.js
import React, { useState } from "react";
import styles from "./PrejoiningSection.module.css";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg";

// <-- 1. Import the Dropdown component
// (Adjust this path if your Dropdown folder is located elsewhere)
import Dropdown from 'widgets/Dropdown/Dropdown';

// <-- 2. Accept the 'role' prop
const PrejoiningSection = ({ role, noticePeriod, setNoticePeriod }) => {
  const [prejoinItems, setPrejoinItems] = useState([
    { id: 1, title: "Hiring Approval Form", done: false },
    { id: 2, title: "Background Verification Form", done: false },
    { id: 3, title: "Biodata Form", done: false },
    {
      id: 4,
      title: "Last Drawn Payslip/ Salary Certificate/ 3 Months bank Statement",
      done: false,
    },
  ]);
  const noticePeriodOptions = [
    "Select Notice Period",
    "15 Days",
    "30 Days",
    "45 Days",
    "60 Days",
  ];

  const togglePrejoin = (id) => {
    setPrejoinItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div className={styles.prejoinSection}>
      <div className={styles.prejoinHeader}>
        <div className={styles.prejoinTitle}>Prejoining Documents</div>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <div className={styles.prejoinList}>
        {/* ... (Your .map() for prejoinItems remains unchanged) ... */}
        {prejoinItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.prejoinItem} ${item.done ? styles.itemChecked : ""
              }`}
            onClick={() => togglePrejoin(item.id)}
          >
            <div className={styles.prejoinText}>
              {item.id}. {item.title}
            </div>
            <div className={styles.statusIcon}>
              <div
                className={item.done ? styles.checked : styles.unchecked}
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

      {/* <-- 4. Add the conditional dropdown for the 'CO' role --> */}
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