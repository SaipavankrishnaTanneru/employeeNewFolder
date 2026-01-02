import React from 'react';
import styles from './SalaryDetailsContainer.module.css'
 
 
import SalaryDetailsLeftInfo from 'components/EmployeeOverViewScreens/EmpSalaryInfoOverview/SalaryDetailsLeftInfo';
import AgreementsGeneralInfoContainer from '../AgreementsConatiner/AgreementsGeneralInfoContainer';
 
 
const SalaryDetailsContainer = () => {
  return (
    <div className={styles.salary_details_info_container}>
        <div className={styles.salary_details_left_component}>
      <SalaryDetailsLeftInfo/>
      </div>
      <div className={styles.salary_details_right_component}>
        <AgreementsGeneralInfoContainer/>
      </div>
    </div>
  );
};
 
export default SalaryDetailsContainer;