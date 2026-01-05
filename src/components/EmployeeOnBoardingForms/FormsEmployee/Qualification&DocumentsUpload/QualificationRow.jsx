// components/.../QualificationRow.jsx
 
import React, { useEffect } from "react";
import styles from "./css/QualificationForm.module.css";
 
// Widgets & Icons
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import CertificateUploadSection from "./CertificateUploadSection";
 
// API Hooks
import {
  useQualificationsList,
  useDegreesByQualId
} from "api/onBoardingForms/postApi/useQualificationQueries";
 
const QualificationRow = ({ index, formik }) => {
  const { values, handleChange, setFieldValue } = formik;
  const item = values.qualifications[index];
 
  // 1. Fetch Master List of Qualifications
  const { data: qualList = [] } = useQualificationsList();
 
  // 2. Fetch Degrees based on CURRENT SELECTION (Cascading)
  const { data: degreeList = [] } = useDegreesByQualId(item.qualificationId);
 
  // Helper: Name to ID mapper
  // Since Dropdown widget returns "Value" string (Name), we need to find the ID
  const handleDropdownChange = (field, list, e) => {
    const selectedName = e.target.value;
    const selectedObj = list.find((opt) => opt.name === selectedName);
   
    setFieldValue(`qualifications.${index}.${field}`, selectedObj ? selectedObj.id : "");
   
    // If Qualification changes, clear the Degree
    if (field === "qualificationId") {
      setFieldValue(`qualifications.${index}.qualificationDegreeId`, "");
    }
  };
 
  // Helper: ID to Name (for display value)
  const getNameById = (id, list) => list.find(x => x.id == id)?.name || "";
 
  return (
    <div className={styles.formGrid}>
     
      {/* 1. Qualification Dropdown */}
      <Dropdown
        dropdownname="Qualification"
        name={`qualifications.${index}.qualificationId`}
        results={qualList.map((q) => q.name)}
        value={getNameById(item.qualificationId, qualList)}
        onChange={(e) => handleDropdownChange("qualificationId", qualList, e)}
      />
 
      {/* 2. Degree Dropdown (Dependent) */}
      <Dropdown
        dropdownname="Degree"
        name={`qualifications.${index}.qualificationDegreeId`}
        results={degreeList.map((d) => d.name)}
        value={getNameById(item.qualificationDegreeId, degreeList)}
        onChange={(e) => handleDropdownChange("qualificationDegreeId", degreeList, e)}
        // Disable if no Qualification selected
        disabled={!item.qualificationId}
      />
 
      {/* 3. Specialization */}
      <Inputbox
        label="Specialization"
        name={`qualifications.${index}.specialization`}
        value={item.specialization}
        onChange={handleChange}
        placeholder="Enter Specialization"
      />
 
      {/* 4. University */}
      <Inputbox
        label="University"
        name={`qualifications.${index}.university`}
        value={item.university}
        onChange={handleChange}
        placeholder="Enter University"
      />
 
      {/* 5. Institute */}
      <Inputbox
        label="Institute"
        name={`qualifications.${index}.institute`}
        value={item.institute}
        onChange={handleChange}
        placeholder="Enter Institute"
      />
 
      {/* 6. Passed Out Year */}
      <Inputbox
        label="Passed out Year"
        name={`qualifications.${index}.passedOutYear`}
        type="number"
        value={item.passedOutYear}
        onChange={handleChange}
        placeholder="YYYY"
      />
 
      {/* 7. Certificate Upload Section */}
      <div className={styles.formGroup}>
        <CertificateUploadSection index={index} formik={formik} />
      </div>
 
    </div>
  );
};
 
export default QualificationRow;