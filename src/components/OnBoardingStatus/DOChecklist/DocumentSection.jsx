import React from "react";
import styles from "./DocumentSection.module.css";

// Check your paths - keeping them exactly as you provided
import addressproofactive from 'assets/EmployeeOnBoarding/addressproofactive.svg';
import addressproofinactive from 'assets/EmployeeOnBoarding/addressproofinactive.svg';
import datasheeticonactive from 'assets/EmployeeOnBoarding/datasheeticonactive.svg';
import datasheeticoninactive from 'assets/EmployeeOnBoarding/datasheeticoninactive.svg';
import edudocactive from 'assets/EmployeeOnBoarding/edudocactive.svg';
import edudocinactive from 'assets/EmployeeOnBoarding/edudocinactive.svg';
import idproofactive from 'assets/EmployeeOnBoarding/idproofactive.svg';
import idproofinactive from 'assets/EmployeeOnBoarding/idproofinactive.svg';
// Note: You had idproofactive imported for passport in your snippet, check if you have a specific passport icon
import passportsizephotoactive from 'assets/EmployeeOnBoarding/idproofactive.svg'; 
import passportsizephotoinactive from 'assets/EmployeeOnBoarding/idproofinactive.svg';
import stationaryactive from 'assets/EmployeeOnBoarding/stationaryactive.svg';
import stationaryinactive from 'assets/EmployeeOnBoarding/stationaryinactive.svg';

const DocumentSection = ({ checkedIds, onToggle }) => {
  
  // Helper to check if an ID is in the API array
  const isChecked = (id) => checkedIds.includes(id);

  // Mapped items with API IDs (1-5)
  const leftItems = [
    { id: 1, title: "Personal Data Sheet", desc: "", iconActive: datasheeticonactive, iconInactive: datasheeticoninactive },
    { id: 2, title: "Latest Passport size photo", desc: "", iconActive: passportsizephotoactive, iconInactive: passportsizephotoinactive },
    { id: 3, title: "Address Proof", desc: "Govt. Approved Address Proof/ Aadhar Card", iconActive: addressproofactive, iconInactive: addressproofinactive },
    { id: 4, title: "ID Proof", desc: "Govt. Approved ID Proof/ PAN Card", iconActive: idproofactive, iconInactive: idproofinactive },
    { id: 5, title: "Educational Documents", desc: "SSC, Inter/ PUC, Graduation, PGraduation", iconActive: edudocactive, iconInactive: edudocinactive }
  ];

  // Mapped items with API IDs (6-9) but custom display labels (6.1, etc.)
  const rightItems = [
    { id: 6, displayId: "6.1", title: "ESI Declaration form", desc: "(if exists)" },
    { id: 7, displayId: "6.2", title: "Income tax declaration", desc: "Applicable for employees under Income tax slab" },
    { id: 8, displayId: "6.3", title: "PF Nomination Declaration form", desc: "(form 11)" },
    { id: 9, displayId: "6.4", title: "Gratuity Nomination", desc: "" }
  ];

  const isAnyStatutoryChecked = rightItems.some((item) => isChecked(item.id));

  return (
    <div className={styles.documentcontainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        {leftItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemBox} ${isChecked(item.id) ? styles.itemChecked : ""}`}
            onClick={() => onToggle(item.id)}
          >
            <img
              src={isChecked(item.id) ? item.iconActive : item.iconInactive}
              alt={item.title}
              className={styles.itemIcon}
            />
            <div className={styles.textSection}>
              <div className={styles.title}>
                {item.id}. {item.title}
              </div>
              {item.desc && <div className={styles.desc}>{item.desc}</div>}
            </div>

            <div className={styles.statusIcon}>
              <div
                className={isChecked(item.id) ? styles.checked : styles.unchecked}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Section */}
      <div
        className={`${styles.rightSection} ${
          isAnyStatutoryChecked ? styles.itemChecked : ""
        }`}
      >
        <div className={styles.sectionTitle}>
          <img
            src={isAnyStatutoryChecked ? stationaryactive : stationaryinactive}
            alt="Statutory"
            className={styles.itemIcon}
          />
          <div>6. Statutory Forms</div>
        </div>

        {rightItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.rightItem} ${isChecked(item.id) ? styles.itemChecked : ""}`}
            onClick={() => onToggle(item.id)}
          >
            <div className={styles.rightText}>
              <span className={styles.subTitle}>
                {item.displayId}. {item.title}
              </span>
              {item.desc && <div className={styles.desc}>{item.desc}</div>}
            </div>

            <div className={styles.statusIcon}>
              <div
                className={isChecked(item.id) ? styles.checked : styles.unchecked}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;