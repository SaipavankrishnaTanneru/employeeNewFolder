// hooks/useCategoryInfoFormik.js

import { useFormik } from "formik";
import { useAuth } from "useAuth"; 
import * as Yup from "yup";
import { postCategoryInfo } from "api/onBoardingForms/postApi/useCategoryQueries";

const initialValues = {
  employeeTypeId: "",
  departmentId: "",
  designationId: "",
  subjectId: "",
  orientationId: "",
  agreedPeriodsPerWeek: "",
};

const validationSchema = Yup.object({
  employeeTypeId: Yup.string().required("Employee Type is required"),
  departmentId: Yup.string().required("Department is required"),
  designationId: Yup.string().required("Designation is required"),
  // Subject/Orientation might be optional depending on role, adding validation if needed
  agreedPeriodsPerWeek: Yup.number()
    .typeError("Must be a number")
    .required("Agreed Periods is required"),
});

export const useCategoryInfoFormik = ({ tempId, onSuccess }) => {
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

      console.log("🚀 Submitting Category Info...");

      const apiPayload = {
        employeeTypeId: Number(values.employeeTypeId) || 0,
        departmentId: Number(values.departmentId) || 0,
        designationId: Number(values.designationId) || 0,
        subjectId: Number(values.subjectId) || 0,
        orientationId: Number(values.orientationId) || 0,
        agreedPeriodsPerWeek: Number(values.agreedPeriodsPerWeek) || 0,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        const response = await postCategoryInfo(tempId, apiPayload);
        console.log("✅ Category Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save Category info:", error);
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