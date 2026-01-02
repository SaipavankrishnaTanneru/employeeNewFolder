import { useFormik } from "formik";
import * as Yup from "yup";
import { postSalaryInfo } from "api/onBoardingForms/postApi/useSalaryQueries";

const initialValues = {
  monthlyTakeHome: "",
  yearlyCtc: "",
  ctcWords: "",
  gradeId: "",
  costCenterId: "",
  empStructureId: "",
  orgId: "", 
  previousStatus: "New", 
  newStatus: "Pending with DO", 
  message: "Forwarded for Approval",
  isPfEligible: false,
  pfNo: "",
  pfJoinDate: "",
  uanNo: "",
  isEsiEligible: false,
  esiNo: "",
};

// 🔴 UPDATED SCHEMA: Handles String-to-Number conversion
const validationSchema = Yup.object({
  monthlyTakeHome: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : Number(value))
    .typeError("Must be a number")
    .required("Monthly Take Home is required"),

  yearlyCtc: Yup.number()
    .transform((value, originalValue) => originalValue === "" ? null : Number(value))
    .typeError("Must be a number")
    .required("Yearly CTC is required"),

  // IDs must be selected (cannot be empty string)
  gradeId: Yup.string().required("Grade is required"),
  costCenterId: Yup.string().required("Cost Center is required"),
  empStructureId: Yup.string().required("Structure is required"),
  orgId: Yup.string().required("Company Name is required"),
  
  // Conditional Validation matches DTO logic
  pfNo: Yup.string().when("isPfEligible", {
    is: true,
    then: () => Yup.string().required("PF Number is required"),
  }),
  uanNo: Yup.string().when("isPfEligible", {
    is: true,
    then: () => Yup.string().required("UAN Number is required"),
  }),
  esiNo: Yup.string().when("isEsiEligible", {
    is: true,
    then: () => Yup.string().required("ESI Number is required"),
  }),
});

export const useSalaryInfoFormik = ({ tempId, onSuccess }) => {
  
  const formik = useFormik({
    initialValues,
    validationSchema, 
    
    // Debug Validation
    validate: (values) => {
       try {
         validationSchema.validateSync(values, { abortEarly: false });
         return {};
       } catch (err) {
         const errors = {};
         err.inner.forEach(e => { errors[e.path] = e.message; });
         console.error("⛔ Validation Failed:", errors);
         return errors;
       }
    },

    onSubmit: async (values) => {
      console.log("🚀 Payload Construction Started...");

      if (!tempId) {
        alert("Temporary ID is missing.");
        return;
      }

      // 🔴 FIX DATE FORMAT: java.sql.Date requires "YYYY-MM-DD"
      const formatDateForBackend = (dateString) => {
        if (!dateString) return null;
        try {
           return new Date(dateString).toISOString().split('T')[0];
        } catch (e) {
           return null;
        }
      };

      // 🔴 MAP TO DTO (SalaryInfoDTO)
      const apiPayload = {
        tempPayrollId: String(tempId), // REQUIRED in DTO
        
        // --- Salary Information ---
        monthlyTakeHome: Number(values.monthlyTakeHome), // Double
        yearlyCtc: Number(values.yearlyCtc),             // Double
        ctcWords: values.ctcWords || "",                 // String
        
        empStructureId: Number(values.empStructureId),   // Integer
        gradeId: Number(values.gradeId) || null,         // Integer (Optional)
        costCenterId: Number(values.costCenterId) || null, // Integer (Optional)
        orgId: Number(values.orgId) || null,             // Integer (Optional)
        
        // --- PF / ESI Flags ---
        isPfEligible: Boolean(values.isPfEligible),      // Boolean
        isEsiEligible: Boolean(values.isEsiEligible),    // Boolean

        // --- PF Details ---
        // Send null if not eligible to keep DB clean, or match DTO logic
        pfNo: values.isPfEligible ? values.pfNo : null,
        
        // FIX: Send YYYY-MM-DD string for java.sql.Date
        pfJoinDate: values.isPfEligible ? formatDateForBackend(values.pfJoinDate) : null,
        
        uanNo: values.isPfEligible ? Number(values.uanNo) : null, // Long in DTO

        // --- ESI Details ---
        esiNo: values.isEsiEligible ? Number(values.esiNo) : null, // Long in DTO
        
        // Extra DTO Fields
        checkListIds: "", // Optional
        updatedBy: 1,     // Optional Audit
      };

      console.log("📦 Sending to Backend:", JSON.stringify(apiPayload, null, 2));

      try {
        const response = await postSalaryInfo(tempId, apiPayload);
        console.log("✅ Success:", response);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ API Failed:", error);
      }
    },
  });

  return { formik };
};