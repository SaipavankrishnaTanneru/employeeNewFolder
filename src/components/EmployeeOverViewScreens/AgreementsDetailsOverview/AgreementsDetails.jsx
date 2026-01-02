import React from "react";
import styles from "./AgreementsDetails.module.css";

import dividerline from "../../../assets/Family/dividerline.svg";
import pdficon from "../../../assets/EmployeeQu/pdf_icon.svg";
import downloadicon from "../../../assets/EmployeeQu/downloadblueicon.svg";

const AgreementsDetails = () => {
  return (
    <div className={styles.agreementsContainer}>
      {/* Agreements Header */}
      <div className={styles.headerRow}>
        <h4 className={styles.title}>Agreements</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* Agreements Info */}
      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Agreement Company</p>
          <p className={styles.value}>Free Lance</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Agreement Type</p>
          <p className={styles.valueBold}>ICICI Bank</p>
        </div>
      </div>

      {/* Cheque Details Header - With Gap */}
      <div className={`${styles.headerRow} ${styles.chequeHeader}`}>
        <h4 className={styles.title}>Cheque Details</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* 1st Cheque */}
      <div className={styles.subSectionTitle}>
        1<sup>st</sup> Cheque
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque No</p>
          <p className={styles.value}>Free Lance</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Bank Name</p>
          <p className={styles.value}>Axis Bank</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Bank IFSC Code</p>
          <p className={styles.valueBold}>UTIB 0000817</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Document File</p>
          <div className={styles.icons}>
            <img src={pdficon} alt="PDF" className={styles.pdfImage} />
            <img src={downloadicon} alt="Download" className={styles.downloadImage} />
          </div>
        </div>
      </div>

      {/* 2nd Cheque */}
      <div className={styles.subSectionTitle}>
        2<sup>nd</sup> Cheque
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque No</p>
          <p className={styles.value}>Free Lance</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Bank Name</p>
          <p className={styles.value}>Axis Bank</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Bank IFSC Code</p>
          <p className={styles.valueBold}>UTIB 0000817</p>
        </div>

        <div className={styles.infoItem}>
          <p className={styles.label}>Cheque Document File</p>
          <div className={styles.icons}>
            <img src={pdficon} alt="PDF" className={styles.pdfImage} />
            <img src={downloadicon} alt="Download" className={styles.downloadImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementsDetails;
