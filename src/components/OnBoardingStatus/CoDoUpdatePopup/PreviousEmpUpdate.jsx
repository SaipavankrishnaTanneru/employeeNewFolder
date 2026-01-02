import React, { useState } from "react";
import styles from "./PreviousEmpUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";

const previousEmploymentData = [
  {
    companyName: "RankGuru Technologies",
    designation: "Quality Analyst",
    fromDate: "2020-08-12",
    toDate: "2025-08-29",
    leavingReason: "Health Issue",
    addressLine1: "Hyderabad",
    addressLine2: "Telangana",
    natureOfDuties: "1",
    grossSalary: "90000",
    ctc: "9 LPA",
  },
  {
    companyName: "ABC Solutions",
    designation: "Senior QA",
    fromDate: "2018-06-01",
    toDate: "2020-07-31",
    leavingReason: "Better Opportunity",
    addressLine1: "Bangalore",
    addressLine2: "Karnataka",
    natureOfDuties: "Automation Testing",
    grossSalary: "75000",
    ctc: "8 LPA",
  },
];

const PreviousEmpUpdate = () => {
  const [previousEmployments, setPreviousEmployments] = useState(
    previousEmploymentData
  );

  const handleChange = (index, field, value) => {
    setPreviousEmployments((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      {previousEmployments.map((item, index) => (
        <div key={index} className={styles.block}>
          {/* Header */}
          <div className={styles.block_header}>
            <span>Previous Employment {index + 1}</span>
          </div>

          {/* Fields Grid */}
          <div className={styles.form_grid}>
            <InputBox
              label="Company Name"
              value={item.companyName}
              onChange={(e) =>
                handleChange(index, "companyName", e.target.value)
              }
            />

            <InputBox
              label="Designation"
              value={item.designation}
              onChange={(e) =>
                handleChange(index, "designation", e.target.value)
              }
            />

            <InputBox
              label="From Date"
              type="date"
              value={item.fromDate}
              onChange={(e) =>
                handleChange(index, "fromDate", e.target.value)
              }
            />

            <InputBox
              label="To Date"
              type="date"
              value={item.toDate}
              onChange={(e) =>
                handleChange(index, "toDate", e.target.value)
              }
            />

            <InputBox
              label="Leaving Reason"
              value={item.leavingReason}
              onChange={(e) =>
                handleChange(index, "leavingReason", e.target.value)
              }
            />

            <InputBox
              label="Address Line 1"
              value={item.addressLine1}
              onChange={(e) =>
                handleChange(index, "addressLine1", e.target.value)
              }
            />

            <InputBox
              label="Address Line 2"
              value={item.addressLine2}
              onChange={(e) =>
                handleChange(index, "addressLine2", e.target.value)
              }
            />

            <InputBox
              label="Nature of Duties"
              value={item.natureOfDuties}
              onChange={(e) =>
                handleChange(index, "natureOfDuties", e.target.value)
              }
            />

            <InputBox
              label="Gross Salary (Monthly)"
              value={item.grossSalary}
              onChange={(e) =>
                handleChange(index, "grossSalary", e.target.value)
              }
            />

            <InputBox
              label="CTC"
              value={item.ctc}
              onChange={(e) => handleChange(index, "ctc", e.target.value)}
            />
          </div>

          {/* Upload Document Button - Same as QualificationUpdate */}
          <div className={styles.upload_row}>
            <button type="button" className={styles.upload_btn}>
              Upload Document
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviousEmpUpdate;