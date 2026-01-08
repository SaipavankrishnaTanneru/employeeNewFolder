import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom"; // Import useLocation
import { basicInfoSchema } from "utils/OnboardingSchemas";
import axios from "axios"; 

import FormValidationAlert from "utils/FormValidationAlert";

import BasicInfoFields from "./BasicInfoFields";
import WorkExperienceFields from "./WorkExperienceForm";

import styles from "./EmployeeOnboardingForm.module.css";
import dividerLine from "assets/EmployeeOnBoarding/dividerline.svg";

import {
  generateTempPayrollId,
  updateBasicInfo,
} from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

import { useAuth } from "useAuth";

/* ================= INITIAL VALUES ================= */
const initialValues = {
  empId: 0,
  modeOfHiringId: "",
  empTypeId: "", // Important: ensure this exists
  firstName: "",
  lastName: "",
  adhaarName: "",
  adhaarNo: "",
  adhaarEnrolmentNo: "",
  sscNo: "",
  sscNotAvailable: false,
  previousChaitanyaId: "",
  referenceEmployeeId: "",
  hiredByEmpId: "",
  reportingManagerId: "",
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
  replacedByEmpId: "",
  dateOfJoin: "",
  contractStartDate: "",
  contractEndDate: "",
  uanNo: "",
  profilePicture: null,
  tempPayrollId: "",
};

