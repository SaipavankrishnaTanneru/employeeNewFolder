import React, { useEffect } from "react";
import styles from "./AccountInfoUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import { useBankInfoFormik } from "hooks/useBankInfoFormik"; 

// Hooks
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData"; 
import { useActiveBanks, useBranchesByBank } from "api/onBoardingForms/postApi/useBankQueries";

const AccountInfoUpdate = ({ activeId, onSaveRef, onSuccess }) => {
  
  const { data: banks = [] } = useActiveBanks();
  const { dropdowns } = useEmployeeFormQueries(); 

  const { formik } = useBankInfoFormik({ 
    tempId: activeId, 
    onSuccess,
    dropdownData: { ...dropdowns, banks: banks } 
  });

  const { values, setFieldValue, submitForm } = formik;
  const { data: branches = [] } = useBranchesByBank(values.bankId);

  useEffect(() => {
    if (onSaveRef) onSaveRef.current = submitForm;
  }, [submitForm, onSaveRef]);

  // Helpers
  const getBankName = (id) => banks.find(b => b.bankId === Number(id))?.bankName || "";
  const getBranchName = (id) => branches.find(b => b.branchId === Number(id))?.branchName || "";
  // Assuming paymentTypes comes from dropdowns or static
  const paymentTypes = dropdowns?.paymentTypes?.map(p => p.name) || ["Bank Transfer", "Cheque", "Cash"];
  
  // Helper to get ID from payment type name
  const handlePaymentTypeChange = (e) => {
      const name = e.target.value;
      const found = dropdowns?.paymentTypes?.find(p => p.name === name);
      setFieldValue("paymentTypeId", found ? found.id : ""); 
  };
  
  // Helper to get Payment Type Name for display
  const getPaymentTypeName = (id) => dropdowns?.paymentTypes?.find(p => p.id === Number(id))?.name || "";


  return (
    <div className={styles.container}>
      
      {/* ================= PERSONAL BANK INFO ================= */}
      <h4 className={styles.section_title}>Personal Bank Info</h4>

      <div className={styles.form_grid}>
        <Dropdown
          dropdownname="Payment Type"
          value={getPaymentTypeName(values.paymentTypeId)} 
          results={paymentTypes} 
          onChange={handlePaymentTypeChange}
        />

        <InputBox label="Bank Name" value={values.personalAccount.bankName} onChange={(e) => setFieldValue("personalAccount.bankName", e.target.value)} />
        <InputBox label="Account Number" value={values.personalAccount.accountNo} onChange={(e) => setFieldValue("personalAccount.accountNo", e.target.value)} />
        <InputBox label="IFSC Code" value={values.personalAccount.ifscCode} onChange={(e) => setFieldValue("personalAccount.ifscCode", e.target.value)} />
        <InputBox label="Holder Name" value={values.personalAccount.accountHolderName} onChange={(e) => setFieldValue("personalAccount.accountHolderName", e.target.value)} />
        
        {/* NEW FIELDS */}
        <InputBox label="Bank Manager Name" value={values.personalAccount.bankManagerName} onChange={(e) => setFieldValue("personalAccount.bankManagerName", e.target.value)} />
        <InputBox label="Manager Contact" value={values.personalAccount.bankManagerContactNo} onChange={(e) => setFieldValue("personalAccount.bankManagerContactNo", e.target.value)} />
        <InputBox label="Manager Email" value={values.personalAccount.bankManagerEmail} onChange={(e) => setFieldValue("personalAccount.bankManagerEmail", e.target.value)} />
        <InputBox label="Relationship Officer" value={values.personalAccount.customerRelationshipOfficerName} onChange={(e) => setFieldValue("personalAccount.customerRelationshipOfficerName", e.target.value)} />
        <InputBox label="Officer Contact" value={values.personalAccount.customerRelationshipOfficerContactNo} onChange={(e) => setFieldValue("personalAccount.customerRelationshipOfficerContactNo", e.target.value)} />
        <InputBox label="Officer Email" value={values.personalAccount.customerRelationshipOfficerEmail} onChange={(e) => setFieldValue("personalAccount.customerRelationshipOfficerEmail", e.target.value)} />
      </div>

      {/* ================= SALARY ACCOUNT INFO ================= */}
      <h4 className={styles.section_title}>Salary Account Info</h4>

      <div className={styles.form_grid}>
        <Dropdown
          dropdownname="Salary < 40k?"
          value={values.salaryLessThan40000 ? "Yes" : "No"}
          results={["Yes", "No"]}
          onChange={(e) => setFieldValue("salaryLessThan40000", e.target.value === "Yes")}
        />

        {/* Bank Dropdown */}
        <Dropdown
          dropdownname="Bank Name"
          value={getBankName(values.bankId)}
          results={banks.map(b => b.bankName)}
          onChange={(e) => {
             const found = banks.find(b => b.bankName === e.target.value);
             setFieldValue("bankId", found?.bankId || "");
             setFieldValue("bankBranchId", ""); 
          }}
        />

        {/* Branch Dropdown */}
        <Dropdown
          dropdownname="Bank Branch"
          value={getBranchName(values.bankBranchId)}
          results={branches.map(b => b.branchName)}
          onChange={(e) => {
             const found = branches.find(b => b.branchName === e.target.value);
             setFieldValue("bankBranchId", found?.branchId || "");
             if (found?.ifscCode) setFieldValue("salaryAccount.ifscCode", found.ifscCode);
          }}
        />

        <InputBox label="Account Number" value={values.salaryAccount.accountNo} onChange={(e) => setFieldValue("salaryAccount.accountNo", e.target.value)} />
        <InputBox label="IFSC Code" value={values.salaryAccount.ifscCode} onChange={(e) => setFieldValue("salaryAccount.ifscCode", e.target.value)} />
        <InputBox label="Payable At" value={values.salaryAccount.payableAt} onChange={(e) => setFieldValue("salaryAccount.payableAt", e.target.value)} />
        <InputBox label="Holder Name" value={values.salaryAccount.accountHolderName} onChange={(e) => setFieldValue("salaryAccount.accountHolderName", e.target.value)} />

        {/* NEW FIELDS */}
        <InputBox label="Bank Manager Name" value={values.salaryAccount.bankManagerName} onChange={(e) => setFieldValue("salaryAccount.bankManagerName", e.target.value)} />
        <InputBox label="Manager Contact" value={values.salaryAccount.bankManagerContactNo} onChange={(e) => setFieldValue("salaryAccount.bankManagerContactNo", e.target.value)} />
        <InputBox label="Manager Email" value={values.salaryAccount.bankManagerEmail} onChange={(e) => setFieldValue("salaryAccount.bankManagerEmail", e.target.value)} />
        <InputBox label="Relationship Officer" value={values.salaryAccount.customerRelationshipOfficerName} onChange={(e) => setFieldValue("salaryAccount.customerRelationshipOfficerName", e.target.value)} />
        <InputBox label="Officer Contact" value={values.salaryAccount.customerRelationshipOfficerContactNo} onChange={(e) => setFieldValue("salaryAccount.customerRelationshipOfficerContactNo", e.target.value)} />
        <InputBox label="Officer Email" value={values.salaryAccount.customerRelationshipOfficerEmail} onChange={(e) => setFieldValue("salaryAccount.customerRelationshipOfficerEmail", e.target.value)} />
      </div>
    </div>
  );
};

export default AccountInfoUpdate;