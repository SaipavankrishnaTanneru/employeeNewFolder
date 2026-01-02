import { useState } from "react";
import styles from "./../acoordian-container/GeneralInformationContainer.module.css";

import generalInformationIcon from 'assets/RightSideInformation Icons/General Information.svg';
import bottomdecoration from 'assets/RightSideInformation Icons/endline.svg';

import ReferenceBy from "../../components/EmployeeOverViewScreens/BankInfoComponent/ReferenceByAccordian";

const AgreementsGeneralInfoContainer = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.accordian_container}>
      <figure>
        <img src={generalInformationIcon} alt="Accordion header" />
        <p className={styles.accordian_header_text}>General Information</p>
      </figure>

      <div className={styles.bankaccordians}>
        <ReferenceBy
          expanded={expanded === "referenceBy"}
          onChange={(e, isOpen) =>
            setExpanded(isOpen ? "referenceBy" : null)
          }
        />
      </div>

      <figure className={styles.bottom_decoration}>
        <img src={bottomdecoration} alt="Bottom Decoration" />
      </figure>
    </div>
  );
};

export default AgreementsGeneralInfoContainer;
