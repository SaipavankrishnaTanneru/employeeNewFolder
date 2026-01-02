// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInfo.module.css";

import PresentAddress from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/PresentAddress";
import PermanentAddress from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/PermanentAddress";
import FamilyInfoAccordion from "../../components/EmployeeOverViewScreens/FamilyAddressInfoComponets/accordiansFamily&Address/FamilyInfoAccordion";
const MainInfo = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.accordian_container}>
      

      <div className={styles.accordians}>
        <PresentAddress
          expanded={expanded === "presentAddress"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "presentAddress" : null)}
        />
        <PermanentAddress
          expanded={expanded === "permanentAddress"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "permanentAddress" : null)}
        />
        <FamilyInfoAccordion
          expanded={expanded === "familyInfo"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "familyInfo" : null)}
        />
      </div>
   
    </div>
  );
};

export default MainInfo;