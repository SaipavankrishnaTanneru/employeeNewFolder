// AccordianContainer.jsx
import { useState } from "react";
import styles from "./GeneralInformationContainer.module.css";
// import PreviousMedicalRecordAccordian from "../../components/accordians/FamilyMembersIn Organization";
import generalInformationIcon from 'assets/RightSideInformation Icons/General Information.svg';
import bottomdecoration from "assets/RightSideInformation Icons/endline.svg";
import BankDetails from "../../components/EmployeeOverViewScreens/BankInfoComponent/BankDetailsAccordian";
import ReferenceBy from "../../components/EmployeeOverViewScreens/BankInfoComponent/ReferenceByAccordian";

const BankGeneralInfoContainer = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={styles.accordian_container}>
      <figure>
        <img src={generalInformationIcon} alt="Accordion header" />
        <p className={styles.accordian_header_text}>General Information</p>
      </figure>

      <div className={styles.bankaccordians}>
      <BankDetails
          expanded={expanded === "bankDetails"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "bankDetails" : null)}
        />
    
        <ReferenceBy
          expanded={expanded === "referenceBy"}
          onChange={(e, isOpen) => setExpanded(isOpen ? "referenceBy" : null)}
        />
      </div>
      <figure className={styles.bottom_decoration}>
        <img src={bottomdecoration} alt="Bottom Decoration" />
      </figure>
    </div>
  );
};

export default BankGeneralInfoContainer;