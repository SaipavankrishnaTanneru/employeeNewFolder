import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import axios from "axios"; 

import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";

import styles from "./EmployeeOnboardingForm.module.css";
import dividerLine from "assets/EmployeeOnBoarding/dividerline.svg";

import {
  generateTempPayrollId,
} from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

import { useAuth } from "useAuth";

/* ================= 🟢 FIX: INITIAL VALUES MOVED OUTSIDE ================= */
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

  /* ================= FOOTER REF ================= */
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.submitForm();
    },
  }));

  /* ================= AUTO-POPULATE LOGIC ================= */
  useEffect(() => {
    // Only fetch if we have a valid tempId (Edit Mode)
    if (tempId) {
      const fetchBasicInfo = async () => {
        try {
          console.log(`Fetching Basic Info for: ${tempId}`);
          const response = await axios.get(
            `http://localhost:8080/api/EmpDetailsFORCODO/employee/basic-info/${tempId}`
          );
          
          if (response.data && formikRef.current) {
            console.log("✅ Data Fetched:", response.data);
            
            // Merge fetched data into Formik
            formikRef.current.setValues({
              ...initialValues, // Fallback defaults
              ...response.data, // Backend data
              tempPayrollId: tempId, // Ensure ID is preserved
              
              // Ensure Dates are YYYY-MM-DD
              dateOfBirth: response.data.dateOfBirth ? response.data.dateOfBirth.split('T')[0] : "",
              dateOfJoin: response.data.dateOfJoin ? response.data.dateOfJoin.split('T')[0] : "",
              contractStartDate: response.data.contractStartDate ? response.data.contractStartDate.split('T')[0] : "",
              contractEndDate: response.data.contractEndDate ? response.data.contractEndDate.split('T')[0] : "",
              
              // Ensure IDs are Numbers for Dropdowns
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
  }, [tempId]); // initialValues is now stable, so no warning needed

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validateOnBlur
      validateOnChange={false}
      enableReinitialize={true} 
      onSubmit={async (values, { setSubmitting, setFieldValue }) => {
        try {
          console.log("🚀 FINAL PAYLOAD TO BACKEND", values);

          // If Edit Mode, update; else Create
          if (isEditMode || tempId) {
             console.log("Updating existing record...");
             // You can add an axios.put() here if needed later
             if (onTempIdGenerated) onTempIdGenerated(tempId);
          } else {
             // Create New
             const payloadWithCreatedBy = {
               ...values,
               createdBy: hrEmployeeId,
               updatedBy: hrEmployeeId,
             };

             const response = await generateTempPayrollId(
               hrEmployeeId,
               payloadWithCreatedBy
             );

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