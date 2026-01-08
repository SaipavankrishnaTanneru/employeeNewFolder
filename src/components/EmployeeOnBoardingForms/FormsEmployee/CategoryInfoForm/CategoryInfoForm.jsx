import React, { forwardRef, useImperativeHandle } from "react";
import { FormikProvider } from "formik";
import styles from "./CategoryInfo.module.css";

// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormValidationAlert from "utils/FormValidationAlert"; 

// Logic Hook
import { useCategoryInfoFormik } from "../../../../hooks/useCategoryInfoFormik";

const CategoryInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  const { 
    formik, 
    dropdowns, 
    isTeachSelected,
    isNonTeachSelected 
  } = useCategoryInfoFormik({ 
    tempId, 
    onSuccess,
  });
  
  const { values, setFieldValue, handleChange, errors, touched } = formik;
  const { employeeTypes, departments, designations, subjects, orientations } = dropdowns;

  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  const getDisplayName = (id, list) => {
     if (!id || !list) return "";
     const item = list.find((x) => Number(x.id) === Number(id));
     return item ? item.name : "";
  };

  const handleEmpTypeChange = (e) => {
    const name = e.target.value;
    const item = employeeTypes.find((x) => x.name === name);
    setFieldValue("employeeTypeId", item ? item.id : "");
    // Reset dependents
    setFieldValue("departmentId", "");
    setFieldValue("designationId", "");
  };

  const handleDeptChange = (e) => {
    const name = e.target.value;
    const item = departments.find((x) => x.name === name);
    setFieldValue("departmentId", item ? item.id : "");
    setFieldValue("designationId", "");
  };

  const handleDesignationChange = (e) => {
    const name = e.target.value;
    const item = designations.find((x) => x.name === name);
    setFieldValue("designationId", item ? item.id : "");
  };

  const handleSimpleDropdown = (field, list, e) => {
    const name = e.target.value;
    const item = list.find((x) => x.name === name);
    setFieldValue(field, item ? item.id : "");
  };

  return (
    <div className={styles.category_form_container}>
      <FormikProvider value={formik}>
        <FormValidationAlert />

        <form>
          <div className={styles.category_header}>
            <span className={styles.category_title}>Category Info</span>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.category_form_grid}>
            
            <Dropdown
              dropdownname="Employee Type *"
              name="employeeTypeId"
              results={employeeTypes.map((x) => x.name)}
              value={getDisplayName(values.employeeTypeId, employeeTypes)}
              onChange={handleEmpTypeChange}
              error={touched.employeeTypeId && errors.employeeTypeId}
            />

            <Dropdown
              dropdownname="Department *"
              name="departmentId"
              results={departments.map((x) => x.name)}
              value={getDisplayName(values.departmentId, departments)}
              onChange={handleDeptChange}
              disabled={!values.employeeTypeId} 
              error={touched.departmentId && errors.departmentId}
            />

            <Dropdown
              dropdownname="Designation *"
              name="designationId"
              results={designations.map((x) => x.name)}
              value={getDisplayName(values.designationId, designations)}
              onChange={handleDesignationChange}
              disabled={!values.departmentId}
              error={touched.designationId && errors.designationId}
            />
             
             {/* Hide Orientation & Subject ONLY for Non-Teach */}
             {!isNonTeachSelected && (
               <>
                 <Dropdown
                  dropdownname="Orientation *"
                  name="orientationId"
                  results={orientations.map((x) => x.name)}
                  value={getDisplayName(values.orientationId, orientations)}
                  onChange={(e) => handleSimpleDropdown("orientationId", orientations, e)}
                  error={touched.orientationId && errors.orientationId}
                />

                <Dropdown
                  dropdownname={isTeachSelected ? "Subject *" : "Subject"}
                  name="subjectId"
                  results={subjects.map((x) => x.name)}
                  value={getDisplayName(values.subjectId, subjects)}
                  onChange={(e) => handleSimpleDropdown("subjectId", subjects, e)}
                  error={touched.subjectId && errors.subjectId}
                />
               </>
             )}

            {/* 🔴 UPDATE: Agreed Periods visible for BOTH (Always shown) */}
            <Inputbox
              label="Agreed Periods per week *"
              name="agreedPeriodsPerWeek"
              placeholder="Enter Periods"
              value={values.agreedPeriodsPerWeek}
              onChange={handleChange}
              error={touched.agreedPeriodsPerWeek && errors.agreedPeriodsPerWeek}
            />

          </div>
        </form>
      </FormikProvider>
    </div>
  );
});

export default CategoryInfo;