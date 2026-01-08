import React from "react";
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
  // 1. Destructure errors and touched
  const { values, handleChange, setFieldValue, errors, touched } = formik;
  const item = values.qualifications[index];

  // 2. Get specific errors for this row
  const itemErrors = errors.qualifications?.[index] || {};
  const itemTouched = touched.qualifications?.[index] || {};

  // Fetch API Data
  const { data: qualList = [] } = useQualificationsList();
  const { data: degreeList = [] } = useDegreesByQualId(item.qualificationId);

  const handleDropdownChange = (field, list, e) => {
    const selectedName = e.target.value;
    const selectedObj = list.find((opt) => opt.name === selectedName);
    
    setFieldValue(`qualifications.${index}.${field}`, selectedObj ? selectedObj.id : "");
    
    if (field === "qualificationId") {
      setFieldValue(`qualifications.${index}.qualificationDegreeId`, "");
    }
  };

  const getNameById = (id, list) => list.find(x => String(x.id) === String(id))?.name || "";

  return (
    <div className={styles.formGrid}>
      
      {/* 1. Qualification Dropdown */}
      <Dropdown
        dropdownname="Qualification *"
        name={`qualifications.${index}.qualificationId`}
        results={qualList.map((q) => q.name)}
        value={getNameById(item.qualificationId, qualList)}
        onChange={(e) => handleDropdownChange("qualificationId", qualList, e)}
        // 🔴 Add Validation
        error={itemTouched.qualificationId && itemErrors.qualificationId}
      />

      {/* 2. Degree Dropdown */}
      <Dropdown
        dropdownname="Degree *"
        name={`qualifications.${index}.qualificationDegreeId`}
        results={degreeList.map((d) => d.name)}
        value={getNameById(item.qualificationDegreeId, degreeList)}
        onChange={(e) => handleDropdownChange("qualificationDegreeId", degreeList, e)}
        disabled={!item.qualificationId}
        // 🔴 Add Validation
        error={itemTouched.qualificationDegreeId && itemErrors.qualificationDegreeId}
      />

      {/* 3. Specialization */}
      <Inputbox
        label="Specialization *"
        name={`qualifications.${index}.specialization`}
        value={item.specialization}
        onChange={handleChange}
        placeholder="Enter Specialization"
        // 🔴 Add Validation
        error={itemTouched.specialization && itemErrors.specialization}
      />

      {/* 4. University */}
      <Inputbox
        label="University *"
        name={`qualifications.${index}.university`}
        value={item.university}
        onChange={handleChange}
        placeholder="Enter University"
        // 🔴 Add Validation
        error={itemTouched.university && itemErrors.university}
      />

      {/* 5. Institute */}
      <Inputbox
        label="Institute Name *"
        name={`qualifications.${index}.institute`}
        value={item.institute}
        onChange={handleChange}
        placeholder="Enter Institute"
        // 🔴 Add Validation
        error={itemTouched.institute && itemErrors.institute}
      />

      {/* 6. Passed Out Year */}
      <Inputbox
        label="Pass out Year *"
        name={`qualifications.${index}.passedOutYear`}
        value={item.passedOutYear}
        onChange={handleChange}
        placeholder="YYYY"
        maxLength={4}
        // 🔴 Add Validation
        error={itemTouched.passedOutYear && itemErrors.passedOutYear}
      />

      {/* 7. Certificate Upload Section */}
      <div className={styles.formGroup}>
        <CertificateUploadSection index={index} formik={formik} />
      </div>

    </div>
  );
};

export default QualificationRow;