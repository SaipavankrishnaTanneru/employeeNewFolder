import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "useAuth"; 
import * as Yup from "yup";
import { postAgreementInfo } from "api/onBoardingForms/postApi/useAgreementQueries";
import { useAgreementChequeDetails } from "api/do/getpapis/useAgreementQueries"; 

const initialCheque = { chequeNo: "", chequeBankName: "", chequeBankIfscCode: "" };
const initialValues = { agreementOrgId: "", agreementType: "", isCheckSubmit: false, chequeDetails: [initialCheque] };

const validationSchema = Yup.object({
  agreementType: Yup.string().required("Agreement Type is required"),
});

export const useAgreementInfoFormik = ({ tempId, onSuccess }) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const { data: savedData } = useAgreementChequeDetails(tempId);
  const [isDataPopulated, setIsDataPopulated] = useState(false);

  useEffect(() => { setIsDataPopulated(false); }, [tempId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log("🚀 Submitting Agreement Info...", values);

      const formattedCheques = values.chequeDetails.map(chq => ({
        chequeNo: Number(chq.chequeNo) || 0,
        chequeBankName: chq.chequeBankName || "",     
        // 🔴 FIX: Changed key to 'chequeBankIfscCode' to match backend DTO requirement
        chequeBankIfscCode: chq.chequeBankIfscCode || ""    
      }));

      const payload = {
        agreementOrgId: Number(values.agreementOrgId) || 0,
        agreementType: values.agreementType || "",
        isCheckSubmit: Boolean(values.isCheckSubmit),
        chequeDetails: values.isCheckSubmit ? formattedCheques : [], 
        createdBy: hrEmployeeId,
        updatedBy: hrEmployeeId
      };

      try {
        await postAgreementInfo(tempId, payload);
        if (onSuccess) onSuccess();
      } catch (error) {
        console.error("❌ Failed to save Agreement info:", error);
      }
    },
  });

  const { setValues } = formik;

  useEffect(() => {
    if (!isDataPopulated && savedData) {
      const backendCheques = savedData.cheques || savedData.chequeDetails || [];
      const hasCheques = backendCheques.length > 0;
      
      const mappedCheques = hasCheques
        ? backendCheques.map(chq => ({
            chequeNo: chq.chequeNo || "",
            chequeBankName: chq.chequeBankName || chq.chequeBank || "", 
            // Map GET response back to Form Field
            chequeBankIfscCode: chq.chequeBankIfscCode || chq.chequeIfscCode || chq.ifscCode || "" 
          }))
        : [initialCheque];

      setValues({
        agreementOrgId: savedData.agreementOrgId || "", 
        agreementType: savedData.agreementType || "",
        isCheckSubmit: hasCheques,
        chequeDetails: mappedCheques
      });

      setIsDataPopulated(true);
    }
  }, [savedData, setValues, isDataPopulated]);

  return { formik, values: formik.values, setFieldValue: formik.setFieldValue, handleChange: formik.handleChange, submitForm: formik.submitForm, initialCheque };
};