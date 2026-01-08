import React, { useEffect } from "react";
import styles from "./WorkingInfoUpdate.module.css"; 

// Custom Widgets
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";

// Logic Hook
import { useCategoryInfoFormik } from "hooks/useCategoryInfoFormik"; // Check path

const CategoryInfoUpdate = ({ activeId, data, onSaveRef, onSuccess }) => {

  // 1. Initialize Hook (Using activeId passed from Parent)
  const { 
    values, 
    setFieldValue, 
    dropdowns, 
    submitForm 
  } = useCategoryInfoFormik({
    tempId: activeId, // 👈 CRITICAL: Use the prop, not useParams
    existingData: data,
    onSuccess: onSuccess 
  });

  // 2. Connect the Save Button Ref
  useEffect(() => {
    if (onSaveRef) {
      onSaveRef.current = submitForm;
    }
  }, [submitForm, onSaveRef]);

  // --- ID <-> Name Translation Helpers ---
  const getName = (list, id) => list?.find((item) => item.id == id)?.name || "";
  const getNamesList = (list) => list?.map((item) => item.name) || [];

  const handleDropdownChange = (fieldName, selectedName, list) => {
    const found = list?.find((item) => item.name === selectedName);
    setFieldValue(fieldName, found ? found.id : 0);
  };

  return (
    <div className={styles.form_grid}>
      
      <Dropdown
        dropdownname="Employee Type"
        value={getName(dropdowns.employeeTypes, values.employeeTypeId)} 
        results={getNamesList(dropdowns.employeeTypes)} 
        onChange={(e) => handleDropdownChange("employeeTypeId", e.target.value, dropdowns.employeeTypes)}
      />

      <Dropdown
        dropdownname="Department"
        value={getName(dropdowns.departments, values.departmentId)}
        results={getNamesList(dropdowns.departments)}
        onChange={(e) => handleDropdownChange("departmentId", e.target.value, dropdowns.departments)}
      />

      <Dropdown
        dropdownname="Designation"
        value={getName(dropdowns.designations, values.designationId)}
        results={getNamesList(dropdowns.designations)}
        onChange={(e) => handleDropdownChange("designationId", e.target.value, dropdowns.designations)}
      />

      <Dropdown
        dropdownname="Orientation"
        value={getName(dropdowns.orientations, values.orientationId)}
        results={getNamesList(dropdowns.orientations)}
        onChange={(e) => handleDropdownChange("orientationId", e.target.value, dropdowns.orientations)}
      />

      <Dropdown
        dropdownname="Subjects"
        value={getName(dropdowns.subjects, values.subjectId)}
        results={getNamesList(dropdowns.subjects)}
        onChange={(e) => handleDropdownChange("subjectId", e.target.value, dropdowns.subjects)}
      />

      <InputBox
        label="Agreed No. of Periods"
        type="number"
        value={values.agreedPeriodsPerWeek}
        onChange={(e) => setFieldValue("agreedPeriodsPerWeek", e.target.value)}
      />
    </div>
  );
};

export default CategoryInfoUpdate;