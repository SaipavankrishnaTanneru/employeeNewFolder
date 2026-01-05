import React from 'react';
import styles from "../EmployeeProfileComponet/EmployeeProfileMiddle.module.css";
const EmployeeProfileMiddle = ({ data }) => {
   
    // Helper to format date (YYYY-MM-DD to DD-MMM-YYYY)
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";
        
        return date.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).replace(/ /g, '-');
    };
    // Safety check
    const safeData = data || {};
    return (
        <div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Date Of Birth</p>
                    <p className={styles.value}>{formatDate(safeData?.dateOfBirth)}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Pan Number</p>
                    <p className={styles.value}>{safeData?.pancardNo || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Previous ESI NUMBER</p>
                    <p className={styles.value}>{safeData?.preEsiNo || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>TOTAL EXPERIENCE</p>
                    {/* Handles null experience correctly */}
                    <p className={styles.value}>{safeData?.totalExperience ? `${safeData.totalExperience} Yrs` : "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Card No</p>
                    <p className={styles.value}>{safeData?.adhaarNo || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>SSC No</p>
                    <p className={styles.value}>{safeData?.sscNo || "-"}</p>
                </div>
                {/* Removed Previous UAN No as it's not in the JSON */}
                <div className={styles.infoItem}>
                    <p className={styles.label}>Highest Qualification</p>
                    <p className={styles.value}>{safeData?.highestQualification || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Enrollment No</p>
                    <p className={styles.value}>{safeData?.adhaarEnrolmentNo || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Category</p>
                    <p className={styles.value}>{safeData?.categoryName || "-"}</p>
                </div>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Blood Group</p>
                    <p className={styles.value}>{safeData?.bloodGroupName || "-"}</p>
                </div>
                {/* Added empType as it's not displayed elsewhere */}
                <div className={styles.infoItem}>
                    <p className={styles.label}>Employee Type</p>
                    <p className={styles.value}>{safeData?.empType || "-"}</p>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileMiddle;