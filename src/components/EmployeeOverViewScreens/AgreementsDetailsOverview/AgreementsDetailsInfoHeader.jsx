import React from "react";
import FamilyHeaderIcon from "assets/Family/FamilyInfo_header_icon.svg";
import styles from "./AgreementsDetailsInfoHeader.module.css";

const AgreementsDetailsInfoHeader = () => {
  return (
    <div className={styles.header_container}>
      <figure>
        <img src={FamilyHeaderIcon} alt="Header Icon" />
      </figure>

      <div className={styles.text_part}>
        <h2 className={styles.header_text}>Agreements Details</h2>
        <p className={styles.header_subtext}>
          Get all the analytics and growth rate of applications
        </p>
      </div>
    </div>
  );
};

export default AgreementsDetailsInfoHeader;
