import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormikProvider } from "formik";
import styles from "./BankInfo.module.css";

// Assets & Widgets
import dividerline from 'assets/Qualification/border.svg';
import Dropdown from "widgets/Dropdown/Dropdown";
import Inputbox from "widgets/Inputbox/InputBox";
import FormCheckbox from "widgets/FormCheckBox/FormCheckBox"; 
import FormValidationAlert from "utils/FormValidationAlert"; // 1. Import Alert

// Hooks
import { useBankInfoFormik } from "../../../../hooks/useBankInfoFormik";
import { 
  usePaymentTypes, 
  useActiveBanks, 
  useBranchesByBank 
} from "api/onBoardingForms/postApi/useBankQueries";

const BankInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  const { data: paymentTypes = [] } = usePaymentTypes();
  const { data: banks = [] } = useActiveBanks();

  const { formik, savedData } = useBankInfoFormik({ 
    tempId, 
    onSuccess,
    dropdownData: { paymentTypes, banks, branches: [] } 
  });
  
  // 2. Destructure Errors & Touched
  const { values, setFieldValue, handleChange, errors, touched } = formik;
  const { data: branches = [] } = useBranchesByBank(values.bankId);

  useEffect(() => {
      if (savedData && branches.length > 0 && !values.bankBranchId) {
          if(savedData.bankBranchId) {
              setFieldValue("bankBranchId", savedData.bankBranchId);
          } else if (savedData.bankBranchName) {
              const found = branches.find(b => b.name === savedData.bankBranchName);
              if(found) setFieldValue("bankBranchId", found.id);
          }
      }
  }, [savedData, branches, values.bankBranchId, setFieldValue]);

  useImperativeHandle(ref, () => ({
    submitForm: () => formik.submitForm(),
  }));

  const getNameById = (id, list) => list.find((x) => Number(x.id) === Number(id))?.name || "";

  const handlePaymentTypeChange = (e) => {
    const name = e.target.value;
    const item = paymentTypes.find((x) => x.name === name);
    setFieldValue("paymentTypeId", item ? item.id : "");
  };

  const handleBankChange = (e) => {
    const name = e.target.value;
    const item = banks.find((x) => x.name === name);
    const newBankId = item ? item.id : "";
    
    setFieldValue("bankId", newBankId);
    setFieldValue("salaryAccount.bankId", newBankId); 
    setFieldValue("bankBranchId", "");
    setFieldValue("bankBranchName", "");
  };

  const handleBranchChange = (e) => {
    const name = e.target.value;
    const item = branches.find((x) => x.name === name);
    setFieldValue("bankBranchId", item ? item.id : "");
    setFieldValue("bankBranchName", name); 
    
    if(item?.ifscCode) {
        setFieldValue("salaryAccount.ifscCode", item.ifscCode);
    }
  };

  const handleCheckbox = (checked) => {
    const val = checked?.target ? checked.target.checked : checked;
    setFieldValue("salaryLessThan40000", val);
  };

  // Helper for deeply nested errors (e.g., personalAccount.bankName)
  const getError = (objName, fieldName) => {
    return touched[objName]?.[fieldName] && errors[objName]?.[fieldName];
  };

  return (
    <div className={styles.bank_info_container}>
      <FormikProvider value={formik}>
        {/* 3. Validation Alert */}
        <FormValidationAlert />

        <form>
          
          {/* GENERAL BANK INFO */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Bank Information</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.form_group}>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Payment Type *"
                name="paymentTypeId"
                results={paymentTypes.map(x => x.name)}
                value={getNameById(values.paymentTypeId, paymentTypes)}
                onChange={handlePaymentTypeChange}
                error={touched.paymentTypeId && errors.paymentTypeId}
              />
            </div>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Bank Name *"
                name="bankId"
                results={banks.map(x => x.name)}
                value={getNameById(values.bankId, banks)}
                onChange={handleBankChange}
                error={touched.bankId && errors.bankId}
              />
            </div>
            <div className={styles.form_item}>
              <Dropdown
                dropdownname="Bank Branch *"
                name="bankBranchId"
                results={branches.map(x => x.name)}
                value={getNameById(values.bankBranchId, branches)}
                onChange={handleBranchChange}
                disabled={!values.bankId}
                error={touched.bankBranchId && errors.bankBranchId}
              />
            </div>
          </div>

          {/* PERSONAL ACCOUNT */}
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
                {/* 4. Conditional Asterisks based on Checkbox */}
                <Inputbox 
                  label={values.salaryLessThan40000 ? "Personal Bank Name *" : "Personal Bank Name"} 
                  name="personalAccount.bankName" 
                  value={values.personalAccount.bankName} 
                  onChange={handleChange} 
                  placeholder="Enter Bank Name"
                  error={getError('personalAccount', 'bankName')}
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label={values.salaryLessThan40000 ? "Account Holder Name *" : "Account Holder Name"} 
                  name="personalAccount.accountHolderName" 
                  value={values.personalAccount.accountHolderName} 
                  onChange={handleChange} 
                  placeholder="Enter Holder Name" 
                  error={getError('personalAccount', 'accountHolderName')}
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label={values.salaryLessThan40000 ? "Account No *" : "Account No"} 
                  name="personalAccount.accountNo" 
                  value={values.personalAccount.accountNo} 
                  onChange={handleChange} 
                  placeholder="Enter Account No" 
                  error={getError('personalAccount', 'accountNo')}
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label={values.salaryLessThan40000 ? "IFSC Code *" : "IFSC Code"} 
                  name="personalAccount.ifscCode" 
                  value={values.personalAccount.ifscCode} 
                  onChange={handleChange} 
                  placeholder="Enter IFSC" 
                  error={getError('personalAccount', 'ifscCode')}
                />
             </div>
             
             {/* New Personal Fields */}
             <div className={styles.form_item}>
                <Inputbox label="Bank Manager Name" name="personalAccount.bankManagerName" value={values.personalAccount.bankManagerName} onChange={handleChange} placeholder="Manager Name" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Manager Contact" name="personalAccount.bankManagerContactNo" value={values.personalAccount.bankManagerContactNo} onChange={handleChange} placeholder="Contact No"  />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Manager Email" name="personalAccount.bankManagerEmail" value={values.personalAccount.bankManagerEmail} onChange={handleChange} placeholder="Email" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Relationship Officer" name="personalAccount.customerRelationshipOfficerName" value={values.personalAccount.customerRelationshipOfficerName} onChange={handleChange} placeholder="Officer Name" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Officer Contact" name="personalAccount.customerRelationshipOfficerContactNo" value={values.personalAccount.customerRelationshipOfficerContactNo} onChange={handleChange} placeholder="Contact No" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Officer Email" name="personalAccount.customerRelationshipOfficerEmail" value={values.personalAccount.customerRelationshipOfficerEmail} onChange={handleChange} placeholder="Email" />
             </div>
          </div>

          {/* SALARY ACCOUNT */}
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>Salary Account Info</h3>
            <img src={dividerline} alt="divider" className={styles.dividerImage} />
          </div>

          <div className={styles.form_group}>
             <div className={styles.form_item}>
                <Inputbox label="Salary Account Holder" name="salaryAccount.accountHolderName" value={values.salaryAccount.accountHolderName} onChange={handleChange} placeholder="Enter Name" />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label="Salary Account No *" 
                  name="salaryAccount.accountNo" 
                  value={values.salaryAccount.accountNo} 
                  onChange={handleChange} 
                  placeholder="Enter Account No" 
                  error={getError('salaryAccount', 'accountNo')}
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label="IFSC Code *" 
                  name="salaryAccount.ifscCode" 
                  value={values.salaryAccount.ifscCode} 
                  onChange={handleChange} 
                  placeholder="Enter IFSC" 
                  error={getError('salaryAccount', 'ifscCode')}
                />
             </div>
             <div className={styles.form_item}>
                <Inputbox 
                  label="Payable At *" 
                  name="salaryAccount.payableAt" 
                  value={values.salaryAccount.payableAt} 
                  onChange={handleChange} 
                  placeholder="City Name" 
                  error={getError('salaryAccount', 'payableAt')}
                />
             </div>

             {/* New Salary Fields */}
             <div className={styles.form_item}>
                <Inputbox label="Bank Manager Name" name="salaryAccount.bankManagerName" value={values.salaryAccount.bankManagerName} onChange={handleChange} placeholder="Manager Name" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Manager Contact" name="salaryAccount.bankManagerContactNo" value={values.salaryAccount.bankManagerContactNo} onChange={handleChange} placeholder="Contact No" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Manager Email" name="salaryAccount.bankManagerEmail" value={values.salaryAccount.bankManagerEmail} onChange={handleChange} placeholder="Email" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Relationship Officer" name="salaryAccount.customerRelationshipOfficerName" value={values.salaryAccount.customerRelationshipOfficerName} onChange={handleChange} placeholder="Officer Name" />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Officer Contact" name="salaryAccount.customerRelationshipOfficerContactNo" value={values.salaryAccount.customerRelationshipOfficerContactNo} onChange={handleChange} placeholder="Contact No"  />
             </div>
             <div className={styles.form_item}>
                <Inputbox label="Officer Email" name="salaryAccount.customerRelationshipOfficerEmail" value={values.salaryAccount.customerRelationshipOfficerEmail} onChange={handleChange} placeholder="Email" />
             </div>
          </div>

        </form>
      </FormikProvider>
    </div>
  );
});

export default BankInfo;