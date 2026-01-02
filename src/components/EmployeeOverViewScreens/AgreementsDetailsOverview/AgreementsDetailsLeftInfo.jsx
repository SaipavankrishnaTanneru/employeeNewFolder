import React from "react";
import styles from "./AgreementsDetailsLeftInfo.module.css";

import AgreementsDetailsInfoHeader from "./AgreementsDetailsInfoHeader";
import AgreementsDetails from "../../EmployeeOverViewScreens/AgreementsDetailsOverview/AgreementsDetails";

const AgreementsDetailsLeftInfo = () => {
  return (
    <div className={styles.whole_container}>
      <AgreementsDetailsInfoHeader />
      <AgreementsDetails />
    </div>
  );
};

export default AgreementsDetailsLeftInfo;