const EmployeeOnboardingForm = forwardRef(({ onTempIdGenerated, tempId, isEditMode }, ref) => {
  const { user } = useAuth();
  const location = useLocation();
  const hrEmployeeId = user?.employeeId || 5109;

  const formikRef = useRef(null);

  // Helper to determine Employee Type from Navigation State
  const getEmpTypeIdFromState = () => {
    const typeStr = location.state?.employeeType; // "Teach" or "Non Teach"
    if (typeStr === "Teach") return 1; 
    if (typeStr === "Non Teach") return 2;
    return ""; // Default
  };

  /* ================= EXPOSE SUBMIT TO PARENT ================= */
  useImperativeHandle(ref, () => ({
    submitForm: () => {
      formikRef.current?.submitForm();
    },
  }));

  /* ================= AUTO-POPULATE (FETCH DATA) ================= */
  useEffect(() => {
    if (tempId) {
      // --- EDIT MODE ---
      const fetchBasicInfo = async () => {
        try {
          console.log(`Fetching Basic Info for: ${tempId}`);
          const response = await axios.get(
            `http://localhost:8080/api/EmpDetailsFORCODO/employee/basic-info/${tempId}`
          );
          
          if (response.data && formikRef.current) {
            const data = response.data;
            console.log("✅ Basic Info Raw Data:", data);
            
            // Helper to safe format date (Handles T-format and null)
            const formatDate = (dateStr) => {
                if (!dateStr) return "";
                return dateStr.includes("T") ? dateStr.split("T")[0] : dateStr;
            };

            // MAPPING INCOMING DATA (DB -> Formik)
            formikRef.current.setValues({
              ...initialValues,
              ...data, // Spread default data first
              
              tempPayrollId: tempId,
              
              // 1. FIX EMAIL: If official 'email' is null, use 'personalEmail'
              email: data.email || data.personalEmail || "",

              // 2. FIX EMERGENCY PHONE
              emergencyPhNo: data.emergencyPhoneNo || data.emergencyPhNo || "",

              // 3. FIX WORKING MODE
              empWorkModeId: Number(data.workingModeId) || Number(data.empWorkModeId) || "",

              // 4. FIX JOINING TYPE
              joinTypeId: Number(data.joiningAsTypeId) || Number(data.joinTypeId) || "",

              // 5. FIX DATE OF JOINING
              dateOfJoin: formatDate(data.dateOfJoining || data.dateOfJoin || data.doj),

              // 6. FIX PAN NUMBER
              pancardNum: data.pancardNo || data.pancardNum || "",

              // --- CRITICAL MAPPINGS FOR YOUR ISSUE ---
              
              // Map DB 'preChaitanyaId' -> Formik 'previousChaitanyaId'
              previousChaitanyaId: data.preChaitanyaId || data.previousChaitanyaId || "",
              
              // Map DB 'referenceEmpId' -> Formik 'referenceEmployeeId'
              referenceEmployeeId: Number(data.referenceEmpId) || Number(data.referenceEmployeeId) || "",

              // Map DB 'empTypeId' OR use State if missing
              empTypeId: data.empTypeId || getEmpTypeIdFromState(),

              // --- Standard Fields (Ensuring numeric types) ---
              emergencyRelationId: Number(data.emergencyRelationId) || Number(data.relationId) || "",
              dateOfBirth: formatDate(data.dateOfBirth || data.dob),
              contractStartDate: formatDate(data.contractStartDate),
              contractEndDate: formatDate(data.contractEndDate),
              
              genderId: Number(data.genderId) || "",
              campusId: Number(data.campusId) || "",
              buildingId: Number(data.buildingId) || "",
              modeOfHiringId: Number(data.modeOfHiringId) || "",
              maritalStatusId: Number(data.maritalStatusId) || "",
              religionId: Number(data.religionId) || "",
              casteId: Number(data.casteId) || "",
              categoryId: Number(data.categoryId) || "",
              qualificationId: Number(data.qualificationId) || "",
              bloodGroupId: Number(data.bloodGroupId) || "",
              managerId: Number(data.managerId) || "",
              hiredByEmpId: Number(data.hiredByEmpId) || Number(data.hiredByEmp) || "",
              reportingManagerId: Number(data.reportingManagerId) || Number(data.reportingManager) || "",
              replacedByEmpId: Number(data.replacedByEmpId) || "",
            });
          }
        } catch (error) {
          console.error("❌ Failed to fetch Basic Info:", error);
        }
      };

      fetchBasicInfo();
    } else {
       // --- CREATE MODE ---
       // Just set the Employee Type based on Landing Page Selection
       if(formikRef.current) {
          const typeId = getEmpTypeIdFromState();
          formikRef.current.setFieldValue("empTypeId", typeId);
       }
    }
  }, [tempId, location.state]); 

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={basicInfoSchema}
      validateOnBlur={true}
      validateOnChange={false}
      enableReinitialize={true} 
      onSubmit={async (values, { setSubmitting, setFieldValue }) => {
        try {
          
          // =========================================================
          // 🔴 PAYLOAD MAPPING FIXES (Formik -> Backend)
          // =========================================================
          const finalPayload = {
             ...values,

             // 1. Fix: preChaitanyaId
             preChaitanyaId: values.previousChaitanyaId, 

             // 2. Fix: referenceEmpId
             referenceEmpId: values.referenceEmployeeId, 

             // 3. Fix: empTypeId
             empTypeId: values.empTypeId || getEmpTypeIdFromState(),

             // 4. Ensure HR IDs are sent
             createdBy: hrEmployeeId,
             updatedBy: hrEmployeeId,
          };

          console.log("🚀 Payload being sent:", finalPayload);

          // VALIDATION: Ensure Date of Join is present
          if (!values.dateOfJoin) {
             alert("Date of Joining is required!");
             setSubmitting(false);
             return;
          }

          // 1. UPDATE MODE (If tempId exists)
          if (tempId) {
             console.log("📝 Updating Basic Info...");
             
             // Using the update function with formatted payload
             await updateBasicInfo(tempId, finalPayload);
             console.log("✅ Basic Info Updated Successfully");
             
            if (onTempIdGenerated) {
                onTempIdGenerated(tempId, values.joinTypeId); 
             }

          } 
          // 2. CREATE MODE (If no tempId)
          else {
             console.log("🆕 Creating New Application...");
             
             // Using create function with formatted payload
             const response = await generateTempPayrollId(hrEmployeeId, finalPayload);

             console.log("✅ Temp Payroll ID Generated:", response);
             setFieldValue("tempPayrollId", response.tempPayrollId);

            if (onTempIdGenerated) {
               onTempIdGenerated(response.tempPayrollId, values.joinTypeId);
             }
          }

        } catch (error) {
          console.error("❌ Failed to submit form", error);
          alert("Failed to save data. Please check console for details.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(formik) => (
        <Form className={styles.formContainer} noValidate>
          <FormValidationAlert />
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