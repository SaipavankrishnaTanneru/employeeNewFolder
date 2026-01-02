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
                    <p className={styles.label}>Campus</p>
                    <p className={styles.value}>Jubilee Hills</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Campus ID</p>
                    <p className={styles.value}>517927</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Payroll ID</p>
                    <p className={styles.value}>63721</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Payroll Company</p>
                    <p className={styles.value}>Varsity Edufication</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Department</p>
                    <p className={styles.value}>IT</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Contarct period</p>
                    <p className={styles.value}>12 months</p>
                </div>

                <div className={styles.infoItem}>
                    <p className={styles.label}>Reporting Manager</p>
                    <p className={styles.value}>Venkai Boppana</p>
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