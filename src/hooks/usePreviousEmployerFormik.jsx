import { useFormik } from "formik";
import * as Yup from "yup";
import { postPreviousEmployerInfo } from "api/onBoardingForms/postApi/usePreviousEmployerQueries";
import { useAuth } from "useAuth"; 

const initialEmployer = {
  companyName: "",
  designation: "",
  fromDate: "",
  toDate: "",
  leavingReason: "",
  companyAddressLine1: "",
  companyAddressLine2: "",
  companyAddressLine3: "", // Added as per requirement
  natureOfDuties: "",
  grossSalaryPerMonth: "",
  ctc: "",
  documents: {}, 
};

// 🔴 UPDATED VALIDATION SCHEMA
const validationSchema = Yup.object().shape({
  previousEmployers: Yup.array().of(
    Yup.object().shape({
      companyName: Yup.string().required("Company Name is required"),
      designation: Yup.string().required("Designation is required"),
      
      fromDate: Yup.date()
        .max(new Date(), "From Date cannot be in the future")
        .required("From Date is required"),
        
      toDate: Yup.date()
        .min(Yup.ref('fromDate'), "To Date must be after From Date")
        .required("To Date is required"),
        
      leavingReason: Yup.string().required("Leaving Reason is required"),
      
      companyAddressLine1: Yup.string().required("Address Line 1 is required"),
      // Address 2 & 3 are optional, so no validation needed
      
      natureOfDuties: Yup.string().required("Nature of Duty is required"),
      
      grossSalaryPerMonth: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("Gross Salary is required"),
        
      ctc: Yup.number()
        .typeError("Must be a number")
        .positive("Must be positive")
        .required("CTC is required"),
    })
  ),
});

const DOC_TYPE_MAP = {
  'payslips': 1,
  'resignation': 2,
  'offerLetter': 3,
  'form12A': 4,
  'gratuity': 5,
  'pfMergerLetter': 6
};

export const usePreviousEmployerFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formik = useFormik({
    initialValues: {
      previousEmployers: [initialEmployer],
    },
    validationSchema, // <--- Connected Schema
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      // ... (Your existing submit logic remains same)
      if (!tempId) { alert("Temporary ID is missing."); return; }

      const formattedEmployers = values.previousEmployers.map((emp) => {
        const docsArray = [];
        if (emp.documents) {
          Object.keys(emp.documents).forEach((key) => {
            const files = emp.documents[key];
            if (Array.isArray(files)) {
              files.forEach((file) => {
                docsArray.push({
                  docPath: file.url || "pending_path", 
                  docTypeId: DOC_TYPE_MAP[key] || 0,
                  description: file.name || key
                });
              });
            }
          });
        }

        return {
          companyName: emp.companyName,
          designation: emp.designation,
          fromDate: emp.fromDate ? new Date(emp.fromDate).toISOString() : null,
          toDate: emp.toDate ? new Date(emp.toDate).toISOString() : null,
          leavingReason: emp.leavingReason || "",
          companyAddressLine1: emp.companyAddressLine1 || "",
          companyAddressLine2: emp.companyAddressLine2 || "",
          // Ensure extra fields are mapped if backend supports them
          natureOfDuties: emp.natureOfDuties || "",
          grossSalaryPerMonth: Number(emp.grossSalaryPerMonth) || 0,
          ctc: Number(emp.ctc) || 0,
          documents: docsArray 
        };
      });

      const apiPayload = {
        previousEmployers: formattedEmployers,
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId,
      };

      try {
        await postPreviousEmployerInfo(tempId, apiPayload);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { formik, initialEmployer };
};