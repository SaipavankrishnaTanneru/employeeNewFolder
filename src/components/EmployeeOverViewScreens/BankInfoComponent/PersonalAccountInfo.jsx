import React from "react";
import styles from "./PersonalAccountInfo.module.css";
import dividerline from "assets/Family/dividerline.svg";
import pdficon from "assets/EmployeeQu/pdf_icon.svg";
import downloadicon from "assets/EmployeeQu/downloadblueicon.svg"; 

const PersonalAccountInfo = () => {
  return (
    <div className={styles.personalAccountContainer}>
      <div className={styles.headerRow}>
      <h4 className={styles.title}>Personal Account Info</h4>
      <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Payment Type</p>
          <p className={styles.value}>Free Lance</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Name</p>
          <p className={styles.value}>ICICI Bank</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Branch</p>
          <p className={styles.valueBold}>Jubilee Hills Branch</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>IFSC Code</p>
          <p className={styles.valueBold}>ICICI0000817</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Account Number</p>
          <p className={styles.valueBold}>2717265382181621</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Statement / Cheque</p>
          <div className={styles.icons}>
            <img src={pdficon} alt="PDF" className={styles.pdfImage} />
            <img src={downloadicon} alt="Download" className={styles.downloadImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalAccountInfo;
