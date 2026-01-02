import React, { useState } from "react";
import styles from "./PopupNavTabs.module.css";
import { ReactComponent as CashIcon } from '../../../assets/application-status/school-sale-conf-assets/CashIcon.svg';
import { ReactComponent as DDIcon } from '../../../assets/application-status/school-sale-conf-assets/DDIcon.svg';
import { ReactComponent as ChequeIcon } from '../../../assets/application-status/school-sale-conf-assets/Cheque.svg';
import { ReactComponent as CardIcon } from '../../../assets/application-status/school-sale-conf-assets/Debit Card.svg';
const tabs = [
  { id: "cash", label: "Cash", icon: <CashIcon /> },
  { id: "dd", label: "DD", icon: <DDIcon /> },
  { id: "cheque", label: "Cheque", icon: <ChequeIcon /> },
  { id: "card", label: "Credit/Debit Card", icon: <CardIcon /> },
];

const PopupNavTabs = ({ onChange }) => {
  const [active, setActive] = useState("cash");

  const handleClick = (id) => {
    setActive(id);
    onChange && onChange(id);
  };

  return (
    <div className={styles.wrapper}>
     <p className={styles.paymentModeText}>Select Payment Mode</p>
      <div className={styles.tabsContainer}>
         
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${
              active === tab.id ? styles.active : ""
            }`}
            onClick={() => handleClick(tab.id)}
          >
            <span
              className={`${styles.icon} ${
                active === tab.id ? styles.activeIcon : ""
              }`}
            >
              {tab.icon}
            </span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopupNavTabs;
