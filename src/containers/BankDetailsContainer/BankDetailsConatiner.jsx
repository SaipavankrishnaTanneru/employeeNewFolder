import React from 'react';
import styles from './BankDetailsContainer.module.css'
// import GeneralInfoContainer from '../acoordian-container/GeneralInformationContainer';
// import FamilyAddressInfoFormRight from '../../components/BankDetailsLeftComponent/BankDetailsLeftInfo';
import BankDetailsLeftInfo from '../../components/EmployeeOverViewScreens/BankDetailsLeftComponent/BankDetailsLeftInfo';
import BankGeneralInfoContainer from '../acoordian-container/GeneralInformationContainer';


const BankDetailsContainer = () => {
  return (
    <div className={styles.bank_details_info_container}>
        <div className={styles.bank_details_left_component}>
      <BankDetailsLeftInfo/>
      </div>
      <div className={styles.bank_details_right_component}>
      <BankGeneralInfoContainer/>
      </div>
    </div>
  );
};

export default BankDetailsContainer;