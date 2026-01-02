import React from "react";
import EmployeeImage from "../../components/EmployeeProfileComponet/EmployeeImage";
import EmployeeProfileMiddle from "../../components/EmployeeProfileComponet/EmployeeProfileMiddle";
import Styles from "./EmployeeProfileContainer.module.css";

const EmployeeProfileContainer = () => {
  return (
    <div className={Styles.emp_profile_container}>
      <EmployeeImage />
      <EmployeeProfileMiddle />
    </div>
  );
};

export default EmployeeProfileContainer;
