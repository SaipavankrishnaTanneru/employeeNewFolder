// components/EmployeeOnBoardingForms/FormsEmployee/CategoryInfoForm/CategoryInfoForm.jsx

import React, { forwardRef, useImperativeHandle } from "react";
import { FormikProvider } from "formik";
import styles from "./CategoryInfo.module.css";

// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";

// Logic Hook
import { useCategoryInfoFormik } from "../../../../hooks/useCategoryInfoFormik";

// API Hooks
import {
  useEmployeeTypes,
  useDepartmentsByType,
  useDesignationsByDept,
  useSubjects,
  useOrientations,
} from "api/onBoardingForms/postApi/useCategoryQueries";

const CategoryInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Init Formik
  const { formik } = useCategoryInfoFormik({ tempId, onSuccess });
  const { values, setFieldValue, handleChange } = formik;

  // 2. Expose Submit
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // 3. Fetch Data (Cascading Logic)
  
  // A. Level 1: Independent
  const { data: employeeTypes = [] } = useEmployeeTypes();
  const { data: subjects = [] } = useSubjects();
  const { data: orientations = [] } = useOrientations();

  // B. Level 2: Departments (Depends on Employee Type)
  const { data: departments = [] } = useDepartmentsByType(values.employeeTypeId);

  // C. Level 3: Designations (Depends on Department)
  const { data: designations = [] } = useDesignationsByDept(values.departmentId);


  // --- HANDLERS (With Reset Logic) ---

  const handleEmpTypeChange = (e) => {
    const name = e.target.value;
    const item = employeeTypes.find((x) => x.name === name);
    
    setFieldValue("employeeTypeId", item ? item.id : "");
    // Reset downstream fields
    setFieldValue("departmentId", "");
    setFieldValue("designationId", "");
  };

  const handleDeptChange = (e) => {
    const name = e.target.value;
    const item = departments.find((x) => x.name === name);
    
    setFieldValue("departmentId", item ? item.id : "");
    // Reset downstream field
    setFieldValue("designationId", "");
  };

  const handleDesignationChange = (e) => {
    const name = e.target.value;
    const item = designations.find((x) => x.name === name);
    setFieldValue("designationId", item ? item.id : "");
  };

  // Helper for simple dropdowns (ID lookup)
  const handleSimpleDropdown = (field, list, e) => {
    const name = e.target.value;
    const item = list.find((x) => x.name === name);
    setFieldValue(field, item ? item.id : "");
  };

  const getNameById = (id, list) => list.find((x) => x.id == id)?.name || "";

  return (
    <div className={styles.category_form_container}>
      <FormikProvider value={formik}>
        <form>
          
          {/* HEADER */}
          <div className={styles.category_header}>
            <span className={styles.category_title}>Category Info</span>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.category_form_grid}>
            
            {/* 1. Employee Type */}
            <Dropdown
              dropdownname="Employee Type"
              name="employeeTypeId"
              results={employeeTypes.map((x) => x.name)}
              value={getNameById(values.employeeTypeId, employeeTypes)}
              onChange={handleEmpTypeChange}
            />

            {/* 2. Department (Cascades from Emp Type) */}
            <Dropdown
              dropdownname="Department"
              name="departmentId"
              results={departments.map((x) => x.name)}
              value={getNameById(values.departmentId, departments)}
              onChange={handleDeptChange}
              disabled={!values.employeeTypeId} // Disable if parent not selected
            />

            {/* 3. Designation (Cascades from Dept) */}
            <Dropdown
              dropdownname="Designation"
              name="designationId"
              results={designations.map((x) => x.name)}
              value={getNameById(values.designationId, designations)}
              onChange={handleDesignationChange}
              disabled={!values.departmentId}
            />

            {/* 4. Subject */}
            <Dropdown
              dropdownname="Subject"
              name="subjectId"
              results={subjects.map((x) => x.name)}
              value={getNameById(values.subjectId, subjects)}
              onChange={(e) => handleSimpleDropdown("subjectId", subjects, e)}
            />

            {/* 5. Orientation */}
            <Dropdown
              dropdownname="Orientation"
              name="orientationId"
              results={orientations.map((x) => x.name)}
              value={getNameById(values.orientationId, orientations)}
              onChange={(e) => handleSimpleDropdown("orientationId", orientations, e)}
            />

            {/* 6. Agreed Periods */}
            <Inputbox
              label="Agreed Periods per week"
              name="agreedPeriodsPerWeek"
              placeholder="Enter Periods"
              value={values.agreedPeriodsPerWeek}
              onChange={handleChange}
              type="number"
            />

          </div>
        </form>
      </FormikProvider>
    </div>
  );
});

export default CategoryInfo;