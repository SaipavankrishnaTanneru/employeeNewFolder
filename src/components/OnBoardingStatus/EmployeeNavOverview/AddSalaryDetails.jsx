import React from "react";
import { Formik, Form } from "formik";
import styles from "./AddSalaryDetails.module.css";
import Dropdown from 'widgets/Dropdown/Dropdown';
import Inputbox from 'widgets/Inputbox/InputBox';
import dividerline from 'assets/EmployeeOnBoarding/dividerline.svg';
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox';
import OnboardingFooter from "../OnBoardingEmployeeFooter/OnboardingFooter";

const AddSalaryDetails = ({ onBack, onSubmitComplete }) => {
  const initialValues = {
    monthlyCTC: "",
    ctcInWords: "",
    yearlyCTC: "",
    grade: "",
    structure: "",
    costCenter: "",
    companyName: "",
    includePF: false,
    includeESI: false,
    pfNumber: "",
    esiNumber: "",
    uanNumber: "",
    pfJoinDate: "",
  };

  const gradeOptions = ["Select Grade", "A", "B", "C"];
  const structureOptions = ["Select Structure", "Standard", "Custom"];
  const costCenterOptions = ["Select Cost Center", "Finance", "HR", "Tech"];

  const salarySteps = [{ label: "Salary Details" }];

  const handleSalarySubmit = (values, { setSubmitting }) => {
    console.log("✅ Salary Info Submitted:", values);
    setSubmitting(false);

    if (onSubmitComplete) {
      console.log("✅ Calling onSubmitComplete()");
      onSubmitComplete(); // trigger checklist navigation
    } else {
      console.warn("❌ onSubmitComplete is undefined");
    }
  };

  return (
    <div className={styles.bank_info_container}>
      <Formik initialValues={initialValues} onSubmit={handleSalarySubmit}>
        {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
          <Form className={styles.form_grid}>
            {/* ===================== SALARY INFO ===================== */}
            <div className={styles.section_header}>
              <h3 className={styles.section_title}>Salary Info</h3>
              <img src={dividerline} alt="divider" className={styles.dividerImage} />
            </div>

            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox
                  label="Monthly CTC"
                  id="monthlyCTC"
                  name="monthlyCTC"
                  placeholder="Enter CTC"
                  value={values.monthlyCTC}
                  onChange={(e) => setFieldValue("monthlyCTC", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Inputbox
                  label="CTC In Words"
                  id="ctcInWords"
                  name="ctcInWords"
                  placeholder="CTC in Words"
                  value={values.ctcInWords}
                  onChange={(e) => setFieldValue("ctcInWords", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Inputbox
                  label="Yearly CTC"
                  id="yearlyCTC"
                  name="yearlyCTC"
                  placeholder="Yearly CTC"
                  value={values.yearlyCTC}
                  onChange={(e) => setFieldValue("yearlyCTC", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Dropdown
                  dropdownname="Grade"
                  name="grade"
                  results={gradeOptions}
                  value={values.grade}
                  onChange={(e) => setFieldValue("grade", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Dropdown
                  dropdownname="Structure"
                  name="structure"
                  results={structureOptions}
                  value={values.structure}
                  onChange={(e) => setFieldValue("structure", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Dropdown
                  dropdownname="Cost Center"
                  name="costCenter"
                  results={costCenterOptions}
                  value={values.costCenter}
                  onChange={(e) => setFieldValue("costCenter", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox
                  label="Company Name"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter Company Name"
                  value={values.companyName}
                  onChange={(e) => setFieldValue("companyName", e.target.value)}
                />
              </div>
            </div>

            {/* ===================== PF INFO ===================== */}
            <div className={styles.section_header}>
              <h3 className={styles.section_title}>PF Info</h3>
              <img src={dividerline} alt="divider" className={styles.dividerImage} />
            </div>

            <div className={styles.checkbox_row}>
              <div className={styles.checkbox_item}>
                <FormCheckbox
                  name="includePF"
                  checked={values.includePF}
                  onChange={(val) => setFieldValue("includePF", val)}
                />
                <span className={styles.checkbox_label}>Include in PF Scheme</span>
              </div>

              <div className={styles.checkbox_item}>
                <FormCheckbox
                  name="includeESI"
                  checked={values.includeESI}
                  onChange={(val) => setFieldValue("includeESI", val)}
                />
                <span className={styles.checkbox_label}>Include in ESI Scheme</span>
              </div>
            </div>

            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox
                  label="PF Number"
                  id="pfNumber"
                  name="pfNumber"
                  placeholder="Enter PF Number"
                  value={values.pfNumber}
                  onChange={(e) => setFieldValue("pfNumber", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Inputbox
                  label="ESI Number"
                  id="esiNumber"
                  name="esiNumber"
                  placeholder="Enter ESI Number"
                  value={values.esiNumber}
                  onChange={(e) => setFieldValue("esiNumber", e.target.value)}
                />
              </div>

              <div className={styles.form_item}>
                <Inputbox
                  label="PF Join Date"
                  id="pfJoinDate"
                  name="pfJoinDate"
                  type="date"
                  placeholder="Select Date"
                  value={values.pfJoinDate}
                  onChange={(e) => setFieldValue("pfJoinDate", e.target.value)}
                />
              </div>
            </div>

            <div className={styles.form_group}>
              <div className={styles.form_item}>
                <Inputbox
                  label="Enter UAN Number"
                  id="uanNumber"
                  name="uanNumber"
                  placeholder="Enter UAN Number"
                  value={values.uanNumber}
                  onChange={(e) => setFieldValue("uanNumber", e.target.value)}
                />
              </div>
            </div>

            {/* ===================== FOOTER ===================== */}
            <OnboardingFooter
              currentStep={1}
              totalSteps={1}
              onNext={() => {}}
              onBack={onBack}
              onFinish={handleSubmit} // ✅ FIXED
              allSteps={salarySteps}
              isSubmitting={isSubmitting}
              primaryButtonLabel={isSubmitting ? "Processing..." : "Proceed to Checklist"}
              hideSkip={true}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSalaryDetails;
