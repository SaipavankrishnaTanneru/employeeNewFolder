import React from "react";
import styles from "./BankInfoWidget.module.css";
import dividerline from "../../assets/EmployeeOnBoarding/dividerline.svg";
import editIcon from "../../assets/icons/editIcon.svg"; // your icon

const BankInfoWidget = ({ title, data, onEdit }) => {
  return (
    <div className={styles.widgetContainer}>
      <div className={styles.headerRow}>
        <h4 className={styles.title}>{title}</h4>
        <img src={dividerline} alt="divider" className={styles.dividerImage} />

        {onEdit && (
          <button
            type="button"
            className={styles.editButton}
            onClick={onEdit}
          >
            <img src={editIcon} alt="edit" />
            <span>Edit</span>
          </button>
        )}
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

export default BankInfoWidget;