import React from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormCheckbox from "widgets/Checkbox/Checkbox";
import styles from "./MotherInfo.module.css";

const MotherInfo = ({ formik, prefix = "mother" }) => {
  const { values, handleChange, setFieldValue } = formik;
  
  // Access the specific section data (e.g., values.mother)
  const data = values[prefix] || {};

  // Helper to generate dynamic field names like "mother.fullName"
  const getName = (field) => `${prefix}.${field}`;

  // Safe handler for the custom Checkbox widget
  const handleCheckbox = (field, val) => {
    // Handle both Event objects and direct values
    const isChecked = val?.target ? val.target.checked : val;
    setFieldValue(getName(field), isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>

        {/* Row 1 */}
        <div className={styles.row}>
          <div className={styles.nameField}>

            <Inputbox
              label="Name"
              name={getName("fullName")}
              placeholder="Enter Name"
              value={data.fullName || ""}
              onChange={handleChange}
            />

            <div className={styles.checkboxRow}>
  <span className={styles.checkboxLabel}>Late</span>
  <FormCheckbox
    id={`${prefix}-late`}
    name={getName("isLate")}
    checked={data.isLate || false}
    onChange={(val) => handleCheckbox("isLate", val)}
  />
</div>
          </div>

          <Dropdown
            dropdownname="Blood Group"
            name={getName("bloodGroupId")}
            // Replace with dynamic options if available, e.g., ["1", "2"...] or ["A+", "B+"]
            results={["1", "2", "3", "4", "5", "6", "7", "8"]} 
            value={data.bloodGroupId || ""}
            onChange={handleChange}
          />

          <Dropdown
            dropdownname="Nationality"
            name={getName("nationality")}
            results={["Indian", "American", "Canadian", "Other"]}
            value={data.nationality || ""}
            onChange={handleChange}
          />
        </div>

        {/* Row 2 */}
        <div className={styles.row}>
          <Inputbox
            label="Occupation"
            name={getName("occupation")}
            placeholder="Enter Occupation"
            value={data.occupation || ""}
            onChange={handleChange}
          />

          <Inputbox
            label="Email"
            name={getName("email")}
            placeholder="Enter email id"
            value={data.email || ""}
            onChange={handleChange}
          />

          <Inputbox
            label="Phone Number"
            name={getName("phoneNumber")}
            placeholder="Enter phone number"
            value={data.phoneNumber || ""}
            onChange={handleChange}
          />
        </div>

        {/* Row 3 — Employee ID (Conditionally rendered based on parent check) */}
        {data.isSriChaitanyaEmp && (
          <div className={styles.row}>
            <Inputbox
              label="Employee ID"
              name={getName("parentEmpId")}
              placeholder="Enter Employee ID"
              value={data.parentEmpId || ""}
              onChange={handleChange}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default MotherInfo;