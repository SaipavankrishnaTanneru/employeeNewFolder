import React from 'react';
import styles from "../EmployeeProfileComponet/EmployeeProfileMiddle.module.css";

const EmployeeProfileMiddle = () => {
    return(
        <div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Date Of Birth</p>
                    <p className={styles.value}>28-Dec-1997</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Pan Number</p>
                    <p className={styles.value}>265DJPOIA </p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>previous ESI NUMBER</p>
                    <p className={styles.value}>517927</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>TOTAL EXPERIENCE</p>
                    <p className={styles.value}>63721</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Card No</p>
                    <p className={styles.value}>456159753258</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>SSC No</p>
                    <p className={styles.value}>Varsity Edification</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Previous UAN No</p>
                    <p className={styles.value}>AHLIOUUD</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Highest Qualification</p>
                    <p className={styles.value}>B.Tech</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Enrollement No</p>
                    <p className={styles.value}>-</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Category</p>
                    <p className={styles.value}>IT</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Blood Group</p>
                    <p className={styles.value}>A-</p>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileMiddle;