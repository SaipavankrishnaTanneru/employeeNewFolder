import React, { useEffect } from "react";
import styles from "./QualificationUpdate.module.css";
import Dropdown from "widgets/Dropdown/Dropdown";
import InputBox from "widgets/Inputbox/InputBox";
import { useQualificationFormik } from "hooks/useQualificationFormik"; // Reuse existing hook
import { 
    useQualificationDetails, 
    useQualificationsList, 
    useDegreesByQualId 
} from "api/onBoardingForms/postApi/useQualificationQueries";

// Helper Component for a Single Row to manage its own dropdowns
const QualificationRow = ({ item, index, formik, qualList }) => {
    const { setFieldValue, handleChange } = formik;
    
    // Fetch Degrees based on selected Qualification ID
    const { data: degreeList = [] } = useDegreesByQualId(item.qualificationId);

    const handleDropdownChange = (field, list, e) => {
        const selectedName = e.target.value;
        const selectedObj = list.find((opt) => opt.name === selectedName);
        setFieldValue(`qualifications.${index}.${field}`, selectedObj ? selectedObj.id : "");
        
        // Reset Degree if Qualification changes
        if(field === "qualificationId") {
            setFieldValue(`qualifications.${index}.qualificationDegreeId`, "");
        }
    };

    const getName = (id, list) => list.find(x => x.id === Number(id))?.name || "";

    return (
        <div className={styles.block}>
          <div className={styles.block_header}>
            <span>Qualification {index + 1}</span>
          </div>

          <div className={styles.form_grid}>
            <Dropdown
              dropdownname="Qualification"
              name={`qualifications.${index}.qualificationId`}
              results={qualList.map(q => q.name)}
              value={getName(item.qualificationId, qualList)}
              onChange={(e) => handleDropdownChange("qualificationId", qualList, e)}
            />

            <Dropdown
              dropdownname="Degree"
              name={`qualifications.${index}.qualificationDegreeId`}
              results={degreeList.map(d => d.name)}
              value={getName(item.qualificationDegreeId, degreeList)}
              onChange={(e) => handleDropdownChange("qualificationDegreeId", degreeList, e)}
              disabled={!item.qualificationId}
            />

            <InputBox
              label="Specialization"
              name={`qualifications.${index}.specialization`}
              value={item.specialization}
              onChange={handleChange}
            />

            <InputBox
              label="University"
              name={`qualifications.${index}.university`}
              value={item.university}
              onChange={handleChange}
            />

            <InputBox
              label="Institute"
              name={`qualifications.${index}.institute`}
              value={item.institute}
              onChange={handleChange}
            />

            <InputBox
              label="Passed Out Year"
              name={`qualifications.${index}.passedOutYear`}
              value={item.passedOutYear}
              onChange={handleChange}
              type="number"
            />
          </div>

          <div className={styles.upload_row}>
            <button type="button" className={styles.upload_btn}>
              Upload Certificate 
            </button>
          </div>
        </div>
    );
};

const QualificationUpdate = ({ tempId, onSuccess }) => {
  
  // 1. Init Formik
  const { formik, initialQualification } = useQualificationFormik({ tempId, onSuccess });
  const { values, setFieldValue, submitForm } = formik;

  // 2. Fetch Data to Pre-fill
  const { data: savedData } = useQualificationDetails(tempId);
  const { data: qualList = [] } = useQualificationsList();

  useEffect(() => {
    if (savedData) {
        let list = [];
        if (Array.isArray(savedData)) list = savedData;
        else if (savedData.qualifications) list = savedData.qualifications;

        if (list.length > 0) {
            // Map API response to Formik structure
            const mapped = list.map(q => ({
                qualificationId: q.qualificationId || "",
                qualificationDegreeId: q.qualificationDegreeId || "",
                specialization: q.specialization || "",
                university: q.university || "",
                institute: q.institute || "",
                passedOutYear: q.passedOutYear || "",
                // ... other fields
            }));
            setFieldValue("qualifications", mapped);
        }
    }
  }, [savedData, setFieldValue]);

  return (
    <div className={styles.container}>
      {values.qualifications.map((item, index) => (
        <QualificationRow 
            key={index} 
            index={index} 
            item={item} 
            formik={formik}
            qualList={qualList} 
        />
      ))}
      
      <div style={{marginTop: '20px', textAlign: 'right'}}>
         <button onClick={submitForm} className={styles.save_btn}>Save Changes</button>
      </div>
    </div>
  );
};

export default QualificationUpdate;