import React from 'react';
import styles from "../EmployeeProfileComponet/EmployeeViewButton.module.css";
import ArrowIcon from "../../assets/EmployeeProfileCrad/ButtonArrow.svg";

const EmployeeViewButton = () => {
    return (
    <div className={styles.viewButtonContainer}>
  <button className={styles.viewProfileBtn}>
   
    <img
          src={ArrowIcon}
      alt="Arrow icon"
      className={styles.icon}
    />
     View full Profile
  </button>
</div>


    );
};
export default EmployeeViewButton;