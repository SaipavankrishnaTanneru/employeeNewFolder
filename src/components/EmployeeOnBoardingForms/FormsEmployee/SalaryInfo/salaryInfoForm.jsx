import React, { forwardRef, useImperativeHandle } from "react";
import { FormikProvider } from "formik";
import styles from "./SalaryInfoForm.module.css";

import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import dividerline from "assets/EmployeeOnBoarding/dividerline.svg"; 

// 1. Import Logic Hook & API Hooks
import { useSalaryInfoFormik } from "hooks/useSalaryInfoFormik"; // Adjust path if needed
import { 
  useGrades, 
  useCostCenters, 
  useStructures, 
  useOrganizations 
} from "api/onBoardingForms/postApi/useSalaryQueries";

const SalaryInfoForm = forwardRef(({ tempId, onSuccess, role }, ref) => {
  
  // 2. Initialize Logic Hook
  const { formik } = useSalaryInfoFormik({ tempId, onSuccess, role });
  const { values, setFieldValue, handleChange, submitForm } = formik;

  // 3. Expose submitForm to parent (EditPopup)
  useImperativeHandle(ref, () => ({
    submitForm: () => submitForm(),
  }));

  // 4. Fetch Dropdowns
  const { data: grades = [] } = useGrades();
  const { data: costCenters = [] } = useCostCenters();
  const { data: structures = [] } = useStructures();
  const { data: organizations = [] } = useOrganizations();

  // 5. Helper: Handle Dropdown Change (Save ID, Display Name)
  const handleDropdownChange = (field, list, e) => {
    const selectedName = e.target.value;
    const item = list.find((x) => 
       (x.name === selectedName) || 
       (x.organizationName === selectedName) ||
       (x.gradeName === selectedName) ||
       (x.costCenterName === selectedName) ||
       (x.structureName === selectedName)
    );
    // Extract correct ID property
    const id = item ? (item.id || item.organizationId || item.gradeId || item.costCenterId || item.structureId) : "";
    setFieldValue(field, id);
  };

  // 6. Helper: Get Name by ID for Dropdown Value
  const getNameById = (id, list) => {
    if (!id) return "";
    const item = list.find((x) => 
      String(x.id || x.organizationId || x.gradeId || x.costCenterId || x.structureId) === String(id)
    );
    return item ? (item.name || item.organizationName || item.gradeName || item.costCenterName || item.structureName) : "";
  };

  // 7. Helper: Checkbox Handler
  const handleCheckbox = (field, e) => {
    // FormCheckBox might return value directly or event
    const val = e?.target ? e.target.checked : e;
    setFieldValue(field, val);
  };

  return (
    <div className={styles.container}>
      <FormikProvider value={formik}>
        <form className={styles.form}>
          
          {/* --- SALARY INFO --- */}
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Salary Info</h3>
            <img src={dividerline} alt="divider" className={styles.divider} />
          </div>

          <div className={styles.grid}>
            <Inputbox
              label="Monthly CTC"
              name="monthlyTakeHome"
              placeholder="Enter CTC"
              value={values.monthlyTakeHome}
              onChange={handleChange}
              type="number"
            />

            <Inputbox
              label="CTC In Words"
              name="ctcWords"
              placeholder="CTC in Words"
              value={values.ctcWords}
              onChange={handleChange}
            />

            <Inputbox
              label="Yearly CTC"
              name="yearlyCtc"
              placeholder="Yearly CTC"
              value={values.yearlyCtc}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className={styles.grid}>
            <Dropdown
              dropdownname="Grade"
              name="gradeId"
              results={grades.map(x => x.name || x.gradeName)}
              value={getNameById(values.gradeId, grades)}
              onChange={(e) => handleDropdownChange("gradeId", grades, e)}
            />

            <Dropdown
              dropdownname="Structure"
              name="empStructureId"
              results={structures.map(x => x.name || x.structureName)}
              value={getNameById(values.empStructureId, structures)}
              onChange={(e) => handleDropdownChange("empStructureId", structures, e)}
            />

            <Dropdown
              dropdownname="Cost Center"
              name="costCenterId"
              results={costCenters.map(x => x.name || x.costCenterName)}
              value={getNameById(values.costCenterId, costCenters)}
              onChange={(e) => handleDropdownChange("costCenterId", costCenters, e)}
            />
          </div>

          <div className={styles.singleRow}>
            <Dropdown
              dropdownname="Company Name"
              name="orgId"
              results={organizations.map(x => x.organizationName || x.name)}
              value={getNameById(values.orgId, organizations)}
              onChange={(e) => handleDropdownChange("orgId", organizations, e)}
            />
          </div>

          {/* --- PF INFO --- */}
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>PF Info</h3>
            <img src={dividerline} alt="divider" className={styles.divider} />
          </div>

          <div className={styles.checkboxRow}>
            <div className={styles.checkboxItem}>
              <FormCheckbox
                name="isPfEligible"
                checked={values.isPfEligible}
                onChange={(e) => handleCheckbox("isPfEligible", e)}
              />
              <span>Include in PF Scheme</span>
            </div>

            <div className={styles.checkboxItem}>
              <FormCheckbox
                name="isEsiEligible"
                checked={values.isEsiEligible}
                onChange={(e) => handleCheckbox("isEsiEligible", e)}
              />
              <span>Include in ESI Scheme</span>
            </div>
          </div>

          {/* Conditional Fields */}
          <div className={styles.grid}>
            <Inputbox
              label="PF Number"
              name="pfNo"
              placeholder="Enter PF Number"
              value={values.pfNo}
              onChange={handleChange}
              disabled={!values.isPfEligible} // Disable if unchecked
            />

            <Inputbox
              label="ESI Number"
              name="esiNo"
              placeholder="Enter ESI Number"
              value={values.esiNo}
              onChange={handleChange}
              disabled={!values.isEsiEligible} // Disable if unchecked
            />

            <Inputbox
              label="PF Join Date"
              name="pfJoinDate"
              type="date"
              value={values.pfJoinDate}
              onChange={handleChange}
              disabled={!values.isPfEligible} // Disable if unchecked
            />
          </div>

          <div className={styles.singleRow}>
            <Inputbox
              label="UAN Number"
              name="uanNo"
              placeholder="Enter UAN Number"
              value={values.uanNo}
              onChange={handleChange}
              type="number"
              disabled={!values.isPfEligible} // Disable if unchecked
            />
          </div>

        </form>
      </FormikProvider>
    </div>
  );
});

export default SalaryInfoForm;