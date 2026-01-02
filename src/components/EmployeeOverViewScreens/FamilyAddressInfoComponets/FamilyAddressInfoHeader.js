import React from "react";
import FamilyHeaderIcon from 'assets/Family/FamilyInfo_header_icon.svg';
import styles from './FamilyAddressInfoHeader.module.css';
const FamilyAddressInfoHeader=()=>{

return(
    <div className={styles.address_header}>
        <figure>
            <img src={FamilyHeaderIcon} alt="Header Icon" />
        </figure>

        <div className={styles.address_header_textpart}>
            <h2 className={styles.address_header_text}>Address Info</h2>
            <p className={styles.address_header_subtext}>Get all the analytics and growth rate of applications</p>
        </div>
    </div>
)

}
export default FamilyAddressInfoHeader;