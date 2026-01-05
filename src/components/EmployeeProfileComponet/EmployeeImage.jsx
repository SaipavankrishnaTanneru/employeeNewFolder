import React from "react";
import styles from "./EmployeeImage.module.css";
import { Tooltip } from "@mui/material";
// Icons (Ensure paths are correct)
import phoneIcon from "assets/EmployeeProfileCrad/phoneIcon.svg";
import callIconOutLine from "assets/RightSideInformation Icons/callIconOutLine.svg";
import dotsIcon from "assets/EmployeeProfileCrad/dotsicon.svg";
import mailIconOutline from "assets/RightSideInformation Icons/MailIconOutLine.svg";
import gendericon from "assets/EmployeeProfileCrad/Gendericon.svg";
// 1. Static Image Import
import emp_image from "assets/EmployeeProfileCrad/emp_image.jpg";
const EmployeeImage = ({ data }) => {
   
    // Safety check
    const safeData = data || {};
    const {
        fullName,
        empId, // Added empId
        tempPayrollId, // Correct field for TEMP ID
        payrollId, // Added payrollId
        designationName,
        primaryMobileNo,
        email,
        genderName,
        dateOfBirth,
        empType
    } = safeData;
    // Helper to calculate age
    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = new Date(dob);
        if (isNaN(birthDate.getTime())) return "";
        const difference = Date.now() - birthDate.getTime();
        const ageDate = new Date(difference);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    const age = calculateAge(dateOfBirth);
    return (
        <div className={styles.employeeprofileContainer}>
            <figure className={styles.employeeProfile}>
                {/* 2. Static Image Used Here */}
                <img className={styles.emp_img} src={emp_image} alt="Profile" />
            </figure>
            <div className={styles.infoSection}>
                {/* 3. Label changed to Temp ID, added empId and payrollId */}
                <p className={styles.empId}>
                    Temp ID:<br />
                    <span>{tempPayrollId || "-"}</span>
                </p>
                <p className={styles.empId}>
                    Employee ID:<br />
                    <span>{empId || "-"}</span>
                </p>
                {payrollId && (
                    <p className={styles.empId}>
                        Payroll ID:<br />
                        <span>{payrollId}</span>
                    </p>
                )}
                <h3 className={styles.name}>{fullName || "Unknown Name"}</h3>
                <div className={styles.details}>
                    <span className={styles.detail}>
                        <img src={gendericon} alt="Gender" className={styles.icon} />
                        {genderName || "-"}
                    </span>
                    <span className={styles.detail}>• {age ? `${age} Yrs` : "-"}</span>
                </div>
                <div className={styles.actions}>
                    {/* Shows Designation or falls back to empType (e.g. "Temporary") */}
                    <button className={styles.designation}>
                        {designationName || empType || "Employee"}
                    </button>
                    {/* Phone Tooltip */}
                    <Tooltip
                        title={
                            primaryMobileNo ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <img src={callIconOutLine} alt="Phone" style={{ width: "14px", height: "14px" }} />
                                    <span>{primaryMobileNo}</span>
                                </div>
                            ) : "No Number"
                        }
                        arrow placement="top"
                        componentsProps={{
                            tooltip: { sx: { backgroundColor: "#fff", color: "#3425FF", border: "1px solid #3425FF" } },
                            arrow: { sx: { color: "#FFF", "&::before": { border: "1px solid #3425FF" } } },
                        }}
                    >
                    <figure style={{ cursor: primaryMobileNo ? "pointer" : "default" }}>
                        <img src={phoneIcon} alt="Call" />
                    </figure>
                    </Tooltip>
                    {/* Email Tooltip */}
                    <Tooltip
                        title={
                            email ? (
                                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <img src={mailIconOutline} alt="Email" style={{ width: "14px", height: "14px" }} />
                                    <span>{email}</span>
                                </div>
                            ) : "No Email"
                        }
                        arrow placement="top"
                        componentsProps={{
                            tooltip: { sx: { backgroundColor: "#fff", color: "#3425FF", border: "1px solid #3425FF" } },
                            arrow: { sx: { color: "#FFF", "&::before": { border: "1px solid #3425FF" } } },
                        }}
                    >
                    <figure style={{ cursor: email ? "pointer" : "default" }}>
                        <img src={dotsIcon} alt="Options" />
                    </figure>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
export default EmployeeImage;