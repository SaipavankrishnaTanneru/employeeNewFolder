import React, { useEffect, useState } from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import GenderSelection from "../../../GenderSelection.jsx/GenderSelection";
import NavTabsWidget from "widgets/NavTabs/NavTabsWidget";
import styles from "./BasicInfoFields.module.css";
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
    <path d="M15.5 19.3747V2.58307M15.5 2.58307L19.375 7.1039M15.5 2.58307L11.625 7.1039" stroke="#3425FF" stroke-width="1.9375" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.333 28.4164H20.6663C24.3192 28.4164 26.1469 28.4164 27.281 27.2823C28.4163 26.1457 28.4163 24.3205 28.4163 20.6664V19.3747C28.4163 15.7219 28.4163 13.8955 27.281 12.7601C26.289 11.7681 24.7674 11.6428 21.958 11.6273M9.04134 11.6273C6.23197 11.6428 4.71038 11.7681 3.71838 12.7601C2.58301 13.8955 2.58301 15.7219 2.58301 19.3747V20.6664C2.58301 24.3205 2.58301 26.1469 3.71838 27.2823C4.10588 27.6698 4.57347 27.9243 5.16634 28.0922" stroke="#3425FF" stroke-width="1.9375" stroke-linecap="round"/>
  </svg>
);
const DeleteIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8V17H11V8H9ZM13 8V17H15V8H13Z" />
  </svg>
);
const EditIcon = () => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.5 2.375H3.95833C3.53841 2.375 3.13568 2.54181 2.83875 2.83875C2.54181 3.13568 2.375 3.53841 2.375 3.95833V15.0417C2.375 15.4616 2.54181 15.8643 2.83875 16.1613C3.13568 16.4582 3.53841 16.625 3.95833 16.625H15.0417C15.4616 16.625 15.8643 16.4582 16.1613 16.1613C16.4582 15.8643 16.625 15.4616 16.625 15.0417V9.5" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5468 2.07782C14.8617 1.76287 15.2889 1.58594 15.7343 1.58594C16.1797 1.58594 16.6068 1.76287 16.9218 2.07782C17.2367 2.39276 17.4137 2.81992 17.4137 3.26532C17.4137 3.71071 17.2367 4.13787 16.9218 4.45282L9.7865 11.5889C9.59851 11.7767 9.36628 11.9142 9.1112 11.9887L6.83674 12.6537C6.76862 12.6736 6.69641 12.6747 6.62767 12.6571C6.55893 12.6395 6.49619 12.6038 6.44601 12.5536C6.39584 12.5034 6.36007 12.4407 6.34246 12.3719C6.32485 12.3032 6.32604 12.231 6.34591 12.1629L7.01091 9.8884C7.08574 9.63352 7.2235 9.40157 7.4115 9.2139L14.5468 2.07782Z" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const employeeTypeTabs = [{ label: "Full Time / Regular", value: 2 }, { label: "Consultant", value: 1 }, { label: "Agency", value: 3 }];
const genderOptions = [{ label: "Male", value: 1 }, { label: "Female", value: 2 }];

