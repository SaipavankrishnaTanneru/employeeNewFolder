import React, { useState } from "react";
import EmployeeRightInformationHeader from "./EmployeeRightInformationHeader";
import PreviousEmployeeInfo from "./PreviousEmployeeInfo";
import styles from "../EmployeeRightInformation/EmployeeRighrInformation.module.css";
import CurrentcampusInfo from "./CurrentcampusInfo";
import endline from "assets/RightSideInformation Icons/endline.svg";


const RightInformation = () => {
  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  return (
    <div className={styles.rightContainer}>
      <div className={styles.rightContainer2}>
        <EmployeeRightInformationHeader />

        <PreviousEmployeeInfo
          expanded={expanded === "previous"}
          onChange={handleChange("previous")}
        />

        <CurrentcampusInfo
          expanded={expanded === "current"}
          onChange={handleChange("current")}
        />
               <img src={endline} alt="Example" />

      </div>
      
    </div>
  );
};

export default RightInformation;
