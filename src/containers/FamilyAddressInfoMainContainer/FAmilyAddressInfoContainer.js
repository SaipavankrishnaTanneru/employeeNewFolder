import React from 'react';
import styles from './FamilyAddressInfoContainer.module.css';

// import FamilyAddressInfoFormLeft from '../../components/FamilyAddressInfoComponets/FamilyAddressInfoFormLeft';
import FamilyAddressInfoFormLeft from '../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/FamilyAddressInfoFormLeft';
import GeneralInfoContainer from '../acoordian-container/GeneralInfoContainer';
const FamilyAddressInfoContainer = () => {
  return (
    <div className={styles.family_address_info_container}>
        <div className={styles.family_address_left_component}>
      <FamilyAddressInfoFormLeft />
      </div>
      <div className={styles.family_address_right_component}>
      <GeneralInfoContainer />
      </div>
    </div>
  );
};

export default FamilyAddressInfoContainer;