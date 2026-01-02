// hooks/useAgreementInfoFormik.js

import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import * as Yup from "yup";
import { postAgreementInfo } from "api/onBoardingForms/postApi/useAgreementQueries";

const initialCheque = {
  chequeNo: "",
  chequeBankName: "",
  chequeBankIfscCode: ""
};

const initialValues = {
  agreementOrgId: "",
  agreementType: "",
  category: "",
  isCheckSubmit: false,
  chequeDetails: [initialCheque] 
};

// Validation Schema
const validationSchema = Yup.object({
  agreementOrgId: Yup.string().required("Organization is required"),
  agreementType: Yup.string().required("Agreement Type is required"),
  // Add validation for cheques if "isCheckSubmit" is true
});

export const useAgreementInfoFormik = ({ tempId, onSuccess }) => {
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

      console.log("🚀 Submitting Agreement Info...");

      // Filter cheques: Remove empty ones or send all depending on requirement.
      // Here we clean data to ensure numbers are numbers.
      const formattedCheques = values.chequeDetails.map(chq => ({
        chequeNo: Number(chq.chequeNo) || 0,
        chequeBankName: chq.chequeBankName || "",
        chequeBankIfscCode: chq.chequeBankIfscCode || ""
      }));

      const apiPayload = {
        agreementOrgId: Number(values.agreementOrgId) || 0,
        agreementType: values.agreementType || "",
        category: values.category || "",
        isCheckSubmit: Boolean(values.isCheckSubmit),
        chequeDetails: formattedCheques,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId
      };

      try {
        const response = await postAgreementInfo(tempId, apiPayload);
        console.log("✅ Agreement Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save Agreement info:", error);
      }
    },
  });

  return {
    formik,
    values: formik.values,
    setFieldValue: formik.setFieldValue,
    handleChange: formik.handleChange,
    submitForm: formik.submitForm,
    initialCheque // Export for Add Button
  };
};