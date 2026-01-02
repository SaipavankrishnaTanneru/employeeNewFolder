// components/EmployeeModuleHeader/EmployeeModuleHeaderTop.js
import React from "react";
import EmployeeModuleHeaderIcon from "../EmployeeLandingPage/EmployeeModuleHeaderIcon/EmployeeModuleHeaderIcon";
import styles from "./ManagerMappingHeaderTop.module.css";
import blueLine from "assets/application-analytics/blue_arrow_line.png";

const EmployeeModuleHeaderTop = ({ title = "Employee Module", subtitle = "Access and manage comprehensive student details seamlessly. View personalized profiles tailored to your campus."}) => {
  return (
    <>
      <div className={styles.headerTop}>
        <EmployeeModuleHeaderIcon height="54" width="54" />

        <div className={styles.application_header_text}>
          <h2 className={styles.application_search_header}>{title}</h2>
          <p className={styles.application_sub_text}>
            {subtitle}
          </p>
        </div>
      </div>

      <figure className={styles.blueLine}>
        <img src={blueLine} alt="decorative line" />
      </figure>
    </>
  );
};

export default EmployeeModuleHeaderTop;