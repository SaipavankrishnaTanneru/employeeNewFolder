import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FieldArray, FormikProvider } from "formik";
import styles from "../familyInfo/FamilyInfo.module.css";

// API & Hooks
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData";
import { useFamilyInfoFormik } from "../../../../hooks/useFamilyInfoFormik";

// Assets & Widgets
import { ReactComponent as UploadIcon } from "assets/Qualification/Upload.svg";
import BorderIcon from 'assets/Qualification/border.svg'; 
import FormCheckbox from 'widgets/FormCheckBox/FormCheckBox';
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import FormValidationAlert from "utils/FormValidationAlert"; // 🔴 Import Alert

// Sub-components
import FatherInfo from "./FatherInfo";
import MotherInfo from "./FatherInfo"; // Reusing structure

const FamilyInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Fetch Dropdowns
  const { dropdowns, isLoading } = useEmployeeFormQueries();
  const bloodGroupOptions = dropdowns?.bloodGroups?.map(bg => bg.name) || [];
  const relationNames = dropdowns?.emergencyRelations?.map(r => r.name) || [];

  // 2. Init Formik Hook
  const { formik } = useFamilyInfoFormik({ 
    tempId, 
    onSuccess, 
    dropdownData: dropdowns 
  });
  
  const { values, setFieldValue, handleChange, submitForm, errors, touched } = formik;
  const [photoPreview, setPhotoPreview] = useState(null);

  useImperativeHandle(ref, () => ({
    submitForm: () => submitForm(),
  }), [submitForm]);

  // --- HANDLERS ---
  const handleOrgCheck = (fieldPath, e) => {
    const isChecked = e?.target ? e.target.checked : e;
    setFieldValue(fieldPath, isChecked);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 🔴 Image Validation
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Only JPEG, JPG, and PNG files are allowed.");
        return;
      }
      setFieldValue("familyGroupPhotoFile", file); 
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const initialOtherMember = {
    fullName: "", relationId: "", bloodGroupId: "", genderId: "", 
    dateOfBirth: "", nationality: "Indian", email: "", 
    phoneNumber: "", occupation: "", isSriChaitanyaEmp: false, parentEmpId: "",
    isLate: false
  };

  if (isLoading || !dropdowns) return <div>Loading form data...</div>;

  return (
    <div className={styles.container}>
      <FormikProvider value={formik}>
        {/* 🔴 Validation Alert */}
        <FormValidationAlert />

        <form>
          
          {/* ================= FATHER SECTION ================= */}
          <div className={styles.sectionTitle}>
             <span>Father Information</span> 
             <img src={BorderIcon} alt="border" />
          </div>
          
          <div className={styles.checkbox_section}>
             <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                <FormCheckbox
                   name="father.isSriChaitanyaEmp"
                   checked={values.father.isSriChaitanyaEmp}
                   onChange={(e) => handleOrgCheck("father.isSriChaitanyaEmp", e)}
                />
             </div>
          </div>

          <FatherInfo formik={formik} prefix="father" bloodGroupOptions={bloodGroupOptions} />


          {/* ================= MOTHER SECTION ================= */}
          <div className={styles.sectionTitle}>
             <span>Mother Information</span> 
             <img src={BorderIcon} alt="border" />
          </div>

          <div className={styles.checkbox_section}>
             <div className={styles.checkbox_wrapper}>
                <span className={styles.checkbox_label}>Is in Organization?</span>
                <FormCheckbox
                   name="mother.isSriChaitanyaEmp"
                   checked={values.mother.isSriChaitanyaEmp}
                   onChange={(e) => handleOrgCheck("mother.isSriChaitanyaEmp", e)}
                />
             </div>
          </div>

          <MotherInfo formik={formik} prefix="mother" bloodGroupOptions={bloodGroupOptions} />


          {/* ================= PHOTO UPLOAD ================= */}
          <div className={styles.sectionTitle}>
             <span>Family Group Photo</span> 
             <img src={BorderIcon} alt="border" />
          </div>

          <div className={styles.uploadWrapper}>
             <input 
               type="file" 
               id="familyPhoto" 
               hidden 
               accept="image/png, image/jpeg, image/jpg"
               onChange={handlePhotoUpload}
             />
             <label htmlFor="familyPhoto" className={styles.uploadButton}>
               <UploadIcon /> {photoPreview ? "Change Photo" : "Upload Photo"}
             </label>
             {photoPreview && (
               <div style={{ marginTop: '10px' }}> {/* Simple wrapper for preview */}
                 <img src={photoPreview} alt="Preview" style={{ height: '80px', borderRadius: '4px', objectFit: 'cover' }} />
                 <div className={styles.checkbox_label} style={{fontSize: '12px'}}>{values.familyGroupPhotoFile?.name}</div>
               </div>
             )}
          </div>


          {/* ================= DYNAMIC MEMBERS ================= */}
          <FieldArray name="otherMembers">
            {({ push, remove, replace }) => (
              <>
                {values.otherMembers.map((member, index) => {
                  const fieldName = `otherMembers.${index}`;
                  const memberErrors = errors.otherMembers?.[index] || {};
                  const memberTouched = touched.otherMembers?.[index] || {};

                  return (
                  <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Family Member ${index + 1}`}
                    forceFieldset={true} 
                    enableFieldset={true}
                    onRemove={() => remove(index)}
                    onClear={() => replace(index, initialOtherMember)}
                  >
                    <div className={styles.sectionBlock}>
                      
                      {/* LATE CHECKBOX for Member */}
                      <div className={styles.checkbox_section} style={{marginBottom:'10px'}}>
                         <div className={styles.checkbox_wrapper}>
                            <FormCheckbox
                               name={`${fieldName}.isLate`}
                               checked={member.isLate}
                               onChange={(e) => handleOrgCheck(`${fieldName}.isLate`, e)}
                            />
                            <span className={styles.checkbox_label}>Late?</span>
                         </div>
                      </div>

                      {/* Row 1: Name, Relation, Blood Group */}
                      <div className={styles.row}>
                        <Inputbox
                          label="Name *"
                          name={`${fieldName}.fullName`}
                          value={member.fullName}
                          onChange={handleChange}
                          placeholder="Enter Name"
                          error={memberTouched.fullName && memberErrors.fullName}
                        />
                        
                        <Dropdown
                            dropdownname="Relation *"
                            value={dropdowns?.emergencyRelations?.find((r) => Number(r.id) === Number(member.relationId))?.name || ""}
                            results={relationNames}
                            onChange={(e) => {
                                const selected = dropdowns?.emergencyRelations?.find((r) => r.name === e.target.value);
                                setFieldValue(`${fieldName}.relationId`, selected ? Number(selected.id) : "");
                            }}
                            error={memberTouched.relationId && memberErrors.relationId}
                        />
                        
                        <Dropdown
                           dropdownname="Blood Group"
                           name={`${fieldName}.bloodGroupId`}
                           results={bloodGroupOptions} 
                           value={member.bloodGroupId} 
                           onChange={handleChange}
                        />
                      </div>

                      {/* Row 2: Gender, Aadhaar, DOB */}
                      <div className={styles.row}>
                          <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                             <label className={styles.checkbox_label} style={{fontSize:'12px'}}>Gender *</label>
                             <div style={{display:'flex', gap:'15px', marginTop:'5px'}}>
                                <label style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer'}}>
                                    <input type="radio" name={`${fieldName}.genderId`} value="1" onChange={handleChange} checked={String(member.genderId) === "1"}/> 
                                    Male
                                </label>
                                <label style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer'}}>
                                    <input type="radio" name={`${fieldName}.genderId`} value="2" onChange={handleChange} checked={String(member.genderId) === "2"}/> 
                                    Female
                                </label>
                             </div>
                             {memberTouched.genderId && memberErrors.genderId && <div style={{color:'red', fontSize:'10px'}}>{memberErrors.genderId}</div>}
                          </div>

                          <Inputbox 
                             label="Aadhaar No" 
                             name={`${fieldName}.adhaarNo`} 
                             value={member.adhaarNo} 
                             onChange={handleChange} 
                          />

                          <Inputbox
                             type="date"
                             label="DOB"
                             name={`${fieldName}.dateOfBirth`}
                             value={member.dateOfBirth}
                             onChange={handleChange}
                          />
                      </div>

                      {/* Row 3: Occupation, Phone, Email */}
                      <div className={styles.row}>
                        <Inputbox
                          label="Occupation"
                          name={`${fieldName}.occupation`}
                          value={member.occupation}
                          onChange={handleChange}
                          placeholder="Enter Occupation"
                        />
                         <Inputbox
                          label={member.isLate ? "Phone" : "Phone *"}
                          name={`${fieldName}.phoneNumber`}
                          value={member.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                          error={memberTouched.phoneNumber && memberErrors.phoneNumber}
                        />
                         <Inputbox
                          label={member.isLate ? "Email" : "Email *"}
                          name={`${fieldName}.email`}
                          value={member.email}
                          onChange={handleChange}
                          placeholder="abc@xyz.com"
                          error={memberTouched.email && memberErrors.email}
                        />
                      </div>
                    </div>
                  </AddFieldWidget>
                )})}

                <div className={styles.addFamilyWrapper}>
                  <button
                    type="button"
                    className={styles.addFamilyBtn}
                    onClick={() => push(initialOtherMember)}
                  >
                    + Add Family Member
                  </button>
                </div>
              </>
            )}
          </FieldArray>

        </form>
      </FormikProvider>
    </div>
  );
});

export default FamilyInfo;