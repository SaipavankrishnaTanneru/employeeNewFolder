import React, { useState } from "react";
import styles from "./QualificationUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";

/**
 * This array represents what you "got from backend".
 * For now, it is STATIC.
 * Tomorrow, it can come from API.
 */
const qualificationDataFromBackend = [
  {
    qualification: "UG",
    degree: "B.Tech",
    specialization: "CSE",
    university: "JNTU",
    institute: "ABC College",
    passedOutYear: "2019",
  },
  {
    qualification: "PG",
    degree: "M.Tech",
    specialization: "AI",
    university: "OU",
    institute: "XYZ University",
    passedOutYear: "2021",
  },
];

const QualificationUpdate = () => {
  const [qualifications, setQualifications] = useState(
    qualificationDataFromBackend
  );

  const handleChange = (index, field, value) => {
    setQualifications((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className={styles.container}>
      {qualifications.map((item, index) => (
        <div key={index} className={styles.block}>
          {/* Header */}
          <div className={styles.block_header}>
            <span>Qualification {index + 1}</span>
          </div>

          {/* Fields */}
          <div className={styles.form_grid}>
            <Dropdown
              dropdownname="Qualification"
              value={item.qualification}
              results={["SSC", "Intermediate", "UG", "PG"]}
              onChange={(e) =>
                handleChange(index, "qualification", e.target.value)
              }
            />

            <Dropdown
              dropdownname="Degree"
              value={item.degree}
              results={["B.Tech", "M.Tech", "B.Sc", "M.Sc"]}
              onChange={(e) =>
                handleChange(index, "degree", e.target.value)
              }
            />

            <InputBox
              label="Specialization"
              value={item.specialization}
              onChange={(e) =>
                handleChange(index, "specialization", e.target.value)
              }
            />

            <InputBox
              label="University"
              value={item.university}
              onChange={(e) =>
                handleChange(index, "university", e.target.value)
              }
            />

            <InputBox
              label="Institute"
              value={item.institute}
              onChange={(e) =>
                handleChange(index, "institute", e.target.value)
              }
            />

            <InputBox
              label="Passed Out Year"
              placeholder="YYYY"
              value={item.passedOutYear}
              onChange={(e) =>
                handleChange(index, "passedOutYear", e.target.value)
              }
            />
          </div>

          {/* Upload (still per qualification) */}
          <div className={styles.upload_row}>
            <button className={styles.upload_btn}>
              Upload Certificate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QualificationUpdate;
