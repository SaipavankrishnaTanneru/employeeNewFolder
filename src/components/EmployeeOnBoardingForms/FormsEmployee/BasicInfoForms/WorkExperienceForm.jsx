// import React from "react";
// import Inputbox from "widgets/Inputbox/InputBox";
// import Dropdown from "widgets/Dropdown/Dropdown";
// import styles from "./WorkExperienceForm.module.css";
// import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

// const getLabelById = (list = [], id, labelKey = "name") => list.find((i) => Number(i.id) === Number(id))?.[labelKey] || "";
// const getIdByLabel = (list = [], label, labelKey = "name") => list.find((i) => i[labelKey] === label)?.id || "";

// const CONSULTANT_ID = 2;
// const REPLACEMENT_ID = 3;

// const WorkExperienceForm = ({ formik }) => {
//   const { values, setFieldValue, handleChange, errors } = formik;
//   const { dropdowns, campusInfo, buildingInfo } = useEmployeeFormQueries(values.campusId, values.buildingId);
//   return (
//     <div className={styles.WorkExperience_container}>
//       <div className={styles.formGrid}>
//         <div className={styles.row}>
//           <Dropdown
//             dropdownname="Campus *"
//             value={getLabelById(dropdowns.campuses, values.campusId)}
//             results={dropdowns.campuses.map((c) => c.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.campuses, e.target.value); setFieldValue("campusId", id ? Number(id) : ""); setFieldValue("buildingId", ""); }}
//           />
//           <Inputbox label="Campus Code" value={campusInfo?.campusCode || ""} placeholder="Enter Campus Code" disabled />
//           <Inputbox label="Campus Type" value={campusInfo?.campusType || ""} placeholder="Enter Campus Type" disabled />
//           <Inputbox label="Location" value={campusInfo?.location || ""} placeholder="Enter Location" disabled />
//         </div>
//         <div className={styles.row}>
//           <Dropdown
//             dropdownname="Building *"
//             value={getLabelById(dropdowns.buildings, values.buildingId)}
//             results={dropdowns.buildings.map((b) => b.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.buildings, e.target.value); setFieldValue("buildingId", id ? Number(id) : ""); }}
//             disabled={!values.campusId}
//           />
//           <Inputbox label="Dean Name" value={buildingInfo?.deanName || ""} placeholder="Enter Dean Name" disabled />
//           <Inputbox label="AGM Name" value={buildingInfo?.agmName || ""} placeholder="Enter AGM Name" disabled />
//         </div>
//         <div className={styles.row}>
//           <Dropdown
//             dropdownname="Manager *"
//             value={getLabelById(dropdowns.employees, values.managerId)}
//             results={dropdowns.employees.map((e) => e.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.employees, e.target.value); setFieldValue("managerId", id ? Number(id) : ""); }}
//           />
//           <Dropdown
//             dropdownname="Working Mode *"
//             value={getLabelById(dropdowns.workModes, values.empWorkModeId)}
//             results={dropdowns.workModes.map((w) => w.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.workModes, e.target.value); setFieldValue("empWorkModeId", id ? Number(id) : ""); }}
//           />
//           <Dropdown
//             dropdownname="Joining As *"
//             value={getLabelById(dropdowns.joinTypes, values.joinTypeId)}
//             results={dropdowns.joinTypes.map((j) => j.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.joinTypes, e.target.value); setFieldValue("joinTypeId", id ? Number(id) : ""); setFieldValue("replacedByEmpId", ""); setFieldValue("contractStartDate", ""); setFieldValue("contractEndDate", ""); }}
//           />
//         </div>
//         <div className={styles.row}>
//           <Dropdown
//             dropdownname="Reference Employee"
//             value={getLabelById(dropdowns.employees, values.referenceEmployeeId)}
//             results={dropdowns.employees.map((e) => e.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.employees, e.target.value); setFieldValue("referenceEmployeeId", id ? Number(id) : ""); }}
//           />
//           <Dropdown
//             dropdownname="Hired By Employee"
//             value={getLabelById(dropdowns.employees, values.hiredByEmpId)}
//             results={dropdowns.employees.map((e) => e.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.employees, e.target.value); setFieldValue("hiredByEmpId", id ? Number(id) : ""); }}
//           />
//           <Dropdown
//             dropdownname="Reporting Manager"
//             value={getLabelById(dropdowns.employees, values.reportingManagerId)}
//             results={dropdowns.employees.map((e) => e.name)}
//             onChange={(e) => { const id = getIdByLabel(dropdowns.employees, e.target.value); setFieldValue("reportingManagerId", id ? Number(id) : ""); }}
//           />
//         </div>
//         {values.joinTypeId === REPLACEMENT_ID && (
//           <div className={styles.row}>
//             <Dropdown
//               dropdownname="Replacement Employee *"
//               value={getLabelById(dropdowns.employees, values.replacedByEmpId)}
//               results={dropdowns.employees.map((e) => e.name)}
//               onChange={(e) => { const id = getIdByLabel(dropdowns.employees, e.target.value); setFieldValue("replacedByEmpId", id ? Number(id) : ""); }}
//               error={errors.replacedByEmpId}
//             />
//           </div>
//         )}
//         {values.joinTypeId === CONSULTANT_ID && (
//           <div className={styles.row}>
//             <Inputbox type="date" label="Contract Start Date *" name="contractStartDate" value={values.contractStartDate} onChange={handleChange} error={errors.contractStartDate} />
//             <Inputbox type="date" label="Contract End Date *" name="contractEndDate" value={values.contractEndDate} onChange={handleChange} error={errors.contractEndDate} />
//           </div>
//         )}
//         <div className={styles.row}>
//           <Inputbox type="date" label="Date of Joining *" name="dateOfJoin" value={values.dateOfJoin} onChange={handleChange} error={errors.dateOfJoin} />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default WorkExperienceForm;

