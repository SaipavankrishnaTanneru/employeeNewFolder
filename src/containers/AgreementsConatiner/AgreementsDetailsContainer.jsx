import React from "react";
import styles from "./AgreementsDetailsContainer.module.css";

import AgreementsDetailsLeftInfo from "../../components/EmployeeOverViewScreens/AgreementsDetailsOverview/AgreementsDetailsLeftInfo";
import AgreementsGeneralInfoContainer from "./AgreementsGeneralInfoContainer";


const AgreementsDetailsContainer = () => {
  return (
    <div className={styles.agreements_details_info_container}>
      <div className={styles.agreements_left_component}>
        <AgreementsDetailsLeftInfo />
      </div>

      <div className={styles.agreements_right_component}>
        <AgreementsGeneralInfoContainer/>
      </div>
    </div>
  );
};

export default AgreementsDetailsContainer;
