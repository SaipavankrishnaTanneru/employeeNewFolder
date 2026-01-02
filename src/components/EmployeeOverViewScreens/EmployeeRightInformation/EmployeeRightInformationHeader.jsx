import React from "react";
import Styles from "../EmployeeRightInformation/EmployeeRightInformationHeader.module.css";
import generalInfoIcon from "assets/RightSideInformation Icons/General Information.svg";
const EmployeeRightInformationHeader = () => {
  return (
    <div className={Styles.RightInformationHeader}>
      <img src={generalInfoIcon} alt="General Information Icon" className={Styles.icon} />
      <h6>General Information</h6>
    </div>
  );
};

export default EmployeeRightInformationHeader;
