// AccordianContainer.jsx
import { useState } from "react";
import styles from "./BankLeftInfo.module.css";
import PersonalAccountInfo from "../../components/EmployeeOverViewScreens/BankInfoComponent/PersonalAccountInfo";
import SalaryAccountInfo from "../../components/EmployeeOverViewScreens/BankInfoComponent/SalaryAccountInfo";
 
const SalaryLeftInfoConatiner = () => {
  const [expanded, setExpanded] = useState(null);
 
  return (
    <div className={styles.accordian_container}>
     
 
      <div className={styles.accordians}>
        <PersonalAccountInfo/>
        <SalaryAccountInfo/>
      </div>
   
    </div>
  );
};
 
export default SalaryLeftInfoConatiner;
 