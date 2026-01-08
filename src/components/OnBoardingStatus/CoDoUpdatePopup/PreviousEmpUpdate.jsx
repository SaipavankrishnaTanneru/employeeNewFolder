import React, { useEffect } from "react";
import styles from "./PreviousEmpUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import { usePreviousEmployerFormik } from "hooks/usePreviousEmployerFormik"; // Reuse existing hook
import { usePreviousEmpDetails } from "api/do/getpapis/usePreviousEmpQuery";

const PreviousEmpUpdate = ({ tempId, prevEmpId, onSuccess }) => {
  
  // 1. Fetch Data to Pre-fill
  const { data: allEmployers } = usePreviousEmpDetails(tempId);
  
  // 2. Initialize Formik
  const { formik, initialEmployer } = usePreviousEmployerFormik({ tempId, onSuccess });
  const { values, setFieldValue, submitForm } = formik;

  // 3. Pre-fill logic specific to the selected ID
  useEffect(() => {
    if (allEmployers && prevEmpId) {
        const selectedEmp = allEmployers.find(e => (e.prevEmpId || e.id) === prevEmpId);
        if (selectedEmp) {
            // We set the whole array with just this one item for editing
            // Or if your backend supports updating a specific ID, logic might differ.
            // Assuming we edit one item at a time in this popup:
            setFieldValue("previousEmployers", [{
                companyName: selectedEmp.companyName || "",
                designation: selectedEmp.designation || "",
                fromDate: selectedEmp.fromDate ? selectedEmp.fromDate.split('T')[0] : "",
                toDate: selectedEmp.toDate ? selectedEmp.toDate.split('T')[0] : "",
                leavingReason: selectedEmp.leavingReason || "",
                companyAddressLine1: selectedEmp.companyAddress || "",
                natureOfDuties: selectedEmp.natureOfDuties || "",
                grossSalaryPerMonth: selectedEmp.grossSalaryPerMonth || "",
                ctc: selectedEmp.ctc || "",
                // ... map other fields
            }]);
        }
    }
  }, [allEmployers, prevEmpId, setFieldValue]);

  // Using the first item in the array since we are editing a specific one
  const item = values.previousEmployers[0] || initialEmployer;
  const index = 0; // Fixed index for single edit

  const handleChange = (field, value) => {
      setFieldValue(`previousEmployers.${index}.${field}`, value);
  };

  return (
    <div className={styles.container}>
        <div className={styles.block}>
          <div className={styles.form_grid}>
            <InputBox
              label="Company Name"
              value={item.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
            <InputBox
              label="Designation"
              value={item.designation}
              onChange={(e) => handleChange("designation", e.target.value)}
            />
            <InputBox
              label="From Date"
              type="date"
              value={item.fromDate}
              onChange={(e) => handleChange("fromDate", e.target.value)}
            />
            <InputBox
              label="To Date"
              type="date"
              value={item.toDate}
              onChange={(e) => handleChange("toDate", e.target.value)}
            />
            <InputBox
              label="Leaving Reason"
              value={item.leavingReason}
              onChange={(e) => handleChange("leavingReason", e.target.value)}
            />
            <InputBox
              label="Address Line 1"
              value={item.companyAddressLine1}
              onChange={(e) => handleChange("companyAddressLine1", e.target.value)}
            />
            <InputBox
              label="Nature of Duties"
              value={item.natureOfDuties}
              onChange={(e) => handleChange("natureOfDuties", e.target.value)}
            />
            <InputBox
              label="Gross Salary (Monthly)"
              value={item.grossSalaryPerMonth}
              onChange={(e) => handleChange("grossSalaryPerMonth", e.target.value)}
              type="number"
            />
            <InputBox
              label="CTC"
              value={item.ctc}
              onChange={(e) => handleChange("ctc", e.target.value)}
              type="number"
            />
          </div>

          <div className={styles.upload_row}>
            <button type="button" className={styles.upload_btn}>
              Upload Document (Skipped)
            </button>
          </div>
          
          <div style={{marginTop: '20px', textAlign: 'right'}}>
             <button onClick={submitForm} className={styles.save_btn}>Save Changes</button>
          </div>
        </div>
    </div>
  );
};

export default PreviousEmpUpdate;