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
  isPfEligible: false,
  pfNo: "",
  pfJoinDate: "",
  uanNo: "",
  isEsiEligible: false,
  esiNo: "",
};

const validationSchema = Yup.object({
  monthlyTakeHome: Yup.string().required("Monthly Take Home is required"),
  yearlyCtc: Yup.string().required("Yearly CTC is required"),
  gradeId: Yup.string().required("Grade is required"),
  empStructureId: Yup.string().required("Structure is required"),
  orgId: Yup.string().required("Company Name is required"),
});

export const useSalaryInfoFormik = ({ tempId, onSuccess, role }) => {
  
  const formik = useFormik({
    initialValues,
    validationSchema, 
    
    onSubmit: async (values) => {
      console.log(`🚀 Processing Salary Info (Role: ${role})...`);

      if (!tempId) return alert("Missing Temporary ID");

      const formatDate = (dateStr) => {
        if (!dateStr) return null;
        try { return new Date(dateStr).toISOString(); } catch(e) { return null; }
      };

      // 1. Prepare the Payload
      const apiPayload = {
        tempPayrollId: String(tempId),
        monthlyTakeHome: Number(values.monthlyTakeHome) || 0,
        yearlyCtc: Number(values.yearlyCtc) || 0,
        ctcWords: values.ctcWords || "",
        empStructureId: Number(values.empStructureId) || 0,
        gradeId: Number(values.gradeId) || 0,
        costCenterId: Number(values.costCenterId) || 0,
        orgId: Number(values.orgId) || 0,
        isPfEligible: Boolean(values.isPfEligible),
        isEsiEligible: Boolean(values.isEsiEligible),
        pfNo: values.isPfEligible ? values.pfNo : null,
        pfJoinDate: values.isPfEligible ? formatDate(values.pfJoinDate) : null,
        uanNo: values.isPfEligible ? Number(values.uanNo) : null,
        esiNo: values.isEsiEligible ? Number(values.esiNo) : null,
        updatedBy: 0 
      };

      // 2. Logic Split based on Role
      if (role === "DO") {
        // 🛑 DO NOT POST YET. Pass data to the next screen (Checklist).
        console.log("ℹ️ Role is DO: Passing payload to next step.");
        if (onSuccess) onSuccess(apiPayload); 
      } else {
        // ✅ For HR/Campus: Post immediately to 'Forward to DO'
        try {
          await postSalaryInfo(tempId, apiPayload);
          if (onSuccess) onSuccess(); 
        } catch (error) {
          console.error("❌ Salary Submission Failed:", error);
        }
      }
    },
  });

  return { formik };
};