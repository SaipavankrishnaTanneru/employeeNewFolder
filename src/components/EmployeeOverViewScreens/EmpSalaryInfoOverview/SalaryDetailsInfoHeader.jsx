import React from "react";
import FamilyHeaderIcon from 'assets/Family/FamilyInfo_header_icon.svg';
import styles from './SalaryDetailsInfo.module.css';
const SalaryDetailsIndoHeader=()=>{
 
return(
    <div className={styles.bankdetails_header}>
        <figure>
            <img src={FamilyHeaderIcon} alt="Header Icon" />
        </figure>
 
        <div className={styles.bank_header_textpart}>
            <h2 className={styles.bank_header_text}>Salary Info</h2>
            <p className={styles.bank_header_subtext}>Employee Salary Information</p>
        </div>
    </div>
)
 
}
export default SalaryDetailsIndoHeader;