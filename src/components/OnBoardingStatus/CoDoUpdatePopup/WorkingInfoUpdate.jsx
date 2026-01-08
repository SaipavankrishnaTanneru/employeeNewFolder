import React, { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./WorkingInfoUpdate.module.css";
import InputBox from "widgets/Inputbox/InputBox";
import Dropdown from "widgets/Dropdown/Dropdown";
import { useEmployeeProfileView } from "api/do/getpapis/useEmployeeProfileView"; 
import { updateBasicInfo } from "api/onBoardingForms/dropDownApi/useEmployeeFormData"; 
import { useEmployeeFormQueries } from "api/onBoardingForms/dropDownApi/useEmployeeFormData"; 

const WorkinginfoUpdate = ({ activeId, onSuccess, onSaveRef }) => {
  const formikRef = useRef();

  // 1. Fetch Data (if not passed as prop)
  const { data: profileData } = useEmployeeProfileView(activeId);

  // 2. Fetch Dropdowns (Campus, Hiring Mode, etc.)
  // We need campusId to fetch buildings, so we track it from formik values ideally
  // For now, we fetch generic lists or use optional chaining
  const { dropdowns } = useEmployeeFormQueries(); 

  // 3. Initial Values & Mapping
  const initialValues = {
    campusId: "",
    campusCode: "", // Read-only usually populated by Campus selection
    campusType: "", // Read-only
    location: "",   // Read-only
    buildingId: "",
    managerId: "",
    empWorkModeId: "",
    joinTypeId: "", // Joining As
    replacedByEmpId: "", // Replacement Employee
    modeOfHiringId: "",
    hiredByEmpId: "",
    dateOfJoin: "", // Joining Date
  };

  // 4. Update Handler
  const handleSubmit = async (values) => {
    console.log("🚀 Updating Working Info...", values);
    try {
        // Construct payload - Basic Info API usually handles working info fields too
        const payload = {
            ...values,
            // Ensure IDs are numbers
            campusId: Number(values.campusId),
            buildingId: Number(values.buildingId),
            managerId: Number(values.managerId),
            empWorkModeId: Number(values.empWorkModeId),
            joinTypeId: Number(values.joinTypeId),
            replacedByEmpId: Number(values.replacedByEmpId),
            modeOfHiringId: Number(values.modeOfHiringId),
            hiredByEmpId: Number(values.hiredByEmpId),
            // Ensure date format
            dateOfJoin: values.dateOfJoin,
            // Required for API context if it's the 'updateBasicInfo' endpoint
            tempPayrollId: activeId, 
            updatedBy: 0 // Replace with actual user ID
        };

        await updateBasicInfo(activeId, payload);
        alert("Working Info Updated Successfully!");
        if (onSuccess) onSuccess();
    } catch (error) {
        console.error("Update failed:", error);
        alert("Failed to update.");
    }
  };

  // Connect External Save Button
  useEffect(() => {
    if (onSaveRef) onSaveRef.current = () => formikRef.current?.submitForm();
  }, [onSaveRef]);

  // Pre-fill Form
  useEffect(() => {
    if (profileData && formikRef.current) {
        const d = profileData;
        formikRef.current.setValues({
            campusId: d.campusId || "",
            campusCode: d.campusCode || "",
            campusType: d.campusType || "",
            location: d.location || "",
            buildingId: d.buildingId || "",
            managerId: d.managerId || "",
            empWorkModeId: d.workingModeId || d.empWorkModeId || "",
            joinTypeId: d.joiningAsTypeId || d.joinTypeId || "",
            replacedByEmpId: d.replacedByEmpId || "",
            modeOfHiringId: d.modeOfHiringId || "",
            hiredByEmpId: d.hiredByEmpId || "",
            dateOfJoin: d.joiningDate ? d.joiningDate.split("T")[0] : "",
        });
    }
  }, [profileData]);

  // Helper to find name by ID
  const getName = (id, list) => list?.find(item => item.id === Number(id))?.name || "";

  return (
    <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        onSubmit={handleSubmit}
    >
    {({ values, handleChange, setFieldValue }) => (
        <Form className={styles.container}>
            <div className={styles.form_grid}>
                
                {/* Campus */}
                <Dropdown
                    dropdownname="Campus"
                    value={getName(values.campusId, dropdowns.campuses)}
                    results={dropdowns.campuses.map(c => c.name)}
                    onChange={(e) => {
                        const selected = dropdowns.campuses.find(c => c.name === e.target.value);
                        setFieldValue("campusId", selected?.id || "");
                        // Auto-fill related fields if available in dropdown data
                        // setFieldValue("campusCode", selected?.code || ""); 
                    }}
                />

                <InputBox label="Campus Code" value={values.campusCode} disabled />
                <InputBox label="Campus Type" value={values.campusType} disabled />
                <InputBox label="Location" value={values.location} disabled />

                {/* Building - Note: This should ideally be filtered by CampusId */}
                <Dropdown
                    dropdownname="Building"
                    value={getName(values.buildingId, dropdowns.buildings)}
                    results={dropdowns.buildings.map(b => b.name)}
                    onChange={(e) => {
                        const selected = dropdowns.buildings.find(b => b.name === e.target.value);
                        setFieldValue("buildingId", selected?.id || "");
                    }}
                />

                {/* Manager */}
                <Dropdown
                    dropdownname="Manager"
                    value={getName(values.managerId, dropdowns.employees)}
                    results={dropdowns.employees.map(e => e.name)}
                    onChange={(e) => {
                        const selected = dropdowns.employees.find(emp => emp.name === e.target.value);
                        setFieldValue("managerId", selected?.id || "");
                    }}
                />

                {/* Working Mode */}
                <Dropdown
                    dropdownname="Working Mode"
                    value={getName(values.empWorkModeId, dropdowns.workModes)}
                    results={dropdowns.workModes.map(w => w.name)}
                    onChange={(e) => {
                        const selected = dropdowns.workModes.find(w => w.name === e.target.value);
                        setFieldValue("empWorkModeId", selected?.id || "");
                    }}
                />

                {/* Joining As */}
                <Dropdown
                    dropdownname="Joining As"
                    value={getName(values.joinTypeId, dropdowns.joinTypes)}
                    results={dropdowns.joinTypes.map(j => j.name)}
                    onChange={(e) => {
                        const selected = dropdowns.joinTypes.find(j => j.name === e.target.value);
                        setFieldValue("joinTypeId", selected?.id || "");
                    }}
                />

                {/* Replacement Employee */}
                <Dropdown
                    dropdownname="Replacement Employee"
                    value={getName(values.replacedByEmpId, dropdowns.employees)}
                    results={dropdowns.employees.map(e => e.name)}
                    onChange={(e) => {
                        const selected = dropdowns.employees.find(emp => emp.name === e.target.value);
                        setFieldValue("replacedByEmpId", selected?.id || "");
                    }}
                />

                {/* Mode of Hiring */}
                <Dropdown
                    dropdownname="Mode Of Hiring"
                    value={getName(values.modeOfHiringId, dropdowns.hiringModes)}
                    results={dropdowns.hiringModes.map(h => h.name)}
                    onChange={(e) => {
                        const selected = dropdowns.hiringModes.find(h => h.name === e.target.value);
                        setFieldValue("modeOfHiringId", selected?.id || "");
                    }}
                />

                {/* Hired By */}
                <Dropdown
                    dropdownname="Hired By"
                    value={getName(values.hiredByEmpId, dropdowns.employees)}
                    results={dropdowns.employees.map(e => e.name)}
                    onChange={(e) => {
                        const selected = dropdowns.employees.find(emp => emp.name === e.target.value);
                        setFieldValue("hiredByEmpId", selected?.id || "");
                    }}
                />

                {/* Joining Date */}
                <InputBox
                    label="Joining Date"
                    type="date"
                    value={values.dateOfJoin}
                    onChange={handleChange("dateOfJoin")}
                />

            </div>
        </Form>
    )}
    </Formik>
  );
};

export default WorkinginfoUpdate;