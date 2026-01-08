import React from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormCheckbox from "widgets/Checkbox/Checkbox";
import styles from "./MotherInfo.module.css";

const MotherInfo = ({ formik, prefix = "mother", bloodGroupOptions = [] }) => {
  const { values, handleChange, setFieldValue } = formik;
  const data = values[prefix] || {};
  const getName = (field) => `${prefix}.${field}`;

  const handleCheckbox = (field, val) => {
    const isChecked = val?.target ? val.target.checked : val;
    setFieldValue(getName(field), isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        <div className={styles.row}>
          <div className={styles.nameField}>
            <Inputbox label="Name" name={getName("fullName")} placeholder="Enter Name" value={data.fullName || ""} onChange={handleChange} />
            <div className={styles.checkboxRow}>
              <span className={styles.checkboxLabel}>Late</span>
              <FormCheckbox name={getName("isLate")} checked={data.isLate || false} onChange={(val) => handleCheckbox("isLate", val)} />
            </div>
          </div>
          <Dropdown dropdownname="Blood Group" name={getName("bloodGroupId")} results={bloodGroupOptions} value={data.bloodGroupId || ""} onChange={handleChange} />
          <Dropdown dropdownname="Nationality" name={getName("nationality")} results={["Indian", "American", "Canadian", "Other"]} value={data.nationality || ""} onChange={handleChange} />
        </div>

        <div className={styles.row}>
          <Inputbox label="Occupation" name={getName("occupation")} placeholder="Enter Occupation" value={data.occupation || ""} onChange={handleChange} />
          <Inputbox label="Email" name={getName("email")} placeholder="Enter email id" value={data.email || ""} onChange={handleChange} />
          <Inputbox label="Phone Number" name={getName("phoneNumber")} placeholder="Enter phone number" value={data.phoneNumber || ""} onChange={handleChange} />
        </div>
        
        {/* Row 3 - Added Adhaar Here */}
        <div className={styles.row}>
             {/* 🆔 NEW ADHAAR FIELD */}
             <Inputbox label="Aadhaar No" name={getName("adhaarNo")} placeholder="Enter Aadhaar No" value={data.adhaarNo || ""} onChange={handleChange} />
        </div>

        {data.isSriChaitanyaEmp && (
          <div className={styles.row}>
            <Inputbox label="Employee ID" name={getName("parentEmpId")} placeholder="Enter Employee ID" value={data.parentEmpId || ""} onChange={handleChange} />
          </div>
        )}
      </div>
    </div>
  );
};
export default MotherInfo;