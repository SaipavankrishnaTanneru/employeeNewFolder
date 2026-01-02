import React from "react";
import FamilyHeaderIcon from 'assets/Family/FamilyInfo_header_icon.svg';
import styles from './BankDetailsInfoHeader.module.css';
const BankDetailsInfoHeader=()=>{

return(
    <div className={styles.bankdetails_header}>
        <figure>
            <img src={FamilyHeaderIcon} alt="Header Icon" />
        </figure>

        <div className={styles.bank_header_textpart}>
            <h2 className={styles.bank_header_text}>Bank Details</h2>
            <p className={styles.bank_header_subtext}>Get all the analytics and growth rate of applications</p>
        </div>
    </div>
)

}
export default BankDetailsInfoHeader;