import React from "react";
import { Form, FormikProvider } from "formik";
import styles from "./AddSalaryDetails.module.css";
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import dividerline from 'assets/EmployeeOnBoarding/dividerline.svg';
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox';
import OnboardingFooter from "../OnBoardingEmployeeFooter/OnboardingFooter";
import { useParams } from "react-router-dom";

import { useSalaryInfoFormik } from "hooks/useSalaryInfoFormik";
import { 
  useGrades, 
  useCostCenters, 
  useStructures, 
  useOrganizations 
} from "api/onBoardingForms/postApi/useSalaryQueries";

const AddSalaryDetails = ({ onBack, onSubmitComplete, role }) => {
  const { employeeId } = useParams();
  const tempId = employeeId; 
  
  const { data: grades = [] } = useGrades();
  const { data: structures = [] } = useStructures();
  const { data: costCenters = [] } = useCostCenters();
  const { data: organizations = [] } = useOrganizations();

  // 1. Hook handles logic: For DO, it passes data to onSuccess; For others, it posts.
  const { formik } = useSalaryInfoFormik({ 
    tempId, 
    onSuccess: (data) => {
        // Pass data (payload) to the parent handler
        if (onSubmitComplete) onSubmitComplete(data);
    },
    role: role
  });

  const { values, setFieldValue, handleSubmit, isSubmitting } = formik;
  const salarySteps = [{ label: "Salary Details" }];

  const getName = (selectedId, list) => list.find(item => item.id === Number(selectedId))?.name || "";
  const getId = (selectedName, list) => list.find(item => item.name === selectedName)?.id || "";

  return (
    <div className={styles.bank_info_container}>
      <FormikProvider value={formik}>
        <Form className={styles.form_grid} onSubmit={handleSubmit}>
          
          {/* ... [Input Fields Same as Before] ... */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Salary Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.form_group}>
            <div className={styles.form_item}>
              <Inputbox label="Monthly Take Home" name="monthlyTakeHome" placeholder="Enter Amount" value={values.monthlyTakeHome} onChange={(e) => setFieldValue("monthlyTakeHome", e.target.value)} />
            </div>
            <div className={styles.form_item}>
              <Inputbox label="Yearly CTC" name="yearlyCtc" placeholder="Enter Amount" value={values.yearlyCtc} onChange={(e) => setFieldValue("yearlyCtc", e.target.value)} />
            </div>
            <div className={styles.form_item}>
              <Inputbox label="CTC In Words" name="ctcWords" placeholder="Rupees..." value={values.ctcWords} onChange={(e) => setFieldValue("ctcWords", e.target.value)} />
            </div>
          </div>

          <div className={styles.form_group}>
            <div className={styles.form_item}>
              <Dropdown dropdownname="Grade" value={getName(values.gradeId, grades)} results={grades.map(g => g.name)} onChange={(e) => setFieldValue("gradeId", getId(e.target.value, grades))} />
            </div>
            <div className={styles.form_item}>
              <Dropdown dropdownname="Structure" value={getName(values.empStructureId, structures)} results={structures.map(s => s.name)} onChange={(e) => setFieldValue("empStructureId", getId(e.target.value, structures))} />
            </div>
            <div className={styles.form_item}>
              <Dropdown dropdownname="Cost Center" value={getName(values.costCenterId, costCenters)} results={costCenters.map(c => c.name)} onChange={(e) => setFieldValue("costCenterId", getId(e.target.value, costCenters))} />
            </div>
          </div>

          <div className={styles.form_group}>
            <div className={styles.form_item}>
              <Dropdown dropdownname="Company Name" value={getName(values.orgId, organizations)} results={organizations.map(o => o.name)} onChange={(e) => setFieldValue("orgId", getId(e.target.value, organizations))} />
            </div>
          </div>

          <div className={styles.section_header}>
            <h3 className={styles.section_title}>PF & ESI Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.checkbox_row}>
            <div className={styles.checkbox_item}>
              <FormCheckbox name="isPfEligible" checked={values.isPfEligible} onChange={(val) => setFieldValue("isPfEligible", val)} />
              <span className={styles.checkbox_label}>Include in PF Scheme</span>
            </div>
            <div className={styles.checkbox_item}>
              <FormCheckbox name="isEsiEligible" checked={values.isEsiEligible} onChange={(val) => setFieldValue("isEsiEligible", val)} />
              <span className={styles.checkbox_label}>Include in ESI Scheme</span>
            </div>
          </div>

          {values.isPfEligible && (
            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox label="PF Number" name="pfNo" placeholder="Enter PF Number" value={values.pfNo} onChange={(e) => setFieldValue("pfNo", e.target.value)} />
              </div>
              <div className={styles.form_item}>
                <Inputbox label="UAN Number" name="uanNo" placeholder="Enter UAN" value={values.uanNo} onChange={(e) => setFieldValue("uanNo", e.target.value)} />
              </div>
              <div className={styles.form_item}>
                <Inputbox label="PF Join Date" name="pfJoinDate" type="date" value={values.pfJoinDate} onChange={(e) => setFieldValue("pfJoinDate", e.target.value)} />
              </div>
            </div>
          )}

          {values.isEsiEligible && (
            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox label="ESI Number" name="esiNo" placeholder="Enter ESI Number" value={values.esiNo} onChange={(e) => setFieldValue("esiNo", e.target.value)} />
              </div>
            </div>
          )}

          <OnboardingFooter
            currentStep={0} 
            totalSteps={1}
            onBack={onBack}
            onFinish={handleSubmit} 
            allSteps={salarySteps}
            isSubmitting={isSubmitting}
           primaryButtonLabel={role?.toUpperCase() === "DO" ? "Proceed to Checklist" : "Submit"}
            hideSkip={true}
            onNext={() => {}} 
          />
        </Form>
      </FormikProvider>
    </div>
  );
};

export default AddSalaryDetails;