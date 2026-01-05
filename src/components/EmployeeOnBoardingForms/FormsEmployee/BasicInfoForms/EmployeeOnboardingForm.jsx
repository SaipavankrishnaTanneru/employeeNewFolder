import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios"; 

import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";

import styles from "./EmployeeOnboardingForm.module.css";
import dividerLine from "assets/EmployeeOnBoarding/dividerline.svg";

import {
  generateTempPayrollId,
  updateBasicInfo, // Imported the new Update function
} from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

import { useAuth } from "useAuth";

/* ================= INITIAL VALUES ================= */
const initialValues = {
  empId: 0,
  modeOfHiringId: "",
  firstName: "",
  lastName: "",
  adhaarName: "",
  adhaarNo: "",
  genderId: "",
  dateOfBirth: "",
  age: "",
  fatherName: "",
  primaryMobileNo: "",
  email: "",
  pancardNum: "",
  bloodGroupId: "",
  religionId: "",
  casteId: "",
  categoryId: "",
  maritalStatusId: "",
  qualificationId: "",
  emergencyPhNo: "",
  emergencyRelationId: "",
  campusId: "",
  buildingId: "",
  managerId: "",
  empWorkModeId: "",
  joinTypeId: "",
  dateOfJoin: "",
  contractStartDate: "",
  contractEndDate: "",
  uanNo: "",
  profilePicture: null,
  tempPayrollId: "",
};

const EmployeeOnboardingForm = forwardRef(({ onTempIdGenerated, tempId, isEditMode }, ref) => {
  const { user } = useAuth();
  const hrEmployeeId = user?.employeeId || 5109;

  const formikRef = useRef(null);

  /* ================= EXPOSE SUBMIT TO PARENT ================= */
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.submitForm();
    },
  }));

  /* ================= AUTO-POPULATE (FETCH DATA) ================= */
  useEffect(() => {
    if (tempId) {
      const fetchBasicInfo = async () => {
        try {
          console.log(`Fetching Basic Info for: ${tempId}`);
          const response = await axios.get(
            `http://localhost:8080/api/EmpDetailsFORCODO/employee/basic-info/${tempId}`
          );
          
          if (response.data && formikRef.current) {
            console.log("✅ Basic Info Data Fetched:", response.data);
            
            // Merge fetched data into Formik
            formikRef.current.setValues({
              ...initialValues,
              ...response.data,
              tempPayrollId: tempId,
              
              // Ensure Dates are YYYY-MM-DD
              dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : "",
              dateOfJoin: response.data.dateOfJoin ? response.data.dateOfJoin.split('T')[0] : "",
              contractStartDate: response.data.contractStartDate ? response.data.contractStartDate.split('T')[0] : "",
              contractEndDate: response.data.contractEndDate ? response.data.contractEndDate.split('T')[0] : "",
              
              // Ensure IDs are Numbers
              genderId: Number(response.data.genderId) || "",
              campusId: Number(response.data.campusId) || "",
              buildingId: Number(response.data.buildingId) || "",
              modeOfHiringId: Number(response.data.modeOfHiringId) || "",
              maritalStatusId: Number(response.data.maritalStatusId) || "",
              religionId: Number(response.data.religionId) || "",
              casteId: Number(response.data.casteId) || "",
              categoryId: Number(response.data.categoryId) || "",
              qualificationId: Number(response.data.qualificationId) || "",
              emergencyRelationId: Number(response.data.emergencyRelationId) || "",
              bloodGroupId: Number(response.data.bloodGroupId) || "",
              managerId: Number(response.data.managerId) || "",
              empWorkModeId: Number(response.data.empWorkModeId) || "",
              joinTypeId: Number(response.data.joinTypeId) || "",
            });
          }
        } catch (error) {
          console.error("❌ Failed to fetch Basic Info:", error);
        }
      };

      fetchBasicInfo();
    }
  }, [tempId]); 

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validateOnBlur
      validateOnChange={false}
      enableReinitialize={true} 
      onSubmit={async (values, { setSubmitting, setFieldValue }) => {
        try {
          // 1. UPDATE MODE (If tempId exists)
          if (tempId) {
             console.log("📝 Updating Basic Info...");
             
             const updatePayload = {
               ...values,
               updatedBy: hrEmployeeId,
             };

             await updateBasicInfo(tempId, updatePayload);
             console.log("✅ Basic Info Updated Successfully");
             
             if (onTempIdGenerated) onTempIdGenerated(tempId);

          } 
          // 2. CREATE MODE (If no tempId)
          else {
             console.log("🆕 Creating New Application...");
             
             const createPayload = {
               ...values,
               createdBy: hrEmployeeId,
               updatedBy: hrEmployeeId,
             };

             const response = await generateTempPayrollId(hrEmployeeId, createPayload);

             console.log("✅ Temp Payroll ID Generated:", response);
             setFieldValue("tempPayrollId", response.tempPayrollId);

             if (onTempIdGenerated) {
               onTempIdGenerated(response.tempPayrollId);
             }
          }

        } catch (error) {
          console.error("❌ Failed to submit form", error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form className={styles.formContainer} noValidate>
          <BasicInfoFields formik={formik} />

          <h2 className={styles.formSectionTitle}>
            Working Information
            <img
              src={dividerLine}
              alt="divider"
              className={styles.dividerImage}
            />
          </h2>

          <WorkExperienceFields formik={formik} />
        </Form>
      )}
    </Formik>
  );
});

export default EmployeeOnboardingForm;