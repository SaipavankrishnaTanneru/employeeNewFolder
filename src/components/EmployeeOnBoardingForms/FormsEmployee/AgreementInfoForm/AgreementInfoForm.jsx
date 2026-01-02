// components/EmployeeOnBoardingForms/FormsEmployee/AgreementInfoForm/AgreementInfoForm.jsx

import React, { forwardRef, useImperativeHandle } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "./AgreementInfoForm.module.css";

// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox";
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";

// Logic & API Hooks
import { useAgreementInfoFormik } from "../../../../hooks/useAgreementInfoFormik";
import { useActiveOrganizations } from "api/onBoardingForms/postApi/useAgreementQueries";

const AgreementInfoForm = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Init Formik Logic
  const { formik, initialCheque } = useAgreementInfoFormik({ tempId, onSuccess });
  const { values, handleChange, setFieldValue } = formik;

  // 2. Expose Submit
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // 3. Fetch Organizations
  const { data: organizations = [] } = useActiveOrganizations();

  // Handlers
  const handleOrgChange = (e) => {
    const name = e.target.value;
    // Adjust key if API returns 'organizationName' or just 'name'
    const item = organizations.find((x) => x.organizationName === name || x.name === name);
    setFieldValue("agreementOrgId", item ? item.organizationId || item.id : "");
  };

  const handleCheckbox = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue("isCheckSubmit", isChecked);
  };

const getOrgName = (id) => {
  if (!id) return "";

  const normalizedId = Number(id);

  const item = organizations.find(
    x => Number(x.organizationId ?? x.id) === normalizedId
  );

  return item ? (item.organizationName || item.name) : "";
};

  return (
    <div className={styles.formContainer}>
      <FormikProvider value={formik}>
        <form>
          
          {/* ================= AGREEMENT INFO ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Agreement Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.formGridTwo}>
             {/* 1. Agreement Company (Organization) */}
             <div className={styles.cell}>
                <Dropdown
                   dropdownname="Agreement Company"
                   name="agreementOrgId"
                   // Adjust map based on actual API response keys
                   results={organizations.map(x => x.organizationName || x.name)}
                   value={getOrgName(values.agreementOrgId)}
                   onChange={handleOrgChange}
                />
             </div>

             {/* 2. Agreement Type */}
             <div className={styles.cell}>
                <Inputbox
                   label="Agreement Type"
                   name="agreementType"
                   value={values.agreementType}
                   onChange={handleChange}
                   placeholder="Enter Agreement Type"
                />
             </div>

             {/* 3. Category */}
            
          </div>


          {/* ================= CHEQUE INFO ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Cheque Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.checkboxContainer}>
             <FormCheckbox
                name="isCheckSubmit"
                checked={values.isCheckSubmit}
                onChange={handleCheckbox}
             />
             <span className={styles.checkbox_label}>Provided Cheque?</span>
          </div>

          {/* DYNAMIC CHEQUES */}
          <FieldArray name="chequeDetails">
            {({ push, remove, replace }) => (
              <>
                {values.chequeDetails.map((cheque, index) => (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Cheque ${index + 1}`}
                    enableFieldset={true}
                    showSimpleTitle={false}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialCheque)}
                  >
                    <div className={styles.formGridThree}>
                       
                       <div className={styles.cell}>
                          <Inputbox
                             label="Cheque No"
                             name={`chequeDetails.${index}.chequeNo`}
                             value={cheque.chequeNo}
                             onChange={handleChange}
                             placeholder="Enter Cheque No"
                             type="number"
                          />
                       </div>

                       <div className={styles.cell}>
                          <Inputbox
                             label="Bank Name"
                             name={`chequeDetails.${index}.chequeBankName`}
                             value={cheque.chequeBankName}
                             onChange={handleChange}
                             placeholder="Enter Bank Name"
                          />
                       </div>

                       <div className={styles.cell}>
                          <Inputbox
                             label="IFSC Code"
                             name={`chequeDetails.${index}.chequeBankIfscCode`}
                             value={cheque.chequeBankIfscCode}
                             onChange={handleChange}
                             placeholder="Enter IFSC Code"
                          />
                       </div>

                    </div>
                  </AddFieldWidget>
                ))}

                <div className={styles.addButtonContainer}>
                  <button 
                    type="button" 
                    className={styles.addButton} 
                    onClick={() => push(initialCheque)}
                  >
                    + Add Cheque
                  </button>
                </div>
              </>
            )}
          </FieldArray>

        </form>
      </FormikProvider>
    </div>
  );
});

export default AgreementInfoForm;