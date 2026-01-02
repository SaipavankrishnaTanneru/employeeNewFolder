import React from "react";
import styles from "./SalaryAccountInfo.module.css";
import dividerline from 'assets/Family/dividerline.svg';
import pdficon from 'assets/EmployeeQu/pdf_icon.svg';
import downloadicon from 'assets/EmployeeQu/downloadblueicon.svg';          

const SalaryAccountInfo = () => {
  return (
    <div className={styles.salaryAccountContainer}>
      <div className={styles.headerRow}>
        <h4 className={styles.title}>Salary Account Info</h4>
        <img src={dividerline} alt="line" className={styles.dividerImg} />
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Payment Type</p>
          <p className={styles.value}>Free Lance</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Name</p>
          <p className={styles.value}>Axis Bank</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Bank Branch</p>
          <p className={styles.valueBold}>Jubilee Hills Branch</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>IFSC Code</p>
          <p className={styles.valueBold}>UTIB 0000817</p>
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

export default SalaryAccountInfo;
