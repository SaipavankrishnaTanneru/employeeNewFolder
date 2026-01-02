import React from 'react';
import styles from "../SkillEmployeeImage/SkillEmployeeProfileMiddle.module.css";

const EmployeeProfileMiddle = () => {
    return(
        <div>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <p className={styles.label}>Date Of Birth</p>
                    <p className={styles.value}>28-Dec-1997</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Aadhar Card No</p>
                    <p className={styles.value}>2736 2873 8273</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Previous Sri Chaitanya ID</p>
                    <p className={styles.value}>-</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Qualification</p>
                    <p className={styles.value}>Phd. Physics</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Highest Qualification</p>
                    <p className={styles.value}>Phd. Physics</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Total Experience</p>
                    <p className={styles.value}>5</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Joining As</p>
                    <p className={styles.value}>Faculty</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Stream</p>
                    <p className={styles.value}>Teaching</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Employee Level</p>
                    <p className={styles.value}>4</p>
                </div>
            </div>
        </div>
    );
}
export default EmployeeProfileMiddle;