import React from "react";
import Inputbox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import styles from "./WorkExperienceForm.module.css";
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData";

// Helper functions to manage ID <-> Label mapping
const getLabelById = (list = [], id, labelKey = "name") => 
  list.find((i) => Number(i.id) === Number(id))?.[labelKey] || "";

const getIdByLabel = (list = [], label, labelKey = "name") => 
  list.find((i) => i[labelKey] === label)?.id || "";

const WorkExperienceForm = ({ formik }) => {
  const { values, setFieldValue, handleChange, errors } = formik;
  const { dropdowns, campusInfo, buildingInfo } = useEmployeeFormQueries(values.campusId, values.buildingId);

  // ---------------------------------------------------------------------------
  // 🟢 DYNAMIC TYPE DETECTION
  // Instead of hardcoding IDs (like 2 or 3), we check the label text directly.
  // ---------------------------------------------------------------------------
  const joinTypeLabel = getLabelById(dropdowns.joinTypes, values.joinTypeId)?.toLowerCase() || "";
  
  // Logic: True if the label contains "consultant" (e.g. "Senior Consultant", "Consultant")
  const isConsultant = joinTypeLabel.includes("consultant");
  
  // Logic: True if the label contains "replacement"
  const isReplacement = joinTypeLabel.includes("replacement");

  return (
    <div className={styles.WorkExperience_container}>
      <div className={styles.formGrid}>
        
        {/* --- ROW 1: CAMPUS DETAILS --- */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Campus *"
            value={getLabelById(dropdowns.campuses, values.campusId)}
            results={dropdowns.campuses.map((c) => c.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.campuses, e.target.value); 
              setFieldValue("campusId", id ? Number(id) : ""); 
              setFieldValue("buildingId", ""); // Reset building when campus changes
            }}
          />
          <Inputbox label="Campus Code" value={campusInfo?.campusCode || ""} placeholder="Enter Campus Code" disabled />
          <Inputbox label="Campus Type" value={campusInfo?.campusType || ""} placeholder="Enter Campus Type" disabled />
          <Inputbox label="Location" value={campusInfo?.location || ""} placeholder="Enter Location" disabled />
        </div>

        {/* --- ROW 2: BUILDING DETAILS --- */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Building *"
            value={getLabelById(dropdowns.buildings, values.buildingId)}
            results={dropdowns.buildings.map((b) => b.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.buildings, e.target.value); 
              setFieldValue("buildingId", id ? Number(id) : ""); 
            }}
            disabled={!values.campusId}
          />
          <Inputbox label="Dean Name" value={buildingInfo?.deanName || ""} placeholder="Enter Dean Name" disabled />
          <Inputbox label="AGM Name" value={buildingInfo?.agmName || ""} placeholder="Enter AGM Name" disabled />
        </div>

        {/* --- ROW 3: WORK DETAILS --- */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Manager *"
            value={getLabelById(dropdowns.employees, values.managerId)}
            results={dropdowns.employees.map((e) => e.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.employees, e.target.value); 
              setFieldValue("managerId", id ? Number(id) : ""); 
            }}
          />
          <Dropdown
            dropdownname="Working Mode *"
            value={getLabelById(dropdowns.workModes, values.empWorkModeId)}
            results={dropdowns.workModes.map((w) => w.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.workModes, e.target.value); 
              setFieldValue("empWorkModeId", id ? Number(id) : ""); 
            }}
          />
          <Dropdown
            dropdownname="Joining As *"
            value={getLabelById(dropdowns.joinTypes, values.joinTypeId)}
            results={dropdowns.joinTypes.map((j) => j.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.joinTypes, e.target.value); 
              setFieldValue("joinTypeId", id ? Number(id) : ""); 
              
              // 🔄 Reset dependent fields when "Joining As" changes
              setFieldValue("replacedByEmpId", ""); 
              setFieldValue("contractStartDate", ""); 
              setFieldValue("contractEndDate", ""); 
            }}
          />
        </div>

        {/* --- ROW 4: REFERENCES --- */}
        <div className={styles.row}>
          <Dropdown
            dropdownname="Reference Employee"
            value={getLabelById(dropdowns.employees, values.referenceEmployeeId)}
            results={dropdowns.employees.map((e) => e.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.employees, e.target.value); 
              setFieldValue("referenceEmployeeId", id ? Number(id) : ""); 
            }}
          />
          <Dropdown
            dropdownname="Hired By Employee"
            value={getLabelById(dropdowns.employees, values.hiredByEmpId)}
            results={dropdowns.employees.map((e) => e.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.employees, e.target.value); 
              setFieldValue("hiredByEmpId", id ? Number(id) : ""); 
            }}
          />
          <Dropdown
            dropdownname="Reporting Manager"
            value={getLabelById(dropdowns.employees, values.reportingManagerId)}
            results={dropdowns.employees.map((e) => e.name)}
            onChange={(e) => { 
              const id = getIdByLabel(dropdowns.employees, e.target.value); 
              setFieldValue("reportingManagerId", id ? Number(id) : ""); 
            }}
          />
        </div>

        {/* --- ROW 5: CONDITIONAL FIELDS (REPLACEMENT) --- */}
        {isReplacement && (
          <div className={styles.row}>
            <Dropdown
              dropdownname="Replacement Employee *"
              value={getLabelById(dropdowns.employees, values.replacedByEmpId)}
              results={dropdowns.employees.map((e) => e.name)}
              onChange={(e) => { 
                const id = getIdByLabel(dropdowns.employees, e.target.value); 
                setFieldValue("replacedByEmpId", id ? Number(id) : ""); 
              }}
              error={errors.replacedByEmpId}
            />
          </div>
        )}

        {/* --- ROW 6: CONDITIONAL FIELDS (CONSULTANT) --- */}
        {isConsultant && (
          <div className={styles.row}>
            <Inputbox 
              type="date" 
              label="Contract Start Date *" 
              name="contractStartDate" 
              value={values.contractStartDate} 
              onChange={handleChange} 
              error={errors.contractStartDate} 
            />
            <Inputbox 
              type="date" 
              label="Contract End Date *" 
              name="contractEndDate" 
              value={values.contractEndDate} 
              onChange={handleChange} 
              error={errors.contractEndDate} 
            />
          </div>
        )}

        {/* --- ROW 7: DATE OF JOINING --- */}
        <div className={styles.row}>
          <Inputbox 
            type="date" 
            label="Date of Joining *" 
            name="dateOfJoin" 
            value={values.dateOfJoin} 
            onChange={handleChange} 
            error={errors.dateOfJoin} 
          />
        </div>
      </div>
    </div>
  );
};
export default WorkExperienceForm;