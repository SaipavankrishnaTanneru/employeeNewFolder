import React, { useState } from "react";
import styles from "./DocumentSection.module.css";

import addressproofactive from 'assets/EmployeeOnBoarding/addressproofactive.svg';
import addressproofinactive from 'assets/EmployeeOnBoarding/addressproofinactive.svg';
import datasheeticonactive from 'assets/EmployeeOnBoarding/datasheeticonactive.svg';
import datasheeticoninactive from 'assets/EmployeeOnBoarding/datasheeticoninactive.svg';
import edudocactive from 'assets/EmployeeOnBoarding/edudocactive.svg';
import edudocinactive from 'assets/EmployeeOnBoarding/edudocinactive.svg';
import idproofactive from 'assets/EmployeeOnBoarding/idproofactive.svg';
import idproofinactive from 'assets/EmployeeOnBoarding/idproofinactive.svg';
import passportsizephotoactive from 'assets/EmployeeOnBoarding/idproofactive.svg';
import passportsizephotoinactive from 'assets/EmployeeOnBoarding/idproofinactive.svg';
import stationaryactive from 'assets/EmployeeOnBoarding/stationaryactive.svg';
import stationaryinactive from 'assets/EmployeeOnBoarding/stationaryinactive.svg';

const DocumentSection = () => {
 const [leftItems, setLeftItems] = useState([
    { id: 1, title: "Personal Data Sheet", desc: "", done: false, iconActive: datasheeticonactive, iconInactive: datasheeticoninactive },
    { id: 2, title: "Latest Passport size photo", desc: "", done: false, iconActive: passportsizephotoactive, iconInactive: passportsizephotoinactive },
    { id: 3, title: "Address Proof", desc: "Govt. Approved Address Proof/ Aadhar Card", done: false, iconActive: addressproofactive, iconInactive: addressproofinactive },
    { id: 4, title: "ID Proof", desc: "Govt. Approved ID Proof/ PAN Card", done: false, iconActive: idproofactive, iconInactive: idproofinactive },
    { id: 5, title: "Educational Documents", desc: "SSC, Inter/ PUC, Graduation, PGraduation", done: false, iconActive: edudocactive, iconInactive: edudocinactive }
  ]);

  const [rightItems, setRightItems] = useState([
    { id: "6.1", title: "ESI Declaration form", desc: "(if exists)", done: false },
    { id: "6.2", title: "Income tax declaration", desc: "Applicable for employees under Income tax slab", done: false },
    { id: "6.3", title: "PF Nomination Declaration form", desc: "(form 11)", done: false },
    { id: "6.4", title: "Gratuity Nomination", desc: "", done: false }
  ]);


  const isAnyStatutoryChecked = rightItems.some((item) => item.done);

  const toggleItem = (id, side) => {
    if (side === "left") {
      setLeftItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
      );
    } else {
      setRightItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
      );
    }
  };

  return (
    <div className={styles.documentcontainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        {leftItems.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemBox} ${item.done ? styles.itemChecked : ""}`}
            onClick={() => toggleItem(item.id, "left")}
          >
            <img
              src={item.done ? item.iconActive : item.iconInactive}
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
                className={item.done ? styles.checked : styles.unchecked}
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
            className={`${styles.rightItem} ${item.done ? styles.itemChecked : ""}`}
            onClick={() => toggleItem(item.id, "right")}
          >
            <div className={styles.rightText}>
              <span className={styles.subTitle}>
                {item.id}. {item.title}
              </span>
              {item.desc && <div className={styles.desc}>{item.desc}</div>}
            </div>

            <div className={styles.statusIcon}>
              <div
                className={item.done ? styles.checked : styles.unchecked}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentSection;
