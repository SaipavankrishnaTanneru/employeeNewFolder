// hooks/usePreviousEmployerFormik.js

import { useFormik } from "formik";
import { useAuth } from "useAuth"; // Adjust path as needed
import * as Yup from "yup";
import { postPreviousEmployerInfo } from "api/onBoardingForms/postApi/usePreviousEmployerQueries";

const initialEmployer = {
  companyName: "",
  designation: "",
  fromDate: "",
  toDate: "",
  leavingReason: "",
  companyAddressLine1: "",
  companyAddressLine2: "",
  natureOfDuties: "",
  grossSalaryPerMonth: "",
  ctc: "",
};

const validationSchema = Yup.object().shape({
  previousEmployers: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company Name is required"),
      designation: Yup.string().required("Designation is required"),
      fromDate: Yup.date().required("From Date is required"),
      toDate: Yup.date().required("To Date is required"),
      // Add other validations as needed
    })
  ),
});

export const usePreviousEmployerFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues: {
      previousEmployers: [initialEmployer],
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Previous Employer Info...");

      // --- DATA TRANSFORMATION ---
      const formattedEmployers = values.previousEmployers.map((emp) => ({
        companyName: emp.companyName,
        designation: emp.designation,
        // Convert Date inputs to ISO String format required by API
        fromDate: emp.fromDate ? new Date(emp.fromDate).toISOString() : null,
        toDate: emp.toDate ? new Date(emp.toDate).toISOString() : null,
        leavingReason: emp.leavingReason || "",
        companyAddressLine1: emp.companyAddressLine1 || "",
        companyAddressLine2: emp.companyAddressLine2 || "",
        natureOfDuties: emp.natureOfDuties || "",
        // Ensure salary fields are numbers
        grossSalaryPerMonth: Number(emp.grossSalaryPerMonth) || 0,
        ctc: Number(emp.ctc) || 0,
      }));

      const apiPayload = {
        previousEmployers: formattedEmployers,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        const response = await postPreviousEmployerInfo(tempId, apiPayload);
        console.log("✅ Previous Employer Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save previous employer info:", error);
      }
    },
  });

  return {
    formik,
    values: formik.values,
    handleChange: formik.handleChange,
    setFieldValue: formik.setFieldValue,
    submitForm: formik.submitForm,
    initialEmployer, // Exporting for the "Add" button
  };
};