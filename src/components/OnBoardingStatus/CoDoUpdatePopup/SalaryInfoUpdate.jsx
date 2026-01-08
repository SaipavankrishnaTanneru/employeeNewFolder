import React, { useEffect } from "react";
import styles from "./SalaryInfoUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox"; // Ensure you have this

// 1. Reusing Logic Hook
import { useSalaryInfoFormik } from "hooks/useSalaryInfoFormik";
import { 
    useSalaryDetails, 
    useGrades, 
    useCostCenters, 
    useStructures, 
    useOrganizations 
} from "api/onBoardingForms/postApi/useSalaryQueries";

const SalaryInfoUpdate = ({ tempId, onSuccess }) => {
  
  // Init Formik (passing 'DO' role logic or empty if update behaves like DO)
  const { formik } = useSalaryInfoFormik({ tempId, onSuccess, role: "DO_UPDATE" }); 
  const { values, setFieldValue, handleChange, submitForm } = formik;

  // Fetch Master Data for Dropdowns
  const { data: grades = [] } = useGrades();
  const { data: structures = [] } = useStructures();
  const { data: costCenters = [] } = useCostCenters();
  const { data: organizations = [] } = useOrganizations();

  // Fetch Current Data to Pre-fill
  const { data: savedData } = useSalaryDetails(tempId);

  useEffect(() => {
    if (savedData) {
        setFieldValue("monthlyTakeHome", savedData.monthlyTakeHome || "");
        setFieldValue("yearlyCtc", savedData.yearlyCtc || "");
        setFieldValue("ctcWords", savedData.ctcWords || "");
        setFieldValue("gradeId", savedData.gradeId || "");
        setFieldValue("empStructureId", savedData.empStructureId || "");
        setFieldValue("costCenterId", savedData.costCenterId || "");
        setFieldValue("orgId", savedData.orgId || "");
        
        setFieldValue("isPfEligible", !!savedData.isPfEligible);
        setFieldValue("isEsiEligible", !!savedData.isEsiEligible);
        
        setFieldValue("pfNo", savedData.pfNo || "");
        setFieldValue("esiNo", savedData.esiNo || "");
        setFieldValue("uanNo", savedData.uanNo || "");
        setFieldValue("pfJoinDate", savedData.pfJoinDate ? savedData.pfJoinDate.split('T')[0] : "");
    }
  }, [savedData, setFieldValue]);

  // Helpers for Dropdowns
  const getName = (id, list) => list.find(x => x.id === Number(id))?.name || "";
  const getId = (name, list) => list.find(x => x.name === name)?.id || "";

  return (
    <div className={styles.container}>
      {/* ================= Salary Info ================= */}
      <h4 className={styles.section_title}>Salary Info</h4>

      <div className={styles.form_grid}>
        <InputBox
          label="Monthly CTC"
          value={values.monthlyTakeHome}
          onChange={handleChange("monthlyTakeHome")}
        />
        <InputBox
          label="CTC in Words"
          value={values.ctcWords}
          onChange={handleChange("ctcWords")}
        />
        <InputBox
          label="Yearly CTC"
          value={values.yearlyCtc}
          onChange={handleChange("yearlyCtc")}
        />

        <Dropdown
          dropdownname="Grade"
          value={getName(values.gradeId, grades)}
          results={grades.map(g => g.name)}
          onChange={(e) => setFieldValue("gradeId", getId(e.target.value, grades))}
        />

        <Dropdown
          dropdownname="Structure"
          value={getName(values.empStructureId, structures)}
          results={structures.map(s => s.name)}
          onChange={(e) => setFieldValue("empStructureId", getId(e.target.value, structures))}
        />

        <Dropdown
          dropdownname="Cost Center"
          value={getName(values.costCenterId, costCenters)}
          results={costCenters.map(c => c.name)}
          onChange={(e) => setFieldValue("costCenterId", getId(e.target.value, costCenters))}
        />

        <Dropdown
          dropdownname="Company Name"
          value={getName(values.orgId, organizations)}
          results={organizations.map(o => o.name)}
          onChange={(e) => setFieldValue("orgId", getId(e.target.value, organizations))}
        />
      </div>

      {/* ================= PF Info ================= */}
      <h4 className={styles.section_title}>PF Info</h4>

      <div className={styles.checkbox_row}>
         <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <FormCheckbox checked={values.isPfEligible} onChange={(val) => setFieldValue("isPfEligible", val)} />
            <span>Include in PF Scheme</span>
         </div>
         <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
            <FormCheckbox checked={values.isEsiEligible} onChange={(val) => setFieldValue("isEsiEligible", val)} />
            <span>Include in ESI Scheme</span>
         </div>
      </div>

      {(values.isPfEligible || values.isEsiEligible) && (
          <div className={styles.form_grid} style={{marginTop: '15px'}}>
            {values.isPfEligible && (
                <>
                    <InputBox
                      label="PF Number"
                      value={values.pfNo}
                      onChange={handleChange("pfNo")}
                    />
                    <InputBox
                      label="UAN Number"
                      value={values.uanNo}
                      onChange={handleChange("uanNo")}
                    />
                    <InputBox
                      label="PF Join Date"
                      type="date"
                      value={values.pfJoinDate}
                      onChange={handleChange("pfJoinDate")}
                    />
                </>
            )}
            {values.isEsiEligible && (
                <InputBox
                  label="ESI Number"
                  value={values.esiNo}
                  onChange={handleChange("esiNo")}
                />
            )}
          </div>
      )}
      
      <div style={{marginTop: '20px', textAlign: 'right'}}>
         <button onClick={submitForm} className={styles.save_btn}>Save Changes</button>
      </div>
    </div>
  );
};

export default SalaryInfoUpdate;