import React, { useEffect } from "react";
import styles from "./FamilyInfoUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
import AddFieldWidget from "widgets/AddFieldWidget/AddFieldWidget";
import { useFamilyInfoFormik } from "hooks/useFamilyInfoFormik";

// 1. Import your existing Big Query Hook
// ⚠️ CHECK PATH: Update this to where 'useEmployeeFormQueries' is saved
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData"; 

const FamilyInfoUpdate = ({ activeId, onSaveRef, onSuccess }) => {
  
  // 2. Fetch All Dropdowns using your existing hook
  const { dropdowns } = useEmployeeFormQueries();

  // 3. Initialize Form Logic with the fetched dropdowns
  const { formik } = useFamilyInfoFormik({ 
    tempId: activeId, 
    onSuccess,
    dropdownData: dropdowns // Pass the whole object (contains bloodGroups, emergencyRelations, etc.)
  });

  const { values, setFieldValue, submitForm } = formik;

  useEffect(() => {
    if (onSaveRef) onSaveRef.current = submitForm;
  }, [submitForm, onSaveRef]);

  // --- HELPERS ---
  const addMember = () => {
    setFieldValue("otherMembers", [
      ...values.otherMembers, 
      { fullName: "", relationId: "", genderId: "", isDependent: false } 
    ]);
  };

  const removeMember = (index) => {
    const updated = values.otherMembers.filter((_, i) => i !== index);
    setFieldValue("otherMembers", updated);
  };

  const clearMember = (index) => {
    const updated = values.otherMembers.map((m, i) => i === index ? { ...m, fullName: "", email: "" } : m);
    setFieldValue("otherMembers", updated);
  };

  const setNestedValue = (section, field, value) => {
    setFieldValue(`${section}.${field}`, value);
  };

  return (
    <div className={styles.container}>
      
      {/* --- FATHER --- */}
      <div className={styles.section}>
        <div className={styles.section_header_row}>
            <h4 className={styles.section_title}>Father Details</h4>
        </div>
        <div className={styles.form_grid}>
             <InputBox label="Name" value={values.father.fullName} onChange={(e) => setNestedValue("father", "fullName", e.target.value)} />
             <InputBox label="Email" value={values.father.email} onChange={(e) => setNestedValue("father", "email", e.target.value)} />
             <InputBox label="Phone" value={values.father.phoneNumber} onChange={(e) => setNestedValue("father", "phoneNumber", e.target.value)} />
             <InputBox label="Occupation" value={values.father.occupation} onChange={(e) => setNestedValue("father", "occupation", e.target.value)} />
             
             {/* Blood Group Dropdown */}
             <Dropdown 
                dropdownname="Blood Group"
                value={dropdowns?.bloodGroups?.find(b => b.id === values.father.bloodGroupId)?.name || ""}
                results={dropdowns?.bloodGroups?.map(b => b.name) || []}
                onChange={(e) => {
                    const found = dropdowns?.bloodGroups?.find(b => b.name === e.target.value);
                    setNestedValue("father", "bloodGroupId", found?.id);
                }}
             />
             
             <Dropdown 
                dropdownname="Nationality"
                value={values.father.nationality}
                results={["Indian", "Other"]}
                onChange={(e) => setNestedValue("father", "nationality", e.target.value)}
             />
        </div>
      </div>

      {/* --- MOTHER --- */}
      <div className={styles.section}>
        <div className={styles.section_header_row}>
            <h4 className={styles.section_title}>Mother Details</h4>
        </div>
        <div className={styles.form_grid}>
             <InputBox label="Name" value={values.mother.fullName} onChange={(e) => setNestedValue("mother", "fullName", e.target.value)} />
             <InputBox label="Email" value={values.mother.email} onChange={(e) => setNestedValue("mother", "email", e.target.value)} />
             <InputBox label="Phone" value={values.mother.phoneNumber} onChange={(e) => setNestedValue("mother", "phoneNumber", e.target.value)} />
             <InputBox label="Occupation" value={values.mother.occupation} onChange={(e) => setNestedValue("mother", "occupation", e.target.value)} />
             
             <Dropdown 
                dropdownname="Blood Group"
                value={dropdowns?.bloodGroups?.find(b => b.id === values.mother.bloodGroupId)?.name || ""}
                results={dropdowns?.bloodGroups?.map(b => b.name) || []}
                onChange={(e) => {
                    const found = dropdowns?.bloodGroups?.find(b => b.name === e.target.value);
                    setNestedValue("mother", "bloodGroupId", found?.id);
                }}
             />
             
             <Dropdown 
                dropdownname="Nationality"
                value={values.mother.nationality}
                results={["Indian", "Other"]}
                onChange={(e) => setNestedValue("mother", "nationality", e.target.value)}
             />
        </div>
      </div>

      {/* --- OTHER MEMBERS --- */}
      <div className={styles.section}>
          <div className={styles.section_header_row}>
            <h4 className={styles.section_title}>Other Members</h4>
            <button type="button" className={styles.add_btn} onClick={addMember}>+ Add</button>
          </div>

          <div className={styles.dynamic_list}>
            {values.otherMembers.map((member, index) => (
                <AddFieldWidget
                    key={index}
                    index={index}
                    title={`Member ${index + 1}`}
                    enableFieldset={true}
                    forceFieldset={true}
                    onRemove={() => removeMember(index)}
                    onClear={() => clearMember(index)}
                >
                    <div className={styles.form_grid}>
                        <InputBox label="Name" value={member.fullName} onChange={(e) => setFieldValue(`otherMembers[${index}].fullName`, e.target.value)} />
                        
                        {/* Relation Dropdown */}
                        <Dropdown 
                            dropdownname="Relation"
                            // ⚠️ Note: 'emergencyRelations' is the key in your useEmployeeFormQueries
                            value={dropdowns?.emergencyRelations?.find(r => r.id === member.relationId)?.name || ""}
                            results={dropdowns?.emergencyRelations?.map(r => r.name) || []}
                            onChange={(e) => {
                                const found = dropdowns?.emergencyRelations?.find(r => r.name === e.target.value);
                                setFieldValue(`otherMembers[${index}].relationId`, found?.id);
                            }}
                        />

                        <InputBox label="Phone" value={member.phoneNumber} onChange={(e) => setFieldValue(`otherMembers[${index}].phoneNumber`, e.target.value)} />
                        <InputBox label="Email" value={member.email} onChange={(e) => setFieldValue(`otherMembers[${index}].email`, e.target.value)} />
                        
                        <Dropdown 
                            dropdownname="Blood Group"
                            value={dropdowns?.bloodGroups?.find(b => b.id === member.bloodGroupId)?.name || ""}
                            results={dropdowns?.bloodGroups?.map(b => b.name) || []}
                            onChange={(e) => {
                                const found = dropdowns?.bloodGroups?.find(b => b.name === e.target.value);
                                setFieldValue(`otherMembers[${index}].bloodGroupId`, found?.id);
                            }}
                        />
                    </div>
                </AddFieldWidget>
            ))}
          </div>
      </div>

    </div>
  );
};

export default FamilyInfoUpdate;