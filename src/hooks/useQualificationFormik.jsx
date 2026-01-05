// hooks/useQualificationFormik.js
 
import { useFormik } from "formik";
import { useAuth } from "useAuth";
import * as Yup from "yup";
import { postQualificationInfo } from "api/onBoardingForms/postApi/useQualificationQueries";
 
const initialQualification = {
  qualificationId: "",       // Stores ID (e.g., 1 for B.Tech)
  qualificationDegreeId: "", // Stores ID (e.g., 5 for CSE)
  specialization: "",
  university: "",
  institute: "",
  passedOutYear: "",
  isSubmittedCertificate: false, // Checkbox state
  certificateFiles: [],          // Array of File objects for multiple uploads
  certificateFile: null,         // Holds File object (kept for backward compatibility)
  certificatePath: "string",     // Placeholder string for API
};
 
const validationSchema = Yup.object().shape({
  qualifications: Yup.array().of(
    Yup.object().shape({
      qualificationId: Yup.string().required("Qualification is required"),
      qualificationDegreeId: Yup.string().required("Degree is required"),
      university: Yup.string().required("University is required"),
      institute: Yup.string().required("Institute is required"),
      passedOutYear: Yup.number()
        .typeError("Year must be a number")
        .required("Year is required"),
    })
  ),
});
 
export const useQualificationFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;
 
  const formik = useFormik({
    initialValues: {
      qualifications: [initialQualification],
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }
 
      console.log("🚀 Submitting Qualification Info...");
 
      // --- DATA TRANSFORMATION ---
      const formattedQualifications = values.qualifications.map((q) => ({
        qualificationId: Number(q.qualificationId) || 0,
        qualificationDegreeId: Number(q.qualificationDegreeId) || 0,
        specialization: q.specialization || "",
        university: q.university || "",
        institute: q.institute || "",
        passedOutYear: Number(q.passedOutYear) || 0,
        // Since we don't have file upload API yet, sending placeholder
        certificateFile: "string",
      }));
 
      const apiPayload = {
        qualifications: formattedQualifications,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };
 
      try {
        const response = await postQualificationInfo(tempId, apiPayload);
        console.log("✅ Qualification Info Saved:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save qualification info:", error);
      }
    },
  });
 
  return {
    formik,
    values: formik.values,
    handleChange: formik.handleChange,
    setFieldValue: formik.setFieldValue,
    submitForm: formik.submitForm,
    initialQualification,
  };
};
 