const BasicInfoFields = ({ formik }) => {
  const { values, handleChange, setFieldValue, setFieldTouched, touched, errors } = formik;
  const { dropdowns } = useEmployeeFormQueries();
  const [previewUrl, setPreviewUrl] = useState(values.profilePicture || null);

  const getLabelById = (list = [], id) => list.find((i) => Number(i.id) === Number(id))?.name || "";
  const getIdByLabel = (list = [], label) => list.find((i) => i.name === label)?.id || "";

  useEffect(() => { if (values.profilePicture && typeof values.profilePicture === 'string') setPreviewUrl(values.profilePicture); }, [values.profilePicture]);

  const handleFileChange = (e) => {
    const file = e.target.files[0]; if (!file) return;
    if (file.size > 300 * 1024) { alert("Image must be 300kb or less."); return; }
    const objectUrl = URL.createObjectURL(file); setPreviewUrl(objectUrl);
    setFieldValue("profilePictureFile", file);
    const reader = new FileReader(); reader.onload = () => setFieldValue("profilePicture", reader.result); reader.readAsDataURL(file);
    e.target.value = null;
  };

  const handleDeleteImage = () => { setFieldValue("profilePicture", null); setFieldValue("profilePictureFile", null); setPreviewUrl(null); };

  useEffect(() => {
    if (!values.dateOfBirth) { setFieldValue("age", ""); return; }
    const dob = new Date(values.dateOfBirth); const today = new Date(); let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth(); if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    setFieldValue("age", age);
  }, [values.dateOfBirth, setFieldValue]);

  // useEffect(() => {
  //   if (!values.adhaarName) return;
  //   if (!values.firstName && !values.lastName) {
  //     const parts = values.adhaarName.trim().split(" ");
  //     setFieldValue("firstName", parts[0] || "");
  //     setFieldValue("lastName", parts.slice(1).join(" "));
  //   }
  // }, [values.adhaarName, setFieldValue, values.firstName, values.lastName]);

  return (
    <div className={styles.container}>
      <div className={styles.tabsRow}>
        <label className={styles.tabsLabel}>Select Employee Type <span className={styles.required}>*</span></label>
        <NavTabsWidget options={employeeTypeTabs} value={values.modeOfHiringId} onChange={(v) => setFieldValue("modeOfHiringId", v)} />
      </div>
      <div className={styles.topSection}>
        <div className={styles.nameGenderSection}>
          <div className={styles.twoCol}>
            <Inputbox label="Aadhaar Name *" name="adhaarName" value={values.adhaarName} onChange={handleChange} placeholder="Enter Aadhar Number" error={touched.adhaarName && errors.adhaarName} />
            <Inputbox label="First Name *" name="firstName" placeholder="Enter first name" value={values.firstName} onChange={handleChange} error={touched.firstName && errors.firstName} />
          </div>
          <div className={styles.twoCol}>
            <Inputbox label="Surname *" name="lastName" placeholder="Enter surname" value={values.lastName} onChange={handleChange} error={touched.lastName && errors.lastName} />
            <div className={styles.genderRow}>
              <GenderSelection name="genderId" values={values} setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} touched={touched} errors={errors} genderOptions={genderOptions} isSubmitted={formik.submitCount > 0} />
            </div>
          </div>
        </div>
        <div className={styles.profileSection}>
          {!previewUrl ? (
            <>
              <label htmlFor="profileUpload" className={styles.profileUploadCircle}>
                <UploadIcon />
                <span className={styles.uploadText}>Upload image of Employee</span>
              </label>
              <p className={styles.imageNote}>Max image size is 300kb</p>
            </>
          ) : (
            <div className={styles.imageWrapper}>
              <img src={previewUrl} alt="Profile" className={styles.profileImg} />
              <label htmlFor="profileUpload" className={styles.editBtn}><EditIcon /> Edit</label>
              <button type="button" className={styles.deleteImageBtn} onClick={handleDeleteImage}><DeleteIcon /></button>
            </div>
          )}
          <input id="profileUpload" type="file" accept="image/*" className={styles.hiddenInput} onChange={handleFileChange} />
        </div>
      </div>
      <div className={styles.formGrid}>
        <Inputbox label="Aadhaar No *" name="adhaarNo" placeholder="Enter Aadhaar number" value={values.adhaarNo} onChange={handleChange} error={errors.adhaarNo} />
        <Inputbox label="PAN Number" name="pancardNum" placeholder="Enter PAN number" value={values.pancardNum} onChange={handleChange} error={errors.pancardNum} />
        <Inputbox type="date" label="Date of Birth *" name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange} error={errors.dateOfBirth} />
        <Inputbox label="Age" name="age" placeholder="Enter Age" value={values.age} disabled />
        <Inputbox label="Mobile No *" name="primaryMobileNo" placeholder="Enter phone number" value={values.primaryMobileNo} onChange={handleChange} error={errors.primaryMobileNo} />
        <Inputbox label="Email" name="email" placeholder="Enter email id" value={values.email} onChange={handleChange} error={errors.email} />
        <Inputbox label="Father Name *" name="fatherName" placeholder="Enter father name" value={values.fatherName} onChange={handleChange} error={errors.fatherName} />
        <Inputbox label="UAN No *" name="uanNo" placeholder="Enter UAN number" value={values.uanNo} onChange={handleChange} error={errors.uanNo} />
        <Inputbox label="Emergency Contact No *" name="emergencyPhNo" placeholder="Enter emergency contact number" value={values.emergencyPhNo} onChange={handleChange} />
        <Dropdown
          dropdownname="Emergency Relation *"
          value={dropdowns.emergencyRelations.find(r => r.id === values.emergencyRelationId)?.name || ""}
          results={dropdowns.emergencyRelations.map(r => r.name)}
          onChange={(e) => { const selected = dropdowns.emergencyRelations.find(r => r.name === e.target.value); setFieldValue("emergencyRelationId", selected ? selected.id : ""); }}
        />
        <Dropdown
          dropdownname="Blood Group *"
          value={dropdowns.bloodGroups.find((b) => Number(b.id) === Number(values.bloodGroupId))?.name || ""}
          results={dropdowns.bloodGroups.map((b) => b.name)}
          onChange={(e) => { const selected = dropdowns.bloodGroups.find((b) => b.name === e.target.value); setFieldValue("bloodGroupId", selected ? Number(selected.id) : ""); setFieldTouched("bloodGroupId", true, false); }}
        />
        <Dropdown dropdownname="Religion *" value={getLabelById(dropdowns.religions, values.religionId)} results={dropdowns.religions.map((r) => r.name)} onChange={(e) => { const id = getIdByLabel(dropdowns.religions, e.target.value); setFieldValue("religionId", id ? Number(id) : ""); }} />
        <Dropdown dropdownname="Caste" value={getLabelById(dropdowns.castes, values.casteId)} results={dropdowns.castes.map((c) => c.name)} onChange={(e) => { const id = getIdByLabel(dropdowns.castes, e.target.value); setFieldValue("casteId", id ? Number(id) : ""); }} />
        <Dropdown dropdownname="Marital Status *" value={getLabelById(dropdowns.maritalStatus, values.maritalStatusId)} results={dropdowns.maritalStatus.map((m) => m.name)} onChange={(e) => { const id = getIdByLabel(dropdowns.maritalStatus, e.target.value); setFieldValue("maritalStatusId", id ? Number(id) : ""); }} />
        <Dropdown dropdownname="Highest Qualification *" value={getLabelById(dropdowns.qualifications, values.qualificationId)} results={dropdowns.qualifications.map((q) => q.name)} onChange={(e) => { const id = getIdByLabel(dropdowns.qualifications, e.target.value); setFieldValue("qualificationId", id ? Number(id) : ""); }} />
        <Dropdown dropdownname="Category *" value={getLabelById(dropdowns.categories, values.categoryId)} results={dropdowns.categories.map((c) => c.name)} onChange={(e) => { const id = getIdByLabel(dropdowns.categories, e.target.value); setFieldValue("categoryId", id ? Number(id) : ""); }} />
      </div>
    </div>
  );
};
export default BasicInfoFields;