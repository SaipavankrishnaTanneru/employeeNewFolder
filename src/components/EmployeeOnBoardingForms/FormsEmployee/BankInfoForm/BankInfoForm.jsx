// components/EmployeeOnBoardingForms/FormsEmployee/BankInfoForm/BankInfoForm.jsx

import React, { forwardRef, useImperativeHandle } from "react";
import { FormikProvider } from "formik";
import styles from "./BankInfo.module.css";

// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox"; // Ensure correct import path

// Hooks
import { useBankInfoFormik } from "../../../../hooks/useBankInfoFormik";
import { 
  usePaymentTypes, 
  useActiveBanks, 
  useBranchesByBank 
} from "api/onBoardingForms/postApi/useBankQueries";

const BankInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Init Formik
  const { formik } = useBankInfoFormik({ tempId, onSuccess });
  const { values, setFieldValue, handleChange } = formik;

  // 2. Expose Submit
  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  // 3. Fetch Dropdown Data
  const { data: paymentTypes = [] } = usePaymentTypes();
  const { data: banks = [] } = useActiveBanks();
  
  // Dependent Query: Branches depend on selected Bank ID
  const { data: branches = [] } = useBranchesByBank(values.bankId);

  // --- HANDLERS ---

  const handlePaymentTypeChange = (e) => {
    const name = e.target.value;
    const item = paymentTypes.find((x) => x.name === name);
    setFieldValue("paymentTypeId", item ? item.id : "");
  };

  const handleBankChange = (e) => {
    const name = e.target.value;
    const item = banks.find((x) => x.name === name);
    
    // Set Bank ID
    const newBankId = item ? item.id : "";
    setFieldValue("bankId", newBankId);
    
    // Also sync Salary Account Bank ID if logic dictates
    setFieldValue("salaryAccount.bankId", newBankId);

    // RESET Branch when Bank changes
    setFieldValue("bankBranchId", "");
    setFieldValue("bankBranchName", "");
  };

  const handleBranchChange = (e) => {
    const name = e.target.value;
    const item = branches.find((x) => x.name === name);
    setFieldValue("bankBranchId", item ? item.id : "");
    setFieldValue("bankBranchName", name); // Store name string for payload
  };

  const handleCheckbox = (e) => {
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue("salaryLessThan40000", isChecked);
  };

  // Helper to display Name based on ID
  const getNameById = (id, list) => list.find((x) => x.id == id)?.name || "";

  return (
    <div className={styles.bank_info_container}>
      <FormikProvider value={formik}>
        <form>
          
          {/* ================= SECTION 1: GENERAL BANK INFO ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Bank Information</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.form_group}>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Payment Type"
                name="paymentTypeId"
                results={paymentTypes.map(x => x.name)}
                value={getNameById(values.paymentTypeId, paymentTypes)}
                onChange={handlePaymentTypeChange}
              />
            </div>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Bank Name"
                name="bankId"
                results={banks.map(x => x.name)}
                value={getNameById(values.bankId, banks)}
                onChange={handleBankChange}
              />
            </div>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Bank Branch"
                name="bankBranchId"
                results={branches.map(x => x.name)}
                value={getNameById(values.bankBranchId, branches)}
                onChange={handleBranchChange}
                disabled={!values.bankId} // Disable if no bank selected
              />
            </div>
          </div>

          {/* ================= SECTION 2: PERSONAL ACCOUNT ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Personal Account Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.checkbox_item}>
             <FormCheckbox
                name="salaryLessThan40000"
                checked={values.salaryLessThan40000}
                onChange={handleCheckbox}
             />
             <span className={styles.checkbox_label}>Salary Less Than 40,000</span>
          </div>

          <div className={styles.form_group}>
             <div className={styles.form_item}>
                <Inputbox
                   label="Personal Bank Name"
                   name="personalAccount.bankName"
                   value={values.personalAccount.bankName}
                   onChange={handleChange}
                   placeholder="Enter Bank Name"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="Account Holder Name"
                   name="personalAccount.accountHolderName"
                   value={values.personalAccount.accountHolderName}
                   onChange={handleChange}
                   placeholder="Enter Holder Name"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="Account No"
                   name="personalAccount.accountNo"
                   value={values.personalAccount.accountNo}
                   onChange={handleChange}
                   placeholder="Enter Account No"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="IFSC Code"
                   name="personalAccount.ifscCode"
                   value={values.personalAccount.ifscCode}
                   onChange={handleChange}
                   placeholder="Enter IFSC"
                />
             </div>
          </div>

          {/* ================= SECTION 3: SALARY ACCOUNT ================= */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Salary Account Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.form_group}>
             <div className={styles.form_item}>
                <Inputbox
                   label="Salary Account Holder"
                   name="salaryAccount.accountHolderName"
                   value={values.salaryAccount.accountHolderName}
                   onChange={handleChange}
                   placeholder="Enter Name"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="Salary Account No"
                   name="salaryAccount.accountNo"
                   value={values.salaryAccount.accountNo}
                   onChange={handleChange}
                   placeholder="Enter Account No"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="IFSC Code"
                   name="salaryAccount.ifscCode"
                   value={values.salaryAccount.ifscCode}
                   onChange={handleChange}
                   placeholder="Enter IFSC"
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox
                   label="Payable At"
                   name="salaryAccount.payableAt"
                   value={values.salaryAccount.payableAt}
                   onChange={handleChange}
                   placeholder="City Name"
                />
             </div>
          </div>

        </form>
      </FormikProvider>
    </div>
  );
});

export default BankInfo;