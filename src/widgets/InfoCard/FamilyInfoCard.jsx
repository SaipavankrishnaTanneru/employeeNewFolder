import React from "react";
import styles from "./FamilyInfoCard.module.css";
import dividerline from "../../assets/EmployeeOnBoarding/dividerline.svg";

const FamilyInfoCard = ({ title, fatherData, motherData, fatherIcon, motherIcon }) => {
  return (
    <div className={styles.widgetContainer}>
      {/* Header (same as BankInfoWidget) */}
      <div className={styles.headerRow}>
        <h4 className={styles.title}>{title}</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      {/* Father Info */}
      <div className={`${styles.sectionBlock} ${styles.fatherBlock}`}>
        <div className={styles.titleBoxFather}>
          {fatherIcon}
          <span>Father</span>
        </div>
        <div className={styles.infoGrid}>
          {fatherData.map((item, index) => (
            <div key={index} className={styles.infoItem}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.valueBold}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mother Info */}
      <div className={`${styles.sectionBlock} ${styles.motherBlock}`}>
        <div className={styles.titleBoxMother}>
          {motherIcon}
          <span>Mother</span>
        </div>
        <div className={styles.infoGrid}>
          {motherData.map((item, index) => (
            <div key={index} className={styles.infoItem}>
              <p className={styles.label}>{item.label}</p>
              <p className={styles.valueBold}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyInfoCard;
