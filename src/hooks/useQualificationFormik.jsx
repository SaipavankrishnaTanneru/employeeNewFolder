import { useFormik } from "formik";
import { useAuth } from "useAuth";
import * as Yup from "yup";
import { postQualificationInfo } from "api/onBoardingForms/postApi/useQualificationQueries";

const initialQualification = {
  qualificationId: "",
  qualificationDegreeId: "",
  specialization: "",
  university: "",
  institute: "",
  passedOutYear: "",
  isSubmittedCertificate: false,
  certificateFiles: [], 
};

// 🔴 UPDATED VALIDATION SCHEMA
const validationSchema = Yup.object().shape({
  qualifications: Yup.array().of(
    Yup.object().shape({
      qualificationId: Yup.string().required("Qualification is required"),
      qualificationDegreeId: Yup.string().required("Degree is required"),
      specialization: Yup.string().required("Specialization is required"), // Added
      university: Yup.string().required("University is required"),
      institute: Yup.string().required("Institute Name is required"),
      passedOutYear: Yup.string()
        .matches(/^[0-9]{4}$/, "Enter valid year (YYYY)") // Validates 4 digit year
        .required("Pass out Year is required"),
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
    validationSchema, // Connected
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      console.log("🚀 Submitting Qualification Info...", values);

      const formattedQualifications = values.qualifications.map((q) => {
        const files = q.certificateFiles || [];
        const filePaths = files.map(f => f.url).filter(Boolean);
        const certificateFileString = filePaths.join(",");

        return {
          qualificationId: Number(q.qualificationId) || 0,
          qualificationDegreeId: Number(q.qualificationDegreeId) || 0,
          specialization: q.specialization || "",
          university: q.university || "",
          institute: q.institute || "",
          passedOutYear: Number(q.passedOutYear) || 0,
          certificateFile: certificateFileString, 
        };
      });

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
    initialQualification,
  };
};