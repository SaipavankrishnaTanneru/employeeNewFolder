import React from "react";
import styles from './SalaryDetailsleftInfo.module.css';
import SalaryDetailsIndoHeader from "./SalaryDetailsInfoHeader";
 
// ✅ FIX 1: Import the actual content container (the one with the accordions)
// Check the path: It should point to the file containing "SalaryLeftInfoConatiner"
import SalaryLeftInfoConatiner from "../../../containers/acoordian-container/SalaryLeftInfoConatiner";
 
const SalaryDetailsLeftInfo = () => {
    return (
        <div className={styles.whole_medical_container}>
            <SalaryDetailsIndoHeader />
           
            {/* ✅ FIX 2: Render the Content Container, NOT the component itself */}
            <SalaryLeftInfoConatiner />
        </div>
    );
};
 
export default SalaryDetailsLeftInfo;
 