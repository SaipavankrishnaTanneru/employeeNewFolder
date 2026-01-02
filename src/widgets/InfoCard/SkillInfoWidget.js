import React from "react";
import styles from "./SkillInfoWidget.module.css";
import dividerline from "../../assets/EmployeeOnBoarding/dividerline.svg";

const SkillInfoWidget = ({ title, data }) => {
  return (
    <div className={styles.widgetContainer}>
      <div className={styles.headerRow}>
        <h4 className={styles.title}>{title}</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />
      </div>

      <div className={styles.infoGrid}>
        {data.map((item, index) => (
          <div key={index} className={styles.infoItem}>
            <p className={styles.label}>{item.label}</p>
            <p className={styles.valueBold}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillInfoWidget;
