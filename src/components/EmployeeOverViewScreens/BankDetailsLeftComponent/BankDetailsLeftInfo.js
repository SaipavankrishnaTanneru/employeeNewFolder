import React from "react";
// import FamilyAddressInfoHeader from './BankDetailsInfoHeader';
// import MainInfo from '../../containers/acoordian-container/BankLeftInfoContainer';

import styles from './BankDetailsLeftInfo.module.css';
import BankDetailsInfoHeader from "./BankDetailsInfoHeader";
import BankLeftInfoContainer from "../../../containers/acoordian-container/BankLeftInfoContainer";
const BankDetailsLeftInfo=()=>{

    return (
        <div className={styles.whole_medical_container}>
          <BankDetailsInfoHeader/>
          <BankLeftInfoContainer/>
        </div>
      )
}
export default BankDetailsLeftInfo;