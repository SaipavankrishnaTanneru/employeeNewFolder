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

// Sub-components
import FatherInfo from "./FatherInfo";
import MotherInfo from "./FatherInfo"; // Reusing structure

const FamilyInfo = forwardRef(({ tempId, onSuccess }, ref) => {
  
  // 1. Fetch Dropdowns (Safety Check Added)
  const { dropdowns, isLoading } = useEmployeeFormQueries();
  
  // Safely map options (Defaults to empty array if loading)
  const bloodGroupOptions = dropdowns?.bloodGroups?.map(bg => bg.name) || []; 

  // 2. Init Formik Hook
  // We pass 'dropdowns' so the hook can map "A+" -> ID 5 during submit
  const { formik } = useFamilyInfoFormik({ 
    tempId, 
    onSuccess, 
    dropdownData: dropdowns 
  });
  
  const { values, setFieldValue, handleChange, submitForm } = formik;

  // 3. Photo Upload State
  const [photoPreview, setPhotoPreview] = useState(null);

  // 4. Expose Submit to Parent (Added dependency array)
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
      setFieldValue("familyGroupPhotoFile", file); 
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const initialOtherMember = {
    fullName: "",
    relationId: "",
    bloodGroupId: "",
    genderId: "", 
    dateOfBirth: "", 
    nationality: "Indian",
    email: "",
    phoneNumber: "",
    occupation: "",
    isSriChaitanyaEmp: false,
    parentEmpId: ""
  };

  // Prevent rendering until dropdowns are ready
  if (isLoading || !dropdowns) {
    return <div>Loading form data...</div>;
  }

  return (
    <div className={styles.container}>
      <FormikProvider value={formik}>
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
               accept="image/*"
               onChange={handlePhotoUpload}
             />
             <label htmlFor="familyPhoto" className={styles.uploadButton}>
               <UploadIcon /> {photoPreview ? "Change Photo" : "Upload Photo"}
             </label>
             {photoPreview && (
               <div className={styles.previewContainer}>
                 <img src={photoPreview} alt="Preview" className={styles.photoPreview} />
                 <span className={styles.fileName}>{values.familyGroupPhotoFile?.name}</span>
               </div>
             )}
          </div>

          {/* ================= DYNAMIC MEMBERS ================= */}
          <FieldArray name="otherMembers">
            {({ push, remove, replace }) => (
              <>
                {values.otherMembers.map((member, index) => (
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
                      <div className={styles.row}>
                        <Inputbox
                          label="Name *"
                          name={`otherMembers.${index}.fullName`}
                          value={member.fullName}
                          onChange={handleChange}
                          placeholder="Enter Name"
                        />
                        
                        <Dropdown
                           dropdownname="Relation"
                           name={`otherMembers.${index}.relationId`}
                           results={["Brother", "Sister", "Spouse", "Child"]} 
                           value={member.relationId}
                           onChange={handleChange}
                        />
                        
                        <Dropdown
                           dropdownname="Blood Group"
                           name={`otherMembers.${index}.bloodGroupId`}
                           results={bloodGroupOptions} 
                           value={member.bloodGroupId} 
                           onChange={handleChange}
                        />
                      </div>

                      {/* GENDER & DOB ROW */}
                      <div className={styles.row}>
                         <div className={styles.genderWrapper}>
                            <label>Gender: </label>
                            {/* Ensure values are compared as strings or numbers consistently */}
                            <label><input type="radio" name={`otherMembers.${index}.genderId`} value="1" onChange={handleChange} checked={String(member.genderId) === "1"}/> Male</label>
                            <label><input type="radio" name={`otherMembers.${index}.genderId`} value="2" onChange={handleChange} checked={String(member.genderId) === "2"}/> Female</label>
                         </div>

                         <Inputbox
                            type="date"
                            label="DOB *"
                            name={`otherMembers.${index}.dateOfBirth`}
                            value={member.dateOfBirth}
                            onChange={handleChange}
                         />
                      </div>

                      <div className={styles.row}>
                        <Inputbox
                          label="Occupation"
                          name={`otherMembers.${index}.occupation`}
                          value={member.occupation}
                          onChange={handleChange}
                          placeholder="Enter Occupation"
                        />
                         <Inputbox
                          label="Phone"
                          name={`otherMembers.${index}.phoneNumber`}
                          value={member.phoneNumber}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </div>
                  </AddFieldWidget>
                ))}

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