import styles from "../EmployeeQualificationDetails/EmployeeQualificationRightside.module.css";
import EmployeeRightSideHeader from "../EmployeeRightInformation/EmployeeRightInformationHeader";
import ReferredBy from "./ReferredBy";
import SameInstutionEmployees from "./SameInstutionEmployees";
import React, { useState } from "react";
import endline from "assets/RightSideInformation Icons/endline.svg";


const EmployeeQualificationRightside = () => {

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };
    return(
        <div className={styles.rightsidedetailscontainer}>
            <EmployeeRightSideHeader/>

            <SameInstutionEmployees
        expanded={expanded ==="SameInstutionEmployees"}
        onChange={handleChange("SameInstutionEmployees")}
      />

       <ReferredBy
        expanded={expanded ==="ReferedBy"}
        onChange={handleChange("ReferedBy")}
      />

       <img src={endline} alt="Example" />
        </div>

        


    );
}
export default EmployeeQualificationRightside;