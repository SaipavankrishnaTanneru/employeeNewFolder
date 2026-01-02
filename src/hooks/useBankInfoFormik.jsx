// hooks/useBankInfoFormik.js

import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import * as Yup from "yup";
import { postBankInfo } from "api/onBoardingForms/postApi/useBankQueries";

const initialValues = {
  paymentTypeId: "",
  bankId: "",
  bankBranchId: "",
  bankBranchName: "", 
  salaryLessThan40000: false,
  
  personalAccount: {
    bankName: "",
    accountNo: "",
    accountHolderName: "",
    ifscCode: ""
  },
  
  salaryAccount: {
    bankId: "", 
    ifscCode: "",
    accountNo: "",
    accountHolderName: "",
    payableAt: ""
  }
};

const validationSchema = Yup.object({
  paymentTypeId: Yup.string().required("Payment Type is required"),
  bankId: Yup.string().required("Bank is required"),
});

export const useBankInfoFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Bank Info...");

      // --- 🔴 CRITICAL FIX HERE ---
      // The backend throws an error if we send BOTH ID and Name.
      // We prioritize ID. If ID exists, Name must be empty.
      
      const branchId = Number(values.bankBranchId) || 0;
      
      // If we have a valid Branch ID, force Name to be empty string.
      // Otherwise (if ID is 0), send the Name (manual entry scenario).
      const branchNamePayload = branchId > 0 ? "" : (values.bankBranchName || "");

      const apiPayload = {
        paymentTypeId: Number(values.paymentTypeId) || 0,
        bankId: Number(values.bankId) || 0,
        
        // 1. Send ID
        bankBranchId: branchId,
        // 2. Send Name only if ID is 0
        bankBranchName: branchNamePayload,

        salaryLessThan40000: Boolean(values.salaryLessThan40000),
        
        personalAccount: {
          bankName: values.personalAccount.bankName,
          accountNo: values.personalAccount.accountNo,
          accountHolderName: values.personalAccount.accountHolderName,
          ifscCode: values.personalAccount.ifscCode
        },
        
        salaryAccount: {
          bankId: Number(values.salaryAccount.bankId) || Number(values.bankId) || 0,
          ifscCode: values.salaryAccount.ifscCode,
          accountNo: values.salaryAccount.accountNo,
          accountHolderName: values.salaryAccount.accountHolderName,
          payableAt: values.salaryAccount.payableAt
        },

        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId
      };

      try {
        const response = await postBankInfo(tempId, apiPayload);
        console.log("✅ Bank Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save Bank info:", error);
      }
    },
  });

  return {
    formik,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
    handleChange: formik.handleChange,
    submitForm: formik.submitForm,
  };
};